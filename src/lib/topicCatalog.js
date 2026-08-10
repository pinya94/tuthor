// ── Catálogo por tema: el modelo uniforme de TODA la plataforma ──────────────
//
//        Materia  →  Tema  →  Formato  →  Nivel
//
//   Materia   qué asignatura            (historia, matematicas…)
//   Tema      qué trozo del temario     (Guerra Civil, Sumas…)
//   Formato   con qué MECÁNICA se hace  (Línea del Tiempo, Portadas, NumPath…)
//   Nivel     con qué dificultad        (Primaria, ESO, Bachillerato)
//
// `formato` es SIEMPRE la mecánica, nunca el nivel: eso es lo que hace que la
// estructura sea la misma en historia, matemáticas y cualquier materia futura.
// El nivel es un cuarto eje aparte, y solo existe si el formato lo usa
// (¿Quién es quién? y Portadas no tienen dificultad).
//
// Este fichero es la ÚNICA fuente de verdad de qué combinaciones existen. Lo
// consumen por igual las páginas del alumno (HistoriaTema, MatematicasTema),
// el selector de tareas del profesor y el enrutado/etiquetado de tareas, así
// que no pueden desincronizarse. Las páginas deciden CÓMO se ve cada tarjeta
// (copy, gradientes); el catálogo decide QUÉ está disponible.
//
// Las listas de disponibilidad se escriben aquí a mano (y NO se derivan
// importando historiaEvents/portadas) para no arrastrar ~140 kB de datos a
// cada bundle que use el catálogo. Un test de invariantes las valida contra
// los datos reales, así que no pueden quedarse obsoletas en silencio.

import { MODOS, GRADOS } from './mathEngine'
import { EXAMS } from './exams'

const NIVEL_IDS = Object.keys(GRADOS) // primaria, eso, bachillerato

// Temas de matemáticas = modos de cálculo. 'funciones' queda fuera: no es una
// operación con niveles, tiene sus propios juegos y exámenes en el catálogo.
const MATH_TEMA_IDS = Object.keys(MODOS).filter(id => id !== 'funciones')

const nivelLabel = id => ({
  es: GRADOS[id].label,
  en: GRADOS[id].labelEn || GRADOS[id].label,
  ca: GRADOS[id].labelCa || GRADOS[id].label,
})

export const LEVELS = Object.fromEntries(
  NIVEL_IDS.map(id => [id, { label: nivelLabel(id), emoji: GRADOS[id].emoji }])
)

// Materias basadas en exámenes (ExamenMC): cada combinación tema+formato ES un
// examen distinto del registro, y ExamenMC guarda `category = su propio id`.
// Se declaran con el mapa `formatos: { <formato>: <examId> }` dentro del tema,
// que además permite ids irregulares (ortografía no sigue el patrón de
// gramática). El formato solo aporta la etiqueta; el examen sale del tema.
const examTema = (formatos, extra = {}) => ({ niveles: [], formatos, ...extra })
const examFormato = (label, emoji) => ({ label, emoji, usesLevel: false, tracksTopic: true })
// Examen COMPARTIDO por varios temas (p.ej. el mismo examen de GeoMapa sirve
// para Europa, Asia…, recibiendo la región por location.state). Como la página
// guarda `category` fija, no puede decir qué tema se jugó: la category de la
// tarea es el tema (para etiquetar y enrutar) y el match cae a solo-juego.
const compartido = exam => ({ exam, shared: true })

