// Augment NodeJS.ProcessEnv (and by extension Bun.env) with all env vars
// used by the desktop app. Types are sourced from @exegia/typings.
declare module "bun" {
	interface Env {
		// Application
		readonly NODE_ENV?: import("@exegia/typings").NodeEnvironment;
		readonly PORT?: string;
		readonly APP_URL?: string;
		// Database
		readonly DATABASE_URL?: string;
		readonly DB_PORT?: string;
		readonly DB_USER?: string;
		readonly DB_PASSWORD?: string;
		readonly DB_NAME?: string;
		// Auth
		readonly JWT_SECRET?: string;
		readonly SESSION_SECRET?: string;
		// Appwrite (server-side)
		readonly APPWRITE_API_KEY?: string;
		// Appwrite (client-safe, exposed via VITE_)
		readonly VITE_APPWRITE_ENDPOINT?: string;
		readonly VITE_APPWRITE_PROJECT?: string;
		readonly VITE_APPWRITE_DATABASE_ID?: string;
		// API keys
		readonly API_KEY?: string;
		readonly API_SECRET?: string;
		// Feature flags
		readonly ENABLE_ANALYTICS?: string;
		readonly ENABLE_DEBUG_MODE?: string;
		readonly ENABLE_BETA_FEATURES?: string;
		// Logging
		readonly LOG_LEVEL?: import("@exegia/typings").LogLevel;
		readonly LOG_OUTPUT?: import("@exegia/typings").LogOutput;
		// Performance
		readonly CACHE_TTL?: string;
		readonly MAX_UPLOAD_SIZE?: string;
		// Email
		readonly EMAIL_HOST?: string;
		readonly EMAIL_PORT?: string;
		readonly EMAIL_USER?: string;
		readonly EMAIL_PASSWORD?: string;
		readonly EMAIL_FROM?: string;
		// Development / Electrobun-specific
		readonly VITE_DEV_SERVER_URL?: import("@exegia/typings").ElectrobunEnvironmentVariables["VITE_DEV_SERVER_URL"];
		readonly VITE_PORT?: import("@exegia/typings").ElectrobunEnvironmentVariables["VITE_PORT"];
		readonly DEBUG?: import("@exegia/typings").ElectrobunEnvironmentVariables["DEBUG"];
		readonly OPEN_DEVTOOLS?: import("@exegia/typings").ElectrobunEnvironmentVariables["OPEN_DEVTOOLS"];
		readonly HMR_ENABLED?: string;
		readonly GENERATE_SOURCEMAP?: string;
		readonly VITE_DEV_SERVER_HOST?: string;
	}
}
