// Ordena la Frase (inglés) — colocar las palabras en el orden correcto.
// Lógica pura (sin React), 100% determinista.
//
// El inglés tiene un orden RÍGIDO y el español no, así que traducir palabra a
// palabra falla. Cada patrón entrena un error concreto y frecuente en
// hispanohablantes, y lleva su regla: al revelar no se dice solo "mal", se
// dice POR QUÉ ("el adjetivo va antes del nombre: red car, no car red").
//
// Un patrón devuelve:
//   chips    palabras//trozos a colocar (pueden ser de más de una palabra
//            cuando el trozo no es lo que se está enseñando: "to the park")
//   answers  órdenes VÁLIDOS (más de uno cuando de verdad hay alternativa,
//            p.ej. adelantar la expresión de tiempo). Se comparan sin
//            distinguir mayúsculas, así "yesterday we…" también vale.
//   rule     la regla que enseña, en los tres idiomas

const pick = (arr, rand) => arr[Math.floor(rand() * arr.length)]

// ── Vocabulario (nivel escolar, sin ambigüedades) ─────────────────────────────
// Sujetos con la forma del verbo que les toca en presente simple.
const SUJ_S = ['She', 'He', 'My sister', 'The teacher']     // llevan verbo con -s
const SUJ_PL = ['They', 'We', 'My friends', 'The students'] // verbo sin -s

const VERBOS = [
  { base: 'play', s: 'plays', past: 'played', obj: ['football', 'tennis', 'the guitar'] },
  { base: 'read', s: 'reads', past: 'read', obj: ['a book', 'the newspaper'] },
  { base: 'watch', s: 'watches', past: 'watched', obj: ['a film', 'TV'] },
  { base: 'eat', s: 'eats', past: 'ate', obj: ['pizza', 'an apple'] },
  { base: 'drink', s: 'drinks', past: 'drank', obj: ['coffee', 'milk'] },
  { base: 'study', s: 'studies', past: 'studied', obj: ['English', 'maths'] },
]

// Sintagmas nominales ya correctos (evita fallos de a/an al generar).
const NPS = [
  ['a', 'red', 'car'], ['an', 'old', 'house'], ['a', 'new', 'bike'],
  ['a', 'big', 'dog'], ['a', 'small', 'town'], ['an', 'easy', 'exercise'],
  ['a', 'blue', 'shirt'], ['a', 'long', 'film'],
]

const FRECUENCIA = ['always', 'never', 'usually', 'often', 'sometimes']
const TIEMPO = ['yesterday', 'today', 'last week', 'every day']
const LUGAR = ['to school', 'to the park', 'at home', 'in the garden']
const ADJ_BE = ['late', 'tired', 'happy', 'busy', 'ready']

