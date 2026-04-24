#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

# Check uv is installed
if ! command -v uv &>/dev/null; then
	echo "uv not found. Installing..."
	curl -LsSf https://astral.sh/uv/install.sh | sh
	export PATH="$HOME/.cargo/bin:$PATH"
fi

# Pin Python version and create virtual environment
uv python install 3.13
uv venv --python 3.13

# Install dependencies from lockfile
uv sync

echo ""
echo "Setup complete. Activate the environment with:"
echo "  source .venv/bin/activate"

source .venv/bin/activate
