import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/main.ts"],
	outDir: "dist",
	format: ["esm"],
	dts: true,
	sourcemap: true,
	clean: true,
	minify: false,
});
