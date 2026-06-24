"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { getFamilies } from "@/lib/products";
import { DevisButton } from "./CtaButtons";
import ProductSearch from "./ProductSearch";
import { MenuIcon, CloseIcon, ChevronDownIcon, SearchIcon } from "./Icons";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/notre-gamme", label: "Notre gamme", hasMenu: true },
  { href: "/produits-sur-mesure", label: "Produits sur mesure" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false); // menu mobile
  const [gammeOpen, setGammeOpen] = useState(false); // déroulant desktop
  const [mobileGammeOpen, setMobileGammeOpen] = useState(false); // sous-liste mobile
  const [searchOpen, setSearchOpen] = useState(false); // panneau recherche mobile
  const pathname = usePathname();
  const families = getFamilies();

  // Ferme tous les menus à chaque changement de page.
  useEffect(() => {
    setOpen(false);
    setGammeOpen(false);
    setMobileGammeOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/95 backdrop-blur">
      {/* ───────── Ligne 1 : logo · recherche · CTA ───────── */}
      <div className="container-content flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link
          href="/"
          className="shrink-0 font-heading text-2xl font-bold text-primary"
          aria-label={`${siteConfig.name} — accueil`}
        >
          {siteConfig.name}
        </Link>

        {/* Recherche centrée (desktop) */}
        <div className="hidden flex-1 justify-center px-6 lg:flex">
          <div className="w-full max-w-md">
            <ProductSearch size="sm" />
          </div>
        </div>

        {/* Actions à droite */}
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden lg:block">
            <DevisButton
              variant="cta"
              label="Demander un devis"
              className="h-11 py-0"
            />
          </div>

          {/* Recherche mobile (icône) */}
          <button
            type="button"
            onClick={() => setSearchOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-primary hover:bg-surface lg:hidden"
            aria-expanded={searchOpen}
            aria-controls="search-panel"
            aria-label={searchOpen ? "Fermer la recherche" : "Rechercher"}
          >
            {searchOpen ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <SearchIcon className="h-6 w-6" />
            )}
          </button>

          {/* Menu mobile (burger) */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-primary hover:bg-surface lg:hidden"
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
      </div>

      {/* ───────── Ligne 2 : navigation (desktop) ───────── */}
      <nav
        className="hidden border-t border-black/5 lg:block"
        aria-label="Navigation principale"
      >
        <ul className="container-content flex h-14 items-center justify-center gap-8">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const linkClass = `whitespace-nowrap font-heading text-base font-medium transition-colors hover:text-accent-text ${
              active
                ? "text-accent-text underline decoration-2 underline-offset-[6px]"
                : "text-primary"
            }`;

            if (!link.hasMenu) {
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={linkClass}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            }

            // « Notre gamme » avec déroulant des catégories.
            return (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={() => setGammeOpen(true)}
                onMouseLeave={() => setGammeOpen(false)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node))
                    setGammeOpen(false);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setGammeOpen(false);
                }}
              >
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  aria-haspopup="true"
                  aria-expanded={gammeOpen}
                  aria-controls="gamme-menu"
                  onFocus={() => setGammeOpen(true)}
                  className={`inline-flex items-center gap-1 ${linkClass}`}
                >
                  {link.label}
                  <ChevronDownIcon
                    className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${
                      gammeOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>

                <div
                  id="gamme-menu"
                  className={`absolute left-0 top-full pt-3 transition-[opacity,transform] duration-150 motion-reduce:transition-none ${
                    gammeOpen
                      ? "visible translate-y-0 opacity-100"
                      : "pointer-events-none invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <div className="w-[36rem] max-w-[calc(100vw-2rem)] rounded-2xl border border-black/5 bg-white p-4 shadow-lg">
                    <ul className="grid grid-cols-2 gap-1">
                      {families.map((f) => (
                        <li key={f.slug}>
                          <Link
                            href={`/notre-gamme/${f.slug}`}
                            className="block rounded-lg px-3 py-2.5 text-base text-primary transition-colors hover:bg-surface"
                          >
                            {f.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/notre-gamme"
                      className="mt-2 block rounded-lg px-3 py-2.5 font-heading text-base font-semibold text-accent-text transition-colors hover:bg-surface"
                    >
                      Voir toute la gamme →
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Panneau de recherche (mobile) */}
      {searchOpen && (
        <div
          id="search-panel"
          className="border-t border-black/5 bg-white lg:hidden"
        >
          <div className="container-content py-4">
            <ProductSearch
              size="lg"
              autoFocus
              onNavigate={() => setSearchOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Menu mobile */}
      {open && (
        <nav
          id="mobile-menu"
          className="border-t border-black/5 bg-white lg:hidden"
          aria-label="Navigation mobile"
        >
          <ul className="container-content flex flex-col gap-1 py-4">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              const rowClass = `block rounded-lg px-3 py-3 font-heading text-lg font-medium ${
                active
                  ? "bg-surface text-accent-text"
                  : "text-primary hover:bg-surface"
              }`;

              if (!link.hasMenu) {
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={rowClass}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={link.href}>
                  <div className="flex items-center">
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex-1 ${rowClass}`}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setMobileGammeOpen((v) => !v)}
                      aria-expanded={mobileGammeOpen}
                      aria-controls="mobile-gamme"
                      aria-label={
                        mobileGammeOpen
                          ? "Masquer les catégories"
                          : "Afficher les catégories"
                      }
                      className="rounded-lg p-3 text-primary hover:bg-surface"
                    >
                      <ChevronDownIcon
                        className={`h-5 w-5 transition-transform duration-200 motion-reduce:transition-none ${
                          mobileGammeOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {mobileGammeOpen && (
                    <ul id="mobile-gamme" className="mt-1 space-y-1 pl-4">
                      {families.map((f) => (
                        <li key={f.slug}>
                          <Link
                            href={`/notre-gamme/${f.slug}`}
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-2.5 text-base text-primary hover:bg-surface"
                          >
                            {f.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
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
