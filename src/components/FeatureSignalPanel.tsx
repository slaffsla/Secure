import { Tags } from 'lucide-react';
import { featureSignals } from '../data/featureSignals';
import type { FeatureSignalKey, SelectedFeatureSignal } from '../types';

type FeatureSignalPanelProps = {
  selectedSignals: SelectedFeatureSignal[];
  onToggle: (key: FeatureSignalKey) => void;
};

export function FeatureSignalPanel({ selectedSignals, onToggle }: FeatureSignalPanelProps) {
  const selectedKeys = new Set(selectedSignals.map((signal) => signal.key));

  return (
    <section className="signal-panel">
      <div className="section-heading">
        <Tags size={20} />
        <h2>Observed Signals</h2>
      </div>
      <div className="signal-grid">
        {featureSignals.map((signal) => (
          <button
            className={selectedKeys.has(signal.key) ? 'signal-card selected' : 'signal-card'}
            key={signal.key}
            onClick={() => onToggle(signal.key)}
            type="button"
          >
            <span>{signal.label}</span>
            <small>{signal.riskHint}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
