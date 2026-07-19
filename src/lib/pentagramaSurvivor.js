// ── Pentagrama Path: motor del Modo Survivor ─────────────────────────────────
// Partitura infinita en vez de melodías fijas: se generan notas sobre la
// marcha con una ligera preferencia por movimiento por grados conjuntos (como
// una melodía real). La dificultad escala con el número de notas resueltas
// (tempo, ventana de tolerancia, ritmos y alteraciones) mientras que el rango
// de alturas se mantiene siempre dentro de DO4-DO5: el piano virtual solo
// cubre una octava, así que ninguna nota generada puede caer fuera de ella.

const WHITE = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5']
const SHARPS = ['C#4', 'D#4', 'F#4', 'G#4', 'A#4']

export const FAILS_LIMIT = 10
export const LOOKAHEAD_BEATS = 8

// `at` = nº de notas resueltas (aciertos + fallos) a partir del cual aplica.
export const SURVIVOR_STAGES = [
  { nivel: 1, at: 0,  tempoBPM: 76,  ventanaMs: 320, pool: WHITE.slice(0, 5), ritmos: [1], silencios: false },
  { nivel: 2, at: 10, tempoBPM: 82,  ventanaMs: 280, pool: WHITE, ritmos: [1, 1, 0.5], silencios: false },
  { nivel: 3, at: 25, tempoBPM: 90,  ventanaMs: 250, pool: WHITE, ritmos: [1, 0.5, 0.5, 2], silencios: true },
  { nivel: 4, at: 45, tempoBPM: 98,  ventanaMs: 220, pool: [...WHITE, ...SHARPS], ritmos: [1, 0.5, 0.5, 2], silencios: true },
  { nivel: 5, at: 70, tempoBPM: 108, ventanaMs: 190, pool: [...WHITE, ...SHARPS], ritmos: [0.5, 0.5, 1, 2], silencios: true },
]

export function stageFor(n) {
  let s = SURVIVOR_STAGES[0]
  for (const st of SURVIVOR_STAGES) if (n >= st.at) s = st
  return s
}

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

// Devuelve el siguiente evento (nota o silencio) para añadir a la partitura.
export function siguienteEvento(prevPitch, stage) {
  if (stage.silencios && Math.random() < 0.12) {
    return { pitch: null, beats: pick([0.5, 1]) }
  }
  const pool = stage.pool
  let candidatos = pool.filter(p => p !== prevPitch)
  if (prevPitch && Math.random() < 0.55) {
    const idx = pool.indexOf(prevPitch)
    if (idx >= 0) {
      const cercanas = [idx - 2, idx - 1, idx + 1, idx + 2]
        .filter(i => i >= 0 && i < pool.length)
        .map(i => pool[i])
      if (cercanas.length) candidatos = cercanas
    }
  }
  const pitch = pick(candidatos.length ? candidatos : pool)
  const beats = pick(stage.ritmos)
  return { pitch, beats, ventanaMs: stage.ventanaMs }
}
