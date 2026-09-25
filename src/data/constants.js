// El reto diario va PRIMERO a propósito. Es la única entrada del sitio que no
// obliga a elegir nada: el catálogo entero (decenas de juegos, más de cien
// exámenes) para quien acaba de llegar es parálisis, no libertad. El reto de
// hoy es uno solo, dura un minuto y al acabar ya propone seguir con un juego
// relacionado. Ponerlo el tercero lo escondía justo detrás de las dos
// pantallas que sí exigen decidir.
//
// Sin cifras exactas en el comentario a propósito: se quedaban obsoletas a
// cada juego nuevo. Los números de verdad salen de games.js y exams.js.
//
// Este GAMES es el CATÁLOGO VISUAL (las tarjetas de /juegos), no el registro
// de stats — ese es el GAMES de src/lib/games.js. Un test de invariantes
// comprueba que ninguno de los dos tenga una entrada que al otro le falte.
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

// ── Las puertas de /app ──────────────────────────────────────────────────────
// Separadas de MAIN_CARDS (que se quedó para las pestañas de la navbar) porque
// hacen dos trabajos distintos: la navbar necesita ETIQUETAS DE SITIO —el
// usuario ya sabe adónde va—, y la portada necesita NOMBRES DE NECESIDAD.
//
// Las tres puertas se llamaban "Reto de hoy", "Juegos" y "Estudiar": nombres
// de formato, que describen lo que hay detrás pero no para qué sirve. Tres
// cuadrados iguales que no ayudan a elegir. Ahora cada una dice el motivo por
// el que alguien abriría el sitio, y el subtítulo dice qué se encuentra.
//
// La tercera además cambia de destino: antes iba a /estudiar (doce azulejos de
// materia, sin decir qué hay dentro de ninguno) y ahora va al mapa del temario,
// que enseña el temario entero ya filtrado por el curso del alumno. /estudiar
// sigue en la navbar y el mapa enlaza a cada materia.
export const PUERTAS = [
  {
    id: 'diaria',
    title: 'Tengo 5 minutos', titleEn: "I've got 5 minutes", titleCa: 'Tinc 5 minuts',
    subtitle: 'El reto de hoy. Mantienes la racha.', subtitleEn: "Today's challenge. Keep your streak.", subtitleCa: "El repte d'avui. Mantens la ratxa.",
    image: '/racha.webp',
    path: '/diaria',
    accent: 'from-orange-500/80 to-rose-900/60',
  },
  {
    id: 'juegos',
    title: 'Quiero jugar', titleEn: 'I want to play', titleCa: 'Vull jugar',
    subtitle: 'Aprende sin darte cuenta', subtitleEn: 'Learn without noticing', subtitleCa: 'Aprèn sense adonar-te',
    image: '/juegos.webp',
    path: '/juegos',
    accent: 'from-violet-600/80 to-purple-900/60',
  },
  {
    id: 'temario',
    title: 'Tengo examen', titleEn: "I've got an exam", titleCa: 'Tinc examen',
    subtitle: 'Todo el temario de tu curso, tema a tema', subtitleEn: 'Your whole syllabus, topic by topic', subtitleCa: 'Tot el temari del teu curs, tema a tema',
    image: '/estudio.webp',
    path: '/temario',
    accent: 'from-blue-600/80 to-indigo-900/60',
  },
]