export const TOPIC_CATALOG = {
  historia: {
    // Niveles con eventos para cada tema (validado en tests contra
    // historiaEvents.js). Un tema sin nivel disponible no se puede jugar.
    // Cada tema mantiene sus niveles (para la mecánica) y AHORA además
    // declara `formatos.teoria`: el examen tipo test propio del tema, que
    // topicFormats() fusiona con los de mecánica de abajo (ver el comentario
    // de esa función — antes de este cambio, declarar cualquier formato por
    // examen apagaba los de mecánica del tema entero).
    temas: {
      primaria: { niveles: ['primaria'], formatos: { teoria: 'primaria' } },
      gce: { niveles: ['eso', 'bachillerato'], formatos: { teoria: 'gce' } },
      wwii: { niveles: ['eso', 'bachillerato'], formatos: { teoria: 'wwii' } },
      roma: { niveles: ['eso', 'bachillerato'], formatos: { teoria: 'roma' } },
      usa: { niveles: ['bachillerato'], formatos: { teoria: 'usa' } },
    },
    formatos: {
      teoria: examFormato({ es: 'Teoría (tipo test)', en: 'Theory (quiz)', ca: 'Teoria (tipus test)' }, '📝'),
      'linea-temporal': {
        label: { es: 'Línea del Tiempo', en: 'Timeline', ca: 'Línia del Temps' },
        emoji: '📜',
        game: 'linea-temporal',
        usesLevel: true,
        tracksTopic: true,
      },
      'quien-es-quien': {
        label: { es: '¿Quién es quién?', en: 'Who is who?', ca: 'Qui és qui?' },
        emoji: '🕵️',
        game: 'quien-es-quien',
        usesLevel: false, // el pool de personajes no depende del nivel
        tracksTopic: true,
        temas: ['primaria', 'gce', 'wwii', 'usa'], // Roma no tiene pool
      },
      'portadas': {
        label: { es: 'Portadas', en: 'Headlines', ca: 'Portades' },
        emoji: '📰',
        game: 'portadas-examen',
        usesLevel: false,
        // La página guarda category fija ('portadas-examen'), así que no puede
        // decir qué tema se jugó: la tarea se completa jugando Portadas de
        // cualquier tema. Cambiarlo rompería el conteo de aprobados del perfil.
        tracksTopic: false,
        temas: ['primaria', 'gce', 'wwii', 'usa'], // Roma no tiene portadas
      },
      'juego-fechas': {
        label: { es: 'Juego de Fechas', en: 'Date Game', ca: 'Joc de Dates' },
        emoji: '📅',
        game: 'juego-fechas',
        usesLevel: true,
        tracksTopic: true,
        // Escribir el año exacto es inviable en Primaria (rango demasiado amplio)
        niveles: {
          primaria: [],
          gce: ['eso', 'bachillerato'],
          wwii: ['eso', 'bachillerato'],
          roma: ['eso', 'bachillerato'],
          usa: ['bachillerato'],
        },
      },
    },
  },

  matematicas: {
    temas: {
      // Modos de cálculo: se practican en los tres niveles con las mecánicas
      // de abajo (formato por mecánica, no por examen).
      ...Object.fromEntries(MATH_TEMA_IDS.map(id => [id, { niveles: [...NIVEL_IDS] }])),
      // Temas con página propia en /estudiar/matematicas/<tema>: aquí el
      // formato es qué prueba se hace, igual que en ciencias.
      funciones: examTema({
        teoria: 'funciones',
        'caza-funcion': 'funciones-grafica-test',
        trayectoria: 'trayectoria-examen',
        portero: 'portero-examen',
      }),
      algebra: examTema({ teoria: 'algebra', 'balanza-algebraica': 'balanza-algebraica-test' }),
      geometria: examTema({ teoria: 'geometria' }),
      fracciones: examTema({ teoria: 'fracciones' }),
      estadistica: examTema({ teoria: 'estadistica' }),
      'enteros-racionales': examTema({ teoria: 'enteros-racionales' }),
    },
    formatos: {
      // Formatos por examen (temas con página propia)
      teoria: examFormato({ es: 'Teoría (tipo test)', en: 'Theory (quiz)', ca: 'Teoria (tipus test)' }, '📝'),
      'caza-funcion': examFormato({ es: 'Caza la Función (con el juego)', en: 'Function Hunt (with the game)', ca: 'Caça la Funció (amb el joc)' }, '📈'),
      trayectoria: examFormato({ es: 'Trayectoria (con el juego)', en: 'Trajectory (with the game)', ca: 'Trajectòria (amb el joc)' }, '⚽'),
      portero: examFormato({ es: 'El Portero (con el juego)', en: 'The Goalkeeper (with the game)', ca: 'El Porter (amb el joc)' }, '🥅'),
      'balanza-algebraica': examFormato({ es: 'Balanza Algebraica (con el juego)', en: 'Algebra Balance (with the game)', ca: 'Balança Algebraica (amb el joc)' }, '⚖️'),
      // Formatos por mecánica (solo para los modos de cálculo)
      'examen-practica': {
        temas: MATH_TEMA_IDS,
        label: { es: 'Examen de práctica', en: 'Practice exam', ca: 'Examen de pràctica' },
        emoji: '📝',
        game: 'matematicas-examen',
        usesLevel: true,
        tracksTopic: false, // guarda category fija 'matematicas-examen'
      },
      'acercate': {
        temas: MATH_TEMA_IDS,
        label: { es: 'Acércate al número', en: 'Target Number', ca: "Apropa't al nombre" },
        emoji: '🎯',
        game: 'matematicas',
        usesLevel: true,
        tracksTopic: true,
        // Único formato que guarda tema Y nivel en la category
        category: (tema, nivel) => `${tema}-${nivel}`,
      },
      'numpath': {
        temas: MATH_TEMA_IDS,
        label: { es: 'NumPath', en: 'NumPath', ca: 'NumPath' },
        emoji: '🧮',
        game: 'numpath',
        usesLevel: true,
        tracksTopic: false, // guarda solo game, sin category
      },
    },
  },

  // La misma materia analizada de dos maneras: señalar sobre la frase real
  // (familia frases-*, la mecánica de Analiza la Frase) o tipo test
  // (familia espanol-*). Antes eran 23 exámenes planos con nombres casi
  // idénticos ("Sustantivos" salía dos veces).
  lengua: {
    temas: {
      sustantivos: examTema({ senalar: 'frases-sustantivos-test', test: 'espanol-gramatica-sustantivos-test' }),
      verbos: examTema({ senalar: 'frases-verbos-test', test: 'espanol-gramatica-verbos-test' }),
      adjetivos: examTema({ senalar: 'frases-adjetivos-test', test: 'espanol-gramatica-adjetivos-test' }),
      determinantes: examTema({ senalar: 'frases-determinantes-test', test: 'espanol-gramatica-determinantes-test' }),
      pronombres: examTema({ senalar: 'frases-pronombres-test', test: 'espanol-gramatica-pronombres-test' }),
      adverbios: examTema({ senalar: 'frases-adverbios-test', test: 'espanol-gramatica-adverbios-test' }),
      nexos: examTema({ senalar: 'frases-nexos-test', test: 'espanol-gramatica-nexos-test' }),
      morfologia: examTema({ senalar: 'frases-morfologia-test', test: 'espanol-gramatica-morfologia-test' }),
      sintaxis: examTema({ senalar: 'frases-sintaxis-test', test: 'espanol-gramatica-sintaxis-test' }),
      complementos: examTema({ senalar: 'frases-complementos-test' }),
      clases: examTema({ senalar: 'frases-clases-test' }),
      acentuacion: examTema({ test: 'espanol-ortografia-acentuacion-test' }),
      bv: examTema({ test: 'espanol-ortografia-bv-test' }),
    },
    formatos: {
      senalar: examFormato({ es: 'Señalar en la frase', en: 'Spot in the sentence', ca: 'Assenyalar a la frase' }, '🧐'),
      test: examFormato({ es: 'Tipo test', en: 'Multiple choice', ca: 'Tipus test' }, '📚'),
    },
  },

  // Tema = la región (las 7 de /estudiar/geografia); formato = la mecánica.
  // Los cinco continentes comparten los dos exámenes y reciben la región por
  // location.state; España y EE. UU. tienen examen propio.
  geografia: {
    stateKey: 'region', // qué clave de location.state espera el examen
    temas: {
      europa: examTema({ pistas: compartido('geografia-examen'), mapa: compartido('geomapa-examen') }),
      america: examTema({ pistas: compartido('geografia-examen'), mapa: compartido('geomapa-examen') }),
      asia: examTema({ pistas: compartido('geografia-examen'), mapa: compartido('geomapa-examen') }),
      africa: examTema({ pistas: compartido('geografia-examen'), mapa: compartido('geomapa-examen') }),
      oceania: examTema({ pistas: compartido('geografia-examen'), mapa: compartido('geomapa-examen') }),
      espana: examTema({ mapa: 'geomapa-espana-examen' }),
      eeuu: examTema({ mapa: 'geomapa-eeuu-examen' }),
    },
    formatos: {
      pistas: examFormato({ es: 'Adivina por pistas', en: 'Guess from clues', ca: 'Endevina per pistes' }, '🌍'),
      mapa: examFormato({ es: 'Señala en el mapa', en: 'Point on the map', ca: 'Assenyala al mapa' }, '🗺️'),
    },
  },

  // Ciencias: los temas son los de TEMA_DISCIPLINA (src/data/ciencias.js) y
  // los formatos, las pruebas que ya ofrece /estudiar/<disciplina>/<tema>:
  // el examen teórico y, en los temas que tienen juego, su examen.
  fisica: {
    temas: {
      fuerzas: examTema({ teoria: 'fuerzas', 'fuerza-neta': 'fuerza-neta-test', balanza: 'balanza-test' }),
      energia: examTema({ teoria: 'energia' }),
      electricidad: examTema({ teoria: 'electricidad' }),
      'ondas-luz': examTema({ teoria: 'ondas-luz' }),
    },
    formatos: {
      teoria: examFormato({ es: 'Teoría (tipo test)', en: 'Theory (quiz)', ca: 'Teoria (tipus test)' }, '📝'),
      'fuerza-neta': examFormato({ es: 'Fuerza Neta (con el juego)', en: 'Net Force (with the game)', ca: 'Força Neta (amb el joc)' }, '🧭'),
      balanza: examFormato({ es: 'Balanza (con el juego)', en: 'Balance (with the game)', ca: 'Balança (amb el joc)' }, '⚖️'),
    },
  },

  quimica: {
    temas: {
      'atomos-moleculas': examTema({ teoria: 'atomos-moleculas', 'balanza-ecuaciones': 'balanza-ecuaciones-test' }),
      'tabla-periodica': examTema({ teoria: 'tabla-periodica' }),
      'estados-materia': examTema({ teoria: 'estados-materia' }),
      'mezclas-separacion': examTema({ teoria: 'mezclas-separacion' }),
      'acidos-bases': examTema({ teoria: 'acidos-bases' }),
    },
    formatos: {
      teoria: examFormato({ es: 'Teoría (tipo test)', en: 'Theory (quiz)', ca: 'Teoria (tipus test)' }, '📝'),
      'balanza-ecuaciones': examFormato({ es: 'Átomos en Equilibrio (con el juego)', en: 'Atoms in Balance (with the game)', ca: "Àtoms en Equilibri (amb el joc)" }, '⚗️'),
    },
  },

  biologia: {
    temas: {
      celula: examTema({ teoria: 'celula' }),
      'cuerpo-humano': examTema({ teoria: 'cuerpo-humano' }),
      'seres-vivos': examTema({ teoria: 'seres-vivos' }),
      ecosistemas: examTema({ teoria: 'ecosistemas' }),
      genetica: examTema({ teoria: 'genetica', 'punnett': 'genetica-test' }),
      nutricion: examTema({ teoria: 'nutricion' }),
    },
    formatos: {
      teoria: examFormato({ es: 'Teoría (tipo test)', en: 'Theory (quiz)', ca: 'Teoria (tipus test)' }, '📝'),
      punnett: examFormato({ es: 'Cuadro de Punnett (con el juego)', en: 'Punnett square (with the game)', ca: 'Quadre de Punnett (amb el joc)' }, '🧬'),
    },
  },

  geologia: {
    temas: {
      'sistema-solar': examTema({ teoria: 'sistema-solar' }),
      'rocas-minerales': examTema({ teoria: 'rocas-minerales' }),
    },
    formatos: {
      teoria: examFormato({ es: 'Teoría (tipo test)', en: 'Theory (quiz)', ca: 'Teoria (tipus test)' }, '📝'),
    },
  },

  // Señalar sobre la frase (familia pos-*) para las clases de palabra, y
  // gramática (familia grammar-*) para los tiempos verbales y estructuras.
  ingles: {
    temas: {
      nouns: examTema({ senalar: 'ingles-pos-nouns-test' }),
      verbs: examTema({ senalar: 'ingles-pos-verbs-test' }),
      adjectives: examTema({ senalar: 'ingles-pos-adjectives-test' }),
      adverbs: examTema({ senalar: 'ingles-pos-adverbs-test' }),
      pronouns: examTema({ senalar: 'ingles-pos-pronouns-test' }),
      connectors: examTema({ senalar: 'ingles-pos-connectors-test' }),
      'present-simple': examTema({ test: 'ingles-grammar-present-simple-test' }),
      'past-simple': examTema({ test: 'ingles-grammar-past-simple-test' }),
      'present-perfect': examTema({ test: 'ingles-grammar-present-perfect-test' }),
      articles: examTema({ test: 'ingles-grammar-articles-test' }),
      passive: examTema({ test: 'ingles-grammar-passive-test' }),
      // El orden de las palabras es un tema propio del temario, no un formato
      // de los demás: su examen mezcla adjetivos, adverbios y preguntas a
      // propósito, así que colgarlo de "Adjectives" o "Present Simple" daría
      // al profesor un examen que no va de ese tema.
      'word-order': examTema({ ordenar: 'ordena-frase-test' }),
    },
    formatos: {
      senalar: examFormato({ es: 'Señalar en la frase', en: 'Spot in the sentence', ca: 'Assenyalar a la frase' }, '🧐'),
      test: examFormato({ es: 'Tipo test', en: 'Multiple choice', ca: 'Tipus test' }, '📚'),
      ordenar: examFormato({ es: 'Ordenar la frase', en: 'Order the sentence', ca: 'Ordenar la frase' }, '🔤'),
    },
  },

  // Materias de un solo examen por ahora: entran igualmente para que la
  // estructura ya exista cuando se añadan más formatos o temas.
  economia: {
    temas: { 'finanzas-personales': examTema({ examen: 'finanzas-personales' }) },
    formatos: { examen: examFormato({ es: 'Examen', en: 'Exam', ca: 'Examen' }, '📝') },
  },

  musica: {
    temas: { musica: examTema({ examen: 'musica' }) },
    formatos: { examen: examFormato({ es: 'Examen', en: 'Exam', ca: 'Examen' }, '📝') },
  },

  'vida-practica': {
    temas: { 'primeros-auxilios': examTema({ examen: 'primeros-auxilios' }) },
    formatos: { examen: examFormato({ es: 'Examen', en: 'Exam', ca: 'Examen' }, '📝') },
  },
}

