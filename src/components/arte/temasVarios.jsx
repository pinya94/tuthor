// Arte de los temas de Música y Economía.
import { Lienzo, T, Flecha } from './base'

// Notas: del pentagrama a la tecla del piano.
function Notas(p) {
  const lineas = [22, 30, 38, 46, 54]
  const negras = [0, 1, 3, 4, 5, 7, 8]
  return (
    <Lienzo {...p}>
      <path d={lineas.map(y => `M18 ${y}H222`).join('')} stroke="#A5B4FC" strokeOpacity=".55" strokeWidth="1.4" />
      {[[70, 50], [120, 42], [170, 34]].map(([x, y]) => (
        <g key={x}>
          <ellipse cx={x} cy={y} rx="6.5" ry="4.8" fill="#E879F9" transform={`rotate(-20 ${x} ${y})`} />
          <path d={`M${x + 6} ${y - 1}V${y - 26}`} stroke="#E879F9" strokeWidth="2" />
        </g>
      ))}
      <path d="M70 56V74" stroke="#E879F9" strokeWidth="1.5" strokeDasharray="3 3" />
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={20 + i * 20} y="74" width="19" height="50" rx="2" fill={i === 2 ? '#C084FC' : '#F8FAFC'} />
      ))}
      {negras.map(i => <rect key={i} x={20 + (i + 1) * 20 - 6} y="74" width="12" height="30" rx="1.5" fill="#1E293B" />)}
    </Lienzo>
  )
}

// Ritmo: el tambor y un compás de 4/4 con figuras y un silencio.
function Ritmo(p) {
  const lineas = [36, 44, 52, 60, 68]
  return (
    <Lienzo {...p}>
      <ellipse cx="62" cy="100" rx="34" ry="10" fill="#991B1B" />
      <rect x="28" y="62" width="68" height="38" fill="#DC2626" />
      <path d="M28 64L45 98L62 64L79 98L96 64" stroke="#FEF3C7" strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="62" cy="62" rx="34" ry="10" fill="#FDE68A" />
      <path d="M44 22L60 56M84 20L70 54" stroke="#D6A363" strokeWidth="4" strokeLinecap="round" />
      <circle cx="44" cy="22" r="4" fill="#D6A363" />
      <circle cx="84" cy="20" r="4" fill="#D6A363" />
      {/* compás */}
      <path d={lineas.map(y => `M116 ${y}H228`).join('')} stroke="#A5B4FC" strokeOpacity=".55" strokeWidth="1.3" />
      <path d="M228 36V68" stroke="#A5B4FC" strokeWidth="2" />
      <T x={127} y={51} s={14} c="#E0E7FF">4</T>
      <T x={127} y={67} s={14} c="#E0E7FF">4</T>
      <ellipse cx="148" cy="60" rx="5.5" ry="4" stroke="#FBBF24" strokeWidth="2" transform="rotate(-20 148 60)" />
      <path d="M153 59V34" stroke="#FBBF24" strokeWidth="1.8" />
      <ellipse cx="168" cy="52" rx="5.5" ry="4" fill="#FBBF24" transform="rotate(-20 168 52)" />
      <path d="M173 51V26" stroke="#FBBF24" strokeWidth="1.8" />
      <path d="M184 40L190 47L184 54L191 61Q184 60 186 66" stroke="#E0E7FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="204" cy="60" rx="5" ry="3.8" fill="#FBBF24" transform="rotate(-20 204 60)" />
      <ellipse cx="218" cy="56" rx="5" ry="3.8" fill="#FBBF24" transform="rotate(-20 218 56)" />
      <path d="M208.5 59V34M222.5 55V32M208.5 34L222.5 32" stroke="#FBBF24" strokeWidth="1.8" />
      <path d="M208.5 35L222.5 33" stroke="#FBBF24" strokeWidth="4" />
    </Lienzo>
  )
}

