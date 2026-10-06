// Una ronda de la Clave dicotómica: la ficha del ser vivo (con sus rasgos) y
// la clave, pregunta a pregunta. Lo respondido queda como un camino; al
// fallar una pregunta se acaba la ronda y se enseña el camino bueno entero.
// La usan el juego (contra reloj) y el examen (MechanicExam). El estado de los
// pasos vive aquí: el padre monta una por ronda (key) y recibe al final 'ok' o
// el índice del paso fallado.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { SERES, nombreSer, rasgosSer, nombreGrupo, pregunta, conclusion } from '../../lib/claveDicotomica'

export default function PreguntaClave({ ronda, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const [hechos, setHechos] = useState([]) // respuestas dadas ('si'|'no'), en orden
  const ser = SERES[ronda.ser]
  const paso = hechos.length
  const fallo = hechos.findIndex((r, i) => r !== ronda.pasos[i].resp)
  const terminado = revelado || fallo >= 0 || paso >= ronda.pasos.length
  const SI = tr({ es: 'Sí', en: 'Yes', ca: 'Sí' })
  const NO = tr({ es: 'No', en: 'No', ca: 'No' })

  function responder(r) {
    if (terminado) return
    const nuevos = [...hechos, r]
    setHechos(nuevos)
    if (r !== ronda.pasos[paso].resp) onResponder(paso)
    else if (nuevos.length === ronda.pasos.length) onResponder('ok')
  }

  // Qué filas se ven: las respondidas y, al terminar, el resto del camino bueno.
  const filas = terminado ? ronda.pasos : ronda.pasos.slice(0, paso)
  const acierto = terminado && fallo < 0 && hechos.length === ronda.pasos.length

  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-3 mb-3 flex items-start gap-3">
        <span className="shrink-0 w-14 h-14 rounded-xl bg-white/[0.06] grid place-items-center text-4xl leading-none">{ser.emoji ?? '🔍'}</span>
        <div className="min-w-0">
          <p className="text-white font-black text-lg leading-tight">{nombreSer(ronda, l)}</p>
          <p className="text-white/70 text-[13.5px] leading-snug mt-0.5">{rasgosSer(ronda, l)}</p>
        </div>
      </div>

      <ol className="space-y-1.5 mb-3">
        {filas.map((p, i) => {
          const dada = hechos[i]
          const mal = dada !== undefined && dada !== p.resp
          const pendiente = dada === undefined || (fallo >= 0 && i > fallo)
          return (
            <li key={p.nodo} className={`rounded-xl border px-3 py-2 text-[13px] flex items-start justify-between gap-3 ${mal ? 'border-red-400/50 bg-red-500/10' : pendiente ? 'border-white/10 bg-white/[0.02] opacity-70' : 'border-green-500/30 bg-green-500/[0.07]'}`}>
              <span className="text-white/80 leading-snug">{pregunta(p.nodo, l)}</span>
              <span className="shrink-0 font-black text-[12.5px]">
                {mal && <span className="text-red-300 line-through mr-1.5">{dada === 'si' ? SI : NO}</span>}
                <span className={mal || pendiente ? 'text-green-300/80' : 'text-green-300'}>{p.resp === 'si' ? SI : NO}</span>
              </span>
            </li>
          )
        })}
      </ol>

      {!terminado ? (
        <div className="rounded-2xl border border-amber-300/40 bg-amber-300/[0.06] p-3">
          <p className="text-white/45 text-[11px] font-bold uppercase tracking-wide mb-1">{tr({ es: `Pregunta ${paso + 1} de la clave`, en: `Key question ${paso + 1}`, ca: `Pregunta ${paso + 1} de la clau` })}</p>
          <p className="text-white font-bold leading-snug mb-3">{pregunta(ronda.pasos[paso].nodo, l)}</p>
          <div className="grid grid-cols-2 gap-2">
            {[['si', SI], ['no', NO]].map(([r, t]) => (
              <button key={r} onClick={() => responder(r)}
                className="py-3 rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 text-white font-bold transition-all">{t}</button>
            ))}
          </div>
        </div>
      ) : (
        <div className={`rounded-2xl border p-3 text-center ${acierto ? 'border-green-400/60 bg-green-500/15' : 'border-white/15 bg-white/[0.04]'}`}>
          <p className="text-white/45 text-[11px] font-bold uppercase tracking-wide">{acierto ? tr({ es: '¡Clasificado!', en: 'Classified!', ca: 'Classificat!' }) : tr({ es: 'Su grupo era', en: 'Its group was', ca: 'El seu grup era' })}</p>
          <p className="text-white font-black text-xl">{nombreGrupo(ronda.grupo, l)}</p>
        </div>
      )}
      {terminado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {conclusion(ronda, l)}</p>}
    </div>
  )
}