// ── Consultas ────────────────────────────────────────────────────────────────

export const TOPIC_SUBJECT_IDS = Object.keys(TOPIC_CATALOG)

export function hasTopics(materia) {
  return Boolean(TOPIC_CATALOG[materia])
}

export function topicIds(materia) {
  return Object.keys(TOPIC_CATALOG[materia]?.temas ?? {})
}

// Niveles en los que ese formato se puede jugar para ese tema. [] si el
// formato no usa nivel (o si no hay ninguno disponible → no jugable).
export function formatLevels(materia, tema, formatoId) {
  const fmt = TOPIC_CATALOG[materia]?.formatos?.[formatoId]
  const temaCfg = TOPIC_CATALOG[materia]?.temas?.[tema]
  if (!fmt || !temaCfg) return []
  if (!fmt.usesLevel) return []
  const propios = fmt.niveles?.[tema]
  // Un formato con restricción propia se cruza con los niveles del tema
  return (propios ?? temaCfg.niveles).filter(n => temaCfg.niveles.includes(n))
}

// Formatos jugables para (materia, tema), ya resueltos con sus niveles.
export function topicFormats(materia, tema) {
  const subj = TOPIC_CATALOG[materia]
  const temaCfg = subj?.temas?.[tema]
  if (!temaCfg) return []
  // Un tema puede declarar SUS PROPIOS formatos por examen (`temaCfg.formatos`)
  // Y, a la vez, seguir recibiendo los formatos por mecánica del nivel de la
  // materia (los que traen su propio `game` y no restringen `temas`, o lo
  // restringen incluyendo este tema) — es el caso de historia, donde Línea
  // del Tiempo/¿Quién es quién?/Portadas/Juego de Fechas (mecánica, sin mapa
  // por tema) conviven con un examen de teoría propio por tema (declarado).
  // Antes esto era todo-o-nada: declarar CUALQUIER formato por examen apagaba
  // los de mecánica del tema entero. Los declarados ganan si hay colisión de
  // id (no debería darse: son namespaces con nombres distintos).
  const declarados = temaCfg.formatos
    ? Object.keys(temaCfg.formatos).filter(id => subj.formatos[id])
    : []
  const mecanica = Object.keys(subj.formatos).filter(id => {
    const fmt = subj.formatos[id]
    return fmt.game && (!fmt.temas || fmt.temas.includes(tema)) && !declarados.includes(id)
  })
  const ids = [...mecanica, ...declarados]
  return ids
    // resolveFormat aplica lo que declare el tema (examen propio o compartido)
    .map(id => ({ id, ...resolveFormat(materia, tema, id), niveles: formatLevels(materia, tema, id) }))
    // Un formato que usa nivel pero no tiene ninguno disponible no es jugable
    .filter(f => !f.usesLevel || f.niveles.length > 0)
}

