/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        argmin: {
          navy: "#0F2B46",
          azure: "#2D6A9F",
          sky: "#4A9FD9",
          ice: "#E8F4FD",
          white: "#FFFFFF",
          "slate-900": "#111827",
          "slate-700": "#374151",
          "slate-500": "#6B7280",
          "slate-300": "#D1D5DB",
          "slate-100": "#F3F4F6",
          success: "#059669",
          "success-light": "#D1FAE5",
          warning: "#D97706",
          "warning-light": "#FEF3C7",
          error: "#DC2626",
          "error-light": "#FEE2E2",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)"],
        body: ["var(--font-body)"],
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        md: "8px",
        lg: "12px",
        xl: "16px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(15, 43, 70, 0.05)",
        md: "0 4px 6px -1px rgba(15, 43, 70, 0.07), 0 2px 4px -2px rgba(15, 43, 70, 0.05)",
        lg: "0 10px 15px -3px rgba(15, 43, 70, 0.08), 0 4px 6px -4px rgba(15, 43, 70, 0.04)",
        xl: "0 20px 25px -5px rgba(15, 43, 70, 0.10), 0 8px 10px -6px rgba(15, 43, 70, 0.05)",
      },
    },
  },
};
