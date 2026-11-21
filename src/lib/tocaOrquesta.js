// «Toca con la Orquesta»: la lógica que no depende del navegador (y por eso
// se puede probar): instrumentos y transposición, la parte de cada uno en
// MusicXML (la dibuja OpenSheetMusicDisplay), la línea de tiempo y la
// corrección de lo que se oye por el micro (o se toca en el teclado).
//
// La detección y la corrección vienen de la app de estudio de partituras del
// usuario (cobla-estudio): mismo criterio de afinación (±⅓ de semitono bien,
// hasta ⅔ «un poco alta/baja», más es otra nota), entrada con 70-140 ms de
// margen y cada compás del color de su peor nota.
import { OBRAS, ACORDES } from '../data/tocaOrquesta/obras'

const T = (es, en, ca) => ({ es, en, ca })

// trans = semitonos de lo ESCRITO sobre lo que SUENA (clarinete en Si♭: se
// escribe un tono más alto). rango = zona cómoda en sonido real, para elegir
// la octava de cada voz sin salirse del instrumento.
export const INSTRUMENTOS = {
  // De escuela: la flauta dulce (soprano) se escribe una octava más grave de lo que suena
  flautaDulce: { nombre: T('Flauta dulce', 'Recorder', 'Flauta dolça'), emoji: '🎵', trans: -12, clave: 'sol', rango: [72, 98], escuela: true },
  laminas:   { nombre: T('Xilófono o metalófono', 'Xylophone or glockenspiel', 'Xilòfon o metal·lòfon'), emoji: '🎼', trans: 0, clave: 'sol', rango: [60, 81], escuela: true },
  violin:    { nombre: T('Violín', 'Violin', 'Violí'), emoji: '🎻', trans: 0, clave: 'sol', rango: [55, 84] },
  flauta:    { nombre: T('Flauta', 'Flute', 'Flauta'), emoji: '🎶', trans: 0, clave: 'sol', rango: [60, 93] },
  clarinete: { nombre: T('Clarinete en Si♭', 'B♭ clarinet', 'Clarinet en Si♭'), emoji: '🎶', trans: 2, clave: 'sol', rango: [50, 84] },
  trompeta:  { nombre: T('Trompeta en Si♭', 'B♭ trumpet', 'Trompeta en Si♭'), emoji: '🎺', trans: 2, clave: 'sol', rango: [54, 77] },
  saxo:      { nombre: T('Saxo alto en Mi♭', 'E♭ alto sax', 'Saxo alt en Mi♭'), emoji: '🎷', trans: 9, clave: 'sol', rango: [49, 77] },
  trompa:    { nombre: T('Trompa en Fa', 'Horn in F', 'Trompa en Fa'), emoji: '📯', trans: 7, clave: 'sol', rango: [41, 70] },
  viola:     { nombre: T('Viola', 'Viola', 'Viola'), emoji: '🎻', trans: 0, clave: 'do', rango: [48, 76] },
  chelo:     { nombre: T('Violonchelo', 'Cello', 'Violoncel'), emoji: '🎻', trans: 0, clave: 'fa', rango: [36, 67] },
  otro:      { nombre: T('Otro (eliges la transposición)', 'Other (choose the transposition)', 'Altre (tries la transposició)'), emoji: '🎵', trans: 0, clave: 'sol', rango: null },
}
// Sin instrumento: piano en pantalla o teclado del ordenador
export const PIANO = { nombre: T('Piano en pantalla', 'On-screen piano', 'Piano en pantalla'), trans: 0, clave: 'auto', rango: [48, 84] }

export const NIVELES = {
  // tempo en % del de la obra; metronomo = clic en cada tiempo; tiempo = se
  // corrige también la entrada. Tu parte no suena mientras tocas: con altavoz,
  // el micro la oiría y te daría por buena una nota que no has tocado.
  facil:   { tempo: 0.6, metronomo: true, tiempo: false },
  medio:   { tempo: 0.8, metronomo: true, tiempo: true },
  dificil: { tempo: 1, metronomo: false, tiempo: true },
}

export const obra = id => OBRAS[id]
const notasDe = compases => compases.flat().filter(([m]) => typeof m === 'number').map(([m]) => m)

// La octava (en múltiplos de 12) que deja la voz dentro de la zona cómoda
export function octavaPara(voz, rango) {
  if (!rango) return 0
  const ms = notasDe(voz.compases)
  const lo = Math.min(...ms), hi = Math.max(...ms)
  for (const k of [0, -1, 1, -2, 2, -3, 3]) if (lo + 12 * k >= rango[0] && hi + 12 * k <= rango[1]) return k
  return 0
}

