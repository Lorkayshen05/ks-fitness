import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        // Deep teal: institutional without being corporate-blue.
        brand: {
          50: "#eff8f7",
          100: "#d8eeec",
          200: "#b0ddd9",
          300: "#7fc4bf",
          400: "#4ca49f",
          500: "#2f8781",
          600: "#226c68",
          700: "#1b5754",
          800: "#194745",
          900: "#153a38",
        },
        // Warm-shifted neutrals; the text scale and every surface.
        ink: {
          50: "#f7f9fa",
          100: "#eef2f4",
          200: "#dde4e8",
          300: "#c2ced5",
          400: "#94a6b1",
          500: "#6b8090",
          600: "#4e6473",
          700: "#3a4c59",
          800: "#25333d",
          900: "#141f27",
        },
        // Reserved for caution notices, never for decoration.
        sand: {
          100: "#fdf4e7",
          300: "#f2ddb8",
          500: "#c1863c",
          700: "#7d5320",
        },
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
