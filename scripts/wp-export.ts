/**
 * wp-export.ts
 * Exporta todos los posts de WordPress via REST API al formato BlogPost de JhedAI.
 *
 * Uso:
 *   npx tsx scripts/wp-export.ts
 *
 * Output:
 *   scripts/output/posts-export.json     <- Array de BlogPost listos para importar
 *   scripts/output/authors-export.json   <- Autores deduplicados
 *   scripts/output/images-map.json       <- {wp_url: local_path}
 *   scripts/output/checkpoint.json       <- {page, lastSlug} para reanudar
 *   scripts/output/export-log.json       <- {slug, status, error?} por post
 *   scripts/output/images/posts/         <- Imágenes featured
 *   scripts/output/images/og/            <- Imágenes OG
 *   scripts/output/images/authors/       <- Avatares de autores
 */

import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

// ─── Config ──────────────────────────────────────────────────────────────────

const WP_BASE = "https://jhedai.com/wp-json/wp/v2";
const PER_PAGE = 100;
const OUTPUT_DIR = path.join(process.cwd(), "scripts/output");
const IMAGES_DIR = path.join(OUTPUT_DIR, "images");

// ─── Types ───────────────────────────────────────────────────────────────────

interface WPPost {
  id: number;
  slug: string;
  link: string;
  date: string;
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  featured: boolean;
  yoast_head_json?: {
    title?: string;
    description?: string;
    og_title?: string;
    og_description?: string;
    og_image?: Array<{ url: string }>;
    twitter_title?: string;
    twitter_description?: string;
    canonical?: string;
  };
  _embedded?: {
    author?: Array<{
      id: number;
      name: string;
      description: string;
      url: string;
      avatar_urls?: Record<string, string>;
    }>;
    "wp:term"?: Array<Array<{ name: string; taxonomy: string }>>;
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
      media_details?: { sizes?: Record<string, { source_url: string }> };
    }>;
  };
}

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  featured: boolean;
  featuredImage: string | null;
  featuredImageAlt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  canonicalUrl: string;
  wordCount: number;
  primaryAnswer: string | null;
  faqItems: never[];
  keyTakeaways: never[];
  speakableSelectors: string[];
  status: string;
  author: {
    name: string;
    bio: string | null;
    avatar: string | null;
    url: string | null;
    type: "Person" | "Organization";
    jobTitle: string | null;
    sameAs: string[];
  };
  wpOriginalUrl: string;
}

interface Author {
  name: string;
  bio: string | null;
  avatar: string | null;
  url: string | null;
  type: "Person" | "Organization";
  jobTitle: string | null;
  sameAs: string[];
}

interface Checkpoint {
  page: number;
  lastSlug: string;
  totalFetched: number;
}

interface ExportLog {
  slug: string;
  status: "ok" | "error";
  error?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanHtml(html: string): string {
  return html
    // Remover shortcodes de WordPress [gallery], [caption], etc.
    .replace(/\[[^\]]+\]/g, "")
    // Remover atributos de clase WP innecesarios
    .replace(/\s+class="[^"]*wp-[^"]*"/g, "")
    .replace(/\s+class="[^"]*size-[^"]*"/g, "")
    .replace(/\s+class="[^"]*align[^"]*"/g, "")
    // Remover scripts embebidos
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    // Remover iframes (embeds de redes sociales, etc.)
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .trim();
}

function countWords(html: string): number {
  return stripHtml(html).split(/\s+/).filter(Boolean).length;
}

function calcReadTime(wordCount: number): string {
  const minutes = Math.max(1, Math.round(wordCount / 200));
  return `${minutes} min`;
}

function extractFirstParagraph(html: string): string | null {
  const match = html.match(/<p[^>]*>(.*?)<\/p>/is);
  if (!match) return null;
  const text = stripHtml(match[1]).trim();
  return text.length > 10 ? text.slice(0, 300) : null;
}

