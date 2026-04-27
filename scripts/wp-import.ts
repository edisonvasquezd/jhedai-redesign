/**
 * wp-import.ts
 * Importa los posts exportados por wp-export.ts al Cloudflare Worker / D1.
 *
 * Uso:
 *   API_KEY=xxx npx tsx scripts/wp-import.ts
 *
 * Requiere:
 *   - scripts/output/posts-export.json  (con imágenes ya en Cloudflare Images)
 *   - API_KEY: X-Api-Key del Cloudflare Worker
 *
 * Proceso:
 *   1. Importa autores deduplicados primero
 *   2. Importa posts uno a uno con rate limiting
 *   3. Si un post ya existe (409) → hace PUT para actualizarlo
 *   4. Guarda checkpoint para reanudar si falla
 */

import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

// ─── Config ──────────────────────────────────────────────────────────────────

const API_KEY = process.env.API_KEY;
const API_BASE = process.env.API_BASE || "https://jhedai-api.edison-985.workers.dev";
const OUTPUT_DIR = path.join(process.cwd(), "scripts/output");
const RATE_LIMIT_MS = 250; // ms entre requests

if (!API_KEY) {
  console.error("❌ Falta variable de entorno: API_KEY");
  console.error("   Uso: API_KEY=xxx npx tsx scripts/wp-import.ts");
  process.exit(1);
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface ImportCheckpoint {
  lastImportedSlug: string;
  importedSlugs: string[];
  failedSlugs: string[];
  authorsImported: string[];
}

interface ImportLog {
  slug: string;
  status: "created" | "updated" | "error";
  error?: string;
  timestamp: string;
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

function apiRequest(
  method: "GET" | "POST" | "PUT",
  endpoint: string,
  body?: unknown,
): Promise<{ status: number; data: unknown }> {
  return new Promise((resolve, reject) => {
    const url = new URL(`${API_BASE}${endpoint}`);
    const isHttps = url.protocol === "https:";
    const client = isHttps ? https : http;

    const bodyStr = body ? JSON.stringify(body) : undefined;

    const options = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
      method,
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": API_KEY!,
        "User-Agent": "JhedAI-WP-Importer/1.0",
        ...(bodyStr ? { "Content-Length": Buffer.byteLength(bodyStr) } : {}),
      },
    };

    const req = client.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode || 0, data: data ? JSON.parse(data) : null });
        } catch {
          resolve({ status: res.statusCode || 0, data: data });
        }
      });
    });

    req.on("error", reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error(`Timeout: ${endpoint}`)); });

    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── Importar autor ───────────────────────────────────────────────────────────

async function importAuthor(author: Record<string, unknown>): Promise<boolean> {
  try {
    // Verificar si el autor ya existe
    const getRes = await apiRequest("GET", "/api/authors");
    if (getRes.status === 200) {
      const existing = getRes.data as { data?: Array<{ name: string }> };
      const found = existing?.data?.find((a) => a.name === author.name);
      if (found) return true; // ya existe
    }

    // Crear autor (el endpoint requiere slug)
    const authorWithSlug = {
      ...author,
      slug: (author.name as string)
        .toLowerCase()
        .normalize("NFD").replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    };
    const res = await apiRequest("POST", "/api/authors", authorWithSlug);
    if (res.status === 200 || res.status === 201) {
      return true;
    } else {
      console.warn(`  ⚠ Error creando autor ${author.name}: HTTP ${res.status}`);
      return false;
    }
  } catch (e) {
    console.warn(`  ⚠ Excepción creando autor ${author.name}: ${e}`);
    return false;
  }
}

// ─── Importar post ────────────────────────────────────────────────────────────

