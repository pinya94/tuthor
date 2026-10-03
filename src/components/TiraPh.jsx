import { useRef } from 'react'
import { COLORES_PH, colorPh } from '../lib/medidorPh'

// Tira de pH 0-14 que se toca o se arrastra para colocar la marca (pasos de
// 0,5). `colores` pinta el indicador universal desde el principio; sin él la
// tira es gris hasta corregir, y entonces se ve dónde caía de verdad.
// `zonas` (nivel fácil) rotula ácido / neutro / básico debajo y deja tocarlas.
const PASO = 0.5
const pos = v => (v / 14) * 100

export default function TiraPh({ valor, onChange, real = null, colores = true, zonas = false, textos, bloqueada = false }) {
  const ref = useRef(null)
  const arrastrando = useRef(false)
  const pintada = colores || real != null
  const fondo = pintada
    ? `linear-gradient(to right, ${COLORES_PH.map((c, i) => `${c} ${(i / 14) * 100}%`).join(', ')})`
    : 'linear-gradient(to right, #334155, #475569)'

  function desdeEvento(e) {
    const r = ref.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width))
    return Math.round((x * 14) / PASO) * PASO
  }
  const down = e => {
    if (bloqueada) return
    arrastrando.current = true
    e.currentTarget.setPointerCapture?.(e.pointerId)
    onChange(desdeEvento(e))
  }
  const move = e => { if (arrastrando.current && !bloqueada) onChange(desdeEvento(e)) }
  const up = () => { arrastrando.current = false }

  return (
    <div className="w-full select-none pt-5">
      <div ref={ref} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up}
        className={`relative h-14 rounded-xl border border-white/15 touch-none ${bloqueada ? '' : 'cursor-pointer'}`}
        style={{ background: fondo }}>
        {/* zona neutra marcada en fácil: es la que más cuesta acertar */}
        {zonas && <div className="absolute inset-y-0 border-x-2 border-dashed border-white/70" style={{ left: `${pos(6.5)}%`, width: `${pos(1)}%` }} />}
        {real != null && (
          <div className="absolute -top-3 -bottom-3 -translate-x-1/2 flex flex-col items-center" style={{ left: `${pos(real)}%` }}>
            <span className="absolute -top-5 px-1.5 rounded bg-white text-[#0b1226] text-[10px] font-black whitespace-nowrap">{textos.real}</span>
            <span className="w-1 flex-1 bg-white rounded-full shadow-[0_0_8px_#fff]" />
          </div>
        )}
        {valor != null && (
          <div className="absolute -top-2 -bottom-2 -translate-x-1/2 transition-[left] duration-100" style={{ left: `${pos(valor)}%` }}>
            <div className="h-full w-5 rounded-md border-[3px] border-[#0b1226] shadow-[0_0_0_2px_#EDAE49]"
              style={{ background: pintada ? colorPh(valor) : '#94a3b8' }} />
          </div>
        )}
      </div>
      <div className="relative h-5 mt-2 text-[11px] font-bold text-white/50">
        {Array.from({ length: 15 }, (_, i) => (
          <span key={i} className="absolute -translate-x-1/2" style={{ left: `${pos(i)}%` }}>{i}</span>
        ))}
      </div>
      {zonas && (
        <div className="grid grid-cols-3 gap-1.5 mt-1">
          {[['acido', 3.5], ['neutro', 7], ['basico', 10.5]].map(([k, v]) => (
            <button key={k} type="button" disabled={bloqueada} onClick={() => onChange(v)}
              className="py-1.5 rounded-lg bg-white/[0.06] border border-white/10 text-white/80 text-xs font-bold hover:bg-white/15 disabled:opacity-60 truncate px-1">
              {textos[k]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Tubo de ensayo con la sustancia: toma el color de donde esté la marca (o el
// de su pH real al corregir). Sin colores y sin corregir, gris.
export function TuboPh({ ph, className = '' }) {
  const c = ph == null ? '#64748b' : colorPh(ph)
  return (
    <svg viewBox="0 0 60 120" className={className} aria-hidden="true">
      <path d="M18 8h24" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
      <path d="M21 10v84a9 9 0 0 0 18 0V10" fill="#ffffff10" stroke="#cbd5e1" strokeWidth="3" />
      <path d="M23 44v50a7 7 0 0 0 14 0V44Z" fill={c} style={{ transition: 'fill .25s' }} />
      <path d="M23 44h14" stroke="#ffffff60" strokeWidth="2" />
      <path d="M27 52v34" stroke="#ffffff55" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}
