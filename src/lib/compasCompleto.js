// Compás Completo (música · el ritmo, Primaria y ESO).
//
// Figuras y silencios dibujados en un pentagrama de una línea. Se pregunta:
//   nombre   cómo se llama esta figura (o este silencio)
//   tiempos  cuántos tiempos dura (con la negra = 1 tiempo)
//   hueco    qué figura falta para completar el compás
//   compas   qué compás es (2/4, 3/4 o 4/4), sumando los tiempos
//
// Las duraciones se guardan en semicorcheas (negra = 4) para que las cuentas
// sean enteras; el puntillo suma la mitad (blanca con puntillo = 12).

const T = (es, en, ca) => ({ es, en, ca })
const s = (l, es, en, ca) => (l === 'en' ? en : l === 'ca' ? ca : es)
export const tx = (o, l) => o[l] ?? o.es

// Nombres en inglés británico (los de los libros en España).
export const FIGURAS = {
  redonda: { dur: 16, nombre: T('Redonda', 'Semibreve', 'Rodona') },
  blanca: { dur: 8, nombre: T('Blanca', 'Minim', 'Blanca') },
  negra: { dur: 4, nombre: T('Negra', 'Crotchet', 'Negra') },
  corchea: { dur: 2, nombre: T('Corchea', 'Quaver', 'Corxera') },
  semicorchea: { dur: 1, nombre: T('Semicorchea', 'Semiquaver', 'Semicorxera') },
}
export const ORDEN_FIGURAS = Object.keys(FIGURAS)

// Una figura de compás: { f: 'negra', silencio: false, puntillo: false }
export const duracion = n => FIGURAS[n.f].dur * (n.puntillo ? 1.5 : 1)
export const clave = n => `${n.f}${n.puntillo ? '.' : ''}${n.silencio ? 'S' : ''}`
export const deClave = k => ({ f: k.replace(/[.S]/g, ''), puntillo: k.includes('.'), silencio: k.includes('S') })
export function nombreFigura(n, l) {
  const base = tx(FIGURAS[n.f].nombre, l)
  const pt = n.puntillo ? s(l, ' con puntillo', ' dotted', ' amb punt') : ''
  if (n.silencio) return s(l, `Silencio de ${base.toLowerCase()}${pt}`, `${n.puntillo ? 'Dotted ' : ''}${base.toLowerCase()} rest`.replace(/^./, c => c.toUpperCase()), `Silenci de ${base.toLowerCase()}${pt}`)
  return l === 'en' && n.puntillo ? `Dotted ${base.toLowerCase()}` : `${base}${pt}`
}
// Tiempos con fracción bonita: 1/4 = ¼, 3/2 = 1½…
export function tiemposTexto(semis, l) {
  const ent = Math.floor(semis / 4), resto = semis % 4
  const frac = { 1: '¼', 2: '½', 3: '¾' }[resto] ?? ''
  const n = ent === 0 && frac ? frac : `${ent}${frac}`
  const uno = semis <= 4 // «1 tiempo», «½ tiempo»: singular hasta uno
  return s(l, `${n} ${uno ? 'tiempo' : 'tiempos'}`, `${n} ${uno ? 'beat' : 'beats'}`, `${n} ${uno ? 'temps' : 'temps'}`)
}

export const COMPASES = { '2/4': 8, '3/4': 12, '4/4': 16 }

export const NIVELES = {
  facil:   { tipos: ['nombre', 'nombre', 'tiempos', 'hueco'], puntillo: false, silencios: false },
  medio:   { tipos: ['nombre', 'tiempos', 'hueco', 'hueco', 'compas'], puntillo: true, silencios: true },
  dificil: { tipos: ['tiempos', 'hueco', 'hueco', 'compas', 'compas'], puntillo: true, silencios: true },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}

// Figuras disponibles según el nivel (sin semicorchea en fácil).
function catalogo(cfg, nivel) {
  const out = []
  for (const f of ORDEN_FIGURAS) {
    if (nivel === 'facil' && f === 'semicorchea') continue
    out.push({ f, puntillo: false, silencio: false })
    if (cfg.puntillo && ['blanca', 'negra', 'corchea'].includes(f)) out.push({ f, puntillo: true, silencio: false })
    if (cfg.silencios && f !== 'semicorchea') out.push({ f, puntillo: false, silencio: true })
  }
  return out
}

