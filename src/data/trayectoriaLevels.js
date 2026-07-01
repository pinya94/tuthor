// Trayectoria — question pools
// startX = 0 for all levels → ball always at (0, 0).
// The trajectory follows fn(x) for x ≥ 0, starting from the ball.
// Goal calibration: correct fn(goal.x) ∈ [goal.yMin, goal.yMax]
// Wrong options: their fn(goal.x) must NOT be in that range

// ── EASY: slopes through origin (fn(0)=0 → no jump at ball) ──────────────────
export const EASY = [
  {
    id: 'e1',
    // ½x at x=4 → 2. Goal: [1.5, 3]
    options: [
      { label: 'f(x) = ½x',  fn: x => 0.5 * x },  // f(4)=2   ✓
      { label: 'f(x) = 2x',  fn: x => 2 * x },     // f(4)=8   ✗
      { label: 'f(x) = −½x', fn: x => -0.5 * x },  // f(4)=-2  ✗
      { label: 'f(x) = x',   fn: x => x },          // f(4)=4   ✗
    ],
    correctIndex: 0,
    startX: 1,
    barriers: [{ x: 2, y: 4 }, { x: 3, y: -3 }],
    goal: { x: 4, yMin: 1.5, yMax: 3 },
    explanation: {
      goal: { es: '¡Gol! f(x)=½x tiene pendiente suave positiva. En x=4, f(4)=2, que entra en la portería.', en: 'Goal! f(x)=½x has a gentle positive slope. At x=4, f(4)=2, entering the goal.', ca: 'Gol! f(x)=½x té pendent positiu suau. A x=4, f(4)=2, entrant a la porteria.' },
      miss:  { es: 'Esa pendiente hace que la pelota pase por encima o por debajo de la portería.',              en: 'That slope sends the ball above or below the goal.',                       ca: 'Aquella pendent fa que la pilota passi per sobre o per sota.' },
      collision: { es: 'Esa pendiente lleva la pelota directo a un defensor.',                                  en: 'That slope sends the ball straight into a defender.',                      ca: 'Aquella pendent porta la pilota a un defensor.' },
    },
  },
  {
    id: 'e2',
    // −x at x=4 → −4. Goal: [−5, −3]
    options: [
      { label: 'f(x) = −x',   fn: x => -x },        // f(4)=-4  ✓
      { label: 'f(x) = x',    fn: x => x },          // f(4)=4   ✗
      { label: 'f(x) = −2x',  fn: x => -2 * x },    // f(4)=-8  ✗
      { label: 'f(x) = −½x',  fn: x => -0.5 * x },  // f(4)=-2  ✗
    ],
    correctIndex: 0,
    startX: 1,
    barriers: [{ x: 1, y: 2 }, { x: 3, y: 3 }],
    goal: { x: 4, yMin: -5, yMax: -3 },
    explanation: {
      goal: { es: '¡Gol! f(x)=−x baja con pendiente −1. En x=4, f(4)=−4, en la portería baja.',  en: 'Goal! f(x)=−x falls with slope −1. At x=4, f(4)=−4, in the low goal.',  ca: 'Gol! f(x)=−x baixa amb pendent −1. A x=4, f(4)=−4, a la porteria baixa.' },
      miss:  { es: 'Esa pendiente no llega a la portería baja.',                                   en: 'That slope misses the low goal.',                                          ca: 'Aquella pendent no arriba a la porteria baixa.' },
      collision: { es: 'Chocaste con un defensor.',                                               en: 'Hit a defender.',                                                         ca: 'Has xocat amb un defensor.' },
    },
  },
  {
    id: 'e3',
    // 1.5x at x=3 → 4.5. Goal: [4, 5.5]
    options: [
      { label: 'f(x) = 1.5x', fn: x => 1.5 * x },  // f(3)=4.5  ✓
      { label: 'f(x) = 0.5x', fn: x => 0.5 * x },  // f(3)=1.5  ✗
      { label: 'f(x) = 3x',   fn: x => 3 * x },    // f(3)=9    ✗
      { label: 'f(x) = −1.5x',fn: x => -1.5 * x }, // f(3)=-4.5 ✗
    ],
    correctIndex: 0,
    startX: 1,
    barriers: [{ x: 1, y: -1 }, { x: 2, y: -2 }],
    goal: { x: 3, yMin: 4, yMax: 5.5 },
    explanation: {
      goal: { es: '¡Gol! f(x)=1.5x sube con pendiente 1.5. En x=3, f(3)=4.5, en la portería alta.', en: 'Goal! f(x)=1.5x climbs with slope 1.5. At x=3, f(3)=4.5, in the high goal.', ca: 'Gol! f(x)=1.5x puja amb pendent 1.5. A x=3, f(3)=4.5, a la porteria alta.' },
      miss:  { es: 'Esa pendiente no llega a la portería alta.',                                       en: 'That slope misses the high goal.',                                            ca: 'Aquella pendent no arriba a la porteria alta.' },
      collision: { es: 'Chocaste con un defensor.',                                                   en: 'Hit a defender.',                                                            ca: 'Has xocat amb un defensor.' },
    },
  },
  {
    id: 'e4',
    // 0 (horizontal) at x=4 → 0. Goal: [−0.8, 0.8]
    // at startX=1: A=0, B=0.5, C=1, D=-0.5 — all distinct
    options: [
      { label: 'f(x) = 0',   fn: () => 0 },        // f(4)=0    ✓
      { label: 'f(x) = ½x',  fn: x => 0.5 * x },   // f(4)=2    ✗
      { label: 'f(x) = x',   fn: x => x },          // f(4)=4    ✗
      { label: 'f(x) = −½x', fn: x => -0.5 * x },  // f(4)=-2   ✗
    ],
    correctIndex: 0,
    startX: 1,
    barriers: [{ x: 2, y: 2 }, { x: 3, y: -2 }],
    goal: { x: 4, yMin: -0.8, yMax: 0.8 },
    explanation: {
      goal: { es: '¡Gol! La función constante f(x)=0 va recto por el eje X y entra en el centro de la portería.', en: 'Goal! The constant f(x)=0 goes straight along the X axis into the centre of the goal.', ca: 'Gol! La funció constant f(x)=0 va recte per l\'eix X fins al centre de la porteria.' },
      miss:  { es: 'Esa función sube o baja, la pelota no entra en la portería centrada.',                         en: 'That function rises or falls, missing the centred goal.',                               ca: 'Aquella funció puja o baixa, la pilota no entra per la porteria centrada.' },
      collision: { es: 'Chocaste con un defensor.',                                                                en: 'Hit a defender.',                                                                      ca: 'Has xocat amb un defensor.' },
    },
  },
  {
    id: 'e5',
    // −½x at x=4 → −2. Goal: [−2.5, −1]
    options: [
      { label: 'f(x) = −½x', fn: x => -0.5 * x },  // f(4)=-2  ✓
      { label: 'f(x) = ½x',  fn: x => 0.5 * x },   // f(4)=2   ✗
      { label: 'f(x) = −2x', fn: x => -2 * x },    // f(4)=-8  ✗
      { label: 'f(x) = −x',  fn: x => -x },         // f(4)=-4  ✗
    ],
    correctIndex: 0,
    startX: 1,
    barriers: [{ x: 1, y: 3 }, { x: 3, y: -4 }],
    goal: { x: 4, yMin: -2.5, yMax: -1 },
    explanation: {
      goal: { es: '¡Gol! f(x)=−½x desciende suavemente. En x=4, f(4)=−2, entrando en la portería baja.', en: 'Goal! f(x)=−½x descends gently. At x=4, f(4)=−2, entering the low goal.', ca: 'Gol! f(x)=−½x baixa suaument. A x=4, f(4)=−2, entrant a la porteria baixa.' },
      miss:  { es: 'Esa pendiente no llega donde está la portería.',                                      en: 'That slope misses the goal.',                                                   ca: 'Aquella pendent no arriba on és la porteria.' },
      collision: { es: 'Chocaste con un defensor.',                                                      en: 'Hit a defender.',                                                              ca: 'Has xocat amb un defensor.' },
    },
  },
]

