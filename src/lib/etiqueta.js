// Lee la Etiqueta (biología · nutrición): leer la tabla nutricional de un
// envase para decidir. Datos en data/etiquetas.js.
//
// Tipos de pregunta:
//   mas      → ¿cuál tiene más azúcar / sal / fibra… por cada 100 g?
//   terrones → ¿cuántos terrones de azúcar (4 g) hay en una ración?
//   racion   → ¿cuántos gramos de X hay en una ración?
//   semaforo → ¿es alto, medio o bajo en X? (criterio del semáforo nutricional)
//   trampa   → ¿qué aporta más X en lo que te comes: una ración de A o de B?
//              (la de más X por 100 g no siempre gana: depende de la ración)
//
// Reglas fijas y visibles, como en El Tiempo:
//   · un terrón de azúcar son 4 g;
//   · en una ración hay (valor por 100) × gramos de la ración / 100;
//   · semáforo por 100 g (FSA, el más usado en los envases europeos): alto y
//     bajo por encima / por debajo de los umbrales de UMBRALES; en bebidas, los
//     umbrales son la mitad.
// Las preguntas evitan valores justo en el límite y empates ajustados.
import { PRODUCTOS } from '../data/etiquetas'

export const TERRON = 4
export const NUTRIENTES = ['azucares', 'sal', 'grasas', 'saturadas', 'fibra', 'proteinas']
export const UMBRALES = {
  // [bajo ≤, alto >] por 100 g
  azucares: [5, 22.5],
  grasas: [3, 17.5],
  saturadas: [1.5, 5],
  sal: [0.3, 1.5],
}

export const NIVELES = {
  facil:   { tipos: ['mas', 'mas', 'terrones'], nutrientes: ['azucares', 'sal', 'fibra', 'proteinas'], etiquetas: 2 },
  medio:   { tipos: ['mas', 'racion', 'semaforo', 'terrones'], nutrientes: ['azucares', 'sal', 'grasas', 'saturadas', 'fibra', 'proteinas'], etiquetas: 3 },
  dificil: { tipos: ['trampa', 'trampa', 'semaforo', 'racion', 'mas'], nutrientes: ['azucares', 'sal', 'grasas', 'saturadas', 'fibra', 'proteinas'], etiquetas: 3 },
}

const elige = (rand, xs) => xs[Math.floor(rand() * xs.length)]
const baraja = (rand, xs) => [...xs].sort(() => rand() - 0.5)
export const enRacion = (p, n) => Math.round((p[n] * p.racion) / 100 * 10) / 10
export const umbralesDe = (p, n) => (p.liquido ? UMBRALES[n].map(x => x / 2) : UMBRALES[n])
export function semaforo(p, n) {
  const [bajo, alto] = umbralesDe(p, n)
  return p[n] > alto ? 'alto' : p[n] <= bajo ? 'bajo' : 'medio'
}
const cercaDelLimite = (p, n) => umbralesDe(p, n).some(u => Math.abs(p[n] - u) <= Math.max(0.15 * u, 0.05))

function genMas(cfg, rand) {
  const n = elige(rand, cfg.nutrientes)
  const ps = baraja(rand, PRODUCTOS).slice(0, cfg.etiquetas)
  const orden = [...ps].sort((a, b) => b[n] - a[n])
  // ganador claro: al menos un 20 % más que el segundo
  if (orden[0][n] <= 0 || orden[0][n] < orden[1][n] * 1.2 + 0.05) return null
  return { tipo: 'mas', nutriente: n, productos: ps.map(p => p.id), bueno: orden[0].id, opciones: ps.map(p => p.id) }
}

function genTerrones(cfg, rand) {
  const p = elige(rand, PRODUCTOS.filter(x => enRacion(x, 'azucares') >= 6))
  const exacto = enRacion(p, 'azucares') / TERRON
  const bueno = Math.round(exacto)
  if (Math.abs(exacto - bueno) > 0.3) return null // que el redondeo no sea discutible
  const opciones = baraja(rand, [...new Set([bueno, bueno + 2, Math.max(1, bueno - 2), Math.round(p.azucares / TERRON)])]).filter(x => x > 0)
  if (opciones.length < 3) return null
  return { tipo: 'terrones', nutriente: 'azucares', productos: [p.id], bueno, opciones }
}

function genRacion(cfg, rand) {
  const n = elige(rand, ['azucares', 'grasas', 'sal', 'proteinas', 'fibra'])
  const p = elige(rand, PRODUCTOS.filter(x => x[n] > 0 && x.racion !== 100))
  const bueno = enRacion(p, n)
  if (bueno < 0.2) return null
  // distractores: el valor por 100 (el error típico), y el doble / la mitad
  const cand = [p[n], Math.round(bueno * 2 * 10) / 10, Math.round(bueno / 2 * 10) / 10].filter(x => x !== bueno && x > 0)
  const opciones = baraja(rand, [...new Set([bueno, ...cand])])
  if (opciones.length < 3) return null
  return { tipo: 'racion', nutriente: n, productos: [p.id], bueno, opciones }
}

