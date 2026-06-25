import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design system MAPESIA
        primary: {
          DEFAULT: "#082654", // Bleu MAPESIA — identique au logo
          dark: "#051A3F", // hover / fin de dégradé
          light: "#0D3570", // variante claire (sections sombres)
        },
        accent: {
          DEFAULT: "#FF7A00", // Orange vif MAPESIA — FONDS de boutons CTA uniquement
          dark: "#E06A00", // hover de fond orange
          // Orange pour le TEXTE sur fond clair : 5,3:1 sur blanc → WCAG AA.
          // (Le #F07820 ne passe PAS le 4.5:1 en texte sur blanc.)
          text: "#A85410",
        },
        surface: "#F5F5F5", // Gris clair — fonds de sections
      },
      fontFamily: {
        // Variables injectées par next/font dans le layout
        heading: ["var(--font-poppins)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Corps minimum 18px imposé par le cahier des charges
        base: ["1.125rem", { lineHeight: "1.7" }], // 18px
        lg: ["1.25rem", { lineHeight: "1.7" }],
        // H1 responsive 40 -> 60px
        h1: ["2.5rem", { lineHeight: "1.1", fontWeight: "700" }],
        "h1-lg": ["3.75rem", { lineHeight: "1.05", fontWeight: "700" }],
      },
      maxWidth: {
        content: "1200px",
      },
    },
  },
  plugins: [],
};

export default config;
