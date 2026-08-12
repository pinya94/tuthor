// Lógica del juego Órbita (src/pages/Orbita.jsx) — arrastrar una sonda a lo
// largo de una barra que representa la distancia al Sol y lanzarla donde se
// crea que está el planeta pedido. Sin reloj ni reflejos: el jugador mueve
// el slider a su ritmo (igual que sliderToEraYear en epocasHistoricas.js) y
// confirma cuando esté seguro — el reto es SABER dónde está el planeta, no
// ser rápido de dedos. Las posiciones de los planetas no se muestran hasta
// después de lanzar (las pinta Orbita.jsx solo en fase 'resultado').
//
// Escalado: la posición de cada planeta en la barra (0-100) es la raíz
// cúbica de su distancia real en UA, normalizada a Neptuno. No es un mapa a
// escala real (si lo fuera, los 4 planetas rocosos quedarían apretados en
// el primer 3% de la barra) — es el mismo espíritu no-proporcional que
// ERA_RANGOS en epocasHistoricas.js: el ORDEN y las proporciones relativas
// son reales, la escala visual está comprimida para que se pueda jugar. La
// raíz cúbica (en vez de cuadrada) da más margen a los 4 planetas rocosos,
// que son los que de verdad cuesta distinguir, a costa de apretar un poco
// más a los gigantes gaseosos exteriores.
//
// Las zonas se reparten con una partición de Voronoi 1D: la frontera entre
// dos planetas consecutivos es el punto medio entre sus centros, así que
// cualquier posición de la barra cae en la zona de exactamente un planeta.
import { PLANETAS } from '../data/planetas'

const MAX_UA = PLANETAS[PLANETAS.length - 1].distanciaUA // Neptuno

// Rango [4, 96] en vez de [0, 100]: dejar margen a los dos lados para que el
// emoji de Mercurio y el de Neptuno no queden recortados por el borde de la
// barra (overflow-hidden), sin afectar al orden ni a las zonas relativas.
function scale(ua) {
  return 4 + Math.cbrt(ua / MAX_UA) * 92
}

// Centro (0-100) de cada planeta, en el mismo orden que PLANETAS.
export const CENTROS = PLANETAS.map(p => scale(p.distanciaUA))

// Fronteras entre planetas consecutivos (longitud = PLANETAS.length - 1).
export const FRONTERAS = CENTROS.slice(0, -1).map((c, i) => (c + CENTROS[i + 1]) / 2)

// Índice del planeta cuya zona contiene la posición `pos` (0-100).
export function indiceZona(pos) {
  let i = 0
  while (i < FRONTERAS.length && pos > FRONTERAS[i]) i++
  return i
}

// Semiancho "útil" de la zona de un planeta (hasta la frontera más cercana),
// usado como referencia de precisión para distinguir 'perfecto' de 'orbita'.
function semianchoUtil(idx) {
  const centro = CENTROS[idx]
  const izq = idx > 0 ? centro - FRONTERAS[idx - 1] : centro
  const der = idx < CENTROS.length - 1 ? FRONTERAS[idx] - centro : 100 - centro
  return Math.min(izq, der)
}

// Resultado de un lanzamiento a la posición `pos` (0-100) cuando el objetivo
// es el planeta de índice `objetivoIdx`.
//   'perfecto' → dentro del 45% central de su zona
//   'orbita'   → dentro de su zona, pero no centrado
//   'fallo'    → la posición cayó en la zona de otro planeta
export function evaluarLanzamiento(pos, objetivoIdx) {
  if (indiceZona(pos) !== objetivoIdx) return 'fallo'
  const dist = Math.abs(pos - CENTROS[objetivoIdx])
  return dist <= semianchoUtil(objetivoIdx) * 0.45 ? 'perfecto' : 'orbita'
}

// Baraja los 8 planetas sin repetición (Fisher-Yates), mismo patrón que
// Diagnostico.jsx y epocasHistoricas.js.
export function nuevoMazo() {
  const a = [...PLANETAS]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── Examen (OrbitaExamen.jsx, con MechanicExam) ─────────────────────────────
// Acierto/fallo simple (a diferencia del juego, que da puntos por tiers). El
// margen que cuenta como acierto se endurece por nivel reutilizando la misma
// zona/semiancho de evaluarLanzamiento(): en primaria basta con acertar la
// zona del planeta (margen 1 = todo el semiancho útil), en bachillerato hace
// falta la misma precisión que una "órbita perfecta" (margen 0.45, igual que
// arriba). 10 preguntas con reposición: solo hay 8 planetas.
const MARGEN_NIVEL = { facil: 1, medio: 0.6, dificil: 0.45 }

export function genRound(difficulty = 'medio') {
  const idx = Math.floor(Math.random() * PLANETAS.length)
  return { planeta: PLANETAS[idx], idx, margen: MARGEN_NIVEL[difficulty] ?? 0.6 }
}

export function isCorrectGuess(round, pos) {
  if (indiceZona(pos) !== round.idx) return false
  const dist = Math.abs(pos - CENTROS[round.idx])
  return dist <= semianchoUtil(round.idx) * round.margen
}
