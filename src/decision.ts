// The decide stage. Hard rule: this must be able to say "don't appeal —
// remediate first" with a ranked gap list. An agent that always appeals
// isn't deciding. Thresholds are skeleton-grade; tune on real properties Aug 13.
import type { Decision, RankedGap, StandardAssessment } from './types.ts';

// Standards whose absence most undermines a score appeal (roof, vents, zone 0).
const HIGH_IMPACT = new Set(['B2a', 'B2c', 'B1b', 'B1c']);

export function decide(assessments: StandardAssessment[]): Decision {
  const met = assessments.filter((a) => a.status === 'met');
  const notMet = assessments.filter((a) => a.status === 'not-met');
  const unknown = assessments.filter((a) => a.status === 'unknown');

  const gaps: RankedGap[] = notMet
    .map((a) => ({
      standardId: a.id,
      text: a.text,
      survivalDelta: a.survivalDelta,
      note:
        a.survivalDelta != null
          ? `Eaton Fire DINS: remediating raises comparable survival by ~${a.survivalDelta} pp ('Unknown' excluded).`
          : 'No DINS survival delta computable for this standard.',
    }))
    .sort((a, b) => (b.survivalDelta ?? -1) - (a.survivalDelta ?? -1));

  const highImpactGaps = notMet.filter((a) => HIGH_IMPACT.has(a.id));

  let action: Decision['action'];
  let rationale: string;
  if (highImpactGaps.length >= 2) {
    action = 'remediate-first';
    rationale = `${highImpactGaps.length} high-impact enumerated standards unmet (${highImpactGaps.map((a) => a.id).join(', ')}) — an appeal argued on the enumerated standards would concede more than it claims. Remediate, then appeal with §2644.9(k) reduction demands.`;
  } else if (met.length >= 3 && notMet.length <= 2) {
    action = 'appeal';
    rationale = `${met.length} enumerated standards documented as met with at most ${notMet.length} gaps — the score appeal argues from the met standards; gaps become §2644.9(k)(B) dollar-reduction demands.`;
  } else if (met.length > notMet.length) {
    action = 'appeal';
    rationale = `Met standards (${met.length}) outweigh documented gaps (${notMet.length}); remaining unknowns (${unknown.length}) are evidence requests, not concessions.`;
  } else {
    action = 'remediate-first';
    rationale = `Documented gaps (${notMet.length}) outweigh met standards (${met.length}). Filing now invites a reconsideration that re-affirms the score. Close the ranked gaps below, then appeal.`;
  }

  return {
    action,
    rationale,
    metCount: met.length,
    notMetCount: notMet.length,
    unknownCount: unknown.length,
    gaps,
  };
}
