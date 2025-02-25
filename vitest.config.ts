import { defineConfig } from "vitest/config";

const isCI = process.env.CI === "true";

export default defineConfig({
	esbuild: {
		target: "es2024",
	},
	test: {
		silent: isCI,
		sequence: {
			shuffle: true,
		},
		coverage: {
			enabled: true,
			provider: "istanbul",
			reporter: isCI ? ["lcov"] : ["html", "text-summary"],
			include: ["src/**/*.ts"],
		},
		typecheck: {
			enabled: true,
		},
	},
});