// Rellena `total` semicorcheas con figuras del catálogo (troceando al azar).
function rellena(rand, total, cat) {
  const notas = []
  let queda = total
  for (let guard = 0; queda > 0 && guard < 50; guard++) {
    const caben = cat.filter(n => duracion(n) <= queda && duracion(n) <= 8)
    if (!caben.length) break
    const n = elige(rand, caben)
    notas.push(n)
    queda -= duracion(n)
  }
  return queda === 0 ? notas : null
}

let seq = 0
const recientes = []

export function genVieja(nivel = 'facil', opts = {}) {
  for (let intento = 0; ; intento++) {
    const r = genUna(nivel, opts)
    const tema = `${r.tipo}:${r.figura ?? ''}:${r.compas ?? ''}:${r.bueno}`
    if (intento < 20 && recientes.includes(tema)) continue
    recientes.push(tema)
    if (recientes.length > 6) recientes.shift()
    return r
  }
}

function genUna(nivel, { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const cat = catalogo(cfg, nivel)
  for (;;) {
    const tipo = elige(rand, cfg.tipos)
    const base = { id: ++seq, nivel, tipo }

    if (tipo === 'nombre' || tipo === 'tiempos') {
      const n = elige(rand, cat)
      const k = clave(n)
      if (tipo === 'nombre') {
        // Opciones: la misma familia (nota o silencio) y figuras vecinas.
        const otros = cat.filter(x => clave(x) !== k && x.silencio === n.silencio)
        const ops = baraja(rand, otros).slice(0, 3).map(clave)
        if (ops.length < 3) continue
        return { ...base, figura: k, bueno: k, opciones: baraja(rand, [k, ...ops]) }
      }
      const d = duracion(n)
      const cands = [...new Set([d * 2, d / 2, d * 1.5, d + 4, d - 4, 16, 8, 4, 2, 12, 6].filter(x => x > 0 && x !== d && Number.isInteger(x)))]
      return { ...base, figura: k, bueno: d, opciones: [d, ...baraja(rand, cands).slice(0, 3)].sort((a, b) => a - b) }
    }

    if (tipo === 'hueco') {
      const compas = elige(rand, nivel === 'facil' ? ['2/4', '4/4'] : Object.keys(COMPASES))
      const total = COMPASES[compas]
      const notas = rellena(rand, total, cat.filter(n => !n.silencio || nivel !== 'facil'))
      if (!notas || notas.length < 2 || notas.length > 6) continue
      const h = Math.floor(rand() * notas.length)
      const falta = notas[h]
      // Opciones: figuras que NO completan el compás (duración distinta), del mismo tipo.
      const otras = cat.filter(x => duracion(x) !== duracion(falta) && x.silencio === falta.silencio)
      const ops = baraja(rand, otras).slice(0, 3).map(clave)
      if (ops.length < 3) continue
      return { ...base, compas, notas: notas.map(clave), hueco: h, bueno: clave(falta), opciones: baraja(rand, [clave(falta), ...ops]) }
    }

    // compas: varios compases seguidos con su barra; ¿qué compás es?
    const compas = elige(rand, Object.keys(COMPASES))
    const total = COMPASES[compas]
    const c1 = rellena(rand, total, cat), c2 = rellena(rand, total, cat)
    if (!c1 || !c2 || c1.length + c2.length > 9) continue
    return { ...base, compas, notas: [...c1.map(clave), '|', ...c2.map(clave)], bueno: compas, opciones: Object.keys(COMPASES) }
  }
}


// ── Textos ────────────────────────────────────────────────────────────────
export function textoOpcion(o, r, l) {
  if (r.tipo === 'tiempos') return tiemposTexto(o, l)
  if (r.tipo === 'compas') return o
  return nombreFigura(deClave(o), l)
}
function enunciadoViejo(r, l) {
  if (r.tipo === 'nombre') return s(l, '¿Cómo se llama?', 'What is it called?', 'Com es diu?')
  if (r.tipo === 'tiempos') return s(l, '¿Cuánto dura en un compás de 4/4?', 'How long does it last in 4/4 time?', 'Quant dura en un compàs de 4/4?')
  if (r.tipo === 'hueco') return s(l, `¿Qué falta para completar el compás de ${r.compas}?`, `What is missing to complete the ${r.compas} bar?`, `Què falta per completar el compàs de ${r.compas}?`)
  return s(l, '¿Qué compás es?', 'What is the time signature?', 'Quin compàs és?')
}
function explicacionVieja(r, l) {
  if (r.tipo === 'nombre' || r.tipo === 'tiempos') {
    const n = deClave(r.figura)
    const pt = n.puntillo ? s(l, ' El puntillo le suma la mitad de lo que vale.', ' The dot adds half of its value.', ' El punt li suma la meitat del que val.') : ''
    return s(l, `${nombreFigura(n, l)}: dura ${tiemposTexto(duracion(n), l)} con la negra como unidad.`, `${nombreFigura(n, l)}: it lasts ${tiemposTexto(duracion(n), l)}, taking the crotchet as one beat.`, `${nombreFigura(n, l)}: dura ${tiemposTexto(duracion(n), l)} amb la negra com a unitat.`) + pt
  }
  const notas = r.notas.filter(k => k !== '|').map(deClave)
  if (r.tipo === 'hueco') {
    const total = COMPASES[r.compas]
    const tiene = notas.filter((_, i) => i !== r.hueco).reduce((a, n) => a + duracion(n), 0)
    return s(l,
      `Un compás de ${r.compas} tiene ${tiemposTexto(total, l)}. Las demás figuras suman ${tiemposTexto(tiene, l)}, así que ${total - tiene <= 4 ? "falta" : "faltan"} ${tiemposTexto(total - tiene, l)}: ${nombreFigura(deClave(r.bueno), l).toLowerCase()}.`,
      `A ${r.compas} bar has ${tiemposTexto(total, l)}. The other notes add up to ${tiemposTexto(tiene, l)}, so ${tiemposTexto(total - tiene, l)} ${total - tiene <= 4 ? "is" : "are"} missing: a ${nombreFigura(deClave(r.bueno), l).toLowerCase()}.`,
      `Un compàs de ${r.compas} té ${tiemposTexto(total, l)}. Les altres figures sumen ${tiemposTexto(tiene, l)}, així que en ${total - tiene <= 4 ? "falta" : "falten"} ${tiemposTexto(total - tiene, l)}: ${nombreFigura(deClave(r.bueno), l).toLowerCase()}.`)
  }
  const total = COMPASES[r.compas]
  return s(l,
    `Cada compás suma ${tiemposTexto(total, l)}: es un ${r.compas}. El número de arriba dice cuántos tiempos hay; el 4 de abajo, que el tiempo es la negra.`,
    `Each bar adds up to ${tiemposTexto(total, l)}: it is ${r.compas}. The top number says how many beats; the 4 at the bottom, that the beat is a crotchet.`,
    `Cada compàs suma ${tiemposTexto(total, l)}: és un ${r.compas}. El número de dalt diu quants temps hi ha; el 4 de baix, que el temps és la negra.`)
}
export function schemaQuestion(r, l) {
  const desc = r.notas ? r.notas.map(k => (k === '|' ? '|' : nombreFigura(deClave(k), l))).map((t, i) => (r.tipo === 'hueco' && i === r.hueco ? '?' : t)).join(', ') + '. '
    : r.figura ? `${s(l, 'Figura', 'Note', 'Figura')}: ${r.tipo === 'nombre' ? '?' : nombreFigura(deClave(r.figura), l)}. ` : ''
  return {
    question: `${desc}${enunciadoViejo(r, l)}`,
    correctAnswer: textoOpcion(r.bueno, r, l),
    wrongAnswers: r.opciones.filter(o => o !== r.bueno).map(o => textoOpcion(o, r, l)),
  }
}

// ── Mecánicas ─────────────────────────────────────────────────────────────
// Sin opciones (genVieja sigue dando la ronda y el texto del schema):
//   empareja  (nombre)   tres figuras dibujadas: toca una y luego su nombre
//   mide      (tiempos)  toca en la regla de cuatro tiempos dónde acaba la figura
//   construye (hueco)    rellena el hueco con figuras de la paleta hasta que el
//                        compás sume justo (vale cualquier combinación que sume)
//   barra     (compas)   con la cifra a la vista, toca dónde va la barra de compás
export const MECANICA_DE_TIPO = { nombre: 'empareja', tiempos: 'mide', hueco: 'construye', compas: 'barra' }
export const MAX_HUECO = 3 // figuras que caben en el hueco al construir

const recientesM = []
export function genRonda(nivel = 'facil', opts = {}) {
  const rand = opts.rand ?? Math.random
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (let intento = 0; ; intento++) {
    const r = { ...genVieja(nivel, opts) }
    r.mecanica = MECANICA_DE_TIPO[r.tipo]
    if (r.tipo === 'nombre') {
      // Tres figuras distintas (la de la ronda y dos más), cada una con su nombre
      const otros = baraja(rand, catalogo(cfg, nivel).map(clave).filter(k => k !== r.figura)).slice(0, 2)
      r.items = baraja(rand, [r.figura, ...otros])
      r.nombres = baraja(rand, r.items)
    }
    if (r.tipo === 'compas') {
      // La barra de en medio se quita: es lo que se busca
      r.barra = r.notas.indexOf('|')
      r.seguidas = r.notas.filter(k => k !== '|')
    }
    if (r.tipo === 'hueco') r.falta = duracion(deClave(r.bueno))
    const t = `${r.tipo}:${r.figura ?? ''}:${(r.items ?? r.notas ?? []).join()}`
    if (intento < 20 && recientesM.includes(t)) continue
    recientesM.push(t)
    if (recientesM.length > 6) recientesM.shift()
    return r
  }
}
export const genRound = (difficulty = 'facil') => genRonda(difficulty)

// Paleta del hueco: las figuras del nivel (silencios aparte, con su interruptor)
export function paleta(nivel) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  return catalogo(cfg, nivel).map(clave)
}
// Lo que suma una respuesta de construir: «negra+corchea» → 6
export const sumaHueco = txt => (txt ? String(txt).split('+').filter(Boolean).reduce((a, k) => a + duracion(deClave(k)), 0) : 0)

