// Genera las ilustraciones de «Bajo el Microscopio» y sus zonas táctiles a
// partir de los SVG originales de Wikimedia Commons (dominio público,
// LadyofHats / Mariana Ruiz). NO va en el build: se lanza a mano si cambia
// algo de aquí.     node scripts/celula-arte.mjs [--depurar carpeta]
//
// Qué hace, por célula:
//   1. Descarga el original (caché fuera del repo) y comprueba su SHA-1: los
//      índices de abajo valen SOLO para esa versión exacta del fichero.
//   2. Numera cada forma del dibujo en orden de pintado y exige que TODAS
//      estén clasificadas: orgánulo del banco, «pasa» (filamentos y velos que
//      no son de nadie: el toque cae a lo que hay debajo), «otro» (estructura
//      real que no está en el banco: peroxisoma, vesículas… tocarla es fallo)
//      o «nada» (fondo). Si el fichero cambia o se olvida una forma, falla.
//   3. Escribe la ilustración limpia (sin rótulos ni líneas, recortada) en
//      public/microscopio/celula/<tipo>.svg.
//   4. Pinta cada forma de un color plano según su clase, SIN antialiasing, y
//      lee los píxeles: así cada punto de la imagen pertenece a lo que se VE
//      encima, que es justo lo que el alumno cree estar tocando. Ninguna zona
//      puede quedar escondida debajo de otra, porque el resultado es una
//      partición del plano.
//   5. Ensancha lo que mide un par de píxeles en el móvil (membrana vegetal,
//      ribosomas) a costa de sus vecinos, contornea cada zona y la simplifica.
//   6. Escribe src/data/celulaZonas.js (zonas en coordenadas de la imagen).
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import crypto from 'node:crypto'
import { chromium } from 'playwright'
import { PNG } from 'pngjs'

const ESCALA = 3 // píxeles por unidad del dibujo al rasterizar las zonas
const CACHE = path.join(os.tmpdir(), 'tuthor-celula')
const SALIDA_IMG = 'public/microscopio/celula'
const SALIDA_DATOS = 'src/data/celulaZonas.js'
const depurar = process.argv.includes('--depurar') ? process.argv[process.argv.indexOf('--depurar') + 1] : null

// Lisosomas: en el original solo hay uno, una mancha irregular medio tapada
// por la mitocondria que nadie reconocería sin rótulo. Se quita y se usan como
// lisosomas dos de las vesículas esféricas del propio dibujo, con las enzimas
// dibujadas dentro (puntitos), que es como lo enseña el libro; y se añade un
// tercero junto al Golgi, de donde salen. Mismo estilo que las esferas de
// LadyofHats: degradado, reflejo arriba a la izquierda.
const enzimas = (cx, cy, r) => [[-0.38, -0.05], [0.22, -0.34], [0.32, 0.18], [-0.08, 0.38], [-0.02, -0.02]]
  .map(([a, b]) => `<circle cx="${(cx + a * r).toFixed(2)}" cy="${(cy + b * r).toFixed(2)}" r="${(r * 0.13).toFixed(2)}" fill="#3d1f5c" opacity="0.85"/>`).join('')
const lisosomaNuevo = (cx, cy, r) =>
  `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#lisosoma-grad)" stroke="#5a3c86" stroke-width="0.6"/>` +
  `<ellipse cx="${cx - r * 0.3}" cy="${cy - r * 0.38}" rx="${r * 0.38}" ry="${r * 0.24}" fill="#ffffff" opacity="0.55"/>` +
  enzimas(cx, cy, r)
const GRAD_LISOSOMA = '<radialGradient id="lisosoma-grad" cx="0.4" cy="0.35" r="0.75"><stop offset="0" stop-color="#e7dcf7"/><stop offset="0.6" stop-color="#b39ddb"/><stop offset="1" stop-color="#7e63b4"/></radialGradient>'

