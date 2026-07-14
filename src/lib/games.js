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
    coins: () => 0, // iframe externo: solo registra tiempo
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
  'una-vida': {
    label: { es: 'Una Vida', en: 'One Life', ca: 'Una Vida' },
    emoji: '⏳',
    subject: 'economia',
    route: '/juegos/una-vida',
    // nota financiera 0-10000 → hasta 200 monedas con nota ≥ 2000
    coins: DEFAULT_COINS,
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
