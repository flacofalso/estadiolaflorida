// @ts-check
import { defineConfig } from 'astro/config';

// SITE y BASE los entrega el flujo de publicación (GitHub Actions).
// Con un dominio propio (ej. arenalaflorida.cl) BASE queda en "/".
export default defineConfig({
  site: process.env.SITE || 'https://example.com',
  base: process.env.BASE || '/',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
