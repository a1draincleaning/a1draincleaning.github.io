export type ServiceAreaCity = {
  name: string;
  slug: string;
  counties: string[];
};

const city = (name: string, counties: string[]): ServiceAreaCity => ({
  name,
  slug: name.toLowerCase().replace(/\./g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
  counties
});

/**
 * City/community pages for A-1's current 12-county North Iowa service-area plan.
 * County assignments are based on Iowa's incorporated-city directory and official
 * local-government sources. Review the full county coverage before expanding it.
 */
export const serviceAreaCities: ServiceAreaCity[] = [
  // Cerro Gordo County
  ...[
    ['Clear Lake', ['Cerro Gordo']],
    ['Dougherty', ['Cerro Gordo']],
    ['Mason City', ['Cerro Gordo']],
    ['Meservey', ['Cerro Gordo']],
    ['Nora Springs', ['Cerro Gordo', 'Floyd']],
    ['Plymouth', ['Cerro Gordo']],
    ['Rock Falls', ['Cerro Gordo']],
    ['Rockwell', ['Cerro Gordo']],
    ['Swaledale', ['Cerro Gordo']],
    ['Thornton', ['Cerro Gordo']],
    ['Ventura', ['Cerro Gordo']]
  ].map(([name, counties]) => city(name as string, counties as string[])),

  // Floyd County
  ...[
    ['Charles City', ['Floyd']],
    ['Colwell', ['Floyd']],
    ['Floyd', ['Floyd']],
    ['Marble Rock', ['Floyd']],
    ['Nora Springs', ['Floyd']],
    ['Rockford', ['Floyd']],
    ['Rudd', ['Floyd']]
  ].map(([name, counties]) => city(name as string, counties as string[])),

  // Hardin County (existing individually listed service community)
  ...[
    ['Ackley', ['Hardin']]
  ].map(([name, counties]) => city(name as string, counties as string[])),

  // Chickasaw County (existing individually listed service community)
  ...[
    ['Nashua', ['Chickasaw']]
  ].map(([name, counties]) => city(name as string, counties as string[])),

  // Howard County (existing individually listed service community)
  ...[
    ['Riceville', ['Howard']]
  ].map(([name, counties]) => city(name as string, counties as string[])),

  // Franklin County
  ...[
    ['Alexander', ['Franklin']],
    ['Chapin', ['Franklin']],
    ['Coulter', ['Franklin']],
    ['Geneva', ['Franklin']],
    ['Hampton', ['Franklin']],
    ['Hansell', ['Franklin']],
    ['Latimer', ['Franklin']],
    ['Popejoy', ['Franklin']],
    ['Sheffield', ['Franklin']]
  ].map(([name, counties]) => city(name as string, counties as string[])),

  // Hancock County
  ...[
    ['Britt', ['Hancock']],
    ['Corwith', ['Hancock']],
    ['Crystal Lake', ['Hancock']],
    ['Forest City', ['Hancock', 'Winnebago']],
    ['Garner', ['Hancock']],
    ['Goodell', ['Hancock']],
    ['Kanawha', ['Hancock']],
    ['Klemme', ['Hancock']],
    ['Woden', ['Hancock']]
  ].map(([name, counties]) => city(name as string, counties as string[])),

  // Mitchell County
  ...[
    ['Carpenter', ['Mitchell']],
    ['McIntire', ['Mitchell']],
    ['Mitchell', ['Mitchell']],
    ['Orchard', ['Mitchell']],
    ['Osage', ['Mitchell']],
    ['St. Ansgar', ['Mitchell']],
    ['Stacyville', ['Mitchell']]
  ].map(([name, counties]) => city(name as string, counties as string[])),

  // Winnebago County
  ...[
    ['Buffalo Center', ['Winnebago']],
    ['Forest City', ['Winnebago', 'Hancock']],
    ['Lake Mills', ['Winnebago']],
    ['Leland', ['Winnebago']],
    ['Rake', ['Winnebago']],
    ['Scarville', ['Winnebago']],
    ['Thompson', ['Winnebago']]
  ].map(([name, counties]) => city(name as string, counties as string[])),

  // Worth County
  ...[
    ['Fertile', ['Worth']],
    ['Grafton', ['Worth']],
    ['Hanlontown', ['Worth']],
    ['Joice', ['Worth']],
    ['Kensett', ['Worth']],
    ['Manly', ['Worth']],
    ['Northwood', ['Worth']]
  ].map(([name, counties]) => city(name as string, counties as string[])),

  // Wright County
  ...[
    ['Belmond', ['Wright']],
    ['Clarion', ['Wright']],
    ['Dows', ['Wright']],
    ['Eagle Grove', ['Wright']],
    ['Galt', ['Wright']],
    ['Goldfield', ['Wright']],
    ['Rowan', ['Wright']],
    ['Woolstock', ['Wright']]
  ].map(([name, counties]) => city(name as string, counties as string[])),


  // Butler County
  ...[
    ['Allison', ['Butler']],
    ['Aplington', ['Butler']],
    ['Aredale', ['Butler']],
    ['Bristow', ['Butler']],
    ['Clarksville', ['Butler']],
    ['Dumont', ['Butler']],
    ['Greene', ['Butler']],
    ['New Hartford', ['Butler']],
    ['Parkersburg', ['Butler']],
    ['Shell Rock', ['Butler']]
  ].map(([name, counties]) => city(name as string, counties as string[]))
];

// Merge repeated entries for towns that cross county lines rather than silently
// dropping the second county when the same town appears in more than one group.
export const uniqueServiceAreaCities = Array.from(
  serviceAreaCities.reduce((bySlug, item) => {
    const existing = bySlug.get(item.slug);
    if (existing) {
      existing.counties = Array.from(new Set([...existing.counties, ...item.counties]));
    } else {
      bySlug.set(item.slug, { ...item, counties: [...item.counties] });
    }
    return bySlug;
  }, new Map<string, ServiceAreaCity>()).values()
);
