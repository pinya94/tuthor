// Portero – level pool
// Each level: { id, fn, label, startX, goalX, explanation }
// Zones computed from fn(goalX):
//   A: y ≥ 2   (zona alta)
//   B: 0 ≤ y < 2  (centro-alto)
//   C: -2 ≤ y < 0 (centro-bajo)
//   D: y < -2  (zona baja)
// All levels designed so fn(goalX) ∈ (-4, 4) \ {-2, 0, 2}

export const POOLS = {
  // ── Easy: f(x) = mx  ─────────────────────────────────────────────────────
  // goalX = 2 → fn(2) = 2m → choose m so 2m ∈ {A,B,C,D} clearly
  easy: [
    {
      id: 'e1',
      fn: x => 1.5 * x,
      label: 'f(x) = 3x/2',
      startX: -2, goalX: 2,
      explanation: {
        es: 'f(2) = 3·2/2 = 3 → Zona A (y ≥ 2)',
        en: 'f(2) = 3·2/2 = 3 → Zone A (y ≥ 2)',
        ca: 'f(2) = 3·2/2 = 3 → Zona A (y ≥ 2)',
      },
    },
    {
      id: 'e2',
      fn: x => 0.5 * x,
      label: 'f(x) = x/2',
      startX: -2, goalX: 2,
      explanation: {
        es: 'f(2) = 2/2 = 1 → Zona B (0 ≤ y < 2)',
        en: 'f(2) = 2/2 = 1 → Zone B (0 ≤ y < 2)',
        ca: 'f(2) = 2/2 = 1 → Zona B (0 ≤ y < 2)',
      },
    },
    {
      id: 'e3',
      fn: x => -0.5 * x,
      label: 'f(x) = −x/2',
      startX: -2, goalX: 2,
      explanation: {
        es: 'f(2) = −2/2 = −1 → Zona C (−2 ≤ y < 0)',
        en: 'f(2) = −2/2 = −1 → Zone C (−2 ≤ y < 0)',
        ca: 'f(2) = −2/2 = −1 → Zona C (−2 ≤ y < 0)',
      },
    },
    {
      id: 'e4',
      fn: x => -1.5 * x,
      label: 'f(x) = −3x/2',
      startX: -2, goalX: 2,
      explanation: {
        es: 'f(2) = −3·2/2 = −3 → Zona D (y < −2)',
        en: 'f(2) = −3·2/2 = −3 → Zone D (y < −2)',
        ca: 'f(2) = −3·2/2 = −3 → Zona D (y < −2)',
      },
    },
    {
      id: 'e5',
      fn: x => 1.2 * x,
      label: 'f(x) = 6x/5',
      startX: -2, goalX: 2,
      explanation: {
        es: 'f(2) = 6·2/5 = 2.4 → Zona A (y ≥ 2)',
        en: 'f(2) = 6·2/5 = 2.4 → Zone A (y ≥ 2)',
        ca: 'f(2) = 6·2/5 = 2.4 → Zona A (y ≥ 2)',
      },
    },
    {
      id: 'e6',
      fn: x => 0.3 * x,
      label: 'f(x) = 3x/10',
      startX: -2, goalX: 2,
      explanation: {
        es: 'f(2) = 3·2/10 = 0.6 → Zona B (0 ≤ y < 2)',
        en: 'f(2) = 3·2/10 = 0.6 → Zone B (0 ≤ y < 2)',
        ca: 'f(2) = 3·2/10 = 0.6 → Zona B (0 ≤ y < 2)',
      },
    },
    {
      id: 'e7',
      fn: x => -0.3 * x,
      label: 'f(x) = −3x/10',
      startX: -2, goalX: 2,
      explanation: {
        es: 'f(2) = −3·2/10 = −0.6 → Zona C (−2 ≤ y < 0)',
        en: 'f(2) = −3·2/10 = −0.6 → Zone C (−2 ≤ y < 0)',
        ca: 'f(2) = −3·2/10 = −0.6 → Zona C (−2 ≤ y < 0)',
      },
    },
    {
      id: 'e8',
      fn: x => -1.1 * x,
      label: 'f(x) = −11x/10',
      startX: -2, goalX: 2,
      explanation: {
        es: 'f(2) = −11·2/10 = −2.2 → Zona D (y < −2)',
        en: 'f(2) = −11·2/10 = −2.2 → Zone D (y < −2)',
        ca: 'f(2) = −11·2/10 = −2.2 → Zona D (y < −2)',
      },
    },
    {
      id: 'e9',
      fn: x => 0.7 * x,
      label: 'f(x) = 7x/10',
      startX: -2, goalX: 2,
      explanation: {
        es: 'f(2) = 7·2/10 = 1.4 → Zona B (0 ≤ y < 2)',
        en: 'f(2) = 7·2/10 = 1.4 → Zone B (0 ≤ y < 2)',
        ca: 'f(2) = 7·2/10 = 1.4 → Zona B (0 ≤ y < 2)',
      },
    },
    {
      id: 'e10',
      fn: x => -0.7 * x,
      label: 'f(x) = −7x/10',
      startX: -2, goalX: 2,
      explanation: {
        es: 'f(2) = −7·2/10 = −1.4 → Zona C (−2 ≤ y < 0)',
        en: 'f(2) = −7·2/10 = −1.4 → Zone C (−2 ≤ y < 0)',
        ca: 'f(2) = −7·2/10 = −1.4 → Zona C (−2 ≤ y < 0)',
      },
    },
  ],

  // ── Medium: f(x) = mx + b  ───────────────────────────────────────────────
  // goalX = 3
  medium: [
    {
      id: 'm1',
      fn: x => x + 0.5,
      label: 'f(x) = x + ½',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = 3 + 0.5 = 3.5 → Zona A (y ≥ 2)',
        en: 'f(3) = 3 + 0.5 = 3.5 → Zone A (y ≥ 2)',
        ca: 'f(3) = 3 + 0.5 = 3.5 → Zona A (y ≥ 2)',
      },
    },
    {
      id: 'm2',
      fn: x => x - 2,
      label: 'f(x) = x − 2',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = 3 − 2 = 1 → Zona B (0 ≤ y < 2)',
        en: 'f(3) = 3 − 2 = 1 → Zone B (0 ≤ y < 2)',
        ca: 'f(3) = 3 − 2 = 1 → Zona B (0 ≤ y < 2)',
      },
    },
    {
      id: 'm3',
      fn: x => -x + 2,
      label: 'f(x) = −x + 2',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = −3 + 2 = −1 → Zona C (−2 ≤ y < 0)',
        en: 'f(3) = −3 + 2 = −1 → Zone C (−2 ≤ y < 0)',
        ca: 'f(3) = −3 + 2 = −1 → Zona C (−2 ≤ y < 0)',
      },
    },
    {
      id: 'm4',
      fn: x => -x - 0.5,
      label: 'f(x) = −x − ½',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = −3 − 0.5 = −3.5 → Zona D (y < −2)',
        en: 'f(3) = −3 − 0.5 = −3.5 → Zone D (y < −2)',
        ca: 'f(3) = −3 − 0.5 = −3.5 → Zona D (y < −2)',
      },
    },
    {
      id: 'm5',
      fn: x => 2 * x - 3,
      label: 'f(x) = 2x − 3',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = 2·3 − 3 = 3 → Zona A (y ≥ 2)',
        en: 'f(3) = 2·3 − 3 = 3 → Zone A (y ≥ 2)',
        ca: 'f(3) = 2·3 − 3 = 3 → Zona A (y ≥ 2)',
      },
    },
    {
      id: 'm6',
      fn: x => 2 * x - 5,
      label: 'f(x) = 2x − 5',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = 2·3 − 5 = 1 → Zona B (0 ≤ y < 2)',
        en: 'f(3) = 2·3 − 5 = 1 → Zone B (0 ≤ y < 2)',
        ca: 'f(3) = 2·3 − 5 = 1 → Zona B (0 ≤ y < 2)',
      },
    },
    {
      id: 'm7',
      fn: x => -2 * x + 5,
      label: 'f(x) = −2x + 5',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = −2·3 + 5 = −1 → Zona C (−2 ≤ y < 0)',
        en: 'f(3) = −2·3 + 5 = −1 → Zone C (−2 ≤ y < 0)',
        ca: 'f(3) = −2·3 + 5 = −1 → Zona C (−2 ≤ y < 0)',
      },
    },
    {
      id: 'm8',
      fn: x => -2 * x + 3,
      label: 'f(x) = −2x + 3',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = −2·3 + 3 = −3 → Zona D (y < −2)',
        en: 'f(3) = −2·3 + 3 = −3 → Zone D (y < −2)',
        ca: 'f(3) = −2·3 + 3 = −3 → Zona D (y < −2)',
      },
    },
    {
      id: 'm9',
      fn: x => 0.5 * x + 2,
      label: 'f(x) = x/2 + 2',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = 3/2 + 2 = 3.5 → Zona A (y ≥ 2)',
        en: 'f(3) = 3/2 + 2 = 3.5 → Zone A (y ≥ 2)',
        ca: 'f(3) = 3/2 + 2 = 3.5 → Zona A (y ≥ 2)',
      },
    },
    {
      id: 'm10',
      fn: x => 0.5 * x - 0.5,
      label: 'f(x) = x/2 − ½',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = 3/2 − 1/2 = 1 → Zona B (0 ≤ y < 2)',
        en: 'f(3) = 3/2 − 1/2 = 1 → Zone B (0 ≤ y < 2)',
        ca: 'f(3) = 3/2 − 1/2 = 1 → Zona B (0 ≤ y < 2)',
      },
    },
    {
      id: 'm11',
      fn: x => -0.5 * x + 0.5,
      label: 'f(x) = −x/2 + ½',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = −3/2 + 1/2 = −1 → Zona C (−2 ≤ y < 0)',
        en: 'f(3) = −3/2 + 1/2 = −1 → Zone C (−2 ≤ y < 0)',
        ca: 'f(3) = −3/2 + 1/2 = −1 → Zona C (−2 ≤ y < 0)',
      },
    },
    {
      id: 'm12',
      fn: x => -0.5 * x - 2,
      label: 'f(x) = −x/2 − 2',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = −3/2 − 2 = −3.5 → Zona D (y < −2)',
        en: 'f(3) = −3/2 − 2 = −3.5 → Zone D (y < −2)',
        ca: 'f(3) = −3/2 − 2 = −3.5 → Zona D (y < −2)',
      },
    },
  ],

  // ── Hard: parabolas & other  ─────────────────────────────────────────────
  // goalX = 3 (so 3² = 9 is the key square to remember)
  hard: [
    {
      id: 'h1',
      fn: x => x * x - 6,
      label: 'f(x) = x² − 6',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = 9 − 6 = 3 → Zona A (y ≥ 2)',
        en: 'f(3) = 9 − 6 = 3 → Zone A (y ≥ 2)',
        ca: 'f(3) = 9 − 6 = 3 → Zona A (y ≥ 2)',
      },
    },
    {
      id: 'h2',
      fn: x => x * x - 8,
      label: 'f(x) = x² − 8',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = 9 − 8 = 1 → Zona B (0 ≤ y < 2)',
        en: 'f(3) = 9 − 8 = 1 → Zone B (0 ≤ y < 2)',
        ca: 'f(3) = 9 − 8 = 1 → Zona B (0 ≤ y < 2)',
      },
    },
    {
      id: 'h3',
      fn: x => -(x * x) + 8,
      label: 'f(x) = −x² + 8',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = −9 + 8 = −1 → Zona C (−2 ≤ y < 0)',
        en: 'f(3) = −9 + 8 = −1 → Zone C (−2 ≤ y < 0)',
        ca: 'f(3) = −9 + 8 = −1 → Zona C (−2 ≤ y < 0)',
      },
    },
    {
      id: 'h4',
      fn: x => -(x * x) + 6,
      label: 'f(x) = −x² + 6',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = −9 + 6 = −3 → Zona D (y < −2)',
        en: 'f(3) = −9 + 6 = −3 → Zone D (y < −2)',
        ca: 'f(3) = −9 + 6 = −3 → Zona D (y < −2)',
      },
    },
    {
      id: 'h5',
      fn: x => 0.5 * x * x - 1.5,
      label: 'f(x) = x²/2 − 3/2',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = 9/2 − 3/2 = 3 → Zona A (y ≥ 2)',
        en: 'f(3) = 9/2 − 3/2 = 3 → Zone A (y ≥ 2)',
        ca: 'f(3) = 9/2 − 3/2 = 3 → Zona A (y ≥ 2)',
      },
    },
    {
      id: 'h6',
      fn: x => 0.5 * x * x - 3.5,
      label: 'f(x) = x²/2 − 7/2',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = 9/2 − 7/2 = 1 → Zona B (0 ≤ y < 2)',
        en: 'f(3) = 9/2 − 7/2 = 1 → Zone B (0 ≤ y < 2)',
        ca: 'f(3) = 9/2 − 7/2 = 1 → Zona B (0 ≤ y < 2)',
      },
    },
    {
      id: 'h7',
      fn: x => -0.5 * x * x + 3.5,
      label: 'f(x) = −x²/2 + 7/2',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = −9/2 + 7/2 = −1 → Zona C (−2 ≤ y < 0)',
        en: 'f(3) = −9/2 + 7/2 = −1 → Zone C (−2 ≤ y < 0)',
        ca: 'f(3) = −9/2 + 7/2 = −1 → Zona C (−2 ≤ y < 0)',
      },
    },
    {
      id: 'h8',
      fn: x => -0.5 * x * x + 1.5,
      label: 'f(x) = −x²/2 + 3/2',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = −9/2 + 3/2 = −3 → Zona D (y < −2)',
        en: 'f(3) = −9/2 + 3/2 = −3 → Zone D (y < −2)',
        ca: 'f(3) = −9/2 + 3/2 = −3 → Zona D (y < −2)',
      },
    },
    {
      id: 'h9',
      fn: x => x * x - x - 3,
      label: 'f(x) = x² − x − 3',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = 9 − 3 − 3 = 3 → Zona A (y ≥ 2)',
        en: 'f(3) = 9 − 3 − 3 = 3 → Zone A (y ≥ 2)',
        ca: 'f(3) = 9 − 3 − 3 = 3 → Zona A (y ≥ 2)',
      },
    },
    {
      id: 'h10',
      fn: x => x * x - x - 7,
      label: 'f(x) = x² − x − 7',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = 9 − 3 − 7 = −1 → Zona C (−2 ≤ y < 0)',
        en: 'f(3) = 9 − 3 − 7 = −1 → Zone C (−2 ≤ y < 0)',
        ca: 'f(3) = 9 − 3 − 7 = −1 → Zona C (−2 ≤ y < 0)',
      },
    },
    {
      id: 'h11',
      fn: x => -(x * x) + x + 5,
      label: 'f(x) = −x² + x + 5',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = −9 + 3 + 5 = −1 → Zona C (−2 ≤ y < 0)',
        en: 'f(3) = −9 + 3 + 5 = −1 → Zone C (−2 ≤ y < 0)',
        ca: 'f(3) = −9 + 3 + 5 = −1 → Zona C (−2 ≤ y < 0)',
      },
    },
    {
      id: 'h12',
      fn: x => -(x * x) + x + 3,
      label: 'f(x) = −x² + x + 3',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = −9 + 3 + 3 = −3 → Zona D (y < −2)',
        en: 'f(3) = −9 + 3 + 3 = −3 → Zone D (y < −2)',
        ca: 'f(3) = −9 + 3 + 3 = −3 → Zona D (y < −2)',
      },
    },
  ],
}
