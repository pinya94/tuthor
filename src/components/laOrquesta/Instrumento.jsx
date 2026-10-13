// Los instrumentos de La Orquesta, dibujados en SVG (sin fotos). Cada dibujo
// enseña lo que lo distingue de su vecino: la pica del violonchelo, la vara
// del trombón, el tubo enrollado de la trompa, la campana hacia arriba del
// saxofón, el parche del timbal…
const MADERA = '#A0522D', MADERA_OSC = '#6B3410', LATON = '#EAB308', LATON_OSC = '#A16207', PLATA = '#CBD5E1', NEGRO = '#1F2937'

function CuerpoViolin({ cx, cy, k = 1 }) {
  return (
    <g>
      <ellipse cx={cx} cy={cy - 16 * k} rx={17 * k} ry={15 * k} fill={MADERA} />
      <ellipse cx={cx} cy={cy + 14 * k} rx={21 * k} ry={19 * k} fill={MADERA} />
      <rect x={cx - 13 * k} y={cy - 6 * k} width={26 * k} height={12 * k} fill={MADERA} />
      <path d={`M${cx - 8 * k} ${cy - 4 * k} q-3 6 0 14 M${cx + 8 * k} ${cy - 4 * k} q3 6 0 14`} stroke={NEGRO} strokeWidth={1.5 * k} fill="none" />
      <rect x={cx - 5 * k} y={cy + 18 * k} width={10 * k} height={3 * k} fill={NEGRO} />
    </g>
  )
}

