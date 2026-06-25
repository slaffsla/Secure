import { recommendationById } from '../data/recommendations';
import { buildEvidenceItems } from './evidenceEngine';
import { buildObservations } from './observationEngine';
import { buildRiskFactors } from './riskFactorEngine';
import type { AssessmentModel, EvidenceScore, EvidenceSlot, Finding, Intake, RiskFactor } from '../types';

export function scoreEvidence(slots: EvidenceSlot[]): EvidenceScore {
  const filled = slots.filter((slot) => slot.files.length > 0);
  const critical = ['rear', 'doors', 'windows'].filter((key) =>
    slots.some((slot) => slot.key === key && slot.files.length > 0),
  );

  return {
    completion: Math.round((filled.length / slots.length) * 100),
    confidence: Math.min(95, 28 + filled.length * 7 + critical.length * 8),
    missing: slots.filter((slot) => slot.files.length === 0),
  };
}

const domainLabels: Record<RiskFactor['domain'], string> = {
  burglary: 'Burglary',
  'forced-entry': 'Forced Entry',
  visibility: 'Visibility',
  surveillance: 'Surveillance',
  'smart-home': 'Smart Home',
  buyer: 'Pre-Purchase',
};

export function buildFindings(riskFactors: RiskFactor[]): Finding[] {
  return riskFactors
    .map((factor) => ({
      id: `finding:${factor.id}`,
      domain: domainLabels[factor.domain],
      title: factor.title,
      severity: factor.severity,
      confidence: Math.round(factor.confidence / 20),
      evidence: `${factor.observationIds.length} observation${factor.observationIds.length === 1 ? '' : 's'} support this risk factor.`,
      observationIds: factor.observationIds,
      riskFactorIds: [factor.id],
      recommendationIds: factor.recommendationIds,
    }))
    .map((finding) => ({
      ...finding,
      recommendationIds: finding.recommendationIds.filter((id) => {
        const exists = recommendationById.has(id);
        if (!exists) {
          console.warn(`Unknown recommendation id: ${id}`);
        }

        return exists;
      }),
    }))
    .sort((a, b) => b.severity * b.confidence - a.severity * a.confidence);
}

export function buildAssessmentModel(intake: Intake, slots: EvidenceSlot[]): AssessmentModel {
  const evidenceItems = buildEvidenceItems(intake, slots);
  const observations = buildObservations(intake, slots, evidenceItems);
  const riskFactors = buildRiskFactors(observations);
  const findings = buildFindings(riskFactors);

  return {
    evidenceItems,
    observations,
    riskFactors,
    findings,
  };
}
