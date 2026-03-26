// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://argmin.co",
  output: "static",

  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],

  adapter: cloudflare(),

  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
