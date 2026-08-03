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

export default function ProfesorClase() {
  const { classId } = useParams()
  const { user } = useAuth()
  const { lang, tr, localPath } = useLang()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [clase, setClase] = useState(null)
  const [students, setStudents] = useState([])

  useEffect(() => {
    if (user === undefined) return
    if (!user) { navigate(localPath('/profesores'), { replace: true }); return }
    load()
  }, [user, classId])

  async function load() {
    setLoading(true)
    const c = await getClassWithStudents(classId)
    if (!c || c.teacherId !== user.uid) { navigate(localPath('/profesor'), { replace: true }); return }
    setClase(c)
    const list = await Promise.all((c.studentIds || []).map(uid => loadStudent(uid, lang)))
    setStudents(list)
    setLoading(false)
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
                </div>
              </div>
              {s.subjectEntries.length === 0 ? (
                <p className="text-white/30 text-xs">{tr({ es: 'Sin actividad todavía', en: 'No activity yet', ca: 'Sense activitat encara' })}</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {s.subjectEntries.map(subj => (
                    <span key={subj.id} className="text-xs bg-white/5 border border-white/10 rounded-lg px-2.5 py-1 text-white/60">
                      {subj.emoji} {subj.label[lang] || subj.label.es} · {subj.totalPlays}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
