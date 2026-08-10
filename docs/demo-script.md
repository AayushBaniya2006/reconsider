# Demo script — 3 minutes (record Aug 14, rehearse Aug 13)

Setup before recording: terminal at repo root, font large, `set -a; source .env; set +a` done,
`out/` cleared of stale files (keep appeals.json state: 2485 forwarded, others draft),
browser tabs ready: `out/appeals.html`, `out/packet-2485-santa-rosa-ave.pdf`.
Fallback if Mireye hiccups mid-demo: prepend `MIREYE_OFFLINE=1` — replays archived live pulls, identical output.

## Beat 1 — the hook (0:00–0:20)

Say: *"January 2025, Eaton Fire, Altadena. This house — 2485 Santa Rosa Avenue — survived.
CAL FIRE's own map says its parcel is Non-Wildland. Its insurer can still score it high-risk,
and that score follows the homeowner everywhere. California gives them a legal right to appeal
the score. Nobody uses it, because nobody assembles the evidence. Watch an agent do it."*

## Beat 2 — the appeal, live (0:20–1:10)

```
npm run packet -- "2485 SANTA ROSA AVE, ALTADENA, CA 91001"
```

Narrate the stage logs as they print: *"Live pull from Mireye — eight parcel facts, every one
with a source URL, a timestamp, a confidence, a dataset vintage. CAL FIRE damage-inspection
comparables. Scored against the twelve mitigation standards enumerated in the regulation itself.
Decision: APPEAL."*

Open the PDF. Scroll slowly past, pausing on:
1. the statutory clock table — *"ten days to acknowledge, thirty to reconsider — in writing, by law"*
2. FHSZ line — *"the State classifies this parcel Non-Wildland; the packet demands the insurer reconcile that"*
3. the (k)(B) demand table — *"for the one gap, the exact disclosure the law requires: the dollar premium reduction"*
4. the DINS tables — *"survivor comparables corroborate — with the survivorship artifact disclosed before an actuary can raise it"*

## Beat 3 — the agent says no (1:10–1:50)

```
npm run packet -- "2269 SANTA ROSA AVE, ALTADENA, CA 91001"
```

Say: *"Same street, also survived. The agent says DON'T appeal — coarse vent mesh and open eaves
would concede more than they claim. It ranks the fixes by real survival deltas from the Eaton data:
fine-mesh vents first, plus twenty-two points of survival. Remediate, then appeal."*

```
npm run packet -- "4844 Commonwealth Ave, La Canada Flintridge, CA 91011"
```

Say: *"Next town over, Very High hazard zone, no documentation. The agent refuses to file on
exposure alone — it produces the evidence checklist instead. An agent that always appeals isn't
deciding. Two of these three said no."*

## Beat 4 — the producer and the clock (1:50–2:35)

```
npm run appeals
```

(2485 already filed + forwarded; clocks visibly running.)

Say: *"The buyer is the insurance producer — the regulation drafts them into this: five days to
forward a client's appeal. Reconsider tracks every statutory clock. The insurer owes a written
acknowledgment by August 20 and a written reconsideration by September 9. Miss one and the
producer is quoting a missed legal deadline, not sending a nag."*

Flash `out/appeals.html` dashboard for two seconds.

## Beat 5 — close (2:35–3:00)

Say: *"One more thing — mid-build, the agent noticed a fact it wanted that Mireye doesn't have
yet: distance to the nearest historical fire perimeter. So it filed a field request through
Mireye's API — it's queued in their build pipeline right now, and the packet lists it as evidence
in flight. Score appeals recur every policy year. This is Reconsider."*

End card: repo + the three decisions on screen.

## Rehearsal checklist (Aug 13)

- [ ] Full run-through under 3:00, twice
- [ ] Live pulls succeed (else pre-set MIREYE_OFFLINE=1 and skip the word "live")
- [ ] Poll field request status before recording — if fields went live, wire them in and upgrade Beat 5 to show the delivered fact
- [ ] appeals.json state correct (2485 forwarded, 2269/4844 draft)
- [ ] Confirm submission format from the challenge announcement (not in docs.mireye.ai)
