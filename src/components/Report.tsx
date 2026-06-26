import { FileText, Lock } from 'lucide-react';
import { getRecommendation } from '../data/recommendations';
import type { AssessmentModel, EvidenceScore, Intake } from '../types';

type ReportProps = {
  assessment: AssessmentModel;
  evidence: EvidenceScore;
  intake: Intake;
  visible: boolean;
};

export function Report({ assessment, evidence, intake, visible }: ReportProps) {
  const topFixes = assessment.findings.slice(0, 5);

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
        <div>
          <span>Observations</span>
          <strong>{assessment.observations.length}</strong>
        </div>
        <div>
          <span>Risk factors</span>
          <strong>{assessment.riskFactors.length}</strong>
        </div>
      </div>

      <div className="insight-grid">
        {assessment.insights.map((insight) => (
          <article className="insight" key={insight.id}>
            <span>{insight.label}</span>
            <strong>{insight.value}</strong>
            <p>{insight.detail}</p>
          </article>
        ))}
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
              <p>{finding.evidence}</p>
              <div className="observation-list">
                {finding.observationIds.map((id) => {
                  const observation = assessment.observations.find((item) => item.id === id);
                  if (!observation) return null;

                  return (
                    <span key={observation.id}>
                      {observation.label} · {observation.confidence}% confidence
                    </span>
                  );
                })}
              </div>
              <div className="recommendation-list">
                {finding.recommendationIds.map((id) => {
                  const recommendation = getRecommendation(id);
                  if (!recommendation) return null;

                  return (
                    <div className="recommendation" key={recommendation.id}>
                      <div className="recommendation-head">
                        <strong>{recommendation.title}</strong>
                        <span>
                          Impact {recommendation.impact} · {recommendation.costBand} ·{' '}
                          {recommendation.effort.replace(/-/g, ' ')}
                        </span>
                      </div>
                      <p>{recommendation.summary}</p>
                      <small>{recommendation.whyItMatters}</small>
                      {recommendation.cautions.length > 0 && (
                        <ul>
                          {recommendation.cautions.map((caution) => (
                            <li key={caution}>{caution}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
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
