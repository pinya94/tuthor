import { sideTerms, canDivide, coefToDivide, isSolved, solvedValue } from '../lib/algebra'

// Balanza algebraica: la ecuación como una balanza SIEMPRE nivelada. Cada término
// es una "pesa" tocable; al tocarla se resta a los DOS lados (misma operación).
// Cuando queda m·x = k aparece el botón de dividir. Todo en HTML salvo la viga.

const COL = { x: '#EDAE49', k: '#7dd3fc' }

function Beam() {
  // Viga siempre nivelada (la igualdad se conserva): decorativa.
  const CX = 100, BEAM_Y = 20, GROUND_Y = 52
  return (
    <svg viewBox="0 0 200 62" width="120" style={{ display: 'block' }} aria-hidden="true">
      <rect x={CX - 70} y={BEAM_Y - 3} width={140} height={6} rx={3} fill="#94a3b8" />
      {[-70, 70].map(dx => (
        <g key={dx}>
          <line x1={CX + dx} y1={BEAM_Y} x2={CX + dx} y2={BEAM_Y + 12} stroke="#94a3b8" strokeWidth={2} />
          <path d={`M ${CX + dx - 15} ${BEAM_Y + 12} Q ${CX + dx} ${BEAM_Y + 27} ${CX + dx + 15} ${BEAM_Y + 12} Z`} fill={dx < 0 ? COL.x : COL.k} opacity={0.8} />
        </g>
      ))}
      <polygon points={`${CX},${BEAM_Y + 3} ${CX - 13},${GROUND_Y} ${CX + 13},${GROUND_Y}`} fill="#64748b" />
      <rect x={CX - 22} y={GROUND_Y} width={44} height={5} rx={2} fill="#475569" />
    </svg>
  )
}

function TermChip({ kind, value, onClick, disabled }) {
  const text = kind === 'x'
    ? (value === 1 ? 'x' : value === -1 ? '−x' : `${value < 0 ? '−' : ''}${Math.abs(value)}x`)
    : `${value}`
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className="px-3 py-2 rounded-lg font-black text-lg border transition disabled:cursor-default"
      style={{
        color: kind === 'x' ? COL.x : COL.k,
        borderColor: `${kind === 'x' ? COL.x : COL.k}55`,
        background: `${kind === 'x' ? COL.x : COL.k}12`,
        cursor: disabled ? 'default' : 'pointer',
      }}>
      {text}
    </button>
  )
}

function Side({ side, sideKey, onRemove, disabled }) {
  const terms = sideTerms(side)
  if (terms.length === 0) return <span className="text-white/40 font-black text-lg px-2">0</span>
  return (
    <span className="inline-flex items-center gap-1.5 flex-wrap justify-center">
      {terms.map((t, i) => (
        <span key={t.kind} className="inline-flex items-center gap-1.5">
          {i > 0 && <span className="text-white/30 font-black">{t.value < 0 ? '−' : '+'}</span>}
          <TermChip kind={t.kind} value={i > 0 ? Math.abs(t.value) : t.value}
            onClick={() => onRemove(sideKey, t.kind)} disabled={disabled} />
        </span>
      ))}
    </span>
  )
}

export default function BalanzaAlgebraica({ state, onRemove, onDivide, reveal, solution, history = [], l = 'es' }) {
  const solved = isSolved(state)
  const div = canDivide(state)
  const value = solvedValue(state)
  const disabled = reveal || solved

  const tapHint = { es: 'Toca un término para restarlo a los dos lados', en: 'Tap a term to subtract it from both sides', ca: 'Toca un terme per restar-lo als dos costats' }[l]
  const divLabel = { es: `÷ ${coefToDivide(state)} a los dos lados`, en: `÷ ${coefToDivide(state)} on both sides`, ca: `÷ ${coefToDivide(state)} als dos costats` }[l]

  return (
    <div className="w-full">
      <div className="flex justify-center mb-1"><Beam /></div>

      {/* Ecuación como balanza */}
      <div className="flex items-center justify-center gap-3 bg-[#0d1117] border border-white/10 rounded-xl px-3 py-5 mb-2">
        <Side side={state.L} sideKey="L" onRemove={onRemove} disabled={disabled} />
        <span className="text-white/70 font-black text-2xl">=</span>
        <Side side={state.R} sideKey="R" onRemove={onRemove} disabled={disabled} />
      </div>

      {!solved && !reveal && (
        <p className="text-center text-white/40 text-xs mb-2">{tapHint}</p>
      )}

      {/* Botón dividir */}
      {div && !solved && !reveal && (
        <button onClick={onDivide}
          className="w-full py-2.5 rounded-xl bg-[#EDAE49]/20 border border-[#EDAE49]/50 text-[#EDAE49] font-black hover:bg-[#EDAE49]/30 transition mb-2">
          {divLabel}
        </button>
      )}

      {/* Solución */}
      {solved && (
        <p className="text-center text-green-400 font-black text-2xl mb-1">x = {value}</p>
      )}
      {reveal && !solved && (
        <p className="text-center text-red-400 font-bold mb-1">
          {{ es: 'La solución era', en: 'The solution was', ca: 'La solució era' }[l]} <span className="font-black">x = {solution}</span>
        </p>
      )}

      {/* Historial de pasos */}
      {history.length > 0 && (
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {history.map((h, i) => (
            <span key={i} className="text-[11px] font-mono text-white/40 bg-white/5 border border-white/10 rounded px-1.5 py-0.5">{h}</span>
          ))}
        </div>
      )}
    </div>
  )
}
