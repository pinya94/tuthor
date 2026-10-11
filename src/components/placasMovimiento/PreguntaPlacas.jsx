// Una ronda de Placas en Movimiento: el borde dibujado (en las de lugar,
// pista y Hawái, solo al corregir), el enunciado y las opciones. La usan el
// juego (contra reloj) y el examen (MechanicExam).
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, dibujoAntes } from '../../lib/placasMovimiento'
import PlacasSVG from './PlacasSVG'

export default function PreguntaPlacas({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const nombres = {
    oc: tr({ es: 'Oceánica', en: 'Oceanic', ca: 'Oceànica' }),
    cont: tr({ es: 'Continental', en: 'Continental', ca: 'Continental' }),
    manto: tr({ es: 'Manto', en: 'Mantle', ca: 'Mantell' }),
    dorsal: tr({ es: 'Dorsal', en: 'Ridge', ca: 'Dorsal' }),
    rift: tr({ es: 'Valle de rift', en: 'Rift valley', ca: 'Vall de rift' }),
    fosa: tr({ es: 'Fosa', en: 'Trench', ca: 'Fossa' }),
    volcanes: tr({ es: 'Volcanes', en: 'Volcanoes', ca: 'Volcans' }),
    arco: tr({ es: 'Arco de islas', en: 'Island arc', ca: 'Arc d’illes' }),
    subduccion: tr({ es: 'Subducción', en: 'Subduction', ca: 'Subducció' }),
    cordillera: tr({ es: 'Cordillera plegada', en: 'Folded mountains', ca: 'Serralada plegada' }),
    vistaArriba: tr({ es: 'Vista desde arriba', en: 'Seen from above', ca: 'Vista des de dalt' }),
    falla: tr({ es: 'Falla', en: 'Fault', ca: 'Falla' }),
    aria: tr({ es: 'Borde de placa dibujado', en: 'Drawing of a plate boundary', ca: 'Vora de placa dibuixada' }),
  }
  const verDibujo = r.escenario && (revelado || dibujoAntes(r))
  const largas = !['tipo', 'corteza'].includes(r.tipo)

  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }

  return (
    <div className="w-full">
      {verDibujo && (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
          <PlacasSVG escenario={r.escenario} revelado={revelado} nombres={nombres} />
        </div>
      )}
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${largas ? 'grid-cols-1' : r.opciones.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-2.5 px-3 rounded-xl border text-white text-sm font-bold leading-snug transition-all ${clase(o)}`}>
            {textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
