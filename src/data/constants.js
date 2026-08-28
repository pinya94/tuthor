// El reto diario va PRIMERO a propósito. Es la única entrada del sitio que no
// obliga a elegir nada: hay 34 juegos y 110 exámenes, y para quien acaba de
// llegar ese catálogo es parálisis, no libertad. El reto de hoy es uno solo,
// dura un minuto y al acabar ya propone seguir con un juego relacionado.
// Ponerlo el tercero lo escondía justo detrás de las dos pantallas que sí
// exigen decidir.
export const MAIN_CARDS = [
  {
    id: 'diaria',
    title: 'Reto de hoy', titleEn: "Today's challenge", titleCa: "Repte d'avui",
    subtitle: 'Un minuto · Mantén tu racha', subtitleEn: 'One minute · Keep your streak', subtitleCa: 'Un minut · Mantén la ratxa',
    image: '/racha.webp',
    path: '/diaria',
    accent: 'from-orange-500/80 to-rose-900/60',
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
    id: 'estudiar',
    title: 'Estudiar', titleEn: 'Study', titleCa: 'Estudiar',
    subtitle: 'Temarios y tests por nivel', subtitleEn: 'Topics & tests by level', subtitleCa: 'Temaris i tests per nivell',
    image: '/estudio.webp',
    path: '/estudiar',
    accent: 'from-blue-600/80 to-indigo-900/60',
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
  { title: 'Inglés', titleEn: 'English', titleCa: 'Anglès', subtitle: 'Vocabulario y gramática', subtitleEn: 'Vocabulary & grammar', subtitleCa: 'Vocabulari i gramàtica', emoji: '💬', gradient: 'from-rose-500 to-pink-600', ready: false },
  { title: 'Lengua', titleEn: 'Spanish', titleCa: 'Llengua', subtitle: 'Literatura y ortografía', subtitleEn: 'Literature & spelling', subtitleCa: 'Literatura i ortografia', emoji: '✍️', gradient: 'from-violet-500 to-purple-600', ready: false },
]

export const GAMES = [
  { title: 'Tuthor Time', subtitle: 'Viajero del tiempo', subtitleEn: 'Time traveller', subtitleCa: 'Viatger del temps', emoji: '🕰️', gradient: 'from-amber-500 to-orange-600', ready: true, path: '/juegos/tuthor-time' },
  { title: 'Línea Temporal', titleEn: 'Timeline', titleCa: 'Línia Temporal', subtitle: 'Ordena la historia', subtitleEn: 'Sort history', subtitleCa: 'Ordena la història', emoji: '📜', gradient: 'from-emerald-500 to-teal-700', ready: true, path: '/juegos/linea-temporal' },
  { title: '¿Quién es quién?', titleEn: 'Who is Who?', titleCa: 'Qui és qui?', subtitle: 'Adivina el personaje', subtitleEn: 'Guess the figure', subtitleCa: 'Endevina el personatge', emoji: '🕵️', gradient: 'from-violet-600 to-purple-800', ready: true, path: '/juegos/quien-es-quien' },
  { title: 'Portadas', titleEn: 'Headlines', titleCa: 'Portades', subtitle: 'Verdad o mentira histórica', subtitleEn: 'True or false headlines', subtitleCa: 'Veritat o mentida històrica', emoji: '📰', gradient: 'from-stone-500 to-neutral-700', ready: true, path: '/juegos/portadas' },
  { title: '¿Qué Época Es?', titleEn: 'What Era Is This?', titleCa: 'Quina Època És?', subtitle: 'Adivina la época en fotos reales', subtitleEn: 'Guess the era in real photos', subtitleCa: 'Endevina l\'època en fotos reals', emoji: '🏺', gradient: 'from-amber-700 to-stone-800', ready: true, path: '/juegos/epocas-historicas' },
  { title: 'GeoRush', subtitle: 'Adivina el país', subtitleEn: 'Guess the country', subtitleCa: 'Endevina el país', emoji: '🌍', gradient: 'from-teal-400 to-cyan-600', ready: true, path: '/juegos/georush' },
  { title: 'Acércate', titleEn: 'Target Number', titleCa: 'Acosta\'t', subtitle: 'Llega al número objetivo', subtitleEn: 'Reach the target number', subtitleCa: 'Arriba al número objectiu', emoji: '🎯', gradient: 'from-pink-500 to-rose-600', ready: true, path: '/juegos/acercate' },
  { title: 'WordBattle', subtitle: 'Vocabulario en inglés', subtitleEn: 'English vocabulary', subtitleCa: 'Vocabulari en anglès', emoji: '🔤', gradient: 'from-blue-500 to-indigo-600', ready: false },
  { title: 'Genética', titleEn: 'Genetics', titleCa: 'Genètica', subtitle: 'Predice la descendencia con el cuadro de Punnett', subtitleEn: 'Predict the offspring with the Punnett square', subtitleCa: 'Prediu la descendència amb el quadre de Punnett', emoji: '🧬', gradient: 'from-green-500 to-emerald-700', ready: true, path: '/juegos/genetica' },
  { title: 'GeoMapa', titleEn: 'GeoMap', titleCa: 'GeoMapa', subtitle: 'Identifica el país en el mapa', subtitleEn: 'Identify the country on the map', subtitleCa: 'Identifica el país al mapa', emoji: '🗺️', gradient: 'from-purple-500 to-violet-600', ready: true, path: '/juegos/geomapa' },
  { title: 'NumPath', subtitle: 'Navega y calcula', subtitleEn: 'Navigate & calculate', subtitleCa: 'Navega i calcula', emoji: '🧮', gradient: 'from-yellow-500 to-orange-500', ready: true, path: '/juegos/numpath' },
  { title: 'Reparte el Pastel', titleEn: 'Slice the Cake', titleCa: 'Reparteix el Pastís', subtitle: 'Identifica y construye fracciones tocando porciones', subtitleEn: 'Identify and build fractions by tapping slices', subtitleCa: 'Identifica i construeix fraccions tocant porcions', emoji: '🍰', gradient: 'from-pink-500 to-rose-700', ready: true, path: '/juegos/reparte-pastel' },
  { title: 'Salta la Recta', titleEn: 'Jump the Number Line', titleCa: 'Salta la Recta', subtitle: 'Enteros y negativos saltando por la recta numérica', subtitleEn: 'Integers and negatives, jumping the number line', subtitleCa: 'Enters i negatius saltant per la recta numèrica', emoji: '🐸', gradient: 'from-lime-500 to-green-700', ready: true, path: '/juegos/salta-recta' },
  { title: 'Estadístico Exprés', titleEn: 'Quick Statistician', titleCa: 'Estadístic Exprés', subtitle: 'Calcula media, mediana, moda y rango a contrarreloj', subtitleEn: 'Calculate mean, median, mode and range against the clock', subtitleCa: 'Calcula mitjana, mediana, moda i rang a contrarellotge', emoji: '📊', gradient: 'from-sky-500 to-blue-700', ready: true, path: '/juegos/estadistico-expres' },
  { title: 'Trayectoria', titleEn: 'Trajectory', titleCa: 'Trajectòria', subtitle: 'Funciones matemáticas al gol', subtitleEn: 'Math functions to the goal', subtitleCa: 'Funcions matemàtiques al gol', emoji: '⚽', gradient: 'from-green-500 to-emerald-700', ready: true, path: '/juegos/trayectoria' },
  { title: 'Portero', titleEn: 'Goalkeeper', titleCa: 'Porter', subtitle: 'Para el disparo — ¡solo tienes una oportunidad!', subtitleEn: 'Stop the shot — one chance only!', subtitleCa: 'Atura el tir — una sola oportunitat!', emoji: '🧤', gradient: 'from-sky-500 to-blue-700', ready: true, path: '/juegos/portero' },
  { title: 'El Intruso', titleEn: 'Odd One Out', titleCa: 'L\'Intrús', subtitle: 'Encuentra la palabra que no encaja', subtitleEn: 'Find the word that does not fit', subtitleCa: 'Troba la paraula que no hi encaixa', emoji: '🔍', gradient: 'from-violet-500 to-purple-700', ready: true, path: '/juegos/intruso' },
  { title: 'Spicy', subtitle: 'Decisiones con dinero, de niño a jubilado', subtitleEn: 'Money decisions, from kid to retiree', subtitleCa: 'Decisions amb diners, de nen a jubilat', emoji: '🌶️', gradient: 'from-amber-500 to-yellow-700', ready: true, path: '/juegos/spicy' },
  { title: 'Pentagrama Path', subtitle: 'Lee la partitura y tócala al piano', subtitleEn: 'Read the score, play it on the piano', subtitleCa: 'Llegeix la partitura i toca-la al piano', emoji: '🎼', gradient: 'from-indigo-500 to-fuchsia-700', ready: true, path: '/juegos/pentagrama-path' },
  { title: 'Reacción', subtitle: 'Casos de emergencia a contrarreloj: decide rápido', subtitleEn: 'Emergency cases against the clock: decide fast', subtitleCa: 'Casos d\'emergència a contrarellotge: decideix ràpid', emoji: '🚑', gradient: 'from-red-500 to-rose-700', ready: true, path: '/juegos/reaccion' },
  { title: 'Fuerza Neta', titleEn: 'Net Force', titleCa: 'Força Neta', subtitle: 'Suma las fuerzas y acierta hacia dónde se mueve', subtitleEn: 'Add the forces and guess which way it moves', subtitleCa: 'Suma les forces i encerta cap on es mou', emoji: '🧭', gradient: 'from-sky-500 to-blue-700', ready: true, path: '/juegos/fuerza-neta' },
  { title: 'Balanza', titleEn: 'Balance', titleCa: 'Balança', subtitle: 'Equilibra la balanza: palancas y momentos', subtitleEn: 'Balance the scale: levers and moments', subtitleCa: 'Equilibra la balança: palanques i moments', emoji: '⚖️', gradient: 'from-teal-500 to-emerald-700', ready: true, path: '/juegos/balanza' },
  { title: 'Átomos en Equilibrio', titleEn: 'Atoms in Balance', titleCa: 'Àtoms en Equilibri', subtitle: 'Ajusta los coeficientes y equilibra la reacción', subtitleEn: 'Adjust the coefficients and balance the reaction', subtitleCa: 'Ajusta els coeficients i equilibra la reacció', emoji: '⚗️', gradient: 'from-emerald-500 to-teal-700', ready: true, path: '/juegos/balanza-ecuaciones' },
  { title: 'Caza la Función', titleEn: 'Function Hunt', titleCa: 'Caça la Funció', subtitle: 'Lee la gráfica y ajusta la recta o parábola', subtitleEn: 'Read the graph and adjust the line or parabola', subtitleCa: 'Llegeix la gràfica i ajusta la recta o paràbola', emoji: '📈', gradient: 'from-pink-500 to-rose-700', ready: true, path: '/juegos/funciones-grafica' },
  { title: 'Balanza Algebraica', titleEn: 'Algebra Balance', titleCa: 'Balança Algebraica', subtitle: 'Despeja la x haciendo lo mismo a los dos lados', subtitleEn: 'Isolate x by doing the same to both sides', subtitleCa: 'Aïlla la x fent el mateix als dos costats', emoji: '⚖️', gradient: 'from-violet-500 to-indigo-700', ready: true, path: '/juegos/balanza-algebraica' },
  { title: 'Analiza la Frase', titleEn: 'Analyse the Sentence', titleCa: 'Analitza la Frase', subtitle: 'Señala el sujeto, los adjetivos, el predicado…', subtitleEn: 'Point out the subject, adjectives, predicate…', subtitleCa: 'Assenyala el subjecte, els adjectius, el predicat…', emoji: '🧐', gradient: 'from-violet-500 to-fuchsia-700', ready: true, path: '/juegos/analiza-frases' },
  { title: 'Ordena la Frase', titleEn: 'Word Order', titleCa: 'Ordena la Frase', subtitle: 'Coloca las palabras en el orden correcto en inglés', subtitleEn: 'Put the words in the right English order', subtitleCa: 'Col·loca les paraules en l\'ordre correcte en anglès', emoji: '🔤', gradient: 'from-cyan-500 to-blue-700', ready: true, path: '/juegos/ordena-frase' },
  { title: 'Órbita', titleEn: 'Orbit', titleCa: 'Òrbita', subtitle: 'Lanza la sonda al planeta correcto', subtitleEn: 'Launch the probe to the right planet', subtitleCa: 'Llança la sonda al planeta correcte', emoji: '🛰️', gradient: 'from-indigo-600 to-slate-900', ready: true, path: '/juegos/orbita' },
  { title: 'Coordenadas', titleEn: 'Coordinates', titleCa: 'Coordenades', subtitle: 'Sitúa el país por su latitud y longitud', subtitleEn: 'Place the country by latitude and longitude', subtitleCa: 'Situa el país per la seva latitud i longitud', emoji: '🌐', gradient: 'from-cyan-600 to-blue-900', ready: true, path: '/juegos/coordenadas' },
  { title: 'Rayos X', titleEn: 'X-Ray', titleCa: 'Raigs X', subtitle: 'Localiza el órgano en el cuerpo humano', subtitleEn: 'Locate the organ in the human body', subtitleCa: 'Localitza l\'òrgan al cos humà', emoji: '🧠', gradient: 'from-indigo-700 to-slate-900', ready: true, path: '/juegos/rayos-x' },
  { title: 'Circuito Cerrado', titleEn: 'Circuit Complete', titleCa: 'Circuit Complet', subtitle: 'Predice qué bombillas encienden en el circuito', subtitleEn: 'Predict which bulbs light up in the circuit', subtitleCa: 'Prediu quines bombetes s\'encenen al circuit', emoji: '💡', gradient: 'from-amber-500 to-orange-700', ready: true, path: '/juegos/circuito-cerrado' },
  { title: 'Encuentra el Elemento', titleEn: 'Find the Element', titleCa: 'Troba l\'Element', subtitle: 'Toca la celda correcta de la tabla periódica', subtitleEn: 'Tap the right periodic table cell', subtitleCa: 'Toca la cel·la correcta de la taula periòdica', emoji: '🔬', gradient: 'from-cyan-600 to-teal-800', ready: true, path: '/juegos/encuentra-elemento' },
  { title: 'AtomQuest', subtitle: 'Química elemental', subtitleEn: 'Basic chemistry', subtitleCa: 'Química elemental', emoji: '⚛️', gradient: 'from-rose-500 to-red-600', ready: false },
  { title: 'EcoWorld', subtitle: 'Medio ambiente', subtitleEn: 'Environment', subtitleCa: 'Medi ambient', emoji: '🌱', gradient: 'from-emerald-500 to-green-700', ready: false },
  { title: 'ArtMaster', subtitle: 'Historia del arte', subtitleEn: 'Art history', subtitleCa: 'Història de l\'art', emoji: '🎨', gradient: 'from-fuchsia-500 to-pink-600', ready: false },
  { title: 'PhysicsX', subtitle: 'Física aplicada', subtitleEn: 'Applied physics', subtitleCa: 'Física aplicada', emoji: '🚀', gradient: 'from-slate-500 to-slate-700', ready: false },
]
