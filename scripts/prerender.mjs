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
import { requiresAccess, normalizePath } from '../src/lib/paidRoutes.js'

const ON_VERCEL = Boolean(process.env.VERCEL)

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
// Concurrencia baja: la máquina de build de Vercel tiene solo 2 núcleos.
const CONCURRENCY = 3
// NAV_TIMEOUT y CONTENT_TIMEOUT recortados a propósito (antes 30s/15s, luego
// 10s/8s — TODAVÍA insuficiente): dos despliegues seguidos murieron a los
// ~45-46 min por el propio límite de build de Vercel (Build Failed: timed
// out), no por un fallo de la app. La navegación en sí es rápida siempre
// (<1s medido, incluso bajo la misma concurrencia que usa este script) — el
// tiempo se va en la espera de contenido tras el goto, cuya causa exacta bajo
// carga real de Vercel no se ha podido fijar con certeza (candidatos:
// Firebase sin resolver en ese Chromium, @vercel/analytics contra un
// endpoint que no existe en el preview local del build). Visto en directo:
// una página tardando 32.7s, justo timeout + reintento con los valores
// anteriores — así que además de recortar más, el reintento se ha quitado
// (ver worker(), más abajo): dobla el peor caso sin aportar gran cosa ahora
// que el build tolera un puñado de páginas fallidas (umbral del 5%).
// Peor caso con estos valores, SIN reintento: 312 × (8s+6s) / CONCURRENCY
// ≈ 24 min — margen de sobra bajo el límite de 45 min aunque la causa de
// fondo no se resuelva nunca.
const NAV_TIMEOUT = 8_000
const CONTENT_TIMEOUT = 6_000
// Espera a que Helmet aplique la meta. Corto a propósito: cuando ya hay
// contenido pintado, la meta llega en milisegundos o no va a llegar.
const META_TIMEOUT = 3_000

// Bloqueamos anuncios/analítica reales durante el snapshot: no aportan
// contenido, e ir cargando anuncios de doubleclick 237 veces se comía la
// memoria del build (el navegador headless llegó a caerse a mitad de
// proceso) y generaba impresiones falsas contra la propia cuenta de AdSense.
const BLOCKED_HOSTS = /doubleclick\.net|googlesyndication\.com|googleadservices\.com|google-analytics\.com|googletagmanager\.com/

const sitemap = readFileSync(join(ROOT, 'public', 'sitemap.xml'), 'utf8')
const allUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname)

// Las ~110 URLs de /juegos/* y /examen/* NO se prerrenderizan. Salida de
// emergencia tras varios builds seguidos muriendo por el límite de 45 min de
// Vercel sin que acotar timeouts ni quitar el reintento lo arreglara del
// todo: quitando de un plumazo la mitad de las páginas que hay que procesar,
// el build no puede volver a acercarse al límite pase lo que pase con la
// causa de fondo (sin identificar con certeza).
//
// No cuesta nada real: AccessGate (src/components/AccessGate.jsx) decide el
// muro en el navegador del usuario, en tiempo real — funciona igual de bien
// sin importar si la página llegó pre-renderizada o como el shell vacío de
// siempre (así ha funcionado SIEMPRE el resto del sitio antes de que
// existiera este script). Lo único que se pierde es la meta específica por
// URL (título/descripción en el HTML inicial, que ayuda a crawlers y a la
// vista previa de compartir en WhatsApp) en esas páginas concretas — y como
// son de pago, no hay anuncios detrás que dependan de que Google las indexe.
//
// Revertir cuando se entienda y arregle la causa real de la lentitud.
const urls = allUrls.filter(u => !requiresAccess(normalizePath(u)))
console.log(`[prerender] ${allUrls.length - urls.length} URLs de pago excluidas del prerender (ver comentario)`)

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
  // Aquí no hay sesión NUNCA — es Chromium headless sin login. AccessGate
  // (src/components/AccessGate.jsx) lee esta bandera para no esperar a
  // Firebase en absoluto en las páginas de pago: sin ella, esperaba hasta
  // 4 s por cada una de las ~110 URLs de /juegos y /examen, y esa espera
  // multiplicada por página fue lo que hizo que el build superase el límite
  // de 45 min de Vercel (Build Failed: timed out, no un cuelgue de la app).
  await context.addInitScript(() => { window.__PRERENDER__ = true })
  return context
}

