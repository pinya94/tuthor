// Una ronda de El Laboratorio: la mezcla en su vaso, la pregunta y las
// opciones (métodos, propiedades, tipo de mezcla o secuencias de pasos). La
// usan el juego (contra reloj) y el examen (MechanicExam).
import { useLang } from '../../context/LangContext'
import { METODOS, enunciado, textoOpcion, explicacion, nombreMezcla } from '../../lib/laboratorio'
import VasoMezcla from './VasoMezcla'

export default function PreguntaLab({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === ronda.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  const columnas = ronda.tipo === 'secuencia' || ronda.tipo === 'propiedad' ? 'grid-cols-1' : 'grid-cols-2'
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-3 mb-3">
        <p className="text-white font-black text-center leading-tight">{nombreMezcla(ronda, l)}</p>
        <VasoMezcla ronda={ronda} aria={tr({ es: 'Vaso con la mezcla', en: 'Beaker with the mixture', ca: 'Got amb la mescla' })} />
      </div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(ronda, l)}</p>
      <div className={`grid gap-2 ${columnas}`}>
        {ronda.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-3 rounded-xl border text-white text-sm font-bold transition-all ${clase(o)}`}>
            {ronda.tipo === 'metodo' && <span className="mr-1.5">{METODOS[o].emoji}</span>}
            {textoOpcion(o, ronda, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
