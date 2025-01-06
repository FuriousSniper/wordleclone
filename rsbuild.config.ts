import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginLess } from "@rsbuild/plugin-less";

export default defineConfig({
  plugins: [pluginReact(), pluginLess()],
  html: {
    favicon: "./public/icon.png",
    title: "Wordle",
    meta: {
      description: "Yet another clone of a popular word game.",
      site_name: "Wordle",
      image: "/wordle-logo.png",
      "theme-color": "#125c1d",
      "og:image:height": "64",
      "og:image:width": "64",
      "og:site_name": "Wordle",
      "og:description": "Yet another clone of a popular word game.",
      "og:image": "/wordle-logo.png",
      "twitter:title": "Wordle",
      "twitter:card": "summary",
      "twitter:description": "Yet another clone of a popular word game.",
    },
  },
});
