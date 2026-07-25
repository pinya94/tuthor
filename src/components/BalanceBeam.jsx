import { torque } from '../lib/balanza'

// Balanza en SVG (determinista). Dibuja los pesos de la izquierda a sus muescas,
// una regla de distancias, el eje y la barra. Si `placed` (muesca) está puesto,
// coloca el peso del jugador a la derecha e inclina la barra según qué lado pesa
// más (cosmético). Si no, muestra muescas clicables a la derecha (onPick).
const VB = { W: 400, H: 240 }
const CX = 200, BEAM_Y = 95, GROUND_Y = 178

const COL = {
  left: '#7dd3fc',   // pesos dados (izquierda)
  player: '#EDAE49', // peso del jugador (derecha)
  beam: '#94a3b8',
}

function Weight({ x, y, w, color }) {
  const s = 22
  return (
    <g>
      <rect x={x - s / 2} y={y - s} width={s} height={s} rx={3} fill={color} />
      <text x={x} y={y - s / 2 + 4} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0d1117"
        style={{ userSelect: 'none' }}>{w}</text>
    </g>
  )
}

export default function BalanceBeam({ round, placed, onPick }) {
  const { left, playerWeight, maxNotch } = round
  const spacing = Math.min(30, 165 / maxNotch)
  const notchX = (side, d) => CX + (side === 'R' ? 1 : -1) * d * spacing
  const halfLen = maxNotch * spacing + 14

  const leftTorque = torque(left)
  const rightTorque = placed ? playerWeight * placed : 0
  let tilt = 0
  if (placed) tilt = rightTorque === leftTorque ? 0 : rightTorque > leftTorque ? 12 : -12

  return (
    <svg viewBox={`0 0 ${VB.W} ${VB.H}`} width="100%" style={{ display: 'block' }}>
      {/* Regla de distancias (fija, no rota) */}
      {Array.from({ length: maxNotch }, (_, i) => i + 1).map(d => (
        ['L', 'R'].map(side => {
          const x = notchX(side, d)
          return (
            <g key={`${side}${d}`}>
              <line x1={x} y1={GROUND_Y - 4} x2={x} y2={GROUND_Y + 2} stroke="#ffffff25" strokeWidth={1} />
              <text x={x} y={GROUND_Y + 14} textAnchor="middle" fontSize="9" fill="#ffffff40"
                style={{ userSelect: 'none' }}>{d}</text>
            </g>
          )
        })
      ))}
      <text x={CX} y={GROUND_Y + 14} textAnchor="middle" fontSize="9" fill="#ffffff30" style={{ userSelect: 'none' }}>0</text>

      {/* Barra + pesos (rotan juntos) */}
      <g style={{ transform: `rotate(${tilt}deg)`, transformOrigin: `${CX}px ${BEAM_Y}px`, transition: 'transform 0.6s ease-out' }}>
        <rect x={CX - halfLen} y={BEAM_Y - 4} width={halfLen * 2} height={8} rx={4} fill={COL.beam} />
        {left.map((it, i) => (
          <Weight key={`l${i}`} x={notchX('L', it.d)} y={BEAM_Y - 4} w={it.w} color={COL.left} />
        ))}
        {placed && (
          <Weight x={notchX('R', placed)} y={BEAM_Y - 4} w={playerWeight} color={COL.player} />
        )}
      </g>

      {/* Eje (fijo) */}
      <polygon points={`${CX},${BEAM_Y + 2} ${CX - 16},${GROUND_Y} ${CX + 16},${GROUND_Y}`} fill="#64748b" />
      <rect x={CX - 26} y={GROUND_Y} width={52} height={6} rx={3} fill="#475569" />

      {/* Muescas clicables a la derecha (antes de colocar) */}
      {!placed && onPick && round.options.map(d => {
        const x = notchX('R', d)
        return (
          <g key={`pick${d}`} onClick={() => onPick(d)} style={{ cursor: 'pointer' }}>
            <circle cx={x} cy={BEAM_Y - 15} r={13} fill="#EDAE4915" stroke="#EDAE4970" strokeWidth={1.5} strokeDasharray="3 3" />
            <text x={x} y={BEAM_Y - 11} textAnchor="middle" fontSize="10" fill="#EDAE49aa" style={{ userSelect: 'none' }}>{d}</text>
          </g>
        )
      })}
    </svg>
  )
}
