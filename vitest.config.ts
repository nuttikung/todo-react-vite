import react from "@vitejs/plugin-react";
import { configDefaults, defineConfig } from "vitest/config";

import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	plugins: [tsconfigPaths(), react()],
	test: {
		...configDefaults,
		globals: true,
		environment: "jsdom",
		setupFiles: "./setupTests.ts",
		css: false,
	},
});
