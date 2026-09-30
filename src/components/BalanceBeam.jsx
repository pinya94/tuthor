import { torque } from '../lib/balanza'

// Balanza en SVG (determinista). Dibuja los pesos de la izquierda a sus muescas,
// una regla de distancias, el eje y la barra. Si `placed` (muesca) está puesto,
// coloca el peso del jugador a la derecha e inclina la barra según qué lado pesa
// más (cosmético). Si no, muestra muescas clicables a la derecha (onPick).
//
// Pensada para el móvil: pesas de hierro con asa (antes cuadraditos de 22
// unidades), barra de madera con sus marcas, poco aire alrededor y, para
// elegir muesca, toda la columna encima de la marca es tocable, no solo un
// circulito.
const VB = { W: 400, H: 200 }
const CX = 200, BEAM_Y = 104, GROUND_Y = 168

const COL = {
  left: '#7dd3fc',   // pesos dados (izquierda)
  player: '#EDAE49', // peso del jugador (derecha)
}

function Pesa({ x, y, w, color, s, fantasma = false }) {
  const top = y - s
  const cuerpo = `M${x - s / 2 + 4} ${top + 6} H${x + s / 2 - 4} L${x + s / 2} ${y} H${x - s / 2} Z`
  return (
    <g>
      <path d={`M${x - s / 5} ${top + 7} Q${x} ${top - s * 0.28} ${x + s / 5} ${top + 7}`}
        stroke={fantasma ? color : '#475569'} strokeWidth={fantasma ? 1.5 : 3.5} fill="none"
        strokeDasharray={fantasma ? '3 3' : undefined} opacity={fantasma ? 0.7 : 1} />
      <path d={cuerpo} fill={fantasma ? `${color}18` : color} stroke={fantasma ? color : 'none'}
        strokeWidth={1.5} strokeDasharray={fantasma ? '3 3' : undefined} strokeLinejoin="round" />
      {!fantasma && <path d={`M${x - s / 2 + 6} ${top + 10} H${x - s / 2 + 12}`} stroke="#ffffff90" strokeWidth={2} strokeLinecap="round" />}
      <text x={x} y={y - s * 0.3} textAnchor="middle" fontSize={s * 0.5} fontWeight="900"
        fill={fantasma ? color : '#0d1117'} style={{ userSelect: 'none' }}>{w}</text>
    </g>
  )
}

export default function BalanceBeam({ round, placed, onPick }) {
  const { left, playerWeight, maxNotch } = round
  const spacing = Math.min(32, 170 / maxNotch)
  const notchX = (side, d) => CX + (side === 'R' ? 1 : -1) * d * spacing
  const halfLen = maxNotch * spacing + 14
  const s = Math.min(30, spacing * 0.92)

  const leftTorque = torque(left)
  const rightTorque = placed ? playerWeight * placed : 0
  let tilt = 0
  if (placed) tilt = rightTorque === leftTorque ? 0 : rightTorque > leftTorque ? 10 : -10

  const ticks = Array.from({ length: maxNotch }, (_, i) => i + 1)

  return (
    <svg viewBox={`20 0 ${VB.W - 40} ${VB.H}`} width="100%" style={{ display: "block", touchAction: "manipulation" }}>
      {/* Regla de distancias (fija, no rota) */}
      <line x1={CX - halfLen + 10} y1={GROUND_Y + 12} x2={CX + halfLen - 10} y2={GROUND_Y + 12} stroke="#ffffff18" strokeWidth={1} />
      {ticks.map(d => ['L', 'R'].map(side => {
        const x = notchX(side, d)
        return (
          <g key={`${side}${d}`}>
            <line x1={x} y1={GROUND_Y + 8} x2={x} y2={GROUND_Y + 16} stroke="#ffffff35" strokeWidth={1} />
            <text x={x} y={GROUND_Y + 28} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff55"
              style={{ userSelect: 'none' }}>{d}</text>
          </g>
        )
      }))}
      <text x={CX} y={GROUND_Y + 28} textAnchor="middle" fontSize="11" fontWeight="700" fill="#ffffff35" style={{ userSelect: 'none' }}>0</text>

      {/* Eje (fijo) */}
      <polygon points={`${CX},${BEAM_Y + 4} ${CX - 20},${GROUND_Y} ${CX + 20},${GROUND_Y}`} fill="#64748b" />
      <polygon points={`${CX},${BEAM_Y + 4} ${CX - 20},${GROUND_Y} ${CX - 6},${GROUND_Y}`} fill="#94a3b8" opacity="0.5" />
      <rect x={CX - 32} y={GROUND_Y - 2} width={64} height={7} rx={3.5} fill="#475569" />

      {/* Barra + pesos (rotan juntos) */}
      <g style={{ transform: `rotate(${tilt}deg)`, transformOrigin: `${CX}px ${BEAM_Y}px`, transition: 'transform 0.6s ease-out' }}>
        <rect x={CX - halfLen} y={BEAM_Y - 5} width={halfLen * 2} height={10} rx={5} fill="#b45309" />
        <rect x={CX - halfLen + 3} y={BEAM_Y - 4} width={halfLen * 2 - 6} height={3} rx={1.5} fill="#f59e0b" opacity="0.6" />
        {ticks.map(d => ['L', 'R'].map(side => (
          <line key={`m${side}${d}`} x1={notchX(side, d)} y1={BEAM_Y - 2} x2={notchX(side, d)} y2={BEAM_Y + 5} stroke="#451a03" strokeWidth={1.5} />
        )))}
        <circle cx={CX} cy={BEAM_Y} r={4} fill="#451a03" />
        {left.map((it, i) => (
          <Pesa key={`l${i}`} x={notchX('L', it.d)} y={BEAM_Y - 5} w={it.w} color={COL.left} s={s} />
        ))}
        {placed && (
          <Pesa x={notchX('R', placed)} y={BEAM_Y - 5} w={playerWeight} color={COL.player} s={s} />
        )}
      </g>

      {/* Muescas elegibles a la derecha: una pesa fantasma con la distancia,
          y toda la columna encima es tocable. */}
      {!placed && onPick && round.options.map(d => {
        const x = notchX('R', d)
        return (
          <g key={`pick${d}`} onClick={() => onPick(d)} style={{ cursor: 'pointer' }}>
            <rect x={x - spacing / 2} y={BEAM_Y - 70} width={spacing} height={80} fill="transparent" />
            <Pesa x={x} y={BEAM_Y - 5} w={d} color="#EDAE49" s={s} fantasma />
          </g>
        )
      })}
    </svg>
  )
}
