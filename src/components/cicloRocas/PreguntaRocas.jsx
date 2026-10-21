// Una ronda del Ciclo de las rocas (ver lib/cicloRocas) y cómo se responde,
// sin opciones: poner su proceso a las flechas del ciclo, llevar rocas a la
// caja de su tipo, emparejar metamórficas con su origen o trazar la ruta
// tocando las flechas. La usan el juego (contra reloj) y el examen.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { ROCAS, RUTAS, FLECHAS, NODOS, PROCESOS, NOMBRE_SUBTIPO, enunciado, explicacion, nombreRoca, nombreProceso, esCorrecta, cajaDe } from '../../lib/cicloRocas'
import CicloSVG from './CicloSVG'
import MuestraRoca from './MuestraRoca'

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const tx = (o, l) => o[l] ?? o.es
const NOMBRE_TIPO = { ignea: { es: 'Ígnea', en: 'Igneous', ca: 'Ígnia' }, sedimentaria: { es: 'Sedimentaria', en: 'Sedimentary', ca: 'Sedimentària' }, metamorfica: { es: 'Metamórfica', en: 'Metamorphic', ca: 'Metamòrfica' } }
const VERDE = '#4ADE80', ROJO = '#F87171'

// Las flechas del ciclo que recorre una ruta (la buena), en orden.
function flechasDeRuta(ruta) {
  let nodo = ROCAS[ruta.desde].tipo
  return ruta.buena.map(p => {
    const i = FLECHAS.findIndex(([a, , q]) => a === nodo && q === p)
    nodo = FLECHAS[i][1]
    return i
  })
}

function Etiqueta({ r, revelado, onResponder, tr, l, nombres }) {
  const [puestos, setPuestos] = useState({}) // índice de flecha marcada → proceso
  const [activa, setActiva] = useState(0)
  const pon = p => {
    if (revelado) return
    const n = { ...puestos, [activa]: p }
    setPuestos(n)
    const sig = r.flechas.findIndex((_, k) => !n[k])
    if (sig >= 0) setActiva(sig)
  }
  const bien = k => puestos[k] === FLECHAS[r.flechas[k]][2]
  const etiquetas = r.flechas.map((i, k) => (revelado ? nombreProceso(FLECHAS[i][2], l) : puestos[k] ? nombreProceso(puestos[k], l) : null))
  return (
    <>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
        <CicloSVG marcadas={r.flechas} revelado={revelado} etiquetas={etiquetas} verEtiquetas nombres={nombres} activa={revelado ? -1 : activa}
          colores={revelado ? r.flechas.map((_, k) => (bien(k) ? VERDE : ROJO)) : null}
          onFlecha={revelado ? null : i => { const k = r.flechas.indexOf(i); if (k >= 0) setActiva(k) }} />
      </div>
      {!revelado && (
        <>
          <p className="text-white/45 text-xs text-center mb-2">{tr({ es: `Flecha ${activa + 1}: elige su proceso`, en: `Arrow ${activa + 1}: pick its process`, ca: `Fletxa ${activa + 1}: tria el seu procés` })}</p>
          <div className="grid grid-cols-1 gap-1.5 mb-3">
            {Object.keys(PROCESOS).map(p => (
              <button key={p} onClick={() => pon(p)} className="py-2 px-3 rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] text-white text-sm font-bold text-left">{nombreProceso(p, l)}</button>
            ))}
          </div>
          <button className={boton} disabled={r.flechas.some((_, k) => !puestos[k])} onClick={() => onResponder(`etiqueta:${r.flechas.filter((_, k) => !bien(k)).length}`)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </>
      )}
    </>
  )
}

function Clasifica({ r, revelado, onResponder, l }) {
  const [puestas, setPuestas] = useState({})
  const activa = r.items.findIndex(id => !puestas[id])
  const nombreCaja = c => (r.tipo === 'subtipo' ? tx(NOMBRE_SUBTIPO[c], l).split(':')[0] : tx(NOMBRE_TIPO[c], l))
  const pon = c => {
    if (revelado || activa < 0) return
    const n = { ...puestas, [r.items[activa]]: c }
    setPuestas(n)
    if (r.items.every(id => n[id])) onResponder(`clasifica:${r.items.filter(id => n[id] !== cajaDe(r, id)).length}`)
  }
  const roca = activa >= 0 ? r.items[activa] : null
  return (
    <>
      {roca && !revelado && (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-3 mb-3 flex items-center gap-3">
          <div className="w-28 shrink-0"><MuestraRoca roca={roca} aria={nombreRoca(roca, l)} /></div>
          <div className="min-w-0">
            <p className="text-white/40 text-xs">{activa + 1} / {r.items.length}</p>
            <p className="text-white font-black text-lg leading-tight">{nombreRoca(roca, l)}</p>
            <p className="text-white/70 text-[13px] leading-snug mt-0.5">{tx(ROCAS[roca].desc, l)}</p>
          </div>
        </div>
      )}
      <div className={`grid gap-2 ${r.cajas.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
        {r.cajas.map(c => (
          <button key={c} disabled={revelado || activa < 0} onClick={() => pon(c)} className="rounded-xl border-2 border-dashed border-white/20 bg-white/[0.04] hover:bg-white/[0.08] p-1.5 min-h-[6rem] text-center">
            <span className="block text-white font-black text-[12.5px] leading-tight mb-1">{nombreCaja(c)}</span>
            {r.items.filter(id => puestas[id] === c).map(id => (
              <span key={id} className={`block rounded-lg p-1 mb-1 ${revelado ? (cajaDe(r, id) === c ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400') : 'bg-white/5'}`}>
                <span className="block w-14 mx-auto"><MuestraRoca roca={id} aria={nombreRoca(id, l)} /></span>
                <span className="block text-white text-[11px] font-bold leading-tight">{nombreRoca(id, l)}</span>
              </span>
            ))}
          </button>
        ))}
      </div>
    </>
  )
}

