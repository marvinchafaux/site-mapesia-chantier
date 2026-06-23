import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Politique de confidentialité et protection des données personnelles — ${siteConfig.name}.`,
  alternates: { canonical: "/politique-de-confidentialite" },
  robots: { index: false },
};

const f = (v: string) => v || "À compléter";

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="bg-white py-16 lg:py-24">
      <div className="container-content max-w-3xl">
        <h1 className="text-h1 lg:text-h1-lg">Politique de confidentialité</h1>

        <div className="mt-10 space-y-10 text-lg text-primary/85">
          <section>
            <h2 className="text-2xl font-bold text-primary">
              Données collectées
            </h2>
            <p className="mt-4">
              Lorsque vous utilisez notre formulaire de demande de devis, nous
              collectons les informations que vous renseignez : nom, société,
              téléphone, email et le contenu de votre message. Ces données sont
              nécessaires au traitement de votre demande.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary">
              Finalité du traitement
            </h2>
            <p className="mt-4">
              Vos données sont utilisées uniquement pour répondre à votre
              demande de devis et assurer le suivi commercial associé. Elles ne
              sont jamais revendues à des tiers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary">
              Durée de conservation
            </h2>
            <p className="mt-4">
              Vos données sont conservées le temps nécessaire au traitement de
              votre demande et à la relation commerciale, puis archivées ou
              supprimées conformément à la réglementation en vigueur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary">Vos droits</h2>
            <p className="mt-4">
              Conformément au Règlement Général sur la Protection des Données
              (RGPD), vous disposez d&apos;un droit d&apos;accès, de
              rectification, d&apos;effacement, de limitation et
              d&apos;opposition concernant vos données personnelles. Pour
              exercer ces droits, contactez-nous à l&apos;adresse :{" "}
              {f(siteConfig.email)}.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary">Cookies</h2>
            <p className="mt-4">
              Ce site utilise des outils de mesure d&apos;audience afin
              d&apos;améliorer votre expérience et de suivre la fréquentation du
              site. Aucune donnée n&apos;est utilisée à des fins publicitaires.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
