// Reconsider pipeline: address → Mireye facts → DINS comparables →
// enumerated-standards scoring → decision → packet markdown.
// Usage: npm run packet -- "2269 SANTA ROSA AVE, ALTADENA, CA 91001"
import { mkdirSync, writeFileSync } from 'node:fs';
import { fetchParcelFacts } from './mireye.ts';
import { damageCrosstab, findSubjectRecords, pickPrimaryRecord } from './dins.ts';
import { assessStandards } from './scoring.ts';
import { decide } from './decision.ts';
import { renderPacket } from './packet.ts';
import type { Crosstab } from './types.ts';

const address = process.argv[2] ?? '2269 SANTA ROSA AVE, ALTADENA, CA 91001';
const INCIDENT = 'Eaton';
const XTAB_FIELDS = ['ROOFCONSTRUCTION', 'VENTSCREEN', 'EAVES', 'WINDOWPANE', 'EXTERIORSIDING'];

console.error(`[1/5] Mireye facts for: ${address}`);
const facts = await fetchParcelFacts(address);
console.error(`      mode=${facts.mode}, fields=${Object.keys(facts.fields).length}`);

console.error(`[2/5] DINS: subject record + ${XTAB_FIELDS.length} survival crosstabs (${INCIDENT})`);
const [subjectRecords, ...xtabList] = await Promise.all([
  findSubjectRecords(INCIDENT, address),
  ...XTAB_FIELDS.map((f) => damageCrosstab(INCIDENT, f)),
]);
const subjectDins = pickPrimaryRecord(subjectRecords);
const crosstabs = new Map<string, Crosstab>(xtabList.map((x) => [x.field, x]));
console.error(
  `      subject DINS records=${subjectRecords.length}${subjectDins ? ` (primary: ${subjectDins.SITEADDRESS}, ${subjectDins.DAMAGE})` : ' (none — outside DINS footprint)'}`,
);

console.error('[3/5] Scoring against 10 CCR §2644.9(d)(1) enumerated standards');
const assessments = assessStandards(facts, subjectDins, crosstabs);

console.error('[4/5] Decision');
const decision = decide(assessments);
console.error(`      ${decision.action.toUpperCase()} — ${decision.rationale}`);

console.error('[5/5] Rendering packet');
const markdown = renderPacket({
  address,
  facts,
  subjectDins,
  crosstabs: [...crosstabs.values()],
  assessments,
  decision,
  generatedAt: new Date(),
});
const slug = address.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-');
mkdirSync(new URL('../out', import.meta.url).pathname, { recursive: true });
const outPath = new URL(`../out/packet-${slug}.md`, import.meta.url).pathname;
writeFileSync(outPath, markdown);
console.error(`      wrote ${outPath}`);
console.log(outPath);
