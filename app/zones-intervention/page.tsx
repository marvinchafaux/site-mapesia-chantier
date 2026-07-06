import type { Metadata } from "next";
import Link from "next/link";
import { getCities } from "@/lib/cities";
import { CtaGroup } from "@/components/CtaButtons";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { LocationIcon, ArrowRightIcon } from "@/components/Icons";
import { breadcrumbSchema } from "@/lib/jsonld";
import { pageOpenGraph } from "@/lib/seo";

const description =
  "MAPESIA intervient dans toute la France pour votre matériel de chantier et de signalisation. Sélectionnez votre ville pour découvrir nos services locaux.";

export const metadata: Metadata = {
  title: "Zones d'intervention — Nos villes en France",
  description,
  alternates: { canonical: "/zones-intervention" },
  ...pageOpenGraph({
    title: "Zones d'intervention — Nos villes en France",
    description,
    path: "/zones-intervention",
  }),
};

export default function ZonesInterventionPage() {
  const cities = getCities();

  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Zones d'intervention", path: "/zones-intervention" },
        ])}
      />

      {/* Bannière */}
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 text-white lg:py-20">
        <div className="container-content">
          <p className="font-heading font-semibold text-white/80">
            Zones d&apos;intervention
          </p>
          <h1 className="mt-2 text-h1 text-white lg:text-h1-lg">
            Nos villes en France
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90">
            MAPESIA intervient dans toute la France pour vos projets de matériel
            de chantier et de signalisation. Sélectionnez votre ville pour
            découvrir nos services locaux.
          </p>
        </div>
      </section>

      {/* Grille des villes */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-content">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {cities.map((city, i) => (
              <Reveal key={city.slug} className="h-full" delayMs={(i % 4) * 50}>
                <Link
                  href={`/zones-intervention/${city.slug}`}
                  className="group flex h-full items-center gap-3 rounded-2xl border border-black/5 bg-surface p-5 shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:border-primary/10 hover:shadow-lg motion-reduce:hover:translate-y-0"
                >
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-accent">
                    <LocationIcon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-heading text-lg font-semibold text-primary">
                      {city.name}
                    </span>
                    <span className="block truncate text-sm text-primary/60">
                      {city.region}
                    </span>
                  </span>
                  <ArrowRightIcon className="h-5 w-5 shrink-0 text-accent-text transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA bas de page */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="container-content text-center">
          <h2 className="text-3xl font-bold lg:text-4xl">
            Votre ville n&apos;est pas dans la liste ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary/80">
            Nous livrons partout en France. Contactez-nous : nous vous répondons
            rapidement avec une offre adaptée à votre projet.
          </p>
          <CtaGroup className="mt-8 justify-center" />
        </div>
      </section>
    </main>
  );
}
