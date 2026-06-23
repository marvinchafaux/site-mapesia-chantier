import Image from "next/image";
import Link from "next/link";
import { type Family, getProductsByFamily } from "@/lib/products";
import { BLUR_GRAY } from "@/lib/images";
import { ArrowRightIcon } from "./Icons";

/**
 * Carte famille — photo, titre, courte description, lien « Découvrir la gamme ».
 */
export default function FamilyCard({
  family,
  priority = false,
}: {
  family: Family;
  priority?: boolean;
}) {
  const count = getProductsByFamily(family.slug).length;

  return (
    <Link
      href={`/notre-gamme/${family.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:border-primary/10 hover:shadow-lg motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
        <Image
          src={family.bannerImage}
          alt={family.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={priority}
          placeholder="blur"
          blurDataURL={BLUR_GRAY}
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 font-heading text-sm font-semibold text-primary shadow-sm">
          {count} produit{count > 1 ? "s" : ""}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-heading text-xl font-semibold text-primary">
          {family.name}
        </h3>
        <p className="mt-2 flex-1 text-base text-primary/80">
          {family.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 font-heading font-semibold text-accent-text">
          Découvrir la gamme
          <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
