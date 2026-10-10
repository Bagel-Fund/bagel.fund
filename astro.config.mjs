// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://bagel.fund",

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: [
    {
      provider: fontProviders.local(),
      name: "Departure Mono",
      cssVariable: "--font-departure-mono",
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/departure-mono.woff2"],
            weight: 400,
            style: "normal",
          },
        ],
      },
    },
  ],

  adapter: cloudflare(),
});