// Finanzas personales: la hucha y el interés compuesto.
function Finanzas(p) {
  return (
    <Lienzo {...p}>
      <rect x="44" y="100" width="10" height="16" rx="3" fill="#EC4899" />
      <rect x="84" y="100" width="10" height="16" rx="3" fill="#EC4899" />
      <path d="M52 58L58 44L68 56Z" fill="#EC4899" />
      <ellipse cx="70" cy="82" rx="40" ry="28" fill="#F9A8D4" />
      <ellipse cx="108" cy="82" rx="8" ry="10" fill="#F472B6" />
      <circle cx="106" cy="79" r="1.6" fill="#9D174D" />
      <circle cx="106" cy="86" r="1.6" fill="#9D174D" />
      <circle cx="90" cy="72" r="2.4" fill="#1C1917" />
      <rect x="60" y="54" width="22" height="5" rx="2.5" fill="#9D174D" />
      <circle cx="71" cy="34" r="12" fill="#F59E0B" />
      <circle cx="71" cy="34" r="9" fill="#FBBF24" />
      <T x={71} y={39} s={12} c="#B45309">€</T>
      {/* interés compuesto: crece cada vez más deprisa */}
      <path d="M130 116H226M130 116V20" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      <path d="M132 112Q196 108 222 24" stroke="#34D399" strokeWidth="3.5" strokeLinecap="round" />
      {[[152, 110], [176, 104], [198, 86], [214, 58]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="3.5" fill="#34D399" stroke="#141b2e" strokeWidth="1.5" />)}
      <circle cx="158" cy="44" r="13" fill="#10B981" fillOpacity=".25" stroke="#34D399" strokeWidth="2" />
      <T x={158} y={49} s={14} c="#A7F3D0">%</T>
    </Lienzo>
  )
}

// Punto de equilibrio: donde los ingresos alcanzan a los costes.
function PuntoEquilibrio(p) {
  return (
    <Lienzo {...p}>
      <path d="M30 74L170.7 44.4L30 114Z" fill="#F87171" fillOpacity=".18" />
      <path d="M170.7 44.4L220 34L220 20Z" fill="#34D399" fillOpacity=".25" />
      <Flecha x1={30} y1={114} x2={226} y2={114} c="#94A3B8" w={2} />
      <Flecha x1={30} y1={114} x2={30} y2={12} c="#94A3B8" w={2} />
      <path d="M30 74L220 34" stroke="#F87171" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M30 114L220 20" stroke="#34D399" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M170.7 48V114" stroke="#FBBF24" strokeWidth="1.8" strokeDasharray="4 3" />
      <circle cx="170.7" cy="44.4" r="7" fill="#FBBF24" stroke="#141b2e" strokeWidth="2.5" />
      <T x={18} y={78} s={10} c="#FCA5A5">CF</T>
    </Lienzo>
  )
}

// Clave = `musica/<tema>` y `economia/<tema>` (MusicaIndex, EconomiaIndex).
// El mercado: la curva de demanda (baja) y la de oferta (sube) se cruzan en
// el precio de equilibrio.
function Mercado(p) {
  return (
    <Lienzo {...p}>
      <path d="M40 16V114H216" stroke="#94A3B8" strokeWidth="2.5" />
      <T x={30} y={24} s={11} c="#94A3B8">P</T>
      <T x={214} y={128} s={11} c="#94A3B8">Q</T>
      <path d="M58 26Q110 70 196 104" stroke="#38BDF8" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M58 104Q120 74 196 24" stroke="#F97316" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M40 66H122M122 66V114" stroke="#FDE68A" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="122" cy="66" r="7" fill="#FBBF24" stroke="#141B2E" strokeWidth="2" />
      <T x={202} y={100} s={11} c="#38BDF8">D</T>
      <T x={202} y={30} s={11} c="#F97316">O</T>
    </Lienzo>
  )
}

