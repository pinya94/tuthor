// Las cuatro láminas de Rayos X: de qué fuente sale cada una, qué formas del
// original son cada id del juego y cómo se encuadra. Coordenadas en las
// unidades del SVG de origen (o, para los órganos, de la silueta ×4).
//
// Lateralidad: todas las vistas de frente se dibujan como en un atlas — la
// derecha del paciente queda a la IZQUIERDA de quien mira. Las fuentes ya
// vienen así (hígado, pulmón de tres lóbulos y vena cava a la izquierda de la
// imagen; corazón con la punta y estómago a la derecha).
import { createRequire } from 'node:module'
const sharp = createRequire(import.meta.url)('sharp')

const rango = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i)
const reflejo = (eje, [x, y]) => [2 * eje - x, y]

// ── Esqueleto ────────────────────────────────────────────────────────────────
// «Human skeleton front - no labels» (Häggström sobre LadyofHats, dominio
// público): cada hueso es un grupo con nombre propio en el SVG, así que la
// zona de cada id es exactamente el dibujo de ese hueso.
const HUESOS = {
  id: 'huesos',
  fuentes: ['skeleton_front_nolabels.svg'],
  licencia: 'Dominio público',
  modificaciones: 'Encuadre (sin rótulos en origen); rasterizado a WebP. Sin cambios en el dibujo.',
  validacion: 'Revisado visualmente (capturas) y con clic automático en cada zona — 2026-11-28',
  eje: 202,
  quitar: ['#layer4'], // rectángulo blanco de fondo
  escena: async ({ leer }) => ({ svg: leer('skeleton_front_nolabels.svg').toString('utf8'), recorte: [48, 12, 362, 816], escala: 1.8 }),
  partes: {
    craneo: ['#Skull'],
    // Columna: cervicales, dorsales (las que asoman bajo el esternón son formas
    // sueltas en el SVG), lumbares, sacro y cóccix (33 vértebras, como dice la ficha)
    columna: ['#CervicalVertebrae', '#ThoracicVertebrae', '#LumbarVertebrae', '#Sacrum', '#Coccyx', ...rango(135, 147), 237, 305, 306, 307, 308],
    costillas: ['#g845', '#g1609'], // costillas + cartílagos costales; g1609 = primer par
    esternon: ['#Sternum', '#Manubrium', 888, 417, 600],
    clavicula: ['#ClavicleRight', '#ClavicleLeft'],
    pelvis: ['#PelvicGirdle', '#g447'], // g447 = isquion y pubis
    humero: ['#HumerusLeft', '#HumerusRight'],
    radio: ['#RadiusLeft', '#RadiusRight'],
    cubito: ['#UlnaLeft', '#UlnaRight'],
    muneca: ['#CarpalsLeft', '#CarpalsRight'],
    femur: ['#FemurLeft', '#g3760'], // g3760 = fémur derecho (sin nombre en el SVG)
    rotula: ['#PatellaLeft', '#PatellaRight'],
    tibia: ['#TibiaLeft', '#TibiaRight'],
    perone: ['#FibulaLeft', '#FibulaRight'],
    tobillo: ['#TarsalsLeft', '#TarsalsRight'],
  },
  piezas: ({ M }) => ({
    craneo: M.craneo, columna: M.columna, costillas: M.costillas, esternon: M.esternon, clavicula: M.clavicula,
    pelvis: M.pelvis, humero: M.humero, codo: new Uint8Array(M.humero.length), radio: M.radio, cubito: M.cubito,
    muneca: M.muneca, femur: M.femur, rotula: M.rotula, tibia: M.tibia, perone: M.perone, tobillo: M.tobillo,
  }),
  // El codo es una articulación, no un hueso: su zona es la unión húmero–radio–cúbito
  discos: [{ id: 'codo', centros: [[82, 305], [313, 306]], radio: 12 }],
  crecer: 6,
  huecoMax: 2500, // los espacios entre costillas sí; el hueco entre las dos piernas no
}

// ── Músculos ─────────────────────────────────────────────────────────────────
// «Muscles front and back» (OpenStax, T. Kebert, umimeto.org; CC BY-SA 4.0).
// La mitad derecha de cada figura es un <use> espejo de la izquierda, así que
// marcar una forma marca las dos. Índices = orden de las formas en el SVG.
const MUSC = 'muscles_front_and_back.svg'
const EJE_FRENTE = 102.2, EJE_ESPALDA = 315.1

