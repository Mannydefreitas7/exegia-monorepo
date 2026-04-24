import { ALL_ICONS } from "@exegia/ui";
import type { IconComponentProps } from "./types";

const Icon = ({ icon, variant = "Outline", size = 24, color, className }: IconComponentProps) => {
	const Component = ALL_ICONS[icon];

	if (!Component) {
		console.warn(`Icon "${String(icon)}" not found in icon library`);
		return null;
	}

	return <Component size={size} variant={variant} color={color} className={className} />;
};

export default Icon;
