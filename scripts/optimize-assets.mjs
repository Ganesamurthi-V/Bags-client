// One-off asset optimization for the SEO remediation.
//   node scripts/optimize-assets.mjs
// Produces: optimized hero (avif+webp), on-page product webp, a compressed
// OG cover jpg, and PWA icons (icon.png 512, apple-icon.png 180).
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { statSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

sharp.cache(false);
const PUB = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public");
const out = (name) => path.join(PUB, name);
const kb = (f) => (existsSync(f) ? (statSync(f).size / 1024).toFixed(0) + " KB" : "missing");

// Load the huge hero SVG. sharp can usually rasterize an SVG with an embedded
// raster; if that fails, fall back to decoding the embedded base64 directly.
async function loadHero() {
  const svgPath = out("Main_background.svg");
  try {
    return await sharp(await readFile(svgPath), { limitInputPixels: false }).toBuffer();
  } catch (e) {
    console.warn("SVG rasterize failed, extracting embedded raster:", e.message);
    const svg = await readFile(svgPath, "utf8");
    const m = svg.match(/data:image\/[a-z+]+;base64,([A-Za-z0-9+/=]+)/);
    if (!m) throw new Error("no embedded base64 raster found in SVG");
    return Buffer.from(m[1], "base64");
  }
}

async function main() {
  // 1) Hero background -> avif + webp (cap at 1920w)
  const hero = await loadHero();
  const heroPipe = () =>
    sharp(hero, { limitInputPixels: false }).resize({ width: 1920, withoutEnlargement: true });
  await heroPipe().avif({ quality: 50 }).toFile(out("hero-bg.avif"));
  await heroPipe().webp({ quality: 72 }).toFile(out("hero-bg.webp"));
  console.log("hero-bg.avif:", kb(out("hero-bg.avif")), "| hero-bg.webp:", kb(out("hero-bg.webp")));

  // 2) purple-bag1.png -> on-page webp + OG cover jpg (social-compatible)
  const bag = await readFile(out("purple-bag1.png"));
  await sharp(bag).webp({ quality: 78 }).toFile(out("purple-bag1.webp"));
  await sharp(bag)
    .resize({ width: 1200, height: 630, fit: "cover", position: "attention" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out("og-image.jpg"));
  console.log("purple-bag1.webp:", kb(out("purple-bag1.webp")), "| og-image.jpg:", kb(out("og-image.jpg")));

  // 3) Brand icons from an inline SVG glyph (purple square + white bag)
  const iconSvg = Buffer.from(`<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <rect width="512" height="512" rx="112" fill="#7c3aed"/>
    <path d="M160 206 h192 a12 12 0 0 1 12 11 l16 168 a24 24 0 0 1 -24 26 H156 a24 24 0 0 1 -24 -26 l16 -168 a12 12 0 0 1 12 -11 Z" fill="#ffffff"/>
    <path d="M202 214 v-18 a54 54 0 0 1 108 0 v18" fill="none" stroke="#ffffff" stroke-width="22" stroke-linecap="round"/>
  </svg>`);
  await sharp(iconSvg).resize(512, 512).png().toFile(out("icon.png"));
  await sharp(iconSvg).resize(180, 180).png().toFile(out("apple-icon.png"));
  console.log("icon.png:", kb(out("icon.png")), "| apple-icon.png:", kb(out("apple-icon.png")));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
