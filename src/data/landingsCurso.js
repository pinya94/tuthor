// Páginas de entrada por curso y materia: /juegos/<curso> y
// /juegos/<curso>/<materia>. Existen para las búsquedas tal y como se hacen
// ("juegos de matemáticas para primaria", "juegos de lengua primaria"): hasta
// ahora casi todo lo indexado era la ficha de UN juego o de UN tema.
//
// Todo el texto es propio de cada página, a mano y en los tres idiomas: una
// plantilla con el nombre de la materia cambiado es justo el "contenido de
// poco valor" que AdSense ya nos marcó. La lista de juegos y temas también es
// curada (qué sirve de verdad en ese curso), partiendo de lo que el catálogo
// marca como de ese nivel (topicCatalog: niveles).
//
// `juegos`: slugs de /juegos/<slug> (catálogo de constants.js y ARTE_JUEGOS).
// `temas`: { arte, ruta, titulo } — arte = clave de ARTE_TEMAS.
// Lo leen la página (JuegosCurso.jsx), scripts/seoMeta.mjs (meta del
// prerender) y el test de invariantes.

export const CURSOS_LANDING = {
  primaria: {
    nombre: { es: 'Primaria', en: 'Primary school', ca: 'Primària' },
    edades: '6-12',
    titulo: { es: 'Juegos educativos para Primaria', en: 'Educational games for primary school', ca: 'Jocs educatius per a Primària' },
    metaDesc: {
      es: 'Juegos educativos para niños de 6 a 12 años: matemáticas, lengua, inglés, ciencias naturales y sociales y música. Por materia, con ejercicios que se corrigen solos.',
      en: 'Educational games for children aged 6 to 12: maths, language, English, science, history, geography and music. By subject, with self-marking exercises.',
      ca: 'Jocs educatius per a nens de 6 a 12 anys: matemàtiques, llengua, anglès, ciències naturals i socials i música. Per matèria, amb exercicis que es corregeixen sols.',
    },
    intro: {
      es: [
        'En Primaria lo que más cuesta no es entender una cosa una vez, sino practicarla las veces suficientes como para que salga sola: las tablas, la hora, las tildes, los verbos en inglés. Aquí cada juego ataca una de esas destrezas concretas, con partidas cortas que se pueden jugar en cinco minutos antes de cenar.',
        'Están ordenados por las asignaturas de Primaria. Cada partida corrige al momento y explica el fallo, así que no hace falta un adulto al lado para saber si está bien; y si queréis una nota, casi todos tienen su versión de examen.',
      ],
      en: [
        'In primary school the hard part is rarely understanding something once — it is practising it enough times for it to become automatic: times tables, telling the time, spelling, English verbs. Each game here targets one of those specific skills, with short rounds you can play in five minutes before dinner.',
        'They are grouped by the primary school subjects. Every round marks the answer straight away and explains mistakes, so no adult needs to sit alongside to check; and if you want a grade, most of them also have an exam version.',
      ],
      ca: [
        "A Primària el que més costa no és entendre una cosa una vegada, sinó practicar-la prou vegades perquè surti sola: les taules, l'hora, els accents, els verbs en anglès. Aquí cada joc ataca una d'aquestes destreses concretes, amb partides curtes que es poden jugar en cinc minuts abans de sopar.",
        "Estan ordenats per les assignatures de Primària. Cada partida corregeix al moment i explica l'errada, així que no cal un adult al costat per saber si està bé; i si voleu una nota, gairebé tots tenen la seva versió d'examen.",
      ],
    },
  },
  eso: {
    nombre: { es: 'ESO', en: 'Secondary school', ca: 'ESO' },
    edades: '12-16',
    titulo: { es: 'Juegos educativos para la ESO', en: 'Educational games for secondary school', ca: "Jocs educatius per a l'ESO" },
    metaDesc: {
      es: 'Juegos y exámenes para la ESO (12-16 años): álgebra y funciones, sintaxis, inglés, física y química, biología, geografía e historia, música y economía.',
      en: 'Games and quizzes for secondary school (ages 12-16): algebra and functions, syntax, English, physics and chemistry, biology, history, geography, music and economics.',
      ca: "Jocs i exàmens per a l'ESO (12-16 anys): àlgebra i funcions, sintaxi, anglès, física i química, biologia, geografia i història, música i economia.",
    },
    intro: {
      es: [
        'En la ESO cambia el tipo de dificultad: ya no se trata solo de automatizar, sino de entender por qué. Despejar una x, leer una gráfica, ajustar una reacción química o analizar una oración son procesos de varios pasos, y es en esos pasos donde se pierde la mayoría. Los juegos de esta sección enseñan el proceso, no solo el resultado: se ve la balanza equilibrarse, la recta moverse, las fuerzas sumarse.',
        'Están agrupados por las asignaturas de la ESO y casi todos tienen dos modos: el de juego, contrarreloj y con puntos, para practicar; y el de examen, con diez preguntas, explicación en cada una y nota final, para comprobar antes de un control si el tema está sabido.',
      ],
      en: [
        'In secondary school the kind of difficulty changes: it is no longer just about automating, but about understanding why. Solving for x, reading a graph, balancing a chemical equation or analysing a sentence are multi-step processes, and most students get lost in those steps. The games in this section teach the process, not just the answer: you see the balance level out, the line move, the forces add up.',
        'They are grouped by the secondary school subjects and nearly all of them have two modes: the game, against the clock and with points, for practice; and the exam, with ten questions, an explanation for each one and a final grade, to check before a test whether the topic is really learnt.',
      ],
      ca: [
        "A l'ESO canvia el tipus de dificultat: ja no es tracta només d'automatitzar, sinó d'entendre per què. Aïllar una x, llegir una gràfica, ajustar una reacció química o analitzar una oració són processos de diversos passos, i és en aquests passos on es perd la majoria. Els jocs d'aquesta secció ensenyen el procés, no només el resultat: es veu la balança equilibrar-se, la recta moure's, les forces sumar-se.",
        "Estan agrupats per les assignatures de l'ESO i gairebé tots tenen dos modes: el de joc, contrarellotge i amb punts, per practicar; i el d'examen, amb deu preguntes, explicació a cadascuna i nota final, per comprovar abans d'un control si el tema està après.",
      ],
    },
  },
  // ── Bachillerato ─────────────────────────────────────────────────────────
  // Solo las materias con contenido propio de ese nivel en el catálogo
  // (topicCatalog: niveles incluye 'bachillerato'). Física y Química e Inglés
  // se quedan fuera hasta que tengan más que uno o dos temas.
  bachillerato: {
    nombre: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    edades: '16-18',
    titulo: { es: 'Juegos y exámenes para Bachillerato', en: 'Games and quizzes for sixth form', ca: 'Jocs i exàmens per a Batxillerat' },
    metaDesc: {
      es: 'Repaso para Bachillerato y la PAU: funciones y álgebra, sintaxis y figuras literarias, Historia contemporánea y de España, biología y economía, con explicación en cada respuesta.',
      en: 'Revision for sixth form and university entrance exams: functions and algebra, syntax, modern history, biology and economics, with an explanation for every answer.',
      ca: 'Repàs per a Batxillerat i la PAU: funcions i àlgebra, sintaxi i figures literàries, Història contemporània i d’Espanya, biologia i economia, amb explicació a cada resposta.',
    },
    intro: {
      es: [
        'En Bachillerato el problema ya no es practicar poco, sino tener demasiado temario en muy poco tiempo y una prueba al final, la PAU, que lo pregunta todo junto. Lo que más sirve en ese momento no es releer apuntes, sino comprobarse: hacer preguntas, fallar y ver por qué, tema a tema, hasta saber qué está sabido y qué no.',
        'Por eso aquí pesan más los exámenes que los juegos. Cada tema tiene preguntas con su explicación y una nota al final, y se puede repetir cuantas veces haga falta. Los juegos que quedan son los que entrenan una destreza concreta que en Bachillerato sigue costando: leer una gráfica, situar un hecho en el tiempo, analizar una oración.',
      ],
      en: [
        'At sixth-form level the problem is no longer too little practice, but too much syllabus in too little time and a final exam that asks about all of it at once. What helps most then is not rereading notes but testing yourself: answering questions, getting them wrong and seeing why, topic by topic, until you know what you know and what you do not.',
        'That is why exams matter more than games here. Every topic has questions with explanations and a grade at the end, and you can repeat it as often as you need. The games that remain are the ones that train a specific skill that is still hard at this level: reading a graph, placing an event in time, analysing a sentence.',
      ],
      ca: [
        'Al Batxillerat el problema ja no és practicar poc, sinó tenir massa temari en molt poc temps i una prova al final, la PAU, que ho pregunta tot junt. El que més serveix en aquell moment no és rellegir apunts, sinó comprovar-se: fer preguntes, fallar i veure per què, tema a tema, fins a saber què està sabut i què no.',
        'Per això aquí pesen més els exàmens que els jocs. Cada tema té preguntes amb la seva explicació i una nota al final, i es pot repetir tantes vegades com calgui. Els jocs que queden són els que entrenen una destresa concreta que al Batxillerat continua costant: llegir una gràfica, situar un fet en el temps, analitzar una oració.',
      ],
    },
  },
}

const T = (es, en, ca) => ({ es, en, ca })

