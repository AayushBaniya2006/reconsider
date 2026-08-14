# Demo script — 2 minutes (the challenge form asks for a 2-minute video)

Setup before recording: run `./scripts/preflight.sh` first — it confirms GO/NO-GO (deps, fixtures,
clock state, tests, live one-pager). Terminal at repo root, large font; browser tabs pre-loaded:
`out/index.html` (dashboard), `out/packet-2485-santa-rosa-ave.pdf`. Pre-type each command and
recall with ↑ so there are no live typos.

**Record in offline mode:** prefix every command with `MIREYE_OFFLINE=1` (or run
`MIREYE_OFFLINE=1 ./scripts/demo.sh`). This replays the Mireye responses archived from real live
pulls on Aug 10 — byte-identical output, but immune to any API hiccup mid-take (the API was down
~46h earlier this month). It is not faking: the fixtures are genuine archived responses. You can
truthfully say "these are real Mireye pulls." Only drop `MIREYE_OFFLINE=1` if you specifically want
to show a cold live call and the API is confirmed up.

Optional 8-second cold open (establishes it's a real product): show the live site
`aayushbaniya2006.github.io/reconsider` → click **Sign in** → **Skip — enter the demo** → the case
workspace. Then cut to the terminal for the live run. Keep it fast; the CLI is still the proof.

## Beat 1 — the hook (0:00–0:15)

*"This house survived the Eaton Fire. CAL FIRE's own map calls its parcel Non-Wildland. Its insurer
can still score it high-risk — and California law gives the owner a right to appeal that score.
Almost nobody does, because nobody assembles the evidence. This agent does. It's not a report —
it's a filing, and it starts a legal clock."*

## Beat 2 — the appeal, live (0:15–0:50)

```
npm run packet -- "2485 SANTA ROSA AVE, ALTADENA, CA 91001"
```

*"Live pull from Mireye — 24 cited facts, every one with a source, timestamp, confidence, vintage.
FEMA's own model puts wildfire here at one in 125,000 a year. CAL FIRE survivor comparables. Scored
against the twelve mitigation standards the regulation names. Decision: appeal."*

Open the PDF, scroll, pause on two things only: **the statutory clock table** (*"ten days to
acknowledge, thirty to decide — in writing, by law"*) and **the §2644.9(k)(B) demand** (*"the exact
dollar premium reduction the insurer must disclose for each fix"*).

## Beat 3 — the agent declines (0:50–1:25)

```
npm run packet -- "2269 SANTA ROSA AVE, ALTADENA, CA 91001"
npm run packet -- "4844 Commonwealth Ave, La Canada Flintridge, CA 91011"
```

*"Same street — the agent says don't appeal, remediate first, and ranks the fixes by real survival
deltas from the fire. Next town over, Very High hazard, no documentation — it refuses to file on
exposure alone and returns an evidence checklist instead. Two of three said no. An agent that always
appeals isn't deciding."*

## Beat 4 — buyer, clock, close (1:25–2:00)

```
npm run appeals
```

Open `out/index.html` (dashboard). *"The buyer is the insurance producer — the law drafts them in:
five days to forward a client's appeal. Reconsider tracks every statutory clock; a missed insurer
deadline becomes the producer's leverage. And mid-build, the agent hit a fact Mireye didn't have —
distance to the nearest fire perimeter — and filed a request back into their API. Score appeals
recur every policy year. This is Reconsider."*

End frame: dashboard with all three stamps + repo URL, hold 4 seconds.

---

## Rehearsal + recording checklist

- [ ] Two full run-throughs under 2:00; pick the calmer take — confidence reads as credibility
- [ ] Live pulls succeed (else pre-set `MIREYE_OFFLINE=1` and drop the word "live")
- [ ] Before recording: poll the FRAP field request — if it went live, wire it in and Beat 4 upgrades to "requested → delivered"
- [ ] `data/appeals.json` state correct (2485 forwarded; 2269, 4844 draft)
- [ ] Terminal ≥18pt, no line-wrap; 1080p; Do Not Disturb; every other app closed
- [ ] Scroll the PDF and dashboard slowly — judges pause on frames; give them clean ones

## Judge Q&A counters (have these ready)

- *"Isn't this legal advice?"* — It prepares a filing the policyholder already has the right to make; the producer reviews before filing.
- *"Non-Wildland, but the street burned!"* — Exactly why the argument rests on the enumerated hardening standards, never the map. The classification mismatch is a demand that the insurer reconcile its score with the State's map — not a claim of zero risk. The La Cañada case (Very High, 234× frequency) proves the agent never equates maps with safety.
- *"Who pays?"* — Personal-lines insurance producers. §2644.9(j) gives them a 5-day statutory duty to forward client appeals — they're in the loop by law, and score appeals recur annually per policy.

## Extended 3-minute cut (if a longer version is ever wanted)

Insert after Beat 2: a slow scroll through the full packet — DINS survivor tables with the
Unknown-exclusion and single-family-only disclosures, the broader-hazard context table, and the
per-fact provenance appendix — narrating *"survivor data corroborates, with the survivorship
artifact disclosed before an actuary can raise it."* Everything else unchanged.
