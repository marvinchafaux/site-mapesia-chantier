/**
 * SOURCE UNIQUE DE VÉRITÉ — zones d'intervention (villes) MAPESIA.
 *
 * Chaque ville génère sa propre page locale : /zones-intervention/<slug>.
 *
 * ⚠️  Coordonnées par ville (phone / address) volontairement VIDES pour
 *     l'instant : il suffit de remplir la chaîne entre guillemets quand le
 *     client communiquera le numéro et l'adresse locaux. Tant qu'une valeur
 *     reste vide "", la page affiche « À venir » (aucun lien cassé).
 *
 *     - phone   : format affiché, ex. "01 23 45 67 89"
 *     - address : adresse postale locale, ex. "12 rue des Travaux, 75011 Paris"
 */

export type City = {
  slug: string;
  name: string;
  region: string;
  /** Phrase courte (carte + meta description). */
  intro: string;
  /** Paragraphe « comment ça fonctionne » sur la page locale. */
  description: string;
  /** ⤵ À REMPLIR plus tard — laisser "" en attendant. */
  phone: string;
  address: string;
};

export const cities: City[] = [
  {
    slug: "paris",
    name: "Paris",
    region: "Île-de-France",
    intro:
      "Matériel de chantier et signalisation pour les pros de Paris et de l'Île-de-France.",
    description:
      "À Paris et en petite couronne, MAPESIA accompagne les entreprises de BTP, les sociétés de voirie et les collectivités sur des chantiers urbains à forte contrainte : interventions sur réseaux, travaux de nuit, événementiel. Vous décrivez votre besoin, nous établissons un devis rapide et organisons la commande en direct avec nos fabricants pour des délais maîtrisés au cœur de la capitale.",
    phone: "",
    address: "",
  },
  {
    slug: "lyon",
    name: "Lyon",
    region: "Auvergne-Rhône-Alpes",
    intro:
      "Votre fournisseur de balisage et de signalisation sur la métropole lyonnaise.",
    description:
      "Deuxième pôle économique français, la métropole de Lyon concentre de grands chantiers de voirie, d'aménagement urbain et de réseaux. MAPESIA y équipe les professionnels en cônes, barrières, signalisation lumineuse et ralentisseurs, avec un interlocuteur unique qui suit votre demande du devis à la livraison sur l'ensemble du Rhône.",
    phone: "",
    address: "",
  },
  {
    slug: "orleans",
    name: "Orléans",
    region: "Centre-Val de Loire",
    intro:
      "Équipements de chantier et de signalisation pour Orléans et le Loiret.",
    description:
      "Carrefour logistique du Centre-Val de Loire, Orléans et son agglomération mobilisent du matériel de signalisation pour la voirie, les zones d'activité et les axes routiers. MAPESIA fournit les professionnels du Loiret en direct des fabricants, avec des conseils techniques et un devis adapté à chaque projet.",
    phone: "",
    address: "",
  },
  {
    slug: "brest",
    name: "Brest",
    region: "Bretagne",
    intro:
      "Matériel de balisage et de sécurité pour les chantiers de Brest et du Finistère.",
    description:
      "Grand port de l'ouest breton, Brest accueille des chantiers portuaires, littoraux et urbains exigeants en matière de signalisation. MAPESIA accompagne les entreprises du Finistère avec une gamme complète de balisage et de protection, livrée en direct fabricant et chiffrée rapidement.",
    phone: "",
    address: "",
  },
  {
    slug: "bordeaux",
    name: "Bordeaux",
    region: "Nouvelle-Aquitaine",
    intro:
      "Fournisseur de signalisation et d'équipements de chantier sur la métropole bordelaise.",
    description:
      "Portée par une forte croissance urbaine, la métropole de Bordeaux multiplie les chantiers d'aménagement, de tramway et de voirie. MAPESIA y équipe les professionnels de Gironde en cônes, barrières et signalisation, avec des tarifs pensés pour les achats par volume et un suivi personnalisé.",
    phone: "",
    address: "",
  },
  {
    slug: "toulouse",
    name: "Toulouse",
    region: "Occitanie",
    intro:
      "Matériel de chantier et de signalisation pour Toulouse et la Haute-Garonne.",
    description:
      "Métropole aéronautique en pleine expansion, Toulouse génère de nombreux chantiers en zones d'activité et en périurbain. MAPESIA fournit les professionnels de Haute-Garonne en matériel de balisage, séparation et signalisation lumineuse, du conseil à la livraison sans intermédiaire.",
    phone: "",
    address: "",
  },
  {
    slug: "quimper",
    name: "Quimper",
    region: "Bretagne",
    intro:
      "Équipements de balisage et de voirie pour Quimper et la Cornouaille.",
    description:
      "Au cœur de la Cornouaille, Quimper et les communes du sud-Finistère ont besoin de matériel fiable pour la voirie communale et les chantiers locaux. MAPESIA accompagne collectivités et entreprises avec une gamme complète et un devis réactif, en direct des fabricants.",
    phone: "",
    address: "",
  },
  {
    slug: "strasbourg",
    name: "Strasbourg",
    region: "Grand Est",
    intro:
      "Signalisation et matériel de chantier pour l'eurométropole de Strasbourg.",
    description:
      "Capitale européenne et eurométropole frontalière, Strasbourg développe pistes cyclables, transports et aménagements urbains. MAPESIA équipe les professionnels du Bas-Rhin en balisage, barrières et signalisation, avec un interlocuteur unique et des délais maîtrisés.",
    phone: "",
    address: "",
  },
  {
    slug: "marseille",
    name: "Marseille",
    region: "Provence-Alpes-Côte d'Azur",
    intro:
      "Matériel de chantier et de signalisation pour Marseille et les Bouches-du-Rhône.",
    description:
      "Premier port de France, Marseille concentre chantiers urbains, portuaires et d'infrastructures de grande ampleur. MAPESIA fournit les professionnels des Bouches-du-Rhône en cônes, balises et signalisation lumineuse, avec des conditions adaptées aux pros et un suivi de A à Z.",
    phone: "",
    address: "",
  },
  {
    slug: "nantes",
    name: "Nantes",
    region: "Pays de la Loire",
    intro:
      "Votre fournisseur de balisage et de signalisation sur la métropole nantaise.",
    description:
      "Métropole dynamique des Pays de la Loire, Nantes mène d'importants projets d'aménagement urbain et de mobilité. MAPESIA y accompagne les professionnels de Loire-Atlantique avec une gamme complète de matériel de chantier, chiffrée rapidement et livrée en direct fabricant.",
    phone: "",
    address: "",
  },
  {
    slug: "reims",
    name: "Reims",
    region: "Grand Est",
    intro:
      "Équipements de chantier et de signalisation pour Reims et la Marne.",
    description:
      "Au carrefour d'axes routiers et de zones logistiques majeures, Reims et la Marne sollicitent régulièrement du matériel de signalisation et de balisage. MAPESIA fournit les professionnels locaux en direct des fabricants, avec un devis rapide et un accompagnement sur mesure.",
    phone: "",
    address: "",
  },
  {
    slug: "lille",
    name: "Lille",
    region: "Hauts-de-France",
    intro:
      "Matériel de chantier et de signalisation pour la métropole lilloise.",
    description:
      "Métropole dense et frontalière, Lille et la MEL concentrent chantiers de voirie, réseaux et rénovation urbaine. MAPESIA équipe les professionnels du Nord en cônes, barrières et signalisation, avec des tarifs optimisés pour les pros et un interlocuteur unique.",
    phone: "",
    address: "",
  },
  {
    slug: "roubaix",
    name: "Roubaix",
    region: "Hauts-de-France",
    intro:
      "Balisage et signalisation de chantier pour Roubaix et la métropole.",
    description:
      "Engagée dans de vastes programmes de rénovation urbaine, Roubaix génère de nombreux chantiers de voirie et d'aménagement. MAPESIA accompagne les professionnels et collectivités du Nord avec une gamme complète de balisage et de protection, livrée sans intermédiaire et chiffrée rapidement.",
    phone: "",
    address: "",
  },
  {
    slug: "metz",
    name: "Metz",
    region: "Grand Est",
    intro:
      "Équipements de chantier et de signalisation pour Metz et la Moselle.",
    description:
      "Aux portes du Luxembourg, Metz et la Moselle connaissent une forte activité routière et de chantiers transfrontaliers. MAPESIA fournit les professionnels locaux en signalisation, balisage et ralentisseurs, avec un devis réactif et un suivi du projet jusqu'à la livraison.",
    phone: "",
    address: "",
  },
  {
    slug: "mulhouse",
    name: "Mulhouse",
    region: "Grand Est",
    intro:
      "Matériel de chantier et de signalisation pour Mulhouse et le Haut-Rhin.",
    description:
      "Pôle industriel frontalier de la Suisse et de l'Allemagne, Mulhouse mobilise du matériel de signalisation pour ses zones d'activité et sa voirie. MAPESIA équipe les professionnels du Haut-Rhin en direct des fabricants, avec des conseils techniques et des tarifs adaptés aux volumes.",
    phone: "",
    address: "",
  },
  {
    slug: "tours",
    name: "Tours",
    region: "Centre-Val de Loire",
    intro:
      "Signalisation et balisage de chantier pour Tours et l'Indre-et-Loire.",
    description:
      "Au cœur du Val de Loire, Tours et l'Indre-et-Loire conjuguent aménagements urbains et préservation du patrimoine. MAPESIA accompagne les professionnels locaux avec une gamme complète de matériel de chantier, un devis rapide et une livraison en direct fabricant.",
    phone: "",
    address: "",
  },
  {
    slug: "perpignan",
    name: "Perpignan",
    region: "Occitanie",
    intro:
      "Matériel de chantier et de signalisation pour Perpignan et les Pyrénées-Orientales.",
    description:
      "Aux portes de l'Espagne et de la Méditerranée, Perpignan et les Pyrénées-Orientales sollicitent du matériel de signalisation pour la voirie, le littoral et les axes frontaliers. MAPESIA fournit les professionnels locaux avec un interlocuteur unique et des délais maîtrisés.",
    phone: "",
    address: "",
  },
  {
    slug: "valence",
    name: "Valence",
    region: "Auvergne-Rhône-Alpes",
    intro:
      "Équipements de balisage et de signalisation pour Valence et la Drôme.",
    description:
      "Sur l'axe rhodanien, plateforme logistique majeure, Valence et la Drôme génèrent une activité soutenue de chantiers et d'infrastructures. MAPESIA équipe les professionnels locaux en cônes, barrières et signalisation lumineuse, en direct des fabricants et avec un devis réactif.",
    phone: "",
    address: "",
  },
  {
    slug: "troyes",
    name: "Troyes",
    region: "Grand Est",
    intro:
      "Matériel de chantier et de signalisation pour Troyes et l'Aube.",
    description:
      "Grand pôle logistique au centre historique préservé, Troyes et l'Aube ont besoin de matériel adapté pour la voirie et les aménagements urbains. MAPESIA accompagne les professionnels locaux avec une gamme complète, des tarifs pros et un suivi personnalisé du devis à la livraison.",
    phone: "",
    address: "",
  },
  {
    slug: "rennes",
    name: "Rennes",
    region: "Bretagne",
    intro:
      "Votre fournisseur de balisage et de signalisation sur la métropole rennaise.",
    description:
      "Métropole bretonne en pleine expansion, Rennes mène d'importants projets de mobilité, de voirie et d'aménagement. MAPESIA y équipe les professionnels d'Ille-et-Vilaine avec une gamme complète de matériel de chantier, chiffrée rapidement et livrée en direct fabricant.",
    phone: "",
    address: "",
  },
  {
    slug: "auxerre",
    name: "Auxerre",
    region: "Bourgogne-Franche-Comté",
    intro:
      "Équipements de chantier et de signalisation pour Auxerre et l'Yonne.",
    description:
      "Étape majeure sur l'axe Paris-Lyon, Auxerre et l'Yonne sollicitent du matériel de signalisation pour la voirie et les collectivités rurales. MAPESIA fournit les professionnels locaux en direct des fabricants, avec un devis rapide et un accompagnement adapté à chaque chantier.",
    phone: "",
    address: "",
  },
];

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/** Liste des villes (ordre du fichier). */
export function getCities(): City[] {
  return cities;
}

/** Retrouve une ville par son slug, ou undefined. */
export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}

/** Lien d'appel téléphonique d'une ville, ou "#" si non renseigné. */
export function cityTelHref(city: City): string {
  const dial = city.phone.replace(/[^\d+]/g, "");
  return dial ? `tel:${dial}` : "#";
}
