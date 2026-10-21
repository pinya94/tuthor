// Una ronda de Placas en Movimiento (ver lib/placasMovimiento) y cómo se
// responde, sin opciones: tres bordes a sus cajas, montar el borde (tipo de
// cada placa y movimiento) a partir de lo que se forma, un lugar o unas
// pistas, o tocar la placa que se hunde. Al corregir se dibuja el relieve de
// verdad. La usan el juego (contra reloj) y el examen (MechanicExam).
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { enunciado, explicacion, esCorrecta, cajaDe, ESCENARIOS, MOV, CORTEZA, MOVS } from '../../lib/placasMovimiento'
import PlacasSVG from './PlacasSVG'

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const tx = (o, l) => o[l] ?? o.es

function Clasifica({ r, revelado, onResponder, l, tr, nombres }) {
  const [puestas, setPuestas] = useState({})
  const activa = r.items.findIndex(id => !puestas[id])
  const nombreCaja = c => tx(r.tipo === 'corteza' ? CORTEZA[c] : MOV[c], l)
  const pon = c => {
    if (revelado || activa < 0) return
    const n = { ...puestas, [r.items[activa]]: c }
    setPuestas(n)
    if (r.items.every(id => n[id])) onResponder(`clasifica:${r.items.filter(id => n[id] !== cajaDe(r, id)).length}`)
  }
  return (
    <>
      {activa >= 0 && !revelado && (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
          <p className="text-white/40 text-xs text-center">{activa + 1} / {r.items.length}</p>
          <PlacasSVG escenario={r.items[activa]} revelado={false} nombres={nombres} />
        </div>
      )}
      <div className={`grid gap-2 ${r.cajas.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {r.cajas.map(c => (
          <button key={c} disabled={revelado || activa < 0} onClick={() => pon(c)} className="rounded-xl border-2 border-dashed border-white/20 bg-white/[0.04] hover:bg-white/[0.08] p-1.5 min-h-[5.5rem] text-center">
            <span className="block text-white font-black text-[12px] leading-tight mb-1">{nombreCaja(c)}</span>
            {r.items.filter(id => puestas[id] === c).map(id => (
              <span key={id} className={`block rounded-md mb-1 ${revelado ? (cajaDe(r, id) === c ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400') : ''}`}>
                <PlacasSVG escenario={id} revelado={revelado} nombres={nombres} />
              </span>
            ))}
          </button>
        ))}
      </div>
      {!revelado && activa < 0 && <p className="text-white/40 text-xs text-center mt-2">{tr({ es: 'Comprobando…', en: 'Checking…', ca: 'Comprovant…' })}</p>}
    </>
  )
}

function Construye({ r, revelado, elegida, onResponder, l, tr, nombres }) {
  const [placas, setPlacas] = useState(['oc', 'oc'])
  const [mov, setMov] = useState(null)
  const montado = revelado ? String(elegida).split(',') : [...placas, mov]
  const ok = revelado && esCorrecta(r, elegida)
  const cambiaPlaca = i => setPlacas(ps => ps.map((p, j) => (j === i ? (p === 'oc' ? 'cont' : 'oc') : p)))
  const cambiaMov = () => setMov(m => MOVS[(MOVS.indexOf(m) + 1) % MOVS.length])
  const NOMBRE_MOV = {
    div: tr({ es: '← → Se separan', en: '← → Move apart', ca: '← → Se separen' }),
    conv: tr({ es: '→ ← Chocan', en: '→ ← Collide', ca: '→ ← Xoquen' }),
    transf: tr({ es: '⊙ ⊗ De lado', en: '⊙ ⊗ Slide past', ca: '⊙ ⊗ De costat' }),
  }
  return (
    <>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-2">
        {revelado
          ? <PlacasSVG escenario={r.escenario} revelado nombres={nombres} />
          : <PlacasSVG config={{ placas, mov }} nombres={nombres} onPlaca={cambiaPlaca} onMov={cambiaMov} />}
      </div>
      {revelado ? (
        <p className={`text-center text-sm font-bold ${ok ? 'text-green-300' : 'text-red-300'}`}>
          {tr({ es: 'Montaste', en: 'You built', ca: 'Vas muntar' })}: {nombres[montado[0]]} + {nombres[montado[1]]}, {montado[2] ? tx(MOV[montado[2]], l).toLowerCase() : '?'} {ok ? '✓' : `· ${tr({ es: 'era', en: 'it was', ca: 'era' })} ${tx(MOV[ESCENARIOS[r.escenario].mov], l).toLowerCase()}`}
        </p>
      ) : (
        <>
          <p className="text-white/45 text-xs text-center mb-2">{tr({ es: 'Toca una placa para cambiar su tipo', en: 'Tap a plate to change its type', ca: 'Toca una placa per canviar-ne el tipus' })}</p>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {MOVS.map(m => (
              <button key={m} onClick={() => setMov(m)} className={`py-2.5 px-1 rounded-xl border-2 text-white text-[12px] font-bold leading-tight ${mov === m ? 'border-amber-300 bg-amber-400/15' : 'border-white/15 bg-white/[0.05]'}`}>{NOMBRE_MOV[m]}</button>
            ))}
          </div>
          <button className={boton} disabled={!mov} onClick={() => onResponder(`${placas[0]},${placas[1]},${mov}`)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </>
      )}
    </>
  )
}

function Subduce({ r, revelado, elegida, onResponder, tr, nombres }) {
  const ok = revelado && esCorrecta(r, elegida)
  const placas = ESCENARIOS[r.escenario].placas
  return (
    <>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
        <PlacasSVG escenario={r.escenario} revelado={revelado} nombres={nombres} onPlaca={revelado ? null : i => onResponder(placas[i])} />
      </div>
      {revelado
        ? <p className={`text-center text-sm font-bold ${ok ? 'text-green-300' : 'text-red-300'}`}>{elegida === 'ninguna' ? tr({ es: 'Ninguna', en: 'Neither', ca: 'Cap' }) : nombres[elegida]} {ok ? '✓' : ''}</p>
        : <button onClick={() => onResponder('ninguna')} className="w-full py-3 rounded-2xl border border-white/15 bg-white/[0.06] text-white font-bold">{tr({ es: 'Ninguna: se pliegan hacia arriba', en: 'Neither: they crumple upwards', ca: 'Cap: es pleguen cap amunt' })}</button>}
    </>
  )
}

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
    deLado: tr({ es: 'se deslizan de lado', en: 'sliding past', ca: 'llisquen de costat' }),
    aria: tr({ es: 'Borde de placa dibujado', en: 'Drawing of a plate boundary', ca: 'Vora de placa dibuixada' }),
  }
  const props = { r, revelado, elegida, onResponder, l, tr, nombres }
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      {r.mecanica === 'clasifica' ? <Clasifica {...props} /> : r.mecanica === 'subduce' ? <Subduce {...props} /> : <Construye {...props} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}

