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
        primary: {
          dark: "#0A2A2A",
          light: "#F7F3E8",
        },
        accent: {
          gold: "#D4AF7A",
          green: "#2C6E5C",
        },
        glass: "rgba(247, 243, 232, 0.92)",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        accent: ["var(--font-playfair)", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to:   { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          from: { transform: "translateX(-50%)" },
          to:   { transform: "translateX(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "float-up": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":       { transform: "translateY(-12px)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%":       { opacity: "0.5" },
        },
      },
      animation: {
        marquee:         "marquee 45s linear infinite",
        "marquee-reverse": "marqueeReverse 45s linear infinite",
        shimmer:         "shimmer 4s linear infinite",
        "float-up":      "float-up 4s ease-in-out infinite",
      },
      boxShadow: {
        "gold-glow": "0 0 40px rgba(212, 175, 122, 0.25)",
        "deep":      "0 32px 80px rgba(10, 42, 42, 0.18)",
      },
    },
  },
  plugins: [],
};
export default config;
