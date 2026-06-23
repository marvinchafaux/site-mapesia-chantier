import type { Metadata } from "next";
import Link from "next/link";
import { CtaGroup } from "@/components/CtaButtons";
import { CheckIcon } from "@/components/Icons";
import { pageOpenGraph } from "@/lib/seo";

const description =
  "Logos, couleurs, marquages, produits hors catalogue, développement spécifique : MAPESIA conçoit le matériel de chantier et de signalisation adapté à votre besoin.";

export const metadata: Metadata = {
  title: "Produits sur mesure — Personnalisation et solutions spécifiques",
  description,
  alternates: { canonical: "/produits-sur-mesure" },
  ...pageOpenGraph({
    title: "Produits sur mesure — Personnalisation et solutions spécifiques",
    description,
    path: "/produits-sur-mesure",
  }),
};

const prestations = [
  {
    title: "Logos et marquages",
    text: "Personnalisez vos cônes, barrières et balises à votre image (logo, raison sociale).",
  },
  {
    title: "Couleurs personnalisées",
    text: "Déclinez votre matériel dans les coloris adaptés à votre charte ou à votre signalétique.",
  },
  {
    title: "Produits hors catalogue",
    text: "Vous ne trouvez pas un article ? Nous le sourçons auprès de nos fabricants partenaires.",
  },
  {
    title: "Développement spécifique",
    text: "Pour un besoin unique, nous concevons une solution dédiée avec nos ateliers.",
  },
  {
    title: "Recherche de solutions",
    text: "Décrivez votre contrainte, nous trouvons l'équipement le plus pertinent et économique.",
  },
  {
    title: "Accompagnement projet",
    text: "Un interlocuteur unique vous suit du cahier des charges à la livraison.",
  },
];

export default function ProduitsSurMesurePage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 text-white lg:py-20">
        <div className="container-content">
          <p className="font-heading font-semibold text-white/80">
            Sur mesure
          </p>
          <h1 className="mt-2 text-h1 text-white lg:text-h1-lg">
            Des produits adaptés à votre besoin
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90">
            Au-delà de notre gamme standard, nous personnalisons et développons
            le matériel de chantier et de signalisation qui correspond
            exactement à votre activité.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="container-content grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {prestations.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-black/5 bg-surface p-7"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
                <CheckIcon className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-heading text-xl font-semibold">
                {p.title}
              </h2>
              <p className="mt-2 text-base text-primary/80">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16 lg:py-20">
        <div className="container-content text-center">
          <h2 className="text-3xl font-bold lg:text-4xl">
            Un projet en tête ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary/80">
            Parlez-nous de votre besoin : nous étudions votre demande et vous
            proposons la meilleure solution.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/contact" className="btn-cta">
              Demander une étude de projet
            </Link>
          </div>
          <CtaGroup className="mt-6 justify-center" />
        </div>
      </section>
    </main>
  );
}
