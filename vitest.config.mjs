import { defineConfig, configDefaults } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  root: "./src",
  test: {
    exclude: [
      ...configDefaults.exclude,
      "coverage/**",
      "lib/**",
      "infra/database/*.ts"
    ],
    coverage: {
      provider: "v8",
      exclude: [
        "**/*.spec.ts",
        "infra/database/**",
        "libs/**"
      ],
    }
  }
});
