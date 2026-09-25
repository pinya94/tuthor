import { formatNum } from '../lib/redondeo'

// Recta numérica: el valor cae entre sus dos redondos vecinos (abajo/arriba),
// con la marca del medio (frontera del 5). Al revelar, resalta el más cercano.
export function RectaRedondeo({ ronda, l = 'es', revealNearest = null, className = '' }) {
  const { valor, valorStr, abajo, arriba, decimales } = ronda
  const f = arriba - abajo
  const frac = f > 0 ? Math.min(1, Math.max(0, (valor - abajo) / f)) : 0.5
  const X0 = 34, X1 = 326, Y = 74
  const mx = X0 + frac * (X1 - X0)
  const midX = (X0 + X1) / 2

  const nearIsAbajo = revealNearest != null && Math.abs(revealNearest - abajo) < Math.abs(revealNearest - arriba)
  const nearIsArriba = revealNearest != null && !nearIsAbajo
  const colAbajo = nearIsAbajo ? '#22c55e' : revealNearest != null ? '#ffffff40' : '#EDAE49'
  const colArriba = nearIsArriba ? '#22c55e' : revealNearest != null ? '#ffffff40' : '#EDAE49'
  const colMark = revealNearest != null ? '#22c55e' : '#38bdf8'

  return (
    <svg viewBox="0 0 360 118" className={className} role="img" aria-hidden="true">
      {/* línea */}
      <line x1={X0} y1={Y} x2={X1} y2={Y} stroke="#ffffff30" strokeWidth="3" strokeLinecap="round" />
      {/* marca del medio (frontera) */}
      <line x1={midX} y1={Y - 9} x2={midX} y2={Y + 9} stroke="#ffffff25" strokeWidth="2" strokeDasharray="3 3" />
      {/* topes redondos */}
      {[[X0, abajo, colAbajo], [X1, arriba, colArriba]].map(([x, v, col], i) => (
        <g key={i}>
          <line x1={x} y1={Y - 11} x2={x} y2={Y + 11} stroke={col} strokeWidth="3" strokeLinecap="round" />
          <text x={x} y={Y + 34} textAnchor="middle" fontSize="17" fontWeight="800" fill={col}>{formatNum(v, l, decimales)}</text>
        </g>
      ))}
      {/* marcador del valor */}
      <circle cx={mx} cy={Y} r="7" fill={colMark} />
      <path d={`M ${mx} ${Y - 12} l -6 -9 l 12 0 z`} fill={colMark} />
      <text x={mx} y={Y - 26} textAnchor="middle" fontSize="18" fontWeight="900" fill="#ffffff">{formatNum(valor, l, decimales)}</text>
    </svg>
  )
}
