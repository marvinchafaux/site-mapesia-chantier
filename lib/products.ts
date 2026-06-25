/**
 * SOURCE UNIQUE DE VÉRITÉ — familles et produits MAPESIA.
 *
 * Aucune donnée produit ne doit être codée en dur dans les pages :
 * tout part d'ici. Aucun prix (le site est lead-generation, pas e-commerce).
 *
 * Convention d'images :
 *   - bannière de famille : /images/familles/<famille-slug>.jpg
 *   - photo produit       : /images/produits/<produit-slug>.<ext>
 */

export type Family = {
  slug: string;
  name: string;
  description: string;
  bannerImage: string;
  order: number;
};

export type Product = {
  slug: string;
  name: string;
  shortDescription: string;
  image: string;
  familySlug: string;
};

/* -------------------------------------------------------------------------- */
/*  FAMILLES — « Cônes et balisage » toujours en premier (order: 1)           */
/* -------------------------------------------------------------------------- */

export const families: Family[] = [
  {
    slug: "cones-et-balisage",
    name: "Cônes et balisage",
    description:
      "Le cœur de notre gamme : cônes haute visibilité, lisses et accessoires pour baliser et sécuriser toutes vos zones de travaux.",
    bannerImage: "/images/familles/cones-et-balisage.jpg",
    order: 1,
  },
  {
    slug: "barrieres-de-chantier",
    name: "Barrières de chantier",
    description:
      "Barrières robustes et rétroréfléchissantes pour délimiter, protéger et canaliser sur vos chantiers et événements.",
    bannerImage: "/images/familles/barrieres-de-chantier.jpg",
    order: 2,
  },
  {
    slug: "signalisation-lumineuse",
    name: "Signalisation lumineuse",
    description:
      "Feux, lampes et palettes, à piles ou solaires, pour rester parfaitement visible de jour comme de nuit.",
    bannerImage: "/images/familles/signalisation-lumineuse.jpg",
    order: 3,
  },
  {
    slug: "passages-de-cables",
    name: "Passages de câbles",
    description:
      "Protégez câbles et gaines du passage des véhicules et des piétons, et sécurisez vos sols.",
    bannerImage: "/images/familles/passages-de-cables.jpg",
    order: 4,
  },
  {
    slug: "ralentisseurs",
    name: "Ralentisseurs",
    description:
      "Coussins et ralentisseurs, permanents ou temporaires, pour maîtriser la vitesse en toute sécurité.",
    bannerImage: "/images/familles/ralentisseurs.jpg",
    order: 5,
  },
  {
    slug: "balises-et-potelets",
    name: "Balises et potelets",
    description:
      "Balises de jalonnement et potelets pour guider, séparer et délimiter durablement vos espaces.",
    bannerImage: "/images/familles/balises-et-potelets.jpg",
    order: 6,
  },
  {
    slug: "separateurs-de-voies",
    name: "Séparateurs de voies",
    description:
      "Modules de séparation pour organiser la circulation et protéger efficacement les usagers.",
    bannerImage: "/images/familles/separateurs-de-voies.jpg",
    order: 7,
  },
  {
    slug: "passerelles",
    name: "Passerelles",
    description:
      "Franchissements sécurisés des tranchées et zones de travaux, pour les piétons comme pour les véhicules.",
    bannerImage: "/images/familles/passerelles.jpg",
    order: 8,
  },
  {
    slug: "panneaux-et-accessoires",
    name: "Panneaux et accessoires",
    description:
      "Panneaux, miroirs, socles et fixations pour compléter et fiabiliser toute votre signalisation.",
    bannerImage: "/images/familles/panneaux-et-accessoires.jpg",
    order: 9,
  },
];

/* -------------------------------------------------------------------------- */
/*  PRODUITS — l'ordre du tableau est l'ordre d'affichage dans chaque famille */
/* -------------------------------------------------------------------------- */

