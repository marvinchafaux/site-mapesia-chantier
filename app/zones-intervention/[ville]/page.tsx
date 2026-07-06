import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cities, getCities, getCityBySlug, cityTelHref } from "@/lib/cities";
import HowItWorks from "@/components/HowItWorks";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { PhoneIcon, LocationIcon, ArrowRightIcon } from "@/components/Icons";
import { breadcrumbSchema } from "@/lib/jsonld";
import { pageOpenGraph } from "@/lib/seo";

type Params = { ville: string };

// Génère les 21 pages villes au build.
export function generateStaticParams(): Params[] {
  return cities.map((c) => ({ ville: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { ville } = await params;
  const city = getCityBySlug(ville);
  if (!city) return { title: "Ville introuvable" };
  const title = `Matériel de chantier et signalisation à ${city.name}`;
  return {
    title,
    description: city.intro,
    alternates: { canonical: `/zones-intervention/${city.slug}` },
    ...pageOpenGraph({
      title,
      description: city.intro,
      path: `/zones-intervention/${city.slug}`,
    }),
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { ville } = await params;
  const city = getCityBySlug(ville);
  if (!city) notFound();

  const hasPhone = city.phone.trim().length > 0;
  const hasAddress = city.address.trim().length > 0;
  // Ville avec des données propres (franchise) — sinon fiche générique Mapesia.
  const isCustomCity = Boolean(city.businessName);

  const nearbyCities = getCities()
    .filter((c) => c.slug !== city.slug)
    .slice(0, 6);

  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Zones d'intervention", path: "/zones-intervention" },
          { name: city.name, path: `/zones-intervention/${city.slug}` },
        ])}
      />

      {/* Fil d'Ariane */}
      <nav
        aria-label="Fil d'Ariane"
        className="border-b border-black/5 bg-surface"
      >
        <ol className="container-content flex flex-wrap items-center gap-2 py-4 text-base text-primary/70">
          <li>
            <Link href="/" className="hover:text-primary">
              Accueil
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/zones-intervention" className="hover:text-primary">
              Zones d&apos;intervention
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-primary">
            {city.name}
          </li>
        </ol>
      </nav>

      {/* Bannière */}
      <section className="bg-gradient-to-br from-primary to-primary-dark">
        <div className="container-content py-16 lg:py-20">
          <p className="inline-flex items-center gap-2 font-heading font-semibold text-white/80">
            <LocationIcon className="h-5 w-5" />
            {city.region}
          </p>
          <h1 className="mt-3 max-w-3xl text-h1 text-white lg:text-h1-lg">
            Matériel de chantier et de signalisation à {city.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/90">{city.intro}</p>
        </div>
      </section>

      {/* Comment ça fonctionne à {city} */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-content max-w-3xl">
          <h2 className="text-3xl font-bold lg:text-4xl">
            {city.businessName ?? `Mapesia à ${city.name}`}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-primary/80">
            {city.description}
          </p>
        </div>
      </section>

      {/* Les 3 étapes (réutilisé) */}
      <HowItWorks />

      {/* Coordonnées locales */}
      <section className="bg-surface py-16 lg:py-24">
        <div className="container-content">
          <h2 className="text-3xl font-bold lg:text-4xl">
            Nous contacter à {city.name}
          </h2>
          <p className="mt-4 text-lg text-primary/80">
            Joignez directement notre équipe locale ou demandez votre devis en
            ligne.
          </p>

          <div
            className={`mt-8 grid gap-4 ${isCustomCity ? "sm:grid-cols-2" : "sm:max-w-md"}`}
          >
            {/* Téléphone */}
            <a
              href={hasPhone ? cityTelHref(city) : undefined}
              aria-disabled={!hasPhone}
              className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-colors hover:border-primary/20"
            >
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                <PhoneIcon className="h-6 w-6" />
              </span>
              <span>
                <span className="block font-heading text-base font-semibold text-primary">
                  Téléphone
                </span>
                <span className="block text-base text-primary/80">
                  {hasPhone ? city.phone : "À venir"}
                </span>
              </span>
            </a>

            {/* Adresse — uniquement pour les villes avec données propres */}
            {isCustomCity && (
              <div className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                  <LocationIcon className="h-6 w-6" />
                </span>
                <span>
                  <span className="block font-heading text-base font-semibold text-primary">
                    Adresse
                  </span>
                  <span className="block text-base text-primary/80">
                    {hasAddress ? city.address : "À venir"}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Autres villes — maillage interne */}
      <section className="bg-white py-16 lg:py-20">
        <div className="container-content">
          <h2 className="text-3xl font-bold lg:text-4xl">
            Nos autres zones d&apos;intervention
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {nearbyCities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/zones-intervention/${c.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-black/5 bg-surface p-5 shadow-sm transition-transform duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
                >
                  <span className="flex items-center gap-3">
                    <LocationIcon className="h-5 w-5 shrink-0 text-accent-text" />
                    <span className="font-heading text-lg font-semibold text-primary">
                      {c.name}
                    </span>
                  </span>
                  <ArrowRightIcon className="h-5 w-5 shrink-0 text-accent-text transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link
              href="/zones-intervention"
              className="inline-flex items-center gap-2 font-heading font-semibold text-accent-text"
            >
              <ArrowRightIcon className="h-5 w-5 rotate-180" />
              Voir toutes nos villes
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
