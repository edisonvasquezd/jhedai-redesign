import sharp from "sharp";
import path from "path";
import fs from "fs";

const TEAM_DIR = path.join(process.cwd(), "public", "team");
const QUALITY = 82;
const MAX_WIDTH = 800;

const SOURCES = [
  "Ignacio_Rojas_JhedAI.png",
  "Julio_Hofflinger_JhedAI.png",
  "Hector_Vasquez_JhedAI.png",
  "edison-vasquez.jpg",
];

async function convertToWebP(filename: string) {
  const inputPath = path.join(TEAM_DIR, filename);
  const outputFilename = filename.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  const outputPath = path.join(TEAM_DIR, outputFilename);

  if (!fs.existsSync(inputPath)) {
    console.warn(`  SKIP: ${filename} not found`);
    return;
  }

  const inputSizeMB = (fs.statSync(inputPath).size / 1024 / 1024).toFixed(1);
  process.stdout.write(`  ${filename} (${inputSizeMB}MB) -> ${outputFilename} ... `);

  await sharp(inputPath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 4 })
    .toFile(outputPath);

  const outputSizeKB = (fs.statSync(outputPath).size / 1024).toFixed(0);
  console.log(`done (${outputSizeKB}KB)`);
}

async function main() {
  console.log("JhedAI — Team Image WebP Conversion\n");
  console.log(`Source dir: ${TEAM_DIR}`);
  console.log(`Settings: max ${MAX_WIDTH}px wide, quality ${QUALITY}\n`);

  for (const file of SOURCES) {
    await convertToWebP(file);
  }

  console.log("\nDone. Commit the .webp files to public/team/");
}

main().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