// ── MEDIUM: lines with y-intercept (ball at (0,0), fn(0)=intercept) ───────────
export const MEDIUM = [
  {
    id: 'm1',
    // ½x−1 at x=5 → 1.5. Goal: [1, 2]
    // fn(0)=−1: ball is at y=0 but line starts at y=−1 → small jump down
    options: [
      { label: 'f(x) = ½x − 1',  fn: x => 0.5 * x - 1 },  // f(5)=1.5  ✓
      { label: 'f(x) = 2x − 1',  fn: x => 2 * x - 1 },    // f(5)=9    ✗
      { label: 'f(x) = ½x + 1',  fn: x => 0.5 * x + 1 },  // f(5)=3.5  ✗
      { label: 'f(x) = −½x − 1', fn: x => -0.5 * x - 1 }, // f(5)=-3.5 ✗
    ],
    correctIndex: 0,
    startX: 1,
    barriers: [{ x: 2, y: 4 }, { x: 3, y: 4 }],
    goal: { x: 5, yMin: 1, yMax: 2 },
    explanation: {
      goal: { es: '¡Gol! f(x)=½x−1 tiene pendiente ½ y corte −1. En x=5, f(5)=1.5, entrando en la portería.', en: 'Goal! f(x)=½x−1 has slope ½ and y-intercept −1. At x=5, f(5)=1.5, entering the goal.', ca: 'Gol! f(x)=½x−1 té pendent ½ i tall −1. A x=5, f(5)=1.5, entrant a la porteria.' },
      miss:  { es: 'La pendiente o el corte Y incorrecto manda la pelota fuera.',                              en: 'Wrong slope or intercept sends the ball out.',                                            ca: 'Pendent o tall Y incorrecte fa que la pilota surti fora.' },
      collision: { es: 'Esa función pasa por un defensor.',                                                   en: 'That function passes through a defender.',                                               ca: 'Aquella funció passa per un defensor.' },
    },
  },
  {
    id: 'm2',
    // −x+2 at x=4 → −2. Goal: [−3, −1]
    options: [
      { label: 'f(x) = −x + 2',  fn: x => -x + 2 },     // f(4)=-2  ✓
      { label: 'f(x) = x + 2',   fn: x => x + 2 },      // f(4)=6   ✗
      { label: 'f(x) = −x − 2',  fn: x => -x - 2 },     // f(4)=-6  ✗
      { label: 'f(x) = −2x + 2', fn: x => -2 * x + 2 }, // f(4)=-6  ✗
    ],
    correctIndex: 0,
    startX: 1,
    barriers: [{ x: 1, y: 4 }, { x: 2, y: 1 }],
    goal: { x: 4, yMin: -3, yMax: -1 },
    explanation: {
      goal: { es: '¡Gol! f(x)=−x+2 baja con pendiente −1. En x=4, f(4)=−2, en la portería baja.', en: 'Goal! f(x)=−x+2 falls with slope −1. At x=4, f(4)=−2, in the low goal.', ca: 'Gol! f(x)=−x+2 baixa amb pendent −1. A x=4, f(4)=−2, a la porteria baixa.' },
      miss:  { es: 'Fijate en el signo del corte: +2 significa que la recta cruza el eje Y en y=2.',         en: 'Note the intercept sign: +2 means the line crosses the Y axis at y=2.',              ca: 'Fixa\'t en el signe del tall: +2 significa que la recta creua l\'eix Y a y=2.' },
      collision: { es: 'Chocaste con un defensor.',                                                          en: 'Hit a defender.',                                                                    ca: 'Has xocat amb un defensor.' },
    },
  },
  {
    id: 'm3',
    // ½x+1 at x=2 → 2. Goal: [1.7, 2.4]
    // x+1 at x=2 → 3 ✗ (outside goal)
    options: [
      { label: 'f(x) = ½x + 1',  fn: x => 0.5 * x + 1 },  // f(2)=2   ✓
      { label: 'f(x) = ½x − 1',  fn: x => 0.5 * x - 1 },  // f(2)=0   ✗
      { label: 'f(x) = x + 1',   fn: x => x + 1 },         // f(2)=3   ✗
      { label: 'f(x) = −½x + 1', fn: x => -0.5 * x + 1 }, // f(2)=0   ✗
    ],
    correctIndex: 0,
    startX: 1,
    barriers: [{ x: 1, y: -2 }, { x: 1.5, y: -1 }],
    goal: { x: 2, yMin: 1.7, yMax: 2.4 },
    explanation: {
      goal: { es: '¡Gol! f(x)=½x+1 tiene corte +1. En x=2, f(2)=2, en la portería. El corte Y eleva la trayectoria.', en: 'Goal! f(x)=½x+1 has intercept +1. At x=2, f(2)=2, in the goal. The y-intercept lifts the trajectory.', ca: 'Gol! f(x)=½x+1 té tall +1. A x=2, f(2)=2, a la porteria. El tall Y eleva la trajectòria.' },
      miss:  { es: 'El corte Y cambia el punto de partida vertical. ½x−1 comienza más abajo, ½x+1 más arriba.',        en: 'The y-intercept shifts the start height. ½x−1 starts lower, ½x+1 starts higher.',              ca: 'El tall Y canvia el punt de partida vertical.' },
      collision: { es: 'Chocaste con un defensor.',                                                                    en: 'Hit a defender.',                                                                          ca: 'Has xocat amb un defensor.' },
    },
  },
  {
    id: 'm4',
    // −½x+1 at x=4 → −1. Goal: [−1.5, −0.5]
    options: [
      { label: 'f(x) = −½x + 1', fn: x => -0.5 * x + 1 }, // f(4)=-1  ✓
      { label: 'f(x) = ½x + 1',  fn: x => 0.5 * x + 1 },  // f(4)=3   ✗
      { label: 'f(x) = −½x − 1', fn: x => -0.5 * x - 1 }, // f(4)=-3  ✗
      { label: 'f(x) = −x + 1',  fn: x => -x + 1 },        // f(4)=-3  ✗
    ],
    correctIndex: 0,
    startX: 1,
    barriers: [{ x: 2, y: 3 }, { x: 3, y: -3 }],
    goal: { x: 4, yMin: -1.5, yMax: -0.5 },
    explanation: {
      goal: { es: '¡Gol! f(x)=−½x+1 baja suavemente. En x=4, f(4)=−1, en la portería. El corte +1 eleva la salida.', en: 'Goal! f(x)=−½x+1 descends gently. At x=4, f(4)=−1, in the goal.', ca: 'Gol! f(x)=−½x+1 baixa suaument. A x=4, f(4)=−1, a la porteria.' },
      miss:  { es: 'El corte Y y la pendiente deben ser exactos: −½ y +1.',                                            en: 'The y-intercept and slope must both be right: −½ and +1.',              ca: 'El tall Y i la pendent han de ser exactes: −½ i +1.' },
      collision: { es: 'Chocaste con un defensor.',                                                                   en: 'Hit a defender.',                                                       ca: 'Has xocat amb un defensor.' },
    },
  },
  {
    id: 'm5',
    // 2x−2 at x=3 → 4. Goal: [3.5, 4.6]
    // 2x−1 at x=3 → 5 ✗ (outside [3.5, 4.6])
    options: [
      { label: 'f(x) = 2x − 2', fn: x => 2 * x - 2 },  // f(3)=4  ✓
      { label: 'f(x) = 2x + 2', fn: x => 2 * x + 2 },  // f(3)=8  ✗
      { label: 'f(x) = x − 2',  fn: x => x - 2 },      // f(3)=1  ✗
      { label: 'f(x) = 2x − 1', fn: x => 2 * x - 1 },  // f(3)=5  ✗
    ],
    correctIndex: 0,
    startX: 1,
    barriers: [{ x: 1, y: 4 }, { x: 2, y: -1 }],
    goal: { x: 3, yMin: 3.5, yMax: 4.6 },
    explanation: {
      goal: { es: '¡Gol! f(x)=2x−2 tiene pendiente 2 y corte −2. En x=3, f(3)=4, en la portería alta.', en: 'Goal! f(x)=2x−2 has slope 2 and intercept −2. At x=3, f(3)=4, in the high goal.', ca: 'Gol! f(x)=2x−2 té pendent 2 i tall −2. A x=3, f(3)=4, a la porteria alta.' },
      miss:  { es: 'Cambia el corte: −2 hace que la recta empiece baja y llegue justo a la portería.',        en: 'The intercept matters: −2 starts low and reaches exactly the goal.',                    ca: 'El tall importa: −2 comença baix i arriba just a la porteria.' },
      collision: { es: 'Chocaste con un defensor.',                                                           en: 'Hit a defender.',                                                                      ca: 'Has xocat amb un defensor.' },
    },
  },
]

