export const MAIN_CARDS = [
  {
    id: 'estudiar',
    title: 'Estudiar', titleEn: 'Study', titleCa: 'Estudiar',
    subtitle: 'Temarios y tests por nivel', subtitleEn: 'Topics & tests by level', subtitleCa: 'Temaris i tests per nivell',
    image: '/estudio.webp',
    path: '/estudiar',
    accent: 'from-blue-600/80 to-indigo-900/60',
  },
  {
    id: 'juegos',
    title: 'Juegos', titleEn: 'Games', titleCa: 'Jocs',
    subtitle: 'Aprende jugando', subtitleEn: 'Learn by playing', subtitleCa: 'Aprèn jugant',
    image: '/juegos.webp',
    path: '/juegos',
    accent: 'from-violet-600/80 to-purple-900/60',
  },
  {
    id: 'diaria',
    title: 'Pregunta Diaria', titleEn: 'Daily Challenge', titleCa: 'Pregunta Diària',
    subtitle: 'Reto de hoy · Mantén tu racha', subtitleEn: "Today's challenge · Keep your streak", subtitleCa: 'Repte d\'avui · Mantén la ratxa',
    image: '/racha.webp',
    path: '/diaria',
    accent: 'from-orange-500/80 to-rose-900/60',
  },
]

export const LEVELS = [
  { title: 'Primaria', titleEn: 'Primary', titleCa: 'Primària', subtitle: '6 - 12 años', subtitleEn: '6 - 12 years', subtitleCa: '6 - 12 anys', emoji: '🎒', gradient: 'from-green-500 to-emerald-600', path: '/estudiar/primaria' },
  { title: 'ESO', titleEn: 'Secondary', titleCa: 'ESO', subtitle: '12 - 16 años', subtitleEn: '12 - 16 years', subtitleCa: '12 - 16 anys', emoji: '📖', gradient: 'from-blue-500 to-indigo-600', path: '/estudiar/eso' },
  { title: 'Bachillerato', titleEn: 'Sixth Form', titleCa: 'Batxillerat', subtitle: '16 - 18 años', subtitleEn: '16 - 18 years', subtitleCa: '16 - 18 anys', emoji: '🎓', gradient: 'from-purple-600 to-violet-700', path: '/estudiar/bachillerato' },
]

export const SUBJECTS = [
  { title: 'Historia', titleEn: 'History', titleCa: 'Història', subtitle: 'Eventos y épocas clave', subtitleEn: 'Key events & periods', subtitleCa: 'Esdeveniments i èpoques clau', emoji: '🏛️', gradient: 'from-amber-500 to-orange-600', ready: true },
  { title: 'Geografía', titleEn: 'Geography', titleCa: 'Geografia', subtitle: 'Países, continentes y regiones', subtitleEn: 'Countries, continents & regions', subtitleCa: 'Països, continents i regions', emoji: '🌍', gradient: 'from-teal-500 to-cyan-600', ready: true },
  { title: 'Ciencias', titleEn: 'Science', titleCa: 'Ciències', subtitle: 'Biología, física y química', subtitleEn: 'Biology, physics & chemistry', subtitleCa: 'Biologia, física i química', emoji: '🔬', gradient: 'from-green-500 to-emerald-600', ready: false },
  { title: 'Matemáticas', titleEn: 'Mathematics', titleCa: 'Matemàtiques', subtitle: 'Cálculo mental: sumas, restas y más', subtitleEn: 'Mental maths: add, subtract & more', subtitleCa: 'Càlcul mental: sumes, restes i més', emoji: '📐', gradient: 'from-blue-500 to-indigo-600', ready: true },
  { title: 'Inglés', titleEn: 'English', titleCa: 'Anglès', subtitle: 'Vocabulario y gramática', subtitleEn: 'Vocabulary & grammar', subtitleCa: 'Vocabulari i gramàtica', emoji: '🇬🇧', gradient: 'from-rose-500 to-pink-600', ready: false },
  { title: 'Lengua', titleEn: 'Spanish', titleCa: 'Llengua', subtitle: 'Literatura y ortografía', subtitleEn: 'Literature & spelling', subtitleCa: 'Literatura i ortografia', emoji: '✍️', gradient: 'from-violet-500 to-purple-600', ready: false },
]

