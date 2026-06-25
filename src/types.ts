export type PropertyMode = 'buyer' | 'owner';

export type PropertyType = 'single-family' | 'townhouse' | 'condo' | 'multi-family' | '';

export type Concern =
  | 'burglary'
  | 'personal-safety'
  | 'fire'
  | 'privacy'
  | 'smart-home'
  | 'storm'
  | 'unknown';

export type Budget = 'under-250' | '250-1000' | '1000-5000' | '5000-plus' | 'unknown';

export type EvidenceKey =
  | 'front'
  | 'rear'
  | 'side'
  | 'doors'
  | 'windows'
  | 'garage'
  | 'yard'
  | 'devices';

export type Intake = {
  mode: PropertyMode;
  propertyType: PropertyType;
  addressKnown: boolean;
  occupants: string;
  existingSecurity: string[];
  concerns: Concern[];
  budget: Budget;
  humanReview: boolean;
};

export type EvidenceSlot = {
  key: EvidenceKey;
  label: string;
  why: string;
  risk: string;
  files: File[];
};

export type EvidenceScore = {
  completion: number;
  confidence: number;
  missing: EvidenceSlot[];
};

export type Finding = {
  domain: string;
  title: string;
  severity: number;
  confidence: number;
  evidence: string;
  recommendation: string;
  cost: string;
  effort: string;
};
