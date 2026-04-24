# @exegia/ui

A React component library built on [React Spectrum S2](https://react-spectrum.adobe.com/), Adobe's design system implementation for React.

## Installation

This package is part of the monorepo and is available as a workspace dependency:

```bash
# From the monorepo root
bun install
```

## Building the Package

To compile the components for use in other apps:

```bash
# Build the library
bun run build

# Watch for changes during development
bun run dev
```

This will output compiled files to the `dist/` directory.

## Usage

### In the Livrea Next.js App

The Livrea app is already configured to use this package. Simply import components:

```tsx
import { Button, TextField, Provider } from "@exegia/ui";
import { style } from "@exegia/ui/style";

function App() {
  return (
    <Provider background="base">
      <div className={style({ padding: 16, display: "flex", gap: 8 })}>
        <TextField label="Name" />
        <Button variant="accent">Submit</Button>
      </div>
    </Provider>
  );
}
```

### Style Macro

The `style` function is a build-time macro that generates optimized CSS using Spectrum 2 design tokens.

**Important:** The consuming application must have `unplugin-parcel-macros` configured in their bundler.

```tsx
import { style } from "@exegia/ui/style";

// The style macro supports Spectrum 2 design tokens
const containerStyles = style({
  backgroundColor: "layer-1",
  padding: 16,
  borderRadius: "lg",
  display: "flex",
  flexDirection: "column",
  gap: 8,
});
```

### Provider Setup

Wrap your app in the `Provider` component to enable Spectrum 2 fonts and theming:

```tsx
import { Provider } from "@exegia/ui";

function App() {
  return (
    <Provider background="base">
      {/* Your app content */}
    </Provider>
  );
}
```

## Available Components

This package re-exports all React Spectrum S2 components:

### Buttons
- `Button`, `ActionButton`, `LinkButton`, `ToggleButton`
- `ActionButtonGroup`, `ButtonGroup`, `ToggleButtonGroup`

### Forms
- `Form`, `TextField`, `TextArea`, `SearchField`, `NumberField`
- `Checkbox`, `CheckboxGroup`, `RadioGroup`, `Radio`, `Switch`
- `Slider`, `RangeSlider`, `Picker`, `ComboBox`

### Date & Time
- `DateField`, `DatePicker`, `DateRangePicker`, `TimeField`
- `Calendar`, `RangeCalendar`

### Color
- `ColorArea`, `ColorField`, `ColorSlider`, `ColorSwatch`
- `ColorSwatchPicker`, `ColorWheel`

### Collections
- `Menu`, `MenuItem`, `MenuSection`, `MenuTrigger`, `ActionMenu`
- `TableView`, `TableHeader`, `TableBody`, `Column`, `Row`, `Cell`
- `TreeView`, `TreeViewItem`
- `CardView`, `Card`, `AssetCard`, `UserCard`, `ProductCard`
- `TagGroup`, `Tag`
- `ListView`, `ListViewItem`

### Navigation
- `Tabs`, `TabList`, `Tab`, `TabPanel`
- `Breadcrumbs`, `Link`
- `SegmentedControl`, `SegmentedControlItem`

### Overlays
- `Dialog`, `DialogTrigger`, `DialogContainer`, `AlertDialog`
- `CustomDialog`, `FullscreenDialog`
- `Popover`, `Tooltip`, `TooltipTrigger`

### Status
- `ProgressBar`, `ProgressCircle`, `Meter`
- `StatusLight`, `Badge`, `InlineAlert`

### Content
- `Avatar`, `AvatarGroup`, `Image`, `ImageCoordinator`
- `Divider`, `Accordion`, `Disclosure`
- `Heading`, `Header`, `Footer`, `Content`, `Text`, `Keyboard`
- `IllustratedMessage`, `ContextualHelp`

### Layout
- `ActionBar`, `DropZone`, `Skeleton`, `CloseButton`

### Utilities
- `Collection`, `SelectBoxGroup`, `SelectBox`
- `ToastQueue`, `ToastContainer`

## Custom Components

The package also includes custom components that extend React Spectrum S2:

### ConfirmDialog

A pre-configured confirmation dialog for common use cases:

```tsx
import { DialogTrigger, Button, ConfirmDialog } from "@exegia/ui";

function DeleteButton() {
  return (
    <DialogTrigger>
      <Button variant="negative">Delete Item</Button>
      <ConfirmDialog
        title="Delete Item?"
        primaryActionLabel="Delete"
        cancelLabel="Cancel"
        isDestructive
        onConfirm={() => deleteItem()}
        onCancel={() => console.log("Cancelled")}
      >
        Are you sure you want to delete this item? This action cannot be undone.
      </ConfirmDialog>
    </DialogTrigger>
  );
}
```

## Bundler Configuration

### Next.js (Livrea App)

The Livrea app already has the required configuration in `next.config.ts`:

```ts
import macros from "unplugin-parcel-macros";

const plugin = macros.webpack();

const nextConfig = {
  transpilePackages: ["@exegia/ui"],
  webpack: (config) => {
    config.plugins.push(plugin);
    // CSS optimization for S2 styles
    config.optimization.splitChunks.cacheGroups.s2 = {
      chunks: "all",
      enforce: true,
      name: "s2-styles",
      test: (module) => {
        return (
          (module.type === "css/mini-extract" &&
            module.identifier().includes("@react-spectrum/s2")) ||
          /macro-(.*?)\.css/.test(module.identifier())
        );
      },
    };
    return config;
  },
};
```

### Vite

For Vite-based apps:

```ts
// vite.config.ts
import macros from "unplugin-parcel-macros";

export default {
  plugins: [macros.vite()],
};
```

## Development

```bash
# Type checking
bun run typecheck

# Linting
bun run lint

# Clean build artifacts
bun run clean
```

## License

Private - Part of the Biblepedia monorepo.
