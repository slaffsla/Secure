import type { EvidenceSlot, Intake, SelectedFeatureSignal } from '../types';

const DRAFT_KEY = 'dwelling-risk-draft-v1';

type StoredEvidenceSlot = Omit<EvidenceSlot, 'files'> & {
  fileNames: string[];
};

type StoredDraft = {
  intake: Intake;
  slots: StoredEvidenceSlot[];
  selectedSignals?: SelectedFeatureSignal[];
};

export function loadDraft() {
  try {
    const stored = window.localStorage.getItem(DRAFT_KEY);
    return stored ? (JSON.parse(stored) as StoredDraft) : null;
  } catch {
    return null;
  }
}

export function saveDraft(intake: Intake, slots: EvidenceSlot[], selectedSignals: SelectedFeatureSignal[]) {
  const draft: StoredDraft = {
    intake,
    selectedSignals,
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

export function loadDraftSignals(draft: StoredDraft | null): SelectedFeatureSignal[] {
  return draft?.selectedSignals ?? [];
}
