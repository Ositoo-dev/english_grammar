import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        body: ["DM Sans", "sans-serif"],
        headline: ["Playfair Display", "serif"],
        code: ["JetBrains Mono", "monospace"],
      },
      colors: {
        border: 'var(--border)',
        'border-bright': 'var(--border-bright)',
        background: 'var(--bg-base)',
        surface: 'var(--bg-surface)',
        elevated: 'var(--bg-elevated)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-hint': 'var(--text-hint)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
            DEFAULT: 'var(--secondary)',
            foreground: 'var(--secondary-foreground)',
        },
        popover: {
          DEFAULT: 'var(--bg-surface)',
          foreground: 'var(--text-primary)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          dim: 'var(--accent-dim)',
          glow: 'var(--accent-glow)',
        },
        'accent-2': {
            DEFAULT: 'var(--accent-2)',
            dim: 'var(--accent-2-dim)',
            text: 'var(--accent-2-text)',
        },
        green: {
          DEFAULT: 'var(--green)',
          dim: 'var(--green-dim)',
          text: 'var(--green-text)',
        },
        red: {
          DEFAULT: 'var(--red)',
          dim: 'var(--red-dim)',
          text: 'var(--red-text)',
        },
        amber: {
            DEFAULT: 'var(--amber)',
            dim: 'var(--amber-dim)',
            text: 'var(--amber-text)',
        }
      },
      borderRadius: {
        xl: "12px",
        lg: "8px",
        md: "6px",
        sm: "4px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: '0' },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: '0' },
        },
        "shake": {
          "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(2px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-4px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(4px, 0, 0)" },
        },
        "draw-in": {
            from: { 'clipPath': 'polygon(0 0, 0 0, 0 100%, 0% 100%)' },
            to: { 'clipPath': 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "shake": "shake 400ms ease-in-out",
        "draw-in": "draw-in 300ms ease-out forwards",
      },
      spacing: {
        '14': '3.5rem', // 56px
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
