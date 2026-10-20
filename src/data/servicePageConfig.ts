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

const bathroomDrainService = services.find((service) => service.slug === 'kitchen-bathroom-drains');
if (bathroomDrainService) {
  bathroomDrainService.title = 'Bathroom, Shower & Tub Drains';
  bathroomDrainService.description = 'Bathroom sink, shower, and bathtub drains that are slow, clogged, or backing up. A-1 Drain Cleaning clears bathroom drain problems in Mason City and North Iowa.';
  bathroomDrainService.problems = bathroomDrainService.problems.filter((problem) => !problem.toLowerCase().includes('kitchen'));
  bathroomDrainService.details = bathroomDrainService.details.filter((detail) => !detail.startsWith('Kitchen drains commonly') && !detail.startsWith('A-1 Drain Cleaning clears kitchen and bathroom drain blockages'));
}

export const servicePageTitles: Record<string, string> = {
  'basement-floor-drains': 'Basement Floor Drain Backups | A-1 Drain Cleaning',
  'main-drain-cleaning': 'Main Drain Cleaning | A-1 Drain Cleaning',
  'sewer-line-cleaning': 'Sewer Line Cleaning | A-1 Drain Cleaning',
  'laundry-drains': 'Laundry & Washing Machine Drains | A-1 Drain Cleaning',
  'kitchen-bathroom-drains': 'Bathroom, Shower & Tub Drain Cleaning | A-1 Drain Cleaning',
  'tree-roots-in-sewer-line': 'Tree Roots in Sewer Lines | A-1 Drain Cleaning',
  'hydro-jetting': 'Hydro Jetting | A-1 Drain Cleaning',
  'toilet-clogs': 'Toilet Clogs & Drain Problems | A-1 Drain Cleaning',
  'sewer-backup-emergency': 'Sewer Backup Emergency Service | A-1 Drain Cleaning',
  'sewer-backup-into-tub-shower': 'Sewer Backup in Tub or Shower | A-1 Drain Cleaning',
  'drain-repair': 'Drain Repair | A-1 Drain Cleaning',
  'garbage-disposal': 'Garbage Disposal Drain Problems | A-1 Drain Cleaning',
  'dishwasher-drain': 'Dishwasher Drain Problems | A-1 Drain Cleaning',
  'sump-pumps': 'Sump Pump Service | A-1 Drain Cleaning',
  'roof-vent-drains': 'Plumbing Vent Drain Problems | A-1 Drain Cleaning',
  'septic-lines': 'Septic Drain Line Cleaning | A-1 Drain Cleaning',
};

export const servicePageDescriptions: Record<string, string> = {
  'basement-floor-drains': 'Basement floor drain backing up or sewage coming up through the drain? A-1 Drain Cleaning clears floor and main drain blockages in North Iowa.',
  'main-drain-cleaning': 'Main drain clogged or several drains backing up? A-1 Drain Cleaning clears main drain blockages in Mason City and North Iowa.',
  'sewer-line-cleaning': 'Main sewer pipe clogged or several fixtures backing up? A-1 Drain Cleaning clears residential sewer line blockages in North Iowa.',
  'laundry-drains': 'Washing machine drain backing up or water flooding the basement? A-1 Drain Cleaning clears laundry and washer drain lines in North Iowa.',
  'kitchen-bathroom-drains': 'Bathroom sink, shower, or bathtub drain clogged, slow, or backing up? A-1 Drain Cleaning clears bathroom drain problems in Mason City and North Iowa.',
  'tree-roots-in-sewer-line': 'Tree roots blocking a sewer pipe or causing repeat backups? A-1 Drain Cleaning cuts roots from sewer lines in Mason City and North Iowa.',
  'hydro-jetting': 'Need hydro jetting for buildup or a recurring sewer restriction? A-1 Drain Cleaning uses water jetting when the pipe and blockage are suitable.',
  'toilet-clogs': 'Toilet clogged, backing up, or bubbling when flushed? A-1 Drain Cleaning clears toilet and connected drain problems in Mason City and North Iowa.',
  'sewer-backup-emergency': 'Sewage coming up through a floor drain, tub, or toilet? A-1 Drain Cleaning provides emergency drain and sewer service in North Iowa.',
  'sewer-backup-into-tub-shower': 'Sewer backing up into a bathtub or shower? A-1 Drain Cleaning clears main drain and sewer line blockages in Mason City and North Iowa.',
  'drain-repair': 'Recurring drain backups or suspected pipe damage? A-1 Drain Cleaning can inspect the line and determine when cleaning is not enough.',
  'garbage-disposal': 'Garbage disposal will not drain or the kitchen sink stays full? A-1 Drain Cleaning handles disposal and related drain problems in North Iowa.',
  'dishwasher-drain': 'Dishwasher not draining or backing up into the kitchen sink? A-1 Drain Cleaning handles the drain side of dishwasher backup problems.',
  'sump-pumps': 'Sump pump stopped or not keeping up with basement water? A-1 Drain Cleaning repairs, replaces, and installs sump pumps in North Iowa.',
  'roof-vent-drains': 'Drains gurgling or behaving oddly with no clear clog? A-1 Drain Cleaning can help determine whether a plumbing vent is involved.',
  'septic-lines': 'House drain line to a septic system backing up? A-1 Drain Cleaning clears blocked septic-side drain lines in Mason City and North Iowa.',
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
    'bathroom sink is backing up',
    'bathroom sink is slow to drain',
    'my shower will not drain',
    'my shower drain is backing up',
    'bathtub drain clogged',
    'tub drain backing up',
  ],
};

