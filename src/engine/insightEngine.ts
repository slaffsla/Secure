import type { Insight, RiskFactor } from '../types';

const riskWeight = (factor: RiskFactor) => factor.severity * factor.likelihood * factor.confidence;

export function buildInsights(riskFactors: RiskFactor[]): Insight[] {
  const highestRisk = [...riskFactors].sort((a, b) => riskWeight(b) - riskWeight(a))[0];
  const domains = new Map<string, number>();

  for (const factor of riskFactors) {
    domains.set(factor.domain, (domains.get(factor.domain) ?? 0) + riskWeight(factor));
  }

  const dominantDomain = [...domains.entries()].sort((a, b) => b[1] - a[1])[0];
  const highConfidenceCount = riskFactors.filter((factor) => factor.confidence >= 80).length;

  return [
    {
      id: 'highest-risk',
      label: 'Highest priority',
      value: highestRisk?.title ?? 'No major risk factors yet',
      detail: highestRisk
        ? `Severity ${highestRisk.severity}, likelihood ${highestRisk.likelihood}, confidence ${highestRisk.confidence}%.`
        : 'Add photos, answers, or observed signals to generate stronger insight.',
    },
    {
      id: 'dominant-domain',
      label: 'Dominant domain',
      value: dominantDomain?.[0].replace(/-/g, ' ') ?? 'Unknown',
      detail: dominantDomain
        ? 'This is where the current evidence points most strongly.'
        : 'The model needs more structured observations.',
    },
    {
      id: 'confidence-basis',
      label: 'High-confidence factors',
      value: `${highConfidenceCount}/${riskFactors.length}`,
      detail: 'High-confidence factors are easier to defend in a human-reviewed report.',
    },
  ];
}
