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
        primary: "#1a1a2e",
        secondary: "#16213e",
        accent: "#0f3460",
        highlight: "#e94560",
        "text-primary": "#ffffff",
        "text-secondary": "#b8b8b8",
        "card-bg": "#1e2749",
        "card-hover": "#2a3a5f",
        "border-color": "#2d3a52",
        success: "#4caf50",
        movie: "#ff6b6b",
        series: "#4ecdc4",
      },
    },
  },
  plugins: [],
};
export default config;