// Exámenes ya cubiertos por algún tema de la materia: el desplegable plano
// ("Examen general (sin tema)") los omite para no ofrecer lo mismo dos veces.
export function examsCoveredByTopics(materia) {
  const subj = TOPIC_CATALOG[materia]
  const ids = new Set()
  // Declarados por el tema (materias basadas en exámenes)
  for (const cfg of Object.values(subj?.temas ?? {})) {
    for (const entry of Object.values(cfg.formatos ?? {})) {
      ids.add(typeof entry === 'object' ? entry.exam : entry)
    }
  }
  // Declarados por el formato (materias por mecánica: Portadas, Examen de
  // práctica…): también se llegan por tema, así que tampoco van en la lista
  // plana. Se filtran a exámenes reales: un formato por mecánica puede
  // apuntar a un id de juego (linea-temporal…) que no es un examen.
  for (const fmt of Object.values(subj?.formatos ?? {})) {
    if (typeof fmt.game === 'string' && EXAMS[fmt.game]) ids.add(fmt.game)
  }
  return ids
}

// Nivel por defecto de un tema: el primero disponible (Primaria para
// "Grandes Hitos", ESO para Guerra Civil, Bachillerato para USA…).
export function defaultLevel(materia, tema, formatoId) {
  const niveles = formatoId
    ? formatLevels(materia, tema, formatoId)
    : (TOPIC_CATALOG[materia]?.temas?.[tema]?.niveles ?? [])
  return niveles[0] ?? null
}

