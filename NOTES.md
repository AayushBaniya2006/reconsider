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

## Ideation findings (2026-08-10, bounded lane — from REAL shapes)
- **Demo choreography (3 min):** (1) cold open: "this house survived Eaton; its insurer scored it high-risk anyway" ~15s → (2) live run on 2485: pull logs, 8 cited fields, decision APPEAL ~40s → (3) packet scroll: FHSZ Non-Wildland vs score, statutory clock table, verbatim (k)(B) dollar demand ~60s → (4) run 2269 → REMEDIATE-FIRST ranked gaps ("the agent declines — that's deciding") ~30s → (5) clock-tracker screen + broker close: "producer forwards in 5 days; we track the insurer's 10" ~30s.
- **Packet:** per-fact table (value/source/confidence/vintage) + rooftop-geocode line + notes in provenance appendix — already built. Confidence is a string enum; render as-is.
- **Post-submission log (do NOT build now):** ttl_seconds → "fact valid until" footer; ndvi_change_5y as "vegetation reduced since scoring" evidence (needs noise threshold — demo value −0.022 is noise); NAIP defensible-space measurement; auto-poll field-request status inside the pipeline.

## Other supporting sources (verified by ideation workflow)
- NAIP imagery: Microsoft Planetary Computer STAC, anonymous, Altadena covered (defensible-space measurement — use rendered previews + canvas pixel counting, not raw COG math).
- FHSZ: CAL FIRE REST live. CDI non-renewal ZIP counts: manual one-time ingest.
