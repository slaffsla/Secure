import type { Observation, RiskFactor } from '../types';

const byId = (observations: Observation[], id: string) =>
  observations.find((observation) => observation.id === id);

const feature = (observations: Observation[], key: string) =>
  byId(observations, `observation:feature:${key}`);

export function buildRiskFactors(observations: Observation[]): RiskFactor[] {
  const factors: RiskFactor[] = [];

  // === RESIDENTIAL / GENERAL ===
  const rearMissing = byId(observations, 'observation:rear:missing');
  if (rearMissing) {
    factors.push({
      id: 'risk:rear-access-unknown',
      domain: 'burglary',
      title: 'Rear access cannot be assessed yet',
      severity: 5,
      likelihood: 4,
      confidence: Math.round(rearMissing.confidence * 0.75),
      payoffMultiplier: 1.0,
      observationIds: [rearMissing.id],
      recommendationIds: ['rear-access-documentation', 'targeted-motion-lighting'],
    });

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

  const slidingDoor = feature(observations, 'sliding_glass_door');
  if (slidingDoor) {
    factors.push({
      id: 'risk:sliding-door-entry',
      domain: 'forced-entry',
      title: 'Sliding glass door may need secondary protection',
      severity: 5,
      likelihood: 3,
      confidence: slidingDoor.confidence,
      observationIds: [slidingDoor.id],
      recommendationIds: ['sliding-door-anti-lift', 'secondary-door-locking'],
    });
  }

  const denseVegetation = feature(observations, 'dense_vegetation');
  if (denseVegetation) {
    factors.push({
      id: 'risk:concealment-vegetation',
      domain: 'visibility',
      title: 'Vegetation may create concealment',
      severity: 4,
      likelihood: 4,
      confidence: denseVegetation.confidence,
      observationIds: [denseVegetation.id],
      recommendationIds: ['trim-concealment-vegetation', 'targeted-motion-lighting'],
    });
  }

  const sideGate = feature(observations, 'side_gate');
  if (sideGate) {
    factors.push({
      id: 'risk:side-gate-access',
      domain: 'burglary',
      title: 'Side gate or alley access may bypass street visibility',
      severity: 4,
      likelihood: 4,
      confidence: sideGate.confidence,
      observationIds: [sideGate.id],
      recommendationIds: ['secure-side-gate', 'targeted-motion-lighting'],
    });
  }

  const garageDoor = feature(observations, 'garage_interior_door');
  if (garageDoor) {
    factors.push({
      id: 'risk:garage-interior-door',
      domain: 'forced-entry',
      title: 'Garage-to-house door should be treated as a barrier',
      severity: 4,
      likelihood: 3,
      confidence: garageDoor.confidence,
      observationIds: [garageDoor.id],
      recommendationIds: ['garage-house-door-harden', 'reinforce-door-strikes'],
    });
  }

  const lowWindow = feature(observations, 'low_window');
  if (lowWindow) {
    factors.push({
      id: 'risk:low-window-access',
      domain: 'forced-entry',
      title: 'Low or easy-reach windows may increase entry exposure',
      severity: 4,
      likelihood: 3,
      confidence: lowWindow.confidence,
      observationIds: [lowWindow.id],
      recommendationIds: ['low-window-locks-sensors'],
    });
  }

  const packageZone = feature(observations, 'package_drop_zone');
  if (packageZone) {
    factors.push({
      id: 'risk:package-zone-exposure',
      domain: 'burglary',
      title: 'Package drop zone may create opportunistic theft exposure',
      severity: 3,
      likelihood: 3,
      confidence: packageZone.confidence,
      observationIds: [packageZone.id],
      recommendationIds: ['package-zone-control', 'camera-after-access-control'],
    });
  }
// === RETAIL / COMMERCIAL ===
  const highValueStock = feature(observations, 'visible_high_value_stock');
  if (highValueStock) {
    factors.push({
      id: 'risk:high-payoff-stock',
      domain: 'burglary',
      title: 'High-value stock is highly visible',
      severity: 5,
      likelihood: 4,
      confidence: highValueStock.confidence,
      payoffMultiplier: 1.65,
      observationIds: [highValueStock.id],
      recommendationIds: ['retail-visible-high-value-stock', 'retail-roller-shutters'],
    });
  }

  // Interaction example
  const glassNearLock = feature(observations, 'glass_near_lock');
  if (glassNearLock) {
    factors.push({
      id: 'risk:glass-near-lock',
      domain: 'forced-entry',
      title: 'Glass near lock weakens security',
      severity: 4,
      likelihood: 3,
      confidence: glassNearLock.confidence,
      payoffMultiplier: 1.2,
      observationIds: [glassNearLock.id],
      recommendationIds: ['secondary-door-locking'],
    });
  }

  return factors.sort((a, b) => {
    const scoreA = a.severity * a.likelihood * (a.confidence / 100) * (a.payoffMultiplier || 1);
    const scoreB = b.severity * b.likelihood * (b.confidence / 100) * (b.payoffMultiplier || 1);
    return scoreB - scoreA;
  });
}}
