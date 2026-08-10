// Shared shapes for the Reconsider pipeline. Skeleton phase — the Mireye
// field shape is provisional until the first live /v1/fetch response lands
// in spike/ (see mireye.ts normalizer).

// Pinned to the real /v1/fetch shape (spike/mireye-fetch-2485-santa-rosa-ave.json,
// 2026-08-10). confidence is a string enum ('high'|'medium'|...), not a number.
export interface MireyeField {
  value: unknown;
  unit?: string | null;
  source?: string;
  source_url?: string;
  confidence?: string;
  fetched_at?: string;
  dataset_vintage?: string | null;
  ttl_seconds?: number;
  notes?: string | null;
  status?: string;
}

export interface MireyeGeocode {
  accuracy?: number;
  accuracy_type?: string; // 'rooftop' on the demo pulls
  normalized_address?: string;
  provider?: string;
  parcel_grade?: boolean;
}

// mode: 'live' = REST call with MIREYE_API_TOKEN; 'fixture' = replayed raw
// response from spike/; 'pending' = no token and no fixture yet (OAuth gate).
export interface ParcelFacts {
  address: string;
  mode: 'live' | 'fixture' | 'pending';
  fields: Record<string, MireyeField>;
  fetchedAt?: string;
  geocode?: MireyeGeocode;
  partialFailures?: unknown[];
  raw?: unknown;
}

export interface DinsRecord {
  SITEADDRESS: string | null;
  DAMAGE: string | null;
  STRUCTURETYPE: string | null;
  ROOFCONSTRUCTION: string | null;
  VENTSCREEN: string | null;
  EAVES: string | null;
  EXTERIORSIDING: string | null;
  WINDOWPANE: string | null;
  YEARBUILT: number | null;
  ASSESSEDIMPROVEDVALUE: number | null;
  LATITUDE: number | null;
  LONGITUDE: number | null;
  APN: string | null;
}

export interface CrosstabRow {
  category: string;
  noDamage: number;
  destroyed: number;
  survivalRate: number; // noDamage / (noDamage + destroyed); Unknown excluded
}

// Hard rule: every crosstab excludes 'Unknown' (and null) categories and
// carries the excluded counts so the packet can disclose the conditioning —
// Unknowns cluster on destroyed structures (survivorship artifact).
export interface Crosstab {
  field: string;
  incident: string;
  rows: CrosstabRow[];
  excludedUnknown: { noDamage: number; destroyed: number };
}

export type StandardStatus = 'met' | 'not-met' | 'unknown';

export interface EvidenceSource {
  fact: string;
  value: unknown;
  source: string;
  source_url?: string;
  confidence?: number | string;
  fetched_at?: string;
  dataset_vintage?: string | null;
}

export interface StandardAssessment {
  id: string;
  citation: string; // e.g. '10 CCR §2644.9(d)(1)(B)2.'
  text: string; // verbatim regulation text (verified vs Cornell LII 2026-08-08)
  status: StandardStatus;
  evidence: string;
  sources: EvidenceSource[];
  dinsCorroboration?: string; // corroboration only — never the argument
  survivalDelta?: number; // pp survival improvement if remediated (DINS)
}

export interface RankedGap {
  standardId: string;
  text: string;
  survivalDelta?: number;
  note: string;
}

export interface Decision {
  action: 'appeal' | 'remediate-first';
  rationale: string;
  metCount: number;
  notMetCount: number;
  unknownCount: number;
  gaps: RankedGap[]; // documented NOT-MET standards only (drives the (k)(B) table)
  evidenceChecklist?: RankedGap[]; // all-unknown case: what to document before filing
}

export interface PendingFieldRequest {
  request_id: string;
  filed_at: string;
  asks: string[];
  estimated_ready_at?: string;
}

export interface PacketInput {
  address: string;
  facts: ParcelFacts;
  subjectDins?: DinsRecord;
  crosstabs: Crosstab[];
  assessments: StandardAssessment[];
  decision: Decision;
  generatedAt: Date;
  pendingFieldRequests?: PendingFieldRequest[];
}
