import dts from "vite-plugin-dts";
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
	},
	plugins: [
		dts({
			afterDiagnostic: (diagnostics) => {
				if (diagnostics.length > 0) {
					throw new Error("Have issues with generating types");
				}
			},
		}),
	],
});