export const CELULAS = {
  animal: {
    fichero: 'animal.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Animal_cell_structure_en.svg',
    pagina: 'https://commons.wikimedia.org/wiki/File:Animal_cell_structure_en.svg',
    sha1: 'd1d99274bfa8c87f648520594164e347417544a0',
    vista: [14, 30, 540, 356],
    // 10 = mancha del lisosoma (ver arriba) · 24 = flagelo (una célula animal
    // «típica» de libro no lo lleva y despistaba) · 381-446 = rótulos y líneas
    quitar: '10,24,381-446',
    defs: GRAD_LISOSOMA,
    // [después del elemento n, svg, clase]
    añadir: [
      [6, lisosomaNuevo(104, 194, 6.5), 'lisosoma'],
      [11, enzimas(281.541, 240.86, 7.771), 'lisosoma'],
      [58, enzimas(381.188, 192.543, 4.958), 'lisosoma'],
    ],
    clases: {
      membrana: '0-2,17,378-380', // superficie exterior (la membrana vista por fuera) + borde del corte
      citoplasma: '3,6',
      nucleo: '80,81,83-98',
      nucleolo: '82',
      reticulo: '5,79,99-106,331,332,337,348',
      // los del retículo rugoso apenas se ensanchan (si no, se comerían el
      // retículo, que ES la superficie con ribosomas); los libres, en racimo, sí
      ribosoma: '107-330,333-336,338-347,349-363',
      'ribosoma~libre': '364-373',
      golgi: '65-78',
      mitocondria: '13-15,21-23',
      lisosoma: '11,58',
      centriolo: '26-57',
      pasa: '4,7,9,12,18,25,59-64,376,377',
      otro: '8,16,19,20,374,375',
    },
    ensanchar: [['ribosoma', 1.2, ['reticulo']], ['ribosoma~libre', 4, ['citoplasma']], ['centriolo', 2.5, ['citoplasma']], ['lisosoma', 1.5, ['citoplasma']]],
  },
  vegetal: {
    fichero: 'vegetal.svg',
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Plant_cell_structure_svg_2.svg',
    pagina: 'https://commons.wikimedia.org/wiki/File:Plant_cell_structure_svg_2.svg',
    sha1: '3e9c8648f7eb0b8e4a125c61e3477860c225b5ca',
    vista: [184, 96, 382, 334],
    // 0-1 = siluetas de las células vecinas, al fondo (al recortar quedaban
    // cortadas a cuchillo) · 243-571 = capa «Labels»: rótulos y líneas
    quitar: '0,1,243-571',
    defs: '',
    añadir: [],
    clases: {
      pared: '2,24-45,187',
      membrana: '188',
      citoplasma: '3,5-23',
      vacuola: '68,69',
      nucleo: '161-163,165-176',
      nucleolo: '164',
      reticulo: '157-160,177-186',
      ribosoma: '78-156,189-214',
      golgi: '227-242',
      mitocondria: '46,70-72,217-219',
      cloroplasto: '48,49,220,221',
      pasa: '4,73-77',
      otro: '47,50-67,215,216,222-226',
    },
    ensanchar: [['membrana', 3.5, ['pared', 'citoplasma']], ['ribosoma', 2.8, ['citoplasma', 'reticulo']]],
  },
}

const rango = s => s.split(',').flatMap(r => { const [a, z] = r.split('-').map(Number); return z === undefined ? [a] : Array.from({ length: z - a + 1 }, (_, k) => a + k) })

async function original(c) {
  fs.mkdirSync(CACHE, { recursive: true })
  const f = path.join(CACHE, path.basename(c.url))
  if (!fs.existsSync(f)) {
    const r = await fetch(c.url, { headers: { 'User-Agent': 'tuthor-asset-build/1.0' } })
    if (!r.ok) throw new Error(`${c.url}: ${r.status}`)
    fs.writeFileSync(f, Buffer.from(await r.arrayBuffer()))
  }
  const buf = fs.readFileSync(f)
  const sha = crypto.createHash('sha1').update(buf).digest('hex')
  if (sha !== c.sha1) throw new Error(`${f}: SHA-1 ${sha}, se esperaba ${c.sha1}. El fichero de Commons ha cambiado: revisa los índices.`)
  return buf.toString('utf8')
}

