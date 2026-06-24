/**
 * SOURCE UNIQUE DE VÉRITÉ — familles et produits MAPESIA.
 *
 * Aucune donnée produit ne doit être codée en dur dans les pages :
 * tout part d'ici. Aucun prix (le site est lead-generation, pas e-commerce).
 *
 * Convention d'images (placeholders pour l'instant) :
 *   - bannière de famille : /images/familles/<famille-slug>.jpg
 *   - photo produit       : /images/produits/<produit-slug>.jpg
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
/*  Cônes : Big Foot, Ecofoot Color, autres cônes, puis accessoires.          */
/* -------------------------------------------------------------------------- */

export const products: Product[] = [
  // ---- Cônes et balisage ----------------------------------------------------
  {
    slug: "cone-big-foot",
    name: "Cône Big Foot",
    shortDescription:
      "Cône lesté à embase large, ultra-stable même en cas de vent ou de passage intensif.",
    image: "/images/produits/cone-big-foot.jpg",
    familySlug: "cones-et-balisage",
  },
  {
    slug: "cone-ecofoot-color",
    name: "Cône Ecofoot Color",
    shortDescription:
      "Cône écoconçu disponible en plusieurs couleurs pour un balisage différencié et durable.",
    image: "/images/produits/cone-ecofoot-color.jpg",
    familySlug: "cones-et-balisage",
  },
  {
    slug: "cone-anti-stationnement",
    name: "Cône anti-stationnement",
    shortDescription:
      "Réservez et protégez efficacement vos emplacements et zones de travaux.",
    image: "/images/produits/cone-anti-stationnement.jpg",
    familySlug: "cones-et-balisage",
  },
  {
    slug: "cone-intervention-rapide",
    name: "Cône d'intervention rapide",
    shortDescription:
      "Léger et empilable, idéal pour sécuriser une zone en quelques secondes.",
    image: "/images/produits/cone-intervention-rapide.jpg",
    familySlug: "cones-et-balisage",
  },
  {
    slug: "cone-pvc-520-700",
    name: "Cône PVC 520/700 mm",
    shortDescription:
      "Cône PVC haute visibilité aux normes, en deux hauteurs pour chaque besoin de signalisation.",
    image: "/images/produits/cone-pvc-520-700.jpg",
    familySlug: "cones-et-balisage",
  },
  {
    slug: "cones-porte-outils",
    name: "Cônes porte-outils",
    shortDescription:
      "Cône fonctionnel pensé pour accueillir accessoires et signalétique complémentaire.",
    image: "/images/produits/cones-porte-outils.jpg",
    familySlug: "cones-et-balisage",
  },
  {
    slug: "lisse-cone-rigide-2m",
    name: "Lisse de cône rigide 2 m",
    shortDescription:
      "Barre rigide rétroréfléchissante pour relier vos cônes et matérialiser un alignement net.",
    image: "/images/produits/lisse-cone-rigide-2m.jpg",
    familySlug: "cones-et-balisage",
  },
  {
    slug: "lisse-cone-souple",
    name: "Lisse de cône souple",
    shortDescription:
      "Lisse flexible qui absorbe les chocs tout en délimitant clairement la zone.",
    image: "/images/produits/lisse-cone-souple.jpg",
    familySlug: "cones-et-balisage",
  },
  {
    slug: "connecteur-de-lisses",
    name: "Connecteur de lisses",
    shortDescription:
      "Accessoire de jonction pour prolonger et assembler vos lisses en toute simplicité.",
    image: "/images/produits/connecteur-de-lisses.jpg",
    familySlug: "cones-et-balisage",
  },
  {
    slug: "rehausse-de-cones",
    name: "Rehausse de cônes",
    shortDescription:
      "Augmentez la hauteur et la visibilité de vos cônes existants en un seul geste.",
    image: "/images/produits/rehausse-de-cones.jpg",
    familySlug: "cones-et-balisage",
  },
  {
    slug: "enrouleur-balisage-95m",
    name: "Enrouleur de balisage 9,5 m",
    shortDescription:
      "Ruban de balisage rétractable pour délimiter rapidement de larges périmètres.",
    image: "/images/produits/enrouleur-balisage-95m.jpg",
    familySlug: "cones-et-balisage",
  },

  // ---- Barrières de chantier ------------------------------------------------
  {
    slug: "barriere-tp-retroreflechissante",
    name: "Barrière TP rétroréfléchissante",
    shortDescription:
      "Barrière haute visibilité de jour comme de nuit pour sécuriser vos chantiers de voirie.",
    image: "/images/produits/barriere-tp-retroreflechissante.jpg",
    familySlug: "barrieres-de-chantier",
  },
  {
    slug: "barriere-chantier-tp",
    name: "Barrière de chantier TP",
    shortDescription:
      "Barrière robuste conforme aux exigences des travaux publics.",
    image: "/images/produits/barriere-chantier-tp.jpg",
    familySlug: "barrieres-de-chantier",
  },
  {
    slug: "barriere-chantier-ouverte",
    name: "Barrière de chantier ouverte",
    shortDescription:
      "Modèle ajouré et léger, facile à transporter et à mettre en place.",
    image: "/images/produits/barriere-chantier-ouverte.jpg",
    familySlug: "barrieres-de-chantier",
  },
  {
    slug: "barriere-chantier-double",
    name: "Barrière de chantier double",
    shortDescription:
      "Double lisse pour un balisage renforcé des zones à fort passage.",
    image: "/images/produits/barriere-chantier-double.jpg",
    familySlug: "barrieres-de-chantier",
  },
  {
    slug: "barriere-foule-evenementielle",
    name: "Barrière de foule événementielle",
    shortDescription:
      "Barrière de canalisation du public, stable et assemblable pour vos événements.",
    image: "/images/produits/barriere-foule-evenementielle.jpg",
    familySlug: "barrieres-de-chantier",
  },
  {
    slug: "plot-cloture-chantier",
    name: "Plot de clôture de chantier",
    shortDescription:
      "Plot lesté pour maintenir grilles et clôtures de chantier sans ancrage au sol.",
    image: "/images/produits/plot-cloture-chantier.jpg",
    familySlug: "barrieres-de-chantier",
  },

  // ---- Signalisation lumineuse ----------------------------------------------
  {
    slug: "lampe-pour-cones",
    name: "Lampe pour cônes",
    shortDescription:
      "Feu de signalisation à fixer sur cône pour renforcer la visibilité nocturne.",
    image: "/images/produits/lampe-pour-cones.jpg",
    familySlug: "signalisation-lumineuse",
  },
  {
    slug: "lampe-solaire-pour-cones",
    name: "Lampe solaire pour cônes",
    shortDescription:
      "Éclairage autonome sans pile ni câblage, rechargé par la lumière du jour.",
    image: "/images/produits/lampe-solaire-pour-cones.jpg",
    familySlug: "signalisation-lumineuse",
  },
  {
    slug: "lampe-solaire-pour-balises",
    name: "Lampe solaire pour balises",
    shortDescription:
      "Signalisation lumineuse autonome parfaitement adaptée aux balises de jalonnement.",
    image: "/images/produits/lampe-solaire-pour-balises.jpg",
    familySlug: "signalisation-lumineuse",
  },
  {
    slug: "lampe-solaire-polyvalente",
    name: "Lampe solaire polyvalente",
    shortDescription:
      "Feu solaire multifixation pour signaler tout type d'obstacle ou de zone.",
    image: "/images/produits/lampe-solaire-polyvalente.jpg",
    familySlug: "signalisation-lumineuse",
  },
  {
    slug: "lampe-avertissement-piles",
    name: "Lampe d'avertissement à piles",
    shortDescription:
      "Feu clignotant fiable, prêt à l'emploi pour toute signalisation temporaire.",
    image: "/images/produits/lampe-avertissement-piles.jpg",
    familySlug: "signalisation-lumineuse",
  },
  {
    slug: "lampe-avertissement-solaire",
    name: "Lampe d'avertissement solaire",
    shortDescription:
      "Feu clignotant autonome, sans entretien et économique sur la durée.",
    image: "/images/produits/lampe-avertissement-solaire.jpg",
    familySlug: "signalisation-lumineuse",
  },
  {
    slug: "lanterne-360",
    name: "Lanterne 360°",
    shortDescription:
      "Feu omnidirectionnel visible sous tous les angles pour les obstacles isolés.",
    image: "/images/produits/lanterne-360.jpg",
    familySlug: "signalisation-lumineuse",
  },
  {
    slug: "palette-signalisation-lumineuse",
    name: "Palette de signalisation lumineuse",
    shortDescription:
      "Palette éclairante pour guider et réguler la circulation en toute sécurité.",
    image: "/images/produits/palette-signalisation-lumineuse.jpg",
    familySlug: "signalisation-lumineuse",
  },
  {
    slug: "baton-guidage-lumineux",
    name: "Bâton de guidage lumineux",
    shortDescription:
      "Bâton lumineux maniable pour orienter véhicules et piétons de nuit.",
    image: "/images/produits/baton-guidage-lumineux.jpg",
    familySlug: "signalisation-lumineuse",
  },
  {
    slug: "bache-lumineuse-signalisation",
    name: "Bâche lumineuse de signalisation",
    shortDescription:
      "Panneau souple rétroéclairé pour une signalisation visible à grande distance.",
    image: "/images/produits/bache-lumineuse-signalisation.jpg",
    familySlug: "signalisation-lumineuse",
  },

  // ---- Passages de câbles ---------------------------------------------------
  {
    slug: "passage-cables-10-voies",
    name: "Passage de câbles 10 voies",
    shortDescription:
      "Protège jusqu'à 10 câbles du passage des véhicules et des piétons.",
    image: "/images/produits/passage-cables-10-voies.jpg",
    familySlug: "passages-de-cables",
  },
  {
    slug: "passage-cables-50-75",
    name: "Passage de câbles 50/75 mm",
    shortDescription:
      "Passe-câbles résistant pour sécuriser le franchissement des gaines au sol.",
    image: "/images/produits/passage-cables-50-75.jpg",
    familySlug: "passages-de-cables",
  },
  {
    slug: "butoirs-de-parking",
    name: "Butoirs de parking",
    shortDescription:
      "Délimitez les places et protégez murs et véhicules contre les chocs.",
    image: "/images/produits/butoirs-de-parking.jpg",
    familySlug: "passages-de-cables",
  },

  // ---- Ralentisseurs --------------------------------------------------------
  {
    slug: "ralentisseur-ral-permanent",
    name: "Ralentisseur RAL permanent",
    shortDescription:
      "Ralentisseur modulaire durable pour réduire la vitesse sur voies privées.",
    image: "/images/produits/ralentisseur-ral-permanent.jpg",
    familySlug: "ralentisseurs",
  },
  {
    slug: "ralentisseur-pins",
    name: "Ralentisseur Pin's",
    shortDescription:
      "Coussin compact pour apaiser la circulation sur les zones sensibles.",
    image: "/images/produits/ralentisseur-pins.jpg",
    familySlug: "ralentisseurs",
  },
  {
    slug: "ralentisseur-transit",
    name: "Ralentisseur Transit",
    shortDescription:
      "Conçu pour les fortes contraintes de trafic et le passage des poids lourds.",
    image: "/images/produits/ralentisseur-transit.jpg",
    familySlug: "ralentisseurs",
  },
  {
    slug: "ralentisseur-temporaire",
    name: "Ralentisseur temporaire",
    shortDescription:
      "Solution amovible pour limiter la vitesse le temps d'un chantier ou d'un événement.",
    image: "/images/produits/ralentisseur-temporaire.jpg",
    familySlug: "ralentisseurs",
  },
  {
    slug: "coussin-berlinois",
    name: "Coussin berlinois",
    shortDescription:
      "Dispositif d'apaisement de la vitesse respectueux des bus et véhicules de secours.",
    image: "/images/produits/coussin-berlinois.jpg",
    familySlug: "ralentisseurs",
  },

  // ---- Balises et potelets --------------------------------------------------
  {
    slug: "balise-jalonnement-rigide",
    name: "Balise de jalonnement rigide",
    shortDescription:
      "Balise de guidage stable et durable pour matérialiser clairement les itinéraires.",
    image: "/images/produits/balise-jalonnement-rigide.jpg",
    familySlug: "balises-et-potelets",
  },
  {
    slug: "balise-jalonnement-flexible",
    name: "Balise de jalonnement flexible",
    shortDescription:
      "Balise qui se relève après un choc, idéale en bord de voie.",
    image: "/images/produits/balise-jalonnement-flexible.jpg",
    familySlug: "balises-et-potelets",
  },
  {
    slug: "balise-jalonnement-articulee",
    name: "Balise de jalonnement articulée",
    shortDescription:
      "Articulation au sol qui encaisse les impacts et limite fortement la casse.",
    image: "/images/produits/balise-jalonnement-articulee.jpg",
    familySlug: "balises-et-potelets",
  },
  {
    slug: "balise-auto-redressante",
    name: "Balise auto-redressante",
    shortDescription:
      "Revient automatiquement en position après le passage d'un véhicule.",
    image: "/images/produits/balise-auto-redressante.jpg",
    familySlug: "balises-et-potelets",
  },
  {
    slug: "balise-delineateur-souple",
    name: "Balise délinéateur souple",
    shortDescription:
      "Délinéateur flexible haute visibilité pour séparer ou guider les flux.",
    image: "/images/produits/balise-delineateur-souple.jpg",
    familySlug: "balises-et-potelets",
  },
  {
    slug: "accessoires-pose-balises",
    name: "Accessoires de pose balises",
    shortDescription:
      "Socles, colles et fixations pour installer vos balises sur tout type de support.",
    image: "/images/produits/accessoires-pose-balises.jpg",
    familySlug: "balises-et-potelets",
  },
  {
    slug: "potelet-chaine-rouge-blanc",
    name: "Potelet à chaîne rouge/blanc",
    shortDescription:
      "Potelet de délimitation à chaîne pour organiser piétons et zones d'accès.",
    image: "/images/produits/potelet-chaine-rouge-blanc.jpg",
    familySlug: "balises-et-potelets",
  },
  {
    slug: "potelet-chaine-jaune-noir",
    name: "Potelet à chaîne jaune/noir",
    shortDescription:
      "Version haute visibilité pour signaler les zones de danger ou de réserve.",
    image: "/images/produits/potelet-chaine-jaune-noir.jpg",
    familySlug: "balises-et-potelets",
  },

  // ---- Séparateurs de voies -------------------------------------------------
  {
    slug: "separateur-voie-modulable",
    name: "Séparateur de voie modulable",
    shortDescription:
      "Séparateur emboîtable pour créer des couloirs de circulation sur mesure.",
    image: "/images/produits/separateur-voie-modulable.jpg",
    familySlug: "separateurs-de-voies",
  },
  {
    slug: "separateur-voie-lourd",
    name: "Séparateur de voie lourd",
    shortDescription:
      "Module robuste pour canaliser durablement un trafic intense.",
    image: "/images/produits/separateur-voie-lourd.jpg",
    familySlug: "separateurs-de-voies",
  },
  {
    slug: "separateur-voie-leste",
    name: "Séparateur de voie lesté",
    shortDescription:
      "Se remplit d'eau ou de sable pour une stabilité maximale sans ancrage.",
    image: "/images/produits/separateur-voie-leste.jpg",
    familySlug: "separateurs-de-voies",
  },
  {
    slug: "separateur-piste-cyclable",
    name: "Séparateur piste cyclable",
    shortDescription:
      "Protège les cyclistes en matérialisant une séparation nette de la chaussée.",
    image: "/images/produits/separateur-piste-cyclable.jpg",
    familySlug: "separateurs-de-voies",
  },

  // ---- Passerelles ----------------------------------------------------------
  {
    slug: "passerelle-antiderapante-chantier",
    name: "Passerelle antidérapante de chantier",
    shortDescription:
      "Franchissement sécurisé des tranchées grâce à une surface antidérapante.",
    image: "/images/produits/passerelle-antiderapante-chantier.jpg",
    familySlug: "passerelles",
  },
  {
    slug: "passerelle-pour-vehicules",
    name: "Passerelle pour véhicules",
    shortDescription:
      "Pont de chantier résistant au passage des engins et des véhicules.",
    image: "/images/produits/passerelle-pour-vehicules.jpg",
    familySlug: "passerelles",
  },
  {
    slug: "passerelle-pietonne-chantier",
    name: "Passerelle piétonne de chantier",
    shortDescription:
      "Cheminement piéton sûr et conforme au-dessus des zones de travaux.",
    image: "/images/produits/passerelle-pietonne-chantier.jpg",
    familySlug: "passerelles",
  },

  // ---- Panneaux et accessoires ----------------------------------------------
  {
    slug: "panneau-info-chantier",
    name: "Panneau info chantier",
    shortDescription:
      "Communiquez clairement les informations et consignes de votre chantier.",
    image: "/images/produits/panneau-info-chantier.jpg",
    familySlug: "panneaux-et-accessoires",
  },
  {
    slug: "miroir-routier",
    name: "Miroir routier",
    shortDescription:
      "Améliore la visibilité aux sorties et angles morts pour prévenir les accidents.",
    image: "/images/produits/miroir-routier.jpg",
    familySlug: "panneaux-et-accessoires",
  },
  {
    slug: "lest-pour-panneaux",
    name: "Lest pour panneaux",
    shortDescription:
      "Maintient fermement vos panneaux temporaires, même face au vent.",
    image: "/images/produits/lest-pour-panneaux.jpg",
    familySlug: "panneaux-et-accessoires",
  },
  {
    slug: "socle-pour-panneaux",
    name: "Socle pour panneaux",
    shortDescription:
      "Base stable et réutilisable pour installer rapidement vos panneaux.",
    image: "/images/produits/socle-pour-panneaux.jpg",
    familySlug: "panneaux-et-accessoires",
  },
  {
    slug: "base-multi-support",
    name: "Base multi-support",
    shortDescription:
      "Support universel compatible avec panneaux, balises et mâts.",
    image: "/images/produits/base-multi-support.jpg",
    familySlug: "panneaux-et-accessoires",
  },
  {
    slug: "kit-de-fixation",
    name: "Kit de fixation",
    shortDescription:
      "Ensemble complet de visserie et colliers pour des poses rapides et fiables.",
    image: "/images/produits/kit-de-fixation.jpg",
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
    .replace(/[\u0300-\u036f]/g, "")
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
