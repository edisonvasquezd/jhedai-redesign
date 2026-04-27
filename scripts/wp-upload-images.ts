/**
 * wp-upload-images.ts
 * Sube las imágenes descargadas por wp-export.ts a Cloudflare Images
 * y actualiza posts-export.json con las nuevas URLs.
 *
 * Uso:
 *   CF_ACCOUNT_ID=xxx CF_API_TOKEN=yyy npx tsx scripts/wp-upload-images.ts
 *
 * Requiere:
 *   - scripts/output/posts-export.json  (generado por wp-export.ts)
 *   - scripts/output/images-map.json    (generado por wp-export.ts)
 *   - CF_ACCOUNT_ID: Cloudflare Account ID
 *   - CF_API_TOKEN: API Token con permiso Cloudflare Images:Edit
 */

import fs from "fs";
import path from "path";
import https from "https";

// ─── Config ──────────────────────────────────────────────────────────────────

const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
const CF_API_TOKEN = process.env.CF_API_TOKEN;
const OUTPUT_DIR = path.join(process.cwd(), "scripts/output");
const IMAGES_DIR = path.join(OUTPUT_DIR, "images");

if (!CF_ACCOUNT_ID || !CF_API_TOKEN) {
  console.error("❌ Faltan variables de entorno: CF_ACCOUNT_ID y CF_API_TOKEN");
  process.exit(1);
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface CFImageResponse {
  result?: {
    id: string;
    variants: string[];
  };
  success: boolean;
  errors: Array<{ message: string }>;
}

interface UploadCache {
  [localPath: string]: string; // localPath -> CF Images URL
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function readJson<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
    }
  } catch {}
  return fallback;
}

function writeJson(filePath: string, data: unknown): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

function uploadToCFImages(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileContent = fs.readFileSync(filePath);
    const filename = path.basename(filePath);
    const boundary = `----FormBoundary${Math.random().toString(36).slice(2)}`;

    const body = Buffer.concat([
      Buffer.from(
        `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${filename}"\r\nContent-Type: image/jpeg\r\n\r\n`
      ),
      fileContent,
      Buffer.from(`\r\n--${boundary}--\r\n`),
    ]);

    const options = {
      hostname: "api.cloudflare.com",
      path: `/client/v4/accounts/${CF_ACCOUNT_ID}/images/v1`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${CF_API_TOKEN}`,
        "Content-Type": `multipart/form-data; boundary=${boundary}`,
        "Content-Length": body.length,
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const json = JSON.parse(data) as CFImageResponse;
          if (json.success && json.result?.variants?.[0]) {
            resolve(json.result.variants[0]);
          } else {
            const err = json.errors?.[0]?.message || "Unknown CF Images error";
            reject(new Error(err));
          }
        } catch (e) {
          reject(new Error(`CF Images parse error: ${e}`));
        }
      });
    });

    req.on("error", reject);
    req.setTimeout(60000, () => { req.destroy(); reject(new Error(`Timeout uploading ${filename}`)); });
    req.write(body);
    req.end();
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("☁️  JhedAI Image Uploader → Cloudflare Images\n");

  const postsPath = path.join(OUTPUT_DIR, "posts-export.json");
  const uploadCachePath = path.join(OUTPUT_DIR, "upload-cache.json");

  if (!fs.existsSync(postsPath)) {
    console.error("❌ No se encontró posts-export.json. Ejecutar wp-export.ts primero.");
    process.exit(1);
  }

  const posts = JSON.parse(fs.readFileSync(postsPath, "utf-8")) as Record<string, unknown>[];
  const uploadCache = readJson<UploadCache>(uploadCachePath, {});

  // Recolectar todas las rutas de imágenes locales únicas
  const localImages = new Set<string>();

  for (const post of posts) {
    if (post.featuredImage && typeof post.featuredImage === "string" && post.featuredImage.startsWith("/images/")) {
      localImages.add(post.featuredImage);
    }
    if (post.ogImage && typeof post.ogImage === "string" && post.ogImage.startsWith("/images/")) {
      localImages.add(post.ogImage);
    }
    const author = post.author as Record<string, unknown> | undefined;
    if (author?.avatar && typeof author.avatar === "string" && author.avatar.startsWith("/images/")) {
      localImages.add(author.avatar as string);
    }
  }

  console.log(`📸 Imágenes a subir: ${localImages.size}`);
  console.log(`   Ya subidas (cache): ${Object.keys(uploadCache).length}\n`);

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const relativePath of localImages) {
    if (uploadCache[relativePath]) {
      skipped++;
      continue;
    }

    const absolutePath = path.join(OUTPUT_DIR, relativePath);
    if (!fs.existsSync(absolutePath)) {
      console.warn(`  ⚠ Archivo no encontrado: ${absolutePath}`);
      failed++;
      continue;
    }

    try {
      process.stdout.write(`  ↑ ${path.basename(absolutePath)}... `);
      const cfUrl = await uploadToCFImages(absolutePath);
      uploadCache[relativePath] = cfUrl;
      uploaded++;
      console.log(`✓ ${cfUrl}`);

      // Guardar cache después de cada upload exitoso
      writeJson(uploadCachePath, uploadCache);

      // Rate limit: 5 uploads por segundo
      await new Promise((r) => setTimeout(r, 200));
    } catch (e) {
      console.log(`✗ Error: ${e}`);
      failed++;
    }
  }

  console.log(`\n📊 Resultado: ${uploaded} subidas, ${skipped} ya existían, ${failed} errores\n`);

  // ── Actualizar posts-export.json con nuevas URLs ───────────────────────────
  console.log("📝 Actualizando posts-export.json con URLs de Cloudflare Images...");

  let updatedCount = 0;

  for (const post of posts) {
    if (post.featuredImage && uploadCache[post.featuredImage as string]) {
      post.featuredImage = uploadCache[post.featuredImage as string];
      updatedCount++;
    }
    if (post.ogImage && uploadCache[post.ogImage as string]) {
      post.ogImage = uploadCache[post.ogImage as string];
      updatedCount++;
    }
    const author = post.author as Record<string, unknown> | undefined;
    if (author?.avatar && uploadCache[author.avatar as string]) {
      author.avatar = uploadCache[author.avatar as string];
      updatedCount++;
    }
  }

  writeJson(postsPath, posts);
  console.log(`   ✓ ${updatedCount} referencias de imágenes actualizadas`);

  // ── Validación final ──────────────────────────────────────────────────────
  const postsJson = JSON.stringify(posts);
  const localRefs = (postsJson.match(/\/images\//g) || []).length;
  const wpRefs = (postsJson.match(/wp-content/g) || []).length;

  if (localRefs > 0) {
    console.log(`\n⚠ Aún quedan ${localRefs} referencias a rutas locales (/images/).`);
    console.log("  Revisar upload-cache.json para ver qué falló.");
  } else if (wpRefs > 0) {
    console.log(`\n⚠ Aún quedan ${wpRefs} referencias a wp-content.`);
  } else {
    console.log("\n✅ Todas las imágenes apuntan a Cloudflare Images. Listo para importar.");
  }
}

main().catch((e) => {
  console.error("❌ Error fatal:", e);
  process.exit(1);
});
