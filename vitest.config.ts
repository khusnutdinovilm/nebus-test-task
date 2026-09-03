import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    environment: "nuxt",
    passWithNoTests: true,
    coverage: { provider: "v8", include: ["src/**"] },
  },
});