const R = {
  svo: {
    es: 'Orden básico: sujeto + verbo + objeto. En inglés el sujeto nunca se omite.',
    en: 'Basic order: subject + verb + object. In English the subject is never dropped.',
    ca: 'Ordre bàsic: subjecte + verb + objecte. En anglès el subjecte no s’omet mai.',
  },
  adj: {
    es: 'El adjetivo va SIEMPRE antes del nombre: “a red car”, nunca “a car red”.',
    en: 'The adjective ALWAYS goes before the noun: “a red car”, never “a car red”.',
    ca: 'L’adjectiu va SEMPRE abans del nom: “a red car”, mai “a car red”.',
  },
  freq: {
    es: 'Los adverbios de frecuencia (always, never, usually…) van entre el sujeto y el verbo.',
    en: 'Frequency adverbs (always, never, usually…) go between the subject and the verb.',
    ca: 'Els adverbis de freqüència (always, never, usually…) van entre el subjecte i el verb.',
  },
  freqBe: {
    es: 'Con el verbo “be” es al revés: el adverbio va DESPUÉS. “He is never late”, no “He never is late”.',
    en: 'With the verb “be” it is the other way round: the adverb goes AFTER. “He is never late”.',
    ca: 'Amb el verb “be” és al revés: l’adverbi va DESPRÉS. “He is never late”.',
  },
  tiempo: {
    es: 'La expresión de tiempo va al final (o al principio), nunca entre el verbo y el objeto.',
    en: 'The time expression goes at the end (or at the start), never between verb and object.',
    ca: 'L’expressió de temps va al final (o al principi), mai entre el verb i l’objecte.',
  },
  lugarTiempo: {
    es: 'Primero el lugar y después el tiempo: “to school yesterday”, no “yesterday to school”.',
    en: 'Place first, then time: “to school yesterday”, not “yesterday to school”.',
    ca: 'Primer el lloc i després el temps: “to school yesterday”, no “yesterday to school”.',
  },
  pregunta: {
    es: 'En las preguntas el auxiliar (do/does) va DELANTE del sujeto.',
    en: 'In questions the auxiliary (do/does) goes BEFORE the subject.',
    ca: 'A les preguntes l’auxiliar (do/does) va DAVANT del subjecte.',
  },
  wh: {
    es: 'Orden de la pregunta con wh-: palabra wh- + auxiliar + sujeto + verbo.',
    en: 'Wh- question order: wh- word + auxiliary + subject + verb.',
    ca: 'Ordre de la pregunta amb wh-: paraula wh- + auxiliar + subjecte + verb.',
  },
  negativa: {
    es: 'La negación es don’t/doesn’t + verbo en infinitivo (sin -s).',
    en: 'The negative is don’t/doesn’t + base verb (no -s).',
    ca: 'La negació és don’t/doesn’t + verb en infinitiu (sense -s).',
  },
}

// ── Patrones ──────────────────────────────────────────────────────────────────
// Cada uno devuelve { chips, answers, rule }. `answers` son arrays de tokens.

const PATRONES = {
  // Sujeto + verbo + objeto. El objeto se parte en palabras para que haya
  // algo que ordenar de verdad.
  svo: rand => {
    const tercera = rand() < 0.5
    const suj = pick(tercera ? SUJ_S : SUJ_PL, rand)
    const v = pick(VERBOS, rand)
    const obj = pick(v.obj, rand).split(' ')
    const sol = [suj, tercera ? v.s : v.base, ...obj]
    return { chips: sol, answers: [sol], rule: R.svo }
  },

  // Adjetivo antes del nombre (el fallo clásico: "a car red").
  adj: rand => {
    const tercera = rand() < 0.5
    const suj = pick(tercera ? SUJ_S : SUJ_PL, rand)
    const np = pick(NPS, rand)
    const sol = [suj, tercera ? 'has' : 'have', ...np]
    return { chips: sol, answers: [sol], rule: R.adj }
  },

  // Adverbio de frecuencia entre sujeto y verbo.
  freq: rand => {
    const tercera = rand() < 0.5
    const suj = pick(tercera ? SUJ_S : SUJ_PL, rand)
    const v = pick(VERBOS, rand)
    const sol = [suj, pick(FRECUENCIA, rand), tercera ? v.s : v.base, pick(v.obj, rand)]
    return { chips: sol, answers: [sol], rule: R.freq }
  },

  // Con "be" el adverbio va después: contrasta a propósito con el anterior.
  freqBe: rand => {
    const tercera = rand() < 0.5
    const suj = pick(tercera ? SUJ_S : SUJ_PL, rand)
    const sol = [suj, tercera ? 'is' : 'are', pick(FRECUENCIA, rand), pick(ADJ_BE, rand)]
    return { chips: sol, answers: [sol], rule: R.freqBe }
  },

  // Expresión de tiempo al final — o adelantada, que también es correcto.
  tiempo: rand => {
    const suj = pick(SUJ_PL, rand)
    const v = pick(VERBOS, rand)
    const obj = pick(v.obj, rand)
    const t = pick(TIEMPO, rand)
    const base = [suj, v.past, obj]
    return { chips: [...base, t], answers: [[...base, t], [t, ...base]], rule: R.tiempo }
  },

  // Lugar antes que tiempo.
  lugarTiempo: rand => {
    const suj = pick(SUJ_PL, rand)
    const lugar = pick(LUGAR, rand)
    const t = pick(TIEMPO, rand)
    const base = [suj, 'went', lugar]
    return { chips: [...base, t], answers: [[...base, t], [t, ...base]], rule: R.lugarTiempo }
  },

  // Pregunta con auxiliar delante del sujeto.
  pregunta: rand => {
    const tercera = rand() < 0.5
    const suj = pick(tercera ? ['she', 'he', 'your sister'] : ['they', 'you', 'your friends'], rand)
    const v = pick(VERBOS, rand)
    const sol = [tercera ? 'Does' : 'Do', suj, v.base, pick(v.obj, rand)]
    return { chips: sol, answers: [sol], rule: R.pregunta }
  },

  // Pregunta wh-.
  wh: rand => {
    const tercera = rand() < 0.5
    const suj = pick(tercera ? ['she', 'he'] : ['they', 'you'], rand)
    const wh = pick(['Where', 'When', 'Why'], rand)
    const v = pick(VERBOS, rand)
    const sol = [wh, tercera ? 'does' : 'do', suj, v.base]
    return { chips: sol, answers: [sol], rule: R.wh }
  },

  // Negativa: doesn't + infinitivo (no "doesn't plays").
  negativa: rand => {
    const tercera = rand() < 0.5
    const suj = pick(tercera ? SUJ_S : SUJ_PL, rand)
    const v = pick(VERBOS, rand)
    const sol = [suj, tercera ? 'doesn’t' : 'don’t', v.base, pick(v.obj, rand)]
    return { chips: sol, answers: [sol], rule: R.negativa }
  },
}

