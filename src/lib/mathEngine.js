// ── Motor de "Acércate al número": combinar números con operaciones hasta llegar al objetivo ──

export const MODOS = {
  sumas:                          { id: 'sumas',                         titulo: 'Sumas',                      emoji: '➕', gradient: 'from-emerald-500 to-teal-600', ops: ['+'] },
  restas:                         { id: 'restas',                        titulo: 'Restas',                     emoji: '➖', gradient: 'from-blue-500 to-indigo-600', ops: ['-'] },
  'sumas-restas':                 { id: 'sumas-restas',                  titulo: 'Sumas y restas',             emoji: '🔀', gradient: 'from-cyan-500 to-blue-600', ops: ['+', '-'] },
  multiplicaciones:                { id: 'multiplicaciones',              titulo: 'Multiplicaciones',           emoji: '✖️', gradient: 'from-amber-500 to-orange-600', ops: ['×'] },
  divisiones:                     { id: 'divisiones',                    titulo: 'Divisiones',                 emoji: '➗', gradient: 'from-rose-500 to-pink-600', ops: ['÷'] },
  'multiplicaciones-divisiones':  { id: 'multiplicaciones-divisiones',   titulo: 'Multiplicación y división',  emoji: '🧩', gradient: 'from-fuchsia-500 to-purple-600', ops: ['×', '÷'] },
  combinado:                      { id: 'combinado',                     titulo: 'Sumas, restas, × y ÷',       emoji: '🧮', gradient: 'from-violet-600 to-purple-800', ops: ['+', '-', '×', '÷'] },
}

export const MODO_IDS = Object.keys(MODOS)

export const GRADOS = {
  primaria:     { id: 'primaria',     label: 'Primaria',     emoji: '🎒', objMin: 5,  objMax: 30,  count: 5, tiempo: 90, numMax: 10 },
  eso:          { id: 'eso',          label: 'ESO',          emoji: '📖', objMin: 10, objMax: 99,  count: 5, tiempo: 75, numMax: 12 },
  bachillerato: { id: 'bachillerato', label: 'Bachillerato', emoji: '🎓', objMin: 20, objMax: 300, count: 4, tiempo: 60, numMax: 20 },
}

export const GRADO_IDS = Object.keys(GRADOS)

export const OP_STYLE = {
  '+': { label: '+', activeClass: 'bg-emerald-600 border-emerald-400 text-white' },
  '-': { label: '−', activeClass: 'bg-blue-600 border-blue-400 text-white' },
  '×': { label: '×', activeClass: 'bg-amber-500 border-amber-300 text-black' },
  '÷': { label: '÷', activeClass: 'bg-rose-600 border-rose-400 text-white' },
}

export function rng(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function aplicar(a, op, b) {
  if (op === '+') return a + b
  if (op === '-') return a - b
  if (op === '×') return a * b
  if (op === '÷') return (b !== 0 && Number.isInteger(a / b)) ? a / b : null
  return null
}

// ── Solver: calcula todos los valores alcanzables con esos números, respetando las operaciones permitidas ──
const _solverCache = new Map()
const MAX_REACHABLE_DEPTH = 6
export function getAllReachable(nums, ops, _depth = 0) {
  if (_depth > MAX_REACHABLE_DEPTH) return new Set(nums.filter(n => n > 0))

  const key = ops.join('') + '|' + [...nums].sort((a, b) => a - b).join(',')
  if (_solverCache.has(key)) return _solverCache.get(key)

  const results = new Set(nums.filter(n => n > 0))
  if (nums.length <= 1) { _solverCache.set(key, results); return results }

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const a = nums[i], b = nums[j]
      const rest = nums.filter((_, k) => k !== i && k !== j)
      const candidatos = []
      if (ops.includes('+')) candidatos.push(a + b)
      if (ops.includes('×')) candidatos.push(a * b)
      if (ops.includes('-')) {
        if (a > b) candidatos.push(a - b)
        else if (b > a) candidatos.push(b - a)
      }
      if (ops.includes('÷')) {
        if (b > 1 && a % b === 0) candidatos.push(a / b)
        if (a > 1 && b % a === 0) candidatos.push(b / a)
      }
      for (const r of candidatos) {
        if (r > 0 && Number.isInteger(r)) {
          results.add(r)
          for (const v of getAllReachable([...rest, r], ops, _depth + 1)) results.add(v)
        }
      }
    }
  }
  _solverCache.set(key, results)
  return results
}

// Genera los números iniciales. La división pura necesita pares con divisibilidad
// garantizada, si no el conjunto alcanzable queda demasiado pobre.
function genVals(cfg, ops) {
  if (ops.length === 1 && ops[0] === '÷') {
    const vals = []
    while (vals.length < cfg.count) {
      const b = rng(2, Math.min(9, cfg.numMax))
      const k = rng(2, Math.min(9, cfg.numMax))
      vals.push(b, b * k)
    }
    return vals.slice(0, cfg.count)
  }
  return Array.from({ length: cfg.count }, () => rng(1, cfg.numMax))
}

// Genera un puzzle garantizado: objetivo siempre alcanzable con los números dados y las operaciones permitidas.
export function generarPuzzle(cfg, ops) {
  _solverCache.clear()
  for (let intento = 0; intento < 30; intento++) {
    const vals = genVals(cfg, ops)
    const alcanzables = getAllReachable(vals, ops)
    const candidatos = [...alcanzables].filter(v =>
      v >= cfg.objMin && v <= cfg.objMax && !vals.includes(v)
    )
    if (candidatos.length > 0) {
      const objetivo = candidatos[rng(0, candidatos.length - 1)]
      return { vals, objetivo }
    }
    const relajados = [...alcanzables].filter(v => v >= cfg.objMin && v <= cfg.objMax)
    if (relajados.length > 0) {
      const objetivo = relajados[rng(0, relajados.length - 1)]
      return { vals, objetivo }
    }
  }
  // Fallback extremo (no debería ocurrir con los rangos actuales)
  const vals = genVals(cfg, ops)
  return { vals, objetivo: rng(cfg.objMin, cfg.objMax) }
}

// ── Selección determinista por día (mismo desafío para todos en la misma fecha) ──
export function dayOfYear() {
  const start = new Date(new Date().getFullYear(), 0, 0)
  return Math.floor((Date.now() - start) / 86400000)
}
