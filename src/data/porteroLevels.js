// Portero – level pool
// Every function f passes through the starting point: fn(startX) = startY (natural)
// The ball is always shown at (startX, fn(startX)) — this varies per level for visual variety.
// goalX = 3 for ALL levels (unified).
// Zones at x = goalX:
//   A: y ≥ 2   (zona alta)
//   B: 0 ≤ y < 2  (centro-alto)
//   C: -2 ≤ y < 0 (centro-bajo)
//   D: y < -2  (zona baja)

export const POOLS = {
  // ── Easy: f(x) = (x+a)/k  ────────────────────────────────────────────────
  // Ball always starts where fn(startX) = 0 (on the x-axis) or at a simple integer.
  // startX varies: –3, –1, or –3 with offset.
  easy: [
    // Ball at (–3, 0)
    {
      id: 'e1',
      fn: x => (x + 3) / 2,
      label: 'f(x) = (x+3)/2',
      startX: -3, goalX: 3,
      explanation: {
        es: 'f(3) = (3+3)/2 = 6/2 = 3 → Zona A (y ≥ 2)',
        en: 'f(3) = (3+3)/2 = 6/2 = 3 → Zone A (y ≥ 2)',
        ca: 'f(3) = (3+3)/2 = 6/2 = 3 → Zona A (y ≥ 2)',
      },
    },
    {
      id: 'e2',
      fn: x => (x + 3) / 4,
      label: 'f(x) = (x+3)/4',
      startX: -3, goalX: 3,
      explanation: {
        es: 'f(3) = (3+3)/4 = 6/4 = 1.5 → Zona B (0 ≤ y < 2)',
        en: 'f(3) = (3+3)/4 = 6/4 = 1.5 → Zone B (0 ≤ y < 2)',
        ca: 'f(3) = (3+3)/4 = 6/4 = 1.5 → Zona B (0 ≤ y < 2)',
      },
    },
    {
      id: 'e3',
      fn: x => -(x + 3) / 4,
      label: 'f(x) = −(x+3)/4',
      startX: -3, goalX: 3,
      explanation: {
        es: 'f(3) = −(3+3)/4 = −6/4 = −1.5 → Zona C (−2 ≤ y < 0)',
        en: 'f(3) = −(3+3)/4 = −6/4 = −1.5 → Zone C (−2 ≤ y < 0)',
        ca: 'f(3) = −(3+3)/4 = −6/4 = −1.5 → Zona C (−2 ≤ y < 0)',
      },
    },
    {
      id: 'e4',
      fn: x => -(x + 3) / 2,
      label: 'f(x) = −(x+3)/2',
      startX: -3, goalX: 3,
      explanation: {
        es: 'f(3) = −(3+3)/2 = −6/2 = −3 → Zona D (y < −2)',
        en: 'f(3) = −(3+3)/2 = −6/2 = −3 → Zone D (y < −2)',
        ca: 'f(3) = −(3+3)/2 = −6/2 = −3 → Zona D (y < −2)',
      },
    },
    // Ball at (–1, 0)
    {
      id: 'e5',
      fn: x => 3 * (x + 1) / 4,
      label: 'f(x) = 3(x+1)/4',
      startX: -1, goalX: 3,
      explanation: {
        es: 'f(3) = 3·(3+1)/4 = 12/4 = 3 → Zona A (y ≥ 2)',
        en: 'f(3) = 3·(3+1)/4 = 12/4 = 3 → Zone A (y ≥ 2)',
        ca: 'f(3) = 3·(3+1)/4 = 12/4 = 3 → Zona A (y ≥ 2)',
      },
    },
    {
      id: 'e6',
      fn: x => (x + 1) / 4,
      label: 'f(x) = (x+1)/4',
      startX: -1, goalX: 3,
      explanation: {
        es: 'f(3) = (3+1)/4 = 4/4 = 1 → Zona B (0 ≤ y < 2)',
        en: 'f(3) = (3+1)/4 = 4/4 = 1 → Zone B (0 ≤ y < 2)',
        ca: 'f(3) = (3+1)/4 = 4/4 = 1 → Zona B (0 ≤ y < 2)',
      },
    },
    {
      id: 'e7',
      fn: x => -(x + 1) / 4,
      label: 'f(x) = −(x+1)/4',
      startX: -1, goalX: 3,
      explanation: {
        es: 'f(3) = −(3+1)/4 = −4/4 = −1 → Zona C (−2 ≤ y < 0)',
        en: 'f(3) = −(3+1)/4 = −4/4 = −1 → Zone C (−2 ≤ y < 0)',
        ca: 'f(3) = −(3+1)/4 = −4/4 = −1 → Zona C (−2 ≤ y < 0)',
      },
    },
    {
      id: 'e8',
      fn: x => -3 * (x + 1) / 4,
      label: 'f(x) = −3(x+1)/4',
      startX: -1, goalX: 3,
      explanation: {
        es: 'f(3) = −3·(3+1)/4 = −12/4 = −3 → Zona D (y < −2)',
        en: 'f(3) = −3·(3+1)/4 = −12/4 = −3 → Zone D (y < −2)',
        ca: 'f(3) = −3·(3+1)/4 = −12/4 = −3 → Zona D (y < −2)',
      },
    },
    // Ball at (–3, 1) — fn(–3) = 1
    {
      id: 'e9',
      fn: x => x / 3 + 2,
      label: 'f(x) = x/3 + 2',
      startX: -3, goalX: 3,
      explanation: {
        es: 'f(3) = 3/3 + 2 = 1 + 2 = 3 → Zona A (y ≥ 2)',
        en: 'f(3) = 3/3 + 2 = 1 + 2 = 3 → Zone A (y ≥ 2)',
        ca: 'f(3) = 3/3 + 2 = 1 + 2 = 3 → Zona A (y ≥ 2)',
      },
    },
    // Ball at (–3, –1) — fn(–3) = –1
    {
      id: 'e10',
      fn: x => x / 3,
      label: 'f(x) = x/3',
      startX: -3, goalX: 3,
      explanation: {
        es: 'f(3) = 3/3 = 1 → Zona B (0 ≤ y < 2)',
        en: 'f(3) = 3/3 = 1 → Zone B (0 ≤ y < 2)',
        ca: 'f(3) = 3/3 = 1 → Zona B (0 ≤ y < 2)',
      },
    },
    // Ball at (–3, 1) — fn(–3) = 1
    {
      id: 'e11',
      fn: x => -x / 3,
      label: 'f(x) = −x/3',
      startX: -3, goalX: 3,
      explanation: {
        es: 'f(3) = −3/3 = −1 → Zona C (−2 ≤ y < 0)',
        en: 'f(3) = −3/3 = −1 → Zone C (−2 ≤ y < 0)',
        ca: 'f(3) = −3/3 = −1 → Zona C (−2 ≤ y < 0)',
      },
    },
    // Ball at (–3, –1) — fn(–3) = –1
    {
      id: 'e12',
      fn: x => -x / 3 - 2,
      label: 'f(x) = −x/3 − 2',
      startX: -3, goalX: 3,
      explanation: {
        es: 'f(3) = −3/3 − 2 = −1 − 2 = −3 → Zona D (y < −2)',
        en: 'f(3) = −3/3 − 2 = −1 − 2 = −3 → Zone D (y < −2)',
        ca: 'f(3) = −3/3 − 2 = −1 − 2 = −3 → Zona D (y < −2)',
      },
    },
  ],

  // ── Medium: f(x) = mx + b  ───────────────────────────────────────────────
  // Standard slope-intercept form. startX varies: –1, –2, –3.
  medium: [
    // Ball at (–3, –1)
    {
      id: 'm1',
      fn: x => 2 * x / 3 + 1,
      label: 'f(x) = 2x/3 + 1',
      startX: -3, goalX: 3,
      explanation: {
        es: 'f(3) = 2·3/3 + 1 = 2 + 1 = 3 → Zona A (y ≥ 2)',
        en: 'f(3) = 2·3/3 + 1 = 2 + 1 = 3 → Zone A (y ≥ 2)',
        ca: 'f(3) = 2·3/3 + 1 = 2 + 1 = 3 → Zona A (y ≥ 2)',
      },
    },
    // Ball at (–2, 0)
    {
      id: 'm2',
      fn: x => x / 2 + 1,
      label: 'f(x) = x/2 + 1',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = 3/2 + 1 = 1.5 + 1 = 2.5 → Zona A (y ≥ 2)',
        en: 'f(3) = 3/2 + 1 = 1.5 + 1 = 2.5 → Zone A (y ≥ 2)',
        ca: 'f(3) = 3/2 + 1 = 1.5 + 1 = 2.5 → Zona A (y ≥ 2)',
      },
    },
    // Ball at (–2, 1)
    {
      id: 'm3',
      fn: x => x / 2 + 2,
      label: 'f(x) = x/2 + 2',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = 3/2 + 2 = 1.5 + 2 = 3.5 → Zona A (y ≥ 2)',
        en: 'f(3) = 3/2 + 2 = 1.5 + 2 = 3.5 → Zone A (y ≥ 2)',
        ca: 'f(3) = 3/2 + 2 = 1.5 + 2 = 3.5 → Zona A (y ≥ 2)',
      },
    },
    // Ball at (–3, –1)
    {
      id: 'm4',
      fn: x => x / 3,
      label: 'f(x) = x/3',
      startX: -3, goalX: 3,
      explanation: {
        es: 'f(3) = 3/3 = 1 → Zona B (0 ≤ y < 2)',
        en: 'f(3) = 3/3 = 1 → Zone B (0 ≤ y < 2)',
        ca: 'f(3) = 3/3 = 1 → Zona B (0 ≤ y < 2)',
      },
    },
    // Ball at (–1, –1)
    {
      id: 'm5',
      fn: x => (x - 1) / 2,
      label: 'f(x) = (x−1)/2',
      startX: -1, goalX: 3,
      explanation: {
        es: 'f(3) = (3−1)/2 = 2/2 = 1 → Zona B (0 ≤ y < 2)',
        en: 'f(3) = (3−1)/2 = 2/2 = 1 → Zone B (0 ≤ y < 2)',
        ca: 'f(3) = (3−1)/2 = 2/2 = 1 → Zona B (0 ≤ y < 2)',
      },
    },
    // Ball at (–1, –1.5)
    {
      id: 'm6',
      fn: x => x / 2 - 1,
      label: 'f(x) = x/2 − 1',
      startX: -1, goalX: 3,
      explanation: {
        es: 'f(3) = 3/2 − 1 = 1.5 − 1 = 0.5 → Zona B (0 ≤ y < 2)',
        en: 'f(3) = 3/2 − 1 = 1.5 − 1 = 0.5 → Zone B (0 ≤ y < 2)',
        ca: 'f(3) = 3/2 − 1 = 1.5 − 1 = 0.5 → Zona B (0 ≤ y < 2)',
      },
    },
    // Ball at (–3, 1)
    {
      id: 'm7',
      fn: x => -x / 3,
      label: 'f(x) = −x/3',
      startX: -3, goalX: 3,
      explanation: {
        es: 'f(3) = −3/3 = −1 → Zona C (−2 ≤ y < 0)',
        en: 'f(3) = −3/3 = −1 → Zone C (−2 ≤ y < 0)',
        ca: 'f(3) = −3/3 = −1 → Zona C (−2 ≤ y < 0)',
      },
    },
    // Ball at (–1, 1)
    {
      id: 'm8',
      fn: x => (1 - x) / 2,
      label: 'f(x) = (1−x)/2',
      startX: -1, goalX: 3,
      explanation: {
        es: 'f(3) = (1−3)/2 = −2/2 = −1 → Zona C (−2 ≤ y < 0)',
        en: 'f(3) = (1−3)/2 = −2/2 = −1 → Zone C (−2 ≤ y < 0)',
        ca: 'f(3) = (1−3)/2 = −2/2 = −1 → Zona C (−2 ≤ y < 0)',
      },
    },
    // Ball at (–2, 2)
    {
      id: 'm9',
      fn: x => -x / 2 + 1,
      label: 'f(x) = −x/2 + 1',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = −3/2 + 1 = −1.5 + 1 = −0.5 → Zona C (−2 ≤ y < 0)',
        en: 'f(3) = −3/2 + 1 = −1.5 + 1 = −0.5 → Zone C (−2 ≤ y < 0)',
        ca: 'f(3) = −3/2 + 1 = −1.5 + 1 = −0.5 → Zona C (−2 ≤ y < 0)',
      },
    },
    // Ball at (–3, 1)
    {
      id: 'm10',
      fn: x => -2 * x / 3 - 1,
      label: 'f(x) = −2x/3 − 1',
      startX: -3, goalX: 3,
      explanation: {
        es: 'f(3) = −2·3/3 − 1 = −2 − 1 = −3 → Zona D (y < −2)',
        en: 'f(3) = −2·3/3 − 1 = −2 − 1 = −3 → Zone D (y < −2)',
        ca: 'f(3) = −2·3/3 − 1 = −2 − 1 = −3 → Zona D (y < −2)',
      },
    },
    // Ball at (–2, –1)
    {
      id: 'm11',
      fn: x => -x / 2 - 2,
      label: 'f(x) = −x/2 − 2',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = −3/2 − 2 = −1.5 − 2 = −3.5 → Zona D (y < −2)',
        en: 'f(3) = −3/2 − 2 = −1.5 − 2 = −3.5 → Zone D (y < −2)',
        ca: 'f(3) = −3/2 − 2 = −1.5 − 2 = −3.5 → Zona D (y < −2)',
      },
    },
    // Ball at (–1, 0)
    {
      id: 'm12',
      fn: x => -x - 1,
      label: 'f(x) = −x − 1',
      startX: -1, goalX: 3,
      explanation: {
        es: 'f(3) = −3 − 1 = −4 → Zona D (y < −2)',
        en: 'f(3) = −3 − 1 = −4 → Zone D (y < −2)',
        ca: 'f(3) = −3 − 1 = −4 → Zona D (y < −2)',
      },
    },
  ],

  // ── Hard: parabolas  ──────────────────────────────────────────────────────
  // startX varies among –3, –2, –1. Ball at (startX, fn(startX)).
  // Mix of symmetric (x²−c) and asymmetric (x²±x+c) functions.
  hard: [
    // Ball at (–3, 3) — symmetric parabola
    {
      id: 'h1',
      fn: x => x * x - 6,
      label: 'f(x) = x² − 6',
      startX: -3, goalX: 3,
      explanation: {
        es: 'f(3) = 3² − 6 = 9 − 6 = 3 → Zona A (y ≥ 2)',
        en: 'f(3) = 3² − 6 = 9 − 6 = 3 → Zone A (y ≥ 2)',
        ca: 'f(3) = 3² − 6 = 9 − 6 = 3 → Zona A (y ≥ 2)',
      },
    },
    // Ball at (–3, 1)
    {
      id: 'h2',
      fn: x => x * x - 8,
      label: 'f(x) = x² − 8',
      startX: -3, goalX: 3,
      explanation: {
        es: 'f(3) = 3² − 8 = 9 − 8 = 1 → Zona B (0 ≤ y < 2)',
        en: 'f(3) = 3² − 8 = 9 − 8 = 1 → Zone B (0 ≤ y < 2)',
        ca: 'f(3) = 3² − 8 = 9 − 8 = 1 → Zona B (0 ≤ y < 2)',
      },
    },
    // Ball at (–3, –1)
    {
      id: 'h3',
      fn: x => -(x * x) + 8,
      label: 'f(x) = −x² + 8',
      startX: -3, goalX: 3,
      explanation: {
        es: 'f(3) = −3² + 8 = −9 + 8 = −1 → Zona C (−2 ≤ y < 0)',
        en: 'f(3) = −3² + 8 = −9 + 8 = −1 → Zone C (−2 ≤ y < 0)',
        ca: 'f(3) = −3² + 8 = −9 + 8 = −1 → Zona C (−2 ≤ y < 0)',
      },
    },
    // Ball at (–3, –3)
    {
      id: 'h4',
      fn: x => -(x * x) + 6,
      label: 'f(x) = −x² + 6',
      startX: -3, goalX: 3,
      explanation: {
        es: 'f(3) = −3² + 6 = −9 + 6 = −3 → Zona D (y < −2)',
        en: 'f(3) = −3² + 6 = −9 + 6 = −3 → Zone D (y < −2)',
        ca: 'f(3) = −3² + 6 = −9 + 6 = −3 → Zona D (y < −2)',
      },
    },
    // Ball at (–3, –3) — asymmetric! very different trajectory from h4
    {
      id: 'h5',
      fn: x => x * x + x - 9,
      label: 'f(x) = x² + x − 9',
      startX: -3, goalX: 3,
      explanation: {
        es: 'f(3) = 3² + 3 − 9 = 9 + 3 − 9 = 3 → Zona A (y ≥ 2)',
        en: 'f(3) = 3² + 3 − 9 = 9 + 3 − 9 = 3 → Zone A (y ≥ 2)',
        ca: 'f(3) = 3² + 3 − 9 = 9 + 3 − 9 = 3 → Zona A (y ≥ 2)',
      },
    },
    // Ball at (–2, 1)
    {
      id: 'h6',
      fn: x => -(x * x) + x + 7,
      label: 'f(x) = −x² + x + 7',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = −3² + 3 + 7 = −9 + 3 + 7 = 1 → Zona B (0 ≤ y < 2)',
        en: 'f(3) = −3² + 3 + 7 = −9 + 3 + 7 = 1 → Zone B (0 ≤ y < 2)',
        ca: 'f(3) = −3² + 3 + 7 = −9 + 3 + 7 = 1 → Zona B (0 ≤ y < 2)',
      },
    },
    // Ball at (–2, –1)
    {
      id: 'h7',
      fn: x => x * x - x - 7,
      label: 'f(x) = x² − x − 7',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = 3² − 3 − 7 = 9 − 3 − 7 = −1 → Zona C (−2 ≤ y < 0)',
        en: 'f(3) = 3² − 3 − 7 = 9 − 3 − 7 = −1 → Zone C (−2 ≤ y < 0)',
        ca: 'f(3) = 3² − 3 − 7 = 9 − 3 − 7 = −1 → Zona C (−2 ≤ y < 0)',
      },
    },
    // Ball at (–2, –3)
    {
      id: 'h8',
      fn: x => -(x * x) + x + 3,
      label: 'f(x) = −x² + x + 3',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = −3² + 3 + 3 = −9 + 3 + 3 = −3 → Zona D (y < −2)',
        en: 'f(3) = −3² + 3 + 3 = −9 + 3 + 3 = −3 → Zone D (y < −2)',
        ca: 'f(3) = −3² + 3 + 3 = −9 + 3 + 3 = −3 → Zona D (y < −2)',
      },
    },
    // Ball at (–1, –1)
    {
      id: 'h9',
      fn: x => x * x - x - 3,
      label: 'f(x) = x² − x − 3',
      startX: -1, goalX: 3,
      explanation: {
        es: 'f(3) = 3² − 3 − 3 = 9 − 3 − 3 = 3 → Zona A (y ≥ 2)',
        en: 'f(3) = 3² − 3 − 3 = 9 − 3 − 3 = 3 → Zone A (y ≥ 2)',
        ca: 'f(3) = 3² − 3 − 3 = 9 − 3 − 3 = 3 → Zona A (y ≥ 2)',
      },
    },
    // Ball at (–1, –3)
    {
      id: 'h10',
      fn: x => x * x - x - 5,
      label: 'f(x) = x² − x − 5',
      startX: -1, goalX: 3,
      explanation: {
        es: 'f(3) = 3² − 3 − 5 = 9 − 3 − 5 = 1 → Zona B (0 ≤ y < 2)',
        en: 'f(3) = 3² − 3 − 5 = 9 − 3 − 5 = 1 → Zone B (0 ≤ y < 2)',
        ca: 'f(3) = 3² − 3 − 5 = 9 − 3 − 5 = 1 → Zona B (0 ≤ y < 2)',
      },
    },
    // Ball at (–1, 3)
    {
      id: 'h11',
      fn: x => -(x * x) + x + 5,
      label: 'f(x) = −x² + x + 5',
      startX: -1, goalX: 3,
      explanation: {
        es: 'f(3) = −3² + 3 + 5 = −9 + 3 + 5 = −1 → Zona C (−2 ≤ y < 0)',
        en: 'f(3) = −3² + 3 + 5 = −9 + 3 + 5 = −1 → Zone C (−2 ≤ y < 0)',
        ca: 'f(3) = −3² + 3 + 5 = −9 + 3 + 5 = −1 → Zona C (−2 ≤ y < 0)',
      },
    },
    // Ball at (–2, 0)
    {
      id: 'h12',
      fn: x => 0.5 * x * x - x - 4,
      label: 'f(x) = x²/2 − x − 4',
      startX: -2, goalX: 3,
      explanation: {
        es: 'f(3) = 3²/2 − 3 − 4 = 4.5 − 3 − 4 = −2.5 → Zona D (y < −2)',
        en: 'f(3) = 3²/2 − 3 − 4 = 4.5 − 3 − 4 = −2.5 → Zone D (y < −2)',
        ca: 'f(3) = 3²/2 − 3 − 4 = 4.5 − 3 − 4 = −2.5 → Zona D (y < −2)',
      },
    },
  ],
}
