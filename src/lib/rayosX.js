// Lógica del juego Rayos X (src/pages/RayosX.jsx) — tocar la silueta del
// cuerpo donde se crea que está el órgano pedido. Mismo espíritu sin reloj
// que orbita.js/coordenadas.js: el reto es SABER dónde está, no ser rápido.
// Las posiciones no se muestran hasta después de confirmar (las pinta
// SiluetaCuerpo.jsx solo cuando `revelado` está activo).
//
// A diferencia de Órbita (1 eje, zonas con fronteras explícitas) esto es un
// clic en 2D: en vez de precalcular fronteras entre 7 puntos, la zona de
// cada órgano es simplemente "más cerca de él que de cualquier otro" —
// vecino más próximo, el mismo resultado que un Voronoi 2D sin tener que
// dibujarlo.
import { ORGANOS, getOrgano } from '../data/organos'

function dist(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2)
}

// Órgano cuyo punto está más cerca de `pos` ({x,y} en coordenadas de
// SiluetaCuerpo.jsx, viewBox 0-147.998 / 0-318.455).
export function organoMasCercano(pos) {
  let mejor = ORGANOS[0], mejorD = Infinity
  for (const o of ORGANOS) {
    const d = dist(pos.x, pos.y, o.x, o.y)
    if (d < mejorD) { mejorD = d; mejor = o }
  }
  return mejor
}

// Radio "perfecto" del juego: bastante más ajustado que la distancia típica
// entre órganos vecinos (~19-36 unidades en este viewBox), así que solo
// premia con el máximo un clic realmente preciso, no solo acertar la zona.
const RADIO_PERFECTO = 11

// Resultado de un clic en `pos` cuando el objetivo es el órgano `objetivoId`.
//   'perfecto' → a menos de RADIO_PERFECTO de su centro real
//   'organo'   → el órgano más cercano al clic es el correcto, pero no centrado
//   'fallo'    → el clic quedó más cerca de otro órgano
export function evaluarClick(pos, objetivoId) {
  const cercano = organoMasCercano(pos)
  if (cercano.id !== objetivoId) return 'fallo'
  const objetivo = getOrgano(objetivoId)
  return dist(pos.x, pos.y, objetivo.x, objetivo.y) <= RADIO_PERFECTO ? 'perfecto' : 'organo'
}

// Baraja los 7 órganos sin repetición (Fisher-Yates), mismo patrón que
// nuevoMazo() en orbita.js/coordenadas.js.
export function nuevoMazo() {
  const a = [...ORGANOS]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── Examen (RayosXExamen.jsx, con MechanicExam) ─────────────────────────────
// Acierto/fallo simple: ¿el órgano más cercano al clic es el pedido, sí o
// no? Los órganos están en un sitio fijo — igual que en Órbita, no hay un
// eje real de dificultad que ofrecer, así que no hay niveles (MechanicExam
// recibe un único nivel). 10 preguntas con reposición: solo hay 7 órganos.
export function genRound() {
  const idx = Math.floor(Math.random() * ORGANOS.length)
  return { organo: ORGANOS[idx] }
}

export function isCorrectGuess(round, pos) {
  return organoMasCercano(pos).id === round.organo.id
}
