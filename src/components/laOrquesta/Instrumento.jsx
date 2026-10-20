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
    <g transform="rotate(-28 80 62)">
      {/* guitarra española: caja en forma de ocho, boca redonda, puente,
          mástil con trastes y la pala con las clavijas */}
      <rect x="75" y="4" width="10" height="12" rx="2" fill={MADERA_OSC} />
      {[7, 11, 15].map(y => <g key={y}><circle cx="72.5" cy={y - 1} r="1.8" fill={PLATA} /><circle cx="87.5" cy={y - 1} r="1.8" fill={PLATA} /></g>)}
      <rect x="76.5" y="16" width="7" height="44" fill="#7C2D12" />
      {[22, 28, 34, 40, 46, 52].map(y => <line key={y} x1="76.5" y1={y} x2="83.5" y2={y} stroke={PLATA} strokeWidth="0.8" />)}
      <path d="M80 56 C60 56 60 74 68 78 C56 84 56 112 80 112 C104 112 104 84 92 78 C100 74 100 56 80 56 Z" fill="#D97706" stroke={MADERA_OSC} strokeWidth="2" />
      <circle cx="80" cy="76" r="7" fill={NEGRO} stroke="#FDE68A" strokeWidth="1.2" />
      <rect x="71" y="96" width="18" height="4" rx="1.5" fill={MADERA_OSC} />
      {[-3, -1, 1, 3].map(d => <line key={d} x1={80 + d} y1="16" x2={80 + d} y2="98" stroke="#F5F5F4" strokeWidth="0.5" />)}
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
    <g transform="rotate(14 80 62)">
      {/* boquilla con abrazadera, barrilete, dos cuerpos y la campana */}
      <path d="M76 2 L84 2 L83 14 L77 14 Z" fill={NEGRO} />
      <rect x="75.5" y="9" width="9" height="3" fill={PLATA} />
      <rect x="75" y="14" width="10" height="10" rx="2" fill={NEGRO} />
      <rect x="74.5" y="23" width="11" height="2" fill={PLATA} />
      <rect x="75" y="25" width="10" height="36" fill={NEGRO} />
      <rect x="74.5" y="60" width="11" height="2.5" fill={PLATA} />
      <rect x="75" y="62" width="10" height="36" fill={NEGRO} />
      <path d="M75 97 L85 97 Q88 108 96 116 L64 116 Q72 108 75 97 Z" fill={NEGRO} />
      <ellipse cx="80" cy="116" rx="16" ry="2.5" fill="#374151" />
      {[32, 40, 48, 70, 78, 86].map(y => <circle key={y} cx="80" cy={y} r="2.4" fill={PLATA} stroke="#64748B" strokeWidth="0.6" />)}
      {[36, 52, 74, 90].map(y => <path key={y} d={`M84 ${y} l5 2 l0 6`} stroke={PLATA} strokeWidth="1.3" fill="none" />)}
      <line x1="76.5" y1="28" x2="76.5" y2="94" stroke={PLATA} strokeWidth="0.8" />
    </g>
  ),
  saxofon: () => (
    <g>
      {/* boquilla negra y tudel, el cuerpo cónico que baja, la curva en U y
          el pabellón abierto hacia ARRIBA: la silueta que no tiene nadie más */}
      <path d="M71 26 Q69 13 58 11 L49 12.5" stroke={LATON} strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M49 12.5 L37 15.5" stroke={NEGRO} strokeWidth="5.5" strokeLinecap="round" />
      <path d="M66 24 L69 86 Q71 110 92 110 Q114 110 116 86 L120 62 Q124 56 134 50 L98 50 Q106 56 104 64 L100 86 Q98 98 92 98 Q85 98 83 86 L75 24 Z"
        fill={LATON} stroke={LATON_OSC} strokeWidth="1.5" strokeLinejoin="round" />
      <ellipse cx="116" cy="50" rx="18" ry="4.5" fill="#713F12" stroke={LATON_OSC} strokeWidth="1.5" />
      <path d="M100 52 Q116 47 132 52" stroke="#FDE68A" strokeWidth="1.2" fill="none" />
      {/* llaves de nácar a lo largo del cuerpo y las grandes de la curva */}
      {[[69.5, 36], [70, 45], [70.5, 54], [71.3, 64], [72, 73], [73, 82]].map(([x, y]) => (
        <circle key={y} cx={x} cy={y} r="3.4" fill="#FEF3C7" stroke={LATON_OSC} strokeWidth="1.2" />
      ))}
      {[[86, 104], [97, 104]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="3.6" fill={LATON_OSC} stroke="#FDE68A" strokeWidth="0.8" />)}
      <path d="M78 30 L84 84" stroke={LATON_OSC} strokeWidth="1.4" />
      <path d="M106 70 L114 68 M105 78 L113 76" stroke={LATON_OSC} strokeWidth="2" strokeLinecap="round" />
    </g>
  ),
  fagot: () => (
    <g transform="rotate(-10 80 64)">
      {/* dos tubos de madera unidos (el fagot es un tubo doblado), anillas
          plateadas, la campana clara arriba y el tudel en S con la caña */}
      <rect x="66" y="4" width="15" height="110" rx="4" fill={MADERA} />
      <rect x="81" y="34" width="12" height="80" rx="4" fill={MADERA_OSC} />
      <rect x="64.5" y="4" width="18" height="7" rx="2" fill="#E7C590" />
      <rect x="65" y="112" width="29" height="7" rx="3" fill={PLATA} />
      {[30, 62, 86].map(y => <rect key={y} x="65.5" y={y} width="16" height="2.5" fill={PLATA} />)}
      <rect x="80.5" y="60" width="13" height="2.5" fill={PLATA} />
      <path d="M87 36 Q86 24 96 22 Q108 20 110 30 Q112 38 122 36" stroke={PLATA} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <path d="M122 36 l7 -2" stroke="#D6D3D1" strokeWidth="3.5" strokeLinecap="round" />
      {[44, 52, 70, 78, 96].map(y => <circle key={y} cx="87" cy={y} r="2" fill={PLATA} />)}
      {[40, 48, 98].map(y => <circle key={y} cx="73.5" cy={y} r="2" fill={PLATA} />)}
      <path d="M77 66 l8 2 M77 74 l8 2" stroke={PLATA} strokeWidth="1.3" />
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
      {/* el tubo enrollado en círculos, las tres válvulas de rotación con sus
          palancas y el pabellón muy ancho saliendo hacia abajo a la derecha */}
      <circle cx="66" cy="58" r="34" fill="none" stroke={LATON} strokeWidth="6" />
      <circle cx="66" cy="58" r="25" fill="none" stroke={LATON} strokeWidth="4" />
      <circle cx="66" cy="58" r="17" fill="none" stroke={LATON_OSC} strokeWidth="3" />
      {[[54, 52], [66, 48], [78, 52]].map(([x, y]) => (
        <g key={x}>
          <circle cx={x} cy={y} r="6" fill={LATON_OSC} stroke="#FDE68A" strokeWidth="1.2" />
          <circle cx={x} cy={y} r="2" fill="#FDE68A" />
          <path d={`M${x} ${y + 6} l-6 14`} stroke={LATON_OSC} strokeWidth="2.5" strokeLinecap="round" />
        </g>
      ))}
      <path d="M33 62 L16 66" stroke={LATON} strokeWidth="3.5" />
      <path d="M16 66 L8 68" stroke={PLATA} strokeWidth="4" strokeLinecap="round" />
      <path d="M92 78 Q108 86 116 112 L156 86 Q126 80 98 68 Z" fill={LATON} stroke={LATON_OSC} strokeWidth="1.5" strokeLinejoin="round" />
      <ellipse cx="136" cy="99" rx="24" ry="8" transform="rotate(-33 136 99)" fill="#713F12" stroke={LATON_OSC} strokeWidth="2" />
    </g>
  ),
  tuba: () => (
    <g>
      {/* el instrumento más grande del metal: el pabellón enorme mirando
          ARRIBA, el tubo enrollado abajo y cuatro pistones delante */}
      <rect x="44" y="62" width="58" height="52" rx="24" fill="none" stroke={LATON} strokeWidth="10" />
      <rect x="58" y="74" width="30" height="28" rx="12" fill="none" stroke={LATON_OSC} strokeWidth="4" />
      <path d="M58 70 L38 14 L106 14 L86 70 Z" fill={LATON} stroke={LATON_OSC} strokeWidth="1.5" strokeLinejoin="round" />
      <ellipse cx="72" cy="14" rx="34" ry="7" fill={LATON_OSC} />
      <ellipse cx="72" cy="14" rx="28" ry="4.5" fill="#713F12" />
      <rect x="88" y="66" width="30" height="34" rx="3" fill={LATON_OSC} opacity="0.35" />
      {[92, 99, 106, 113].map(x => (
        <g key={x}>
          <rect x={x - 2.5} y="62" width="5" height="36" rx="2" fill={LATON} stroke={LATON_OSC} strokeWidth="1" />
          <circle cx={x} cy="60" r="3.4" fill="#FEF3C7" stroke={LATON_OSC} strokeWidth="1" />
        </g>
      ))}
      <path d="M118 80 Q130 80 132 66 L134 56" stroke={LATON} strokeWidth="4" fill="none" />
      <path d="M134 56 L136 48" stroke={PLATA} strokeWidth="5" strokeLinecap="round" />
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

// El mismo dibujo dentro de otro SVG (en el plano de la orquesta), en x, y.
export function InstrumentoEn({ id, x, y, w = 18, h = 14 }) {
  const D = DIBUJOS[id]
  if (!D) return null
  return <svg x={x} y={y} width={w} height={h} viewBox="0 0 160 120"><D /></svg>
}