export const GAMES = [
  { title: 'Tuthor Time', subtitle: 'Viajero del tiempo', subtitleEn: 'Time traveller', subtitleCa: 'Viatger del temps', emoji: '🕰️', gradient: 'from-amber-500 to-orange-600', ready: true, path: '/juegos/tuthor-time' },
  { title: 'Línea Temporal', titleEn: 'Timeline', titleCa: 'Línia Temporal', subtitle: 'Ordena la historia', subtitleEn: 'Sort history', subtitleCa: 'Ordena la història', emoji: '📜', gradient: 'from-emerald-500 to-teal-700', ready: true, path: '/juegos/linea-temporal' },
  { title: '¿Quién es quién?', titleEn: 'Who is Who?', titleCa: 'Qui és qui?', subtitle: 'Adivina el personaje', subtitleEn: 'Guess the figure', subtitleCa: 'Endevina el personatge', emoji: '🕵️', gradient: 'from-violet-600 to-purple-800', ready: true, path: '/juegos/quien-es-quien' },
  { title: 'Portadas', titleEn: 'Headlines', titleCa: 'Portades', subtitle: 'Verdad o mentira histórica', subtitleEn: 'True or false headlines', subtitleCa: 'Veritat o mentida històrica', emoji: '📰', gradient: 'from-stone-500 to-neutral-700', ready: true, path: '/juegos/portadas' },
  { title: '¿Qué Época Es?', titleEn: 'What Era Is This?', titleCa: 'Quina Època És?', subtitle: 'Adivina la época en fotos reales', subtitleEn: 'Guess the era in real photos', subtitleCa: 'Endevina l\'època en fotos reals', emoji: '🏺', gradient: 'from-amber-700 to-stone-800', ready: true, path: '/juegos/epocas-historicas' },
  { title: 'GeoRush', subtitle: 'Adivina el país', subtitleEn: 'Guess the country', subtitleCa: 'Endevina el país', emoji: '🌍', gradient: 'from-teal-400 to-cyan-600', ready: true, path: '/juegos/georush' },
  { title: 'Acércate', titleEn: 'Target Number', titleCa: 'Acosta\'t', subtitle: 'Llega al número objetivo', subtitleEn: 'Reach the target number', subtitleCa: 'Arriba al número objectiu', emoji: '🎯', gradient: 'from-pink-500 to-rose-600', ready: true, path: '/juegos/acercate' },
  { title: 'Genética', titleEn: 'Genetics', titleCa: 'Genètica', subtitle: 'Predice la descendencia con el cuadro de Punnett', subtitleEn: 'Predict the offspring with the Punnett square', subtitleCa: 'Prediu la descendència amb el quadre de Punnett', emoji: '🧬', gradient: 'from-green-500 to-emerald-700', ready: true, path: '/juegos/genetica' },
  { title: 'GeoMapa', titleEn: 'GeoMap', titleCa: 'GeoMapa', subtitle: 'Identifica el país en el mapa', subtitleEn: 'Identify the country on the map', subtitleCa: 'Identifica el país al mapa', emoji: '🗺️', gradient: 'from-purple-500 to-violet-600', ready: true, path: '/juegos/geomapa' },
  { title: 'NumPath', subtitle: 'Navega y calcula', subtitleEn: 'Navigate & calculate', subtitleCa: 'Navega i calcula', emoji: '🧮', gradient: 'from-yellow-500 to-orange-500', ready: true, path: '/juegos/numpath' },
  { title: 'De Menor a Mayor', titleEn: 'Least to Greatest', titleCa: 'De Menor a Major', subtitle: 'Ordena fracciones, decimales y %', subtitleEn: 'Order fractions, decimals & %', subtitleCa: 'Ordena fraccions, decimals i %', emoji: '📶', gradient: 'from-sky-500 to-blue-700', ready: true, path: '/juegos/menor-a-mayor' },
  { title: '¿Qué hora es?', titleEn: 'What time is it?', titleCa: 'Quina hora és?', subtitle: 'Lee y pon la hora en el reloj', subtitleEn: 'Read and set the clock', subtitleCa: 'Llegeix i posa l\'hora al rellotge', emoji: '🕐', gradient: 'from-sky-500 to-indigo-700', ready: true, path: '/juegos/reloj-horas' },
  { title: 'El Cambio', titleEn: 'The Change', titleCa: 'El Canvi', subtitle: 'Cuenta euros y da el cambio', subtitleEn: 'Count euros and give change', subtitleCa: 'Compta euros i dona el canvi', emoji: '💶', gradient: 'from-emerald-500 to-green-700', ready: true, path: '/juegos/el-cambio' },
  { title: 'Números Romanos', titleEn: 'Roman Numerals', titleCa: 'Números Romans', subtitle: 'Escribe el número en romano', subtitleEn: 'Write the number in Roman', subtitleCa: 'Escriu el nombre en romà', emoji: '🏛️', gradient: 'from-stone-500 to-amber-800', ready: true, path: '/juegos/numeros-romanos' },
  { title: 'Reparte el Pastel', titleEn: 'Slice the Cake', titleCa: 'Reparteix el Pastís', subtitle: 'Identifica y construye fracciones tocando porciones', subtitleEn: 'Identify and build fractions by tapping slices', subtitleCa: 'Identifica i construeix fraccions tocant porcions', emoji: '🍰', gradient: 'from-pink-500 to-rose-700', ready: true, path: '/juegos/reparte-pastel' },
  { title: 'Salta la Recta', titleEn: 'Jump the Number Line', titleCa: 'Salta la Recta', subtitle: 'Enteros y negativos saltando por la recta numérica', subtitleEn: 'Integers and negatives, jumping the number line', subtitleCa: 'Enters i negatius saltant per la recta numèrica', emoji: '🐸', gradient: 'from-lime-500 to-green-700', ready: true, path: '/juegos/salta-recta' },
  { title: 'Lee el Gráfico', titleEn: 'Read the Chart', titleCa: 'Llegeix el Gràfic', subtitle: 'Mira la gráfica y di si crece, cuándo fue el máximo o cuánto cambió', subtitleEn: 'Read the chart: is it growing, when was the peak, how much did it change', subtitleCa: 'Mira el gràfic i digues si creix, quan va ser el màxim o quant va canviar', emoji: '📉', gradient: 'from-cyan-500 to-teal-700', ready: true, path: '/juegos/lee-el-grafico' },
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
  { title: 'Cadena Alimentaria', titleEn: 'Food Chain', titleCa: 'Cadena Alimentària', subtitle: 'Reconstruye quién se come a quién', subtitleEn: 'Rebuild who eats whom', subtitleCa: 'Reconstrueix qui es menja qui', emoji: '🌿', gradient: 'from-lime-600 to-green-800', ready: true, path: '/juegos/cadena-alimentaria' },
  { title: 'La Pieza que Falta', titleEn: 'Missing Piece', titleCa: 'La Peça que Falta', subtitle: 'Monta la forma correcta con las piezas', subtitleEn: 'Build the correct form from the pieces', subtitleCa: 'Monta la forma correcta amb les peces', emoji: '🧩', gradient: 'from-sky-500 to-indigo-700', ready: true, path: '/juegos/pieza-que-falta' },
  { title: 'Bajo el Microscopio', titleEn: 'Under the Microscope', titleCa: 'Sota el Microscopi', subtitle: 'Toca el orgánulo en la célula', subtitleEn: 'Tap the organelle in the cell', subtitleCa: 'Toca l\'orgànul a la cèl·lula', emoji: '🔬', gradient: 'from-purple-600 to-indigo-800', ready: true, path: '/juegos/microscopio' },
  { title: 'Pon la Tilde', titleEn: 'Spanish Accents', titleCa: 'Posa l\'Accent (castellà)', subtitle: 'Busca el golpe de voz y decide si lleva tilde', subtitleEn: 'Find the stress and decide on the Spanish accent', subtitleCa: 'Busca el cop de veu i decideix si porta accent, en castellà', emoji: '✏️', gradient: 'from-rose-500 to-pink-700', ready: true, path: '/juegos/pon-la-tilde' },
  { title: 'Corrige el Texto', titleEn: 'Spot the Mistakes', titleCa: 'Corregeix el Text', subtitle: 'Caza todas las faltas del texto antes de que corra el reloj', subtitleEn: 'Catch every mistake in the text before the clock runs out: in English, Spanish or Catalan', subtitleCa: "Caça totes les faltes del text abans que corri el rellotge: en català, castellà o anglès", emoji: '🔍', gradient: 'from-amber-500 to-orange-700', ready: true, path: '/juegos/corrige-el-texto' },
  { title: 'Cambio de Estado', titleEn: 'Change of State', titleCa: 'Canvi d\'Estat', subtitle: 'Sólido, líquido o gas según la temperatura', subtitleEn: 'Solid, liquid or gas by temperature', subtitleCa: 'Sòlid, líquid o gas segons la temperatura', emoji: '🌡️', gradient: 'from-sky-600 to-blue-800', ready: true, path: '/juegos/cambio-estado' },
]
