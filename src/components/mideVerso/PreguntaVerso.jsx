// Una ronda de Mide el verso: el fragmento del poema con los versos que se
// preguntan resaltados, la pregunta, las opciones y, al corregir, la cuenta.
// Los versos son material en castellano y no se traducen.
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion } from '../../lib/mideVerso'

export default function PreguntaVerso({ ronda, revelado, elegida, onResponder }) {
  const { lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const f = ronda.fragmento
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === ronda.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  const unaColumna = ronda.pregunta === 'final' || ronda.pregunta === 'estrofa'
  return (
    <div className="w-full">
      <figure className="rounded-2xl bg-[#fdf6e3] text-stone-800 px-4 py-3 mb-3 shadow-inner" lang="es">
        {f.versos.map((v, i) => {
          const marcado = ronda.marcados.includes(i)
          return (
            <p key={i} className={`font-serif text-[15px] leading-relaxed rounded px-1 -mx-1 ${marcado && ronda.marcados.length < 4 ? 'bg-amber-300/60 font-semibold' : ''}`}>
              {v.replace(/\s*\|\s*/g, '  ')}
            </p>
          )
        })}
        <figcaption className="text-right text-xs text-stone-500 mt-1.5 italic">{f.autor} · {f.obra}</figcaption>
      </figure>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(ronda, l)}</p>
      <div className={`grid gap-2 ${unaColumna ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {ronda.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-2.5 px-3 rounded-xl border text-white text-sm font-bold tabular-nums transition-all ${clase(o)}`}>
            {textoOpcion(o, ronda, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10 break-words">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