const serviceDetailAdditions: Record<string, string[]> = {
  'basement-floor-drains': [
    'People describe this problem in different ways: a basement floor drain clogged, a basement floor drain backing up, water coming up through the basement floor drain, or sewage coming up the basement drain. The important clue is what else happens when water is used. If the floor drain overflows when the washer drains, the washer may be exposing a restriction farther down the line rather than causing the blockage itself.',
  ],
  'main-drain-cleaning': [
    'A main drain problem can show up as a main sewer pipe clogged, a house drain line backup, or all drains backing up in the house. If the sink, toilet, and tub are backed up together, the restriction is more likely to be in a shared drain or main line than in one fixture. A sewer clean out can provide access to the line, but its location and condition vary by property.',
  ],
  'sewer-line-cleaning': [
    'A sewer line overflow can look like a basement drain backing up, a sewer backup in the house, or several fixtures losing drainage at once. When a main sewer pipe is clogged, wastewater may return through the lowest available fixture. The affected fixtures and timing help narrow the problem, while the actual blockage location depends on the property drain layout.',
  ],
  'laundry-drains': [
    'A washing machine drain backing up can send water into the kitchen sink, bathtub, shower, toilet, standpipe, or basement floor drain depending on how the house is piped. If water comes up the sink when the washing machine is on, or the washer backs up into another fixture, the washer may be exposing a restriction in a shared or downstream drain line rather than having a problem with the appliance itself.',
  ],
  'kitchen-bathroom-drains': [
    'Bathroom drain problems can start with a slow sink and progress to a complete backup. A bathroom sink that is backing up, a shower that will not drain, or a shower drain that is backing up can point to a branch-drain problem. When a bathtub backs up while another fixture drains, the problem may be farther down a shared line.',
  ],
};

for (const [slug, phrases] of Object.entries(serviceKeywordPhrases)) {
  const service = services.find((item) => item.slug === slug);
  if (service) {
    service.problems = [...new Set([...service.problems, ...phrases])];
  }
}

for (const [slug, additions] of Object.entries(serviceDetailAdditions)) {
  const service = services.find((item) => item.slug === slug);
  if (service) {
    service.details = [...service.details, ...additions.filter((detail) => !service.details.includes(detail))];
  }
}

export const relatedServiceSlugs: Record<string, string[]> = {
  'main-drain-cleaning': ['sewer-line-cleaning', 'basement-floor-drains', 'sewer-backup-emergency'],
  'sewer-line-cleaning': ['main-drain-cleaning', 'tree-roots-in-sewer-line', 'basement-floor-drains'],
  'tree-roots-in-sewer-line': ['sewer-line-cleaning', 'main-drain-cleaning'],
  'hydro-jetting': ['main-drain-cleaning', 'sewer-line-cleaning'],
  'basement-floor-drains': ['main-drain-cleaning', 'sewer-line-cleaning', 'laundry-drains', 'sewer-backup-emergency'],
  'laundry-drains': ['basement-floor-drains', 'main-drain-cleaning', 'sewer-line-cleaning'],
  'sewer-backup-emergency': ['main-drain-cleaning', 'sewer-line-cleaning', 'basement-floor-drains'],
  'sewer-backup-into-tub-shower': ['main-drain-cleaning', 'sewer-line-cleaning', 'basement-floor-drains', 'laundry-drains', 'sewer-backup-emergency'],
  'toilet-clogs': ['main-drain-cleaning', 'sewer-line-cleaning', 'basement-floor-drains'],
  'kitchen-bathroom-drains': ['main-drain-cleaning', 'toilet-clogs', 'laundry-drains'],
  'drain-repair': ['sewer-line-cleaning', 'tree-roots-in-sewer-line', 'hydro-jetting'],
  'septic-lines': ['main-drain-cleaning', 'sewer-line-cleaning', 'sewer-backup-emergency'],
  'roof-vent-drains': ['kitchen-bathroom-drains', 'toilet-clogs', 'main-drain-cleaning'],
  'garbage-disposal': ['kitchen-bathroom-drains', 'main-drain-cleaning'],
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
