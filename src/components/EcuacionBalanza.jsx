import { totalAtoms, elementTally } from '../lib/ecuaciones'

// Balanza de ecuaciones (SVG + controles). La barra se inclina hacia el lado con
// más átomos totales (cosmético); el marcador por elemento de abajo es la fuente
// de verdad de si está equilibrada. Los coeficientes se ajustan con ▲ / ▼.

const COL = {
  react: '#7dd3fc',   // reactivos (izquierda)
  prod:  '#EDAE49',   // productos (derecha)
  beam:  '#94a3b8',
}

// Fórmula con subíndices: 'H2O' -> H<sub>2</sub>O
function Formula({ f, color }) {
  const parts = f.match(/([A-Z][a-z]?|\d+)/g) || [f]
  return (
    <span className="font-black tracking-tight" style={{ color }}>
      {parts.map((p, i) => (/^\d+$/.test(p)
        ? <sub key={i} className="text-[0.7em]">{p}</sub>
        : <span key={i}>{p}</span>))}
    </span>
  )
}

function Stepper({ value, max, color, onStep, disabled }) {
  const btn = 'w-7 h-6 flex items-center justify-center rounded-md text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-25 disabled:hover:bg-transparent transition select-none'
  return (
    <span className="inline-flex flex-col items-center mr-1 align-middle">
      <button type="button" className={btn} disabled={disabled || value >= max} onClick={() => onStep(1)} aria-label="+1">▲</button>
      <span className="text-2xl font-black leading-none my-0.5 tabular-nums" style={{ color }}>{value}</span>
      <button type="button" className={btn} disabled={disabled || value <= 1} onClick={() => onStep(-1)} aria-label="-1">▼</button>
    </span>
  )
}

// Balanza SVG que se inclina según los átomos totales de cada lado.
function Beam({ tilt }) {
  const CX = 100, BEAM_Y = 26, GROUND_Y = 74
  return (
    <svg viewBox="0 0 200 90" width="150" style={{ display: 'block' }} aria-hidden="true">
      <g style={{ transform: `rotate(${tilt}deg)`, transformOrigin: `${CX}px ${BEAM_Y}px`, transition: 'transform 0.5s ease-out' }}>
        <rect x={CX - 72} y={BEAM_Y - 3} width={144} height={6} rx={3} fill={COL.beam} />
        {[[-72, COL.react], [72, COL.prod]].map(([dx, c]) => (
          <g key={dx}>
            <line x1={CX + dx} y1={BEAM_Y} x2={CX + dx} y2={BEAM_Y + 14} stroke={COL.beam} strokeWidth={2} />
            <path d={`M ${CX + dx - 16} ${BEAM_Y + 14} Q ${CX + dx} ${BEAM_Y + 30} ${CX + dx + 16} ${BEAM_Y + 14} Z`} fill={c} opacity={0.85} />
          </g>
        ))}
      </g>
      <polygon points={`${CX},${BEAM_Y + 4} ${CX - 14},${GROUND_Y} ${CX + 14},${GROUND_Y}`} fill="#64748b" />
      <rect x={CX - 24} y={GROUND_Y} width={48} height={6} rx={3} fill="#475569" />
    </svg>
  )
}

const PRACTICE_NOTE = {
  es: '⚗️ Práctica · en la realidad esta reacción ocurre al revés',
  en: '⚗️ Practice · in reality this reaction happens the other way',
  ca: '⚗️ Pràctica · a la realitat aquesta reacció passa al revés',
}

export default function EcuacionBalanza({ round, coefs, onStep, reveal, l = 'es' }) {
  const { left, right, answer, maxCoef } = round
  const nL = left.length

  const leftAtoms = totalAtoms(left, coefs.slice(0, nL))
  const rightAtoms = totalAtoms(right, coefs.slice(nL))
  const diff = rightAtoms - leftAtoms
  const tilt = Math.max(-11, Math.min(11, diff * 2.2))
  const tally = elementTally(round, coefs)

  function speciesGroup(species, offset, color) {
    return species.map((sp, i) => {
      const gi = offset + i
      const wrong = reveal && coefs[gi] !== answer[gi]
      return (
        <span key={gi} className="inline-flex items-center">
          {i > 0 && <span className="text-white/40 font-black mx-1.5 text-xl">+</span>}
          <span className="inline-flex flex-col items-center">
            <span className="inline-flex items-baseline">
              <Stepper value={coefs[gi]} max={maxCoef} color={color} onStep={(d) => onStep(gi, d)} disabled={reveal} />
              <span className="text-2xl"><Formula f={sp.f} color={color} /></span>
            </span>
            {wrong && <span className="text-[11px] text-green-400 font-bold mt-0.5">✓ {answer[gi]}</span>}
          </span>
        </span>
      )
    })
  }

  return (
    <div className="w-full">
      <div className="flex justify-center mb-1"><Beam tilt={tilt} /></div>

      {round.practiceOnly && (
        <p className="text-amber-300/80 text-[11px] font-semibold text-center mb-2 px-2">
          {PRACTICE_NOTE[l] ?? PRACTICE_NOTE.es}
        </p>
      )}

      {/* Ecuación con coeficientes ajustables */}
      <div className="flex flex-wrap items-center justify-center gap-y-2 bg-[#0d1117] border border-white/10 rounded-xl px-3 py-4 mb-3">
        {speciesGroup(left, 0, COL.react)}
        <span className="text-white/60 font-black mx-2 text-2xl">→</span>
        {speciesGroup(right, nL, COL.prod)}
      </div>

      {/* Marcador por elemento (fuente de verdad del equilibrio) */}
      <div className="flex flex-wrap justify-center gap-1.5">
        {tally.map(t => (
          <span key={t.el}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono font-bold border ${
              t.ok ? 'bg-green-400/10 border-green-400/40 text-green-300'
                   : 'bg-red-400/10 border-red-400/40 text-red-300'}`}>
            {t.el}: {t.left}={t.right} {t.ok ? '✓' : '✗'}
          </span>
        ))}
      </div>
    </div>
  )
}