function extractSameAs(bio: string, url: string): string[] {
  const sameAs: string[] = [];
  if (url) sameAs.push(url);
  const linkedinMatch = bio?.match(/https?:\/\/(www\.)?linkedin\.com\/in\/[^\s"'<>]+/i);
  if (linkedinMatch) sameAs.push(linkedinMatch[0]);
  const twitterMatch = bio?.match(/https?:\/\/(www\.)?(twitter|x)\.com\/[^\s"'<>]+/i);
  if (twitterMatch) sameAs.push(twitterMatch[0]);
  return [...new Set(sameAs)];
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[áàäâ]/g, "a")
    .replace(/[éèëê]/g, "e")
    .replace(/[íìïî]/g, "i")
    .replace(/[óòöô]/g, "o")
    .replace(/[úùüû]/g, "u")
    .replace(/ñ/g, "n")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ─── File helpers ─────────────────────────────────────────────────────────────

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

// ─── HTTP helpers ─────────────────────────────────────────────────────────────

function fetchJson<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, { headers: { "User-Agent": "JhedAI-WP-Exporter/1.0" } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        fetchJson<T>(res.headers.location!).then(resolve).catch(reject);
        return;
      }
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data) as T);
        } catch (e) {
          reject(new Error(`JSON parse error for ${url}: ${e}`));
        }
      });
    });
    req.on("error", reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error(`Timeout: ${url}`)); });
  });
}

function downloadFile(url: string, destPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(destPath)) {
      resolve(destPath);
      return;
    }
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, { headers: { "User-Agent": "JhedAI-WP-Exporter/1.0" } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        downloadFile(res.headers.location!, destPath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on("finish", () => { file.close(); resolve(destPath); });
      file.on("error", reject);
    });
    req.on("error", reject);
    req.setTimeout(30000, () => { req.destroy(); reject(new Error(`Timeout: ${url}`)); });
  });
}

function getImageExtension(url: string): string {
  const match = url.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i);
  return match ? match[1].toLowerCase() : "jpg";
}

async function downloadImage(
  url: string,
  folder: string,
  filename: string,
  imagesMap: Record<string, string>,
): Promise<string | null> {
  if (!url) return null;
  if (imagesMap[url]) return imagesMap[url];

  const ext = getImageExtension(url);
  const destPath = path.join(folder, `${filename}.${ext}`);
  const relativePath = destPath.replace(path.join(OUTPUT_DIR), "").replace(/\\/g, "/");

  try {
    await downloadFile(url, destPath);
    imagesMap[url] = relativePath;
    return relativePath;
  } catch (e) {
    console.warn(`  ⚠ No se pudo descargar imagen: ${url} — ${e}`);
    imagesMap[url] = url; // fallback: mantener URL original
    return url;
  }
}

// ─── Main export logic ────────────────────────────────────────────────────────

