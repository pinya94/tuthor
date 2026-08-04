// Agregación de stats de un usuario (por juego y por materia), extraída de
// Perfil.jsx para poder reutilizarla tanto en el perfil propio como en el
// panel de profesor (una llamada por alumno de la clase).
import { GAMES } from './games'
import { examsBySubject } from './exams'
import { MODOS, GRADOS } from './mathEngine'

function todayStr() { return new Date().toISOString().slice(0, 10) }

// ── Categorías de matemáticas, derivadas de mathEngine ────────────────────
// MatematicasPractica guarda category `${modo}-${nivel}`; aquí se generan
// los ids y etiquetas de todas las combinaciones para "Por materia" y para
// los temas del selector de tareas (EXAM_TOPICS.matematicas usa los modos).
const MATH_MODO_IDS = Object.keys(MODOS).filter(id => id !== 'funciones')
const modoLabel = m => ({ es: m.titulo, en: m.tituloEn || m.titulo, ca: m.tituloCa || m.titulo })
const MATH_CAT_IDS = MATH_MODO_IDS.flatMap(modo => Object.keys(GRADOS).map(nivel => `${modo}-${nivel}`))
const MATH_CAT_LABELS = {
  // El modo a secas (tema del selector de tareas): "Divisiones"
  ...Object.fromEntries(MATH_MODO_IDS.map(id => [id, modoLabel(MODOS[id])])),
  // La combinación (fila de stats): "Divisiones (ESO)"
  ...Object.fromEntries(MATH_MODO_IDS.flatMap(modo => Object.keys(GRADOS).map(nivel => {
    const m = modoLabel(MODOS[modo])
    const g = GRADOS[nivel]
    return [`${modo}-${nivel}`, {
      es: `${m.es} (${g.label})`,
      en: `${m.en} (${g.labelEn || g.label})`,
      ca: `${m.ca} (${g.label})`,
    }]
  }))),
}

// ── Juegos reales, derivados del registro central (src/lib/games.js) ──────
export const GAME_LABELS = Object.fromEntries(
  Object.entries(GAMES).map(([id, g]) => [id, { ...g.label, emoji: g.emoji }])
)

// ── Agrupación por materia ────────────────────────────────────────────────
// Los exámenes (examIds/examLabels) y los juegos del catálogo se derivan de
// los registros centrales (src/lib/exams.js, src/lib/games.js): un juego o
// examen nuevo aparece aquí sin tocar este fichero. gameIds solo lista los
// ids de stats SIN entrada en GAMES (formatos de examen por tema como
// juego-fechas/linea-temporal); el resto se completa solo desde GAMES.
// catIds son categorías de juego (no exámenes) y mantienen sus etiquetas.
export const SUBJECT_DEFS = [
  {
    id: 'historia', emoji: '⚔️',
    label: { es: 'Historia', en: 'History', ca: 'Història' },
    gameIds: ['juego-fechas', 'linea-temporal'],
    catIds: ['gce', 'wwii', 'roma', 'usa', 'primaria', 'global'],
    catLabels: {
      'gce':     { es: 'Guerra Civil Española',    en: 'Spanish Civil War',     ca: 'Guerra Civil Espanyola'  },
      'wwii':    { es: 'Segunda Guerra Mundial',   en: 'World War II',          ca: 'Segona Guerra Mundial'   },
      'roma':    { es: 'Antigua Roma',             en: 'Ancient Rome',          ca: 'Roma Antiga'             },
      'usa':     { es: 'Independencia Americana',  en: 'American Independence', ca: 'Independència Americana' },
      'primaria':{ es: 'Grandes Hitos',            en: 'Great Milestones',      ca: 'Grans Fites'             },
      'global':  { es: 'Historia Global',          en: 'World History',         ca: 'Història Global'         },
    },
  },
  {
    id: 'geografia', emoji: '🌍',
    label: { es: 'Geografía', en: 'Geography', ca: 'Geografia' },
    gameIds: [],
    catIds: [],
    catLabels: {},
  },
  {
    id: 'matematicas', emoji: '🔢',
    label: { es: 'Matemáticas', en: 'Maths', ca: 'Matemàtiques' },
    gameIds: [],
    // Combinaciones modo×nivel derivadas de mathEngine + ids legacy de
    // stats antiguas (singular / dificultades retiradas), solo lectura.
    catIds: [...MATH_CAT_IDS, 'facil', 'medio', 'dificil',
             'multiplicacion-primaria', 'multiplicacion-eso', 'multiplicacion-bachillerato',
             'division-primaria', 'division-eso', 'division-bachillerato'],
    catLabels: MATH_CAT_LABELS,
  },
  {
    id: 'quimica', emoji: '⚗️',
    label: { es: 'Química', en: 'Chemistry', ca: 'Química' },
    gameIds: [],
    catIds: [],
    catLabels: {},
  },
  {
    id: 'fisica', emoji: '⚡',
    label: { es: 'Física', en: 'Physics', ca: 'Física' },
    gameIds: [],
    catIds: [],
    catLabels: {},
  },
  {
    id: 'biologia', emoji: '🧬',
    label: { es: 'Biología', en: 'Biology', ca: 'Biologia' },
    gameIds: [],
    catIds: [],
    catLabels: {},
  },
  {
    id: 'geologia', emoji: '🌌',
    label: { es: 'Geología y el Universo', en: 'Geology & the Universe', ca: "Geologia i l'Univers" },
    gameIds: [],
    catIds: [],
    catLabels: {},
  },
  {
    id: 'lengua', emoji: '📖',
    label: { es: 'Lengua', en: 'Language', ca: 'Llengua' },
    gameIds: [],
    catIds: [],
    catLabels: {},
  },
  {
    id: 'ingles', emoji: '🇬🇧',
    label: { es: 'Inglés', en: 'English', ca: 'Anglès' },
    gameIds: [],
    catIds: [],
    catLabels: {},
  },
  {
    id: 'economia', emoji: '💰',
    label: { es: 'Economía', en: 'Economics', ca: 'Economia' },
    gameIds: [],
    catIds: [],
    catLabels: {},
  },
  {
    id: 'musica', emoji: '🎼',
    label: { es: 'Música', en: 'Music', ca: 'Música' },
    gameIds: [],
    catIds: [],
    catLabels: {},
  },
  {
    id: 'vida-practica', emoji: '🚑',
    label: { es: 'Vida Práctica', en: 'Life Skills', ca: 'Vida Pràctica' },
    gameIds: [],
    catIds: [],
    catLabels: {},
  },
]

