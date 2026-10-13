// Una ronda de ¿Quién lo Pensó? (ver lib/quienLoPenso):
//   linea     tocar a los filósofos en orden; al corregir, la línea del tiempo
//             con un punto por filósofo. La escala va a trozos (Antigüedad,
//             Edad Media, Modernidad): con una lineal los griegos quedarían
//             apelotonados en una esquina.
//   empareja  tocar una idea y luego su filósofo
//   escuelas  tocar un filósofo y luego su corriente
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { filosofo, enunciado, explicacion, fechas, tx, textoItem, CORRIENTES } from '../../lib/quienLoPenso'

const COLORES = ['bg-sky-500', 'bg-fuchsia-500', 'bg-amber-500', 'bg-emerald-500']
const TRAMOS = [
  { de: -650, a: -250, x0: 8, x1: 120 },
  { de: 300, a: 1400, x0: 132, x1: 200 },
  { de: 1550, a: 2000, x0: 212, x1: 352 },
]
const xDe = y => {
  const t = TRAMOS.find(t => y >= t.de && y <= t.a) ?? (y < 300 ? TRAMOS[0] : y < 1550 ? TRAMOS[1] : TRAMOS[2])
  return t.x0 + ((Math.min(Math.max(y, t.de), t.a) - t.de) / (t.a - t.de)) * (t.x1 - t.x0)
}

function Tiempo({ ids, tr, l }) {
  return (
    <svg viewBox="0 0 360 86" className="w-full block mt-2" aria-hidden="true">
      {TRAMOS.map((t, i) => (
        <g key={i}>
          <line x1={t.x0} y1="52" x2={t.x1} y2="52" stroke="#475569" strokeWidth="2" />
          <text x={(t.x0 + t.x1) / 2} y="80" textAnchor="middle" fontSize="9" fill="#94A3B8">
            {[tr({ es: 'Antigüedad', en: 'Antiquity', ca: 'Antiguitat' }), tr({ es: 'Edad Media', en: 'Middle Ages', ca: 'Edat Mitjana' }), tr({ es: 'Modernidad', en: 'Modern era', ca: 'Modernitat' })][i]}
          </text>
        </g>
      ))}
      {ids.map((id, k) => {
        const f = filosofo(id), x = xDe(f.nace)
        return (
          <g key={id}>
            <circle cx={x} cy="52" r="5" fill="#4ADE80" />
            <text x={x} y={k % 2 ? 40 : 24} textAnchor="middle" fontSize="9" fontWeight="800" fill="#E2E8F0">{tx(f.nombre, l).split(' ')[0]}</text>
          </g>
        )
      })}
    </svg>
  )
}

