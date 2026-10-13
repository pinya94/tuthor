// Una ronda de Cazafiguras (solo castellano):
//   caza      cada palabra del texto se puede tocar; «Comprobar» y se ven en
//             verde las de la figura, en rojo las que sobraban y en ámbar las
//             que faltaron
//   empareja  tocar un texto y luego su figura, hasta unirlos todos
import { useState } from 'react'
import { EJEMPLOS, FIGURAS, palabras, marcadas, cazaBien, ejemplo, enunciado, explicacion } from '../../lib/cazafiguras'

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const COLORES = ['bg-sky-500', 'bg-fuchsia-500', 'bg-amber-500', 'bg-emerald-500']

function Caza({ r, revelado, onResponder }) {
  const e = ejemplo(r)
  const ps = palabras(e)
  const T = marcadas(e)
  const [tocadas, setTocadas] = useState([])
  const toca = k => !revelado && setTocadas(t => (t.includes(k) ? t.filter(x => x !== k) : [...t, k]))
  const clase = k => {
    const sel = tocadas.includes(k), en = T.includes(k)
    if (!revelado) return sel ? 'bg-amber-300/30 ring-2 ring-amber-300 text-white' : 'hover:bg-white/10 text-white/90'
    if (sel && en) return 'bg-green-500/30 ring-2 ring-green-400 text-white'
    if (sel) return 'bg-red-500/25 ring-2 ring-red-400 text-white line-through'
    if (en) return 'ring-2 ring-amber-400 text-amber-200'
    return 'text-white/60'
  }
  const f = FIGURAS[e.fig]
  return (
    <>
      <p className="text-white font-bold text-center mb-1 leading-snug">{enunciado(r)}</p>
      {r.pista && <p className="text-white/55 text-xs text-center mb-2">{f.def}</p>}
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-4 mb-3">
        <p className="font-serif text-[19px] leading-[2.1rem] text-center">
          {ps.map((p, k) => p.verso
            ? <br key={k} />
            : <span key={k}><button type="button" onClick={() => toca(k)} className={`rounded-md px-1 transition-all ${clase(k)}`}>{p.t}</button>{' '}</span>)}
        </p>
        {e.autor && <p className="text-white/40 text-xs text-right mt-1">— {e.autor}</p>}
      </div>
      {!revelado && <button className={boton} disabled={!tocadas.length} onClick={() => onResponder(cazaBien(e, tocadas) ? 'caza:ok' : 'caza:no')}>Comprobar</button>}
    </>
  )
}

function Empareja({ r, revelado, onResponder }) {
  const [union, setUnion] = useState({}) // índice de ejemplo → figura
  const [activo, setActivo] = useState(r.ejemplos[0])
  const une = fig => {
    if (revelado || activo == null) return
    const n = Object.fromEntries(Object.entries(union).filter(([, f]) => f !== fig))
    n[activo] = fig
    setUnion(n)
    const sig = r.ejemplos.find(i => !n[i])
    setActivo(sig ?? null)
    if (!sig && Object.keys(n).length === r.ejemplos.length) onResponder(`empareja:${r.ejemplos.filter(i => n[i] !== EJEMPLOS[i].fig).length}`)
  }
  const color = fig => COLORES[Object.values(union).indexOf(fig) >= 0 ? r.ejemplos.findIndex(i => union[i] === fig) : -1]
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r)}</p>
      <div className="space-y-1.5 mb-3">
        {r.ejemplos.map((i, k) => {
          const e = EJEMPLOS[i]
          const bien = revelado && union[i] === e.fig
          return (
            <button key={i} onClick={() => !revelado && setActivo(i)}
              className={`block w-full text-left rounded-xl px-3 py-2 transition-all ${activo === i && !revelado ? 'bg-white/15 ring-2 ring-amber-300' : 'bg-white/5'} ${revelado ? (bien ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400') : ''}`}>
              <span className="flex items-start gap-2">
                <span className={`mt-1 w-3 h-3 rounded-full shrink-0 ${union[i] ? COLORES[k] : 'bg-white/15'}`} />
                <span className="font-serif text-white text-[15px] leading-snug">{e.t.replace(/ \/ /g, ' / ')}</span>
              </span>
              {revelado && <span className={`block text-xs font-bold mt-1 ${bien ? 'text-green-300' : 'text-red-300'}`}>{FIGURAS[e.fig].nombre}{!bien && union[i] ? ` (no ${FIGURAS[union[i]].nombre.toLowerCase()})` : ''}</span>}
            </button>
          )
        })}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {r.figuras.map(fig => (
          <button key={fig} disabled={revelado} onClick={() => une(fig)}
            className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] py-2.5 text-white text-sm font-bold flex items-center justify-center gap-2">
            <span className={`w-3 h-3 rounded-full ${color(fig) ?? 'bg-white/15'}`} />{FIGURAS[fig].nombre}
          </button>
        ))}
      </div>
    </>
  )
}

export default function PreguntaFigura({ ronda, revelado, onResponder }) {
  return (
    <div className="w-full">
      {ronda.tipo === 'caza' ? <Caza r={ronda} revelado={revelado} onResponder={onResponder} /> : <Empareja r={ronda} revelado={revelado} onResponder={onResponder} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda)}</p>}
    </div>
  )
}
