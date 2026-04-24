# /// script
# requires-python = ">=3.13"
# dependencies = ["pyopenssl>=23.0.0"]
# ///

import subprocess
import sys
import time
import urllib.request
import webbrowser
from pathlib import Path

import OpenSSL.crypto as crypto

ROOT = Path(__file__).parent.parent
SRC = ROOT / "supabase"
SSL_DIR = ROOT / "supabase"
SSL_CERT = SSL_DIR / "server.crt"
SSL_KEY = SSL_DIR / "server.key"
API_HEALTH_URL = "http://localhost:8000/health"
STUDIO_URL = "http://localhost:54323"


def ensure_ssl() -> None:
    if SSL_CERT.exists() and SSL_KEY.exists():
        print("  SSL certificate already exists, skipping generation.")
        return

    print("  Generating self-signed SSL certificate...")
    SSL_DIR.mkdir(parents=True, exist_ok=True)

    key = crypto.PKey()
    key.generate_key(crypto.TYPE_RSA, 2048)

    cert = crypto.X509()
    cert.get_subject().CN = "localhost"
    cert.set_serial_number(1)
    cert.gmtime_adj_notBefore(0)
    cert.gmtime_adj_notAfter(365 * 24 * 60 * 60)  # 1 year
    cert.set_issuer(cert.get_subject())
    cert.set_pubkey(key)
    cert.sign(key, "sha256")

    SSL_CERT.write_bytes(crypto.dump_certificate(crypto.FILETYPE_PEM, cert))
    SSL_KEY.write_bytes(crypto.dump_privatekey(crypto.FILETYPE_PEM, key))
    print(f"  Certificate written to {SSL_CERT}")
    print(f"  Key written to {SSL_KEY}")


def run(args: list[str], *, cwd: Path = ROOT, label: str | None = None) -> bool:
    display = label or " ".join(args)
    print(f"\n  $ {display}")
    result = subprocess.run(args, cwd=cwd)
    if result.returncode != 0:
        print(f"  FAILED (exit {result.returncode})", file=sys.stderr)
        return False
    return True


def wait_for(url: str, timeout: int = 120, label: str = "") -> bool:
    print(f"  waiting for {label or url}", end="", flush=True)
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        try:
            urllib.request.urlopen(url, timeout=2)
            print(" ready")
            return True
        except Exception:
            print(".", end="", flush=True)
            time.sleep(2)
    print(" timed out", file=sys.stderr)
    return False


def main() -> None:
    print("Starting up...\n")

    # 1. Ensure SSL certificate exists
    print("==> Checking SSL certificate")
    ensure_ssl()

    # 2. Start local Supabase (runs from supabase/ so CLI finds supabase/config.toml)
    print("\n==> Starting Supabase (local)")
    if not run(["supabase", "start"], cwd=ROOT, label="supabase start"):
        print(
            "  warning: supabase start failed — is the Supabase CLI installed?",
            file=sys.stderr,
        )

    # 4. Open Supabase Studio in the default browser
    print(f"\n==> Opening Supabase Studio at {STUDIO_URL}")
    webbrowser.open(STUDIO_URL)


if __name__ == "__main__":
    main()
