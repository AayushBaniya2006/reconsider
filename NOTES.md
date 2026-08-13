# Reconsider — verified facts (2026-08-07)

CA wildfire **risk-score appeal** agent for the Mireye Build Challenge (deadline **Aug 15**, submit Aug 14 with slack).

## Legal frame — 10 CCR §2644.9 (verified against Cornell LII, 2026-08-07)
- **(i)** Appeal right is against the **wildfire risk score / classification** — NOT the non-renewal. Insurer must acknowledge in writing within **10 calendar days**, respond with written reconsideration + decision within **30 calendar days**.
- **(j)** Agent/broker receiving an appeal must forward to insurer within **5 calendar days** → the buyer (personal-lines producer) is in the loop *by law*.
- **(h)(3)** Insurer must provide the score **75 days before any nonrenewal** → intake trigger moment.
- **(k)(B)** Insurer must disclose **the dollar amount of premium reduction** for each mitigation measure → the agent's closing demand.
- Argument rests on the **enumerated Safer-from-Wildfires standards** (Class-A roof, ember-resistant vents, 5-ft noncombustible zone, etc.). DINS survivor comparables are **corroboration**, not the argument.

## DINS — verified live (2026-08-07, keyless, $0)
Endpoint: `https://services1.arcgis.com/jUJYIo9tSA7EHvfZ/arcgis/rest/services/POSTFIRE_MASTER_DATA_SHARE/FeatureServer/0/query`

Schema has everything: `DAMAGE`, `ROOFCONSTRUCTION`, `EAVES`, `VENTSCREEN`, `EXTERIORSIDING`, `WINDOWPANE`, `DECKPORCHONGRADE/ELEVATED`, `FENCEATTACHEDTOSTRUCTURE`, `DEFENSIVEACTIONS`, `YEARBUILT`, `ASSESSEDIMPROVEDVALUE`, `SITEADDRESS`, `APN`, `LATITUDE/LONGITUDE`, `INCIDENTNAME`.

Eaton fire (`INCIDENTNAME='Eaton'`):
- **7,893 No Damage / 9,419 Destroyed (>50%)** — survivors exist at scale.
- Roof survival (No Damage vs Destroyed): Concrete 73%, Tile 61%, Metal 52%, Asphalt 47%, Wood 30%.
- Vents: Mesh ≤1/8" **73%** vs Mesh >1/8" **52%** — matches the Safer-from-Wildfires ember-vent standard.
- ⚠️ **Methodology guard:** `Unknown` clusters on destroyed structures (Unknown roof = 7% survival, Unknown vents = 5%) — inspectors can't assess what burned. All comparisons must EXCLUDE Unknown and disclose the conditioning, or the packet is attackable.

Demo street candidates (survived/destroyed, balanced): **Santa Rosa 70/77**, **El Sereno 78/69**, E Mendocino 147/168, Mountain View 74/84, Holliston 60/49, Homewood 27/30.

## Mireye API (verified via docs.mireye.ai, 2026-08-07)
- MCP: `claude mcp add --transport http --scope user mireye-earth https://api.mireye.com/mcp` (OAuth browser sign-in). API: Bearer `MIREYE_API_TOKEN`, base `https://api.mireye.com`.
- Use `POST /v1/fetch` with presets (`wildfire_underwrite`, `natural_hazard`, `terrain`) — **1 credit/field**. AVOID `/v1/lookup` (300 credits). `/v1/ask` = 10 credits.
- Every field: `value, unit, source, source_url, confidence, fetched_at, dataset_vintage, status` — packet provenance comes straight from this.
- `/v1/field-requests` — request a missing field (also the founder-email hook).
- Signup codes: GROWTH (growth tier free month), BUILD (build tier). Free tier: 5k credits, no card.
- First live pull once token exists:
  `curl -s -X POST https://api.mireye.com/v1/fetch -H "Authorization: Bearer $MIREYE_API_TOKEN" -H 'Content-Type: application/json' -d '{"address":"<Altadena addr from DINS street list>","preset":"wildfire_underwrite"}'`

