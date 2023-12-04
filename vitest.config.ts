import { defineConfig } from "vitest/config";

const isCI = process.env.CI === "true";

export default defineConfig({
	test: {
		globals: true,
		coverage: {
      provider: 'istanbul',
			reporter: isCI ? ['lcov'] : ['html'],
			exclude: ['docs/**', '.eslintrc.cjs', 'samples/**', 'src/collections/index.ts'],
    },
		typecheck: {
			enabled: true,
		},
	},
});