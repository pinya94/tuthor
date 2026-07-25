// Balanza — lógica pura (sin React), 100% determinista y calculable.
// Momento (torque) de un peso = peso × distancia al eje (la muesca).
// La balanza se equilibra si el momento total izquierdo == el derecho.
//
// Generación "hacia atrás" para garantizar que SIEMPRE hay una muesca exacta:
// se colocan pesos a la izquierda, se calcula su momento total, y se elige el
// peso del jugador de forma que el momento se reparta en un número entero de
// muescas (la respuesta). Así el reto siempre tiene solución exacta.

const CFG = {
  easy:   { nLeft: [1, 1], maxWeight: 5, maxNotch: 5 },
  medium: { nLeft: [1, 2], maxWeight: 6, maxNotch: 6 },
  hard:   { nLeft: [2, 3], maxWeight: 9, maxNotch: 8 },
}

const TYPE_POOLS = {
  facil:   ['easy'],
  medio:   ['easy', 'medium'],
  dificil: ['medium', 'hard'],
}

const rnd = (a, b, rand) => a + Math.floor(rand() * (b - a + 1))
const pick = (arr, rand) => arr[rnd(0, arr.length - 1, rand)]

export function torque(items) {
  return items.reduce((s, it) => s + it.w * it.d, 0)
}

export function genRound(uiDiff, rand = Math.random) {
  const type = pick(TYPE_POOLS[uiDiff] || ['easy'], rand)
  const cfg = CFG[type]

  for (let attempt = 0; attempt < 40; attempt++) {
    const left = []
    const n = rnd(cfg.nLeft[0], cfg.nLeft[1], rand)
    const usedNotch = new Set()
    for (let i = 0; i < n; i++) {
      let d
      do { d = rnd(1, cfg.maxNotch, rand) } while (usedNotch.has(d) && usedNotch.size < cfg.maxNotch)
      usedNotch.add(d)
      left.push({ w: rnd(1, cfg.maxWeight, rand), d })
    }
    const total = torque(left)
    // Peso del jugador: divisor de `total` que dé una muesca entera válida.
    const candidates = []
    for (let pw = 1; pw <= cfg.maxWeight; pw++) {
      if (total % pw === 0) {
        const notch = total / pw
        if (notch >= 1 && notch <= cfg.maxNotch) candidates.push({ pw, notch })
      }
    }
    if (candidates.length === 0) continue
    const chosen = pick(candidates, rand)
    return {
      left,
      playerWeight: chosen.pw,
      answer: chosen.notch,          // muesca correcta a la derecha
      maxNotch: cfg.maxNotch,
      leftTorque: total,
      options: Array.from({ length: cfg.maxNotch }, (_, i) => i + 1),
    }
  }

  // Fallback trivial (nunca debería hacer falta): 4 = 2×2 izq, jugador 2 → muesca 2.
  return {
    left: [{ w: 2, d: 2 }],
    playerWeight: 2,
    answer: 2,
    maxNotch: cfg.maxNotch,
    leftTorque: 4,
    options: Array.from({ length: cfg.maxNotch }, (_, i) => i + 1),
  }
}

// Desglose textual de un lado para el feedback: "3×4 + 1×2 = 14".
export function torqueBreakdown(items) {
  if (items.length === 0) return '0'
  const parts = items.map(it => `${it.w}×${it.d}`)
  const sum = torque(items)
  return parts.length > 1 ? `${parts.join(' + ')} = ${sum}` : `${parts[0]} = ${sum}`
}
