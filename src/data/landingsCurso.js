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
    juegos: ['tablas-multiplicar', 'reloj-horas', 'el-cambio', 'reparte-pastel', 'redondeo', 'numeros-romanos', 'escalera-unidades', 'menor-a-mayor', 'salta-recta', 'acercate', 'numpath', 'lee-el-grafico', 'estadistico-expres'],
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
    juegos: ['rayos-x', 'cadena-alimentaria', 'cambio-estado', 'circuito-cerrado', 'balanza', 'fuerza-neta', 'orbita'],
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
    juegos: ['linea-temporal', 'epocas-historicas', 'geomapa', 'georush', 'coordenadas'],
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
]

export function landingDe(curso, materia) {
  return LANDINGS.find(l => l.curso === curso && l.materia === materia) ?? null
}

export function landingsDe(curso) {
  return LANDINGS.filter(l => l.curso === curso)
}