// La parte que toca alguien: voz de la obra + instrumento (y, si es «otro»,
// sus semitonos y su clave). Devuelve todo lo que hace falta para dibujarla,
// tocarla de fondo y corregirla.
export function parte(obraId, vozId, instId, { semitonos = 0, clave = 'sol' } = {}) {
  const o = OBRAS[obraId]
  const voz = o.voces[vozId]
  const inst = instId === 'piano' ? PIANO : INSTRUMENTOS[instId]
  const trans = instId === 'otro' ? semitonos : inst.trans
  const k = octavaPara(voz, inst.rango)
  const sonido = 12 * k // lo que suena respecto al arreglo
  let cl = instId === 'otro' ? clave : inst.clave
  if (cl === 'auto') cl = Math.min(...notasDe(voz.compases)) + sonido >= 53 ? 'sol' : 'fa'
  return { obraId, vozId, instId, trans, sonido, clave: cl, quintas: quintasEscritas(o.tonalidad, trans) }
}

// Armadura escrita: la de concierto movida por la transposición (en quintas)
export function quintasEscritas(quintasConcierto, trans) {
  let f = quintasConcierto + (((trans * 7) % 12) + 12) % 12
  while (f > 6) f -= 12
  while (f < -6) f += 12
  return f
}

// ── Nombre de las notas en la tonalidad escrita ──────────────────────────
const LETRAS = 'CDEFGAB'
const PC_LETRA = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
const MAYOR = [0, 2, 4, 5, 7, 9, 11]
// Letra y alteración de una altura MIDI en la tonalidad mayor de f quintas
export function deletrea(midi, f) {
  const tonica = 'FCGDAEB'[(((f + 1) % 7) + 7) % 7]
  const pcTonica = (((f * 7) % 12) + 12) % 12
  const i0 = LETRAS.indexOf(tonica)
  const pc = ((midi % 12) + 12) % 12
  for (let g = 0; g < 7; g++) {
    if ((pcTonica + MAYOR[g]) % 12 !== pc) continue
    const letra = LETRAS[(i0 + g) % 7]
    let alter = pc - PC_LETRA[letra]
    if (alter > 6) alter -= 12
    if (alter < -6) alter += 12
    return { letra, alter, octava: Math.floor((midi - alter) / 12) - 1 }
  }
  // Fuera de la escala (no pasa en los arreglos): con sostenido
  const nat = [0, 2, 4, 5, 7, 9, 11].includes(pc)
  const letra = 'CCDDEFFGGAAB'[pc]
  return { letra, alter: nat ? 0 : 1, octava: Math.floor(midi / 12) - 1 }
}
const NOMBRES = {
  es: { C: 'Do', D: 'Re', E: 'Mi', F: 'Fa', G: 'Sol', A: 'La', B: 'Si' },
  ca: { C: 'Do', D: 'Re', E: 'Mi', F: 'Fa', G: 'Sol', A: 'La', B: 'Si' },
  en: { C: 'C', D: 'D', E: 'E', F: 'F', G: 'G', A: 'A', B: 'B' },
}
export function nombreNota(midi, f, l = 'es') {
  const { letra, alter } = deletrea(midi, f)
  return (NOMBRES[l] ?? NOMBRES.es)[letra] + (alter === 1 ? '♯' : alter === -1 ? '♭' : alter === 2 ? '𝄪' : alter === -2 ? '𝄫' : '')
}

// ── Notas de la parte, en el tiempo ──────────────────────────────────────
// Cada nota: { compas (1…), inicio y dur en negras desde el principio,
// suena (MIDI real, ya en la octava del instrumento), escrita (MIDI escrito) }
export function notasParte(p, vozId = p.vozId) {
  const o = OBRAS[p.obraId]
  const negrasCompas = o.compas[0] * 4 / o.compas[1]
  const res = []
  o.voces[vozId].compases.forEach((c, i) => {
    let t = i * negrasCompas
    for (const [m, d] of c) {
      const mia = vozId === p.vozId
      const alturas = m == null ? [] : m === 'x' ? [PERCUSION_MIDI] : Array.isArray(m) ? m : [m]
      for (const a of alturas) res.push({ compas: i + 1, inicio: t, dur: d, suena: a + (mia && typeof m === 'number' ? p.sonido : 0), escrita: a + p.sonido + p.trans })
      t += d
    }
  })
  return res
}
export const PERCUSION_MIDI = 72 // la muestra de wood-block
export const numCompases = obraId => OBRAS[obraId].voces[Object.keys(OBRAS[obraId].voces)[0]].compases.length
export const negrasPorCompas = obraId => { const o = OBRAS[obraId]; return o.compas[0] * 4 / o.compas[1] }

