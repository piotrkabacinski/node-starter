import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    fileParallelism: false,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "istanbul",
      include: ["src/**/*.ts"],
    },
    onConsoleLog: (log) => log.startsWith("ZodError") === false,
  },
  resolve: {
    alias: {
      src: resolve(__dirname, "src"),
    },
  },
});
