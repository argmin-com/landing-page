// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://argmin.co",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
});
