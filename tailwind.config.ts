import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        legal: {
          50: "#f8f6f1",
          100: "#e8e2d5",
          200: "#d4cbb8",
          300: "#b8a88e",
          400: "#9a8768",
          500: "#d4a843",
          600: "#b8923a",
          700: "#1e3a5f",
          800: "#2d5a8a",
          900: "#0f1f3a",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Playfair Display", "Georgia", "serif"],
        lora:    ["var(--font-lora)",    "Lora",             "Georgia", "serif"],
        serif:   ["var(--font-serif)",   "Crimson Text",     "Georgia", "serif"],
        mono:    ["var(--font-mono)",    "IBM Plex Mono",    "monospace"],
        sans:    ["var(--font-sans)",    "Inter",     "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "paper-grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
