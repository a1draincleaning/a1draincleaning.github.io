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
  'basement-floor-drains': 'Basement Floor Drain Backups | A-1 Drain Cleaning',
  'main-drain-cleaning': 'Main Drain Cleaning | A-1 Drain Cleaning',
  'sewer-line-cleaning': 'Sewer Line Cleaning | A-1 Drain Cleaning',
  'laundry-drains': 'Laundry & Washing Machine Drain Problems | A-1 Drain Cleaning',
  'kitchen-bathroom-drains': 'Kitchen & Bathroom Drain Cleaning | A-1 Drain Cleaning',
};

export const servicePageDescriptions: Record<string, string> = {
  'basement-floor-drains': 'Basement floor drain backing up, sewage coming up through the floor drain, or water rising when the washer runs? A-1 Drain Cleaning clears floor and main drain blockages in Mason City and North Iowa.',
  'main-drain-cleaning': 'Main drain clogged, several drains backing up, or water coming up through a basement floor drain? A-1 Drain Cleaning clears main drain blockages in Mason City and North Iowa.',
  'sewer-line-cleaning': 'Main sewer pipe clogged, sewer line backing up, or several fixtures affected? A-1 Drain Cleaning clears residential sewer line blockages in Mason City and North Iowa.',
  'laundry-drains': 'Washing machine drain backing up, washer backing up into a sink or tub, or laundry water flooding the basement? A-1 Drain Cleaning clears laundry and washing machine drain lines in Mason City and North Iowa.',
  'kitchen-bathroom-drains': 'Kitchen sink will not drain, bathroom sink is slow, or a shower or tub is backing up? A-1 Drain Cleaning clears kitchen and bathroom drain problems in Mason City and North Iowa.',
};

export const serviceKeywordPhrases: Record<string, string[]> = {
  'basement-floor-drains': [
    'basement floor drain clogged',
    'basement floor drain backing up',
    'water coming up through basement floor drain',
    'sewage coming up basement drain',
    'water coming up through drain in basement',
    'floor drain overflows when washer drains',
    'roots in basement floor drain',
  ],
  'main-drain-cleaning': [
    'main sewer pipe clogged',
    'main drain line',
    'house drain line',
    'all drains backing up in house',
    'sink toilet and tub backed up',
    'sewer clean out drain',
    'drain line backup',
  ],
  'sewer-line-cleaning': [
    'main sewer pipe',
    'sewer line overflow',
    'sewer is backing up in the house',
    'blockage in sewer pipe',
    'residential sewer line',
    'wastewater line',
    'sewer and drain backup',
  ],
  'laundry-drains': [
    'washing machine drain backing up',
    'washing machine water coming up kitchen sink',
    'washer backing up into kitchen sink',
    'water coming up sink when washing machine on',
    'washing machine water backing up into shower',
    'washing machine backing up into toilet',
    'laundry drain blocked',
  ],
  'kitchen-bathroom-drains': [
    'kitchen drain line',
    'cleaning the kitchen drain',
    'my kitchen sink will not drain',
    'kitchen sink drain is clogged',
    'bathroom sink is backing up',
    'bathroom sink is slow to drain',
    'my shower will not drain',
    'my shower drain is backing up',
    'tub backs up when washing machine drains',
  ],
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
