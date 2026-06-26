import { evidenceDefaults } from '../data/evidenceSlots';
import type { EvidenceSlot, ScenarioDefinition } from '../types';

export function buildScenarioSlots(scenario: ScenarioDefinition): EvidenceSlot[] {
  return evidenceDefaults.map((slot) => ({
    ...slot,
    files: (scenario.evidenceFileNames[slot.key] ?? []).map(
      (name) => new File([], name, { type: 'image/jpeg' }),
    ),
  }));
}
