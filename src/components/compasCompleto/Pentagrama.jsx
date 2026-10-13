// Figuras y silencios dibujados en un pentagrama. Las notas van todas en la
// línea central (si): aquí importa la duración, no la altura. Los silencios
// van en su sitio de siempre: el de redonda cuelga de la cuarta línea y el de
// blanca se apoya en la tercera.
const L = [36, 44, 52, 60, 68] // líneas del pentagrama (de arriba abajo)
const Y = 52 // línea central

function Nota({ x, n, color = '#F8FAFC' }) {
  const hueca = n.f === 'redonda' || n.f === 'blanca'
  const plica = n.f !== 'redonda'
  const corchetes = n.f === 'corchea' ? 1 : n.f === 'semicorchea' ? 2 : 0
  return (
    <g>
      <ellipse cx={x} cy={Y} rx={n.f === 'redonda' ? 8 : 6.5} ry="4.8" transform={`rotate(-20 ${x} ${Y})`}
        fill={hueca ? 'none' : color} stroke={color} strokeWidth={hueca ? 2.2 : 1} />
      {plica && <line x1={x + 6} y1={Y - 1} x2={x + 6} y2={Y - 32} stroke={color} strokeWidth="1.8" />}
      {Array.from({ length: corchetes }, (_, i) => (
        <path key={i} d={`M${x + 6} ${Y - 32 + i * 7} q9 6 7 17`} stroke={color} strokeWidth="2.4" fill="none" />
      ))}
      {n.puntillo && <circle cx={x + 13} cy={Y - 4} r="2" fill={color} />}
    </g>
  )
}

function Silencio({ x, n, color = '#F8FAFC' }) {
  const forma = n.f === 'redonda' ? <rect x={x - 7} y={L[1]} width="14" height="5" fill={color} />
    : n.f === 'blanca' ? <rect x={x - 7} y={L[2] - 5} width="14" height="5" fill={color} />
    : n.f === 'negra' ? <path d={`M${x - 3} ${L[0] + 2} l6 7 l-6 6 l6 7 q-8 -2 -3 9`} stroke={color} strokeWidth="2.6" fill="none" strokeLinejoin="round" />
    : (
    <g>
      <circle cx={x - 3} cy={L[1] + 3} r="2.6" fill={color} />
      <path d={`M${x - 3} ${L[1] + 5} q5 2 8 -3 l-7 22`} stroke={color} strokeWidth="2" fill="none" />
      {n.f === 'semicorchea' && <circle cx={x - 5} cy={L[2] + 3} r="2.6" fill={color} />}
    </g>
  )
  return (
    <g>
      {forma}
      {n.puntillo && <circle cx={x + 10} cy={L[1] + 4} r="2" fill={color} />}
    </g>
  )
}

export function Figura({ n, x, color }) {
  return n.silencio ? <Silencio x={x} n={n} color={color} /> : <Nota x={x} n={n} color={color} />
}

// notas: [{f, puntillo, silencio} | '|'], hueco: índice del hueco (o -1)
export default function Pentagrama({ notas, compas, hueco = -1, revelado = false, final = true, className = "w-full block" }) {
  const paso = 34
  const x0 = compas ? 46 : 30
  // Posiciones calculadas antes (no se puede reasignar dentro del map).
  const pos = []
  let cursor = x0
  for (const n of notas) { pos.push(cursor); cursor += n === '|' ? 12 : paso }
  const ancho = cursor + 6
  const piezas = notas.map((n, i) => {
    if (n === '|') return <line key={i} x1={pos[i] - 8} y1={L[0]} x2={pos[i] - 8} y2={L[4]} stroke="#CBD5E1" strokeWidth="1.5" />
    const xi = pos[i]
    if (i === hueco && !revelado) {
      return (
        <g key={i}>
          <rect x={xi - 11} y={L[0] - 10} width="24" height={L[4] - L[0] + 20} rx="5" fill="none" stroke="#FBBF24" strokeWidth="2" strokeDasharray="4 3" />
          <text x={xi + 1} y={Y + 5} textAnchor="middle" fontSize="16" fontWeight="900" fill="#FBBF24">?</text>
        </g>
      )
    }
    return <Figura key={i} n={n} x={xi} color={i === hueco ? '#86EFAC' : '#F8FAFC'} />
  })
  return (
    <svg viewBox={`0 0 ${Math.max(ancho, 120)} 90`} className={className} style={{ maxWidth: Math.max(ancho, 120) * 1.6 }} aria-hidden="true">
      {L.map(y => <line key={y} x1="6" y1={y} x2={Math.max(ancho, 120) - 4} y2={y} stroke="#64748B" strokeWidth="1" />)}
      {compas && (
        <g fontSize="15" fontWeight="900" fill="#F8FAFC" textAnchor="middle">
          <text x="22" y={L[1] + 3}>{compas.split('/')[0]}</text>
          <text x="22" y={L[3] + 3}>{compas.split('/')[1]}</text>
        </g>
      )}
      {final && <line x1={ancho - 6} y1={L[0]} x2={ancho - 6} y2={L[4]} stroke="#CBD5E1" strokeWidth="2.5" />}
      {piezas}
    </svg>
  )
}
