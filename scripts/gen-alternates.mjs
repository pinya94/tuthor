// Genera src/data/alternatesIdioma.js a partir de public/sitemap.xml: qué
// páginas existen de verdad en inglés y en catalán.
//
// Por qué: SEOHead anunciaba a Google una versión /en/ de TODAS las páginas
// (hreflang), también de las que solo existen en castellano. Google iba a
// rastrear esas /en/… inexistentes, el SPA le servía otra cosa con código 200
// y las marcaba como «soft 404». Y al revés: las páginas en catalán, que sí
// existen y traen visitas, no se anunciaban. Ahora cada página declara solo
// los idiomas que tiene, y el sitemap es la única fuente.
//
// Se ejecuta al principio de `npm run build`; el test de alternates comprueba
// que el fichero generado no se haya quedado atrás respecto al sitemap.
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

export function alternatesDesdeSitemap(xml) {
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname.replace(/\/$/, '') || '/')
  const de = pre => paths.filter(p => p === pre || p.startsWith(pre + '/')).map(p => p.slice(pre.length) || '/')
  return { en: [...new Set(de('/en'))].sort(), ca: [...new Set(de('/ca'))].sort() }
}

export function moduloAlternates(xml) {
  const { en, ca } = alternatesDesdeSitemap(xml)
  return `// GENERADO por scripts/gen-alternates.mjs a partir de public/sitemap.xml.
// No editar a mano: se regenera en cada \`npm run build\`.
// Paths SIN prefijo de idioma de las páginas que existen en inglés y en catalán.
export const PATHS_EN = new Set(${JSON.stringify(en)})
export const PATHS_CA = new Set(${JSON.stringify(ca)})
`
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const xml = readFileSync(join(ROOT, 'public', 'sitemap.xml'), 'utf8')
  writeFileSync(join(ROOT, 'src', 'data', 'alternatesIdioma.js'), moduloAlternates(xml), 'utf8')
  const { en, ca } = alternatesDesdeSitemap(xml)
  console.log(`[alternates] ${en.length} páginas en inglés, ${ca.length} en catalán`)
}