function genSemaforo(cfg, rand) {
  const n = elige(rand, Object.keys(UMBRALES))
  const p = elige(rand, PRODUCTOS)
  if (cercaDelLimite(p, n)) return null
  return { tipo: 'semaforo', nutriente: n, productos: [p.id], bueno: semaforo(p, n), opciones: ['bajo', 'medio', 'alto'] }
}

// La de más por 100 g NO es la que más aporta en la ración (o al revés, para
// que no se pueda acertar siempre eligiendo «la otra»).
function genTrampa(cfg, rand) {
  const n = elige(rand, ['azucares', 'grasas', 'sal'])
  const [a, b] = baraja(rand, PRODUCTOS.filter(x => x[n] > 0)).slice(0, 2)
  const ra = enRacion(a, n), rb = enRacion(b, n)
  if (Math.max(ra, rb) < Math.min(ra, rb) * 1.25) return null
  const ganaRacion = ra > rb ? a : b
  const ganaPor100 = a[n] > b[n] ? a : b
  const inversa = ganaRacion !== ganaPor100
  if (!inversa && rand() < 0.85) return null // casi siempre, la trampa de verdad
  return { tipo: 'trampa', nutriente: n, productos: [a.id, b.id], bueno: ganaRacion.id, opciones: [a.id, b.id] }
}

const GEN = { mas: genMas, terrones: genTerrones, racion: genRacion, semaforo: genSemaforo, trampa: genTrampa }

