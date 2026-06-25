"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { CheckIcon, AlertIcon, DocumentIcon } from "./Icons";

/**
 * Formulaire de devis réutilisable.
 * - Pré-remplissage : ?produit=<slug> => message + chip produit.
 * - Validation inline (aria-invalid / aria-describedby), focus du 1er champ en erreur.
 * - Consentement RGPD obligatoire, honeypot anti-spam.
 * - Envoi via fetch vers /api/devis (aucun rechargement de page).
 *
 * ⚠️ Utilise useSearchParams : doit être rendu dans une <Suspense>.
 */

type Status = "idle" | "submitting" | "success" | "error";
type FieldErrors = Partial<
  Record<"nom" | "email" | "message" | "consent", string>
>;

const initialFields = {
  nom: "",
  societe: "",
  telephone: "",
  email: "",
  message: "",
  consent: false,
  website: "", // honeypot
  _t: 0,      // anti-spam : timestamp de chargement du formulaire
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(f: typeof initialFields): FieldErrors {
  const e: FieldErrors = {};
  if (f.nom.trim().length < 2) e.nom = "Merci d'indiquer votre nom.";
  if (!emailRe.test(f.email.trim())) e.email = "Merci d'indiquer un email valide.";
  if (f.message.trim().length < 5) e.message = "Merci de détailler votre demande.";
  if (!f.consent) e.consent = "Le consentement est requis pour vous répondre.";
  return e;
}

export default function DevisForm({ compact = false }: { compact?: boolean }) {
  const searchParams = useSearchParams();
  const produitSlug = searchParams.get("produit");
  const product = produitSlug ? getProductBySlug(produitSlug) : undefined;

  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  // Horodatage de chargement (anti-spam : détecte les soumissions instantanées).
  useEffect(() => {
    setFields((f) => ({ ...f, _t: Date.now() }));
  }, []);

  // Pré-remplissage du message selon le produit (au montage / changement param).
  useEffect(() => {
    if (!product) return;
    setFields((f) => ({
      ...f,
      message: `Bonjour, je souhaite un devis pour : ${product.name}.`,
    }));
  }, [product]);

  function update<K extends keyof typeof fields>(
    key: K,
    value: (typeof fields)[K]
  ) {
    setFields((f) => ({ ...f, [key]: value }));
    // Efface l'erreur du champ dès que l'utilisateur le corrige.
    if (key in errors) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key as keyof FieldErrors];
        return next;
      });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;

    const found = validate(fields);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      setStatus("error");
      setServerError("");
      // Focus du premier champ en erreur.
      const first = (["nom", "email", "message", "consent"] as const).find(
        (k) => found[k]
      );
      if (first) document.getElementById(first)?.focus();
      return;
    }

    setErrors({});
    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus("success");
        setFields(initialFields);
      } else {
        setStatus("error");
        setServerError(
          data.error || "Une erreur est survenue. Merci de réessayer."
        );
      }
    } catch {
      setStatus("error");
      setServerError(
        "Impossible d'envoyer la demande pour le moment. Merci de réessayer."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-primary/10 bg-surface p-8 text-center"
      >
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary">
          <CheckIcon className="h-8 w-8" />
        </span>
        <h3 className="mt-4 font-heading text-2xl font-semibold text-primary">
          Demande envoyée !
        </h3>
        <p className="mt-2 text-base text-primary/80">
          Merci, nous revenons vers vous très rapidement pour votre devis.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn-outline mt-6"
        >
          Envoyer une autre demande
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";
  const labelClass = "block font-heading text-base font-medium text-primary";
  const inputBase =
    "mt-1.5 w-full rounded-lg border bg-white px-4 py-3 text-base text-primary placeholder:text-primary/40 focus:outline-none focus:ring-2 focus:ring-primary";
  const inputClass = (hasError: boolean) =>
    `${inputBase} ${
      hasError ? "border-red-500 focus:border-red-500" : "border-primary/20 focus:border-primary"
    }`;

  const ErrorText = ({ id, msg }: { id: string; msg?: string }) =>
    msg ? (
      <p
        id={id}
        role="alert"
        className="mt-1.5 flex items-center gap-1.5 text-base font-medium text-red-700"
      >
        <AlertIcon className="h-4 w-4 shrink-0" />
        {msg}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Chip produit (pré-remplissage) */}
      {product && (
        <div className="flex items-center gap-2 rounded-lg bg-primary/5 px-4 py-3 text-base text-primary">
          <DocumentIcon className="h-5 w-5 shrink-0 text-accent-text" />
          <span>
            Demande pour : <strong>{product.name}</strong>
          </span>
        </div>
      )}

      <div className={compact ? "" : "grid gap-5 sm:grid-cols-2"}>
        <div>
          <label htmlFor="nom" className={labelClass}>
            Nom <span className="text-accent-text">*</span>
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            required
            autoComplete="name"
            value={fields.nom}
            onChange={(e) => update("nom", e.target.value)}
            aria-invalid={!!errors.nom}
            aria-describedby={errors.nom ? "nom-error" : undefined}
            className={inputClass(!!errors.nom)}
          />
          <ErrorText id="nom-error" msg={errors.nom} />
        </div>
        <div>
          <label htmlFor="societe" className={labelClass}>
            Société
          </label>
          <input
            id="societe"
            name="societe"
            type="text"
            autoComplete="organization"
            value={fields.societe}
            onChange={(e) => update("societe", e.target.value)}
            className={inputClass(false)}
          />
        </div>
        <div>
          <label htmlFor="telephone" className={labelClass}>
            Téléphone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            autoComplete="tel"
            value={fields.telephone}
            onChange={(e) => update("telephone", e.target.value)}
            className={inputClass(false)}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-accent-text">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass(!!errors.email)}
          />
          <ErrorText id="email-error" msg={errors.email} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message <span className="text-accent-text">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Décrivez votre besoin (produit, quantité, délai…)"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={inputClass(!!errors.message)}
        />
        <ErrorText id="message-error" msg={errors.message} />
      </div>

      {/* Honeypot — masqué aux humains, piège à bots */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">Ne pas remplir</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={fields.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      {/* Consentement RGPD */}
      <div>
        <div className="flex items-start gap-3">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={fields.consent}
            onChange={(e) => update("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-1 h-5 w-5 shrink-0 rounded border-primary/30 text-primary focus:ring-primary"
          />
          <label htmlFor="consent" className="text-base text-primary/80">
            J&apos;accepte que mes données soient utilisées pour traiter ma
            demande. <span className="text-accent-text">*</span>
          </label>
        </div>
        <ErrorText id="consent-error" msg={errors.consent} />
      </div>

      {/* Erreur serveur globale */}
      {status === "error" && serverError && (
        <p
          role="alert"
          className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-base font-medium text-red-700"
        >
          <AlertIcon className="h-5 w-5 shrink-0" />
          {serverError}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="btn-cta w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Envoi en cours…" : "Envoyer ma demande de devis"}
        </button>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span className="flex items-center gap-1.5 text-sm text-primary/50">
            <span className="text-accent">✓</span> Réponse sous 24h
          </span>
          <span className="flex items-center gap-1.5 text-sm text-primary/50">
            <span className="text-accent">✓</span> Sans engagement
          </span>
        </div>
      </div>
    </form>
  );
}