// Reciclamos página (y de vez en cuando el contexto entero) tras cada
// render: reutilizar la misma pestaña para las ~80 navegaciones de un
// worker acumulaba memoria en Chromium hasta que el proceso se caía a
// mitad del build. Cerrar y reabrir es barato comparado con perder el
// build entero a falta de unas pocas URLs.
const RECYCLE_CONTEXT_EVERY = 25

// Techo absoluto por página, cueste lo que cueste. Existe porque bajar
// NAV_TIMEOUT/CONTENT_TIMEOUT no bastó: en Vercel se vieron páginas tardando
// 60+ segundos pese a que ningún timeout individual pasa de 8s ni hay
// reintento — la sospecha es que el tiempo se iba en page.close() esperando
// a que se cerraran conexiones colgadas (Firestore mantiene un canal
// persistente incluso para una lectura puntual). PAGE_BUDGET_MS acota el
// renderizado en sí con Promise.race, y el cierre de la página se lanza sin
// esperarlo (fire-and-forget): si tarda, tarda en segundo plano, sin
// bloquear el resto del build.
const PAGE_BUDGET_MS = 12_000

async function worker() {
  let context = await newContext()
  let renderedInContext = 0
  while (cursor < urls.length) {
    const urlPath = urls[cursor++]
    const page = await context.newPage()
    const startedAt = Date.now()
    try {
      // SIN reintento a propósito: el reintento DOBLABA el peor caso posible
      // del build entero (312 páginas × dos timeouts completos cada una) y
      // fue lo que hizo que el build superase el límite de 45 min de Vercel
      // — se vio en vivo una página tardando 32.7s, justo el patrón de
      // "agota timeout, reintenta, agota otra vez". Sin reintento el build
      // tolerante a fallos (más abajo, umbral del 5%) es lo que absorbe la
      // página suelta que falle de verdad, sin pagar el doble en todas las
      // páginas lentas.
      const html = await Promise.race([
        renderOne(page, urlPath),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error(`presupuesto de ${PAGE_BUDGET_MS} ms agotado`)), PAGE_BUDGET_MS)
        ),
      ])
      // NO se escribe todavía: ver el volcado tras cerrar el servidor.
      rendered.push({ urlPath, html })
    } catch (err) {
      failed.push({ urlPath, err: err?.message ?? String(err) })
    } finally {
      // Sin await: si la página tiene algo colgado, que se cierre cuando
      // pueda sin retener al worker. Los errores aquí no son nada nuevo que
      // hacer — la página ya está descartada.
      page.close().catch(() => {})
      // Instrumentación permanente y barata: si algo vuelve a tardar de más
      // por página, esto lo señala en el log en vez de descubrirse por un
      // build de 45 min fallido en Vercel sin ninguna pista de dónde.
      const ms = Date.now() - startedAt
      if (ms > 2000) console.log(`[prerender] lenta (${ms} ms): ${urlPath}`)
    }
    renderedInContext++
    if (renderedInContext >= RECYCLE_CONTEXT_EVERY) {
      // Igual que con la página: no bloquear el worker si cerrar el contexto
      // (con todas sus páginas y conexiones) tarda de más.
      context.close().catch(() => {})
      context = await newContext()
      renderedInContext = 0
    }
  }
  context.close().catch(() => {})
}

await Promise.all(Array.from({ length: Math.min(CONCURRENCY, urls.length) }, worker))

