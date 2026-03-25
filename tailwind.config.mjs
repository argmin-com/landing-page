/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        argmin: {
          dark: "#f5f7fb",
          mid: "#eef4ff",
          light: "#dbe7ff",
          accent: "#5da8ff",
          "accent-hover": "#7ab7ff",
          bg: "#001a3a",
          surface: "#08203f",
          "surface-alt": "#04172f",
          border: "#17365f",
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
