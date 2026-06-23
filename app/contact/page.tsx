import type { Metadata } from "next";
import { Suspense } from "react";
import {
  siteConfig,
  telHref,
  emailHref,
  whatsappHref,
  ctaEnabled,
} from "@/lib/site-config";
import DevisForm from "@/components/DevisForm";
import { PhoneIcon, MailIcon, WhatsAppIcon } from "@/components/Icons";
import { pageOpenGraph } from "@/lib/seo";

const description =
  "Contactez MAPESIA pour votre matériel de chantier et de signalisation : téléphone, email, WhatsApp ou formulaire de demande de devis.";

export const metadata: Metadata = {
  title: "Contact — Demandez votre devis",
  description,
  alternates: { canonical: "/contact" },
  ...pageOpenGraph({
    title: "Contact — Demandez votre devis",
    description,
    path: "/contact",
  }),
};

export default function ContactPage() {
  const coords = [
    {
      icon: PhoneIcon,
      label: "Téléphone",
      value: siteConfig.phoneDisplay || "À venir",
      href: ctaEnabled.phone ? telHref() : undefined,
      external: false,
    },
    {
      icon: MailIcon,
      label: "Email",
      value: siteConfig.email || "À venir",
      href: ctaEnabled.email ? emailHref() : undefined,
      external: false,
    },
    {
      icon: WhatsAppIcon,
      label: "WhatsApp",
      value: "Discuter sur WhatsApp",
      href: ctaEnabled.whatsapp ? whatsappHref() : undefined,
      external: ctaEnabled.whatsapp,
    },
  ];

  return (
    <main>
      <section className="bg-gradient-to-br from-primary to-primary-dark py-16 text-white lg:py-20">
        <div className="container-content">
          <p className="font-heading font-semibold text-white/80">Contact</p>
          <h1 className="mt-2 text-h1 text-white lg:text-h1-lg">
            Demandez votre devis
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90">
            Une question, un besoin précis ? Remplissez le formulaire ou
            contactez-nous directement, nous vous répondons rapidement.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-24">
        <div className="container-content grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          {/* Coordonnées */}
          <div>
            <h2 className="text-2xl font-bold">Nos coordonnées</h2>
            <ul className="mt-6 space-y-4">
              {coords.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    aria-disabled={!c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 rounded-2xl border border-black/5 bg-surface p-5 transition-colors hover:border-primary/20"
                  >
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                      <c.icon className="h-6 w-6" />
                    </span>
                    <span>
                      <span className="block font-heading text-base font-semibold text-primary">
                        {c.label}
                      </span>
                      <span className="block break-all text-base text-primary/80">
                        {c.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Formulaire */}
          <div className="rounded-3xl border border-black/5 bg-surface p-7 lg:p-9">
            <h2 className="text-2xl font-bold">Formulaire de devis</h2>
            <p className="mt-2 text-base text-primary/80">
              Les champs marqués d&apos;un{" "}
              <span className="text-accent-text">*</span> sont obligatoires.
            </p>
            <div className="mt-6">
              <Suspense fallback={null}>
                <DevisForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
