// Una ronda de Lee el movimiento: la gráfica, la pregunta y las opciones. La
// usan el juego (contra reloj) y el examen (MechanicExam).
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion } from '../../lib/leeMovimiento'
import GraficaMovimiento from './GraficaMovimiento'

export default function PreguntaMovimiento({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  const tipoGrafica = r.eje === 'x'
    ? tr({ es: 'Gráfica posición-tiempo', en: 'Position-time graph', ca: 'Gràfica posició-temps' })
    : tr({ es: 'Gráfica velocidad-tiempo', en: 'Velocity-time graph', ca: 'Gràfica velocitat-temps' })
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
        <p className={`text-center text-[11px] font-bold uppercase tracking-wide mb-1 ${r.eje === 'x' ? 'text-sky-300' : 'text-pink-300'}`}>{tipoGrafica}</p>
        <GraficaMovimiento ronda={r} revelado={revelado} t={{ aria: tipoGrafica }} />
      </div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${r.tipo === 'que' ? 'grid-cols-1' : r.opciones.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-2.5 px-3 rounded-xl border text-white text-sm font-bold tabular-nums transition-all ${clase(o)}`}>
            {textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
