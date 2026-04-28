/**
 * clean-first-image.ts
 * Elimina la primera <figure><img> del content SOLO cuando su alt text
 * coincide con featuredImageAlt — indica que WordPress embebió la misma
 * imagen destacada dentro del artículo, duplicándola visualmente.
 *
 * Uso:
 *   $env:API_KEY = "xxx"; npx tsx scripts/clean-first-image.ts
 */

import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

const API_KEY = process.env.API_KEY;
const API_BASE = process.env.API_BASE || "https://jhedai-api.edison-985.workers.dev";
const OUTPUT_DIR = path.join(process.cwd(), "scripts/output");
const RATE_LIMIT_MS = 250;

if (!API_KEY) {
  console.error("❌ Falta variable de entorno: API_KEY");
  console.error("   Uso: $env:API_KEY = 'xxx'; npx tsx scripts/clean-first-image.ts");
  process.exit(1);
}

interface Post {
  slug: string;
  content: string;
  featured_image?: string;
  featured_image_alt?: string;
}

function apiRequest(
  method: "GET" | "PUT",
  endpoint: string,
  body?: unknown,
): Promise<{ status: number; data: unknown }> {
  return new Promise((resolve, reject) => {
    const url = new URL(`${API_BASE}${endpoint}`);
    const isHttps = url.protocol === "https:";
    const bodyStr = body ? JSON.stringify(body) : undefined;

    const req = (isHttps ? https : http).request(
      {
        hostname: url.hostname,
        port: url.port || (isHttps ? 443 : 80),
        path: url.pathname + url.search,
        method,
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": API_KEY!,
          "User-Agent": "JhedAI-Cleaner/1.0",
          ...(bodyStr ? { "Content-Length": Buffer.byteLength(bodyStr) } : {}),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode || 0, data: data ? JSON.parse(data) : null });
          } catch {
            resolve({ status: res.statusCode || 0, data });
          }
        });
      }
    );

    req.on("error", reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error(`Timeout: ${endpoint}`)); });
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

function removeFirstFigureIfDuplicate(
  content: string,
  featuredAlt: string,
): { cleaned: string; removed: boolean; reason: string } {
  const figureMatch = content.match(/<figure[\s\S]*?<\/figure>/i);
  if (!figureMatch) return { cleaned: content, removed: false, reason: "no_figure" };

  const firstFigAlt = figureMatch[0].match(/alt="([^"]*)"/i)?.[1]?.trim() || "";
  const fAlt = featuredAlt.trim();

  if (!fAlt || !firstFigAlt || fAlt !== firstFigAlt) {
    return { cleaned: content, removed: false, reason: `alt_mismatch ("${firstFigAlt}" vs "${fAlt}")` };
  }

  const cleaned = content.replace(/<figure[\s\S]*?<\/figure>/i, "").replace(/^\s+/, "");
  return { cleaned, removed: true, reason: "alt_match" };
}

async function getAllPosts(): Promise<Post[]> {
  const posts: Post[] = [];
  let page = 1;
  let total = Infinity;

  while (posts.length < total) {
    const res = await apiRequest("GET", `/api/blog/posts?limit=100&page=${page}`);
    if (res.status !== 200) break;
    const data = res.data as { data?: { data?: Post[]; total?: number } };
    const batch = data?.data?.data || [];
    total = data?.data?.total || 0;
    posts.push(...batch);
    if (batch.length === 0) break;
    page++;
  }

  return posts;
}

async function main() {
  console.log("🧹 JhedAI — Limpieza de imagen destacada duplicada en content\n");
  console.log(`   API: ${API_BASE}`);
  console.log(`   Criterio: elimina primera <figure> solo si su alt === featuredImageAlt\n`);

  const logPath = path.join(OUTPUT_DIR, "clean-first-image-log.json");
  const log: Array<{ slug: string; status: string; reason?: string }> = [];

  console.log("📥 Obteniendo todos los posts...");
  const posts = await getAllPosts();
  console.log(`   Total: ${posts.length} posts\n`);

  let cleaned = 0;
  let skipped = 0;
  let errors = 0;

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const progress = `[${i + 1}/${posts.length}]`;

    if (!post.content || !post.featured_image_alt) {
      process.stdout.write(`${progress} ${post.slug}... saltado (sin content o alt)\n`);
      log.push({ slug: post.slug, status: "skipped", reason: "no_content_or_alt" });
      skipped++;
      continue;
    }

    const { cleaned: newContent, removed, reason } = removeFirstFigureIfDuplicate(
      post.content,
      post.featured_image_alt,
    );

    if (!removed) {
      process.stdout.write(`${progress} ${post.slug}... saltado (${reason})\n`);
      log.push({ slug: post.slug, status: "skipped", reason });
      skipped++;
      continue;
    }

    process.stdout.write(`${progress} ${post.slug}... `);

    const res = await apiRequest("PUT", `/api/blog/posts/${post.slug}`, {
      content: newContent,
    });

    if (res.status === 200) {
      console.log("✓ limpiado");
      log.push({ slug: post.slug, status: "cleaned" });
      cleaned++;
    } else {
      console.log(`✗ HTTP ${res.status}`);
      log.push({ slug: post.slug, status: `error_${res.status}` });
      errors++;
    }

    await sleep(RATE_LIMIT_MS);
  }

  fs.writeFileSync(logPath, JSON.stringify(log, null, 2));

  console.log("\n" + "─".repeat(50));
  console.log(`✅ Limpieza completa`);
  console.log(`   Limpiados: ${cleaned}`);
  console.log(`   Saltados:  ${skipped}`);
  console.log(`   Errores:   ${errors}`);
  console.log(`\n   Log: ${logPath}`);
}

main().catch((e) => {
  console.error("❌ Error fatal:", e);
  process.exit(1);
});
