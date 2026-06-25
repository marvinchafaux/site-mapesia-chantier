import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  families,
  getFamilies,
  getFamilyBySlug,
  getProductsByFamily,
} from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { CtaGroup } from "@/components/CtaButtons";
import Reveal from "@/components/Reveal";
import { ArrowRightIcon } from "@/components/Icons";
import JsonLd from "@/components/JsonLd";
import { familyProductsSchema, breadcrumbSchema } from "@/lib/jsonld";
import { pageOpenGraph } from "@/lib/seo";

type Params = { famille: string };

// Génère les 9 pages familles au build.
export function generateStaticParams(): Params[] {
  return families.map((f) => ({ famille: f.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { famille } = await params;
  const family = getFamilyBySlug(famille);
  if (!family) return { title: "Famille introuvable" };
  return {
    title: `${family.name} — Matériel de chantier`,
    description: family.description,
    alternates: { canonical: `/notre-gamme/${family.slug}` },
    ...pageOpenGraph({
      title: `${family.name} — Matériel de chantier`,
      description: family.description,
      path: `/notre-gamme/${family.slug}`,
    }),
  };
}

export default async function FamilyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { famille } = await params;
  const family = getFamilyBySlug(famille);
  if (!family) notFound();

  const products = getProductsByFamily(family.slug);
  const relatedFamilies = getFamilies()
    .filter((f) => f.slug !== family.slug)
    .slice(0, 3);

  return (
    <main>
      <JsonLd data={familyProductsSchema(family, products)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Notre gamme", path: "/notre-gamme" },
          { name: family.name, path: `/notre-gamme/${family.slug}` },
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
            <Link href="/notre-gamme" className="hover:text-primary">
              Notre gamme
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="font-medium text-primary">
            {family.name}
          </li>
        </ol>
      </nav>

      {/* Bannière */}
      <section className="bg-gradient-to-br from-primary to-primary-dark">
        <div className="container-content py-16 lg:py-20">
          <h1 className="max-w-3xl text-h1 text-white lg:text-h1-lg">
            {family.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/90">
            {family.description}
          </p>
        </div>
      </section>

      {/* Grille produits — 3 desktop / 2 tablette / 1 mobile */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-content">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <h2 className="text-3xl font-bold lg:text-4xl">
              Nos produits {family.name.toLowerCase()}
            </h2>
            <p className="text-base text-primary/70">
              {products.length} référence{products.length > 1 ? "s" : ""}
            </p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.slug} className="h-full" delayMs={(i % 3) * 70}>
                <ProductCard product={product} priority={i < 3} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Familles liées — maillage interne */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="container-content">
          <h2 className="text-3xl font-bold lg:text-4xl">
            Explorer d&apos;autres familles
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedFamilies.map((f) => (
              <li key={f.slug}>
                <Link
                  href={`/notre-gamme/${f.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-transform duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
                >
                  <span className="font-heading text-lg font-semibold text-primary">
                    {f.name}
                  </span>
                  <ArrowRightIcon className="h-5 w-5 shrink-0 text-accent-text transition-transform group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA bas de page */}
      <section className="bg-surface py-16 lg:py-20">
        <div className="container-content text-center">
          <h2 className="text-3xl font-bold lg:text-4xl">
            Besoin d&apos;un devis ou d&apos;un conseil ?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary/80">
            Contactez-nous : nous vous répondons rapidement avec une offre
            adaptée à votre besoin.
          </p>
          <CtaGroup className="mt-8 justify-center" />
          <p className="mt-8">
            <Link
              href="/notre-gamme"
              className="inline-flex items-center gap-2 font-heading font-semibold text-accent-text"
            >
              <ArrowRightIcon className="h-5 w-5 rotate-180" />
              Revenir à toute la gamme
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
