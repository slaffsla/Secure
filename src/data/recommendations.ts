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
  {
    id: 'trim-concealment-vegetation',
    title: 'Trim concealment near access points',
    domain: 'Visibility',
    impact: 4,
    costBand: '$',
    effort: 'diy',
    summary:
      'Reduce shrubs or overgrowth that hide windows, side paths, doors, or fence transitions.',
    whyItMatters:
      'Concealment lowers the perceived risk of being seen while someone tests access points.',
    cautions: ['Preserve privacy intentionally; the goal is controlled visibility, not full exposure.'],
  },
  {
    id: 'secure-side-gate',
    title: 'Secure and audit side gate access',
    domain: 'Burglary',
    impact: 4,
    costBand: '$$',
    effort: 'handyman',
    summary:
      'Check side gates for latch quality, visibility, climbability, and whether they can be opened from outside.',
    whyItMatters:
      'Side access can let someone move from public view to rear or window access with little friction.',
    cautions: ['Gate locks must still allow safe emergency exit where required.'],
  },
  {
    id: 'sliding-door-anti-lift',
    title: 'Check sliding-door anti-lift protection',
    domain: 'Forced Entry',
    impact: 5,
    costBand: '$',
    effort: 'diy',
    summary:
      'Verify the sliding door cannot be lifted out of its track and add an appropriate bar or secondary lock.',
    whyItMatters:
      'Sliding doors can be vulnerable even when their visible latch appears locked.',
    cautions: ['Do not install a blocker that prevents fast exit in an emergency.'],
  },
  {
    id: 'garage-house-door-harden',
    title: 'Harden garage-to-house entry',
    domain: 'Forced Entry',
    impact: 4,
    costBand: '$$',
    effort: 'locksmith',
    summary:
      'Treat the interior garage door like an exterior door: quality deadbolt, reinforced strike, and door sensor.',
    whyItMatters:
      'If the garage is compromised, the interior door becomes the next meaningful barrier.',
    cautions: ['Check fire-rating and local code before replacing garage-entry hardware or doors.'],
  },
  {
    id: 'low-window-locks-sensors',
    title: 'Prioritize low-window locks and sensors',
    domain: 'Forced Entry',
    impact: 4,
    costBand: '$$',
    effort: 'diy',
    summary:
      'Check low/easy-reach windows for working locks, secondary stops, and alarm contacts where appropriate.',
    whyItMatters:
      'Accessible windows can change the entry-risk picture even when doors are well protected.',
    cautions: ['Bedroom egress windows must remain usable for emergency escape.'],
  },
  {
    id: 'package-zone-control',
    title: 'Reduce package-zone exposure',
    domain: 'Burglary',
    impact: 3,
    costBand: '$',
    effort: 'diy',
    summary:
      'Move deliveries out of direct view, add delivery instructions, or use a lockbox where package theft is likely.',
    whyItMatters:
      'Visible packages can attract opportunistic theft and reveal occupancy routines.',
    cautions: ['Do not create a hiding place that also obscures someone approaching the front door.'],
  },
  //Retail-specific recommendations
  {
    id: 'retail-roller-shutters',
    title: 'Install or repair roller shutters on shopfront',
    domain: 'Forced Entry',
    impact: 5,
    costBand: '$$',
    effort: 'handyman',
    summary: 'High-quality roller shutters significantly increase time-to-breach for smash-and-grab attacks.',
    whyItMatters: 'Glass shopfronts are the most common entry point for retail burglary at night.',
    cautions: ['Ensure compliance with fire egress codes and insurance requirements.'],
  },
  {
    id: 'retail-visible-high-value-stock',
    title: 'Reduce visibility of high-value stock from street',
    domain: 'Burglary',
    impact: 4,
    costBand: '$',
    effort: 'diy',
    summary: 'Move premium items away from windows or use window film / interior displays.',
    whyItMatters: 'Visible expensive goods dramatically increase payoff perception for opportunistic thieves.',
    cautions: ['Maintain attractive merchandising for legitimate customers.'],
  },
  {
    id: 'retail-after-hours-alarm-response',
    title: 'Verify rapid police response to after-hours alarm',
    domain: 'Burglary',
    impact: 5,
    costBand: '$$',
    effort: 'security-pro',
    summary: 'Test monitored alarm system and response time, especially during holidays.',
    whyItMatters: 'Retail stock theft often happens quickly once entry is gained.',
    cautions: ['False alarms can lead to fines — ensure system is reliable.'],
  },
  {
    id: 'retail-stockroom-security',
    title: 'Harden stockroom and internal access',
    domain: 'Burglary',
    impact: 4,
    costBand: '$$',
    effort: 'locksmith',
    summary: 'Treat stockroom door like an exterior door with deadbolt and alarm contact.',
    whyItMatters: 'Once inside the shop, thieves head straight for the high-value storage area.',
    cautions: ['Balance with staff access needs during business hours.'],
  },
];

export const recommendationById = new Map(
  recommendations.map((recommendation) => [recommendation.id, recommendation]),
);

export function getRecommendation(id: string) {
  return recommendationById.get(id);
}
