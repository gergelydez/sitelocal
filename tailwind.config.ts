import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0A",
        bg2: "#111111",
        surface: "#141414",
        text: "#FAFAFA",
        muted: "#8F8F8F",
        violet: "#8A0F1A",
        cyan: "#D7263D",
        pink: "#F2F2F2",
        glassBorder: "rgba(255,255,255,0.12)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
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
