import { DIRS } from '../lib/fuerzaNeta'

// Diagrama de fuerzas de Fuerza Neta (SVG puro). Lo comparten el juego y el
// reto diario. Si `reveal` está activo, dibuja además la fuerza neta (flecha
// ámbar) y desplaza la caja hacia la dirección resultante.
const VB = { W: 400, H: 300 }
const CX = 200, CY = 150

function forceLen(mag) { return 30 + mag * 0.78 }

// offset = desplazamiento lateral (px) para separar flechas paralelas del mismo eje.
function Arrow({ dir, len, color, width, label, offset = 0 }) {
  const d = DIRS[dir]
  const START_GAP = 22 // arranca fuera de la caja
  const rawx = d.dx, rawy = -d.dy
  const norm = Math.hypot(rawx, rawy) || 1
  const ax = rawx / norm, ay = rawy / norm
  const px = -ay, py = ax
  const sx = CX + px * offset + ax * START_GAP
  const sy = CY + py * offset + ay * START_GAP
  const ex = CX + px * offset + ax * len
  const ey = CY + py * offset + ay * len
  const ang = Math.atan2(ay, ax)
  const hl = 10
  const h1x = ex - hl * Math.cos(ang - 0.4), h1y = ey - hl * Math.sin(ang - 0.4)
  const h2x = ex - hl * Math.cos(ang + 0.4), h2y = ey - hl * Math.sin(ang + 0.4)
  const lx = CX + px * offset + ax * (len + 15)
  const ly = CY + py * offset + ay * (len + 15)
  return (
    <g>
      <line x1={sx} y1={sy} x2={ex} y2={ey} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${ex},${ey} ${h1x},${h1y} ${h2x},${h2y}`} fill={color} />
      {label != null && (
        <text x={lx} y={ly + 4} textAnchor="middle" fontSize="13" fontWeight="bold" fill={color}
          style={{ userSelect: 'none', paintOrder: 'stroke' }} stroke="#0d1117" strokeWidth={3}>{label}</text>
      )}
    </g>
  )
}

// Las fuerzas en la misma dirección se reparten en paralelo para no solaparse.
function forceOffsets(forces) {
  const groups = {}
  forces.forEach((f, i) => { (groups[f.dir] = groups[f.dir] || []).push(i) })
  const off = new Array(forces.length).fill(0)
  const SPREAD = 22
  for (const idxs of Object.values(groups)) {
    idxs.forEach((fi, k) => { off[fi] = (k - (idxs.length - 1) / 2) * SPREAD })
  }
  return off
}

export default function ForceDiagram({ round, reveal }) {
  const answer = round.answer
  const off = forceOffsets(round.forces)
  const nd = DIRS[answer]
  const boxShift = reveal ? { x: nd.dx * 26, y: -nd.dy * 26 } : { x: 0, y: 0 }
  return (
    <svg viewBox={`0 0 ${VB.W} ${VB.H}`} width="100%" style={{ display: 'block' }}>
      {/* ejes guía */}
      <line x1={0} y1={CY} x2={VB.W} y2={CY} stroke="#ffffff10" strokeWidth={1} />
      <line x1={CX} y1={0} x2={CX} y2={VB.H} stroke="#ffffff10" strokeWidth={1} />

      {/* fuerzas (flechas paralelas separadas si comparten dirección) */}
      {round.forces.map((f, i) => (
        <Arrow key={i} dir={f.dir} len={forceLen(f.mag)} color="#7dd3fc" width={4}
          label={`${f.mag} N`} offset={off[i]} />
      ))}

      {/* fuerza neta (al revelar) */}
      {reveal && answer !== 'STILL' && (
        <Arrow dir={answer} len={forceLen(Math.hypot(round.netX, round.netY))} color="#EDAE49" width={5} label={null} />
      )}

      {/* caja */}
      <g style={{ transform: `translate(${boxShift.x}px, ${boxShift.y}px)`, transition: 'transform 0.5s' }}>
        <text x={CX} y={CY + 10} textAnchor="middle" fontSize="30" style={{ userSelect: 'none' }}>📦</text>
      </g>
    </svg>
  )
}
