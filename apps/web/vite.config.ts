import path from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import macros from "unplugin-parcel-macros";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [macros.vite(), tailwindcss(), reactRouter(), svgr()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./app"),
		},
	},
	server: {
		port: 5173,
		open: true,
		host: true, // Listen on all addresses
		strictPort: false, // Allow fallback to other ports if 5173 is busy
		hmr: {
			protocol: "ws",
			host: "localhost",
			port: 5173,
			clientPort: 5173,
		},
	},
	ssr: {
		noExternal: ["@react-spectrum/s2"],
	},
	optimizeDeps: {
		include: ["@react-spectrum/s2", "@heroui/styles", "react", "react-dom"],
	},
	build: {
		target: ["es2022"],
		// Lightning CSS produces a much smaller CSS bundle than the default minifier.
		cssMinify: "lightningcss",
		rollupOptions: {
			external: ["@exegia/utils"],
			output: {
				// Bundle all S2 and style-macro generated CSS into a single bundle instead of code splitting.
				// Because atomic CSS has so much overlap between components, loading all CSS up front results in
				// smaller bundles instead of producing duplication between pages.
				manualChunks(id) {
					if (/macro-(.*)\.css$/.test(id) || /@react-spectrum\/s2\/.*\.css$/.test(id)) {
						return "s2-styles";
					}
				},
			},
		},
	},
});
