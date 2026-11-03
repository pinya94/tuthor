// Escalas y Acordes: teoría musical de ESO (intervalos, escalas, acordes).
//
// Cada nota tiene NOMBRE (letra + alteración) además de altura: en Re mayor
// la escala lleva Fa♯ y Do♯, nunca Sol♭ ni Re♭, y eso se calcula contando
// letras, no semitonos. En el teclado se toca la altura (Fa♯ y Sol♭ son la
// misma tecla), así que vale lo que suena bien; la explicación da el nombre
// correcto. Sin dobles alteraciones: si un intervalo pediría 𝄪 o 𝄫, no sale.
//
// Mecánicas (nada de elegir entre cuatro):
//   intervalo  tocar en el teclado la nota que está a ese intervalo
//   escala     marcar las notas de la escala entre la tónica y su octava
//   acorde     marcar la tercera y la quinta del acorde
//   clasifica  intervalos escritos (Do–Mi) a sus cajas (3ª mayor, 5ª justa…)

export const tx = (o, l) => o[l] ?? o.es
const s = (l, es, en, ca) => ({ es, en, ca })[l] ?? es

// ── Notas ─────────────────────────────────────────────────────────────────
const NAT = [0, 2, 4, 5, 7, 9, 11] // semitonos de Do, Re, Mi, Fa, Sol, La, Si
const LETRAS = {
  es: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'],
  ca: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'],
  en: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
}
const ALT = { '-1': '♭', 0: '', 1: '♯' }
// Una nota escrita: letra 0-6, alteración −1/0/1, octava (4 = la del Do central)
export const nota = (letra, alt = 0, oct = 4) => ({ letra, alt, oct })
export const altura = n => (n.oct - 4) * 12 + NAT[n.letra] + n.alt // 0 = Do4
export const nombre = (n, l) => (LETRAS[l] ?? LETRAS.es)[n.letra] + ALT[n.alt]
// Para el audio de pentagramaAudio.js: 'F#4' (solo sostenidos)
const SOST = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
export const tono = h => `${SOST[((h % 12) + 12) % 12]}${4 + Math.floor(h / 12)}`

// ── Intervalos ────────────────────────────────────────────────────────────
// [número, calidad, semitonos]
export const INTERVALOS = {
  '2m': [2, 'm', 1], '2M': [2, 'M', 2], '3m': [3, 'm', 3], '3M': [3, 'M', 4],
  '4J': [4, 'J', 5], '4A': [4, 'A', 6], '5d': [5, 'd', 6], '5J': [5, 'J', 7],
  '6m': [6, 'm', 8], '6M': [6, 'M', 9], '7m': [7, 'm', 10], '7M': [7, 'M', 11], '8J': [8, 'J', 12],
}
const CALIDAD = {
  m: { es: 'menor', en: 'minor', ca: 'menor' },
  M: { es: 'mayor', en: 'major', ca: 'major' },
  J: { es: 'justa', en: 'perfect', ca: 'justa' },
  A: { es: 'aumentada', en: 'augmented', ca: 'augmentada' },
  d: { es: 'disminuida', en: 'diminished', ca: 'disminuïda' },
}
const ORD_EN = { 2: '2nd', 3: '3rd', 4: '4th', 5: '5th', 6: '6th', 7: '7th', 8: 'octave' }
export function nombreIntervalo(id, l) {
  const [n, c] = INTERVALOS[id]
  if (l === 'en') return n === 8 ? 'perfect octave' : `${tx(CALIDAD[c], 'en')} ${ORD_EN[n]}`
  return n === 8 ? s(l, '8ª justa (octava)', '', '8a justa (octava)') : `${n}${l === 'ca' ? 'a' : 'ª'} ${tx(CALIDAD[c], l)}`
}

// La nota a un intervalo por encima: la letra sale de contar, la alteración
// de los semitonos. null si haría falta una doble alteración.
export function sube(n, id) {
  const [num, , st] = INTERVALOS[id]
  const pasos = n.letra + num - 1
  const letra = pasos % 7
  const oct = n.oct + Math.floor(pasos / 7)
  const natural = altura(nota(letra, 0, oct))
  const alt = altura(n) + st - natural
  return Math.abs(alt) <= 1 ? nota(letra, alt, oct) : null
}

