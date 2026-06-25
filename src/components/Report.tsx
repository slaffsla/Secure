import { FileText, Lock } from 'lucide-react';
import type { EvidenceScore, Finding, Intake } from '../types';

type ReportProps = {
  evidence: EvidenceScore;
  findings: Finding[];
  intake: Intake;
  visible: boolean;
};

export function Report({ evidence, findings, intake, visible }: ReportProps) {
  const topFixes = findings.slice(0, 5);

  return (
    <section className={visible ? 'report visible' : 'report'}>
      <div className="section-heading">
        <FileText size={20} />
        <h2>Risk Report</h2>
      </div>

      <div className="report-summary">
        <div>
          <span>Confidence</span>
          <strong>{evidence.confidence}%</strong>
        </div>
        <div>
          <span>Missing evidence</span>
          <strong>{evidence.missing.length}</strong>
        </div>
        <div>
          <span>Review path</span>
          <strong>{intake.humanReview ? 'Human' : 'Automated'}</strong>
        </div>
      </div>

      <div className="report-columns">
        <div>
          <h3>Top fixes</h3>
          {topFixes.map((finding) => (
            <article className="finding" key={finding.title}>
              <div className="finding-head">
                <span>{finding.domain}</span>
                <strong>
                  S{finding.severity} / C{finding.confidence}
                </strong>
              </div>
              <h4>{finding.title}</h4>
              <p>{finding.recommendation}</p>
              <small>
                {finding.cost} · {finding.effort}
              </small>
            </article>
          ))}
        </div>

        <div>
          <h3>Missing data prompts</h3>
          {evidence.missing.slice(0, 5).map((slot) => (
            <article className="prompt" key={slot.key}>
              <Lock size={17} />
              <div>
                <strong>{slot.label}</strong>
                <p>{slot.why}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
