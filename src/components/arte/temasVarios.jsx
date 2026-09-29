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
export const ARTE_TEMAS_VARIOS = {
  'musica/notas': Notas,
  'musica/ritmo': Ritmo,
  'economia/finanzas-personales': Finanzas,
  'economia/punto-equilibrio': PuntoEquilibrio,
}
