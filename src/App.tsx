import React from 'react';
import { Download, Sparkles } from 'lucide-react';
import { EvidenceGrid } from './components/EvidenceGrid';
import { FeatureSignalPanel } from './components/FeatureSignalPanel';
import { Hero } from './components/Hero';
import { IntakePanel } from './components/IntakePanel';
import { Report } from './components/Report';
import { ScenarioLoader } from './components/ScenarioLoader';
import { evidenceDefaults } from './data/evidenceSlots';
import { initialIntake } from './data/intakeOptions';
import { sampleScenarios } from './data/sampleScenarios';
import { buildAssessmentModel, scoreEvidence } from './engine/riskEngine';
import { buildScenarioSlots } from './scenarios/applyScenario';
import { loadDraft, loadDraftSignals, mergeDraftSlots, saveDraft } from './storage/draftStorage';
import type { EvidenceKey, EvidenceSlot, FeatureSignalKey, Intake, SelectedFeatureSignal } from './types';

export function App() {
  const draft = React.useMemo(() => loadDraft(), []);
  const [intake, setIntake] = React.useState<Intake>(draft?.intake ?? initialIntake);
  const [slots, setSlots] = React.useState<EvidenceSlot[]>(() => mergeDraftSlots(evidenceDefaults, draft));
  const [selectedSignals, setSelectedSignals] = React.useState<SelectedFeatureSignal[]>(() =>
    loadDraftSignals(draft),
  );
  const [reportReady, setReportReady] = React.useState(false);

  const evidence = scoreEvidence(slots);
  const assessment = buildAssessmentModel(intake, slots, selectedSignals);

  const updateIntake = <K extends keyof Intake>(key: K, value: Intake[K]) => {
    setIntake((current) => ({ ...current, [key]: value }));
    setReportReady(false);
  };

  React.useEffect(() => {
    saveDraft(intake, slots, selectedSignals);
  }, [intake, slots, selectedSignals]);

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

  const toggleSignal = (key: FeatureSignalKey) => {
    setSelectedSignals((current) =>
      current.some((signal) => signal.key === key)
        ? current.filter((signal) => signal.key !== key)
        : [...current, { key, source: 'user', confidence: 80 }],
    );
    setReportReady(false);
  };

  const loadScenario = (scenarioId: string) => {
    const scenario = sampleScenarios.find((item) => item.id === scenarioId);
    if (!scenario) return;

    setIntake({ ...scenario.intake });
    setSlots(buildScenarioSlots(scenario));
    setSelectedSignals(scenario.selectedSignals.map((signal) => ({ ...signal })));
    setReportReady(true);
  };

  return (
    <main>
      <Hero evidence={evidence} findings={assessment.findings} />

      <section className="workspace">
        <IntakePanel intake={intake} onChange={updateIntake} />

        <section className="content">
          <ScenarioLoader onLoad={loadScenario} />
          <EvidenceGrid slots={slots} onAddFiles={handleFiles} onClearSlot={clearSlot} />
          <FeatureSignalPanel selectedSignals={selectedSignals} onToggle={toggleSignal} />

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
