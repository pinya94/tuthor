// Genética — herencia mendeliana con el cuadro de Punnett.
// Lógica pura (sin React), 100% determinista.
//
// El juego NO es rellenar el cuadro: eso es una ficha de deberes con pasos
// extra. Primero razonas y respondes; el cuadro aparece DESPUÉS, ya resuelto,
// para enseñarte por qué. Así hay que hacer la genética en la cabeza, que es
// justo lo que pide un examen.
//
// Tres tipos de ronda:
//   predice     dados los genotipos de los padres, cuántos de 4 salen de un
//               fenotipo (la destreza básica).
//   deduce      al revés: por la descendencia, deducir el genotipo de los
//               padres. "Dos perros negros tienen un cachorro marrón" — aquí
//               es donde se entiende qué es un portador.
//   incompleta  dominancia incompleta (roja × blanca = todas rosas), que
//               rompe el 3:1 que el alumno cree universal.

const pick = (arr, rand) => arr[Math.floor(rand() * arr.length)]

// ── Rasgos ────────────────────────────────────────────────────────────────────
// `alelo` es la letra; mayúscula = dominante, minúscula = recesivo.
export const RASGOS = [
  {
    id: 'guisante', alelo: 'A', org: '🌱',
    especie: { es: 'planta de guisante', en: 'pea plant', ca: 'planta de pèsol' },
    cria:    { es: 'planta', en: 'plant', ca: 'planta' },
    dom: { emoji: '🟣', label: { es: 'flor púrpura', en: 'purple flower', ca: 'flor porpra' } },
    rec: { emoji: '⚪', label: { es: 'flor blanca', en: 'white flower', ca: 'flor blanca' } },
  },
  {
    id: 'perro', alelo: 'N', org: '🐶',
    especie: { es: 'perro', en: 'dog', ca: 'gos' },
    cria:    { es: 'cachorro', en: 'puppy', ca: 'cadell' },
    dom: { emoji: '⚫', label: { es: 'pelo negro', en: 'black coat', ca: 'pèl negre' } },
    rec: { emoji: '🟤', label: { es: 'pelo marrón', en: 'brown coat', ca: 'pèl marró' } },
  },
  {
    id: 'ojos', alelo: 'M', org: '👁️',
    especie: { es: 'persona', en: 'person', ca: 'persona' },
    cria:    { es: 'hijo', en: 'child', ca: 'fill' },
    dom: { emoji: '🟤', label: { es: 'ojos marrones', en: 'brown eyes', ca: 'ulls marrons' } },
    rec: { emoji: '🔵', label: { es: 'ojos azules', en: 'blue eyes', ca: 'ulls blaus' } },
  },
]

// Rasgo con dominancia incompleta: el heterocigoto es un tercer fenotipo.
export const RASGO_INCOMPLETO = {
  id: 'dondiego', alelo: 'R', org: '🌷',
  especie: { es: 'dondiego de noche', en: 'four o’clock flower', ca: 'dondiego de nit' },
  cria:    { es: 'flor', en: 'flower', ca: 'flor' },
  hom: { emoji: '🔴', label: { es: 'roja', en: 'red', ca: 'vermella' } },
  het: { emoji: '🌸', label: { es: 'rosa', en: 'pink', ca: 'rosa' } },
  rec: { emoji: '⚪', label: { es: 'blanca', en: 'white', ca: 'blanca' } },
}

// ── Genotipos y cuadro de Punnett ─────────────────────────────────────────────
const gt = (alelo, n) => // n = nº de alelos dominantes (2, 1 o 0)
  n === 2 ? alelo + alelo : n === 1 ? alelo + alelo.toLowerCase() : alelo.toLowerCase() + alelo.toLowerCase()

// Ordena un genotipo para que el dominante vaya primero: 'aA' → 'Aa'
const norm = g => [...g].sort((a, b) => (a === a.toUpperCase() ? -1 : 1) - (b === b.toUpperCase() ? -1 : 1)).join('')

// Las 4 casillas: cada alelo del padre con cada alelo de la madre.
export function punnett(p1, p2) {
  return [
    norm(p1[0] + p2[0]), norm(p1[0] + p2[1]),
    norm(p1[1] + p2[0]), norm(p1[1] + p2[1]),
  ]
}

// Nº de alelos dominantes de un genotipo
const dosis = g => [...g].filter(c => c === c.toUpperCase()).length

