/**
 * CONTENU ÉDITABLE — « Comment ça marche » et « FAQ ».
 *
 * ⚠️ Textes provisoires fournis comme placeholders : remplace-les par tes
 * contenus définitifs. Tu peux ajouter/retirer des étapes ou des questions
 * librement, le site s'adapte automatiquement.
 */

export const howItWorks = {
  title: "Comment ça marche",
  intro: "Obtenir votre devis en 3 étapes simples.",
  steps: [
    {
      title: "Décrivez votre besoin",
      text: "Indiquez les produits, quantités et délais via le formulaire, par téléphone ou WhatsApp.",
    },
    {
      title: "Recevez votre devis",
      text: "Nous étudions votre demande et revenons vers vous rapidement avec une offre adaptée.",
    },
    {
      title: "Équipez votre chantier",
      text: "Vous validez, nous organisons la suite avec vous, en direct des fabricants.",
    },
  ],
};

export const faq = {
  title: "Questions fréquentes",
  /**
   * ⚠️ Passe `isPlaceholder` à `false` une fois tes réponses validées :
   * cela active le balisage SEO FAQPage (rich results Google).
   */
  isPlaceholder: true,
  items: [
    {
      q: "Faut-il commander en grande quantité ?",
      a: "Non. Nous nous adaptons à vos besoins, du petit chantier au gros volume.",
    },
    {
      q: "Peut-on personnaliser les produits ?",
      a: "Oui : couleurs, marquages et logos sont possibles sur de nombreuses références.",
    },
    {
      q: "Comment obtenir un prix ?",
      a: "Faites une demande de devis : nous revenons vers vous rapidement avec une offre adaptée à votre projet.",
    },
    {
      q: "Travaillez-vous en direct avec les fabricants ?",
      a: "Oui, ce qui nous permet d'optimiser à la fois la qualité et les tarifs pour les professionnels.",
    },
  ],
};
