// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://argmin.co",
  output: "static",
  integrations: [sitemap({
    serialize(item) {
      item.lastmod = new Date().toISOString().split('T')[0];
      return item;
    },
  })],
  vite: {
    plugins: [tailwindcss()],
  },
});
