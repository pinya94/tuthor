import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getClassWithStudents } from '../lib/classes'
import { getStatsAndCosmetics, formatTime } from '../lib/activity'
import { aggregateStudentStats } from '../lib/statsAggregation'

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

export default function ProfesorClase() {
  const { classId } = useParams()
  const { user } = useAuth()
  const { lang, tr, localPath } = useLang()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [clase, setClase] = useState(null)
  const [students, setStudents] = useState([])
  const [error, setError] = useState('')

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
    } catch {
      setError(tr({ es: 'No se pudo cargar la clase.', en: 'Could not load the class.', ca: 'No s\'ha pogut carregar la classe.' }))
    }
    setLoading(false)
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

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Link to={localPath('/profesor')} className="inline-flex items-center gap-1 text-white/40 hover:text-white/70 text-sm mb-4 transition-colors">
        ← {tr({ es: 'Mis clases', en: 'My classes', ca: 'Les meves classes' })}
      </Link>

      <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
        <h1 className="text-2xl font-black text-white">{clase.name}</h1>
        <span className="font-mono text-sm bg-black/30 border border-white/10 rounded-lg px-3 py-1.5 text-teal-300">
          {clase.code}
        </span>
      </div>

      {students.length === 0 ? (
        <p className="text-white/30 text-sm">
          {tr({
            es: 'Todavía no se ha unido ningún alumno. Comparte el código de arriba.',
            en: 'No students have joined yet. Share the code above.',
            ca: 'Encara no s\'hi ha unit cap alumne. Comparteix el codi de dalt.',
          })}
        </p>
      ) : (
        <div className="space-y-3">
          {students.map(s => (
            <div key={s.uid} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center justify-between gap-4 flex-wrap mb-3">
                <p className="text-white font-bold">{s.name}</p>
                <div className="flex items-center gap-4 text-sm text-white/50">
                  <span>💰 {s.coins}</span>
                  <span>🔥 {s.streak}</span>
                  <span>⏱ {formatTime(s.totalTime)}</span>
                  {s.examsTaken > 0 && <span>📝 {s.examsTaken} {tr({ es: 'exámenes', en: 'exams', ca: 'exàmens' })}</span>}
                </div>
              </div>
              <StudentSubjects subjectEntries={s.subjectEntries} lang={lang} tr={tr} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