// ── Raster → zonas ─────────────────────────────────────────────────────────
function componentes(lab, W, H, k) {
  const comp = new Int32Array(W * H).fill(-1)
  const out = []
  for (let i = 0; i < W * H; i++) {
    if (lab[i] !== k || comp[i] >= 0) continue
    const id = out.length, pila = [i], px = []
    comp[i] = id
    while (pila.length) {
      const p = pila.pop(); px.push(p)
      const x = p % W, y = (p / W) | 0
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = x + dx, ny = y + dy
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
        const q = ny * W + nx
        if (lab[q] === k && comp[q] < 0) { comp[q] = id; pila.push(q) }
      }
    }
    out.push(px)
  }
  return out
}

// Contorno exacto por los bordes de los píxeles (crack following): lista de
// lazos cerrados; con fill-rule evenodd reproducen la región con sus huecos.
function contornos(lab, W, H, k) {
  const dentro = (x, y) => x >= 0 && y >= 0 && x < W && y < H && lab[y * W + x] === k
  const sig = new Map() // "x,y" del vértice → lista de vértices siguientes
  const add = (a, b) => { const key = a.join(','); if (!sig.has(key)) sig.set(key, []); sig.get(key).push(b) }
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (!dentro(x, y)) continue
    // bordes orientados con el interior a la derecha
    if (!dentro(x, y - 1)) add([x, y], [x + 1, y])
    if (!dentro(x + 1, y)) add([x + 1, y], [x + 1, y + 1])
    if (!dentro(x, y + 1)) add([x + 1, y + 1], [x, y + 1])
    if (!dentro(x - 1, y)) add([x, y + 1], [x, y])
  }
  const lazos = []
  for (const [ini] of sig) {
    while (sig.get(ini)?.length) {
      const lazo = []
      let cur = ini.split(',').map(Number)
      do {
        lazo.push(cur)
        const lista = sig.get(cur.join(','))
        const nxt = lista.pop()
        if (!lista.length) sig.delete(cur.join(','))
        cur = nxt
      } while (cur.join(',') !== ini)
      lazos.push(lazo)
    }
  }
  return lazos
}

function simplifica(pts, tol) {
  // Douglas-Peucker sobre un lazo cerrado: se parte por el punto más lejano al primero
  if (pts.length < 8) return pts
  let lejos = 0, dmax = -1
  pts.forEach((p, i) => { const d = (p[0] - pts[0][0]) ** 2 + (p[1] - pts[0][1]) ** 2; if (d > dmax) { dmax = d; lejos = i } })
  const dp = arr => {
    if (arr.length < 3) return arr
    const [a, b] = [arr[0], arr[arr.length - 1]]
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1
    let im = 0, dm = 0
    for (let i = 1; i < arr.length - 1; i++) {
      const d = Math.abs(dy * arr[i][0] - dx * arr[i][1] + b[0] * a[1] - b[1] * a[0]) / L
      if (d > dm) { dm = d; im = i }
    }
    if (dm <= tol) return [a, b]
    return [...dp(arr.slice(0, im + 1)).slice(0, -1), ...dp(arr.slice(im))]
  }
  const r1 = dp(pts.slice(0, lejos + 1)), r2 = dp([...pts.slice(lejos), pts[0]])
  return [...r1.slice(0, -1), ...r2.slice(0, -1)]
}