export function genRonda(nivel = 'facil', { rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  for (;;) {
    const r = GEN[elige(rand, cfg.tipos)](cfg, rand)
    if (r) return { ...r, nivel }
  }
}

export const esCorrecta = (ronda, r) => r === ronda.bueno
export const genRound = d => genRonda(d)
export const isCorrect = esCorrecta
export const producto = id => PRODUCTOS.find(p => p.id === id)

// ── Textos ───────────────────────────────────────────────────────────────
const tx = (l, es, en, ca) => ({ es, en, ca })[l] ?? es
export const NOMBRE_NUTRIENTE = {
  azucares: { es: 'azúcar', en: 'sugar', ca: 'sucre' },
  sal: { es: 'sal', en: 'salt', ca: 'sal' },
  grasas: { es: 'grasa', en: 'fat', ca: 'greix' },
  saturadas: { es: 'grasas saturadas', en: 'saturated fat', ca: 'greixos saturats' },
  fibra: { es: 'fibra', en: 'fibre', ca: 'fibra' },
  proteinas: { es: 'proteínas', en: 'protein', ca: 'proteïnes' },
}
export const NOMBRE_SEMAFORO = {
  bajo: { es: 'Bajo 🟢', en: 'Low 🟢', ca: 'Baix 🟢' },
  medio: { es: 'Medio 🟡', en: 'Medium 🟡', ca: 'Mitjà 🟡' },
  alto: { es: 'Alto 🔴', en: 'High 🔴', ca: 'Alt 🔴' },
}
const nN = (n, l) => NOMBRE_NUTRIENTE[n][l] ?? NOMBRE_NUTRIENTE[n].es
const num = (x, l) => (l === 'en' ? String(x) : String(x).replace('.', ','))
const nombreP = (p, l) => p.nombre[l] ?? p.nombre.es
const ud = p => (p.liquido ? 'ml' : 'g')

export function enunciado(ronda, l) {
  const n = nN(ronda.nutriente, l)
  const p = producto(ronda.productos[0])
  switch (ronda.tipo) {
    case 'mas': return tx(l, `¿Cuál tiene más ${n} por cada 100 g o 100 ml?`, `Which has the most ${n} per 100 g or 100 ml?`, `Quin té més ${n} per cada 100 g o 100 ml?`)
    case 'terrones': return tx(l, `¿Cuántos terrones de azúcar (4 g cada uno) hay en ${p.nombreRacion.es} de ${nombreP(p, l).toLowerCase()}?`, `How many sugar cubes (4 g each) are in ${p.nombreRacion.en} of ${nombreP(p, l).toLowerCase()}?`, `Quants terrossos de sucre (4 g cadascun) hi ha en ${p.nombreRacion.ca} de ${nombreP(p, l).toLowerCase()}?`)
    case 'racion': return tx(l, `¿Cuántos gramos de ${n} hay en ${p.nombreRacion.es}?`, `How many grams of ${n} are in ${p.nombreRacion.en}?`, `Quants grams de ${n} hi ha en ${p.nombreRacion.ca}?`)
    case 'semaforo': return tx(l, `Según el semáforo nutricional, ¿este producto es alto, medio o bajo en ${n}?`, `By the traffic-light labelling, is this product high, medium or low in ${n}?`, `Segons el semàfor nutricional, aquest producte és alt, mitjà o baix en ${n}?`)
    default: {
      const [a, b] = ronda.productos.map(producto)
      return tx(l, `¿Qué te aporta más ${n}: ${a.nombreRacion.es} de ${nombreP(a, l).toLowerCase()} o ${b.nombreRacion.es} de ${nombreP(b, l).toLowerCase()}?`, `Which gives you more ${n}: ${a.nombreRacion.en} of ${nombreP(a, l).toLowerCase()} or ${b.nombreRacion.en} of ${nombreP(b, l).toLowerCase()}?`, `Què t’aporta més ${n}: ${a.nombreRacion.ca} de ${nombreP(a, l).toLowerCase()} o ${b.nombreRacion.ca} de ${nombreP(b, l).toLowerCase()}?`)
    }
  }
}

export function textoOpcion(ronda, o, l) {
  if (ronda.tipo === 'semaforo') return NOMBRE_SEMAFORO[o][l] ?? NOMBRE_SEMAFORO[o].es
  if (ronda.tipo === 'terrones') return o === 1 ? tx(l, '1 terrón', '1 cube', '1 terròs') : tx(l, `${o} terrones`, `${o} cubes`, `${o} terrossos`)
  if (ronda.tipo === 'racion') return `${num(o, l)} g`
  return nombreP(producto(o), l)
}

export function explicacion(ronda, l) {
  const n = ronda.nutriente, nn = nN(n, l)
  const ps = ronda.productos.map(producto)
  const p = ps[0]
  switch (ronda.tipo) {
    case 'mas': {
      const lista = ps.map(x => `${nombreP(x, l)}: ${num(x[n], l)} g`).join(' · ')
      return tx(l, `Mira la fila de «${nn}» y compara los números por 100: ${lista}.`, `Look at the «${nn}» row and compare the per-100 figures: ${lista}.`, `Mira la fila de «${nn}» i compara els números per 100: ${lista}.`)
    }
    case 'terrones': {
      const g = enRacion(p, 'azucares')
      return tx(l, `${num(p.azucares, l)} g por 100 ${ud(p)} × ${p.racion} ${ud(p)} / 100 = ${num(g, l)} g de azúcar; ${num(g, l)} / 4 ≈ ${ronda.bueno} terrones.`, `${num(p.azucares, l)} g per 100 ${ud(p)} × ${p.racion} ${ud(p)} / 100 = ${num(g, l)} g of sugar; ${num(g, l)} / 4 ≈ ${ronda.bueno} cubes.`, `${num(p.azucares, l)} g per 100 ${ud(p)} × ${p.racion} ${ud(p)} / 100 = ${num(g, l)} g de sucre; ${num(g, l)} / 4 ≈ ${ronda.bueno} terrossos.`)
    }
    case 'racion':
      return tx(l, `La tabla da ${num(p[n], l)} g por 100 ${ud(p)}, pero la ración es de ${p.racion} ${ud(p)}: ${num(p[n], l)} × ${p.racion} / 100 = ${num(ronda.bueno, l)} g.`, `The table gives ${num(p[n], l)} g per 100 ${ud(p)}, but the serving is ${p.racion} ${ud(p)}: ${num(p[n], l)} × ${p.racion} / 100 = ${num(ronda.bueno, l)} g.`, `La taula dona ${num(p[n], l)} g per 100 ${ud(p)}, però la ració és de ${p.racion} ${ud(p)}: ${num(p[n], l)} × ${p.racion} / 100 = ${num(ronda.bueno, l)} g.`)
    case 'semaforo': {
      const [bajo, alto] = umbralesDe(p, n)
      const beb = p.liquido ? tx(l, ' (en bebidas los umbrales son la mitad)', ' (for drinks the thresholds are halved)', ' (en begudes els llindars són la meitat)') : ''
      return tx(l, `Por 100 ${ud(p)} tiene ${num(p[n], l)} g de ${nn}. Bajo hasta ${num(bajo, l)} g, alto por encima de ${num(alto, l)} g${beb}.`, `Per 100 ${ud(p)} it has ${num(p[n], l)} g of ${nn}. Low up to ${num(bajo, l)} g, high above ${num(alto, l)} g${beb}.`, `Per 100 ${ud(p)} té ${num(p[n], l)} g de ${nn}. Baix fins a ${num(bajo, l)} g, alt per sobre de ${num(alto, l)} g${beb}.`)
    }
    default: {
      const lista = ps.map(x => `${nombreP(x, l)}: ${num(x[n], l)} g/100 × ${x.racion} = ${num(enRacion(x, n), l)} g`).join(' · ')
      return tx(l, `Lo que cuenta es lo que te comes, no los 100 g: ${lista}.`, `What counts is what you actually eat, not 100 g: ${lista}.`, `El que compta és el que et menges, no els 100 g: ${lista}.`)
    }
  }
}

export function schemaQuestion(ronda, l) {
  const ps = ronda.productos.map(producto)
  const n = ronda.nutriente
  const datos = ps.map(p => `${nombreP(p, l)}: ${num(p[n], l)} g ${tx(l, 'de', 'of', 'de')} ${nN(n, l)} / 100 ${ud(p)}, ${tx(l, 'ración', 'serving', 'ració')} ${p.racion} ${ud(p)}`).join('; ')
  return {
    question: `${enunciado(ronda, l)} (${datos})`,
    correctAnswer: textoOpcion(ronda, ronda.bueno, l),
    wrongAnswers: ronda.opciones.filter(o => o !== ronda.bueno).map(o => textoOpcion(ronda, o, l)),
  }
}
