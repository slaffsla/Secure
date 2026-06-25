import { ShieldCheck } from 'lucide-react';
import type { EvidenceScore, Finding } from '../types';

type HeroProps = {
  evidence: EvidenceScore;
  findings: Finding[];
};

export function Hero({ evidence, findings }: HeroProps) {
  return (
    <section className="hero-band">
      <div className="hero-copy">
        <div className="eyebrow">
          <ShieldCheck size={18} />
          Evidence-led residential security assessment
        </div>
        <h1>Dwelling Risk Assessment</h1>
        <p>
          Upload what you have, skip what you do not, and get a confidence-scored report that
          focuses first on the highest-impact security fixes.
        </p>
      </div>
      <div className="hero-panel" aria-label="Assessment snapshot">
        <div>
          <span>Report confidence</span>
          <strong>{evidence.confidence}%</strong>
        </div>
        <div>
          <span>Evidence coverage</span>
          <strong>{evidence.completion}%</strong>
        </div>
        <div>
          <span>Priority findings</span>
          <strong>{findings.length}</strong>
        </div>
      </div>
    </section>
  );
}