// ── Tarea asignable ──────────────────────────────────────────────────────────
// (materia, tema, formato, nivel) → lo que se guarda en el documento de tarea.
// `category` debe coincidir con lo que la página guarda en saveActivity para
// que la tarea se complete sola (salvo formatos con tracksTopic: false).
// Resuelve una combinación concreta a sus datos efectivos. Unifica las tres
// formas de declarar un formato: por mecánica (el formato trae el `game`),
// por examen propio del tema, y por examen compartido entre temas.
export function resolveFormat(materia, tema, formatoId) {
  const subj = TOPIC_CATALOG[materia]
  const fmt = subj?.formatos?.[formatoId]
  if (!fmt || !subj.temas?.[tema]) return null
  const entry = subj.temas[tema].formatos?.[formatoId]
  if (entry) {
    const shared = typeof entry === 'object' && entry.shared
    const exam = typeof entry === 'object' ? entry.exam : entry
    return {
      ...fmt,
      game: exam,
      // Examen propio: ExamenMC guarda `category = su propio id`, así que el
      // match es exacto. Compartido: la category real es fija, así que se usa
      // el tema para etiquetar/enrutar y el match cae a solo-juego.
      resolvedCategory: shared ? tema : exam,
      tracksTopic: !shared,
      usesLevel: false,
      stateKey: shared ? subj.stateKey : null,
    }
  }
  return fmt
}

