// Mireye client. Hard rule: POST /v1/fetch with presets ONLY (1 credit/field).
// Never /v1/lookup (300 credits/call).
//
// Modes:
//   live    — MIREYE_API_TOKEN set: real /v1/fetch, raw response archived to spike/
//   fixture — no token: replay newest spike/mireye-fetch-*.json (from MCP pull)
//   pending — neither: pipeline still runs, Mireye stage marked pending (OAuth gate)
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { ParcelFacts } from './types.ts';

const API_BASE = 'https://api.mireye.com';
const SPIKE_DIR = new URL('../spike', import.meta.url).pathname;

export async function fetchParcelFacts(address: string): Promise<ParcelFacts> {
  // MIREYE_OFFLINE=1 forces fixture replay even with a token — dev re-renders
  // shouldn't spend credits (1/field/pull).
  const token = process.env.MIREYE_OFFLINE === '1' ? undefined : process.env.MIREYE_API_TOKEN;
  if (token) {
    const res = await fetch(`${API_BASE}/v1/fetch`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, preset: 'wildfire_underwrite' }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new Error(`Mireye /v1/fetch failed: HTTP ${res.status} ${body}`);
    }
    const raw = await res.json();
    const slug = address.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-');
    writeFileSync(join(SPIKE_DIR, `mireye-fetch-${slug}.json`), JSON.stringify(raw, null, 2));
    return parcelFactsFromRaw(address, 'live', raw);
  }

  const fixture = fixtureFor(address);
  if (fixture) {
    const raw = JSON.parse(readFileSync(fixture, 'utf8'));
    return parcelFactsFromRaw(address, 'fixture', raw);
  }

  return { address, mode: 'pending', fields: {} };
}

// Prefer the fixture archived for THIS address; fall back to the newest one.
function fixtureFor(address: string): string | null {
  const slug = address.split(',')[0].trim().toLowerCase().replace(/\s+/g, '-');
  const exact = join(SPIKE_DIR, `mireye-fetch-${slug}.json`);
  try {
    readFileSync(exact);
    return exact;
  } catch {
    return newestFixture();
  }
}

function parcelFactsFromRaw(address: string, mode: 'live' | 'fixture', raw: any): ParcelFacts {
  if (!raw?.fields || typeof raw.fields !== 'object')
    throw new Error('Mireye response missing .fields — shape changed from the pinned 2026-08-10 format');
  return {
    address,
    mode,
    fields: raw.fields,
    fetchedAt: raw.fetched_at,
    geocode: raw.geocode,
    partialFailures: raw.partial_failures ?? [],
    raw,
  };
}

function newestFixture(): string | null {
  try {
    const names = readdirSync(SPIKE_DIR)
      .filter((n) => n.startsWith('mireye-fetch-') && n.endsWith('.json'))
      .sort();
    return names.length ? join(SPIKE_DIR, names[names.length - 1]) : null;
  } catch {
    return null;
  }
}

