/**
 * SOURCE UNIQUE DE VÉRITÉ — coordonnées du site.
 */

/* ════════════════════════════════════════════════════════════════════════ */
/*  ⚠️  À REMPLIR PAR LE CLIENT — LES 3 SEULES VALEURS À RENSEIGNER  ⚠️       */
/*                                                                            */
/*  Remplace simplement le contenu entre guillemets ci-dessous, ici et       */
/*  nulle part ailleurs. Tout le site (boutons Appeler / WhatsApp, liens      */
/*  tel:/wa.me, mailto, formulaire de devis) se câble automatiquement.        */
/*  Tant qu'une valeur reste vide "", le bouton s'affiche mais pointe vers    */
/*  "#" (aucun lien cassé, aucune erreur).                                    */
/* ════════════════════════════════════════════════════════════════════════ */

/** Téléphone affiché ET utilisé pour le lien tel: — ex: "+33 6 12 34 56 78" */
export const TEL_PLACEHOLDER = "";

/** WhatsApp, format wa.me : chiffres uniquement, sans + ni espaces — ex: "33612345678" */
export const WHATSAPP_PLACEHOLDER = "";

/** Email de réception des demandes de devis — ex: "contact@mapesia.fr" */
export const EMAIL_DEVIS_PLACEHOLDER = "";

/* ════════════════════════════════════════════════════════════════════════ */

export const siteConfig = {
  name: "MAPESIA",
  description:
    "Fournisseur de matériel de chantier et de signalisation pour les professionnels du BTP, des travaux publics, de la voirie et des collectivités.",
  url: "https://www.mapesia.fr",

  // ↓ Câblés sur les 3 constantes ci-dessus — ne pas éditer ici.
  phone: TEL_PLACEHOLDER, // affichage du numéro
  phoneDisplay: TEL_PLACEHOLDER, // alias d'affichage (compat composants)
  whatsapp: WHATSAPP_PLACEHOLDER,
  email: EMAIL_DEVIS_PLACEHOLDER,

  legal: {
    company: "", // raison sociale
    siret: "",
    host: "", // hébergeur
    address: "", // adresse postale (optionnel)
  },
};

export type SiteConfig = typeof siteConfig;

/* -------------------------------------------------------------------------- */
/*  Helpers de liens — renvoient "#" tant que la donnée est vide              */
/* -------------------------------------------------------------------------- */

/** Nettoie un numéro pour un href tel: (ne garde que chiffres et +). */
function dialDigits(value: string): string {
  return value.replace(/[^\d+]/g, "");
}

/** Lien d'appel téléphonique, ou "#" si le numéro n'est pas renseigné. */
export function telHref(): string {
  const dial = dialDigits(siteConfig.phone);
  return dial ? `tel:${dial}` : "#";
}

/** Lien WhatsApp, ou "#" si le numéro n'est pas renseigné. */
export function whatsappHref(message?: string): string {
  const digits = siteConfig.whatsapp.replace(/[^\d]/g, "");
  if (!digits) return "#";
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Lien mailto, ou "#" si l'email n'est pas renseigné. */
export function emailHref(): string {
  return siteConfig.email ? `mailto:${siteConfig.email}` : "#";
}

/** Indique si un CTA est actif (donnée présente) — utile pour aria/attrs/UX. */
export const ctaEnabled = {
  phone: Boolean(dialDigits(siteConfig.phone)),
  whatsapp: Boolean(siteConfig.whatsapp.replace(/[^\d]/g, "")),
  email: Boolean(siteConfig.email),
};
