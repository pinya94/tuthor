// Una ronda de La Orquesta: el instrumento dibujado y, en «¿dónde se sienta?»,
// el plano de la orquesta vista desde arriba (el director abajo, en el centro).
import { useLang } from '../../context/LangContext'
import Instrumento from './Instrumento'
import { instrumento, enunciado, textoOpcion, explicacion, tx, FAMILIAS, SITIOS } from '../../lib/laOrquesta'

const ZONAS = [['A', 30], ['B', 48], ['C', 66], ['D', 84]] // letra y radio del arco

function Plano({ bueno, revelado, elegida, tr, l }) {
  const familia = Object.keys(SITIOS).find(f => SITIOS[f] === bueno)
  return (
    <svg viewBox="0 0 200 104" className="w-full max-w-[320px] mx-auto block mt-2" aria-hidden="true">
      {[...ZONAS].reverse().map(([z, rad]) => {
        const ok = revelado && z === bueno
        const mal = revelado && z === elegida && z !== bueno
        return (
          <g key={z}>
            <path d={`M${100 - rad - 14} 96 A${rad + 14} ${rad + 14} 0 0 1 ${100 + rad + 14} 96 L${100 + rad - 4} 96 A${rad - 4} ${rad - 4} 0 0 0 ${100 - rad + 4} 96 Z`}
              fill={ok ? '#166534' : mal ? '#7F1D1D' : '#1E293B'} stroke={ok ? '#4ADE80' : '#475569'} strokeWidth={ok ? 2 : 1} />
            <text x="100" y={96 - rad + 4} textAnchor="middle" fontSize="11" fontWeight="900" fill={ok ? '#BBF7D0' : '#CBD5E1'}>{z}</text>
          </g>
        )
      })}
      <circle cx="100" cy="98" r="5" fill="#FBBF24" />
      <text x="114" y="101" fontSize="8" fill="#94A3B8">{tr({ es: 'director', en: 'conductor', ca: 'director' })}</text>
      {revelado && <text x="196" y="12" textAnchor="end" fontSize="9" fontWeight="800" fill="#86EFAC">{bueno} = {tx(FAMILIAS[familia], l)}</text>}
    </svg>
  )
}

export default function PreguntaOrquesta({ ronda, revelado, elegida, onResponder }) {
  const { lang, tr } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const it = instrumento(r.inst)
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-3 mb-3">
        <Instrumento id={r.inst} className={r.tipo === 'sitio' ? 'w-28 mx-auto block' : 'w-full max-w-[240px] mx-auto block'} />
        {r.tipo !== 'nombre' && <p className="text-center text-white font-black text-lg mt-1">{tx(it.nombre, l)}</p>}
        {revelado && r.tipo === 'nombre' && <p className="text-center text-green-300 font-black text-lg mt-1">{tx(it.nombre, l)}</p>}
        {r.tipo === 'sitio' && <Plano bueno={r.bueno} revelado={revelado} elegida={elegida} tr={tr} l={l} />}
      </div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${r.tipo === 'sonido' ? 'grid-cols-1 sm:grid-cols-2' : r.tipo === 'sitio' ? 'grid-cols-4' : 'grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-2 rounded-xl border text-white text-[15px] font-bold leading-snug transition-all ${clase(o)}`}>
            {textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
