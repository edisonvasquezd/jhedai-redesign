# Plan: Migración WordPress → React/Cloudflare (JhedAI Blog)
# Versión 3.0 — Estado post-migración + gaps SEO/GEO/AEO descubiertos en auditoría

## Fuentes Oficiales
- WordPress REST API: https://developer.wordpress.org/rest-api/reference/posts/
- Google Site Migration: https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes
- Google E-E-A-T: https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t
- Google AI Search 2025: https://developers.google.com/search/blog/2025/05/succeeding-in-ai-search
- speakable schema: https://developers.google.com/search/docs/appearance/structured-data/speakable
- Schema.org WebSite: https://schema.org/WebSite

---

## ESTADO ACTUAL (al 2026-04-27)

### ✅ Completado
| Paso | Descripción |
|------|-------------|
| 0 | Pre-auditoría de D1, WP REST API, yoast_head_json |
| 1 | Fixes React: SEOHead con ogTitle/ogDescription/twitterTitle/twitterDescription, canonical fix, speakableSelectors fallback corregido a `.article-intro`, robots.txt sin conflicto, _redirects WP legacy |
| 2 | Migración D1: migrations/0001 (7 columnas SEO), migrations/0002 (canonical_url) |
| 3 | Script wp-export.ts — 89 posts exportados con Yoast SEO, autores, imágenes |
| 4 | Script wp-upload-images.ts — featured/og/avatar a Cloudflare Images |
| 4b | Script wp-upload-content-images.ts — 442 imágenes de contenido HTML a Cloudflare Images |
| 5 | Script wp-import.ts — 89 posts importados + 4 autores creados |
| 5b | Worker api.ts actualizado — INSERT/PUT/formatPost incluyen todos los campos SEO/GEO/AEO |
| 6 | Deploy dual: Vercel (jhedai-redesign.vercel.app) + Cloudflare Pages (jhedai.pages.dev) |
| 6b | Sitemap corregido: URL del worker fix → 99 URLs de blog generadas en build |

### ⏳ Pendiente (este plan)
- PASO 9: Fixes SEO/GEO/AEO críticos descubiertos en auditoría post-migración
- PASO 7: Google Search Console
- PASO 8: Validación final + cutover DNS

---

## GAPS DESCUBIERTOS EN AUDITORÍA (ordenados por impacto)

| # | Gap | Archivo | Severidad | Estado |
|---|-----|---------|-----------|--------|
| A | XSS: dangerouslySetInnerHTML sin DOMPurify | BlogPostPage.tsx | 🔴 CRÍTICO | Pendiente |
| B | rel=prev/next fuera de Helmet — no llegan al `<head>` | BlogListPage.tsx | 🟠 ALTO | Pendiente |
| C | SpeakableSpecification: `.article-intro` no existe si primaryAnswer es null | BlogPostPage.tsx | 🟠 ALTO | Pendiente |
| D | WebSite schema + SearchAction completamente ausente | — | 🟠 ALTO | Pendiente |
| E | Sitemap sin lastmod real (usa fecha de build, no updated_at) | vite.config.ts | 🟡 MEDIO | Pendiente |
| F | BreadcrumbList faltante en BlogListPage | BlogListPage.tsx | 🟡 MEDIO | Pendiente |
| G | twitter:site y twitter:creator nunca se emiten | SEOHead.tsx | 🟡 MEDIO | Pendiente |
| H | og:site_name duplicado: hardcodeado en index.html Y por Helmet | index.html | 🟡 MEDIO | Pendiente |

---

## PASO 9 — Fixes SEO/GEO/AEO post-auditoría

### 9.1 XSS: Sanitizar dangerouslySetInnerHTML con DOMPurify 🔴

**Archivo:** `src/pages/BlogPostPage.tsx`

Instalar:
```bash
npm install dompurify
npm install -D @types/dompurify
```

