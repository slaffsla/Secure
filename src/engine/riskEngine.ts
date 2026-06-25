import { recommendationById } from '../data/recommendations';
import type { EvidenceKey, EvidenceScore, EvidenceSlot, Finding, Intake } from '../types';

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

export function buildFindings(intake: Intake, slots: EvidenceSlot[]): Finding[] {
  const has = (key: EvidenceKey) => slots.some((slot) => slot.key === key && slot.files.length > 0);
  const findings: Finding[] = [];

  if (!has('rear')) {
    findings.push({
      domain: 'Burglary',
      title: 'Rear access is currently under-assessed',
      severity: 5,
      confidence: 4,
      evidence: 'No rear-access photos were provided.',
      recommendationIds: ['rear-access-documentation', 'targeted-motion-lighting'],
    });
  }

  if (!has('doors')) {
    findings.push({
      domain: 'Forced Entry',
      title: 'Door hardware needs close inspection',
      severity: 5,
      confidence: 3,
      evidence: 'No lock or door-frame close-ups were provided.',
      recommendationIds: ['reinforce-door-strikes', 'secondary-door-locking'],
    });
  }

  if (!intake.existingSecurity.includes('Lighting')) {
    findings.push({
      domain: 'Visibility',
      title: 'Lighting is not confirmed',
      severity: 4,
      confidence: intake.addressKnown ? 3 : 2,
      evidence: 'The intake does not list exterior lighting as an existing control.',
      recommendationIds: ['targeted-motion-lighting'],
    });
  }

  if (!intake.existingSecurity.includes('Cameras')) {
    findings.push({
      domain: 'Surveillance',
      title: 'Camera coverage is not established',
      severity: 3,
      confidence: 3,
      evidence: 'The intake does not list cameras as an existing control.',
      recommendationIds: ['camera-after-access-control'],
    });
  }

  if (intake.concerns.includes('smart-home') && !has('devices')) {
    findings.push({
      domain: 'Smart Home',
      title: 'Device exposure needs an inventory',
      severity: 3,
      confidence: 2,
      evidence: 'Smart-home concern was selected, but no device photos or inventory were provided.',
      recommendationIds: ['device-inventory'],
    });
  }

  if (intake.mode === 'buyer') {
    findings.push({
      domain: 'Pre-Purchase',
      title: 'Buyer timing creates leverage',
      severity: 4,
      confidence: 4,
      evidence: 'The property is being assessed for a buyer.',
      recommendationIds: ['post-closing-rekey', 'pre-move-security-budget'],
    });
  }

  return findings
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
