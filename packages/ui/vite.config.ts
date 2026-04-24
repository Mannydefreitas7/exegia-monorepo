import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import macros from "unplugin-parcel-macros";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		// Enable style macros for React Spectrum S2
		macros.vite(),
		// React plugin with automatic JSX runtime
		react(),
	],
	build: {
		lib: {
			entry: {
				index: resolve(__dirname, "src/index.ts"),
				style: resolve(__dirname, "src/style.ts"),
			},
			formats: ["es"],
		},
		rollupOptions: {
			// Externalize dependencies that shouldn't be bundled
			external: [
				"react",
				"react-dom",
				"react/jsx-runtime",
				"@exegia/utils",
				// Externalize all @react-spectrum packages
				/^@react-spectrum\/.*/,
				// Externalize react-aria-components
				"react-aria-components",
				/^react-aria-components\/.*/,
			],
			output: {
				// Ensure consistent file naming
				entryFileNames: "[name].js",
				chunkFileNames: "chunks/[name]-[hash].js",
				// Ensure CSS is extracted
				assetFileNames: (assetInfo) => {
					if (assetInfo.name?.endsWith(".css")) {
						return "styles.css";
					}
					return "assets/[name][extname]";
				},
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
		},
		// Generate sourcemaps for debugging
		sourcemap: true,
		// Clear output directory before build
		emptyOutDir: true,
		// Output directory
		outDir: "dist",
		// Don't split CSS - keep it in one file
		cssCodeSplit: false,
		// Target modern browsers
		target: "esnext",
		// Minify for production
		minify: false,
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "src"),
		},
	},
	// Ensure SSR externalization for node modules used by macros
	ssr: {
		noExternal: [],
	},
});
