import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${siteConfig.name}.`,
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false },
};

// Repli neutre tant qu'une donnée légale n'est pas renseignée.
const f = (v: string) => v || "À compléter";

export default function MentionsLegalesPage() {
  const { legal, email, phoneDisplay } = siteConfig;

  return (
    <main className="bg-white py-16 lg:py-24">
      <div className="container-content max-w-3xl">
        <h1 className="text-h1 lg:text-h1-lg">Mentions légales</h1>

        <div className="mt-10 space-y-10 text-lg text-primary/85">
          <section>
            <h2 className="text-2xl font-bold text-primary">Éditeur du site</h2>
            <ul className="mt-4 space-y-1">
              <li>
                <strong>Raison sociale :</strong> {f(legal.company)}
              </li>
              <li>
                <strong>SIRET :</strong> {f(legal.siret)}
              </li>
              <li>
                <strong>Adresse :</strong> {f(legal.address)}
              </li>
              <li>
                <strong>Email :</strong> {f(email)}
              </li>
              <li>
                <strong>Téléphone :</strong> {f(phoneDisplay)}
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary">Hébergement</h2>
            <p className="mt-4">
              Ce site est hébergé par : {f(legal.host)}.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary">
              Propriété intellectuelle
            </h2>
            <p className="mt-4">
              L&apos;ensemble des contenus présents sur ce site (textes, images,
              logos, mise en page) est la propriété de {f(legal.company)} ou de
              ses partenaires, et est protégé par le droit de la propriété
              intellectuelle. Toute reproduction sans autorisation préalable est
              interdite.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary">Responsabilité</h2>
            <p className="mt-4">
              {siteConfig.name} s&apos;efforce d&apos;assurer l&apos;exactitude
              des informations diffusées sur ce site, sans pouvoir en garantir
              l&apos;exhaustivité. Les visuels produits sont non contractuels.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
