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
// `page` es un loader dinámico (code-splitting); las entradas sin `path`/`page`
// son exámenes retirados que se conservan solo para etiquetar stats antiguas.

export const EXAMS = {
  // ── Exámenes con página propia (ruta hardcoded en App.jsx, sin loader) ──────
  // Registrados solo para etiqueta + materia en el perfil.
  'matematicas-examen': {
    label: { es: 'Examen de cálculo', en: 'Maths exam', ca: 'Examen de càlcul' },
    emoji: '🧮', subject: 'matematicas',
  },
  'portero-examen': {
    label: { es: 'El Portero (examen)', en: 'Goalkeeper (exam)', ca: 'El Porter (examen)' },
    emoji: '🥅', subject: 'matematicas',
  },
  'trayectoria-examen': {
    label: { es: 'Trayectoria (examen)', en: 'Trajectory (exam)', ca: 'Trajectòria (examen)' },
    emoji: '⚽', subject: 'matematicas',
  },
  'portadas-examen': {
    label: { es: 'Portadas (examen)', en: 'Headlines (exam)', ca: 'Portades (examen)' },
    emoji: '📰', subject: 'historia',
  },
  'geografia-examen': {
    label: { es: 'GeoRush (examen)', en: 'GeoRush (exam)', ca: 'GeoRush (examen)' },
    emoji: '🌍', subject: 'geografia',
  },
  'geomapa-examen': {
    label: { es: 'GeoMapa mundo', en: 'GeoMap world', ca: 'GeoMapa món' },
    emoji: '🗺️', subject: 'geografia',
  },
  'geomapa-espana-examen': {
    label: { es: 'GeoMapa España', en: 'GeoMap Spain', ca: 'GeoMapa Espanya' },
    emoji: '🇪🇸', subject: 'geografia',
  },
  'geomapa-eeuu-examen': {
    label: { es: 'GeoMapa EE. UU.', en: 'GeoMap USA', ca: 'GeoMapa EUA' },
    emoji: '🇺🇸', subject: 'geografia',
  },
  'diagnostico': {
    // Herramienta de estudio de Ciencias con ruta hardcoded en App.jsx
    // (/examen/diagnostico), sin path/page: registrada solo para etiqueta,
    // materia y meta SEO — igual que matematicas-examen, portero-examen...
    label: { es: 'Diagnóstico', en: 'Diagnosis', ca: 'Diagnòstic' },
    emoji: '🩺', subject: 'ciencias',
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
  'genetica': {
    label: { es: 'Genética', en: 'Genetics', ca: 'Genètica' },
    emoji: '🧬', subject: 'biologia',
    path: 'examen/genetica', page: () => import('../pages/GeneticaExamen'),
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
    emoji: '🪐', subject: 'geologia',
    path: 'examen/sistema-solar', page: () => import('../pages/SistemaSolarExamen'),
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
    emoji: '🇪🇸', subject: 'lengua',
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
    emoji: '🇬🇧', subject: 'ingles',
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
