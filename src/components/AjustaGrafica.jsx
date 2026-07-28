import { VIEW, evalFn, evalWith, fnParts, matchInfo } from '../lib/funciones'

// Plano cartesiano en SVG. Dibuja la función OBJETIVO (punteada, ámbar) y la
// curva del jugador (según sus parámetros). Debajo, los steppers ▲▼ de cada
// parámetro y la ecuación en vivo. La cuadrícula/ejes son fijos; solo cambian
// las curvas. Todo determinista: la del jugador se calcula desde sus params.

const SIZE = 300
const UNIT = SIZE / 2 / (VIEW + 0.5)      // px por unidad
const CX = SIZE / 2, CY = SIZE / 2
const toX = x => CX + x * UNIT
const toY = y => CY - y * UNIT

const COL = {
  target: '#EDAE49',  // objetivo (lo que hay que igualar)
  player: '#7dd3fc',  // curva del jugador
  ok:     '#22c55e',  // cuando encaja
}

// Muestrea la curva en el rango visible y devuelve el atributo `points`.
function curvePoints(fn) {
  const pts = []
  for (let px = -VIEW - 0.5; px <= VIEW + 0.5; px += 0.25) {
    pts.push(`${toX(px).toFixed(1)},${toY(fn(px)).toFixed(1)}`)
  }
  return pts.join(' ')
}

function Grid() {
  const lines = []
  for (let i = -VIEW; i <= VIEW; i++) {
    lines.push(<line key={`v${i}`} x1={toX(i)} y1={0} x2={toX(i)} y2={SIZE} stroke="#ffffff10" strokeWidth={1} />)
    lines.push(<line key={`h${i}`} x1={0} y1={toY(i)} x2={SIZE} y2={toY(i)} stroke="#ffffff10" strokeWidth={1} />)
  }
  return (
    <g>
      {lines}
      <line x1={0} y1={toY(0)} x2={SIZE} y2={toY(0)} stroke="#ffffff55" strokeWidth={1.5} />
      <line x1={toX(0)} y1={0} x2={toX(0)} y2={SIZE} stroke="#ffffff55" strokeWidth={1.5} />
      {[-6, -4, -2, 2, 4, 6].map(n => (
        <text key={`tx${n}`} x={toX(n)} y={toY(0) + 11} textAnchor="middle" fontSize="7" fill="#ffffff40">{n}</text>
      ))}
      {[-6, -4, -2, 2, 4, 6].map(n => (
        <text key={`ty${n}`} x={toX(0) - 4} y={toY(n) + 3} textAnchor="end" fontSize="7" fill="#ffffff40">{n}</text>
      ))}
    </g>
  )
}

function Stepper({ value, min, max, color, onStep, disabled }) {
  const btn = 'w-7 h-6 flex items-center justify-center rounded-md text-white/50 hover:text-white hover:bg-white/10 disabled:opacity-25 disabled:hover:bg-transparent transition select-none'
  return (
    <span className="inline-flex items-center gap-0.5">
      <button type="button" className={btn} disabled={disabled || value <= min} onClick={() => onStep(-1)} aria-label="-1">▼</button>
      <span className="text-xl font-black leading-none w-7 text-center tabular-nums" style={{ color }}>{value}</span>
      <button type="button" className={btn} disabled={disabled || value >= max} onClick={() => onStep(1)} aria-label="+1">▲</button>
    </span>
  )
}

export default function AjustaGrafica({ round, params, onStep, reveal, l = 'es' }) {
  const solved = round.controls.every(c => params[c.key] === round.target[c.key])
  const playerCol = reveal ? (solved ? COL.ok : COL.player) : COL.player
  const parts = fnParts(round.kind, params)
  const matches = matchInfo(round, params)

  return (
    <div className="w-full">
      <div className="flex justify-center mb-3">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} width="100%" style={{ maxWidth: 320, display: 'block' }}
          className="rounded-xl border border-white/10 bg-[#0d1117]">
          <Grid />
          {/* Objetivo (punteada) */}
          <polyline points={curvePoints(x => evalFn(round, x))} fill="none"
            stroke={COL.target} strokeWidth={2} strokeDasharray="5 4" strokeLinecap="round" opacity={0.9} />
          {/* Jugador */}
          <polyline points={curvePoints(x => evalWith(round, params, x))} fill="none"
            stroke={playerCol} strokeWidth={2.5} strokeLinecap="round"
            style={{ transition: 'stroke 0.2s' }} />
        </svg>
      </div>

      {/* Ecuación en vivo del jugador */}
      <p className="text-center text-lg font-black mb-3" style={{ color: playerCol }}>
        {parts.map((s, i) => (
          <span key={i}>{s.text}{s.sup && <sup className="text-[0.7em]">{s.sup}</sup>}</span>
        ))}
      </p>

      {/* Controles: un stepper por parámetro */}
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2">
        {round.controls.map((c, i) => (
          <div key={c.key} className="flex flex-col items-center">
            <span className={`text-[10px] uppercase tracking-widest font-semibold mb-0.5 ${
              reveal ? (matches[i].ok ? 'text-green-400/70' : 'text-red-400/70') : 'text-white/40'}`}>
              {c.label[l] ?? c.label.es}{reveal && !matches[i].ok ? ` · ✓ ${round.target[c.key]}` : ''}
            </span>
            <Stepper value={params[c.key]} min={c.min} max={c.max} color={COL.player}
              onStep={(d) => onStep(c.key, d)} disabled={reveal} />
          </div>
        ))}
      </div>
    </div>
  )
}
