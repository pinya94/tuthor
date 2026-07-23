// ── Prerender de contenido real por URL ──────────────────────────────────────
// Se ejecuta tras `vite build` (ver script "build" en package.json).
// Tuthor es una SPA (createRoot, sin SSR): el HTML que sirve Vercel de base
// tiene <div id="root"></div> vacío hasta que el bundle de React se ejecuta
// en el cliente. Eso lo ve un usuario normal sin problema, pero un crawler
// que no ejecute JS (o cuyo render tenga presupuesto limitado, como el bot
// de revisión de AdSense) ve una página en blanco.
//
// Para evitarlo, esto abre cada URL del sitemap en Chromium headless
// (Playwright) contra el propio `dist/` ya compilado, espera a que React
// (y react-helmet-async, que gestiona <title>/meta) terminen de pintar, y
// vuelca el HTML final resultante sobre dist/<ruta>/index.html. La app
// sigue siendo la misma SPA: al cargar, React vuelve a montar el árbol
// sobre el contenido ya presente (createRoot lo reemplaza sin error de
// hidratación, no es hydrateRoot).
//
// La resolución de meta "esperada" vive en scripts/seoMeta.mjs (módulo
// puro, testeado en src/lib/__tests__) y aquí solo se usa para avisar de
// URLs sin meta específica; el HTML real sale siempre del snapshot.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { chromium } from 'playwright'
import { preview } from 'vite'

import { resolveMeta } from './seoMeta.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const CONCURRENCY = 6
const NAV_TIMEOUT = 30_000
const CONTENT_TIMEOUT = 15_000

const sitemap = readFileSync(join(ROOT, 'public', 'sitemap.xml'), 'utf8')
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname)

const unresolved = urls.filter(urlPath => {
  const lang = urlPath.startsWith('/ca') ? 'ca' : urlPath.startsWith('/en') ? 'en' : 'es'
  const neutral = urlPath.replace(/^\/(en|ca)(?=\/|$)/, '').replace(/\/$/, '') || '/'
  return !resolveMeta(neutral, lang)
})

const server = await preview({ root: ROOT, preview: { port: 4174, strictPort: false }, logLevel: 'warn' })
const base = server.resolvedUrls.local[0].replace(/\/$/, '')
const browser = await chromium.launch()

let cursor = 0
let written = 0
const failed = []

async function renderOne(page, urlPath) {
  await page.goto(base + urlPath, { waitUntil: 'load', timeout: NAV_TIMEOUT })
  // Espera a que React haya pintado contenido real (no el shell vacío).
  await page.waitForFunction(
    () => (document.getElementById('root')?.innerText?.length ?? 0) > 40,
    { timeout: CONTENT_TIMEOUT },
  )
  // Margen corto para dejar asentar efectos tardíos (helmet, imágenes, etc.)
  await page.waitForTimeout(250)
  return page.content()
}

async function worker() {
  const context = await browser.newContext()
  const page = await context.newPage()
  while (cursor < urls.length) {
    const urlPath = urls[cursor++]
    try {
      let html
      try {
        html = await renderOne(page, urlPath)
      } catch {
        html = await renderOne(page, urlPath) // un reintento antes de rendirse
      }
      const clean = urlPath.replace(/\/$/, '')
      const outDir = clean ? join(ROOT, 'dist', ...clean.split('/').filter(Boolean)) : join(ROOT, 'dist')
      mkdirSync(outDir, { recursive: true })
      writeFileSync(join(outDir, 'index.html'), html, 'utf8')
      written++
    } catch (err) {
      failed.push({ urlPath, err: err?.message ?? String(err) })
    }
  }
  await context.close()
}

await Promise.all(Array.from({ length: Math.min(CONCURRENCY, urls.length) }, worker))

await browser.close()
await new Promise((resolve, reject) => server.httpServer.close(err => (err ? reject(err) : resolve())))

console.log(`[prerender] ${written}/${urls.length} páginas generadas con contenido real`)
if (unresolved.length) {
  console.log(`[prerender] ${unresolved.length} sin meta específica (title genérico, revisar STATIC_META):`)
  for (const u of unresolved) console.log('  -', u)
}
if (failed.length) {
  console.log(`[prerender] ${failed.length} URLs fallaron al renderizar:`)
  for (const f of failed) console.log('  -', f.urlPath, '→', f.err)
  process.exitCode = 1
}
