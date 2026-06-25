import Link from "next/link";
import {
  siteConfig,
  telHref,
  emailHref,
  whatsappHref,
  ctaEnabled,
} from "@/lib/site-config";
import { getFamilies } from "@/lib/products";
import { PhoneIcon, MailIcon, WhatsAppIcon } from "./Icons";

export default function Footer() {
  const year = new Date().getFullYear();
  const families = getFamilies();

  return (
    <footer className="mt-20 bg-primary text-white">
      <div className="container-content grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Marque */}
        <div>
          <p className="font-heading text-2xl font-bold">{siteConfig.name}</p>
          <p className="mt-3 max-w-xs text-base text-white/80">
            Fournisseur de matériel de chantier et de signalisation.
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label="Pied de page — navigation">
          <p className="font-heading text-lg font-semibold">Navigation</p>
          <ul className="mt-4 space-y-2 text-white/80">
            <li>
              <Link href="/notre-gamme" className="hover:text-white">
                Notre gamme
              </Link>
            </li>
            <li>
              <Link href="/produits-sur-mesure" className="hover:text-white">
                Produits sur mesure
              </Link>
            </li>
            <li>
              <Link href="/a-propos" className="hover:text-white">
                À propos
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Gamme */}
        <nav aria-label="Pied de page — gamme">
          <p className="font-heading text-lg font-semibold">Nos familles</p>
          <ul className="mt-4 space-y-2 text-white/80">
            {families.slice(0, 5).map((f) => (
              <li key={f.slug}>
                <Link
                  href={`/notre-gamme/${f.slug}`}
                  className="hover:text-white"
                >
                  {f.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Coordonnées */}
        <div>
          <p className="font-heading text-lg font-semibold">Coordonnées</p>
          <ul className="mt-4 space-y-3 text-white/80">
            <li>
              <a
                href={ctaEnabled.phone ? telHref() : undefined}
                aria-disabled={!ctaEnabled.phone}
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <PhoneIcon className="h-5 w-5 shrink-0" />
                {siteConfig.phoneDisplay || "Téléphone à venir"}
              </a>
            </li>
            <li>
              <a
                href={ctaEnabled.email ? emailHref() : undefined}
                aria-disabled={!ctaEnabled.email}
                className="inline-flex items-center gap-2 break-all hover:text-white"
              >
                <MailIcon className="h-5 w-5 shrink-0" />
                {siteConfig.email || "Email à venir"}
              </a>
            </li>
            <li>
              <a
                href={ctaEnabled.whatsapp ? whatsappHref() : undefined}
                target={ctaEnabled.whatsapp ? "_blank" : undefined}
                rel={ctaEnabled.whatsapp ? "noopener noreferrer" : undefined}
                aria-disabled={!ctaEnabled.whatsapp}
                className="inline-flex items-center gap-2 hover:text-white"
              >
                <WhatsAppIcon className="h-5 w-5 shrink-0" />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Barre légale */}
      <div className="border-t border-white/15">
        <div className="container-content flex flex-col gap-3 py-6 text-base text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Tous droits réservés.
          </p>
          <nav aria-label="Liens légaux" className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/mentions-legales" className="hover:text-white">
              Mentions légales
            </Link>
            <Link
              href="/politique-de-confidentialite"
              className="hover:text-white"
            >
              Politique de confidentialité
            </Link>
            <Link href="/contact" className="hover:text-white">
              Coordonnées
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
