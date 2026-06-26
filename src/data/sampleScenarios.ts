import { initialIntake } from './intakeOptions';
import type { ScenarioDefinition, SelectedFeatureSignal } from '../types';

const signal = (key: SelectedFeatureSignal['key'], confidence = 82): SelectedFeatureSignal => ({
  key,
  confidence,
  source: 'user',
});

export const sampleScenarios: ScenarioDefinition[] = [
  {
    id: 'low-info-owner',
    label: 'Low-info owner',
    description: 'No photos, no controls, burglary concern only.',
    intake: {
      ...initialIntake,
      mode: 'owner',
      existingSecurity: ['None'],
      concerns: ['burglary'],
      budget: 'unknown',
      addressKnown: false,
    },
    evidenceFileNames: {},
    selectedSignals: [],
  },
  {
    id: 'buyer-side-access',
    label: 'Buyer with side access',
    description: 'Buyer context with side gate and visible package exposure.',
    intake: {
      ...initialIntake,
      mode: 'buyer',
      propertyType: 'single-family',
      addressKnown: true,
      existingSecurity: ['Deadbolt'],
      concerns: ['burglary', 'personal-safety'],
      budget: '1000-5000',
    },
    evidenceFileNames: {
      front: ['listing-front.jpg'],
      side: ['inspection-side-path.jpg'],
    },
    selectedSignals: [signal('side_gate', 86), signal('package_drop_zone', 76)],
  },
  {
    id: 'rear-sliding-door',
    label: 'Rear sliding door',
    description: 'Rear evidence with sliding door and concealment around access.',
    intake: {
      ...initialIntake,
      mode: 'owner',
      propertyType: 'townhouse',
      existingSecurity: ['Deadbolt'],
      concerns: ['burglary', 'privacy'],
      budget: '250-1000',
    },
    evidenceFileNames: {
      rear: ['rear-patio.jpg'],
      yard: ['yard-shrubs.jpg'],
      doors: ['rear-door-closeup.jpg'],
    },
    selectedSignals: [signal('sliding_glass_door', 88), signal('dense_vegetation', 84)],
  },
  {
    id: 'garage-entry',
    label: 'Garage entry concern',
    description: 'Lighting and cameras are present, but garage-to-house entry is exposed.',
    intake: {
      ...initialIntake,
      mode: 'owner',
      propertyType: 'single-family',
      existingSecurity: ['Lighting', 'Cameras', 'Deadbolt'],
      concerns: ['burglary'],
      budget: '250-1000',
    },
    evidenceFileNames: {
      garage: ['garage-interior.jpg'],
      front: ['front-lit-driveway.jpg'],
      devices: ['camera-over-driveway.jpg'],
    },
    selectedSignals: [signal('garage_interior_door', 83), signal('visible_camera', 92), signal('motion_lighting', 90)],
  },
  {
    id: 'smart-home-uncertain',
    label: 'Smart-home uncertainty',
    description: 'Smart devices are a concern, but no device inventory evidence exists.',
    intake: {
      ...initialIntake,
      mode: 'owner',
      propertyType: 'condo',
      existingSecurity: ['Cameras', 'Smart lock'],
      concerns: ['smart-home', 'privacy', 'burglary'],
      budget: 'under-250',
    },
    evidenceFileNames: {
      front: ['condo-entry.jpg'],
      doors: ['smart-lock-door.jpg'],
    },
    selectedSignals: [signal('glass_near_lock', 72)],
  },
];
