/**
 * Utility types for the @exegia/ui library
 *
 * This file contains shared type definitions and utility types
 * used across the UI component library.
 */

import type { CSSProperties, ReactNode } from "react";

/**
 * Common props shared across many components
 */
export interface BaseComponentProps {
	/** Additional CSS class names */
	className?: string;
	/** Inline styles */
	style?: CSSProperties;
	/** Children elements */
	children?: ReactNode;
	/** Test ID for automated testing */
	"data-testid"?: string;
}

/**
 * Props for components that can be disabled
 */
export interface DisableableProps {
	/** Whether the component is disabled */
	isDisabled?: boolean;
}

/**
 * Props for components that can show loading state
 */
export interface LoadingProps {
	/** Whether the component is in a loading state */
	isLoading?: boolean;
}

/**
 * Props for components that support different sizes
 */
export type Size = "S" | "M" | "L" | "XL";

export interface SizeProps {
	/** The size of the component */
	size?: Size;
}

/**
 * Props for components that support different variants
 */
export type Variant = "primary" | "secondary" | "accent" | "negative";

export interface VariantProps {
	/** The visual variant of the component */
	variant?: Variant;
}

/**
 * Utility type to make specific properties required
 */
export type RequiredProps<T, K extends keyof T> = T & Required<Pick<T, K>>;

/**
 * Utility type to make specific properties optional
 */
export type OptionalProps<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Utility type for component props that extend HTML element attributes
 */
export type HTMLProps<T extends HTMLElement> = React.HTMLAttributes<T> & BaseComponentProps;

/**
 * Utility type for polymorphic component "as" prop
 */
export type AsProp<C extends React.ElementType> = {
	as?: C;
};

/**
 * Utility type for polymorphic component props
 */
export type PolymorphicProps<C extends React.ElementType, Props = object> = Props &
	AsProp<C> &
	Omit<React.ComponentPropsWithoutRef<C>, keyof Props | "as">;

export * from "./icons";
