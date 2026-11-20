// Genera las imágenes que salen al compartir un enlace (WhatsApp, redes):
//   public/og/tuthor.jpg      → la general (portada y todo lo demás)
//   public/og/<slug>.jpg      → una por juego: su dibujo + el logo
//   src/data/ogJuegos.js      → qué juegos la tienen (lo leen SEOHead y el prerender)
//
// Sin texto en la imagen a propósito: el título ya lo pone WhatsApp debajo,
// y así una sola imagen vale para es, en y ca. Lo importante va en el centro
// porque algunas apps recortan la vista previa a un cuadrado.
//
// NO va en el build (cada despliegue no tiene por qué rehacerlas). Se lanza a
// mano cuando hay juegos nuevos:  npx vite-node scripts/gen-og.mjs
import fs from 'node:fs'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { chromium } from 'playwright'
import { ARTE_JUEGOS } from '../src/components/arte/index.jsx'
import { GAMES } from '../src/data/constants.js'

const SALIDA = 'public/og'
fs.mkdirSync(SALIDA, { recursive: true })
const logo = fs.readFileSync('public/logo.svg', 'utf8').replace(/<\?xml[^>]*>/, '').replace(/<!--[\s\S]*?-->/g, '')
const arte = slug => renderToStaticMarkup(React.createElement(ARTE_JUEGOS[slug], { className: 'arte' }))

const BASE = `
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; overflow: hidden; font-family: system-ui, sans-serif;
    background: radial-gradient(circle at 50% 35%, #1b2541 0%, #0d1324 55%, #0a0f1d 100%); }
  svg.arte, .arte svg { width: 100%; height: 100%; display: block; }
  .logo svg { height: 100%; width: auto; display: block; }
`

function htmlJuego(slug) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${BASE}
    .marco { position: absolute; left: 190px; top: 42px; width: 820px; height: 440px; border-radius: 32px;
      background: rgba(255,255,255,.05); border: 2px solid rgba(255,255,255,.10); padding: 18px; }
    .pie { position: absolute; left: 0; right: 0; top: 512px; display: flex; justify-content: center; align-items: center; gap: 22px; }
    .logo { height: 58px; }
    .web { color: #EDAE49; font-size: 30px; font-weight: 700; letter-spacing: .5px; }
  </style></head><body>
    <div class="marco">${arte(slug)}</div>
    <div class="pie"><div class="logo">${logo}</div><div class="web">tuthor.es</div></div>
  </body></html>`
}

function htmlGeneral(slugs) {
  const fila = slugs.map(s => `<div class="t">${arte(s)}</div>`).join('')
  return `<!doctype html><html><head><meta charset="utf-8"><style>${BASE}
    .fondo { position: absolute; inset: 0; display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(2, 1fr);
      gap: 22px; padding: 26px; opacity: .55; }
    .t { border-radius: 22px; background: rgba(255,255,255,.05); border: 2px solid rgba(255,255,255,.08); padding: 10px; }
    .centro { position: absolute; left: 300px; top: 165px; width: 600px; height: 300px; border-radius: 36px;
      background: rgba(10,15,29,.92); border: 2px solid rgba(237,174,73,.55); box-shadow: 0 20px 80px rgba(0,0,0,.6);
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 26px; }
    .logo { height: 96px; }
    .web { color: #EDAE49; font-size: 34px; font-weight: 800; }
  </style></head><body>
    <div class="fondo">${fila}</div>
    <div class="centro"><div class="logo">${logo}</div><div class="web">tuthor.es</div></div>
  </body></html>`
}

const listos = new Set(GAMES.filter(g => g.ready && g.path).map(g => g.path.replace(/^\/juegos\//, '')))
const slugs = Object.keys(ARTE_JUEGOS).filter(s => listos.has(s)).sort()

const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1200, height: 630 } })
async function foto(html, ruta) {
  await p.setContent(html, { waitUntil: 'load' })
  await p.screenshot({ path: ruta, type: 'jpeg', quality: 84 })
}
await foto(htmlGeneral(['portadas', 'clave-dicotomica', 'escalera-unidades', 'fuerza-neta', 'corrige-el-texto', 'climograma', 'numpath', 'europa-27'].filter(s => ARTE_JUEGOS[s])), `${SALIDA}/tuthor.jpg`)
for (const s of slugs) await foto(htmlJuego(s), `${SALIDA}/${s}.jpg`)
await b.close()

fs.writeFileSync('src/data/ogJuegos.js', `// GENERADO por scripts/gen-og.mjs: juegos con imagen propia para compartir
// (public/og/<slug>.jpg). No editar a mano.
export const OG_JUEGOS = new Set(${JSON.stringify(slugs)})
`)
const kb = Math.round([...slugs, 'tuthor'].reduce((t, s) => t + fs.statSync(`${SALIDA}/${s}.jpg`).size, 0) / 1024)
console.log(`${slugs.length} juegos + general · ${kb} KB en total`)
