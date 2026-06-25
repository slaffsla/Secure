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

export type Recommendation = {
  id: string;
  title: string;
  domain: string;
  impact: 1 | 2 | 3 | 4 | 5;
  costBand: '$' | '$$' | '$$$' | '$$$$';
  effort: 'diy' | 'handyman' | 'locksmith' | 'electrician' | 'low-voltage-installer' | 'security-pro';
  summary: string;
  whyItMatters: string;
  cautions: string[];
};

export type Finding = {
  domain: string;
  title: string;
  severity: number;
  confidence: number;
  evidence: string;
  recommendationIds: string[];
};
