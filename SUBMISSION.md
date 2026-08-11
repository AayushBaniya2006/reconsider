# Reconsider — Mireye Build Challenge submission

**Not a report. A filing.** A report describes risk; Reconsider prepares and tracks a legal
filing — a California wildfire risk-score appeal under 10 CCR §2644.9(i) — that an insurer must
answer in writing within 10 days and resolve within 30. And it only files when the evidence
supports filing.

## 90-second version

Every California homeowner can appeal their insurer's wildfire risk score. Almost nobody does:
the evidence assembly (enumerated mitigation standards, cited parcel facts, survivor comparables)
is the work nobody performs. Reconsider is an agent that performs it — and *decides*:

| Property (real, run live) | State FHSZ | FEMA NRI wildfire freq. | Agent decision |
|---|---|---|---|
| 2485 Santa Rosa Ave, Altadena — survived the Eaton Fire | Non-Wildland | 8×10⁻⁶/yr (≈1-in-125,000) | **APPEAL** + itemized §2644.9(k)(B) dollar demands |
| 2269 Santa Rosa Ave, Altadena — survived | Non-Wildland | 8×10⁻⁶/yr | **REMEDIATE FIRST** — gaps ranked by real survival deltas |
| 4844 Commonwealth Ave, La Cañada Flintridge | **Very High** | 1.9×10⁻³/yr — 234× higher | **DON'T FILE** — evidence checklist; exposure alone can't carry a (d)(1) appeal |

Two of three said *don't file*. An agent that always appeals isn't deciding.

The buyer is the personal-lines producer: §2644.9(j) drafts them into the process by law (5-day
duty to forward a client's appeal). Reconsider tracks every appeal's statutory clocks and turns a
missed deadline into quotable leverage. Score appeals recur every policy year.

## Where Mireye is load-bearing

- The subject property is intact — no damage database will ever describe it. Only per-field
  **source + URL + timestamp + confidence + vintage** gives a filing evidentiary weight. That
  provenance is rendered fact-by-fact into the packet and the case dashboard.
- **24 cited facts per property** via the two wildfire-relevant presets (`wildfire_underwrite` +
  `natural_hazard`), 1 credit/field — including the two anchor facts: CAL FIRE's own FHSZ map
  (cited to CAL FIRE's own server) and FEMA NRI's modeled wildfire frequency. When the State and
  the federal model both disagree with an insurer's score, the reconsideration must reconcile them.
- **We fed the roadmap back.** Mid-build, the agent wanted a field Mireye lacks — distance to the
  nearest CAL FIRE FRAP fire perimeter + last burn year — and filed it through `/v1/field-requests`
  (request `fr_43cf7d4595af48c38390a83589b22c80`, accepted as three new builds). Pending requests
  render in every packet as "evidence in flight."

## Why it survives scrutiny

- Every statute quotation fetched from the primary source at build time — never from model memory.
- Survivor comparables (CAL FIRE DINS, Eaton Fire) corroborate; they are never the argument. Two
  disclosed methodology guards: `Unknown` values excluded (they cluster on destroyed structures —
  a survivorship artifact that would inflate every effect) and single-family residences only
  (~30% of raw rows are sheds/garages that invert pooled rates).
- The core effect replicates out-of-sample: ember-resistant ≤1/8″ vent mesh survived at 73% vs
  51% (Eaton) and 53% vs 39% (Palisades) — same direction, independent fire.
- Where the raw data cuts against a claim, the packet says so or stays silent — survival deltas
  are only cited when positive; roof material is never passed off as a Class-A rating; a property
  with no evidence gets a checklist, not a filing.
- `npm test` encodes the hard rules as 9 passing assertions (the agent must be able to *not* file;
  clocks must be DST-stable). The packet's DINS percentages were independently recomputed against
  the live service and match to the exact count.

## Try it in 60 seconds

```bash
npm install
npm run packet -- "2485 SANTA ROSA AVE, ALTADENA, CA 91001"   # no token needed — replays archived live pulls
npm run appeals                                                # producer view, statutory clocks
open out/index.html                                            # case dashboard
```

With `MIREYE_API_TOKEN` in `.env`, the same commands run live against api.mireye.com.

## After the challenge

FRAP fields wired in on delivery of `fr_43cf7d…` · NAIP imagery for defensible-space measurement ·
`ttl_seconds`-driven freshness footers · auto-polled field requests · more perils, same skeleton —
the §-driven appeal pipeline generalizes to any regulated adverse-classification process.

— Aayush Baniya · thisisaayushbaniya@gmail.com
