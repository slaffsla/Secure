import type { EvidenceSlot } from '../types';

export const evidenceDefaults: EvidenceSlot[] = [
  {
    key: 'front',
    label: 'Front approach',
    why: 'Shows visibility from the street, entry exposure, lighting, and obvious deterrence.',
    risk: 'Burglary, privacy, package theft',
    files: [],
  },
  {
    key: 'rear',
    label: 'Rear access',
    why: 'Rear doors and yards often have lower natural surveillance and higher entry opportunity.',
    risk: 'Burglary, trespass',
    files: [],
  },
  {
    key: 'side',
    label: 'Side paths',
    why: 'Side gates, alleys, and utility access can create concealed routes around the home.',
    risk: 'Burglary, stalking, vandalism',
    files: [],
  },
  {
    key: 'doors',
    label: 'Doors and locks',
    why: 'Close-ups help assess lock quality, strike plates, glass proximity, and forced-entry resistance.',
    risk: 'Forced entry',
    files: [],
  },
  {
    key: 'windows',
    label: 'Windows',
    why: 'Window height, locks, screens, wells, and shrubs affect entry likelihood.',
    risk: 'Forced entry, child safety',
    files: [],
  },
  {
    key: 'garage',
    label: 'Garage and vehicles',
    why: 'Garages often contain tools, remote access, and secondary interior doors.',
    risk: 'Burglary, vehicle theft',
    files: [],
  },
  {
    key: 'yard',
    label: 'Fence, gate, yard',
    why: 'Fences, gates, lighting, vegetation, and sightlines determine concealment and delay.',
    risk: 'Burglary, trespass, fire spread',
    files: [],
  },
  {
    key: 'devices',
    label: 'Security devices',
    why: 'Photos of cameras, alarms, panels, and smart locks help find coverage gaps and device risk.',
    risk: 'Burglary, privacy, smart-home exposure',
    files: [],
  },
];
