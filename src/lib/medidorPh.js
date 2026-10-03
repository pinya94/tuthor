// Medidor de pH (química · ácidos y bases): una sustancia cotidiana y hay que
// situarla en la tira de pH (0-14). Una sola mecánica; la dificultad cambia la
// ayuda y lo que cuenta como acierto:
//   facil   → tira con los colores; basta con acertar ácido / neutro / básico
//   medio   → tira con los colores; hay que acercarse a su pH (±1,5)
//   dificil → tira SIN colores hasta corregir; más precisión (±1)
// En medio y difícil, quedarse a menos de 0,5 es «exacto» y da más puntos.
import { SUSTANCIAS } from '../data/sustanciasPh'

export const NIVELES = {
  facil:   { colores: true,  margen: null, porCategoria: true },
  medio:   { colores: true,  margen: 1.5, porCategoria: false },
  dificil: { colores: false, margen: 1.0, porCategoria: false },
}
export const EXACTO = 0.5

// Colores del indicador universal, uno por unidad de pH (0…14).
export const COLORES_PH = ['#e11d48', '#ef4444', '#f97316', '#fb923c', '#f59e0b', '#facc15', '#a3e635', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', '#4f46e5', '#7c3aed', '#9333ea', '#6b21a8']
export const colorPh = ph => COLORES_PH[Math.max(0, Math.min(14, Math.round(ph)))]

// Neutro: la franja de 6,5 a 7,5 que el indicador pinta de verde (leche,
// saliva, agua, sangre). Por fuera, ácido o básico.
export function categoria(ph) {
  if (ph < 6.5) return 'acido'
  if (ph <= 7.5) return 'neutro'
  return 'basico'
}

// Resultado de colocar la marca en `valor`: 'exacto' | 'bien' | 'fallo'.
export function evaluar(sustancia, valor, nivel = 'medio') {
  const cfg = NIVELES[nivel] ?? NIVELES.medio
  if (cfg.porCategoria) return categoria(valor) === categoria(sustancia.ph) ? 'bien' : 'fallo'
  const d = Math.abs(valor - sustancia.ph)
  if (d <= EXACTO) return 'exacto'
  return d <= cfg.margen ? 'bien' : 'fallo'
}

// En fácil solo se pregunta la zona, y la leche (6,6) o la sangre (7,4) caen en
// el borde: un libro dice «casi neutra» y otro «ligeramente básica». Fuera de
// ese nivel; el agua pura se queda como el neutro indiscutible.
const DUDOSA = s => s.ph !== 7 && Math.abs(s.ph - 7) < 1
export const sustanciasDe = nivel => (NIVELES[nivel]?.porCategoria ? SUSTANCIAS.filter(s => !DUDOSA(s)) : SUSTANCIAS)

export function genRonda(nivel = 'facil', { evitar = [], rand = Math.random } = {}) {
  const todas = sustanciasDe(nivel)
  const frescas = todas.filter(s => !evitar.includes(s.id))
  const pool = frescas.length ? frescas : todas
  return { sustancia: pool[Math.floor(rand() * pool.length)], nivel }
}

// Examen (MechanicExam): acierto si no es fallo.
export const genRound = difficulty => genRonda(difficulty)
export const isCorrect = (ronda, valor) => valor != null && evaluar(ronda.sustancia, valor, ronda.nivel) !== 'fallo'
