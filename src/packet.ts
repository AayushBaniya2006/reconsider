// Packet renderer — markdown today, PDF later. Two paths: the §2644.9(i)
// score-appeal packet, or the remediate-first memo (ranked gaps, appeal after).
// All regulation quotes are verbatim (verified vs Cornell LII 2026-08-08).
import type { PacketInput, StandardAssessment } from './types.ts';

const QUOTE_I =
  'If the policyholder or applicant appeals the wildfire risk score or other wildfire risk classification, the insurer shall acknowledge receipt of the appeal in writing within ten (10) calendar days of receipt of the appeal. The insurer shall respond to the appeal in writing with a reconsideration and decision within thirty (30) calendar days after receiving the appeal.';
const QUOTE_J =
  'the policyholder or applicant may appeal orally or in writing to the agent or broker … who shall then forward that appeal to the insurer no later than five (5) calendar days after receiving the appeal.';
const QUOTE_KB =
  'The amount of premium reduction the policyholder or applicant would realize as a result of performing each such measure under the insurer’s rating plan that is in effect at the time.';

// Local calendar dates — statutory clocks are calendar days, and UTC slicing
// shifts evening runs to the next day.
function localDate(d: Date): string {
  return d.toLocaleDateString('en-CA');
}

function addDays(d: Date, days: number): string {
  const x = new Date(d);
  x.setDate(x.getDate() + days);
  return localDate(x);
}

function statusLabel(s: StandardAssessment['status']): string {
  return s === 'met' ? '**MET**' : s === 'not-met' ? 'NOT MET' : 'unknown';
}

