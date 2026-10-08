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
    ['Nashua', ['Floyd', 'Chickasaw']],
    ['Nora Springs', ['Floyd', 'Cerro Gordo']],
    ['Rockford', ['Floyd']],
    ['Rudd', ['Floyd']]
  ].map(([name, counties]) => city(name as string, counties as string[])),

  // Franklin County
  ...[
    ['Ackley', ['Franklin', 'Hardin']],
    ['Alexander', ['Franklin']],
    ['Coulter', ['Franklin']],
    ['Dows', ['Franklin', 'Wright']],
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
    ['Riceville', ['Mitchell', 'Howard']],
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
    ['Joice', ['Worth', 'Winnebago']],
    ['Kensett', ['Worth']],
    ['Manly', ['Worth']],
    ['Northwood', ['Worth']]
  ].map(([name, counties]) => city(name as string, counties as string[])),

  // Wright County
  ...[
    ['Belmond', ['Wright']],
    ['Clarion', ['Wright']],
    ['Dows', ['Wright', 'Franklin']],
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

export const uniqueServiceAreaCities = Array.from(
  new Map(serviceAreaCities.map((item) => [item.slug, item])).values()
);