// ── Escalas y acordes ─────────────────────────────────────────────────────
export const ESCALAS = {
  mayor: { pasos: ['2M', '3M', '4J', '5J', '6M', '7M', '8J'], nombre: { es: 'mayor', en: 'major', ca: 'major' } },
  menor: { pasos: ['2M', '3m', '4J', '5J', '6m', '7m', '8J'], nombre: { es: 'menor natural', en: 'natural minor', ca: 'menor natural' } },
}
export const ACORDES = {
  M: { notas: ['3M', '5J'], nombre: { es: 'mayor', en: 'major', ca: 'major' } },
  m: { notas: ['3m', '5J'], nombre: { es: 'menor', en: 'minor', ca: 'menor' } },
  d: { notas: ['3m', '5d'], nombre: { es: 'disminuido', en: 'diminished', ca: 'disminuït' } },
  A: { notas: ['3M', '4A'], nombre: { es: 'aumentado', en: 'augmented', ca: 'augmentat' } },
}
// La 5ª aumentada no está en la tabla: el acorde aumentado se calcula aparte
function quintaAumentada(n) { const t = sube(n, '5J'); return t && t.alt < 1 ? nota(t.letra, t.alt + 1, t.oct) : null }

export function notasEscala(raiz, tipo) {
  const ns = [raiz, ...ESCALAS[tipo].pasos.map(p => sube(raiz, p))]
  return ns.every(Boolean) ? ns : null
}
export function notasAcorde(raiz, tipo) {
  const ns = tipo === 'A' ? [raiz, sube(raiz, '3M'), quintaAumentada(raiz)] : [raiz, ...ACORDES[tipo].notas.map(p => sube(raiz, p))]
  return ns.every(Boolean) ? ns : null
}
export const alteraciones = ns => ns.slice(0, 7).filter(n => n.alt !== 0).length

// Tónicas por nivel (letra, alteración), siempre en la octava 4 para que
// la escala quepa en el teclado de dos octavas
const T = (letra, alt = 0) => nota(letra, alt, 4)
const TONICAS = {
  mayorFacil: [T(0), T(4), T(1), T(3)], // Do, Sol, Re, Fa: 0-2 alteraciones
  mayorMas: [T(5), T(6, -1), T(2, -1), T(2), T(5, -1)], // La, Si♭, Mi♭, Mi, La♭: 2-4
  menor: [T(5), T(2), T(1), T(4), T(0)], // La, Mi, Re, Sol, Do menor
  natural: [T(0), T(1), T(2), T(3), T(4), T(5)],
  // Las alteradas de siempre (nada de Mi♯ ni Fa♭ como punto de partida)
  alterada: [T(0, 1), T(2, -1), T(3, 1), T(5, -1), T(6, -1)],
}

