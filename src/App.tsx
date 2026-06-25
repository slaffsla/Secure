import React from 'react';
import { Download, Sparkles } from 'lucide-react';
import { EvidenceGrid } from './components/EvidenceGrid';
import { Hero } from './components/Hero';
import { IntakePanel } from './components/IntakePanel';
import { Report } from './components/Report';
import { evidenceDefaults } from './data/evidenceSlots';
import { initialIntake } from './data/intakeOptions';
import { buildAssessmentModel, scoreEvidence } from './engine/riskEngine';
import { loadDraft, mergeDraftSlots, saveDraft } from './storage/draftStorage';
import type { EvidenceKey, EvidenceSlot, Intake } from './types';

export function App() {
  const draft = React.useMemo(() => loadDraft(), []);
  const [intake, setIntake] = React.useState<Intake>(draft?.intake ?? initialIntake);
  const [slots, setSlots] = React.useState<EvidenceSlot[]>(() => mergeDraftSlots(evidenceDefaults, draft));
  const [reportReady, setReportReady] = React.useState(false);

  const evidence = scoreEvidence(slots);
  const assessment = buildAssessmentModel(intake, slots);

  const updateIntake = <K extends keyof Intake>(key: K, value: Intake[K]) => {
    setIntake((current) => ({ ...current, [key]: value }));
    setReportReady(false);
  };

  React.useEffect(() => {
    saveDraft(intake, slots);
  }, [intake, slots]);

  const handleFiles = (key: EvidenceKey, files: FileList | null) => {
    if (!files) return;
    setSlots((current) =>
      current.map((slot) =>
        slot.key === key ? { ...slot, files: [...slot.files, ...Array.from(files)] } : slot,
      ),
    );
    setReportReady(false);
  };

  const clearSlot = (key: EvidenceKey) => {
    setSlots((current) => current.map((slot) => (slot.key === key ? { ...slot, files: [] } : slot)));
    setReportReady(false);
  };

  return (
    <main>
      <Hero evidence={evidence} findings={assessment.findings} />

      <section className="workspace">
        <IntakePanel intake={intake} onChange={updateIntake} />

        <section className="content">
          <EvidenceGrid slots={slots} onAddFiles={handleFiles} onClearSlot={clearSlot} />

          <div className="actions">
            <button className="primary" onClick={() => setReportReady(true)} type="button">
              <Sparkles size={18} />
              Generate assessment
            </button>
            <button className="secondary" onClick={() => window.print()} type="button">
              <Download size={18} />
              Export draft
            </button>
          </div>

          <Report assessment={assessment} evidence={evidence} intake={intake} visible={reportReady} />
        </section>
      </section>
    </main>
  );
}
