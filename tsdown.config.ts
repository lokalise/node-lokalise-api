import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/main.ts"],
  outDir: "dist",
  format: ["esm"],
  dts: {
    generator: "tsgo",
  },
  sourcemap: true,
  clean: true,
  minify: false,
});