// ── HARD: curves with startX=0 ────────────────────────────────────────────────
export const HARD = [
  {
    id: 'h1',
    // −0.3x²+2 at x=3 → −0.7. Goal: [−1.5, 0.2]
    options: [
      { label: 'f(x) = −0.3x² + 2', fn: x => -0.3 * x * x + 2 }, // f(3)=-0.7 ✓
      { label: 'f(x) = 0.3x² + 2',  fn: x => 0.3 * x * x + 2 },  // f(3)=4.7  ✗
      { label: 'f(x) = −0.3x² − 2', fn: x => -0.3 * x * x - 2 }, // f(3)=-4.7 ✗
      { label: 'f(x) = −x² + 2',    fn: x => -x * x + 2 },        // f(3)=-7   ✗
    ],
    correctIndex: 0,
    startX: 1,
    barriers: [{ x: 1, y: -1 }, { x: 2, y: -1 }],
    goal: { x: 3, yMin: -1.5, yMax: 0.2 },
    explanation: {
      goal: { es: '¡Gol! −0.3x²+2 abre hacia abajo. En x=3, f(3)=−0.7, en la portería. La parábola cruza el eje X cerca de x=2.58.', en: 'Goal! −0.3x²+2 opens downward. At x=3, f(3)=−0.7, in the goal.', ca: 'Gol! −0.3x²+2 s\'obre cap avall. A x=3, f(3)=−0.7, a la porteria.' },
      miss:  { es: 'El signo del coeficiente de x² determina si la parábola abre hacia arriba o hacia abajo.',      en: "The x² coefficient's sign determines whether the parabola opens up or down.",              ca: 'El signe del coeficient de x² determina si la paràbola s\'obre cap amunt o cap avall.' },
      collision: { es: 'Esa parábola pasa por un defensor.',                                                        en: 'That parabola passes through a defender.',                                              ca: 'Aquella paràbola passa per un defensor.' },
    },
  },
  {
    id: 'h2',
    // 0.2x²−1 at x=5 → 4. Goal: [3.5, 4.6]
    options: [
      { label: 'f(x) = 0.2x² − 1', fn: x => 0.2 * x * x - 1 },  // f(5)=4    ✓
      { label: 'f(x) = 0.2x² + 1', fn: x => 0.2 * x * x + 1 },  // f(5)=6    ✗ (barely)
      { label: 'f(x) = −0.2x² − 1',fn: x => -0.2 * x * x - 1 }, // f(5)=-6   ✗
      { label: 'f(x) = x² − 1',    fn: x => x * x - 1 },          // f(5)=24   ✗
    ],
    correctIndex: 0,
    startX: 1,
    barriers: [{ x: 2, y: 4 }, { x: 3, y: -3 }],
    goal: { x: 5, yMin: 3.5, yMax: 4.6 },
    explanation: {
      goal: { es: '¡Gol! 0.2x²−1 abre hacia arriba. En x=5, f(5)=4, en la portería alta.', en: 'Goal! 0.2x²−1 opens upward. At x=5, f(5)=4, in the high goal.', ca: 'Gol! 0.2x²−1 s\'obre cap amunt. A x=5, f(5)=4, a la porteria alta.' },
      miss:  { es: 'Fíjate en el signo del x² y del término independiente: ambos importan.',  en: "Check both the x² sign and the constant: both matter.",                    ca: 'Fixa\'t en el signe de x² i el terme independent: tots dos importen.' },
      collision: { es: 'Chocaste con un defensor.',                                           en: 'Hit a defender.',                                                          ca: 'Has xocat amb un defensor.' },
    },
  },
  {
    id: 'h3',
    // |x−3| at x=5 → 2. Goal: [1.5, 2.8] — width 1.3, clearly visible
    // at startX=1: A=2, B=0, C=4, D=3 — all distinct & in range
    options: [
      { label: 'f(x) = |x − 3|', fn: x => Math.abs(x - 3) }, // f(5)=2 ✓
      { label: 'f(x) = |x − 1|', fn: x => Math.abs(x - 1) }, // f(5)=4 ✗
      { label: 'f(x) = |x − 5|', fn: x => Math.abs(x - 5) }, // f(5)=0 ✗
      { label: 'f(x) = |x − 4|', fn: x => Math.abs(x - 4) }, // f(5)=1 ✗
    ],
    correctIndex: 0,
    startX: 1,
    barriers: [{ x: 3, y: 2.3 }, { x: 4, y: 3.2 }],
    goal: { x: 5, yMin: 1.5, yMax: 2.8 },
    explanation: {
      goal: { es: '¡Gol! |x−3| tiene vértice en x=3. En x=5: |5−3|=2, entrando en la portería. El vértice determina dónde la V cambia de dirección.', en: 'Goal! |x−3| has its vertex at x=3. At x=5: |5−3|=2, entering the goal.', ca: 'Gol! |x−3| té vèrtex a x=3. A x=5: |5−3|=2, entrant a la porteria.' },
      miss:  { es: 'El número dentro del valor absoluto indica dónde está el vértice de la V. Cambia cuánto crece al llegar a la portería.', en: 'The number inside the absolute value sets the vertex of the V. It changes how much it grows by the goal.', ca: 'El nombre dins el valor absolut indica on és el vèrtex de la V.' },
      collision: { es: 'Chocaste con un defensor.',                                                                                             en: 'Hit a defender.',                                                                                       ca: 'Has xocat amb un defensor.' },
    },
  },
  {
    id: 'h4',
    // piecewise: x<1 → x+1, x≥1 → −½x+2.5. At x=5: f(5)=0. Goal: [−0.5, 1.5]
    options: [
      { label: 'x+1 (x<1) ; −½x+2.5 (x≥1)', fn: x => x < 1 ? x + 1 : -0.5 * x + 2.5 },
      { label: 'x+1 (x<1) ; ½x+2.5 (x≥1)',  fn: x => x < 1 ? x + 1 : 0.5 * x + 2.5 },   // f(5)=5   ✗
      { label: 'x−1 (x<1) ; −½x+2.5 (x≥1)', fn: x => x < 1 ? x - 1 : -0.5 * x + 2.5 },  // same ending but diff path
      { label: 'f(x) = x+1 para todo x',      fn: x => x + 1 },                              // f(5)=6   ✗
    ],
    correctIndex: 0,
    startX: 1,
    barriers: [{ x: 2, y: 4 }, { x: 3, y: -1 }],
    goal: { x: 5, yMin: -0.5, yMax: 1.5 },
    explanation: {
      goal: { es: '¡Gol! La función sube (x+1) para x<1, luego baja (−½x+2.5). En x=5: f(5)=0, en la portería.', en: 'Goal! The function rises (x+1) for x<1, then descends (−½x+2.5). At x=5: f(5)=0, in the goal.', ca: 'Gol! La funció puja (x+1) per x<1, després baixa (−½x+2.5). A x=5: f(5)=0, a la porteria.' },
      miss:  { es: 'Si el segundo tramo sube en vez de bajar, la pelota pasa muy por encima de la portería.',      en: 'If the second piece rises instead of falling, the ball sails way above the goal.',               ca: 'Si el segon tram puja en comptes de baixar, la pilota passa molt per sobre de la porteria.' },
      collision: { es: 'Una parte de la función te lleva a un defensor.',                                          en: 'One piece sends the ball into a defender.',                                                     ca: 'Un tram de la funció porta la pilota a un defensor.' },
    },
  },
  {
    id: 'h5',
    // x²−3x at x=4 → 4. Goal: [3.5, 5]
    options: [
      { label: 'f(x) = x² − 3x',  fn: x => x * x - 3 * x },   // f(4)=4   ✓
      { label: 'f(x) = x² + 3x',  fn: x => x * x + 3 * x },   // f(4)=28  ✗
      { label: 'f(x) = x² − 3',   fn: x => x * x - 3 },        // f(4)=13  ✗
      { label: 'f(x) = −x² + 3x', fn: x => -x * x + 3 * x },  // f(4)=-4  ✗
    ],
    correctIndex: 0,
    startX: 1,
    barriers: [{ x: 1, y: 4 }, { x: 2, y: -2 }],
    goal: { x: 4, yMin: 3.5, yMax: 5 },
    explanation: {
      goal: { es: '¡Gol! f(x)=x²−3x tiene raíces en x=0 y x=3. En x=4: f(4)=16−12=4, en la portería.', en: 'Goal! f(x)=x²−3x has roots at x=0 and x=3. At x=4: f(4)=16−12=4, in the goal.', ca: 'Gol! f(x)=x²−3x té arrels a x=0 i x=3. A x=4: f(4)=16−12=4, a la porteria.' },
      miss:  { es: 'Fíjate en el signo del término −3x: determina dónde la parábola corta el eje X.',         en: 'Note the −3x sign: it determines where the parabola crosses the X axis.',               ca: 'Fixa\'t en el signe del terme −3x: determina on la paràbola talla l\'eix X.' },
      collision: { es: 'Chocaste con un defensor.',                                                           en: 'Hit a defender.',                                                                     ca: 'Has xocat amb un defensor.' },
    },
  },
]

export const POOLS = { easy: EASY, medium: MEDIUM, hard: HARD }