export const GAMES = [
  { title: 'Tuthor Time', subtitle: 'Viajero del tiempo', subtitleEn: 'Time traveller', subtitleCa: 'Viatger del temps', emoji: '🕰️', gradient: 'from-amber-500 to-orange-600', ready: true, path: '/juegos/tuthor-time' },
  { title: 'Línea Temporal', titleEn: 'Timeline', titleCa: 'Línia Temporal', subtitle: 'Ordena la historia', subtitleEn: 'Sort history', subtitleCa: 'Ordena la història', emoji: '📜', gradient: 'from-emerald-500 to-teal-700', ready: true, path: '/juegos/linea-temporal' },
  { title: '¿Quién es quién?', titleEn: 'Who is Who?', titleCa: 'Qui és qui?', subtitle: 'Adivina el personaje', subtitleEn: 'Guess the figure', subtitleCa: 'Endevina el personatge', emoji: '🕵️', gradient: 'from-violet-600 to-purple-800', ready: true, path: '/juegos/quien-es-quien' },
  { title: 'Portadas', titleEn: 'Headlines', titleCa: 'Portades', subtitle: 'Verdad o mentira histórica', subtitleEn: 'True or false headlines', subtitleCa: 'Veritat o mentida històrica', emoji: '📰', gradient: 'from-stone-500 to-neutral-700', ready: true, path: '/juegos/portadas' },
  { title: 'GeoRush', subtitle: 'Adivina el país', subtitleEn: 'Guess the country', subtitleCa: 'Endevina el país', emoji: '🌍', gradient: 'from-teal-400 to-cyan-600', ready: true, path: '/juegos/georush' },
  { title: 'Acércate', titleEn: 'Target Number', titleCa: 'Acosta\'t', subtitle: 'Llega al número objetivo', subtitleEn: 'Reach the target number', subtitleCa: 'Arriba al número objectiu', emoji: '🎯', gradient: 'from-pink-500 to-rose-600', ready: true, path: '/juegos/acercate' },
  { title: 'WordBattle', subtitle: 'Vocabulario en inglés', subtitleEn: 'English vocabulary', subtitleCa: 'Vocabulari en anglès', emoji: '🔤', gradient: 'from-blue-500 to-indigo-600', ready: false },
  { title: 'SciQuiz', subtitle: 'Ciencias naturales', subtitleEn: 'Natural sciences', subtitleCa: 'Ciències naturals', emoji: '🔬', gradient: 'from-green-500 to-emerald-600', ready: false },
  { title: 'GeoMapa', titleEn: 'GeoMap', titleCa: 'GeoMapa', subtitle: 'Identifica el país en el mapa', subtitleEn: 'Identify the country on the map', subtitleCa: 'Identifica el país al mapa', emoji: '🗺️', gradient: 'from-purple-500 to-violet-600', ready: true, path: '/juegos/geomapa' },
  { title: 'NumPath', subtitle: 'Navega y calcula', subtitleEn: 'Navigate & calculate', subtitleCa: 'Navega i calcula', emoji: '🧮', gradient: 'from-yellow-500 to-orange-500', ready: true, path: '/juegos/numpath' },
  { title: 'LinguaRun', subtitle: 'Idiomas al sprint', subtitleEn: 'Sprint languages', subtitleCa: 'Idiomes a l\'sprint', emoji: '🏃', gradient: 'from-cyan-500 to-blue-600', ready: false },
  { title: 'AtomQuest', subtitle: 'Química elemental', subtitleEn: 'Basic chemistry', subtitleCa: 'Química elemental', emoji: '⚛️', gradient: 'from-rose-500 to-red-600', ready: false },
  { title: 'EcoWorld', subtitle: 'Medio ambiente', subtitleEn: 'Environment', subtitleCa: 'Medi ambient', emoji: '🌱', gradient: 'from-emerald-500 to-green-700', ready: false },
  { title: 'ArtMaster', subtitle: 'Historia del arte', subtitleEn: 'Art history', subtitleCa: 'Història de l\'art', emoji: '🎨', gradient: 'from-fuchsia-500 to-pink-600', ready: false },
  { title: 'PhysicsX', subtitle: 'Física aplicada', subtitleEn: 'Applied physics', subtitleCa: 'Física aplicada', emoji: '🚀', gradient: 'from-slate-500 to-slate-700', ready: false },
]
