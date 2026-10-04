import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '7xl': '1680px',
        'site': '1680px',
        '1680': '1680px',
      },
      screens: {
        'laptop': '1440px',
        'desktop': '1680px',
      },
      colors: {
        background: "#ffffff",
        foreground: "#0a0a0a",
        ggems: {
          green: "#6CD34A",
          greenHover: "#4CAF35",
          greenDark: "#4CAF35",
          greenLight: "#EAF6E5",
          softGreen: "#EAF6E5",
          lightBg: "#F7F9F6",
          darkSection: "#151515",
          primary: "#6CD34A",
          primaryHover: "#4CAF35",
          primaryLight: "#EAF6E5",
          black: "#111111",
          gray: "#6B6B6B",
          dark: "#151515",
          darkCard: "#131A20",
          card: "#FFFFFF",
          border: "#E5E7EB",
          muted: "#6B6B6B",
          // Backward compatibility mappings
          red: "#6CD34A",
          redHover: "#4CAF35",
          redLight: "#EAF6E5",
          yellow: "#6CD34A",
          gold: "#6CD34A",
          yellowHover: "#4CAF35",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-heading)", "Montserrat", "sans-serif"],
        heading: ["var(--font-heading)", "Montserrat", "sans-serif"],
        montserrat: ["var(--font-heading)", "Montserrat", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.06em",
        tighter: "-0.04em",
        tight: "-0.02em",
        widest: "0.2em",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "pulse-slow": "pulseSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