// ── Rondas ────────────────────────────────────────────────────────────────
export const NIVELES = {
  facil:   { tipos: ['intervalo', 'intervalo', 'acorde', 'clasifica'], intervalos: ['3M', '3m', '5J', '8J'], acordes: ['M'], nombres: true },
  medio:   { tipos: ['intervalo', 'escala', 'acorde', 'clasifica'], intervalos: ['2m', '2M', '3m', '3M', '4J', '5J', '6m', '6M', '8J'], acordes: ['M', 'm'], nombres: true },
  dificil: { tipos: ['intervalo', 'escala', 'acorde', 'clasifica'], intervalos: ['2m', '2M', '3m', '3M', '4J', '4A', '5d', '5J', '6m', '6M', '7m', '7M'], acordes: ['M', 'm', 'd', 'A'], nombres: false },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
let seq = 0

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const tipo = elige(rand, cfg.tipos)
  const base = { id: ++seq, nivel, tipo, nombres: cfg.nombres }

  if (tipo === 'intervalo') {
    for (;;) {
      const intervalo = elige(rand, cfg.intervalos)
      // En fácil, la nota de partida es natural; en difícil puede llevar alteración
      const raiz = elige(rand, nivel === 'dificil' && rand() < 0.3 ? TONICAS.alterada : TONICAS.natural)
      const meta = sube(raiz, intervalo)
      if (!meta || altura(raiz) < 0) continue
      return { ...base, raiz, intervalo, meta, bueno: 'intervalo:ok' }
    }
  }

  if (tipo === 'escala') {
    const modo = nivel === 'dificil' && rand() < 0.35 ? 'menor' : 'mayor'
    const raiz = elige(rand, modo === 'menor' ? TONICAS.menor : nivel === 'dificil' ? [...TONICAS.mayorFacil, ...TONICAS.mayorMas] : TONICAS.mayorFacil)
    return { ...base, raiz, modo, notas: notasEscala(raiz, modo), bueno: 'escala:ok' }
  }

  if (tipo === 'acorde') {
    for (;;) {
      const clase = elige(rand, cfg.acordes)
      const raiz = nivel === 'facil' ? elige(rand, [T(0), T(3), T(4)]) : elige(rand, TONICAS.natural)
      const notas = notasAcorde(raiz, clase)
      if (!notas) continue
      return { ...base, raiz, clase, notas, bueno: 'acorde:ok' }
    }
  }

  // clasifica: cuatro intervalos escritos, de al menos tres clases distintas
  const cajas = baraja(rand, cfg.intervalos.filter(i => i !== '8J')).slice(0, nivel === 'facil' ? 3 : 4)
  for (;;) {
    const items = Array.from({ length: 4 }, () => {
      for (;;) {
        const id = elige(rand, cajas)
        const raiz = elige(rand, TONICAS.natural)
        const meta = sube(raiz, id)
        if (meta) return { intervalo: id, raiz, meta }
      }
    })
    if (new Set(items.map(x => x.intervalo)).size < Math.min(3, cajas.length)) continue
    if (new Set(items.map(x => `${x.raiz.letra}${x.intervalo}`)).size < 4) continue
    return { ...base, cajas, items, bueno: 'clasifica:0' }
  }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
// Respuestas: «intervalo:ok|mal», «escala:ok|mal», «acorde:ok|mal», «clasifica:fallos».
export const esCorrecta = (r, x) => x === r.bueno

// Lo que hay que tener marcado en el teclado (alturas), y lo que viene dado
export function objetivo(r) {
  if (r.tipo === 'intervalo') return [altura(r.meta)]
  if (r.tipo === 'escala') return r.notas.slice(1, 7).map(altura)
  return r.notas.slice(1).map(altura)
}
export function dadas(r) {
  if (r.tipo === 'escala') return [altura(r.notas[0]), altura(r.notas[7])]
  return [altura(r.raiz)]
}
export const mismasAlturas = (a, b) => a.length === b.length && [...a].sort((x, y) => x - y).every((x, i) => x === [...b].sort((p, q) => p - q)[i])
export const listaNotas = (ns, l) => ns.map(n => nombre(n, l)).join(' – ')

// ── Textos ────────────────────────────────────────────────────────────────
export function enunciado(r, l) {
  const raiz = nombre(r.raiz ?? r.items?.[0].raiz, l)
  if (r.tipo === 'intervalo') return s(l, `Toca la nota que está una ${nombreIntervalo(r.intervalo, l)} por encima de ${raiz}`, `Play the note a ${nombreIntervalo(r.intervalo, l)} above ${raiz}`, `Toca la nota que és una ${nombreIntervalo(r.intervalo, l)} per sobre de ${raiz}`)
  if (r.tipo === 'escala') return s(l, `Marca la escala de ${raiz} ${tx(ESCALAS[r.modo].nombre, l)}`, `Mark the ${raiz} ${tx(ESCALAS[r.modo].nombre, l)} scale`, `Marca l’escala de ${raiz} ${tx(ESCALAS[r.modo].nombre, l)}`)
  if (r.tipo === 'acorde') return s(l, `Marca el acorde de ${raiz} ${tx(ACORDES[r.clase].nombre, l)}`, `Mark the ${raiz} ${tx(ACORDES[r.clase].nombre, l)} chord`, `Marca l’acord de ${raiz} ${tx(ACORDES[r.clase].nombre, l)}`)
  return s(l, '¿Qué intervalo es cada uno?', 'Which interval is each one?', 'Quin interval és cadascun?')
}

export function explicacion(r, l) {
  if (r.tipo === 'intervalo') {
    const [num, , st] = INTERVALOS[r.intervalo]
    return s(l,
      `De ${nombre(r.raiz, l)} a ${nombre(r.meta, l)}: ${num} notas contando las dos y ${st} semitonos.`,
      `From ${nombre(r.raiz, l)} to ${nombre(r.meta, l)}: ${num} letter names counting both, and ${st} semitones.`,
      `De ${nombre(r.raiz, l)} a ${nombre(r.meta, l)}: ${num} notes comptant les dues i ${st} semitons.`)
  }
  if (r.tipo === 'escala') {
    const patron = r.modo === 'mayor' ? s(l, 'tono, tono, semitono, tono, tono, tono, semitono', 'tone, tone, semitone, tone, tone, tone, semitone', 'to, to, semitò, to, to, to, semitò') : s(l, 'tono, semitono, tono, tono, semitono, tono, tono', 'tone, semitone, tone, tone, semitone, tone, tone', 'to, semitò, to, to, semitò, to, to')
    const n = alteraciones(r.notas)
    return `${listaNotas(r.notas, l)}. ` + s(l, `Patrón: ${patron}. ${n === 0 ? 'Sin alteraciones' : `${n} ${n === 1 ? 'alteración' : 'alteraciones'}`}.`, `Pattern: ${patron}. ${n === 0 ? 'No sharps or flats' : `${n} ${n === 1 ? 'sharp or flat' : 'sharps or flats'}`}.`, `Patró: ${patron}. ${n === 0 ? 'Sense alteracions' : `${n} ${n === 1 ? 'alteració' : 'alteracions'}`}.`)
  }
  if (r.tipo === 'acorde') {
    const [, t, q] = r.notas
    const it = { M: ['3M', '5J'], m: ['3m', '5J'], d: ['3m', '5d'], A: ['3M', null] }[r.clase]
    const quinta = it[1] ? nombreIntervalo(it[1], l) : s(l, '5ª aumentada', 'augmented 5th', '5a augmentada')
    return `${listaNotas(r.notas, l)}: ` + s(l, `${nombre(t, l)} es la ${nombreIntervalo(it[0], l)} y ${nombre(q, l)} la ${quinta}.`, `${nombre(t, l)} is the ${nombreIntervalo(it[0], l)} and ${nombre(q, l)} the ${quinta}.`, `${nombre(t, l)} és la ${nombreIntervalo(it[0], l)} i ${nombre(q, l)} la ${quinta}.`)
  }
  return r.items.map(x => `${nombre(x.raiz, l)}–${nombre(x.meta, l)}: ${nombreIntervalo(x.intervalo, l)} (${INTERVALOS[x.intervalo][2]} st)`).join(' · ') + '.'
}

// Para los buscadores y el examen en texto.
export function schemaQuestion(r, l) {
  if (r.tipo === 'intervalo') {
    const buena = nombre(r.meta, l)
    const vecinas = [nota(r.meta.letra, r.meta.alt === 0 ? 1 : 0), nota(r.meta.letra, r.meta.alt === 0 ? -1 : 0), nota((r.meta.letra + 1) % 7, 0), nota((r.meta.letra + 6) % 7, 0)]
    const malas = [...new Set(vecinas.map(n => nombre(n, l)))].filter(x => x !== buena).slice(0, 3)
    return { question: enunciado(r, l).replace(/^Toca la nota que está|^Play the note|^Toca la nota que és/, m => ({ 'Toca la nota que está': '¿Qué nota está', 'Play the note': 'Which note is', 'Toca la nota que és': 'Quina nota és' })[m]) + '?', correctAnswer: buena, wrongAnswers: malas }
  }
  if (r.tipo === 'escala' || r.tipo === 'acorde') {
    const buena = listaNotas(r.notas, l)
    const quitaAlt = r.notas.map(n => (n.alt !== 0 ? nota(n.letra, 0, n.oct) : n))
    const pone = (k, d) => r.notas.map((n, i) => (i === k && Math.abs(n.alt + d) <= 1 ? nota(n.letra, n.alt + d, n.oct) : n))
    const malas = [...new Set([listaNotas(quitaAlt, l), listaNotas(pone(2, -1), l), listaNotas(pone(2, 1), l), listaNotas(pone(r.notas.length - 2, 1), l)])].filter(x => x !== buena).slice(0, 3)
    return { question: s(l, `¿Qué notas tiene ${r.tipo === 'escala' ? 'la escala' : 'el acorde'} de ${nombre(r.raiz, l)} ${tx((r.tipo === 'escala' ? ESCALAS[r.modo] : ACORDES[r.clase]).nombre, l)}?`, `Which notes make up the ${nombre(r.raiz, l)} ${tx((r.tipo === 'escala' ? ESCALAS[r.modo] : ACORDES[r.clase]).nombre, l)} ${r.tipo === 'escala' ? 'scale' : 'chord'}?`, `Quines notes té ${r.tipo === 'escala' ? 'l’escala' : 'l’acord'} de ${nombre(r.raiz, l)} ${tx((r.tipo === 'escala' ? ESCALAS[r.modo] : ACORDES[r.clase]).nombre, l)}?`), correctAnswer: buena, wrongAnswers: malas }
  }
  const x = r.items[0]
  return { question: s(l, `¿Qué intervalo hay de ${nombre(x.raiz, l)} a ${nombre(x.meta, l)}?`, `What interval is ${nombre(x.raiz, l)} to ${nombre(x.meta, l)}?`, `Quin interval hi ha de ${nombre(x.raiz, l)} a ${nombre(x.meta, l)}?`), correctAnswer: nombreIntervalo(x.intervalo, l), wrongAnswers: r.cajas.filter(c => c !== x.intervalo).map(c => nombreIntervalo(c, l)) }
}
