// End-to-end browser test: loads every rendered artifact a judge will see and
// asserts the load-bearing content actually rendered. Run after regenerating
// outputs:  npm run e2e   (uses installed Chrome via puppeteer-core; no new deps)
//
// This is the "what the judge sees" gate — distinct from `npm test` (unit spec
// of the decision/clock logic). Together they cover logic + presentation.
import { existsSync } from 'node:fs';
import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const root = new URL('..', import.meta.url).pathname.replace(/\/$/, '');
const url = (rel) => `file://${root}/${rel}`;

let failures = 0;
const results = [];

function check(name, text, needles, absent = []) {
  // case-insensitive: rendered innerText applies CSS text-transform:uppercase
  const hay = text.toLowerCase();
  const has = (n) => hay.includes(n.toLowerCase());
  const missing = needles.filter((n) => !has(n));
  const present = absent.filter((n) => has(n));
  const ok = missing.length === 0 && present.length === 0;
  if (!ok) {
    failures++;
    results.push(`  ✗ ${name}`);
    if (missing.length) results.push(`      missing: ${missing.map((m) => JSON.stringify(m)).join(', ')}`);
    if (present.length) results.push(`      should be absent: ${present.map((m) => JSON.stringify(m)).join(', ')}`);
  } else {
    results.push(`  ✓ ${name}`);
  }
}

if (!existsSync(CHROME)) {
  console.error(`Chrome not found at ${CHROME}`);
  process.exit(1);
}

const browser = await puppeteer.launch({ executablePath: CHROME });
try {
  const page = await browser.newPage();
  const load = async (rel) => {
    const res = await page.goto(url(rel), { waitUntil: 'load' });
    if (!res || !res.ok()) throw new Error(`failed to load ${rel}`);
    return page.evaluate(() => document.body.innerText);
  };

  // 1. One-pager (the GitHub Pages source) — the judge's first read
  check('one-pager: thesis + judging answers + buyer', await load('docs/index.html'), [
    'Not a report',
    'agent, not a website with a map',
    'What did you combine',
    'Is it a real problem',
    'Who writes the cheque',
    'personal-lines insurance producer',
    'github.com/AayushBaniya2006/reconsider',
  ]);

  // 2. Case dashboard — three decisions, three stamps
  check('dashboard: three real decisions + statute + honesty line', await load('out/index.html'), [
    'SANTA ROSA',
    'Commonwealth',
    'Appeal',
    'Remediate first',
    'Document first',
    '§2644.9(i)',
    'declined to file',
  ]);

  // 3. APPEAL packet — statutory clock, (k)(B) demand, methodology disclosure, cited FHSZ
  check('packet 2485 (APPEAL): clock + (k)(B) + disclosure + Non-Wildland', await load('out/packet-2485-santa-rosa-ave.html'), [
    'Appeal of Wildfire Risk Score',
    '§2644.9(i)',
    'acknowledgment',
    '(k)(B)',
    'Unknown',
    'single-family',
    'Non-Wildland',
    'wildfire_annual_frequency',
  ]);

  // 4. DOCUMENT-FIRST packet — refuses to file, no appeal framing, Very High hazard
  check(
    'packet 4844 (DOCUMENT-FIRST): checklist, Very High, not framed as an appeal',
    await load('out/packet-4844-commonwealth-ave.html'),
    ['Remediate Before Appealing', 'Evidence checklist', 'Very High', 'not for filing'],
    ['Appeal of Wildfire Risk Score'], // must NOT be an appeal packet
  );

  // 5. Producer view — statutory clocks running
  check('producer view: clocks + citations', await load('out/appeals.html'), [
    'appeals',
    'Forward',
    'Acknowledge',
    '§2644.9',
  ]);

  // 6. Live GitHub Pages one-pager resolves and is the right page
  try {
    const res = await page.goto('https://aayushbaniya2006.github.io/reconsider/', { waitUntil: 'load', timeout: 15000 });
    const title = await page.title();
    check('LIVE Pages one-pager (HTTP ' + (res?.status() ?? '?') + ')', title, ['Reconsider']);
  } catch (e) {
    results.push(`  ! live Pages check skipped (network): ${e.message}`);
  }
} finally {
  await browser.close();
}

console.log('\nReconsider — end-to-end artifact test\n');
console.log(results.join('\n'));
console.log(failures === 0 ? '\n\x1b[1;32mE2E PASS\x1b[0m — every judge-facing artifact renders correctly.\n' : `\n\x1b[1;31mE2E FAIL\x1b[0m — ${failures} artifact(s) wrong.\n`);
process.exit(failures === 0 ? 0 : 1);
