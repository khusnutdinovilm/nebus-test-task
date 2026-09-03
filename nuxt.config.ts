import { fileURLToPath } from "node:url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",

  devtools: { enabled: true },

  srcDir: "src",

  ssr: false,

  typescript: {
    strict: true,
    typeCheck: false,
  },

  dir: {
    pages: "app/routes",
    layouts: "app/layouts",
  },

  app: {
    head: {
      title: "Тестовое задание Frontend",
      htmlAttrs: { lang: "ru" },
    },
  },

  css: ["@app/styles/main.scss"],

  modules: ["@nuxt/eslint", "@pinia/nuxt"],

  alias: {
    "@app": fileURLToPath(new URL("./src/app", import.meta.url)),
    "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
    "@widgets": fileURLToPath(new URL("./src/widgets", import.meta.url)),
    "@features": fileURLToPath(new URL("./src/features", import.meta.url)),
    "@entities": fileURLToPath(new URL("./src/entities", import.meta.url)),
    "@shared": fileURLToPath(new URL("./src/shared", import.meta.url)),
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: (content: string, filepath: string) => {
            if (filepath.includes("shared/styles")) {
              return content;
            }
            return `@use "@shared/styles/index.scss" as *;\n${content}`;
          },
        },
      },
    },
  },
});