async function importPost(
  post: Record<string, unknown>,
): Promise<"created" | "updated" | "error"> {
  // Mapear al formato que espera la API (snake_case)
  const payload = {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    tags: post.tags,
    published_at: post.publishedAt,
    updated_at: post.updatedAt,
    read_time: post.readTime,
    featured: post.featured ? 1 : 0,
    featured_image: post.featuredImage || null,
    featured_image_alt: post.featuredImageAlt || null,
    meta_title: post.metaTitle || null,
    meta_description: post.metaDescription || null,
    og_title: post.ogTitle || null,
    og_description: post.ogDescription || null,
    og_image: post.ogImage || null,
    twitter_title: post.twitterTitle || null,
    twitter_description: post.twitterDescription || null,
    canonical_url: post.canonicalUrl || null,
    word_count: post.wordCount || 0,
    primary_answer: post.primaryAnswer || null,
    faq_items: post.faqItems || [],
    key_takeaways: post.keyTakeaways || [],
    speakable_selectors: post.speakableSelectors || ["h1", ".article-intro", "h2"],
    status: post.status || "published",
    author_name: (post.author as Record<string, unknown>)?.name || "JhedAi",
  };

  try {
    // Intentar crear (POST)
    const createRes = await apiRequest("POST", "/api/blog/posts", payload);

    if (createRes.status === 200 || createRes.status === 201) {
      return "created";
    }

    // Si ya existe (409 o 500 con UNIQUE constraint) → actualizar (PUT)
    const isConflict =
      createRes.status === 409 ||
      (createRes.status === 500 &&
        typeof createRes.data === "object" &&
        createRes.data !== null &&
        (createRes.data as Record<string, unknown>).message?.toString().includes("UNIQUE"));

    if (isConflict) {
      const updateRes = await apiRequest("PUT", `/api/blog/posts/${post.slug}`, payload);
      if (updateRes.status === 200) {
        return "updated";
      } else {
        console.warn(`  ⚠ Error actualizando ${post.slug}: HTTP ${updateRes.status}`);
        return "error";
      }
    }

    console.warn(`  ⚠ Error inesperado ${post.slug}: HTTP ${createRes.status}`);
    return "error";

  } catch (e) {
    console.warn(`  ⚠ Excepción en ${post.slug}: ${e}`);
    return "error";
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("📥 JhedAI WordPress Importer → D1\n");
  console.log(`   API: ${API_BASE}\n`);

  const postsPath = path.join(OUTPUT_DIR, "posts-export.json");
  const checkpointPath = path.join(OUTPUT_DIR, "checkpoint-import.json");
  const logPath = path.join(OUTPUT_DIR, "import-log.json");

  if (!fs.existsSync(postsPath)) {
    console.error("❌ No se encontró posts-export.json.");
    console.error("   Ejecutar: npx tsx scripts/wp-export.ts");
    process.exit(1);
  }

  // ── Verificar que las imágenes principales estén en Cloudflare Images ───────
  const postsRaw = fs.readFileSync(postsPath, "utf-8");
  const posts = JSON.parse(postsRaw) as Record<string, unknown>[];

  const badFeatured = posts.filter(
    (p) => typeof p.featuredImage === "string" && (p.featuredImage.includes("wp-content") || p.featuredImage.startsWith("/images/"))
  ).length;
  const badOg = posts.filter(
    (p) => typeof p.ogImage === "string" && (p.ogImage.includes("wp-content") || p.ogImage.startsWith("/images/"))
  ).length;

  if (badFeatured > 0 || badOg > 0) {
    console.error(`❌ BLOQUEADO: ${badFeatured + badOg} posts aún tienen featuredImage/ogImage apuntando a wp-content o /images/.`);
    console.error("   Ejecutar primero: npx tsx scripts/wp-upload-images.ts");
    process.exit(1);
  }

  const wpContentInContent = (postsRaw.match(/wp-content/g) || []).length;
  if (wpContentInContent > 0) {
    console.warn(`⚠ ${wpContentInContent} referencias a wp-content dentro del contenido HTML — se importarán igual (URLs de WP siguen activas).`);
  }
  const checkpoint = readJson<ImportCheckpoint>(checkpointPath, {
    lastImportedSlug: "",
    importedSlugs: [],
    failedSlugs: [],
    authorsImported: [],
  });
  const log = readJson<ImportLog[]>(logPath, []);

  const importedSet = new Set(checkpoint.importedSlugs);
  const failedSet = new Set(checkpoint.failedSlugs);

  console.log(`📋 Posts totales: ${posts.length}`);
  console.log(`   Ya importados: ${importedSet.size}`);
  console.log(`   Pendientes:    ${posts.length - importedSet.size}\n`);

  // ── Paso 1: Importar autores únicos ───────────────────────────────────────
  console.log("👤 Importando autores...");
  const authorsToImport = new Map<string, Record<string, unknown>>();

  for (const post of posts) {
    const author = post.author as Record<string, unknown>;
    const key = author.name as string;
    if (!authorsToImport.has(key) && !checkpoint.authorsImported.includes(key)) {
      authorsToImport.set(key, author);
    }
  }

  for (const [name, author] of authorsToImport) {
    process.stdout.write(`   → ${name}... `);
    const ok = await importAuthor(author);
    if (ok) {
      checkpoint.authorsImported.push(name);
      console.log("✓");
    } else {
      console.log("✗");
    }
    await sleep(RATE_LIMIT_MS);
  }

  writeJson(checkpointPath, checkpoint);
  console.log(`   ✓ Autores procesados\n`);

  // ── Paso 2: Importar posts ────────────────────────────────────────────────
  console.log("📝 Importando posts...\n");

  let created = 0;
  let updated = 0;
  let errors = 0;
  let skipped = 0;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const slug = post.slug as string;

    if (importedSet.has(slug)) {
      skipped++;
      continue;
    }

    const progress = `[${i + 1 - skipped}/${posts.length - importedSet.size}]`;
    process.stdout.write(`${progress} ${slug}... `);

    const result = await importPost(post);

    if (result === "created") {
      created++;
      importedSet.add(slug);
      checkpoint.importedSlugs.push(slug);
      checkpoint.lastImportedSlug = slug;
      console.log("✓ creado");
    } else if (result === "updated") {
      updated++;
      importedSet.add(slug);
      if (!checkpoint.importedSlugs.includes(slug)) checkpoint.importedSlugs.push(slug);
      checkpoint.lastImportedSlug = slug;
      console.log("✓ actualizado");
    } else {
      errors++;
      failedSet.add(slug);
      checkpoint.failedSlugs = [...failedSet];
      console.log("✗ error");
    }

    log.push({
      slug,
      status: result,
      timestamp: new Date().toISOString(),
    });

    // Guardar checkpoint cada 10 posts
    if ((i + 1) % 10 === 0) {
      writeJson(checkpointPath, checkpoint);
      writeJson(logPath, log);
    }

    await sleep(RATE_LIMIT_MS);
  }

  // Guardar estado final
  writeJson(checkpointPath, checkpoint);
  writeJson(logPath, log);

  // ── Reporte final ─────────────────────────────────────────────────────────
  console.log("\n" + "─".repeat(50));
  console.log(`✅ Importación completa`);
  console.log(`   Creados:    ${created}`);
  console.log(`   Actualizados: ${updated}`);
  console.log(`   Ya existían: ${skipped}`);
  console.log(`   Errores:    ${errors}`);

  if (errors > 0) {
    console.log("\n⚠ Posts con errores:");
    [...failedSet].forEach((s) => console.log(`  - ${s}`));
    console.log("\n  Volver a ejecutar el script para reintentar los fallidos.");
  }

  // ── Validación: verificar total en API ───────────────────────────────────
  console.log("\n🔍 Verificando total en API...");
  try {
    const verifyRes = await apiRequest("GET", "/api/blog/posts?limit=1");
    if (verifyRes.status === 200) {
      const resData = verifyRes.data as { data?: { data?: unknown[]; total?: number } };
      const total = resData?.data?.total;
      console.log(`   Posts en API: ${total}`);
      console.log(`   Posts en WP export: ${posts.length}`);
      if (total === posts.length) {
        console.log("   ✅ Totales coinciden — migración completa");
      } else {
        console.log(`   ⚠ Diferencia de ${Math.abs((total || 0) - posts.length)} posts — revisar errores`);
      }
    }
  } catch {
    console.log("   ⚠ No se pudo verificar el total en la API");
  }

  console.log("\n📋 Siguiente paso:");
  console.log("   npm run build   ← regenera el sitemap con todos los posts");
  console.log("   npx vercel --prod --yes");
  console.log("   npm run deploy:cloudflare");
}

main().catch((e) => {
  console.error("❌ Error fatal:", e);
  process.exit(1);
});
