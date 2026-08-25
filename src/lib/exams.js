// ── Registro central de exámenes ─────────────────────────────────────────────
// Fuente única de verdad para los exámenes tipo test (ExamenMC y afines).
// La clave es el gameId con el que el examen guarda stats en Firestore.
//
// Para añadir un examen nuevo:
//   1. Crea la página (wrapper de ExamenMC con su pool de preguntas).
//   2. Añade una entrada aquí con label, emoji, subject, path y page.
// Con eso la ruta se genera sola en App.jsx y el examen aparece en la sección
// "Por materia" del perfil, sin tocar nada más.
//
// `page` es un loader dinámico (code-splitting); las entradas con `route`
// (absoluta) tienen su página montada a mano en App.jsx — `route` existe para
// que tareas/enlaces puedan llevar al examen sin duplicar la URL. Las entradas
// `retired: true` no tienen página: solo etiquetan stats antiguas y NO deben
// ofrecerse como asignables.

export const EXAMS = {
  // ── Exámenes con página propia (ruta hardcoded en App.jsx, sin loader) ──────
  'matematicas-examen': {
    label: { es: 'Examen de cálculo', en: 'Maths exam', ca: 'Examen de càlcul' },
    emoji: '🧮', subject: 'matematicas',
    // El examen real vive bajo /estudiar/matematicas/:modo/examen; se enlaza
    // al índice para que el alumno elija modo.
    route: '/estudiar/matematicas',
  },
  'portero-examen': {
    label: { es: 'El Portero (examen)', en: 'Goalkeeper (exam)', ca: 'El Porter (examen)' },
    emoji: '🥅', subject: 'matematicas',
    route: '/examen/portero',
  },
  'trayectoria-examen': {
    label: { es: 'Trayectoria (examen)', en: 'Trajectory (exam)', ca: 'Trajectòria (examen)' },
    emoji: '⚽', subject: 'matematicas',
    route: '/examen/trayectoria',
  },
  'portadas-examen': {
    label: { es: 'Portadas (examen)', en: 'Headlines (exam)', ca: 'Portades (examen)' },
    emoji: '📰', subject: 'historia',
    route: '/examen/portadas',
  },

  // ── Historia — Teoría (tipo test) por tema ──────────────────────────────────
  // Hasta ahora Historia se evaluaba solo jugando (Línea del Tiempo, ¿Quién es
  // quién?) o con Portadas (verdad/mentira, sin distinguir tema). Estos son
  // los primeros exámenes tipo test reales de la materia, uno por tema — mismo
  // patrón que Matemáticas/Física/Química/Biología (topicCatalog.js).
  'gce': {
    label: { es: 'Guerra Civil Española (teoría)', en: 'Spanish Civil War (theory)', ca: 'Guerra Civil Espanyola (teoria)' },
    emoji: '⚔️', subject: 'historia',
    path: 'examen/gce', page: () => import('../pages/HistoriaGceExamen'),
  },
  'wwii': {
    label: { es: 'Segunda Guerra Mundial (teoría)', en: 'World War II (theory)', ca: 'Segona Guerra Mundial (teoria)' },
    emoji: '⚔️', subject: 'historia',
    path: 'examen/wwii', page: () => import('../pages/HistoriaWwiiExamen'),
  },
  'roma': {
    label: { es: 'Antigua Roma (teoría)', en: 'Ancient Rome (theory)', ca: 'Antiga Roma (teoria)' },
    emoji: '🏛️', subject: 'historia',
    path: 'examen/roma', page: () => import('../pages/HistoriaRomaExamen'),
  },
  'usa': {
    label: { es: 'Independencia Americana (teoría)', en: 'American Independence (theory)', ca: 'Independència Americana (teoria)' },
    emoji: '🦅', subject: 'historia',
    path: 'examen/usa', page: () => import('../pages/HistoriaUsaExamen'),
  },
  'primaria': {
    label: { es: 'Grandes Hitos (teoría)', en: 'Great Milestones (theory)', ca: 'Grans Fites (teoria)' },
    emoji: '🌍', subject: 'historia',
    path: 'examen/primaria', page: () => import('../pages/HistoriaHitosExamen'),
  },
  'franquismo': {
    label: { es: 'Franquismo y Transición (teoría)', en: 'Francoism & Transition (theory)', ca: 'Franquisme i Transició (teoria)' },
    emoji: '🕊️', subject: 'historia',
    path: 'examen/franquismo', page: () => import('../pages/HistoriaFranquismoExamen'),
  },
  'prehistoria': {
    label: { es: 'Prehistoria (teoría)', en: 'Prehistory (theory)', ca: 'Prehistòria (teoria)' },
    emoji: '🦴', subject: 'historia',
    path: 'examen/prehistoria', page: () => import('../pages/HistoriaPrehistoriaExamen'),
  },
  'antigua': {
    label: { es: 'Edad Antigua (teoría)', en: 'Antiquity (theory)', ca: 'Edat Antiga (teoria)' },
    emoji: '🏛️', subject: 'historia',
    path: 'examen/antigua', page: () => import('../pages/HistoriaAntiguaExamen'),
  },
  'edad-media': {
    label: { es: 'Edad Media (teoría)', en: 'The Middle Ages (theory)', ca: 'Edat Mitjana (teoria)' },
    emoji: '🏰', subject: 'historia',
    path: 'examen/edad-media', page: () => import('../pages/HistoriaEdadMediaExamen'),
  },
  'edad-moderna': {
    label: { es: 'Edad Moderna (teoría)', en: 'The Early Modern Period (theory)', ca: 'Edat Moderna (teoria)' },
    emoji: '⛵', subject: 'historia',
    path: 'examen/edad-moderna', page: () => import('../pages/HistoriaEdadModernaExamen'),
  },
  'geografia-examen': {
    label: { es: 'GeoRush (examen)', en: 'GeoRush (exam)', ca: 'GeoRush (examen)' },
    emoji: '🌍', subject: 'geografia',
    route: '/examen/geografia',
  },
  'geomapa-examen': {
    label: { es: 'GeoMapa mundo', en: 'GeoMap world', ca: 'GeoMapa món' },
    emoji: '🗺️', subject: 'geografia',
    route: '/examen/geomapa',
  },
  'geomapa-espana-examen': {
    label: { es: 'GeoMapa España', en: 'GeoMap Spain', ca: 'GeoMapa Espanya' },
    emoji: '🇪🇸', subject: 'geografia',
    route: '/examen/geomapa-espana',
  },
  'geomapa-eeuu-examen': {
    label: { es: 'GeoMapa EE. UU.', en: 'GeoMap USA', ca: 'GeoMapa EUA' },
    emoji: '🇺🇸', subject: 'geografia',
    route: '/examen/geomapa-eeuu',
  },
  'coordenadas-test': {
    label: { es: 'Coordenadas (con el juego)', en: 'Coordinates (with the game)', ca: 'Coordenades (amb el joc)' },
    emoji: '🌐', subject: 'geografia',
    path: 'examen/coordenadas-test', page: () => import('../pages/CoordenadasExamen'),
  },
  'diagnostico': {
    // Herramienta de estudio de Ciencias; subject 'ciencias' no existe en
    // SUBJECT_DEFS a propósito (no aparece en "Por materia" ni en tareas).
    label: { es: 'Diagnóstico', en: 'Diagnosis', ca: 'Diagnòstic' },
    emoji: '💉', subject: 'ciencias',
    route: '/examen/diagnostico',
  },

  // ── Vida Práctica ──────────────────────────────────────────────────────────
  'primeros-auxilios': {
    label: { es: 'Primeros Auxilios', en: 'First Aid', ca: 'Primers Auxilis' },
    emoji: '🚑', subject: 'vida-practica',
    path: 'examen/primeros-auxilios', page: () => import('../pages/PrimerosAuxiliosExamen'),
  },

  // ── Música ─────────────────────────────────────────────────────────────────
  'musica': {
    label: { es: 'Lectura de Partituras', en: 'Sheet Music Reading', ca: 'Lectura de Partitures' },
    emoji: '🎼', subject: 'musica',
    path: 'examen/musica', page: () => import('../pages/MusicaExamen'),
  },

  // ── Economía ───────────────────────────────────────────────────────────────
  'finanzas-personales': {
    label: { es: 'Finanzas Personales', en: 'Personal Finance', ca: 'Finances Personals' },
    emoji: '💰', subject: 'economia',
    path: 'examen/finanzas-personales', page: () => import('../pages/FinanzasPersonalesExamen'),
  },
  'punto-equilibrio': {
    label: { es: 'Punto de Equilibrio', en: 'Break-Even Point', ca: 'Punt d\'Equilibri' },
    emoji: '🏭', subject: 'economia',
    path: 'examen/punto-equilibrio', page: () => import('../pages/PuntoEquilibrioExamen'),
  },

  // ── Matemáticas ────────────────────────────────────────────────────────────
  'algebra': {
    label: { es: 'Álgebra', en: 'Algebra', ca: 'Àlgebra' },
    emoji: '🔣', subject: 'matematicas',
    path: 'examen/algebra', page: () => import('../pages/AlgebraExamen'),
  },
  'enteros-racionales': {
    label: { es: 'Enteros y Racionales', en: 'Integers & Rationals', ca: 'Enters i Racionals' },
    emoji: '🔢', subject: 'matematicas',
    path: 'examen/enteros-racionales', page: () => import('../pages/EnterosRacionalesExamen'),
  },
  'salta-recta-test': {
    label: { es: 'Salta la Recta', en: 'Jump the Number Line', ca: 'Salta la Recta' },
    emoji: '🐸', subject: 'matematicas',
    path: 'examen/salta-recta-test', page: () => import('../pages/SaltaRectaExamen'),
  },
  'estadistica': {
    label: { es: 'Estadística', en: 'Statistics', ca: 'Estadística' },
    emoji: '📊', subject: 'matematicas',
    path: 'examen/estadistica', page: () => import('../pages/EstadisticaExamen'),
  },
  'fracciones': {
    label: { es: 'Fracciones', en: 'Fractions', ca: 'Fraccions' },
    emoji: '🍕', subject: 'matematicas',
    path: 'examen/fracciones', page: () => import('../pages/FraccionesExamen'),
  },
  'reparte-pastel-test': {
    label: { es: 'Reparte el Pastel', en: 'Slice the Cake', ca: 'Reparteix el Pastís' },
    emoji: '🍰', subject: 'matematicas',
    path: 'examen/reparte-pastel-test', page: () => import('../pages/RepartePastelExamen'),
  },
  'funciones': {
    label: { es: 'Funciones', en: 'Functions', ca: 'Funcions' },
    emoji: '📈', subject: 'matematicas',
    path: 'examen/funciones', page: () => import('../pages/FuncionesExamen'),
  },
  'geometria': {
    label: { es: 'Geometría', en: 'Geometry', ca: 'Geometria' },
    emoji: '📐', subject: 'matematicas',
    path: 'examen/geometria', page: () => import('../pages/GeometriaExamen'),
  },
  'figuras-compuestas': {
    label: { es: 'Figuras Compuestas', en: 'Composite Shapes', ca: 'Figures Compostes' },
    emoji: '📐', subject: 'matematicas',
    path: 'examen/figuras-compuestas', page: () => import('../pages/FigurasCompuestasExamen'),
  },
  'funciones-grafica-test': {
    label: { es: 'Caza la Función', en: 'Function Hunt', ca: 'Caça la Funció' },
    emoji: '📈', subject: 'matematicas',
    path: 'examen/funciones-grafica-test', page: () => import('../pages/FuncionesGraficaExamen'),
  },
  'balanza-algebraica-test': {
    label: { es: 'Balanza Algebraica', en: 'Algebra Balance', ca: 'Balança Algebraica' },
    emoji: '⚖️', subject: 'matematicas',
    path: 'examen/balanza-algebraica-test', page: () => import('../pages/BalanzaAlgebraicaExamen'),
  },

  // ── Ciencias ───────────────────────────────────────────────────────────────
  'acidos-bases': {
    label: { es: 'Ácidos y Bases', en: 'Acids & Bases', ca: 'Àcids i Bases' },
    emoji: '🧴', subject: 'quimica',
    path: 'examen/acidos-bases', page: () => import('../pages/AcidosBasesExamen'),
  },
  'atomos-moleculas': {
    label: { es: 'Átomos y Moléculas', en: 'Atoms & Molecules', ca: 'Àtoms i Molècules' },
    emoji: '⚛️', subject: 'quimica',
    path: 'examen/atomos-moleculas', page: () => import('../pages/AtomosMoleculasExamen'),
  },
  'celula': {
    label: { es: 'La Célula', en: 'The Cell', ca: 'La Cèl·lula' },
    emoji: '🔬', subject: 'biologia',
    path: 'examen/celula', page: () => import('../pages/LaCelulaExamen'),
  },
  'cuerpo-humano': {
    label: { es: 'Cuerpo Humano', en: 'Human Body', ca: 'Cos Humà' },
    emoji: '❤️', subject: 'biologia',
    path: 'examen/cuerpo-humano', page: () => import('../pages/CuerpoHumanoExamen'),
  },
  'ecosistemas': {
    label: { es: 'Ecosistemas', en: 'Ecosystems', ca: 'Ecosistemes' },
    emoji: '🌍', subject: 'biologia',
    path: 'examen/ecosistemas', page: () => import('../pages/EcosistemasExamen'),
  },
  'electricidad': {
    label: { es: 'Electricidad', en: 'Electricity', ca: 'Electricitat' },
    emoji: '💡', subject: 'fisica',
    path: 'examen/electricidad', page: () => import('../pages/ElectricidadExamen'),
  },
  'energia': {
    label: { es: 'Energía', en: 'Energy', ca: 'Energia' },
    emoji: '🔋', subject: 'fisica',
    path: 'examen/energia', page: () => import('../pages/EnergiaExamen'),
  },
  'estados-materia': {
    label: { es: 'Estados de la Materia', en: 'States of Matter', ca: 'Estats de la Matèria' },
    emoji: '🧪', subject: 'quimica',
    path: 'examen/estados-materia', page: () => import('../pages/EstadosMateriaExamen'),
  },
  'fuerzas': {
    label: { es: 'Fuerzas y Movimiento', en: 'Forces & Motion', ca: 'Forces i Moviment' },
    emoji: '⚡', subject: 'fisica',
    path: 'examen/fuerzas', page: () => import('../pages/FuerzasExamen'),
  },
  'fuerza-neta-test': {
    label: { es: 'Fuerza Neta', en: 'Net Force', ca: 'Força Neta' },
    emoji: '🧭', subject: 'fisica',
    path: 'examen/fuerza-neta-test', page: () => import('../pages/FuerzaNetaExamen'),
  },
  'balanza-test': {
    label: { es: 'Palancas y Momentos', en: 'Levers & Moments', ca: 'Palanques i Moments' },
    emoji: '⚖️', subject: 'fisica',
    path: 'examen/balanza-test', page: () => import('../pages/BalanzaExamen'),
  },
  'balanza-ecuaciones-test': {
    label: { es: 'Ajuste de Ecuaciones', en: 'Balancing Equations', ca: 'Ajust d’Equacions' },
    emoji: '⚗️', subject: 'quimica',
    path: 'examen/balanza-ecuaciones-test', page: () => import('../pages/BalanzaEcuacionesExamen'),
  },
  'genetica': {
    label: { es: 'Genética', en: 'Genetics', ca: 'Genètica' },
    emoji: '🧬', subject: 'biologia',
    path: 'examen/genetica', page: () => import('../pages/GeneticaExamen'),
  },
  'genetica-test': {
    label: { es: 'Genética (con el juego)', en: 'Genetics (with the game)', ca: 'Genètica (amb el joc)' },
    emoji: '🧬', subject: 'biologia',
    path: 'examen/genetica-test', page: () => import('../pages/GeneticaExamenJuego'),
  },
  'rayos-x-test': {
    label: { es: 'Rayos X', en: 'X-Ray', ca: 'Raigs X' },
    emoji: '🧠', subject: 'biologia',
    path: 'examen/rayos-x-test', page: () => import('../pages/RayosXExamen'),
  },
  'circuito-cerrado-test': {
    label: { es: 'Circuito Cerrado', en: 'Circuit Complete', ca: 'Circuit Complet' },
    emoji: '💡', subject: 'fisica',
    path: 'examen/circuito-cerrado-test', page: () => import('../pages/CircuitoCerradoExamen'),
  },
  'encuentra-elemento-test': {
    label: { es: 'Encuentra el Elemento', en: 'Find the Element', ca: 'Troba l\'Element' },
    emoji: '🔬', subject: 'quimica',
    path: 'examen/encuentra-elemento-test', page: () => import('../pages/EncuentraElementoExamen'),
  },
  'mezclas-separacion': {
    label: { es: 'Mezclas y Separación', en: 'Mixtures & Separation', ca: 'Mescles i Separació' },
    emoji: '🔀', subject: 'quimica',
    path: 'examen/mezclas-separacion', page: () => import('../pages/MezclasExamen'),
  },
  'nutricion': {
    label: { es: 'Nutrición', en: 'Nutrition', ca: 'Nutrició' },
    emoji: '🥗', subject: 'biologia',
    path: 'examen/nutricion', page: () => import('../pages/NutricionExamen'),
  },
  'evolucion': {
    label: { es: 'Evolución', en: 'Evolution', ca: 'Evolució' },
    emoji: '🧬', subject: 'biologia',
    path: 'examen/evolucion', page: () => import('../pages/EvolucionExamen'),
  },
  'ondas-luz': {
    label: { es: 'Ondas y Luz', en: 'Waves & Light', ca: 'Ones i Llum' },
    emoji: '🌊', subject: 'fisica',
    path: 'examen/ondas-luz', page: () => import('../pages/OndasLuzExamen'),
  },
  'seres-vivos': {
    label: { es: 'Seres Vivos', en: 'Living Things', ca: 'Éssers Vius' },
    emoji: '🌱', subject: 'biologia',
    path: 'examen/seres-vivos', page: () => import('../pages/SeresVivosExamen'),
  },
  'sistema-solar': {
    label: { es: 'Sistema Solar', en: 'Solar System', ca: 'Sistema Solar' },
    emoji: '🌌', subject: 'geologia',
    path: 'examen/sistema-solar', page: () => import('../pages/SistemaSolarExamen'),
  },
  'orbita-test': {
    label: { es: 'Órbita', en: 'Orbit', ca: 'Òrbita' },
    emoji: '🛰️', subject: 'geologia',
    path: 'examen/orbita-test', page: () => import('../pages/OrbitaExamen'),
  },
  'rocas-minerales': {
    label: { es: 'Rocas y Minerales', en: 'Rocks & Minerals', ca: 'Roques i Minerals' },
    emoji: '⛰️', subject: 'geologia',
    path: 'examen/rocas-minerales', page: () => import('../pages/RocasMineralesExamen'),
  },
  'placas-tectonicas': {
    label: { es: 'Placas Tectónicas', en: 'Tectonic Plates', ca: 'Plaques Tectòniques' },
    emoji: '🌋', subject: 'geologia',
    path: 'examen/placas-tectonicas', page: () => import('../pages/PlacasTectonicasExamen'),
  },
  'tabla-periodica': {
    label: { es: 'Tabla Periódica', en: 'Periodic Table', ca: 'Taula Periòdica' },
    emoji: '⚗️', subject: 'quimica',
    path: 'examen/tabla-periodica', page: () => import('../pages/TablaPeriodicaExamen'),
  },

  // ── Lengua ─────────────────────────────────────────────────────────────────
  'espanol': {
    // Examen retirado (sin ruta): etiqueta para stats antiguas
    label: { es: 'Gramática Española', en: 'Spanish Grammar', ca: 'Gramàtica Espanyola' },
    emoji: '🇪🇸', subject: 'lengua', retired: true,
  },
  'analiza-frases-test': {
    label: { es: 'Analiza la Frase', en: 'Sentence Detective', ca: 'Analitza la Frase' },
    emoji: '🧐', subject: 'lengua',
    path: 'examen/analiza-frases-test', page: () => import('../pages/AnalizaFrasesExamen'),
  },
  'frases-sintaxis-test': {
    label: { es: 'Sujeto y Predicado', en: 'Subject & Predicate', ca: 'Subjecte i Predicat' },
    emoji: '🧩', subject: 'lengua',
    path: 'examen/frases-sintaxis-test', page: () => import('../pages/FrasesSintaxisExamen'),
  },
  'frases-complementos-test': {
    label: { es: 'Complementos (CD/CI/CC)', en: 'Objects (DO/IO)', ca: 'Complements (CD/CI/CC)' },
    emoji: '🔗', subject: 'lengua',
    path: 'examen/frases-complementos-test', page: () => import('../pages/FrasesComplementosExamen'),
  },
  'frases-clases-test': {
    label: { es: 'Clases de Palabras', en: 'Word Classes', ca: 'Classes de Paraules' },
    emoji: '🏷️', subject: 'lengua',
    path: 'examen/frases-clases-test', page: () => import('../pages/FrasesClasesExamen'),
  },
  'frases-sustantivos-test': {
    label: { es: 'Sustantivos (señálalos)', en: 'Nouns (spot them)', ca: 'Substantius (assenyala\'ls)' },
    emoji: '🧐', subject: 'lengua',
    path: 'examen/frases-sustantivos-test', page: () => import('../pages/FrasesSustantivosExamen'),
  },
  'frases-verbos-test': {
    label: { es: 'Verbos (señálalos)', en: 'Verbs (spot them)', ca: 'Verbs (assenyala\'ls)' },
    emoji: '🧐', subject: 'lengua',
    path: 'examen/frases-verbos-test', page: () => import('../pages/FrasesVerbosExamen'),
  },
  'frases-adjetivos-test': {
    label: { es: 'Adjetivos (señálalos)', en: 'Adjectives (spot them)', ca: 'Adjectius (assenyala\'ls)' },
    emoji: '🧐', subject: 'lengua',
    path: 'examen/frases-adjetivos-test', page: () => import('../pages/FrasesAdjetivosExamen'),
  },
  'frases-determinantes-test': {
    label: { es: 'Artículos y Determinantes', en: 'Articles & Determiners', ca: 'Articles i Determinants' },
    emoji: '🧐', subject: 'lengua',
    path: 'examen/frases-determinantes-test', page: () => import('../pages/FrasesDeterminantesExamen'),
  },
  'frases-pronombres-test': {
    label: { es: 'Pronombres (señálalos)', en: 'Pronouns (spot them)', ca: 'Pronoms (assenyala\'ls)' },
    emoji: '🧐', subject: 'lengua',
    path: 'examen/frases-pronombres-test', page: () => import('../pages/FrasesPronombresExamen'),
  },
  'frases-adverbios-test': {
    label: { es: 'Adverbios (señálalos)', en: 'Adverbs (spot them)', ca: 'Adverbis (assenyala\'ls)' },
    emoji: '🧐', subject: 'lengua',
    path: 'examen/frases-adverbios-test', page: () => import('../pages/FrasesAdverbiosExamen'),
  },
  'frases-nexos-test': {
    label: { es: 'Preposiciones y Conjunciones', en: 'Prepositions & Conjunctions', ca: 'Preposicions i Conjuncions' },
    emoji: '🧐', subject: 'lengua',
    path: 'examen/frases-nexos-test', page: () => import('../pages/FrasesNexosExamen'),
  },
  'frases-morfologia-test': {
    label: { es: 'Género y Número', en: 'Gender & Number', ca: 'Gènere i Nombre' },
    emoji: '♀️', subject: 'lengua',
    path: 'examen/frases-morfologia-test', page: () => import('../pages/FrasesMorfologiaExamen'),
  },
  'espanol-gramatica-sustantivos-test': {
    label: { es: 'Sustantivos', en: 'Nouns', ca: 'Substantius' },
    emoji: '📚', subject: 'lengua',
    path: 'examen/espanol-gramatica-sustantivos-test', page: () => import('../pages/EspanolGramaticaSustantivosExamen'),
  },
  'espanol-gramatica-verbos-test': {
    label: { es: 'Verbos', en: 'Verbs', ca: 'Verbs' },
    emoji: '🏃', subject: 'lengua',
    path: 'examen/espanol-gramatica-verbos-test', page: () => import('../pages/EspanolGramaticaVerbosExamen'),
  },
  'espanol-gramatica-sintaxis-test': {
    label: { es: 'Sintaxis', en: 'Syntax', ca: 'Sintaxi' },
    emoji: '🔬', subject: 'lengua',
    path: 'examen/espanol-gramatica-sintaxis-test', page: () => import('../pages/EspanolGramaticaSintaxisExamen'),
  },
  'espanol-gramatica-adjetivos-test': {
    label: { es: 'Adjetivos', en: 'Adjectives', ca: 'Adjectius' },
    emoji: '🎨', subject: 'lengua',
    path: 'examen/espanol-gramatica-adjetivos-test', page: () => import('../pages/EspanolGramaticaAdjetivosExamen'),
  },
  'espanol-gramatica-determinantes-test': {
    label: { es: 'Determinantes', en: 'Determiners', ca: 'Determinants' },
    emoji: '🔖', subject: 'lengua',
    path: 'examen/espanol-gramatica-determinantes-test', page: () => import('../pages/EspanolGramaticaDeterminantesExamen'),
  },
  'espanol-gramatica-pronombres-test': {
    label: { es: 'Pronombres', en: 'Pronouns', ca: 'Pronoms' },
    emoji: '🙋', subject: 'lengua',
    path: 'examen/espanol-gramatica-pronombres-test', page: () => import('../pages/EspanolGramaticaPronombresExamen'),
  },
  'espanol-gramatica-adverbios-test': {
    label: { es: 'Adverbios', en: 'Adverbs', ca: 'Adverbis' },
    emoji: '⏱️', subject: 'lengua',
    path: 'examen/espanol-gramatica-adverbios-test', page: () => import('../pages/EspanolGramaticaAdverbiosExamen'),
  },
  'espanol-gramatica-nexos-test': {
    label: { es: 'Preposiciones y Conjunciones', en: 'Prepositions & Conjunctions', ca: 'Preposicions i Conjuncions' },
    emoji: '🔗', subject: 'lengua',
    path: 'examen/espanol-gramatica-nexos-test', page: () => import('../pages/EspanolGramaticaNexosExamen'),
  },
  'espanol-gramatica-morfologia-test': {
    label: { es: 'Género y Número', en: 'Gender & Number', ca: 'Gènere i Nombre' },
    emoji: '♀️', subject: 'lengua',
    path: 'examen/espanol-gramatica-morfologia-test', page: () => import('../pages/EspanolGramaticaMorfologiaExamen'),
  },
  'espanol-ortografia-acentuacion-test': {
    label: { es: 'Acentuación', en: 'Accentuation', ca: 'Accentuació' },
    emoji: '✍️', subject: 'lengua',
    path: 'examen/espanol-ortografia-acentuacion-test', page: () => import('../pages/EspanolOrtografiaAcentuacionExamen'),
  },
  'espanol-ortografia-bv-test': {
    label: { es: 'B y V', en: 'B and V', ca: 'B i V' },
    emoji: '🔤', subject: 'lengua',
    path: 'examen/espanol-ortografia-bv-test', page: () => import('../pages/EspanolOrtografiaBVExamen'),
  },

  // ── Inglés ─────────────────────────────────────────────────────────────────
  'ingles': {
    // Examen retirado (sin ruta): etiqueta para stats antiguas
    label: { es: 'English Grammar', en: 'English Grammar', ca: 'English Grammar' },
    emoji: '🇬🇧', subject: 'ingles', retired: true,
  },
  'ingles-grammar-present-simple-test': {
    label: { es: 'Present Simple', en: 'Present Simple', ca: 'Present Simple' },
    emoji: '✅', subject: 'ingles',
    path: 'examen/ingles-grammar-present-simple-test', page: () => import('../pages/InglesGrammarPresentSimpleExamen'),
  },
  'ingles-grammar-past-simple-test': {
    label: { es: 'Past Simple', en: 'Past Simple', ca: 'Past Simple' },
    emoji: '⏪', subject: 'ingles',
    path: 'examen/ingles-grammar-past-simple-test', page: () => import('../pages/InglesGrammarPastSimpleExamen'),
  },
  'ingles-grammar-present-perfect-test': {
    label: { es: 'Present Perfect', en: 'Present Perfect', ca: 'Present Perfect' },
    emoji: '🔗', subject: 'ingles',
    path: 'examen/ingles-grammar-present-perfect-test', page: () => import('../pages/InglesGrammarPresentPerfectExamen'),
  },
  'ingles-grammar-articles-test': {
    label: { es: 'Articles', en: 'Articles', ca: 'Articles' },
    emoji: '📖', subject: 'ingles',
    path: 'examen/ingles-grammar-articles-test', page: () => import('../pages/InglesGrammarArticlesExamen'),
  },
  'ingles-grammar-passive-test': {
    label: { es: 'Passive Voice', en: 'Passive Voice', ca: 'Passive Voice' },
    emoji: '🔄', subject: 'ingles',
    path: 'examen/ingles-grammar-passive-test', page: () => import('../pages/InglesGrammarPassiveExamen'),
  },
  'ordena-frase-test': {
    label: { es: 'Ordena la Frase', en: 'Word Order', ca: 'Ordena la Frase' },
    emoji: '🔤', subject: 'ingles',
    path: 'examen/ordena-frase-test', page: () => import('../pages/OrdenaFraseExamen'),
  },
  'ingles-pos-nouns-test': {
    label: { es: 'Nouns (spot them)', en: 'Nouns (spot them)', ca: 'Nouns (spot them)' },
    emoji: '🧐', subject: 'ingles',
    path: 'examen/ingles-pos-nouns-test', page: () => import('../pages/InglesNounsExamen'),
  },
  'ingles-pos-verbs-test': {
    label: { es: 'Verbs (spot them)', en: 'Verbs (spot them)', ca: 'Verbs (spot them)' },
    emoji: '🧐', subject: 'ingles',
    path: 'examen/ingles-pos-verbs-test', page: () => import('../pages/InglesVerbsExamen'),
  },
  'ingles-pos-adjectives-test': {
    label: { es: 'Adjectives (spot them)', en: 'Adjectives (spot them)', ca: 'Adjectives (spot them)' },
    emoji: '🧐', subject: 'ingles',
    path: 'examen/ingles-pos-adjectives-test', page: () => import('../pages/InglesAdjectivesExamen'),
  },
  'ingles-pos-adverbs-test': {
    label: { es: 'Adverbs (spot them)', en: 'Adverbs (spot them)', ca: 'Adverbs (spot them)' },
    emoji: '🧐', subject: 'ingles',
    path: 'examen/ingles-pos-adverbs-test', page: () => import('../pages/InglesAdverbsExamen'),
  },
  'ingles-pos-pronouns-test': {
    label: { es: 'Pronouns (spot them)', en: 'Pronouns (spot them)', ca: 'Pronouns (spot them)' },
    emoji: '🧐', subject: 'ingles',
    path: 'examen/ingles-pos-pronouns-test', page: () => import('../pages/InglesPronounsExamen'),
  },
  'ingles-pos-connectors-test': {
    label: { es: 'Prepositions & Conjunctions', en: 'Prepositions & Conjunctions', ca: 'Prepositions & Conjunctions' },
    emoji: '🧐', subject: 'ingles',
    path: 'examen/ingles-pos-connectors-test', page: () => import('../pages/InglesConnectorsExamen'),
  },
}

