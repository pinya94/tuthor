// Una ronda de Señal a Señal: la señal dibujada (o la situación con su emoji)
// y, al corregir, el tipo de señal por su forma y color.
import { useLang } from '../../context/LangContext'
import Senal from './Senal'
import { SITUACIONES, enunciado, textoOpcion, explicacion, tx } from '../../lib/senalASenal'

export default function PreguntaSenal({ ronda, revelado, elegida, onResponder }) {
  const { lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const c = r.tipo === 'situacion' ? SITUACIONES[r.caso] : null
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-5 mb-3 flex flex-col items-center justify-center min-h-[10rem]">
        {c
          ? <>
              <p className="text-5xl mb-2">{c.emoji}</p>
              <p className="text-white font-bold text-lg leading-snug text-center">{tx(c.sit, l)}</p>
            </>
          : <Senal id={r.senal} className="w-36 h-36 block" />}
      </div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${r.tipo === 'tipo' ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-2 rounded-xl border text-white text-[15px] font-bold leading-snug transition-all ${clase(o)}`}>
            {textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
