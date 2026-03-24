/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        argmin: {
          dark: "#1a1a1a",
          mid: "#4a4a4a",
          light: "#6a6a6a",
          accent: "#2d6a9f",
          "accent-hover": "#245a87",
          bg: "#fafafa",
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
