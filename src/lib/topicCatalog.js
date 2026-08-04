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

export const TOPIC_CATALOG = {
  historia: {
    // Niveles con eventos para cada tema (validado en tests contra
    // historiaEvents.js). Un tema sin nivel disponible no se puede jugar.
    temas: {
      primaria: { niveles: ['primaria'] },
      gce: { niveles: ['eso', 'bachillerato'] },
      wwii: { niveles: ['eso', 'bachillerato'] },
      roma: { niveles: ['eso', 'bachillerato'] },
      usa: { niveles: ['bachillerato'] },
    },
    formatos: {
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
    // Todas las operaciones se practican en los tres niveles.
    temas: Object.fromEntries(MATH_TEMA_IDS.map(id => [id, { niveles: [...NIVEL_IDS] }])),
    formatos: {
      'examen-practica': {
        label: { es: 'Examen de práctica', en: 'Practice exam', ca: 'Examen de pràctica' },
        emoji: '📝',
        game: 'matematicas-examen',
        usesLevel: true,
        tracksTopic: false, // guarda category fija 'matematicas-examen'
      },
      'acercate': {
        label: { es: 'Acércate al número', en: 'Target Number', ca: "Apropa't al nombre" },
        emoji: '🎯',
        game: 'matematicas',
        usesLevel: true,
        tracksTopic: true,
        // Único formato que guarda tema Y nivel en la category
        category: (tema, nivel) => `${tema}-${nivel}`,
      },
      'numpath': {
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

  // Tema = la región; formato = la mecánica con la que se examina.
  geografia: {
    temas: {
      mundo: examTema({ pistas: 'geografia-examen', mapa: 'geomapa-examen' }),
      espana: examTema({ mapa: 'geomapa-espana-examen' }),
      eeuu: examTema({ mapa: 'geomapa-eeuu-examen' }),
    },
    formatos: {
      pistas: examFormato({ es: 'Adivina por pistas', en: 'Guess from clues', ca: 'Endevina per pistes' }, '🌍'),
      mapa: examFormato({ es: 'Señala en el mapa', en: 'Point on the map', ca: 'Assenyala al mapa' }, '🗺️'),
    },
  },

  // Teoría (examen tipo test) vs práctica (el examen del juego del tema).
  fisica: {
    temas: {
      fuerzas: examTema({ teoria: 'fuerzas', practica: 'fuerza-neta-test' }),
      palancas: examTema({ practica: 'balanza-test' }),
      energia: examTema({ teoria: 'energia' }),
      electricidad: examTema({ teoria: 'electricidad' }),
      'ondas-luz': examTema({ teoria: 'ondas-luz' }),
    },
    formatos: {
      teoria: examFormato({ es: 'Teoría (tipo test)', en: 'Theory (quiz)', ca: 'Teoria (tipus test)' }, '📝'),
      practica: examFormato({ es: 'Práctica (con el juego)', en: 'Practice (with the game)', ca: 'Pràctica (amb el joc)' }, '🎮'),
    },
  },

  quimica: {
    temas: {
      'ajuste-ecuaciones': examTema({ practica: 'balanza-ecuaciones-test' }),
      'tabla-periodica': examTema({ teoria: 'tabla-periodica' }),
      'atomos-moleculas': examTema({ teoria: 'atomos-moleculas' }),
      'estados-materia': examTema({ teoria: 'estados-materia' }),
      'mezclas-separacion': examTema({ teoria: 'mezclas-separacion' }),
      'acidos-bases': examTema({ teoria: 'acidos-bases' }),
    },
    formatos: {
      teoria: examFormato({ es: 'Teoría (tipo test)', en: 'Theory (quiz)', ca: 'Teoria (tipus test)' }, '📝'),
      practica: examFormato({ es: 'Práctica (con el juego)', en: 'Practice (with the game)', ca: 'Pràctica (amb el joc)' }, '🎮'),
    },
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
  // Materias basadas en exámenes: el tema declara exactamente qué formatos
  // tiene (y con qué examen); el resto usa las reglas del propio formato.
  const ids = temaCfg.formatos
    ? Object.keys(temaCfg.formatos).filter(id => subj.formatos[id])
    : Object.keys(subj.formatos).filter(id => {
        const fmt = subj.formatos[id]
        return !fmt.temas || fmt.temas.includes(tema)
      })
  return ids
    .map(id => ({ id, ...subj.formatos[id], niveles: formatLevels(materia, tema, id) }))
    // Un formato que usa nivel pero no tiene ninguno disponible no es jugable
    .filter(f => !f.usesLevel || f.niveles.length > 0)
}

// Exámenes ya cubiertos por algún tema de la materia: el desplegable plano
// ("Examen general (sin tema)") los omite para no ofrecer lo mismo dos veces.
export function examsCoveredByTopics(materia) {
  const temas = TOPIC_CATALOG[materia]?.temas ?? {}
  const ids = new Set()
  for (const cfg of Object.values(temas)) {
    for (const examId of Object.values(cfg.formatos ?? {})) ids.add(examId)
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
export function topicTask(materia, tema, formatoId, nivel = null) {
  const subj = TOPIC_CATALOG[materia]
  const fmt = subj?.formatos?.[formatoId]
  if (!fmt) return null
  // Materia basada en exámenes: el examen lo declara el tema, y ExamenMC
  // guarda `category = su propio id`, así que gameId y category coinciden.
  const examId = subj.temas?.[tema]?.formatos?.[formatoId]
  if (examId) return { gameId: examId, category: examId, level: null }

  const category = typeof fmt.category === 'function' ? fmt.category(tema, nivel) : tema
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
  const fmt = topic && TOPIC_CATALOG[topic.materia]?.formatos?.[topic.formato]
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
