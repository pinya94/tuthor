// ── Exámenes por tema (Historia) ─────────────────────────────────────────────
// Algunos juegos (Línea Temporal, ¿Quién es quién?) ya saben filtrar por
// periodo histórico internamente (vía location.state), pero no tenían una
// URL propia para eso — ver src/pages/ExamenHistoriaTema.jsx. Este registro
// dice, para cada tema, con qué formatos (mecánicas) se puede examinar.
//
// Las etiquetas de cada tema NO se duplican aquí: ya existen en
// SUBJECTS[...].examLabels (src/lib/statsAggregation.js, vía catLabels).

// Portadas (examen) se queda fuera a propósito: guarda category fijo a
// 'portadas-examen' (no el periodo real) porque Perfil.jsx lee los
// aprobados de un examen vía statsByCategory[gameId] cuando ese gameId
// está en examIds (ver aggregateStudentStats en este mismo fichero) —
// cambiarlo rompería el conteo de aprobados que ya se ve hoy en el
// perfil. Necesitaría un campo aparte para esto, no solo enchufarlo aquí.
export const EXAM_TOPICS = {
  historia: {
    gce: ['linea-temporal', 'quien-es-quien', 'juego-fechas'],
    wwii: ['linea-temporal', 'quien-es-quien', 'juego-fechas'],
    roma: ['linea-temporal', 'juego-fechas'], // sin pool de ¿Quién es quién?
    usa: ['linea-temporal', 'quien-es-quien', 'juego-fechas'],
    primaria: ['linea-temporal', 'quien-es-quien', 'juego-fechas'],
  },
}

export const EXAM_FORMATS = {
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
}

// Etiqueta de una tarea de catálogo (juego/examen, con o sin tema), para no
// duplicar esta lógica entre ProfesorClase.jsx y Perfil.jsx. `catalog` es
// GAMES o EXAMS (se pasa desde el llamador para no crear un ciclo de
// imports); `subjects` es SUBJECTS de statsAggregation.js.
export function catalogTaskLabel(task, lang, { games, exams, subjects }) {
  if (task.category) {
    const subj = subjects.find(s => EXAM_TOPICS[s.id]?.[task.category])
    const temaLbl = subj?.examLabels[task.category]
    const formato = EXAM_FORMATS[task.gameId]
    const temaText = temaLbl?.[lang] || temaLbl?.es || task.category
    const formatoText = formato ? `${formato.emoji} ${formato.label[lang] || formato.label.es}` : task.gameId
    return `${temaText} — ${formatoText}`
  }
  const g = games[task.gameId] || exams[task.gameId]
  return g ? `${g.emoji} ${g.label[lang] || g.label.es}` : task.gameId
}

// Ruta para JUGAR una tarea de catálogo (el alumno pincha la tarea y va al
// juego/examen), o null si no hay página (tarea de texto, examen retirado).
// Mismo patrón de parámetros que catalogTaskLabel.
export function catalogTaskRoute(task, { games, exams }) {
  if (task.kind !== 'catalog') return null
  // Examen por tema (historia): URL propia tema+formato (ExamenHistoriaTema)
  if (task.category) return `/examen/historia/${task.category}/${task.gameId}`
  if (games[task.gameId]) return games[task.gameId].route
  const e = exams[task.gameId]
  if (!e || e.retired) return null
  if (e.path) return `/${e.path}`
  return e.route ?? null
}
