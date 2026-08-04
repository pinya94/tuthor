import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getClassWithStudents } from '../lib/classes'
import { getStatsAndCosmetics, formatTime } from '../lib/activity'
import { aggregateStudentStats, SUBJECTS } from '../lib/statsAggregation'
import { getClassAssignments, createAssignment, markManualCompletion } from '../lib/assignments'
import { GAMES } from '../lib/games'
import { EXAMS, examGroupLabel } from '../lib/exams'
import { EXAM_TOPICS, EXAM_FORMATS, catalogTaskLabel, topicTask } from '../lib/examTopics'

function catalogLabel(task, lang) {
  return catalogTaskLabel(task, lang, { games: GAMES, exams: EXAMS, subjects: SUBJECTS })
}

function formatDueDate(dueDate, lang) {
  const d = dueDate?.toDate ? dueDate.toDate() : new Date(dueDate)
  return d.toLocaleDateString(lang === 'en' ? 'en-GB' : lang === 'ca' ? 'ca-ES' : 'es-ES', { day: 'numeric', month: 'short' })
}

function StatTile({ label, value, sub }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
      <p className="text-white/35 text-[10.5px] uppercase tracking-wider font-bold mb-1">{label}</p>
      <p className="text-white font-black text-xl leading-none tabular-nums">{value}</p>
      {sub && <p className="text-white/30 text-[11px] mt-1">{sub}</p>}
    </div>
  )
}

function ProgressBar({ value, max }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="flex-1 bg-white/5 rounded-full h-1.5 min-w-[48px]">
      <div className="h-1.5 rounded-full bg-teal-500 transition-all" style={{ width: `${pct}%` }} />
    </div>
  )
}

async function loadStudent(uid, lang) {
  const [userSnap, stats] = await Promise.all([
    getDoc(doc(db, 'users', uid)),
    getStatsAndCosmetics(uid),
  ])
  const profile = userSnap.exists() ? userSnap.data() : {}
  return {
    uid,
    name: profile.name || profile.email || uid,
    ...aggregateStudentStats(stats, lang),
    coins: stats?.coins ?? 0,
    totalTime: stats?.totalTime ?? 0,
  }
}