const DIBUJOS = {
  violin: () => (
    <g>
      <CuerpoViolin cx={72} cy={72} />
      <rect x="69" y="18" width="6" height="38" fill={NEGRO} />
      <circle cx="72" cy="14" r="5" fill={MADERA_OSC} />
      {[-2, 0, 2].map(d => <line key={d} x1={72 + d} y1="20" x2={72 + d} y2="88" stroke="#E5E7EB" strokeWidth="0.6" />)}
      <line x1="104" y1="108" x2="142" y2="14" stroke={MADERA_OSC} strokeWidth="2.5" />
      <line x1="108" y1="108" x2="146" y2="16" stroke="#F5F5F4" strokeWidth="1" />
    </g>
  ),
  violonchelo: () => (
    <g>
      <line x1="10" y1="116" x2="150" y2="116" stroke="#475569" strokeWidth="2" />
      <CuerpoViolin cx={80} cy={66} k={1.45} />
      <rect x="76" y="4" width="8" height="40" fill={NEGRO} />
      <line x1="80" y1="96" x2="80" y2="116" stroke={PLATA} strokeWidth="3" />
      <line x1="20" y1="80" x2="150" y2="62" stroke={MADERA_OSC} strokeWidth="2.5" />
    </g>
  ),
  arpa: () => (
    <g>
      <rect x="30" y="16" width="9" height="98" rx="3" fill={LATON} />
      <path d="M34 18 Q70 2 92 20 Q112 36 128 30" stroke={LATON_OSC} strokeWidth="7" fill="none" />
      <path d="M36 112 L126 32" stroke={MADERA} strokeWidth="11" strokeLinecap="round" />
      {Array.from({ length: 11 }, (_, i) => {
        const x = 44 + i * 8
        const yTop = 18 + Math.sin(i / 3) * 2 + (i > 6 ? (i - 6) * 1.5 : 0)
        const yBot = 112 - (x - 36) * (80 / 90)
        return <line key={i} x1={x} y1={yTop + 8} x2={x} y2={yBot} stroke="#F5F5F4" strokeWidth="0.9" />
      })}
    </g>
  ),
  guitarra: () => (
    <g>
      <ellipse cx="44" cy="62" rx="22" ry="18" fill={MADERA} />
      <ellipse cx="74" cy="62" rx="17" ry="14" fill={MADERA} />
      <circle cx="68" cy="62" r="7" fill={NEGRO} />
      <rect x="88" y="58" width="50" height="8" fill={MADERA_OSC} />
      {[96, 104, 112, 120, 128].map(x => <line key={x} x1={x} y1="58" x2={x} y2="66" stroke={PLATA} strokeWidth="1" />)}
      <path d="M138 56 L154 52 L154 72 L138 68 Z" fill={MADERA_OSC} />
      {[0, 1, 2].map(i => <circle key={i} cx={143 + i * 4} cy="54" r="1.6" fill={PLATA} />)}
      <line x1="36" y1="60" x2="152" y2="60" stroke="#E5E7EB" strokeWidth="0.6" />
      <line x1="36" y1="64" x2="152" y2="64" stroke="#E5E7EB" strokeWidth="0.6" />
      <rect x="34" y="57" width="4" height="10" fill={NEGRO} />
    </g>
  ),
  piano: () => (
    <g>
      <path d="M20 74 L20 46 L96 46 Q126 46 140 66 Q150 80 140 86 L20 86 Z" fill={NEGRO} />
      <path d="M22 46 L104 14 L108 18 L30 50" fill="#374151" />
      <line x1="64" y1="30" x2="70" y2="46" stroke="#9CA3AF" strokeWidth="1.5" />
      <rect x="20" y="86" width="96" height="10" fill="#F8FAFC" />
      {Array.from({ length: 13 }, (_, i) => <line key={i} x1={20 + i * 7.4} y1="86" x2={20 + i * 7.4} y2="96" stroke="#9CA3AF" strokeWidth="0.6" />)}
      {[1, 2, 4, 5, 6, 8, 9, 11].map(i => <rect key={i} x={20 + i * 7.4 - 2} y="86" width="4" height="6" fill={NEGRO} />)}
      {[30, 100, 134].map(x => <rect key={x} x={x} y="96" width="5" height="20" fill={NEGRO} />)}
    </g>
  ),
  flauta: () => (
    <g>
      <rect x="10" y="56" width="140" height="8" rx="4" fill={PLATA} stroke="#94A3B8" />
      <ellipse cx="26" cy="56" rx="6" ry="2.5" fill="#94A3B8" />
      {[50, 60, 70, 84, 94, 104, 118, 130].map(x => <circle key={x} cx={x} cy="60" r="3" fill="#E5E7EB" stroke="#64748B" />)}
      <line x1="44" y1="54" x2="136" y2="54" stroke="#64748B" strokeWidth="0.8" />
    </g>
  ),
  clarinete: () => (
    <g>
      <path d="M76 6 L84 6 L83 20 L77 20 Z" fill={NEGRO} />
      <rect x="77" y="20" width="6" height="4" fill={PLATA} />
      <rect x="76" y="24" width="8" height="78" fill={NEGRO} />
      <path d="M76 100 Q70 112 66 116 L94 116 Q90 112 84 100 Z" fill={NEGRO} />
      {[34, 44, 54, 66, 76, 86].map(y => <circle key={y} cx="80" cy={y} r="2" fill={PLATA} />)}
      {[40, 60, 82].map(y => <line key={y} x1="84" y1={y} x2="90" y2={y + 4} stroke={PLATA} strokeWidth="1.2" />)}
    </g>
  ),
  saxofon: () => (
    <g>
      <path d="M86 10 L92 18 L88 22" stroke={NEGRO} strokeWidth="3" fill="none" />
      <path d="M88 22 Q78 26 76 36 L70 92 Q68 112 88 112 Q106 112 108 92 L112 66" stroke={LATON} strokeWidth="13" fill="none" strokeLinecap="round" />
      <path d="M104 70 L126 54 L130 62 L112 76 Z" fill={LATON_OSC} />
      <ellipse cx="124" cy="56" rx="9" ry="5" transform="rotate(-35 124 56)" fill={LATON} stroke={LATON_OSC} strokeWidth="2" />
      {[44, 54, 64, 74, 84].map(y => <circle key={y} cx="74" cy={y} r="3" fill="#FEF08A" stroke={LATON_OSC} />)}
    </g>
  ),
  fagot: () => (
    <g>
      <rect x="70" y="10" width="11" height="104" rx="4" fill={MADERA} />
      <rect x="82" y="40" width="9" height="74" rx="4" fill={MADERA_OSC} />
      <path d="M70 114 L91 114 L91 118 L70 118 Z" fill={PLATA} />
      <path d="M86 40 Q86 30 96 26 Q104 22 108 30 L112 34" stroke={PLATA} strokeWidth="2" fill="none" />
      <path d="M112 34 l3 3 l-3 2" stroke="#D6D3D1" strokeWidth="2" fill="none" />
      {[56, 66, 76, 90].map(y => <circle key={y} cx="86" cy={y} r="1.8" fill={PLATA} />)}
    </g>
  ),
  trompeta: () => (
    <g>
      <rect x="18" y="58" width="12" height="4" fill={PLATA} />
      <path d="M30 60 L110 60" stroke={LATON} strokeWidth="5" />
      <path d="M44 60 Q40 78 60 78 L96 78 Q110 78 104 60" stroke={LATON} strokeWidth="5" fill="none" />
      {[64, 74, 84].map(x => <rect key={x} x={x - 3} y="46" width="6" height="34" rx="2" fill={LATON_OSC} />)}
      {[64, 74, 84].map(x => <circle key={x} cx={x} cy="44" r="4" fill="#FEF08A" />)}
      <path d="M110 57 L138 46 L138 74 L110 63 Z" fill={LATON} />
      <ellipse cx="138" cy="60" rx="4" ry="14" fill={LATON_OSC} />
    </g>
  ),
  trombon: () => (
    <g>
      <rect x="10" y="62" width="10" height="4" fill={PLATA} />
      <path d="M20 64 L120 64 Q132 64 132 74 Q132 84 120 84 L20 84" stroke={LATON} strokeWidth="4" fill="none" />
      <rect x="60" y="60" width="6" height="28" fill={LATON_OSC} />
      <path d="M40 46 L120 46" stroke={LATON} strokeWidth="5" />
      <path d="M40 46 Q28 46 30 56 L32 62" stroke={LATON} strokeWidth="4" fill="none" />
      <path d="M120 43 L150 30 L150 62 L120 49 Z" fill={LATON} />
      <ellipse cx="150" cy="46" rx="4" ry="16" fill={LATON_OSC} />
    </g>
  ),
  trompa: () => (
    <g>
      <circle cx="70" cy="62" r="30" fill="none" stroke={LATON} strokeWidth="6" />
      <circle cx="70" cy="62" r="20" fill="none" stroke={LATON} strokeWidth="5" />
      {[[58, 46], [66, 44], [74, 46]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="4" fill={LATON_OSC} />)}
      <path d="M40 62 L30 64" stroke={PLATA} strokeWidth="3" />
      <path d="M96 76 Q118 90 128 110 L150 98 Q132 86 100 70 Z" fill={LATON} />
      <ellipse cx="139" cy="104" rx="14" ry="6" transform="rotate(-30 139 104)" fill={LATON_OSC} />
    </g>
  ),
  tuba: () => (
    <g>
      <path d="M58 116 Q46 116 46 100 L46 60 Q46 46 62 46 L86 46 L86 100 Q86 116 70 116 Z" fill={LATON} />
      <path d="M62 46 L56 10 L110 10 L94 46 Z" fill={LATON} />
      <ellipse cx="83" cy="10" rx="27" ry="6" fill={LATON_OSC} />
      {[92, 100, 108].map(x => <rect key={x} x={x - 3} y="54" width="6" height="30" rx="2" fill={LATON_OSC} />)}
      <path d="M86 70 L112 70" stroke={LATON} strokeWidth="4" />
      <path d="M46 88 L32 88 L30 80" stroke={PLATA} strokeWidth="3" fill="none" />
    </g>
  ),
  timbal: () => (
    <g>
      <path d="M30 50 Q30 98 80 100 Q130 98 130 50 Z" fill="#B45309" />
      <ellipse cx="80" cy="50" rx="50" ry="12" fill="#F5F5F4" stroke="#9CA3AF" strokeWidth="2" />
      {[40, 64, 96, 120].map(x => <line key={x} x1={x} y1="54" x2={x} y2={x < 80 ? 76 : 76} stroke="#78350F" strokeWidth="2" />)}
      {[[50, 98, 40, 118], [110, 98, 120, 118], [80, 100, 80, 118]].map(([a, b, c, d]) => <line key={a} x1={a} y1={b} x2={c} y2={d} stroke="#57534E" strokeWidth="3" />)}
      <line x1="60" y1="20" x2="74" y2="44" stroke={MADERA_OSC} strokeWidth="2.5" /><circle cx="75" cy="45" r="5" fill="#F5F5F4" />
      <line x1="104" y1="20" x2="92" y2="44" stroke={MADERA_OSC} strokeWidth="2.5" /><circle cx="91" cy="45" r="5" fill="#F5F5F4" />
    </g>
  ),
  xilofono: () => (
    <g>
      {Array.from({ length: 8 }, (_, i) => {
        const h = 58 - i * 5
        return <rect key={i} x={22 + i * 15} y={60 - h / 2} width="12" height={h} rx="2" fill={i % 2 ? '#C2410C' : '#B45309'} stroke={MADERA_OSC} />
      })}
      <line x1="18" y1="44" x2="142" y2="54" stroke="#57534E" strokeWidth="2" />
      <line x1="18" y1="76" x2="142" y2="66" stroke="#57534E" strokeWidth="2" />
      <line x1="40" y1="110" x2="60" y2="90" stroke={MADERA_OSC} strokeWidth="2.5" /><circle cx="61" cy="89" r="5" fill="#F43F5E" />
      <line x1="120" y1="110" x2="100" y2="90" stroke={MADERA_OSC} strokeWidth="2.5" /><circle cx="99" cy="89" r="5" fill="#F43F5E" />
    </g>
  ),
  tambor: () => (
    <g>
      <rect x="40" y="52" width="80" height="40" fill="#DC2626" />
      <ellipse cx="80" cy="92" rx="40" ry="10" fill="#B91C1C" />
      <ellipse cx="80" cy="52" rx="40" ry="10" fill="#F5F5F4" stroke="#9CA3AF" strokeWidth="2" />
      {[46, 60, 74, 88, 102, 114].map((x, i) => <line key={x} x1={x} y1="58" x2={x + (i % 2 ? -6 : 6)} y2="96" stroke={PLATA} strokeWidth="1.5" />)}
      <line x1="56" y1="14" x2="74" y2="46" stroke={MADERA} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="108" y1="16" x2="90" y2="46" stroke={MADERA} strokeWidth="3.5" strokeLinecap="round" />
    </g>
  ),
  platillos: () => (
    <g>
      <ellipse cx="54" cy="62" rx="36" ry="12" transform="rotate(-20 54 62)" fill={LATON} stroke={LATON_OSC} strokeWidth="2" />
      <ellipse cx="54" cy="62" rx="7" ry="3" transform="rotate(-20 54 62)" fill={LATON_OSC} />
      <ellipse cx="108" cy="62" rx="36" ry="12" transform="rotate(20 108 62)" fill={LATON} stroke={LATON_OSC} strokeWidth="2" />
      <ellipse cx="108" cy="62" rx="7" ry="3" transform="rotate(20 108 62)" fill={LATON_OSC} />
      {[[30, 40], [134, 40], [80, 30]].map(([x, y], i) => <path key={i} d={`M${x} ${y} l${i === 1 ? 6 : -6} -6 M${x} ${y + 6} l${i === 1 ? 8 : -8} 0`} stroke="#FDE68A" strokeWidth="2" />)}
    </g>
  ),
  triangulo: () => (
    <g>
      <line x1="80" y1="8" x2="80" y2="22" stroke="#94A3B8" strokeWidth="1.5" />
      <path d="M80 22 L124 100 L40 100 L74 32" stroke={PLATA} strokeWidth="5" fill="none" strokeLinejoin="round" />
      <line x1="112" y1="50" x2="96" y2="70" stroke={PLATA} strokeWidth="3" strokeLinecap="round" />
      {[[134, 64], [140, 80]].map(([x, y]) => <path key={y} d={`M${x} ${y} q6 -4 10 0`} stroke="#FDE68A" strokeWidth="2" fill="none" />)}
    </g>
  ),
}

export default function Instrumento({ id, className = 'w-full max-w-[260px] mx-auto block' }) {
  const D = DIBUJOS[id]
  if (!D) return null
  return <svg viewBox="0 0 160 120" className={className} aria-hidden="true"><D /></svg>
}
