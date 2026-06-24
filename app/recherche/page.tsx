import type { Metadata } from "next";
import { Suspense } from "react";
import SearchResults from "@/components/SearchResults";

export const metadata: Metadata = {
  title: "Recherche",
  description:
    "Recherchez un produit MAPESIA par référence ou mot-clé : cônes, barrières, signalisation lumineuse, balises et plus.",
  alternates: { canonical: "/recherche" },
  // Page de résultats : non indexée (évite le contenu dupliqué/SEO inutile).
  robots: { index: false, follow: true },
};

export default function RecherchePage() {
  return (
    <main className="bg-white py-12 lg:py-16">
      <Suspense fallback={null}>
        <SearchResults />
      </Suspense>
    </main>
  );
}
