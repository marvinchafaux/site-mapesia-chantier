#!/usr/bin/env python3
"""
Génère des placeholders d'images propres (fond gris #F5F5F5 + nom du fichier).
Les chemins produits/familles sont lus directement depuis lib/products.ts pour
garantir une correspondance exacte avec le code.

Usage : python3 scripts/gen-placeholders.py
"""
import os
import re

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PUBLIC = os.path.join(ROOT, "public")
PRODUCTS_TS = os.path.join(ROOT, "lib", "products.ts")
CONTENT_TS = os.path.join(ROOT, "lib", "content.ts")

BG = (245, 245, 245)        # #F5F5F5
FG = (15, 23, 42)           # #0F172A
ACCENT = (230, 126, 34)     # #E67E22

# Dimensions par dossier
DIMS = {
    "hero": (1920, 1080),
    "familles": (1200, 750),
    "produits": (1200, 900),
    "og": (1200, 630),
    "clients": (600, 800),  # tuiles secteurs (portrait)
}

FONT_CANDIDATES = [
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
    "/Library/Fonts/Arial.ttf",
]


def load_font(size):
    for path in FONT_CANDIDATES:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except Exception:
                continue
    return ImageFont.load_default()


def collect_paths():
    """Récupère tous les chemins /images/*.jpg référencés (products.ts + content.ts)."""
    paths = set()
    for src in (PRODUCTS_TS, CONTENT_TS):
        with open(src, encoding="utf-8") as fh:
            paths.update(re.findall(r'"(/images/[^"]+\.jpg)"', fh.read()))
    # Images non issues des fichiers de données
    paths.add("/images/hero/hero-chantier.jpg")
    paths.add("/images/og/mapesia-og.jpg")
    return sorted(paths)


def folder_of(path):
    # /images/<folder>/<file>.jpg
    parts = path.strip("/").split("/")
    return parts[1] if len(parts) >= 3 else "produits"


def draw_placeholder(path):
    folder = folder_of(path)
    w, h = DIMS.get(folder, (1200, 900))
    img = Image.new("RGB", (w, h), BG)
    d = ImageDraw.Draw(img)

    # Cadre discret
    d.rectangle([0, 0, w - 1, h - 1], outline=(220, 220, 220), width=2)
    # Bande d'accent en bas
    d.rectangle([0, h - 10, w, h], fill=ACCENT)

    filename = os.path.basename(path)
    title_font = load_font(max(22, w // 26))
    sub_font = load_font(max(16, w // 48))

    # Libellé principal : nom du fichier
    tb = d.textbbox((0, 0), filename, font=title_font)
    tw, th = tb[2] - tb[0], tb[3] - tb[1]
    d.text(((w - tw) / 2, (h - th) / 2 - 20), filename, fill=FG, font=title_font)

    # Sous-titre
    sub = f"MAPESIA — placeholder {w}x{h} — a remplacer"
    sb = d.textbbox((0, 0), sub, font=sub_font)
    sw = sb[2] - sb[0]
    d.text(((w - sw) / 2, (h + th) / 2 + 8), sub, fill=(120, 120, 120), font=sub_font)

    out = os.path.join(PUBLIC, path.lstrip("/"))
    os.makedirs(os.path.dirname(out), exist_ok=True)
    img.save(out, "JPEG", quality=80, optimize=True)
    return out, (w, h)


def main():
    paths = collect_paths()
    print(f"Génération de {len(paths)} placeholders…")
    for p in paths:
        out, dims = draw_placeholder(p)
        rel = os.path.relpath(out, ROOT)
        print(f"  {rel}  ({dims[0]}x{dims[1]})")
    print("Terminé.")


if __name__ == "__main__":
    main()
