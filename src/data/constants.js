export const MAIN_CARDS = [
  {
    id: 'estudiar',
    title: 'Estudiar',
    subtitle: 'Temarios y tests por nivel',
    image: '/estudio.png',
    path: '/estudiar',
    accent: 'from-blue-600/80 to-indigo-900/60',
  },
  {
    id: 'juegos',
    title: 'Juegos',
    subtitle: 'Aprende jugando',
    image: '/juegos.png',
    path: '/juegos',
    accent: 'from-violet-600/80 to-purple-900/60',
  },
  {
    id: 'diaria',
    title: 'Pregunta Diaria',
    subtitle: 'Reto de hoy · Mantén tu racha',
    image: '/racha.png',
    path: '/diaria',
    accent: 'from-orange-500/80 to-rose-900/60',
  },
]

export const LEVELS = [
  { title: 'Primaria', subtitle: '6 - 12 años', emoji: '🎒', gradient: 'from-green-500 to-emerald-600', path: '/estudiar/primaria' },
  { title: 'ESO', subtitle: '12 - 16 años', emoji: '📖', gradient: 'from-blue-500 to-indigo-600', path: '/estudiar/eso' },
  { title: 'Bachillerato', subtitle: '16 - 18 años', emoji: '🎓', gradient: 'from-purple-600 to-violet-700', path: '/estudiar/bachillerato' },
]

export const SUBJECTS = [
  { title: 'Historia', subtitle: 'Eventos y épocas clave', emoji: '🏛️', gradient: 'from-amber-500 to-orange-600', ready: true },
  { title: 'Geografía', subtitle: 'Mapas, ríos y capitales', emoji: '🌍', gradient: 'from-teal-500 to-cyan-600', ready: false },
  { title: 'Ciencias', subtitle: 'Biología, física y química', emoji: '🔬', gradient: 'from-green-500 to-emerald-600', ready: false },
  { title: 'Matemáticas', subtitle: 'Cálculo mental: sumas, restas y más', emoji: '📐', gradient: 'from-blue-500 to-indigo-600', ready: true },
  { title: 'Inglés', subtitle: 'Vocabulario y gramática', emoji: '🇬🇧', gradient: 'from-rose-500 to-pink-600', ready: false },
  { title: 'Lengua', subtitle: 'Literatura y ortografía', emoji: '✍️', gradient: 'from-violet-500 to-purple-600', ready: false },
]

export const GAMES = [
  { title: 'Tuthor Time', subtitle: 'Viajero del tiempo', emoji: '🕰️', gradient: 'from-amber-500 to-orange-600', ready: true, path: '/juegos/tuthor-time' },
  { title: 'Línea Temporal', subtitle: 'Ordena la historia', emoji: '📜', gradient: 'from-emerald-500 to-teal-700', ready: true, path: '/juegos/linea-temporal' },
  { title: '¿Quién es quién?', subtitle: 'Adivina el personaje', emoji: '🕵️', gradient: 'from-violet-600 to-purple-800', ready: true, path: '/juegos/quien-es-quien' },
  { title: 'GeoRush', subtitle: 'Capitales del mundo', emoji: '🌍', gradient: 'from-teal-400 to-cyan-600', ready: false },
  { title: 'Acércate', subtitle: 'Llega al número objetivo', emoji: '🎯', gradient: 'from-pink-500 to-rose-600', ready: true, path: '/juegos/acercate' },
  { title: 'WordBattle', subtitle: 'Vocabulario en inglés', emoji: '🔤', gradient: 'from-blue-500 to-indigo-600', ready: false },
  { title: 'SciQuiz', subtitle: 'Ciencias naturales', emoji: '🔬', gradient: 'from-green-500 to-emerald-600', ready: false },
  { title: 'ChronoMap', subtitle: 'Geografía histórica', emoji: '🗺️', gradient: 'from-purple-500 to-violet-600', ready: false },
  { title: 'NumSpeed', subtitle: 'Cálculo mental rápido', emoji: '⚡', gradient: 'from-yellow-500 to-orange-500', ready: false },
  { title: 'LinguaRun', subtitle: 'Idiomas al sprint', emoji: '🏃', gradient: 'from-cyan-500 to-blue-600', ready: false },
  { title: 'AtomQuest', subtitle: 'Química elemental', emoji: '⚛️', gradient: 'from-rose-500 to-red-600', ready: false },
  { title: 'EcoWorld', subtitle: 'Medio ambiente', emoji: '🌱', gradient: 'from-emerald-500 to-green-700', ready: false },
  { title: 'ArtMaster', subtitle: 'Historia del arte', emoji: '🎨', gradient: 'from-fuchsia-500 to-pink-600', ready: false },
  { title: 'PhysicsX', subtitle: 'Física aplicada', emoji: '🚀', gradient: 'from-slate-500 to-slate-700', ready: false },
]
