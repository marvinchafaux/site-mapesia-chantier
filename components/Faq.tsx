import { faq } from "@/lib/content";
import { faqSchema } from "@/lib/jsonld";
import JsonLd from "./JsonLd";

/**
 * Section FAQ — accordéon natif <details>/<summary> (accessible, sans JS).
 * Le balisage SEO FAQPage n'est émis que lorsque le contenu est validé
 * (faq.isPlaceholder === false dans lib/content.ts).
 */
export default function Faq() {
  return (
    <section className="bg-surface py-16 lg:py-24">
      {!faq.isPlaceholder && <JsonLd data={faqSchema(faq.items)} />}
      <div className="container-content max-w-3xl">
        <h2 className="text-3xl font-bold lg:text-4xl">{faq.title}</h2>
        <div className="mt-8 space-y-4">
          {faq.items.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-black/5 bg-white p-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg font-semibold text-primary">
                {item.q}
                <span
                  aria-hidden
                  className="shrink-0 text-2xl leading-none text-accent-text transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-base text-primary/80">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
