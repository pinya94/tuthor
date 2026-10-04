// El alumno haciendo un examen del profesor (tarea con quizV: 2). Las
// respuestas se guardan como borrador en el dispositivo mientras escribe (un
// examen largo no se pierde por cerrar la pestaña). Al entregar se corrige lo
// automático; lo de desarrollo queda pendiente del profesor.
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../../context/LangContext'
import { entregarExamen } from '../../lib/examenesProfesor'
import { contestada, puntosTotales, corregirExamen } from '../../lib/examenModelo'
import PreguntaAlumno from './PreguntaAlumno'

const claveBorrador = (taskId, uid) => `tuthor_examen_${taskId}_${uid}`

export default function TareaExamenV2({ task, uid }) {
  const { tr, localPath } = useLang()
  const navigate = useNavigate()
  const preguntas = task.quiz
  const [respuestas, setRespuestas] = useState(() => {
    try { return JSON.parse(localStorage.getItem(claveBorrador(task.id, uid))) ?? {} } catch { return {} }
  })
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const [entrega, setEntrega] = useState(task.completions?.[uid]?.done ? task.completions[uid] : null)

  useEffect(() => {
    if (entrega) return
    try { localStorage.setItem(claveBorrador(task.id, uid), JSON.stringify(respuestas)) } catch { /* sin almacenamiento: no pasa nada */ }
  }, [respuestas, entrega, task.id, uid])

  const sinContestar = preguntas.filter(p => !contestada(p, respuestas[p.id])).length

  async function entregar() {
    if (sinContestar > 0 && !window.confirm(tr({
      es: `Te quedan ${sinContestar} pregunta(s) sin contestar. ¿Entregar igualmente?`,
      en: `You have ${sinContestar} unanswered question(s). Submit anyway?`,
      ca: `Et queden ${sinContestar} pregunta(es) sense contestar. Lliurar igualment?`,
    }))) return
    setEnviando(true); setError('')
    try {
      const e = await entregarExamen(task.id, uid, preguntas, respuestas)
      try { localStorage.removeItem(claveBorrador(task.id, uid)) } catch { /* nada */ }
      setEntrega(e)
      window.scrollTo(0, 0)
    } catch {
      setError(tr({ es: 'No se pudo entregar. Revisa la conexión e inténtalo de nuevo; tus respuestas siguen guardadas.', en: 'Could not submit. Check your connection and try again; your answers are still saved.', ca: 'No s’ha pogut lliurar. Revisa la connexió i torna-ho a intentar; les teves respostes continuen desades.' }))
    }
    setEnviando(false)
  }

  // ── Resultado ──
  if (entrega) {
    const c = corregirExamen(preguntas, entrega.respuestas ?? {}, entrega.manual ?? {})
    const revisado = entrega.revisado
    return (
      <div className="min-h-[calc(100vh-4rem)] px-4 py-8 flex justify-center">
        <div className="w-full max-w-xl space-y-4">
          <div className="rounded-3xl border border-white/10 p-6 text-center" style={{ background: 'rgba(17,20,29,.9)' }}>
            <h1 className="text-white font-black text-xl mb-1">{task.title}</h1>
            <p className="text-white/45 text-sm mb-4">{task.className}</p>
            <p className="text-white text-5xl font-black mb-1">{String(entrega.nota ?? c.nota).replace('.', ',')}<span className="text-white/40 text-2xl">/10</span></p>
            <p className="text-white/50 text-sm">{entrega.obtenidos ?? c.obtenidos} / {entrega.max ?? c.max} {tr({ es: 'puntos', en: 'points', ca: 'punts' })}</p>
            {!revisado && (
              <p className="mt-3 text-amber-300/90 text-[13px]">
                {tr({ es: `Nota provisional: falta que tu profesor corrija ${entrega.pendientes} pregunta(s) de desarrollo.`, en: `Provisional mark: your teacher still has to mark ${entrega.pendientes} open question(s).`, ca: `Nota provisional: falta que el teu professor corregeixi ${entrega.pendientes} pregunta(es) de desenvolupament.` })}
              </p>
            )}
            {revisado && entrega.comentarioGeneral && <p className="mt-3 text-white/75 text-[13.5px] italic">«{entrega.comentarioGeneral}»</p>}
            <button type="button" onClick={() => navigate(localPath('/clase'))} className="mt-5 w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm">
              {tr({ es: '← Mi clase', en: '← My class', ca: '← La meva classe' })}
            </button>
          </div>
          {preguntas.map((p, i) => (
            <div key={p.id}>
              <PreguntaAlumno p={p} n={i + 1} valor={(entrega.respuestas ?? {})[p.id]} soloLectura resultado={c.detalle[p.id].auto === null && !revisado ? { puntos: '?' } : c.detalle[p.id]} />
              {entrega.comentarios?.[p.id] && <p className="mt-1 ml-3 text-[12.5px] text-teal-300/90">💬 {entrega.comentarios[p.id]}</p>}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // ── Haciendo el examen ──
  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8 flex justify-center">
      <div className="w-full max-w-xl">
        <h1 className="text-white font-black text-xl mb-1">{task.title}</h1>
        <p className="text-white/40 text-sm mb-3">{task.className} · {preguntas.length} {tr({ es: 'preguntas', en: 'questions', ca: 'preguntes' })} · {puntosTotales(preguntas)} {tr({ es: 'puntos', en: 'points', ca: 'punts' })}</p>
        {task.instrucciones && <p className="text-white/70 text-[13.5px] whitespace-pre-wrap rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5 mb-4">{task.instrucciones}</p>}
        <div className="space-y-4">
          {preguntas.map((p, i) => (
            <PreguntaAlumno key={p.id} p={p} n={i + 1} valor={respuestas[p.id]} onChange={v => setRespuestas(r => ({ ...r, [p.id]: v }))} />
          ))}
        </div>
        {error && <p className="text-red-400 text-[13px] mt-4">{error}</p>}
        <div className="sticky bottom-3 mt-5">
          <button type="button" onClick={entregar} disabled={enviando}
            className="w-full py-3.5 rounded-2xl bg-[#EDAE49] hover:bg-amber-400 disabled:opacity-40 text-black font-black text-base shadow-xl shadow-black/40">
            {enviando ? tr({ es: 'Entregando…', en: 'Submitting…', ca: 'Lliurant…' })
              : sinContestar > 0 ? tr({ es: `Entregar (${sinContestar} sin contestar)`, en: `Submit (${sinContestar} unanswered)`, ca: `Lliurar (${sinContestar} sense contestar)` })
              : tr({ es: 'Entregar examen', en: 'Submit exam', ca: 'Lliurar examen' })}
          </button>
        </div>
      </div>
    </div>
  )
}
