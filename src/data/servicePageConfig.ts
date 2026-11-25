import { services } from './services';

const washingMachineService = services.find((service) => service.slug === 'washing-machine-basement-flooding');
const laundryService = services.find((service) => service.slug === 'laundry-drains');

if (washingMachineService && laundryService) {
  laundryService.title = 'Laundry & Washing Machine Drains';
  laundryService.description = 'Washing machine drain backing up, overflowing, or flooding the basement? A-1 Drain Cleaning cleans and unclogs laundry and washing machine drain lines in Mason City and nearby communities.';
  laundryService.problems = [...new Set([...laundryService.problems, ...washingMachineService.problems])];
  laundryService.signs = [...new Set([...laundryService.signs, ...washingMachineService.signs])];
  laundryService.details = [...laundryService.details, ...washingMachineService.details.filter((detail) => !laundryService.details.includes(detail))];
  services.splice(services.indexOf(washingMachineService), 1);
}

export const servicePageTitles: Record<string, string> = {
  'kitchen-drains': 'Kitchen Drain Cleaning | A-1 Drain Cleaning',
  'bathroom-drain-cleaning': 'Bathroom Sink Drain Cleaning | A-1 Drain Cleaning',
  'shower-drain-cleaning': 'Shower Drain Cleaning | A-1 Drain Cleaning',
  'bathtub-drain-cleaning': 'Bathtub Drain Cleaning | A-1 Drain Cleaning',
  'basement-drain-cleaning': 'Basement Drain Cleaning | A-1 Drain Cleaning',
  'garage-drain-cleaning': 'Garage Drain Cleaning | A-1 Drain Cleaning',
  'utility-sink-drain-cleaning': 'Utility Sink Drain Cleaning | A-1 Drain Cleaning',
  'sewer-camera-inspection': 'Drain & Sewer Camera Inspections | A-1 Drain Cleaning',
  'sewer-line-locating': 'Sewer Line Locating | A-1 Drain Cleaning',
  'emergency-drain-cleaning': 'Emergency Drain Cleaning | A-1 Drain Cleaning',
  'basement-floor-drains': 'Floor Drain Cleaning | A-1 Drain Cleaning',
  'main-drain-cleaning': 'Main Drain Cleaning | A-1 Drain Cleaning',
  'sewer-line-cleaning': 'Sewer Line Cleaning | A-1 Drain Cleaning',
  'laundry-drains': 'Laundry/Washing Machine Drain Cleaning | A-1 Drain Cleaning',
  
  'tree-roots-in-sewer-line': 'Tree Root Removal and Cutting | A-1 Drain Cleaning',
  'hydro-jetting': 'Hydro Jetting | A-1 Drain Cleaning',
  'toilet-clogs': 'Toilet Unclogging | A-1 Drain Cleaning',
  'sewer-backup-emergency': 'Sewer Backup Emergency Service | A-1 Drain Cleaning',
  'sewer-backup-into-tub-shower': 'Sewer Backup in Tub or Shower | A-1 Drain Cleaning',
  'garbage-disposal': 'Garbage Disposal Repair and Installation | A-1 Drain Cleaning',
  'dishwasher-drain': 'Dishwasher Drain Service | A-1 Drain Cleaning',
  'sump-pumps': 'Sump Pump Repair | A-1 Drain Cleaning',
  'roof-drains': 'Roof Drain Cleaning | A-1 Drain Cleaning',
  'septic-lines': 'Septic Line Cleaning | A-1 Drain Cleaning',
  'storm-drain-cleaning': 'Storm Drain Cleaning | A-1 Drain Cleaning',
  'yard-drain-cleaning': 'Yard Drain Cleaning | A-1 Drain Cleaning',
};

