import type { Metadata } from "next";
import { siteConfig } from "./site-config";

const base = siteConfig.url.replace(/\/$/, "");

/**
 * Construit un bloc Open Graph + Twitter par page, en conservant l'image OG
 * globale (Next ne fusionne pas les images si on redéfinit openGraph).
 */
export function pageOpenGraph({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const image = {
    url: "/images/og/mapesia-og.jpg",
    width: 1200,
    height: 630,
    alt: `${siteConfig.name} — ${title}`,
  };
  return {
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: siteConfig.name,
      title,
      description,
      url: `${base}${path}`,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image.url],
    },
  };
}
