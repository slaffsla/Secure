import type { EvidenceItem, EvidenceSlot, Intake } from '../types';

export function buildEvidenceItems(intake: Intake, slots: EvidenceSlot[]): EvidenceItem[] {
  const photoEvidence = slots.flatMap((slot) =>
    slot.files.map((file, index) => ({
      id: `photo:${slot.key}:${index}`,
      type: 'photo' as const,
      label: `${slot.label} photo`,
      source: 'user' as const,
      category: slot.key,
      detail: file.name || `${slot.label} upload`,
    })),
  );

  const intakeEvidence: EvidenceItem[] = [
    {
      id: 'questionnaire:mode',
      type: 'questionnaire',
      label: 'Assessment mode',
      source: 'user',
      detail: intake.mode,
    },
    {
      id: 'questionnaire:security-controls',
      type: 'questionnaire',
      label: 'Existing security controls',
      source: 'user',
      detail: intake.existingSecurity.length ? intake.existingSecurity.join(', ') : 'Not provided',
    },
    {
      id: 'questionnaire:concerns',
      type: 'questionnaire',
      label: 'Main concerns',
      source: 'user',
      detail: intake.concerns.length ? intake.concerns.join(', ') : 'Not provided',
    },
    {
      id: 'address:context',
      type: 'address',
      label: 'Address or local context',
      source: 'user',
      detail: intake.addressKnown ? 'Provided' : 'Not provided',
    },
  ];

  return [...intakeEvidence, ...photoEvidence];
}
