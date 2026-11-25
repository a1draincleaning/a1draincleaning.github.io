export type SchemaService = {
  slug: string;
  name: string;
  description: string;
  alternateName?: string[];
  pageSlug?: string;
};

/**
 * Canonical services confirmed by the business service inventory.
 * Similar search phrases are alternate names on one Service entity, not duplicate entities.
 * pageSlug is present only when the matching page already exists.
 */
export const schemaServices: SchemaService[] = [
  { slug: 'drain-cleaning', name: 'Drain Cleaning', description: 'Cleaning and unclogging household drain lines to restore drainage.', pageSlug: 'drain-cleaning' },
  { slug: 'main-drain-cleaning', name: 'Main Drain Cleaning', description: 'Cleaning a blocked main drain that carries wastewater away from the home.', pageSlug: 'main-drain-cleaning' },
  { slug: 'sewer-line-cleaning', name: 'Sewer Line Cleaning', description: 'Cleaning blocked residential sewer lines to restore wastewater flow.', pageSlug: 'sewer-line-cleaning' },
  { slug: 'emergency-drain-cleaning', name: 'Emergency Drain Cleaning', description: 'Emergency cleaning for stopped or backed-up household drains.', pageSlug: 'emergency-drain-cleaning' },
  { slug: 'floor-drain-cleaning', name: 'Floor Drain Cleaning', description: 'Cleaning blocked or backed-up floor drains, including basement floor drains.', alternateName: ['Basement Floor Drain Cleaning'], pageSlug: 'basement-floor-drains' },
  { slug: 'bathroom-shower-drain-cleaning', name: 'Bathroom and Shower Drain Cleaning', description: 'Cleaning bathroom sink, bathtub, and shower drains.', alternateName: ['Bathroom Drain Cleaning', 'Shower Drain Cleaning'], pageSlug: 'bathroom-shower-drains' },
  { slug: 'toilet-unclogging', name: 'Toilet Unclogging', description: 'Clearing clogged toilet drains and related drain blockages.', pageSlug: 'toilet-clogs' },
  { slug: 'kitchen-sink-drain-cleaning', name: 'Kitchen Sink Drain Cleaning', description: 'Cleaning and unclogging kitchen sink drains.', alternateName: ['Clogged Kitchen Sink Drain Cleaning'], pageSlug: 'kitchen-drains' },
  { slug: 'slow-sink-drain-cleaning', name: 'Slow Sink Drain Cleaning', description: 'Cleaning sink drains that drain slowly or have become blocked.' },
  { slug: 'laundry-drain-cleaning', name: 'Washing Machine and Laundry Drain Cleaning', description: 'Cleaning and unclogging washing-machine and laundry drain lines.', alternateName: ['Washing Machine Drain Cleaning'], pageSlug: 'laundry-drains' },
  { slug: 'garage-floor-drain-cleaning', name: 'Garage Floor Drain Cleaning', description: 'Cleaning blocked garage floor drains.' },
  { slug: 'outside-drain-cleaning', name: 'Outside Drain Cleaning', description: 'Cleaning blocked exterior drains.' },
  { slug: 'storm-drain-cleaning', name: 'Storm Drain Cleaning', description: 'Cleaning blocked storm drains.' },
  { slug: 'yard-drain-cleaning', name: 'Yard Drain Cleaning', description: 'Cleaning blocked yard drains.' },
  { slug: 'dishwasher-drain-unclogging', name: 'Dishwasher Drain Unclogging', description: 'Clearing drain-side blockages that prevent a dishwasher from draining.', pageSlug: 'dishwasher-drain' },
  { slug: 'tree-root-removal-from-sewer-lines', name: 'Tree root removal from sewer lines', description: 'Removing tree roots that have entered and are blocking a sewer line.', pageSlug: 'tree-roots-in-sewer-line' },
  { slug: 'hydro-jetting', name: 'Hydro Jetting', description: 'Cleaning suitable drain and sewer lines with pressurized water.', pageSlug: 'hydro-jetting' },
  { slug: 'sewer-camera-inspections', name: 'Sewer Camera Inspections', description: 'Inspecting accessible drain and sewer lines with a camera to view visible pipe conditions.', pageSlug: 'sewer-camera-inspection' },
  { slug: 'smoke-testing', name: 'Smoke Testing', description: 'Smoke testing of drain and sewer systems to help identify openings or suspected defects.', pageSlug: 'smoke-testing' },
  { slug: 'sewer-backup-clearing', name: 'Sewer Backup Clearing', description: 'Clearing sewer blockages that cause wastewater to back up into a building.', alternateName: ['Emergency Sewer Backup Service'], pageSlug: 'sewer-backup-emergency' },
];