```typescript
// ANTES (vulnerable):
<div
  className="prose prose-invert prose-lg max-w-none..."
  dangerouslySetInnerHTML={{ __html: post.content }}
/>

// DESPUÉS (seguro):
import DOMPurify from "dompurify";

const safeContent = DOMPurify.sanitize(post.content, {
  ADD_TAGS: ["iframe"],           // si hay embeds de YouTube legítimos
  ADD_ATTR: ["allowfullscreen", "frameborder", "allow"],
});

<div
  className="prose prose-invert prose-lg max-w-none..."
  dangerouslySetInnerHTML={{ __html: safeContent }}
/>
```

### 9.2 rel=prev/next dentro de Helmet 🟠

**Archivo:** `src/pages/BlogListPage.tsx`

```typescript
// ANTES (fuera de Helmet — queda en body, Google lo ignora):
{currentPage > 1 && (
  <link rel="prev" href={...} />
)}

// DESPUÉS (dentro del SEOHead o de un Helmet adicional):
import { Helmet } from "react-helmet-async";

// Dentro del JSX, ANTES del return principal del contenido:
<Helmet>
  {currentPage > 1 && (
    <link rel="prev" href={`https://jhedai.com/blog${currentPage === 2 ? "" : `?page=${currentPage - 1}`}`} />
  )}
  {currentPage < data.totalPages && (
    <link rel="next" href={`https://jhedai.com/blog?page=${currentPage + 1}`} />
  )}
</Helmet>
```

### 9.3 SpeakableSpecification — selector robusto 🟠

**Archivo:** `src/pages/BlogPostPage.tsx` (inline en el schema BlogPosting)

```typescript
// ANTES (fragil — .article-intro no existe si primaryAnswer es null):
"cssSelector": post.speakableSelectors?.length
  ? post.speakableSelectors
  : ["h1", ".article-intro", "h2"]

// DESPUÉS (robusto — .article-intro solo si primaryAnswer existe):
"cssSelector": post.speakableSelectors?.length
  ? post.speakableSelectors
  : post.primaryAnswer
    ? ["h1", ".article-intro", "h2"]
    : ["h1", "h2"]
```

### 9.4 WebSite schema + SearchAction 🟠

**Archivo:** `src/components/schemas/WebSiteSchema.tsx` (crear nuevo)

```typescript
import { JsonLd } from "react-schemaorg";
import type { WebSite } from "schema-dts";

export function WebSiteSchema() {
  return (
    <JsonLd<WebSite>
      item={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://jhedai.com/#website",
        name: "JhedAI",
        url: "https://jhedai.com",
        description: "Consultora de inteligencia artificial en Chile",
        inLanguage: "es-CL",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://jhedai.com/blog?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        } as unknown as import("schema-dts").Action,
      }}
    />
  );
}
```

Agregar en `src/pages/HomePage.tsx` junto a `OrganizationSchema`:
```typescript
import { WebSiteSchema } from "@/components/schemas/WebSiteSchema";
// ...
<WebSiteSchema />
<OrganizationSchema />
```

### 9.5 Sitemap con lastmod real 🟡

**Archivo:** `vite.config.ts`

```typescript
// ANTES — solo slugs, sin lastmod:
async function getBlogSlugs(): Promise<string[]> {
  const res = await fetch("https://jhedai-api.edison-985.workers.dev/api/sitemap-data");
  const json = await res.json() as { data?: Array<{ slug: string }> };
  return (json.data || []).map((p) => `/blog/${p.slug}`);
}
// ...
dynamicRoutes: [...staticRoutes, ...blogRoutes],

// DESPUÉS — con lastmod desde updated_at:
interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: string;
  priority?: number;
}