function Empareja({ r, revelado, onResponder, tr, l }) {
  const [union, setUnion] = useState({}) // metamórfica → origen
  const [activo, setActivo] = useState(r.items[0])
  const une = o => {
    if (revelado || !activo) return
    const n = Object.fromEntries(Object.entries(union).filter(([, v]) => v !== o))
    n[activo] = o
    setUnion(n)
    setActivo(r.items.find(id => !n[id]) ?? null)
  }
  const listo = r.items.every(id => union[id])
  return (
    <>
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex flex-col gap-2">
          {r.items.map(id => {
            const bien = revelado && union[id] === ROCAS[id].origen
            return (
              <button key={id} disabled={revelado} onClick={() => setActivo(id)} className={`rounded-xl border-2 p-1.5 flex items-center gap-2 text-left ${revelado ? (bien ? 'border-green-400' : 'border-red-400') : activo === id ? 'border-amber-300 bg-amber-400/10' : 'border-white/15 bg-white/[0.05]'}`}>
                <span className="w-10 shrink-0"><MuestraRoca roca={id} aria={nombreRoca(id, l)} /></span>
                <span className="min-w-0">
                  <span className="block text-white text-[13px] font-black leading-tight">{nombreRoca(id, l)}</span>
                  <span className="block text-[11px] text-white/60 leading-tight">← {union[id] ? nombreRoca(union[id], l).toLowerCase() : '?'}</span>
                  {revelado && !bien && <span className="block text-[11px] text-green-300 leading-tight">← {nombreRoca(ROCAS[id].origen, l).toLowerCase()}</span>}
                </span>
              </button>
            )
          })}
        </div>
        <div className="flex flex-col gap-2">
          {r.origenes.map(o => {
            const usado = Object.values(union).includes(o)
            return (
              <button key={o} disabled={revelado} onClick={() => une(o)} className={`rounded-xl border px-2 py-3 text-white text-sm font-bold flex-1 ${usado ? 'border-white/10 bg-white/[0.03] text-white/50' : 'border-white/20 bg-white/[0.07] hover:bg-white/[0.12]'}`}>
                {nombreRoca(o, l)}
              </button>
            )
          })}
        </div>
      </div>
      {!revelado && <button className={boton} disabled={!listo} onClick={() => onResponder(`empareja:${r.items.filter(id => union[id] !== ROCAS[id].origen).length}`)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>}
    </>
  )
}

function Traza({ r, revelado, elegida, onResponder, tr, l, nombres }) {
  const ruta = RUTAS[r.ruta]
  const inicio = ROCAS[ruta.desde].tipo, fin = ROCAS[ruta.hasta].tipo
  const [camino, setCamino] = useState([]) // índices de flechas
  const nodo = camino.length ? FLECHAS[camino[camino.length - 1]][1] : inicio
  const llegado = camino.length > 0 && nodo === fin
  const posibles = revelado || llegado ? [] : FLECHAS.map((f, i) => i).filter(i => FLECHAS[i][0] === nodo)
  const toca = i => {
    if (revelado || llegado) return
    if (FLECHAS[i][0] !== nodo) return
    const n = [...camino, i]
    setCamino(n)
    if (FLECHAS[i][1] === fin || n.length >= 4) onResponder(n.map(k => FLECHAS[k][2]).join('>'))
  }
  const ok = revelado && esCorrecta(r, elegida)
  const marcadas = revelado ? (ok ? camino : flechasDeRuta(ruta)) : camino
  const etiquetas = marcadas.map(i => nombreProceso(FLECHAS[i][2], l))
  return (
    <>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-2">
        <CicloSVG marcadas={marcadas} revelado={revelado} etiquetas={etiquetas} verEtiquetas={!revelado} nombres={nombres} posibles={posibles} onFlecha={revelado ? null : toca} />
      </div>
      {!revelado ? (
        <div className="flex items-center justify-between gap-2">
          <p className="text-white/55 text-xs">{tr({ es: 'Estás en', en: 'You are at', ca: 'Ets a' })}: <b className="text-white">{nombres[nodo]}</b> · {tr({ es: 'meta', en: 'goal', ca: 'meta' })}: <b className="text-white">{nombres[fin]}</b></p>
          <button disabled={!camino.length} onClick={() => setCamino(c => c.slice(0, -1))} className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs font-bold disabled:opacity-30">↶ {tr({ es: 'Deshacer', en: 'Undo', ca: 'Desfer' })}</button>
        </div>
      ) : (
        <p className={`text-center text-sm font-bold ${ok ? 'text-green-300' : 'text-red-300'}`}>
          {ok ? tr({ es: '¡Camino correcto!', en: 'Correct path!', ca: 'Camí correcte!' }) : `${tr({ es: 'Tu camino', en: 'Your path', ca: 'El teu camí' })}: ${String(elegida).split('>').map(p => nombreProceso(p, l).toLowerCase()).join(' → ')}`}
        </p>
      )}
    </>
  )
}

export default function PreguntaRocas({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const nombres = Object.fromEntries(Object.keys(NODOS).map(id => [id, { es: { magma: 'Magma', ignea: 'Ígneas', sedimentos: 'Sedimentos', sedimentaria: 'Sedimentarias', metamorfica: 'Metamórficas' }, en: { magma: 'Magma', ignea: 'Igneous', sedimentos: 'Sediments', sedimentaria: 'Sedimentary', metamorfica: 'Metamorphic' }, ca: { magma: 'Magma', ignea: 'Ígnies', sedimentos: 'Sediments', sedimentaria: 'Sedimentàries', metamorfica: 'Metamòrfiques' } }[l][id]]))
  nombres.aria = tr({ es: 'Diagrama del ciclo de las rocas', en: 'Rock cycle diagram', ca: 'Diagrama del cicle de les roques' })
  const props = { r: ronda, revelado, elegida, onResponder, tr, l, nombres }
  const cuerpo = ronda.mecanica === 'etiqueta' ? <Etiqueta {...props} />
    : ronda.mecanica === 'clasifica' ? <Clasifica {...props} />
    : ronda.mecanica === 'empareja' ? <Empareja {...props} />
    : <Traza {...props} />
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(ronda, l)}</p>
      {cuerpo}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
