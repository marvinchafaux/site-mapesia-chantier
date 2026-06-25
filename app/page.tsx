import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { getFeaturedProduct, getFamilies } from "@/lib/products";
import { WhatsAppButton, CallButton } from "@/components/CtaButtons";
import DevisForm from "@/components/DevisForm";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import HowItWorks from "@/components/HowItWorks";
import Faq from "@/components/Faq";
import { BLUR_GRAY } from "@/lib/images";
import { clients } from "@/lib/content";
import { productSchema } from "@/lib/jsonld";
import {
  FactoryIcon,
  TagIcon,
  CustomizeIcon,
  ClockIcon,
  CheckIcon,
  ArrowRightIcon,
} from "@/components/Icons";

const atouts = [
  {
    icon: FactoryIcon,
    title: "Contact direct fabricants",
    text: "Nous travaillons sans intermédiaire pour vous garantir qualité et disponibilité.",
  },
  {
    icon: TagIcon,
    title: "Tarifs optimisés pros",
    text: "Des conditions pensées pour les professionnels et les achats par volume.",
  },
  {
    icon: CustomizeIcon,
    title: "Produits personnalisables",
    text: "Couleurs, marquages, logos : adaptez le matériel à votre image.",
  },
  {
    icon: ClockIcon,
    title: "Réponse rapide",
    text: "Un interlocuteur unique qui revient vers vous sans délai sur vos devis.",
  },
];

// Réassurance hero — reprend des arguments du cahier (non inventés).
const heroReassurance = [
  "Contact direct fabricants",
  "Réponse rapide",
];

export default function HomePage() {
  const cone = getFeaturedProduct();
  const families = getFamilies();

  return (
    <main>
      <JsonLd data={productSchema(cone)} />
      {/* 1 — HERO */}
      <section className="relative isolate overflow-hidden bg-primary">
        {/* Photo de chantier pleine visibilité (LCP) */}
        <Image
          src="/images/hero/hero-chantier.jpg"
          alt="Chantier sécurisé avec cônes de signalisation MAPESIA au premier plan"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          placeholder="blur"
          blurDataURL={BLUR_GRAY}
        />
        {/* Scrims dégradés : lisibilité du texte tout en laissant voir la photo */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-primary/40"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent"
        />

        <div className="container-content relative py-20 lg:py-28">
          <div className="max-w-3xl">
            <p className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 font-heading text-base font-medium text-white ring-1 ring-inset ring-white/25">
              Matériel de chantier &amp; signalisation pour les pros
            </p>
            <h1 className="mt-5 text-h1 text-white lg:text-h1-lg">
              Fournisseur de matériel de chantier
              <br />
              et de signalisation
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/90">
              Une gamme complète de solutions pour le balisage, la sécurisation
              et l&apos;aménagement des chantiers.
            </p>
            {/* Bande de réassurance */}
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {heroReassurance.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 font-heading text-base font-medium text-white"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-primary">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      {/* 2 — NOS FAMILLES */}
      <section className="bg-surface py-10 lg:py-14">
        <div className="container-content">
          <div className="mb-7 flex items-center justify-between">
            <h2 className="text-2xl font-bold lg:text-3xl">Nos familles de produits</h2>
            <Link
              href="/notre-gamme"
              className="hidden items-center gap-1.5 font-heading text-sm font-semibold text-accent-text hover:underline sm:inline-flex"
            >
              Voir toute la gamme
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 lg:gap-4">
            {families.map((family, i) => (
              <Link
                key={family.slug}
                href={`/notre-gamme/${family.slug}`}
                className="group relative overflow-hidden rounded-xl shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-md motion-reduce:hover:translate-y-0"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary/10">
                  <Image
                    src={family.bannerImage}
                    alt={family.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    priority={i < 3}
                    placeholder="blur"
                    blurDataURL={BLUR_GRAY}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/25 to-transparent"
                  />
                  <span className="absolute inset-x-0 bottom-0 p-3 font-heading text-sm font-semibold text-white lg:p-4 lg:text-base">
                    {family.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-5 sm:hidden">
            <Link
              href="/notre-gamme"
              className="inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-accent-text hover:underline"
            >
              Voir toute la gamme
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* POURQUOI CHOISIR MAPESIA */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-content">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold lg:text-4xl">
              Pourquoi choisir MAPESIA
            </h2>
            <p className="mt-4 text-lg text-primary/80">
              Un partenaire direct pour votre matériel de chantier et votre
              signalisation.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {atouts.map((a, i) => (
              <Reveal key={a.title} className="h-full" delayMs={(i % 4) * 70}>
                <div className="h-full rounded-2xl border border-black/5 bg-surface p-7 transition-transform duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-primary">
                    <a.icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-heading text-xl font-semibold">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-base text-primary/80">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>


      {/* 5 — NOS CLIENTS */}
      <section className="bg-primary py-16 text-white lg:py-20">
        <div className="container-content text-center">
          <h2 className="text-3xl font-bold text-white lg:text-4xl">
            Ils nous font confiance
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">
            Nous accompagnons tous les professionnels du chantier et de la
            signalisation.
          </p>
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {clients.map((c) => (
              <li
                key={c.label}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-primary-light"
              >
                <Image
                  src={c.image}
                  alt={`${c.label} — secteur accompagné par MAPESIA`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={BLUR_GRAY}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent"
                />
                <span className="absolute inset-x-0 bottom-0 p-4 text-left font-heading text-lg font-semibold text-white">
                  {c.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6 — PRODUITS SUR MESURE */}
      <section className="bg-surface py-16 lg:py-24">
        <div className="container-content">
          <div className="overflow-hidden rounded-3xl bg-white p-8 shadow-sm lg:p-14">
            <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
              <div>
                <h2 className="text-3xl font-bold lg:text-4xl">
                  Produits sur mesure
                </h2>
                <p className="mt-4 text-lg text-primary/80">
                  Logos, couleurs, marquages, produits hors catalogue,
                  développement spécifique : nous concevons la solution adaptée
                  à votre besoin et à votre image.
                </p>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <Link
                  href="/produits-sur-mesure"
                  className="btn-cta w-full justify-center sm:w-auto"
                >
                  Demander une étude de projet
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 bis — COMMENT ÇA MARCHE */}
      <HowItWorks />

      {/* 6 ter — FAQ */}
      <Faq />

      {/* 7 — CONTACT RAPIDE */}
      <section className="bg-white py-16 lg:py-24" id="contact-rapide">
        <div className="container-content grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-bold lg:text-4xl">
              Demandez votre devis
            </h2>
            <p className="mt-4 text-lg text-primary/80">
              Décrivez votre besoin, nous revenons vers vous rapidement. Vous
              pouvez aussi nous joindre directement :
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <WhatsAppButton variant="outline" />
              <CallButton variant="outline" />
            </div>
          </div>
          <div className="rounded-3xl border border-black/5 bg-surface p-7 lg:p-9">
            <Suspense fallback={null}>
              <DevisForm />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
