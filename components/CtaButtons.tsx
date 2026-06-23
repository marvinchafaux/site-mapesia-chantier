import Link from "next/link";
import {
  siteConfig,
  telHref,
  whatsappHref,
  ctaEnabled,
} from "@/lib/site-config";
import { PhoneIcon, WhatsAppIcon, DocumentIcon } from "./Icons";

/**
 * Boutons CTA — toujours affichés (design complet), même si la coordonnée
 * est vide. Dans ce cas le bouton est rendu inerte (pas de href) plutôt que
 * de pointer vers "#" : aucun lien cassé, et aucun saut en haut de page.
 */

type Variant = "cta" | "primary" | "outline" | "outline-light";

const variantClass: Record<Variant, string> = {
  cta: "btn-cta",
  primary: "btn-primary",
  outline: "btn-outline",
  "outline-light": "btn-outline-light",
};

/** Bouton « Demander un devis » → page contact (avec pré-remplissage produit optionnel). */
export function DevisButton({
  produitSlug,
  variant = "cta",
  className = "",
  label = "Demander un devis",
}: {
  produitSlug?: string;
  variant?: Variant;
  className?: string;
  label?: string;
}) {
  const href = produitSlug ? `/contact?produit=${produitSlug}` : "/contact";
  return (
    <Link href={href} className={`${variantClass[variant]} ${className}`}>
      <DocumentIcon className="h-5 w-5" />
      {label}
    </Link>
  );
}

/** Bouton WhatsApp. Inerte tant que le numéro n'est pas renseigné. */
export function WhatsAppButton({
  variant = "outline",
  className = "",
  message,
}: {
  variant?: Variant;
  className?: string;
  message?: string;
}) {
  const enabled = ctaEnabled.whatsapp;
  const href = enabled ? whatsappHref(message) : undefined;
  return (
    <a
      href={href}
      target={enabled ? "_blank" : undefined}
      rel={enabled ? "noopener noreferrer" : undefined}
      aria-disabled={!enabled}
      className={`${variantClass[variant]} ${className}`}
    >
      <WhatsAppIcon className="h-5 w-5" />
      WhatsApp
    </a>
  );
}

/** Bouton « Appeler ». Affiche le numéro si renseigné, sinon le libellé seul. */
export function CallButton({
  variant = "outline",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const enabled = ctaEnabled.phone;
  const href = enabled ? telHref() : undefined;
  return (
    <a
      href={href}
      aria-disabled={!enabled}
      className={`${variantClass[variant]} ${className}`}
    >
      <PhoneIcon className="h-5 w-5" />
      {siteConfig.phoneDisplay || "Appeler"}
    </a>
  );
}

/**
 * Le trio de boutons (Devis / WhatsApp / Appeler).
 * `tone="onDark"` : variante des boutons secondaires lisible sur fond foncé.
 */
export function CtaGroup({
  className = "",
  tone = "default",
}: {
  className?: string;
  tone?: "default" | "onDark";
}) {
  const secondary: Variant = tone === "onDark" ? "outline-light" : "outline";
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
      <DevisButton variant="cta" />
      <WhatsAppButton variant={secondary} />
      <CallButton variant={secondary} />
    </div>
  );
}
