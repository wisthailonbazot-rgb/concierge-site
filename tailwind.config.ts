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
        navy: {
          950: "#030a1f",
          900: "#060D2E",
          800: "#0A1545",
          700: "#0F1D5C",
          600: "#1B2E6E",
          500: "#233A84",
        },
        gold: {
          300: "#FFE57A",
          400: "#FFD166",
          500: "#F5A800",
          600: "#D48F00",
          700: "#A36C00",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "spin-slow": "spin 8s linear infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        gold: "0 0 30px rgba(245, 168, 0, 0.3)",
        "gold-lg": "0 0 60px rgba(245, 168, 0, 0.4)",
        premium: "0 25px 50px -12px rgba(6, 13, 46, 0.8)",
        card: "0 4px 24px rgba(6, 13, 46, 0.15)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #030a1f 0%, #0F1D5C 60%, #030a1f 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
