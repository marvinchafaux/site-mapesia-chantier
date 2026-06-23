import { howItWorks } from "@/lib/content";
import Reveal from "./Reveal";

/** Section « Comment ça marche » — 3 étapes (contenu éditable dans lib/content.ts). */
export default function HowItWorks() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-content">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold lg:text-4xl">{howItWorks.title}</h2>
          <p className="mt-4 text-lg text-primary/80">{howItWorks.intro}</p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {howItWorks.steps.map((step, i) => (
            <Reveal key={step.title} className="h-full" delayMs={(i % 3) * 80}>
              <li className="flex h-full flex-col rounded-2xl border border-black/5 bg-surface p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent font-heading text-xl font-bold text-primary">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-heading text-xl font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-base text-primary/80">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
