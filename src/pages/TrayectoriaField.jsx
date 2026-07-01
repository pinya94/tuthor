// Shared SVG field components for Trayectoria (roguelike) and TrayectoriaExamen

export const VIEW = { xMin: -5, xMax: 6, yMin: -5, yMax: 6 }
export const W = 440
export const H = 340
export const ANIM_DURATION = 1600

export function toSVG(x, y) {
  const px = ((x - VIEW.xMin) / (VIEW.xMax - VIEW.xMin)) * W
  const py = H - ((y - VIEW.yMin) / (VIEW.yMax - VIEW.yMin)) * H
  return [px, py]
}

export function GridLines() {
  const xs = [], ys = []
  for (let x = Math.ceil(VIEW.xMin); x <= VIEW.xMax; x++) xs.push(x)
  for (let y = Math.ceil(VIEW.yMin); y <= VIEW.yMax; y++) ys.push(y)
  return (
    <g>
      {xs.map(x => { const [px] = toSVG(x, 0); return <line key={`vx${x}`} x1={px} y1={0} x2={px} y2={H} stroke={x === 0 ? '#ffffff55' : '#ffffff18'} strokeWidth={x === 0 ? 1.5 : 0.5} /> })}
      {ys.map(y => { const [, py] = toSVG(0, y); return <line key={`hy${y}`} x1={0} y1={py} x2={W} y2={py} stroke={y === 0 ? '#ffffff55' : '#ffffff18'} strokeWidth={y === 0 ? 1.5 : 0.5} /> })}
      {xs.map(x => { const [px, py0] = toSVG(x, 0); return x !== 0 && <text key={`lx${x}`} x={px} y={py0 + 12} textAnchor="middle" fontSize="9" fill="#ffffff40">{x}</text> })}
      {ys.map(y => { const [px0, py] = toSVG(0, y); return y !== 0 && <text key={`ly${y}`} x={px0 - 6} y={py + 3} textAnchor="end" fontSize="9" fill="#ffffff40">{y}</text> })}
    </g>
  )
}

export function Goal({ goal }) {
  const { x, yMin, yMax } = goal
  const [px, pyTop] = toSVG(x, yMax)
  const [, pyBot] = toSVG(x, yMin)
  const depth = 12
  const netN = 5
  return (
    <g>
      <rect x={px} y={pyTop} width={depth} height={pyBot - pyTop} fill="#22c55e12" />
      {Array.from({ length: netN }).map((_, i) => {
        const nx = px + (depth / (netN + 1)) * (i + 1)
        return <line key={`nv${i}`} x1={nx} y1={pyTop} x2={nx} y2={pyBot} stroke="#22c55e35" strokeWidth={0.8} />
      })}
      {Array.from({ length: netN }).map((_, i) => {
        const ny = pyTop + ((pyBot - pyTop) / (netN + 1)) * (i + 1)
        return <line key={`nh${i}`} x1={px} y1={ny} x2={px + depth} y2={ny} stroke="#22c55e35" strokeWidth={0.8} />
      })}
      <line x1={px + depth} y1={pyTop} x2={px + depth} y2={pyBot} stroke="#22c55e" strokeWidth={2} />
      <line x1={px} y1={pyTop} x2={px + depth} y2={pyTop} stroke="#22c55e" strokeWidth={3} />
      <line x1={px} y1={pyBot} x2={px + depth} y2={pyBot} stroke="#22c55e" strokeWidth={3} />
      <line x1={px} y1={pyTop} x2={px} y2={pyBot} stroke="#ffffff" strokeWidth={3} />
    </g>
  )
}

export function Barrier({ x, y }) {
  const [px, py] = toSVG(x, y)
  return <text x={px} y={py + 6} fontSize="20" textAnchor="middle" style={{ userSelect: 'none' }}>🧍</text>
}

export function Ball({ x, y, trail = [] }) {
  const [px, py] = toSVG(x, y)
  if (px < -20 || px > W + 20 || py < -20 || py > H + 20) return null
  return (
    <g>
      {trail.map(([tx, ty], i) => {
        if (tx < 0 || tx > W || ty < 0 || ty > H) return null
        return <circle key={i} cx={tx} cy={ty} r={4} fill="#EDAE49" opacity={(i / trail.length) * 0.6} />
      })}
      <circle cx={px} cy={py} r={7} fill="#EDAE49" />
      <circle cx={px - 2} cy={py - 2} r={2} fill="#ffffff60" />
    </g>
  )
}

export function FnCurve({ fn, color, xStart = VIEW.xMin, xEnd = VIEW.xMax }) {
  const segments = []
  let current = []
  const steps = 300
  for (let i = 0; i <= steps; i++) {
    const x = xStart + (i / steps) * (xEnd - xStart)
    let y
    try { y = fn(x) } catch { y = null }
    if (y !== null && isFinite(y) && y >= VIEW.yMin - 0.5 && y <= VIEW.yMax + 0.5) {
      const [px, py] = toSVG(x, y)
      current.push(`${px.toFixed(1)},${py.toFixed(1)}`)
    } else {
      if (current.length > 1) segments.push(current.join(' '))
      current = []
    }
  }
  if (current.length > 1) segments.push(current.join(' '))
  return <>{segments.map((pts, i) => <polyline key={i} points={pts} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />)}</>
}

// One color per option index — dispersed starts mean no grouping needed
export const OPT_COLORS = ['#EDAE49', '#22d3ee', '#a78bfa', '#f472b6']

export function computeOptionColors(question) {
  return question?.options.map((_, i) => OPT_COLORS[i % OPT_COLORS.length]) ?? [...OPT_COLORS]
}

// Starting balls — each option has its own startX, shown at dispersed positions
export function StartingBalls({ question, optColors }) {
  return question.options.map((opt, i) => {
    const sx = opt.startX
    let y; try { y = opt.fn(sx) } catch { y = null }
    if (y === null || !isFinite(y)) return null
    const clampedY = Math.max(VIEW.yMin, Math.min(VIEW.yMax, y))
    const oob = clampedY !== y
    const [px, py] = toSVG(sx, clampedY)
    const arrowDir = y < VIEW.yMin ? '▼' : '▲'
    return (
      <g key={i}>
        <circle cx={px} cy={py} r={8} fill={optColors[i]} opacity={oob ? 0.55 : 0.85} />
        <text x={px} y={py + 4} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#000" style={{ userSelect: 'none' }}>
          {String.fromCharCode(65 + i)}
        </text>
        {oob && <text x={px + 11} y={py + 4} fontSize="10" fill={optColors[i]} style={{ userSelect: 'none' }}>{arrowDir}</text>}
      </g>
    )
  })
}
