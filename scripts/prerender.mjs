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
//
// Chromium: el contenedor de build de Vercel no tiene las librerías de
// sistema que necesita el Chromium normal de Playwright (falla con
// "libnspr4.so: cannot open shared object file"), y no hay acceso root
// para instalarlas. En Vercel (process.env.VERCEL) se usa el binario
// autocontenido de @sparticuz/chromium (pensado para entornos serverless
// sin esas libs). En local se usa el Chromium que ya gestiona Playwright
// — instálalo una vez con `npx playwright install chromium`.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { chromium } from 'playwright'
import sparticuzChromium from '@sparticuz/chromium'
import { preview } from 'vite'

import { resolveMeta } from './seoMeta.mjs'

const ON_VERCEL = Boolean(process.env.VERCEL)

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
// Concurrencia baja: la máquina de build de Vercel tiene solo 2 núcleos.
const CONCURRENCY = 3
const NAV_TIMEOUT = 30_000
const CONTENT_TIMEOUT = 15_000
// Espera a que Helmet aplique la meta. Corto a propósito: cuando ya hay
// contenido pintado, la meta llega en milisegundos o no va a llegar.
const META_TIMEOUT = 3_000

// Bloqueamos anuncios/analítica reales durante el snapshot: no aportan
// contenido, e ir cargando anuncios de doubleclick 237 veces se comía la
// memoria del build (el navegador headless llegó a caerse a mitad de
// proceso) y generaba impresiones falsas contra la propia cuenta de AdSense.
const BLOCKED_HOSTS = /doubleclick\.net|googlesyndication\.com|googleadservices\.com|google-analytics\.com|googletagmanager\.com/

const sitemap = readFileSync(join(ROOT, 'public', 'sitemap.xml'), 'utf8')
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname)

const unresolved = urls.filter(urlPath => {
  const lang = urlPath.startsWith('/ca') ? 'ca' : urlPath.startsWith('/en') ? 'en' : 'es'
  const neutral = urlPath.replace(/^\/(en|ca)(?=\/|$)/, '').replace(/\/$/, '') || '/'
  return !resolveMeta(neutral, lang)
})

const server = await preview({ root: ROOT, preview: { port: 4174, strictPort: false }, logLevel: 'warn' })
const base = server.resolvedUrls.local[0].replace(/\/$/, '')
// @sparticuz/chromium mete --single-process (todo el navegador, todas las
// pestañas, en un solo proceso del SO) porque está pensado para una
// invocación de Lambda que renderiza una página y termina. Aquí abrimos
// decenas de páginas en paralelo durante minutos: con --single-process,
// que UNA pestaña reviente tira abajo el navegador entero. Lo quitamos
// (junto a --no-zygote, que va de la mano) para que Chromium use su
// arquitectura normal multiproceso, mucho más resiliente para esto.
const vercelArgs = sparticuzChromium.args.filter(a => a !== '--single-process' && a !== '--no-zygote')
const browser = ON_VERCEL
  ? await chromium.launch({ args: vercelArgs, executablePath: await sparticuzChromium.executablePath() })
  : await chromium.launch()

let cursor = 0
let written = 0
const failed = []
// Los HTML se acumulan aquí y se vuelcan al final, con el servidor ya cerrado
// (ver el porqué junto al bucle de escritura). Son ~312 páginas de unos 100 KB:
// unas decenas de MB en memoria, nada al lado de lo que ocupa Chromium.
const rendered = []

