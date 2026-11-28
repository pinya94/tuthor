// Construye las láminas de Rayos X y sus zonas de toque.
//
//   node scripts/rayos-x/construir.mjs
//
// Entrada: los originales de .auditoria/rayos-x/fuentes (fuera de git; ver
// fuentes.mjs para la URL, el autor y la licencia de cada uno). Otra carpeta:
// RAYOSX_FUENTES=/ruta node scripts/rayos-x/construir.mjs
//
// Salida:
//   public/rayos-x/<capa>.webp      la ilustración, sin rótulos
//   public/rayos-x/manifest.json    fichero → ids, fuentes, licencia, cambios
//   src/data/rayosXZonas.js         por capa: tamaño + zona (path) y centros de cada id
//   .auditoria/rayos-x/depuracion/  capturas con las zonas pintadas (para revisar)
//
// Cómo salen las zonas: cada pieza (un id del juego) se pinta en blanco y todo lo
// demás en negro, respetando el orden de dibujo — lo que tapa a una pieza la
// tapa también en su máscara. Con eso se hace un mapa de etiquetas, se reparte
// el fondo cercano entre las piezas vecinas (toque generoso, sin solapes) y se
// vectoriza. La forma de la zona ES la forma de la ilustración.
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { chromium } from 'playwright'
import sharp from 'sharp'
import { FUENTES } from './fuentes.mjs'
import { absorberLineas, crecer, rellenar, contornos, simplificar, aPath, polos, componentes } from './geometria.mjs'
import { CAPAS } from './capas.mjs'

const RAIZ = process.cwd()
const DIR_F = process.env.RAYOSX_FUENTES || path.join(RAIZ, '.auditoria/rayos-x/fuentes')
const DIR_D = process.env.RAYOSX_DEPURA || path.join(path.dirname(DIR_F), 'depuracion')
const PUB = path.join(RAIZ, 'public/rayos-x')
fs.mkdirSync(PUB, { recursive: true }); fs.mkdirSync(DIR_D, { recursive: true })

const leer = f => fs.readFileSync(path.join(DIR_F, f))
const sha = b => crypto.createHash('sha256').update(b).digest('hex')

const navegador = await chromium.launch()
const pagina = await navegador.newPage({ viewport: { width: 2400, height: 2400 } })

// Prepara la escena en la página: el SVG con viewBox = recorte y tamaño de salida.
// Marca cada forma hoja con data-ix (mismo orden que scripts de inspección) y
// devuelve cuántas hay.
async function cargar(svg, recorte, W, H) {
  await pagina.setContent(`<!doctype html><html><body style="margin:0;background:transparent">${svg.replace(/<\?xml[^>]*>/, '')}</body></html>`)
  return pagina.evaluate(({ recorte, W, H }) => {
    const s = document.querySelector('svg')
    s.setAttribute('viewBox', recorte.join(' '))
    s.setAttribute('width', W); s.setAttribute('height', H)
    s.setAttribute('preserveAspectRatio', 'none')
    s.style.display = 'block'
    const hojas = [...s.querySelectorAll('path,rect,circle,ellipse,polygon,polyline,line,use,image')]
      .filter(e => !e.closest('defs,clipPath,mask,pattern,symbol,marker'))
    hojas.forEach((e, i) => e.setAttribute('data-ix', i))
    window.__hojas = hojas
    // hojas de una lista de selectores CSS o índices
    window.__de = sel => {
      const out = new Set()
      for (const x of sel) {
        if (typeof x === 'number') { out.add(hojas[x]); continue }
        document.querySelectorAll(x).forEach(el => hojas.forEach(h => { if (el === h || el.contains(h)) out.add(h) }))
      }
      return out
    }
    return hojas.length
  }, { recorte, W, H })
}

async function captura(fondoNegro) {
  const el = await pagina.$('svg')
  return el.screenshot({ omitBackground: !fondoNegro, type: 'png' })
}

// Máscara de una parte: blanco lo suyo, negro lo demás (sin tocar los <use>: copian el estilo del original)
async function mascara(sel, W, H) {
  await pagina.evaluate(({ sel }) => {
    const mias = window.__de(sel)
    document.body.style.background = '#000'
    for (const h of window.__hojas) {
      if (h.tagName === 'use') continue
      h.style.visibility = ''
      h.style.filter = mias.has(h) ? 'brightness(0) invert(1)' : 'brightness(0)'
    }
  }, { sel })
  return aBinaria(await captura(true), W, H)
}

