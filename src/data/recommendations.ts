import type { Recommendation } from '../types';

export const recommendations: Recommendation[] = [
  {
    id: 'rear-access-documentation',
    title: 'Document and harden rear access',
    domain: 'Burglary',
    impact: 5,
    costBand: '$',
    effort: 'diy',
    summary:
      'Photograph and inspect rear doors, gates, yard routes, and lighting before spending on extra cameras.',
    whyItMatters:
      'Rear access points often have less street visibility, fewer witnesses, and more concealment than the front approach.',
    cautions: ['Do not share exact rear-entry photos with vendors until you trust the workflow.'],
  },
  {
    id: 'reinforce-door-strikes',
    title: 'Reinforce exterior door strike plates',
    domain: 'Forced Entry',
    impact: 5,
    costBand: '$',
    effort: 'diy',
    summary:
      'Use reinforced strike plates and long screws on exterior doors after confirming frame condition.',
    whyItMatters:
      'Door-frame failure is often cheaper and faster to exploit than defeating the lock cylinder itself.',
    cautions: ['Weak or split frames may need a locksmith or carpenter instead of a simple hardware swap.'],
  },
  {
    id: 'secondary-door-locking',
    title: 'Add secondary locking where appropriate',
    domain: 'Forced Entry',
    impact: 4,
    costBand: '$$',
    effort: 'locksmith',
    summary:
      'Add secondary locks or door-specific reinforcement for vulnerable exterior, sliding, or glass-adjacent doors.',
    whyItMatters:
      'Layered locking increases delay and can reduce the value of quick forced-entry attempts.',
    cautions: ['Do not block required emergency egress or create unsafe exits for children or guests.'],
  },
  {
    id: 'targeted-motion-lighting',
    title: 'Install targeted motion lighting',
    domain: 'Visibility',
    impact: 4,
    costBand: '$$',
    effort: 'electrician',
    summary:
      'Cover approach paths, rear entries, garage zones, and side gates with controlled motion lighting.',
    whyItMatters:
      'Good lighting removes concealment and makes suspicious approach behavior easier to notice.',
    cautions: ['Avoid lighting that exposes private routines or shines into neighbors’ windows.'],
  },
  {
    id: 'camera-after-access-control',
    title: 'Place cameras after access-control fixes',
    domain: 'Surveillance',
    impact: 3,
    costBand: '$$',
    effort: 'low-voltage-installer',
    summary:
      'Prioritize cameras at entrances and package zones after locks, lighting, and access paths are addressed.',
    whyItMatters:
      'Cameras improve awareness and evidence, but they rarely compensate for easy physical entry.',
    cautions: ['Avoid broad coverage that captures private interior space or neighbors unnecessarily.'],
  },
  {
    id: 'device-inventory',
    title: 'Create a smart-device inventory',
    domain: 'Smart Home',
    impact: 3,
    costBand: '$',
    effort: 'diy',
    summary:
      'List device models, apps, account owners, update status, and whether default credentials were changed.',
    whyItMatters:
      'You cannot assess known vulnerabilities or ownership risk without knowing which devices exist.',
    cautions: ['Do not upload serial numbers or account screenshots until the app has hardened storage.'],
  },
  {
    id: 'post-closing-rekey',
    title: 'Rekey immediately after closing',
    domain: 'Pre-Purchase',
    impact: 5,
    costBand: '$$',
    effort: 'locksmith',
    summary:
      'Budget rekeying or lock replacement for move-in day so unknown key copies stop mattering.',
    whyItMatters:
      'Buyers rarely know how many keys exist or who has held them before closing.',
    cautions: ['Coordinate with property rules for condos, rentals, or shared-entry buildings.'],
  },
  {
    id: 'pre-move-security-budget',
    title: 'Set a pre-move security budget',
    domain: 'Pre-Purchase',
    impact: 4,
    costBand: '$$$',
    effort: 'security-pro',
    summary:
      'Reserve funds for immediate locks, lighting, garage controls, and privacy fixes before move-in.',
    whyItMatters:
      'The best time to patch obvious vulnerabilities is before routines, possessions, and occupancy patterns are visible.',
    cautions: ['Separate must-fix security items from nice-to-have automation purchases.'],
  },
];

export const recommendationById = new Map(
  recommendations.map((recommendation) => [recommendation.id, recommendation]),
);

export function getRecommendation(id: string) {
  return recommendationById.get(id);
}
