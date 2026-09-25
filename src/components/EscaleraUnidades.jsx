// Escalera visual de unidades + teclado numérico en pantalla.
// Compartido por el juego y el examen (evita abrir el teclado del móvil).

const STEP_X = 50
const STEP_Y = 20
const TOP = 14
const BOTTOM = 158

// Dibuja la escalera de 7 unidades, resaltando la de origen y la de destino.
export function EscaleraSVG({ unidades, deIdx, aIdx, className = '' }) {
  const lo = Math.min(deIdx, aIdx)
  const hi = Math.max(deIdx, aIdx)
  return (
    <svg viewBox="0 0 360 172" className={className} role="img" aria-hidden="true">
      {unidades.map((u, i) => {
        const x = 5 + i * STEP_X
        const y = TOP + i * STEP_Y
        const enRango = i >= lo && i <= hi
        const esDe = i === deIdx
        const esA = i === aIdx
        const fill = esDe ? '#EDAE49' : esA ? '#38bdf8' : enRango ? '#ffffff22' : '#ffffff0d'
        const stroke = esDe ? '#EDAE49' : esA ? '#38bdf8' : '#ffffff20'
        const txtCol = esDe || esA ? '#0b0b0b' : enRango ? '#ffffff' : '#ffffff66'
        return (
          <g key={u}>
            <rect x={x} y={y} width={STEP_X} height={BOTTOM - y} rx="4"
              fill={fill} stroke={stroke} strokeWidth="1.5" />
            <text x={x + STEP_X / 2} y={y + 14} textAnchor="middle"
              fontSize="13" fontWeight="800" fill={txtCol}>{u}</text>
          </g>
        )
      })}
    </svg>
  )
}

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

// Teclado numérico: 1-9, coma decimal, 0 y borrar.
export function Teclado({ onDigit, onDot, onBack, dotLabel = ',', disabled = false }) {
  const btn = 'h-12 rounded-xl bg-white/10 border border-white/20 text-white font-black text-xl hover:bg-white/20 active:scale-90 transition disabled:opacity-30'
  return (
    <div className="w-full max-w-[420px] grid grid-cols-3 gap-2">
      {KEYS.map(k => (
        <button key={k} type="button" disabled={disabled} onClick={() => onDigit(k)} className={btn}>{k}</button>
      ))}
      <button type="button" disabled={disabled} onClick={onDot} className={btn}>{dotLabel}</button>
      <button type="button" disabled={disabled} onClick={() => onDigit('0')} className={btn}>0</button>
      <button type="button" disabled={disabled} onClick={onBack}
        className="h-12 rounded-xl bg-white/5 border border-white/15 text-white/70 text-lg hover:bg-white/15 active:scale-90 transition disabled:opacity-30">⌫</button>
    </div>
  )
}
