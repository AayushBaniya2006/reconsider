// Safer-from-Wildfires scoring against the ENUMERATED standards of
// 10 CCR §2644.9(d)(1) — this is the legal argument; DINS is corroboration.
// Standard texts are VERBATIM from the regulation (verified against Cornell
// LII, fetched 2026-08-08). Do not paraphrase them in the packet.
import type {
  Crosstab,
  DinsRecord,
  EvidenceSource,
  MireyeField,
  ParcelFacts,
  StandardAssessment,
  StandardStatus,
} from './types.ts';

interface StandardDef {
  id: string;
  citation: string;
  text: string;
  // fuzzy match against Mireye field keys once real shapes land
  mireyeKeyPattern?: RegExp;
}

export const STANDARDS: StandardDef[] = [
  // (d)(1)(A) — community-level
  {
    id: 'A1',
    citation: '10 CCR §2644.9(d)(1)(A)',
    text: 'Fire Risk Reduction Community listed by the Board of Forestry pursuant to Public Resources Code section 4290.1',
    mireyeKeyPattern: /fire_risk_reduction|risk_reduction_community/i,
  },
  {
    id: 'A2',
    citation: '10 CCR §2644.9(d)(1)(A)',
    text: 'Firewise USA Site in Good Standing',
    mireyeKeyPattern: /firewise/i,
  },
  // (d)(1)(B)1. — immediate surroundings
  {
    id: 'B1a',
    citation: '10 CCR §2644.9(d)(1)(B)1.',
    text: 'Clearing of vegetation and debris from under decks',
    mireyeKeyPattern: /deck/i,
  },
  {
    id: 'B1b',
    citation: '10 CCR §2644.9(d)(1)(B)1.',
    text: 'Clearing of vegetation, debris, mulch, stored combustible materials, and any and all movable combustible objects, from the area within five (5) feet',
    mireyeKeyPattern: /zone_?0|five_?f(oo|ee)t|ember_?zone/i,
  },
  {
    id: 'B1c',
    citation: '10 CCR §2644.9(d)(1)(B)1.',
    text: 'Incorporation of only noncombustible materials into that portion of any improvements situated within five (5) feet',
    mireyeKeyPattern: /noncombustible.*(zone|5)|hardscape/i,
  },
  {
    id: 'B1d',
    citation: '10 CCR §2644.9(d)(1)(B)1.',
    text: 'Removal or absence of combustible structures from the area within thirty (30) feet',
    mireyeKeyPattern: /outbuilding|combustible_structure|thirty/i,
  },
  {
    id: 'B1e',
    citation: '10 CCR §2644.9(d)(1)(B)1.',
    text: 'Whether the property complies with Section 4291 of the Public Resources Code, and any applicable local ordinances',
    mireyeKeyPattern: /defensible_?space|4291/i,
  },
  // (d)(1)(B)2. — building hardening
  {
    id: 'B2a',
    citation: '10 CCR §2644.9(d)(1)(B)2.',
    text: 'Class-A Fire Rated Roof',
    mireyeKeyPattern: /roof.*(class|rating|material|type)|class.*roof/i,
  },
  {
    id: 'B2b',
    citation: '10 CCR §2644.9(d)(1)(B)2.',
    text: 'Enclosed Eaves',
    mireyeKeyPattern: /eave/i,
  },
  {
    id: 'B2c',
    citation: '10 CCR §2644.9(d)(1)(B)2.',
    text: 'Fire-Resistant Vents',
    mireyeKeyPattern: /vent/i,
  },
  {
    id: 'B2d',
    citation: '10 CCR §2644.9(d)(1)(B)2.',
    text: 'Multipane windows, including dual pane windows, or functional shutters',
    mireyeKeyPattern: /window|glaz/i,
  },
  {
    id: 'B2e',
    citation: '10 CCR §2644.9(d)(1)(B)2.',
    text: 'At least six (6) inches of noncombustible vertical clearance at the bottom',
    mireyeKeyPattern: /vertical_clearance|siding|exterior_wall/i,
  },
];

const DINS_SOURCE =
  'CAL FIRE DINS damage-inspection record for the subject property (POSTFIRE_MASTER_DATA_SHARE, Eaton Fire)';
const DINS_URL =
  'https://services1.arcgis.com/jUJYIo9tSA7EHvfZ/arcgis/rest/services/POSTFIRE_MASTER_DATA_SHARE/FeatureServer/0';

function dinsSource(fact: string, value: unknown): EvidenceSource {
  return { fact, value, source: DINS_SOURCE, source_url: DINS_URL };
}

function rate(xtab: Crosstab | undefined, category: string): number | undefined {
  const row = xtab?.rows.find((r) => r.category === category);
  return row ? row.survivalRate : undefined;
}

function deltaPp(better?: number, current?: number): number | undefined {
  if (better == null || current == null) return undefined;
  return Math.round((better - current) * 100);
}

