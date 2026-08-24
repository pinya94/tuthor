// ── Registro central de juegos ───────────────────────────────────────────────
// Fuente única de verdad para todo juego que guarda stats (saveActivity).
// La clave es el `game` id usado en Firestore (users/*/stats, leaderboards).
//
// Para añadir un juego nuevo:
//   1. Añade una entrada aquí (label, emoji, subject, coins).
//   2. En la página del juego: computeCoins(id, result) → saveActivity + CoinsAnimation.
// Con eso el juego aparece en el perfil y reparte monedas de forma consistente.
//
// `coins(result)` recibe lo que el juego sepa de la partida (score, correct,
// total, diff...) y devuelve las monedas ganadas. saveActivity aplica un tope
// global de 500 como red de seguridad.

const DEFAULT_COINS = ({ score }) => Math.min(Math.floor((score || 0) / 10), 200)

export const GAMES = {
  'tuthor-time': {
    label: { es: 'Tuthor Time', en: 'Tuthor Time', ca: 'Tuthor Time' },
    emoji: '🕰️',
    subject: 'historia',
    route: '/juegos/tuthor-time',
    // iframe externo sin puntuación: recompensa el tiempo de estudio
    // (5 monedas/min, tope 100) para que jugarlo no sea el único juego
    // del catálogo que "no renta".
    coins: ({ timeSpent = 0 } = {}) => Math.min(Math.floor(timeSpent / 60) * 5, 100),
  },
  'tuthor-time-roguelike': {
    label: { es: 'Tuthor Time Roguelike', en: 'Tuthor Time RL', ca: 'Tuthor Time Roguelike' },
    emoji: '⚡',
    subject: 'historia',
    route: '/juegos/tuthor-time',
    coins: DEFAULT_COINS,
  },
  'orden-temporal': {
    label: { es: 'Línea Temporal', en: 'Timeline', ca: 'Línia Temporal' },
    emoji: '📜',
    subject: 'historia',
    route: '/juegos/linea-temporal',
    coins: DEFAULT_COINS,
  },
  'quien-es-quien': {
    label: { es: '¿Quién es Quién?', en: 'Who is Who?', ca: 'Qui és qui?' },
    emoji: '🕵️',
    subject: 'historia',
    route: '/juegos/quien-es-quien',
    coins: DEFAULT_COINS,
  },
  'portadas': {
    label: { es: 'Portadas', en: 'Headlines', ca: 'Portades' },
    emoji: '📰',
    subject: 'historia',
    route: '/juegos/portadas',
    coins: DEFAULT_COINS,
  },
  'georush': {
    label: { es: 'GeoRush', en: 'GeoRush', ca: 'GeoRush' },
    emoji: '🌍',
    subject: 'geografia',
    route: '/juegos/georush',
    coins: DEFAULT_COINS,
  },
  'geomapa': {
    label: { es: 'GeoMapa', en: 'GeoMap', ca: 'GeoMapa' },
    emoji: '🗺️',
    subject: 'geografia',
    route: '/juegos/geomapa',
    coins: DEFAULT_COINS,
  },
  'matematicas': {
    label: { es: 'Cálculo Mental', en: 'Mental Maths', ca: 'Càlcul Mental' },
    emoji: '🧮',
    subject: 'matematicas',
    route: '/estudiar/matematicas',
    coins: DEFAULT_COINS,
  },
  'acercate-clasico': {
    label: { es: 'Acércate (Clásico)', en: 'Target Number', ca: "Acosta't (Clàssic)" },
    emoji: '🎯',
    subject: 'matematicas',
    route: '/juegos/acercate',
    // diff = distancia al objetivo: exacto 100, cerca 50, lejos 0
    coins: ({ diff }) => (diff === 0 ? 100 : diff <= 2 ? 50 : 0),
  },
  'acercate-roguelike': {
    label: { es: 'Acércate (Roguelike)', en: 'Target Number RL', ca: "Acosta't (Roguelike)" },
    emoji: '🎲',
    subject: 'matematicas',
    route: '/juegos/acercate',
    coins: DEFAULT_COINS,
  },
  'numpath': {
    label: { es: 'NumPath', en: 'NumPath', ca: 'NumPath' },
    emoji: '🔢',
    subject: 'matematicas',
    route: '/juegos/numpath',
    coins: DEFAULT_COINS,
  },
  'reparte-pastel': {
    label: { es: 'Reparte el Pastel', en: 'Slice the Cake', ca: 'Reparteix el Pastís' },
    emoji: '🍰',
    subject: 'matematicas',
    route: '/juegos/reparte-pastel',
    coins: DEFAULT_COINS,
  },
  'trayectoria': {
    label: { es: 'Trayectoria', en: 'Trajectory', ca: 'Trajectòria' },
    emoji: '⚽',
    subject: 'matematicas',
    route: '/juegos/trayectoria',
    coins: DEFAULT_COINS,
  },
  'portero': {
    label: { es: 'El Portero', en: 'The Goalkeeper', ca: 'El Porter' },
    emoji: '🥅',
    subject: 'matematicas',
    route: '/juegos/portero',
    coins: DEFAULT_COINS,
  },
  'intruso': {
    label: { es: 'El Intruso', en: 'The Odd One Out', ca: "L'Intrús" },
    emoji: '🔍',
    subject: 'lengua',
    route: '/juegos/intruso',
    // % de aciertos sobre 150 monedas máx
    coins: ({ correct, total }) => (total > 0 ? Math.round((correct / total) * 150) : 0),
  },
  'pentagrama-path': {
    label: { es: 'Pentagrama Path', en: 'Pentagrama Path', ca: 'Pentagrama Path' },
    emoji: '🎼',
    subject: 'musica',
    route: '/juegos/pentagrama-path',
    // puntos por nota leída (100 máx/nota, con multiplicador de racha) → hasta 200 monedas
    coins: DEFAULT_COINS,
  },
  'spicy': {
    label: { es: 'Spicy', en: 'Spicy', ca: 'Spicy' },
    emoji: '🌶️',
    subject: 'economia',
    route: '/juegos/spicy',
    // nota financiera 0-10000 → hasta 200 monedas con nota ≥ 2000
    coins: DEFAULT_COINS,
  },
  'reaccion': {
    label: { es: 'Reacción', en: 'Reacción', ca: 'Reacció' },
    emoji: '🚑',
    subject: 'vida-practica',
    route: '/juegos/reaccion',
    // puntuación / 5 (tope 200), menos 15 monedas por cada decisión peligrosa
    coins: ({ score = 0, peligrosas = 0 } = {}) => Math.min(score / 5, 200) - peligrosas * 15,
  },
  'fuerza-neta': {
    label: { es: 'Fuerza Neta', en: 'Net Force', ca: 'Força Neta' },
    emoji: '🧭',
    subject: 'fisica',
    route: '/juegos/fuerza-neta',
    // aciertos × 10 puntos → hasta 200 monedas
    coins: ({ score = 0 } = {}) => Math.min(Math.floor(score / 10), 200),
  },
  'balanza': {
    label: { es: 'Balanza', en: 'Balance', ca: 'Balança' },
    emoji: '⚖️',
    subject: 'fisica',
    route: '/juegos/balanza',
    // aciertos × 10 puntos → hasta 200 monedas
    coins: ({ score = 0 } = {}) => Math.min(Math.floor(score / 10), 200),
  },
  'circuito-cerrado': {
    label: { es: 'Circuito Cerrado', en: 'Circuit Complete', ca: 'Circuit Complet' },
    emoji: '💡',
    subject: 'fisica',
    route: '/juegos/circuito-cerrado',
    // aciertos × 10 puntos → hasta 200 monedas
    coins: ({ score = 0 } = {}) => Math.min(Math.floor(score / 10), 200),
  },
  'analiza-frases': {
    label: { es: 'Analiza la Frase', en: 'Sentence Detective', ca: 'Analitza la Frase' },
    emoji: '🧐',
    subject: 'lengua',
    route: '/juegos/analiza-frases',
    // aciertos × 10 puntos → hasta 200 monedas
    coins: ({ score = 0 } = {}) => Math.min(Math.floor(score / 10), 200),
  },
  'balanza-ecuaciones': {
    label: { es: 'Átomos en Equilibrio', en: 'Atoms in Balance', ca: 'Àtoms en Equilibri' },
    emoji: '⚗️',
    subject: 'quimica',
    route: '/juegos/balanza-ecuaciones',
    // aciertos × 10 puntos → hasta 200 monedas
    coins: ({ score = 0 } = {}) => Math.min(Math.floor(score / 10), 200),
  },
  'encuentra-elemento': {
    label: { es: 'Encuentra el Elemento', en: 'Find the Element', ca: 'Troba l\'Element' },
    emoji: '🔬',
    subject: 'quimica',
    route: '/juegos/encuentra-elemento',
    // aciertos × 10 puntos → hasta 200 monedas
    coins: ({ score = 0 } = {}) => Math.min(Math.floor(score / 10), 200),
  },
  'funciones-grafica': {
    label: { es: 'Caza la Función', en: 'Function Hunt', ca: 'Caça la Funció' },
    emoji: '📈',
    subject: 'matematicas',
    route: '/juegos/funciones-grafica',
    // aciertos × 10 puntos → hasta 200 monedas
    coins: ({ score = 0 } = {}) => Math.min(Math.floor(score / 10), 200),
  },
  // 'genetica' ya es el id del examen teórico de biología (exams.js), así que
  // el juego lleva sufijo para no pisarle las stats.
  'genetica-juego': {
    label: { es: 'Genética', en: 'Genetics', ca: 'Genètica' },
    emoji: '🧬',
    subject: 'biologia',
    route: '/juegos/genetica',
    // aciertos × 10 puntos → hasta 200 monedas
    coins: ({ score = 0 } = {}) => Math.min(Math.floor(score / 10), 200),
  },
  'ordena-frase': {
    label: { es: 'Ordena la Frase', en: 'Word Order', ca: 'Ordena la Frase' },
    emoji: '🔤',
    subject: 'ingles',
    route: '/juegos/ordena-frase',
    // aciertos × 10 puntos → hasta 200 monedas
    coins: ({ score = 0 } = {}) => Math.min(Math.floor(score / 10), 200),
  },
  'balanza-algebraica': {
    label: { es: 'Balanza Algebraica', en: 'Algebra Balance', ca: 'Balança Algebraica' },
    emoji: '⚖️',
    subject: 'matematicas',
    route: '/juegos/balanza-algebraica',
    // aciertos × 10 puntos → hasta 200 monedas
    coins: ({ score = 0 } = {}) => Math.min(Math.floor(score / 10), 200),
  },
  'epocas-historicas': {
    label: { es: '¿Qué Época Es?', en: 'What Era Is This?', ca: 'Quina Època És?' },
    emoji: '🏺',
    subject: 'historia',
    route: '/juegos/epocas-historicas',
    // aciertos × 10 puntos → hasta 200 monedas
    coins: ({ score = 0 } = {}) => Math.min(Math.floor(score / 10), 200),
  },
  'orbita': {
    label: { es: 'Órbita', en: 'Orbit', ca: 'Òrbita' },
    emoji: '🛰️',
    subject: 'geologia',
    route: '/juegos/orbita',
    // aciertos × 10 puntos → hasta 200 monedas
    coins: ({ score = 0 } = {}) => Math.min(Math.floor(score / 10), 200),
  },
  'coordenadas': {
    label: { es: 'Coordenadas', en: 'Coordinates', ca: 'Coordenades' },
    emoji: '🌐',
    subject: 'geografia',
    route: '/juegos/coordenadas',
    // aciertos × 10 puntos → hasta 200 monedas
    coins: ({ score = 0 } = {}) => Math.min(Math.floor(score / 10), 200),
  },
  'rayos-x': {
    label: { es: 'Rayos X', en: 'X-Ray', ca: 'Raigs X' },
    emoji: '🧠',
    subject: 'biologia',
    route: '/juegos/rayos-x',
    // aciertos × 10 puntos → hasta 200 monedas
    coins: ({ score = 0 } = {}) => Math.min(Math.floor(score / 10), 200),
  },
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function isKnownGame(id) {
  return Boolean(GAMES[id])
}

export function gameLabel(id, lang = 'es') {
  const g = GAMES[id]
  if (!g) return id
  return g.label[lang] ?? g.label.es
}

export function gameEmoji(id) {
  return GAMES[id]?.emoji ?? '🎮'
}

// Calcula las monedas de una partida. Única fuente de verdad: el mismo valor
// se pasa a saveActivity (coinsEarned) y a <CoinsAnimation coins={...} />.
export function computeCoins(id, result = {}) {
  const g = GAMES[id]
  const raw = g ? g.coins(result) : DEFAULT_COINS(result)
  return Math.min(Math.max(0, Math.round(raw || 0)), 500)
}
