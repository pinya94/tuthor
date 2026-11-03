// ¿Quién Desafina?: tres instrumentos tocan la misma nota y uno está
// desafinado. Música (afinación, frecuencia y altura) para Primaria y ESO.
//
// La desafinación se mide en cents: 100 cents = 1 semitono, 1200 = una
// octava, y f = f₀ · 2^(cents/1200). Las frecuencias se calculan, no se
// escriben a mano. Por debajo de ~10 cents casi nadie lo oye, así que el
// difícil no baja de 12.
//
// Mecánicas:
//   cual   escuchar los tres (se pueden repetir) y tocar el que desafina;
//          en medio y difícil, además, si está alto (sube) o bajo (baja)
//   afina  mover la clavija del desafinado hasta que suene igual que el de
//          referencia (vale a ±8 cents en medio y ±5 en difícil)

export const tx = (o, l) => o[l] ?? o.es
const s = (l, es, en, ca) => ({ es, en, ca })[l] ?? es

export const NOTAS = [
  { id: 'la4', f: 440, nombre: { es: 'La', en: 'A', ca: 'La' } },
  { id: 'sol4', f: 392, nombre: { es: 'Sol', en: 'G', ca: 'Sol' } },
  { id: 'mi4', f: 329.63, nombre: { es: 'Mi', en: 'E', ca: 'Mi' } },
  { id: 'do5', f: 523.25, nombre: { es: 'Do', en: 'C', ca: 'Do' } },
  { id: 're5', f: 587.33, nombre: { es: 'Re', en: 'D', ca: 'Re' } },
]
// Los dibujos son los de La Orquesta; el timbre lo pone el componente
export const INSTRUMENTOS = ['violin', 'flauta', 'guitarra', 'clarinete', 'trompeta', 'piano']

export const conCents = (f, cents) => f * Math.pow(2, cents / 1200)
export const centsEntre = (f, ref) => 1200 * Math.log2(f / ref)
export const hz = (f, l) => new Intl.NumberFormat(l === 'en' ? 'en-GB' : l === 'ca' ? 'ca-ES' : 'es-ES', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(f) + ' Hz'

export const NIVELES = {
  facil:   { tipos: ['cual'], cents: [45, 70], direccion: false },
  medio:   { tipos: ['cual', 'cual', 'afina'], cents: [25, 40], direccion: true, tolerancia: 8 },
  dificil: { tipos: ['cual', 'afina'], cents: [12, 22], direccion: true, tolerancia: 5 },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const entre = (rand, a, b) => a + Math.floor(rand() * (b - a + 1))
const baraja = (rand, xs) => {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]] }
  return a
}
let seq = 0

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const tipo = elige(rand, cfg.tipos)
  const nota = elige(rand, NOTAS)
  const cents = entre(rand, cfg.cents[0], cfg.cents[1]) * (rand() < 0.5 ? -1 : 1)
  const base = { id: ++seq, nivel, tipo, nota: nota.id, cents }

  if (tipo === 'cual') {
    const inst = baraja(rand, INSTRUMENTOS).slice(0, 3)
    const malo = entre(rand, 0, 2)
    const dir = cents > 0 ? 'sube' : 'baja'
    return { ...base, inst, malo, direccion: cfg.direccion, bueno: cfg.direccion ? `cual:${malo}:${dir}` : `cual:${malo}` }
  }
  // afina: uno de referencia y el desafinado, con la clavija en cents (−100…100)
  const [ref, otro] = baraja(rand, INSTRUMENTOS).slice(0, 2)
  // El deslizador empieza en `inicio` (no en el centro): si estuviera afinado
  // en el medio, la posición regalaría la respuesta
  return { ...base, inst: [ref, otro], tolerancia: cfg.tolerancia, inicio: entre(rand, -25, 25), bueno: 'afina:ok' }
}

export const genRound = (difficulty = 'facil') => genRonda(difficulty)
// Respuestas: «cual:i» (fácil), «cual:i:sube|baja», «afina:ok|mal».
export const esCorrecta = (r, x) => x === r.bueno
export const notaDe = r => NOTAS.find(n => n.id === r.nota)
// Frecuencia que suena cada instrumento de una ronda «cual»
export const frecuencias = r => r.inst.map((_, i) => (r.tipo === 'cual' && i === r.malo ? conCents(notaDe(r).f, r.cents) : notaDe(r).f))
// En «afina», la clavija empieza en r.cents y el alumno la mueve: queda bien
// si lo que suena está a menos de la tolerancia
export const afinado = (r, clavija) => Math.abs(clavija) <= r.tolerancia
// Posición del deslizador (−90…90) → cents que suena el desafinado
export const centsDe = (r, v) => r.cents + v - r.inicio
export const RANGO = 90

// ── Textos ────────────────────────────────────────────────────────────────
const sentido = (c, l) => (c > 0
  ? s(l, 'más agudo (alto)', 'sharp (too high)', 'més agut (alt)')
  : s(l, 'más grave (bajo)', 'flat (too low)', 'més greu (baix)'))

// +40 / −36 (signo menos de verdad)
const conSigno = c => (c > 0 ? `+${c}` : c < 0 ? `−${-c}` : '0')
// «an A», «an E», «a G»…
const articulo = n => (/^[AE]/.test(n) ? 'an' : 'a')