// ── MusicXML de la parte (lo que dibuja OpenSheetMusicDisplay) ───────────
const TIPO = { 0.5: ['eighth', 0], 1: ['quarter', 0], 1.5: ['quarter', 1], 2: ['half', 0], 3: ['half', 1], 4: ['whole', 0] }
const CLAVE_XML = { sol: '<sign>G</sign><line>2</line>', fa: '<sign>F</sign><line>4</line>', do: '<sign>C</sign><line>3</line>' }
const DIV = 2 // divisiones por negra (la corchea es la nota más corta)

export function musicXML(p) {
  const o = OBRAS[p.obraId]
  const compases = o.voces[p.vozId].compases
  const desplaza = p.sonido + p.trans
  const medidas = compases.map((c, i) => {
    const attrs = i === 0
      ? `<attributes><divisions>${DIV}</divisions><key><fifths>${p.quintas}</fifths></key><time><beats>${o.compas[0]}</beats><beat-type>${o.compas[1]}</beat-type></time><clef>${CLAVE_XML[p.clave] ?? CLAVE_XML.sol}</clef></attributes>`
      : ''
    const notas = c.map(([m, d]) => {
      const [tipo, puntos] = TIPO[d] ?? ['quarter', 0]
      const dots = '<dot/>'.repeat(puntos)
      if (m == null) return `<note><rest/><duration>${d * DIV}</duration><type>${tipo}</type>${dots}</note>`
      const { letra, alter, octava } = deletrea(m + desplaza, p.quintas)
      return `<note><pitch><step>${letra}</step>${alter ? `<alter>${alter}</alter>` : ''}<octave>${octava}</octave></pitch><duration>${d * DIV}</duration><type>${tipo}</type>${dots}</note>`
    }).join('')
    const fin = i === compases.length - 1 ? '<barline location="right"><bar-style>light-heavy</bar-style></barline>' : ''
    return `<measure number="${i + 1}">${attrs}${notas}${fin}</measure>`
  }).join('')
  return `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd"><score-partwise version="3.1"><part-list><score-part id="P1"><part-name></part-name></score-part></part-list><part id="P1">${medidas}</part></score-partwise>`
}

