// ── Reacción: motor de ritmo del modo arcade ─────────────────────────────────
// Mismo patrón que el Survivor de Pentagrama Path (src/lib/pentagramaSurvivor.js):
// el tiempo para decidir baja a medida que resuelves casos, hasta un suelo.
// Los casos "ambiguos" (proporcionalidad, sin opción peligrosa) solo se
// mezclan a partir de cierto punto, para no confundir al principio.

export const FAILS_LIMIT = 5
const AMBIGUOS_DESDE = 6

// `at` = nº de casos resueltos (aciertos + fallos) a partir del cual aplica.
const TIEMPO_STAGES = [
  { at: 0,  ms: 7000 },
  { at: 5,  ms: 6000 },
  { at: 10, ms: 5000 },
  { at: 18, ms: 4000 },
  { at: 28, ms: 3200 },
  { at: 40, ms: 2500 },
]

export function tiempoPara(n) {
  let s = TIEMPO_STAGES[0]
  for (const st of TIEMPO_STAGES) if (n >= st.at) s = st
  return s.ms
}

// Elige el siguiente caso: nunca repite el anterior, y solo mezcla los
// "ambiguos" a partir de AMBIGUOS_DESDE casos resueltos.
export function elegirSiguienteCaso(casos, resueltos, ultimoId) {
  const sinRepetir = casos.filter(c => c.id !== ultimoId)
  const base = resueltos >= AMBIGUOS_DESDE ? sinRepetir : sinRepetir.filter(c => !c.ambiguo)
  const pool = base.length ? base : sinRepetir
  return pool[Math.floor(Math.random() * pool.length)]
}

// Puntos por caso resuelto a tiempo: base + bono por rapidez, con
// multiplicador de racha (+50% cada 5 aciertos seguidos, hasta x2).
export function puntosPorCaso(msRestante, msTotal, racha) {
  const bonoRapidez = Math.round((Math.max(0, msRestante) / msTotal) * 50)
  const mult = 1 + Math.min(2, Math.floor(racha / 5)) * 0.5
  return Math.round((100 + bonoRapidez) * mult)
}