// ¿Muestra el fenotipo dominante? (basta un alelo dominante)
export const esDominante = g => dosis(g) > 0

// Cuántas de las 4 casillas muestran el fenotipo dominante
export function cuentaDominante(cuadro) {
  return cuadro.filter(esDominante).length
}

const L = {
  deCada4: {
    es: (n, f) => `De cada 4 descendientes, ¿cuántos tendrán ${f}?`,
    en: (n, f) => `Out of every 4 offspring, how many will have ${f}?`,
    ca: (n, f) => `De cada 4 descendents, quants tindran ${f}?`,
  },
}

// ── Patrones de ronda ─────────────────────────────────────────────────────────

// Dados los padres, cuántos de 4 salen con un fenotipo. Se pregunta a veces
// por el dominante y a veces por el recesivo: si siempre fuera el recesivo,
// se aprendería la respuesta de memoria en vez del razonamiento.
function predice(rand, { soloRecesivo = false } = {}) {
  const rasgo = pick(RASGOS, rand)
  const A = rasgo.alelo
  // Combinaciones con descendencia interesante. Se evita cruzar dos
  // homocigotos IGUALES (AA×AA, aa×aa): la respuesta sale sin pensar.
  // AA×aa sí entra: todos salen portadores, que es un resultado que sorprende.
  const combos = [[2, 1], [1, 1], [1, 0], [2, 0]]
  const [d1, d2] = pick(combos, rand)
  const p1 = gt(A, d1), p2 = gt(A, d2)
  const cuadro = punnett(p1, p2)
  const preguntaPorRec = soloRecesivo || rand() < 0.5
  const nDom = cuentaDominante(cuadro)
  const correcta = preguntaPorRec ? 4 - nDom : nDom
  const fen = preguntaPorRec ? rasgo.rec : rasgo.dom

  return {
    tipo: 'predice', rasgo, padres: [p1, p2], cuadro,
    pregunta: {
      es: L.deCada4.es(0, fen.label.es), en: L.deCada4.en(0, fen.label.en), ca: L.deCada4.ca(0, fen.label.ca),
    },
    fenotipoPreguntado: fen,
    opciones: [0, 1, 2, 3, 4].map(n => ({ id: String(n), label: String(n) })),
    correcta: String(correcta),
    explicacion: {
      es: `${p1} × ${p2} da ${cuadro.join(', ')}. ${correcta} de 4 muestran ${fen.label.es}.`,
      en: `${p1} × ${p2} gives ${cuadro.join(', ')}. ${correcta} out of 4 show ${fen.label.en}.`,
      ca: `${p1} × ${p2} dona ${cuadro.join(', ')}. ${correcta} de 4 mostren ${fen.label.ca}.`,
    },
  }
}

// Deducción inversa: la parte interesante. Dos padres con el fenotipo
// dominante tienen una cría recesiva → los dos son portadores (Aa).
function deduce(rand) {
  const rasgo = pick(RASGOS, rand)
  const A = rasgo.alelo, a = A.toLowerCase()
  const heteroXhetero = rand() < 0.6

  // Caso 1: dominante × dominante → cría recesiva ⇒ ambos Aa
  // Caso 2: dominante × recesivo  → cría recesiva ⇒ el dominante es Aa
  const p1 = `${A}${a}`
  const p2 = heteroXhetero ? `${A}${a}` : `${a}${a}`
  const fenP2 = heteroXhetero ? rasgo.dom : rasgo.rec

  const correcta = `${p1}x${p2}`
  // Todo distractor debe ser IMPOSIBLE: ningún cruce que pueda dar `aa`, o
  // sería una segunda respuesta correcta disfrazada de error. Por eso todos
  // llevan al menos un AA (que nunca aporta un alelo recesivo).
  const distractores = heteroXhetero
    ? [`${A}${A}x${A}${A}`, `${A}${A}x${A}${a}`, `${A}${A}x${a}${a}`]
    : [`${A}${A}x${a}${a}`, `${A}${A}x${A}${a}`, `${A}${A}x${A}${A}`]
  const opciones = [correcta, ...distractores]
    .map(id => ({ id, label: id.replace('x', ' × ') }))
    .sort((x, y) => x.id.localeCompare(y.id))

  const pregunta = {
    es: `Un progenitor con ${rasgo.dom.label.es} y otro con ${fenP2.label.es} tienen una cría con ${rasgo.rec.label.es}. ¿Qué genotipos tienen los padres?`,
    en: `One parent with ${rasgo.dom.label.en} and another with ${fenP2.label.en} have offspring with ${rasgo.rec.label.en}. What are the parents’ genotypes?`,
    ca: `Un progenitor amb ${rasgo.dom.label.ca} i un altre amb ${fenP2.label.ca} tenen una cria amb ${rasgo.rec.label.ca}. Quins genotips tenen els pares?`,
  }

  return {
    tipo: 'deduce', rasgo, padres: [p1, p2], cuadro: punnett(p1, p2),
    pregunta, opciones, correcta,
    explicacion: {
      es: `Para que salga ${a}${a}, cada progenitor tiene que aportar un alelo ${a}. El que muestra ${rasgo.dom.label.es} es ${A}${a}: es portador sin que se le note.`,
      en: `To get ${a}${a}, each parent must contribute one ${a} allele. The one showing ${rasgo.dom.label.en} is ${A}${a}: a carrier without showing it.`,
      ca: `Perquè surti ${a}${a}, cada progenitor ha d’aportar un al·lel ${a}. El que mostra ${rasgo.dom.label.ca} és ${A}${a}: és portador sense que se li noti.`,
    },
  }
}

