// Producer (broker) view + lifecycle CLI for tracked appeals.
//   npm run appeals                       list all appeals with statutory clocks
//   npm run appeals -- file <id> [date]     packet delivered to producer
//   npm run appeals -- forward <id> [date]  producer forwarded; insurer receipt
//   npm run appeals -- ack <id> [date]      insurer written acknowledgment
//   npm run appeals -- decide <id> [date] [outcome…]
//   npm run appeals -- html                 write out/appeals.html dashboard
import { mkdirSync, writeFileSync } from 'node:fs';
import {
  type AppealRecord,
  type ClockItem,
  clocksFor,
  loadAppeals,
  saveAppeals,
  todayLocal,
} from './registry.ts';

const [cmd, ref, dateArg, ...rest] = process.argv.slice(2);

function findAppeal(all: AppealRecord[], needle: string): AppealRecord {
  const hit = all.find((a) => a.id === needle || a.id.startsWith(needle) || a.address.toLowerCase().includes(needle.toLowerCase()));
  if (!hit) {
    console.error(`No appeal matches "${needle}". Known: ${all.map((a) => a.id).join(', ') || '(none)'}`);
    process.exit(1);
  }
  return hit;
}

function mark(state: ClockItem['state']): string {
  return { 'not-started': '·', pending: '⏳', met: '✅', 'met-late': '⚠️ late', overdue: '🔴 OVERDUE' }[state];
}

function printList(all: AppealRecord[]): void {
  if (!all.length) {
    console.log('No appeals tracked yet. Generate a packet first: npm run packet -- "<address>"');
    return;
  }
  const today = todayLocal();
  console.log(`Appeals as of ${today}\n`);
  for (const a of all) {
    console.log(`■ ${a.id}  [${a.decision.toUpperCase()}]  status: ${a.status}`);
    console.log(`  ${a.address}`);
    console.log(`  packet: ${a.packetPath}`);
    for (const c of clocksFor(a, today)) {
      const due = c.dueAt ? `due ${c.dueAt}` : 'clock not started';
      const extra =
        c.state === 'pending'
          ? ` (${c.daysRemaining} days left)`
          : c.state === 'overdue'
            ? ` (${-c.daysRemaining!} days past — statutory deadline missed)`
            : c.satisfiedAt
              ? ` (done ${c.satisfiedAt})`
              : '';
      console.log(`    ${mark(c.state)}  ${c.label} — ${c.citation} — ${due}${extra}`);
    }
    if (a.outcome) console.log(`  outcome: ${a.outcome}`);
    console.log('');
  }
}

function transition(
  all: AppealRecord[],
  a: AppealRecord,
  field: 'filedAt' | 'forwardedAt' | 'acknowledgedAt' | 'decidedAt',
  status: AppealRecord['status'],
  date: string,
  outcome?: string,
): void {
  a[field] = date;
  a.status = status;
  if (outcome) a.outcome = outcome;
  saveAppeals(all);
  console.log(`${a.id}: ${status} as of ${date}`);
  printList([a]);
}

function chip(c: ClockItem): string {
  const color = { 'not-started': '#999', pending: '#b58900', met: '#2a7', 'met-late': '#c60', overdue: '#c00' }[c.state];
  const text =
    c.state === 'not-started'
      ? 'not started'
      : c.state === 'pending'
        ? `due ${c.dueAt} · ${c.daysRemaining}d left`
        : c.state === 'overdue'
          ? `OVERDUE ${-c.daysRemaining!}d (due ${c.dueAt})`
          : `done ${c.satisfiedAt}`;
  return `<span class="chip" style="background:${color}">${text}</span>`;
}

function writeHtml(all: AppealRecord[]): void {
  const today = todayLocal();
  const rows = all
    .map((a) => {
      const [fwd, ack, dec] = clocksFor(a, today);
      return `<tr><td><strong>${a.address}</strong><br><small>${a.id} · packet ${a.packetPath.split('/').pop()}</small></td>
<td class="d-${a.decision}">${a.decision.toUpperCase()}</td><td>${a.status}</td>
<td>${chip(fwd)}</td><td>${chip(ack)}</td><td>${chip(dec)}</td></tr>`;
    })
    .join('\n');
  const html = `<!doctype html><meta charset="utf-8"><title>Reconsider — appeals</title>
<style>
body{font:14px/1.5 -apple-system,Helvetica,sans-serif;margin:2rem;color:#222}
h1{font-size:1.3rem} table{border-collapse:collapse;width:100%}
td,th{border:1px solid #ddd;padding:.5rem .6rem;text-align:left;vertical-align:top}
th{background:#f6f6f6;font-size:.8rem;text-transform:uppercase;letter-spacing:.04em}
.chip{color:#fff;border-radius:3px;padding:.15rem .45rem;font-size:.78rem;white-space:nowrap}
.d-appeal{color:#2a7;font-weight:700}.d-remediate-first{color:#c60;font-weight:700}
</style>
<h1>Reconsider — wildfire score appeals (producer view, ${today})</h1>
<p>Clocks: forward §2644.9(j) 5 days · acknowledge §2644.9(i) 10 days · reconsider + decide §2644.9(i) 30 days.</p>
<table><tr><th>Property</th><th>Decision</th><th>Status</th><th>Forward (j)</th><th>Acknowledge (i)</th><th>Decision (i)</th></tr>
${rows}</table>`;
  const out = new URL('../out/appeals.html', import.meta.url).pathname;
  mkdirSync(new URL('../out', import.meta.url).pathname, { recursive: true });
  writeFileSync(out, html);
  console.log(out);
}

const all = loadAppeals();
const date = dateArg ?? todayLocal();
switch (cmd) {
  case undefined:
  case 'list':
    printList(all);
    break;
  case 'html':
    writeHtml(all);
    break;
  case 'file':
    transition(all, findAppeal(all, ref), 'filedAt', 'filed', date);
    break;
  case 'forward':
    transition(all, findAppeal(all, ref), 'forwardedAt', 'forwarded', date);
    break;
  case 'ack':
    transition(all, findAppeal(all, ref), 'acknowledgedAt', 'acknowledged', date);
    break;
  case 'decide':
    transition(all, findAppeal(all, ref), 'decidedAt', 'decided', date, rest.join(' ') || undefined);
    break;
  default:
    console.error(`Unknown command: ${cmd}. Use list|file|forward|ack|decide|html.`);
    process.exit(1);
}
