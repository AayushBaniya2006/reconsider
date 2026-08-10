// Appeal registry + statutory clocks. data/appeals.json is the durable state
// behind the producer (broker) view — every clock is a legal deadline:
//   §2644.9(j): producer forwards appeal to insurer ≤ 5 calendar days
//   §2644.9(i): insurer acknowledges in writing ≤ 10 calendar days of receipt
//   §2644.9(i): insurer reconsiders + decides in writing ≤ 30 calendar days
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

export type AppealStatus = 'draft' | 'filed' | 'forwarded' | 'acknowledged' | 'decided';

export interface AppealRecord {
  id: string;
  address: string;
  decision: 'appeal' | 'remediate-first';
  packetPath: string;
  createdAt: string; // YYYY-MM-DD (local)
  status: AppealStatus;
  filedAt?: string; // delivered to producer — starts the (j) 5-day forward clock
  forwardedAt?: string; // insurer receipt — starts the (i) 10- and 30-day clocks
  acknowledgedAt?: string;
  decidedAt?: string;
  outcome?: string;
}

export interface ClockItem {
  label: string;
  citation: string;
  dueAt?: string;
  satisfiedAt?: string;
  state: 'not-started' | 'pending' | 'met' | 'met-late' | 'overdue';
  daysRemaining?: number; // negative = days overdue
}

const DATA_DIR = new URL('../data', import.meta.url).pathname;
const DATA = `${DATA_DIR}/appeals.json`;

export function todayLocal(): string {
  return new Date().toLocaleDateString('en-CA');
}

export function addDaysIso(iso: string, days: number): string {
  const d = new Date(`${iso}T12:00:00`); // noon avoids DST edge shifts
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString('en-CA');
}

function diffDays(a: string, b: string): number {
  return Math.round((new Date(`${a}T12:00:00`).getTime() - new Date(`${b}T12:00:00`).getTime()) / 86_400_000);
}

export function loadAppeals(): AppealRecord[] {
  try {
    return JSON.parse(readFileSync(DATA, 'utf8'));
  } catch {
    return [];
  }
}

export function saveAppeals(records: AppealRecord[]): void {
  mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DATA, JSON.stringify(records, null, 2) + '\n');
}

// Re-rendering a packet must not reset lifecycle state (filed/forwarded/…).
export function upsertAppeal(rec: Omit<AppealRecord, 'status'>): AppealRecord {
  const all = loadAppeals();
  const existing = all.find((a) => a.id === rec.id);
  if (existing) {
    existing.address = rec.address;
    existing.decision = rec.decision;
    existing.packetPath = rec.packetPath;
    saveAppeals(all);
    return existing;
  }
  const fresh: AppealRecord = { ...rec, status: 'draft' };
  all.push(fresh);
  saveAppeals(all);
  return fresh;
}

function clock(
  label: string,
  citation: string,
  startAt: string | undefined,
  windowDays: number,
  satisfiedAt: string | undefined,
  today: string,
): ClockItem {
  if (!startAt) return { label, citation, satisfiedAt, state: 'not-started' };
  const dueAt = addDaysIso(startAt, windowDays);
  if (satisfiedAt) {
    return { label, citation, dueAt, satisfiedAt, state: diffDays(dueAt, satisfiedAt) >= 0 ? 'met' : 'met-late' };
  }
  const daysRemaining = diffDays(dueAt, today);
  return { label, citation, dueAt, state: daysRemaining >= 0 ? 'pending' : 'overdue', daysRemaining };
}

export function clocksFor(a: AppealRecord, today = todayLocal()): ClockItem[] {
  return [
    clock('Producer forwards to insurer', '§2644.9(j), 5 calendar days', a.filedAt, 5, a.forwardedAt, today),
    clock('Insurer written acknowledgment', '§2644.9(i), 10 calendar days', a.forwardedAt, 10, a.acknowledgedAt, today),
    clock('Insurer written reconsideration + decision', '§2644.9(i), 30 calendar days', a.forwardedAt, 30, a.decidedAt, today),
  ];
}
