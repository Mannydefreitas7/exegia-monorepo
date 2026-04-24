/// <reference types="vite-plugin-svgr/client" />

declare module "*.css";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.svg?react";
declare module "*.gif";

// Augment Vite's ImportMetaEnv with all VITE_-prefixed env vars used in this project.
// Types are sourced from @exegia/typings.
interface ImportMetaEnv {
	// Appwrite (client-safe)
	readonly VITE_APPWRITE_ENDPOINT?: import("@exegia/typings").AppwriteEnvironmentVariables["VITE_APPWRITE_ENDPOINT"];
	readonly VITE_APPWRITE_PROJECT?: import("@exegia/typings").AppwriteEnvironmentVariables["VITE_APPWRITE_PROJECT"];
	readonly VITE_APPWRITE_DATABASE_ID?: import("@exegia/typings").AppwriteEnvironmentVariables["VITE_APPWRITE_DATABASE_ID"];
	readonly VITE_APPWRITE_COLLECTION_ID?: import("@exegia/typings").AppwriteEnvironmentVariables["VITE_APPWRITE_COLLECTION_ID"];
	// Development
	readonly VITE_DEV_SERVER_HOST?: import("@exegia/typings").DevelopmentEnvironmentVariables["VITE_DEV_SERVER_HOST"];
	readonly VITE_DEV_SERVER_URL?: import("@exegia/typings").DevelopmentEnvironmentVariables["VITE_DEV_SERVER_URL"];
	readonly VITE_PORT?: import("@exegia/typings").DevelopmentEnvironmentVariables["VITE_PORT"];
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
