// Lógica del juego Rayos X (src/pages/RayosX.jsx) — tocar la silueta del
// cuerpo donde se crea que está el órgano pedido. Mismo espíritu sin reloj
// que orbita.js/coordenadas.js: el reto es SABER dónde está, no ser rápido.
// Las posiciones no se muestran hasta después de confirmar (las pinta
// SiluetaCuerpo.jsx solo cuando `revelado` está activo).
//
// A diferencia de Órbita (1 eje, un único margen para los 8 planetas) cada
// órgano tiene su PROPIO radio de tolerancia (ver organos.js): un clic
// cuenta si cae dentro del radio del órgano que toca esa ronda, sin
// comparar contra los demás. Un órgano pequeño y delimitado como el corazón
// pide más precisión que uno grande y repartido como los intestinos, y como
// cada pregunta solo mira el radio del órgano preguntado, da igual que dos
// radios se solapen — no hace falta que las zonas sean excluyentes.
//
// Los huesos largos (`segmento` en organos.js) no tienen un punto único: la
// distancia se mide al SEGMENTO más cercano (proyección sobre la línea,
// recortada a los extremos), no al punto medio — si no, un clic en un
// extremo del fémur contaría como lejos aunque esté claramente sobre el
// hueso.
import { ORGANOS } from '../data/organos'

function dist(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2)
}

// Distancia de `pos` al segmento (x1,y1)-(x2,y2): proyecta pos sobre la
// recta y recorta el parámetro a [0,1] para quedarse dentro del segmento.
function distSegmento(pos, { x1, y1, x2, y2 }) {
  const dx = x2 - x1, dy = y2 - y1
  const largo2 = dx * dx + dy * dy
  if (largo2 === 0) return dist(pos.x, pos.y, x1, y1)
  let t = ((pos.x - x1) * dx + (pos.y - y1) * dy) / largo2
  t = Math.max(0, Math.min(1, t))
  return dist(pos.x, pos.y, x1 + t * dx, y1 + t * dy)
}

// Distancia de `pos` a un órgano, ya sea de punto (x,y) o de segmento
// (huesos largos, ver arriba).
function distOrgano(pos, organo) {
  return organo.segmento ? distSegmento(pos, organo.segmento) : dist(pos.x, pos.y, organo.x, organo.y)
}

// Resultado de un clic en `pos` ({x,y} en coordenadas de SiluetaCuerpo.jsx)
// cuando el objetivo es el órgano `objetivo`.
//   'perfecto' → a menos de la mitad del radio del órgano (clic centrado)
//   'organo'   → dentro del radio del órgano, pero no centrado
//   'fallo'    → fuera del radio del órgano
export function evaluarClick(pos, objetivo) {
  const d = distOrgano(pos, objetivo)
  if (d > objetivo.radio) return 'fallo'
  return d <= objetivo.radio * 0.5 ? 'perfecto' : 'organo'
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
// Acierto/fallo simple: ¿el clic cae dentro del radio del órgano pedido, sí
// o no? Los órganos están en un sitio fijo — igual que en Órbita, no hay un
// eje real de dificultad que ofrecer, así que no hay niveles (MechanicExam
// recibe un único nivel). 10 preguntas con reposición.
export function genRound() {
  const idx = Math.floor(Math.random() * ORGANOS.length)
  return { organo: ORGANOS[idx] }
}

export function isCorrectGuess(round, pos) {
  return distOrgano(pos, round.organo) <= round.organo.radio
}
