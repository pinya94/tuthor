// Una ronda de Pirámide de población: la pirámide, la pregunta y las
// opciones. La usan el juego (contra reloj) y el examen (MechanicExam).
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion } from '../../lib/piramide'
import PiramideSVG from './PiramideSVG'

export default function PreguntaPiramide({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === ronda.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  const columnas = ronda.pregunta === 'rasgo' || ronda.pregunta === 'tipo' ? 'grid-cols-1' : ronda.opciones.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(ronda, l)}</p>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
        <PiramideSVG ronda={ronda} revelado={revelado} t={{
          aria: tr({ es: 'Pirámide de población', en: 'Population pyramid', ca: 'Piràmide de població' }),
          hombres: tr({ es: 'Hombres', en: 'Men', ca: 'Homes' }),
          mujeres: tr({ es: 'Mujeres', en: 'Women', ca: 'Dones' }),
        }} />
      </div>
      <div className={`grid gap-2 ${columnas}`}>
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
