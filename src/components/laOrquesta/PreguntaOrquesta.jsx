// Una ronda de La Orquesta (ver lib/laOrquesta):
//   sienta     el plano de la orquesta en semicírculos (cuerda junto al
//              director, luego madera, metal y percusión al fondo): se toca un
//              instrumento y luego su zona; los ya sentados se ven en su arco
//   empareja   tocar un dibujo y luego su nombre
//   clasifica  tocar un dibujo y luego su caja
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import Instrumento, { InstrumentoEn } from './Instrumento'
import { FAMILIAS, instrumento, enunciado, explicacion, tx, cajaDe, textoCaja } from '../../lib/laOrquesta'

const COLORES = ['bg-sky-500', 'bg-fuchsia-500', 'bg-amber-500', 'bg-emerald-500']
const ZONAS = [['cuerda', 30], ['madera', 48], ['metal', 66], ['percusion', 84]] // familia y radio del arco

function Ficha({ id, activo, onClick, mini }) {
  return (
    <button type="button" onClick={onClick} className={`rounded-xl p-1 transition-all ${mini ? 'w-11' : 'w-[4.6rem]'} ${activo ? 'bg-white/20 ring-2 ring-amber-300' : 'bg-white/5'}`}>
      <Instrumento id={id} className="w-full h-auto block" />
    </button>
  )
}

function Sienta({ r, revelado, onResponder, tr, l }) {
  const [puestas, setPuestas] = useState({})
  const [activo, setActivo] = useState(r.inst[0])
  const sienta = fam => {
    if (revelado || !activo) return
    const n = { ...puestas, [activo]: fam }
    setPuestas(n)
    const sig = r.inst.find(i => !n[i])
    setActivo(sig ?? null)
    if (!sig) onResponder(`sienta:${r.inst.filter(i => n[i] !== instrumento(i).familia).length}`)
  }
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="flex justify-center gap-2 mb-2 min-h-[4.8rem]">
        {r.inst.filter(i => !puestas[i]).map(i => <Ficha key={i} id={i} activo={activo === i} onClick={() => setActivo(i)} />)}
      </div>
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2">
        <svg viewBox="0 0 200 106" className="w-full max-w-[360px] mx-auto block">
          {[...ZONAS].reverse().map(([fam, rad]) => (
            <g key={fam} onClick={() => sienta(fam)} className={revelado || !activo ? '' : 'cursor-pointer'}>
              <path d={`M${100 - rad - 14} 96 A${rad + 14} ${rad + 14} 0 0 1 ${100 + rad + 14} 96 L${100 + rad - 4} 96 A${rad - 4} ${rad - 4} 0 0 0 ${100 - rad + 4} 96 Z`}
                fill="#1E293B" stroke="#475569" strokeWidth="1" className={revelado || !activo ? '' : 'hover:fill-slate-700'} />
              {(r.nivel === 'facil' || revelado) && <text x="100" y={96 - rad - 1} textAnchor="middle" fontSize="6" fontWeight="800" fill={revelado ? '#86EFAC' : '#94A3B8'} className="pointer-events-none">{tx(FAMILIAS[fam], l)}</text>}
            </g>
          ))}
          <circle cx="100" cy="98" r="5" fill="#FBBF24" />
          <text x="114" y="102" fontSize="7" fill="#94A3B8">{tr({ es: 'director', en: 'conductor', ca: 'director' })}</text>
          {ZONAS.map(([fam, rad]) => {
            const aqui = r.inst.filter(i => puestas[i] === fam)
            return aqui.map((i, k) => {
              // A los lados de lo alto del arco, que es donde va el nombre de la zona.
              const ang = Math.PI * (0.5 + [-0.17, 0.17, -0.34, 0.34][k])
              const x = 100 - Math.cos(ang) * (rad + 5) - 9, y = 96 - Math.sin(ang) * (rad + 5) - 9
              const ok = instrumento(i).familia === fam
              return (
                <g key={i}>
                  {revelado && <rect x={x - 1} y={y - 1} width="20" height="20" rx="4" fill="none" stroke={ok ? '#4ADE80' : '#F87171'} strokeWidth="1.5" />}
                  <InstrumentoEn id={i} x={x} y={y + 2} />
                </g>
              )
            })
          })}
        </svg>
        {!revelado && <p className="text-center text-xs text-white/50">{tr({ es: 'Toca un instrumento y luego su zona', en: 'Tap an instrument and then its section', ca: 'Toca un instrument i després la seva zona' })}</p>}
      </div>
    </>
  )
}

