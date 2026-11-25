import { services } from './services';

// Keep problem/symptom landing pages out of the business service catalog.
// Their pages explain a situation; they are not separate service offerings.
const nonCatalogSlugs = new Set([
  'washing-machine-basement-flooding',
  'sewer-backup-into-tub-shower',
]);

export const schemaServices = services.filter((service) => !nonCatalogSlugs.has(service.slug));

const slugs = schemaServices.map((service) => service.slug);
if (new Set(slugs).size !== slugs.length) {
  throw new Error('Schema service inventory contains duplicate service slugs.');
}