export const products: Product[] = [
  // ---- Cônes et balisage ----------------------------------------------------
  {
    slug: "cone-big-foot",
    name: "Cône Big Foot",
    shortDescription:
      "3 hauteurs : 500 mm (2,35 kg) / 750 mm (4,62 kg) / 1000 mm (8,1 kg). Film Starlux cl. 2. Base et marquage personnalisables.",
    image: "/images/produits/cone-big-foot.webp",
    familySlug: "cones-et-balisage",
  },
  {
    slug: "cone-ecofoot-color",
    name: "Cône Ecofoot Color",
    shortDescription:
      "2 hauteurs : 750 mm (4,40 kg) / 1000 mm (7,5 kg). 4 coloris : orange, bleu, vert, jaune. Film Starlux cl. 2.",
    image: "/images/produits/cone-ecofoot-color.webp",
    familySlug: "cones-et-balisage",
  },
  {
    slug: "cone-anti-stationnement",
    name: "Cône anti-stationnement",
    shortDescription:
      "Hauteur 480 mm - 3,80 kg. Avec ou sans logo M6a rétro-réfléchissant.",
    image: "/images/produits/cone-anti-stationnement.jpg",
    familySlug: "cones-et-balisage",
  },
  {
    slug: "cone-intervention-rapide",
    name: "Cône d'intervention rapide",
    shortDescription:
      "4 cônes repliables h. 45 cm (1,40 kg). Sac zip fluorescent 50 × 10 × 16 cm. Embarquable sur deux-roues.",
    image: "/images/produits/cone-intervention-rapide.webp",
    familySlug: "cones-et-balisage",
  },
  {
    slug: "cone-pvc-520-700",
    name: "Cône PVC 520/700 mm",
    shortDescription:
      "2 hauteurs : 520 mm (1,20 kg) / 700 mm (2,20 kg). 2 colliers rétro CL2. Personnalisable par lettrage.",
    image: "/images/produits/cone-pvc-520-700.webp",
    familySlug: "cones-et-balisage",
  },
  {
    slug: "cones-porte-outils",
    name: "Cônes porte-outils",
    shortDescription:
      "Cônes équipés pour porter lisses et accessoires de balisage.",
    image: "/images/produits/cones-porte-outils.webp",
    familySlug: "cones-et-balisage",
  },
  {
    slug: "lisse-cone-rigide-2m",
    name: "Lisse de cône rigide 2 m",
    shortDescription:
      "2000 × 170 × 30 mm. Polyéthylène 100 % recyclable. Film rétro-réfléchissant. Coloris orange.",
    image: "/images/produits/lisse-cone-rigide-2m.webp",
    familySlug: "cones-et-balisage",
  },
  {
    slug: "lisse-cone-souple",
    name: "Lisse de cône souple",
    shortDescription:
      "Film Starlux cl. 2, 5 ou 10 m de long, hauteur 15 cm. Coloris rouge/blanc.",
    image: "/images/produits/lisse-cone-souple.webp",
    familySlug: "cones-et-balisage",
  },
  {
    slug: "connecteur-de-lisses",
    name: "Connecteur de lisses",
    shortDescription:
      "450 × 100 mm. Connecte les lisses entre cônes. Sert aussi de support lampe.",
    image: "/images/produits/connecteur-de-lisses.webp",
    familySlug: "cones-et-balisage",
  },
  {
    slug: "rehausse-de-cones",
    name: "Rehausse de cônes",
    shortDescription:
      "610 × 110 mm. Permet d'accrocher chaîne ou grillage sur les cônes.",
    image: "/images/produits/rehausse-de-cones.webp",
    familySlug: "cones-et-balisage",
  },
  {
    slug: "enrouleur-balisage-95m",
    name: "Enrouleur de balisage 9,5 m",
    shortDescription:
      "Sangle rouge/blanche 9,5 m. S'adapte sur cônes lestés 1 m (min. 8 kg). Frein intégré.",
    image: "/images/produits/enrouleur-balisage-95m.webp",
    familySlug: "cones-et-balisage",
  },

  // ---- Barrières de chantier ------------------------------------------------
  {
    slug: "barriere-tp-retroreflechissante",
    name: "Barrière TP rétroréfléchissante",
    shortDescription:
      "2000 × 1000 × 50 mm - 10,70 kg. Bande rétro-réfléchissante 250 mm. Coloris blanc. Pieds caoutchouc 360°.",
    image: "/images/produits/barriere-tp-retroreflechissante.webp",
    familySlug: "barrieres-de-chantier",
  },
  {
    slug: "barriere-chantier-tp",
    name: "Barrière de chantier TP",
    shortDescription:
      "H. 1000 mm - 14,4 kg. 4 panneaux de 1 m connectable. Bandes rétro cl. 2. Coloris rouge ou jaune. Personnalisable.",
    image: "/images/produits/barriere-chantier-tp.webp",
    familySlug: "barrieres-de-chantier",
  },
  {
    slug: "barriere-chantier-ouverte",
    name: "Barrière de chantier ouverte",
    shortDescription:
      "2000 × 1000 × 50 mm - 11,2 kg. Éléments rétro-réfléchissants. Pieds caoutchouc 360°. Connexion rapide.",
    image: "/images/produits/barriere-chantier-ouverte.webp",
    familySlug: "barrieres-de-chantier",
  },
  {
    slug: "barriere-chantier-double",
    name: "Barrière de chantier double",
    shortDescription:
      "2000 × 1000 × 50 mm - 11,2 kg. Double face rétro-réfléchissante. Pieds caoutchouc 360°. Connexion rapide.",
    image: "/images/produits/barriere-chantier-double.webp",
    familySlug: "barrieres-de-chantier",
  },
  {
    slug: "barriere-foule-evenementielle",
    name: "Barrière de foule événementielle",
    shortDescription:
      "2000 × 1100 × 50 mm - 9,9 kg. Hauteur 110 cm (niveau barrière de police). Coloris noir ou orange. Pieds caoutchouc 360°.",
    image: "/images/produits/barriere-foule-evenementielle.webp",
    familySlug: "barrieres-de-chantier",
  },
  {
    slug: "plot-cloture-chantier",
    name: "Plot de clôture de chantier",
    shortDescription:
      "Plot en caoutchouc recyclé pour clôtures de chantier. Leste et stabilise les panneaux.",
    image: "/images/produits/plot-cloture-chantier.webp",
    familySlug: "barrieres-de-chantier",
  },

  // ---- Signalisation lumineuse ----------------------------------------------
  {
    slug: "lampe-pour-cones",
    name: "Lampe pour cônes, pose rapide",
    shortDescription:
      "Activation automatique à la pose. Fonctionnement en cascade (jusqu'à 12 m). 8 h de charge = 55-60 h. Corps Ø 220 × 200 mm.",
    image: "/images/produits/lampe-pour-cones.webp",
    familySlug: "signalisation-lumineuse",
  },
  {
    slug: "lampe-solaire-pour-cones",
    name: "Lampe solaire pour cônes",
    shortDescription:
      "Solaire, lentille ambre Ø 180 mm. À fixer sur cône. 8 h de charge = 150 h. Visibilité 400 m.",
    image: "/images/produits/lampe-solaire-pour-cones.webp",
    familySlug: "signalisation-lumineuse",
  },
  {
    slug: "lampe-solaire-pour-balises",
    name: "Lampe solaire pour balises",
    shortDescription:
      "Solaire simple face, système cascade infrarouge jusqu'à 45 m. 8 h charge = 55-60 h. Système Double Power (solaire + pile 6V).",
    image: "/images/produits/lampe-solaire-pour-balises.webp",
    familySlug: "signalisation-lumineuse",
  },
  {
    slug: "lampe-solaire-polyvalente",
    name: "Lampe solaire polyvalente",
    shortDescription:
      "6 leds, visibilité 800 m. Protection IP66. 143 × 110 × 65 mm - 350 g. Mode flash > 120 h. Charge max. 12-20 h.",
    image: "/images/produits/lampe-solaire-polyvalente.webp",
    familySlug: "signalisation-lumineuse",
  },
  {
    slug: "lampe-avertissement-piles",
    name: "Lampe d'avertissement à piles",
    shortDescription:
      "Double face, Ø 185 mm. Cellule crépusculaire. 2 piles 4R25 6V (non fournies). Visibilité 200 m.",
    image: "/images/produits/lampe-avertissement-piles.webp",
    familySlug: "signalisation-lumineuse",
  },
  {
    slug: "lampe-avertissement-solaire",
    name: "Lampe d'avertissement solaire",
    shortDescription:
      "Double face solaire, Ø 180 mm. 8 h de charge = 150 h de fonctionnement. Allumage automatique. Visibilité 400 m.",
    image: "/images/produits/lampe-avertissement-solaire.webp",
    familySlug: "signalisation-lumineuse",
  },
  {
    slug: "lanterne-360",
    name: "Lanterne 360°",
    shortDescription:
      "Leds 360°, embase magnétique. Ø 95 mm × H. 130 mm. 2 piles LR20 (non fournies). Visibilité 200 m.",
    image: "/images/produits/lanterne-360.webp",
    familySlug: "signalisation-lumineuse",
  },
  {
    slug: "palette-signalisation-lumineuse",
    name: "Palette de signalisation lumineuse",
    shortDescription:
      "Ø 240 mm. 8 LEDs rouge. Autonomie ~12 h. Poids 465 g. Cordon poignet fourni.",
    image: "/images/produits/palette-signalisation-lumineuse.webp",
    familySlug: "signalisation-lumineuse",
  },
  {
    slug: "baton-guidage-lumineux",
    name: "Bâton de guidage lumineux",
    shortDescription:
      "Bâton de guidage LED, rouge ou jaune. Maniable pour orienter véhicules et piétons de nuit.",
    image: "/images/produits/baton-guidage-lumineux.webp",
    familySlug: "signalisation-lumineuse",
  },
  {
    slug: "bache-lumineuse-signalisation",
    name: "Bâche lumineuse de signalisation",
    shortDescription:
      "Bâche flexible LED enroulable. Texte ou flèche rouge ou jaune. Fonctionne sur batteries. Poids < 2 kg.",
    image: "/images/produits/bache-lumineuse-signalisation.webp",
    familySlug: "signalisation-lumineuse",
  },

  // ---- Passages de câbles ---------------------------------------------------
  {
    slug: "passage-cables-10-voies",
    name: "Passage de câbles 10 voies",
    shortDescription:
      "Caoutchouc recyclé, résistant 40 T. 2 passages câbles 9 × 8 cm. 500 × 800 mm - 25,5 kg. Peut servir de ralentisseur PL.",
    image: "/images/produits/passage-cables-10-voies.webp",
    familySlug: "passages-de-cables",
  },
  {
    slug: "passage-cables-50-75",
    name: "Passage de câbles 50/75 mm",
    shortDescription:
      "Caoutchouc recyclé, résistant 40 T. 2 hauteurs : 5 cm et 7,5 cm. Passage câble intégré. Coloris jaune/noir.",
    image: "/images/produits/passage-cables-50-75.webp",
    familySlug: "passages-de-cables",
  },
  {
    slug: "butoirs-de-parking",
    name: "Butoirs de parking",
    shortDescription:
      "Caoutchouc recyclé, marquage microbilles. Véhicules légers (90 cm / 182 cm) et poids lourds (100 × 30 × 15 cm - 24,5 kg).",
    image: "/images/produits/butoirs-de-parking.webp",
    familySlug: "passages-de-cables",
  },

  // ---- Ralentisseurs --------------------------------------------------------
  {
    slug: "ralentisseur-ral-permanent",
    name: "Ralentisseur RAL permanent",
    shortDescription:
      "Caoutchouc recyclé, résistant jusqu'à 40 T. Coloris jaune/noir. Disponible en 3 hauteurs : M40 (4 cm), M50 (5 cm, 25 km/h), M75 (7,5 cm, 15 km/h).",
    image: "/images/produits/ralentisseur-ral-permanent.jpg",
    familySlug: "ralentisseurs",
  },
  {
    slug: "ralentisseur-pins",
    name: "Ralentisseur Pin's",
    shortDescription:
      "Caoutchouc recyclé, coloris noir/jaune. Ø 220 × 40 mm - 830 g/unité. Pose en quinconce, 5 unités/ml. Zones privatives 30 km/h.",
    image: "/images/produits/ralentisseur-pins.jpg",
    familySlug: "ralentisseurs",
  },
  {
    slug: "ralentisseur-transit",
    name: "Ralentisseur Transit",
    shortDescription:
      "Souple et enroulable. 3000 × 300 × 30 mm - 13,5 kg. Charge 20 T. Livré avec housse. Idéal foires, marchés, événements.",
    image: "/images/produits/ralentisseur-transit.jpg",
    familySlug: "ralentisseurs",
  },
  {
    slug: "ralentisseur-temporaire",
    name: "Ralentisseur temporaire",
    shortDescription:
      "Souple et enroulable. 3000 × 300 × 30 mm - 13,5 kg. Charge 20 T. Livré avec housse. Solution amovible pour chantiers et événements.",
    image: "/images/produits/ralentisseur-temporaire.webp",
    familySlug: "ralentisseurs",
  },
  {
    slug: "coussin-berlinois",
    name: "Coussin berlinois",
    shortDescription:
      "6 éléments caoutchouc rouge anti-UV. 6 bandes rétro-réfléchissantes. Montage sans colle. 3000 × 1800 × 65 mm. Zone 30 km/h max.",
    image: "/images/produits/coussin-berlinois.jpg",
    familySlug: "ralentisseurs",
  },

  // ---- Balises et potelets --------------------------------------------------
  {
    slug: "balise-jalonnement-rigide",
    name: "Balise de jalonnement rigide",
    shortDescription:
      "3 hauteurs : 500 / 750 / 1000 mm. Coloris orange. Film Starlux. Fixation ¼ de tour sur base caoutchouc recyclé.",
    image: "/images/produits/balise-jalonnement-rigide.webp",
    familySlug: "balises-et-potelets",
  },
  {
    slug: "balise-jalonnement-flexible",
    name: "Balise de jalonnement flexible",
    shortDescription:
      "Se redresse après impact. 3 hauteurs : 500 / 750 / 1000 mm. Film Starlux. Fixation ¼ de tour.",
    image: "/images/produits/balise-jalonnement-flexible.webp",
    familySlug: "balises-et-potelets",
  },
  {
    slug: "balise-jalonnement-articulee",
    name: "Balise de jalonnement articulée",
    shortDescription:
      "Articulée 360°. 3 hauteurs : 500 / 750 / 1000 mm. 5 coloris : orange, blanc, jaune, vert, bleu. Film Starlux.",
    image: "/images/produits/balise-jalonnement-articulee.webp",
    familySlug: "balises-et-potelets",
  },
  {
    slug: "balise-auto-redressante",
    name: "Balise auto-redressante",
    shortDescription:
      "Auto-redressante. Coloris orange. Conforme normes routières. Compatible base ¼ de tour caoutchouc recyclé.",
    image: "/images/produits/balise-auto-redressante.webp",
    familySlug: "balises-et-potelets",
  },
  {
    slug: "balise-delineateur-souple",
    name: "Balise délinéateur souple",
    shortDescription:
      "TPU extrêmement flexible (-20° à +60°C). Colliers micro-prismatiques. Se couche à 90° et reprend sa forme. Coloris variés.",
    image: "/images/produits/balise-delineateur-souple.webp",
    familySlug: "balises-et-potelets",
  },
  {
    slug: "accessoires-pose-balises",
    name: "Accessoires de pose balises",
    shortDescription:
      "Kit de scellement et pose pour balises. Résine bi-composants ou fixation spitée.",
    image: "/images/produits/accessoires-pose-balises.webp",
    familySlug: "balises-et-potelets",
  },
  {
    slug: "potelet-chaine-rouge-blanc",
    name: "Potelet à chaîne rouge/blanc",
    shortDescription:
      "Ensemble de 4 ou 6 poteaux H. 1000 mm × Ø 63 mm. Base lestée 4 kg (Ø 370 mm). 2 colliers rétro CL2. Chaînes 3 m rouge/blanc.",
    image: "/images/produits/potelet-chaine-rouge-blanc.webp",
    familySlug: "balises-et-potelets",
  },
  {
    slug: "potelet-chaine-jaune-noir",
    name: "Potelet à chaîne jaune/noir",
    shortDescription:
      "Ensemble de 4 ou 6 poteaux H. 1000 mm × Ø 63 mm. Base lestée 4 kg (Ø 370 mm). 2 colliers rétro CL2. Chaînes 3 m jaune/noir.",
    image: "/images/produits/potelet-chaine-jaune-noir.webp",
    familySlug: "balises-et-potelets",
  },

  // ---- Séparateurs de voies -------------------------------------------------
  {
    slug: "separateur-voie-modulable",
    name: "Séparateur de voie modulable",
    shortDescription:
      "1130 × 400 × 600 mm. Lestable à l'eau (55 litres, 60 kg rempli). Polyéthylène 100 % recyclable.",
    image: "/images/produits/separateur-voie-modulable.webp",
    familySlug: "separateurs-de-voies",
  },
  {
    slug: "separateur-voie-lourd",
    name: "Séparateur de voie lourd",
    shortDescription:
      "1040 × 280 × 800 mm. Lestable à l'eau (22 litres, 27,5 kg rempli). Peut être équipé d'un panneau grillagé h. 1,80 m.",
    image: "/images/produits/separateur-voie-lourd.webp",
    familySlug: "separateurs-de-voies",
  },
  {
    slug: "separateur-voie-leste",
    name: "Séparateur de voie lesté",
    shortDescription:
      "1140 × 300 × 600 mm - 22,5 kg. Sans eau ni sable. Manœuvrable sur roues. Empilable.",
    image: "/images/produits/separateur-voie-leste.webp",
    familySlug: "separateurs-de-voies",
  },
  {
    slug: "separateur-piste-cyclable",
    name: "Séparateur piste cyclable",
    shortDescription:
      "2 longueurs : 700 mm (4,6 kg) / 1200 mm (6,2 kg). Coloris rouge ou noir. Bandes rétro-réfléchissantes.",
    image: "/images/produits/separateur-piste-cyclable.webp",
    familySlug: "separateurs-de-voies",
  },

  // ---- Passerelles ----------------------------------------------------------
  {
    slug: "passerelle-antiderapante-chantier",
    name: "Passerelle antidérapante de chantier",
    shortDescription:
      "1280 × 890 mm - 16 kg. Charge max. 400 kg. Ceinture caoutchouc antidérapante. Poignées de levage. Polyéthylène HD recyclable.",
    image: "/images/produits/passerelle-antiderapante-chantier.webp",
    familySlug: "passerelles",
  },
  {
    slug: "passerelle-pour-vehicules",
    name: "Passerelle pour véhicules",
    shortDescription:
      "1600 × 1200 mm. Charge max. 4 tonnes. Traverse tranchées jusqu'à 700 mm. Polyéthylène HD recyclable.",
    image: "/images/produits/passerelle-pour-vehicules.png",
    familySlug: "passerelles",
  },
  {
    slug: "passerelle-pietonne-chantier",
    name: "Passerelle piétonne de chantier",
    shortDescription:
      "1200 × 800 mm - 7,2 kg. Charge max. 400 kg. Tranchée max. 70 cm. Antidérapant, poignées de levage. Polyéthylène HD recyclable.",
    image: "/images/produits/passerelle-pietonne-chantier.webp",
    familySlug: "passerelles",
  },

  // ---- Panneaux et accessoires ----------------------------------------------
  {
    slug: "panneau-info-chantier",
    name: "Panneau info chantier",
    shortDescription:
      "495 × 390 × 900 mm - 7 kg. Base PVC antidérapante. Personnalisable. Option panneau PVC ou lampe solaire vissable.",
    image: "/images/produits/panneau-info-chantier.webp",
    familySlug: "panneaux-et-accessoires",
  },
  {
    slug: "miroir-routier",
    name: "Miroir routier",
    shortDescription:
      "Miroir convexe à cadre rétroréfléchissant, visibilité aux intersections et virages.",
    image: "/images/produits/miroir-routier.webp",
    familySlug: "panneaux-et-accessoires",
  },
  {
    slug: "lest-pour-panneaux",
    name: "Lest pour panneaux",
    shortDescription:
      "Lestage pour panneaux temporaires de chantier. Base caoutchouc recyclé anti-dérapante.",
    image: "/images/produits/lest-pour-panneaux.webp",
    familySlug: "panneaux-et-accessoires",
  },
  {
    slug: "socle-pour-panneaux",
    name: "Socle pour panneaux",
    shortDescription:
      "Socle universel pour supports de panneaux de chantier. Base caoutchouc recyclé.",
    image: "/images/produits/socle-pour-panneaux.webp",
    familySlug: "panneaux-et-accessoires",
  },
  {
    slug: "base-multi-support",
    name: "Base multi-support",
    shortDescription:
      "Base multi-support pour fixation de panneaux et équipements de chantier variés.",
    image: "/images/produits/base-multi-support.webp",
    familySlug: "panneaux-et-accessoires",
  },
  {
    slug: "kit-de-fixation",
    name: "Kit de fixation",
    shortDescription:
      "Tirefond zingué + rondelle + cheville nylon. Pour fixation au sol (béton ou enrobé) des ralentisseurs, séparateurs et butoirs.",
    image: "/images/produits/kit-de-fixation.webp",
    familySlug: "panneaux-et-accessoires",
  },
];

