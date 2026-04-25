import type { Config } from "@react-router/dev/config";

export default {
	// Or dynamic function
	prerender: ({ getStaticPaths }) => {
		const paths = getStaticPaths();
		const dashboardPaths = paths.filter((path) => path.includes("/dashboard"));
		console.log("routes", dashboardPaths);
		return dashboardPaths;
	}
} satisfies Config;