export function topicTask(materia, tema, formatoId, nivel = null) {
  const fmt = resolveFormat(materia, tema, formatoId)
  if (!fmt) return null
  const category = fmt.resolvedCategory
    ?? (typeof fmt.category === 'function' ? fmt.category(tema, nivel) : tema)
  return {
    gameId: fmt.game,
    category,
    level: fmt.usesLevel ? nivel : null,
  }
}

// Inversa de topicTask por búsqueda exhaustiva (el espacio es pequeño: ~40
// combinaciones). Devuelve también el formato para poder etiquetar y enrutar.
export function findTopic({ gameId, category, level } = {}) {
  if (!category) return null
  for (const [materia, subj] of Object.entries(TOPIC_CATALOG)) {
    for (const tema of Object.keys(subj.temas)) {
      for (const formatoId of Object.keys(subj.formatos)) {
        const niveles = formatLevels(materia, tema, formatoId)
        const candidatos = niveles.length > 0 ? niveles : [null]
        for (const nivel of candidatos) {
          const t = topicTask(materia, tema, formatoId, nivel)
          if (t.gameId === gameId && t.category === category) {
            return { materia, tema, formato: formatoId, nivel: level ?? t.level }
          }
        }
      }
    }
  }
  return null
}

// ¿Una partida completa esta tarea? Los formatos que no saben decir qué tema
// se jugó (tracksTopic: false) se completan jugando ese juego, sin más.
export function taskMatchesPlay(task, play) {
  if (task.kind !== 'catalog' || task.gameId !== play.gameId) return false
  if (!task.category) return true
  const topic = findTopic(task)
  const fmt = topic && resolveFormat(topic.materia, topic.tema, topic.formato)
  if (fmt && !fmt.tracksTopic) return true
  return task.category === play.category
}

