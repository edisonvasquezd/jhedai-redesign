-- Migration: 0001_blog_geo_fields
-- Agrega columnas GEO/AEO/SEO faltantes para la migración desde WordPress
-- Aplicar con: wrangler d1 execute jhedai --file=migrations/0001_blog_geo_fields.sql
--
-- Rollback:
--   No hay DROP COLUMN en SQLite antiguo. Para revertir, recrear la tabla sin estas columnas.

ALTER TABLE blog_posts ADD COLUMN og_title TEXT;
ALTER TABLE blog_posts ADD COLUMN og_description TEXT;
ALTER TABLE blog_posts ADD COLUMN og_image TEXT;
ALTER TABLE blog_posts ADD COLUMN twitter_title TEXT;
ALTER TABLE blog_posts ADD COLUMN twitter_description TEXT;
ALTER TABLE blog_posts ADD COLUMN key_takeaways TEXT;       -- JSON array: ["punto 1", "punto 2"]
ALTER TABLE blog_posts ADD COLUMN status TEXT DEFAULT 'published'; -- published | draft
