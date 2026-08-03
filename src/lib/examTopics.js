// ── Exámenes por tema (Historia) ─────────────────────────────────────────────
// Algunos juegos (Línea Temporal, ¿Quién es quién?) ya saben filtrar por
// periodo histórico internamente (vía location.state), pero no tenían una
// URL propia para eso — ver src/pages/ExamenHistoriaTema.jsx. Este registro
// dice, para cada tema, con qué formatos (mecánicas) se puede examinar.
//
// Las etiquetas de cada tema NO se duplican aquí: ya existen en
// SUBJECTS[...].examLabels (src/lib/statsAggregation.js, vía catLabels).

export const EXAM_TOPICS = {
  historia: {
    gce: ['linea-temporal', 'quien-es-quien'],
    wwii: ['linea-temporal', 'quien-es-quien'],
    roma: ['linea-temporal'], // ¿Quién es quién? no tiene pool de Roma
    usa: ['linea-temporal', 'quien-es-quien'],
    primaria: ['linea-temporal', 'quien-es-quien'],
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