async function main() {
  console.log("🚀 JhedAI WordPress Exporter\n");

  // Crear carpetas de output
  [
    OUTPUT_DIR,
    IMAGES_DIR,
    path.join(IMAGES_DIR, "posts"),
    path.join(IMAGES_DIR, "og"),
    path.join(IMAGES_DIR, "authors"),
  ].forEach((dir) => fs.mkdirSync(dir, { recursive: true }));

  // Cargar estado previo (para reanudar si falla)
  const checkpointPath = path.join(OUTPUT_DIR, "checkpoint.json");
  const postsPath = path.join(OUTPUT_DIR, "posts-export.json");
  const authorsPath = path.join(OUTPUT_DIR, "authors-export.json");
  const imagesMapPath = path.join(OUTPUT_DIR, "images-map.json");
  const logPath = path.join(OUTPUT_DIR, "export-log.json");

  const checkpoint = readJson<Checkpoint>(checkpointPath, { page: 1, lastSlug: "", totalFetched: 0 });
  const posts = readJson<BlogPost[]>(postsPath, []);
  const authorsMap = readJson<Record<string, Author>>(authorsPath, {});
  const imagesMap = readJson<Record<string, string>>(imagesMapPath, {});
  const log = readJson<ExportLog[]>(logPath, []);

  const existingSlugs = new Set(posts.map((p) => p.slug));

  let page = checkpoint.page;
  let totalFetched = checkpoint.totalFetched;
  let hasMore = true;

  console.log(`📋 Estado anterior: página ${page}, ${totalFetched} posts ya exportados\n`);

  while (hasMore) {
    const url = `${WP_BASE}/posts?_embed=author,wp:term,wp:featuredmedia&per_page=${PER_PAGE}&page=${page}&status=publish`;
    console.log(`📄 Fetching página ${page}...`);

    let wpPosts: WPPost[];
    try {
      wpPosts = await fetchJson<WPPost[]>(url);
    } catch (e) {
      console.error(`❌ Error en página ${page}: ${e}`);
      break;
    }

    if (!Array.isArray(wpPosts) || wpPosts.length === 0) {
      hasMore = false;
      break;
    }

    console.log(`   ${wpPosts.length} posts encontrados`);

    for (const wp of wpPosts) {
      if (existingSlugs.has(wp.slug)) {
        console.log(`   ↷ Skip (ya exportado): ${wp.slug}`);
        continue;
      }

      console.log(`   → Procesando: ${wp.slug}`);

      try {
        // ── Author ──────────────────────────────────────────────────────────
        const wpAuthor = wp._embedded?.author?.[0];
        const authorName = wpAuthor?.name || "JhedAi";
        const authorKey = slugify(authorName);

        if (!authorsMap[authorKey]) {
          const avatarUrl = wpAuthor?.avatar_urls?.["96"] || wpAuthor?.avatar_urls?.["48"] || null;
          let avatarLocal: string | null = null;
          if (avatarUrl) {
            avatarLocal = await downloadImage(
              avatarUrl,
              path.join(IMAGES_DIR, "authors"),
              authorKey,
              imagesMap,
            );
          }

          const bio = wpAuthor?.description || null;
          authorsMap[authorKey] = {
            name: authorName,
            bio,
            avatar: avatarLocal,
            url: wpAuthor?.url || null,
            type: "Person",
            jobTitle: null,
            sameAs: extractSameAs(bio || "", wpAuthor?.url || ""),
          };
        }

        const author = authorsMap[authorKey];

        // ── Taxonomías ───────────────────────────────────────────────────────
        const terms = wp._embedded?.["wp:term"] || [];
        const categories = (terms[0] || []).map((t) => t.name);
        const tags = (terms[1] || []).map((t) => t.name);
        const category = categories[0] || "General";

        // ── Imágenes ─────────────────────────────────────────────────────────
        const featuredMedia = wp._embedded?.["wp:featuredmedia"]?.[0];
        const featuredImageUrl = featuredMedia?.source_url || null;
        const featuredImageAlt = featuredMedia?.alt_text || null;

        let featuredImageLocal: string | null = null;
        if (featuredImageUrl) {
          featuredImageLocal = await downloadImage(
            featuredImageUrl,
            path.join(IMAGES_DIR, "posts"),
            wp.slug,
            imagesMap,
          );
        }

        const ogImageUrl = wp.yoast_head_json?.og_image?.[0]?.url || featuredImageUrl;
        let ogImageLocal: string | null = null;
        if (ogImageUrl) {
          ogImageLocal = await downloadImage(
            ogImageUrl,
            path.join(IMAGES_DIR, "og"),
            `${wp.slug}-og`,
            imagesMap,
          );
        }

        // ── Contenido ────────────────────────────────────────────────────────
        const rawContent = wp.content.rendered;
        const cleanContent = cleanHtml(rawContent);
        const wordCount = countWords(cleanContent);
        const readTime = calcReadTime(wordCount);
        const primaryAnswer = extractFirstParagraph(cleanContent);

        // ── Canonical URL ────────────────────────────────────────────────────
        // Yoast devuelve la URL de WP: jhedai.com/slug
        // La canónica en React será: jhedai.com/blog/slug
        const wpSlugPath = `/${wp.slug}/`;
        const yoastCanonical = wp.yoast_head_json?.canonical || `https://jhedai.com${wpSlugPath}`;
        // Forzar canonical a la nueva URL con /blog/
        const canonicalUrl = `https://jhedai.com/blog/${wp.slug}`;

        // ── Mapear al formato BlogPost ────────────────────────────────────────
        const blogPost: BlogPost = {
          slug: wp.slug,
          title: stripHtml(wp.title.rendered),
          excerpt: stripHtml(wp.excerpt.rendered).slice(0, 300),
          content: cleanContent,
          category,
          tags,
          publishedAt: wp.date,
          updatedAt: wp.modified,
          readTime,
          featured: wp.featured || false,
          featuredImage: featuredImageLocal,
          featuredImageAlt,
          metaTitle: wp.yoast_head_json?.title || null,
          metaDescription: wp.yoast_head_json?.description || null,
          ogTitle: wp.yoast_head_json?.og_title || null,
          ogDescription: wp.yoast_head_json?.og_description || null,
          ogImage: ogImageLocal,
          twitterTitle: wp.yoast_head_json?.twitter_title || null,
          twitterDescription: wp.yoast_head_json?.twitter_description || null,
          canonicalUrl,
          wordCount,
          primaryAnswer,
          faqItems: [],
          keyTakeaways: [],
          speakableSelectors: ["h1", ".article-intro", "h2"],
          status: "published",
          author,
          wpOriginalUrl: wp.link, // guardamos la URL original de WP para el redirect
        };

        posts.push(blogPost);
        existingSlugs.add(wp.slug);
        log.push({ slug: wp.slug, status: "ok" });
        totalFetched++;

        // Guardar checkpoint después de cada post
        checkpoint.lastSlug = wp.slug;
        checkpoint.totalFetched = totalFetched;

      } catch (e) {
        const errMsg = e instanceof Error ? e.message : String(e);
        console.warn(`   ⚠ Error en ${wp.slug}: ${errMsg}`);
        log.push({ slug: wp.slug, status: "error", error: errMsg });
      }

      // Pequeña pausa para no saturar el servidor de WP
      await new Promise((r) => setTimeout(r, 100));
    }

    // Guardar estado después de cada página
    writeJson(postsPath, posts);
    writeJson(authorsPath, authorsMap);
    writeJson(imagesMapPath, imagesMap);
    writeJson(logPath, log);
    checkpoint.page = page + 1;
    writeJson(checkpointPath, checkpoint);

    console.log(`   ✓ Página ${page} completada. Total acumulado: ${totalFetched} posts\n`);

    if (wpPosts.length < PER_PAGE) {
      hasMore = false;
    } else {
      page++;
    }
  }

  // ── Reporte final ────────────────────────────────────────────────────────────
  const errors = log.filter((l) => l.status === "error");
  const imagesCount = Object.keys(imagesMap).length;

  console.log("─".repeat(50));
  console.log(`✅ Exportación completa`);
  console.log(`   Posts exportados:  ${posts.length}`);
  console.log(`   Autores únicos:    ${Object.keys(authorsMap).length}`);
  console.log(`   Imágenes descargadas: ${imagesCount}`);
  console.log(`   Errores:           ${errors.length}`);

  if (errors.length > 0) {
    console.log("\n⚠ Posts con errores:");
    errors.forEach((e) => console.log(`  - ${e.slug}: ${e.error}`));
  }

  console.log("\n📁 Archivos generados:");
  console.log(`   ${postsPath}`);
  console.log(`   ${authorsPath}`);
  console.log(`   ${imagesMapPath}`);
  console.log(`   ${logPath}`);

  // ── Validación: verificar que no queden URLs de wp-content ────────────────
  const postsJson = JSON.stringify(posts);
  const wpContentRefs = (postsJson.match(/wp-content/g) || []).length;
  if (wpContentRefs > 0) {
    console.log(`\n⚠ ADVERTENCIA: ${wpContentRefs} referencias a wp-content encontradas.`);
    console.log("   Ejecutar scripts/wp-upload-images.ts para re-alojar en Cloudflare Images.");
  } else {
    console.log("\n✅ Sin referencias a wp-content — imágenes descargadas correctamente.");
  }

  // ── Generar lista de redirects para _redirects ────────────────────────────
  const redirectLines = posts
    .filter((p) => p.wpOriginalUrl)
    .map((p) => {
      const wpPath = new URL(p.wpOriginalUrl).pathname;
      return `${wpPath}    /blog/${p.slug}    301`;
    });

  const redirectsPath = path.join(OUTPUT_DIR, "wp-redirects.txt");
  fs.writeFileSync(
    redirectsPath,
    "# Redirects generados automáticamente desde WordPress\n# Pegar en public/_redirects ANTES del SPA fallback (/*)\n\n" +
    redirectLines.join("\n") + "\n",
    "utf-8",
  );
  console.log(`\n🔀 Redirects 301 generados: ${redirectsPath}`);
  console.log("   Copiar el contenido en public/_redirects antes del /* fallback.");
}

main().catch((e) => {
  console.error("❌ Error fatal:", e);
  process.exit(1);
});
