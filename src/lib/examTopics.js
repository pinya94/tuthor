// ── Exámenes por tema (patrón estándar tema → formato) ───────────────────────
// Permite asignar/examinar un TEMA concreto de una materia con un FORMATO
// concreto (mecánica o nivel), con URL estable /examen/<materia>/<tema>/<formato>
// (página puente src/pages/ExamenTema.jsx) y tarea asignable {gameId, category}.
//
// El modelo es el mismo para todas las materias:
//   EXAM_TOPICS[materia][tema] = [formatos]   → qué combinaciones existen
//   EXAM_FORMATS[formato]                     → etiqueta/emoji del formato
//   topicTask(materia, tema, formato)         → la tarea {gameId, category}
//     (la ÚNICA pieza específica por materia: en historia el formato es la
//      mecánica y el tema la categoría; en matemáticas el formato es el nivel
//      y la categoría es `${tema}-${nivel}`)
//   findTopicTask({gameId, category})         → inversa por búsqueda (espacio
//     pequeño), para etiquetar/enrutar tareas guardadas.
//
// Las etiquetas de cada TEMA viven en SUBJECT_DEFS[materia].catLabels
// (src/lib/statsAggregation.js) — no se duplican aquí.
//
// Requisito para conectar un formato: su página debe filtrar por tema vía
// location.state y guardar saveActivity({ category: <la de topicTask> }).
// NO conectar exámenes que guarden category fija con su propio id (caso
// portadas-examen o el examen clásico matematicas-examen): romperían el
// conteo de aprobados del perfil (statsByCategory[examId]). Esos se asignan
// como "Examen general (sin tema)".

import { MODOS, GRADOS } from './mathEngine'

// Modos de cálculo asignables por nivel ('funciones' queda fuera: tiene sus
// propios juegos/exámenes en el catálogo).
export const MATH_TOPIC_IDS = Object.keys(MODOS).filter(id => id !== 'funciones')
const NIVEL_IDS = Object.keys(GRADOS) // primaria, eso, bachillerato

export const EXAM_TOPICS = {
  historia: {
    gce: ['linea-temporal', 'quien-es-quien', 'juego-fechas'],
    wwii: ['linea-temporal', 'quien-es-quien', 'juego-fechas'],
    roma: ['linea-temporal', 'juego-fechas'], // sin pool de ¿Quién es quién?
    usa: ['linea-temporal', 'quien-es-quien', 'juego-fechas'],
    primaria: ['linea-temporal', 'quien-es-quien', 'juego-fechas'],
  },
  matematicas: Object.fromEntries(MATH_TOPIC_IDS.map(id => [id, [...NIVEL_IDS]])),
}

export const EXAM_FORMATS = {
  // Mecánicas (historia): el formato ES el gameId que guarda las stats
  'linea-temporal': {
    label: { es: 'Línea Temporal', en: 'Timeline', ca: 'Línia Temporal' },
    emoji: '📜',
  },
  'quien-es-quien': {
    label: { es: '¿Quién es quién?', en: 'Who is who?', ca: 'Qui és qui?' },
    emoji: '🕵️',
  },
  'juego-fechas': {
    label: { es: 'Juego de Fechas', en: 'Date Game', ca: 'Joc de Dates' },
    emoji: '📅',
  },
  // Niveles (matemáticas): el formato es el nivel del examen de cálculo
  ...Object.fromEntries(NIVEL_IDS.map(id => [id, {
    label: { es: GRADOS[id].label, en: GRADOS[id].labelEn || GRADOS[id].label, ca: GRADOS[id].label },
    emoji: GRADOS[id].emoji,
  }])),
}

// (tema, formato) → tarea {gameId, category}. gameId = id con el que la
// página guarda saveActivity; category = lo que debe guardar para que la
// tarea se marque completada (recordAssignmentCompletion).
export function topicTask(materia, tema, formato) {
  if (materia === 'matematicas') {
    // MatematicasPractica (modo examen) guarda game 'matematicas' y
    // category `${modo}-${nivel}`.
    return { gameId: 'matematicas', category: `${tema}-${formato}` }
  }
  // historia (y por defecto): el formato es la mecánica, el tema la categoría
  return { gameId: formato, category: tema }
}

// Inversa de topicTask por búsqueda exhaustiva (≈40 combinaciones).
export function findTopicTask({ gameId, category }) {
  if (!category) return null
  for (const [materia, temas] of Object.entries(EXAM_TOPICS)) {
    for (const [tema, formatos] of Object.entries(temas)) {
      for (const formato of formatos) {
        const t = topicTask(materia, tema, formato)
        if (t.gameId === gameId && t.category === category) return { materia, tema, formato }
      }
    }
  }
  return null
}

// Etiqueta de una tarea de catálogo (juego/examen, con o sin tema), para no
// duplicar esta lógica entre ProfesorClase.jsx y Clase.jsx. `games`/`exams`
// son GAMES/EXAMS y `subjects` es SUBJECTS de statsAggregation.js (se pasan
// como parámetros para no crear un ciclo de imports).
export function catalogTaskLabel(task, lang, { games, exams, subjects }) {
  const topic = task.category ? findTopicTask(task) : null
  if (topic) {
    const subj = subjects.find(s => s.id === topic.materia)
    const temaLbl = subj?.examLabels[topic.tema]
    const formato = EXAM_FORMATS[topic.formato]
    const temaText = temaLbl?.[lang] || temaLbl?.es || topic.tema
    const formatoText = formato ? `${formato.emoji} ${formato.label[lang] || formato.label.es}` : topic.formato
    return `${temaText} — ${formatoText}`
  }
  const g = games[task.gameId] || exams[task.gameId]
  return g ? `${g.emoji} ${g.label[lang] || g.label.es}` : task.gameId
}

// Ruta para JUGAR una tarea de catálogo (el alumno pincha la tarea y va al
// juego/examen), o null si no hay página (tarea de texto, examen retirado).
export function catalogTaskRoute(task, { games, exams }) {
  if (task.kind !== 'catalog') return null
  const topic = task.category ? findTopicTask(task) : null
  if (topic) return `/examen/${topic.materia}/${topic.tema}/${topic.formato}`
  if (games[task.gameId]) return games[task.gameId].route
  const e = exams[task.gameId]
  if (!e || e.retired) return null
  if (e.path) return `/${e.path}`
  return e.route ?? null
}
