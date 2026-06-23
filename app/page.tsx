import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  getFamilies,
  getFeaturedProduct,
  getProductsByFamily,
} from "@/lib/products";
import {
  CtaGroup,
  DevisButton,
  WhatsAppButton,
  CallButton,
} from "@/components/CtaButtons";
import FamilyCard from "@/components/FamilyCard";
import DevisForm from "@/components/DevisForm";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import HowItWorks from "@/components/HowItWorks";
import Faq from "@/components/Faq";
import { BLUR_GRAY } from "@/lib/images";
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

const coneArguments = [
  "Prix optimisé grâce à l'achat direct fabricant",
  "Fabrication directe, sans intermédiaire",
  "Personnalisation possible (couleur, marquage)",
  "Conçu pour un usage professionnel intensif",
];

const clients = [
  "Travaux publics",
  "Signalisation routière",
  "Revendeurs",
  "Collectivités",
  "Événementiel",
];

// Réassurance hero — reprend des arguments du cahier (non inventés).
const heroReassurance = [
  "Contact direct fabricants",
  "50+ références",
  "Réponse rapide",
];

export default function HomePage() {
  const families = getFamilies();
  const cone = getFeaturedProduct();
  const conesCount = getProductsByFamily("cones-et-balisage").length;

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
              Fournisseur de matériel de chantier et de signalisation pour les
              professionnels
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/90">
              Une gamme complète de solutions pour le balisage, la sécurisation
              et l&apos;aménagement des chantiers.
            </p>
            <CtaGroup className="mt-8" tone="onDark" />

            {/* Bande de réassurance */}
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
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

      {/* 2 — POURQUOI CHOISIR MAPESIA */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-content">
          <div className="mx-auto max-w-2xl text-center">
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

      {/* 3 — PRODUIT PHARE : LE CÔNE */}
      <section className="bg-surface py-16 lg:py-24">
        <div className="container-content grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-sm">
            <Image
              src={cone.image}
              alt={`${cone.name} — cône de signalisation MAPESIA`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={BLUR_GRAY}
            />
          </div>
          <div>
            <p className="font-heading font-semibold text-accent-text">
              Notre produit phare
            </p>
            <h2 className="mt-2 text-3xl font-bold lg:text-4xl">
              Notre cône de signalisation
            </h2>
            <p className="mt-4 text-lg text-primary/80">
              Le cône de signalisation est au cœur de notre offre : robuste,
              haute visibilité et disponible en plusieurs versions pour tous vos
              besoins de balisage.
            </p>
            <ul className="mt-6 space-y-3">
              {coneArguments.map((arg) => (
                <li key={arg} className="flex items-start gap-3 text-base">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                    <CheckIcon className="h-4 w-4" />
                  </span>
                  <span className="text-primary/90">{arg}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <DevisButton produitSlug={cone.slug} variant="cta" />
              <Link
                href="/notre-gamme/cones-et-balisage"
                className="btn-outline"
              >
                Voir tous nos cônes ({conesCount})
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 — NOTRE GAMME */}
      <section className="bg-white py-16 lg:py-24">
        <div className="container-content">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold lg:text-4xl">Notre gamme</h2>
              <p className="mt-4 text-lg text-primary/80">
                Neuf familles de produits pour équiper et sécuriser vos
                chantiers, de A à Z.
              </p>
            </div>
            <Link
              href="/notre-gamme"
              className="inline-flex items-center gap-2 font-heading font-semibold text-accent-text"
            >
              Voir toute la gamme
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {families.map((family, i) => (
              <Reveal key={family.slug} className="h-full" delayMs={(i % 3) * 70}>
                <FamilyCard family={family} priority={i < 3} />
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
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {clients.map((c) => (
              <li
                key={c}
                className="rounded-full bg-white/10 px-6 py-3 font-heading text-lg font-medium"
              >
                {c}
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