// ── Helpers ──────────────────────────────────────────────────────────────────

export function examLabel(id, lang = 'es') {
  const e = EXAMS[id]
  if (!e) return id
  return e.label[lang] ?? e.label.es
}

// Exámenes de una materia: ids y etiquetas (para el perfil)
export function examsBySubject(subject) {
  return Object.entries(EXAMS)
    .filter(([, e]) => e.subject === subject)
    .map(([id, e]) => ({ id, ...e }))
}

// Exámenes con ruta propia (para generar las <Route> en App.jsx)
export function routableExams() {
  return Object.entries(EXAMS)
    .filter(([, e]) => e.path && e.page)
    .map(([id, e]) => ({ id, path: e.path, page: e.page }))
}

// Ruta absoluta para jugar un examen (registro o hardcodeada en App.jsx),
// o null si está retirado / no tiene página.
export function examRoute(id) {
  const e = EXAMS[id]
  if (!e || e.retired) return null
  if (e.path) return `/${e.path}`
  return e.route ?? null
}

// ── Grupos visuales para desplegables largos (optgroup) ──────────────────────
// Convención: los exámenes de una misma familia comparten prefijo de id.
// Familia nueva = una entrada aquí; los desplegables (ProfesorClase) agrupan
// solos. Los exámenes sin grupo se listan sueltos al principio.
const EXAM_GROUPS = [
  // Sin prefijo compartido (los ids son los mismos que usan Línea del Tiempo
  // / ¿Quién es quién? para category, ver topicCatalog.js): se agrupan por
  // lista explícita en vez de por prefijo.
  { match: id => ['gce', 'wwii', 'roma', 'usa', 'primaria', 'franquismo', 'prehistoria', 'antigua', 'edad-media', 'edad-moderna'].includes(id),
    label: { es: 'Historia (teoría, tipo test)', en: 'History (theory quiz)', ca: 'Història (teoria, tipus test)' } },
  { match: id => id === 'analiza-frases-test' || id.startsWith('frases-'),
    label: { es: 'Analiza la Frase (señalar)', en: 'Sentence Detective (spot them)', ca: 'Analitza la Frase (assenyalar)' } },
  { match: id => id.startsWith('espanol-gramatica-'),
    label: { es: 'Gramática (tipo test)', en: 'Grammar (quiz)', ca: 'Gramàtica (tipus test)' } },
  { match: id => id.startsWith('espanol-ortografia-'),
    label: { es: 'Ortografía', en: 'Spelling', ca: 'Ortografia' } },
  { match: id => id.startsWith('ingles-grammar-'),
    label: { es: 'Grammar (tipo test)', en: 'Grammar (quiz)', ca: 'Grammar (tipus test)' } },
  { match: id => id.startsWith('ingles-pos-'),
    label: { es: 'Señalar palabras', en: 'Spot the words', ca: 'Assenyalar paraules' } },
]

// Etiqueta de grupo de un examen, o null si va suelto.
export function examGroupLabel(id, lang = 'es') {
  const g = EXAM_GROUPS.find(g => g.match(id))
  return g ? (g.label[lang] ?? g.label.es) : null
}
