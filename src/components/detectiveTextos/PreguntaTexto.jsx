// Una ronda de Detective de Textos (solo castellano):
//   esquema           la escena y el esquema de la comunicación: se toca una
//                     ficha de la escena y luego su hueco
//   textos/funciones  los fragmentos (o frases) de uno en uno, en un «papel»
//                     neutro, y se coloca cada uno en su caja
// El papel no puede delatar el tipo: una receta dibujada como receta ya sería
// la respuesta.
import { useState } from 'react'
import { ESCENAS, ELEMENTOS, FRASES, enunciado, explicacion, cajaDe, nombreCaja, textoItem } from '../../lib/detectiveTextos'

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'

function Papel({ texto, autor }) {
  return (
    <figure className="w-full rounded-xl bg-[#f5efe0] text-[#1f2937] px-4 py-4 shadow-inner text-left">
      <blockquote className="font-serif text-[17px] leading-relaxed whitespace-pre-line">
        {texto.split(' / ').map((l, i) => <span key={i} className="block">{l}</span>)}
      </blockquote>
      {autor && <figcaption className="text-[#6b7280] text-sm mt-2 text-right">— {autor}</figcaption>}
    </figure>
  )
}

// ── Esquema de la comunicación ────────────────────────────────────────────
function Esquema({ r, revelado, onResponder }) {
  const e = ESCENAS[r.k]
  const [puestas, setPuestas] = useState({}) // hueco → ficha (clave de elemento)
  const [sel, setSel] = useState(r.fichas[0])
  const usadas = Object.values(puestas)
  const pon = h => {
    if (revelado || !sel) return
    const n = Object.fromEntries(Object.entries(puestas).filter(([, f]) => f !== sel))
    n[h] = sel
    setPuestas(n)
    setSel(r.fichas.find(f => !Object.values(n).includes(f)) ?? null)
  }
  const listo = r.huecos.every(h => puestas[h])
  const hueco = h => {
    const f = puestas[h]
    const estado = !revelado ? (f ? 'border-white/30 bg-white/10' : 'border-dashed border-white/25') : f === h ? 'border-green-400 bg-green-500/15' : 'border-red-400 bg-red-500/15'
    return (
      <button key={h} onClick={() => pon(h)} disabled={revelado} className={`rounded-xl border-2 px-1.5 py-1.5 min-h-[3.6rem] text-center transition-all ${estado}`}>
        <span className="block text-amber-200 text-[10.5px] font-black uppercase tracking-wide">{ELEMENTOS[h].nombre}</span>
        <span className="block text-white text-[12px] leading-tight mt-0.5">{f ? e[f] : ''}</span>
        {revelado && f !== h && <span className="block text-green-300 text-[11px] leading-tight mt-0.5">{e[h]}</span>}
      </button>
    )
  }
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r)}</p>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-3 mb-3">
        <p className="text-center text-4xl mb-1">{e.emoji}</p>
        <p className="text-white text-[15px] leading-snug text-center mb-3">{e.t}</p>
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-1">
          {hueco('emisor')}<span className="text-white/40">→</span>{hueco('mensaje')}<span className="text-white/40">→</span>{hueco('receptor')}
        </div>
        {r.huecos.includes('canal') && (
          <div className="grid grid-cols-2 gap-2 mt-2">{hueco('canal')}{hueco('codigo')}</div>
        )}
      </div>
      {!revelado && (
        <>
          <div className="flex flex-wrap justify-center gap-1.5 mb-3">
            {r.fichas.map(f => (
              <button key={f} onClick={() => setSel(f)}
                className={`rounded-xl border px-2.5 py-1.5 text-[13px] font-bold text-white transition-all ${sel === f ? 'bg-amber-300/25 border-amber-300 ring-2 ring-amber-300' : 'bg-white/[0.06] border-white/15'} ${usadas.includes(f) && sel !== f ? 'opacity-40' : ''}`}>
                {e[f]}
              </button>
            ))}
          </div>
          <button className={boton} disabled={!listo} onClick={() => onResponder(`esquema:${r.huecos.filter(h => puestas[h] !== h).length}`)}>Comprobar</button>
        </>
      )}
    </>
  )
}

// ── Clasificar fragmentos o frases ────────────────────────────────────────
function Clasifica({ r, revelado, onResponder }) {
  const [puestas, setPuestas] = useState({})
  const activa = r.items.find(i => puestas[i] == null)
  const colocar = c => {
    if (revelado || activa == null) return
    const n = { ...puestas, [activa]: c }
    setPuestas(n)
    if (r.items.every(i => n[i] != null)) onResponder(`clasifica:${r.items.filter(i => n[i] !== cajaDe(r, i)).length}`)
  }
  const num = i => r.items.indexOf(i) + 1
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r)}</p>
      {activa != null && !revelado && (
        <div className="mb-3">
          <p className="text-white/40 text-xs text-center mb-1">{num(activa)} / {r.items.length}</p>
          <Papel texto={textoItem(r, activa)} autor={r.tipo === 'funciones' ? FRASES[activa][2] : null} />
        </div>
      )}
      <div className="grid grid-cols-2 gap-2">
        {r.cajas.map(c => (
          <button key={c} disabled={revelado || activa == null} onClick={() => colocar(c)}
            className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-2 py-2 min-h-[3.8rem] text-left">
            <span className="block text-white text-[13px] font-black leading-tight">{nombreCaja(r, c)}</span>
            <span className="flex flex-wrap gap-1 mt-1">
              {r.items.filter(i => puestas[i] === c).map(i => (
                <span key={i} className={`rounded-md px-1.5 py-0.5 text-[11px] font-bold text-white ${revelado ? (cajaDe(r, i) === c ? 'bg-green-500/30 ring-1 ring-green-400' : 'bg-red-500/30 ring-1 ring-red-400') : 'bg-white/15'}`}>
                  {revelado ? `«${textoItem(r, i).replace(/\n/g, ' ').slice(0, 28)}…»` : `Texto ${num(i)}`}
                </span>
              ))}
            </span>
          </button>
        ))}
      </div>
    </>
  )
}

export default function PreguntaTexto({ ronda, revelado, onResponder }) {
  return (
    <div className="w-full">
      {ronda.tipo === 'esquema' ? <Esquema r={ronda} revelado={revelado} onResponder={onResponder} /> : <Clasifica r={ronda} revelado={revelado} onResponder={onResponder} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda)}</p>}
    </div>
  )
}
