import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { joinClassByCode, getStudentClasses, getTeacherProfile, hasTeacherAccess } from '../lib/classes'
import { getStudentAssignments } from '../lib/assignments'
import { GAMES } from '../lib/games'
import { EXAMS } from '../lib/exams'
import { SUBJECTS } from '../lib/statsAggregation'
import { catalogTaskLabel, catalogTaskRoute } from '../lib/topicCatalog'

function taskLabel(task, lang) {
  if (task.kind !== 'catalog') return task.title
  return catalogTaskLabel(task, lang, { games: GAMES, exams: EXAMS, subjects: SUBJECTS })
}

function taskRoute(task) {
  return catalogTaskRoute(task, { games: GAMES, exams: EXAMS })
}

function formatDueDate(dueDate, lang) {
  const d = dueDate?.toDate ? dueDate.toDate() : new Date(dueDate)
  return d.toLocaleDateString(lang === 'en' ? 'en-GB' : lang === 'ca' ? 'ca-ES' : 'es-ES', { day: 'numeric', month: 'short' })
}

function isOverdue(dueDate) {
  if (!dueDate) return false
  const d = dueDate?.toDate ? dueDate.toDate() : new Date(dueDate)
  return d.getTime() < Date.now()
}

export default function Clase() {
  const { user } = useAuth()
  const { lang, tr, localPath } = useLang()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [classes, setClasses] = useState([])
  const [tasks, setTasks] = useState([])
  const [classCode, setClassCode] = useState('')
  const [joinStatus, setJoinStatus] = useState('idle')
  const [showJoinForm, setShowJoinForm] = useState(false)

  useEffect(() => {
    if (user === undefined) return
    if (!user) { navigate(localPath('/'), { replace: true }); return }
    getTeacherProfile(user.uid).then(profile => {
      if (hasTeacherAccess(profile)) { navigate(localPath('/profesor'), { replace: true }); return }
      loadData()
    }).catch(() => loadData())
  }, [user])

  async function loadData() {
    const [myClasses, myTasks] = await Promise.all([
      getStudentClasses(user.uid).catch(() => []),
      getStudentAssignments(user.uid).catch(() => []),
    ])
    setClasses(myClasses)
    setTasks(myTasks)
    setLoading(false)
  }

  async function handleJoinClass(e) {
    e.preventDefault()
    if (!classCode.trim()) return
    setJoinStatus('sending')
    try {
      const res = await joinClassByCode(user.uid, classCode)
      // Si el profesor había apuntado a este alumno con solo su nombre (una
      // ficha, ver src/lib/roster.js), es ÉL quien la vincula con esta cuenta
      // desde su panel — no se ofrece nada que decidir aquí. Ver
      // api/merge-placeholder.js para el porqué de ese cambio de diseño.
      if (res.ok) { setJoinStatus('ok'); setClassCode(''); setShowJoinForm(false); await loadData() }
      else if (res.reason === 'not_found') setJoinStatus('not_found')
      else if (res.reason === 'already_joined') setJoinStatus('already_joined')
      else setJoinStatus('error')
    } catch {
      setJoinStatus('error')
    }
  }

  if (user === undefined || loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <p className="text-white/30 text-sm">{tr({ es: 'Cargando…', en: 'Loading…', ca: 'Carregant…' })}</p>
      </div>
    )
  }

  const surf = 'rgba(17,20,29,.86)'
  const sortedTasks = [...tasks].sort((a, b) => {
    const aDone = !!a.completions?.[user.uid]?.done
    const bDone = !!b.completions?.[user.uid]?.done
    if (aDone !== bDone) return aDone ? 1 : -1
    const aDue = a.dueDate?.toMillis?.() ?? Infinity
    const bDue = b.dueDate?.toMillis?.() ?? Infinity
    return aDue - bDue
  })

  const joinForm = (
    <form onSubmit={handleJoinClass} className="flex items-center gap-2">
      <input
        type="text"
        autoFocus
        value={classCode}
        onChange={e => { setClassCode(e.target.value); if (joinStatus !== 'sending') setJoinStatus('idle') }}
        placeholder={tr({ es: 'Código de tu profesor', en: "Your teacher's code", ca: 'Codi del teu professor' })}
        maxLength={6}
        className="flex-1 min-w-0 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-teal-500 transition-colors uppercase tracking-wider"
      />
      <button type="submit" disabled={joinStatus === 'sending'}
        className="shrink-0 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-bold text-sm rounded-lg transition-colors">
        {joinStatus === 'sending'
          ? tr({ es: 'Uniendo…', en: 'Joining…', ca: 'Unint…' })
          : tr({ es: 'Unirme', en: 'Join', ca: "Unir-me" })}
      </button>
    </form>
  )

  const joinFeedback = (
    <>
      {joinStatus === 'not_found' && (
        <p className="text-red-400 text-xs mt-2">{tr({ es: 'Código no válido. Comprueba que lo has escrito bien.', en: "Invalid code. Check you typed it right.", ca: 'Codi no vàlid. Comprova que l\'has escrit bé.' })}</p>
      )}
      {joinStatus === 'already_joined' && (
        <p className="text-amber-300 text-xs mt-2">{tr({ es: 'Ya estás en esta clase.', en: "You're already in this class.", ca: 'Ja ets en aquesta classe.' })}</p>
      )}
      {joinStatus === 'error' && (
        <p className="text-red-400 text-xs mt-2">{tr({ es: 'Error al unirte. Inténtalo de nuevo.', en: 'Error joining. Please try again.', ca: 'Error en unir-te. Torna-ho a intentar.' })}</p>
      )}
    </>
  )

  return (
    <div className="relative z-10 min-h-[calc(100vh-4rem)] flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <span className="text-4xl block mb-3">🏫</span>
        <h1 className="text-3xl font-black text-white mb-2">{tr({ es: 'Mi clase', en: 'My class', ca: 'La meva classe' })}</h1>

        {classes.length === 0 ? (
          <>
            <p className="text-white/50 text-sm mb-8">
              {tr({
                es: 'Pide a tu profesor el código de tu clase y únete para ver aquí las tareas que te asigne.',
                en: 'Ask your teacher for your class code and join to see the tasks they assign here.',
                ca: 'Demana al teu professor el codi de la teva classe i uneix-t\'hi per veure aquí les tasques que t\'assigni.',
              })}
            </p>
            <div className="border border-teal-500/30 rounded-2xl px-5 py-5 bg-teal-500/[0.06]">
              <p className="text-white/35 text-[11px] uppercase tracking-wider font-bold mb-3">
                {tr({ es: 'Código de clase', en: 'Class code', ca: 'Codi de classe' })}
              </p>
              {joinForm}
              {joinFeedback}
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-6">
              {classes.map(c => (
                <span key={c.id} className="text-xs font-bold text-white/70 border border-white/10 rounded-full px-3 py-1.5" style={{ background: surf }}>
                  🏫 {c.name}
                </span>
              ))}
            </div>

            <h2 className="font-black text-white text-[15px] tracking-tight mb-3">
              📝 {tr({ es: 'Mis tareas', en: 'My tasks', ca: 'Les meves tasques' })}
            </h2>
            {sortedTasks.length === 0 ? (
              <p className="text-white/30 text-sm mb-6">{tr({ es: 'No tienes tareas pendientes por ahora.', en: 'No tasks for now.', ca: 'No tens tasques per ara.' })}</p>
            ) : (
              <div className="space-y-2 mb-6">
                {sortedTasks.map(task => {
                  const c = task.completions?.[user.uid]
                  const overdue = !c?.done && isOverdue(task.dueDate)
                  // Una tarea pendiente de catálogo lleva directa al juego/examen
                  const route = !c?.done ? taskRoute(task) : null
                  const inner = (
                    <>
                      <div className="min-w-0 text-left">
                        <p className="text-white text-[13.5px] font-bold truncate">{taskLabel(task, lang)}</p>
                        <p className="text-white/45 text-[11.5px] mt-0.5">
                          {task.className}
                          {task.dueDate && (
                            <span className={overdue ? 'text-red-400 font-semibold' : ''}>
                              {' · '}{tr({ es: 'vence', en: 'due', ca: 'venç' })} {formatDueDate(task.dueDate, lang)}
                            </span>
                          )}
                        </p>
                      </div>
                      {c?.done ? (
                        <span className="text-green-400 text-[12.5px] font-bold shrink-0">
                          ✅ {tr({ es: 'Hecha', en: 'Done', ca: 'Feta' })}
                          {c.score != null && <span className="text-white/40 ml-1.5">{c.score} pts</span>}
                        </span>
                      ) : route ? (
                        <span className="text-teal-300 text-[12.5px] font-bold shrink-0">
                          {tr({ es: 'Jugar', en: 'Play', ca: 'Jugar' })} →
                        </span>
                      ) : (
                        <span className={`text-[12.5px] shrink-0 ${overdue ? 'text-red-400 font-bold' : 'text-white/30'}`}>
                          {overdue ? tr({ es: 'Vencida', en: 'Overdue', ca: 'Vençuda' }) : tr({ es: 'Pendiente', en: 'Pending', ca: 'Pendent' })}
                        </span>
                      )}
                    </>
                  )
                  const cardClass = `w-full border rounded-2xl px-4 py-3 flex items-center justify-between gap-3 ${overdue ? 'border-red-500/30' : 'border-white/10'}`
                  return route ? (
                    <button key={task.id} type="button" onClick={() => navigate(localPath(route))}
                      className={`${cardClass} hover:border-teal-500/50 transition-colors`} style={{ background: surf }}>
                      {inner}
                    </button>
                  ) : (
                    <div key={task.id} className={cardClass} style={{ background: surf }}>
                      {inner}
                    </div>
                  )
                })}
              </div>
            )}

            <div className="border border-white/10 rounded-2xl px-4 py-3" style={{ background: surf }}>
              {showJoinForm ? (
                <>
                  {joinForm}
                  {joinFeedback}
                </>
              ) : (
                <button onClick={() => setShowJoinForm(true)} className="text-white/50 hover:text-white/80 text-xs font-semibold transition-colors">
                  + {tr({ es: 'Unirme a otra clase', en: 'Join another class', ca: 'Unir-me a una altra classe' })}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
