#!/usr/bin/env python3
"""
Génère public/images/A-REMPLACER.md : la liste de toutes les images attendues
et ce que chacune doit contenir, pour que le client remplace sans toucher au code.
Source : lib/products.ts (familles + produits).
"""
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRODUCTS_TS = os.path.join(ROOT, "lib", "products.ts")
CONTENT_TS = os.path.join(ROOT, "lib", "content.ts")
OUT = os.path.join(ROOT, "public", "images", "A-REMPLACER.md")


def read():
    with open(PRODUCTS_TS, encoding="utf-8") as fh:
        return fh.read()


STR = r'"((?:[^"\\]|\\.)*)"'  # chaîne JS double-quotée (gère virgules, retours ligne)


def parse_families(text):
    # blocs { slug, name, description, bannerImage, order }
    fams = []
    pat = (
        rf'slug:\s*{STR},\s*name:\s*{STR},\s*description:\s*{STR},\s*'
        rf'bannerImage:\s*{STR},\s*order:\s*(\d+)'
    )
    for m in re.finditer(pat, text, re.S):
        fams.append(
            {"slug": m.group(1), "name": m.group(2), "banner": m.group(4),
             "order": int(m.group(5))}
        )
    fams.sort(key=lambda f: f["order"])
    return fams


def parse_products(text):
    prods = []
    pat = (
        rf'slug:\s*{STR},\s*name:\s*{STR},\s*shortDescription:\s*{STR},\s*'
        rf'image:\s*{STR},\s*familySlug:\s*{STR}'
    )
    for m in re.finditer(pat, text, re.S):
        prods.append(
            {"slug": m.group(1), "name": m.group(2).replace('\\"', '"'),
             "image": m.group(4), "family": m.group(5)}
        )
    return prods


def parse_clients():
    with open(CONTENT_TS, encoding="utf-8") as fh:
        text = fh.read()
    pat = rf'label:\s*{STR},\s*image:\s*"(/images/clients/[^"]+\.jpg)"'
    return [
        {"label": m.group(1).replace('\\"', '"'), "image": m.group(2)}
        for m in re.finditer(pat, text, re.S)
    ]


def main():
    text = read()
    fams = parse_families(text)
    prods = parse_products(text)
    clients = parse_clients()

    lines = []
    lines.append("# Images à remplacer — MAPESIA")
    lines.append("")
    lines.append(
        "Tous les fichiers ci-dessous sont des **placeholders gris**. "
        "Remplacez-les par les vraies photos en **conservant exactement le "
        "même nom et le même chemin** : le site les prendra automatiquement, "
        "sans aucune modification de code."
    )
    lines.append("")
    lines.append("Conseils : photos nettes, bien éclairées, format paysage, "
                 "produit/chantier bien visible. Le JPG est recommandé.")
    lines.append("")

    # Hero
    lines.append("## Hero (accueil)")
    lines.append("")
    lines.append("| Fichier | Dimensions conseillées | Contenu attendu |")
    lines.append("|---|---|---|")
    lines.append(
        "| `hero/hero-chantier.jpg` | 1920 × 1080 | Grande photo de chantier "
        "avec un **cône de signalisation au premier plan** (image d'ambiance "
        "du hero d'accueil). |"
    )
    lines.append("")

    # Open Graph
    lines.append("## Open Graph (partage réseaux sociaux)")
    lines.append("")
    lines.append("| Fichier | Dimensions | Contenu attendu |")
    lines.append("|---|---|---|")
    lines.append(
        "| `og/mapesia-og.jpg` | 1200 × 630 | Visuel de marque affiché lors du "
        "partage du site (déjà généré, brandé MAPESIA — remplaçable). |"
    )
    lines.append("")

    # Secteurs clients
    lines.append("## Secteurs clients (section « Ils nous font confiance »)")
    lines.append("")
    lines.append("| Fichier | Dimensions | Contenu attendu |")
    lines.append("|---|---|---|")
    for c in clients:
        rel = c["image"].replace("/images/", "")
        lines.append(
            f"| `{rel}` | 600 × 800 (portrait) | Photo illustrant « {c['label']} ». |"
        )
    lines.append("")

    # Familles
    lines.append("## Bannières de familles")
    lines.append("")
    lines.append("| Fichier | Dimensions | Contenu attendu |")
    lines.append("|---|---|---|")
    for f in fams:
        rel = f["banner"].replace("/images/", "")
        lines.append(
            f"| `{rel}` | 1200 × 750 | Bannière de la famille « {f['name']} ». |"
        )
    lines.append("")

    # Produits, groupés par famille
    lines.append("## Photos de produits")
    lines.append("")
    by_family = {f["slug"]: [] for f in fams}
    for p in prods:
        by_family.setdefault(p["family"], []).append(p)

    for f in fams:
        items = by_family.get(f["slug"], [])
        lines.append(f"### {f['name']} ({len(items)} produits)")
        lines.append("")
        lines.append("| Fichier | Dimensions | Produit |")
        lines.append("|---|---|---|")
        for p in items:
            rel = p["image"].replace("/images/", "")
            lines.append(f"| `{rel}` | 1200 × 900 | {p['name']} |")
        lines.append("")

    total = 2 + len(fams) + len(prods) + len(clients)
    lines.append("---")
    lines.append("")
    lines.append(f"**Total : {total} images** "
                 f"({len(prods)} produits + {len(fams)} familles + "
                 f"{len(clients)} secteurs + hero + OG).")
    lines.append("")

    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines))
    print(f"Écrit : {os.path.relpath(OUT, ROOT)}  ({total} images listées)")


if __name__ == "__main__":
    main()
