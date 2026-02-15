import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1E40AF',
        },
        slate: {
          dark: '#1F2937',
          medium: '#374151',
        },
        success: '#10B981',
        warning: '#EF4444',
        amber: '#F59E0B',
        background: '#F9FAFB',
      },
      borderRadius: {
        'card': '12px',
      },
    },
  },
  plugins: [],
};
export default config;
