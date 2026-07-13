// ── Prerender de meta por URL ────────────────────────────────────────────────
// Se ejecuta tras `vite build` (ver script "build" en package.json).
// Para cada URL del sitemap genera dist/<ruta>/index.html con title,
// description, canonical, Open Graph y hreflang correctos, de modo que
// crawlers y scrapers de redes sociales (que no ejecutan JS) vean la meta
// real de cada página en vez de la de la home. La app sigue siendo la misma
// SPA: react-helmet-async toma el control al hidratar.
//
// La resolución de meta vive en scripts/seoMeta.mjs (módulo puro, testeado
// en src/lib/__tests__).

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { resolveMeta, BASE_URL, HREFLANG_LANGS, STATIC_META } from './seoMeta.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const template = readFileSync(join(ROOT, 'dist', 'index.html'), 'utf8')
const sitemap = readFileSync(join(ROOT, 'public', 'sitemap.xml'), 'utf8')
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname)

const langPrefix = l => (l === 'es' ? '' : `/${l}`)

function renderPage(urlPath) {
  const lang = urlPath.startsWith('/ca') ? 'ca' : urlPath.startsWith('/en') ? 'en' : 'es'
  const neutral = urlPath.replace(/^\/(en|ca)(?=\/|$)/, '').replace(/\/$/, '') || '/'
  const meta = resolveMeta(neutral, lang)

  const pagePath = neutral === '/' ? '' : neutral
  const canonical = `${BASE_URL}${langPrefix(lang)}${pagePath}` + (pagePath ? '' : '/')

  const defaultTitle = lang === 'en'
    ? 'Tuthor — Study with games: history, maths, geography, science and languages'
    : 'Tuthor — Estudia con juegos: historia, matemáticas, geografía, ciencias e idiomas'
  const title = meta?.title ? `${meta.title} | Tuthor` : defaultTitle
  const desc = meta?.desc ?? STATIC_META['/'][lang === 'en' ? 'en' : 'es'].desc

  // data-rh="true": react-helmet-async adopta estos tags al hidratar y los
  // sustituye por los suyos (mismos valores) en vez de duplicarlos.
  const ogLocale = lang === 'en' ? 'en_GB' : lang === 'ca' ? 'ca_ES' : 'es_ES'
  const metaBlock = [
    `<meta data-rh="true" name="description" content="${esc(desc)}" />`,
    `<link data-rh="true" rel="canonical" href="${canonical}" />`,
    ...HREFLANG_LANGS.map(l => `<link data-rh="true" rel="alternate" hreflang="${l}" href="${BASE_URL}${langPrefix(l)}${pagePath || '/'}" />`),
    `<link data-rh="true" rel="alternate" hreflang="x-default" href="${BASE_URL}${pagePath || '/'}" />`,
    `<meta data-rh="true" property="og:title" content="${esc(title)}" />`,
    `<meta data-rh="true" property="og:description" content="${esc(desc)}" />`,
    `<meta data-rh="true" property="og:url" content="${canonical}" />`,
    `<meta data-rh="true" property="og:type" content="website" />`,
    `<meta data-rh="true" property="og:image" content="${BASE_URL}/og-image.png" />`,
    `<meta data-rh="true" property="og:locale" content="${ogLocale}" />`,
    `<meta data-rh="true" property="og:site_name" content="Tuthor" />`,
    `<meta data-rh="true" name="twitter:card" content="summary_large_image" />`,
    `<meta data-rh="true" name="twitter:title" content="${esc(title)}" />`,
    `<meta data-rh="true" name="twitter:description" content="${esc(desc)}" />`,
    `<meta data-rh="true" name="twitter:image" content="${BASE_URL}/og-image.png" />`,
  ].join('\n    ')

  const html = template
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>\n    ${metaBlock}`)

  return { html, resolved: Boolean(meta) }
}

let written = 0
const unresolved = []
for (const urlPath of urls) {
  const { html, resolved } = renderPage(urlPath)
  if (!resolved) unresolved.push(urlPath)
  const clean = urlPath.replace(/\/$/, '')
  const outDir = clean ? join(ROOT, 'dist', ...clean.split('/').filter(Boolean)) : join(ROOT, 'dist')
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html, 'utf8')
  written++
}

console.log(`[prerender] ${written} páginas generadas desde el sitemap`)
if (unresolved.length) {
  console.log(`[prerender] ${unresolved.length} sin meta específica (canonical/hreflang correctos, title genérico):`)
  for (const u of unresolved) console.log('  -', u)
}
