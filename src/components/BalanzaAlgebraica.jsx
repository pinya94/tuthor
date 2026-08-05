import { useState } from 'react'
import { sideTerms, isSolved, solvedValue, availableOps } from '../lib/algebra'

// Balanza algebraica: la ecuación como una balanza SIEMPRE nivelada.
//
// Los términos son solo pesas VISUALES: el jugador elige abajo qué OPERACIÓN
// aplica a los dos lados ("restar 4 a los dos lados"). Antes se tocaba el
// término y se restaba solo, lo que dejaba ganar a base de toquetear sin
// entender el método. Ahora hay que leer la ecuación y nombrar el paso.
//
// Todas las opciones son legales: elijas la que elijas la balanza sigue
// equilibrada. Solo algunas acercan la x, y verlo es parte de la lección.

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

function TermChip({ kind, value }) {
  const text = kind === 'x'
    ? (value === 1 ? 'x' : value === -1 ? '−x' : `${value < 0 ? '−' : ''}${Math.abs(value)}x`)
    : `${value}`
  return (
    <span className="px-3 py-2 rounded-lg font-black text-lg border"
      style={{
        color: kind === 'x' ? COL.x : COL.k,
        borderColor: `${kind === 'x' ? COL.x : COL.k}55`,
        background: `${kind === 'x' ? COL.x : COL.k}12`,
      }}>
      {text}
    </span>
  )
}

function Side({ side }) {
  const terms = sideTerms(side)
  if (terms.length === 0) return <span className="text-white/40 font-black text-lg px-2">0</span>
  return (
    <span className="inline-flex items-center gap-1.5 flex-wrap justify-center">
      {terms.map((t, i) => (
        <span key={t.kind} className="inline-flex items-center gap-1.5">
          {i > 0 && <span className="text-white/30 font-black">{t.value < 0 ? '−' : '+'}</span>}
          <TermChip kind={t.kind} value={i > 0 ? Math.abs(t.value) : t.value} />
        </span>
      ))}
    </span>
  )
}

const L10N = {
  ask:    { es: '¿Qué operación haces?', en: 'Which operation do you apply?', ca: 'Quina operació fas?' },
  noHelp: { es: 'Sigue equilibrada, pero eso no despeja la x.', en: "Still balanced, but that doesn't isolate x.", ca: 'Segueix equilibrada, però això no aïlla la x.' },
}

export default function BalanzaAlgebraica({ state, onOp, reveal, solution, history = [], l = 'es' }) {
  const solved = isSolved(state)
  const value = solvedValue(state)
  const [hint, setHint] = useState(false)

  const ops = solved || reveal ? [] : availableOps(state)

  function choose(op) {
    setHint(!op.helps)
    onOp(op)
  }

  return (
    <div className="w-full">
      <div className="flex justify-center mb-1"><Beam /></div>

      {/* Ecuación como balanza (solo visual) */}
      <div className="flex items-center justify-center gap-3 bg-[#0d1117] border border-white/10 rounded-xl px-3 py-5 mb-2">
        <Side side={state.L} />
        <span className="text-white/70 font-black text-2xl">=</span>
        <Side side={state.R} />
      </div>

      {/* Operaciones: hay que nombrar el paso, no toquetear términos */}
      {ops.length > 0 && (
        <div className="mb-2">
          <p className="text-center text-white/40 text-xs mb-1.5">{L10N.ask[l] ?? L10N.ask.es}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {ops.map(op => (
              <button key={op.id} onClick={() => choose(op)}
                className={`py-2.5 px-3 rounded-xl font-bold text-sm border transition text-center ${
                  op.op === 'div'
                    ? 'bg-[#EDAE49]/20 border-[#EDAE49]/50 text-[#EDAE49] hover:bg-[#EDAE49]/30'
                    : 'bg-white/5 border-white/15 text-white/80 hover:bg-white/10 hover:border-white/30'
                }`}>
                {op.label[l] ?? op.label.es}
              </button>
            ))}
          </div>
          {hint && (
            <p className="text-center text-amber-400/80 text-xs mt-1.5">{L10N.noHelp[l] ?? L10N.noHelp.es}</p>
          )}
        </div>
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
