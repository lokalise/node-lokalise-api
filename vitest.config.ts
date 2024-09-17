import { defineConfig } from "vitest/config";

const isCI = process.env.CI === "true";

export default defineConfig({
	esbuild: {
		target: "esnext",
	},
	test: {
		globals: true,
		silent: isCI,
		environment: "node",
		coverage: {
			provider: "istanbul",
			reporter: isCI ? ["lcov"] : ["html"],
			exclude: ["docs/**", "samples/**", "test/setup.ts", "vitest.config.ts"],
			include: ["src/**/*.ts"],
		},
		typecheck: {
			enabled: true,
		},
	},
});
