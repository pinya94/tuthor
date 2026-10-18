// Una ronda de El Tiempo (ver lib/elTiempo): la situación, la previsión en su
// formato y cómo se responde, sin opciones. Con la tarjeta o la gráfica por
// horas se viste al chaval; en el radar se mueve la lluvia; en los mapas se
// tocan ciudades, letras o se pone el tiempo. La usan el juego (contra reloj)
// y el examen (MechanicExam).
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { NIVELES, NOMBRE_PRENDA, PRENDAS, KM_CASILLA, explicacion, esCorrecta } from '../../lib/elTiempo'
import { PREGUNTAS_MAPA } from '../../lib/elTiempoMapas'
import { TarjetaPrevision, GraficaHoras, Radar, DibujoTraje, IconoPrenda, IconoParaguas, IconoSol, MapaTiempo, MapaIsobaras } from './Vistas'

const pad = h => `${h}:00`
const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const ficha = on => `rounded-xl border px-2 py-2 flex flex-col items-center gap-1 text-white transition-all active:scale-95 ${on ? 'bg-amber-400/20 border-amber-300 ring-2 ring-amber-300' : 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12]'}`

// Vestir al chaval: una prenda y, si hacen falta, paraguas y gafas con crema.
function Viste({ ronda, revelado, elegida, onResponder, tr, l, uv }) {
  const [prenda, setPrenda] = useState(null)
  const [paraguas, setParaguas] = useState(false)
  const [sol, setSol] = useState(false)
  const traje = { prenda, paraguas, sol }
  const ok = revelado && esCorrecta(ronda, elegida)
  if (revelado) {
    return (
      <div className="grid grid-cols-2 gap-2">
        <div className={`rounded-xl border p-2 text-center ${ok ? 'border-green-400 bg-green-500/15' : 'border-red-400 bg-red-500/15'}`}>
          <p className="text-white/60 text-[11px] font-bold mb-1">{tr({ es: 'Lo que llevas', en: 'What you took', ca: 'El que portes' })}</p>
          {elegida && <DibujoTraje traje={elegida} />}
        </div>
        <div className="rounded-xl border border-green-400/60 bg-green-500/10 p-2 text-center">
          <p className="text-white/60 text-[11px] font-bold mb-1">{tr({ es: 'Lo que hacía falta', en: 'What you needed', ca: 'El que calia' })}</p>
          <DibujoTraje traje={ronda.bueno} />
        </div>
      </div>
    )
  }
  return (
    <>
      <p className="text-white/50 text-xs text-center mb-1.5">{tr({ es: 'Elige la prenda y lo que te llevas', en: 'Choose what to wear and what to take', ca: 'Tria la peça i el que t’emportes' })}</p>
      <div className="grid grid-cols-3 gap-2 mb-2">
        {PRENDAS.map(p => (
          <button key={p} onClick={() => setPrenda(p)} className={ficha(prenda === p)}>
            <IconoPrenda prenda={p} />
            <span className="text-[12px] font-bold">{NOMBRE_PRENDA[p][l] ?? NOMBRE_PRENDA[p].es}</span>
          </button>
        ))}
      </div>
      <div className={`grid gap-2 mb-3 ${uv ? 'grid-cols-2' : 'grid-cols-1'}`}>
        <button onClick={() => setParaguas(x => !x)} className={ficha(paraguas)}>
          <IconoParaguas className="w-8 h-8" />
          <span className="text-[12px] font-bold">{tr({ es: 'Paraguas', en: 'Umbrella', ca: 'Paraigua' })}</span>
        </button>
        {uv && (
          <button onClick={() => setSol(x => !x)} className={ficha(sol)}>
            <IconoSol className="w-8 h-8" />
            <span className="text-[12px] font-bold">{tr({ es: 'Gafas de sol y crema', en: 'Sunglasses and sun cream', ca: 'Ulleres de sol i crema' })}</span>
          </button>
        )}
      </div>
      <button className={boton} disabled={!prenda} onClick={() => onResponder(traje)}>{tr({ es: '¡A la calle!', en: 'Off you go!', ca: 'Cap al carrer!' })}</button>
    </>
  )
}

