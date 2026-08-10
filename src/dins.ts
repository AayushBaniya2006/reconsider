// CAL FIRE DINS client — keyless ArcGIS FeatureServer, $0/query.
// Ported from spike/dins-queries.sh (verified 2026-08-07).
import type { Crosstab, DinsRecord } from './types.ts';

const BASE =
  'https://services1.arcgis.com/jUJYIo9tSA7EHvfZ/arcgis/rest/services/POSTFIRE_MASTER_DATA_SHARE/FeatureServer/0/query';

async function query(params: Record<string, string>): Promise<any> {
  const qs = new URLSearchParams({ f: 'json', ...params });
  const res = await fetch(`${BASE}?${qs}`);
  if (!res.ok) throw new Error(`DINS query failed: HTTP ${res.status}`);
  const json = await res.json();
  if (json.error) throw new Error(`DINS query error: ${JSON.stringify(json.error)}`);
  return json;
}

function isUnknown(v: unknown): boolean {
  return v == null || v === '' || v === 'Unknown';
}

// Survival crosstab for one hardening field, No Damage vs Destroyed only.
// 'Unknown'/null categories are EXCLUDED from rows but counted for disclosure
// (hard rule: Unknowns cluster on destroyed structures — survivorship artifact).
// Crosstabs are restricted to single-family residences: ~30% of Eaton DINS
// rows are 'Utility Misc Structure' (sheds/garages), which invert several
// survival effects when pooled with homes. Disclosed in the packet.
const SFR_FILTER = `STRUCTURETYPE LIKE 'Single Family Residence%'`;

const q = (s: string) => s.replace(/'/g, "''");

export async function damageCrosstab(incident: string, field: string): Promise<Crosstab> {
  const json = await query({
    where: `INCIDENTNAME='${q(incident)}' AND ${SFR_FILTER} AND DAMAGE IN ('No Damage','Destroyed (>50%)')`,
    groupByFieldsForStatistics: `${field},DAMAGE`,
    outStatistics: JSON.stringify([
      { statisticType: 'count', onStatisticField: 'OBJECTID', outStatisticFieldName: 'n' },
    ]),
  });
  const byCat = new Map<string, { noDamage: number; destroyed: number }>();
  const excludedUnknown = { noDamage: 0, destroyed: 0 };
  for (const f of json.features) {
    const a = f.attributes;
    const cat = a[field];
    if (a.DAMAGE !== 'No Damage' && a.DAMAGE !== 'Destroyed (>50%)') continue; // where-clause should prevent this
    const bucket = a.DAMAGE === 'No Damage' ? 'noDamage' : 'destroyed';
    if (isUnknown(cat)) {
      excludedUnknown[bucket as 'noDamage' | 'destroyed'] += a.n;
      continue;
    }
    const row = byCat.get(cat) ?? { noDamage: 0, destroyed: 0 };
    row[bucket as 'noDamage' | 'destroyed'] += a.n;
    byCat.set(cat, row);
  }
  const rows = [...byCat.entries()]
    .map(([category, { noDamage, destroyed }]) => ({
      category,
      noDamage,
      destroyed,
      survivalRate: noDamage + destroyed > 0 ? noDamage / (noDamage + destroyed) : 0,
    }))
    .sort((a, b) => b.survivalRate - a.survivalRate);
  return { field, incident, rows, excludedUnknown };
}

const RECORD_FIELDS =
  'SITEADDRESS,DAMAGE,STRUCTURETYPE,ROOFCONSTRUCTION,VENTSCREEN,EAVES,EXTERIORSIDING,WINDOWPANE,YEARBUILT,ASSESSEDIMPROVEDVALUE,LATITUDE,LONGITUDE,APN';

// Look up the subject property's own DINS inspection record(s) by address
// prefix (e.g. "2269 SANTA ROSA AVE"). Multiple rows per address happen
// (accessory structures) — caller picks the primary.
export async function findSubjectRecords(incident: string, address: string): Promise<DinsRecord[]> {
  const prefix = q(address.split(',')[0].trim().toUpperCase());
  const json = await query({
    where: `INCIDENTNAME='${q(incident)}' AND SITEADDRESS LIKE '${prefix}%'`,
    outFields: RECORD_FIELDS,
    outSR: '4326',
    resultRecordCount: '20',
  });
  return json.features.map((f: any) => f.attributes as DinsRecord);
}

// Primary record = the single-family residence with the most populated
// hardening fields (accessory structures share the SITEADDRESS).
export function pickPrimaryRecord(records: DinsRecord[]): DinsRecord | undefined {
  const score = (r: DinsRecord) =>
    (r.STRUCTURETYPE?.startsWith('Single Family Residence') ? 10 : 0) +
    [r.ROOFCONSTRUCTION, r.VENTSCREEN, r.EAVES, r.EXTERIORSIDING, r.WINDOWPANE].filter(
      (v) => !isUnknown(v) && v !== 'No Vents' && v !== 'No Windows',
    ).length;
  return [...records].sort((a, b) => score(b) - score(a))[0];
}

export async function streetRecords(incident: string, streetName: string): Promise<DinsRecord[]> {
  const json = await query({
    where: `INCIDENTNAME='${q(incident)}' AND STREETNAME='${q(streetName)}'`,
    outFields: RECORD_FIELDS,
    outSR: '4326',
    resultRecordCount: '400',
  });
  return json.features.map((f: any) => f.attributes as DinsRecord);
}
