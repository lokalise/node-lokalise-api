import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/main.ts"],
	outDir: "dist",
	format: ["esm"],
	dts: true,
	splitting: false,
	sourcemap: true,
	clean: true,
	minify: false,
});