// Punto más hondo de una región (distancia de chaflán): ahí cae el «centro»
// que usan el teclado y las pruebas de clic.
function puntoHondo(lab, W, H, k) {
  const INF = 1e9, d = new Float32Array(W * H)
  for (let i = 0; i < W * H; i++) d[i] = lab[i] === k ? INF : 0
  const a = 1, b = Math.SQRT2
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x; if (!d[i]) continue
    let v = d[i]
    if (x > 0) v = Math.min(v, d[i - 1] + a); else v = Math.min(v, a)
    if (y > 0) v = Math.min(v, d[i - W] + a); else v = Math.min(v, a)
    if (x > 0 && y > 0) v = Math.min(v, d[i - W - 1] + b)
    if (x < W - 1 && y > 0) v = Math.min(v, d[i - W + 1] + b)
    d[i] = v
  }
  let best = -1, bi = 0
  for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) {
    const i = y * W + x; if (!d[i]) continue
    let v = d[i]
    if (x < W - 1) v = Math.min(v, d[i + 1] + a); else v = Math.min(v, a)
    if (y < H - 1) v = Math.min(v, d[i + W] + a); else v = Math.min(v, a)
    if (x < W - 1 && y < H - 1) v = Math.min(v, d[i + W + 1] + b)
    if (x > 0 && y < H - 1) v = Math.min(v, d[i + W - 1] + b)
    d[i] = v
    if (v > best) { best = v; bi = i }
  }
  return { x: bi % W, y: (bi / W) | 0, prof: best }
}

