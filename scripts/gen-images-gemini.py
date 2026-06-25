#!/usr/bin/env python3
"""
Génère les images placeholder du site MAPESIA avec Imagen 4 (Google AI).
Remplace les petits placeholders dans public/images/{hero,og,familles,clients}/.
"""

import base64
import json
import os
import pathlib
import sys
import time
import requests

# Clé API lue depuis l'environnement — ne jamais committer de clé en clair.
#   export GEMINI_API_KEY="votre_cle"  puis  python3 scripts/gen-images-gemini.py
API_KEY = os.environ.get("GEMINI_API_KEY", "")
MODEL = "imagen-4.0-generate-001"
ENDPOINT = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:predict?key={API_KEY}"

ROOT = pathlib.Path(__file__).parent.parent / "public" / "images"

IMAGES = [
    # ── HERO ────────────────────────────────────────────────────────────────
    {
        "path": "hero/hero-chantier.jpg",
        "ratio": "16:9",
        "prompt": (
            "Wide aerial view of an active French road construction site at golden hour. "
            "Bright orange traffic cones, blue and white warning barriers, workers in high-visibility vests, "
            "heavy machinery, freshly laid asphalt, urban environment background. "
            "Photorealistic, professional DSLR quality, sharp focus, vivid colors, no text, no logos, "
            "no watermarks, no artifacts. Shot from slightly elevated angle, cinematic composition."
        ),
    },
    # ── OG ──────────────────────────────────────────────────────────────────
    {
        "path": "og/mapesia-og.jpg",
        "ratio": "16:9",
        "prompt": (
            "Professional product display of French construction site safety equipment: "
            "orange traffic cones, metal crowd barriers, road signs, cable protectors, "
            "speed bumps and flashing warning lights, arranged neatly on a clean surface "
            "with a blurred construction site background. "
            "Photorealistic, commercial photography style, bright natural lighting, "
            "no text, no watermarks, no artifacts, no logos."
        ),
    },
    # ── FAMILLES ─────────────────────────────────────────────────────────────
    {
        "path": "familles/cones-et-balisage.jpg",
        "ratio": "4:3",
        "prompt": (
            "Row of bright orange traffic cones and yellow delineator posts on a French road construction site. "
            "Multiple sizes of cones (500mm, 750mm, 1000mm), some with retroreflective bands, "
            "placed along a freshly painted road marking. Clear blue sky background. "
            "Photorealistic, sharp professional photo, no text, no watermarks, no artifacts."
        ),
    },
    {
        "path": "familles/barrieres-de-chantier.jpg",
        "ratio": "4:3",
        "prompt": (
            "Heavy-duty blue and white interlocking Vauban-style crowd control barriers and metal construction fencing "
            "secured together along a city sidewalk next to a road construction site. "
            "Workers visible in background. Professional documentary photography, natural daylight, "
            "sharp focus, no text, no watermarks, no artifacts."
        ),
    },
    {
        "path": "familles/signalisation-lumineuse.jpg",
        "ratio": "4:3",
        "prompt": (
            "Orange flashing LED arrow boards and portable warning lights on tripods at a night road works site in France. "
            "Bright amber flashing lights illuminate the scene, traffic cones nearby, city lights in background. "
            "Photorealistic night photography, vivid colors, sharp focus, "
            "no text, no watermarks, no artifacts."
        ),
    },
    {
        "path": "familles/passages-de-cables.jpg",
        "ratio": "4:3",
        "prompt": (
            "Yellow rubber cable protector ramps laid across a pedestrian walkway at a French construction site. "
            "Multiple cable channels protecting orange and black cables, smooth transition ramps at ends. "
            "Clean concrete surface, safety cones visible in background. "
            "Professional product photography, natural daylight, sharp focus, no text, no watermarks, no artifacts."
        ),
    },
    {
        "path": "familles/ralentisseurs.jpg",
        "ratio": "4:3",
        "prompt": (
            "Black and yellow rubber speed bumps and speed humps installed across a private road or industrial zone in France. "
            "Multiple modular sections bolted together, bold yellow reflective strips, clear markings. "
            "Photorealistic, professional commercial photography, bright daylight, no text, no watermarks, no artifacts."
        ),
    },
    {
        "path": "familles/balises-et-potelets.jpg",
        "ratio": "4:3",
        "prompt": (
            "Row of flexible white and yellow delineator bollards and J-flex road delineators "
            "installed along a road edge in an urban French setting. "
            "Some with retroreflective bands, clean asphalt surface, cars visible in soft background. "
            "Photorealistic, sharp professional photo, natural light, no text, no watermarks, no artifacts."
        ),
    },
    {
        "path": "familles/separateurs-de-voies.jpg",
        "ratio": "4:3",
        "prompt": (
            "Orange and white plastic road lane separators and water-filled traffic barriers "
            "lined up along a temporary lane closure on a French highway. "
            "Interlocking modular blocks creating a clear separation between active lane and work zone. "
            "Aerial or slightly elevated view, photorealistic, sharp professional photo, no text, no watermarks, no artifacts."
        ),
    },
    {
        "path": "familles/passerelles.jpg",
        "ratio": "4:3",
        "prompt": (
            "Yellow non-slip pedestrian walkover bridge and vehicle cable crossover ramp installed "
            "across a trench in a French city street. "
            "Solid construction, anti-slip surface texture, bright safety yellow color. "
            "Workers visible in background, professional documentary photo, natural light, no text, no watermarks, no artifacts."
        ),
    },
    {
        "path": "familles/panneaux-et-accessoires.jpg",
        "ratio": "4:3",
        "prompt": (
            "Collection of French road construction warning signs (panneau de chantier) on orange and white tripods: "
            "men at work signs, temporary stop signs, directional arrows, speed limit signs. "
            "Displayed neatly at a construction site entrance, clear blue sky. "
            "Photorealistic, professional commercial photography, no text overlays except sign symbols, no watermarks, no artifacts."
        ),
    },
    # ── CLIENTS ──────────────────────────────────────────────────────────────
    {
        "path": "clients/travaux-publics.jpg",
        "ratio": "3:4",
        "prompt": (
            "Construction worker in bright yellow high-visibility vest and hard hat operating heavy machinery "
            "at a French road construction site. Excavator in background, orange cones and barriers, "
            "freshly dug earth and asphalt. Professional portrait-orientation documentary photo, "
            "natural daylight, bokeh background, sharp subject, no text, no watermarks, no artifacts."
        ),
    },
    {
        "path": "clients/signalisation-routiere.jpg",
        "ratio": "3:4",
        "prompt": (
            "French road signaling technician in orange high-visibility vest installing a temporary "
            "orange warning sign on a road at night. Flashing LED arrow board in background, "
            "safety cones illuminated by car headlights. Portrait orientation, "
            "photorealistic night photography, dramatic lighting, no text, no watermarks, no artifacts."
        ),
    },
    {
        "path": "clients/revendeurs.jpg",
        "ratio": "3:4",
        "prompt": (
            "Interior of a professional construction supplies warehouse in France. "
            "Shelves stacked with orange traffic cones, yellow bollards, cable protectors, "
            "road barriers and safety signs. Forklift in the aisle, clean organized space. "
            "Portrait orientation, professional interior photography, bright lighting, no text, no watermarks, no artifacts."
        ),
    },
    {
        "path": "clients/collectivites.jpg",
        "ratio": "3:4",
        "prompt": (
            "French municipal workers in city uniforms installing temporary road barriers "
            "and safety signs around a public square renovation project in a French town center. "
            "Stone buildings in background, organized work zone with cones and barriers. "
            "Portrait orientation, photorealistic documentary photography, natural light, no text, no watermarks, no artifacts."
        ),
    },
    {
        "path": "clients/evenementiel.jpg",
        "ratio": "3:4",
        "prompt": (
            "Event staff setting up crowd control barriers and safety fencing for an outdoor public event "
            "in France (festival or sports event). Temporary metal crowd barriers in silver/gray, "
            "event stage or tent structure in background, sunny day, people in high-visibility vests. "
            "Portrait orientation, photorealistic event photography, vivid colors, no text, no watermarks, no artifacts."
        ),
    },
]


