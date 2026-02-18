import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2463eb",
        "background-light": "#f6f6f8",
        "background-dark": "#111621",
        "slate-dark": "#0f172a",
        "industrial-gray": "#64748b",
        "neutral-light": "#f0f1f4",
        "neutral-border": "#e5e7eb",
        "neutral-bg": "#f8fafc",
        "border-light": "#e5e7eb",
        "neutral-text": "#4b5563",
        surface: "#ffffff",
        success: "#10B981",
        warning: "#EF4444",
        amber: "#F59E0B",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
export default config;