// Assess each enumerated standard from (1) Mireye parcel facts when present
// (primary source once live) and (2) the subject's own DINS inspection record
// (CAL FIRE field observation — subject evidence, clearly labeled; distinct
// from DINS *comparables*, which are corroboration only).
export function assessStandards(
  facts: ParcelFacts,
  subjectDins: DinsRecord | undefined,
  crosstabs: Map<string, Crosstab>,
): StandardAssessment[] {
  return STANDARDS.map((std) => {
    let status: StandardStatus = 'unknown';
    let evidence = 'No evidence available yet.';
    const sources: EvidenceSource[] = [];
    let dinsCorroboration: string | undefined;
    let survivalDelta: number | undefined;

    // Mireye field (best-effort key match until real shape is pinned)
    const mireyeHit = std.mireyeKeyPattern
      ? Object.entries(facts.fields).find(([k]) => std.mireyeKeyPattern!.test(k))
      : undefined;
    if (mireyeHit) {
      const [key, f] = mireyeHit as [string, MireyeField];
      sources.push({
        fact: key,
        value: f.value,
        source: f.source ?? 'Mireye',
        source_url: f.source_url,
        confidence: f.confidence,
        fetched_at: f.fetched_at,
        dataset_vintage: f.dataset_vintage,
      });
      evidence = `Mireye ${key} = ${JSON.stringify(f.value)} (mapping to standard pending shape review — status not auto-derived yet).`;
    }

    // Subject's own DINS inspection record
    if (subjectDins) {
      switch (std.id) {
        case 'B2b': {
          const v = subjectDins.EAVES;
          if (v === 'Enclosed') status = 'met';
          else if (v === 'Unenclosed') status = 'not-met';
          if (v && v !== 'Unknown') {
            evidence = `CAL FIRE inspector recorded eaves: ${v}.`;
            sources.push(dinsSource('EAVES', v));
            const x = crosstabs.get('EAVES');
            dinsCorroboration = corr(x, 'Enclosed');
            if (status === 'not-met') survivalDelta = deltaPp(rate(x, 'Enclosed'), rate(x, v));
          }
          break;
        }
        case 'B2c': {
          const v = subjectDins.VENTSCREEN;
          if (v === 'Mesh Screen <= 1/8"') status = 'met';
          else if (v === 'Mesh Screen > 1/8"' || v === 'Unscreened') status = 'not-met';
          // 'No Vents' left unknown: absence of vents is not a screened vent
          if (v && v !== 'Unknown') {
            evidence = `CAL FIRE inspector recorded vent screening: ${v}.`;
            sources.push(dinsSource('VENTSCREEN', v));
            const x = crosstabs.get('VENTSCREEN');
            dinsCorroboration = corr(x, 'Mesh Screen <= 1/8"');
            if (status === 'not-met')
              survivalDelta = deltaPp(rate(x, 'Mesh Screen <= 1/8"'), rate(x, v));
          }
          break;
        }
        case 'B2d': {
          const v = subjectDins.WINDOWPANE;
          if (v === 'Multi Pane') status = 'met';
          else if (v === 'Single Pane') status = 'not-met';
          if (v && v !== 'Unknown' && v !== 'No Windows') {
            evidence = `CAL FIRE inspector recorded window panes: ${v}.`;
            sources.push(dinsSource('WINDOWPANE', v));
            const x = crosstabs.get('WINDOWPANE');
            dinsCorroboration = corr(x, 'Multi Pane');
            if (status === 'not-met') survivalDelta = deltaPp(rate(x, 'Multi Pane'), rate(x, v));
          }
          break;
        }
        case 'B2a': {
          // DINS records roof MATERIAL, not fire rating — material alone
          // cannot establish 'Class-A Fire Rated Roof'. Corroboration only.
          const v = subjectDins.ROOFCONSTRUCTION;
          if (v && v !== 'Unknown') {
            evidence = `CAL FIRE inspector recorded roof material: ${v}. Material does not establish Class-A rating — status unknown pending documentation.`;
            sources.push(dinsSource('ROOFCONSTRUCTION', v));
            dinsCorroboration = corr(crosstabs.get('ROOFCONSTRUCTION'), undefined);
          }
          break;
        }
      }
    }

    return { id: std.id, citation: std.citation, text: std.text, status, evidence, sources, dinsCorroboration, survivalDelta };
  });
}

// One-line corroboration sentence from a crosstab (Unknown already excluded).
function corr(xtab: Crosstab | undefined, highlight: string | undefined): string | undefined {
  if (!xtab) return undefined;
  const parts = xtab.rows
    .filter((r) => r.noDamage + r.destroyed >= 20)
    .map((r) => `${r.category} ${(r.survivalRate * 100).toFixed(0)}%`);
  const hl =
    highlight && xtab.rows.some((r) => r.category === highlight)
      ? ` — standard-conforming category: ${highlight}`
      : '';
  return `Eaton Fire survival by ${xtab.field} (No Damage vs Destroyed, 'Unknown' excluded): ${parts.join(', ')}${hl}.`;
}
