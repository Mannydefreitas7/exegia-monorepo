# Exegia

A modern theological and scholarly study and research platform, built as a Turborepo monorepo.

> **For AI Assistants**: See [CLAUDE.MD](CLAUDE.MD) for comprehensive codebase context, tech stack details, and development workflows.

## Monorepo Structure

```
Exegia/
├── apps/
│   ├── backend/          # FastAPI Python API server
│   ├── desktop/          # Electrobun desktop app
│   ├── docs/             # Mintlify documentation site
│   ├── web/              # React Router web app
│   └── livrea/           # Legacy Next.js app
├── packages/
│   ├── ui/               # Shared UI components
│   ├── utils/            # Shared utilities
│   ├── typings/          # Shared TypeScript types
│   └── graphql/          # GraphQL schemas
├── biome.json
├── turbo.json
└── package.json
```

## Prerequisites

- [Bun](https://bun.sh) v1.3.11+
- [Python](https://python.org) 3.12+ (for backend)
- [Docker](https://docker.com) (for local database)

## Installation

```bash
bun install
```

## Development

### Web app

```bash
bun run dev
```

Available at `http://localhost:5173`.

### Desktop app (web + Electrobun)

```bash
bun run desktop
```

### Backend API

```bash
cd apps/backend

# First-time setup: create virtualenv and install dependencies
bun run setup

# Start the database (PostgreSQL + pgAdmin)
bun run db:start

# Run database migrations
bun run db:migrate

# Start the API server
bun run dev
```

API available at `http://localhost:8000`. Docs at `http://localhost:8000/docs`.

### Documentation site

```bash
cd apps/docs && bun run dev
```

## Environment Variables

```bash
# First-time setup: decrypt .env files (requires key)
bun run env:decrypt

# After changing variables
bun run env:encrypt

# Inspect variables
bun run env:get KEY
bun run env:ls
```

## Available Scripts

### Root

| Command               | Description                                 |
| --------------------- | ------------------------------------------- |
| `bun run dev`         | Start web app dev server                    |
| `bun run desktop`     | Start web + Electrobun desktop              |
| `bun run build`       | Build all apps                              |
| `bun run typecheck`   | Type check all workspaces                   |
| `bun run format`      | Format all code with Biome                  |
| `bun run lint`        | Lint all code                               |
| `bun run check:fix`   | Format + lint + organize imports            |
| `bun run clean`       | Remove all build artifacts and node_modules |
| `bun run env:decrypt` | Decrypt .env files                          |
| `bun run env:encrypt` | Encrypt .env files after changes            |

### Backend (`apps/backend`)

| Command              | Description                               |
| -------------------- | ----------------------------------------- |
| `bun run setup`      | Create virtualenv and install Python deps |
| `bun run dev`        | Start FastAPI server (port 8000)          |
| `bun run db:start`   | Start PostgreSQL + pgAdmin via Docker     |
| `bun run db:stop`    | Stop database containers                  |
| `bun run db:migrate` | Run Alembic migrations                    |
| `bun run db:reset`   | Reset database                            |
| `bun run build`      | Build Docker image                        |

## API Endpoints

The backend serves Bible content compatible with the `bible.helloao.org` format.

| Endpoint                                        | Description                 |
| ----------------------------------------------- | --------------------------- |
| `GET /health`                                   | Health check                |
| `GET /api/available_translations.json`          | List all Bible translations |
| `GET /api/{translation}/books.json`             | Books for a translation     |
| `GET /api/{translation}/{book}/{chapter}.json`  | Chapter verses              |
| `GET /api/{translation}/complete.json`          | Full translation            |
| `GET /api/available_commentaries.json`          | List commentaries           |
| `GET /api/c/{commentary}/{book}/{chapter}.json` | Commentary chapter          |
| `GET /api/available_datasets.json`              | List datasets               |
| `GET /api/d/{dataset}/{book}/{chapter}.json`    | Dataset chapter             |

## Documentation

- [CLAUDE.MD](CLAUDE.MD) — AI assistant context, tech stack, conventions
- [API Docs](http://localhost:8000/docs) — FastAPI Swagger UI (when running locally)
