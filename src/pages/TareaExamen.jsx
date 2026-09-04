import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { getAssignment, submitQuiz } from '../lib/assignments'

// El alumno respondiendo un examen propio del profesor (assignments/{id}.kind
// === 'quiz'). Una sola vez: si ya está hecho, esta pantalla enseña el
// resultado guardado en vez de dejar repetir — mismo criterio que un examen
// o juego del catálogo, que tampoco vuelve a puntuar un segundo intento
// (ver recordAssignmentCompletion en assignments.js).
//
// Todas las preguntas en una sola pantalla, sin temporizador: es la mecánica
// más simple posible para "preguntas sencillas" — un examen de Tuthor con
// mecánica propia (ExamenMC, MechanicExam) ya cubre lo que necesita reloj o
// dificultad progresiva.

export default function TareaExamen() {
  const { taskId } = useParams()
  const { user } = useAuth()
  const { tr, localPath } = useLang()
  const navigate = useNavigate()

  const [task, setTask] = useState(undefined) // undefined = cargando, null = no encontrada/no autorizada
  const [respuestas, setRespuestas] = useState([])
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const [resultado, setResultado] = useState(null) // { score, passed } tras enviar

  useEffect(() => {
    if (user === undefined) return
    if (!user) { navigate(localPath('/'), { replace: true }); return }
    getAssignment(taskId).then(t => {
      // No autorizada, no es un examen propio, o ya reventó: mismo trato que
      // "no encontrada" — no hay nada más específico que decirle al alumno.
      if (!t || t.kind !== 'quiz' || !t.studentIds?.includes(user.uid)) { setTask(null); return }
      setTask(t)
      setRespuestas(Array(t.quiz.length).fill(null))
    }).catch(() => setTask(null))
  }, [taskId, user]) // eslint-disable-line react-hooks/exhaustive-deps

  const yaHecho = task?.completions?.[user?.uid]?.done

  async function enviar(e) {
    e.preventDefault()
    if (respuestas.some(r => r === null)) return
    setEnviando(true); setError('')
    try {
      const r = await submitQuiz(taskId, user.uid, task.quiz, respuestas)
      setResultado(r)
    } catch {
      setError(tr({ es: 'No se pudo enviar. Inténtalo de nuevo.', en: 'Could not submit. Please try again.', ca: 'No s\'ha pogut enviar. Torna-ho a intentar.' }))
    }
    setEnviando(false)
  }

  if (task === undefined) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <p className="text-white/30 text-sm">{tr({ es: 'Cargando…', en: 'Loading…', ca: 'Carregant…' })}</p>
      </div>
    )
  }

  if (task === null) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <p className="text-white/40 text-sm text-center">
          {tr({ es: 'No se encuentra este examen, o no es para ti.', en: 'This exam could not be found, or is not for you.', ca: 'No es troba aquest examen, o no és per a tu.' })}
        </p>
      </div>
    )
  }

  const c = task.completions?.[user.uid]
  const mostrarResultado = resultado || (yaHecho && c)
  if (mostrarResultado) {
    const { score, passed } = resultado || c
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4">
        <div className="w-full max-w-sm rounded-3xl border border-white/10 p-6 text-center" style={{ background: 'rgba(17,20,29,.9)' }}>
          <span className="text-4xl block mb-3">{passed ? '✅' : '📋'}</span>
          <h1 className="text-white font-black text-xl mb-1">{task.title}</h1>
          <p className="text-white/45 text-sm mb-4">{task.className}</p>
          <p className="text-white text-4xl font-black mb-1">{score}%</p>
          <p className={`text-sm font-bold mb-6 ${passed ? 'text-green-400' : 'text-red-400'}`}>
            {passed ? tr({ es: 'Aprobado', en: 'Passed', ca: 'Aprovat' }) : tr({ es: 'Suspenso', en: 'Failed', ca: 'Suspès' })}
          </p>
          <button type="button" onClick={() => navigate(localPath('/clase'))}
            className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm transition-colors">
            {tr({ es: '← Mi clase', en: '← My class', ca: '← La meva classe' })}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-white font-black text-xl mb-1">{task.title}</h1>
        <p className="text-white/40 text-sm mb-6">{task.className} · {task.quiz.length} {tr({ es: 'preguntas', en: 'questions', ca: 'preguntes' })}</p>

        {error && <p className="text-red-400 text-[12.5px] mb-3">{error}</p>}

        <form onSubmit={enviar} className="space-y-4">
          {task.quiz.map((p, i) => (
            <div key={i} className="rounded-2xl border border-white/10 p-4" style={{ background: 'rgba(17,20,29,.7)' }}>
              <p className="text-white font-semibold text-[14px] mb-3">{i + 1}. {p.text}</p>
              <div className="space-y-2">
                {p.options.map((o, j) => (
                  <label key={j}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-pointer transition-colors ${
                      respuestas[i] === j ? 'bg-teal-500/15 border-teal-500/50' : 'border-white/10 hover:bg-white/5'
                    }`}>
                    <input type="radio" name={`p${i}`} checked={respuestas[i] === j}
                      onChange={() => setRespuestas(rs => rs.map((r, ri) => (ri === i ? j : r)))}
                      className="shrink-0 accent-teal-500" />
                    <span className="text-white/80 text-[13.5px]">{o}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button type="submit" disabled={enviando || respuestas.some(r => r === null)}
            className="w-full py-3.5 rounded-2xl bg-[#EDAE49] hover:bg-amber-400 disabled:opacity-40 text-black font-black text-base transition-colors">
            {enviando ? tr({ es: 'Enviando…', en: 'Submitting…', ca: 'Enviant…' }) : tr({ es: 'Enviar respuestas', en: 'Submit answers', ca: 'Enviar respostes' })}
          </button>
        </form>
      </div>
    </div>
  )
}
