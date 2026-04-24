# CLAUDE.MD - AI Assistant Context for BiblePedia

This document provides comprehensive context about the BiblePedia monorepo for AI assistants like Claude. It includes architecture, tech stack, conventions, and common workflows.

## 🚀 Quick Start for AI Assistants

**Before making changes**:
1. ✅ Read relevant tech stack sections below
2. ✅ Run `bun run format:check` to see current formatting
3. ✅ Use `list_components` tool for HeroUI component names
4. ✅ Check [Common Issues](#-common-issues--solutions) for known gotchas

**After making changes**:
1. ✅ Run `bun run check:fix` to format and lint
2. ✅ Run `bun run typecheck` to verify types
3. ✅ Test locally with `bun run dev` or `bun run desktop`
4. ✅ Check diagnostics with `diagnostics` tool

**Key Points**:
- 🔧 Use **Bun**, not Node.js or npm
- 🎨 Use **Biome** for formatting (not Prettier/ESLint)
- 🖥️ **Electrobun** for desktop app (maps web app to native windows)
- 🎯 React Spectrum uses **style macro** with constrained tokens
- 🔐 **dotenvx** encrypts .env files (gitignored, decrypt locally with key)
- 📏 Code style: **Hard tabs (width 2)**, **100 char line width**, **double quotes**
- 📦 React components: **Always kebab-case** naming

## 📑 Table of Contents

1. [Project Overview](#-project-overview)
2. [Project Structure](#️-project-structure)
3. [Tech Stack](#️-tech-stack)
   - [Bun](#1-bun)
   - [TypeScript](#2-typescript)
   - [Biome](#3-biome)
   - [Turborepo](#4-turborepo)
   - [React & React Router](#5-react--react-router)
   - [HeroUI](#6-heroui-react-components)
   - [React Spectrum S2](#7-react-spectrum-s2)
   - [Tailwind CSS](#8-tailwind-css)
   - [Electrobun](#9-electrobun)
   - [Jotai](#10-jotai)
   - [dotenvx](#11-dotenvx)
   - [Motion](#12-motion)
4. [Development Workflows](#-development-workflows)
5. [Code Conventions](#-code-conventions)
6. [Common Issues & Solutions](#-common-issues--solutions)
7. [Key Files Reference](#-key-files-reference)
8. [When Working on This Codebase](#-when-working-on-this-codebase)
9. [Searching the Codebase](#-searching-the-codebase)
10. [Quick Reference Commands](#-quick-reference-commands)
11. [Additional Resources](#-additional-resources)

## 📋 Project Overview

**BiblePedia** is a modern, full-stack application for Bible study and research, built as a Turborepo monorepo with desktop and web apps.

### Architecture
- **Monorepo**: Turborepo-based with Bun workspaces
- **Apps**: Desktop (Electrobun) and Web (React Router)
- **Packages**: Shared UI components, utilities, and types
- **Runtime**: Bun (not Node.js)
- **Language**: TypeScript 6
- **Code Quality**: Biome (formatting + linting)

## 🏗️ Project Structure

```
BiblePedia/
├── apps/
│   ├── desktop/          # Electrobun desktop app
│   │   ├── src/
│   │   │   └── bun/      # Main process (Bun runtime)
│   │   └── electrobun.config.ts
│   ├── docs/             # Mintlify documentation site
│   │   ├── docs.json     # Mintlify configuration
│   │   ├── index.mdx     # Documentation homepage
│   │   └── */            # Documentation pages
│   ├── web/              # React Router web app
│   │   ├── app/          # React Router v7 app directory
│   │   │   ├── routes/   # File-based routing
│   │   │   ├── features/ # Feature modules
│   │   │   └── layouts/  # Layout components
│   │   └── vite.config.ts
│   └── livrea/           # Legacy Next.js app
├── packages/
│   ├── ui/               # Shared UI components
│   ├── utils/            # Shared utilities
│   ├── typings/          # Shared TypeScript types
│   └── graphql/          # GraphQL schemas
├── .zed/                 # Zed editor settings
├── biome.json            # Biome configuration
├── turbo.json            # Turborepo configuration
├── .env.example          # Environment template
└── package.json          # Root workspace config
```

## 🛠️ Tech Stack

### Core Technologies

#### 1. Bun
- **Purpose**: JavaScript runtime and package manager
- **Version**: 1.3.11+
- **Usage**: Replaces Node.js and npm/yarn
- **Commands**:
  ```bash
  bun install          # Install dependencies
  bun run dev          # Run dev scripts
  bun add <package>    # Add dependency
  ```
- **Key Features**: Fast package installs, built-in test runner, TypeScript support

#### 2. TypeScript
- **Version**: 6.0.2
- **Configuration**: Per-workspace `tsconfig.json`
- **Standards**: Strict mode enabled
- **Commands**:
  ```bash
  bun run typecheck    # Check types across monorepo
  turbo run typecheck  # Parallel type checking
  ```

#### 3. Biome
- **Purpose**: Code formatting and linting (replaces Prettier + ESLint)
- **Version**: 2.3.5
- **Configuration**: `biome.json` at root
- **Standards**:
  - Indent: Hard tabs, width 2
  - Line width: 100 characters
  - Quotes: Double
  - Semicolons: Always required
- **Commands**:
  ```bash
  bun run format       # Format all code
  bun run lint         # Lint all code
  bun run lint:fix     # Lint with auto-fix
  bun run check:fix    # Format + Lint + Organize imports
  ```
- **IDE**: Integrated with Zed editor (`.zed/settings.json`)
- **Ignore Patterns**: node_modules, dist, build, .turbo, lock files

#### 4. Turborepo
- **Purpose**: Monorepo build system
- **Configuration**: `turbo.json`
- **Key Features**: Smart caching, parallel execution, remote caching
- **Commands**:
  ```bash
  turbo build          # Build all apps
  turbo dev            # Run all dev servers
  turbo run format     # Run format across workspaces
  turbo run <task> --filter @exegia/web  # Filter by workspace
  ```

### Frontend Technologies

#### 5. React & React Router
- **React Version**: 19.2.4
- **React Router Version**: 7.14.0
- **Type**: Full-stack framework with SSR
- **Routing**: File-based in `app/routes/`
- **Data Loading**: Loaders and actions
- **Key Files**:
  - `app/root.tsx` - Root layout
  - `app/routes/` - Route components
  - `react-router.config.ts` - React Router config
- **Usage**:
  ```tsx
  // Route component (app/routes/dashboard.tsx)
  export default function Dashboard() {
    return <div>Dashboard</div>;
  }

  // With loader
  export async function loader({ request }: LoaderFunctionArgs) {
    return json({ data: await fetchData() });
  }
  ```

#### 6. HeroUI (React Components)
- **Purpose**: React UI component library that complements React Spectrum
- **Version**: 3.0.1+
- **Usage**: Web app UI components
- **Documentation**: Check with `list_components` and `get_component_docs` tools
- **Integration**: Provides Tailwind CSS integration
- **Usage**:
  ```tsx
  import { Button, Card } from "@heroui/react";

  <Button color="primary">Click me</Button>
  <Card>...</Card>
  ```
- **Key Features**: Modern React components, theme support, accessibility
- **Important**: HeroUI complements React Spectrum where additional components are needed

#### 7. React Spectrum S2
- **Purpose**: Adobe's design system for web
- **Version**: 1.2.0+
- **Usage**: Primary web app UI components
- **Styling**: Uses style macro for Spectrum 2 tokens
- **Components**: Button, TextField, Dialog, etc.
- **Important**: Style macro with constrained values per Spectrum 2
  ```tsx
  import { Button } from '@react-spectrum/s2';
  import { style } from '@react-spectrum/s2/style' with { type: 'macro' };

  <Button className={style({ backgroundColor: 'accent' })} />
  ```

#### 8. Tailwind CSS
- **Version**: 4.2.2
- **Integration**: Via HeroUI (not @tailwindcss/vite)
- **Configuration**: Per-app configs
- **Usage**:
  ```tsx
  <div className="flex items-center gap-4 p-6">
  ```
- **Important**:
  - Global CSS files with Tailwind directives are excluded from Biome formatting
  - Tailwind is integrated through HeroUI, not as a separate Vite plugin

### Desktop Technologies

#### 9. Electrobun
- **Purpose**: Desktop app framework (alternative to Electron)
- **Version**: 1.16.0
- **Configuration**: `electrobun.config.ts`
- **Key Features**:
  - Uses Bun runtime (not Node.js)
  - Native webviews (no bundled Chromium)
  - Fast startup, low memory usage
  - Hot reload support
- **Architecture**:
  - Main process: `src/bun/index.ts` (Bun runtime)
  - Desktop app maps web app local URL to native windows
  - No separate view folders - uses web app directly
- **Important Setup**:
  ```typescript
  import { BrowserWindow } from 'electrobun/bun';

  const window = new BrowserWindow({
    title: 'BiblePedia',
    url: 'http://localhost:5173/dashboard',  // Points to Vite dev server
    frame: {
      width: 1200,
      height: 800,
      x: 100,
      y: 100
    },
    titleBarStyle: 'default',  // or 'hidden', 'hiddenInset'
  });
  ```
- **Hot Reload**:
  - Desktop app connects to Vite dev server (port 5173)
  - Changes to React components auto-refresh
  - Changes to Bun code trigger restart (via `--watch`)
  - Vite HMR handles all frontend updates
- **Key Differences from Electron**:
  - No separate renderer process HTML files
  - Maps directly to web dev server URL
  - Simpler architecture - web app is the view layer
- **Commands**:
  ```bash
  bun run desktop      # Run web + desktop together
  cd apps/desktop && bun run dev  # Desktop only (requires web server running)
  ```
- **Documentation**:
  - `apps/desktop/HOT_RELOAD_SETUP.md` - Hot reload setup guide
  - Official: https://blackboard.sh/electrobun/docs/apis/browser-window/

### State & Data Management

#### 10. Jotai
- **Purpose**: Atomic state management
- **Version**: 2.19.0
- **Usage**:
  ```tsx
  import { atom, useAtom } from 'jotai';

  const countAtom = atom(0);

  function Counter() {
    const [count, setCount] = useAtom(countAtom);
    return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
  }
  ```

### Environment & Configuration

#### 11. dotenvx
- **Purpose**: Encrypted environment variable management
- **Version**: 1.60.1+
- **How It Works**:
  - `.env` files are **gitignored** (unencrypted local copies)
  - `.env` files are **encrypted** with dotenvx and committed (encrypted)
  - Developers decrypt `.env` files locally with encryption keys
  - `.env.example` - Template for new variables
- **Development Workflow**:
  ```bash
  # First time setup
  bun run env:decrypt   # Decrypt .env files (requires key)

  # After changing variables
  bun run env:encrypt   # Encrypt and commit encrypted version

  # View variables
  bun run env:get KEY   # Get specific variable
  bun run env:ls        # List all variables
  ```
- **Production Setup**:
  - Production environments use CI/CD service secrets
  - Different configs for staging, production, etc.
  - No decryption needed in CI/CD
- **In Code**:
  ```typescript
  // Desktop app (Bun runtime)
  Bun.env['VITE_DEV_SERVER_URL']

  // Web app
  process.env.VITE_API_URL
  ```
- **Important**:
  - `.env` files are gitignored (unencrypted)
  - Encrypted `.env` files ARE committed
  - Encryption keys stored separately (not in repo)
  - Production uses CI service secrets
  - Never commit unencrypted `.env` files

### Animation & UI

#### 12. Motion
- **Purpose**: Animation library
- **Version**: 12.38.0
- **Usage**:
  ```tsx
  import { motion } from 'motion';

  <motion.div animate={{ opacity: 1 }}>Content</motion.div>
  ```

## 🔧 Development Workflows

### Starting Development

```bash
# Install dependencies
bun install

# Start web app only
cd apps/web && bun run dev

# Start desktop app (web + Electrobun)
bun run desktop

# Start documentation site
cd apps/docs && bun run dev

# Start both separately
# Terminal 1: Web app
cd apps/web && bun run dev

# Terminal 2: Desktop app (requires web to be running)
cd apps/desktop && bun run dev
```
</text>

<old_text line=576>
**Note**: Create nested `CLAUDE.md` files in workspace directories (e.g., `apps/desktop/CLAUDE.md`) when you need to document workspace-specific patterns, conventions, or complex instructions that don't belong in the root CLAUDE.MD.

### Code Quality Workflow

```bash
# Before committing
bun run check:fix    # Format + Lint + Fix
bun run typecheck    # Type check

# Check without fixes (CI)
bun run format:check
bun run lint
```

### Building

```bash
# Build all apps
bun run build

# Build specific app
turbo run build --filter @exegia/web

# Build desktop app
cd apps/desktop && bun run build
```

### Common Tasks

```bash
# Clean everything
bun run clean

# Add dependency to workspace
cd apps/web && bun add react-query

# Add shared dependency
bun add -w some-tool

# Run tests
bun test

# Update dependencies
bun update
```

## 📝 Code Conventions

### Documentation Structure

#### README Files
README files should ONLY contain:
- ✅ **Installation instructions** - How to set up and install
- ✅ **Usage examples** - How to use the app/package
- ✅ **Quick start guides** - Getting started quickly
- ✅ **Command reference** - Available commands

README files should NOT contain:
- ❌ Tech stack information
- ❌ Architecture details
- ❌ Contribution guidelines
- ❌ Common issues and troubleshooting
- ❌ Code conventions
- ❌ Design decisions

**These belong in CLAUDE.MD instead.**

#### CLAUDE.md Files
- **Root `CLAUDE.MD`**: Monorepo-wide context, tech stack, conventions, common issues
- **Workspace `CLAUDE.md`**: Workspace-specific patterns and complex instructions
  - Create `apps/desktop/CLAUDE.md` for desktop-specific context
  - Create `apps/web/CLAUDE.md` for web-specific context
  - Create `packages/ui/CLAUDE.md` for UI package-specific patterns
- **When to create nested CLAUDE.md**:
  - Workspace has unique patterns not applicable elsewhere
  - Complex workspace-specific setup or conventions
  - Detailed architectural decisions for that workspace only

### File Naming
- **React components**: `kebab-case.tsx` (ALWAYS)
  - ✅ `dashboard-header.tsx`
  - ✅ `user-profile.tsx`
  - ❌ `DashboardHeader.tsx`
  - ❌ `UserProfile.tsx`
- **Utilities**: `kebab-case.ts`
- **Types**: `types.ts` or `*.types.ts`
- **Tests**: `*.test.ts` or `*.spec.ts`

### Import Organization (Auto via Biome)
```typescript
// 1. External packages
import React from 'react';
import { Button } from '@react-spectrum/s2';

// 2. Internal packages
import { useTheme } from '@exegia/utils';

// 3. Relative imports
import { Header } from './header';
import type { User } from './types';
```

### Component Structure
```tsx
// types.ts or inline types
interface Props {
  title: string;
  onAction?: () => void;
}

// Component in kebab-case file
export function MyComponent({ title, onAction }: Props) {
  // Hooks
  const [state, setState] = useState();

  // Effects
  useEffect(() => {}, []);

  // Handlers
  const handleClick = () => {};

  // Render
  return <div>{title}</div>;
}
```

### Style Macro (React Spectrum)
```tsx
import { style } from '@react-spectrum/s2/style' with { type: 'macro' };

// Use constrained Spectrum 2 tokens
const className = style({
  backgroundColor: 'accent',  // Not 'red'
  padding: 16,                // Use spacing scale
  font: 'body'                // Use typography tokens
});
```

### Electrobun Patterns
```typescript
// Point to Vite dev server in development
const isDev = Bun.env.NODE_ENV !== 'production';
const devUrl = Bun.env['VITE_DEV_SERVER_URL'] || 'http://localhost:5173';

// Create window pointing to web app
const window = new BrowserWindow({
  title: 'BiblePedia',
  url: `${devUrl}/dashboard`,
  frame: { width: 1200, height: 800, x: 100, y: 100 },
});

// Window is visible by default - no need to call .show()
// unless you explicitly set hidden: true in constructor
```

## 🚨 Common Issues & Solutions

### 1. Hot Reload Not Working
**Problem**: Changes not appearing in desktop app
**Solution**:
- Ensure Vite dev server is running (port 5173)
- Check HMR settings in `vite.config.ts`
- Verify CORS is enabled in Vite config
- Restart both web and desktop apps

### 2. Biome Formatting Errors
**Problem**: CSS files with Tailwind not formatting
**Solution**: Global CSS files are excluded in `biome.json` (this is intentional)

### 3. Type Errors in Desktop App
**Problem**: `Property 'X' does not exist on type 'Env'`
**Solution**: Use bracket notation: `Bun.env['VITE_DEV_SERVER_URL']`

### 4. Import Errors with React Spectrum
**Problem**: Cannot find style macro
**Solution**: Use import attributes: `import { style } from '@react-spectrum/s2/style' with { type: 'macro' };`

### 5. Environment Variables Not Working
**Problem**: Variables not loading in development
**Solution**:
- Run `bun run env:decrypt` to decrypt .env files
- Ensure you have the decryption key
- Restart development servers after decrypting/changing .env
- For production, check CI service secrets configuration

## 📚 Key Files Reference

### Configuration Files
- `biome.json` - Formatting and linting rules
- `turbo.json` - Monorepo task configuration
- `package.json` - Workspace dependencies and scripts
- `bunfig.toml` - Bun configuration
- `.zed/settings.json` - Zed editor settings
- `.env.example` - Environment variables template

### Desktop App
- `apps/desktop/electrobun.config.ts` - Electrobun configuration
- `apps/desktop/src/bun/index.ts` - Main process entry point
- `apps/desktop/.env.example` - Environment template

### Web App
- `apps/web/vite.config.ts` - Vite configuration
- `apps/web/react-router.config.ts` - React Router configuration
- `apps/web/app/root.tsx` - Root layout
- `apps/web/app/routes/` - Route components

### Documentation
- `README.md` - Installation, usage, and examples (NOT tech stack or contributions)
- `CLAUDE.MD` - This file (AI assistant context for entire monorepo)
- `apps/*/CLAUDE.md` - Workspace-specific AI context (create when needed for scoped instructions)
- `apps/docs/` - **Mintlify documentation site** (comprehensive guides and references)
  - `apps/docs/docs.json` - Mintlify configuration
  - `apps/docs/index.mdx` - Documentation homepage
  - Run with: `cd apps/docs && bun run dev`
- `apps/desktop/HOT_RELOAD_SETUP.md` - Hot reload guide

**Note**: Create nested `CLAUDE.md` files in workspace directories (e.g., `apps/desktop/CLAUDE.md`) when you need to document workspace-specific patterns, conventions, or complex instructions that don't belong in the root CLAUDE.MD.
</an_text>

<old_text line=344>
# Start desktop app (web + Electrobun)
bun run desktop

# Start both separately
# Terminal 1: Web app
cd apps/web && bun run dev

# Terminal 2: Desktop app (requires web to be running)
cd apps/desktop && bun run dev
```

## 🎯 When Working on This Codebase

### Do's ✅
- Use Bun commands, not npm/yarn
- Format with Biome before committing: `bun run check:fix`
- Use hard tabs (width 2) for indentation
- Follow React Spectrum S2 style macro patterns
- Use environment variables for configuration
- Check `list_components` for HeroUI components before using
- Use TypeScript strict mode
- Organize imports (Biome does this automatically)
- **Name React components in kebab-case** (e.g., `user-profile.tsx`)
- Point Electrobun windows to Vite dev server URLs
- Use HeroUI when React Spectrum doesn't have needed components

### Don'ts ❌
- Don't use Node.js specific APIs (use Bun equivalents)
- Don't use Prettier or ESLint (use Biome)
- Don't commit unencrypted `.env` files (they're gitignored)
- Don't guess component names (check documentation)
- Don't use arbitrary values in style macro (use tokens)
- Don't format global CSS files with Tailwind directives
- Don't use soft tabs (configure editor for hard tabs)
- **Don't use PascalCase for React component files** (use kebab-case)
- Don't create separate view HTML files for Electrobun (it maps to web app)
- Don't add Tailwind as a Vite plugin (it comes through HeroUI)
- Don't put production secrets in .env files (use CI secrets)
- Don't put tech stack info in README files (use CLAUDE.md)

### Best Practices 🌟
1. **Format on Save**: Enable in Zed (already configured)
2. **Type Everything**: Use TypeScript for all files
3. **Test Locally**: Run desktop and web apps together
4. **Check Types**: Run `bun run typecheck` before committing
5. **Use Turbo**: Leverage parallel execution with `turbo run`
6. **Encrypted Environment**: Decrypt `.env` files locally, CI uses secrets
7. **Document Properly**:
   - READMEs for installation/usage/examples only
   - CLAUDE.md for tech stack/architecture/conventions/issues
   - Create nested `CLAUDE.md` in workspaces when needed
8. **Check Diagnostics**: Run `bun run lint` to see issues
9. **Kebab-Case Components**: Always name React components in kebab-case
10. **Simple Desktop Architecture**: Desktop app just points to web URLs

## 🔍 Searching the Codebase

### Finding Components
```bash
# HeroUI components
# Use list_components and get_component_docs tools

# React Spectrum components
grep -r "from '@react-spectrum/s2'" apps/web/app

# Find component usage
grep -r "Button" apps/web/app
```

### Finding Configuration
```bash
# Electrobun config
cat apps/desktop/electrobun.config.ts

# Vite config
cat apps/web/vite.config.ts

# Biome rules
cat biome.json
```

### Finding Types
```bash
# Shared types
ls packages/typings/src/

# App-specific types
find apps/web/app -name "*.types.ts"
```

## 🚀 Quick Reference Commands

```bash
# Development
bun run dev              # Start development servers
bun run desktop          # Run desktop app with hot reload
bun run build            # Build all apps

# Code Quality
bun run format           # Format all code
bun run lint:fix         # Lint with auto-fix
bun run check:fix        # Format + Lint + Organize
bun run typecheck        # Type check all workspaces

# Environment
bun run env:decrypt      # Decrypt .env files (first time setup)
bun run env:encrypt      # Encrypt after changes
bun run env:get KEY      # Get specific variable
bun run env:ls           # List all variables

# Workspace
turbo run <task>         # Run task across workspaces
turbo run <task> --filter @exegia/web  # Filter workspace
cd apps/web && bun run dev  # Run in specific workspace

# Maintenance
bun run clean            # Clean all artifacts
bun install              # Install dependencies
bun update               # Update dependencies
```

## 📖 Additional Resources

- [BiblePedia Documentation Site](http://localhost:3000) - Comprehensive Mintlify docs (when running locally)
- [Bun Documentation](https://bun.sh/docs)
- [Biome Documentation](https://biomejs.dev)
- [Electrobun Documentation](https://electrobun.dev/docs)
- [Electrobun BrowserWindow API](https://blackboard.sh/electrobun/docs/apis/browser-window/)
- [React Router Documentation](https://reactrouter.com)
- [React Spectrum Documentation](https://react-spectrum.adobe.com)
- [HeroUI Documentation](https://heroui.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Jotai Documentation](https://jotai.org)
- [Mintlify Documentation](https://mintlify.com/docs)

---

**Last Updated**: 2024
**Maintained By**: BiblePedia Team
**For AI Assistants**: Use this as primary context when working with this codebase