const MUSCULOS = {
  id: 'musculos',
  fuentes: [MUSC],
  licencia: 'CC BY-SA 4.0 (obra derivada bajo la misma licencia)',
  modificaciones: 'Recorte de la figura de frente; rasterizado a WebP. Sin cambios en el dibujo.',
  validacion: 'Revisado visualmente (capturas) y con clic automático en cada zona — 2026-11-28',
  escena: async ({ leer }) => ({ svg: leer(MUSC).toString('utf8'), recorte: [5, 3, 194, 346], escala: 3.4 }),
  partes: {
    esternocleidomastoideo: [90],
    deltoPec: [79], // deltoides + porción clavicular del pectoral: una sola forma, separada por la línea 88
    pectoral: [82],
    biceps: [86, 87, 89],
    antebrazo: [74, 76, 77, 78, 83, 84, 85],
    abdominales: [91, 92, 93, 94, 40], // recto del abdomen + su vaina
    oblicuos: [71, 101, 102, 103, 104],
    cuadriceps: [22, 25, 29, 33],
    aductores: [23],
    tibial: [14],
  },
  eje: EJE_FRENTE,
  cortes: { deltopectoral: { sel: [88], grosor: 1.1 } },
  piezas: ({ M, C, trozos, quitar, unir, aPx }) => {
    const semillas = [[62, 82], reflejo(EJE_FRENTE, [62, 82])].map(aPx)
    const deltoides = trozos(M.deltoPec, C.deltopectoral, semillas)
    return {
      deltoides,
      pectoral: unir(M.pectoral, quitar(M.deltoPec, deltoides, C.deltopectoral)),
      biceps: M.biceps, antebrazo: M.antebrazo, abdominales: M.abdominales, oblicuos: M.oblicuos,
      esternocleidomastoideo: M.esternocleidomastoideo, cuadriceps: M.cuadriceps, aductores: M.aductores, tibial: M.tibial,
    }
  },
  crecer: 2.2,
  huecoMax: 3000,
}

const ESPALDA = {
  id: 'espalda',
  fuentes: [MUSC],
  licencia: 'CC BY-SA 4.0 (obra derivada bajo la misma licencia)',
  modificaciones: 'Recorte de la figura de espalda; rasterizado a WebP. Sin cambios en el dibujo.',
  validacion: 'Revisado visualmente (capturas) y con clic automático en cada zona — 2026-11-28',
  escena: async ({ leer }) => ({ svg: leer(MUSC).toString('utf8'), recorte: [228, 3, 174, 346], escala: 3.4 }),
  partes: {
    trapecio: [167, 168, 177, 178],
    dorsal: [140, 142],
    triceps: [153, 154, 169],
    gluteos: [132, 133, 170],
    isquiotibiales: [124, 125, 126],
    gemelos: [171, 172],
  },
  eje: EJE_ESPALDA,
  // La forma del glúteo mayor sigue por fuera del muslo, aclarándose: la zona acaba en el pliegue glúteo
  piezas: ({ M, limitar }) => ({ ...M, gluteos: limitar(M.gluteos, [[228, 0], [402, 0], [402, 197], [228, 197]]) }),
  crecer: 2.2,
  huecoMax: 3000,
}

// ── Órganos ──────────────────────────────────────────────────────────────────
// Composición propia de ilustraciones de Servier Medical Art (CC BY 4.0),
// cada órgano su propia imagen, sobre una silueta CC0, más el diafragma de
// LadyofHats (dominio público). Coordenadas: la silueta (viewBox 148×318)
// ×15,115 — «S4» — con la línea media en x = 1118.
const S4 = 2237 / 147.998
const MEDIA = 1118

async function recorta(buf, { recorte, flip, borrar, solo } = {}) {
  let img = sharp(buf).ensureAlpha()
  if (recorte) img = img.extract({ left: recorte[0], top: recorte[1], width: recorte[2], height: recorte[3] })
  let { data, info } = await img.raw().toBuffer({ resolveWithObject: true })
  const W = info.width, H = info.height
  if (borrar || solo) {
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const i = (y * W + x) * 4
      const px = [data[i], data[i + 1], data[i + 2], data[i + 3], x, y]
      if ((borrar && borrar(...px)) || (solo && !solo(...px))) data[i + 3] = 0
    }
  }
  let out = sharp(data, { raw: { width: W, height: H, channels: 4 } })
  if (flip) out = out.flop()
  const png = await out.png().toBuffer()
  return { uri: `data:image/png;base64,${png.toString('base64')}`, w: W, h: H }
}