function Empareja({ r, revelado, onResponder, l }) {
  const [union, setUnion] = useState({})
  const [activo, setActivo] = useState(r.inst[0])
  const une = id => {
    if (revelado || !activo) return
    const n = Object.fromEntries(Object.entries(union).filter(([, v]) => v !== id))
    n[activo] = id
    setUnion(n)
    const sig = r.inst.find(i => !n[i])
    setActivo(sig ?? null)
    if (!sig) onResponder(`empareja:${r.inst.filter(i => n[i] !== i).length}`)
  }
  const colorDe = id => { const k = r.inst.findIndex(i => union[i] === id); return k >= 0 ? COLORES[k] : 'bg-white/15' }
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 mb-3 ${r.inst.length === 4 ? 'grid-cols-4' : 'grid-cols-3'}`}>
        {r.inst.map((i, k) => (
          <button key={i} onClick={() => !revelado && setActivo(i)} className={`rounded-xl p-1 transition-all relative ${activo === i && !revelado ? 'bg-white/15 ring-2 ring-amber-300' : 'bg-white/5'} ${revelado ? (union[i] === i ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400') : ''}`}>
            <span className={`absolute top-1 left-1 w-3 h-3 rounded-full ${union[i] ? COLORES[k] : 'bg-white/15'}`} />
            <Instrumento id={i} className="w-full h-auto block" />
            {revelado && <span className="block text-[11px] font-bold text-white">{tx(instrumento(i).nombre, l)}</span>}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {r.nombres.map(id => (
          <button key={id} disabled={revelado} onClick={() => une(id)} className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] py-2.5 text-white text-sm font-bold flex items-center justify-center gap-2">
            <span className={`w-3 h-3 rounded-full ${colorDe(id)}`} />{tx(instrumento(id).nombre, l)}
          </button>
        ))}
      </div>
    </>
  )
}

function Clasifica({ r, revelado, onResponder, l }) {
  const [puestas, setPuestas] = useState({})
  const [activo, setActivo] = useState(r.inst[0])
  const colocar = c => {
    if (revelado || !activo) return
    const n = { ...puestas, [activo]: c }
    setPuestas(n)
    const sig = r.inst.find(i => !n[i])
    setActivo(sig ?? null)
    if (!sig) onResponder(`clasifica:${r.inst.filter(i => n[i] !== cajaDe(r, i)).length}`)
  }
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="flex justify-center gap-2 mb-3 min-h-[4.8rem]">
        {r.inst.filter(i => !puestas[i]).map(i => <Ficha key={i} id={i} activo={activo === i} onClick={() => setActivo(i)} />)}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {r.cajas.map(c => (
          <button key={c} disabled={revelado || !activo} onClick={() => colocar(c)} className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-2 py-2 min-h-[4.2rem] text-left">
            <span className="block text-white text-[12px] font-black leading-tight">{textoCaja(r, c, l)}</span>
            <span className="flex flex-wrap gap-1 mt-1">
              {r.inst.filter(i => puestas[i] === c).map(i => (
                <span key={i} className={`rounded-md w-10 ${revelado ? (cajaDe(r, i) === c ? 'ring-2 ring-green-400' : 'ring-2 ring-red-400') : ''}`}><Instrumento id={i} className="w-full h-auto block" /></span>
              ))}
            </span>
          </button>
        ))}
      </div>
    </>
  )
}

export default function PreguntaOrquesta({ ronda, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const props = { r: ronda, revelado, onResponder, tr, l }
  return (
    <div className="w-full">
      {ronda.tipo === 'sienta' ? <Sienta {...props} /> : ronda.tipo === 'empareja' ? <Empareja {...props} /> : <Clasifica {...props} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
