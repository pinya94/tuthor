// ── Meta de las páginas que no la sacan de un registro ──────────────────────
//
// Portadas de sección y páginas sueltas: las que no son un juego, ni un
// examen, ni una ficha, y por tanto no tienen de dónde derivar su título.
//
// Vive en src/ y no en scripts/ para que la puedan importar LAS DOS cosas que
// la necesitan: el prerender del build y las propias páginas, a través de
// <SEOEstatico>. Cuando solo la tenía el script, esas páginas no montaban
// SEOHead y el prerender las capturaba VACÍAS: se quedaba esperando un
// canonical que no iba a llegar nunca, agotaba su presupuesto de 12 s y
// escribía el cascarón con la meta inyectada y sin cuerpo. Eran diecinueve
// URLs, entre ellas todos los hubs de materia.

export const STATIC_META = {
  // La raíz es la landing de venta desde el pivot a suscripción. Mantener en
  // sintonía con el <SEOHead> de Landing.jsx: el prerender genera el HTML que
  // ven crawlers y scrapers, que no ejecutan JS.
  //
  // /app NO tiene entrada aquí, y NO está en el sitemap: es el panel privado
  // de quien ya tiene cuenta, no una página de marketing. Sin sesión
  // redirige a "/" — y esa redirección se dispara también durante el
  // prerender (nunca hay sesión ahí), así que indexarla arriesgaba a que el
  // prerender se quedara esperando algo que no llega nunca.
  '/': {
    es: { title: 'Aprende jugando: el mismo concepto desde varios ángulos', desc: 'Plataforma educativa para Primaria, ESO y Bachillerato. Juegos y exámenes en 11 materias, con panel de seguimiento para padres. Cada concepto, explicado de varias formas distintas.' },
    en: { title: 'Learn by playing: one concept, several angles', desc: 'Educational platform for primary and secondary school. Games and exams across 11 subjects, with a tracking panel for parents. Every concept, explained in several different ways.' },
  },
  // Sin "gratis" desde el muro de pago: los temarios y las fichas siguen
  // abiertos, pero jugar y examinarse va con la suscripción, y estas dos
  // páginas son la puerta a ambos.
  '/estudiar': {
    es: { title: 'Estudiar por materias', desc: 'Elige materia y repasa con juegos y exámenes tipo test: historia, matemáticas, geografía, ciencias e idiomas. Temario abierto para todos.' },
    en: { title: 'Study by subject', desc: 'Pick a subject and revise with games and quizzes: history, maths, geography, science and languages. Study notes open to everyone.' },
  },
  '/juegos': {
    es: { title: 'Juegos educativos por materia', desc: 'Catálogo de juegos educativos: cálculo mental, cronología histórica, geografía y vocabulario. Partidas de 5 minutos con ranking y monedas.' },
    en: { title: 'Educational games by subject', desc: 'Catalogue of educational games: mental maths, history timelines, geography and vocabulary. 5-minute rounds with rankings and coins.' },
  },
  '/estudiar/historia': {
    es: { title: 'Historia — temas y exámenes', desc: 'Repasa historia con juegos: Guerra Civil, Segunda Guerra Mundial, Roma, líneas temporales y personajes. Exámenes tipo test con nota.' },
    en: { title: 'History — topics and exams', desc: 'Revise history with games: Spanish Civil War, WWII, Ancient Rome, timelines and famous figures. Multiple-choice exams with grades.' },
  },
  '/estudiar/matematicas': {
    es: { title: 'Matemáticas — práctica y exámenes', desc: 'Cálculo mental, fracciones, álgebra, geometría, estadística y funciones. Practica en modo libre o ponte a prueba con exámenes con nota.' },
    en: { title: 'Maths — practice and exams', desc: 'Mental arithmetic, fractions, algebra, geometry, statistics and functions. Practise freely or test yourself with graded exams.' },
  },
  '/estudiar/geografia': {
    es: { title: 'Geografía — mapas y exámenes', desc: 'Aprende países, capitales y banderas de todos los continentes con mapas interactivos y exámenes tipo test. España y EE. UU. incluidos.' },
    en: { title: 'Geography — maps and exams', desc: 'Learn countries, capitals and flags of every continent with interactive maps and quizzes. Spain and USA maps included.' },
  },
  '/estudiar/quimica': {
    es: { title: 'Química — temas y exámenes', desc: 'Tabla periódica, estados de la materia, mezclas, ácidos y átomos. Teoría breve y exámenes tipo test por nivel: Primaria, ESO y Bachillerato.' },
    en: { title: 'Chemistry — topics and exams', desc: 'Periodic table, states of matter, mixtures, acids and atoms. Short theory and level-based quizzes for primary and secondary school.' },
  },
  '/estudiar/fisica': {
    es: { title: 'Física — temas y exámenes', desc: 'Fuerzas y movimiento, energía, electricidad, ondas y luz. Teoría breve y exámenes tipo test por nivel: Primaria, ESO y Bachillerato.' },
    en: { title: 'Physics — topics and exams', desc: 'Forces and motion, energy, electricity, waves and light. Short theory and level-based quizzes for primary and secondary school.' },
  },
  '/estudiar/biologia': {
    es: { title: 'Biología — temas y exámenes', desc: 'La célula, cuerpo humano, seres vivos, ecosistemas, genética y nutrición. Teoría breve y exámenes tipo test por nivel.' },
    en: { title: 'Biology — topics and exams', desc: 'The cell, human body, living things, ecosystems, genetics and nutrition. Short theory and level-based quizzes for school.' },
  },
  '/estudiar/geologia': {
    es: { title: 'Geología y el Universo — temas y exámenes', desc: 'Rocas y minerales y el sistema solar. Teoría breve, juegos y exámenes tipo test por nivel: Primaria, ESO y Bachillerato.' },
    en: { title: 'Geology & the Universe — topics and exams', desc: 'Rocks and minerals and the solar system. Short theory, games and level-based quizzes for primary and secondary school.' },
  },
  '/estudiar/economia': {
    es: { title: 'Economía — Finanzas Personales', desc: 'Inflación, interés compuesto, deuda y señales de estafa. Repasa con el examen tipo test o vive una vida entera en el simulador Spicy.' },
    en: { title: 'Economics — Personal Finance', desc: 'Inflation, compound interest, debt and scam signals. Revise with the quiz or live a whole life in the Spicy simulator.' },
  },
  '/estudiar/musica': {
    es: { title: 'Música — teoría y exámenes', desc: 'Lectura de partituras y ritmo. Teoría breve y exámenes interactivos con piano virtual, para Primaria, ESO y Bachillerato.' },
    en: { title: 'Music — theory and exams', desc: 'Sheet music reading and rhythm. Short theory and interactive exams with a virtual piano, for primary and secondary school.' },
  },
  '/estudiar/vida-practica': {
    es: { title: 'Primeros Auxilios — teoría y práctica', desc: 'Practica primeros auxilios tema a tema: atragantamiento, quemaduras, desmayo, cortes y picaduras. Ordena los pasos y toma las decisiones correctas.' },
    en: { title: 'First Aid — theory and practice', desc: 'Practice first aid topic by topic: choking, burns, fainting, cuts and stings. Order the steps and make the right calls.' },
  },
  '/estudiar/idiomas': {
    es: { title: 'Idiomas — español e inglés', desc: 'Gramática y ortografía del español, grammar del inglés. Teoría breve con ejemplos y exámenes tipo test con explicación en cada respuesta.' },
    en: { title: 'Languages — Spanish and English', desc: 'Spanish grammar and spelling, English grammar. Short theory with examples and quizzes with an explanation for every answer.' },
  },
  '/estudiar/idiomas/espanol': {
    es: { title: 'Lengua Española — gramática y ortografía', desc: 'Sustantivos, verbos, sintaxis, acentuación y ortografía. Teoría con ejemplos y exámenes tipo test para Primaria y ESO.' },
    en: { title: 'Spanish — grammar and spelling', desc: 'Nouns, verbs, syntax, accents and spelling. Theory with examples and multiple-choice tests for primary and secondary school.' },
  },
  '/estudiar/idiomas/espanol/gramatica': {
    es: { title: 'Gramática española — teoría y exámenes', desc: 'Sustantivos, verbos y sintaxis con teoría breve, ejemplos y exámenes tipo test con explicación. Para Primaria y ESO.' },
    en: { title: 'Spanish grammar — theory and tests', desc: 'Nouns, verbs and syntax with short theory, examples and multiple-choice tests with explanations. For primary and secondary levels.' },
  },
  '/estudiar/idiomas/espanol/ortografia': {
    es: { title: 'Ortografía española — teoría y exámenes', desc: 'Acentuación, B y V, y las reglas de ortografía que más caen en examen. Teoría breve y tests con explicación en cada respuesta.' },
    en: { title: 'Spanish spelling — theory and tests', desc: 'Accents, B vs V and the spelling rules that matter most in exams. Short theory and quizzes with explained answers.' },
  },
  '/estudiar/idiomas/ingles': {
    es: { title: 'Inglés — grammar y exámenes', desc: 'Present simple, past simple, present perfect, articles y passive voice. Teoría breve y exámenes tipo test con explicación.' },
    en: { title: 'English — grammar and tests', desc: 'Present simple, past simple, present perfect, articles and passive voice. Short theory and multiple-choice tests with explanations.' },
  },
  '/estudiar/idiomas/ingles/grammar': {
    es: { title: 'English grammar — teoría y exámenes', desc: 'Los tiempos verbales y estructuras del inglés que entran en examen, con teoría breve, ejemplos y tests con explicación.' },
    en: { title: 'English grammar — theory and tests', desc: 'The English tenses and structures that come up in exams, with short theory, examples and explained quizzes.' },
  },
  '/examen/historia': {
    es: { title: 'Examen de Historia tipo test', desc: 'Ponte a prueba con preguntas de historia de España y universal: fechas, personajes y acontecimientos. Con nota final y explicaciones.' },
    en: { title: 'History multiple-choice exam', desc: 'Test yourself with Spanish and world history questions: dates, figures and events. Final grade and explanations included.' },
  },
  '/examen/linea-temporal': {
    es: { title: 'Examen de Línea Temporal', desc: 'Ordena acontecimientos históricos en su línea temporal: de la Prehistoria a la actualidad. Examen con nota y ranking.' },
    en: { title: 'Timeline exam', desc: 'Put historical events in the right order on the timeline, from prehistory to today. Graded exam with rankings.' },
  },
  '/info/estudiar': {
    es: { title: 'Guías de estudio por tema', desc: 'Guías de cada tema: qué entra en el examen, consejos de estudio y acceso directo al test interactivo. Historia, mates, ciencias e idiomas.' },
    en: { title: 'Study guides by topic', desc: 'Guides for every topic: what the exam covers, study tips and direct access to the interactive test. History, maths, science and languages.' },
  },
  '/info/juegos': {
    es: { title: 'Juegos educativos — base pedagógica', desc: 'Qué trabaja cada juego de Tuthor, su base pedagógica y cómo jugarlo también en papel. Guía para familias y profesores.' },
    en: { title: 'Educational games — pedagogical basis', desc: 'What each Tuthor game trains, its pedagogical basis and how to play it on paper too. A guide for families and teachers.' },
  },
  '/info/diaria': {
    es: { title: 'Pregunta diaria — crea el hábito de estudio', desc: 'Un reto nuevo cada día de 2 minutos: trivia, cálculo o geografía. La ciencia del hábito aplicada al estudio, con rachas y recompensas.' },
    en: { title: 'Daily question — build a study habit', desc: 'A new 2-minute challenge every day: trivia, arithmetic or geography. Habit science applied to studying, with streaks and rewards.' },
  },
  '/privacidad': {
    es: { title: 'Política de privacidad', desc: 'Política de privacidad y protección de datos de Tuthor: qué datos tratamos, con qué finalidad y cuáles son tus derechos.' },
    en: { title: 'Privacy policy', desc: 'Tuthor privacy and data protection policy: what data we process, why, and what your rights are.' },
  },
  '/recursos': {
    es: { title: 'Recursos imprimibles para profesores', desc: 'Tarjetas listas para recortar: eventos históricos por época, países y capitales, elementos químicos y titulares verdaderos y falsos. Gratis y sin registro.' },
    en: { title: 'Printable classroom resources', desc: 'Cards ready to cut out: historical events by period, countries and capitals, chemical elements and real vs fake headlines. Free, no sign-up.' },
  },
  // Recurso de funciones: una URL por tipo de problema, porque cada una es
  // una búsqueda distinta ("recta que pasa por dos puntos" no es "punto de
  // corte de dos rectas"). Ver src/lib/recursoFunciones.js.
  '/recursos/funciones': {
    es: { title: 'Calculadora de funciones: gráfica, cortes y vértice', desc: 'Escribe una función y mira su gráfica con los cortes con los ejes, el vértice y la pendiente, resueltos paso a paso con fracciones exactas. Gratis y sin registro.' },
    en: { title: 'Function calculator: graph, intercepts and vertex', desc: 'Type a function and see its graph with the axis crossings, vertex and slope, solved step by step in exact fractions. Free, no sign-up.' },
  },
  '/recursos/funciones/punto-de-corte': {
    es: { title: 'Punto de corte de dos funciones, paso a paso', desc: 'Calcula dónde se cortan dos rectas, o una recta y una parábola: igualamos, resolvemos y lo dibujamos. Con fracciones y raíces exactas, gratis y sin registro.' },
    en: { title: 'Where two functions cross, step by step', desc: 'Find where two lines, or a line and a parabola, cross: set them equal, solve and see it on the graph. Exact fractions and roots, free, no sign-up.' },
  },
  '/recursos/funciones/recta-dos-puntos': {
    es: { title: 'Recta que pasa por dos puntos, paso a paso', desc: 'Escribe dos puntos y obtén la ecuación de la recta: pendiente, ordenada en el origen y comprobación, con la gráfica y sus cortes. Gratis y sin registro.' },
    en: { title: 'Line through two points, step by step', desc: 'Enter two points and get the equation of the line: slope, y-intercept and a check, with the graph and its axis crossings. Free, no sign-up.' },
  },
  '/recursos/funciones/recta-pendiente-punto': {
    es: { title: 'Recta con pendiente y un punto, paso a paso', desc: 'Ecuación de la recta a partir de su pendiente y un punto con la forma punto-pendiente, más sus cortes con los ejes y la gráfica. Gratis y sin registro.' },
    en: { title: 'Line from a slope and a point, step by step', desc: 'Equation of a line from its slope and one point using point-slope form, plus its axis crossings and the graph. Free, no sign-up.' },
  },
  '/recursos/funciones/punto-pertenece': {
    es: { title: '¿Está el punto en la gráfica de la función?', desc: 'Comprueba si un punto está en la gráfica de una función sustituyendo paso a paso, y mira en el dibujo dónde cae. Gratis y sin registro.' },
    en: { title: 'Is the point on the graph of the function?', desc: 'Check whether a point lies on the graph of a function by substituting step by step, and see where it falls on the graph. Free, no sign-up.' },
  },
  '/profesores': {
    es: { title: 'Herramientas gratis para profesores', desc: 'Pasa lista, pon notas, crea tus propios exámenes y gestiona toda la clase desde el móvil. Gratis durante la beta, sin tarjeta ni permanencia.' },
    en: { title: 'Free tools for teachers', desc: 'Take attendance, grade your students, build your own quizzes and run the whole classroom from your phone. Free during the beta, no card required.' },
  },
}
