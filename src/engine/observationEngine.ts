import { featureSignalByKey } from '../data/featureSignals';
import type { EvidenceItem, EvidenceSlot, Intake, Observation, SelectedFeatureSignal } from '../types';

const controlsToWatch = ['Lighting', 'Cameras', 'Deadbolt', 'Alarm'];

export function buildObservations(
  intake: Intake,
  slots: EvidenceSlot[],
  evidenceItems: EvidenceItem[],
  selectedSignals: SelectedFeatureSignal[],
): Observation[] {
  const observations: Observation[] = [];

  for (const slot of slots) {
    const evidenceIds = evidenceItems
      .filter((item) => item.category === slot.key && item.type === 'photo')
      .map((item) => item.id);

    observations.push({
      id: `observation:${slot.key}:${slot.files.length > 0 ? 'provided' : 'missing'}`,
      kind: slot.files.length > 0 ? 'evidence_slot_provided' : 'evidence_slot_missing',
      label:
        slot.files.length > 0
          ? `${slot.label} evidence was provided`
          : `${slot.label} evidence is missing`,
      confidence: 100,
      source: 'user',
      evidenceIds,
      metadata: { slot: slot.key, risk: slot.risk },
    });
  }

  observations.push({
    id: `observation:address:${intake.addressKnown ? 'provided' : 'missing'}`,
    kind: intake.addressKnown ? 'address_context_provided' : 'address_context_missing',
    label: intake.addressKnown ? 'Address or local context was provided' : 'Address or local context is missing',
    confidence: 100,
    source: 'user',
    evidenceIds: ['address:context'],
  });

  for (const control of controlsToWatch) {
    const reported = intake.existingSecurity.includes(control);
    observations.push({
      id: `observation:control:${control.toLowerCase()}:${reported ? 'reported' : 'not-reported'}`,
      kind: reported ? 'security_control_reported' : 'security_control_not_reported',
      label: reported ? `${control} reported by user` : `${control} not reported by user`,
      confidence: reported ? 90 : 65,
      source: 'user',
      evidenceIds: ['questionnaire:security-controls'],
      metadata: { control },
    });
  }

  for (const concern of intake.concerns) {
    observations.push({
      id: `observation:concern:${concern}`,
      kind: 'concern_reported',
      label: `${concern.replace(/-/g, ' ')} concern reported`,
      confidence: 90,
      source: 'user',
      evidenceIds: ['questionnaire:concerns'],
      metadata: { concern },
    });
  }

  if (intake.mode === 'buyer') {
    observations.push({
      id: 'observation:mode:buyer',
      kind: 'buyer_mode',
      label: 'Property is being assessed before or around purchase',
      confidence: 95,
      source: 'user',
      evidenceIds: ['questionnaire:mode'],
    });
  }

  for (const signal of selectedSignals) {
    const definition = featureSignalByKey.get(signal.key);
    if (!definition) continue;

    observations.push({
      id: `observation:feature:${signal.key}`,
      kind: 'feature_signal_observed',
      label: `${definition.label} observed`,
      confidence: signal.confidence,
      source: signal.source,
      evidenceIds: evidenceItems
        .filter((item) => item.category === definition.evidenceCategory)
        .map((item) => item.id),
      metadata: {
        feature: signal.key,
        domain: definition.domain,
        evidenceCategory: definition.evidenceCategory,
      },
    });
  }

  return observations;
}
