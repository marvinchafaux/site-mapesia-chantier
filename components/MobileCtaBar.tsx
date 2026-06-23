import Link from "next/link";
import { telHref, whatsappHref, ctaEnabled } from "@/lib/site-config";
import { PhoneIcon, WhatsAppIcon, DocumentIcon } from "./Icons";

/**
 * Barre d'actions rapides fixée en bas d'écran sur MOBILE uniquement
 * (masquée à partir de `lg`). Objectif conversion : Devis / Appeler / WhatsApp
 * toujours à portée de pouce.
 *
 * « Demander un devis » est l'action primaire (orange, plus large).
 * Appeler / WhatsApp restent inertes tant que la coordonnée n'est pas remplie.
 */
export default function MobileCtaBar() {
  const callEnabled = ctaEnabled.phone;
  const waEnabled = ctaEnabled.whatsapp;

  const itemBase =
    "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 font-heading text-base font-semibold leading-none transition-transform duration-200 active:scale-95 motion-reduce:transition-none motion-reduce:active:scale-100";

  return (
    <nav
      aria-label="Actions rapides"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] lg:hidden"
    >
      <div className="flex items-stretch">
        {/* Action primaire : Devis */}
        <Link
          href="/contact"
          aria-label="Demander un devis"
          className={`${itemBase} flex-[1.4] bg-accent text-primary`}
        >
          <DocumentIcon className="h-6 w-6" />
          Devis
        </Link>

        {/* Appeler */}
        <a
          href={callEnabled ? telHref() : undefined}
          aria-disabled={!callEnabled}
          aria-label="Appeler MAPESIA"
          className={`${itemBase} border-l border-black/10 text-primary`}
        >
          <PhoneIcon className="h-6 w-6" />
          Appeler
        </a>

        {/* WhatsApp */}
        <a
          href={waEnabled ? whatsappHref() : undefined}
          target={waEnabled ? "_blank" : undefined}
          rel={waEnabled ? "noopener noreferrer" : undefined}
          aria-disabled={!waEnabled}
          aria-label="Contacter MAPESIA sur WhatsApp"
          className={`${itemBase} border-l border-black/10 text-primary`}
        >
          <WhatsAppIcon className="h-6 w-6" />
          WhatsApp
        </a>
      </div>
    </nav>
  );
}
