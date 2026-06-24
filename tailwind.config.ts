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
          DEFAULT: "#0F172A", // Bleu nuit — titres, header, accent
          dark: "#0B1120", // hover / fin de dégradé
          light: "#1E293B", // variante claire (même famille slate)
        },
        accent: {
          DEFAULT: "#E67E22", // Orange chantier — FONDS de boutons CTA uniquement
          dark: "#CF6E16", // hover de fond orange
          // Orange pour le TEXTE sur fond clair : 5,3:1 sur blanc → WCAG AA.
          // (Le #E67E22 et #CF6E16 ne passent PAS le 4.5:1 en texte.)
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
