#!/usr/bin/env python3
"""
Axos Brain Telemetry Reporter

Lightweight standalone script. Runs on the client's Brain machine,
pulls a lightweight summary from the local console, and pushes it
to the central Axos Labs website API.

Setup:
    1. Ensure AXOS_CONSOLE_API_KEY and AXOS_TELEMETRY_URL
       are set in the environment (or a .env file beside this script).
    2. Run directly:  python3 reporter.py
    3. Or schedule via cron:  */5 * * * * cd /path/to/console && python3 reporter.py

Author: Axos Labs
Version: 1.0.0
"""
import os
import sys
import json
import urllib.request
import urllib.error
from pathlib import Path
from datetime import datetime, timezone

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
CONSOLE_URL = os.environ.get("AXOS_CONSOLE_URL", "http://127.0.0.1:8081")
TELEMETRY_URL = os.environ.get("AXOS_TELEMETRY_URL", "")
API_KEY = os.environ.get("AXOS_CONSOLE_API_KEY", "").strip()

# Optionally load from .env beside this script
_ENV_LOADED = False
def _load_env():
    global _ENV_LOADED
    if _ENV_LOADED:
        return
    env_path = Path(__file__).with_suffix(".env")
    if not env_path.exists():
        env_path = Path(__file__).parent / ".env"
    if env_path.exists():
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#"):
                    continue
                if "=" in line:
                    k, v = line.split("=", 1)
                    os.environ.setdefault(k.strip(), v.strip())
    _ENV_LOADED = True

_load_env()

# Re-read after .env load
CONSOLE_URL = os.environ.get("AXOS_CONSOLE_URL", CONSOLE_URL)
TELEMETRY_URL = os.environ.get("AXOS_TELEMETRY_URL", TELEMETRY_URL)
API_KEY = os.environ.get("AXOS_CONSOLE_API_KEY", API_KEY).strip()

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def _api_request(path: str, method: str = "GET", payload: dict | None = None, timeout: int = 15) -> dict:
    """Make an authenticated request to the local console or remote API."""
    url = f"{CONSOLE_URL}{path}" if path.startswith("/") else path
    data = None
    if payload:
        data = json.dumps(payload).encode("utf-8")

    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("Content-Type", "application/json")
    if API_KEY:
        req.add_header("X-API-Key", API_KEY)

    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            body = resp.read().decode("utf-8")
            return json.loads(body) if body else {}
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8") if e.read() else ""
        return {"_error": f"HTTP {e.code}", "_body": body}
    except urllib.error.URLError as e:
        return {"_error": str(e.reason)}
    except Exception as e:
        return {"_error": str(e)}


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    # Validate configuration
    if not API_KEY or API_KEY == "changeme-generate-a-64-char-random-string":
        print("[ERROR] AXOS_CONSOLE_API_KEY not set. Set it in your environment or .env file.")
        sys.exit(1)
    if not TELEMETRY_URL:
        print("[WARN] AXOS_TELEMETRY_URL not set. Will only print telemetry locally.")

    # 1. Pull local summary
    snapshot = _api_request("/api/telemetry")
    if "_error" in snapshot:
        print(f"[ERROR] Failed to pull local telemetry: {snapshot['_error']}")
        sys.exit(1)

    # Enrich with reporter metadata
    snapshot["reported_at"] = datetime.now(timezone.utc).isoformat()
    snapshot["hostname"] = os.environ.get("COMPUTERNAME", "unknown")
    snapshot["reporter_version"] = "1.0.0"

    print(json.dumps(snapshot, indent=2))

    # 2. Push to central if configured
    if TELEMETRY_URL:
        result = _api_request(TELEMETRY_URL, method="POST", payload=snapshot)
        if "_error" in result:
            print(f"[ERROR] Failed to push telemetry: {result['_error']}")
            sys.exit(1)
        print(f"[OK] Telemetry pushed at {snapshot['reported_at']}")
    else:
        print("[INFO] AXOS_TELEMETRY_URL not set — telemetry printed locally only.")


if __name__ == "__main__":
    main()
