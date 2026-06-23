import type { Metadata } from "next";
import { getFamilies } from "@/lib/products";
import FamilyCard from "@/components/FamilyCard";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/jsonld";
import { pageOpenGraph } from "@/lib/seo";

const description =
  "Découvrez les 9 familles de matériel MAPESIA : cônes et balisage, barrières de chantier, signalisation lumineuse, ralentisseurs, balises, séparateurs et plus.";

export const metadata: Metadata = {
  title: "Notre gamme — Matériel de chantier et de signalisation",
  description,
  alternates: { canonical: "/notre-gamme" },
  ...pageOpenGraph({
    title: "Notre gamme — Matériel de chantier et de signalisation",
    description,
    path: "/notre-gamme",
  }),
};

export default function NotreGammePage() {
  const families = getFamilies();

  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Notre gamme", path: "/notre-gamme" },
        ])}
      />
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 text-white lg:py-20">
        <div className="container-content">
          <p className="font-heading font-semibold text-white/80">Notre gamme</p>
          <h1 className="mt-2 text-h1 text-white lg:text-h1-lg">
            Tout le matériel de chantier et de signalisation
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90">
            Neuf familles de produits pour baliser, sécuriser et aménager vos
            chantiers. Sélectionnez une famille pour découvrir les produits et
            demander votre devis.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="container-content grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {families.map((family, i) => (
            <Reveal key={family.slug} className="h-full" delayMs={(i % 3) * 70}>
              <FamilyCard family={family} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  );
}
