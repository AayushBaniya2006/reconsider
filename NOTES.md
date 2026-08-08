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

## Other supporting sources (verified by ideation workflow)
- NAIP imagery: Microsoft Planetary Computer STAC, anonymous, Altadena covered (defensible-space measurement — use rendered previews + canvas pixel counting, not raw COG math).
- FHSZ: CAL FIRE REST live. CDI non-renewal ZIP counts: manual one-time ingest.
