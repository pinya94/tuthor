// Una ronda de ¿Flota o se hunde?: los datos del objeto y del líquido, el vaso
// y las opciones. La usan el juego (contra reloj) y el examen (MechanicExam).
import { useLang } from '../../context/LangContext'
import { LIQUIDOS, OBJETOS, enunciado, textoOpcion, explicacion, nombreObjeto, nombreLiquido, datoObjeto, num } from '../../lib/flotaHunde'
import VasoFlota from './VasoFlota'

function Ficha({ color, titulo, dato }) {
  return (
    <div className="flex-1 min-w-0 rounded-xl bg-white/[0.04] border border-white/10 px-3 py-2">
      <p className="flex items-start gap-1.5 text-white text-[13px] font-bold leading-tight">
        <span className="shrink-0 w-3 h-3 mt-px rounded-sm border border-black/30" style={{ background: color }} />
        <span className="min-w-0">{titulo}</span>
      </p>
      <p className="text-white/60 text-[12px] tabular-nums mt-0.5">
        {dato.split(' · ').map((d, i) => <span key={i}>{i > 0 && ' · '}<span className="whitespace-nowrap">{d}</span></span>)}
      </p>
    </div>
  )
}

export default function PreguntaFlota({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const liq = LIQUIDOS[ronda.liquido]
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === ronda.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(ronda, l)}</p>
      <div className="flex gap-2 mb-2">
        <Ficha color={OBJETOS[ronda.objeto]?.color ?? '#A78BFA'} titulo={nombreObjeto(ronda, l)} dato={datoObjeto(ronda, l)} />
        <Ficha color={liq.color} titulo={nombreLiquido(ronda, l)} dato={`ρ = ${num(liq.rho, l)} g/cm³`} />
      </div>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
        <VasoFlota ronda={ronda} revelado={revelado} aria={tr({ es: 'Vaso con el líquido y el objeto', en: 'Glass with the liquid and the object', ca: 'Got amb el líquid i l’objecte' })} />
      </div>
      <div className="grid grid-cols-2 gap-2">
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