export const servicePageDescriptions: Record<string, string> = {
  'kitchen-drains': 'Kitchen sink drain cleaning in Mason City and nearby communities. Garbage disposal and dishwasher drain work are separate services.',
  'bathroom-drain-cleaning': 'Bathroom sink drain cleaning in Mason City and nearby communities. Kitchen, shower, and bathtub drains are separate services.',
  'shower-drain-cleaning': 'Shower drain cleaning in Mason City and nearby communities. Bathroom sink and bathtub drains are separate services.',
  'bathtub-drain-cleaning': 'Bathtub drain cleaning in Mason City and nearby communities. Bathroom sink and shower drains are separate services.',
  'basement-drain-cleaning': 'Basement drain cleaning in Mason City and nearby communities. Separate from Floor Drain Cleaning.',
  'garage-drain-cleaning': 'Garage drain cleaning in Mason City and nearby communities.',
  'utility-sink-drain-cleaning': 'Utility sink drain cleaning in Mason City and nearby communities.',
  'sewer-camera-inspection': 'Drain and sewer camera inspections in Mason City and nearby communities to investigate recurring blockages and visible pipe conditions.',
  'sewer-line-locating': 'Sewer line locating in Mason City and nearby communities to help identify underground drain and sewer line routes.',
  'emergency-drain-cleaning': 'Emergency drain cleaning for clogged toilets, sinks, tubs, showers, laundry drains, and floor drains in Mason City and nearby communities. Call A-1 Drain Cleaning.',
  'basement-floor-drains': 'Basement floor drain backing up or sewage coming up through the drain? A-1 Drain Cleaning cleans and unclogs floor and main drains in nearby communities.',
  'main-drain-cleaning': 'Main drain line clogged or several drains backing up? A-1 Drain Cleaning cleans and unclogs house main drains in Mason City and nearby communities.',
  'sewer-line-cleaning': 'Main sewer pipe clogged or several fixtures backing up? A-1 Drain Cleaning cleans and unclogs residential sewer lines in nearby communities.',
  'laundry-drains': 'Washing machine drain backing up or water flooding the basement? A-1 Drain Cleaning cleans and unclogs laundry and washer drain lines in nearby communities.',
  
  'tree-roots-in-sewer-line': 'Tree roots blocking a sewer pipe or causing repeat backups? A-1 Drain Cleaning removes tree roots from sewer lines in Mason City and nearby communities.',
  'hydro-jetting': 'Need hydro jetting for buildup or a recurring sewer restriction? A-1 Drain Cleaning uses water jetting when the pipe and blockage are suitable.',
  'toilet-clogs': 'Toilet clogged, backing up, or bubbling when flushed? A-1 Drain Cleaning unclogs toilets and connected drains in Mason City and nearby communities.',
  'sewer-backup-emergency': 'Sewage coming up through a floor drain, tub, or toilet? A-1 Drain Cleaning provides emergency drain and sewer service in nearby communities.',
  'sewer-backup-into-tub-shower': 'Sewer backing up into a bathtub or shower? A-1 Drain Cleaning cleans and unclogs main drains and sewer lines in Mason City and nearby communities.',
  'garbage-disposal': 'Garbage disposal will not drain or the kitchen sink stays full? A-1 Drain Cleaning handles disposal and related drain problems in nearby communities.',
  'dishwasher-drain': 'Dishwasher not draining or backing up into the kitchen sink? A-1 Drain Cleaning handles the drain side of dishwasher backup problems.',
  'sump-pumps': 'Sump pump stopped or not keeping up with basement water? A-1 Drain Cleaning repairs, replaces, and installs sump pumps in nearby communities.',
  'roof-drains': 'Roof drain blocked or not carrying rainwater away? A-1 Drain Cleaning provides roof drain cleaning in Mason City and nearby communities.',
  'septic-lines': 'Septic line cleaning in Mason City and nearby communities for a blocked house drain line leading to a septic system.',
  'storm-drain-cleaning': 'Storm drain cleaning in Mason City and nearby communities for accessible drains blocked by leaves, sediment, or debris.',
  'yard-drain-cleaning': 'Yard drain cleaning in Mason City and nearby communities for accessible drains blocked by leaves, soil, or debris.',
};

const serviceDetailAdditions: Record<string, string[]> = {
  'basement-floor-drains': [
    'People describe this problem in different ways: a basement floor drain clogged, a basement floor drain backing up, water coming up through the basement floor drain, or sewage coming up the basement drain. The important clue is what else happens when water is used. If the floor drain overflows when the washer drains, the washer may be exposing a restriction farther down the line rather than causing the blockage itself.',
  ],
  'main-drain-cleaning': [
    'A main drain problem can show up as a house drain line backup or all drains backing up in the house. If the sink, toilet, and tub are backed up together, the restriction is more likely to be in a shared drain or main line than in one fixture. A main drain cleanout can provide access to the line, but its location and condition vary by property.',
  ],
  'sewer-line-cleaning': [
    'A sewer line overflow can look like a basement drain backing up, a sewer backup in the house, or several fixtures losing drainage at once. When a main sewer pipe is clogged, wastewater may return through the lowest available fixture. The affected fixtures and timing help narrow the problem, while the actual blockage location depends on the property drain layout.',
  ],
  'laundry-drains': [
    'A washing machine drain backing up can send water into the kitchen sink, bathtub, shower, toilet, standpipe, or basement floor drain depending on how the house is piped. If water comes up the sink when the washing machine is on, or the washer backs up into another fixture, the washer may be exposing a restriction in a shared or downstream drain line rather than having a problem with the appliance itself.',
  ],
};

