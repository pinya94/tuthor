export const MAIN_CARDS = [
  {
    id: 'estudiar',
    title: 'Estudiar', titleEn: 'Study',
    subtitle: 'Temarios y tests por nivel', subtitleEn: 'Topics & tests by level',
    image: '/estudio.png',
    path: '/estudiar',
    accent: 'from-blue-600/80 to-indigo-900/60',
  },
  {
    id: 'juegos',
    title: 'Juegos', titleEn: 'Games',
    subtitle: 'Aprende jugando', subtitleEn: 'Learn by playing',
    image: '/juegos.png',
    path: '/juegos',
    accent: 'from-violet-600/80 to-purple-900/60',
  },
  {
    id: 'diaria',
    title: 'Pregunta Diaria', titleEn: 'Daily Challenge',
    subtitle: 'Reto de hoy · Mantén tu racha', subtitleEn: "Today's challenge · Keep your streak",
    image: '/racha.png',
    path: '/diaria',
    accent: 'from-orange-500/80 to-rose-900/60',
  },
]

export const LEVELS = [
  { title: 'Primaria', titleEn: 'Primary', subtitle: '6 - 12 años', subtitleEn: '6 - 12 years', emoji: '🎒', gradient: 'from-green-500 to-emerald-600', path: '/estudiar/primaria' },
  { title: 'ESO', titleEn: 'Secondary', subtitle: '12 - 16 años', subtitleEn: '12 - 16 years', emoji: '📖', gradient: 'from-blue-500 to-indigo-600', path: '/estudiar/eso' },
  { title: 'Bachillerato', titleEn: 'Sixth Form', subtitle: '16 - 18 años', subtitleEn: '16 - 18 years', emoji: '🎓', gradient: 'from-purple-600 to-violet-700', path: '/estudiar/bachillerato' },
]

export const SUBJECTS = [
  { title: 'Historia', titleEn: 'History', subtitle: 'Eventos y épocas clave', subtitleEn: 'Key events & periods', emoji: '🏛️', gradient: 'from-amber-500 to-orange-600', ready: true },
  { title: 'Geografía', titleEn: 'Geography', subtitle: 'Países, continentes y regiones', subtitleEn: 'Countries, continents & regions', emoji: '🌍', gradient: 'from-teal-500 to-cyan-600', ready: true },
  { title: 'Ciencias', titleEn: 'Science', subtitle: 'Biología, física y química', subtitleEn: 'Biology, physics & chemistry', emoji: '🔬', gradient: 'from-green-500 to-emerald-600', ready: false },
  { title: 'Matemáticas', titleEn: 'Mathematics', subtitle: 'Cálculo mental: sumas, restas y más', subtitleEn: 'Mental maths: add, subtract & more', emoji: '📐', gradient: 'from-blue-500 to-indigo-600', ready: true },
  { title: 'Inglés', titleEn: 'English', subtitle: 'Vocabulario y gramática', subtitleEn: 'Vocabulary & grammar', emoji: '🇬🇧', gradient: 'from-rose-500 to-pink-600', ready: false },
  { title: 'Lengua', titleEn: 'Spanish', subtitle: 'Literatura y ortografía', subtitleEn: 'Literature & spelling', emoji: '✍️', gradient: 'from-violet-500 to-purple-600', ready: false },
]

export const GAMES = [
  { title: 'Tuthor Time', subtitle: 'Viajero del tiempo', subtitleEn: 'Time traveller', emoji: '🕰️', gradient: 'from-amber-500 to-orange-600', ready: true, path: '/juegos/tuthor-time' },
  { title: 'Línea Temporal', titleEn: 'Timeline', subtitle: 'Ordena la historia', subtitleEn: 'Sort history', emoji: '📜', gradient: 'from-emerald-500 to-teal-700', ready: true, path: '/juegos/linea-temporal' },
  { title: '¿Quién es quién?', titleEn: 'Who is Who?', subtitle: 'Adivina el personaje', subtitleEn: 'Guess the figure', emoji: '🕵️', gradient: 'from-violet-600 to-purple-800', ready: true, path: '/juegos/quien-es-quien' },
  { title: 'Portadas', titleEn: 'Headlines', subtitle: 'Verdad o mentira histórica', subtitleEn: 'True or false headlines', emoji: '📰', gradient: 'from-stone-500 to-neutral-700', ready: true, path: '/juegos/portadas' },
  { title: 'GeoRush', subtitle: 'Adivina el país', subtitleEn: 'Guess the country', emoji: '🌍', gradient: 'from-teal-400 to-cyan-600', ready: true, path: '/juegos/georush' },
  { title: 'Acércate', titleEn: 'Target Number', subtitle: 'Llega al número objetivo', subtitleEn: 'Reach the target number', emoji: '🎯', gradient: 'from-pink-500 to-rose-600', ready: true, path: '/juegos/acercate' },
  { title: 'WordBattle', subtitle: 'Vocabulario en inglés', subtitleEn: 'English vocabulary', emoji: '🔤', gradient: 'from-blue-500 to-indigo-600', ready: false },
  { title: 'SciQuiz', subtitle: 'Ciencias naturales', subtitleEn: 'Natural sciences', emoji: '🔬', gradient: 'from-green-500 to-emerald-600', ready: false },
  { title: 'GeoMapa', titleEn: 'GeoMap', subtitle: 'Identifica el país en el mapa', subtitleEn: 'Identify the country on the map', emoji: '🗺️', gradient: 'from-purple-500 to-violet-600', ready: true, path: '/juegos/geomapa' },
  { title: 'NumPath', subtitle: 'Navega y calcula', subtitleEn: 'Navigate & calculate', emoji: '🧮', gradient: 'from-yellow-500 to-orange-500', ready: true, path: '/juegos/numpath' },
  { title: 'LinguaRun', subtitle: 'Idiomas al sprint', subtitleEn: 'Sprint languages', emoji: '🏃', gradient: 'from-cyan-500 to-blue-600', ready: false },
  { title: 'AtomQuest', subtitle: 'Química elemental', subtitleEn: 'Basic chemistry', emoji: '⚛️', gradient: 'from-rose-500 to-red-600', ready: false },
  { title: 'EcoWorld', subtitle: 'Medio ambiente', subtitleEn: 'Environment', emoji: '🌱', gradient: 'from-emerald-500 to-green-700', ready: false },
  { title: 'ArtMaster', subtitle: 'Historia del arte', subtitleEn: 'Art history', emoji: '🎨', gradient: 'from-fuchsia-500 to-pink-600', ready: false },
  { title: 'PhysicsX', subtitle: 'Física aplicada', subtitleEn: 'Applied physics', emoji: '🚀', gradient: 'from-slate-500 to-slate-700', ready: false },
]