def generate(item: dict) -> bytes:
    payload = {
        "instances": [{"prompt": item["prompt"]}],
        "parameters": {
            "sampleCount": 1,
            "aspectRatio": item["ratio"],
            "outputMimeType": "image/jpeg",
            "compressionQuality": 90,
        },
    }
    resp = requests.post(ENDPOINT, json=payload, timeout=90)
    resp.raise_for_status()
    data = resp.json()
    b64 = data["predictions"][0]["bytesBase64Encoded"]
    return base64.b64decode(b64)


def main():
    if not API_KEY:
        sys.exit("Erreur : variable d'environnement GEMINI_API_KEY non définie.")

    total = len(IMAGES)
    ok = 0
    failed = []

    for i, item in enumerate(IMAGES, 1):
        dest = ROOT / item["path"]
        print(f"[{i}/{total}] {item['path']} ({item['ratio']}) … ", end="", flush=True)
        try:
            img_bytes = generate(item)
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(img_bytes)
            size_kb = len(img_bytes) // 1024
            print(f"OK ({size_kb} Ko)")
            ok += 1
        except Exception as e:
            print(f"ERREUR — {e}")
            failed.append(item["path"])

        # Petite pause entre requêtes pour éviter les rate limits
        if i < total:
            time.sleep(2)

    print(f"\n{'=' * 50}")
    print(f"Terminé : {ok}/{total} images générées.")
    if failed:
        print("Échecs :")
        for f in failed:
            print(f"  - {f}")
        sys.exit(1)


if __name__ == "__main__":
    main()