// Dominancia incompleta: el heterocigoto es un tercer fenotipo, así que
// el 3:1 de siempre se convierte en 1:2:1.
function incompleta(rand) {
  const r = RASGO_INCOMPLETO
  const R = r.alelo, b = R.toLowerCase()
  const cruces = [
    { p: [`${R}${R}`, `${b}${b}`], preg: 'het' },   // roja × blanca → todas rosas
    { p: [`${R}${b}`, `${R}${b}`], preg: 'hom' },   // rosa × rosa → 1 roja
    { p: [`${R}${b}`, `${R}${b}`], preg: 'rec' },   // rosa × rosa → 1 blanca
    { p: [`${R}${b}`, `${b}${b}`], preg: 'rec' },   // rosa × blanca → 2 blancas
  ]
  const { p, preg } = pick(cruces, rand)
  const cuadro = punnett(p[0], p[1])
  const fen = r[preg]
  const cuenta = cuadro.filter(g => {
    const d = dosis(g)
    return preg === 'hom' ? d === 2 : preg === 'het' ? d === 1 : d === 0
  }).length

  return {
    tipo: 'incompleta', rasgo: r, padres: p, cuadro,
    pregunta: {
      es: L.deCada4.es(0, fen.label.es), en: L.deCada4.en(0, fen.label.en), ca: L.deCada4.ca(0, fen.label.ca),
    },
    fenotipoPreguntado: fen,
    opciones: [0, 1, 2, 3, 4].map(n => ({ id: String(n), label: String(n) })),
    correcta: String(cuenta),
    explicacion: {
      es: `Aquí no hay dominancia: ${R}${b} no es rojo, es rosa. ${p[0]} × ${p[1]} da ${cuadro.join(', ')} → ${cuenta} de 4.`,
      en: `There is no dominance here: ${R}${b} is not red, it is pink. ${p[0]} × ${p[1]} gives ${cuadro.join(', ')} → ${cuenta} out of 4.`,
      ca: `Aquí no hi ha dominància: ${R}${b} no és vermell, és rosa. ${p[0]} × ${p[1]} dona ${cuadro.join(', ')} → ${cuenta} de 4.`,
    },
  }
}

// Fenotipo de una casilla, según el tipo de ronda (para pintar el cuadro).
export function fenotipoDe(round, genotipo) {
  if (round.tipo === 'incompleta') {
    const d = dosis(genotipo)
    return d === 2 ? round.rasgo.hom : d === 1 ? round.rasgo.het : round.rasgo.rec
  }
  return esDominante(genotipo) ? round.rasgo.dom : round.rasgo.rec
}

const POOLS = {
  facil: ['predice'],
  medio: ['predice', 'deduce'],
  dificil: ['deduce', 'incompleta', 'predice'],
}

export function genRound(level = 'facil', rand = Math.random) {
  const tipo = pick(POOLS[level] ?? POOLS.facil, rand)
  const r = tipo === 'deduce' ? deduce(rand)
    : tipo === 'incompleta' ? incompleta(rand)
    : predice(rand)
  return { ...r, level }
}
