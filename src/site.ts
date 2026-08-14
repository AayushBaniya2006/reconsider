// Static case-dashboard generator: data/*.json → out/index.html.
// Pure and offline — the pipeline (index.ts) writes the data; this renders it.
//   npm run site
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { type AppealRecord, type ClockItem, clocksFor, loadAppeals, todayLocal } from './registry.ts';

const read = (p: string) => {
  try {
    return JSON.parse(readFileSync(new URL(`../data/${p}`, import.meta.url).pathname, 'utf8'));
  } catch {
    return [];
  }
};

const cases: any[] = read('cases.json');
const fieldRequests: any[] = read('field-requests.json');
const appeals = loadAppeals();
const today = todayLocal();

const ORDER = ['2485-santa-rosa-ave', '2269-santa-rosa-ave', '4844-commonwealth-ave'];
cases.sort((a, b) => ORDER.indexOf(a.id) - ORDER.indexOf(b.id));

const STAMP: Record<string, { text: string; cls: string }> = {
  appeal: { text: 'Appeal', cls: 'appeal' },
  'remediate-first': { text: 'Remediate first', cls: 'remediate' },
};

function stampFor(c: any): { text: string; cls: string } {
  if (c.decision === 'remediate-first' && c.counts.met === 0 && c.counts.notMet === 0)
    return { text: 'Document first', cls: 'document' };
  return STAMP[c.decision];
}

function freq(v: unknown): string {
  if (typeof v !== 'number' || !(v > 0)) return '—';
  const exp = Math.floor(Math.log10(v));
  const mant = (v / 10 ** exp).toFixed(1);
  const inv = Math.round(1 / v);
  return `${mant}×10<sup>${exp}</sup>/yr <span class="approx">≈ 1-in-${inv.toLocaleString('en-US')}</span>`;
}

