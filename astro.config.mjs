import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.rustilian.com",
  i18n: {
    defaultLocale: "en",
    locales: ["pt-br", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  output: "static",
  integrations: [
    tailwind(),
    react(),
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          "pt-br": "pt-BR",
        },
      },
    }),
  ],
});
