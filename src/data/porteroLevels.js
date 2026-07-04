// Portero – level pool
// Every fn passes through its starting point: fn(startX) = startY (natural).
// goalX = 3 for ALL levels. Each level has a UNIQUE visual start (startX, fn(startX)).
// Zones at x = goalX:
//   A: y ≥ 2   B: 0 ≤ y < 2   C: -2 ≤ y < 0   D: y < -2

export const POOLS = {
  // ── Easy (12): simple linear forms, 3 per zone, 12 distinct start positions ─
  // startX ∈ {-3, -2, -1}, startY varies so visual positions spread across field
  easy: [
    // Zone A ──────────────────────────────────────────────────
    { id:'e1', fn: x => x+1,
      label:'f(x) = x + 1', startX:-3, goalX:3,
      // fn(-3)=-2 → ball at (-3,-2); fn(3)=4→A
      explanation:{ es:'f(3) = 3+1 = 4 → Zona A (y ≥ 2)', en:'f(3) = 3+1 = 4 → Zone A (y ≥ 2)', ca:'f(3) = 3+1 = 4 → Zona A (y ≥ 2)' } },
    { id:'e2', fn: x => x,
      label:'f(x) = x', startX:-2, goalX:3,
      // fn(-2)=-2 → ball at (-2,-2); fn(3)=3→A
      explanation:{ es:'f(3) = 3 → Zona A (y ≥ 2)', en:'f(3) = 3 → Zone A (y ≥ 2)', ca:'f(3) = 3 → Zona A (y ≥ 2)' } },
    { id:'e3', fn: x => (x+1)/4+2,
      label:'f(x) = (x+1)/4 + 2', startX:-1, goalX:3,
      // fn(-1)=0+2=2 → ball at (-1,2); fn(3)=1+2=3→A
      explanation:{ es:'f(3) = (3+1)/4 + 2 = 1 + 2 = 3 → Zona A (y ≥ 2)', en:'f(3) = (3+1)/4 + 2 = 1 + 2 = 3 → Zone A (y ≥ 2)', ca:'f(3) = (3+1)/4 + 2 = 1 + 2 = 3 → Zona A (y ≥ 2)' } },

    // Zone B ──────────────────────────────────────────────────
    { id:'e4', fn: x => (x+3)/4,
      label:'f(x) = (x+3)/4', startX:-3, goalX:3,
      // fn(-3)=0 → ball at (-3,0); fn(3)=1.5→B
      explanation:{ es:'f(3) = (3+3)/4 = 6/4 = 1.5 → Zona B (0 ≤ y < 2)', en:'f(3) = (3+3)/4 = 6/4 = 1.5 → Zone B (0 ≤ y < 2)', ca:'f(3) = (3+3)/4 = 6/4 = 1.5 → Zona B (0 ≤ y < 2)' } },
    { id:'e5', fn: x => x/2,
      label:'f(x) = x/2', startX:-2, goalX:3,
      // fn(-2)=-1 → ball at (-2,-1); fn(3)=1.5→B
      explanation:{ es:'f(3) = 3/2 = 1.5 → Zona B (0 ≤ y < 2)', en:'f(3) = 3/2 = 1.5 → Zone B (0 ≤ y < 2)', ca:'f(3) = 3/2 = 1.5 → Zona B (0 ≤ y < 2)' } },
    { id:'e6', fn: x => (x+1)/4,
      label:'f(x) = (x+1)/4', startX:-1, goalX:3,
      // fn(-1)=0 → ball at (-1,0); fn(3)=1→B
      explanation:{ es:'f(3) = (3+1)/4 = 4/4 = 1 → Zona B (0 ≤ y < 2)', en:'f(3) = (3+1)/4 = 4/4 = 1 → Zone B (0 ≤ y < 2)', ca:'f(3) = (3+1)/4 = 4/4 = 1 → Zona B (0 ≤ y < 2)' } },

    // Zone C ──────────────────────────────────────────────────
    { id:'e7', fn: x => -x/3,
      label:'f(x) = −x/3', startX:-3, goalX:3,
      // fn(-3)=1 → ball at (-3,1); fn(3)=-1→C
      explanation:{ es:'f(3) = −3/3 = −1 → Zona C (−2 ≤ y < 0)', en:'f(3) = −3/3 = −1 → Zone C (−2 ≤ y < 0)', ca:'f(3) = −3/3 = −1 → Zona C (−2 ≤ y < 0)' } },
    { id:'e8', fn: x => -(x+2)/5,
      label:'f(x) = −(x+2)/5', startX:-2, goalX:3,
      // fn(-2)=0 → ball at (-2,0); fn(3)=-1→C
      explanation:{ es:'f(3) = −(3+2)/5 = −5/5 = −1 → Zona C (−2 ≤ y < 0)', en:'f(3) = −(3+2)/5 = −5/5 = −1 → Zone C (−2 ≤ y < 0)', ca:'f(3) = −(3+2)/5 = −5/5 = −1 → Zona C (−2 ≤ y < 0)' } },
    { id:'e9', fn: x => (1-x)/2,
      label:'f(x) = (1−x)/2', startX:-1, goalX:3,
      // fn(-1)=(1+1)/2=1 → ball at (-1,1); fn(3)=(1-3)/2=-1→C
      explanation:{ es:'f(3) = (1−3)/2 = −2/2 = −1 → Zona C (−2 ≤ y < 0)', en:'f(3) = (1−3)/2 = −2/2 = −1 → Zone C (−2 ≤ y < 0)', ca:'f(3) = (1−3)/2 = −2/2 = −1 → Zona C (−2 ≤ y < 0)' } },

    // Zone D ──────────────────────────────────────────────────
    { id:'e10', fn: x => -x-1,
      label:'f(x) = −x − 1', startX:-3, goalX:3,
      // fn(-3)=3-1=2 → ball at (-3,2); fn(3)=-3-1=-4→D
      explanation:{ es:'f(3) = −3−1 = −4 → Zona D (y < −2)', en:'f(3) = −3−1 = −4 → Zone D (y < −2)', ca:'f(3) = −3−1 = −4 → Zona D (y < −2)' } },
    { id:'e11', fn: x => -x,
      label:'f(x) = −x', startX:-2, goalX:3,
      // fn(-2)=2 → ball at (-2,2); fn(3)=-3→D
      explanation:{ es:'f(3) = −3 → Zona D (y < −2)', en:'f(3) = −3 → Zone D (y < −2)', ca:'f(3) = −3 → Zona D (y < −2)' } },
    { id:'e12', fn: x => -(x+1)/4-2,
      label:'f(x) = −(x+1)/4 − 2', startX:-1, goalX:3,
      // fn(-1)=0-2=-2 → ball at (-1,-2); fn(3)=-1-2=-3→D
      explanation:{ es:'f(3) = −(3+1)/4 − 2 = −1 − 2 = −3 → Zona D (y < −2)', en:'f(3) = −(3+1)/4 − 2 = −1 − 2 = −3 → Zone D (y < −2)', ca:'f(3) = −(3+1)/4 − 2 = −1 − 2 = −3 → Zona D (y < −2)' } },
  ],

  // ── Medium (12): mx+b standard form, 12 distinct start positions ──────────
  medium: [
    // Zone A
    { id:'m1', fn: x => 2*x/3+1,
      label:'f(x) = 2x/3 + 1', startX:-3, goalX:3,
      // fn(-3)=-2+1=-1 → ball at (-3,-1); fn(3)=3→A
      explanation:{ es:'f(3) = 2·3/3 + 1 = 2+1 = 3 → Zona A (y ≥ 2)', en:'f(3) = 2·3/3 + 1 = 2+1 = 3 → Zone A (y ≥ 2)', ca:'f(3) = 2·3/3 + 1 = 2+1 = 3 → Zona A (y ≥ 2)' } },
    { id:'m2', fn: x => x/2+1,
      label:'f(x) = x/2 + 1', startX:-2, goalX:3,
      // fn(-2)=-1+1=0 → ball at (-2,0); fn(3)=2.5→A
      explanation:{ es:'f(3) = 3/2+1 = 2.5 → Zona A (y ≥ 2)', en:'f(3) = 3/2+1 = 2.5 → Zone A (y ≥ 2)', ca:'f(3) = 3/2+1 = 2.5 → Zona A (y ≥ 2)' } },
    { id:'m3', fn: x => x/2+2,
      label:'f(x) = x/2 + 2', startX:-2, goalX:3,
      // fn(-2)=-1+2=1 → ball at (-2,1); fn(3)=3.5→A
      explanation:{ es:'f(3) = 3/2+2 = 3.5 → Zona A (y ≥ 2)', en:'f(3) = 3/2+2 = 3.5 → Zone A (y ≥ 2)', ca:'f(3) = 3/2+2 = 3.5 → Zona A (y ≥ 2)' } },

    // Zone B
    { id:'m4', fn: x => x/3,
      label:'f(x) = x/3', startX:0, goalX:3,
      // fn(0)=0 → ball at (0,0); fn(3)=1→B
      explanation:{ es:'f(3) = 3/3 = 1 → Zona B (0 ≤ y < 2)', en:'f(3) = 3/3 = 1 → Zone B (0 ≤ y < 2)', ca:'f(3) = 3/3 = 1 → Zona B (0 ≤ y < 2)' } },
    { id:'m5', fn: x => (x-1)/2,
      label:'f(x) = (x−1)/2', startX:-1, goalX:3,
      // fn(-1)=(-2)/2=-1 → ball at (-1,-1); fn(3)=1→B
      explanation:{ es:'f(3) = (3−1)/2 = 1 → Zona B (0 ≤ y < 2)', en:'f(3) = (3−1)/2 = 1 → Zone B (0 ≤ y < 2)', ca:'f(3) = (3−1)/2 = 1 → Zona B (0 ≤ y < 2)' } },
    { id:'m6', fn: x => x/2-1,
      label:'f(x) = x/2 − 1', startX:-1, goalX:3,
      // fn(-1)=-0.5-1=-1.5 → ball at (-1,-1.5); fn(3)=0.5→B
      explanation:{ es:'f(3) = 3/2−1 = 0.5 → Zona B (0 ≤ y < 2)', en:'f(3) = 3/2−1 = 0.5 → Zone B (0 ≤ y < 2)', ca:'f(3) = 3/2−1 = 0.5 → Zona B (0 ≤ y < 2)' } },

    // Zone C
    { id:'m7', fn: x => -x/3,
      label:'f(x) = −x/3', startX:-3, goalX:3,
      // fn(-3)=1 → ball at (-3,1); fn(3)=-1→C
      explanation:{ es:'f(3) = −3/3 = −1 → Zona C (−2 ≤ y < 0)', en:'f(3) = −3/3 = −1 → Zone C (−2 ≤ y < 0)', ca:'f(3) = −3/3 = −1 → Zona C (−2 ≤ y < 0)' } },
    { id:'m8', fn: x => (1-x)/2,
      label:'f(x) = (1−x)/2', startX:-1, goalX:3,
      // fn(-1)=(1+1)/2=1 → ball at (-1,1); fn(3)=-1→C
      explanation:{ es:'f(3) = (1−3)/2 = −1 → Zona C (−2 ≤ y < 0)', en:'f(3) = (1−3)/2 = −1 → Zone C (−2 ≤ y < 0)', ca:'f(3) = (1−3)/2 = −1 → Zona C (−2 ≤ y < 0)' } },
    { id:'m9', fn: x => -x/2+1,
      label:'f(x) = −x/2 + 1', startX:-2, goalX:3,
      // fn(-2)=1+1=2 → ball at (-2,2); fn(3)=-0.5→C
      explanation:{ es:'f(3) = −3/2+1 = −0.5 → Zona C (−2 ≤ y < 0)', en:'f(3) = −3/2+1 = −0.5 → Zone C (−2 ≤ y < 0)', ca:'f(3) = −3/2+1 = −0.5 → Zona C (−2 ≤ y < 0)' } },

    // Zone D
    { id:'m10', fn: x => -2*x/3-1,
      label:'f(x) = −2x/3 − 1', startX:0, goalX:3,
      // fn(0)=-1 → ball at (0,-1); fn(3)=-3→D
      explanation:{ es:'f(3) = −2·3/3−1 = −2−1 = −3 → Zona D (y < −2)', en:'f(3) = −2·3/3−1 = −2−1 = −3 → Zone D (y < −2)', ca:'f(3) = −2·3/3−1 = −2−1 = −3 → Zona D (y < −2)' } },
    { id:'m11', fn: x => -x/2-2,
      label:'f(x) = −x/2 − 2', startX:-2, goalX:3,
      // fn(-2)=1-2=-1 → ball at (-2,-1); fn(3)=-3.5→D
      explanation:{ es:'f(3) = −3/2−2 = −3.5 → Zona D (y < −2)', en:'f(3) = −3/2−2 = −3.5 → Zone D (y < −2)', ca:'f(3) = −3/2−2 = −3.5 → Zona D (y < −2)' } },
    { id:'m12', fn: x => -x-1,
      label:'f(x) = −x − 1', startX:-1, goalX:3,
      // fn(-1)=1-1=0 → ball at (-1,0); fn(3)=-4→D
      explanation:{ es:'f(3) = −3−1 = −4 → Zona D (y < −2)', en:'f(3) = −3−1 = −4 → Zone D (y < −2)', ca:'f(3) = −3−1 = −4 → Zona D (y < −2)' } },
  ],

  // ── Hard (12): parabolas, 12 distinct start positions ─────────────────────
  hard: [
    // Zone A
    { id:'h1', fn: x => x*x-6,
      label:'f(x) = x² − 6', startX:-3, goalX:3,
      // fn(-3)=3 → ball at (-3,3); fn(3)=3→A
      explanation:{ es:'f(3) = 3²−6 = 9−6 = 3 → Zona A (y ≥ 2)', en:'f(3) = 3²−6 = 9−6 = 3 → Zone A (y ≥ 2)', ca:'f(3) = 3²−6 = 9−6 = 3 → Zona A (y ≥ 2)' } },
    { id:'h2', fn: x => x*x-x-3,
      label:'f(x) = x² − x − 3', startX:-2, goalX:3,
      // fn(-2)=4+2-3=3 → ball at (-2,3); fn(3)=9-3-3=3→A
      explanation:{ es:'f(3) = 9−3−3 = 3 → Zona A (y ≥ 2)', en:'f(3) = 9−3−3 = 3 → Zone A (y ≥ 2)', ca:'f(3) = 9−3−3 = 3 → Zona A (y ≥ 2)' } },
    { id:'h3', fn: x => 0.5*x*x-0.5*x,
      label:'f(x) = x(x−1)/2', startX:-1, goalX:3,
      // fn(-1)=0.5+0.5=1 → ball at (-1,1); fn(3)=4.5-1.5=3→A
      explanation:{ es:'f(3) = 3·(3−1)/2 = 3·2/2 = 3 → Zona A (y ≥ 2)', en:'f(3) = 3·(3−1)/2 = 3·2/2 = 3 → Zone A (y ≥ 2)', ca:'f(3) = 3·(3−1)/2 = 3·2/2 = 3 → Zona A (y ≥ 2)' } },

    // Zone B
    { id:'h4', fn: x => x*x-8,
      label:'f(x) = x² − 8', startX:-3, goalX:3,
      // fn(-3)=1 → ball at (-3,1); fn(3)=1→B
      explanation:{ es:'f(3) = 3²−8 = 9−8 = 1 → Zona B (0 ≤ y < 2)', en:'f(3) = 3²−8 = 9−8 = 1 → Zone B (0 ≤ y < 2)', ca:'f(3) = 3²−8 = 9−8 = 1 → Zona B (0 ≤ y < 2)' } },
    { id:'h5', fn: x => -(x*x)+x+7,
      label:'f(x) = −x² + x + 7', startX:-2, goalX:3,
      // fn(-2)=-4-2+7=1 → ball at (-2,1); fn(3)=-9+3+7=1→B
      explanation:{ es:'f(3) = −9+3+7 = 1 → Zona B (0 ≤ y < 2)', en:'f(3) = −9+3+7 = 1 → Zone B (0 ≤ y < 2)', ca:'f(3) = −9+3+7 = 1 → Zona B (0 ≤ y < 2)' } },
    { id:'h6', fn: x => x*x-x-5,
      label:'f(x) = x² − x − 5', startX:-1, goalX:3,
      // fn(-1)=1+1-5=-3 → ball at (-1,-3); fn(3)=9-3-5=1→B
      explanation:{ es:'f(3) = 9−3−5 = 1 → Zona B (0 ≤ y < 2)', en:'f(3) = 9−3−5 = 1 → Zone B (0 ≤ y < 2)', ca:'f(3) = 9−3−5 = 1 → Zona B (0 ≤ y < 2)' } },

    // Zone C
    { id:'h7', fn: x => -(x*x)+8,
      label:'f(x) = −x² + 8', startX:-3, goalX:3,
      // fn(-3)=-1 → ball at (-3,-1); fn(3)=-1→C
      explanation:{ es:'f(3) = −9+8 = −1 → Zona C (−2 ≤ y < 0)', en:'f(3) = −9+8 = −1 → Zone C (−2 ≤ y < 0)', ca:'f(3) = −9+8 = −1 → Zona C (−2 ≤ y < 0)' } },
    { id:'h8', fn: x => x*x-x-7,
      label:'f(x) = x² − x − 7', startX:-2, goalX:3,
      // fn(-2)=4+2-7=-1 → ball at (-2,-1); fn(3)=9-3-7=-1→C
      explanation:{ es:'f(3) = 9−3−7 = −1 → Zona C (−2 ≤ y < 0)', en:'f(3) = 9−3−7 = −1 → Zone C (−2 ≤ y < 0)', ca:'f(3) = 9−3−7 = −1 → Zona C (−2 ≤ y < 0)' } },
    { id:'h9', fn: x => -(x*x)+x+5,
      label:'f(x) = −x² + x + 5', startX:-1, goalX:3,
      // fn(-1)=-1-1+5=3 → ball at (-1,3); fn(3)=-9+3+5=-1→C
      explanation:{ es:'f(3) = −9+3+5 = −1 → Zona C (−2 ≤ y < 0)', en:'f(3) = −9+3+5 = −1 → Zone C (−2 ≤ y < 0)', ca:'f(3) = −9+3+5 = −1 → Zona C (−2 ≤ y < 0)' } },

    // Zone D
    { id:'h10', fn: x => -(x*x)+6,
      label:'f(x) = −x² + 6', startX:-3, goalX:3,
      // fn(-3)=-3 → ball at (-3,-3); fn(3)=-3→D
      explanation:{ es:'f(3) = −9+6 = −3 → Zona D (y < −2)', en:'f(3) = −9+6 = −3 → Zone D (y < −2)', ca:'f(3) = −9+6 = −3 → Zona D (y < −2)' } },
    { id:'h11', fn: x => -(x*x)+x+3,
      label:'f(x) = −x² + x + 3', startX:-2, goalX:3,
      // fn(-2)=-4-2+3=-3 → ball at (-2,-3); fn(3)=-9+3+3=-3→D
      explanation:{ es:'f(3) = −9+3+3 = −3 → Zona D (y < −2)', en:'f(3) = −9+3+3 = −3 → Zone D (y < −2)', ca:'f(3) = −9+3+3 = −3 → Zona D (y < −2)' } },
    { id:'h12', fn: x => 0.5*x*x-x-4,
      label:'f(x) = x²/2 − x − 4', startX:-2, goalX:3,
      // fn(-2)=2+2-4=0 → ball at (-2,0); fn(3)=4.5-3-4=-2.5→D
      explanation:{ es:'f(3) = 9/2−3−4 = 4.5−7 = −2.5 → Zona D (y < −2)', en:'f(3) = 9/2−3−4 = 4.5−7 = −2.5 → Zone D (y < −2)', ca:'f(3) = 9/2−3−4 = 4.5−7 = −2.5 → Zona D (y < −2)' } },
  ],
}
