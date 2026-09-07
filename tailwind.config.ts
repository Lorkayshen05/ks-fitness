import type { Config } from "tailwindcss";

/**
 * Two brands share this config. Keep the `brand`/`slate`-facing tokens for the
 * KS Fitness site under `app/(site)`, and the warm `charcoal`/`chilli`/
 * `turmeric` set for the Gepuklah page under `app/gepuklah`. `fade-up` is used
 * by both, so change it with both in mind.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        /* KS Fitness (also the app-wide default). */
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        /* Gepuklah: poster display face and body face, scoped to that subtree. */
        display: ["var(--font-display)", "Impact", "system-ui", "sans-serif"],
        jakarta: ["var(--font-jakarta)", "system-ui", "sans-serif"],
      },
      colors: {
        /* --- KS Fitness --- */
        brand: {
          purple: "#a855f7",
          pink: "#ec4899",
        },
        /* --- Gepuklah --- */
        /* Warm charcoal — the base the restaurant page sits on. */
        charcoal: {
          950: "#0F0B09",
          900: "#171110",
          800: "#211816",
          700: "#2D211D",
          600: "#3D2D26",
          500: "#523D33",
        },
        /* Rich red — sambal. */
        chilli: {
          400: "#F04E32",
          500: "#E23A20",
          600: "#C42B14",
          700: "#9E1E0C",
          800: "#741507",
        },
        /* Deep yellow — turmeric, the high-contrast accent. */
        turmeric: {
          200: "#FFE898",
          300: "#FFD84D",
          400: "#FFC61A",
          500: "#F0A500",
          600: "#C98400",
        },
        /* Warm off-white for body copy on charcoal. */
        cream: {
          50: "#FFF8EC",
          100: "#F7EAD3",
          200: "#E6D2B2",
          300: "#C9AF8B",
        },
        /* Single cool accent, for the bayam / "open" signals. */
        pandan: {
          400: "#9BCB3B",
          500: "#7DA82B",
        },
      },
      boxShadow: {
        slab: "0 18px 0 -6px rgba(0,0,0,0.35)",
        lift: "0 24px 60px -24px rgba(0,0,0,0.85)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.7" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "flame-pulse": {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.06)" },
        },
        "live-ping": {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "75%, 100%": { transform: "scale(2.2)", opacity: "0" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.97)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "pulse-glow": "pulse-glow 6s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
        "marquee-slow": "marquee 48s linear infinite",
        "flame-pulse": "flame-pulse 5s ease-in-out infinite",
        "live-ping": "live-ping 1.8s cubic-bezier(0,0,0.2,1) infinite",
        "pop-in": "pop-in 0.28s cubic-bezier(0.16,1,0.3,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