for (const [slug, additions] of Object.entries(serviceDetailAdditions)) {
  const service = services.find((item) => item.slug === slug);
  if (service) {
    service.details = [...service.details, ...additions.filter((detail) => !service.details.includes(detail))];
  }
}

export const relatedServiceSlugs: Record<string, string[]> = {
  'sewer-camera-inspection': ['sewer-line-cleaning', 'tree-roots-in-sewer-line'],
  'sewer-line-locating': ['sewer-camera-inspection', 'sewer-line-cleaning'],
  'emergency-drain-cleaning': ['toilet-clogs', 'kitchen-drains', 'bathroom-drain-cleaning', 'shower-drain-cleaning', 'bathtub-drain-cleaning', 'basement-floor-drains', 'sewer-backup-emergency'],
  'main-drain-cleaning': ['sewer-line-cleaning', 'basement-floor-drains', 'sewer-backup-emergency'],
  'sewer-line-cleaning': ['main-drain-cleaning', 'tree-roots-in-sewer-line', 'basement-floor-drains'],
  'tree-roots-in-sewer-line': ['sewer-line-cleaning', 'main-drain-cleaning'],
  'hydro-jetting': ['main-drain-cleaning', 'sewer-line-cleaning'],
  'basement-floor-drains': ['main-drain-cleaning', 'sewer-line-cleaning', 'laundry-drains', 'sewer-backup-emergency'],
  'laundry-drains': ['basement-floor-drains', 'main-drain-cleaning', 'sewer-line-cleaning'],
  'sewer-backup-emergency': ['main-drain-cleaning', 'sewer-line-cleaning', 'basement-floor-drains'],
  'sewer-backup-into-tub-shower': ['main-drain-cleaning', 'sewer-line-cleaning', 'basement-floor-drains', 'laundry-drains', 'sewer-backup-emergency'],
  'toilet-clogs': ['main-drain-cleaning', 'sewer-line-cleaning', 'basement-floor-drains'],
  'septic-lines': ['main-drain-cleaning', 'sewer-line-cleaning', 'sewer-backup-emergency'],
  'garbage-disposal': ['kitchen-drains', 'main-drain-cleaning'],
  'dishwasher-drain': ['kitchen-drains', 'garbage-disposal', 'main-drain-cleaning'],
  'sump-pumps': ['basement-drain-cleaning', 'basement-floor-drains'],
  'kitchen-drains': ['garbage-disposal', 'dishwasher-drain', 'main-drain-cleaning'],
  'bathroom-drain-cleaning': ['shower-drain-cleaning', 'bathtub-drain-cleaning', 'toilet-clogs'],
  'shower-drain-cleaning': ['bathroom-drain-cleaning', 'bathtub-drain-cleaning', 'sewer-backup-into-tub-shower'],
  'bathtub-drain-cleaning': ['shower-drain-cleaning', 'bathroom-drain-cleaning', 'sewer-backup-into-tub-shower'],
  'basement-drain-cleaning': ['basement-floor-drains', 'sump-pumps', 'main-drain-cleaning'],
  'garage-drain-cleaning': ['yard-drain-cleaning', 'storm-drain-cleaning'],
  'utility-sink-drain-cleaning': ['laundry-drains', 'main-drain-cleaning'],
  'roof-drains': ['storm-drain-cleaning', 'yard-drain-cleaning'],
  'storm-drain-cleaning': ['roof-drains', 'yard-drain-cleaning'],
  'yard-drain-cleaning': ['storm-drain-cleaning', 'roof-drains'],
};

// Floor-drain content belongs on the dedicated floor-drain page and the specialized service sections.
// Do not inject a repeated floor-drain block into unrelated service pages.
export const floorDrainClusterSlugs: string[] = [];

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
];
