import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#E5A93C",
          light: "#F3BA42",
          dark: "#C89028",
          amber: "#F59E0B",
          glow: "rgba(229, 169, 60, 0.35)",
        },
        dark: {
          bg: "#080A0E",
          surface: "#0F131A",
          card: "#131822",
          border: "#1E2638",
          line: "#2A3447",
        },
        light: {
          bg: "#F8FAFC",
          surface: "#FFFFFF",
          card: "#F1F5F9",
          border: "#E2E8F0",
          line: "#CBD5E1",
        },

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        cursive: ["var(--font-cursive)", "cursive"],
      },
      borderRadius: {
        lg: "var(--radius)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
