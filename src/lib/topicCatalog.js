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
  if (!subj?.temas?.[tema]) return []
  return Object.entries(subj.formatos)
    .filter(([, fmt]) => !fmt.temas || fmt.temas.includes(tema))
    .map(([id, fmt]) => ({ id, ...fmt, niveles: formatLevels(materia, tema, id) }))
    // Un formato que usa nivel pero no tiene ninguno disponible no es jugable
    .filter(f => !f.usesLevel || f.niveles.length > 0)
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
  const fmt = TOPIC_CATALOG[materia]?.formatos?.[formatoId]
  if (!fmt) return null
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