export function enunciado(r, l) {
  const n = tx(notaDe(r).nombre, l)
  if (r.tipo === 'afina') return s(l, `Afina el segundo instrumento: mueve la clavija hasta que su ${n} suene igual que el del primero`, `Tune the second instrument: move the peg until its ${n} sounds the same as the first one’s`, `Afina el segon instrument: mou la clavilla fins que el seu ${n} soni igual que el del primer`)
  return r.direccion
    ? s(l, `Los tres tocan un ${n}. ¿Cuál desafina, y está alto o bajo?`, `All three play ${articulo(n)} ${n}. Which one is out of tune, and is it sharp or flat?`, `Els tres toquen un ${n}. Quin desafina, i està alt o baix?`)
    : s(l, `Los tres tocan un ${n}. ¿Cuál desafina?`, `All three play ${articulo(n)} ${n}. Which one is out of tune?`, `Els tres toquen un ${n}. Quin desafina?`)
}

export function explicacion(r, l, nombres, clavija) {
  const n = notaDe(r)
  const nom = i => nombres[i]
  const cents = r.tipo === 'afina' ? clavija ?? r.cents : r.cents
  const fMala = conCents(n.f, cents)
  const regla = s(l, '100 cents son un semitono; la frecuencia se multiplica por 2^(cents/1200).', '100 cents make one semitone; the frequency is multiplied by 2^(cents/1200).', '100 cents són un semitò; la freqüència es multiplica per 2^(cents/1200).')
  if (r.tipo === 'afina') {
    const ini = conCents(n.f, r.cents)
    const quedo = Math.abs(cents) <= r.tolerancia
      ? s(l, `Lo dejaste a ${conSigno(Math.round(cents))} cents: afinado.`, `You left it at ${conSigno(Math.round(cents))} cents: in tune.`, `L’has deixat a ${conSigno(Math.round(cents))} cents: afinat.`)
      : s(l, `Lo dejaste a ${conSigno(Math.round(cents))} cents (${hz(fMala, l)}), todavía ${sentido(cents, l)}.`, `You left it at ${conSigno(Math.round(cents))} cents (${hz(fMala, l)}), still ${sentido(cents, l)}.`, `L’has deixat a ${conSigno(Math.round(cents))} cents (${hz(fMala, l)}), encara ${sentido(cents, l)}.`)
    return s(l, `${nom(0)} da el ${tx(n.nombre, l)} a ${hz(n.f, l)}. ${nom(1)} empezaba a ${hz(ini, l)}: ${conSigno(r.cents)} cents, ${sentido(r.cents, l)}. `, `${nom(0)} gives ${tx(n.nombre, l)} at ${hz(n.f, l)}. ${nom(1)} started at ${hz(ini, l)}: ${conSigno(r.cents)} cents, ${sentido(r.cents, l)}. `, `${nom(0)} dona el ${tx(n.nombre, l)} a ${hz(n.f, l)}. ${nom(1)} començava a ${hz(ini, l)}: ${conSigno(r.cents)} cents, ${sentido(r.cents, l)}. `) + quedo + ' ' + regla
  }
  const fs = frecuencias(r)
  const lista = r.inst.map((_, i) => `${nom(i)}: ${hz(fs[i], l)}`).join(' · ')
  return `${lista}. ` + s(l,
    `${nom(r.malo)} se va ${conSigno(r.cents)} cents (${hz(Math.abs(fMala - n.f), l)} de diferencia): está ${sentido(r.cents, l)}. `,
    `${nom(r.malo)} is ${conSigno(r.cents)} cents out (${hz(Math.abs(fMala - n.f), l)} apart): it is ${sentido(r.cents, l)}. `,
    `${nom(r.malo)} se'n va ${conSigno(r.cents)} cents (${hz(Math.abs(fMala - n.f), l)} de diferència): està ${sentido(r.cents, l)}. `) + regla
}

// Para los buscadores y el examen en texto (sin audio, con las frecuencias)
export function schemaQuestion(r, l) {
  const n = notaDe(r)
  const f = conCents(n.f, r.cents)
  const q = s(l, `El ${tx(n.nombre, l)} afinado suena a ${hz(n.f, l)}. Un instrumento lo da a ${hz(f, l)}. ¿Cómo está?`, `${tx(n.nombre, l)} in tune is ${hz(n.f, l)}. An instrument plays it at ${hz(f, l)}. How is it?`, `El ${tx(n.nombre, l)} afinat sona a ${hz(n.f, l)}. Un instrument el dona a ${hz(f, l)}. Com està?`)
  const buena = r.cents > 0 ? s(l, 'Alto (más agudo)', 'Sharp (too high)', 'Alt (més agut)') : s(l, 'Bajo (más grave)', 'Flat (too low)', 'Baix (més greu)')
  const malas = [r.cents > 0 ? s(l, 'Bajo (más grave)', 'Flat (too low)', 'Baix (més greu)') : s(l, 'Alto (más agudo)', 'Sharp (too high)', 'Alt (més agut)'), s(l, 'Afinado', 'In tune', 'Afinat'), s(l, 'Una octava más arriba', 'An octave higher', 'Una octava més amunt')]
  return { question: q, correctAnswer: buena, wrongAnswers: malas }
}
