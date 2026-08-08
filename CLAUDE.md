# Reconsider

California wildfire **risk-score appeal** agent — Mireye Build Challenge entry. Deadline **2026-08-15** (submit Aug 14, record demo first).

An agent that assembles and files appeals of an insurer's wildfire risk score under 10 CCR §2644.9(i): Mireye cited subject-parcel facts, scored against the Safer-from-Wildfires enumerated standards, corroborated with CAL FIRE DINS survivor comparables from the Eaton Fire, closed with the §2644.9(k)(B) dollar premium-reduction demand, tracked against the insurer's statutory 10-day acknowledgment clock. Buyer: personal-lines insurance producers (5-day forwarding duty, §2644.9(j)).

## Hard rules — do not regress on these
- It is a **score appeal**, never a "non-renewal appeal" — subsection (i) appeals the score/classification. Verified 2026-08-07 against Cornell LII. Framing it as non-renewal is legally wrong and kills the entry.
- The legal argument rests on the **enumerated Safer-from-Wildfires standards**; DINS survivor data is **corroboration only**.
- All DINS comparisons **exclude 'Unknown' values** and disclose that conditioning (Unknowns cluster on destroyed structures — survivorship artifact).
- The agent must **decide**, including "don't appeal — remediate first, here's the ranked gap list." An agent that always appeals isn't deciding.
- Mireye usage: `POST /v1/fetch` with presets (`wildfire_underwrite`, `natural_hazard`) at 1 credit/field. **Never `/v1/lookup`** (300 credits/call). MCP server: `mireye-earth` (user scope).

## Key files
- `NOTES.md` — all verified facts: legal subsections, DINS endpoint + Eaton numbers, demo street candidates, Mireye API notes, gates, 7-day plan.
- `spike/dins-queries.sh` — working DINS queries (keyless ArcGIS FeatureServer).
- `founder-email.md` — draft for founders@mireye.com (field request: distance to nearest FRAP fire perimeter + last burn year).
- `docs/ideation-report.md` — full 79-agent ideation report that produced this pick (context only; its "non-renewal" framing is superseded).

## Plan (see NOTES.md for detail)
Aug 8–10 skeleton (address → cited appeal packet PDF, ugly). Aug 11–12 statutory clock + dollar demand + broker framing. Aug 13 three real properties incl. one "don't appeal." Aug 14 record + submit.
