import { defineConfig } from "vitest/config";

const isCI = process.env.CI === "true";

export default defineConfig({
	esbuild: {
		target: "esnext",
	},
	test: {
		globals: true,
		environment: "node",
		coverage: {
			provider: "istanbul",
			reporter: isCI ? ["lcov"] : ["html"],
			exclude: ["docs/**", "samples/**", "test/setup.ts", "vitest.config.ts"],
		},
		typecheck: {
			enabled: true,
		},
	},
});
