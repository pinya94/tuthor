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
//
// Los del sistema óseo/articular (`bilateral: true`) solo están descritos
// del lado derecho, pero el brazo/pierna IZQUIERDO tiene los mismos huesos
// — un clic en el codo izquierdo es tan correcto como en el derecho. Se
// mide la distancia al lado guardado Y a su reflejo especular
// (mirrorOrgano, x → VB_W-x) y se toma la menor, en vez de duplicar cada
// hueso a los dos lados.
import { ORGANOS, VB_W } from '../data/organos'

function dist(x1, y1, x2, y2) {
  return Math.hypot(x1 - x2, y1 - y2)
}

// Reflejo especular de un órgano (mismo radio/color/nombre/etc., posición y
// segmento invertidos en x). Se usa para los `bilateral: true` — ver arriba
// — y también SiluetaCuerpo.jsx la reutiliza para DIBUJAR el lado
// izquierdo, no solo para puntuar.
export function mirrorOrgano(organo) {
  return {
    ...organo,
    x: VB_W - organo.x,
    segmento: organo.segmento && {
      x1: VB_W - organo.segmento.x1, y1: organo.segmento.y1,
      x2: VB_W - organo.segmento.x2, y2: organo.segmento.y2,
    },
  }
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

// Distancia de `pos` a un órgano (punto o segmento, ver arriba). Para los
// `bilateral: true` se compara también contra el reflejo del otro lado y se
// toma la menor — cualquiera de los dos lados cuenta como acierto.
function distOrgano(pos, organo) {
  const d = organo.segmento ? distSegmento(pos, organo.segmento) : dist(pos.x, pos.y, organo.x, organo.y)
  if (!organo.bilateral) return d
  const m = mirrorOrgano(organo)
  const dm = m.segmento ? distSegmento(pos, m.segmento) : dist(pos.x, pos.y, m.x, m.y)
  return Math.min(d, dm)
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
