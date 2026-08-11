// Lógica compartida del tablero de NumPath: generación del tablero y catálogo
// de operaciones. La usan tanto el juego completo (src/pages/NumPath.jsx, con
// Math.random) como el widget del reto diario (components/NumPathBoard.jsx),
// que le pasa un generador determinista (makeRng(dia) de fuerzaNeta.js) para
// que todo el mundo reciba el mismo tablero ese día — mismo patrón que
// fuerzaNeta.js/balanza.js con sus genRound().
export const OP_POOL = {
  '+': [
    { label: '+1', fn: s => s + 1 }, { label: '+2', fn: s => s + 2 },
    { label: '+3', fn: s => s + 3 }, { label: '+5', fn: s => s + 5 },
    { label: '+7', fn: s => s + 7 }, { label: '+10', fn: s => s + 10 },
  ],
  '-': [
    { label: '-1', fn: s => s - 1 }, { label: '-2', fn: s => s - 2 },
    { label: '-3', fn: s => s - 3 }, { label: '-5', fn: s => s - 5 },
  ],
  '×': [
    { label: '×2', fn: s => s * 2 }, { label: '×3', fn: s => s * 3 },
  ],
  '÷': [
    { label: '÷2', fn: s => Math.floor(s / 2) }, { label: '÷3', fn: s => Math.floor(s / 3) },
  ],
}

function buildOps(allowedTypes) {
  const pool = []
  for (const t of allowedTypes) pool.push(...(OP_POOL[t] || []))
  return pool
}

// `rand` es la fuente de aleatoriedad (Math.random por defecto, o una
// determinista tipo makeRng(seed)) — misma forma que fuerzaNeta.js/balanza.js.
export function generateBoard(size, allowedOps, startScore, goalsCount = 3, rand = Math.random) {
  const ops = buildOps(allowedOps)
  const pick = arr => arr[Math.floor(rand() * arr.length)]
  const rng = (min, max) => min + Math.floor(rand() * (max - min + 1))

  const grid = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => {
      const op = pick(ops)
      return { op, label: op.label, used: false }
    })
  )
  grid[0][0] = { op: null, label: '', used: true, isStart: true }

  const goals = []
  while (goals.length < goalsCount) {
    const r = rng(1, size - 1), c = rng(0, size - 1)
    if (goals.some(g => g.r === r && g.c === c)) continue
    goals.push({ r, c })
  }

  // Para cada meta, simula un camino desde (0,0) para calcular una
  // puntuación objetivo que sea alcanzable de verdad.
  goals.forEach(g => {
    let score = startScore
    let cr = 0, cc = 0
    const steps = []
    while (cr !== g.r || cc !== g.c) {
      if (cr < g.r && (cc >= g.c || rand() > 0.5)) { cr++; steps.push([cr, cc]) }
      else if (cc < g.c) { cc++; steps.push([cr, cc]) }
      else if (cr > g.r) { cr--; steps.push([cr, cc]) }
      else break
    }
    for (const [sr, sc] of steps) {
      const cell = grid[sr][sc]
      if (cell.op && !cell.isGoal) score = cell.op.fn(score)
    }
    grid[g.r][g.c] = { op: null, label: '', used: false, isGoal: true, target: score }
  })

  return grid
}

// Ronda de un solo tablero y una sola meta para el reto diario — tamaño y
// operaciones fijas en dificultad "medio", igual que el resto de retos
// diarios generan una única ronda determinista con makeRng(dia).
export function genRound(rand = Math.random) {
  const size = 5
  return { size, grid: generateBoard(size, ['+', '-', '×'], 0, 1, rand) }
}