// Solo las líneas de corte, gruesas y en blanco (lo demás invisible)
async function mascaraCorte(sel, grosor, W, H) {
  await pagina.evaluate(({ sel, grosor }) => {
    const mias = window.__de(sel)
    document.body.style.background = '#000'
    for (const h of window.__hojas) {
      if (h.tagName === 'use') continue
      if (mias.has(h)) { h.style.visibility = 'visible'; h.style.filter = 'brightness(0) invert(1)'; h.style.strokeWidth = grosor; h.style.stroke = '#fff' }
      else h.style.visibility = 'hidden'
    }
  }, { sel, grosor })
  const m = await aBinaria(await captura(true), W, H)
  await pagina.evaluate(() => { for (const h of window.__hojas) { h.style.visibility = ''; h.style.strokeWidth = ''; h.style.stroke = '' } })
  return m
}

async function aBinaria(png, W, H) {
  const { data, info } = await sharp(png).resize(W, H, { fit: 'fill' }).removeAlpha().raw().toBuffer({ resolveWithObject: true })
  const m = new Uint8Array(W * H)
  for (let i = 0; i < W * H; i++) m[i] = data[i * info.channels] > 127 ? 1 : 0
  return m
}

async function alfa(png, W, H) {
  const { data } = await sharp(png).resize(W, H, { fit: 'fill' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const m = new Uint8Array(W * H)
  for (let i = 0; i < W * H; i++) m[i] = data[i * 4 + 3] > 100 ? 1 : 0
  return m
}

const ops = (W, H, aPx) => ({
  // lo de la máscara que cae dentro del polígono (en coordenadas de la fuente)
  limitar: (m, pol) => {
    const P = pol.map(aPx)
    const r = new Uint8Array(W * H)
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = y * W + x
      if (!m[i]) continue
      let c = false
      for (let a = 0, b = P.length - 1; a < P.length; b = a++) {
        const [xa, ya] = P[a], [xb, yb] = P[b]
        if ((ya > y + 0.5) !== (yb > y + 0.5) && x + 0.5 < ((xb - xa) * (y + 0.5 - ya)) / (yb - ya) + xa) c = !c
      }
      if (c) r[i] = 1
    }
    return r
  },
  unir: (...ms) => { const r = new Uint8Array(W * H); for (const m of ms) for (let i = 0; i < r.length; i++) r[i] |= m[i]; return r },
  quitar: (a, ...bs) => { const r = Uint8Array.from(a); for (const b of bs) for (let i = 0; i < r.length; i++) if (b[i]) r[i] = 0; return r },
  // trozos conexos de `m` (cortada por `corte`) que contienen alguna semilla [x, y] en px de salida
  trozos: (m, corte, semillas) => {
    const base = corte ? Uint8Array.from(m, (v, i) => (v && !corte[i] ? 1 : 0)) : m
    const { comp, lista } = componentes(W, H, i => base[i] === 1)
    const r = new Uint8Array(W * H)
    for (const [x, y] of semillas) {
      const c = comp[Math.round(y) * W + Math.round(x)]
      if (c < 0) throw new Error(`semilla fuera de la pieza: ${x},${y}`)
      for (const k of lista[c]) r[k] = 1
    }
    return r
  },
})

// d + matriz (respecto a la raíz) de formas de un SVG fuente, por índice de hoja
async function extraer(fichero, ixs) {
  await pagina.setContent(leer(fichero).toString('utf8').replace(/<\?xml[^>]*>/, ''))
  return pagina.evaluate(ixs => {
    const s = document.querySelector('svg')
    const hojas = [...s.querySelectorAll('path,rect,circle,ellipse,polygon,polyline,line,use,image')].filter(e => !e.closest('defs,clipPath,mask,pattern,symbol,marker'))
    const raiz = s.getCTM().inverse()
    return ixs.map(i => { const e = hojas[i]; const m = raiz.multiply(e.getCTM()); return { d: e.getAttribute('d'), m: [m.a, m.b, m.c, m.d, m.e, m.f] } })
  }, ixs)
}

const salida = {}
const manifiesto = []
const hoy = new Date().toISOString().slice(0, 10)

for (const capa of CAPAS) {
  console.log(`\n── ${capa.id}`)
  for (const f of capa.fuentes) {
    const h = sha(leer(f))
    if (capa.sha?.[f] && capa.sha[f] !== h) console.warn(`  ⚠ ${f}: sha256 distinto del esperado`)
  }
  const { svg, recorte, escala } = await capa.escena({ leer, extraer })
  const W = Math.round(recorte[2] * escala), H = Math.round(recorte[3] * escala)
  const n = await cargar(svg, recorte, W, H)
  // Fondos y demás que no son dibujo (se ocultan DESPUÉS de numerar las formas)
  if (capa.quitar) await pagina.evaluate(sel => sel.forEach(s => document.querySelectorAll(s).forEach(e => { e.style.display = 'none' })), capa.quitar)
  console.log(`  ${n} formas, salida ${W}×${H}`)
  const aPx = ([x, y]) => [(x - recorte[0]) * escala, (y - recorte[1]) * escala]

  // 1) La ilustración tal cual (fondo transparente)
  await pagina.evaluate(() => { document.body.style.background = 'transparent' })
  const arte = await captura(false)
  const webp = path.join(PUB, `${capa.id}.webp`)
  await sharp(arte).webp({ quality: 88, alphaQuality: 90, effort: 6 }).toFile(webp)
  const alfaArte = await alfa(arte, W, H)

  // 2) Máscaras de cada parte con nombre
  const M = {}
  for (const [nombre, sel] of Object.entries(capa.partes)) M[nombre] = await mascara(sel, W, H)
  const cortes = {}
  for (const [nombre, { sel, grosor }] of Object.entries(capa.cortes ?? {})) cortes[nombre] = await mascaraCorte(sel, grosor, W, H)

  // 3) Cada id del juego a partir de las partes
  const o = ops(W, H, aPx)
  const piezas = capa.piezas({ M, C: cortes, ...o, aPx })
  const ids = Object.keys(piezas)
  const lab = new Int16Array(W * H)
  for (let i = 0; i < W * H; i++) if (alfaArte[i]) lab[i] = -1
  ids.forEach((id, k) => { const m = piezas[id]; for (let i = 0; i < W * H; i++) if (m[i]) lab[i] = k + 1 })

  // Articulaciones y mínimos de toque: discos que mandan sobre lo de debajo
  for (const { id, centros, radio } of capa.discos ?? []) {
    const k = ids.indexOf(id) + 1
    if (!k) throw new Error(`disco de ${id}: id no definido`)
    const r = radio * escala
    for (const c of centros) {
      const [cx, cy] = aPx(c)
      for (let y = Math.floor(cy - r); y <= cy + r; y++) for (let x = Math.floor(cx - r); x <= cx + r; x++) {
        if (x < 0 || y < 0 || x >= W || y >= H) continue
        if ((x + 0.5 - cx) ** 2 + (y + 0.5 - cy) ** 2 <= r * r) lab[y * W + x] = k
      }
    }
  }

  absorberLineas(lab, W, H, capa.lineas ?? 3)
  crecer(lab, W, H, Math.round(capa.crecer * escala))
  rellenar(lab, W, H, capa.huecoMax ?? Infinity)

  // 4) Vectorizar
  const zonas = {}
  const dep = []
  ids.forEach((id, k) => {
    const m = new Uint8Array(W * H)
    let area = 0
    for (let i = 0; i < W * H; i++) if (lab[i] === k + 1) { m[i] = 1; area++ }
    if (!area) throw new Error(`${capa.id}/${id}: zona vacía`)
    const lazos = contornos(m, W, H).map(l => simplificar(l, capa.eps ?? 0.9)).filter(l => l.length >= 3)
    // centros: un punto bien dentro de cada trozo grande (los trocitos sueltos no cuentan)
    // (partida por la línea media: lo que existe a los dos lados da un centro por lado)
    const mc = Uint8Array.from(m)
    if (capa.eje != null) { const xe = Math.round(aPx([capa.eje, 0])[0]); for (let y = 0; y < H; y++) mc[y * W + xe] = 0 }
    const todos = polos(mc, W, H).sort((a, b) => b.area - a.area)
    const ps = todos.filter(p => p.area >= Math.max(150, todos[0].area * 0.06))
    zonas[id] = {
      d: aPath(lazos),
      centros: ps.map(p => [+p.x.toFixed(1), +p.y.toFixed(1)]),
      holgura: +Math.min(...ps.map(p => p.d)).toFixed(1),
    }
    dep.push({ id, d: zonas[id].d, centros: zonas[id].centros })
    console.log(`  ${id.padEnd(24)} área ${area} px · ${ps.length} trozo(s) · holgura ${zonas[id].holgura} px`)
  })
  salida[capa.id] = { img: `/rayos-x/${capa.id}.webp`, w: W, h: H, zonas }

  // 5) Captura de depuración: zonas pintadas sobre la ilustración, con su nombre
  const pal = ['#e6194b', '#3cb44b', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#469990', '#9A6324', '#800000', '#000075', '#ffe119', '#aaffc3', '#808000', '#ff7f7f']
  const dsvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="#0b1530"/>
    <image href="data:image/png;base64,${arte.toString('base64')}" width="${W}" height="${H}"/>
    ${dep.map((z, i) => `<path d="${z.d}" fill="${pal[i % pal.length]}" fill-opacity="0.45" fill-rule="evenodd" stroke="${pal[i % pal.length]}" stroke-width="1.5"/>`).join('')}
    ${dep.map(z => z.centros.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#fff" stroke="#000"/><text x="${x + 5}" y="${y + 4}" font-size="${Math.max(11, W / 55)}" font-family="Arial" font-weight="bold" fill="#fff" stroke="#000" stroke-width="3" paint-order="stroke">${z.id}</text>`).join('')).join('')}
  </svg>`
  await sharp(Buffer.from(dsvg)).png().toFile(path.join(DIR_D, `${capa.id}-zonas.png`))

  manifiesto.push({
    fichero: `public/rayos-x/${capa.id}.webp`,
    capa: capa.id,
    ids,
    fuentes: capa.fuentes.map(f => ({ fichero: f, ...FUENTES[f], sha256: sha(leer(f)) })),
    licencia: capa.licencia,
    modificaciones: capa.modificaciones,
    fecha: hoy,
    validacion: capa.validacion,
  })
}

await navegador.close()

fs.writeFileSync(path.join(PUB, 'manifest.json'), JSON.stringify(manifiesto, null, 2) + '\n')

// Créditos legibles (los exige CC BY / CC BY-SA): uno por fichero publicado
const md = [
  '# Rayos X — créditos de las ilustraciones',
  '',
  'Generado por `scripts/rayos-x/construir.mjs` a partir de `manifest.json` (no editar a mano).',
  'Las láminas no llevan rótulos. Las zonas de toque (`src/data/rayosXZonas.js`) se calculan a partir de la propia ilustración.',
  '',
  ...manifiesto.flatMap(m => [
    `## ${path.basename(m.fichero)} — capa «${m.capa}»`,
    '',
    `- **Ids del juego:** ${m.ids.join(', ')}`,
    `- **Licencia del fichero:** ${m.licencia}`,
    `- **Cambios:** ${m.modificaciones}`,
    `- **Fecha:** ${m.fecha} · **Validación:** ${m.validacion}`,
    '- **Fuentes:**',
    ...m.fuentes.map(f => `  - «${f.titulo}» — ${f.autor} — ${f.licencia} (${f.licenciaUrl}) — ${f.pagina}`),
    '',
  ]),
].join('\n')
fs.writeFileSync(path.join(PUB, 'CREDITOS.md'), md)

const js = `// GENERADO por scripts/rayos-x/construir.mjs — no editar a mano.
// Zonas de toque de Rayos X: por capa, la ilustración (img, w×h px) y, por id,
// el contorno de su forma (d, en px de la imagen, relleno evenodd) y un punto
// bien dentro de cada trozo (centros) para el teclado y los tests.
export const LAMINAS = ${JSON.stringify(salida)}
`
fs.writeFileSync(path.join(RAIZ, 'src/data/rayosXZonas.js'), js)
console.log('\nOK: public/rayos-x/*.webp, manifest.json y src/data/rayosXZonas.js')
