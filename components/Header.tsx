"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { DevisButton } from "./CtaButtons";
import { MenuIcon, CloseIcon } from "./Icons";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/notre-gamme", label: "Notre gamme" },
  { href: "/produits-sur-mesure", label: "Produits sur mesure" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Ferme le menu mobile à chaque changement de page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="container-content flex h-20 items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="font-heading text-2xl font-bold text-primary"
          aria-label={`${siteConfig.name} — accueil`}
        >
          {siteConfig.name}
        </Link>

        {/* Nav desktop */}
        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Navigation principale"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`font-heading text-base font-medium transition-colors hover:text-accent-text ${
                isActive(link.href)
                  ? "text-accent-text underline decoration-2 underline-offset-8"
                  : "text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <DevisButton variant="cta" label="Demander un devis" />
        </div>

        {/* Bouton menu mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-primary lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? (
            <CloseIcon className="h-7 w-7" />
          ) : (
            <MenuIcon className="h-7 w-7" />
          )}
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <nav
          id="mobile-menu"
          className="border-t border-black/5 bg-white lg:hidden"
          aria-label="Navigation mobile"
        >
          <ul className="container-content flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block rounded-lg px-3 py-3 font-heading text-lg font-medium ${
                    isActive(link.href)
                      ? "bg-surface text-accent-text"
                      : "text-primary hover:bg-surface"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 px-3">
              <DevisButton
                variant="cta"
                className="w-full"
                label="Demander un devis"
              />
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
