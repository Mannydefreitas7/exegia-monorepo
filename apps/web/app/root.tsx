// app/root.tsx
import "./global.css";

import { Provider } from "@react-spectrum/s2";
import { Provider as JotaiProvider } from "jotai";
import { type ReactNode, useEffect } from "react";
import {
	Links,
	Meta,
	type NavigateOptions,
	Outlet,
	Scripts,
	ScrollRestoration,
	useHref,
	useNavigate,
	useRouteLoaderData,
} from "react-router";
import myStore from "@/atoms/store";
import { useTheme } from "@/hooks";
import type { Route } from "./+types/root";

// Configure the type of the `routerOptions` prop on all React Spectrum components.
declare module "@react-spectrum/s2" {
	interface RouterConfig {
		routerOptions: NavigateOptions;
	}
}

export function loader({ request }: Route.LoaderArgs) {
	// Get the requested language (e.g. from headers, URL param, database, etc.)
	const acceptLanguage = request.headers.get("accept-language");
	const lang = acceptLanguage?.split(/[,;]/)[0] || "en-US";
	return { lang };
}

export function Layout({ children }: { children: ReactNode }) {
	const { lang } = useRouteLoaderData("root") || { lang: "en-US" };
	const navigate = useNavigate();
	const { isDark } = useTheme();

	useEffect(() => {
		navigate({ pathname: '/dashboard' })
	}, [navigate])

	return (
		<Provider
			UNSAFE_className={isDark ? "dark" : undefined}
			elementType="html"
			locale={lang}
			background="layer-1"
			router={{ navigate, useHref }}
		>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<JotaiProvider store={myStore}>
					{/* children will be the root Component, ErrorBoundary, or HydrateFallback */}
					{children}
					<Scripts />
					<ScrollRestoration />
				</JotaiProvider>
			</body>
		</Provider>
	);
}

export default function App() {
	return <Outlet />;
}

export function ErrorBoundary() {
	return (
		<div>
			<h1>Error at root.tsx</h1>
		</div>
	);
}