const dentro = (pol, x, y) => {
  let c = false
  for (let i = 0, j = pol.length - 1; i < pol.length; j = i++) {
    const [xi, yi] = pol[i], [xj, yj] = pol[j]
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c
  }
  return c
}

// Tráquea dentro de «Lungs»: la columna central hasta los bronquios, sin el rosa del pulmón
const TRAQUEA_POL = [[183, 0], [224, 0], [224, 128], [230, 180], [180, 180], [182, 128]]
const esPulmon = (r, g, b) => r > 175 && r - g > 18 && b >= g - 6
const esTraquea = (r, g, b, a, x, y) => dentro(TRAQUEA_POL, x, y) && !esPulmon(r, g, b)
const esUreter = (r, g, b) => r > 190 && g > 140 && g - b > 35

const ORGANOS = {
  id: 'organos',
  fuentes: ['silhouette_neutral_front.svg', 'respiratory_system_complete_en.svg', 'poumons_01.png', 'Larynx.png', 'coeur.png', 'foie.png', 'estomac.png', 'intestin.png', 'colon.png', 'App_urinaire_homme.png', 'vessie.png', 'cerveau_09.png', 'oeil_02.png', 'oral-cavity.png'],
  licencia: 'CC BY 4.0 (Servier Medical Art) + dominio público / CC0',
  modificaciones: 'Composición propia: cada órgano recortado de su ilustración, escalado y colocado en su sitio sobre una silueta CC0; tráquea separada del pulmón y uréteres del riñón por color; riñón izquierdo = espejo del derecho; ojo derecho = espejo del izquierdo; ojo recortado a la abertura de los párpados; colon recortado bajo el sigma (el recto queda detrás de la vejiga); vejiga recortada a su cuerpo; diafragma de LadyofHats con color opaco. Rasterizado a WebP.',
  validacion: 'Revisado visualmente (capturas) y con clic automático en cada zona — 2026-11-28',
  escena: async ({ leer, extraer }) => {
    // Silueta: las formas blancas son el cuerpo; las negras, su contorno
    const sil = leer('silhouette_neutral_front.svg').toString('utf8')
      .replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '')
      .split('<path fill="#fff"').join('<path data-pieza="neutro" fill="url(#piel)"')
      .split('stroke:#000;').join('stroke:#c08a7e;stroke-width:0.45;')
      .replace(/<path (?!data-pieza)/g, '<path data-pieza="neutro" fill="#b98277" ')
    const [diaf, sombra] = await extraer('respiratory_system_complete_en.svg', [50, 49])
    const img = (pieza, p, x, y, w, extra = '') => `<image data-pieza="${pieza}" href="${p.uri}" x="${x}" y="${y}" width="${w}" height="${(w * p.h) / p.w}" preserveAspectRatio="none" ${extra}/>`

    const pulmonImg = leer('poumons_01.png')
    const pulmones = await recorta(pulmonImg, { borrar: esTraquea })
    const traqueaBaja = await recorta(pulmonImg, { solo: esTraquea })
    const traqueaAlta = await recorta(leer('Larynx.png'), { recorte: [0, 840, 627, 390] })
    const corazon = await recorta(leer('coeur.png'))
    const higado = await recorta(leer('foie.png'))
    const estomago = await recorta(leer('estomac.png'))
    const delgado = await recorta(leer('intestin.png'))
    const colon = await recorta(leer('colon.png'), { recorte: [0, 0, 661, 650] })
    const rinonIzq = await recorta(leer('App_urinaire_homme.png'), { recorte: [0, 0, 300, 680], borrar: esUreter })
    const ureter = await recorta(leer('App_urinaire_homme.png'), { recorte: [0, 0, 300, 680], solo: (r, g, b, a) => a > 0 && esUreter(r, g, b) })
    const rinonDer = await recorta(leer('App_urinaire_homme.png'), { recorte: [0, 0, 300, 680], borrar: esUreter, flip: true })
    const ureterDer = await recorta(leer('App_urinaire_homme.png'), { recorte: [0, 0, 300, 680], solo: (r, g, b, a) => a > 0 && esUreter(r, g, b), flip: true })
    const vejiga = await recorta(leer('vessie.png'), { recorte: [0, 330, 864, 770] })
    const cerebro = await recorta(leer('cerveau_09.png'))
    // Ojo: solo lo que hay entre los párpados (esclerótica, iris, pupila, carúncula)
    const ALMENDRA = [[41, 97], [70, 66], [110, 50], [160, 50], [205, 70], [232, 98], [245, 113], [232, 122], [190, 133], [140, 141], [95, 132], [60, 113]]
    const ojo = await recorta(leer('oeil_02.png'), { solo: (r, g, b, a, x, y) => dentro(ALMENDRA, x, y) })
    const ojoEsp = await recorta(leer('oeil_02.png'), { solo: (r, g, b, a, x, y) => dentro(ALMENDRA, x, y), flip: true })
    const boca = await recorta(leer('oral-cavity.png'))

    // Diafragma: escala = ancho de los pulmones de LadyofHats → ancho de los nuestros
    const kd = 820 / 424
    const mat = m => `matrix(${m.join(' ')})`
    const tD = `translate(${708 - 228 * kd} ${1335 - 715 * kd}) scale(${kd})`
    const kR = 170 / 250 // riñón: 250 px de ancho en el original → 170
    const wR = 300 * kR

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2237 4814">
      <defs>
        <linearGradient id="piel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#e9c3b9"/><stop offset="0.5" stop-color="#f6ddd5"/><stop offset="1" stop-color="#e9c3b9"/>
        </linearGradient>
        <linearGradient id="musc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#d4615a"/><stop offset="1" stop-color="#a83d3a"/>
        </linearGradient>
      </defs>
      <g transform="scale(${S4})">${sil}</g>
      ${img('neutro', ureter, MEDIA - 310, 1700, wR)}
      ${img('neutro', ureterDer, MEDIA + 310 - wR, 1672, wR)}
      ${img('rinones', rinonIzq, MEDIA - 310, 1700, wR)}
      ${img('rinones', rinonDer, MEDIA + 310 - wR, 1672, wR)}
      ${img('pulmones', pulmones, 708, 700, 820)}
      ${img('traquea', traqueaBaja, 708, 700, 820)}
      ${img('traquea', traqueaAlta, MEDIA - 317 * 0.242, 612, 627 * 0.242)}
      <g transform="${tD}">
        <path data-pieza="diafragma" d="${diaf.d}" transform="${mat(diaf.m)}" fill="url(#musc)" stroke="#7d2a28" stroke-width="2.2"/>
        <path data-pieza="diafragma" d="${sombra.d}" transform="${mat(sombra.m)}" fill="#6e1f1d" fill-opacity="0.28"/>
      </g>
      ${img('corazon', corazon, 1011, 960, 330)}
      ${img('estomago', estomago, 1190, 1430, 290)}
      ${img('higado', higado, 745, 1385, 560)}
      ${img('intestinos', colon, 748, 1960, 740)}
      ${img('intestinos', delgado, 848, 2045, 540)}
      ${img('vejiga', vejiga, MEDIA - 115, 2465, 230)}
      ${img('cerebro', cerebro, MEDIA - 200, 25, 400)}
      ${img('ojos', ojo, MEDIA - 62 - 47.5, 345, 95)}
      ${img('ojos', ojoEsp, MEDIA + 62 - 47.5, 345, 95)}
      ${img('boca', boca, MEDIA - 35, 405, 70)}
    </svg>`
    return { svg, recorte: [640, 0, 956, 2720], escala: 0.7 }
  },
  partes: Object.fromEntries(['cerebro', 'ojos', 'boca', 'traquea', 'pulmones', 'corazon', 'diafragma', 'higado', 'estomago', 'rinones', 'intestinos', 'vejiga'].map(id => [id, [`[data-pieza="${id}"]`]])),
  piezas: ({ M }) => ({ ...M }),
  eje: MEDIA,
  crecer: 14,
  huecoMax: 20000,
}

export const CAPAS = [HUESOS, MUSCULOS, ESPALDA, ORGANOS]
