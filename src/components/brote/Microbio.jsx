// Los microbios dibujados de ¡Brote!: 9 formas (virus, fago, bacilo, coco,
// espirilo, levadura, moho, ameba, paramecio).
const VERDE = '#4ADE80', NUCLEO = '#7C3AED', BORDE = '#0F172A'

// ── Microbios ─────────────────────────────────────────────────────────────
export function Microbio({ forma, className = 'w-full max-w-[260px] mx-auto block' }) {
  const g = {
    virus: (
      <g>
        {Array.from({ length: 14 }, (_, i) => {
          const a = (i / 14) * Math.PI * 2
          return <g key={i}><line x1={110 + 34 * Math.cos(a)} y1={75 + 34 * Math.sin(a)} x2={110 + 48 * Math.cos(a)} y2={75 + 48 * Math.sin(a)} stroke="#F472B6" strokeWidth="3" />
            <circle cx={110 + 50 * Math.cos(a)} cy={75 + 50 * Math.sin(a)} r="5" fill="#F472B6" /></g>
        })}
        <circle cx="110" cy="75" r="35" fill="#C084FC" stroke={BORDE} strokeWidth="2" />
        <path d="M88 70 q8 -14 16 0 t16 0 t16 0" stroke="#FDE68A" strokeWidth="3" fill="none" />
        <path d="M92 86 q8 -12 16 0 t16 0" stroke="#FDE68A" strokeWidth="3" fill="none" />
      </g>
    ),
    fago: (
      <g>
        <polygon points="110,10 134,24 134,52 110,66 86,52 86,24" fill="#C084FC" stroke={BORDE} strokeWidth="2" />
        <rect x="104" y="66" width="12" height="44" fill="#A78BFA" stroke={BORDE} strokeWidth="2" />
        {[0, 1, 2, 3, 4].map(i => <line key={i} x1="104" x2="116" y1={72 + i * 8} y2={72 + i * 8} stroke={BORDE} strokeWidth="1.5" />)}
        <rect x="94" y="108" width="32" height="7" rx="2" fill="#A78BFA" stroke={BORDE} strokeWidth="2" />
        {[-1, 1].map(d => <g key={d}><path d={`M${110 + d * 14} 115 l${d * 18} 12 l${d * 4} 16`} stroke="#E9D5FF" strokeWidth="3" fill="none" />
          <path d={`M${110 + d * 6} 115 l${d * 8} 16 l${d * 2} 14`} stroke="#E9D5FF" strokeWidth="3" fill="none" /></g>)}
      </g>
    ),
    bacilo: (
      <g>
        <path d="M168 75 q10 -14 20 0 t20 0" stroke="#86EFAC" strokeWidth="3" fill="none" />
        <rect x="40" y="52" width="130" height="46" rx="23" fill={VERDE} stroke={BORDE} strokeWidth="2" />
        <path d="M70 72 q10 -12 20 0 t20 0 t20 0 M76 82 q10 10 20 0 t20 0" stroke="#166534" strokeWidth="3" fill="none" />
      </g>
    ),
    coco: (
      <g>
        {[0, 1, 2, 3, 4].map(i => <circle key={i} cx={42 + i * 34} cy={75 + (i % 2 ? -8 : 8)} r="17" fill={VERDE} stroke={BORDE} strokeWidth="2" />)}
      </g>
    ),
    espirilo: (
      <g>
        <path d="M30 75 q20 -40 40 0 t40 0 t40 0 t40 0" stroke={BORDE} strokeWidth="18" fill="none" strokeLinecap="round" />
        <path d="M30 75 q20 -40 40 0 t40 0 t40 0 t40 0" stroke={VERDE} strokeWidth="14" fill="none" strokeLinecap="round" />
      </g>
    ),
    levadura: (
      <g>
        <ellipse cx="96" cy="84" rx="48" ry="38" fill="#FCD34D" stroke={BORDE} strokeWidth="2" />
        <ellipse cx="134" cy="54" rx="18" ry="15" fill="#FCD34D" stroke={BORDE} strokeWidth="2" />
        <circle cx="90" cy="86" r="14" fill={NUCLEO} stroke={BORDE} strokeWidth="2" />
        <circle cx="118" cy="100" r="6" fill="#FDE68A" />
      </g>
    ),
    moho: (
      <g stroke="#FDE68A" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M20 140 C70 130 120 138 200 132" />
        <path d="M60 136 L60 60 M110 136 L112 40 M180 133 L178 70 M112 90 L138 66" />
        {[[60, 52], [112, 32], [178, 62], [140, 58]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="13" fill="#64748B" stroke={BORDE} strokeWidth="2" />)}
        {[[56, 50], [64, 55], [108, 30], [116, 35], [175, 60], [181, 65], [137, 56]].map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" fill="#CBD5E1" stroke="none" />)}
      </g>
    ),
    ameba: (
      <g>
        <path d="M60 80 C40 50 70 30 95 45 C110 20 150 25 150 50 C185 45 195 80 165 95 C175 125 130 135 115 115 C90 135 50 125 62 100 C40 95 42 85 60 80 Z" fill="#60A5FA" stroke={BORDE} strokeWidth="2" />
        <circle cx="118" cy="78" r="15" fill={NUCLEO} stroke={BORDE} strokeWidth="2" />
        <circle cx="82" cy="95" r="7" fill="#BFDBFE" />
        <circle cx="150" cy="70" r="5" fill="#BFDBFE" />
      </g>
    ),
    paramecio: (
      <g>
        {Array.from({ length: 34 }, (_, i) => {
          const a = (i / 34) * Math.PI * 2
          return <line key={i} x1={110 + 82 * Math.cos(a)} y1={75 + 34 * Math.sin(a)} x2={110 + 92 * Math.cos(a)} y2={75 + 42 * Math.sin(a)} stroke="#7DD3FC" strokeWidth="2" />
        })}
        <path d="M30 75 C30 40 80 38 110 45 C150 52 192 40 192 75 C192 110 150 100 110 106 C75 112 30 110 30 75 Z" fill="#38BDF8" stroke={BORDE} strokeWidth="2" />
        <path d="M100 48 C110 70 120 80 118 104" stroke="#0369A1" strokeWidth="3" fill="none" />
        <ellipse cx="80" cy="78" rx="16" ry="11" fill={NUCLEO} stroke={BORDE} strokeWidth="2" />
        <circle cx="150" cy="70" r="7" fill="#E0F2FE" />
      </g>
    ),
  }[forma]
  return <svg viewBox="0 0 220 150" className={className} aria-hidden="true">{g}</svg>
}