// ── Etiquetas y rutas ────────────────────────────────────────────────────────

// "Guerra Civil Española — 📜 Línea del Tiempo · ESO"
// `subjects` es SUBJECTS de statsAggregation.js (se pasa como parámetro para
// no crear un ciclo de imports); games/exams son GAMES/EXAMS.
export function catalogTaskLabel(task, lang, { games, exams, subjects }) {
  const topic = task.category ? findTopic(task) : null
  if (topic) {
    const subj = subjects.find(s => s.id === topic.materia)
    const temaLbl = subj?.examLabels[topic.tema]
    const temaText = temaLbl?.[lang] || temaLbl?.es || topic.tema
    const fmt = TOPIC_CATALOG[topic.materia].formatos[topic.formato]
    const fmtText = `${fmt.emoji} ${fmt.label[lang] || fmt.label.es}`
    const nivel = topic.nivel && LEVELS[topic.nivel]
    const nivelText = nivel ? ` · ${nivel.label[lang] || nivel.label.es}` : ''
    return `${temaText} — ${fmtText}${nivelText}`
  }
  const g = games[task.gameId] || exams[task.gameId]
  return g ? `${g.emoji} ${g.label[lang] || g.label.es}` : task.gameId
}

// URL estable de una combinación tema+formato (+nivel): la resuelve
// ExamenTema.jsx traduciéndola al location.state que espera cada página.
export function topicRoute(materia, tema, formatoId, nivel = null) {
  const base = `/examen/${materia}/${tema}/${formatoId}`
  return nivel ? `${base}?nivel=${nivel}` : base
}

// Ruta para JUGAR una tarea (el alumno pincha y va al juego/examen), o null si
// no hay página (tarea de texto, examen retirado).
export function catalogTaskRoute(task, { games, exams }) {
  if (task.kind !== 'catalog') return null
  const topic = task.category ? findTopic(task) : null
  if (topic) return topicRoute(topic.materia, topic.tema, topic.formato, topic.nivel)
  if (games[task.gameId]) return games[task.gameId].route
  const e = exams[task.gameId]
  if (!e || e.retired) return null
  if (e.path) return `/${e.path}`
  return e.route ?? null
}
