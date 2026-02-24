# JhedAI - Consultora de Inteligencia Artificial

Sitio web corporativo de JhedAI con optimizaciones SEO avanzadas, efectos 3D de alta performance y arquitectura lista para Cloudflare.

🌐 **Producción**: https://jhedai-redesign.vercel.app

---

## 🚀 Stack Tecnológico

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite 7** - Build tool ultra-rápido
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animaciones fluidas

### 3D & Graphics
- **Three.js** - Librería 3D WebGL
- **@react-three/fiber** - React renderer para Three.js
- **@react-three/drei** - Helpers útiles para R3F
- Efectos optimizados: Torus Knot, Particle Sphere, Methodology Scene

### SEO & Performance
- **react-helmet-async** - Meta tags thread-safe
- **react-schemaorg + schema-dts** - Structured data type-safe
- **web-vitals** - Core Web Vitals tracking
- **vite-plugin-sitemap** - Auto-generación de sitemap
- **vite-plugin-compression** - Gzip + Brotli

### Deployment
- **Vercel** (actual) - Edge deployment
- **Cloudflare Pages** (ready) - 330+ edge locations, Workers, Images

---

## 📦 Instalación

```bash
# Clonar repositorio
git clone https://github.com/edisonvasquezd/jhedai-redesign.git
cd jhedai-redesign

# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build producción
npm run build

# Preview build
npm run preview
```

---

## 🎯 Scripts NPM

```bash
# Desarrollo
npm run dev              # Servidor desarrollo Vite (http://localhost:5173)

# Build
npm run build            # TypeScript + Vite build
npm run preview          # Preview build local

# Linting
npm run lint             # ESLint check

# Cloudflare (cuando migres)
npm run deploy:cloudflare    # Build + Deploy a Cloudflare Pages
npm run dev:cloudflare       # Preview con Wrangler local
npm run preview:cloudflare   # Build + Preview Cloudflare
```

---

## 🏗️ Arquitectura del Proyecto

```
jhedai-redesign/
├── src/
│   ├── components/
│   │   ├── 3D/
│   │   │   ├── HeroTorus.tsx          # Torus Knot optimizado (GPU)
│   │   │   ├── ParticleSphere.tsx     # Esfera 80k partículas (Fibonacci)
│   │   │   └── MethodologyScene.tsx   # 4 esferas metodología
│   │   ├── schemas/                   # Schema.org structured data
│   │   │   ├── OrganizationSchema.tsx
│   │   │   ├── ServiceSchema.tsx
│   │   │   ├── BreadcrumbSchema.tsx
│   │   │   ├── BlogPostingSchema.tsx
│   │   │   └── FAQPageSchema.tsx
│   │   ├── SEOHead.tsx                # Meta tags component
│   │   ├── Analytics.tsx              # Plausible/GTM ready
│   │   └── ...                        # Otros componentes
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ServiciosPage.tsx
│   │   ├── NosotrosPage.tsx
│   │   ├── BlogListPage.tsx
│   │   └── ContactoPage.tsx
│   ├── utils/
│   │   ├── deviceDetection.ts         # LOD system
│   │   ├── fibonacciSphere.ts         # Distribución uniforme
│   │   └── vitals.ts                  # Core Web Vitals
│   ├── hooks/
│   │   └── useInViewport.ts           # Viewport detection
│   ├── lib/
│   │   └── api.ts                     # Backend integration
│   └── main.tsx
├── functions/
│   └── _middleware.ts                 # Cloudflare Worker (crawler pre-rendering)
├── public/
│   ├── robots.txt                     # AI crawlers optimizado
│   └── ...
├── scripts/
│   └── test-seo.sh                    # Script validación SEO
├── CLOUDFLARE_MIGRATION.md            # Guía migración Cloudflare
├── SEO_VALIDATION.md                  # Guía validación SEO
├── wrangler.toml                      # Config Cloudflare Pages
├── vite.config.ts                     # Vite + plugins
└── package.json
```

---

## ✨ Features Implementados

