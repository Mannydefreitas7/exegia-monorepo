import path from "node:path";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import macros from "unplugin-parcel-macros";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

// The HMR client config below tells the browser (which connects through the
// proxy) where to find the WebSocket endpoint so live reload works end-to-end.
const PROXY_HOST = process.env.VITE_PROXY_HOST ?? "exegia.local";
const PROXY_PORT = Number(process.env.VITE_PROXY_PORT ?? 443);

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
		strictPort: true, // Allow fallback to other ports if 5173 is busy
		// Accept the public proxy hostname in Host headers / Origin checks.
		allowedHosts: ["exegia.local", "localhost", "127.0.0.1"],
		hmr: {
			// Server side: Vite's WebSocket server keeps listening on the dev port.
			port: 5173,
			// Client side: browser connects to the proxy, which terminates TLS
			// and forwards the WS upgrade to Vite over plain TCP.
			protocol: "wss",
			host: PROXY_HOST,
			clientPort: PROXY_PORT,
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