function Linea({ r, revelado, onResponder, tr, l }) {
  const [seq, setSeq] = useState([])
  const bueno = r.bueno.split(',')
  const toca = id => {
    if (revelado || seq.includes(id)) return
    const s2 = [...seq, id]
    setSeq(s2)
    if (s2.length === r.fils.length) onResponder(s2.join(','))
  }
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
        <div className={`grid gap-1.5 ${r.fils.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
          {r.fils.map((_, i) => {
            const id = seq[i]
            const ok = revelado && id === bueno[i]
            return (
              <div key={i} className={`rounded-xl border min-h-[4.6rem] p-1 text-center ${id ? (revelado ? (ok ? 'border-green-400 bg-green-500/15' : 'border-red-400 bg-red-500/15') : 'border-white/20 bg-white/5') : 'border-dashed border-white/20'}`}>
                <p className="text-white/40 text-[10px] font-bold">{i + 1}.º</p>
                {id && <p className="text-white text-[12px] font-bold leading-tight">{tx(filosofo(id).nombre, l)}</p>}
                {revelado && <p className="text-[10px] mt-0.5" style={{ color: ok ? '#4ADE80' : '#94A3B8' }}>{ok ? fechas(filosofo(id), l) : tx(filosofo(bueno[i]).nombre, l)}</p>}
              </div>
            )
          })}
        </div>
        {revelado && <Tiempo ids={bueno} tr={tr} l={l} />}
      </div>
      {!revelado && (
        <div className="grid grid-cols-2 gap-2">
          {r.fils.map(id => (
            <button key={id} disabled={seq.includes(id)} onClick={() => toca(id)} className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] py-2.5 text-white text-sm font-bold disabled:opacity-25">
              {tx(filosofo(id).nombre, l)}
            </button>
          ))}
          {seq.length > 0 && <button onClick={() => setSeq(seq.slice(0, -1))} className="col-span-2 py-2 rounded-xl text-white/60 text-sm font-bold bg-white/[0.03]">↶ {tr({ es: 'Deshacer', en: 'Undo', ca: 'Desfer' })}</button>}
        </div>
      )}
    </>
  )
}

function Empareja({ r, revelado, onResponder, l }) {
  const [union, setUnion] = useState({}) // fil de la idea → fil elegido
  const [activo, setActivo] = useState(r.items[0].fil)
  const une = id => {
    if (revelado || !activo) return
    const n = Object.fromEntries(Object.entries(union).filter(([, v]) => v !== id))
    n[activo] = id
    setUnion(n)
    const sig = r.items.find(it => !n[it.fil])
    setActivo(sig?.fil ?? null)
    if (!sig) onResponder(`empareja:${r.items.filter(it => n[it.fil] !== it.fil).length}`)
  }
  const colorDe = id => { const k = r.items.findIndex(it => union[it.fil] === id); return k >= 0 ? COLORES[k] : 'bg-white/15' }
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="space-y-1.5 mb-3">
        {r.items.map((it, k) => {
          const bien = revelado && union[it.fil] === it.fil
          return (
            <button key={it.fil} onClick={() => !revelado && setActivo(it.fil)}
              className={`block w-full text-left rounded-xl px-3 py-2 transition-all ${activo === it.fil && !revelado ? 'bg-white/15 ring-2 ring-amber-300' : 'bg-white/5'} ${revelado ? (bien ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400') : ''}`}>
              <span className="flex items-start gap-2">
                <span className={`mt-1 w-3 h-3 rounded-full shrink-0 ${union[it.fil] ? COLORES[k] : 'bg-white/15'}`} />
                <span className="font-serif text-white text-[14.5px] leading-snug">{textoItem(it, l)}</span>
              </span>
              {revelado && <span className={`block text-xs font-bold mt-1 ${bien ? 'text-green-300' : 'text-red-300'}`}>{tx(filosofo(it.fil).nombre, l)}</span>}
            </button>
          )
        })}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {r.nombres.map(id => (
          <button key={id} disabled={revelado} onClick={() => une(id)} className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] py-2.5 px-1 text-white text-[13px] font-bold flex items-center justify-center gap-2">
            <span className={`w-3 h-3 rounded-full shrink-0 ${colorDe(id)}`} />{tx(filosofo(id).nombre, l)}
          </button>
        ))}
      </div>
    </>
  )
}

function Escuelas({ r, revelado, onResponder, l }) {
  const [puestas, setPuestas] = useState({})
  const [activo, setActivo] = useState(r.fils[0])
  const colocar = c => {
    if (revelado || !activo) return
    const n = { ...puestas, [activo]: c }
    setPuestas(n)
    const sig = r.fils.find(id => !n[id])
    setActivo(sig ?? null)
    if (!sig) onResponder(`escuelas:${r.fils.filter(id => n[id] !== filosofo(id).corriente).length}`)
  }
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="flex flex-wrap justify-center gap-1.5 mb-3 min-h-[2.5rem]">
        {r.fils.filter(id => !puestas[id]).map(id => (
          <button key={id} onClick={() => setActivo(id)} className={`rounded-xl px-3 py-1.5 text-sm font-bold text-white transition-all ${activo === id ? 'bg-white/20 ring-2 ring-amber-300' : 'bg-white/5'}`}>
            {tx(filosofo(id).nombre, l)} <span className="text-white/40 text-[11px] font-normal">{fechas(filosofo(id), l)}</span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {r.cajas.map(c => (
          <button key={c} disabled={revelado || !activo} onClick={() => colocar(c)} className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-2 py-2 min-h-[3.8rem] text-left">
            <span className="block text-white text-[12.5px] font-black leading-tight">{tx(CORRIENTES[c], l)}</span>
            <span className="flex flex-wrap gap-1 mt-1">
              {r.fils.filter(id => puestas[id] === c).map(id => (
                <span key={id} className={`rounded-md px-1.5 py-0.5 text-[11px] font-bold text-white ${revelado ? (filosofo(id).corriente === c ? 'bg-green-500/30 ring-1 ring-green-400' : 'bg-red-500/30 ring-1 ring-red-400') : 'bg-white/15'}`}>
                  {tx(filosofo(id).nombre, l)}
                </span>
              ))}
            </span>
          </button>
        ))}
      </div>
    </>
  )
}

export default function PreguntaFilosofo({ ronda, revelado, onResponder }) {
  const { lang, tr } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const props = { r: ronda, revelado, onResponder, tr, l }
  return (
    <div className="w-full">
      {ronda.tipo === 'linea' ? <Linea {...props} /> : ronda.tipo === 'empareja' ? <Empareja {...props} /> : <Escuelas {...props} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
