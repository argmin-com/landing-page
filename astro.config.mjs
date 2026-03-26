// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://argmin.co",
  output: "static",

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],

  adapter: cloudflare(),
});
