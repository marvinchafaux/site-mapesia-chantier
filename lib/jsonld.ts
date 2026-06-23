import { siteConfig } from "./site-config";
import type { Family, Product } from "./products";

const base = siteConfig.url.replace(/\/$/, "");

/** Organisation — schéma global du site. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: siteConfig.name,
    url: base,
    description: siteConfig.description,
    logo: `${base}/icon.png`,
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
  };
}

/** LocalBusiness — pertinent pour un fournisseur pro. */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${base}/#localbusiness`,
    name: siteConfig.name,
    url: base,
    description: siteConfig.description,
    image: `${base}/images/og/mapesia-og.jpg`,
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    ...(siteConfig.legal.address
      ? { address: siteConfig.legal.address }
      : {}),
  };
}

/** Product — un produit (sans offre/prix : site lead-gen). */
export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: `${base}${product.image}`,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    category: product.familySlug,
  };
}

/** FAQPage structurée (rich results Google). */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

/** Fil d'Ariane structuré (SEO). */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${base}${it.path}`,
    })),
  };
}

/** ItemList de Product pour une page famille. */
export function familyProductsSchema(family: Family, products: Product[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: family.name,
    description: family.description,
    url: `${base}/notre-gamme/${family.slug}`,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        description: p.shortDescription,
        image: `${base}${p.image}`,
        url: `${base}/notre-gamme/${family.slug}`,
        brand: { "@type": "Brand", name: siteConfig.name },
      },
    })),
  };
}
