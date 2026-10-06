// Una ronda de Climograma: el climograma, la pregunta y las opciones. La
// usan el juego (contra reloj) y el examen (MechanicExam).
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, INICIALES } from '../../lib/climograma'
import GraficaClima from './GraficaClima'

export default function PreguntaClima({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === ronda.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
        <GraficaClima ronda={ronda} revelado={revelado} iniciales={INICIALES[l]} t={{ aria: tr({ es: 'Climograma', en: 'Climate graph', ca: 'Climograma' }) }} />
        <div className="flex justify-center gap-4 text-[11px] font-bold mt-0.5">
          <span className="text-red-300">— {tr({ es: 'Temperatura (°C)', en: 'Temperature (°C)', ca: 'Temperatura (°C)' })}</span>
          <span className="text-blue-300">▮ {tr({ es: 'Precipitación (mm)', en: 'Rainfall (mm)', ca: 'Precipitació (mm)' })}</span>
        </div>
      </div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(ronda, l)}</p>
      <div className="grid gap-2 grid-cols-2">
        {ronda.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-2.5 px-3 rounded-xl border text-white text-sm font-bold tabular-nums transition-all ${clase(o)}`}>
            {textoOpcion(o, ronda, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