// Desglose por materia de un alumno: activo/expandido para ver examen a
// examen (aprobados/suspensos), igual que en el propio Perfil.jsx.
function StudentSubjects({ subjectEntries, lang, tr }) {
  const [expanded, setExpanded] = useState(null)

  if (subjectEntries.length === 0) {
    return <p className="text-white/30 text-xs">{tr({ es: 'Sin actividad todavía', en: 'No activity yet', ca: 'Sense activitat encara' })}</p>
  }

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-black/20">
      {subjectEntries.map((subj, i) => {
        const subjLabel = subj.label[lang] || subj.label.es
        const isOpen = expanded === subj.id
        const failed = subj.totalExamPlays - subj.totalPassed
        return (
          <div key={subj.id} className={i < subjectEntries.length - 1 ? 'border-b border-white/10' : ''}>
            <button
              type="button"
              onClick={() => setExpanded(isOpen ? null : subj.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-white/5 transition-colors"
            >
              <span className="text-lg w-6 text-center shrink-0">{subj.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-white text-[13.5px] font-bold">{subjLabel}</p>
                <p className="text-white/45 text-[11.5px] mt-0.5 flex gap-2 flex-wrap items-center">
                  <span>{subj.totalPlays} {tr({ es: 'actividades', en: 'activities', ca: 'activitats' })}</span>
                  {subj.totalExamPlays > 0 && <span className="text-green-400 font-bold">{subj.totalPassed} ✅</span>}
                  {failed > 0 && <span className="text-red-400 font-bold">{failed} ❌</span>}
                </p>
              </div>
              {(subj.timeSpent || 0) > 0 && (
                <span className="text-white/60 text-[12px] font-semibold whitespace-nowrap">{formatTime(subj.timeSpent)}</span>
              )}
              <span className={`text-white/45 text-xs ml-1 transition-transform ${isOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {isOpen && subj.examRows.length > 0 && (
              <div className="px-3 pb-2.5 pl-[42px]">
                {subj.examRows.map(row => {
                  const rowFailed = row.plays - row.passed
                  return (
                    <div key={row.id} className="flex items-center gap-2 py-1 border-b border-white/5 last:border-0">
                      <span className="flex-1 text-white/60 text-[12px]">{row.label}</span>
                      <span className="text-white/45 text-[11.5px] font-semibold">{row.plays}×</span>
                      <span className="text-green-400 text-[11.5px] font-extrabold">{row.passed} ✅</span>
                      {rowFailed > 0 && <span className="text-red-400 text-[11.5px] font-extrabold">{rowFailed} ❌</span>}
                    </div>
                  )
                })}
              </div>
            )}
            {isOpen && subj.examRows.length === 0 && subj.gameStats.plays > 0 && (
              <p className="px-3 pb-2.5 pl-[42px] text-white/45 text-[12px]">
                {tr({ es: 'Sin exámenes realizados', en: 'No exams taken', ca: 'Sense exàmens fets' })}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}

// Una tarea asignada: progreso agregado + detalle por alumno al expandir.
// onToggleManual solo se usa para tareas de texto libre (el profesor marca
// a mano); las de catálogo se completan solas al jugar (recordAssignmentCompletion).
function TaskCard({ task, studentsByUid, lang, tr, onToggleManual }) {
  const [open, setOpen] = useState(false)
  const label = task.kind === 'catalog' ? catalogLabel(task, lang) : task.title
  const completions = task.completions || {}
  const total = task.studentIds.length
  const doneCount = task.studentIds.filter(uid => completions[uid]?.done).length

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.04]">
      <button type="button" onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/5 transition-colors">
        <span className="shrink-0 text-base w-5 text-center">{task.kind === 'catalog' ? '🎮' : '📌'}</span>
        <div className="flex-1 min-w-[100px]">
          <p className="text-white font-semibold text-[13.5px] truncate">{label}</p>
          {task.dueDate && (
            <p className="text-white/35 text-[10.5px] mt-0.5">
              {tr({ es: 'Vence', en: 'Due', ca: 'Venç' })} {formatDueDate(task.dueDate, lang)}
            </p>
          )}
        </div>
        <ProgressBar value={doneCount} max={total} />
        <span className="text-white/45 text-[12px] font-semibold tabular-nums shrink-0 w-12 text-right">{doneCount}/{total}</span>
        <span className={`text-white/30 text-xs shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="border-t border-white/10 divide-y divide-white/5">
          {task.studentIds.map(uid => {
            const c = completions[uid]
            const name = studentsByUid[uid]?.name || uid
            return (
              <div key={uid} className="flex items-center justify-between gap-3 px-4 py-2 pl-11">
                <span className="text-white/60 text-[12.5px]">{name}</span>
                {task.kind === 'text' ? (
                  <button type="button" onClick={() => onToggleManual(task.id, uid, !!c?.done)}
                    className={`text-[11.5px] font-bold px-2 py-1 rounded-lg border transition-colors ${
                      c?.done ? 'text-green-400 border-green-500/30 bg-green-500/10' : 'text-white/40 border-white/10 hover:border-white/25'
                    }`}>
                    {c?.done ? tr({ es: '✅ Hecha', en: '✅ Done', ca: '✅ Feta' }) : tr({ es: 'Marcar hecha', en: 'Mark done', ca: 'Marcar feta' })}
                  </button>
                ) : c?.done ? (
                  <span className="text-[12px] font-semibold">
                    <span className="text-green-400">✅ {c.passed === true ? tr({ es: 'Aprobado', en: 'Passed', ca: 'Aprovat' }) : c.passed === false ? tr({ es: 'Suspenso', en: 'Failed', ca: 'Suspès' }) : ''}</span>
                    {c.score != null && <span className="text-white/40 ml-1.5">{c.score} pts</span>}
                  </span>
                ) : (
                  <span className="text-white/30 text-[12px]">{tr({ es: 'Pendiente', en: 'Pending', ca: 'Pendent' })}</span>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function ProfesorClase() {
  const { classId } = useParams()
  const { user } = useAuth()
  const { lang, tr, localPath } = useLang()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [clase, setClase] = useState(null)
  const [students, setStudents] = useState([])
  const [error, setError] = useState('')

  const [assignments, setAssignments] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [taskKind, setTaskKind] = useState('game') // 'game' | 'exam' | 'text'
  const [taskGameId, setTaskGameId] = useState('') // kind 'game': id de GAMES
  const [taskExamSubject, setTaskExamSubject] = useState('') // kind 'exam': materia elegida
  const [taskTema, setTaskTema] = useState('') // kind 'exam', materia con EXAM_TOPICS
  const [taskFormato, setTaskFormato] = useState('') // kind 'exam': formato (con tema) o examId plano (sin tema)
  const [taskTitle, setTaskTitle] = useState('')
  const [taskTarget, setTaskTarget] = useState('all')
  const [taskStudentIds, setTaskStudentIds] = useState([])
  const [taskDueDate, setTaskDueDate] = useState('')
  const [creatingTask, setCreatingTask] = useState(false)
  const [taskError, setTaskError] = useState('')
  const [expandedStudent, setExpandedStudent] = useState(null)

  useEffect(() => {
    if (user === undefined) return
    if (!user) { navigate(localPath('/profesores'), { replace: true }); return }
    load()
  }, [user, classId])

  async function load() {
    setLoading(true)
    setError('')
    try {
      const c = await getClassWithStudents(classId)
      if (!c || c.teacherId !== user.uid) { navigate(localPath('/profesor'), { replace: true }); return }
      setClase(c)
      const list = await Promise.all((c.studentIds || []).map(uid => loadStudent(uid, lang)))
      setStudents(list)
      await loadAssignments()
    } catch {
      setError(tr({ es: 'No se pudo cargar la clase.', en: 'Could not load the class.', ca: 'No s\'ha pogut carregar la classe.' }))
    }
    setLoading(false)
  }

  async function loadAssignments() {
    try {
      setAssignments(await getClassAssignments(classId))
    } catch { /* no crítico: si falla, simplemente no se muestran tareas */ }
  }

  function resolveCatalogChoice() {
    if (taskKind === 'game') return { gameId: taskGameId, category: null }
    // taskKind === 'exam'; '__general__' = examen plano de la materia, sin tema
    const hasTemas = !!EXAM_TOPICS[taskExamSubject]
    return hasTemas && taskTema !== '__general__'
      ? topicTask(taskExamSubject, taskTema, taskFormato)
      : { gameId: taskFormato, category: null }
  }

  async function handleCreateTask(e) {
    e.preventDefault()
    const isCatalog = taskKind === 'game' || taskKind === 'exam'
    const { gameId, category } = isCatalog ? resolveCatalogChoice() : { gameId: null, category: null }
    if (isCatalog && !gameId) return
    if (taskKind === 'text' && !taskTitle.trim()) return
    const targetIds = taskTarget === 'all' ? clase.studentIds : taskStudentIds
    if (!targetIds || targetIds.length === 0) return
    setCreatingTask(true)
    setTaskError('')
    try {
      await createAssignment(user.uid, classId, clase.name, {
        kind: isCatalog ? 'catalog' : 'text',
        gameId,
        category,
        title: taskTitle.trim(),
        studentIds: targetIds,
        dueDate: taskDueDate ? new Date(taskDueDate) : null,
      })
      setShowForm(false)
      setTaskKind('game'); setTaskGameId(''); setTaskExamSubject(''); setTaskTema(''); setTaskFormato('')
      setTaskTitle(''); setTaskTarget('all'); setTaskStudentIds([]); setTaskDueDate('')
      await loadAssignments()
    } catch {
      setTaskError(tr({ es: 'No se pudo crear la tarea. Inténtalo de nuevo.', en: 'Could not create the task. Please try again.', ca: 'No s\'ha pogut crear la tasca. Torna-ho a intentar.' }))
    }
    setCreatingTask(false)
  }

  async function handleToggleManual(taskId, uid, done) {
    try {
      await markManualCompletion(taskId, uid, done)
      await loadAssignments()
    } catch {
      setTaskError(tr({ es: 'No se pudo actualizar la tarea. Inténtalo de nuevo.', en: 'Could not update the task. Please try again.', ca: 'No s\'ha pogut actualitzar la tasca. Torna-ho a intentar.' }))
    }
  }

  function toggleTaskStudent(uid) {
    setTaskStudentIds(ids => ids.includes(uid) ? ids.filter(x => x !== uid) : [...ids, uid])
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 min-h-[calc(100vh-4rem)]">
        <p className="text-red-400 text-sm">{error}</p>
        <Link to={localPath('/profesor')} className="text-white/40 hover:text-white/70 text-sm transition-colors">
          ← {tr({ es: 'Mis clases', en: 'My classes', ca: 'Les meves classes' })}
        </Link>
      </div>
    )
  }

  if (user === undefined || loading || !clase) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <p className="text-white/30 text-sm">{tr({ es: 'Cargando…', en: 'Loading…', ca: 'Carregant…' })}</p>
      </div>
    )
  }

  const studentsByUid = Object.fromEntries(students.map(s => [s.uid, s]))
  const totalTasks = assignments.length
  const avgCompletion = totalTasks > 0
    ? Math.round(assignments.reduce((acc, t) => {
        const total = t.studentIds.length || 1
        const done = t.studentIds.filter(uid => t.completions?.[uid]?.done).length
        return acc + done / total
      }, 0) / totalTasks * 100)
    : null
  const totalCoins = students.reduce((a, s) => a + (s.coins || 0), 0)

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Link to={localPath('/profesor')} className="inline-flex items-center gap-1 text-white/40 hover:text-white/70 text-sm mb-4 transition-colors">
        ← {tr({ es: 'Mis clases', en: 'My classes', ca: 'Les meves classes' })}
      </Link>

      {/* Panel sólido: sobre el fondo animado del sitio, esta página necesita
          leerse como un dashboard de datos, no fundirse con la escena. */}
      <div className="rounded-3xl border border-white/10 p-5 sm:p-7" style={{ background: 'rgba(13,15,22,.94)' }}>

      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
        <h1 className="text-2xl font-black text-white">{clase.name}</h1>
        <span className="font-mono text-sm bg-black/30 border border-white/10 rounded-lg px-3 py-1.5 text-teal-300">
          {clase.code}
        </span>
      </div>

      {/* ── RESUMEN ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
        <StatTile label={tr({ es: 'Alumnos', en: 'Students', ca: 'Alumnes' })} value={students.length} />
        <StatTile label={tr({ es: 'Tareas', en: 'Tasks', ca: 'Tasques' })} value={totalTasks} />
        <StatTile label={tr({ es: 'Completado medio', en: 'Avg. completion', ca: 'Completat mitjà' })} value={avgCompletion == null ? '—' : `${avgCompletion}%`} />
        <StatTile label={tr({ es: 'Monedas totales', en: 'Total coins', ca: 'Monedes totals' })} value={totalCoins.toLocaleString()} />
      </div>

      {/* ── TAREAS ── */}
      <section className="mb-8">
        <div className="flex items-center justify-between gap-3 mb-3">
          <h2 className="font-black text-white text-[15px] uppercase tracking-wide text-white/50">{tr({ es: 'Tareas', en: 'Tasks', ca: 'Tasques' })}</h2>
          <button type="button" onClick={() => setShowForm(o => !o)}
            className="text-xs font-bold px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white transition-colors">
            {showForm ? tr({ es: 'Cancelar', en: 'Cancel', ca: 'Cancel·lar' }) : `+ ${tr({ es: 'Asignar tarea', en: 'Assign task', ca: 'Assignar tasca' })}`}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleCreateTask} className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4 space-y-3">
            <div className="flex gap-2">
              <button type="button" onClick={() => setTaskKind('game')}
                className={`flex-1 text-xs font-bold py-2 rounded-lg border transition-colors ${taskKind === 'game' ? 'bg-teal-600 border-teal-600 text-white' : 'border-white/10 text-white/50'}`}>
                {tr({ es: 'Juego', en: 'Game', ca: 'Joc' })}
              </button>
              <button type="button" onClick={() => setTaskKind('exam')}
                className={`flex-1 text-xs font-bold py-2 rounded-lg border transition-colors ${taskKind === 'exam' ? 'bg-teal-600 border-teal-600 text-white' : 'border-white/10 text-white/50'}`}>
                {tr({ es: 'Examen', en: 'Exam', ca: 'Examen' })}
              </button>
              <button type="button" onClick={() => setTaskKind('text')}
                className={`flex-1 text-xs font-bold py-2 rounded-lg border transition-colors ${taskKind === 'text' ? 'bg-teal-600 border-teal-600 text-white' : 'border-white/10 text-white/50'}`}>
                {tr({ es: 'Texto libre', en: 'Text task', ca: 'Text lliure' })}
              </button>
            </div>

            {taskKind === 'game' && (
              <select value={taskGameId} onChange={e => setTaskGameId(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-teal-500 transition-colors">
                <option value="" className="bg-[#0d0d1a]">{tr({ es: '-- Elige un juego --', en: '-- Pick a game --', ca: '-- Tria un joc --' })}</option>
                {SUBJECTS.filter(s => s.gameIds.some(id => GAMES[id])).map(subj => (
                  <optgroup key={subj.id} label={subj.label[lang] || subj.label.es} className="bg-[#0d0d1a]">
                    {subj.gameIds.filter(id => GAMES[id]).map(id => (
                      <option key={id} value={id} className="bg-[#0d0d1a]">{GAMES[id].emoji} {GAMES[id].label[lang] || GAMES[id].label.es}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            )}

            {taskKind === 'exam' && (
              <div className="space-y-2">
                <select value={taskExamSubject} onChange={e => { setTaskExamSubject(e.target.value); setTaskTema(''); setTaskFormato('') }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-teal-500 transition-colors">
                  <option value="" className="bg-[#0d0d1a]">{tr({ es: '-- Elige materia --', en: '-- Pick a subject --', ca: '-- Tria materia --' })}</option>
                  {SUBJECTS.filter(s => EXAM_TOPICS[s.id] || s.examIds.some(id => EXAMS[id] && !EXAMS[id].retired)).map(subj => (
                    <option key={subj.id} value={subj.id} className="bg-[#0d0d1a]">{subj.emoji} {subj.label[lang] || subj.label.es}</option>
                  ))}
                </select>

                {taskExamSubject && EXAM_TOPICS[taskExamSubject] && (
                  <select value={taskTema} onChange={e => { setTaskTema(e.target.value); setTaskFormato('') }}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-teal-500 transition-colors">
                    <option value="" className="bg-[#0d0d1a]">{tr({ es: '-- Elige tema --', en: '-- Pick a topic --', ca: '-- Tria tema --' })}</option>
                    {Object.keys(EXAM_TOPICS[taskExamSubject]).map(temaId => {
                      const subj = SUBJECTS.find(s => s.id === taskExamSubject)
                      const lbl = subj?.examLabels[temaId]
                      return <option key={temaId} value={temaId} className="bg-[#0d0d1a]">{lbl?.[lang] || lbl?.es || temaId}</option>
                    })}
                    {SUBJECTS.find(s => s.id === taskExamSubject)?.examIds.some(id => EXAMS[id] && !EXAMS[id].retired) && (
                      <option value="__general__" className="bg-[#0d0d1a]">{tr({ es: 'Examen general (sin tema)', en: 'General exam (no topic)', ca: 'Examen general (sense tema)' })}</option>
                    )}
                  </select>
                )}

                {taskExamSubject && EXAM_TOPICS[taskExamSubject] && taskTema && taskTema !== '__general__' && (
                  <select value={taskFormato} onChange={e => setTaskFormato(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-teal-500 transition-colors">
                    <option value="" className="bg-[#0d0d1a]">{tr({ es: '-- Elige formato --', en: '-- Pick a format --', ca: '-- Tria format --' })}</option>
                    {EXAM_TOPICS[taskExamSubject][taskTema].map(formatoId => (
                      <option key={formatoId} value={formatoId} className="bg-[#0d0d1a]">{EXAM_FORMATS[formatoId].emoji} {EXAM_FORMATS[formatoId].label[lang] || EXAM_FORMATS[formatoId].label.es}</option>
                    ))}
                  </select>
                )}

                {taskExamSubject && (!EXAM_TOPICS[taskExamSubject] || taskTema === '__general__') && (
                  <select value={taskFormato} onChange={e => setTaskFormato(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-teal-500 transition-colors">
                    <option value="" className="bg-[#0d0d1a]">{tr({ es: '-- Elige examen --', en: '-- Pick an exam --', ca: '-- Tria examen --' })}</option>
                    {(() => {
                      // Agrupación estándar: exámenes de la misma familia (ver
                      // examGroupLabel en exams.js) bajo un optgroup; sueltos primero.
                      const ids = SUBJECTS.find(s => s.id === taskExamSubject)?.examIds.filter(id => EXAMS[id] && !EXAMS[id].retired) || []
                      const groups = new Map()
                      for (const id of ids) {
                        const g = examGroupLabel(id, lang) || ''
                        if (!groups.has(g)) groups.set(g, [])
                        groups.get(g).push(id)
                      }
                      const opt = id => (
                        <option key={id} value={id} className="bg-[#0d0d1a]">{EXAMS[id].emoji} {EXAMS[id].label[lang] || EXAMS[id].label.es}</option>
                      )
                      return [
                        ...(groups.get('') || []).map(opt),
                        ...[...groups.entries()].filter(([g]) => g !== '').map(([g, gIds]) => (
                          <optgroup key={g} label={g} className="bg-[#0d0d1a]">{gIds.map(opt)}</optgroup>
                        )),
                      ]
                    })()}
                  </select>
                )}
              </div>
            )}

            {taskKind === 'text' && (
              <input type="text" value={taskTitle} onChange={e => setTaskTitle(e.target.value)}
                placeholder={tr({ es: 'Ej. Traer el libro de texto', en: 'E.g. Bring the textbook', ca: 'Ex. Portar el llibre de text' })}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-teal-500 transition-colors" />
            )}

            <div className="flex gap-2">
              <button type="button" onClick={() => setTaskTarget('all')}
                className={`flex-1 text-xs font-bold py-2 rounded-lg border transition-colors ${taskTarget === 'all' ? 'bg-violet-600 border-violet-600 text-white' : 'border-white/10 text-white/50'}`}>
                {tr({ es: 'Toda la clase', en: 'Whole class', ca: 'Tota la classe' })}
              </button>
              <button type="button" onClick={() => setTaskTarget('some')}
                className={`flex-1 text-xs font-bold py-2 rounded-lg border transition-colors ${taskTarget === 'some' ? 'bg-violet-600 border-violet-600 text-white' : 'border-white/10 text-white/50'}`}>
                {tr({ es: 'Alumnos concretos', en: 'Specific students', ca: 'Alumnes concrets' })}
              </button>
            </div>

            {taskTarget === 'some' && (
              <div className="flex flex-wrap gap-2">
                {students.map(s => (
                  <button key={s.uid} type="button" onClick={() => toggleTaskStudent(s.uid)}
                    className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
                      taskStudentIds.includes(s.uid) ? 'bg-violet-600/30 border-violet-500/50 text-white' : 'border-white/10 text-white/50'
                    }`}>
                    {s.name}
                  </button>
                ))}
              </div>
            )}

            <input type="date" value={taskDueDate} onChange={e => setTaskDueDate(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-teal-500 transition-colors" />

            {taskError && <p className="text-red-400 text-xs">{taskError}</p>}

            <button type="submit" disabled={creatingTask}
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-colors">
              {creatingTask ? tr({ es: 'Creando…', en: 'Creating…', ca: 'Creant…' }) : tr({ es: 'Asignar', en: 'Assign', ca: 'Assignar' })}
            </button>
          </form>
        )}

        {assignments.length === 0 ? (
          <p className="text-white/30 text-sm">{tr({ es: 'Todavía no has asignado ninguna tarea.', en: "You haven't assigned any tasks yet.", ca: 'Encara no has assignat cap tasca.' })}</p>
        ) : (
          <div className="space-y-2">
            {assignments.map(task => (
              <TaskCard key={task.id} task={task} studentsByUid={studentsByUid} lang={lang} tr={tr} onToggleManual={handleToggleManual} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="font-black text-[15px] uppercase tracking-wide text-white/50 mb-3">{tr({ es: 'Alumnos', en: 'Students', ca: 'Alumnes' })}</h2>

        {students.length === 0 ? (
          <p className="text-white/30 text-sm">
            {tr({
              es: 'Todavía no se ha unido ningún alumno. Comparte el código de arriba.',
              en: 'No students have joined yet. Share the code above.',
              ca: 'Encara no s\'hi ha unit cap alumne. Comparteix el codi de dalt.',
            })}
          </p>
        ) : (
          <div className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.04]">
            <div className="hidden sm:grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr] gap-3 px-4 py-2 bg-white/5 text-[10.5px] uppercase tracking-wider font-bold text-white/35">
              <span>{tr({ es: 'Alumno', en: 'Student', ca: 'Alumne' })}</span>
              <span className="text-right">💰</span>
              <span className="text-right">🔥</span>
              <span className="text-right">⏱</span>
              <span className="text-right">📝</span>
            </div>
            {students.map((s, i) => {
              const isOpen = expandedStudent === s.uid
              return (
                <div key={s.uid} className={i > 0 ? 'border-t border-white/5' : ''}>
                  <button type="button" onClick={() => setExpandedStudent(isOpen ? null : s.uid)}
                    className="w-full grid grid-cols-[1.6fr_1fr_1fr] sm:grid-cols-[1.6fr_1fr_1fr_1fr_1fr] gap-2 sm:gap-3 px-4 py-3 items-center text-left hover:bg-white/5 transition-colors">
                    <span className="text-white font-semibold text-[13.5px] truncate">{s.name}</span>
                    <span className="text-white/60 text-[13px] tabular-nums text-right">💰 {s.coins}</span>
                    <span className="text-white/60 text-[13px] tabular-nums text-right sm:text-right">🔥 {s.streak}</span>
                    <span className="text-white/60 text-[13px] tabular-nums text-right hidden sm:block">{formatTime(s.totalTime)}</span>
                    <span className="text-white/60 text-[13px] tabular-nums text-right hidden sm:block">{s.examsTaken || 0}</span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-3">
                      <StudentSubjects subjectEntries={s.subjectEntries} lang={lang} tr={tr} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

      </div>
    </div>
  )
}
