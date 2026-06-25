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
      recommendation:
        'Prioritize rear door, yard, and gate documentation. Until reviewed, treat rear access as a high-uncertainty exposure and verify locks, lighting, and gate control.',
      cost: '$-$$',
      effort: 'DIY first, installer if hardware is weak',
    });
  }

  if (!has('doors')) {
    findings.push({
      domain: 'Forced Entry',
      title: 'Door hardware needs close inspection',
      severity: 5,
      confidence: 3,
      evidence: 'No lock or door-frame close-ups were provided.',
      recommendation:
        'Collect close-ups of all exterior locks, strike plates, hinges, and adjacent glass. High-impact upgrades often include reinforced strike plates, longer screws, and secondary locks.',
      cost: '$',
      effort: 'DIY or locksmith',
    });
  }

  if (!intake.existingSecurity.includes('Lighting')) {
    findings.push({
      domain: 'Visibility',
      title: 'Lighting is not confirmed',
      severity: 4,
      confidence: intake.addressKnown ? 3 : 2,
      evidence: 'The intake does not list exterior lighting as an existing control.',
      recommendation:
        'Verify motion lighting at approach paths, rear entry, garage, and side gates. Favor targeted lighting that removes concealment without exposing private interior routines.',
      cost: '$-$$',
      effort: 'DIY or electrician',
    });
  }

  if (!intake.existingSecurity.includes('Cameras')) {
    findings.push({
      domain: 'Surveillance',
      title: 'Camera coverage is not established',
      severity: 3,
      confidence: 3,
      evidence: 'The intake does not list cameras as an existing control.',
      recommendation:
        'Consider cameras only after locks, lighting, and access control are handled. Prioritize entrances and package zones over broad, privacy-invasive coverage.',
      cost: '$$',
      effort: 'DIY or low-voltage installer',
    });
  }

  if (intake.concerns.includes('smart-home') && !has('devices')) {
    findings.push({
      domain: 'Smart Home',
      title: 'Device exposure needs an inventory',
      severity: 3,
      confidence: 2,
      evidence: 'Smart-home concern was selected, but no device photos or inventory were provided.',
      recommendation:
        'Create a device inventory before buying new equipment. Record model names, app ownership, update status, and whether default credentials were changed.',
      cost: '$',
      effort: 'DIY',
    });
  }

  if (intake.mode === 'buyer') {
    findings.push({
      domain: 'Pre-Purchase',
      title: 'Buyer timing creates leverage',
      severity: 4,
      confidence: 4,
      evidence: 'The property is being assessed for a buyer.',
      recommendation:
        'Use the report to request seller disclosures, ask for lock rekeying after closing, and budget immediate fixes before move-in patterns become visible.',
      cost: '$-$$$',
      effort: 'Buyer agent plus locksmith/installer',
    });
  }

  return findings.sort((a, b) => b.severity * b.confidence - a.severity * a.confidence);
}
