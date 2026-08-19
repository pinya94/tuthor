// Cadena Alimentaria — lógica pura (sin React). La usan el juego
// (src/pages/CadenaAlimentaria.jsx) y el examen (CadenaAlimentariaExamen.jsx).
//
// El reto: dado un organismo (nombre + un dato real sobre cómo se alimenta),
// elegir su rol trófico entre los botones disponibles. A diferencia de
// Encuentra el Elemento (una pista sobre un dato ya fijo, tocar la celda),
// aquí el propio dato del organismo YA da la pista — el jugador tiene que
// RAZONAR el rol a partir de qué come o cómo se alimenta, no memorizar una
// posición.
import { ORGANISMOS, ROLE_ORDER } from '../data/cadenaTrofica'

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
