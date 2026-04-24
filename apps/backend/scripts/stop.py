#!/usr/bin/env python3
# /// script
# requires-python = ">=3.13"
# ///
"""Clean the project: remove caches, build artifacts, venv, and stop Docker services."""

import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent


def remove(path: Path) -> None:
    if path.exists():
        shutil.rmtree(path)
        print(f"  removed  {path.relative_to(ROOT)}")


def run(args: list[str], *, cwd: Path = ROOT, label: str | None = None) -> bool:
    display = label or " ".join(args)
    print(f"\n  $ {display}")
    result = subprocess.run(args, cwd=cwd)
    if result.returncode != 0:
        print(f"  FAILED (exit {result.returncode})", file=sys.stderr)
        return False
    return True


def main() -> None:
    print("Stop project...\n")

     # 2. Start local Supabase (runs from src/ so CLI finds src/supabase/config.toml)
     print("\n==> Stoping Supabase (local)")
     if not run(["supabase", "stop"], cwd=SRC, label="supabase stop"):
         print(
             "  warning: supabase stop failed — is the Supabase CLI installed?",
             file=sys.stderr,
         )

    print("\nDone.")


if __name__ == "__main__":
    main()
