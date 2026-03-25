/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        argmin: {
          dark: "#111111",
          mid: "#4b5563",
          light: "#5f6b7a",
          accent: "#5da8ff",
          "accent-hover": "#3d8dea",
          bg: "#f8f8f6",
          surface: "#ffffff",
          "surface-alt": "#f1f4f8",
          border: "#d7dee8",
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