/* -------------------------------------------------------------------------- */
/*  HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

/** Familles triées par `order` (cônes en premier). */
export function getFamilies(): Family[] {
  return [...families].sort((a, b) => a.order - b.order);
}

/** Une famille par slug, ou undefined. */
export function getFamilyBySlug(slug: string): Family | undefined {
  return families.find((f) => f.slug === slug);
}

/** Produits d'une famille, dans l'ordre de déclaration. */
export function getProductsByFamily(familySlug: string): Product[] {
  return products.filter((p) => p.familySlug === familySlug);
}

/** Un produit par slug, ou undefined. */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** Le produit phare (cône Big Foot, premier de la première famille). */
export function getFeaturedProduct(): Product {
  return products[0];
}

/* -------------------------------------------------------------------------- */
/*  RECHERCHE                                                                  */
/* -------------------------------------------------------------------------- */

/** Minuscule + sans accents, pour une recherche tolérante. */
function normalize(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Recherche dans le catalogue par nom / description / famille.
 * Tous les mots de la requête doivent être présents (recherche "ET").
 */
export function searchCatalog(query: string): {
  products: Product[];
  families: Family[];
} {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return { products: [], families: [] };

  const matches = (...fields: string[]) => {
    const haystack = normalize(fields.join(" "));
    return terms.every((t) => haystack.includes(t));
  };

  const matchedFamilies = getFamilies().filter((f) =>
    matches(f.name, f.description)
  );

  const matchedProducts = products.filter((p) => {
    const family = getFamilyBySlug(p.familySlug);
    return matches(p.name, p.shortDescription, family?.name ?? "");
  });

  return { products: matchedProducts, families: matchedFamilies };
}
