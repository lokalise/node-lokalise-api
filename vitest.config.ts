import { defineConfig } from "vitest/config";

const isCI = process.env.CI === "true";

export default defineConfig({
	esbuild: {
    target: 'esnext',
  },
	test: {
		globals: true,
		environment: 'node', 
		coverage: {
      provider: 'istanbul',
			reporter: isCI ? ['lcov'] : ['html'],
			exclude: ['docs/**', '.eslintrc.cjs', 'samples/**', 'test/setup.ts'],
    },
		typecheck: {
			enabled: true,
		},
	},
});