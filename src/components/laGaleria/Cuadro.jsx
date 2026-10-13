// Cuadros dibujados «al estilo de» cada movimiento. No copian ninguna obra:
// cada uno exagera el rasgo que distingue al estilo de su vecino (el fondo
// dorado del gótico, el punto de fuga del Renacimiento, el claroscuro del
// Barroco, las pinceladas del impresionismo, los planos del cubismo…). La
// semilla cambia colores y posiciones para que no salga siempre el mismo.

function azar(semilla) {
  let a = semilla >>> 0
  return () => {
    a = (a + 0x6D2B79F5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const de = (r, xs) => xs[Math.floor(r() * xs.length)]

function Gotico({ r }) {
  const manto = de(r, ['#1D4ED8', '#B91C1C', '#065F46'])
  return (
    <g>
      <rect width="160" height="120" fill="#C99A2E" />
      {Array.from({ length: 8 }, (_, i) => <line key={i} x1={i * 22} y1="0" x2={i * 22 + 10} y2="120" stroke="#E5B94A" strokeWidth="1" opacity="0.5" />)}
      <path d="M50 120 V40 Q80 8 110 40 V120 Z" fill="#B8862A" stroke="#8A5A12" strokeWidth="2" />
      <circle cx="80" cy="34" r="13" fill="#F4D36B" stroke="#8A5A12" strokeWidth="1.5" />
      <ellipse cx="80" cy="36" rx="7" ry="9" fill="#F3D9C0" />
      <path d="M66 48 Q80 44 94 48 L100 116 H60 Z" fill={manto} />
      <path d="M74 48 L80 112 L86 48" stroke="#F4D36B" strokeWidth="1.5" fill="none" />
      {/* figuras pequeñas a los lados: jerarquía por tamaño */}
      {[24, 136].map(x => (
        <g key={x}>
          <circle cx={x} cy="80" r="6" fill="#F4D36B" />
          <ellipse cx={x} cy="81" rx="3.5" ry="4.5" fill="#F3D9C0" />
          <path d={`M${x - 6} 87 L${x - 8} 116 H${x + 8} L${x + 6} 87 Z`} fill={de(r, ['#7C2D12', '#4C1D95', '#1E3A8A'])} />
        </g>
      ))}
    </g>
  )
}

function Renacimiento({ r }) {
  const fx = 80, fy = 52
  return (
    <g>
      <rect width="160" height="120" fill="#BFD7EA" />
      <path d="M0 62 Q40 50 80 56 T160 58 V70 H0 Z" fill="#8FB3C9" />
      <rect y="66" width="160" height="54" fill="#D8C7A0" />
      {/* baldosas que convergen en el punto de fuga */}
      {[-80, -40, 0, 40, 80, 120, 160, 200, 240].map(x => <line key={x} x1={fx} y1={fy + 14} x2={x} y2="120" stroke="#A8916A" strokeWidth="1" />)}
      {[74, 82, 94, 110].map(y => <line key={y} x1="0" y1={y} x2="160" y2={y} stroke="#A8916A" strokeWidth="1" />)}
      {/* arcos clásicos simétricos */}
      {[14, 128].map(x => <path key={x} d={`M${x} 66 V24 Q${x + 9} 12 ${x + 18} 24 V66`} fill="none" stroke="#E7DCC2" strokeWidth="5" />)}
      {/* figura en triángulo */}
      <path d="M80 30 L104 104 H56 Z" fill={de(r, ['#B91C1C', '#1D4ED8'])} />
      <path d="M80 50 L96 104 H64 Z" fill={de(r, ['#1E3A8A', '#9F1239'])} opacity="0.85" />
      <circle cx="80" cy="30" r="9" fill="#F1D3B3" />
    </g>
  )
}

function Barroco({ r }) {
  const tono = de(r, ['#7F1D1D', '#78350F', '#1E3A8A'])
  return (
    <g>
      <defs>
        <radialGradient id="luzBarroca" cx="0.65" cy="0.35" r="0.6">
          <stop offset="0" stopColor="#F5D6A8" />
          <stop offset="0.45" stopColor="#7C4A1E" />
          <stop offset="1" stopColor="#0B0603" />
        </radialGradient>
      </defs>
      <rect width="160" height="120" fill="#0B0603" />
      <path d="M160 0 L40 120 H100 L160 30 Z" fill="#F5D6A8" opacity="0.12" />
      <ellipse cx="96" cy="60" rx="60" ry="55" fill="url(#luzBarroca)" opacity="0.9" />
      <path d="M58 120 Q70 74 98 66 Q124 74 134 120 Z" fill={tono} />
      <path d="M98 66 Q116 72 126 100" stroke="#F5D6A8" strokeWidth="3" fill="none" opacity="0.6" />
      <ellipse cx="98" cy="50" rx="11" ry="13" fill="#E9B98A" />
      <path d="M87 48 Q98 34 110 46" fill="#2A1608" />
      <path d="M120 58 L148 28" stroke="#E9B98A" strokeWidth="6" strokeLinecap="round" />
    </g>
  )
}

function Romanticismo({ r }) {
  return (
    <g>
      <defs>
        <linearGradient id="cieloRomantico" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1F2937" />
          <stop offset="0.7" stopColor="#6B7280" />
          <stop offset="1" stopColor="#E5C07B" />
        </linearGradient>
      </defs>
      <rect width="160" height="120" fill="url(#cieloRomantico)" />
      <ellipse cx={de(r, [40, 110])} cy="20" rx="40" ry="12" fill="#111827" opacity="0.7" />
      <path d="M0 80 Q30 50 60 78 T120 70 T160 60 V120 H0 Z" fill="#1E3A5F" />
      <path d="M0 96 Q40 66 80 94 T160 86 V120 H0 Z" fill="#274C77" />
      <path d="M20 84 Q34 60 50 80 M90 78 Q104 54 122 74" stroke="#E5E7EB" strokeWidth="3" fill="none" />
      {/* barca diminuta frente al mar */}
      <path d="M96 82 L110 74 L112 82 Z" fill="#3F2A14" />
      <line x1="104" y1="78" x2="104" y2="62" stroke="#3F2A14" strokeWidth="1.5" />
      <path d="M104 62 L114 72 H104 Z" fill="#D6D3D1" />
    </g>
  )
}

function Impresionismo({ r }) {
  const pal = de(r, [['#F59E0B', '#FB923C', '#38BDF8', '#818CF8'], ['#FDE68A', '#F472B6', '#60A5FA', '#34D399']])
  const pinceladas = []
  for (let i = 0; i < 170; i++) {
    const x = r() * 160, y = r() * 120
    const c = y < 60 ? de(r, [pal[0], pal[1], '#FDE68A', '#BFDBFE']) : de(r, [pal[2], pal[3], '#1E40AF', pal[1]])
    pinceladas.push(<line key={i} x1={x} y1={y} x2={x + 6 + r() * 4} y2={y + (r() - 0.5) * 3} stroke={c} strokeWidth="3" strokeLinecap="round" opacity="0.85" />)
  }
  return (
    <g>
      <rect width="160" height="120" fill="#A5B4FC" />
      {pinceladas}
      <circle cx="100" cy="34" r="9" fill="#F97316" />
      {[70, 78, 86, 94].map((y, i) => <line key={y} x1={96 - i} y1={y} x2={106 + i} y2={y} stroke="#F97316" strokeWidth="3" strokeLinecap="round" />)}
    </g>
  )
}

function Expresionismo({ r }) {
  return (
    <g>
      <rect width="160" height="120" fill="#B91C1C" />
      {[0, 1, 2, 3, 4].map(i => (
        <path key={i} d={`M0 ${10 + i * 12} Q40 ${i * 12 - 4} 80 ${14 + i * 12} T160 ${8 + i * 12}`} stroke={['#F97316', '#FACC15', '#DC2626', '#EA580C', '#FDE047'][i]} strokeWidth="7" fill="none" />
      ))}
      <path d="M0 70 Q60 60 160 76 V120 H0 Z" fill={de(r, ['#1E3A8A', '#14532D'])} />
      <path d="M0 96 L160 74" stroke="#7C2D12" strokeWidth="10" />
      {/* figura deformada */}
      <path d="M70 120 Q66 92 76 78 Q86 92 90 120 Z" fill="#1F2937" />
      <ellipse cx="80" cy="66" rx="9" ry="14" fill="#D9F99D" />
      <ellipse cx="76" cy="62" rx="2" ry="3" fill="#1F2937" /><ellipse cx="84" cy="62" rx="2" ry="3" fill="#1F2937" />
      <ellipse cx="80" cy="72" rx="2.5" ry="4" fill="#1F2937" />
      <path d="M71 60 Q68 70 72 78 M89 60 Q92 70 88 78" stroke="#D9F99D" strokeWidth="3" fill="none" />
    </g>
  )
}

function Cubismo({ r }) {
  const pal = ['#A16207', '#78716C', '#57534E', '#CA8A04', '#44403C', '#D6D3D1', '#92400E']
  const planos = []
  for (let i = 0; i < 14; i++) {
    const cx = 20 + r() * 120, cy = 15 + r() * 90
    // Vértices ordenados por ángulo alrededor del centro: facetas, no garabatos.
    const pts = Array.from({ length: 4 }, (_, k) => {
      const ang = (k / 4) * Math.PI * 2 + r() * 1.2
      const rad = 14 + r() * 22
      return `${(cx + Math.cos(ang) * rad).toFixed(1)},${(cy + Math.sin(ang) * rad * 0.8).toFixed(1)}`
    }).join(' ')
    planos.push(<polygon key={i} points={pts} fill={de(r, pal)} stroke="#1C1917" strokeWidth="1.2" opacity="0.9" />)
  }
  return (
    <g>
      <rect width="160" height="120" fill="#A8A29E" />
      {planos}
      {/* una guitarra hecha pedazos */}
      <path d="M62 40 L84 34 L96 58 L80 92 L58 80 Z" fill="#B45309" stroke="#1C1917" strokeWidth="1.5" />
      <circle cx="76" cy="62" r="7" fill="#1C1917" />
      <line x1="84" y1="34" x2="120" y2="14" stroke="#1C1917" strokeWidth="4" />
      {[0, 1, 2].map(i => <line key={i} x1={70 + i * 3} y1="48" x2={88 + i * 3} y2="80" stroke="#E7E5E4" strokeWidth="0.8" />)}
    </g>
  )
}

function Surrealismo({ r }) {
  return (
    <g>
      <defs>
        <linearGradient id="cieloSurreal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0EA5E9" />
          <stop offset="1" stopColor="#FDE68A" />
        </linearGradient>
      </defs>
      <rect width="160" height="120" fill="url(#cieloSurreal)" />
      <rect y="84" width="160" height="36" fill="#C2A06B" />
      <line x1="0" y1="84" x2="160" y2="84" stroke="#8B6B3E" />
      {/* un objeto imposible: una roca con un castillo, flotando */}
      <g transform={`translate(${de(r, [58, 74])} 18)`}>
        <path d="M0 34 Q4 10 24 8 Q46 6 50 30 Q40 52 24 50 Q6 52 0 34 Z" fill="#78716C" />
        <rect x="14" y="0" width="8" height="12" fill="#57534E" /><rect x="26" y="-4" width="8" height="16" fill="#57534E" />
      </g>
      <ellipse cx="92" cy="104" rx="28" ry="4" fill="#5B4423" opacity="0.6" />
      {/* un reloj que cuelga, blando */}
      <path d="M20 84 L22 62 L30 60" stroke="#57534E" strokeWidth="3" fill="none" />
      <path d="M26 60 Q44 58 42 72 Q40 86 30 92 Q26 80 26 60 Z" fill="#E5E7EB" stroke="#57534E" strokeWidth="1.5" />
      <line x1="33" y1="68" x2="36" y2="74" stroke="#1F2937" strokeWidth="1.5" />
      <line x1="138" y1="84" x2="150" y2="110" stroke="#8B6B3E" strokeWidth="3" />
    </g>
  )
}

function Abstraccion({ r }) {
  const c = () => de(r, ['#DC2626', '#2563EB', '#FACC15', '#111827', '#16A34A'])
  return (
    <g>
      <rect width="160" height="120" fill="#F5F5F4" />
      <circle cx={30 + r() * 40} cy={30 + r() * 30} r={14 + r() * 12} fill={c()} />
      <circle cx={100 + r() * 30} cy={50 + r() * 40} r={8 + r() * 10} fill="none" stroke={c()} strokeWidth="4" />
      <rect x={70 + r() * 40} y={10 + r() * 20} width="30" height="22" fill={c()} />
      <polygon points={`${20 + r() * 20},110 ${60 + r() * 20},70 ${80 + r() * 20},112`} fill={c()} />
      {[0, 1, 2, 3].map(i => <line key={i} x1={r() * 160} y1={r() * 120} x2={r() * 160} y2={r() * 120} stroke="#111827" strokeWidth={1 + r() * 3} />)}
    </g>
  )
}

function Pop({ r }) {
  const fondo = de(r, ['#FDE047', '#F472B6', '#38BDF8'])
  const puntos = []
  for (let y = 4; y < 120; y += 8) for (let x = (y / 8) % 2 ? 4 : 8; x < 160; x += 8) puntos.push(<circle key={`${x}-${y}`} cx={x} cy={y} r="1.8" fill="#DC2626" opacity="0.55" />)
  return (
    <g>
      <rect width="160" height="120" fill={fondo} />
      {puntos}
      {/* latas repetidas, colores planos y contorno negro */}
      {[0, 1, 2, 3].map(i => (
        <g key={i} transform={`translate(${10 + i * 37} 26)`}>
          <rect width="30" height="68" rx="3" fill="#F8FAFC" stroke="#000" strokeWidth="2.5" />
          <rect width="30" height="30" rx="3" fill={i % 2 ? '#DC2626' : '#2563EB'} stroke="#000" strokeWidth="2.5" />
          <circle cx="15" cy="48" r="7" fill="#FACC15" stroke="#000" strokeWidth="2" />
        </g>
      ))}
    </g>
  )
}

const DIBUJOS = { gotico: Gotico, renacimiento: Renacimiento, barroco: Barroco, romanticismo: Romanticismo, impresionismo: Impresionismo, expresionismo: Expresionismo, cubismo: Cubismo, surrealismo: Surrealismo, abstraccion: Abstraccion, pop: Pop }

export default function Cuadro({ estilo, semilla = 1, className = 'w-full max-w-[300px] mx-auto block' }) {
  const D = DIBUJOS[estilo]
  if (!D) return null
  const r = azar(semilla)
  return (
    <svg viewBox="-8 -8 176 136" className={className} aria-hidden="true">
      <rect x="-8" y="-8" width="176" height="136" rx="3" fill="#7C5A1E" />
      <rect x="-4" y="-4" width="168" height="128" fill="#C9A24A" />
      <svg x="0" y="0" width="160" height="120" viewBox="0 0 160 120">
        <D r={r} />
      </svg>
    </svg>
  )
}
