import { FlaskConical } from 'lucide-react';
import { sampleScenarios } from '../data/sampleScenarios';

type ScenarioLoaderProps = {
  onLoad: (scenarioId: string) => void;
};

export function ScenarioLoader({ onLoad }: ScenarioLoaderProps) {
  return (
    <section className="scenario-loader">
      <div className="section-heading">
        <FlaskConical size={20} />
        <h2>Sample Scenarios</h2>
      </div>
      <div className="scenario-row">
        {sampleScenarios.map((scenario) => (
          <button className="scenario-button" key={scenario.id} onClick={() => onLoad(scenario.id)} type="button">
            <span>{scenario.label}</span>
            <small>{scenario.description}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
