import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        border: "var(--border)",
        foreground: "var(--foreground)",
        glass: "var(--glass)",
        primary: "var(--primary)",
        "primary-glow": "var(--primary-glow)",
        secondary: "var(--secondary)",
        surface: "var(--surface)",
        "surface-hover": "var(--surface-hover)",
      },
      maxWidth: {
        container: "var(--max-width)",
      },
    },
  },
};
export default config;
