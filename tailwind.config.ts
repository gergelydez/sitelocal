import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#09090B",
        bg2: "#0F0F12",
        surface: "#131316",
        text: "#FAFAFA",
        muted: "#9B9BA3",
        trust: "#3B82F6",
        emerald: "#10B981",
        glassBorder: "rgba(255,255,255,0.10)",
      },
      fontFamily: {
        display: ["var(--font-jakarta)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
