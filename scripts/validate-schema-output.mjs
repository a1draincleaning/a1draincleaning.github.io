import assert from 'node:assert/strict';
import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const website = 'https://a1draincleaning.github.io/';
const businessId = `${website}#business`;
const stateId = (code) => `${website}#state-${code.toLowerCase()}`;
const countyId = (name, code) => `${website}#county-${code.toLowerCase()}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
const placeId = (slug) => `${website}#place-${slug}`;
const serviceId = (slug) => `${website}#service-${slug}`;

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? htmlFiles(target) : entry.name.endsWith('.html') ? [target] : [];
  }));
  return nested.flat();
}

function parseGraphs(html, file) {
  const matches = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  assert.ok(matches.length > 0, `No JSON-LD block found in ${file}`);
  return matches.map((match) => {
    try { return JSON.parse(match[1]); }
    catch (error) { throw new Error(`Invalid JSON-LD in ${file}: ${error.message}`); }
  });
}

function walkReferences(value, visit) {
  if (!value || typeof value !== 'object') return;
  if (!Array.isArray(value) && Object.keys(value).length === 1 && typeof value['@id'] === 'string') visit(value['@id']);
  for (const child of Object.values(value)) walkReferences(child, visit);
}

function distPathForUrl(value) {
  const pathname = new URL(value).pathname;
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return path.join(dist, normalized.replace(/^\//, ''), 'index.html');
}

const files = (await htmlFiles(dist)).filter((file) => path.relative(dist, file) !== '404.html');
assert.ok(files.length > 0, 'Astro dist directory contains no HTML pages');
let homeGraph;
for (const file of files) {
  const html = await readFile(file, 'utf8');
  const graphs = parseGraphs(html, path.relative(root, file));
  for (const graph of graphs) {
    assert.ok(Array.isArray(graph['@graph']), `JSON-LD graph missing @graph in ${file}`);
    const nodes = graph['@graph'];
    const ids = nodes.map((node) => node['@id']).filter(Boolean);
    assert.equal(new Set(ids).size, ids.length, `Duplicate @id in ${file}`);
    const idSet = new Set(ids);
    for (const node of nodes) {
      walkReferences(node, (id) => assert.ok(idSet.has(id), `Unresolved @id reference ${id} in ${file}`));
    }
  }
  if (file === path.join(dist, 'index.html')) homeGraph = graphs[0];
}
assert.ok(homeGraph, 'Homepage JSON-LD was not found');
const nodes = homeGraph['@graph'];
const byId = new Map(nodes.map((node) => [node['@id'], node]));
const businessNodes = nodes.filter((node) => node['@id'] === businessId);
assert.equal(businessNodes.length, 1, 'Expected exactly one canonical business entity');
const business = businessNodes[0];
assert.equal(business['@type'], 'Plumber');
assert.equal(business.name, 'A-1 Drain Cleaning');
assert.equal(business.telephone, '+16415302728');
assert.deepEqual(business.address, {
  '@type': 'PostalAddress', streetAddress: '206 29th St SW', addressLocality: 'Mason City',
  addressRegion: 'IA', postalCode: '50401', addressCountry: 'US'
});

const placeNodes = nodes.filter((node) => node['@type'] === 'Place');
const countyNodes = nodes.filter((node) => node['@type'] === 'AdministrativeArea' && node['@id']?.includes('#county-'));
const stateNodes = nodes.filter((node) => node['@type'] === 'AdministrativeArea' && node['@id']?.includes('#state-'));
const serviceNodes = nodes.filter((node) => node['@type'] === 'Service');
assert.equal(placeNodes.length, 74, 'Expected 73 Iowa communities plus Albert Lea');
assert.equal(countyNodes.length, 10, 'Expected nine Iowa counties plus Freeborn County');
assert.equal(stateNodes.length, 2, 'Expected Iowa and Minnesota');
assert.equal(serviceNodes.length, 20, 'Expected 20 canonical service entities');

const citySource = await readFile(path.join(root, 'src/data/serviceAreaCities.ts'), 'utf8');
const iowaRows = [...citySource.matchAll(/\['([^']+)',\s*\['([^']+)'\]\]/g)].map((match) => ({ name: match[1], county: match[2] }));
assert.equal(iowaRows.length, 73, 'Expected 73 Iowa communities in the canonical source registry');
assert.equal(new Set(iowaRows.map((item) => item.name)).size, 73, 'Duplicate Iowa community in source registry');
assert.match(citySource, /city\('Albert Lea',\s*\['Freeborn'\],\s*'Minnesota',\s*'MN'\)/);
assert.equal(new Set(iowaRows.map((item) => item.county)).size, 9, 'Expected exactly nine Iowa counties');

const placesByName = new Map(placeNodes.map((node) => [node.name, node]));
for (const item of iowaRows) {
  const place = placesByName.get(item.name);
  assert.ok(place, `Missing Place entity for ${item.name}`);
  assert.ok(place.containedInPlace.some((ref) => ref['@id'] === countyId(item.county, 'IA')), `Wrong county relationship for ${item.name}`);
}
const albertLea = placesByName.get('Albert Lea');
assert.ok(albertLea, 'Albert Lea Place missing');
assert.ok(albertLea.containedInPlace.some((ref) => ref['@id'] === countyId('Freeborn', 'MN')));
for (const county of countyNodes) {
  const expectedState = county['@id'].includes('-mn-') ? stateId('MN') : stateId('IA');
  assert.equal(county.containedInPlace['@id'], expectedState, `Incorrect state hierarchy for ${county.name}`);
}
assert.ok(!countyNodes.some((node) => /^(Hardin|Chickasaw|Kossuth) County$/.test(node.name)));

const servedIds = new Set((business.areaServed ?? []).map((item) => item['@id']));
assert.equal(servedIds.size, 74, 'Business areaServed must reference every directory community exactly once');
for (const place of placeNodes) assert.ok(servedIds.has(place['@id']), `Business areaServed missing ${place.name}`);
const catalogOffers = business.hasOfferCatalog?.itemListElement ?? [];
assert.equal(catalogOffers.length, 20, 'OfferCatalog must reference all canonical services');
for (const offer of catalogOffers) assert.ok(byId.has(offer.itemOffered['@id']), 'OfferCatalog has an unresolved Service reference');
for (const service of serviceNodes) {
  assert.equal(service.provider['@id'], businessId);
  if (service.url) await access(distPathForUrl(service.url));
}

const serviceSource = await readFile(path.join(root, 'src/data/schemaServices.ts'), 'utf8');
const expectedServiceNames = [...serviceSource.matchAll(/name:\s*'([^']+)'/g)].map((match) => match[1]);
assert.equal(expectedServiceNames.length, 20, 'Canonical service source count mismatch');
assert.deepEqual(new Set(serviceNodes.map((node) => node.name)), new Set(expectedServiceNames));
const serializedServices = JSON.stringify(serviceNodes);
assert.ok(serializedServices.includes('Tree root removal from sewer lines'));
assert.ok(!/Root Cutting|pipe repairs|septic pumping|gully cleaning/i.test(serializedServices));

const cityPagesSource = await readFile(path.join(root, 'src/data/serviceAreaCityPages.ts'), 'utf8');
const publishedBlock = cityPagesSource.match(/publishedServiceAreaCitySlugs = new Set\(\[([\s\S]*?)\]\)/);
assert.ok(publishedBlock, 'Published city-page registry missing');
const publishedSlugs = [...publishedBlock[1].matchAll(/'([^']+)'/g)].map((match) => match[1]);
assert.equal(publishedSlugs.length, 9, 'Expected exactly nine published Iowa city pages');
const dynamicBlock = cityPagesSource.match(/builtServiceAreaCitySlugs = new Set\(\[([\s\S]*?)\]\)/);
assert.ok(dynamicBlock, 'Dynamic city-page registry missing');
const dynamicSlugs = [...dynamicBlock[1].matchAll(/'([^']+)'/g)].map((match) => match[1]);
assert.equal(dynamicSlugs.length, 8, 'Expected eight dynamic city pages plus the separate Mason City route');
assert.ok(!dynamicSlugs.includes('mason-city'), 'Mason City must not receive a duplicate /service-area/ route');
const expectedCityPages = [
  ['mason-city', '/mason-city-drain-cleaning/'], ['clear-lake', '/service-area/clear-lake/'],
  ['charles-city', '/service-area/charles-city/'], ['forest-city', '/service-area/forest-city/'],
  ['garner', '/service-area/garner/'], ['hampton', '/service-area/hampton/'],
  ['nora-springs', '/service-area/nora-springs/'], ['northwood', '/service-area/northwood/'],
  ['rockwell', '/service-area/rockwell/'], ['albert-lea', '/albert-lea-mn-drain-cleaning/']
];
for (const [slug, route] of expectedCityPages) {
  const output = distPathForUrl(new URL(route, website).href);
  await access(output);
  const html = await readFile(output, 'utf8');
  const graph = parseGraphs(html, route)[0];
  const page = graph['@graph'].find((node) => node['@type'] === 'WebPage');
  assert.ok(page?.about?.some((ref) => ref['@id'] === placeId(slug)), `Page does not identify its city Place: ${route}`);
  if (slug !== 'albert-lea') assert.ok(publishedSlugs.includes(slug), `Missing published Iowa page registry entry: ${slug}`);
}

console.log(`Schema validation passed: ${files.length} HTML pages, 74 communities, 10 counties, 2 states, 20 services, one business entity.`);
