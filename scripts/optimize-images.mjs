import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const outDir = path.join(root, "public/assets/images");
const logoWidths = [32, 48, 64, 96];
const profileWidths = [160, 200, 320, 400];
const logoBg = { r: 4, g: 7, b: 12, alpha: 1 };

const sources = [
  {
    id: "our-plus-r",
    input: path.join(
      root,
      "public/assets/images/sources/our-plus-r-source.png"
    ),
    widths: logoWidths,
    fit: "contain"
  },
  {
    id: "nullornan",
    input: path.join(outDir, "nullornan.webp"),
    widths: logoWidths,
    fit: "contain"
  },
  {
    id: "reliability-lounge",
    input: path.join(outDir, "reliability-lounge.png"),
    widths: logoWidths,
    fit: "contain"
  },
  {
    id: "profile",
    input: path.join(outDir, "profile.webp"),
    widths: profileWidths,
    fit: "cover"
  }
];

async function writeVariants({ id, input, widths, fit }) {
  const meta = await sharp(input).metadata();
  const maxWidth = meta.width ?? 0;
  const targetWidths = widths.filter((w) => w <= maxWidth);
  const dir = path.join(outDir, id);
  await fs.mkdir(dir, { recursive: true });

  for (const width of targetWidths) {
    const outPath = path.join(dir, `${id}-${width}.webp`);
    const resizeOptions = {
      fit,
      position: "centre",
      ...(fit === "contain" ? { background: logoBg } : {})
    };
    await sharp(input)
      .resize(width, width, resizeOptions)
      .webp({ quality: 82, effort: 4 })
      .toFile(outPath);
    console.log(`wrote ${path.relative(root, outPath)}`);
  }
}

for (const source of sources) {
  await writeVariants(source);
}

console.log("Image optimization complete.");
