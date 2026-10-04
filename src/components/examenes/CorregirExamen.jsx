// El profesor corrige la entrega de un alumno (tarea con quizV: 2): ve cada
// respuesta con la solución o los criterios, pone los puntos del desarrollo
// (o ajusta una automática), comenta, y pasa al siguiente alumno. La nota
// sobre 10 se recalcula al momento con la misma corrección que usa el alumno.
import { createPortal } from 'react-dom'
import { useMemo, useState } from 'react'
import { useLang } from '../../context/LangContext'
import { corregirExamen, esManual } from '../../lib/examenModelo'
import { guardarCorreccion } from '../../lib/examenesProfesor'
import PreguntaAlumno from './PreguntaAlumno'

export default function CorregirExamen({ task, alumnos, inicial, nombreDe, onCerrar, onGuardado }) {
  const { tr } = useLang()
  const [uid, setUid] = useState(inicial)
  const completion = task.completions?.[uid] ?? {}
  const [manual, setManual] = useState(completion.manual ?? {})
  const [comentarios, setComentarios] = useState(completion.comentarios ?? {})
  const [general, setGeneral] = useState(completion.comentarioGeneral ?? '')
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState('')

  const c = useMemo(() => corregirExamen(task.quiz, completion.respuestas ?? {}, manual), [task.quiz, completion, manual])
  const idx = alumnos.indexOf(uid)

  function irA(nuevo) {
    const comp = task.completions?.[nuevo] ?? {}
    setUid(nuevo); setManual(comp.manual ?? {}); setComentarios(comp.comentarios ?? {}); setGeneral(comp.comentarioGeneral ?? ''); setError('')
  }

  async function guardar(siguiente) {
    setGuardando(true); setError('')
    try {
      // Fuera los ajustes vacíos: «sin ajuste» es que manda la corrección automática.
      const limpio = Object.fromEntries(Object.entries(manual).filter(([, v]) => v !== '' && v !== null && v !== undefined).map(([k, v]) => [k, Number(v)]))
      const entrada = await guardarCorreccion(task.id, uid, task.quiz, completion, { manual: limpio, comentarios, comentarioGeneral: general })
      onGuardado(uid, entrada)
      if (siguiente && idx < alumnos.length - 1) irA(alumnos[idx + 1])
    } catch {
      setError(tr({ es: 'No se pudo guardar la corrección.', en: 'Could not save the marking.', ca: 'No s’ha pogut desar la correcció.' }))
    }
    setGuardando(false)
  }

  const input = 'bg-white/5 border border-white/15 rounded-lg px-2 py-1 text-white text-[13px] outline-none focus:border-teal-500'

  return createPortal(
    <div className="fixed inset-0 z-[70] bg-black/80 overflow-y-auto" onClick={onCerrar}>
      <div className="max-w-2xl mx-auto my-4 sm:my-8 rounded-2xl bg-[#0f1527] border border-white/10" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 z-10 flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-[#0f1527]/95 backdrop-blur rounded-t-2xl">
          <button type="button" disabled={idx <= 0} onClick={() => irA(alumnos[idx - 1])} className="px-2 py-1 rounded-lg border border-white/10 text-white/60 disabled:opacity-30">‹</button>
          <div className="flex-1 min-w-0">
            <p className="text-white font-black truncate">{nombreDe(uid)}</p>
            <p className="text-white/40 text-[11.5px]">{task.title} · {idx + 1}/{alumnos.length}</p>
          </div>
          <div className="text-right">
            <p className="text-white text-xl font-black tabular-nums">{String(c.nota).replace('.', ',')}<span className="text-white/40 text-sm">/10</span></p>
            <p className={`text-[11px] ${c.pendientes ? 'text-amber-300' : 'text-green-400'}`}>{c.pendientes ? tr({ es: `${c.pendientes} sin puntuar`, en: `${c.pendientes} unmarked`, ca: `${c.pendientes} sense puntuar` }) : `${c.obtenidos}/${c.max} pt`}</p>
          </div>
          <button type="button" disabled={idx >= alumnos.length - 1} onClick={() => irA(alumnos[idx + 1])} className="px-2 py-1 rounded-lg border border-white/10 text-white/60 disabled:opacity-30">›</button>
          <button type="button" onClick={onCerrar} className="ml-1 text-white/40 hover:text-white text-lg">✕</button>
        </div>

        <div className="p-4 space-y-4">
          {task.quiz.map((p, i) => {
            const d = c.detalle[p.id]
            const manualP = esManual(p)
            return (
              <div key={p.id}>
                <PreguntaAlumno p={p} n={i + 1} valor={(completion.respuestas ?? {})[p.id]} soloLectura solucion resultado={d} />
                <div className={`mt-1.5 rounded-xl border px-3 py-2 flex flex-wrap items-center gap-2 ${manualP && (manual[p.id] === undefined || manual[p.id] === '') ? 'border-amber-500/40 bg-amber-500/[0.06]' : 'border-white/10 bg-white/[0.02]'}`}>
                  <span className="text-white/50 text-[12px]">
                    {manualP ? tr({ es: 'Puntos:', en: 'Points:', ca: 'Punts:' }) : tr({ es: `Automática: ${d.auto} pt · Ajustar:`, en: `Automatic: ${d.auto} pt · Adjust:`, ca: `Automàtica: ${d.auto} pt · Ajustar:` })}
                  </span>
                  <input type="number" min="0" max={p.puntos} step="0.25" value={manual[p.id] ?? ''} placeholder={manualP ? '?' : String(d.auto)}
                    onChange={e => setManual(m => ({ ...m, [p.id]: e.target.value }))} className={`${input} w-20 text-center`} />
                  <span className="text-white/40 text-[12px]">/ {p.puntos}</span>
                  {manualP && [0, p.puntos / 2, p.puntos].map(v => (
                    <button key={v} type="button" onClick={() => setManual(m => ({ ...m, [p.id]: v }))} className="text-[11px] font-bold px-2 py-0.5 rounded-md border border-white/10 text-white/60 hover:bg-white/5">{v}</button>
                  ))}
                  <input value={comentarios[p.id] ?? ''} maxLength={400} onChange={e => setComentarios(cm => ({ ...cm, [p.id]: e.target.value }))}
                    placeholder={tr({ es: 'Comentario para el alumno (opcional)', en: 'Comment for the student (optional)', ca: 'Comentari per a l’alumne (opcional)' })}
                    className={`${input} flex-1 min-w-[180px]`} />
                </div>
              </div>
            )
          })}
          <textarea value={general} onChange={e => setGeneral(e.target.value)} rows={2} maxLength={800}
            placeholder={tr({ es: 'Comentario general (opcional)', en: 'Overall comment (optional)', ca: 'Comentari general (opcional)' })}
            className={`${input} w-full`} />
          {error && <p className="text-red-400 text-[13px]">{error}</p>}
          <div className="flex gap-2">
            <button type="button" onClick={() => guardar(false)} disabled={guardando} className="flex-1 py-3 rounded-xl border border-white/15 text-white font-bold text-sm disabled:opacity-40">
              {tr({ es: 'Guardar', en: 'Save', ca: 'Desar' })}
            </button>
            {idx < alumnos.length - 1 && (
              <button type="button" onClick={() => guardar(true)} disabled={guardando} className="flex-1 py-3 rounded-xl bg-[#EDAE49] text-black font-black text-sm disabled:opacity-40">
                {tr({ es: 'Guardar y siguiente ›', en: 'Save and next ›', ca: 'Desar i següent ›' })}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