## Gates (tonight)
- [x] Gate 3: DINS survivors + hardening fields verified (this doc)
- [ ] Gate 2: Mireye account + one live pull on an Altadena address — **user: signup/OAuth**
- [ ] Gate 1: founder email — draft in `founder-email.md`, **send tonight** (external latency)

## 7-day plan
- Aug 8–10: end-to-end skeleton — address in → cited appeal packet PDF out. Ugly is fine.
- Aug 11–12: statutory clock tracker, (k)(B) dollar-disclosure demand, broker framing/portal.
- Aug 13: run 3 real properties — one must be a "don't appeal, remediate first" decision (agents that always say yes aren't deciding).
- Aug 14: record demo + submit. Aug 15: slack.

## Day 1 state (2026-08-08)
- Skeleton pipeline WORKS end-to-end: `npm run packet -- "<address>"` → `out/packet-<slug>.md`. Modules: `src/{mireye,dins,scoring,decision,packet,index}.ts`.
- Demo addresses (real, Santa Rosa Ave, Eaton): **2485 → APPEAL** (fine-mesh vents + enclosed eaves met), **2269 → REMEDIATE-FIRST** (coarse vents + unenclosed eaves; vents gap ranked #1 by DINS delta). Both packets in `out/`.
- ⚠️ **New methodology guard (verified live 2026-08-08): restrict all DINS crosstabs to `STRUCTURETYPE LIKE 'Single Family Residence%'`.** ~30% of Eaton rows are 'Utility Misc Structure' (sheds/garages); pooled, they invert effects (unscreened vents "87%", stucco 42% vs wood 73%). SFR-only: Mesh ≤1/8" 73% vs >1/8" 51% — core comparison holds. Disclosed in packet alongside the Unknown exclusion. Note: 'No Vents'/'Unscreened' rates run high even SFR-only — packet compares the two mesh categories only and shows the full table.
- Enumerated (d)(1) standards verified verbatim vs Cornell LII 2026-08-08; quoted in `scoring.ts` and packet. (i)/(j)/(k)(B) quotes verified same fetch.
- Mireye: MCP OAuth **still pending user**; `mireye.ts` runs live (MIREYE_API_TOKEN) / fixture (`spike/mireye-fetch-*.json`) / pending. First pull + normalizer pinning + ideation lane blocked on auth.
- Subject facts today come from the subject's own DINS inspection record (labeled as CAL FIRE field observation — distinct from comparables); Mireye becomes primary once live. Roof material ≠ Class-A rating — B2a stays unknown without documentation.

## Day 3 state (2026-08-10) — Mireye LIVE
- Outage: api.mireye.com served plaintext on 443 from ~Aug 8 17:10 PT to Aug 10 15:10 PT (~46 h; watcher caught recovery). Founder email carries the outage P.S.
- OAuth done; REST token in `.env` (gitignored, chmod 600, JWT exp ~2026-11-08). Both demo packets re-rendered **mode=live** (8 fields each, raw archived `spike/mireye-fetch-*.json`, catalog in `spike/mireye-catalog.json`).
- **Pinned /v1/fetch shape** (see spike): top-level `lat,lng,fetched_at,fields,partial_failures,geocode,resolved_location`; per-field `value,unit,source,source_url,confidence(STRING high/medium),fetched_at,dataset_vintage,ttl_seconds,notes,status`. Geocode: rooftop, `parcel_grade:true`.
- `wildfire_underwrite` = 8 exposure fields (elevation, slope, lcms_class, tree_canopy_pct, ndvi_current, ndvi_change_5y, FHSZ class, responsibility area) — NO hardening fields → division of labor: Mireye = exposure/classification, DINS record + owner = hardening.
- 🔑 **FHSZ anchor:** both demo parcels are **"Non-Wildland" (LRA)** per CAL FIRE OSFM map dated 2025-03-24 — cited to CAL FIRE's own ArcGIS. Packet leads exposure section with a neutral "reconcile your score with the State's classification" demand (decisive when favorable, harmless otherwise).
- **Field request FILED** via MCP: `fr_43cf7d4595af48c38390a83589b22c80` (FRAP perimeter distance + last burn year + incident name; all `accepted_new`, queue pos 7, ETA ~Aug 11 15:20 PT). Poll `mireye_field_request_status`; resume /v1/fetch body provided. If built in time → wire into exposure section; demo beat: "the agent requested a field that didn't exist."

## Day 3 build (2026-08-10 evening) — Aug 11–12 scope pulled forward, DONE
- **Clock tracker**: `data/appeals.json` registry; every packet run auto-registers (status draft). `npm run appeals` = producer view w/ live statutory clocks; lifecycle: `file` (→ producer, (j) 5-day) → `forward` (insurer receipt, (i) 10/30-day) → `ack` → `decide`. Overdue detection verified (backdated test showed "🔴 OVERDUE — statutory deadline missed"). `npm run appeals -- html` → `out/appeals.html` dashboard.
- **PDF**: packet renders md → styled HTML (marked) → PDF via puppeteer-core + installed Chrome (no download). ~285 KB/packet. Layout visually verified.
- **(k)(B) demand table**: per unmet measure — verbatim standard, DINS survival delta, demanded itemized dollar disclosure. Zero-gap appeals demand full rating-plan schedule instead.
- **`MIREYE_OFFLINE=1`**: re-renders replay per-address fixture from spike/ — no credit spend. Live remains default.
- Founder email P.S. updated to past-tense postmortem (outage bounds ~Aug 8 17:10 → Aug 10 15:10 PT). Field request still queued (pos 7, ETA Aug 11 ~15:20 PT) — poll `mireye_field_request_status fr_43cf7d4595af48c38390a83589b22c80`.
- Remaining: Aug 13 third property (outside Eaton footprint — tests no-DINS-record path) + threshold tuning; Aug 14 demo + submit (check submission form requirements a day early).

## Day 3 late build (2026-08-10 night) — Aug 13 scope pulled forward too
- **Third property LIVE: 4844 Commonwealth Ave, La Cañada Flintridge** (rooftop parcel-grade geocode vs LA County; 0 DINS rows — 91011 has 2 rows total across ALL incidents). FHSZ **Very High** → decision: **document-first** (new honest branch: met==0 && notMet==0 → refuse to file on exposure alone; packet renders "Evidence checklist — document these, then decide", high-impact standards first). Demo triangle: Non-Wildland+hardening→APPEAL / Non-Wildland+gaps→REMEDIATE / Very High+no evidence→CHECKLIST.
- **Field request surfaced in product**: `data/field-requests.json` → packet "Evidence in flight" line (request id, filed date, provider ETA). NB: REST GET /v1/field-requests/{id} returns not_found under the API token — requests are visible only to the filing credential (MCP OAuth); poll via MCP tool only.
- **Verification statement** footer added to every packet (primary-source quotes, per-fact provenance, disclosed conditioning, unknown ≠ asserted).
- **README.md** (submission front page), **docs/demo-script.md** (beat-by-beat, timed, with fallbacks + Aug 13 rehearsal checklist), **scripts/demo.sh** (one-command full demo; MIREYE_OFFLINE=1 replay verified end-to-end).
- Build Challenge submission format is NOT on docs.mireye.ai (checked llms.txt index too) — **get it from the original challenge announcement**.
- Credit spend so far: ~3 live pulls ×8 + geocodes ≈ 30 credits of 5k+.

## Day 3 final push (2026-08-10 night) — "fix everything that might lose"
- **Adversarial code review** (subagent): 6 real findings fixed — noon-pinned deadline dates, markdown cell escaping, positive-only survival deltas (unscreened vents OUT-SURVIVE fine mesh in raw Eaton data — clamp was load-bearing), appeals CLI arg guards, DAMAGE bucket guard, quote-sanitized DINS where-clauses. Live full demo re-verified after fixes.
- **Second preset wired in**: natural_hazard (19 fields, 2 overlap) → **24 cited facts/property**. Gem: `wildfire_annual_frequency` (FEMA NRI) — Altadena parcels 8×10⁻⁶/yr (≈1-in-125,000) vs La Cañada 1.9×10⁻³ (**234×**) — federal model independently corroborates all three decisions. Packet: frequency in exposure prose + "Broader hazard context" table.
- **Case dashboard**: `npm run site` → `out/index.html` (self-contained; legal-editorial: Libre Caslon + IBM Plex Mono, paper/ink/poppy, rubber-stamp decisions, 12-standard punch grids, statutory clock lines, evidence-in-flight band). Generated from `data/cases.json` (pipeline now persists case summaries). Demo Beat 4 shows it.
- Non-appeal packets now headed "not for filing"; demo script + README updated (24 facts, dashboard beat).
- Credit spend total ≈ 250 of 5,000.

## SUBMISSION (form requirements confirmed 2026-08-12)
- Google Form fields: Name, Email, **Git Repo Link**, **One Pager Link**, **2-Min Demo Video** (optional/recommended), **Feedback for Mireye** (required). Deadline Aug 15, winners Aug 20. Prizes: 1st=Mireye internship, 2nd–8th cash+credits.
- **Repo is PUBLIC**: https://github.com/AayushBaniya2006/reconsider
- **One-pager LIVE** (GitHub Pages, source main /docs): https://aayushbaniya2006.github.io/reconsider/ — prose one-pager answering the 3 judging questions + "agent not a map" rule, dashboard hero. Source: `docs/index.html`.
- **Demo script retimed to 2:00** (form wants 2 min; 3-min kept as extended cut) — `docs/demo-script.md`.
- **Feedback field text**: `docs/feedback-for-mireye.md` (product + field-request + outage postmortem).
- Judging fit: "build an agent not a map" ✓ (agent decides, no map); "who writes the cheque" ✓ (producers, §(j) 5-day duty); "combine with something weird" ✓ (score appeal + DINS forensics + statute engine).
- REMAINING (human only): send founder email (now partly redundant with Feedback field — optional); record 2-min video; fill+submit the Google Form. FRAP field request still queued (pos 6) — may not land before submit; "evidence in flight" story stands regardless.

## Competitive maneuvers (2026-08-10 late)
- Likely field: map visualizers, site-selection tools (the 106-field data_center preset is an idea magnet), property-report generators (closest confusable neighbor), /v1/ask chatbots. Counter-position: **"Not a report. A filing."** — now in README, dashboard thesis, demo cold open.
- **SUBMISSION.md** added — the judge's one-page skim (90-sec pitch, Mireye load-bearing section incl. field-request id, scrutiny section, 60-sec try-it, roadmap).
- **Judge-proofing verified:** tokenless clone runs end-to-end on committed fixtures (mode=fixture, full PDF).
- **Out-of-sample replication verified (2026-08-10):** Palisades Fire SFR vents — Mesh ≤1/8" 53% (916/1720) vs >1/8" 39% (1349/3450), +14pp, same direction as Eaton +22pp; Unknown artifact 7%/0% — cited in SUBMISSION.md. Eaves weaker there (73 vs 68) — not cited as replication.
- Recording-craft checklist added to demo script.

## Ideation findings (2026-08-10, bounded lane — from REAL shapes)
- **Demo choreography (3 min):** (1) cold open: "this house survived Eaton; its insurer scored it high-risk anyway" ~15s → (2) live run on 2485: pull logs, 8 cited fields, decision APPEAL ~40s → (3) packet scroll: FHSZ Non-Wildland vs score, statutory clock table, verbatim (k)(B) dollar demand ~60s → (4) run 2269 → REMEDIATE-FIRST ranked gaps ("the agent declines — that's deciding") ~30s → (5) clock-tracker screen + broker close: "producer forwards in 5 days; we track the insurer's 10" ~30s.
- **Packet:** per-fact table (value/source/confidence/vintage) + rooftop-geocode line + notes in provenance appendix — already built. Confidence is a string enum; render as-is.
- **Post-submission log (do NOT build now):** ttl_seconds → "fact valid until" footer; ndvi_change_5y as "vegetation reduced since scoring" evidence (needs noise threshold — demo value −0.022 is noise); NAIP defensible-space measurement; auto-poll field-request status inside the pipeline.

## Other supporting sources (verified by ideation workflow)
- NAIP imagery: Microsoft Planetary Computer STAC, anonymous, Altadena covered (defensible-space measurement — use rendered previews + canvas pixel counting, not raw COG math).
- FHSZ: CAL FIRE REST live. CDI non-renewal ZIP counts: manual one-time ingest.
