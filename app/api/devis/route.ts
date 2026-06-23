import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

/**
 * Route d'envoi des demandes de devis.
 * Sécurité :
 * - Contrôle d'origine (rejette les POST cross-site).
 * - Garde de taille de corps (anti-DoS).
 * - Rate limiting par IP (best-effort en mémoire ; voir note plus bas).
 * - Validation serveur (zod) + honeypot anti-spam.
 * - Échappement HTML de l'email + sujet sur une seule ligne (anti-injection).
 * - Si RESEND_API_KEY absente : pas de crash, message clair.
 */

export const runtime = "nodejs";

const MAX_BODY_BYTES = 20_000;

// Rate limiting en mémoire. ⚠️ Sur serverless (Vercel), la mémoire n'est pas
// partagée entre instances : c'est une protection « best-effort » qui freine
// les rafales sur une instance chaude. Pour une protection robuste, brancher
// un store partagé (Vercel KV / Upstash) ou un CAPTCHA (Turnstile/hCaptcha).
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 min
const RATE_MAX = 5; // 5 demandes / IP / fenêtre
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    hits.forEach((v, k) => {
      if (v.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k);
    });
  }
  return false;
}

const devisSchema = z.object({
  nom: z.string().trim().min(2, "Nom requis").max(100),
  societe: z.string().trim().max(120).optional().default(""),
  telephone: z.string().trim().max(30).optional().default(""),
  email: z.string().trim().email("Email invalide").max(150),
  message: z.string().trim().min(5, "Message trop court").max(3000),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Le consentement RGPD est requis." }),
  }),
  // Honeypot : doit rester vide (rempli => bot).
  website: z.string().max(0).optional().default(""),
});

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Réduit à une seule ligne (anti-injection d'en-tête dans le sujet). */
function oneLine(s: string): string {
  return s.replace(/[\r\n\t]+/g, " ").trim().slice(0, 150);
}

export async function POST(request: Request) {
  // 1. Contrôle d'origine : on rejette les requêtes cross-site.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      if (new URL(origin).host !== host) {
        return NextResponse.json(
          { ok: false, error: "Origine non autorisée." },
          { status: 403 }
        );
      }
    } catch {
      return NextResponse.json(
        { ok: false, error: "Origine non autorisée." },
        { status: 403 }
      );
    }
  }

  // 2. Garde de taille de corps.
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { ok: false, error: "Requête trop volumineuse." },
      { status: 413 }
    );
  }

  // 3. Rate limiting par IP.
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Trop de demandes envoyées. Merci de patienter quelques minutes ou de nous appeler.",
      },
      { status: 429 }
    );
  }

  // 4. Parsing + validation.
  let data: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json(
        { ok: false, error: "Requête trop volumineuse." },
        { status: 413 }
      );
    }
    data = JSON.parse(raw);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requête invalide." },
      { status: 400 }
    );
  }

  const parsed = devisSchema.safeParse(data);
  if (!parsed.success) {
    const first = parsed.error.errors[0]?.message ?? "Champs invalides.";
    return NextResponse.json({ ok: false, error: first }, { status: 422 });
  }

  const { nom, societe, telephone, email, message, website } = parsed.data;

  // 5. Honeypot rempli → on répond OK silencieusement (on ignore le bot).
  if (website) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  // Destinataire centralisé : variable d'env en priorité, sinon l'email du
  // site-config (EMAIL_DEVIS_PLACEHOLDER). Une seule valeur à remplir.
  const to = process.env.DEVIS_TO_EMAIL || siteConfig.email;
  const from = process.env.DEVIS_FROM_EMAIL || "onboarding@resend.dev";

  // Pas de clé / destinataire : on ne crashe pas, on log et on informe.
  if (!apiKey || !to) {
    console.warn(
      "[devis] RESEND_API_KEY ou destinataire manquant — email non envoyé."
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "L'envoi par email n'est pas encore configuré. Merci de nous contacter par téléphone ou WhatsApp.",
      },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const html = `
      <h2>Nouvelle demande de devis — MAPESIA</h2>
      <ul>
        <li><strong>Nom :</strong> ${escapeHtml(nom)}</li>
        <li><strong>Société :</strong> ${escapeHtml(societe || "—")}</li>
        <li><strong>Téléphone :</strong> ${escapeHtml(telephone || "—")}</li>
        <li><strong>Email :</strong> ${escapeHtml(email)}</li>
      </ul>
      <p><strong>Message :</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `;

    const { error } = await resend.emails.send({
      from: `MAPESIA Devis <${from}>`,
      to: [to],
      replyTo: email,
      subject: oneLine(
        `Demande de devis — ${nom}${societe ? ` (${societe})` : ""}`
      ),
      html,
    });

    if (error) {
      console.error("[devis] Erreur Resend :", error);
      return NextResponse.json(
        { ok: false, error: "L'envoi a échoué. Merci de réessayer." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[devis] Exception :", err);
    return NextResponse.json(
      { ok: false, error: "Une erreur est survenue. Merci de réessayer." },
      { status: 500 }
    );
  }
}