// Radar: flechas para llevar la mancha a donde estará dentro de N horas.
function MueveLluvia({ ronda, revelado, elegida, onResponder, tr, l, t }) {
  const [m, setM] = useState([0, 0])
  const mueve = (dx, dy) => setM(([x, y]) => [Math.max(-8, Math.min(8, x + dx)), Math.max(-6, Math.min(6, y + dy))])
  const elegido = revelado && typeof elegida === 'string' ? elegida.replace('mueve:', '').split(',').map(Number) : m
  const ok = revelado && esCorrecta(ronda, elegida)
  const dist = (Math.abs(m[0]) + Math.abs(m[1])) * KM_CASILLA
  const flecha = (dx, dy, txt, cls) => (
    <button onClick={() => mueve(dx, dy)} className={`rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-white text-xl font-black py-2 ${cls}`} aria-label={txt}>{txt}</button>
  )
  return (
    <>
      <div className="mb-3">
        <Radar datos={ronda.datos} revelado={revelado} t={t} l={l} movido={elegido} acierto={ok} />
      </div>
      {!revelado && (
        <>
          <div className="grid grid-cols-3 gap-1.5 w-48 mx-auto mb-2">
            {flecha(0, -1, '↑', 'col-start-2')}
            {flecha(-1, 0, '←', 'col-start-1')}
            <span className="flex items-center justify-center text-white/60 text-[11px] font-bold text-center leading-tight">{dist} km</span>
            {flecha(1, 0, '→', '')}
            {flecha(0, 1, '↓', 'col-start-2')}
          </div>
          <button className={boton} disabled={!m[0] && !m[1]} onClick={() => onResponder(`mueve:${m[0]},${m[1]}`)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </>
      )}
    </>
  )
}

// Isobaras «tiempo»: tocar cada ciudad cambia su símbolo (lluvia ↔ sol).
function PonTiempo({ ronda, revelado, onResponder, tr, t }) {
  const [simbolos, setSimbolos] = useState({})
  const { marcadas, lluviaEn } = ronda.datos
  const esperado = id => (id === lluviaEn ? 'lluvia' : 'sol')
  const toca = id => !revelado && setSimbolos(s => ({ ...s, [id]: s[id] === 'lluvia' ? 'sol' : 'lluvia' }))
  const listo = marcadas.every(id => simbolos[id])
  return (
    <>
      <div className="mb-3">
        <MapaIsobaras datos={ronda.datos} t={t} onCiudad={revelado ? null : toca} simbolos={simbolos}
          verdes={revelado ? marcadas.filter(id => simbolos[id] === esperado(id)) : []}
          rojas={revelado ? marcadas.filter(id => simbolos[id] !== esperado(id)) : []} />
      </div>
      {!revelado && <button className={boton} disabled={!listo} onClick={() => onResponder(`tiempo:${marcadas.filter(id => simbolos[id] !== esperado(id)).length}`)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>}
    </>
  )
}

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
    pregunta = `${tr(PREGUNTAS_MAPA[ronda.datos.pregunta])} ${tr({ es: 'Toca la ciudad.', en: 'Tap the city.', ca: 'Toca la ciutat.' })}`
  } else if (ronda.tipo === 'isobaras') {
    const d = ronda.datos
    pregunta = d.pregunta === 'tiempo'
      ? tr({ es: 'Pon el tiempo más probable en cada ciudad: tócala para poner lluvia o sol', en: 'Put the most likely weather on each city: tap it for rain or sun', ca: 'Posa el temps més probable a cada ciutat: toca-la per posar pluja o sol' })
      : d.pregunta === 'viento'
      ? tr({ es: '¿Dónde soplará más viento? Toca la ciudad', en: 'Where will it be windier? Tap the city', ca: 'On bufarà més vent? Toca la ciutat' })
      : d.letra === 'B'
      ? tr({ es: 'Toca la borrasca (bajas presiones)', en: 'Tap the depression (low pressure)', ca: 'Toca la borrasca (baixes pressions)' })
      : tr({ es: 'Toca el anticiclón (altas presiones)', en: 'Tap the anticyclone (high pressure)', ca: 'Toca l’anticicló (altes pressions)' })
  } else if (ronda.tipo === 'radar') {
    const { ciudad, horas } = ronda.datos
    pregunta = tr({
      es: `¿Dónde estará la lluvia dentro de ${horas} hora${horas > 1 ? 's' : ''}? Muévela y mira si llega a ${ciudad.nombre}`,
      en: `Where will the rain be in ${horas} hour${horas > 1 ? 's' : ''}? Move it and see if it reaches ${ciudad.nombre}`,
      ca: `On serà la pluja d’aquí a ${horas} hora${horas > 1 ? 'es' : ''}? Mou-la i mira si arriba a ${ciudad.nombre}`,
    })
  } else if (ronda.tipo === 'horas') {
    pregunta = `${tr(ronda.situacion)} ${tr({ es: 'de', en: 'from', ca: 'de' })} ${pad(ronda.datos.inicio)} ${tr({ es: 'a', en: 'to', ca: 'a' })} ${pad(ronda.datos.fin)}. ${tr({ es: '¿Qué te llevas?', en: 'What do you take?', ca: 'Què t’emportes?' })}`
  } else {
    pregunta = `${tr(ronda.situacion)}. ${tr({ es: '¿Qué te llevas?', en: 'What do you take?', ca: 'Què t’emportes?' })}`
  }

  const props = { ronda, revelado, elegida, onResponder, tr, l, t }
  const fallo = revelado && !esCorrecta(ronda, elegida) && elegida != null
  let cuerpo
  if (ronda.tipo === 'simple' || ronda.tipo === 'horas') {
    cuerpo = (
      <>
        <div className="mb-3">
          {ronda.tipo === 'simple' ? <TarjetaPrevision datos={ronda.datos} cfg={cfg} t={t} /> : <GraficaHoras datos={ronda.datos} cfg={cfg} t={t} />}
        </div>
        <Viste {...props} uv={cfg.uv && ronda.tipo === 'simple'} />
      </>
    )
  } else if (ronda.tipo === 'radar') {
    cuerpo = <MueveLluvia {...props} />
  } else if (ronda.tipo === 'mapa') {
    cuerpo = <MapaTiempo datos={ronda.datos} opciones={ronda.opciones} bueno={ronda.bueno} revelado={revelado} t={t} onCiudad={revelado ? null : onResponder} elegida={elegida} />
  } else if (ronda.datos.pregunta === 'tiempo') {
    cuerpo = <PonTiempo {...props} />
  } else if (ronda.datos.pregunta === 'viento') {
    cuerpo = <MapaIsobaras datos={ronda.datos} t={t} onCiudad={revelado ? null : onResponder} verdes={revelado ? [ronda.bueno] : []} rojas={fallo ? [elegida] : []} />
  } else {
    cuerpo = <MapaIsobaras datos={ronda.datos} t={t} onLetra={revelado ? null : onResponder} verdes={revelado ? [ronda.bueno] : []} rojas={fallo ? [elegida] : []} />
  }

  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{pregunta}</p>
      {cuerpo}
      {revelado && (
        <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>
      )}
    </div>
  )
}
