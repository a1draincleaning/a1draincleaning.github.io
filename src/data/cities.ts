export interface CityData {
  cityName: string;
  county: string;
  slug: string;
  state: 'IA';
  isCountySeat: boolean;
  localContext: string;
  regionalAccess: string;
  adjacentTowns: string[];
  commonIssues: string[];
}

export const citiesData: CityData[] = [
  {
    cityName: 'Mason City',
    county: 'Cerro Gordo',
    slug: 'mason-city-ia',
    state: 'IA',
    isCountySeat: true,
    localContext: 'Established neighborhoods, older homes, and multi-family housing throughout the city.',
    regionalAccess: 'US 18 and US 65 connect Mason City with surrounding North Iowa communities.',
    adjacentTowns: ['Nora Springs', 'Rock Falls', 'Portland', 'Emery'],
    commonIssues: ['basement floor drain backups', 'main sewer line clogs', 'tree root intrusion', 'slow or stopped-up drains'],
  },
  {
    cityName: 'Clear Lake',
    county: 'Cerro Gordo',
    slug: 'clear-lake-ia',
    state: 'IA',
    isCountySeat: false,
    localContext: 'Residential neighborhoods, lake-area homes, subdivisions, and seasonal properties.',
    regionalAccess: 'I-35 and Highway 18 provide direct access to Clear Lake and nearby communities.',
    adjacentTowns: ['Ventura', 'Burchinal', 'Miller'],
    commonIssues: ['main drain clogs', 'sewer line backups', 'grease or scale buildup', 'tree root problems'],
  },
  {
    cityName: 'Charles City',
    county: 'Floyd',
    slug: 'charles-city-ia',
    state: 'IA',
    isCountySeat: true,
    localContext: 'Established residential neighborhoods and older single-family housing are found throughout the community.',
    regionalAccess: 'US 218 and Highway 14 connect Charles City with nearby Floyd County communities.',
    adjacentTowns: ['Floyd', 'Colwell', 'Rudd'],
    commonIssues: ['main sewer clogs', 'basement drain backups', 'slow drains', 'tree root problems'],
  },
  {
    cityName: 'Osage',
    county: 'Mitchell',
    slug: 'osage-ia',
    state: 'IA',
    isCountySeat: true,
    localContext: 'Residential neighborhoods include established homes as well as properties on the edge of the community.',
    regionalAccess: 'US 218 and Highway 9 provide regional access to Osage and nearby Mitchell County communities.',
    adjacentTowns: ['Mitchell', 'Orchard', 'St. Ansgar', 'Little Cedar'],
    commonIssues: ['mainline blockages', 'basement floor drain backups', 'stopped-up drains', 'sewer backups'],
  },
];

export const citiesBySlug = new Map(citiesData.map((city) => [city.slug, city]));