export const SUBJECTS = SUBJECT_DEFS.map(s => {
  const exams = examsBySubject(s.id)
  const registryGameIds = Object.entries(GAMES)
    .filter(([, g]) => g.subject === s.id)
    .map(([id]) => id)
  return {
    ...s,
    gameIds: [...new Set([...registryGameIds, ...s.gameIds])],
    examIds: exams.map(e => e.id),
    examLabels: {
      ...Object.fromEntries(exams.map(e => [e.id, e.label])),
      ...s.catLabels,
    },
  }
})

// Calcula los bloques que muestra el perfil (propio o de un alumno visto
// desde el panel de profesor) a partir del doc de stats/global y el idioma.
export function aggregateStudentStats(stats, lang) {
  const streak = stats?.streak || 0
  const dailyStreak = stats?.dailyStreak || 0
  const dailyDoneToday = stats?.lastDailyDate === todayStr()

  const statsByGame     = stats?.statsByGame     || {}
  const statsByCategory = stats?.statsByCategory || {}

  // Only real games (those in GAME_LABELS), with at least 1 play
  const gameEntries = Object.entries(GAME_LABELS)
    .map(([key, lbl]) => {
      const s = statsByGame[key] || {}
      return { key, label: lbl[lang] || lbl.es, emoji: lbl.emoji, ...s }
    })
    .filter(g => (g.plays || 0) > 0)
    .sort((a, b) => (b.bestScore || 0) - (a.bestScore || 0))

  // Per-subject: aggregate games + exams
  const subjectEntries = SUBJECTS.map(subj => {
    // Game stats
    const gameStats = subj.gameIds.reduce((acc, gId) => {
      const s = statsByGame[gId] || {}
      acc.plays += s.plays || 0
      acc.timeSpent += s.timeSpent || 0
      return acc
    }, { plays: 0, timeSpent: 0 })

    // Exam rows (from statsByGame for ExamenMC, statsByCategory for historia/geo exams)
    const examRows = [
      ...subj.examIds.map(id => {
        const s = statsByGame[id] || {}
        if (!s.plays) return null
        const lbl = subj.examLabels[id]
        return { id, label: lbl?.[lang] || lbl?.es || id, plays: s.plays, passed: statsByCategory[id]?.examsPassed || 0, timeSpent: s.timeSpent || 0 }
      }),
      ...subj.catIds.map(id => {
        const s = statsByCategory[id] || {}
        if (!s.plays) return null
        // Only show if it looks like an exam (has examsPassed data or type examen)
        if ((s.examsPassed ?? -1) < 0) return null
        const lbl = subj.examLabels[id]
        return { id, label: lbl?.[lang] || lbl?.es || id, plays: s.plays, passed: s.examsPassed || 0, timeSpent: s.timeSpent || 0 }
      }),
    ].filter(Boolean)

    const totalExamPlays  = examRows.reduce((a, r) => a + r.plays, 0)
    const totalPassed     = examRows.reduce((a, r) => a + r.passed, 0)
    const examTimeSpent   = examRows.reduce((a, r) => a + (r.timeSpent || 0), 0)
    const totalPlays      = gameStats.plays + totalExamPlays

    return { ...subj, gameStats, examRows, totalExamPlays, totalPassed, totalPlays, timeSpent: gameStats.timeSpent + examTimeSpent }
  }).filter(s => s.totalPlays > 0)

  // Titulares del perfil
  const totalBestPts = Object.values(stats?.bestScores || {}).reduce((a, b) => a + b, 0)
  const examsTaken   = subjectEntries.reduce((a, s) => a + s.totalExamPlays, 0)

  return { streak, dailyStreak, dailyDoneToday, gameEntries, subjectEntries, totalBestPts, examsTaken }
}
