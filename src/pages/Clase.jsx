import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { joinClassByCode, getStudentClasses, getTeacherProfile, hasTeacherAccess } from '../lib/classes'
import { getStudentAssignments } from '../lib/assignments'
import { getMyObservations } from '../lib/observations'
import RecursosInteractivos from '../components/RecursosInteractivos'
import ClaseAlumno from '../components/ClaseAlumno'
import { Pizarra } from '../components/Iconos'

export default function Clase() {
  const { user } = useAuth()
  const { lang, tr, localPath } = useLang()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [classes, setClasses] = useState([])
  const [tasks, setTasks] = useState([])
  const [observaciones, setObservaciones] = useState([])
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

    // Aparte y sin bloquear el resto: solo las notas que cada profesor haya
    // marcado para compartir (ver src/lib/observations.js). Una consulta por
    // clase — un alumno está en pocas a la vez, no hace falta una sola query
    // agregada. Si el alumno está en más de una, se guarda de qué clase viene
    // cada nota para poder distinguirlas al mostrarlas.
    Promise.all(myClasses.map(c =>
      getMyObservations(c.id, user.uid).then(os => os.map(o => ({ ...o, className: c.name }))).catch(() => []),
    )).then(porClase => setObservaciones(porClase.flat()))
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

  const unirse = showJoinForm || classes.length === 0 ? (
    <>
      <p className="text-white/45 text-[11px] uppercase tracking-wider font-bold mb-3">
        {tr({ es: 'Código de clase', en: 'Class code', ca: 'Codi de classe' })}
      </p>
      {joinForm}
      {joinFeedback}
    </>
  ) : (
    <button onClick={() => setShowJoinForm(true)} className="text-white/55 hover:text-white text-sm font-semibold transition-colors">
      + {tr({ es: 'Unirme a otra clase', en: 'Join another class', ca: 'Unir-me a una altra classe' })}
    </button>
  )

  // Sin clase todavía: solo pedir el código, y los recursos debajo (sirven
  // para los deberes tengas clase o no).
  if (classes.length === 0) {
    return (
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <section className="rounded-2xl bg-[#141b2e] border border-white/[0.08] shadow-xl shadow-black/30 p-6 sm:p-8 text-center mb-10">
          <span className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-teal-500/12 grid place-items-center">
            <Pizarra className="w-9 h-9" />
          </span>
          <h1 className="text-3xl font-black text-white mb-2">{tr({ es: 'Mi clase', en: 'My class', ca: 'La meva classe' })}</h1>
          <p className="text-white/55 text-sm mb-6 max-w-sm mx-auto">
            {tr({
              es: 'Pide a tu profesor el código de tu clase y únete para ver aquí las tareas que te asigne.',
              en: 'Ask your teacher for your class code and join to see the tasks they assign here.',
              ca: 'Demana al teu professor el codi de la teva classe i uneix-t\'hi per veure aquí les tasques que t\'assigni.',
            })}
          </p>
          <div className="max-w-sm mx-auto text-left">{unirse}</div>
        </section>
        <h2 className="text-white font-black text-lg mb-1">{tr({ es: 'Recursos para tus deberes', en: 'Help with your homework', ca: 'Recursos per als deures' })}</h2>
        <p className="text-white/40 text-[13px] mb-3">
          {tr({ es: 'Escribe el ejercicio y te lo resolvemos paso a paso.', en: 'Type the exercise and we solve it step by step.', ca: "Escriu l'exercici i te'l resolem pas a pas." })}
        </p>
        <RecursosInteractivos />
      </div>
    )
  }

  return (
    <ClaseAlumno clases={classes} tareas={tasks} observaciones={observaciones} uid={user.uid}
      lang={lang} tr={tr} onAbrir={ruta => navigate(localPath(ruta))} unirse={unirse} />
  )
}
