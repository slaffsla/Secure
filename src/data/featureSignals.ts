import type { FeatureSignalDefinition } from '../types';

export const featureSignals: FeatureSignalDefinition[] = [
  {
    key: 'sliding_glass_door',
    label: 'Sliding glass door',
    evidenceCategory: 'rear',
    domain: 'forced-entry',
    riskHint: 'Sliding doors often need secondary locking and anti-lift checks.',
  },
  {
    key: 'glass_near_lock',
    label: 'Glass near exterior lock',
    evidenceCategory: 'doors',
    domain: 'forced-entry',
    riskHint: 'Glass near locks can reduce the value of otherwise strong hardware.',
  },
  {
    key: 'dense_vegetation',
    label: 'Dense vegetation near access',
    evidenceCategory: 'yard',
    domain: 'visibility',
    riskHint: 'Vegetation can create concealment around windows, doors, or side paths.',
  },
  {
    key: 'side_gate',
    label: 'Side gate or alley access',
    evidenceCategory: 'side',
    domain: 'burglary',
    riskHint: 'Side access can let someone move away from street visibility.',
  },
  {
    key: 'visible_camera',
    label: 'Camera visible',
    evidenceCategory: 'devices',
    domain: 'surveillance',
    riskHint: 'Visible cameras help only if placement covers the right approach paths.',
  },
  {
    key: 'motion_lighting',
    label: 'Motion lighting visible',
    evidenceCategory: 'front',
    domain: 'visibility',
    riskHint: 'Motion lighting can reduce concealment when aimed at approach paths.',
  },
  {
    key: 'garage_interior_door',
    label: 'Garage interior door',
    evidenceCategory: 'garage',
    domain: 'forced-entry',
    riskHint: 'Garage-to-house doors often need the same scrutiny as exterior doors.',
  },
  {
    key: 'low_window',
    label: 'Low or easy-reach window',
    evidenceCategory: 'windows',
    domain: 'forced-entry',
    riskHint: 'Low windows can change the priority of locks, sensors, and vegetation control.',
  },
  {
    key: 'package_drop_zone',
    label: 'Visible package drop zone',
    evidenceCategory: 'front',
    domain: 'burglary',
    riskHint: 'Package areas can reveal occupancy patterns and attract opportunistic theft.',
  },
];

export const featureSignalByKey = new Map(featureSignals.map((signal) => [signal.key, signal]));