async function renderOne(page, urlPath) {
  await page.goto(base + urlPath, { waitUntil: 'load', timeout: NAV_TIMEOUT })
  // Espera a que React haya pintado contenido real: no solo el shell vacío,
  // sino la ruta en sí ya cargada. Las rutas se cargan con lazy(), así que
  // justo tras el 'load' del documento el <div id="root"> puede tener ya
  // texto (nav + banner de cookies) mientras la ruta sigue en su fallback
  // de Suspense (el spinner de PageLoader, App.jsx) — de ahí que también
  // haga falta comprobar que no quede ningún spinner visible.
  await page.waitForFunction(
    () => {
      const root = document.getElementById('root')
      if (!root || root.querySelector('.animate-spin')) return false
      return (root.innerText?.length ?? 0) > 40
    },
    { timeout: CONTENT_TIMEOUT },
  )
  // Esperar a que Helmet haya aplicado la meta, no a que pasen 250 ms. El
  // margen fijo que había aquí era una carrera y la perdían unas 20 páginas por
  // build: se capturaban con el <title> genérico del shell y SIN canonical
  // ninguno, que es justo el aspecto que tiene una página "de poco valor" a
  // ojos de Google. El canonical es la señal más fiable de que Helmet ya pasó,
  // porque SEOHead siempre lo emite.
  // Se traga el fallo a propósito: hay páginas del sitemap que no montan
  // SEOHead y ahí el canonical no va a llegar nunca. Reventar por eso las
  // dejaría fuera del prerender (y con el retry, +30 s de build cada una).
  // Que no aparezca es un problema de esa página, no de este script.
  await page.waitForFunction(
    () => document.head.querySelector('link[rel="canonical"]') !== null,
    { timeout: META_TIMEOUT },
  ).catch(() => {})
  // Margen corto para el resto de efectos tardíos (imágenes, og:*)
  await page.waitForTimeout(100)

  // El shell de Vite trae su propio <title> y Helmet añade el suyo en vez de
  // reemplazarlo, así que quedaban dos por página. Nos quedamos con el primero,
  // que es el de Helmet y el que usan navegador y buscadores.
  await page.evaluate(() => {
    const titles = [...document.head.querySelectorAll('title')]
    titles.slice(1).forEach(t => t.remove())
  })
  // Alguna página redirige sola nada más montar (p. ej. si depende de
  // location.state y no lo recibe). Si para cuando leemos el HTML ya no
  // estamos en la URL esperada, es mejor fallar (y conservar el shell
  // original de vite) que guardar el contenido de la página a la que
  // saltó — que no tiene nada que ver con esta URL.
  if (new URL(page.url()).pathname !== urlPath) {
    throw new Error(`la página navegó a ${page.url()} en vez de quedarse en ${urlPath}`)
  }
  const html = await page.content()
  if (html.length < 500) {
    throw new Error('contenido sospechosamente corto tras el render')
  }
  return html
}

async function newContext() {
  const context = await browser.newContext()
  await context.route('**/*', route => (
    BLOCKED_HOSTS.test(route.request().url()) ? route.abort() : route.continue()
  ))
  return context
}

// Reciclamos página (y de vez en cuando el contexto entero) tras cada
// render: reutilizar la misma pestaña para las ~80 navegaciones de un
// worker acumulaba memoria en Chromium hasta que el proceso se caía a
// mitad del build. Cerrar y reabrir es barato comparado con perder el
// build entero a falta de unas pocas URLs.
const RECYCLE_CONTEXT_EVERY = 25

async function worker() {
  let context = await newContext()
  let renderedInContext = 0
  while (cursor < urls.length) {
    const urlPath = urls[cursor++]
    const page = await context.newPage()
    try {
      let html
      try {
        html = await renderOne(page, urlPath)
      } catch {
        html = await renderOne(page, urlPath) // un reintento antes de rendirse
      }
      // NO se escribe todavía: ver el volcado tras cerrar el servidor.
      rendered.push({ urlPath, html })
    } catch (err) {
      failed.push({ urlPath, err: err?.message ?? String(err) })
    } finally {
      await page.close()
    }
    renderedInContext++
    if (renderedInContext >= RECYCLE_CONTEXT_EVERY) {
      await context.close()
      context = await newContext()
      renderedInContext = 0
    }
  }
  await context.close()
}

await Promise.all(Array.from({ length: Math.min(CONCURRENCY, urls.length) }, worker))

await browser.close()
await new Promise((resolve, reject) => server.httpServer.close(err => (err ? reject(err) : resolve())))

// El volcado va DESPUÉS de cerrar el servidor, y no dentro del worker, por un
// motivo que costó encontrar: `vite preview` sirve desde dist/. Al escribir
// dist/index.html en cuanto terminaba de renderizar "/", todas las URLs que
// aún no tenían fichero propio dejaban de recibir el shell limpio de Vite y
// pasaban a recibir la home YA RENDERIZADA como fallback del SPA. React
// montaba encima, y como Helmet solo gestiona las etiquetas que él mismo creó,
// las de la home se quedaban ahí: 289 de 312 páginas acababan con dos
// <link rel="canonical"> (el suyo y el de la home) y dos descripciones.
//
// Para Google eso son cientos de URLs declarando como canónica la portada, que
// es la definición práctica de "contenido duplicado / de poco valor".
//
// Mientras nada se escriba en dist durante el render, el fallback sigue siendo
// el shell limpio y cada página sale con su meta y solo la suya.
for (const { urlPath, html } of rendered) {
  const clean = urlPath.replace(/\/$/, '')
  const outDir = clean ? join(ROOT, 'dist', ...clean.split('/').filter(Boolean)) : join(ROOT, 'dist')
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html, 'utf8')
  written++
}

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
