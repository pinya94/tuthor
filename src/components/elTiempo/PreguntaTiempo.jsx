// Una ronda de El Tiempo: la situación, la previsión en su formato y las
// opciones. La usan el juego (contra reloj) y el examen (MechanicExam).
import { useLang } from '../../context/LangContext'
import { NIVELES, NOMBRE_INTENSIDAD, claveTraje, textoTraje, explicacion, INTENSIDADES, textoOpcion } from '../../lib/elTiempo'
import { PREGUNTAS_MAPA, nombreCiudad } from '../../lib/elTiempoMapas'
import { TarjetaPrevision, GraficaHoras, Radar, DibujoTraje, COLOR_LLUVIA, IconoCielo, MapaTiempo, MapaIsobaras } from './Vistas'

const pad = h => `${h}:00`

export default function PreguntaTiempo({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const cfg = NIVELES[ronda.nivel]
  const t = {
    leyenda: tr({ es: 'Previsión para cuando estés fuera', en: 'Forecast for while you are out', ca: 'Previsió per a quan siguis fora' }),
    vientoTodoDia: tr({ es: 'Viento todo el día:', en: 'Wind all day:', ca: 'Vent tot el dia:' }),
    temperatura: tr({ es: 'Temperatura', en: 'Temperature', ca: 'Temperatura' }),
    probLluvia: tr({ es: '% de lluvia', en: '% chance of rain', ca: '% de pluja' }),
    tuSalida: tr({ es: 'Tu salida', en: 'Your outing', ca: 'La teva sortida' }),
    haciaDir: tr({ es: 'Se mueve hacia', en: 'Moving towards', ca: 'Es mou cap a' }),
    intensidad: { 1: tr({ es: 'Débil', en: 'Light', ca: 'Feble' }), 2: tr({ es: 'Moderada', en: 'Moderate', ca: 'Moderada' }), 3: tr({ es: 'Fuerte', en: 'Heavy', ca: 'Forta' }) },
    aria: tr({ es: 'Previsión del tiempo', en: 'Weather forecast', ca: 'Previsió del temps' }),
    ariaMapa: tr({ es: 'Mapa del tiempo de España', en: 'Weather map of Spain', ca: 'Mapa del temps d’Espanya' }),
    ariaIsobaras: tr({ es: 'Mapa de isobaras', en: 'Isobar map', ca: 'Mapa d’isòbares' }),
    leyendaIsobaras: tr({ es: 'Las líneas unen puntos con la misma presión (hPa)', en: 'Lines join points with the same pressure (hPa)', ca: 'Les línies uneixen punts amb la mateixa pressió (hPa)' }),
  }

  let pregunta
  if (ronda.tipo === 'mapa') {
    pregunta = tr(PREGUNTAS_MAPA[ronda.datos.pregunta])
  } else if (ronda.tipo === 'isobaras') {
    const d = ronda.datos
    pregunta = d.pregunta === 'tiempo'
      ? tr({ es: `¿Qué tiempo es más probable en ${nombreCiudad(d.ciudad)}?`, en: `What weather is most likely in ${nombreCiudad(d.ciudad)}?`, ca: `Quin temps és més probable a ${nombreCiudad(d.ciudad)}?` })
      : d.pregunta === 'viento'
      ? tr({ es: '¿Dónde soplará más viento?', en: 'Where will it be windier?', ca: 'On bufarà més vent?' })
      : tr({ es: `¿Qué indica la ${d.letra} marcada en amarillo?`, en: `What does the ${d.letra} marked in yellow show?`, ca: `Què indica la ${d.letra} marcada en groc?` })
  } else if (ronda.tipo === 'radar') {
    const { ciudad, horas } = ronda.datos
    pregunta = tr({
      es: `¿Lloverá en ${ciudad.nombre} dentro de ${horas} hora${horas > 1 ? 's' : ''}?`,
      en: `Will it rain in ${ciudad.nombre} in ${horas} hour${horas > 1 ? 's' : ''}?`,
      ca: `Plourà a ${ciudad.nombre} d’aquí a ${horas} hora${horas > 1 ? 'es' : ''}?`,
    })
  } else if (ronda.tipo === 'horas') {
    pregunta = `${tr(ronda.situacion)} ${tr({ es: 'de', en: 'from', ca: 'de' })} ${pad(ronda.datos.inicio)} ${tr({ es: 'a', en: 'to', ca: 'a' })} ${pad(ronda.datos.fin)}. ${tr({ es: '¿Qué te llevas?', en: 'What do you take?', ca: 'Què t’emportes?' })}`
  } else {
    pregunta = `${tr(ronda.situacion)}. ${tr({ es: '¿Qué te llevas?', en: 'What do you take?', ca: 'Què t’emportes?' })}`
  }

  const claseOpcion = (esBuena, esElegida) => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (esBuena) return 'bg-green-500/25 border-green-400'
    if (esElegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }

  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{pregunta}</p>
      <div className="mb-3">
        {ronda.tipo === 'simple' && <TarjetaPrevision datos={ronda.datos} cfg={cfg} t={t} />}
        {ronda.tipo === 'horas' && <GraficaHoras datos={ronda.datos} cfg={cfg} t={t} />}
        {ronda.tipo === 'radar' && <Radar datos={ronda.datos} revelado={revelado} t={t} l={l} />}
        {ronda.tipo === 'mapa' && <MapaTiempo datos={ronda.datos} opciones={ronda.opciones} bueno={ronda.bueno} revelado={revelado} t={t} />}
        {ronda.tipo === 'isobaras' && <MapaIsobaras datos={ronda.datos} t={t} />}
      </div>

      {(ronda.tipo === 'mapa' || ronda.tipo === 'isobaras') ? (
        <div className={`grid gap-2 ${ronda.opciones.length === 3 ? 'grid-cols-1' : 'grid-cols-2'}`}>
          {ronda.opciones.map(o => (
            <button key={o} disabled={revelado} onClick={() => onResponder(o)}
              className={`py-3 px-2 rounded-xl border text-white text-sm font-bold transition-all ${claseOpcion(o === ronda.bueno, o === elegida)}`}>
              {textoOpcion(ronda, o, l)}
            </button>
          ))}
        </div>
      ) : ronda.tipo === 'radar' ? (
        <div className="grid grid-cols-2 gap-2">
          {INTENSIDADES.map((k, i) => (
            <button key={k} disabled={revelado} onClick={() => onResponder(k)}
              className={`py-3 px-2 rounded-xl border text-white text-sm font-bold flex items-center justify-center gap-2 transition-all ${claseOpcion(k === ronda.bueno, k === elegida)}`}>
              {i > 0 ? <span className="w-3.5 h-3.5 rounded-sm shrink-0" style={{ background: COLOR_LLUVIA[i] }} /> : <IconoCielo cielo="sol" className="w-5 h-5 shrink-0" />}
              {tr(NOMBRE_INTENSIDAD[k])}
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {ronda.opciones.map(o => {
            const k = claveTraje(o)
            return (
              <button key={k} disabled={revelado} onClick={() => onResponder(o)}
                className={`py-2 px-2 rounded-xl border text-white transition-all flex flex-col items-center gap-1 ${claseOpcion(k === claveTraje(ronda.bueno), elegida && k === claveTraje(elegida))}`}>
                <DibujoTraje traje={o} />
                <span className="text-[12px] font-bold leading-tight text-center">{textoTraje(o, l)}</span>
              </button>
            )
          })}
        </div>
      )}

      {revelado && (
        <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>
      )}
    </div>
  )
}
