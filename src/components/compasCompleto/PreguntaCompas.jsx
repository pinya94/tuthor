// Una ronda de Compás Completo, sin opciones: emparejar figuras con su nombre,
// tocar en una regla de cuatro tiempos dónde acaba una figura, rellenar el
// hueco de un compás con figuras de la paleta (vale cualquier combinación que
// sume justo) o tocar dónde va la barra entre dos compases. La usan el juego
// (contra reloj) y el examen (MechanicExam).
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import Pentagrama, { Mini } from './Pentagrama'
import { deClave, nombreFigura, enunciado, explicacion, esCorrecta, paleta, MAX_HUECO } from '../../lib/compasCompleto'

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const comprobar = { es: 'Comprobar', en: 'Check', ca: 'Comprovar' }
const VERDE = '#86EFAC', ROJO = '#FCA5A5', AMBAR = '#FBBF24'
const caja = 'rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-4 mb-3 flex justify-center'

function Empareja({ r, revelado, onResponder, l }) {
  const [sel, setSel] = useState(null)
  const [pares, setPares] = useState({}) // figura → nombre elegido
  const usados = new Set(Object.values(pares))
  const elige = k => {
    if (revelado || sel == null || usados.has(k)) return
    const n = { ...pares, [sel]: k }
    setPares(n)
    setSel(null)
    if (r.items.every(it => n[it] != null)) onResponder(`empareja:${r.items.filter(it => n[it] !== it).length}`)
  }
  const tono = it => (revelado ? (pares[it] === it ? 'border-green-400 bg-green-500/15' : 'border-red-400 bg-red-500/15') : sel === it ? 'border-amber-300 bg-amber-300/15' : pares[it] ? 'border-white/30 bg-white/[0.08]' : 'border-white/15 bg-white/[0.04]')
  return (
    <>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {r.items.map((it, i) => (
          <button key={it} disabled={revelado} onClick={() => setSel(s => (s === it ? null : it))} className={`rounded-xl border-2 p-2 flex flex-col items-center ${tono(it)}`}>
            <span className="text-white/40 text-[10px] font-black self-start">{i + 1}</span>
            <Mini n={deClave(it)} className="w-14 h-20" />
            <span className="text-white text-[11px] font-bold leading-tight min-h-[2.2em] text-center">
              {pares[it] ? nombreFigura(deClave(pares[it]), l) : ''}
              {revelado && pares[it] !== it && <span className="block text-green-300">{nombreFigura(deClave(it), l)}</span>}
            </span>
          </button>
        ))}
      </div>
      {!revelado && (
        <div className="grid grid-cols-1 gap-1.5">
          {r.nombres.map(k => (
            <button key={k} disabled={usados.has(k) || sel == null} onClick={() => elige(k)}
              className="py-2.5 rounded-xl border border-white/15 bg-white/[0.06] text-white font-bold disabled:opacity-30">
              {nombreFigura(deClave(k), l)}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

// Regla de cuatro tiempos partida en semicorcheas: el toque marca dónde acaba.
function Mide({ r, revelado, elegida, onResponder, tr }) {
  const marcada = revelado ? Number(elegida) : null
  return (
    <>
      <div className={caja}><Mini n={deClave(r.figura)} className="w-16 h-24" /></div>
      <div className="grid grid-cols-4 gap-1.5 mb-1">
        {[0, 1, 2, 3].map(t => (
          <div key={t} className="grid grid-cols-4 gap-0.5">
            {[0, 1, 2, 3].map(q => {
              const k = t * 4 + q + 1
              const color = revelado
                ? k <= r.bueno ? 'bg-green-500/60' : k <= marcada ? 'bg-red-500/50' : 'bg-white/[0.06]'
                : 'bg-white/[0.10] hover:bg-amber-300/40'
              return <button key={q} disabled={revelado} aria-label={String(k)} onClick={() => onResponder(String(k))} className={`h-12 ${q === 0 ? 'rounded-l-md' : ''} ${q === 3 ? 'rounded-r-md' : ''} ${color}`} />
            })}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-1.5 text-center text-white/45 text-[11px] font-bold">
        {[1, 2, 3, 4].map(t => <span key={t}>{tr({ es: `tiempo ${t}`, en: `beat ${t}`, ca: `temps ${t}` })}</span>)}
      </div>
    </>
  )
}

function Construye({ r, nivel, revelado, elegida, onResponder, l, tr }) {
  const [puestas, setPuestas] = useState([])
  const lista = revelado ? String(elegida ?? '').split('+').filter(Boolean) : puestas
  const notas = r.notas.map(deClave)
  const dibujo = [...notas.slice(0, r.hueco), ...lista.map(deClave), ...notas.slice(r.hueco + 1)]
  const colores = {}
  const ok = revelado && esCorrecta(r, elegida)
  lista.forEach((_, i) => { colores[r.hueco + i] = revelado ? (ok ? VERDE : ROJO) : AMBAR })
  return (
    <>
      <div className={caja}>
        <Pentagrama notas={lista.length ? dibujo : notas} compas={r.compas} hueco={lista.length ? -1 : r.hueco} revelado={false} colores={colores} className="w-full block mx-auto" />
      </div>
      {revelado ? (!ok && (
        <div className="flex items-center justify-center gap-2 text-green-300 font-black text-sm">
          <Mini n={deClave(r.bueno)} color={VERDE} className="w-8 h-12" /> {nombreFigura(deClave(r.bueno), l)}
        </div>
      )) : (
        <>
          <div className="grid grid-cols-6 gap-1.5 mb-2">
            {paleta(nivel).map(k => (
              <button key={k} disabled={puestas.length >= MAX_HUECO} onClick={() => setPuestas(p => [...p, k])}
                className="rounded-xl bg-white/[0.07] hover:bg-white/[0.14] border border-white/10 flex justify-center py-0.5 disabled:opacity-30">
                <Mini n={deClave(k)} className="w-8 h-12" />
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="py-3 rounded-2xl bg-white/10 text-white font-bold disabled:opacity-30" disabled={!puestas.length} onClick={() => setPuestas(p => p.slice(0, -1))}>⌫</button>
            <button className={boton} disabled={!puestas.length} onClick={() => onResponder(puestas.join('+'))}>{tr(comprobar)}</button>
          </div>
        </>
      )}
    </>
  )
}

function Barra({ r, revelado, elegida, onResponder }) {
  const notas = r.seguidas.map(deClave)
  const marcas = {}
  if (revelado) {
    if (Number(elegida) !== r.barra && elegida != null) marcas[Number(elegida)] = ROJO
    marcas[r.barra] = VERDE
  }
  return (
    <div className={caja}>
      <Pentagrama notas={notas} compas={r.compas} final onEntre={revelado ? undefined : i => onResponder(String(i))} marcas={marcas} className="w-full block mx-auto" />
    </div>
  )
}

export default function PreguntaCompas({ ronda, revelado, elegida, onResponder, nivel }) {
  const { lang, tr } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const props = { r: ronda, revelado, elegida, onResponder, l, tr, nivel: nivel ?? ronda.nivel }
  const cuerpo = ronda.mecanica === 'empareja' ? <Empareja {...props} />
    : ronda.mecanica === 'mide' ? <Mide {...props} />
    : ronda.mecanica === 'barra' ? <Barra {...props} />
    : <Construye {...props} />
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(ronda, l)}</p>
      {cuerpo}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
