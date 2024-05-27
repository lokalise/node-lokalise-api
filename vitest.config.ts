import { defineConfig } from "vitest/config";

const isCI = process.env.CI === "true";

export default defineConfig({
	esbuild: {
    target: 'esnext',  // Ensure targeting modern JavaScript
  },
	test: {
		globals: true,
		environment: 'node', 
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