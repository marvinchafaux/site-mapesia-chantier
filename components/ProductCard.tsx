import Image from "next/image";
import type { Product } from "@/lib/products";
import { BLUR_GRAY } from "@/lib/images";
import { DevisButton } from "./CtaButtons";

/**
 * Carte produit — photo, nom, description courte, bouton « Demander un devis »
 * qui pré-remplit le formulaire pour ce produit (?produit=<slug>).
 */
export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:border-primary/10 hover:shadow-lg motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={priority}
          placeholder="blur"
          blurDataURL={BLUR_GRAY}
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-xl font-semibold text-primary">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-base text-primary/80">
          {product.shortDescription}
        </p>
        <DevisButton
          produitSlug={product.slug}
          variant="cta"
          className="mt-5 w-full"
        />
      </div>
    </article>
  );
}
