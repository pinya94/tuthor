// Piezas comunes del arte de juegos: el lienzo (240×135, el 16:9 de las
// miniaturas), texto, flechas y estrellas. Todo plano y reescalable.

export function Lienzo({ children, ...props }) {
  return (
    <svg viewBox="0 0 240 135" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" {...props}>
      {children}
    </svg>
  )
}

export function T({ x, y, s = 12, c = '#F8FAFC', w = 800, a = 'middle', children, ...props }) {
  return (
    <text x={x} y={y} fontSize={s} fill={c} fontWeight={w} textAnchor={a} fontFamily="inherit" {...props}>
      {children}
    </text>
  )
}

// Punta de flecha en (x, y) apuntando en la dirección `ang` (grados).
export function Punta({ x, y, ang, c, w = 3, l = 8 }) {
  const r = (ang * Math.PI) / 180
  const a1 = r + Math.PI - 0.55
  const a2 = r + Math.PI + 0.55
  const d = `M${x + l * Math.cos(a1)} ${y + l * Math.sin(a1)}L${x} ${y}L${x + l * Math.cos(a2)} ${y + l * Math.sin(a2)}`
  return <path d={d} stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
}

// Flecha recta de (x1, y1) a (x2, y2).
export function Flecha({ x1, y1, x2, y2, c, w = 3, dash }) {
  const ang = (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI
  return (
    <g>
      <path d={`M${x1} ${y1}L${x2} ${y2}`} stroke={c} strokeWidth={w} strokeLinecap="round" strokeDasharray={dash} />
      <Punta x={x2} y={y2} ang={ang} c={c} w={w} />
    </g>
  )
}

// Flecha curva (cuadrática) de (x1, y1) a (x2, y2) con control (cx, cy).
export function FlechaCurva({ x1, y1, cx, cy, x2, y2, c, w = 3, dash }) {
  const ang = (Math.atan2(y2 - cy, x2 - cx) * 180) / Math.PI
  return (
    <g>
      <path d={`M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}`} stroke={c} strokeWidth={w} strokeLinecap="round" strokeDasharray={dash} />
      <Punta x={x2} y={y2} ang={ang} c={c} w={w} />
    </g>
  )
}

// Estrella de cinco puntas centrada en (cx, cy).
export function estrella(cx, cy, R, r = R * 0.44) {
  let d = ''
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? R : r
    const a = (-90 + i * 36) * (Math.PI / 180)
    d += `${i === 0 ? 'M' : 'L'}${(cx + rad * Math.cos(a)).toFixed(2)} ${(cy + rad * Math.sin(a)).toFixed(2)}`
  }
  return d + 'Z'
}

// Destello de cuatro puntas.
export function destello(x, y, s) {
  return `M${x} ${y - s}Q${x} ${y} ${x + s} ${y}Q${x} ${y} ${x} ${y + s}Q${x} ${y} ${x - s} ${y}Q${x} ${y} ${x} ${y - s}Z`
}

// Balón de fútbol plano.
export function Balon({ cx, cy, r }) {
  const k = r / 10
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#F8FAFC" />
      <path d={`M${cx} ${cy - 3.6 * k}L${cx + 3.4 * k} ${cy - 1.1 * k}L${cx + 2.1 * k} ${cy + 2.9 * k}L${cx - 2.1 * k} ${cy + 2.9 * k}L${cx - 3.4 * k} ${cy - 1.1 * k}Z`} fill="#1E293B" />
      <circle cx={cx} cy={cy} r={r} stroke="#CBD5E1" strokeWidth={1.2} />
    </g>
  )
}

// Lápiz tumbado: punta en (x, y), girado `ang` grados. Colores del cuerpo.
export function Lapiz({ x, y, ang, cuerpo = '#FBBF24', veta = '#F59E0B', goma = '#F472B6', largo = 44 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${ang})`}>
      <path d="M0 0L14 -6V6Z" fill="#FDE68A" />
      <path d="M0 0L5 -2.15V2.15Z" fill="#334155" />
      <rect x="14" y="-6" width={largo} height="12" fill={cuerpo} />
      <rect x="14" y="-1.5" width={largo} height="3" fill={veta} fillOpacity=".7" />
      <rect x={largo + 17} y="-6" width="12" height="12" rx="3" fill={goma} />
      <rect x={largo + 14} y="-6.5" width="6" height="13" fill="#CBD5E1" />
    </g>
  )
}