const POOLS = {
  facil: ['svo', 'adj', 'freq'],
  medio: ['adj', 'freq', 'tiempo', 'negativa', 'pregunta'],
  dificil: ['freqBe', 'tiempo', 'lugarTiempo', 'pregunta', 'wh', 'negativa'],
}

// Baraja evitando dejar la frase ya ordenada. Tiene que esquivar TODOS los
// órdenes válidos, no solo el principal: si no, un patrón con alternativa
// (adelantar la expresión de tiempo) puede salir ya resuelto.
function scramble(sol, answers, rand) {
  const norm = a => a.map(t => t.toLowerCase()).join(' ')
  const valido = new Set(answers.map(norm))
  for (let intento = 0; intento < 30; intento++) {
    const a = [...sol]
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1))
      ;[a[i], a[j]] = [a[j], a[i]]
    }
    if (!valido.has(norm(a))) return a
  }
  // Salida de emergencia: invertir siempre da un orden distinto con ≥2 fichas
  // (y si aun así fuera válido, no habría nada que ordenar).
  return [...sol].reverse()
}

export function genRound(level = 'facil', rand = Math.random) {
  const pool = POOLS[level] ?? POOLS.facil
  const id = pick(pool, rand)
  const { chips, answers, rule } = PATRONES[id](rand)
  return { id, level, chips: scramble(chips, answers, rand), answers, rule, solution: answers[0] }
}

// ¿El orden colocado es uno de los válidos? Sin distinguir mayúsculas, para
// que adelantar la expresión de tiempo ("yesterday we…") también cuente.
export function isCorrectOrder(round, placed) {
  const norm = a => a.map(t => t.toLowerCase()).join(' ')
  return round.answers.some(ans => norm(ans) === norm(placed))
}

// Frase final legible: mayúscula inicial y el signo que toque.
export function sentenceText(tokens) {
  if (!tokens.length) return ''
  const s = tokens.join(' ')
  const cap = s.charAt(0).toUpperCase() + s.slice(1)
  const esPregunta = /^(do|does|where|when|why|what|who|how)\b/i.test(tokens[0])
  return cap + (esPregunta ? '?' : '.')
}
