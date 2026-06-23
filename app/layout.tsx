import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/lib/site-config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import JsonLd from "@/components/JsonLd";
import { organizationSchema, localBusinessSchema } from "@/lib/jsonld";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Matériel de chantier et de signalisation`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "matériel de chantier",
    "fournisseur matériel de chantier",
    "cône de signalisation",
    "barrière de chantier",
    "balisage chantier",
    "matériel TP",
    "équipement de chantier",
    "signalisation chantier",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Matériel de chantier et de signalisation`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [
      {
        url: "/images/og/mapesia-og.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Matériel de chantier et de signalisation`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Matériel de chantier et de signalisation`,
    description: siteConfig.description,
    images: ["/images/og/mapesia-og.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${poppins.variable} ${inter.variable}`}>
      <head>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={localBusinessSchema()} />
        {/* Sans JS : le contenu animé reste visible. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-screen flex-col">
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu
        </a>
        <Header />
        <div id="contenu" className="flex-1">
          {children}
        </div>
        <Footer />
        {/* Espaceur mobile : évite que la barre CTA fixe masque le bas du footer. */}
        <div aria-hidden className="h-[72px] lg:hidden" />
        <MobileCtaBar />
        <Analytics />
      </body>
    </html>
  );
}
