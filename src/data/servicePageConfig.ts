export const servicePageTitles: Record<string, string> = {
  'washing-machine-basement-flooding': 'Washing Machine Drain Backup | A-1 Drain Cleaning',
  'laundry-drains': 'Laundry Drain Cleaning | A-1 Drain Cleaning',
};

export const servicePageDescriptions: Record<string, string> = {
  'washing-machine-basement-flooding': 'Washing machine draining and flooding the basement? A-1 Drain Cleaning clears backed-up drain lines in Mason City and North Iowa. Call 641-530-2728.',
  'laundry-drains': 'Washing machine drain overflowing or laundry standpipe backing up? A-1 Drain Cleaning clears laundry drains in Mason City and North Iowa. Call 641-530-2728.',
};

export const relatedServiceSlugs: Record<string, string[]> = {
  'main-drain-cleaning': ['sewer-line-cleaning', 'basement-floor-drains', 'sewer-backup-emergency'],
  'sewer-line-cleaning': ['main-drain-cleaning', 'tree-roots-in-sewer-line', 'basement-floor-drains'],
  'tree-roots-in-sewer-line': ['sewer-line-cleaning', 'main-drain-cleaning', 'drain-repair'],
  'hydro-jetting': ['main-drain-cleaning', 'sewer-line-cleaning', 'drain-repair'],
  'basement-floor-drains': ['main-drain-cleaning', 'sewer-line-cleaning', 'washing-machine-basement-flooding', 'laundry-drains', 'sewer-backup-emergency'],
  'washing-machine-basement-flooding': ['basement-floor-drains', 'laundry-drains', 'main-drain-cleaning'],
  'laundry-drains': ['washing-machine-basement-flooding', 'basement-floor-drains', 'main-drain-cleaning'],
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
  'washing-machine-basement-flooding',
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
