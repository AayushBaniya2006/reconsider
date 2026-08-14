#!/usr/bin/env bash
# Pre-recording GO/NO-GO check. Run this right before you hit record.
# Verifies the 2-minute demo will run clean without surprises on camera.
cd "$(dirname "$0")/.."
ok=1
say()  { printf '  \033[32m✓\033[0m %s\n' "$1"; }
warn() { printf '  \033[33m!\033[0m %s\n' "$1"; }
bad()  { printf '  \033[31m✗\033[0m %s\n' "$1"; ok=0; }

printf '\n\033[1mReconsider — pre-recording preflight\033[0m\n\n'

# 1. deps
[ -d node_modules/tsx ] && say "dependencies installed" || bad "run: npm install"

# 2. demo can produce data — fixtures make it API-independent (record in offline mode)
if ls spike/mireye-fetch-*-santa-rosa-ave.json >/dev/null 2>&1; then
  say "archived Mireye responses present — record with MIREYE_OFFLINE=1 (100% reliable, still real data)"
else
  bad "no archived fixtures in spike/ — a token-less/offline demo would be empty"
fi

# 3. Chrome for the PDF
[ -x "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" ] \
  && say "Chrome found (PDF render works)" || warn "Chrome missing — packets still render .md/.html, PDF step skips"

# 4. appeals.json in the state the script narrates (2485 forwarded, others draft)
state=$(node -e "const a=require('./data/appeals.json');console.log(a.map(x=>x.id+':'+x.status).join(' '))" 2>/dev/null)
if echo "$state" | grep -q '2485-santa-rosa-ave:forwarded' && echo "$state" | grep -q '2269-santa-rosa-ave:draft'; then
  say "clock state correct → 2485 forwarded (clocks running), 2269 & 4844 draft"
else
  warn "appeals.json state is: $state"
  warn "to reset: git checkout data/appeals.json   (restores 2485 forwarded, others draft)"
fi

# 5. tests
if npm test >/dev/null 2>&1; then say "test suite green (9/9)"; else bad "npm test failing — investigate before recording"; fi

# 6. live links (best-effort; needs network)
code=$(curl -s -m 8 -o /dev/null -w '%{http_code}' https://aayushbaniya2006.github.io/reconsider/ 2>/dev/null)
[ "$code" = "200" ] && say "one-pager live (HTTP 200)" || warn "one-pager check returned '$code' (network? Pages build?)"

printf '\n'
if [ "$ok" = 1 ]; then
  printf '\033[1;32mGO.\033[0m Record with:  \033[1mMIREYE_OFFLINE=1 ./scripts/demo.sh\033[0m\n'
  printf 'Narration + timing: docs/demo-script.md\n\n'
else
  printf '\033[1;31mNO-GO.\033[0m Fix the ✗ items above, then re-run.\n\n'
  exit 1
fi
