import { uniqueServiceAreaCities } from './serviceAreaCities';

// Keep legacy consumers aligned with the city-page directory.
export const serviceAreas = uniqueServiceAreaCities.map((city) => city.name);
