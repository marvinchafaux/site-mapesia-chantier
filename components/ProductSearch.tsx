"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { searchCatalog, getFamilyBySlug } from "@/lib/products";
import { SearchIcon } from "./Icons";

/**
 * Barre de recherche produit (par référence ou mot-clé).
 * - Suggestions en direct (familles + produits), tolérantes aux accents.
 * - Entrée / clic loupe → page de résultats /recherche?q=...
 * - `size` : "sm" (header) ou "lg" (panneau / page).
 */
type Suggestion = {
  type: "family" | "product";
  label: string;
  sub?: string;
  href: string;
};

export default function ProductSearch({
  size = "sm",
  autoFocus = false,
  initialQuery = "",
  onNavigate,
}: {
  size?: "sm" | "lg";
  autoFocus?: boolean;
  initialQuery?: string;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  // Construit les suggestions (max 7).
  const { families, products } = searchCatalog(query);
  const suggestions: Suggestion[] = [
    ...families.slice(0, 3).map((f) => ({
      type: "family" as const,
      label: f.name,
      sub: "Catégorie",
      href: `/notre-gamme/${f.slug}`,
    })),
    ...products.slice(0, 6).map((p) => ({
      type: "product" as const,
      label: p.name,
      sub: getFamilyBySlug(p.familySlug)?.name,
      href: `/recherche?q=${encodeURIComponent(p.name)}`,
    })),
  ].slice(0, 7);

  const showList = open && query.trim().length >= 1 && suggestions.length > 0;

  // Fermeture au clic extérieur.
  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function goToResults() {
    const q = query.trim();
    if (!q) return;
    setOpen(false);
    onNavigate?.();
    router.push(`/recherche?q=${encodeURIComponent(q)}`);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    goToResults();
  }

  const inputSize =
    size === "lg" ? "h-14 text-lg" : "h-11 text-base";
  const btnSize = size === "lg" ? "w-14" : "w-11";

  return (
    <div ref={rootRef} className="relative w-full">
      <form onSubmit={handleSubmit} role="search" className="flex">
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
          autoFocus={autoFocus}
          aria-label="Rechercher un produit par référence ou mot-clé"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          placeholder="Rechercher par référence ou mot-clé"
          className={`${inputSize} w-full rounded-l-lg border-2 border-r-0 border-primary/20 bg-white px-4 text-primary placeholder:text-primary/40 focus:border-primary focus:outline-none`}
        />
        <button
          type="submit"
          aria-label="Lancer la recherche"
          className={`${btnSize} flex shrink-0 items-center justify-center rounded-r-lg bg-accent text-primary transition-colors hover:bg-accent-dark`}
        >
          <SearchIcon className={size === "lg" ? "h-6 w-6" : "h-5 w-5"} />
        </button>
      </form>

      {showList && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-black/5 bg-white py-2 shadow-lg"
        >
          {suggestions.map((s) => (
            <li key={`${s.type}-${s.href}-${s.label}`} role="option" aria-selected={false}>
              <Link
                href={s.href}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className="flex items-center justify-between gap-3 px-4 py-2.5 text-base text-primary transition-colors hover:bg-surface"
              >
                <span className="truncate">{s.label}</span>
                {s.sub && (
                  <span className="shrink-0 text-sm text-primary/50">
                    {s.sub}
                  </span>
                )}
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={goToResults}
              className="mt-1 w-full px-4 py-2.5 text-left font-heading text-base font-semibold text-accent-text transition-colors hover:bg-surface"
            >
              Voir tous les résultats →
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
