// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://argmin.co",
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: cloudflare(),
});
