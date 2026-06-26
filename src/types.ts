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

export type FeatureSignalKey =
  | 'sliding_glass_door'
  | 'glass_near_lock'
  | 'dense_vegetation'
  | 'side_gate'
  | 'visible_camera'
  | 'motion_lighting'
  | 'garage_interior_door'
  | 'low_window'
  | 'package_drop_zone';

export type FeatureSignalDefinition = {
  key: FeatureSignalKey;
  label: string;
  evidenceCategory: EvidenceKey;
  domain: RiskDomain;
  riskHint: string;
};

export type SelectedFeatureSignal = {
  key: FeatureSignalKey;
  source: 'user' | 'ai' | 'human-reviewer';
  confidence: number;
};

export type EvidenceScore = {
  completion: number;
  confidence: number;
  missing: EvidenceSlot[];
};

export type EvidenceSource = 'user' | 'ai' | 'human-reviewer' | 'public-data' | 'rule';

export type EvidenceItem = {
  id: string;
  type: 'photo' | 'questionnaire' | 'address' | 'review-note';
  label: string;
  source: EvidenceSource;
  category?: EvidenceKey;
  detail: string;
};

export type ObservationKind =
  | 'evidence_slot_provided'
  | 'evidence_slot_missing'
  | 'feature_signal_observed'
  | 'address_context_provided'
  | 'address_context_missing'
  | 'security_control_reported'
  | 'security_control_not_reported'
  | 'buyer_mode'
  | 'concern_reported';

export type Observation = {
  id: string;
  kind: ObservationKind;
  label: string;
  confidence: number;
  source: EvidenceSource;
  evidenceIds: string[];
  metadata?: Record<string, string>;
};

export type RiskDomain = 'burglary' | 'forced-entry' | 'visibility' | 'surveillance' | 'smart-home' | 'buyer';

export type RiskFactor = {
  id: string;
  domain: RiskDomain;
  title: string;
  severity: number;
  likelihood: number;
  confidence: number;
  observationIds: string[];
  recommendationIds: string[];
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
  id: string;
  domain: string;
  title: string;
  severity: number;
  confidence: number;
  evidence: string;
  observationIds: string[];
  riskFactorIds: string[];
  recommendationIds: string[];
};

export type AssessmentModel = {
  evidenceItems: EvidenceItem[];
  observations: Observation[];
  riskFactors: RiskFactor[];
  findings: Finding[];
  insights: Insight[];
};

export type Insight = {
  id: string;
  label: string;
  value: string;
  detail: string;
};
