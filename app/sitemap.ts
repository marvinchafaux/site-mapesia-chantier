import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { families } from "@/lib/products";
import { cities } from "@/lib/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes = [
    "",
    "/notre-gamme",
    "/produits-sur-mesure",
    "/zones-intervention",
    "/a-propos",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const familyRoutes = families.map((f) => ({
    url: `${base}/notre-gamme/${f.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const cityRoutes = cities.map((c) => ({
    url: `${base}/zones-intervention/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...familyRoutes, ...cityRoutes];
}
