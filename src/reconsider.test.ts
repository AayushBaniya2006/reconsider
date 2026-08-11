// Executable specification of the hard rules (see CLAUDE.md). Each test names
// the rule it guards. Run: npm test  (node:test, no extra deps).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decide } from './decision.ts';
import { addDaysIso, clocksFor, type AppealRecord } from './registry.ts';
import type { StandardAssessment, StandardStatus } from './types.ts';

// ---- fixtures -------------------------------------------------------------

let seq = 0;
function std(status: StandardStatus, id = `S${seq++}`, survivalDelta?: number): StandardAssessment {
  return {
    id,
    citation: '10 CCR §2644.9(d)(1)(B)2.',
    text: `standard ${id}`,
    status,
    evidence: 'test',
    sources: [],
    survivalDelta,
  };
}

function appeal(over: Partial<AppealRecord>): AppealRecord {
  return {
    id: 'x',
    address: '1 Test St',
    decision: 'appeal',
    packetPath: 'out/x.pdf',
    createdAt: '2026-08-10',
    status: 'draft',
    ...over,
  };
}

// ---- HARD RULE: the agent must be able to say "don't appeal" --------------

test('all-unknown property → document-first, NOT appeal (agent must decide)', () => {
  const d = decide([std('unknown'), std('unknown'), std('unknown')]);
  assert.equal(d.action, 'remediate-first');
  assert.ok(d.evidenceChecklist && d.evidenceChecklist.length === 3, 'emits an evidence checklist');
  assert.equal(d.gaps.length, 0, 'no fabricated gaps when nothing is documented');
});

test('two high-impact standards unmet → remediate-first (would concede the appeal)', () => {
  // B2a roof + B2c vents are both HIGH_IMPACT in decision.ts
  const d = decide([std('not-met', 'B2a'), std('not-met', 'B2c'), std('met', 'B2b')]);
  assert.equal(d.action, 'remediate-first');
});

test('mostly-met property → appeal', () => {
  const d = decide([std('met', 'B2b'), std('met', 'B2c'), std('met', 'B2d'), std('not-met', 'B1a')]);
  assert.equal(d.action, 'appeal');
});

test('an agent that always appeals would fail this suite', () => {
  const decisions = [
    decide([std('unknown'), std('unknown')]).action,
    decide([std('not-met', 'B2a'), std('not-met', 'B2c')]).action,
    decide([std('met', 'B2b'), std('met', 'B2c'), std('met', 'B2d')]).action,
  ];
  assert.ok(decisions.includes('remediate-first'), 'at least one scenario must decline to appeal');
});

// ---- HARD RULE: gaps ranked by survival delta, never negative -------------

test('remediation gaps are ranked by DINS survival delta, descending', () => {
  const d = decide([std('not-met', 'B1a', 5), std('not-met', 'B1b', 20), std('not-met', 'B1c', 12)]);
  const deltas = d.gaps.map((g) => g.survivalDelta);
  assert.deepEqual(deltas, [20, 12, 5]);
});

// ---- statutory clock math (10 CCR §2644.9 (i)/(j)) ------------------------

test('addDaysIso computes correct calendar deadlines', () => {
  assert.equal(addDaysIso('2026-08-10', 5), '2026-08-15'); // (j) 5-day forward
  assert.equal(addDaysIso('2026-08-10', 10), '2026-08-20'); // (i) 10-day ack
  assert.equal(addDaysIso('2026-08-10', 30), '2026-09-09'); // (i) 30-day decision
});

test('addDaysIso is DST-stable across the Nov 2026 fall-back', () => {
  // PST/PDT changeover is 2026-11-01; a naive UTC/local mix would drift a day.
  assert.equal(addDaysIso('2026-10-30', 5), '2026-11-04');
});

test('a forwarded-but-unacknowledged appeal shows the acknowledgment clock as pending, then overdue', () => {
  const a = appeal({ status: 'forwarded', filedAt: '2026-08-10', forwardedAt: '2026-08-10' });
  const onTime = clocksFor(a, '2026-08-15').find((c) => c.label.includes('acknowledgment'))!;
  assert.equal(onTime.state, 'pending');
  const late = clocksFor(a, '2026-08-25').find((c) => c.label.includes('acknowledgment'))!;
  assert.equal(late.state, 'overdue');
  assert.ok(late.daysRemaining! < 0, 'overdue clock reports negative days remaining');
});

test('an unfiled appeal has no running clocks (nothing started)', () => {
  const clocks = clocksFor(appeal({ status: 'draft' }), '2026-08-15');
  assert.ok(clocks.every((c) => c.state === 'not-started'));
});