// ── Partitura general: todas las voces a la vez (recurso de clase) ───────
// El ukelele y la percusión van en una línea con el ritmo; el ukelele lleva
// encima el cifrado (Sol, Re7…). Las demás voces, en su clave y transportadas.
const KIND = { '': 'major', 7: 'dominant', m: 'minor' }
function harmonyXML(cifra) {
  const [, letra, alt, resto] = cifra.match(/^([A-G])([b#]?)(.*)$/)
  return `<harmony><root><root-step>${letra}</root-step>${alt ? `<root-alter>${alt === '#' ? 1 : -1}</root-alter>` : ''}</root><kind>${KIND[resto] ?? 'major'}</kind></harmony>`
}
function medidasVoz(obraId, vozId) {
  const o = OBRAS[obraId]
  const voz = o.voces[vozId]
  const linea = voz.tipo === 'acordes' || voz.tipo === 'percusion'
  const p = linea ? null : parte(obraId, vozId, voz.inst)
  return voz.compases.map((c, i) => {
    const attrs = i === 0
      ? `<attributes><divisions>${DIV}</divisions><key><fifths>${linea ? 0 : p.quintas}</fifths></key><time><beats>${o.compas[0]}</beats><beat-type>${o.compas[1]}</beat-type></time>${linea ? '<clef><sign>percussion</sign></clef><staff-details><staff-lines>1</staff-lines></staff-details>' : `<clef>${CLAVE_XML[p.clave] ?? CLAVE_XML.sol}</clef>`}</attributes>`
      : ''
    let t = 0
    const notas = c.map(([m, d]) => {
      const [tipo, puntos] = TIPO[d] ?? ['quarter', 0]
      const dots = '<dot/>'.repeat(puntos)
      // El cifrado, al empezar cada medio compás
      const cifra = voz.tipo === 'acordes' && t % 2 === 0 ? harmonyXML(o.cifrado[ACORDES[i][t / 2]]) : ''
      t += d
      if (m == null) return `<note><rest/><duration>${d * DIV}</duration><type>${tipo}</type>${dots}</note>`
      if (linea) return `${cifra}<note><unpitched><display-step>E</display-step><display-octave>4</display-octave></unpitched><duration>${d * DIV}</duration><type>${tipo}</type>${dots}</note>`
      const { letra, alter, octava } = deletrea(m + p.sonido + p.trans, p.quintas)
      return `<note><pitch><step>${letra}</step>${alter ? `<alter>${alter}</alter>` : ''}<octave>${octava}</octave></pitch><duration>${d * DIV}</duration><type>${tipo}</type>${dots}</note>`
    }).join('')
    const fin = i === voz.compases.length - 1 ? '<barline location="right"><bar-style>light-heavy</bar-style></barline>' : ''
    return `<measure number="${i + 1}">${attrs}${notas}${fin}</measure>`
  }).join('')
}
const escXML = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;')
export function musicXMLPartitura(obraId, voces, l = 'es') {
  const o = OBRAS[obraId]
  const lista = voces.map((v, k) => `<score-part id="P${k + 1}"><part-name>${escXML((o.voces[v].nombre[l] ?? o.voces[v].nombre.es).replace(/ \(.*\)$/, ''))}</part-name></score-part>`).join('')
  const partes = voces.map((v, k) => `<part id="P${k + 1}">${medidasVoz(obraId, v)}</part>`).join('')
  return `<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE score-partwise PUBLIC "-//Recordare//DTD MusicXML 3.1 Partwise//EN" "http://www.musicxml.org/dtds/partwise.dtd"><score-partwise version="3.1"><part-list>${lista}</part-list>${partes}</score-partwise>`
}

// ── Corrección ───────────────────────────────────────────────────────────
// notas: las de notasParte, con inicio/dur ya en segundos (s0, ds).
// frames: [{ t (s desde el primer tiempo, ya sin el retardo), rms, m (MIDI o null) }]
// Devuelve { pct, porCompas: { n: 'ok'|'warn'|'bad' }, fallos: [{ compas, estado, tipo, … }] }
export function corrige(notas, frames, { octavaLibre = true, tiempo = true } = {}) {
  const ruido = frames.filter(f => f.t < -0.1).map(f => f.rms).sort((a, b) => a - b)
  const suelo = ruido.length ? ruido[Math.floor(ruido.length / 2)] : 0.01
  const umbral = Math.max(0.015, suelo * 2.5)
  const dif = (m, esp) => (octavaLibre ? ((((m - esp) % 12) + 18) % 12) - 6 : m - esp)
  const porCompas = {}, fallos = []
  let pts = 0
  const RANGO = { ok: 0, warn: 1, bad: 2 }
  notas.forEach((n, i) => {
    const { s0, ds } = n
    const ventana = frames.filter(f => f.t >= s0 - 0.15 && f.t <= s0 + ds)
    const centro = ventana.filter(f => f.t >= s0 + ds * 0.2 && f.t <= s0 + ds * 0.85 && f.rms > umbral && f.m != null)
    const desde = ventana.filter(f => f.t >= s0)
    const sonando = desde.filter(f => f.rms > umbral).length / Math.max(1, desde.length)
    let estado = 'ok', fallo = null
    if (centro.length < 2 || sonando < 0.3) { estado = 'bad'; fallo = { tipo: 'silencio' } }
    else {
      const ms = centro.map(f => f.m).sort((a, b) => a - b)
      const med = ms[Math.floor(ms.length / 2)]
      const err = dif(med, n.suena)
      if (Math.abs(err) > 0.7) { estado = 'bad'; fallo = { tipo: 'nota', suena: Math.round(med - n.suena + n.escrita) } }
      else if (Math.abs(err) > 0.35) { estado = 'warn'; fallo = { tipo: err > 0 ? 'alta' : 'baja' } }
      // La entrada solo cuenta si la nota es nueva (tras silencio u otra altura)
      const ant = notas[i - 1]
      const nueva = !ant || ant.suena !== n.suena || Math.abs(ant.s0 + ant.ds - s0) > 1e-6
      if (tiempo && estado !== 'bad' && nueva) {
        const tol = Math.max(0.07, Math.min(0.14, ds * 0.3))
        const on = ventana.find(f => f.rms > umbral && f.m != null && Math.abs(dif(f.m, n.suena)) < 0.8)
        if (on) {
          const e = on.t - s0
          if (e < -tol) { estado = 'warn'; fallo = { tipo: 'pronto', ms: Math.round(-e * 1000) } }
          else if (e > tol) { estado = 'warn'; fallo = { tipo: 'tarde', ms: Math.round(e * 1000) } }
        }
      }
    }
    pts += estado === 'ok' ? 1 : estado === 'warn' ? 0.5 : 0
    if (!porCompas[n.compas] || RANGO[estado] > RANGO[porCompas[n.compas]]) porCompas[n.compas] = estado
    if (fallo) fallos.push({ compas: n.compas, estado, escrita: n.escrita, ...fallo })
  })
  return { pct: notas.length ? Math.round((pts / notas.length) * 100) : 0, porCompas, fallos }
}

// Texto de un fallo, como en la app de estudio («c.14: te adelantas»)
export function textoFallo(x, quintas, l = 'es') {
  const n = nombreNota(x.escrita, quintas, l)
  const s = x.suena != null ? nombreNota(x.suena, quintas, l) : ''
  const t = {
    silencio: T(`no se oye el ${n}`, `the ${n} can’t be heard`, `no se sent el ${n}`),
    nota: T(`nota equivocada: es ${n} y suena ${s}`, `wrong note: it is ${n} and ${s} sounds`, `nota equivocada: és ${n} i sona ${s}`),
    alta: T(`${n} un poco alto`, `${n} a little sharp`, `${n} una mica alt`),
    baja: T(`${n} un poco bajo`, `${n} a little flat`, `${n} una mica baix`),
    pronto: T(`te adelantas (${x.ms} ms)`, `you come in early (${x.ms} ms)`, `t’avances (${x.ms} ms)`),
    tarde: T(`entras tarde (${x.ms} ms)`, `you come in late (${x.ms} ms)`, `entres tard (${x.ms} ms)`),
  }[x.tipo]
  return t[l] ?? t.es
}

// ── Detección de la nota (método YIN, como la app de estudio) ────────────
// minHz: la nota más grave que se espera (limita el cálculo: en el móvil cuenta)
export function detectaNota(buf, sr, minHz = 60) {
  let rms = 0
  for (let i = 0; i < buf.length; i++) rms += buf[i] * buf[i]
  rms = Math.sqrt(rms / buf.length)
  if (rms < 0.01) return { rms, f: 0 }
  const half = buf.length >> 1
  const minLag = Math.floor(sr / 1400), maxLag = Math.min(half - 1, Math.floor(sr / minHz))
  const d = new Float32Array(maxLag + 2)
  for (let lag = minLag; lag <= maxLag; lag++) {
    let s = 0
    for (let i = 0; i < half; i++) { const x = buf[i] - buf[i + lag]; s += x * x }
    d[lag] = s
  }
  const cm = new Float32Array(maxLag + 2)
  let run = 0
  for (let lag = 1; lag <= maxLag; lag++) { run += d[lag] || 0; cm[lag] = lag < minLag ? 1 : (d[lag] * lag) / (run || 1) }
  let best = -1
  for (let lag = minLag; lag <= maxLag; lag++) {
    if (cm[lag] < 0.15) { while (lag + 1 <= maxLag && cm[lag + 1] < cm[lag]) lag++; best = lag; break }
  }
  if (best < 0) {
    let mv = 1e9
    for (let lag = minLag; lag <= maxLag; lag++) if (cm[lag] < mv) { mv = cm[lag]; best = lag }
    if (mv > 0.35) return { rms, f: 0 }
  }
  const x0 = cm[best - 1] || cm[best], x2 = cm[best + 1] || cm[best], x1 = cm[best]
  const den = x0 + x2 - 2 * x1
  const shift = den ? (x0 - x2) / (2 * den) : 0
  return { rms, f: sr / (best + shift) }
}
export const hzAMidi = f => (f ? 69 + 12 * Math.log2(f / 440) : null)
export const midiAHz = m => 440 * Math.pow(2, (m - 69) / 12)

// Teclado del ordenador → nota (Do4 en la A, como un piano: fila de casa
// las blancas, fila de arriba las negras)
export const TECLAS = { a: 60, w: 61, s: 62, e: 63, d: 64, f: 65, t: 66, g: 67, y: 68, h: 69, u: 70, j: 71, k: 72, o: 73, l: 74, p: 75, ñ: 76, ';': 76 }