async function getBlogRoutes(): Promise<SitemapEntry[]> {
  try {
    const res = await fetch("https://jhedai-api.edison-985.workers.dev/api/sitemap-data");
    const json = await res.json() as { data?: Array<{ slug: string; updated_at: string }> };
    return (json.data || []).map((p) => ({
      url: `/blog/${p.slug}`,
      lastmod: p.updated_at ? new Date(p.updated_at).toISOString() : undefined,
      changefreq: "weekly",
      priority: 0.8,
    }));
  } catch {
    return [];
  }
}
// En defineConfig:
const blogRoutes = await getBlogRoutes();
// dynamicRoutes acepta strings o SitemapEntry[] según el plugin
dynamicRoutes: [...staticRoutes, ...blogRoutes],
```

> Verificar que `vite-plugin-sitemap` acepta objetos con `lastmod` — si no, usar `generateSitemapRoutes` o `routes` como alternativa del plugin.

### 9.6 BreadcrumbList en BlogListPage 🟡

**Archivo:** `src/pages/BlogListPage.tsx`

```typescript
import { BreadcrumbSchema } from "@/components/schemas/BreadcrumbSchema";

// Dentro del JSX (solo en página 1, las paginas > 1 tienen canonical propio):
<BreadcrumbSchema
  items={[
    { name: "Inicio", url: "https://jhedai.com/" },
    { name: "Blog", url: "https://jhedai.com/blog" },
  ]}
/>
```

### 9.7 twitter:site y twitter:creator 🟡

**Archivo:** `src/components/SEOHead.tsx`

```typescript
// Agregar a SEOHeadProps:
twitterSite?: string;      // handle de la cuenta (@jhedai)
twitterCreator?: string;   // handle del autor del post

// Agregar en los meta tags:
<meta name="twitter:site" content={twitterSite || "@jhedai"} />
{twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}
```

En `BlogPostPage.tsx`, pasar el handle del autor si tiene Twitter en `sameAs`:
```typescript
const twitterHandle = post.author.sameAs
  ?.find((url: string) => url.includes("twitter.com") || url.includes("x.com"))
  ?.split("/").pop();

<SEOHead
  ...
  twitterSite="@jhedai"
  twitterCreator={twitterHandle ? `@${twitterHandle}` : undefined}
/>
```

### 9.8 Limpiar og:site_name duplicado 🟡

**Archivo:** `public/index.html`

Eliminar las líneas del `<head>` de index.html que duplican lo que inyecta Helmet en runtime:
```html
<!-- ELIMINAR estas líneas de index.html — Helmet las inyecta dinámicamente: -->
<meta property="og:site_name" content="JhedAi" />
<meta property="og:locale" content="es_CL" />
```

Asegurarse de que `SEOHead.tsx` los emite siempre:
```typescript
<meta property="og:site_name" content="JhedAI" />
<meta property="og:locale" content="es_CL" />
```

---

## PASO 7 — Google Search Console

1. **Verificar token GSC** — si era vía archivo HTML de WP (`google123abc.html`),
   migrar a `<meta name="google-site-verification">` en `public/index.html`:
   ```html
   <meta name="google-site-verification" content="{TOKEN}" />
   ```
   O usar DNS TXT record (más robusto, sobrevive cualquier cambio de frontend).

2. **Enviar sitemap:** GSC → Sitemaps → `https://jhedai.com/sitemap.xml`

3. **Change of Address Tool:** Solo si el dominio cambia (no aplica aquí — mismo dominio).

4. **Monitoreo post-deploy:**

| Semana | Acción |
|--------|--------|
| 0 | Deploy + submit sitemap + guardar baseline de GSC |
| 1 | Coverage: Crawled but not indexed |
| 2 | URLs indexadas >= total WP (89 posts) |
| 4 | Clicks vs baseline (±10% aceptable) |
| 8 | Rich Results Test en muestra de 5 posts |
| 12 | Core Web Vitals |
| 24 | Comparativa completa 6 meses |

---

## PASO 8 — Validación Final

### Pre-cutover (ya ejecutado ✅)
- [x] 5/5 slugs aleatorios responden 200 en API
- [x] 0 referencias wp-content en datos
- [x] 0 featured_image con wp-content
- [x] robots.txt correcto
- [x] _redirects con reglas WP legacy + SPA fallback
- [x] Sitemap con 99 URLs de blog
- [x] og_title, canonical_url, status llegando correctamente en API

