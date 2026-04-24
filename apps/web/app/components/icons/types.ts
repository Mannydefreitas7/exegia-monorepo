import type { LIIconName } from "@exegia/ui";
import type { Icon, IconProps } from "iconsax-reactjs";


interface IconComponentProps {
	icon: LIIconName;
	variant?: IconProps["variant"];
	size?: number;
	color?: string;
	className?: string;
}

// Re-export types
export type { Icon, IconComponentProps, IconProps, LIIconName };
