/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        argmin: {
          dark: "rgb(var(--color-argmin-dark) / <alpha-value>)",
          mid: "rgb(var(--color-argmin-mid) / <alpha-value>)",
          light: "rgb(var(--color-argmin-light) / <alpha-value>)",
          accent: "rgb(var(--color-argmin-accent) / <alpha-value>)",
          "accent-hover": "rgb(var(--color-argmin-accent-hover) / <alpha-value>)",
          bg: "rgb(var(--color-argmin-bg) / <alpha-value>)",
          surface: "rgb(var(--color-argmin-surface) / <alpha-value>)",
          "surface-alt": "rgb(var(--color-argmin-surface-alt) / <alpha-value>)",
          border: "rgb(var(--color-argmin-border) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
};
