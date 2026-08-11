# Reconsider

**An agent that decides whether to appeal a California wildfire risk score — and assembles the legally-framed, fully-cited appeal packet when the answer is yes.**

**Not a report. A filing.** A report describes risk; a filing under 10 CCR §2644.9(i) starts a clock the insurer must answer in writing.

Under 10 CCR §2644.9(i), every California homeowner has the right to appeal their insurer's wildfire risk score. The insurer must acknowledge in writing within 10 calendar days and issue a written reconsideration within 30. Almost nobody exercises this right, because assembling the evidence — the enumerated mitigation standards, the parcel facts, the comparables — is exactly the kind of work nobody does. Reconsider does it.

## What one command produces

```
npm run packet -- "2485 SANTA ROSA AVE, ALTADENA, CA 91001"
```

address → Mireye parcel facts (live, cited) → CAL FIRE DINS survivor comparables → scoring against the enumerated §2644.9(d)(1) standards → **decision** → filing-ready packet (markdown + HTML + PDF) → tracked appeal with statutory clocks.

## The agent decides — three real properties, three different answers

| Property | FHSZ (CAL FIRE) | Evidence | Decision |
|---|---|---|---|
| 2485 Santa Rosa Ave, Altadena | Non-Wildland | Fine-mesh vents, enclosed eaves documented | **APPEAL** — with itemized §2644.9(k)(B) dollar demands for the one gap |
| 2269 Santa Rosa Ave, Altadena | Non-Wildland | Coarse vents, unenclosed eaves | **REMEDIATE FIRST** — gaps ranked by Eaton-Fire survival delta; appeal after |
| 4844 Commonwealth Ave, La Cañada Flintridge | **Very High** | No documentation either way | **DON'T FILE YET** — evidence checklist; an appeal may not rest on exposure facts alone |

An agent that always appeals isn't deciding. Two of three real runs said *don't file*.

## Why the packet holds up

- **The argument is the law's own list.** The appeal argues from the enumerated mitigation standards of 10 CCR §2644.9(d)(1) — quoted verbatim, verified against the primary source (Cornell LII) at build time, never paraphrased from memory.
- **Survivor data corroborates; it never argues.** CAL FIRE DINS damage-inspection data from the Eaton Fire (7,893 undamaged vs 9,419 destroyed structures) backs each standard — e.g. ember-resistant ≤1/8″ vent mesh survived at 73% vs 51% for coarse mesh among single-family residences.
- **The methodology is disclosed before an actuary can attack it.** All comparisons exclude `Unknown` values (inspectors can't assess features that burned — a survivorship artifact that would otherwise inflate every effect) and are restricted to single-family residences (~30% of raw DINS rows are sheds/garages that invert pooled survival rates). Excluded counts are printed in every table.
- **Every fact carries its provenance.** Mireye fields arrive with source, source URL, retrieval timestamp, confidence, and dataset vintage — rendered per-fact in the packet, down to the rooftop parcel-grade geocode.
- **The anchor exposure facts:** CAL FIRE's own 2025 FHSZ map, cited to CAL FIRE's own server — and FEMA NRI's modeled annual wildfire frequency (the Altadena demo parcels: 8×10⁻⁶/yr, ≈1-in-125,000; the La Cañada control: 234× higher). When the State and the federal risk model both disagree with an insurer's score, the packet demands the §2644.9(i) reconsideration reconcile them. 24 cited facts per property across the two permitted presets (`wildfire_underwrite` + `natural_hazard`).
- **Missing evidence is requested, not ignored.** The agent filed a live field request with the data provider (FRAP perimeter distance + last burn year, `fr_43cf7d…`) via Mireye's field-request API; pending requests appear in the packet as "evidence in flight."

## The buyer and the clock

The buyer is the personal-lines insurance producer: §2644.9(j) puts them in the loop *by law* (5-day duty to forward a client's appeal). Reconsider tracks every appeal's statutory clocks:

```
npm run appeals              # producer view — every appeal, every deadline
npm run appeals -- file 2485      # packet delivered to producer   → (j) 5-day clock
npm run appeals -- forward 2485   # insurer receipt                → (i) 10-day + 30-day clocks
npm run appeals -- ack 2485       # insurer acknowledged
npm run appeals -- decide 2485    # written reconsideration received
npm run appeals -- html           # dashboard (out/appeals.html)
```

Overdue clocks render as missed statutory deadlines — leverage a producer can quote.

## Run it

```bash
npm install
echo 'MIREYE_API_TOKEN=<token>' > .env   # api.mireye.com — /v1/fetch presets only (1 credit/field)
set -a; source .env; set +a
npm run packet -- "<address>"            # live pull; raw response archived to spike/
MIREYE_OFFLINE=1 npm run packet -- "<address>"   # replay archived fixture, zero credits
```

Outputs land in `out/` (`.md`, `.html`, `.pdf` per property, plus `index.html` — the case dashboard — and `appeals.html`). PDF rendering uses the installed Chrome via puppeteer-core. `npm run site` regenerates the dashboard from `data/*.json`.

## Architecture

```
src/index.ts      pipeline orchestration
src/mireye.ts     Mireye client — /v1/fetch wildfire_underwrite preset; live / fixture / pending modes
src/dins.ts       CAL FIRE DINS client — SFR-filtered survival crosstabs, Unknown-excluded, subject lookup
src/scoring.ts    the 12 enumerated §2644.9(d)(1) standards (verbatim) scored against evidence
src/decision.ts   appeal / remediate-first / document-first — with ranked gaps or evidence checklist
src/packet.ts     packet renderer (statutory clock, scorecard, (k)(B) demand table, corroboration, provenance)
src/render.ts     markdown → print-styled HTML → PDF
src/registry.ts   appeal registry + statutory clock math (data/appeals.json)
src/appeals.ts    producer CLI + dashboard
src/site.ts       static case dashboard (out/index.html) from data/*.json
```

## Honesty notes

- Subject hardening evidence comes from the subject's own CAL FIRE inspection record where one exists, and from owner documentation otherwise — never inferred.
- Roof *material* is never treated as proof of a Class-A fire rating.
- FHSZ reconciliation is argumentation the regulation's process invites, not a claimed legal entitlement.
- This is a filing-preparation tool, not legal advice.
