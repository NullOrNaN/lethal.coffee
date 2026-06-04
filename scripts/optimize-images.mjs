import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const imagesDir = path.join(root, "public/assets/images");
const sourcesDir = path.join(imagesDir, "sources");
const logoWidths = [32, 48, 64, 96];
const profileWidths = [160, 200, 320, 400];
const logoBg = { r: 4, g: 7, b: 12, alpha: 1 };

/** @type {{ id: string; source: string; widths: number[]; fit: "contain" | "cover" }[]} */
const assets = [
  {
    id: "our-plus-r",
    source: "our-plus-r-source.webp",
    widths: logoWidths,
    fit: "contain"
  },
  {
    id: "nullornan",
    source: "nullornan-source.webp",
    widths: logoWidths,
    fit: "contain"
  },
  {
    id: "reliability-lounge",
    source: "reliability-lounge-source.webp",
    widths: logoWidths,
    fit: "contain"
  },
  {
    id: "profile",
    source: "profile-source.webp",
    widths: profileWidths,
    fit: "cover"
  }
];

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function ensureWebpMaster(sourceFile) {
  const inputPath = path.join(sourcesDir, sourceFile);
  if (!(await fileExists(inputPath))) {
    throw new Error(`Missing source file: ${path.relative(root, inputPath)}`);
  }

  const webpName = sourceFile.replace(/\.(png|jpe?g)$/i, ".webp");
  const webpPath = path.join(sourcesDir, webpName);

  if (/\.webp$/i.test(sourceFile)) {
    return webpPath;
  }

  await sharp(inputPath)
    .webp({ quality: 90, effort: 4 })
    .toFile(webpPath);
  console.log(`converted ${path.relative(root, webpPath)}`);
  return webpPath;
}

async function writeVariants({ id, masterPath, widths, fit }) {
  const meta = await sharp(masterPath).metadata();
  const maxWidth = meta.width ?? 0;
  const targetWidths = widths.filter((w) => w <= maxWidth);
  const dir = path.join(imagesDir, id);
  await fs.mkdir(dir, { recursive: true });

  for (const width of targetWidths) {
    const outPath = path.join(dir, `${id}-${width}.webp`);
    const resizeOptions = {
      fit,
      position: "centre",
      ...(fit === "contain" ? { background: logoBg } : {})
    };
    await sharp(masterPath)
      .resize(width, width, resizeOptions)
      .webp({ quality: 82, effort: 4 })
      .toFile(outPath);
    console.log(`wrote ${path.relative(root, outPath)}`);
  }
}

await fs.mkdir(sourcesDir, { recursive: true });

for (const asset of assets) {
  const masterPath = await ensureWebpMaster(asset.source);
  await writeVariants({
    id: asset.id,
    masterPath,
    widths: asset.widths,
    fit: asset.fit
  });
}

console.log("WebP image optimization complete.");
