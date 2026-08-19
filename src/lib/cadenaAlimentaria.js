// Cadena Alimentaria — lógica pura (sin React). La usan el juego
// (src/pages/CadenaAlimentaria.jsx) y el examen (CadenaAlimentariaExamen.jsx).
//
// El reto: dado un organismo (nombre + un dato real sobre cómo se alimenta),
// elegir su rol trófico entre los botones disponibles. A diferencia de
// Encuentra el Elemento (una pista sobre un dato ya fijo, tocar la celda),
// aquí el propio dato del organismo YA da la pista — el jugador tiene que
// RAZONAR el rol a partir de qué come o cómo se alimenta, no memorizar una
// posición.
import { ORGANISMOS, ROLE_ORDER, CADENAS } from '../data/cadenaTrofica'

const ORGANISMOS_POR_ID = Object.fromEntries(ORGANISMOS.map(org => [org.id, org]))

// facil/medio/dificil (dificultad de la UI) → qué organismos entran en el
// pool. Acumulativo, igual que encuentraElemento.js: "dificil" incluye a
// "medio", que incluye a "facil". El consumidor terciario no aparece hasta
// "medio" a propósito — en fácil solo hay 4 roles, más sencillos para
// Primaria.
const NIVEL_ORDEN = ['facil', 'medio', 'dificil']

function poolPara(uiDiff) {
  const idx = Math.max(0, NIVEL_ORDEN.indexOf(uiDiff))
  return ORGANISMOS.filter(o => NIVEL_ORDEN.indexOf(o.dificultad) <= idx)
}

// Qué roles pueden salir de premio en una dificultad dada — se deriva del
// pool real en vez de escribirse a mano, así nunca se desincroniza si se
// añade o se quita algún organismo.
export function rolesDisponibles(uiDiff) {
  const enPool = new Set(poolPara(uiDiff).map(o => o.rol))
  return ROLE_ORDER.filter(r => enPool.has(r))
}

// Ronda con reposición (mismo patrón que Balanza/Circuito Cerrado/Encuentra
// el Elemento): cada llamada es un sorteo independiente, válido tanto para
// el arcade contrarreloj como para el examen de 10 preguntas.
export function genRound(uiDiff, rand = Math.random) {
  const pool = poolPara(uiDiff)
  const organismo = pool[Math.floor(rand() * pool.length)]
  // uiDiff viaja con la ronda porque MechanicExam no pasa la dificultad a
  // renderQuestion — así el examen puede saber qué roles ofrecer sin
  // necesitar una prop extra que la mecánica compartida no da.
  return { organismo, uiDiff }
}

export function isCorrect(round, rolGuess) {
  return rolGuess === round.organismo.rol
}

// ── Modo "construye la cadena" (juego arcade) ───────────────────────────────
// A diferencia de isCorrect/genRound de arriba (clasificar UN organismo
// suelto, lo que usa el examen), aquí se reconstruye la cadena ENTERA en
// orden: se sortea una cadena real, se baraja y hay que ir tocando el
// siguiente eslabón correcto. facil = solo cadenas de 3 eslabones; medio =
// añade las de 4 (con consumidor terciario); dificil reutiliza el pool de
// medio pero pide construirla AL REVÉS (de la cima al productor).
const NIVEL_ORDEN_CADENA = ['facil', 'medio', 'dificil']

function poolCadenas(uiDiff) {
  // 'dificil' no añade cadenas nuevas: reutiliza las de 'medio' (todas),
  // el reto extra sale de invertir el orden, no de más contenido.
  const idx = Math.min(NIVEL_ORDEN_CADENA.indexOf(uiDiff), 1)
  return CADENAS.filter(c => NIVEL_ORDEN_CADENA.indexOf(c.dificultad) <= Math.max(0, idx))
}

// Ronda de "construye la cadena": sortea una cadena, la baraja, y devuelve
// tanto el orden correcto (`secuencia`, ya orientado según `invertido`) como
// las fichas a mostrar (`fichas`, barajadas). El jugador debe tocarlas en el
// mismo orden que `secuencia`.
export function genCadena(uiDiff, rand = Math.random) {
  const pool = poolCadenas(uiDiff)
  const cadena = pool[Math.floor(rand() * pool.length)]
  const invertido = uiDiff === 'dificil'
  const orden = invertido ? [...cadena.eslabones].reverse() : cadena.eslabones
  const secuencia = orden.map(id => ORGANISMOS_POR_ID[id])
  const fichas = [...secuencia].sort(() => rand() - 0.5)
  return { cadena, invertido, secuencia, fichas }
}

// ¿La ficha tocada es el siguiente eslabón correcto, dado lo ya colocado?
export function isNextEslabon(round, placedIds, fichaId) {
  return round.secuencia[placedIds.length]?.id === fichaId
}
