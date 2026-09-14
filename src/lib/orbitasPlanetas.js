// ── Sistema solar: dónde está cada planeta en una fecha ─────────────────────
//
// Lógica pura del recurso /recursos/sistema-solar. Con los elementos orbitales
// de data/planetasOrbitas.js y la ecuación de Kepler, calcula la posición 3D de
// cada planeta alrededor del Sol en cualquier fecha, y la proyecta en pantalla
// según desde dónde se mire.
//
// Por qué posiciones reales y no planetas girando a velocidades bonitas: con
// ellas el recurso responde preguntas de verdad ("¿se puede ver Marte este
// mes?", "¿por qué hay años con Marte muy grande?") y se comprueba contra el
// cielo, cosa que un test hace.

import { ORBITAS, FISICOS } from '../data/planetasOrbitas'
import { PLANETAS } from '../data/planetas'

export const IDS = PLANETAS.map(p => p.id)
export const KM_POR_UA = 149597870.7

const RAD = Math.PI / 180

// Día juliano de una fecha. J2000 (1 de enero de 2000, 12:00 TT) = 2451545.
export const diaJuliano = fecha => fecha.getTime() / 86400000 + 2440587.5

const normaliza = g => ((((g + 180) % 360) + 360) % 360) - 180

// Anomalía excéntrica E a partir de la media M (radianes), por Newton:
// E − e·sen E = M. Converge en 3-4 iteraciones con las excentricidades de
// los planetas (la mayor, Mercurio, es 0,21).
export function resolverKepler(M, e) {
  let E = M + e * Math.sin(M)
  for (let i = 0; i < 20; i++) {
    const dE = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E))
    E -= dE
    if (Math.abs(dE) < 1e-12) break
  }
  return E
}

// Posición heliocéntrica en UA, ejes de la eclíptica J2000: x hacia el punto
// Aries, z hacia el polo norte de la eclíptica.
export function posicion(id, fecha) {
  const o = ORBITAS[id]
  const T = (diaJuliano(fecha) - 2451545) / 36525
  const L = o.L + o.Lr * T
  const w = o.w - o.O           // argumento del perihelio
  const M = normaliza(L - o.w) * RAD
  const E = resolverKepler(M, o.e)

  const xp = o.a * (Math.cos(E) - o.e)
  const yp = o.a * Math.sqrt(1 - o.e * o.e) * Math.sin(E)

  const cw = Math.cos(w * RAD), sw = Math.sin(w * RAD)
  const cO = Math.cos(o.O * RAD), sO = Math.sin(o.O * RAD)
  const cI = Math.cos(o.I * RAD), sI = Math.sin(o.I * RAD)
  return {
    x: (cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp,
    y: (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp,
    z: sw * sI * xp + cw * sI * yp,
  }
}

export const distanciaAlSol = p => Math.hypot(p.x, p.y, p.z)
export const longitud = p => (Math.atan2(p.y, p.x) / RAD + 360) % 360

// Distancia entre dos planetas (UA): p. ej. de la Tierra a Marte.
export const distanciaEntre = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)

// Puntos de la órbita completa, para dibujarla: se recorre la anomalía
// excéntrica, no el tiempo, para que el trazo tenga la misma densidad en toda
// la elipse.
export function puntosOrbita(id, n = 160) {
  const o = ORBITAS[id]
  const w = (o.w - o.O) * RAD
  const cw = Math.cos(w), sw = Math.sin(w)
  const cO = Math.cos(o.O * RAD), sO = Math.sin(o.O * RAD)
  const cI = Math.cos(o.I * RAD), sI = Math.sin(o.I * RAD)
  return Array.from({ length: n + 1 }, (_, k) => {
    const E = (2 * Math.PI * k) / n
    const xp = o.a * (Math.cos(E) - o.e)
    const yp = o.a * Math.sqrt(1 - o.e * o.e) * Math.sin(E)
    return {
      x: (cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp,
      y: (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp,
      z: sw * sI * xp + cw * sI * yp,
    }
  })
}

// ── Escalas ─────────────────────────────────────────────────────────────────
//
// A escala real no se puede enseñar todo a la vez: si Neptuno cabe en pantalla,
// Mercurio, Venus, la Tierra y Marte quedan amontonados en un punto junto al
// Sol. Por eso por defecto las distancias se COMPRIMEN (raíz cuadrada), y un
// interruptor enseña la escala real, que es en sí misma una lección.

const A_MAX = ORBITAS.neptuno.a

export function factorDistancia(id, modo) {
  const a = ORBITAS[id].a
  return modo === 'real' ? 1 / A_MAX : Math.sqrt(a / A_MAX) / a
}

// Radio en pantalla de cada planeta, en unidades de la escena (1 = órbita de
// Neptuno). Exagerados por defecto para que se vean; a escala entre ellos si
// se pide, con Júpiter como referencia.
export function radioPlaneta(id, modo) {
  const d = FISICOS[id].diametro
  return modo === 'real' ? Math.max(0.0012, 0.04 * (d / FISICOS.jupiter.diametro)) : 0.012 + 0.026 * Math.sqrt(d / FISICOS.jupiter.diametro)
}

// ── Cámara ──────────────────────────────────────────────────────────────────
//
// `az` gira alrededor del Sol (0-360°) y `el` es la altura desde la que se
// mira: 90° = desde arriba (el plano de las órbitas de frente), 0° = de canto.
// Devuelve coordenadas de pantalla normalizadas (−1…1 aprox.), la escala de
// perspectiva y la profundidad, para dibujar primero lo que está más lejos.
export function proyectar(p, { az, el, distancia = 3.2 }) {
  const ca = Math.cos(az * RAD), sa = Math.sin(az * RAD)
  const x1 = p.x * ca - p.y * sa
  const y1 = p.x * sa + p.y * ca
  const ce = Math.cos(el * RAD), se = Math.sin(el * RAD)
  const profundidad = -y1 * ce + p.z * se
  const escala = distancia / (distancia - profundidad)
  return { sx: x1 * escala, sy: (y1 * se + p.z * ce) * escala, escala, profundidad }
}

export { ORBITAS, FISICOS }
