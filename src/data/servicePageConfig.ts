import { services } from './services';

const washingMachineService = services.find((service) => service.slug === 'washing-machine-basement-flooding');
const laundryService = services.find((service) => service.slug === 'laundry-drains');

if (washingMachineService && laundryService) {
  laundryService.title = 'Laundry & Washing Machine Drains';
  laundryService.description = 'Washing machine drain backing up, overflowing, or flooding the basement? A-1 Drain Cleaning clears laundry and washing machine drain lines in Mason City and North Iowa.';
  laundryService.problems = [...new Set([...laundryService.problems, ...washingMachineService.problems])];
  laundryService.signs = [...new Set([...laundryService.signs, ...washingMachineService.signs])];
  laundryService.details = [...laundryService.details, ...washingMachineService.details.filter((detail) => !laundryService.details.includes(detail))];
  services.splice(services.indexOf(washingMachineService), 1);
}

export const servicePageTitles: Record<string, string> = {
  'laundry-drains': 'Laundry & Washing Machine Drain Problems | A-1 Drain Cleaning',
};

export const servicePageDescriptions: Record<string, string> = {
  'laundry-drains': 'Washing machine drain backing up, overflowing, or flooding the basement? A-1 Drain Cleaning clears laundry and washing machine drain lines in Mason City and North Iowa. Call 641-530-2728.',
};

export const relatedServiceSlugs: Record<string, string[]> = {
  'main-drain-cleaning': ['sewer-line-cleaning', 'basement-floor-drains', 'sewer-backup-emergency'],
  'sewer-line-cleaning': ['main-drain-cleaning', 'tree-roots-in-sewer-line', 'basement-floor-drains'],
  'tree-roots-in-sewer-line': ['sewer-line-cleaning', 'main-drain-cleaning', 'drain-repair'],
  'hydro-jetting': ['main-drain-cleaning', 'sewer-line-cleaning', 'drain-repair'],
  'basement-floor-drains': ['main-drain-cleaning', 'sewer-line-cleaning', 'laundry-drains', 'sewer-backup-emergency'],
  'laundry-drains': ['basement-floor-drains', 'main-drain-cleaning', 'sewer-line-cleaning'],
  'sewer-backup-emergency': ['main-drain-cleaning', 'sewer-line-cleaning', 'basement-floor-drains'],
  'sewer-backup-into-tub-shower': ['main-drain-cleaning', 'sewer-line-cleaning', 'basement-floor-drains', 'laundry-drains', 'sewer-backup-emergency'],
  'toilet-clogs': ['main-drain-cleaning', 'sewer-line-cleaning', 'basement-floor-drains'],
  'kitchen-bathroom-drains': ['main-drain-cleaning', 'toilet-clogs', 'laundry-drains'],
  'drain-repair': ['sewer-line-cleaning', 'tree-roots-in-sewer-line', 'hydro-jetting'],
  'septic-lines': ['main-drain-cleaning', 'sewer-line-cleaning', 'sewer-backup-emergency'],
  'roof-vent-drains': ['kitchen-bathroom-drains', 'toilet-clogs', 'main-drain-cleaning'],
  'garbage-disposal': ['kitchen-bathroom-drains', 'drain-repair', 'main-drain-cleaning'],
  'dishwasher-drain': ['kitchen-bathroom-drains', 'garbage-disposal', 'main-drain-cleaning'],
  'sump-pumps': ['sewer-backup-emergency', 'basement-floor-drains'],
};

export const floorDrainClusterSlugs = [
  'main-drain-cleaning',
  'sewer-line-cleaning',
  'laundry-drains',
  'sewer-backup-emergency',
  'sewer-backup-into-tub-shower',
] as const;

export const featuredServiceCitySlugs = [
  'mason-city',
  'clear-lake',
  'charles-city',
  'forest-city',
  'garner',
  'northwood',
  'nora-springs',
  'rockwell',
  'hampton',
  'greene',
] as const;
