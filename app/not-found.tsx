import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";

export default function NotFound() {
  return (
    <main className="bg-white">
      <div className="container-content flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-heading text-6xl font-bold text-accent-text">404</p>
        <h1 className="mt-4 text-h1">Page introuvable</h1>
        <p className="mt-4 max-w-xl text-lg text-primary/80">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
          Retrouvez tout notre matériel de chantier et de signalisation depuis
          l&apos;accueil ou notre gamme.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-cta">
            Retour à l&apos;accueil
          </Link>
          <Link href="/notre-gamme" className="btn-outline">
            Voir notre gamme
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
