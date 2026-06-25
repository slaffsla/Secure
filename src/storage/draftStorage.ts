import type { EvidenceSlot, Intake } from '../types';

const DRAFT_KEY = 'dwelling-risk-draft-v1';

type StoredEvidenceSlot = Omit<EvidenceSlot, 'files'> & {
  fileNames: string[];
};

type StoredDraft = {
  intake: Intake;
  slots: StoredEvidenceSlot[];
};

export function loadDraft() {
  try {
    const stored = window.localStorage.getItem(DRAFT_KEY);
    return stored ? (JSON.parse(stored) as StoredDraft) : null;
  } catch {
    return null;
  }
}

export function saveDraft(intake: Intake, slots: EvidenceSlot[]) {
  const draft: StoredDraft = {
    intake,
    slots: slots.map(({ files, ...slot }) => ({
      ...slot,
      fileNames: files.map((file) => file.name),
    })),
  };

  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function mergeDraftSlots(defaults: EvidenceSlot[], draft: StoredDraft | null): EvidenceSlot[] {
  if (!draft) return defaults;

  return defaults.map((slot) => {
    const stored = draft.slots.find((item) => item.key === slot.key);
    if (!stored) return slot;

    return {
      ...slot,
      files: stored.fileNames.map(
        (name) => new File([], name, { type: 'application/octet-stream' }),
      ),
    };
  });
}