export function respuestaBuena(r) {
  if (r.mecanica === 'empareja') return 'empareja:0'
  if (r.mecanica === 'mide') return String(r.bueno)
  if (r.mecanica === 'construye') return r.bueno
  if (r.mecanica === 'barra') return String(r.barra)
  return r.bueno
}
export function esCorrecta(r, o) {
  if (o == null) return false
  if (!r.mecanica) return o === r.bueno
  if (r.mecanica === 'mide') return Number(o) === r.bueno
  if (r.mecanica === 'construye') return sumaHueco(o) === r.falta
  return String(o) === respuestaBuena(r)
}
export const isCorrect = esCorrecta

export function enunciado(r, l) {
  switch (r.mecanica) {
    case 'empareja': return s(l, 'Toca una figura y después su nombre', 'Tap a note and then its name', 'Toca una figura i després el seu nom')
    case 'mide': return s(l, 'Con la negra como un tiempo, toca en la regla dónde acaba esta figura', 'With the crotchet as one beat, tap on the ruler where this note ends', 'Amb la negra com un temps, toca al regle on acaba aquesta figura')
    case 'construye': return s(l, `Rellena el hueco para completar el compás de ${r.compas}`, `Fill the gap to complete the ${r.compas} bar`, `Omple el buit per completar el compàs de ${r.compas}`)
    case 'barra': return s(l, `Esto está en ${r.compas}: toca dónde va la barra que separa los dos compases`, `This is in ${r.compas}: tap where the bar line between the two bars goes`, `Això és en ${r.compas}: toca on va la barra que separa els dos compassos`)
    default: return enunciadoViejo(r, l)
  }
}

export function explicacion(r, l) {
  if (r.mecanica === 'empareja') {
    return r.items.map(k => { const n = deClave(k); return `${nombreFigura(n, l)} (${tiemposTexto(duracion(n), l)})` }).join(' · ')
  }
  if (r.mecanica === 'barra') {
    const total = COMPASES[r.compas]
    return s(l,
      `En ${r.compas} cada compás suma ${tiemposTexto(total, l)}: la barra va después de la figura ${r.barra}, cuando la cuenta llega justo a ${tiemposTexto(total, l)}.`,
      `In ${r.compas} each bar adds up to ${tiemposTexto(total, l)}: the bar line goes after note ${r.barra}, when the count reaches exactly ${tiemposTexto(total, l)}.`,
      `En ${r.compas} cada compàs suma ${tiemposTexto(total, l)}: la barra va després de la figura ${r.barra}, quan el compte arriba just a ${tiemposTexto(total, l)}.`)
  }
  return explicacionVieja(r, l)
}