### Post-cutover (cuando jhedai.com apunte a Cloudflare Pages)

| Check | Herramienta | Criterio |
|-------|-------------|---------|
| BlogPosting schema válido | Rich Results Test | Sin errores |
| FAQPage schema válido | Rich Results Test | Si el post tiene faqItems |
| SpeakableSpecification | Rich Results Test | Selectores matchean el DOM |
| BreadcrumbList 4 niveles | Rich Results Test | Correcto |
| WebSite + SearchAction | Rich Results Test | Presente en home |
| Canonical sin double-prefix | DevTools | Una sola URL |
| OG image desde CF Images | curl | HTTP 200 |
| Twitter card preview | Twitter Card Validator | Imagen + título correcto |
| robots.txt intacto | Browser | AI bots permitidos |
| /wp-admin/ redirige 301 | curl -I | 301 → / |
| /slug-antiguo redirige | curl -I | 301 → /blog/slug |
| Sin 404s en slugs migrados | curl loop | 0 errores |

---

## PASO 10 — DNS Cutover (cuando estés listo)

1. En tu registrador DNS, cambiar el registro A/CNAME de `jhedai.com` para apuntar a Cloudflare Pages
2. Verificar propagación: `nslookup jhedai.com`
3. Ejecutar validaciones post-cutover del Paso 8
4. Monitorear GSC las primeras 48h

---

## Archivos modificados en este proyecto

| Archivo | Acción | Estado |
|---------|--------|--------|
| `scripts/wp-export.ts` | Creado | ✅ |
| `scripts/wp-import.ts` | Creado + fixes | ✅ |
| `scripts/wp-upload-images.ts` | Creado | ✅ |
| `scripts/wp-upload-content-images.ts` | Creado | ✅ |
| `migrations/0001_blog_geo_fields.sql` | Creado | ✅ |
| `migrations/0002_blog_canonical_url.sql` | Creado | ✅ |
| `src/components/SEOHead.tsx` | Modificado (ogTitle, canonical fix) | ✅ parcial |
| `src/pages/BlogPostPage.tsx` | Modificado (schemas, GEO/AEO) | ✅ parcial |
| `src/lib/api.ts` | Modificado (normalizePost, speakableSelectors fix) | ✅ |
| `src/pages/BlogListPage.tsx` | rel=prev/next (fuera de Helmet) | ⚠ fix pendiente |
| `vite.config.ts` | URL fix, lastmod pendiente | ⚠ fix pendiente |
| `public/_redirects` | Creado | ✅ |
| `public/robots.txt` | Existente y correcto | ✅ |
| `public/index.html` | og duplicados a limpiar | ⚠ fix pendiente |
| `src/components/schemas/WebSiteSchema.tsx` | Crear | ❌ pendiente |
| `jhedai-backend/src/routes/api.ts` | INSERT/PUT/formatPost con campos SEO | ✅ |

---

## Orden de ejecución recomendado

```
PASO 9.1  → Fix XSS DOMPurify                    (crítico, hacer primero)
PASO 9.4  → WebSite schema + SearchAction         (alto impacto GEO)
PASO 9.2  → rel=prev/next dentro de Helmet        (alto impacto SEO)
PASO 9.3  → SpeakableSpecification robusta        (fix rápido)
PASO 9.6  → BreadcrumbList en BlogListPage        (fix rápido)
PASO 9.7  → twitter:site / twitter:creator        (fix rápido)
PASO 9.8  → Limpiar og duplicado en index.html    (fix rápido)
PASO 9.5  → Sitemap con lastmod real              (requiere verificar plugin API)
→ npm run build + deploy dual
PASO 7    → Google Search Console
PASO 8    → Validación final
PASO 10   → DNS Cutover (cuando se decida)
```