### 🎨 3D Graphics Optimizados
- ✅ **HeroTorus**: Möbius Knot con 10k partículas, movimiento GPU-based
- ✅ **ParticleSphere**: 80k partículas con distribución Fibonacci
- ✅ **MethodologyScene**: 4 esferas interactivas con animaciones
- ✅ **LOD System**: Ajuste automático de partículas según device tier
- ✅ **Viewport Detection**: Pause rendering cuando off-screen (battery saving)
- ✅ **Smooth 60fps**: Performance optimizado para desktop/mobile

### 🔍 SEO Completo (Fases 1-3)

#### Fase 1: Fundamentos SEO
- ✅ Meta tags completos (OG, Twitter cards, canonical URLs)
- ✅ 5 Schema.org schemas (Organization, Service, Breadcrumb, BlogPosting, FAQ)
- ✅ Core Web Vitals tracking (LCP, INP, CLS, FCP, TTFB)
- ✅ Sitemap.xml auto-generado
- ✅ robots.txt optimizado para 20+ crawlers (AI bots incluidos)

#### Fase 2: Cloudflare Ready
- ✅ Wrangler CLI configurado
- ✅ Worker middleware para pre-rendering crawlers
- ✅ wrangler.toml con security headers
- ✅ Documentación completa migración

#### Fase 3: Optimizaciones Avanzadas
- ✅ Gzip + Brotli compression (~75% reducción)
- ✅ Code splitting (react-vendor, three-vendor, animation-vendor)
- ✅ Analytics component (Plausible/GTM ready)
- ✅ Bundle optimization

### 📊 Performance Metrics

| Métrica | Antes | Después | Mejora |
|---------|-------|---------|--------|
| Particle Count | 640k | 80k | -87.5% |
| three-vendor.js | 1040KB | 231KB (Brotli) | -77.8% |
| animation-vendor.js | 116KB | 34KB (Brotli) | -70.7% |
| LCP (esperado) | ~4s | <2.5s | ~40% |
| PageSpeed (target) | ~70 | >90 | +20pts |

---

## 🤖 AI Crawlers Configurados

En `robots.txt`:

**Permitidos:**
- ✅ Googlebot, Bingbot, DuckDuckBot
- ✅ **GPTBot** (OpenAI ChatGPT)
- ✅ **Claude-Web** (Anthropic Claude)
- ✅ **Google-Extended** (Gemini/Bard)
- ✅ **PerplexityBot** (Perplexity AI)
- ✅ **YouBot** (You.com)
- ✅ **CCBot** (Common Crawl)

**Bloqueados:**
- ❌ AhrefsBot, SemrushBot (SEO scrapers)
- ❌ DotBot, MJ12bot

---

## 🧪 Testing y Validación

### Validación Automatizada

```bash
# Script de validación SEO
bash scripts/test-seo.sh
```

Verifica:
- Accesibilidad del sitio
- robots.txt y sitemap.xml
- Schema.org JSON-LD
- Meta tags (OG, Twitter)
- Compresión Gzip/Brotli
- Security headers
- Crawler simulation

### Validación Manual

Ver guía completa: **[SEO_VALIDATION.md](SEO_VALIDATION.md)**

**URLs clave:**
- Google Rich Results: https://search.google.com/test/rich-results
- Schema Validator: https://validator.schema.org
- PageSpeed Insights: https://pagespeed.web.dev
- Facebook Debugger: https://developers.facebook.com/tools/debug
- Twitter Card Validator: https://cards-dev.twitter.com/validator

---

## 🚀 Deployment

### Vercel (Actual)

```bash
# Deploy automático via Git push
git push origin master

# O manual
vercel --prod
```

### Cloudflare Pages (Recomendado para SEO)

Ver guía completa: **[CLOUDFLARE_MIGRATION.md](CLOUDFLARE_MIGRATION.md)**

```bash
# 1. Login
npx wrangler login

# 2. Crear proyecto
npx wrangler pages project create jhedai

# 3. Deploy
npm run deploy:cloudflare
```

