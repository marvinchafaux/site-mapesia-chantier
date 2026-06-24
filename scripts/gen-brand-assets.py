#!/usr/bin/env python3
"""
Génère les assets de marque :
 - public/images/og/mapesia-og.jpg : carte Open Graph (1200x630) brandée
 - app/icon.png (512) et app/apple-icon.png (180) : favicon / icône appli

Usage : python3 scripts/gen-brand-assets.py
"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

PRIMARY = (15, 23, 42)      # #0F172A
PRIMARY_DARK = (11, 17, 32)  # #0B1120
ACCENT = (230, 126, 34)     # #E67E22
WHITE = (255, 255, 255)

FONT_CANDIDATES = [
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
    "/System/Library/Fonts/Helvetica.ttc",
]


def font(size):
    for p in FONT_CANDIDATES:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()


def vgradient(w, h, top, bottom):
    base = Image.new("RGB", (w, h), top)
    draw = ImageDraw.Draw(base)
    for y in range(h):
        t = y / max(1, h - 1)
        c = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        draw.line([(0, y), (w, y)], fill=c)
    return base


def make_og():
    w, h = 1200, 630
    img = vgradient(w, h, PRIMARY, PRIMARY_DARK)
    d = ImageDraw.Draw(img)
    # Bande d'accent
    d.rectangle([0, h - 16, w, h], fill=ACCENT)
    # Nom
    d.text((80, 210), "MAPESIA", fill=WHITE, font=font(110))
    # Tagline
    d.text(
        (84, 350),
        "Matériel de chantier et de signalisation",
        fill=(220, 230, 240),
        font=font(40),
    )
    d.text(
        (84, 410),
        "pour les professionnels",
        fill=(220, 230, 240),
        font=font(40),
    )
    out = os.path.join(ROOT, "public", "images", "og", "mapesia-og.jpg")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    img.save(out, "JPEG", quality=88, optimize=True)
    print("OG :", os.path.relpath(out, ROOT))


def make_icon(size, name):
    img = Image.new("RGB", (size, size), PRIMARY)
    d = ImageDraw.Draw(img)
    # Accent bas
    d.rectangle([0, int(size * 0.86), size, size], fill=ACCENT)
    f = font(int(size * 0.6))
    tb = d.textbbox((0, 0), "M", font=f)
    tw, th = tb[2] - tb[0], tb[3] - tb[1]
    d.text(
        ((size - tw) / 2 - tb[0], (size - th) / 2 - tb[1] - int(size * 0.04)),
        "M",
        fill=WHITE,
        font=f,
    )
    out = os.path.join(ROOT, "app", name)
    img.save(out, "PNG", optimize=True)
    print("Icône :", os.path.relpath(out, ROOT))


if __name__ == "__main__":
    make_og()
    make_icon(512, "icon.png")
    make_icon(180, "apple-icon.png")
    print("Terminé.")
