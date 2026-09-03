import prettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  prettier,

  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^node:", "^\\u0000"],
            ["^vue", "^@?nuxt", "^pinia", "^@?\\w"],
            ["^#", "^@/"],
            ["^@app"],
            ["^@pages"],
            ["^@widgets"],
            ["^@features"],
            ["^@entities"],
            ["^@shared"],
            ["^\\."],
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            { group: ["~/*", "~~/*"], message: "Используй @ вместо ~ (напр. @/..., @shared/...)." },
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "vue/block-order": [
        "error",
        {
          order: ["template", "script", "script[setup]", ["style[scoped]", "style"]],
        },
      ],
      "vue/component-definition-name-casing": ["error", "kebab-case"],
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "never",
            component: "always",
          },
          svg: "always",
          math: "always",
        },
      ],
      "vue/define-macros-order": [
        "error",
        {
          order: ["defineOptions", "defineProps", "defineEmits", "defineModel", "defineSlots"],
          defineExposeLast: true,
        },
      ],
      "vue/attributes-order": [
        "error",
        {
          order: [
            "DEFINITION",
            "LIST_RENDERING",
            "CONDITIONALS",
            "RENDER_MODIFIERS",
            "GLOBAL",
            "UNIQUE",
            "SLOT",
            "TWO_WAY_BINDING",
            "OTHER_DIRECTIVES",
            ["ATTR_DYNAMIC", "ATTR_STATIC", "ATTR_SHORTHAND_BOOL"],
            "EVENTS",
            "CONTENT",
          ],
        },
      ],
      "vue/multi-word-component-names": "error",
      "vue/no-v-html": "error",
      "vue/v-slot-style": ["error", "shorthand"],
      "vue/component-name-in-template-casing": ["error", "kebab-case"],
      "vue/custom-event-name-casing": ["error", "kebab-case"],
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },
  {
    files: ["src/app/routes/**/*.vue", "src/app/layouts/**/*.vue"],
    rules: {
      "vue/multi-word-component-names": "off",
    },
  }
);