**Beneficios Cloudflare:**
- ⚡ TTFB <200ms (vs ~800ms Vercel)
- 🌍 330+ edge locations (vs 30 Vercel)
- 🤖 Pre-rendering para crawlers (Worker middleware)
- 🖼️ Cloudflare Images (WebP/AVIF automático)
- ♾️ Bandwidth ilimitado

---

## 📱 Analytics

### Plausible (Privacy-first) - Recomendado

```tsx
// src/components/Analytics.tsx
const USE_PLAUSIBLE = true;
const PLAUSIBLE_DOMAIN = 'jhedai.com';
```

**Ventajas:**
- Sin cookies (GDPR-friendly)
- No consent banner needed
- Lightweight (~1KB)
- Privacy-focused

### Google Tag Manager (Alternativa)

```tsx
// src/components/Analytics.tsx
const GTM_ID = 'GTM-XXXXXX';
const USE_GTM = true;
```

---

## 🔐 Security Headers

Configurados en `wrangler.toml`:

```toml
[headers.values]
X-Frame-Options = "DENY"
X-Content-Type-Options = "nosniff"
Referrer-Policy = "strict-origin-when-cross-origin"
Permissions-Policy = "geolocation=(), microphone=(), camera=()"
```

---

## 🌐 Backend Integration

**API Base URL**: `https://jhedai-api-production.up.railway.app/api/v1`

Endpoints disponibles:
- `POST /contact` - Formulario contacto
- `GET /blog/posts` - Lista de posts
- `GET /blog/posts/:slug` - Post individual

Ver: `src/lib/api.ts`

---

## 📖 Documentación Adicional

- **[CLOUDFLARE_MIGRATION.md](CLOUDFLARE_MIGRATION.md)** - Guía paso a paso migración Cloudflare
- **[SEO_VALIDATION.md](SEO_VALIDATION.md)** - Checklist completo validación SEO
- **[functions/_middleware.ts](functions/_middleware.ts)** - Worker pre-rendering crawlers

---

## 🛠️ Desarrollo

### Agregar Nueva Página

1. Crear componente en `src/pages/`:
```tsx
// src/pages/NuevaPagina.tsx
import SEOHead from '../components/SEOHead';

const NuevaPagina = () => {
    return (
        <>
            <SEOHead
                title="Título de la Página"
                description="Descripción SEO"
                canonical="/nueva-pagina"
            />
            <main>
                {/* Contenido */}
            </main>
        </>
    );
};

export default NuevaPagina;
```

2. Agregar ruta en `src/App.tsx`:
```tsx
<Route path="/nueva-pagina" element={<NuevaPagina />} />
```

3. Agregar a sitemap en `vite.config.ts`:
```ts
dynamicRoutes: [
    // ...
    '/nueva-pagina',
]
```

### Agregar Schema.org

```tsx
import { JsonLd } from 'react-schemaorg';
import type { Organization } from 'schema-dts';

<JsonLd<Organization>
    item={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'JhedAI',
        // ...
    }}
/>
```

---

## 🐛 Troubleshooting

### Build Errors

**Error: Type imports**
```bash
# Usar 'import type' para tipos
import type { BlogPosting } from 'schema-dts';
```

**Error: Peer dependencies**
```bash
# Usar flag legacy-peer-deps (ya configurado en .npmrc)
npm install --legacy-peer-deps
```

### Performance Issues

**3D lag en mobile:**
- LOD system ajusta automáticamente partículas
- Verificar `deviceDetection.ts`

**Scroll jump 3D:**
- useInViewport con `keepMounted=true` previene unmount
- frameloop control en lugar de conditional rendering

---

## 📄 Licencia

Copyright © 2025 JhedAI. Todos los derechos reservados.

---

## 👥 Equipo

Desarrollado con ❤️ por el equipo de JhedAI.

**Contacto**: contacto@jhedai.com

---

## 🙏 Créditos

Optimizaciones SEO y performance implementadas con asistencia de:
- Claude Sonnet 4.5 (Anthropic)

---

**Última actualización**: 2026-02-24