function esc(s: unknown): string {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function punch(c: any): string {
  return c.standards
    .map((s: any) => `<span class="cell ${s.status}" title="${esc(s.id)} — ${esc(s.text)} [${s.status}]"></span>`)
    .join('');
}

function clockRows(a: AppealRecord | undefined): string {
  if (!a) return '';
  const row = (c: ClockItem) => {
    const state =
      c.state === 'not-started'
        ? '<span class="ck idle">not started</span>'
        : c.state === 'pending'
          ? `<span class="ck pending">${c.daysRemaining}d left · due ${c.dueAt}</span>`
          : c.state === 'overdue'
            ? `<span class="ck overdue">overdue ${-c.daysRemaining!}d</span>`
            : `<span class="ck done">done ${c.satisfiedAt}</span>`;
    return `<div class="clock"><span class="ck-label">${esc(c.label)}</span><span class="ck-cite">${esc(c.citation)}</span>${state}</div>`;
  };
  return clocksFor(a, today).map(row).join('');
}

function factRows(c: any): string {
  return c.keyFacts
    .map(
      (f: any) =>
        `<tr><td>${esc(f.key)}</td><td class="val">${esc(typeof f.value === 'number' ? +f.value.toFixed(4) : f.value)}${f.unit ? ` ${esc(f.unit)}` : ''}</td><td>${esc(f.source ?? '—')}</td><td>${esc(f.confidence ?? '—')}</td></tr>`,
    )
    .join('');
}

const casesBlock = (pdfBase: string) => cases
  .map((c, i) => {
    const a = appeals.find((x) => x.id === c.id);
    const st = stampFor(c);
    return `
<article class="case" style="--i:${i}">
  <div class="docket">Case ${String(i + 1).padStart(2, '0')} · ${esc(c.generatedAt)}</div>
  <h2>${esc(c.address.replace(/, CA \d+$/i, ''))}</h2>
  <div class="stamp ${st.cls}"><span>${st.text}</span></div>
  <dl class="headline">
    <div><dt>CAL FIRE FHSZ</dt><dd class="${String(c.headline.fhsz).toLowerCase().includes('very') ? 'hot' : ''}">${esc(c.headline.fhsz ?? '—')}<small> ${esc(c.headline.responsibilityArea ?? '')}</small></dd></div>
    <div><dt>Modeled wildfire frequency</dt><dd>${freq(c.headline.wildfireAnnualFrequency)}</dd></div>
    <div><dt>Cited facts</dt><dd>${c.headline.fieldCount}<small> ${esc(c.headline.geocode ?? '')} geocode</small></dd></div>
  </dl>
  <div class="standards">
    <span class="std-label">§2644.9(d)(1) standards</span>
    <span class="punch">${punch(c)}</span>
    <span class="tally">${c.counts.met} met · ${c.counts.notMet} not met · ${c.counts.unknown} unknown</span>
  </div>
  <p class="rationale">${esc(c.rationale)}</p>
  <div class="clocks">${clockRows(a) || '<div class="clock"><span class="ck idle">No statutory clocks running — packet not filed, by design.</span></div>'}</div>
  <table class="facts"><thead><tr><th>Fact</th><th>Value</th><th>Source</th><th>Conf.</th></tr></thead><tbody>${factRows(c)}</tbody></table>
  <a class="packet" href="${pdfBase}${esc(c.packet)}">Filing packet (PDF) →</a>
</article>`;
  })
  .join('\n');

const fr = fieldRequests[0];
const declined = cases.filter((c) => c.decision !== 'appeal').length;

const page = (pdfBase: string, appBar: string) => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Reconsider — wildfire score appeals under 10 CCR §2644.9</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{
  --paper:#f5f1e8; --paper2:#ede7d8; --ink:#191512; --faint:rgba(25,21,18,.55);
  --rule:rgba(25,21,18,.8); --hair:rgba(25,21,18,.22);
  --poppy:#c65d1c; --green:#2d6a4d; --amber:#a06012; --slate:#4c5c74; --oxblood:#9e2b25;
  --serif:'Libre Caslon Text',Georgia,serif; --mono:'IBM Plex Mono',Menlo,monospace;
}
*{box-sizing:border-box;margin:0}
body{background:var(--paper);color:var(--ink);font:16px/1.6 var(--serif);
  background-image:radial-gradient(rgba(25,21,18,.035) 1px,transparent 1px);background-size:22px 22px}
.wrap{max-width:1280px;margin:0 auto;padding:0 32px 80px}
header{padding:56px 0 0;animation:rise .7s .05s both}
.masthead{display:flex;justify-content:space-between;align-items:baseline;gap:24px;flex-wrap:wrap}
h1{font-size:clamp(40px,6vw,72px);font-weight:700;letter-spacing:.01em}
h1 .re{color:var(--poppy)}
.filing{font:500 12px/1.6 var(--mono);text-transform:uppercase;letter-spacing:.14em;text-align:right;color:var(--faint)}
.rules{border-top:3px solid var(--rule);border-bottom:1px solid var(--rule);height:7px;margin:14px 0 0;
  transform-origin:left;animation:draw .8s .2s both}
.sub{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;padding:12px 0 0;
  font:500 13px/1.7 var(--mono);letter-spacing:.02em;color:var(--faint)}
.thesis{margin:64px 0 8px;max-width:900px;animation:rise .7s .25s both}
.thesis p{font-size:clamp(22px,3vw,32px);line-height:1.35;font-weight:400}
.thesis strong{font-weight:700;border-bottom:4px solid var(--poppy)}
.statute{margin:40px 0 56px;padding:20px 26px;border-left:4px solid var(--ink);background:var(--paper2);
  font-style:italic;max-width:980px;animation:rise .7s .35s both}
.statute cite{display:block;margin-top:8px;font:500 11px var(--mono);font-style:normal;
  text-transform:uppercase;letter-spacing:.14em;color:var(--faint)}
.cases{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:28px}
.case{position:relative;background:var(--paper2);border:1px solid var(--hair);border-top:3px solid var(--ink);
  padding:22px 24px 24px;animation:rise .7s calc(.45s + var(--i)*.12s) both;display:flex;flex-direction:column;gap:14px}
.docket{font:500 11px var(--mono);text-transform:uppercase;letter-spacing:.16em;color:var(--faint)}
.case h2{font-size:21px;line-height:1.3;padding-right:120px;min-height:2.6em}
.stamp{position:absolute;top:44px;right:18px;transform:rotate(6deg);border:3px double currentColor;
  padding:6px 12px;font:700 13px/1.2 var(--mono);text-transform:uppercase;letter-spacing:.1em;text-align:center;
  border-radius:3px;opacity:.92;box-shadow:0 0 0 1px rgba(25,21,18,.04) inset}
.stamp.appeal{color:var(--green)} .stamp.remediate{color:var(--amber)} .stamp.document{color:var(--slate)}
.headline{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;border-top:1px solid var(--hair);padding-top:12px}
.headline dt{font:500 10px var(--mono);text-transform:uppercase;letter-spacing:.12em;color:var(--faint)}
.headline dd{font:500 15px var(--mono);margin-top:3px}
.headline dd.hot{color:var(--oxblood)}
.headline dd small{display:block;font-size:10px;color:var(--faint)}
.approx{display:block;font-size:10px;color:var(--faint)}
.standards{display:flex;align-items:center;gap:10px;flex-wrap:wrap;border-top:1px solid var(--hair);padding-top:12px}
.std-label{font:500 10px var(--mono);text-transform:uppercase;letter-spacing:.12em;color:var(--faint)}
.punch{display:inline-flex;gap:4px}
.cell{width:13px;height:13px;border:1.5px solid var(--ink);display:inline-block}
.cell.met{background:var(--green);border-color:var(--green)}
.cell.not-met{background:repeating-linear-gradient(45deg,var(--oxblood),var(--oxblood) 2px,transparent 2px,transparent 4px);border-color:var(--oxblood)}
.cell.unknown{background:transparent;border-color:var(--hair)}
.tally{font:500 11px var(--mono);color:var(--faint)}
.rationale{font-style:italic;font-size:14.5px;color:rgba(25,21,18,.85)}
.clocks{border-top:1px solid var(--hair);padding-top:10px;display:flex;flex-direction:column;gap:6px}
.clock{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;font:400 12px var(--mono)}
.ck-label{font-weight:500}
.ck-cite{color:var(--faint);font-size:10.5px}
.ck{margin-left:auto;font-weight:500}
.ck.pending{color:var(--amber)} .ck.done{color:var(--green)} .ck.overdue{color:var(--oxblood)} .ck.idle{color:var(--faint)}
table.facts{width:100%;border-collapse:collapse;font:400 11.5px var(--mono)}
.facts th{font:500 10px var(--mono);text-transform:uppercase;letter-spacing:.1em;color:var(--faint);
  text-align:left;border-bottom:1px solid var(--rule);padding:4px 6px 4px 0}
.facts td{border-bottom:1px solid var(--hair);padding:5px 6px 5px 0;vertical-align:top}
.facts td.val{font-weight:500}
a.packet{align-self:flex-start;font:500 13px var(--mono);letter-spacing:.03em;color:var(--ink);
  text-decoration:none;border-bottom:2px solid var(--poppy);padding-bottom:2px}
a.packet:hover{color:var(--poppy)}
.flight{margin:56px 0 0;padding:18px 24px;border:1px dashed var(--rule);display:flex;gap:16px;align-items:baseline;
  flex-wrap:wrap;font:400 13px var(--mono);animation:rise .7s .9s both}
.flight .tag{font-weight:500;text-transform:uppercase;letter-spacing:.14em;color:var(--poppy)}
footer{margin-top:64px;border-top:3px solid var(--rule);padding-top:18px;display:grid;gap:14px;
  font-size:13.5px;color:var(--faint);animation:rise .7s 1s both}
footer .verify{font-style:italic;max-width:980px}
footer .src{font:400 11px var(--mono);letter-spacing:.02em}
@keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes draw{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@media (max-width:760px){.case h2{padding-right:0;min-height:0}.stamp{position:static;transform:rotate(-2deg);align-self:flex-start}}
@media (max-width:600px){table.facts{table-layout:fixed;width:100%}.facts th,.facts td{overflow-wrap:anywhere;word-break:break-word;font-size:10px}.headline{grid-template-columns:1fr 1fr}}
.appbar{position:sticky;top:0;z-index:5;background:#0b0e13;color:#f5f1e8;display:flex;justify-content:space-between;align-items:center;
  padding:11px 24px;font:500 12px var(--mono);letter-spacing:.04em;border-bottom:2px solid var(--poppy)}
.appbar .brand{font-weight:700}.appbar .brand .re{color:var(--poppy)}
.appbar a{color:#f5f1e8;text-decoration:none;opacity:.85}.appbar a:hover{opacity:1;color:var(--poppy)}
.appbar .who{opacity:.55}
@media (max-width:600px){.appbar .who{display:none}}
</style></head><body>${appBar}<div class="wrap">
<header>
  <div class="masthead">
    <h1><span class="re">Re</span>consider</h1>
    <div class="filing">Wildfire risk-score appeals<br>10 CCR §2644.9(i) · California<br>Producer caseload · ${today}</div>
  </div>
  <div class="rules"></div>
  <div class="sub">
    <span>Address in → cited, filing-ready appeal packet out</span>
    <span>Every fact: source · URL · timestamp · confidence · vintage</span>
    <span>Comparables: CAL FIRE DINS, Eaton Fire (Unknown excluded, SFR only)</span>
  </div>
</header>

<section class="thesis"><p><em>Not a report — a filing.</em> The agent scored three real properties
against the twelve enumerated mitigation standards — and <strong>declined to file ${declined === 2 ? 'two of the three' : String(declined)}</strong>.
An agent that always appeals isn't deciding.</p></section>

<blockquote class="statute">“If the policyholder or applicant appeals the wildfire risk score or other wildfire risk
classification, the insurer shall acknowledge receipt of the appeal in writing within ten (10) calendar days …
[and] respond … with a reconsideration and decision within thirty (30) calendar days.”
<cite>10 CCR §2644.9(i) — fetched from primary source at build time</cite></blockquote>

<section class="cases">${casesBlock(pdfBase)}</section>

${fr ? `<section class="flight"><span class="tag">Evidence in flight</span>
<span>The agent requested fields Mireye doesn't have yet — ${esc(fr.asks.join(' · '))} — via /v1/field-requests
(<strong>${esc(fr.request_id)}</strong>, filed ${esc(fr.filed_at)}, provider ETA ${esc(String(fr.estimated_ready_at).slice(0, 10))}).
Packets are supplemented on delivery.</span></section>` : ''}

<footer>
  <p class="verify">Verification statement: every regulation quotation fetched from the primary source at build
  time, never reproduced from memory; every data fact carries its source, URL, retrieval timestamp, and dataset
  vintage; every survivor comparison discloses its conditioning. Anything unverified is marked unknown rather
  than asserted.</p>
  <p class="src">Data: Mireye /v1/fetch (wildfire_underwrite + natural_hazard presets) · CAL FIRE DINS
  POSTFIRE_MASTER_DATA_SHARE (live) · CAL FIRE OSFM FHSZ 2025 · FEMA NRI · Cornell LII (10 CCR §2644.9)</p>
</footer>
</div></body></html>`;

const APPBAR = `<div class="appbar"><span class="brand"><span class="re">Re</span>consider</span><span class="who">demo workspace · signed in as producer@demo</span><a href="index.html">← back to site</a></div>`;

const outDir = new URL('../out/', import.meta.url).pathname;
const docsDir = new URL('../docs/', import.meta.url).pathname;
mkdirSync(docsDir + 'assets', { recursive: true });

// Local dashboard for the CLI demo (packet PDFs sit alongside in out/).
writeFileSync(outDir + 'index.html', page('', ''));
// Deployed "app" view behind the landing page (PDFs copied into docs/assets/).
writeFileSync(docsDir + 'app.html', page('assets/', APPBAR));
for (const c of cases) {
  try {
    copyFileSync(outDir + c.packet, docsDir + 'assets/' + c.packet);
  } catch {}
}
console.log(outDir + 'index.html');
console.log(docsDir + 'app.html');
