import type { Metadata } from "next";
import { CtaGroup } from "@/components/CtaButtons";
import { CheckIcon } from "@/components/Icons";
import { pageOpenGraph } from "@/lib/seo";

const description =
  "MAPESIA, fournisseur de matériel de chantier et de signalisation pour les professionnels : travail direct avec les fabricants, tarifs optimisés, large gamme et interlocuteur unique.";

export const metadata: Metadata = {
  title: "À propos — Votre partenaire matériel de chantier",
  description,
  alternates: { canonical: "/a-propos" },
  ...pageOpenGraph({
    title: "À propos — Votre partenaire matériel de chantier",
    description,
    path: "/a-propos",
  }),
};

const valeurs = [
  "Professionnalisme",
  "Réactivité",
  "Simplicité",
  "Accompagnement",
  "Esprit de partenariat",
];

const atouts = [
  {
    title: "Travail direct avec les fabricants",
    text: "Pas d'intermédiaire : nous garantissons qualité, disponibilité et conseil de première main.",
  },
  {
    title: "Tarifs optimisés",
    text: "Des conditions pensées pour les professionnels, du petit chantier au gros volume.",
  },
  {
    title: "Personnalisation",
    text: "Couleurs, marquages, logos : votre matériel à votre image.",
  },
  {
    title: "Large gamme — 50+ références",
    text: "Cônes, barrières, signalisation lumineuse, balises, ralentisseurs et plus encore.",
  },
  {
    title: "Interlocuteur unique",
    text: "Un seul contact qui suit vos demandes du devis à la livraison.",
  },
];

export default function AProposPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 text-white lg:py-20">
        <div className="container-content">
          <p className="font-heading font-semibold text-white/80">À propos</p>
          <h1 className="mt-2 text-h1 text-white lg:text-h1-lg">
            Votre partenaire matériel de chantier
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90">
            MAPESIA accompagne les professionnels du BTP, des travaux publics,
            de la voirie et les collectivités avec une gamme complète de matériel
            de chantier et de signalisation.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="container-content max-w-3xl">
          <h2 className="text-3xl font-bold lg:text-4xl">Qui sommes-nous</h2>
          <div className="mt-6 space-y-5 text-lg text-primary/80">
            <p>
              MAPESIA est un fournisseur spécialisé dans le matériel de chantier
              et la signalisation pour les professionnels. Notre métier : vous
              proposer le bon équipement, au bon prix, avec un service simple et
              réactif.
            </p>
            <p>
              En travaillant en direct avec les fabricants, nous maîtrisons la
              qualité de nos produits et optimisons nos tarifs pour vous offrir
              un excellent rapport qualité-prix, sur des références standard
              comme sur des produits personnalisés.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 lg:py-24">
        <div className="container-content">
          <h2 className="text-3xl font-bold lg:text-4xl">Nos atouts</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {atouts.map((a) => (
              <div
                key={a.title}
                className="rounded-2xl border border-black/5 bg-white p-7"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary">
                  <CheckIcon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold">
                  {a.title}
                </h3>
                <p className="mt-2 text-base text-primary/80">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="container-content">
          <h2 className="text-3xl font-bold lg:text-4xl">Nos valeurs</h2>
          <ul className="mt-8 flex flex-wrap gap-3">
            {valeurs.map((v) => (
              <li
                key={v}
                className="rounded-full bg-surface px-6 py-3 font-heading text-lg font-medium text-primary"
              >
                {v}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-primary py-16 text-white lg:py-20">
        <div className="container-content text-center">
          <h2 className="text-3xl font-bold text-white lg:text-4xl">
            Travaillons ensemble
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
            Demandez votre devis ou contactez directement votre interlocuteur
            MAPESIA.
          </p>
          <CtaGroup className="mt-8 justify-center" tone="onDark" />
        </div>
      </section>
    </main>
  );
}
