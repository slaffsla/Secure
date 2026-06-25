import type { Observation, RiskFactor } from '../types';

const byId = (observations: Observation[], id: string) =>
  observations.find((observation) => observation.id === id);

export function buildRiskFactors(observations: Observation[]): RiskFactor[] {
  const factors: RiskFactor[] = [];

  const rearMissing = byId(observations, 'observation:rear:missing');
  if (rearMissing) {
    factors.push({
      id: 'risk:rear-access-unknown',
      domain: 'burglary',
      title: 'Rear access cannot be assessed yet',
      severity: 5,
      likelihood: 4,
      confidence: 85,
      observationIds: [rearMissing.id],
      recommendationIds: ['rear-access-documentation', 'targeted-motion-lighting'],
    });
  }

  const doorMissing = byId(observations, 'observation:doors:missing');
  if (doorMissing) {
    factors.push({
      id: 'risk:door-hardware-unknown',
      domain: 'forced-entry',
      title: 'Exterior door resistance is unknown',
      severity: 5,
      likelihood: 3,
      confidence: 75,
      observationIds: [doorMissing.id],
      recommendationIds: ['reinforce-door-strikes', 'secondary-door-locking'],
    });
  }

  const lightingMissing = byId(observations, 'observation:control:lighting:not-reported');
  if (lightingMissing) {
    factors.push({
      id: 'risk:lighting-not-confirmed',
      domain: 'visibility',
      title: 'Exterior lighting is not confirmed',
      severity: 4,
      likelihood: 3,
      confidence: lightingMissing.confidence,
      observationIds: [lightingMissing.id],
      recommendationIds: ['targeted-motion-lighting'],
    });
  }

  const camerasMissing = byId(observations, 'observation:control:cameras:not-reported');
  if (camerasMissing) {
    factors.push({
      id: 'risk:surveillance-not-confirmed',
      domain: 'surveillance',
      title: 'Camera coverage is not established',
      severity: 3,
      likelihood: 3,
      confidence: camerasMissing.confidence,
      observationIds: [camerasMissing.id],
      recommendationIds: ['camera-after-access-control'],
    });
  }

  const smartConcern = byId(observations, 'observation:concern:smart-home');
  const devicesMissing = byId(observations, 'observation:devices:missing');
  if (smartConcern && devicesMissing) {
    factors.push({
      id: 'risk:device-inventory-needed',
      domain: 'smart-home',
      title: 'Smart-device exposure needs inventory',
      severity: 3,
      likelihood: 2,
      confidence: 65,
      observationIds: [smartConcern.id, devicesMissing.id],
      recommendationIds: ['device-inventory'],
    });
  }

  const buyerMode = byId(observations, 'observation:mode:buyer');
  if (buyerMode) {
    factors.push({
      id: 'risk:buyer-key-control',
      domain: 'buyer',
      title: 'Key control is uncertain before move-in',
      severity: 4,
      likelihood: 4,
      confidence: buyerMode.confidence,
      observationIds: [buyerMode.id],
      recommendationIds: ['post-closing-rekey', 'pre-move-security-budget'],
    });
  }

  return factors.sort((a, b) => b.severity * b.likelihood * b.confidence - a.severity * a.likelihood * a.confidence);
}