export const LANDINGS = [
  {
    curso: 'primaria',
    materia: 'matematicas',
    arteMateria: 'matematicas',
    nombre: T('Matemáticas', 'Maths', 'Matemàtiques'),
    titulo: T('Juegos de matemáticas para Primaria', 'Maths games for primary school', 'Jocs de matemàtiques per a Primària'),
    metaDesc: T(
      'Juegos de matemáticas para Primaria: tablas de multiplicar, la hora, el dinero, fracciones, redondeo y cálculo mental. Partidas cortas que se corrigen solas.',
      'Maths games for primary school: times tables, telling the time, money, fractions, rounding and mental arithmetic. Short self-marking rounds.',
      'Jocs de matemàtiques per a Primària: taules de multiplicar, l\'hora, els diners, fraccions, arrodoniment i càlcul mental. Partides curtes que es corregeixen soles.',
    ),
    intro: {
      es: [
        'Las matemáticas de Primaria se juegan mucho en la soltura: saber que 7 × 8 son 56 sin contar con los dedos, leer un reloj de agujas de un vistazo o dar la vuelta correcta en una tienda. Esa soltura solo sale practicando, y practicar fichas iguales cansa enseguida. Estos juegos convierten cada destreza en partidas de un minuto con un reto que sube poco a poco.',
        'No son solo cuentas: hay juegos para ver las fracciones como trozos de un pastel, colocar números en una recta, redondear, convertir unidades o leer un gráfico de barras. Cada uno tiene niveles (fácil, medio y difícil) para ir del primer ciclo al tercero sin cambiar de juego.',
      ],
      en: [
        'Primary maths is largely about fluency: knowing that 7 × 8 is 56 without counting on your fingers, reading an analogue clock at a glance, or giving the right change in a shop. That fluency only comes from practice, and identical worksheets get boring fast. These games turn each skill into one-minute rounds whose challenge rises gradually.',
        'It is not only sums: there are games to see fractions as slices of a cake, place numbers on a number line, round, convert units or read a bar chart. Each one has levels (easy, medium and hard) so you can go from the first years to the last ones without switching games.',
      ],
      ca: [
        "Les matemàtiques de Primària es juguen molt en la soltesa: saber que 7 × 8 són 56 sense comptar amb els dits, llegir un rellotge d'agulles d'un cop d'ull o tornar bé el canvi en una botiga. Aquesta soltesa només surt practicant, i practicar fitxes iguals cansa de seguida. Aquests jocs converteixen cada destresa en partides d'un minut amb un repte que puja a poc a poc.",
        "No són només comptes: hi ha jocs per veure les fraccions com a trossos d'un pastís, col·locar nombres en una recta, arrodonir, convertir unitats o llegir un gràfic de barres. Cadascun té nivells (fàcil, mitjà i difícil) per anar del primer cicle al tercer sense canviar de joc.",
      ],
    },
    practica: {
      es: ['Tablas de multiplicar y cálculo mental', 'La hora en el reloj de agujas y el dinero', 'Fracciones, decimales y la recta numérica', 'Redondeo, números romanos y unidades de medida', 'Leer tablas y gráficos'],
      en: ['Times tables and mental arithmetic', 'Telling the time and money', 'Fractions, decimals and the number line', 'Rounding, Roman numerals and units of measurement', 'Reading tables and charts'],
      ca: ['Taules de multiplicar i càlcul mental', "L'hora al rellotge d'agulles i els diners", 'Fraccions, decimals i la recta numèrica', 'Arrodoniment, nombres romans i unitats de mesura', 'Llegir taules i gràfics'],
    },
    juegos: ['tablas-multiplicar', 'reloj-horas', 'el-cambio', 'rebajas', 'reparte-pastel', 'redondeo', 'numeros-romanos', 'escalera-unidades', 'menor-a-mayor', 'salta-recta', 'acercate', 'numpath', 'lee-el-grafico', 'estadistico-expres'],
    temas: [
      { arte: 'matematicas/sumas', ruta: '/estudiar/matematicas/sumas', titulo: T('Sumas', 'Addition', 'Sumes') },
      { arte: 'matematicas/restas', ruta: '/estudiar/matematicas/restas', titulo: T('Restas', 'Subtraction', 'Restes') },
      { arte: 'matematicas/multiplicaciones', ruta: '/estudiar/matematicas/multiplicaciones', titulo: T('Multiplicaciones', 'Multiplication', 'Multiplicacions') },
      { arte: 'matematicas/divisiones', ruta: '/estudiar/matematicas/divisiones', titulo: T('Divisiones', 'Division', 'Divisions') },
      { arte: 'matematicas/fracciones', ruta: '/estudiar/matematicas/fracciones', titulo: T('Fracciones y decimales', 'Fractions and decimals', 'Fraccions i decimals') },
      { arte: 'matematicas/geometria', ruta: '/estudiar/matematicas/geometria', titulo: T('Geometría', 'Geometry', 'Geometria') },
      { arte: 'matematicas/estadistica', ruta: '/estudiar/matematicas/estadistica', titulo: T('Estadística', 'Statistics', 'Estadística') },
    ],
  },
  {
    curso: 'primaria',
    materia: 'lengua',
    arteMateria: 'espanol',
    nombre: T('Lengua', 'Spanish language', 'Llengua castellana'),
    titulo: T('Juegos de lengua para Primaria', 'Spanish language games for primary school', 'Jocs de llengua castellana per a Primària'),
    metaDesc: T(
      'Juegos de lengua castellana para Primaria: tildes, ortografía (b/v, g/j), puntuación, clases de palabras y analizar frases. Con corrección al momento.',
      'Spanish language games for primary school: accents, spelling (b/v, g/j), punctuation, parts of speech and sentence analysis. Marked instantly.',
      'Jocs de llengua castellana per a Primària: accents, ortografia (b/v, g/j), puntuació, classes de paraules i analitzar frases. Amb correcció al moment.',
    ),
    intro: {
      es: [
        'En lengua castellana de Primaria se aprenden dos cosas que se practican de forma muy distinta: a escribir sin faltas y a reconocer cómo funcionan las palabras. Para la ortografía, lo que funciona es ver muchas palabras y decidir rápido: dónde va la tilde, si es con b o con v, qué falta en este texto. Para la gramática, lo que funciona es señalar: esto es un sustantivo, esto un verbo, este es el sujeto.',
        'Por eso aquí hay juegos de las dos clases. Pon la Tilde y Corrige el Texto entrenan el ojo ortográfico con palabras y textos reales; Analiza la Frase y El Intruso hacen reconocer clases de palabras dentro de frases, que es como aparecen en el examen.',
      ],
      en: [
        'Primary-school Spanish teaches two things that are practised very differently: writing without spelling mistakes, and recognising how words work. For spelling, what helps is seeing many words and deciding quickly: where the accent goes, whether it is b or v, what is wrong in this text. For grammar, what helps is pointing: this is a noun, this is a verb, this is the subject.',
        'That is why there are games of both kinds here. Pon la Tilde and Corrige el Texto train the spelling eye with real words and texts; Analiza la Frase and El Intruso make children recognise parts of speech inside sentences, which is how they appear in exams.',
      ],
      ca: [
        "En llengua castellana de Primària s'aprenen dues coses que es practiquen de manera molt diferent: a escriure sense faltes i a reconèixer com funcionen les paraules. Per a l'ortografia, el que funciona és veure moltes paraules i decidir de pressa: on va l'accent, si és amb b o amb v, què falla en aquest text. Per a la gramàtica, el que funciona és assenyalar: això és un substantiu, això un verb, aquest és el subjecte.",
        "Per això aquí hi ha jocs de les dues menes. Pon la Tilde i Corrige el Texto entrenen l'ull ortogràfic amb paraules i textos reals; Analiza la Frase i El Intruso fan reconèixer classes de paraules dins de frases, que és com surten a l'examen.",
      ],
    },
    practica: {
      es: ['Tildes: agudas, llanas y esdrújulas', 'Ortografía: b/v, g/j y corregir textos', 'Signos de puntuación', 'Clases de palabras: sustantivo, adjetivo, verbo…', 'Sujeto y predicado'],
      en: ['Accents: stress rules', 'Spelling: b/v, g/j and proofreading', 'Punctuation marks', 'Parts of speech: noun, adjective, verb…', 'Subject and predicate'],
      ca: ['Accents: agudes, planes i esdrúixoles', 'Ortografia: b/v, g/j i corregir textos', 'Signes de puntuació', 'Classes de paraules: substantiu, adjectiu, verb…', 'Subjecte i predicat'],
    },
    juegos: ['pon-la-tilde', 'corrige-el-texto', 'analiza-frases', 'intruso'],
    temas: [
      { arte: 'gramatica/sustantivos', ruta: '/estudiar/idiomas/espanol/gramatica/sustantivos', titulo: T('Sustantivos', 'Nouns', 'Substantius') },
      { arte: 'gramatica/adjetivos', ruta: '/estudiar/idiomas/espanol/gramatica/adjetivos', titulo: T('Adjetivos', 'Adjectives', 'Adjectius') },
      { arte: 'gramatica/verbos', ruta: '/estudiar/idiomas/espanol/gramatica/verbos', titulo: T('Verbos', 'Verbs', 'Verbs') },
      { arte: 'gramatica/determinantes', ruta: '/estudiar/idiomas/espanol/gramatica/determinantes', titulo: T('Determinantes', 'Determiners', 'Determinants') },
      { arte: 'gramatica/pronombres', ruta: '/estudiar/idiomas/espanol/gramatica/pronombres', titulo: T('Pronombres', 'Pronouns', 'Pronoms') },
      { arte: 'ortografia/acentuacion', ruta: '/examen/espanol-ortografia-acentuacion-test', titulo: T('Acentuación', 'Accentuation', 'Accentuació') },
      { arte: 'ortografia/bv', ruta: '/examen/espanol-ortografia-bv-test', titulo: T('B y V', 'B and V', 'B i V') },
      { arte: 'ortografia/gj', ruta: '/examen/espanol-ortografia-gj-test', titulo: T('G y J', 'G and J', 'G i J') },
      { arte: 'ortografia/puntuacion', ruta: '/examen/espanol-ortografia-puntuacion-test', titulo: T('Puntuación', 'Punctuation', 'Puntuació') },
    ],
  },
  {
    curso: 'primaria',
    materia: 'ingles',
    arteMateria: 'ingles',
    nombre: T('Inglés', 'English', 'Anglès'),
    titulo: T('Juegos de inglés para Primaria', 'English games for primary school', 'Jocs d\'anglès per a Primària'),
    metaDesc: T(
      'Juegos de inglés para Primaria: ordenar frases, present simple, artículos, sustantivos y verbos, y encontrar las faltas de un texto en inglés.',
      'English games for primary school: word order, present simple, articles, nouns and verbs, and spotting the mistakes in an English text.',
      'Jocs d\'anglès per a Primària: ordenar frases, present simple, articles, substantius i verbs, i trobar les faltes d\'un text en anglès.',
    ),
    intro: {
      es: [
        'El inglés de Primaria se atasca casi siempre en lo mismo: el orden de las palabras, que no es el del castellano, y las piezas pequeñas que no existen en nuestra lengua, como la -s de la tercera persona o la diferencia entre a, an y the. Son cosas que se entienden en cinco minutos y se olvidan en otros cinco si no se usan.',
        'Estos juegos las usan una y otra vez. En Ordena la Frase se construyen oraciones con las palabras desordenadas; en La Pieza que Falta hay que elegir la forma correcta para completar la frase; y Corrige el Texto tiene su modo en inglés para cazar faltas. Todo con frases cortas y vocabulario de Primaria.',
      ],
      en: [
        'Primary-school English nearly always gets stuck in the same places: word order, which differs from Spanish, and the small pieces that do not exist in Spanish, such as the third-person -s or the difference between a, an and the. They take five minutes to understand and five minutes to forget if they are not used.',
        'These games use them again and again. In Ordena la Frase you build sentences from jumbled words; in La Pieza que Falta you pick the right form to complete the sentence; and Corrige el Texto has an English mode for spotting mistakes. All with short sentences and primary-level vocabulary.',
      ],
      ca: [
        "L'anglès de Primària s'encalla gairebé sempre en el mateix: l'ordre de les paraules, que no és el del català ni el del castellà, i les peces petites que no tenim, com la -s de la tercera persona o la diferència entre a, an i the. Són coses que s'entenen en cinc minuts i s'obliden en uns altres cinc si no es fan servir.",
        "Aquests jocs les fan servir una vegada i una altra. A Ordena la Frase es construeixen oracions amb les paraules desordenades; a La Pieza que Falta cal triar la forma correcta per completar la frase; i Corrige el Texto té el seu mode en anglès per caçar faltes. Tot amb frases curtes i vocabulari de Primària.",
      ],
    },
    practica: {
      es: ['El orden de la frase en inglés', 'Present simple y la -s de he/she/it', 'Artículos: a, an, the', 'Sustantivos, verbos y adjetivos', 'Detectar faltas en un texto'],
      en: ['English word order', 'Present simple and the he/she/it -s', 'Articles: a, an, the', 'Nouns, verbs and adjectives', 'Spotting mistakes in a text'],
      ca: ["L'ordre de la frase en anglès", 'Present simple i la -s de he/she/it', 'Articles: a, an, the', 'Substantius, verbs i adjectius', 'Detectar faltes en un text'],
    },
    juegos: ['ordena-frase', 'pieza-que-falta', 'corrige-el-texto'],
    temas: [
      { arte: 'ingles/present-simple', ruta: '/examen/ingles-grammar-present-simple-test', titulo: T('Present Simple', 'Present Simple', 'Present Simple') },
      { arte: 'ingles/articles', ruta: '/examen/ingles-grammar-articles-test', titulo: T('Articles', 'Articles', 'Articles') },
      { arte: 'gramatica/sustantivos', ruta: '/examen/ingles-grammar-nouns-test', titulo: T('Nouns', 'Nouns', 'Nouns') },
      { arte: 'gramatica/verbos', ruta: '/examen/ingles-grammar-verbs-test', titulo: T('Verbs', 'Verbs', 'Verbs') },
      { arte: 'gramatica/adjetivos', ruta: '/examen/ingles-grammar-adjectives-test', titulo: T('Adjectives', 'Adjectives', 'Adjectives') },
      { arte: 'gramatica/pronombres', ruta: '/examen/ingles-grammar-pronouns-test', titulo: T('Pronouns', 'Pronouns', 'Pronouns') },
    ],
  },
  {
    curso: 'primaria',
    materia: 'ciencias-naturales',
    arteMateria: 'biologia',
    nombre: T('Ciencias Naturales', 'Science', 'Ciències Naturals'),
    titulo: T('Juegos de Ciencias Naturales para Primaria', 'Science games for primary school', 'Jocs de Ciències Naturals per a Primària'),
    metaDesc: T(
      'Juegos de Ciencias Naturales para Primaria: el cuerpo humano, las cadenas alimentarias, los estados de la materia, la electricidad, las fuerzas y el sistema solar.',
      'Science games for primary school: the human body, food chains, states of matter, electricity, forces and the solar system.',
      'Jocs de Ciències Naturals per a Primària: el cos humà, les cadenes alimentàries, els estats de la matèria, l\'electricitat, les forces i el sistema solar.',
    ),
    intro: {
      es: [
        'Las Ciencias Naturales de Primaria tienen mucho vocabulario, y memorizarlo de una lista no deja casi nada. Lo que se queda es haberlo visto funcionar: señalar dónde está el hígado en una silueta, decidir quién se come a quién en un bosque, ver qué bombillas se encienden al cerrar un circuito o hacia dónde cae la balanza.',
        'Cada juego de esta página es una de esas situaciones. Cubren el cuerpo humano, los seres vivos y los ecosistemas, la materia y sus cambios de estado, la electricidad, las fuerzas y el sistema solar: el temario de Ciencias Naturales de Primaria, contado con dibujos que se tocan.',
      ],
      en: [
        'Primary science comes with a lot of vocabulary, and memorising it from a list leaves very little behind. What sticks is having seen it work: pointing to where the liver is on a body outline, deciding who eats whom in a forest, seeing which bulbs light up when a circuit closes, or which way a balance tips.',
        'Each game on this page is one of those situations. Together they cover the human body, living things and ecosystems, matter and changes of state, electricity, forces and the solar system: the primary science syllabus, told through pictures you can tap.',
      ],
      ca: [
        "Les Ciències Naturals de Primària tenen molt de vocabulari, i memoritzar-lo d'una llista no deixa gairebé res. El que queda és haver-ho vist funcionar: assenyalar on és el fetge en una silueta, decidir qui es menja qui en un bosc, veure quines bombetes s'encenen en tancar un circuit o cap on cau la balança.",
        "Cada joc d'aquesta pàgina és una d'aquestes situacions. Cobreixen el cos humà, els éssers vius i els ecosistemes, la matèria i els seus canvis d'estat, l'electricitat, les forces i el sistema solar: el temari de Ciències Naturals de Primària, explicat amb dibuixos que es toquen.",
      ],
    },
    practica: {
      es: ['Los órganos del cuerpo humano', 'Cadenas alimentarias: productores y consumidores', 'Sólido, líquido y gas', 'Circuitos eléctricos sencillos', 'Fuerzas, palancas y el sistema solar'],
      en: ['Organs of the human body', 'Food chains: producers and consumers', 'Solid, liquid and gas', 'Simple electric circuits', 'Forces, levers and the solar system'],
      ca: ['Els òrgans del cos humà', 'Cadenes alimentàries: productors i consumidors', 'Sòlid, líquid i gas', 'Circuits elèctrics senzills', 'Forces, palanques i el sistema solar'],
    },
    juegos: ['rayos-x', 'clave-dicotomica', 'lee-la-etiqueta', 'cadena-alimentaria', 'flota-o-se-hunde', 'cambio-estado', 'circuito-cerrado', 'balanza', 'fuerza-neta', 'orbita'],
    temas: [
      { arte: 'biologia/cuerpo-humano', ruta: '/estudiar/biologia/cuerpo-humano', titulo: T('Cuerpo humano', 'Human body', 'Cos humà') },
      { arte: 'biologia/seres-vivos', ruta: '/estudiar/biologia/seres-vivos', titulo: T('Seres vivos', 'Living things', 'Éssers vius') },
      { arte: 'biologia/ecosistemas', ruta: '/estudiar/biologia/ecosistemas', titulo: T('Ecosistemas', 'Ecosystems', 'Ecosistemes') },
      { arte: 'biologia/nutricion', ruta: '/estudiar/biologia/nutricion', titulo: T('Nutrición', 'Nutrition', 'Nutrició') },
      { arte: 'quimica/estados-materia', ruta: '/estudiar/quimica/estados-materia', titulo: T('Estados de la materia', 'States of matter', 'Estats de la matèria') },
      { arte: 'fisica/electricidad', ruta: '/estudiar/fisica/electricidad', titulo: T('Electricidad', 'Electricity', 'Electricitat') },
      { arte: 'fisica/fuerzas', ruta: '/estudiar/fisica/fuerzas', titulo: T('Fuerzas y movimiento', 'Forces and motion', 'Forces i moviment') },
      { arte: 'geologia/sistema-solar', ruta: '/estudiar/geologia/sistema-solar', titulo: T('Sistema solar', 'Solar system', 'Sistema solar') },
    ],
  },
  {
    curso: 'primaria',
    materia: 'ciencias-sociales',
    arteMateria: 'historia',
    nombre: T('Ciencias Sociales', 'History and geography', 'Ciències Socials'),
    titulo: T('Juegos de Ciencias Sociales para Primaria', 'History and geography games for primary school', 'Jocs de Ciències Socials per a Primària'),
    metaDesc: T(
      'Juegos de Ciencias Sociales para Primaria: la línea del tiempo, las etapas de la historia, las comunidades de España, mapas y países del mundo.',
      'History and geography games for primary school: the timeline, the ages of history, Spain’s regions, maps and countries of the world.',
      'Jocs de Ciències Socials per a Primària: la línia del temps, les etapes de la història, les comunitats d\'Espanya, mapes i països del món.',
    ),
    intro: {
      es: [
        'En Ciencias Sociales de Primaria se mezclan dos cosas que un niño tiene que situar: el tiempo y el espacio. Qué pasó antes y qué después (¿los romanos o los dinosaurios?, ¿Colón o la Edad Media?) y dónde está cada lugar en el mapa. Las fechas y los nombres sueltos se olvidan; lo que se queda es saber colocarlos.',
        'Por eso los juegos de esta página son de colocar: eventos en una línea del tiempo, objetos en su época, comunidades y países en el mapa, puntos en un globo con sus coordenadas. Acompañan a los temas de historia de Primaria (de la Prehistoria a la Edad Moderna) y a la geografía de España y del mundo.',
      ],
      en: [
        'Primary-school history and geography mix two things a child has to place: time and space. What happened before and what after (the Romans or the dinosaurs? Columbus or the Middle Ages?) and where each place is on the map. Loose dates and names are forgotten; what stays is knowing where they go.',
        'That is why the games on this page are about placing things: events on a timeline, objects in their era, regions and countries on the map, points on a globe with their coordinates. They go with the primary history topics (from Prehistory to the Early Modern period) and with the geography of Spain and the world.',
      ],
      ca: [
        "A Ciències Socials de Primària es barregen dues coses que un nen ha de situar: el temps i l'espai. Què va passar abans i què després (els romans o els dinosaures?, Colom o l'Edat Mitjana?) i on és cada lloc al mapa. Les dates i els noms solts s'obliden; el que queda és saber-los col·locar.",
        "Per això els jocs d'aquesta pàgina són de col·locar: esdeveniments en una línia del temps, objectes a la seva època, comunitats i països al mapa, punts en un globus amb les seves coordenades. Acompanyen els temes d'història de Primària (de la Prehistòria a l'Edat Moderna) i la geografia d'Espanya i del món.",
      ],
    },
    practica: {
      es: ['Ordenar hechos en la línea del tiempo', 'Las etapas de la historia', 'Las comunidades autónomas de España', 'Países y capitales en el mapa', 'Relieve, ríos y población'],
      en: ['Putting events in order on a timeline', 'The ages of history', 'Spain’s autonomous communities', 'Countries and capitals on the map', 'Relief, rivers and population'],
      ca: ['Ordenar fets a la línia del temps', 'Les etapes de la història', "Les comunitats autònomes d'Espanya", 'Països i capitals al mapa', 'Relleu, rius i població'],
    },
    juegos: ['el-tiempo', 'linea-temporal', 'epocas-historicas', 'geomapa', 'georush', 'coordenadas'],
    temas: [
      { arte: 'historia/primaria', ruta: '/estudiar/historia/primaria', titulo: T('Grandes hitos de la historia', 'Great milestones of history', 'Grans fites de la història') },
      { arte: 'historia/prehistoria', ruta: '/estudiar/historia/prehistoria', titulo: T('Prehistoria', 'Prehistory', 'Prehistòria') },
      { arte: 'historia/antigua', ruta: '/estudiar/historia/antigua', titulo: T('Edad Antigua', 'Antiquity', 'Edat Antiga') },
      { arte: 'historia/edad-media', ruta: '/estudiar/historia/edad-media', titulo: T('Edad Media', 'The Middle Ages', 'Edat Mitjana') },
      { arte: 'historia/edad-moderna', ruta: '/estudiar/historia/edad-moderna', titulo: T('Edad Moderna', 'The Early Modern Period', 'Edat Moderna') },
      { arte: 'geografia/espana', ruta: '/estudiar/geografia/espana', titulo: T('España', 'Spain', 'Espanya') },
      { arte: 'geografia/fisica', ruta: '/examen/geografia-fisica-test', titulo: T('Geografía física', 'Physical geography', 'Geografia física') },
      { arte: 'geografia/humana', ruta: '/examen/geografia-humana-test', titulo: T('Geografía humana', 'Human geography', 'Geografia humana') },
    ],
  },
  {
    curso: 'primaria',
    materia: 'musica',
    arteMateria: 'musica',
    nombre: T('Música', 'Music', 'Música'),
    titulo: T('Juegos de música para Primaria', 'Music games for primary school', 'Jocs de música per a Primària'),
    metaDesc: T(
      'Juegos de música para Primaria: leer notas en el pentagrama con clave de sol, tocarlas en un piano y reconocer figuras, silencios y compases.',
      'Music games for primary school: read notes on the treble-clef staff, play them on a piano and recognise note values, rests and time signatures.',
      'Jocs de música per a Primària: llegir notes al pentagrama amb clau de sol, tocar-les en un piano i reconèixer figures, silencis i compassos.',
    ),
    intro: {
      es: [
        'Leer música es como leer letras: al principio se descifra nota a nota, contando líneas y espacios, y con práctica se reconoce de un vistazo. En Primaria se aprende justo eso, además de las figuras (redonda, blanca, negra, corchea) y cuánto dura cada una.',
        'Pentagrama Path convierte la lectura de notas en un camino que hay que recorrer leyendo el pentagrama, y los exámenes de notas y de ritmo permiten tocar la respuesta en un piano en pantalla o contar los tiempos de un compás. No hace falta saber tocar ningún instrumento para empezar.',
      ],
      en: [
        'Reading music is like reading letters: at first you decode it note by note, counting lines and spaces, and with practice you recognise it at a glance. That is exactly what primary school teaches, along with note values (semibreve, minim, crotchet, quaver) and how long each lasts.',
        'Pentagrama Path turns note reading into a path you follow by reading the staff, and the notes and rhythm exams let children play the answer on an on-screen piano or count the beats in a bar. No instrument is needed to start.',
      ],
      ca: [
        "Llegir música és com llegir lletres: al principi es desxifra nota a nota, comptant línies i espais, i amb pràctica es reconeix d'un cop d'ull. A Primària s'aprèn justament això, a més de les figures (rodona, blanca, negra, corxera) i quant dura cadascuna.",
        "Pentagrama Path converteix la lectura de notes en un camí que cal recórrer llegint el pentagrama, i els exàmens de notes i de ritme permeten tocar la resposta en un piano en pantalla o comptar els temps d'un compàs. No cal saber tocar cap instrument per començar.",
      ],
    },
    practica: {
      es: ['Las notas en clave de sol', 'Tocar la nota en el piano', 'Figuras y silencios', 'Compases de 2, 3 y 4 tiempos'],
      en: ['Notes on the treble clef', 'Playing the note on the piano', 'Note values and rests', 'Bars of 2, 3 and 4 beats'],
      ca: ['Les notes en clau de sol', 'Tocar la nota al piano', 'Figures i silencis', 'Compassos de 2, 3 i 4 temps'],
    },
    juegos: ['pentagrama-path'],
    temas: [
      { arte: 'musica/notas', ruta: '/examen/musica', titulo: T('Notas', 'Notes', 'Notes') },
      { arte: 'musica/ritmo', ruta: '/examen/musica-ritmo-test', titulo: T('Ritmo', 'Rhythm', 'Ritme') },
    ],
  },

  // ── ESO ──────────────────────────────────────────────────────────────────
  {
    curso: 'eso',
    materia: 'matematicas',
    arteMateria: 'matematicas',
    nombre: T('Matemáticas', 'Maths', 'Matemàtiques'),
    titulo: T('Juegos de matemáticas para la ESO', 'Maths games for secondary school', "Jocs de matemàtiques per a l'ESO"),
    metaDesc: T(
      'Juegos de matemáticas para la ESO: ecuaciones con el método de la balanza, funciones y gráficas, números enteros, fracciones, porcentajes y estadística.',
      'Maths games for secondary school: equations with the balance method, functions and graphs, integers, fractions, percentages and statistics.',
      "Jocs de matemàtiques per a l'ESO: equacions amb el mètode de la balança, funcions i gràfiques, nombres enters, fraccions, percentatges i estadística.",
    ),
    intro: {
      es: [
        'Las matemáticas de la ESO se vuelven abstractas de golpe: aparecen las letras, los números negativos y las gráficas, y muchos alumnos pasan de entenderlo todo a no saber por dónde empezar. Casi siempre falla lo mismo: se aprenden reglas ("lo que suma pasa restando") sin la imagen que las explica.',
        'Estos juegos ponen la imagen delante. En Balanza Algebraica se despeja la x quitando lo mismo de los dos platillos, que es exactamente lo que dice la regla; en Caza la Función se mueve la recta o la parábola hasta que encaja con la gráfica; en Salta la Recta los enteros son saltos a izquierda y derecha. Con la imagen clara, la regla deja de ser un truco.',
      ],
      en: [
        'Secondary-school maths suddenly becomes abstract: letters, negative numbers and graphs appear, and many students go from understanding everything to not knowing where to start. The same thing nearly always fails: rules are learnt ("what is added moves across as a subtraction") without the picture that explains them.',
        'These games put the picture first. In Balanza Algebraica you solve for x by removing the same thing from both pans, which is exactly what the rule says; in Caza la Función you move the line or the parabola until it fits the graph; in Salta la Recta integers are jumps to the left and right. With the picture clear, the rule stops being a trick.',
      ],
      ca: [
        "Les matemàtiques de l'ESO es tornen abstractes de cop: apareixen les lletres, els nombres negatius i les gràfiques, i molts alumnes passen d'entendre-ho tot a no saber per on començar. Gairebé sempre falla el mateix: s'aprenen regles (\"el que suma passa restant\") sense la imatge que les explica.",
        "Aquests jocs posen la imatge al davant. A Balanza Algebraica s'aïlla la x traient el mateix dels dos plats, que és exactament el que diu la regla; a Caza la Función es mou la recta o la paràbola fins que encaixa amb la gràfica; a Salta la Recta els enters són salts a esquerra i dreta. Amb la imatge clara, la regla deixa de ser un truc.",
      ],
    },
    practica: {
      es: ['Ecuaciones de primer grado', 'Funciones lineales y cuadráticas', 'Números enteros y racionales', 'Fracciones y porcentajes', 'Estadística: media, mediana y moda'],
      en: ['Linear equations', 'Linear and quadratic functions', 'Integers and rational numbers', 'Fractions and percentages', 'Statistics: mean, median and mode'],
      ca: ['Equacions de primer grau', 'Funcions lineals i quadràtiques', 'Nombres enters i racionals', 'Fraccions i percentatges', 'Estadística: mitjana, mediana i moda'],
    },
    juegos: ['balanza-algebraica', 'funciones-grafica', 'rebajas', 'trayectoria', 'portero', 'salta-recta', 'reparte-pastel', 'estadistico-expres', 'lee-el-grafico', 'acercate', 'numpath'],
    temas: [
      { arte: 'matematicas/algebra', ruta: '/estudiar/matematicas/algebra', titulo: T('Álgebra', 'Algebra', 'Àlgebra') },
      { arte: 'matematicas/funciones', ruta: '/estudiar/matematicas/funciones', titulo: T('Funciones', 'Functions', 'Funcions') },
      { arte: 'matematicas/enteros-racionales', ruta: '/estudiar/matematicas/enteros-racionales', titulo: T('Enteros y racionales', 'Integers and rationals', 'Enters i racionals') },
      { arte: 'matematicas/fracciones', ruta: '/estudiar/matematicas/fracciones', titulo: T('Fracciones y decimales', 'Fractions and decimals', 'Fraccions i decimals') },
      { arte: 'matematicas/porcentajes', ruta: '/estudiar/matematicas/porcentajes', titulo: T('Proporcionalidad y porcentajes', 'Proportion and percentages', 'Proporcionalitat i percentatges') },
      { arte: 'matematicas/geometria', ruta: '/estudiar/matematicas/geometria', titulo: T('Geometría', 'Geometry', 'Geometria') },
      { arte: 'matematicas/estadistica', ruta: '/estudiar/matematicas/estadistica', titulo: T('Estadística y probabilidad', 'Statistics and probability', 'Estadística i probabilitat') },
    ],
  },
  {
    curso: 'eso',
    materia: 'lengua',
    arteMateria: 'espanol',
    nombre: T('Lengua y Literatura', 'Spanish language', 'Llengua castellana'),
    titulo: T('Juegos de lengua para la ESO', 'Spanish language games for secondary school', "Jocs de llengua castellana per a l'ESO"),
    metaDesc: T(
      'Juegos de lengua para la ESO: análisis sintáctico (sujeto, predicado, CD, CI), clases de palabras, acentuación, puntuación, corrección de textos y literatura.',
      'Spanish language games for secondary school: syntax (subject, predicate, direct and indirect object), parts of speech, accents, punctuation, proofreading and literature.',
      "Jocs de llengua castellana per a l'ESO: anàlisi sintàctica (subjecte, predicat, CD, CI), classes de paraules, accentuació, puntuació, correcció de textos i literatura.",
    ),
    intro: {
      es: [
        'El salto de la ESO en lengua es el análisis sintáctico. Ya no basta con saber qué es un verbo: hay que encontrar el sujeto de una oración, separar el predicado y reconocer dentro de él el complemento directo, el indirecto o el circunstancial. Es un razonamiento en cadena, y una pregunta de examen puede fallar entera por un solo paso mal dado.',
        'Analiza la Frase entrena justo esa cadena con oraciones que se generan cada vez, de modo que no se memorizan las respuestas: cada ronda pide identificar una función en una frase nueva. La ortografía sigue contando en todos los exámenes, y para ella están Pon la Tilde y Corrige el Texto, con palabras y textos propios de este nivel.',
      ],
      en: [
        'The big step in secondary-school Spanish is syntax. Knowing what a verb is no longer suffices: you have to find the subject of a sentence, separate the predicate and recognise within it the direct, indirect or adverbial object. It is chained reasoning, and a whole exam question can go wrong because of a single wrong step.',
        'Analiza la Frase trains exactly that chain with sentences generated every time, so answers cannot be memorised: each round asks you to identify a function in a new sentence. Spelling still counts in every exam, and for that there are Pon la Tilde and Corrige el Texto, with words and texts suited to this level.',
      ],
      ca: [
        "El salt de l'ESO en llengua castellana és l'anàlisi sintàctica. Ja no n'hi ha prou de saber què és un verb: cal trobar el subjecte d'una oració, separar el predicat i reconèixer-hi el complement directe, l'indirecte o el circumstancial. És un raonament en cadena, i una pregunta d'examen pot fallar sencera per un sol pas mal fet.",
        "Analiza la Frase entrena justament aquesta cadena amb oracions que es generen cada vegada, de manera que no es memoritzen les respostes: cada ronda demana identificar una funció en una frase nova. L'ortografia segueix comptant a tots els exàmens, i per a això hi ha Pon la Tilde i Corrige el Texto, amb paraules i textos propis d'aquest nivell.",
      ],
    },
    practica: {
      es: ['Sujeto y predicado', 'Complementos: CD, CI y circunstanciales', 'Clases de palabras en contexto', 'Acentuación y puntuación', 'Corrección de textos y literatura'],
      en: ['Subject and predicate', 'Objects: direct, indirect and adverbial', 'Parts of speech in context', 'Accents and punctuation', 'Proofreading and literature'],
      ca: ['Subjecte i predicat', 'Complements: CD, CI i circumstancials', 'Classes de paraules en context', 'Accentuació i puntuació', 'Correcció de textos i literatura'],
    },
    juegos: ['analiza-frases', 'pon-la-tilde', 'corrige-el-texto', 'intruso'],
    temas: [
      { arte: 'gramatica/sintaxis', ruta: '/estudiar/idiomas/espanol/gramatica/sintaxis', titulo: T('Sintaxis', 'Syntax', 'Sintaxi') },
      { arte: 'gramatica/verbos', ruta: '/estudiar/idiomas/espanol/gramatica/verbos', titulo: T('Verbos', 'Verbs', 'Verbs') },
      { arte: 'gramatica/pronombres', ruta: '/estudiar/idiomas/espanol/gramatica/pronombres', titulo: T('Pronombres', 'Pronouns', 'Pronoms') },
      { arte: 'gramatica/adverbios', ruta: '/estudiar/idiomas/espanol/gramatica/adverbios', titulo: T('Adverbios', 'Adverbs', 'Adverbis') },
      { arte: 'gramatica/nexos', ruta: '/estudiar/idiomas/espanol/gramatica/nexos', titulo: T('Preposiciones y conjunciones', 'Prepositions and conjunctions', 'Preposicions i conjuncions') },
      { arte: 'ortografia/acentuacion', ruta: '/examen/espanol-ortografia-acentuacion-test', titulo: T('Acentuación', 'Accentuation', 'Accentuació') },
      { arte: 'ortografia/puntuacion', ruta: '/examen/espanol-ortografia-puntuacion-test', titulo: T('Puntuación', 'Punctuation', 'Puntuació') },
      { arte: 'lengua/literatura', ruta: '/examen/espanol-literatura-test', titulo: T('Literatura', 'Literature', 'Literatura') },
    ],
  },
  {
    curso: 'eso',
    materia: 'ingles',
    arteMateria: 'ingles',
    nombre: T('Inglés', 'English', 'Anglès'),
    titulo: T('Juegos de inglés para la ESO', 'English games for secondary school', "Jocs d'anglès per a l'ESO"),
    metaDesc: T(
      'Juegos de inglés para la ESO: past simple, present perfect, voz pasiva, conectores, adverbios, orden de la frase y corrección de textos en inglés.',
      'English games for secondary school: past simple, present perfect, the passive, connectors, adverbs, word order and proofreading English texts.',
      "Jocs d'anglès per a l'ESO: past simple, present perfect, veu passiva, connectors, adverbis, ordre de la frase i correcció de textos en anglès.",
    ),
    intro: {
      es: [
        'En la ESO el inglés deja de ser vocabulario suelto y pasa a ser gramática que hay que elegir: ¿past simple o present perfect?, ¿activa o pasiva?, ¿because o although? Los errores típicos no son de no saber la regla, sino de aplicarla en el sitio equivocado, y eso solo se corrige viendo muchas frases distintas.',
        'La Pieza que Falta mezcla todos esos temas en frases para completar a contrarreloj, que es como aparecen en los exámenes; Ordena la Frase trabaja la estructura (dónde va el adverbio, cómo se forma la pregunta) y Corrige el Texto en inglés obliga a leer con atención. Cada tema tiene además su examen de diez preguntas con explicación.',
      ],
      en: [
        'In secondary school English stops being loose vocabulary and becomes grammar you have to choose: past simple or present perfect? active or passive? because or although? Typical mistakes are not about not knowing the rule but about applying it in the wrong place, and that only improves by seeing lots of different sentences.',
        'La Pieza que Falta mixes all those topics into sentences to complete against the clock, which is how they appear in exams; Ordena la Frase works on structure (where the adverb goes, how a question is formed) and the English mode of Corrige el Texto forces careful reading. Each topic also has its own ten-question exam with explanations.',
      ],
      ca: [
        "A l'ESO l'anglès deixa de ser vocabulari solt i passa a ser gramàtica que cal triar: past simple o present perfect?, activa o passiva?, because o although? Els errors típics no són de no saber la regla, sinó d'aplicar-la al lloc equivocat, i això només es corregeix veient moltes frases diferents.",
        "La Pieza que Falta barreja tots aquests temes en frases per completar a contrarellotge, que és com surten als exàmens; Ordena la Frase treballa l'estructura (on va l'adverbi, com es forma la pregunta) i Corrige el Texto en anglès obliga a llegir amb atenció. Cada tema té a més el seu examen de deu preguntes amb explicació.",
      ],
    },
    practica: {
      es: ['Past simple y present perfect', 'La voz pasiva', 'Conectores y preposiciones', 'Adverbios y orden de la frase', 'Detectar errores en un texto'],
      en: ['Past simple and present perfect', 'The passive voice', 'Connectors and prepositions', 'Adverbs and word order', 'Spotting mistakes in a text'],
      ca: ['Past simple i present perfect', 'La veu passiva', 'Connectors i preposicions', "Adverbis i ordre de la frase", 'Detectar errors en un text'],
    },
    juegos: ['pieza-que-falta', 'ordena-frase', 'corrige-el-texto'],
    temas: [
      { arte: 'ingles/past-simple', ruta: '/examen/ingles-grammar-past-simple-test', titulo: T('Past Simple', 'Past Simple', 'Past Simple') },
      { arte: 'ingles/present-perfect', ruta: '/examen/ingles-grammar-present-perfect-test', titulo: T('Present Perfect', 'Present Perfect', 'Present Perfect') },
      { arte: 'ingles/passive', ruta: '/examen/ingles-grammar-passive-test', titulo: T('Passive Voice', 'Passive Voice', 'Passive Voice') },
      { arte: 'gramatica/nexos', ruta: '/examen/ingles-grammar-connectors-test', titulo: T('Prepositions & Conjunctions', 'Prepositions & Conjunctions', 'Prepositions & Conjunctions') },
      { arte: 'gramatica/adverbios', ruta: '/examen/ingles-grammar-adverbs-test', titulo: T('Adverbs', 'Adverbs', 'Adverbs') },
      { arte: 'ingles/articles', ruta: '/examen/ingles-grammar-articles-test', titulo: T('Articles', 'Articles', 'Articles') },
    ],
  },
  {
    curso: 'eso',
    materia: 'fisica-quimica',
    arteMateria: 'fisica',
    nombre: T('Física y Química', 'Physics and chemistry', 'Física i Química'),
    titulo: T('Juegos de Física y Química para la ESO', 'Physics and chemistry games for secondary school', "Jocs de Física i Química per a l'ESO"),
    metaDesc: T(
      'Juegos de Física y Química para la ESO: fuerzas y leyes de Newton, palancas, circuitos, cambios de estado, tabla periódica y ajuste de reacciones químicas.',
      'Physics and chemistry games for secondary school: forces and Newton’s laws, levers, circuits, changes of state, the periodic table and balancing chemical equations.',
      "Jocs de Física i Química per a l'ESO: forces i lleis de Newton, palanques, circuits, canvis d'estat, taula periòdica i ajust de reaccions químiques.",
    ),
    intro: {
      es: [
        'Física y Química es la asignatura de la ESO donde más se nota la diferencia entre memorizar y entender. Se puede recitar la ley de Ohm o que "la materia no se crea ni se destruye" y aun así no saber qué bombilla se apaga al abrir un interruptor o por qué hay que poner un 2 delante del H₂O para ajustar una reacción.',
        'Cada juego de esta página es un pequeño laboratorio: se suman fuerzas y se ve hacia dónde se mueve el objeto, se equilibra una palanca con pesos a distinta distancia, se predice un circuito en serie o en paralelo, se lleva una sustancia de sólido a gas y se ajustan reacciones contando átomos a los dos lados, como en la pizarra.',
      ],
      en: [
        'Physics and chemistry is the secondary subject where the difference between memorising and understanding shows most. You can recite Ohm’s law or that "matter is neither created nor destroyed" and still not know which bulb goes out when a switch opens, or why you need a 2 in front of H₂O to balance a reaction.',
        'Each game on this page is a small lab: you add forces and see which way the object moves, balance a lever with weights at different distances, predict a series or parallel circuit, take a substance from solid to gas and balance reactions by counting atoms on both sides, just like on the whiteboard.',
      ],
      ca: [
        "Física i Química és l'assignatura de l'ESO on més es nota la diferència entre memoritzar i entendre. Es pot recitar la llei d'Ohm o que \"la matèria no es crea ni es destrueix\" i tot i així no saber quina bombeta s'apaga en obrir un interruptor o per què cal posar un 2 davant de l'H₂O per ajustar una reacció.",
        "Cada joc d'aquesta pàgina és un petit laboratori: se sumen forces i es veu cap on es mou l'objecte, s'equilibra una palanca amb pesos a diferent distància, es prediu un circuit en sèrie o en paral·lel, es porta una substància de sòlid a gas i s'ajusten reaccions comptant àtoms als dos costats, com a la pissarra.",
      ],
    },
    practica: {
      es: ['Fuerzas resultantes y leyes de Newton', 'Palancas y momentos', 'Circuitos en serie y en paralelo', 'Cambios de estado de la materia', 'Ácidos, bases y la escala de pH', 'Tabla periódica y ajuste de reacciones'],
      en: ['Net forces and Newton’s laws', 'Levers and moments', 'Series and parallel circuits', 'Changes of state of matter', 'Acids, bases and the pH scale', 'The periodic table and balancing equations'],
      ca: ['Forces resultants i lleis de Newton', 'Palanques i moments', 'Circuits en sèrie i en paral·lel', "Canvis d'estat de la matèria", 'Àcids, bases i l’escala de pH', 'Taula periòdica i ajust de reaccions'],
    },
    juegos: ['fuerza-neta', 'balanza', 'flota-o-se-hunde', 'engranajes', 'circuito-cerrado', 'cambio-estado', 'medidor-ph', 'encuentra-elemento', 'balanza-ecuaciones'],
    temas: [
      { arte: 'fisica/fuerzas', ruta: '/estudiar/fisica/fuerzas', titulo: T('Fuerzas y movimiento', 'Forces and motion', 'Forces i moviment') },
      { arte: 'fisica/energia', ruta: '/estudiar/fisica/energia', titulo: T('Energía', 'Energy', 'Energia') },
      { arte: 'fisica/electricidad', ruta: '/estudiar/fisica/electricidad', titulo: T('Electricidad', 'Electricity', 'Electricitat') },
      { arte: 'fisica/presion-fluidos', ruta: '/estudiar/fisica/presion-fluidos', titulo: T('Presión y fluidos', 'Pressure and fluids', 'Pressió i fluids') },
      { arte: 'quimica/tabla-periodica', ruta: '/estudiar/quimica/tabla-periodica', titulo: T('Tabla periódica', 'Periodic table', 'Taula periòdica') },
      { arte: 'quimica/atomos-moleculas', ruta: '/estudiar/quimica/atomos-moleculas', titulo: T('Átomos y moléculas', 'Atoms and molecules', 'Àtoms i molècules') },
      { arte: 'quimica/formulacion', ruta: '/estudiar/quimica/formulacion', titulo: T('Formulación química', 'Chemical formulas', 'Formulació química') },
      { arte: 'quimica/acidos-bases', ruta: '/estudiar/quimica/acidos-bases', titulo: T('Ácidos y bases', 'Acids and bases', 'Àcids i bases') },
    ],
  },
  {
    curso: 'eso',
    materia: 'biologia-geologia',
    arteMateria: 'biologia',
    nombre: T('Biología y Geología', 'Biology and geology', 'Biologia i Geologia'),
    titulo: T('Juegos de Biología y Geología para la ESO', 'Biology and geology games for secondary school', "Jocs de Biologia i Geologia per a l'ESO"),
    metaDesc: T(
      'Juegos de Biología y Geología para la ESO: la célula al microscopio, genética y herencia, el cuerpo humano, cadenas tróficas, el sistema solar y las placas tectónicas.',
      'Biology and geology games for secondary school: the cell under the microscope, genetics and heredity, the human body, food webs, the solar system and plate tectonics.',
      "Jocs de Biologia i Geologia per a l'ESO: la cèl·lula al microscopi, genètica i herència, el cos humà, xarxes tròfiques, el sistema solar i les plaques tectòniques.",
    ),
    intro: {
      es: [
        'Biología y Geología pide ver cosas que no se ven: la célula y sus orgánulos, cómo pasan los genes de padres a hijos, los órganos por dentro del cuerpo, el movimiento de las placas bajo nuestros pies. En el libro son esquemas; en el examen hay que reconocerlos y razonar con ellos.',
        'Bajo el Microscopio combina una célula dibujada con fotos reales de preparaciones para localizar orgánulos; Genética hace predecir la descendencia con el cuadro de Punnett; Rayos X pide señalar órganos en una silueta; Cadena Alimentaria ordena quién se come a quién, y Órbita pone a prueba el sistema solar. Cada tema tiene además su página de estudio con resumen y examen.',
      ],
      en: [
        'Biology and geology asks you to see things you cannot see: the cell and its organelles, how genes pass from parents to children, the organs inside the body, the plates moving under our feet. In the textbook they are diagrams; in the exam you have to recognise them and reason with them.',
        'Bajo el Microscopio combines a drawn cell with real slide photos to locate organelles; Genética has you predict offspring with a Punnett square; Rayos X asks you to point to organs on a body outline; Cadena Alimentaria orders who eats whom, and Órbita tests the solar system. Each topic also has its own study page with a summary and an exam.',
      ],
      ca: [
        "Biologia i Geologia demana veure coses que no es veuen: la cèl·lula i els seus orgànuls, com passen els gens de pares a fills, els òrgans per dins del cos, el moviment de les plaques sota els nostres peus. Al llibre són esquemes; a l'examen cal reconèixer-los i raonar-hi.",
        "Bajo el Microscopio combina una cèl·lula dibuixada amb fotos reals de preparacions per localitzar orgànuls; Genètica fa predir la descendència amb el quadre de Punnett; Rayos X demana assenyalar òrgans en una silueta; Cadena Alimentaria ordena qui es menja qui, i Órbita posa a prova el sistema solar. Cada tema té a més la seva pàgina d'estudi amb resum i examen.",
      ],
    },
    practica: {
      es: ['La célula y sus orgánulos', 'Genética: herencia y cuadro de Punnett', 'Anatomía del cuerpo humano', 'Ecosistemas y cadenas tróficas', 'El sistema solar y las placas tectónicas'],
      en: ['The cell and its organelles', 'Genetics: heredity and Punnett squares', 'Human body anatomy', 'Ecosystems and food chains', 'The solar system and plate tectonics'],
      ca: ['La cèl·lula i els seus orgànuls', 'Genètica: herència i quadre de Punnett', 'Anatomia del cos humà', 'Ecosistemes i cadenes tròfiques', 'El sistema solar i les plaques tectòniques'],
    },
    juegos: ['microscopio', 'genetica', 'clave-dicotomica', 'rayos-x', 'lee-la-etiqueta', 'cadena-alimentaria', 'el-tiempo', 'orbita'],
    temas: [
      { arte: 'biologia/celula', ruta: '/estudiar/biologia/celula', titulo: T('La célula', 'The cell', 'La cèl·lula') },
      { arte: 'biologia/genetica', ruta: '/estudiar/biologia/genetica', titulo: T('Genética', 'Genetics', 'Genètica') },
      { arte: 'biologia/evolucion', ruta: '/estudiar/biologia/evolucion', titulo: T('Evolución', 'Evolution', 'Evolució') },
      { arte: 'biologia/cuerpo-humano', ruta: '/estudiar/biologia/cuerpo-humano', titulo: T('Cuerpo humano', 'Human body', 'Cos humà') },
      { arte: 'biologia/ecosistemas', ruta: '/estudiar/biologia/ecosistemas', titulo: T('Ecosistemas', 'Ecosystems', 'Ecosistemes') },
      { arte: 'biologia/nutricion', ruta: '/estudiar/biologia/nutricion', titulo: T('Nutrición', 'Nutrition', 'Nutrició') },
      { arte: 'geologia/placas-tectonicas', ruta: '/estudiar/geologia/placas-tectonicas', titulo: T('Placas tectónicas', 'Tectonic plates', 'Plaques tectòniques') },
      { arte: 'geologia/rocas-minerales', ruta: '/estudiar/geologia/rocas-minerales', titulo: T('Rocas y minerales', 'Rocks and minerals', 'Roques i minerals') },
    ],
  },
  {
    curso: 'eso',
    materia: 'geografia-historia',
    arteMateria: 'historia',
    nombre: T('Geografía e Historia', 'History and geography', 'Geografia i Història'),
    titulo: T('Juegos de Geografía e Historia para la ESO', 'History and geography games for secondary school', "Jocs de Geografia i Història per a l'ESO"),
    metaDesc: T(
      'Juegos de Geografía e Historia para la ESO: de la Edad Media a la Guerra Fría, la Guerra Civil y el franquismo, personajes históricos, mapas de Europa y del mundo.',
      'History and geography games for secondary school: from the Middle Ages to the Cold War, the Spanish Civil War and Franco’s regime, historical figures, maps of Europe and the world.',
      "Jocs de Geografia i Història per a l'ESO: de l'Edat Mitjana a la Guerra Freda, la Guerra Civil i el franquisme, personatges històrics, mapes d'Europa i del món.",
    ),
    intro: {
      es: [
        'La Historia de la ESO recorre muchos siglos en pocos cursos, y el riesgo es que todo se convierta en una lista de fechas sin conexión. Lo que da sentido al temario es la cronología: saber que la Revolución Francesa va antes que la Industrial, que la Primera Guerra Mundial explica la Segunda, o qué pasaba en el mundo mientras España vivía la Guerra Civil.',
        'Los juegos de esta página trabajan esa cronología de varias formas: ordenar hechos en una línea del tiempo, adivinar a qué época pertenece un objeto o una portada de periódico, identificar a un personaje por sus pistas o viajar en el tiempo en Tuthor Time. Para geografía están los mapas de países y capitales y las coordenadas en el globo.',
      ],
      en: [
        'Secondary-school history covers many centuries in a few years, and the risk is that it all becomes a list of unconnected dates. What gives the syllabus meaning is chronology: knowing that the French Revolution comes before the Industrial one, that the First World War explains the Second, or what was happening in the world while Spain lived through its Civil War.',
        'The games on this page work on that chronology in several ways: putting events in order on a timeline, guessing which era an object or a newspaper front page belongs to, identifying a figure from clues or travelling through time in Tuthor Time. For geography there are maps of countries and capitals and coordinates on the globe.',
      ],
      ca: [
        "La Història de l'ESO recorre molts segles en pocs cursos, i el risc és que tot es converteixi en una llista de dates sense connexió. El que dona sentit al temari és la cronologia: saber que la Revolució Francesa va abans que la Industrial, que la Primera Guerra Mundial explica la Segona, o què passava al món mentre Espanya vivia la Guerra Civil.",
        "Els jocs d'aquesta pàgina treballen aquesta cronologia de diverses maneres: ordenar fets en una línia del temps, endevinar a quina època pertany un objecte o una portada de diari, identificar un personatge per les seves pistes o viatjar en el temps a Tuthor Time. Per a la geografia hi ha els mapes de països i capitals i les coordenades al globus.",
      ],
    },
    practica: {
      es: ['Cronología: ordenar hechos y épocas', 'De la Edad Media a la Guerra Fría', 'Guerra Civil, franquismo y Transición', 'Personajes históricos', 'Mapas: países, capitales y coordenadas'],
      en: ['Chronology: ordering events and eras', 'From the Middle Ages to the Cold War', 'Spanish Civil War, Franco and the Transition', 'Historical figures', 'Maps: countries, capitals and coordinates'],
      ca: ['Cronologia: ordenar fets i èpoques', "De l'Edat Mitjana a la Guerra Freda", 'Guerra Civil, franquisme i Transició', 'Personatges històrics', 'Mapes: països, capitals i coordenades'],
    },
    juegos: ['linea-temporal', 'tuthor-time', 'quien-es-quien', 'epocas-historicas', 'portadas', 'geomapa', 'georush', 'coordenadas'],
    temas: [
      { arte: 'historia/edad-media', ruta: '/estudiar/historia/edad-media', titulo: T('Edad Media', 'The Middle Ages', 'Edat Mitjana') },
      { arte: 'historia/edad-moderna', ruta: '/estudiar/historia/edad-moderna', titulo: T('Edad Moderna', 'The Early Modern Period', 'Edat Moderna') },
      { arte: 'historia/revolucion-francesa', ruta: '/estudiar/historia/revolucion-francesa', titulo: T('Revolución Francesa', 'French Revolution', 'Revolució Francesa') },
      { arte: 'historia/revolucion-industrial', ruta: '/estudiar/historia/revolucion-industrial', titulo: T('Revolución Industrial', 'Industrial Revolution', 'Revolució Industrial') },
      { arte: 'historia/primera-guerra-mundial', ruta: '/estudiar/historia/primera-guerra-mundial', titulo: T('Primera Guerra Mundial', 'World War I', 'Primera Guerra Mundial') },
      { arte: 'historia/wwii', ruta: '/estudiar/historia/wwii', titulo: T('Segunda Guerra Mundial', 'World War II', 'Segona Guerra Mundial') },
      { arte: 'historia/gce', ruta: '/estudiar/historia/gce', titulo: T('Guerra Civil Española', 'Spanish Civil War', 'Guerra Civil Espanyola') },
      { arte: 'historia/guerra-fria', ruta: '/estudiar/historia/guerra-fria', titulo: T('Guerra Fría', 'The Cold War', 'Guerra Freda') },
      { arte: 'historia/franquismo', ruta: '/estudiar/historia/franquismo', titulo: T('Franquismo y Transición', 'Francoism and Transition', 'Franquisme i Transició') },
      { arte: 'geografia/europa', ruta: '/estudiar/geografia/europa', titulo: T('Europa', 'Europe', 'Europa') },
      { arte: 'geografia/fisica', ruta: '/examen/geografia-fisica-test', titulo: T('Geografía física', 'Physical geography', 'Geografia física') },
      { arte: 'geografia/humana', ruta: '/examen/geografia-humana-test', titulo: T('Geografía humana', 'Human geography', 'Geografia humana') },
    ],
  },
  {
    curso: 'eso',
    materia: 'musica',
    arteMateria: 'musica',
    nombre: T('Música', 'Music', 'Música'),
    titulo: T('Juegos de música para la ESO', 'Music games for secondary school', "Jocs de música per a l'ESO"),
    metaDesc: T(
      'Juegos de música para la ESO: lectura de notas en el pentagrama, el piano, figuras rítmicas, silencios y compases, con exámenes de lenguaje musical.',
      'Music games for secondary school: reading notes on the staff, the piano, rhythmic values, rests and time signatures, with music theory exams.',
      "Jocs de música per a l'ESO: lectura de notes al pentagrama, el piano, figures rítmiques, silencis i compassos, amb exàmens de llenguatge musical.",
    ),
    intro: {
      es: [
        'En la ESO el lenguaje musical se da por sabido, pero muchos alumnos llegan leyendo las notas despacio, contando líneas. Eso convierte cada partitura en un jeroglífico y cada ejercicio de ritmo en una suma de fracciones que no termina de cuadrar.',
        'Pentagrama Path entrena la lectura a velocidad, que es lo que falta; el examen de notas pide tocar en un piano en pantalla la nota que aparece, y el de ritmo trabaja figuras, silencios y cuántos tiempos caben en cada compás. Sirven para ponerse al día o para repasar antes del examen de música.',
      ],
      en: [
        'In secondary school music theory is taken as known, but many students still read notes slowly, counting lines. That turns every score into hieroglyphics and every rhythm exercise into a sum of fractions that never quite adds up.',
        'Pentagrama Path trains reading at speed, which is what is missing; the notes exam asks you to play the note shown on an on-screen piano, and the rhythm exam works on note values, rests and how many beats fit in each bar. They help to catch up or to revise before the music test.',
      ],
      ca: [
        "A l'ESO el llenguatge musical es dona per sabut, però molts alumnes arriben llegint les notes a poc a poc, comptant línies. Això converteix cada partitura en un jeroglífic i cada exercici de ritme en una suma de fraccions que no acaba de quadrar.",
        "Pentagrama Path entrena la lectura a velocitat, que és el que falta; l'examen de notes demana tocar en un piano en pantalla la nota que apareix, i el de ritme treballa figures, silencis i quants temps caben a cada compàs. Serveixen per posar-se al dia o per repassar abans de l'examen de música.",
      ],
    },
    practica: {
      es: ['Leer notas con fluidez', 'Localizar notas en el piano', 'Figuras, silencios y puntillos', 'Compases simples'],
      en: ['Reading notes fluently', 'Finding notes on the piano', 'Note values, rests and dots', 'Simple time signatures'],
      ca: ['Llegir notes amb fluïdesa', 'Localitzar notes al piano', 'Figures, silencis i punts', 'Compassos simples'],
    },
    juegos: ['pentagrama-path'],
    temas: [
      { arte: 'musica/notas', ruta: '/examen/musica', titulo: T('Notas', 'Notes', 'Notes') },
      { arte: 'musica/ritmo', ruta: '/examen/musica-ritmo-test', titulo: T('Ritmo', 'Rhythm', 'Ritme') },
    ],
  },
  {
    curso: 'eso',
    materia: 'economia',
    arteMateria: 'economia',
    nombre: T('Economía', 'Economics', 'Economia'),
    titulo: T('Juegos de economía para la ESO', 'Economics games for secondary school', "Jocs d'economia per a l'ESO"),
    metaDesc: T(
      'Juegos de economía y finanzas personales para la ESO: ahorro, inflación, interés compuesto, deudas y cómo detectar una estafa, con una simulación de vida real.',
      'Economics and personal finance games for secondary school: saving, inflation, compound interest, debt and how to spot a scam, with a real-life simulation.',
      "Jocs d'economia i finances personals per a l'ESO: estalvi, inflació, interès compost, deutes i com detectar una estafa, amb una simulació de vida real.",
    ),
    intro: {
      es: [
        'La economía de 4º de la ESO es la parte del temario con más aplicación inmediata: qué es la inflación y por qué los ahorros pierden valor, cómo crece el dinero con el interés compuesto, qué cuesta de verdad un préstamo o cómo reconocer una oferta demasiado buena para ser cierta.',
        'Spicy lo convierte en una simulación: cada mes llega el sueldo, hay gastos, imprevistos y decisiones de ahorro o inversión, y al final se ve el patrimonio conseguido. Es la forma más rápida de entender por qué dos personas con el mismo sueldo acaban en situaciones muy distintas. La ficha de finanzas personales resume la teoría.',
      ],
      en: [
        'Year-10 economics is the part of the syllabus with the most immediate use: what inflation is and why savings lose value, how money grows with compound interest, what a loan really costs, or how to recognise an offer that is too good to be true.',
        'Spicy turns it into a simulation: every month the salary arrives, with expenses, surprises and decisions about saving or investing, and at the end you see the wealth you built. It is the quickest way to understand why two people on the same salary end up in very different situations. The personal finance page summarises the theory.',
      ],
      ca: [
        "L'economia de 4t d'ESO és la part del temari amb més aplicació immediata: què és la inflació i per què els estalvis perden valor, com creixen els diners amb l'interès compost, què costa de debò un préstec o com reconèixer una oferta massa bona per ser certa.",
        "Spicy ho converteix en una simulació: cada mes arriba el sou, hi ha despeses, imprevistos i decisions d'estalvi o inversió, i al final es veu el patrimoni aconseguit. És la manera més ràpida d'entendre per què dues persones amb el mateix sou acaben en situacions molt diferents. La fitxa de finances personals resumeix la teoria.",
      ],
    },
    practica: {
      es: ['Presupuesto, ingresos y gastos', 'Inflación y poder adquisitivo', 'Ahorro e interés compuesto', 'Deudas y préstamos', 'Señales de estafa'],
      en: ['Budget, income and expenses', 'Inflation and purchasing power', 'Saving and compound interest', 'Debt and loans', 'Scam warning signs'],
      ca: ['Pressupost, ingressos i despeses', 'Inflació i poder adquisitiu', 'Estalvi i interès compost', 'Deutes i préstecs', "Senyals d'estafa"],
    },
    juegos: ['spicy'],
    temas: [
      { arte: 'economia/finanzas-personales', ruta: '/info/estudiar/finanzas-personales', titulo: T('Finanzas personales', 'Personal finance', 'Finances personals') },
    ],
  },
  // ── Bachillerato ─────────────────────────────────────────────────────────
  {
    curso: 'bachillerato',
    materia: 'matematicas',
    arteMateria: 'matematicas',
    nombre: T('Matemáticas', 'Maths', 'Matemàtiques'),
    titulo: T('Matemáticas de Bachillerato: funciones, álgebra y estadística', 'Sixth-form maths: functions, algebra and statistics', 'Matemàtiques de Batxillerat: funcions, àlgebra i estadística'),
    metaDesc: T(
      'Funciones y sus gráficas, sistemas y ecuaciones de segundo grado, geometría y estadística para Bachillerato, con ejercicios que se corrigen y explican al momento.',
      'Functions and their graphs, simultaneous and quadratic equations, geometry and statistics for sixth form, with exercises marked and explained instantly.',
      'Funcions i les seves gràfiques, sistemes i equacions de segon grau, geometria i estadística per a Batxillerat, amb exercicis que es corregeixen i expliquen al moment.',
    ),
    intro: {
      es: [
        'En Bachillerato casi todo pasa por las funciones: el análisis, los límites y las derivadas se apoyan en saber ver de un vistazo qué hace una función y cómo es su gráfica. Quien llega con eso flojo pierde puntos en ejercicios que en realidad entiende, porque se equivoca al leer la gráfica o al plantear.',
        'Los juegos de esta página entrenan exactamente esa lectura. En Caza la Función se ajustan los coeficientes hasta que la recta o la parábola encajan; en Trayectoria y en El Portero hay que decidir, a partir de la fórmula, por dónde pasa el balón. Y los exámenes de sistemas, ecuaciones de segundo grado y estadística sirven para comprobar lo de siempre antes de un control.',
      ],
      en: [
        'At sixth-form level almost everything goes through functions: analysis, limits and derivatives rely on seeing at a glance what a function does and what its graph looks like. Students who arrive weak on this lose marks on exercises they actually understand, because they misread the graph or set the problem up wrong.',
        'The games on this page train exactly that reading. In Caza la Función you adjust the coefficients until the line or parabola fits; in Trayectoria and El Portero you decide from the formula where the ball goes. And the exams on simultaneous equations, quadratics and statistics check the basics before a test.',
      ],
      ca: [
        'Al Batxillerat gairebé tot passa per les funcions: l’anàlisi, els límits i les derivades es recolzen a saber veure d’una ullada què fa una funció i com és la seva gràfica. Qui hi arriba fluix perd punts en exercicis que en realitat entén, perquè s’equivoca en llegir la gràfica o en plantejar.',
        'Els jocs d’aquesta pàgina entrenen exactament aquesta lectura. A Caza la Función s’ajusten els coeficients fins que la recta o la paràbola encaixen; a Trayectoria i a El Portero cal decidir, a partir de la fórmula, per on passa la pilota. I els exàmens de sistemes, equacions de segon grau i estadística serveixen per comprovar el de sempre abans d’un control.',
      ],
    },
    practica: {
      es: ['Funciones lineales, cuadráticas y a trozos', 'Sistemas de ecuaciones', 'Ecuaciones de segundo grado', 'Geometría y trigonometría básica', 'Estadística y lectura de gráficos'],
      en: ['Linear, quadratic and piecewise functions', 'Simultaneous equations', 'Quadratic equations', 'Geometry and basic trigonometry', 'Statistics and reading charts'],
      ca: ['Funcions lineals, quadràtiques i a trossos', 'Sistemes d’equacions', 'Equacions de segon grau', 'Geometria i trigonometria bàsica', 'Estadística i lectura de gràfics'],
    },
    juegos: ['funciones-grafica', 'trayectoria', 'portero', 'balanza-algebraica', 'lee-el-grafico', 'estadistico-expres'],
    temas: [
      { arte: 'matematicas/funciones', ruta: '/estudiar/matematicas/funciones', titulo: T('Funciones', 'Functions', 'Funcions') },
      { arte: 'matematicas/algebra', ruta: '/estudiar/matematicas/algebra', titulo: T('Álgebra', 'Algebra', 'Àlgebra') },
      { arte: 'matematicas/geometria', ruta: '/estudiar/matematicas/geometria', titulo: T('Geometría', 'Geometry', 'Geometria') },
      { arte: 'matematicas/estadistica', ruta: '/estudiar/matematicas/estadistica', titulo: T('Estadística y probabilidad', 'Statistics and probability', 'Estadística i probabilitat') },
    ],
  },
  {
    curso: 'bachillerato',
    materia: 'lengua',
    arteMateria: 'espanol',
    nombre: T('Lengua', 'Spanish', 'Llengua castellana'),
    titulo: T('Lengua castellana de Bachillerato: sintaxis, literatura y comentario', 'Sixth-form Spanish: syntax, literature and commentary', 'Llengua castellana de Batxillerat: sintaxi, literatura i comentari'),
    metaDesc: T(
      'Sintaxis de la oración, complementos, figuras literarias, literatura, tipos de texto y corrección para Bachillerato y la PAU de Lengua, con explicación en cada respuesta.',
      'Sentence syntax, complements, figures of speech, literature, text types and proofreading for sixth-form Spanish, with an explanation for every answer.',
      'Sintaxi de l’oració, complements, figures literàries, literatura, tipus de text i correcció per a Batxillerat i la PAU de Llengua, amb explicació a cada resposta.',
    ),
    intro: {
      es: [
        'El examen de Lengua de la PAU tiene dos partes que se preparan de forma muy distinta: el análisis sintáctico, que es técnica y se mejora repitiendo, y el comentario de texto, en el que hay que reconocer el tipo de texto, su estructura y los recursos literarios y explicar para qué sirven. Las dos se pierden por lo mismo: identificar mal lo que se tiene delante.',
        'Aquí se practica justo esa identificación. En Analiza la Frase se señala el sujeto, el predicado y los complementos sobre oraciones nuevas cada vez; el examen de figuras literarias pide reconocerlas en versos de Garcilaso, Góngora o Bécquer; y el de los textos repasa tipologías, funciones del lenguaje, coherencia y cohesión, que son el vocabulario del comentario.',
      ],
      en: [
        'The Spanish exam in university entrance has two parts that are prepared very differently: syntactic analysis, which is technique and improves with repetition, and text commentary, where you identify the text type, its structure and literary devices and explain what they do. Both are lost for the same reason: misidentifying what is in front of you.',
        'This page practises exactly that identification. In Analiza la Frase you mark subject, predicate and complements on new sentences every time; the figures of speech exam asks you to spot them in lines by Garcilaso, Góngora or Bécquer; and the text types exam revises genres, language functions, coherence and cohesion, which are the vocabulary of a commentary.',
      ],
      ca: [
        'L’examen de Llengua de la PAU té dues parts que es preparen de manera molt diferent: l’anàlisi sintàctica, que és tècnica i es millora repetint, i el comentari de text, en què cal reconèixer el tipus de text, la seva estructura i els recursos literaris i explicar per a què serveixen. Totes dues es perden pel mateix: identificar malament el que es té al davant.',
        'Aquí es practica just aquesta identificació. A Analiza la Frase s’assenyala el subjecte, el predicat i els complements sobre oracions noves cada vegada; l’examen de figures literàries demana reconèixer-les en versos de Garcilaso, Góngora o Bécquer; i el dels textos repassa tipologies, funcions del llenguatge, coherència i cohesió, que són el vocabulari del comentari.',
      ],
    },
    practica: {
      es: ['Sintaxis de la oración simple y compuesta', 'Complementos del verbo', 'Figuras literarias', 'Literatura española', 'Tipos de texto y propiedades textuales'],
      en: ['Simple and complex sentence syntax', 'Verb complements', 'Figures of speech', 'Spanish literature', 'Text types and textual properties'],
      ca: ['Sintaxi de l’oració simple i composta', 'Complements del verb', 'Figures literàries', 'Literatura castellana', 'Tipus de text i propietats textuals'],
    },
    juegos: ['analiza-frases', 'corrige-el-texto'],
    temas: [
      { arte: 'gramatica/sintaxis', ruta: '/estudiar/idiomas/espanol/gramatica/sintaxis', titulo: T('Sintaxis', 'Syntax', 'Sintaxi') },
      { arte: 'lengua/figuras', ruta: '/examen/espanol-figuras-test', titulo: T('Figuras literarias', 'Figures of speech', 'Figures literàries') },
      { arte: 'lengua/literatura', ruta: '/examen/espanol-literatura-test', titulo: T('Literatura', 'Literature', 'Literatura') },
      { arte: 'lengua/textos', ruta: '/examen/espanol-textos-test', titulo: T('Los textos', 'Text types', 'Els textos') },
      { arte: 'ortografia/correccion', ruta: '/examen/corrige-el-texto-test', titulo: T('Corregir un texto', 'Proofreading', 'Corregir un text') },
    ],
  },
  {
    curso: 'bachillerato',
    materia: 'historia',
    arteMateria: 'historia',
    nombre: T('Historia', 'History', 'Història'),
    titulo: T('Historia para Bachillerato: Contemporánea y de España', 'Sixth-form history: the modern world and Spain', 'Història per a Batxillerat: Contemporània i d’Espanya'),
    metaDesc: T(
      'Historia del Mundo Contemporáneo y de España para Bachillerato: de la Revolución Francesa a la Guerra Fría, la Guerra Civil y la Transición, con líneas del tiempo y exámenes.',
      'Modern world history and the history of Spain for sixth form: from the French Revolution to the Cold War, the Spanish Civil War and the Transition, with timelines and quizzes.',
      'Història del Món Contemporani i d’Espanya per a Batxillerat: de la Revolució Francesa a la Guerra Freda, la Guerra Civil i la Transició, amb línies del temps i exàmens.',
    ),
    intro: {
      es: [
        'Historia de España es la asignatura de la PAU que más memoria exige, y la que peor sale cuando se estudia como una lista de fechas sueltas. Lo que de verdad se pregunta son procesos: por qué cayó la Segunda República, cómo se pasó de la dictadura a la democracia, qué tuvieron en común las crisis del periodo de entreguerras. Para explicarlos hay que tener claro el orden.',
        'Por eso aquí la cronología va primero. En la Línea del Tiempo se colocan los acontecimientos antes o después de los que ya están, sin ver el año; en ¿Qué Época Es? hay que reconocer el periodo de fotos reales; y cada tema, de la Revolución Francesa a la Transición, tiene su página de estudio y su examen con explicación en cada respuesta.',
      ],
      en: [
        'History of Spain is the university entrance subject that demands the most memory, and the one that goes worst when studied as a list of isolated dates. What is really asked about are processes: why the Second Republic fell, how Spain went from dictatorship to democracy, what the interwar crises had in common. To explain them you need the order clear.',
        'That is why chronology comes first here. In the Timeline game you place events before or after those already there, without seeing the year; in ¿Qué Época Es? you recognise the period of real photos; and every topic, from the French Revolution to the Transition, has its study page and its exam with an explanation for each answer.',
      ],
      ca: [
        'Història d’Espanya és l’assignatura de la PAU que més memòria exigeix, i la que pitjor surt quan s’estudia com una llista de dates soltes. El que de debò es pregunta són processos: per què va caure la Segona República, com es va passar de la dictadura a la democràcia, què van tenir en comú les crisis del període d’entreguerres. Per explicar-los cal tenir clar l’ordre.',
        'Per això aquí la cronologia va primer. A la Línia del Temps es col·loquen els fets abans o després dels que ja hi són, sense veure l’any; a ¿Qué Época Es? cal reconèixer el període de fotos reals; i cada tema, de la Revolució Francesa a la Transició, té la seva pàgina d’estudi i el seu examen amb explicació a cada resposta.',
      ],
    },
    practica: {
      es: ['Revoluciones liberales e industrial', 'Primera Guerra Mundial y entreguerras', 'Segunda Guerra Mundial y Guerra Fría', 'Guerra Civil Española', 'Franquismo y Transición'],
      en: ['Liberal and industrial revolutions', 'World War I and the interwar years', 'World War II and the Cold War', 'Spanish Civil War', 'Francoism and the Transition'],
      ca: ['Revolucions liberals i industrial', 'Primera Guerra Mundial i entreguerres', 'Segona Guerra Mundial i Guerra Freda', 'Guerra Civil Espanyola', 'Franquisme i Transició'],
    },
    juegos: ['linea-temporal', 'epocas-historicas', 'tuthor-time', 'portadas'],
    temas: [
      { arte: 'historia/revolucion-francesa', ruta: '/estudiar/historia/revolucion-francesa', titulo: T('Revolución Francesa', 'French Revolution', 'Revolució Francesa') },
      { arte: 'historia/revolucion-industrial', ruta: '/estudiar/historia/revolucion-industrial', titulo: T('Revolución Industrial', 'Industrial Revolution', 'Revolució Industrial') },
      { arte: 'historia/primera-guerra-mundial', ruta: '/estudiar/historia/primera-guerra-mundial', titulo: T('Primera Guerra Mundial', 'World War I', 'Primera Guerra Mundial') },
      { arte: 'historia/entreguerras', ruta: '/estudiar/historia/entreguerras', titulo: T('Entreguerras', 'Between the wars', 'Entreguerres') },
      { arte: 'historia/wwii', ruta: '/estudiar/historia/wwii', titulo: T('Segunda Guerra Mundial', 'World War II', 'Segona Guerra Mundial') },
      { arte: 'historia/guerra-fria', ruta: '/estudiar/historia/guerra-fria', titulo: T('Guerra Fría', 'The Cold War', 'Guerra Freda') },
      { arte: 'historia/gce', ruta: '/estudiar/historia/gce', titulo: T('Guerra Civil Española', 'Spanish Civil War', 'Guerra Civil Espanyola') },
      { arte: 'historia/franquismo', ruta: '/estudiar/historia/franquismo', titulo: T('Franquismo y Transición', 'Francoism and Transition', 'Franquisme i Transició') },
    ],
  },
  {
    curso: 'bachillerato',
    materia: 'biologia-geologia',
    arteMateria: 'biologia',
    nombre: T('Biología y Geología', 'Biology and Geology', 'Biologia i Geologia'),
    titulo: T('Biología y Geología de Bachillerato', 'Sixth-form biology and geology', 'Biologia i Geologia de Batxillerat'),
    metaDesc: T(
      'La célula, la genética, la evolución, el sistema inmunitario, los ecosistemas, la tectónica de placas y el cambio climático para Bachillerato, con juegos y exámenes explicados.',
      'The cell, genetics, evolution, the immune system, ecosystems, plate tectonics and climate change for sixth form, with games and explained quizzes.',
      'La cèl·lula, la genètica, l’evolució, el sistema immunitari, els ecosistemes, la tectònica de plaques i el canvi climàtic per a Batxillerat, amb jocs i exàmens explicats.',
    ),
    intro: {
      es: [
        'La Biología de Bachillerato da un salto de escala: de los órganos se pasa a la célula y a las moléculas, y casi todo lo que se pregunta —la herencia, la evolución, cómo responde el sistema inmunitario a una vacuna— se entiende solo si se tiene clara la célula por dentro. En Geología pasa algo parecido con la tectónica de placas, que explica a la vez los volcanes, los terremotos y el relieve.',
        'Bajo el Microscopio enseña los orgánulos dibujados y en fotos reales de microscopio; Genética entrena los cruces de Mendel con el cuadro de Punnett; y Cadena Alimentaria, los niveles tróficos de un ecosistema. Cada tema tiene además su página de estudio con resumen y un examen con explicación, incluidos los de salud y sistema inmunitario y de atmósfera y cambio climático.',
      ],
      en: [
        'Sixth-form biology changes scale: from organs to the cell and its molecules, and nearly everything asked — heredity, evolution, how the immune system responds to a vaccine — only makes sense if you know the inside of the cell well. Geology is similar with plate tectonics, which explains volcanoes, earthquakes and landforms all at once.',
        'Bajo el Microscopio shows the organelles as drawings and in real microscope photos; Genética trains Mendel’s crosses with the Punnett square; and Cadena Alimentaria, the trophic levels of an ecosystem. Each topic also has a study page with a summary and an explained exam, including health and the immune system, and the atmosphere and climate change.',
      ],
      ca: [
        'La Biologia de Batxillerat fa un salt d’escala: dels òrgans es passa a la cèl·lula i a les molècules, i gairebé tot el que es pregunta —l’herència, l’evolució, com respon el sistema immunitari a una vacuna— només s’entén si es té clara la cèl·lula per dins. En Geologia passa una cosa semblant amb la tectònica de plaques, que explica alhora els volcans, els terratrèmols i el relleu.',
        'Bajo el Microscopio mostra els orgànuls dibuixats i en fotos reals de microscopi; Genética entrena els encreuaments de Mendel amb el quadre de Punnett; i Cadena Alimentaria, els nivells tròfics d’un ecosistema. Cada tema té a més la seva pàgina d’estudi amb resum i un examen amb explicació, inclosos els de salut i sistema immunitari i d’atmosfera i canvi climàtic.',
      ],
    },
    practica: {
      es: ['La célula y sus orgánulos', 'Genética mendeliana', 'Evolución y selección natural', 'Sistema inmunitario y vacunas', 'Tectónica de placas y cambio climático'],
      en: ['The cell and its organelles', 'Mendelian genetics', 'Evolution and natural selection', 'The immune system and vaccines', 'Plate tectonics and climate change'],
      ca: ['La cèl·lula i els seus orgànuls', 'Genètica mendeliana', 'Evolució i selecció natural', 'Sistema immunitari i vacunes', 'Tectònica de plaques i canvi climàtic'],
    },
    juegos: ['microscopio', 'genetica', 'cadena-alimentaria', 'el-tiempo'],
    temas: [
      { arte: 'biologia/celula', ruta: '/estudiar/biologia/celula', titulo: T('La célula', 'The cell', 'La cèl·lula') },
      { arte: 'biologia/genetica', ruta: '/estudiar/biologia/genetica', titulo: T('Genética', 'Genetics', 'Genètica') },
      { arte: 'biologia/evolucion', ruta: '/estudiar/biologia/evolucion', titulo: T('Evolución', 'Evolution', 'Evolució') },
      { arte: 'biologia/salud-enfermedad', ruta: '/estudiar/biologia/salud-enfermedad', titulo: T('Salud y enfermedad', 'Health and disease', 'Salut i malaltia') },
      { arte: 'biologia/ecosistemas', ruta: '/estudiar/biologia/ecosistemas', titulo: T('Ecosistemas', 'Ecosystems', 'Ecosistemes') },
      { arte: 'geologia/placas-tectonicas', ruta: '/estudiar/geologia/placas-tectonicas', titulo: T('Placas tectónicas', 'Plate tectonics', 'Plaques tectòniques') },
      { arte: 'geologia/atmosfera-clima', ruta: '/estudiar/geologia/atmosfera-clima', titulo: T('Atmósfera y clima', 'Atmosphere and climate', 'Atmosfera i clima') },
    ],
  },
  {
    curso: 'bachillerato',
    materia: 'economia',
    arteMateria: 'economia',
    nombre: T('Economía', 'Economics', 'Economia'),
    titulo: T('Economía de Bachillerato: el mercado, la empresa y tu dinero', 'Sixth-form economics: markets, firms and your money', 'Economia de Batxillerat: el mercat, l’empresa i els teus diners'),
    metaDesc: T(
      'Oferta y demanda, equilibrio del mercado, punto de equilibrio de la empresa y finanzas personales para Bachillerato, con ejercicios de cálculo corregidos y explicados.',
      'Supply and demand, market equilibrium, a firm’s break-even point and personal finance for sixth form, with calculation exercises marked and explained.',
      'Oferta i demanda, equilibri del mercat, punt d’equilibri de l’empresa i finances personals per a Batxillerat, amb exercicis de càlcul corregits i explicats.',
    ),
    intro: {
      es: [
        'Economía en 1.º y Economía de la Empresa en 2.º comparten una dificultad: mezclan conceptos que se entienden con sentido común (si sube el precio, se compra menos) con cálculos que hay que saber plantear, como el punto de equilibrio o el desplazamiento de una curva. Los fallos de examen casi siempre están en el planteamiento, no en la cuenta.',
        'El examen del mercado repasa oferta, demanda, equilibrio, elasticidad y fallos del mercado; el del punto de equilibrio pide calcularlo y escribir el número, como en la PAU de Economía de la Empresa, con datos que dan siempre un resultado exacto. Y Spicy y el tema de finanzas personales llevan lo mismo a la vida real: inflación, interés compuesto y deudas.',
      ],
      en: [
        'Economics in the first year and Business Economics in the second share one difficulty: they mix ideas you understand with common sense (if the price goes up, people buy less) with calculations you have to know how to set up, such as the break-even point or a shift in a curve. Exam mistakes are nearly always in the setting up, not the arithmetic.',
        'The market exam revises supply, demand, equilibrium, elasticity and market failures; the break-even exam asks you to calculate it and type the number, as in the real exam, with figures that always give an exact result. And Spicy and the personal finance topic take the same ideas into real life: inflation, compound interest and debt.',
      ],
      ca: [
        'Economia a 1r i Economia de l’Empresa a 2n comparteixen una dificultat: barregen conceptes que s’entenen amb sentit comú (si puja el preu, es compra menys) amb càlculs que cal saber plantejar, com el punt d’equilibri o el desplaçament d’una corba. Els errors d’examen gairebé sempre són al plantejament, no al compte.',
        'L’examen del mercat repassa oferta, demanda, equilibri, elasticitat i fallades del mercat; el del punt d’equilibri demana calcular-lo i escriure el número, com a la PAU d’Economia de l’Empresa, amb dades que donen sempre un resultat exacte. I Spicy i el tema de finances personals porten el mateix a la vida real: inflació, interès compost i deutes.',
      ],
    },
    practica: {
      es: ['Oferta, demanda y precio de equilibrio', 'Elasticidad y tipos de mercado', 'Punto de equilibrio (umbral de rentabilidad)', 'Inflación e interés compuesto'],
      en: ['Supply, demand and equilibrium price', 'Elasticity and market types', 'Break-even point', 'Inflation and compound interest'],
      ca: ['Oferta, demanda i preu d’equilibri', 'Elasticitat i tipus de mercat', 'Punt d’equilibri (llindar de rendibilitat)', 'Inflació i interès compost'],
    },
    juegos: ['spicy'],
    temas: [
      { arte: 'economia/mercado', ruta: '/examen/mercado', titulo: T('El mercado', 'The market', 'El mercat') },
      { arte: 'economia/punto-equilibrio', ruta: '/examen/punto-equilibrio', titulo: T('Punto de equilibrio', 'Break-even point', 'Punt d’equilibri') },
      { arte: 'economia/finanzas-personales', ruta: '/info/estudiar/finanzas-personales', titulo: T('Finanzas personales', 'Personal finance', 'Finances personals') },
    ],
  },
]

export function landingDe(curso, materia) {
  return LANDINGS.find(l => l.curso === curso && l.materia === materia) ?? null
}

export function landingsDe(curso) {
  return LANDINGS.filter(l => l.curso === curso)
}

// La «misma» materia cambia de nombre según el curso (Ciencias Sociales en
// Primaria, Geografía e Historia en ESO, Historia en Bachillerato): para el
// enlace «En otros cursos», la primera equivalente que exista en ese curso.
const EQUIVALENTES = {
  'ciencias-sociales': ['geografia-historia', 'historia'],
  'geografia-historia': ['historia', 'ciencias-sociales'],
  historia: ['geografia-historia', 'ciencias-sociales'],
  'ciencias-naturales': ['biologia-geologia', 'fisica-quimica'],
  'biologia-geologia': ['ciencias-naturales'],
  'fisica-quimica': ['ciencias-naturales'],
}

export function landingEquivalente(curso, materia) {
  for (const m of [materia, ...(EQUIVALENTES[materia] ?? [])]) {
    const l = landingDe(curso, m)
    if (l) return l
  }
  return null
}