export function renderPacket(p: PacketInput): string {
  const date = localDate(p.generatedAt);
  const L: string[] = [];
  const isAppeal = p.decision.action === 'appeal';

  L.push(
    isAppeal
      ? `# Appeal of Wildfire Risk Score — 10 CCR §2644.9(i)`
      : `# Wildfire Risk Score Review — Recommendation: Remediate Before Appealing`,
    '',
    `**Subject property:** ${p.address}`,
    `**Date:** ${date}`,
    `**Prepared for filing via producer** (agent/broker forwarding duty, 10 CCR §2644.9(j): "${QUOTE_J}")`,
    '',
  );

  // ---- Decision ----
  L.push('## Decision', '', `**${p.decision.action.toUpperCase()}** — ${p.decision.rationale}`, '');
  L.push(
    `Scorecard: ${p.decision.metCount} met · ${p.decision.notMetCount} not met · ${p.decision.unknownCount} unknown (of ${p.assessments.length} enumerated standards).`,
    '',
  );

  if (isAppeal) {
    L.push(
      '## Statutory basis and clock',
      '',
      `This is an appeal of the wildfire risk score / classification under 10 CCR §2644.9(i) — not a nonrenewal dispute. Verbatim:`,
      '',
      `> ${QUOTE_I}`,
      '',
      `| Statutory step | Deadline |`,
      `|---|---|`,
      `| Producer forwards appeal to insurer (§2644.9(j), 5 calendar days) | ${addDays(p.generatedAt, 5)} |`,
      `| Insurer written acknowledgment (§2644.9(i), 10 calendar days from receipt) | ${addDays(p.generatedAt, 10)}* |`,
      `| Insurer written reconsideration + decision (§2644.9(i), 30 calendar days) | ${addDays(p.generatedAt, 30)}* |`,
      '',
      `\\* Computed from packet date; statutory clocks run from the insurer's actual receipt.`,
      '',
    );
  }

  // ---- Parcel exposure facts (Mireye-cited) ----
  if (Object.keys(p.facts.fields).length) {
    L.push('## Subject parcel exposure — independently cited facts', '');
    const fhsz = p.facts.fields['fire_hazard_severity_zone_class'];
    const ra = p.facts.fields['fire_hazard_responsibility_area'];
    if (fhsz) {
      L.push(
        `CAL FIRE's official Fire Hazard Severity Zone map (${fhsz.dataset_vintage ?? 'current'}) classifies the subject parcel as **${fhsz.value}**${ra ? ` (responsibility area: ${ra.value})` : ''}. The written reconsideration required by §2644.9(i) should reconcile the insurer's wildfire risk score with the State's own hazard classification of this parcel.`,
        '',
      );
    }
    L.push('| Fact | Value | Source | Confidence | Vintage |', '|---|---|---|---|---|');
    for (const [key, f] of Object.entries(p.facts.fields)) {
      if (f.status && f.status !== 'ok') continue;
      const val = `${typeof f.value === 'number' ? +Number(f.value).toFixed(3) : f.value}${f.unit ? ` ${f.unit}` : ''}`;
      L.push(`| ${key} | ${val} | ${f.source ?? '—'} | ${f.confidence ?? '—'} | ${f.dataset_vintage ?? '—'} |`);
    }
    L.push('');
    if (p.facts.geocode?.accuracy_type) {
      L.push(
        `Location resolution: ${p.facts.geocode.accuracy_type}-accuracy geocode${p.facts.geocode.parcel_grade ? ' (parcel-grade)' : ''} of "${p.facts.geocode.normalized_address ?? p.address}" via ${p.facts.geocode.provider ?? 'geocoder'}.`,
        '',
      );
    }
  }

  // ---- The argument: enumerated standards ----
  L.push(
    '## Assessment against the enumerated mitigation standards (10 CCR §2644.9(d)(1))',
    '',
    'The argument of this packet is the enumerated Safer-from-Wildfires standards the regulation requires rating plans to reflect. Survivor comparables (below) corroborate; they are not the argument.',
    '',
    '| Std | Enumerated standard (verbatim) | Status | Evidence |',
    '|---|---|---|---|',
  );
  for (const a of p.assessments) {
    L.push(
      `| ${a.id} (${a.citation}) | ${a.text} | ${statusLabel(a.status)} | ${a.evidence.replace(/\|/g, '\\|')} |`,
    );
  }
  L.push('');

  // ---- Gaps / demands ----
  if (p.decision.gaps.length) {
    L.push(
      isAppeal
        ? '## Unmet standards → §2644.9(k)(B) demand'
        : '## Ranked remediation list (close these, then appeal)',
      '',
    );
    p.decision.gaps.forEach((g, i) => {
      L.push(`${i + 1}. **${g.standardId}** — ${g.text}`, `   - ${g.note}`);
    });
    L.push('');
  }
  L.push(
    '## Demand under §2644.9(k)(B)',
    '',
    `For each mitigation measure identified above, ${isAppeal ? 'we demand' : 'the eventual appeal will demand'} the disclosure the regulation requires, verbatim:`,
    '',
    `> ${QUOTE_KB}`,
    '',
  );

  // ---- DINS corroboration ----
  L.push('## Corroboration: CAL FIRE DINS survivor comparables (Eaton Fire)', '');
  if (p.subjectDins) {
    L.push(
      `Subject property's own CAL FIRE damage-inspection record: damage="${p.subjectDins.DAMAGE}", roof=${p.subjectDins.ROOFCONSTRUCTION}, vents=${p.subjectDins.VENTSCREEN}, eaves=${p.subjectDins.EAVES}, windows=${p.subjectDins.WINDOWPANE}, siding=${p.subjectDins.EXTERIORSIDING}, built ${p.subjectDins.YEARBUILT}, APN ${p.subjectDins.APN}.`,
      '',
    );
  }
  for (const x of p.crosstabs) {
    L.push(`**Survival by ${x.field}** (No Damage vs Destroyed (>50%)):`, '');
    L.push('| Category | No Damage | Destroyed | Survival |', '|---|---|---|---|');
    for (const r of x.rows) {
      L.push(`| ${r.category} | ${r.noDamage} | ${r.destroyed} | ${(r.survivalRate * 100).toFixed(0)}% |`);
    }
    L.push(
      `| _Unknown (excluded)_ | ${x.excludedUnknown.noDamage} | ${x.excludedUnknown.destroyed} | — |`,
      '',
    );
  }
  L.push(
    '**Methodology disclosure.** Comparisons are restricted to single-family residences (roughly 30% of Eaton DINS records are utility/miscellaneous structures — sheds, garages — which distort pooled survival rates) and exclude structures whose feature value is "Unknown". Unknowns concentrate among destroyed structures because inspectors cannot assess features that burned; including them would overstate every survival effect (survivorship artifact). Counts of excluded records are disclosed per table above.',
    '',
  );

  // ---- Provenance ----
  L.push('## Provenance appendix', '');
  L.push(
    `- Mireye parcel facts: mode=\`${p.facts.mode}\`${p.facts.mode === 'pending' ? ' — Mireye pull pending API authorization; parcel facts will be slotted into the assessment with per-field source, confidence, and vintage.' : ` (${Object.keys(p.facts.fields).length} fields via POST /v1/fetch, preset wildfire_underwrite, fetched ${p.facts.fetchedAt ?? 'n/a'})`}`,
  );
  for (const [key, f] of Object.entries(p.facts.fields)) {
    L.push(
      `- [parcel] ${key} = ${JSON.stringify(f.value)}${f.unit ? ` ${f.unit}` : ''} — ${f.source ?? 'Mireye'}${f.source_url ? ` <${f.source_url}>` : ''} (confidence: ${f.confidence ?? 'n/a'})${f.fetched_at ? ` fetched ${f.fetched_at}` : ''}${f.dataset_vintage ? ` vintage ${f.dataset_vintage}` : ''}${f.notes ? ` — note: ${f.notes}` : ''}`,
    );
  }
  for (const a of p.assessments) {
    for (const s of a.sources) {
      L.push(
        `- [${a.id}] ${s.fact} = ${JSON.stringify(s.value)} — ${s.source}${s.source_url ? ` <${s.source_url}>` : ''}${s.confidence != null ? ` (confidence: ${s.confidence})` : ''}${s.fetched_at ? ` fetched ${s.fetched_at}` : ''}${s.dataset_vintage ? ` vintage ${s.dataset_vintage}` : ''}`,
      );
    }
    if (a.dinsCorroboration) L.push(`- [${a.id}] Corroboration: ${a.dinsCorroboration}`);
  }
  L.push(
    `- Regulation text: 10 CCR §2644.9 via Cornell LII <https://www.law.cornell.edu/regulations/california/10-CCR-2644.9>, fetched ${date}.`,
    `- DINS: CAL FIRE POSTFIRE_MASTER_DATA_SHARE FeatureServer, queried live ${date}.`,
    '',
  );

  return L.join('\n');
}
