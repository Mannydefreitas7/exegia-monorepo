/**
 * Re-export the style macro from React Spectrum S2
 *
 * The style macro enables build-time CSS generation with
 * Spectrum 2 design tokens and constraints.
 *
 * IMPORTANT: The consuming application must have `unplugin-parcel-macros`
 * configured in their bundler for the macro to work properly.
 *
 * @example
 * ```tsx
 * import { style } from "@exegia/ui/style";
 *
 * const styles = style({
 *   backgroundColor: "layer-1",
 *   padding: 16,
 *   borderRadius: "lg",
 * });
 * ```
 */
export { style } from "@react-spectrum/s2/style" with { type: "macro" };