// Instrumentos: un violín (cuerda), una trompeta (metal) y un xilófono (percusión).
function Instrumentos(p) {
  const laminas = ['#F87171', '#FB923C', '#FACC15', '#4ADE80', '#38BDF8', '#A78BFA']
  return (
    <Lienzo {...p}>
      {/* violín */}
      <g transform="rotate(-25 52 72)">
        <ellipse cx="52" cy="88" rx="20" ry="17" fill="#B45309" />
        <ellipse cx="52" cy="62" rx="15" ry="13" fill="#B45309" />
        <rect x="47" y="72" width="10" height="8" fill="#B45309" />
        <rect x="49" y="16" width="6" height="46" rx="2" fill="#1C1917" />
        <path d="M50 30V100M54 30V100" stroke="#FDE68A" strokeWidth=".8" />
        <path d="M44 80q2 4 0 8M60 80q-2 4 0 8" stroke="#1C1917" strokeWidth="1.6" />
      </g>
      {/* trompeta */}
      <path d="M96 40H150" stroke="#FBBF24" strokeWidth="5" strokeLinecap="round" />
      <path d="M150 40L172 28V52Z" fill="#FBBF24" />
      <path d="M106 40v10h30v-10" stroke="#FBBF24" strokeWidth="3" />
      <path d="M116 34v-6M124 34v-6M132 34v-6" stroke="#FDE68A" strokeWidth="3" strokeLinecap="round" />
      {/* xilófono */}
      {laminas.map((c, i) => <rect key={c} x={104 + i * 20} y={78 + i * 2} width="15" height={38 - i * 4} rx="3" fill={c} />)}
      <path d="M100 92L230 102M100 108L230 112" stroke="#57534E" strokeWidth="2" />
    </Lienzo>
  )
}

// Arquitectura: un arco apuntado con su rosetón y un templo al lado.
function Arquitectura(p) {
  return (
    <Lienzo {...p}>
      <path d="M20 120V60L60 30L100 60V120Z" fill="#CBBFA8" />
      <circle cx="60" cy="62" r="13" fill="#1E3A8A" stroke="#6B6457" strokeWidth="3" />
      <path d="M47 62H73M60 49V75M51 53L69 71M69 53L51 71" stroke="#CBBFA8" strokeWidth="1.5" />
      <path d="M44 120V100A28 28 0 0 1 60 84A28 28 0 0 1 76 100V120Z" fill="#1E293B" />
      <path d="M126 50L176 26L226 50Z" fill="#E7DCC4" />
      <rect x="128" y="50" width="96" height="8" fill="#D6C4A0" />
      {[136, 156, 176, 196, 216].map(x => <rect key={x} x={x - 4} y="58" width="8" height="54" fill="#E7DCC4" />)}
      <rect x="122" y="112" width="108" height="8" fill="#D6C4A0" />
    </Lienzo>
  )
}

// Pintura: paleta y pincel junto a un cuadro con su marco.
function Pintura(p) {
  return (
    <Lienzo {...p}>
      <rect x="22" y="18" width="104" height="82" rx="3" fill="#B45309" />
      <rect x="30" y="26" width="88" height="66" fill="#1E3A8A" />
      <circle cx="96" cy="44" r="9" fill="#FDE047" />
      <path d="M30 92L58 58L80 78L96 64L118 92Z" fill="#16A34A" />
      <path d="M150 110Q140 80 166 66Q196 52 218 70Q232 84 220 96Q206 100 206 110Q204 124 182 124Q156 124 150 110Z" fill="#E7C9A0" />
      <circle cx="192" cy="104" r="7" fill="#1E293B" />
      {[['#EF4444', 168, 78], ['#3B82F6', 188, 70], ['#FACC15', 208, 78], ['#22C55E', 164, 96]].map(([c, x, y]) => <circle key={c} cx={x} cy={y} r="6" fill={c} />)}
      <path d="M232 28L176 96" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
      <path d="M180 92L172 104L184 98Z" fill="#EF4444" />
    </Lienzo>
  )
}

export const ARTE_TEMAS_VARIOS = {
  'arte/arquitectura': Arquitectura,
  'arte/pintura': Pintura,
  'musica/notas': Notas,
  'musica/ritmo': Ritmo,
  'musica/instrumentos': Instrumentos,
  'economia/finanzas-personales': Finanzas,
  'economia/punto-equilibrio': PuntoEquilibrio,
  'economia/mercado': Mercado,
}