async function procesa(navegador, tipo, c) {
  const svg = await original(c)
  const page = await navegador.newPage()
  await page.setContent(`<!doctype html><html><body style="margin:0">${svg.replace(/<\?xml[^>]*>/, '').replace(/<!DOCTYPE[^>]*>/i, '')}</body></html>`)

  // 1. Numerar, comprobar que todo está clasificado y añadir lo nuevo
  const clasesIdx = Object.fromEntries(Object.entries(c.clases).map(([k, v]) => [k, rango(v)]))
  const quitar = rango(c.quitar)
  const res = await page.evaluate(({ clasesIdx, quitar, añadir, defs }) => {
    const root = document.querySelector('svg')
    const hojas = [...root.querySelectorAll('path,circle,ellipse,polygon,polyline,rect,line,text,use,image')]
      .filter(e => !e.closest('defs,clipPath,mask,pattern,linearGradient,radialGradient,metadata'))
    const clase = new Map()
    for (const [k, ids] of Object.entries(clasesIdx)) for (const i of ids) {
      if (clase.has(i)) return { error: `elemento ${i} en dos clases (${clase.get(i)} y ${k})` }
      clase.set(i, k)
    }
    const sinClase = []
    hojas.forEach((e, i) => {
      if (quitar.includes(i)) { if (clase.has(i)) sinClase.push(`${i} quitado y clasificado`); return }
      if (!clase.has(i)) sinClase.push(i)
      e.setAttribute('data-clase', clase.get(i))
    })
    if (sinClase.length) return { error: `sin clasificar: ${sinClase.join(',')}` }
    const NS = 'http://www.w3.org/2000/svg'
    for (const [n, html, k] of añadir) {
      const g = document.createElementNS(NS, 'g')
      g.innerHTML = html
      g.querySelectorAll('*').forEach(e => e.setAttribute('data-clase', k))
      hojas[n].after(g)
    }
    if (defs) {
      let d = root.querySelector(':scope > defs')
      if (!d) { d = document.createElementNS(NS, 'defs'); root.prepend(d) }
      d.insertAdjacentHTML('beforeend', defs)
    }
    quitar.forEach(i => hojas[i].remove())
    return { n: hojas.length }
  }, { clasesIdx, quitar, añadir: c.añadir, defs: c.defs })
  if (res.error) throw new Error(`${tipo}: ${res.error}`)

  // 2. Ilustración limpia
  const [vx, vy, vw, vh] = c.vista
  // Se quitan los ids salvo los que algo referencia (degradados que Illustrator
  // deja sueltos fuera de <defs>, clips…)
  const usados = new Set([...svg.matchAll(/url\(#([^)]+)\)/g), ...svg.matchAll(/href="#([^"]+)"/g)].map(m => m[1]))
  let salida = await page.evaluate(({ vista, usados }) => {
    const root = document.querySelector('svg').cloneNode(true)
    root.querySelectorAll('metadata').forEach(e => e.remove())
    // elementos propios de Inkscape/Sodipodi (namedview, perspective…): fuera
    root.querySelectorAll('*').forEach(e => { if (e.tagName.includes(':')) e.remove() })
    for (const e of [root, ...root.querySelectorAll('*')]) {
      for (const a of [...e.attributes]) {
        const n = a.name
        if (n === 'data-clase' || n.startsWith('sodipodi:') || n.startsWith('inkscape:') || (n === 'id' && !usados.includes(a.value)) || n === 'xml:space') e.removeAttribute(n)
      }
    }
    root.querySelectorAll('switch').forEach(e => { if (!e.children.length) e.remove() })
    root.setAttribute('viewBox', vista.join(' '))
    for (const a of ['width', 'height', 'style', 'enable-background', 'x', 'y', 'overflow']) root.removeAttribute(a)
    return new XMLSerializer().serializeToString(root)
  }, { vista: c.vista, usados: [...usados, 'lisosoma-grad'] })
  salida = salida
    .replace(/ xmlns:(sodipodi|inkscape|dc|cc|rdf)="[^"]*"/g, '')
    .replace(/\d+\.\d{3,}/g, m => String(Math.round(parseFloat(m) * 100) / 100)) // 2 decimales bastan a esta escala
    .replace(/>\s+</g, '><')
  // Como <img>/<image> el SVG se lee como XML estricto: un prefijo sin declarar
  // y no se pinta NADA. Se comprueba aquí, no en el navegador del alumno.
  const errorXml = await page.evaluate(t => {
    const d = new DOMParser().parseFromString(t, 'image/svg+xml')
    return d.querySelector('parsererror')?.textContent ?? null
  }, salida)
  if (errorXml) throw new Error(`${tipo}: el SVG limpio no es XML válido: ${errorXml}`)
  fs.mkdirSync(SALIDA_IMG, { recursive: true })
  fs.writeFileSync(path.join(SALIDA_IMG, c.fichero), `<?xml version="1.0" encoding="UTF-8"?>\n${salida}\n`)

  // 3. Mapa de clases sin antialiasing
  const etiquetas = [...new Set(Object.keys(c.clases).concat(c.añadir.map(a => a[2])))].filter(k => k !== 'pasa')
  const color = k => { const i = etiquetas.indexOf(k) + 1; return [(i * 37) % 256, (i * 91 + 40) % 256, (i * 151 + 80) % 256] }
  const W = Math.round(vw * ESCALA), H = Math.round(vh * ESCALA)
  await page.setViewportSize({ width: W, height: H })
  await page.evaluate(({ etiquetas, cols, vista, W, H }) => {
    document.body.style.background = 'transparent'
    const root = document.querySelector('svg')
    root.setAttribute('viewBox', vista.join(' ')); root.setAttribute('width', W); root.setAttribute('height', H)
    root.setAttribute('preserveAspectRatio', 'none'); root.style.display = 'block'
    root.setAttribute('shape-rendering', 'crispEdges')
    root.querySelectorAll('[data-clase]').forEach(e => {
      const k = e.getAttribute('data-clase')
      if (k === 'pasa') { e.style.display = 'none'; return }
      const [r, g, b] = cols[etiquetas.indexOf(k)]
      const cs = getComputedStyle(e)
      const c = `rgb(${r},${g},${b})`
      e.style.fill = cs.fill === 'none' ? 'none' : c
      e.style.stroke = cs.stroke === 'none' ? 'none' : c
      e.style.opacity = '1'; e.style.fillOpacity = '1'; e.style.strokeOpacity = '1'; e.style.filter = 'none'
      e.setAttribute('shape-rendering', 'crispEdges')
    })
    // los <g> pueden llevar opacidad propia
    root.querySelectorAll('g').forEach(g => { g.style.opacity = '1'; g.style.filter = 'none' })
  }, { etiquetas, cols: etiquetas.map(color), vista: c.vista, W, H })
  const png = PNG.sync.read(await page.screenshot({ omitBackground: true, clip: { x: 0, y: 0, width: W, height: H } }))
  await page.close()

  const NADA = 255
  const lab = new Uint8Array(W * H).fill(NADA)
  const cols = etiquetas.map(color)
  let raros = 0
  for (let i = 0; i < W * H; i++) {
    const r = png.data[i * 4], g = png.data[i * 4 + 1], b = png.data[i * 4 + 2], a = png.data[i * 4 + 3]
    if (a < 128) continue
    let best = 0, bd = Infinity
    cols.forEach(([R, G, B], k) => { const d = (r - R) ** 2 + (g - G) ** 2 + (b - B) ** 2; if (d < bd) { bd = d; best = k } })
    if (bd > 0) raros++
    lab[i] = best
  }
  const K = k => etiquetas.indexOf(k)

  // 4. Ensanchar lo diminuto a costa de los vecinos permitidos
  for (const [k, radio, victimas] of c.ensanchar) {
    const kk = K(k), vict = new Set(victimas.map(K))
    const dist = new Float32Array(W * H).fill(Infinity)
    let frente = []
    for (let i = 0; i < W * H; i++) if (lab[i] === kk) { dist[i] = 0; frente.push(i) }
    const R = radio * ESCALA
    while (frente.length) {
      const nuevo = []
      for (const p of frente) {
        const x = p % W, y = (p / W) | 0
        for (const [dx, dy, w] of [[1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1], [1, 1, Math.SQRT2], [1, -1, Math.SQRT2], [-1, 1, Math.SQRT2], [-1, -1, Math.SQRT2]]) {
          const nx = x + dx, ny = y + dy
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
          const q = ny * W + nx, nd = dist[p] + w
          if (nd > R || nd >= dist[q]) continue
          if (lab[q] !== kk && !vict.has(lab[q])) continue
          dist[q] = nd; nuevo.push(q)
        }
      }
      frente = nuevo
    }
    for (let i = 0; i < W * H; i++) if (dist[i] <= R) lab[i] = kk
  }

  // «x~y» es una variante de x con otro ensanche: ya ensanchada, pasa a ser x
  etiquetas.forEach((k, i) => { if (k.includes('~')) { const base = K(k.split('~')[0]); for (let p = 0; p < W * H; p++) if (lab[p] === i) lab[p] = base } })

  // 5. Motas sueltas (antialias de bordes, puntitos de 1 px, vesículas de 3 px
  // sin nombre): al vecino mayoritario
  const MIN = (2.5 * ESCALA) ** 2, MIN_OTRO = 40 * ESCALA ** 2
  for (let k = 0; k < etiquetas.length; k++) {
    for (const comp of componentes(lab, W, H, k)) {
      if (etiquetas[k] === 'ribosoma' || comp.length >= (etiquetas[k] === 'otro' ? MIN_OTRO : MIN)) continue
      const votos = new Map()
      for (const p of comp) {
        const x = p % W, y = (p / W) | 0
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = x + dx, ny = y + dy
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue
          const v = lab[ny * W + nx]; if (v !== k) votos.set(v, (votos.get(v) ?? 0) + 1)
        }
      }
      const gana = [...votos].sort((a, b) => b[1] - a[1])[0]?.[0] ?? NADA
      for (const p of comp) lab[p] = gana
    }
  }

  // 6. «otro» se parte en piezas: cada estructura sin nombre es su propia zona
  const zonasLab = [] // [id, índice de etiqueta en lab2]
  const lab2 = new Uint16Array(W * H).fill(65535)
  let n = 0
  for (const k of etiquetas) {
    if (k === 'nada' || k.includes('~')) continue
    if (k === 'otro') {
      const comps = componentes(lab, W, H, K(k)).sort((a, b) => (a[0] % W) - (b[0] % W))
      comps.forEach((comp, j) => { comp.forEach(p => { lab2[p] = n }); zonasLab.push([`otro-${j + 1}`, n++]) })
    } else {
      for (let i = 0; i < W * H; i++) if (lab[i] === K(k)) lab2[i] = n
      zonasLab.push([k, n++])
    }
  }

  const zonas = []
  for (const [id, k] of zonasLab) {
    let area = 0; for (let i = 0; i < W * H; i++) if (lab2[i] === k) area++
    if (!area) throw new Error(`${tipo}: la zona ${id} no tiene ningún píxel visible`)
    const lazos = contornos(lab2, W, H, k)
      .map(l => simplifica(l, 1.2))
      .filter(l => l.length >= 3)
    const f = v => Math.round(v * 10) / 10
    const d = lazos.map(l => 'M' + l.map(([x, y]) => `${f(vx + x / ESCALA)} ${f(vy + y / ESCALA)}`).join('L') + 'Z').join('')
    const h = puntoHondo(lab2, W, H, k)
    // la pieza más grande (una sola mitocondria, un lisosoma…), para el icono
    const mayor = componentes(lab2, W, H, k).sort((a, b) => b.length - a.length)[0]
    let px0 = W, py0 = H, px1 = 0, py1 = 0
    for (const i of mayor) { const x = i % W, y = (i / W) | 0; if (x < px0) px0 = x; if (x > px1) px1 = x; if (y < py0) py0 = y; if (y > py1) py1 = y }
    let x0 = W, y0 = H, x1 = 0, y1 = 0
    for (let i = 0; i < W * H; i++) if (lab2[i] === k) { const x = i % W, y = (i / W) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y }
    zonas.push({
      id, d,
      centro: [f(vx + (h.x + 0.5) / ESCALA), f(vy + (h.y + 0.5) / ESCALA)],
      hondo: f(h.prof / ESCALA), // radio libre alrededor del centro, en unidades del dibujo
      caja: [f(vx + x0 / ESCALA), f(vy + y0 / ESCALA), f((x1 - x0 + 1) / ESCALA), f((y1 - y0 + 1) / ESCALA)],
      area: f(area / ESCALA ** 2),
      pieza: [f(vx + px0 / ESCALA), f(vy + py0 / ESCALA), f((px1 - px0 + 1) / ESCALA), f((py1 - py0 + 1) / ESCALA)],
    })
  }

  if (depurar) {
    fs.mkdirSync(depurar, { recursive: true })
    const out = new PNG({ width: W, height: H })
    const pal = zonasLab.map((_, k) => [(k * 67 + 30) % 256, (k * 131 + 90) % 256, (k * 197 + 150) % 256])
    for (let i = 0; i < W * H; i++) {
      const v = lab2[i], c3 = v === 65535 ? [255, 255, 255] : pal[v]
      out.data.set([...c3, 255], i * 4)
    }
    fs.writeFileSync(path.join(depurar, `mapa-${tipo}.png`), PNG.sync.write(out))
  }
  console.log(tipo, `${res.n} formas`, `${zonas.length} zonas`, `píxeles con color dudoso: ${raros}`)
  return { img: `/microscopio/celula/${c.fichero}`, vista: c.vista, zonas }
}

const nav = await chromium.launch()
const datos = {}
for (const [tipo, c] of Object.entries(CELULAS)) datos[tipo] = await procesa(nav, tipo, c)
await nav.close()

const cab = `// GENERADO por scripts/celula-arte.mjs — no editar a mano.
//
// Zonas táctiles de las células de «Bajo el Microscopio», en coordenadas de
// la ilustración (public/microscopio/celula/*.svg, ver CREDITOS.md). Cada zona
// es exactamente lo que se VE de ese orgánulo en el dibujo: las zonas no se
// solapan (son una partición), así que ninguna se come los toques de otra.
// d       contorno (fill-rule evenodd: los huecos son lo que hay encima)
// centro  punto más hondo de la zona (teclado y pruebas de clic)
// hondo   radio libre alrededor del centro
// pieza   caja de su trozo más grande (icono del nivel fácil)
// otro-n  estructuras reales que no están en el banco (peroxisomas,
//         vesículas…): se pueden tocar y cuentan como fallo
`
fs.writeFileSync(SALIDA_DATOS, `${cab}\nexport const CELULA_ARTE = ${JSON.stringify(datos)}\n`)
console.log('escrito', SALIDA_DATOS)
