"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { searchCatalog } from "@/lib/products";
import ProductCard from "./ProductCard";
import ProductSearch from "./ProductSearch";
import { DevisButton, CtaGroup } from "./CtaButtons";
import { ArrowRightIcon } from "./Icons";

export default function SearchResults() {
  const q = useSearchParams().get("q")?.trim() ?? "";
  const { products, families } = searchCatalog(q);
  const total = products.length + families.length;

  return (
    <div className="container-content">
      <h1 className="text-h1 lg:text-h1-lg">Recherche</h1>

      <div className="mt-6 max-w-2xl">
        <ProductSearch size="lg" initialQuery={q} />
      </div>

      {q === "" ? (
        <p className="mt-8 text-lg text-primary/80">
          Saisissez une référence ou un mot-clé pour trouver un produit.
        </p>
      ) : (
        <p className="mt-8 text-lg text-primary/80">
          {total === 0
            ? `Aucun résultat pour « ${q} ».`
            : `${total} résultat${total > 1 ? "s" : ""} pour « ${q} ».`}
        </p>
      )}

      {/* Familles correspondantes */}
      {families.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Catégories</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {families.map((f) => (
              <li key={f.slug}>
                <Link
                  href={`/notre-gamme/${f.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white px-5 py-2.5 font-heading text-base font-medium text-primary transition-colors hover:bg-surface"
                >
                  {f.name}
                  <ArrowRightIcon className="h-4 w-4 text-accent-text" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Produits correspondants */}
      {products.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold">Produits</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Aucun résultat → réassurance + CTA */}
      {q !== "" && total === 0 && (
        <div className="mt-10 rounded-2xl border border-black/5 bg-surface p-8">
          <p className="text-lg text-primary/80">
            Vous ne trouvez pas votre produit ? Nous proposons aussi des
            solutions sur mesure et plus de 50 références. Décrivez votre besoin,
            nous vous répondons rapidement.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <DevisButton variant="cta" />
            <Link href="/notre-gamme" className="btn-outline">
              Parcourir toute la gamme
            </Link>
          </div>
        </div>
      )}

      {/* CTA bas de page quand il y a des résultats */}
      {q !== "" && total > 0 && (
        <div className="mt-16 rounded-2xl bg-primary p-8 text-center text-white lg:p-12">
          <h2 className="text-2xl font-bold text-white lg:text-3xl">
            Besoin d&apos;un devis ?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-lg text-white/85">
            Contactez-nous, nous revenons vers vous rapidement.
          </p>
          <CtaGroup className="mt-6 justify-center" tone="onDark" />
        </div>
      )}
    </div>
  );
}
