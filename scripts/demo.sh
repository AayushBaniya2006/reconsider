#!/usr/bin/env bash
# Full demo sequence, one command. Live by default; MIREYE_OFFLINE=1 ./scripts/demo.sh to replay fixtures.
set -euo pipefail
cd "$(dirname "$0")/.."
set -a; [ -f .env ] && source .env; set +a

banner() { printf '\n\033[1m━━━ %s ━━━\033[0m\n\n' "$1"; }

banner "1/4 · 2485 Santa Rosa Ave, Altadena — survived Eaton, Non-Wildland FHSZ"
npx tsx src/index.ts "2485 SANTA ROSA AVE, ALTADENA, CA 91001"

banner "2/4 · 2269 Santa Rosa Ave, Altadena — survived, but hardening gaps"
npx tsx src/index.ts "2269 SANTA ROSA AVE, ALTADENA, CA 91001"

banner "3/4 · 4844 Commonwealth Ave, La Cañada Flintridge — Very High FHSZ, no evidence"
npx tsx src/index.ts "4844 Commonwealth Ave, La Canada Flintridge, CA 91011"

banner "4/4 · Producer view — statutory clocks + case dashboard"
npx tsx src/appeals.ts
npx tsx src/site.ts
echo "Artifacts: out/*.pdf · out/index.html (case dashboard) · out/appeals.html"
