// Una ronda de Engranajes: el tren dibujado, la pregunta y las opciones. La
// usan el juego (contra reloj) y el examen (MechanicExam).
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion } from '../../lib/engranajes'
import TrenEngranajes from './TrenEngranajes'

export default function PreguntaEngranajes({ ronda, revelado, elegida, onResponder }) {
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
      <p className="text-white font-bold text-center mb-1 leading-snug">{enunciado(ronda, l)}</p>
      <p className="text-white/45 text-xs text-center mb-2">{tr({ es: 'El número de cada rueda son sus dientes. La primera es la que mueve.', en: 'The number on each gear is its teeth. The first one is the driver.', ca: 'El número de cada roda són les seves dents. La primera és la que mou.' })}</p>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
        <p className="text-slate-300 text-xs font-bold px-1 pb-1">
          {tr({ es: 'Rueda motriz (izquierda):', en: 'Driver gear (left):', ca: 'Roda motriu (esquerra):' })} {ronda.tren[0].sentido === 1 ? '↻' : '↺'} {ronda.tren[0].sentido === 1 ? tr({ es: 'horario', en: 'clockwise', ca: 'horari' }) : tr({ es: 'antihorario', en: 'anticlockwise', ca: 'antihorari' })} · {ronda.tren[0].rpm} rpm
        </p>
        <TrenEngranajes ronda={ronda} revelado={revelado} t={{ aria: tr({ es: 'Tren de engranajes', en: 'Gear train', ca: 'Tren d’engranatges' }) }} />
      </div>
      <div className={`grid gap-2 ${ronda.opciones.length === 3 ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {ronda.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-2 rounded-xl border text-white text-sm font-bold transition-all ${clase(o)}`}>
            {textoOpcion(o, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
