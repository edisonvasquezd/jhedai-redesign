-- Migration: 0002_blog_canonical_url
-- Agrega columna canonical_url faltante en migración 0001
-- Aplicar con: wrangler d1 execute jhedai-db --file=migrations/0002_blog_canonical_url.sql --remote
--
-- Rollback: No hay DROP COLUMN en SQLite. Recrear tabla sin esta columna.

ALTER TABLE blog_posts ADD COLUMN canonical_url TEXT;
