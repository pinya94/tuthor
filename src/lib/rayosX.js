// Rayos X — lógica del juego y del examen.
//
// Una ronda pide una parte del cuerpo (data/organos.js). Si es un hueso se
// enseña la capa del esqueleto; si no, la de los órganos
// (components/rayosX/CuerpoSVG.jsx). El jugador toca la forma: acierta si es
// esa parte. Sin distancias ni tolerancias — la forma tocada es la respuesta.
//
// Niveles (una sola mecánica; cambia qué partes salen y cómo se pregunta):
//   facil   → las partes más conocidas, por su nombre
//   medio   → todas, por su nombre
//   dificil → todas, por lo que hacen (la función), como en un examen
import { ORGANOS } from '../data/organos'

export const BASICAS = ['cerebro', 'ojos', 'boca', 'pulmones', 'corazon', 'estomago', 'higado', 'intestinos', 'craneo', 'costillas', 'columna', 'femur', 'pelvis']

export const NIVELES = {
  facil:   { partes: ORGANOS.filter(o => BASICAS.includes(o.id)), preguntaPor: 'nombre' },
  medio:   { partes: ORGANOS, preguntaPor: 'nombre' },
  dificil: { partes: ORGANOS, preguntaPor: 'funcion' },
}

export const capaDe = parte => (parte.sistema === 'oseo' ? 'huesos' : 'organos')

// `evitar`: ids vistos hace poco, para no repetir la misma parte seguida.
export function genRonda(nivel = 'facil', { evitar = [], rand = Math.random } = {}) {
  const cfg = NIVELES[nivel] ?? NIVELES.facil
  const frescas = cfg.partes.filter(p => !evitar.includes(p.id))
  const pool = frescas.length ? frescas : cfg.partes
  const parte = pool[Math.floor(rand() * pool.length)]
  return { parte, capa: capaDe(parte), preguntaPor: cfg.preguntaPor }
}

export const esCorrecta = (ronda, id) => ronda.parte.id === id

// El texto de la pregunta: el nombre, o la función en el nivel difícil.
export function enunciado(ronda, l) {
  const campo = ronda.preguntaPor === 'funcion' ? ronda.parte.funcion : ronda.parte.nombre
  return campo[l] ?? campo.es
}

// ── Examen (RayosXExamen.jsx, con MechanicExam) ─────────────────────────────
// Mismos niveles que el juego; MechanicExam llama genRound(difficulty).
export const genRound = difficulty => genRonda(difficulty)
export const isCorrect = (ronda, id) => esCorrecta(ronda, id)
