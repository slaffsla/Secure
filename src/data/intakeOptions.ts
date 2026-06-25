import type { Concern, Intake } from '../types';

export const initialIntake: Intake = {
  mode: 'owner',
  propertyType: '',
  addressKnown: false,
  occupants: '',
  existingSecurity: [],
  concerns: ['burglary'],
  budget: 'unknown',
  humanReview: true,
};

export const existingSecurityOptions = [
  'Deadbolt',
  'Alarm',
  'Cameras',
  'Smart lock',
  'Lighting',
  'Dog',
  'None',
];

export const concernOptions: { value: Concern; label: string }[] = [
  { value: 'burglary', label: 'Burglary' },
  { value: 'personal-safety', label: 'Personal safety' },
  { value: 'fire', label: 'Fire' },
  { value: 'privacy', label: 'Privacy' },
  { value: 'smart-home', label: 'Smart devices' },
  { value: 'storm', label: 'Storm/water' },
  { value: 'unknown', label: 'Not sure' },
];
