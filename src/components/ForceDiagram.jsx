import { DIRS } from '../lib/fuerzaNeta'

// Diagrama de fuerzas de Fuerza Neta (SVG puro). Lo comparten el juego y el
// reto diario. Si `reveal` está activo, dibuja además la fuerza neta (flecha
// ámbar) y desplaza la caja hacia la dirección resultante.
const VB = { W: 400, H: 300 }
const CX = 200, CY = 150

// Longitud desde el centro: la caja ocupa 30 y cada newton suma 1,1 (10 N
// ya se ve como flecha, no solo como punta). Tope para que la neta no se
// salga del lienzo.
function forceLen(mag) { return Math.min(40 + mag * 1.1, 122) }

// offset = desplazamiento lateral (px) para separar flechas paralelas del mismo eje.
function Arrow({ dir, len, color, width, label, offset = 0 }) {
  const d = DIRS[dir]
  const START_GAP = 30 // arranca fuera de la caja
  const rawx = d.dx, rawy = -d.dy
  const norm = Math.hypot(rawx, rawy) || 1
  const ax = rawx / norm, ay = rawy / norm
  const px = -ay, py = ax
  const sx = CX + px * offset + ax * START_GAP
  const sy = CY + py * offset + ay * START_GAP
  const ex = CX + px * offset + ax * len
  const ey = CY + py * offset + ay * len
  const ang = Math.atan2(ay, ax)
  const hl = 15
  const h1x = ex - hl * Math.cos(ang - 0.45), h1y = ey - hl * Math.sin(ang - 0.45)
  const h2x = ex - hl * Math.cos(ang + 0.45), h2y = ey - hl * Math.sin(ang + 0.45)
  const lx = CX + px * offset + ax * (len + 20)
  const ly = CY + py * offset + ay * (len + 20)
  // la línea acaba donde empieza la punta, para que la punta quede nítida
  const lex = ex - ax * hl * 0.8, ley = ey - ay * hl * 0.8
  return (
    <g>
      <line x1={sx} y1={sy} x2={lex} y2={ley} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${ex},${ey} ${h1x},${h1y} ${h2x},${h2y}`} fill={color} strokeLinejoin="round" stroke={color} strokeWidth={2} />
      {label != null && (
        <text x={lx} y={ly + 5} textAnchor="middle" fontSize="16" fontWeight="900" fill={color}
          style={{ userSelect: 'none', paintOrder: 'stroke' }} stroke="#141b2e" strokeWidth={4}>{label}</text>
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
      {/* ejes guía y cuadrícula de puntos */}
      <defs>
        <pattern id="fn-puntos" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill="#ffffff14" />
        </pattern>
      </defs>
      <rect width={VB.W} height={VB.H} fill="url(#fn-puntos)" />
      <line x1={0} y1={CY} x2={VB.W} y2={CY} stroke="#ffffff18" strokeWidth={1} strokeDasharray="4 4" />
      <line x1={CX} y1={0} x2={CX} y2={VB.H} stroke="#ffffff18" strokeWidth={1} strokeDasharray="4 4" />

      {/* fuerzas (flechas paralelas separadas si comparten dirección) */}
      {round.forces.map((f, i) => (
        <Arrow key={i} dir={f.dir} len={forceLen(f.mag)} color="#7dd3fc" width={6}
          label={`${f.mag} N`} offset={off[i]} />
      ))}

      {/* fuerza neta (al revelar) */}
      {reveal && answer !== 'STILL' && (
        <Arrow dir={answer} len={forceLen(Math.hypot(round.netX, round.netY))} color="#EDAE49" width={7} label={null} />
      )}

      {/* caja */}
      <g style={{ transform: `translate(${boxShift.x}px, ${boxShift.y}px)`, transition: 'transform 0.5s' }}>
        {/* Caja de madera dibujada (antes el emoji 📦, diminuto en un móvil) */}
        <rect x={CX - 22} y={CY - 22} width={44} height={44} rx={4} fill="#b45309" stroke="#78350f" strokeWidth={2.5} />
        <path d={`M${CX - 22} ${CY - 8}h44M${CX - 22} ${CY + 8}h44`} stroke="#78350f" strokeWidth={1.5} />
        <path d={`M${CX - 19} ${CY - 19}L${CX + 19} ${CY + 19}`} stroke="#92400e" strokeWidth={5} strokeLinecap="round" />
        <rect x={CX - 22} y={CY - 22} width={44} height={44} rx={4} fill="none" stroke="#fbbf24" strokeOpacity={0.35} strokeWidth={1} />
      </g>
    </svg>
  )
}
