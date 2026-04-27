/**
 * wp-upload-content-images.ts
 * Extrae todas las imágenes dentro del contenido HTML de los posts,
 * las descarga, las sube a Cloudflare Images y actualiza posts-export.json.
 *
 * Uso:
 *   $env:CF_ACCOUNT_ID = "xxx"; $env:CF_API_TOKEN = "yyy"; npx tsx scripts/wp-upload-content-images.ts
 *
 * Requiere:
 *   - scripts/output/posts-export.json
 *   - CF_ACCOUNT_ID, CF_API_TOKEN
 */

import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID;
const CF_API_TOKEN = process.env.CF_API_TOKEN;
const OUTPUT_DIR = path.join(process.cwd(), "scripts/output");
const CONTENT_IMAGES_DIR = path.join(OUTPUT_DIR, "images", "content");

if (!CF_ACCOUNT_ID || !CF_API_TOKEN) {
  console.error("❌ Faltan variables: CF_ACCOUNT_ID y CF_API_TOKEN");
  process.exit(1);
}

interface UploadCache {
  [url: string]: string;
}

interface CFImageResponse {
  result?: { id: string; variants: string[] };
  success: boolean;
  errors: Array<{ message: string }>;
}

function readJson<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
  } catch {}
  return fallback;
}

function writeJson(filePath: string, data: unknown): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

function extractContentImageUrls(html: string): string[] {
  const urls = new Set<string>();
  // src="..." en img tags
  const srcMatches = html.matchAll(/src="(https?:\/\/[^"]+\.(jpg|jpeg|png|gif|webp|svg)[^"]*)"/gi);
  for (const m of srcMatches) urls.add(m[1].split("?")[0]);
  // srcset="..."
  const srcsetMatches = html.matchAll(/srcset="([^"]+)"/gi);
  for (const m of srcsetMatches) {
    for (const part of m[1].split(",")) {
      const url = part.trim().split(" ")[0];
      if (url.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp|svg)/i)) {
        urls.add(url.split("?")[0]);
      }
    }
  }
  return [...urls];
}

function getFilenameFromUrl(url: string): string {
  const base = path.basename(new URL(url).pathname);
  return base.replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 100);
}

function downloadFile(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(destPath)) { resolve(); return; }
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, { headers: { "User-Agent": "JhedAI-WP-Importer/1.0" } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        downloadFile(res.headers.location!, destPath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) { reject(new Error(`HTTP ${res.statusCode}`)); return; }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(); });
      file.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error("Timeout")); });
  });
}

function uploadToCFImages(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const fileContent = fs.readFileSync(filePath);
    const filename = path.basename(filePath);
    const boundary = `----FormBoundary${Math.random().toString(36).slice(2)}`;
    const body = Buffer.concat([
      Buffer.from(`--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${filename}"\r\nContent-Type: image/jpeg\r\n\r\n`),
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
            reject(new Error(json.errors?.[0]?.message || "CF Images error"));
          }
        } catch (e) { reject(e); }
      });
    });
    req.on("error", reject);
    req.setTimeout(60000, () => { req.destroy(); reject(new Error("Timeout uploading")); });
    req.write(body);
    req.end();
  });
}

function replaceContentUrls(html: string, urlMap: Record<string, string>): string {
  let result = html;
  for (const [original, cfUrl] of Object.entries(urlMap)) {
    // Reemplazar la URL base y también versiones con query string o sufijos de tamaño (-300x200, etc.)
    const escapedBase = original.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    // Reemplazar URL exacta
    result = result.replaceAll(original, cfUrl);
    // Reemplazar variantes de tamaño WP: imagen-300x200.jpg → misma CF URL
    const withoutExt = original.replace(/\.(jpg|jpeg|png|gif|webp)$/i, "");
    const ext = original.match(/\.(jpg|jpeg|png|gif|webp)$/i)?.[0] || "";
    const sizeVariantRegex = new RegExp(
      escapedBase.replace(escapedBase, withoutExt.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) +
      "-\\d+x\\d+" + ext.replace(".", "\\."),
      "gi"
    );
    result = result.replace(sizeVariantRegex, cfUrl);
  }
  return result;
}

async function main() {
  console.log("🖼️  JhedAI Content Image Uploader → Cloudflare Images\n");

  const postsPath = path.join(OUTPUT_DIR, "posts-export.json");
  const cachePath = path.join(OUTPUT_DIR, "content-images-cache.json");

  if (!fs.existsSync(postsPath)) {
    console.error("❌ No se encontró posts-export.json");
    process.exit(1);
  }

  fs.mkdirSync(CONTENT_IMAGES_DIR, { recursive: true });

  const posts = JSON.parse(fs.readFileSync(postsPath, "utf-8")) as Record<string, unknown>[];
  const cache = readJson<UploadCache>(cachePath, {});

  // 1. Recolectar todas las URLs únicas del contenido
  const allUrls = new Set<string>();
  for (const post of posts) {
    const content = post.content as string || "";
    for (const url of extractContentImageUrls(content)) {
      if (url.includes("wp-content") || url.includes("jhedai.com")) {
        allUrls.add(url);
      }
    }
  }

  const toUpload = [...allUrls].filter((u) => !cache[u]);
  console.log(`📸 URLs en contenido: ${allUrls.size}`);
  console.log(`   Ya subidas (cache): ${allUrls.size - toUpload.length}`);
  console.log(`   Pendientes: ${toUpload.length}\n`);

  // 2. Descargar y subir cada imagen
  let uploaded = 0;
  let failed = 0;

  for (const url of toUpload) {
    const filename = getFilenameFromUrl(url);
    const localPath = path.join(CONTENT_IMAGES_DIR, filename);

    process.stdout.write(`  ↑ ${filename}... `);

    try {
      await downloadFile(url, localPath);
      const cfUrl = await uploadToCFImages(localPath);
      cache[url] = cfUrl;
      uploaded++;
      console.log(`✓`);
      writeJson(cachePath, cache);
      await new Promise((r) => setTimeout(r, 200));
    } catch (e) {
      console.log(`✗ ${e}`);
      failed++;
    }
  }

  console.log(`\n📊 Subidas: ${uploaded}, Errores: ${failed}\n`);

  // 3. Reemplazar URLs en el contenido de todos los posts
  console.log("📝 Reemplazando URLs en contenido de posts...");
  let updatedPosts = 0;

  for (const post of posts) {
    const original = post.content as string || "";
    const updated = replaceContentUrls(original, cache);
    if (updated !== original) {
      post.content = updated;
      updatedPosts++;
    }
  }

  writeJson(postsPath, posts);
  console.log(`   ✓ ${updatedPosts} posts actualizados`);

  // 4. Validar
  const remaining = (JSON.stringify(posts).match(/wp-content/g) || []).length;
  if (remaining > 0) {
    console.log(`\n⚠ Quedan ${remaining} referencias a wp-content — revisar content-images-cache.json`);
  } else {
    console.log("\n✅ Sin referencias a wp-content. Listo para reimportar posts.");
    console.log("\n📋 Siguiente paso:");
    console.log("   $env:API_KEY = 'TU_KEY'; npx tsx scripts/wp-import.ts");
    console.log("   (Los posts existentes se actualizarán via PUT automáticamente)");
  }
}

main().catch((e) => {
  console.error("❌ Error fatal:", e);
  process.exit(1);
});
