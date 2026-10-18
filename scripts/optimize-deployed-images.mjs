import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const dist = join(process.cwd(), 'dist');
const optimizedDir = join(dist, 'images', 'optimized');

const assets = [
  { source: join(dist, 'local-drain-cleaning-iowa.png'), publicUrl: '/local-drain-cleaning-iowa.png', output: join(optimizedDir, 'local-drain-cleaning-iowa.webp'), optimizedUrl: '/images/optimized/local-drain-cleaning-iowa.webp' },
  { source: join(dist, 'images', 'a1-main-sewer-drain-cleaning-mason-city.webp'), publicUrl: '/images/a1-main-sewer-drain-cleaning-mason-city.webp', output: join(optimizedDir, 'a1-main-sewer-drain-cleaning-mason-city.webp'), optimizedUrl: '/images/optimized/a1-main-sewer-drain-cleaning-mason-city.webp', fallback: join(dist, 'images', 'sewer-drain-mason-city-iowa.jpg') },
  { source: join(dist, 'images', 'floor-drain-backing-up-iowa.jpg'), publicUrl: '/images/floor-drain-backing-up-iowa.jpg', output: join(optimizedDir, 'floor-drain-backing-up-iowa.webp'), optimizedUrl: '/images/optimized/floor-drain-backing-up-iowa.webp' },
  { source: join(dist, 'images', 'iowa-drain-cleaning-a1-drain-cleaning.png'), publicUrl: '/images/iowa-drain-cleaning-a1-drain-cleaning.png', output: join(optimizedDir, 'iowa-drain-cleaning-a1-drain-cleaning.webp'), optimizedUrl: '/images/optimized/iowa-drain-cleaning-a1-drain-cleaning.webp' },
  { source: join(dist, 'images', 'tree-root-removal-mason-city-iowa.jpg'), publicUrl: '/images/tree-root-removal-mason-city-iowa.jpg', output: join(optimizedDir, 'tree-root-removal-mason-city-iowa.webp'), optimizedUrl: '/images/optimized/tree-root-removal-mason-city-iowa.webp' },
];

function htmlFiles(dir) {
  if (!existsSync(dir)) return [];
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...htmlFiles(path));
    else if (entry.name.endsWith('.html')) files.push(path);
  }
  return files;
}

function decodeBase64Image(buffer) {
  const text = buffer.toString('utf8').trim();
  if (!/^[A-Za-z0-9+/=\r\n]+$/.test(text) || text.length < 100) return null;
  try {
    const decoded = Buffer.from(text, 'base64');
    return decoded.length > 100 ? decoded : null;
  } catch {
    return null;
  }
}

async function makeWebp(asset) {
  let input = readFileSync(asset.source);
  let image = sharp(input);
  try {
    await image.metadata();
  } catch {
    const decoded = decodeBase64Image(input);
    if (decoded) {
      input = decoded;
      image = sharp(input);
    } else if (asset.fallback && existsSync(asset.fallback)) {
      input = readFileSync(asset.fallback);
      image = sharp(input);
    } else {
      throw new Error(`Cannot decode ${asset.source}`);
    }
  }

  const widths = [1400, 1200, 1000, 900, 800];
  const qualities = [65, 55, 45, 40, 35];
  let best;
  for (const width of widths) {
    for (const quality of qualities) {
      const output = await image.resize({ width, withoutEnlargement: true }).webp({ quality, effort: 5 }).toBuffer();
      best = output;
      if (output.length <= 95_000) return output;
    }
  }
  return best;
}

mkdirSync(optimizedDir, { recursive: true });
for (const asset of assets) {
  const output = await makeWebp(asset);
  writeFileSync(asset.output, output);
  console.log(`Optimized ${asset.publicUrl}: ${(output.length / 1024).toFixed(1)} KB`);
}

for (const file of htmlFiles(dist)) {
  let html = readFileSync(file, 'utf8');
  for (const asset of assets) html = html.split(asset.publicUrl).join(asset.optimizedUrl);
  writeFileSync(file, html);
}

console.log(`Optimized ${assets.length} image assets and updated generated HTML references.`);