// El volcado va justo aquí, ANTES de cerrar navegador y servidor — no
// después, y no dentro del worker (ver por qué NO dentro del worker más
// abajo). En cuanto termina Promise.all ya no hay ningún page.goto() en
// marcha, así que escribir ahora es seguro: nada puede leer un dist/
// a medio escribir. Y es la posición más segura posible para los datos —
// están en memoria y en disco antes de arriesgarse a que browser.close()
// o server.close() se cuelguen con conexiones colgadas (justo lo que
// forzó a matar el build a los 45 min: pequeños page.close() sin esperar
// no bastaron, pero ARE ahora irrelevantes para la corrección del output,
// que ya está en disco antes de intentarlos).
//
// Por qué no dentro del worker, para que quede constancia: `vite preview`
// sirve desde dist/. Escribir dist/index.html en cuanto terminaba de
// renderizar "/" hacía que el resto de URLs sin fichero propio TODAVÍA EN
// RENDER dejaran de recibir el shell limpio de Vite y recibieran la home ya
// renderizada como fallback del SPA — React montaba encima y, como Helmet
// solo gestiona las etiquetas que él mismo creó, las de la home se quedaban
// ahí: 289 de 312 páginas acababan con dos <link rel="canonical"> (el suyo y
// el de la home). Para Google eso es la definición práctica de "contenido
// duplicado". Con el volcado tras el Promise.all, ya no hay render en marcha
// que pueda verse afectado.
for (const { urlPath, html } of rendered) {
  const clean = urlPath.replace(/\/$/, '')
  const outDir = clean ? join(ROOT, 'dist', ...clean.split('/').filter(Boolean)) : join(ROOT, 'dist')
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html, 'utf8')
  written++
}

// A partir de aquí solo queda limpieza (cerrar navegador y servidor). Los
// datos ya están en disco, así que un cuelgue aquí no puede perder nada —
// pero SÍ puede volver a hacer que el build entero muera a los 45 min si se
// deja sin acotar, que es justo lo que pasó: reducir timeouts de página no
// sirvió de nada porque el cuelgue real estaba en un cierre que ni siquiera
// se estaba midiendo. Cada cierre lleva su propio techo, y si no responde a
// tiempo se sigue adelante igualmente — process.exit() al final garantiza
// que el proceso termina pase lo que pase, en vez de quedarse colgado
// esperando a un handle de red que Node no cierra solo.
async function withTimeout(promise, ms, label) {
  let timer
  try {
    await Promise.race([
      promise,
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error(`${label} no respondió en ${ms} ms`)), ms) }),
    ])
  } catch (err) {
    console.log(`[prerender] aviso: ${err.message}`)
  } finally {
    clearTimeout(timer)
  }
}

await withTimeout(browser.close(), 10_000, 'browser.close()')
await withTimeout(
  new Promise((resolve, reject) => server.httpServer.close(err => (err ? reject(err) : resolve()))),
  10_000,
  'server.close()',
)

console.log(`[prerender] ${written}/${urls.length} páginas generadas con contenido real`)
if (unresolved.length) {
  console.log(`[prerender] ${unresolved.length} sin meta específica (title genérico, revisar STATIC_META):`)
  for (const u of unresolved) console.log('  -', u)
}
if (failed.length) {
  console.log(`[prerender] ${failed.length} URLs fallaron al renderizar:`)
  for (const f of failed) console.log('  -', f.urlPath, '→', f.err)

  // Una URL que falla no rompe nada para el usuario real: vercel.json
  // reescribe cualquier ruta sin fichero propio al shell de la SPA, así que
  // esa página sigue funcionando — solo pierde la meta estática que ven
  // crawlers y el preview de WhatsApp/Twitter en ESA URL concreta. Tirar el
  // despliegue ENTERO por un puñado de páginas lentas bajo carga (que main -
  // fiestan un problema real de fondo, pero no le impiden a nadie usar la
  // app) es peor remedio que la enfermedad. Si el problema es sistémico
  // (muchas fallan), eso sí bloquea: >5% del sitemap sin prerenderizar es
  // señal de que algo se rompió de verdad, no de una página suelta bajo
  // carga puntual del build.
  const FAILURE_RATIO_THRESHOLD = 0.05
  if (failed.length / urls.length > FAILURE_RATIO_THRESHOLD) {
    console.log(`[prerender] eso es más del ${FAILURE_RATIO_THRESHOLD * 100}% del sitemap: fallo real, no ruido puntual.`)
    process.exitCode = 1
  }
}

// Salida forzada y explícita: los datos ya están en disco y el trabajo real
// ha terminado, así que el proceso no tiene por qué esperar a que Node cierre
// solo cualquier handle que haya quedado abierto (una conexión de red
// colgada, un timer). Sin esto, ESE handle es indistinguible de "el build
// sigue trabajando" de cara a Vercel, y es la explicación más probable de
// por qué acotar los timeouts de página no evitó los 45 min: el reloj seguía
// corriendo después de que el trabajo útil ya hubiera acabado.
process.exit(process.exitCode ?? 0)
