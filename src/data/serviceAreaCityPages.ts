// City slugs with dedicated service-area pages published by the current Astro build.
// These entries must correspond to researched, city-specific content in [slug].astro.
export const builtServiceAreaCitySlugs = new Set([
  'clear-lake',
  'charles-city',
  'forest-city',
  'garner',
  'northwood',
  'hampton',
  'nora-springs',
  'rockwell',
]);

export const dedicatedServiceAreaCitySlugs = new Set([...builtServiceAreaCitySlugs, 'mason-city']);

export const serviceAreaCityPageHref = (slug: string) =>
  slug === 'mason-city' ? '/mason-city-drain-cleaning/' : `/service-area/${slug}/`;
