#!/usr/bin/env python3
# /// script
# requires-python = ">=3.13"
# ///
"""Clean the project: remove caches, build artifacts, venv, and stop Docker services."""

import shutil
from pathlib import Path

ROOT = Path(__file__).parent.parent

DIRS_TO_REMOVE = [
    ".venv",
    "node_modules",
    ".ruff_cache",
    ".pytest_cache",
]

GLOB_PATTERNS = [
    "**/__pycache__",
    "**/*.egg-info",
    "**/.temp",
    "**/dist",
    "**/build",
]


def remove(path: Path) -> None:
    if path.exists():
        shutil.rmtree(path)
        print(f"  removed  {path.relative_to(ROOT)}")


def main() -> None:
    print("Cleaning project...\n")

    print("\nRemoving top-level directories...")
    for name in DIRS_TO_REMOVE:
        remove(ROOT / name)

    print("\nRemoving cached/build artifacts...")
    for pattern in GLOB_PATTERNS:
        for path in sorted(ROOT.glob(pattern), reverse=True):
            remove(path)

    print("\nDone.")


if __name__ == "__main__":
    main()
