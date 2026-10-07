// Arte de los juegos de lengua e idiomas. Familia rosa/fucsia.
// Los juegos de inglés usan palabras en inglés porque es su material.
import { Lienzo, T, Flecha, Lapiz } from './base'

function Palabra({ x, y, intrusa }) {
  return (
    <g transform={intrusa ? `rotate(7 ${x + 32} ${y + 14})` : undefined}>
      <rect x={x} y={y} width="64" height="28" rx="6" fill={intrusa ? '#F43F5E' : '#FFF1F2'} />
      <rect x={x + 10} y={y + 9} width="40" height="5" rx="2.5" fill={intrusa ? '#FFFFFF' : '#F472B6'} />
      <rect x={x + 10} y={y + 17} width="28" height="4" rx="2" fill={intrusa ? '#FBCFE8' : '#FBCFE8'} />
    </g>
  )
}

function Intruso(p) {
  return (
    <Lienzo {...p}>
      <Palabra x={30} y={26} />
      <Palabra x={104} y={26} />
      <Palabra x={30} y={72} />
      <Palabra x={104} y={72} intrusa />
      <circle cx="168" cy="92" r="19" fill="#FBBF24" fillOpacity=".15" stroke="#FBBF24" strokeWidth="4.5" />
      <path d="M182 106L198 122" stroke="#FBBF24" strokeWidth="7" strokeLinecap="round" />
    </Lienzo>
  )
}

function AnalizaFrases(p) {
  const bloques = [
    { x: 18, w: 34, f: '#FBCFE8', b: '#EC4899' },
    { x: 56, w: 40, f: '#FBCFE8', b: '#EC4899' },
    { x: 102, w: 30, f: '#F472B6', b: '#FFFFFF' },
    { x: 136, w: 44, f: '#FFF1F2', b: '#FBCFE8' },
    { x: 184, w: 38, f: '#FFF1F2', b: '#FBCFE8' },
  ]
  return (
    <Lienzo {...p}>
      {bloques.map(({ x, w, f, b }) => (
        <g key={x}>
          <rect x={x} y="40" width={w} height="26" rx="6" fill={f} />
          <rect x={x + 6} y="51" width={w - 12} height="4" rx="2" fill={b} />
        </g>
      ))}
      <path d="M117 36V40" stroke="#FBBF24" strokeWidth="2" />
      <rect x="105" y="20" width="24" height="16" rx="5" fill="#FBBF24" />
      <T x={117} y={32} s={10} c="#422006">V</T>
      <path d="M18 72V80H96V72" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="57" cy="97" r="11" fill="#EC4899" />
      <T x={57} y={101.5} s={12} c="#FFFFFF">S</T>
      <path d="M102 72V80H222V72" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="162" cy="97" r="11" fill="#8B5CF6" />
      <T x={162} y={101.5} s={12} c="#FFFFFF">P</T>
    </Lienzo>
  )
}

function OrdenaFrase(p) {
  return (
    <Lienzo {...p}>
      <rect x="30" y="84" width="50" height="28" rx="7" fill="#EC4899" />
      <T x={55} y={103} s={14} c="#FFFFFF">I</T>
      <rect x="95.75" y="84.75" width="48.5" height="26.5" rx="7" stroke="#F472B6" strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x="160" y="84" width="50" height="28" rx="7" fill="#EC4899" />
      <T x={185} y={103} s={14} c="#FFFFFF">cats</T>
      <g transform="rotate(-7 120 42)">
        <rect x="98" y="31" width="50" height="28" rx="7" fill="#000000" fillOpacity=".25" />
        <rect x="95" y="28" width="50" height="28" rx="7" fill="#FBBF24" />
        <T x={120} y={47} s={14} c="#422006">like</T>
      </g>
      <Flecha x1={120} y1={62} x2={120} y2={78} c="#FBBF24" />
    </Lienzo>
  )
}

function PiezaQueFalta(p) {
  return (
    <Lienzo {...p}>
      <rect x="18" y="70" width="64" height="30" rx="6" fill="#EC4899" />
      <circle cx="82" cy="85" r="7" fill="#EC4899" />
      <T x={48} y={90} s={13} c="#FFFFFF">She</T>
      <rect x="82.75" y="70.75" width="62.5" height="28.5" rx="6" stroke="#F472B6" strokeWidth="1.5" strokeDasharray="4 3" />
      <rect x="146" y="70" width="76" height="30" rx="6" fill="#EC4899" />
      <T x={184} y={90} s={13} c="#FFFFFF">eaten</T>
      <g transform="rotate(8 114 35)">
        <rect x="82" y="20" width="64" height="30" rx="6" fill="#FBBF24" />
        <circle cx="146" cy="35" r="7" fill="#FBBF24" />
        <circle cx="82" cy="35" r="7" fill="#141B2E" />
        <T x={116} y={40} s={13} c="#422006">has</T>
      </g>
      <Flecha x1={114} y1={54} x2={114} y2={66} c="#FBBF24" />
    </Lienzo>
  )
}

function PonLaTilde(p) {
  return (
    <Lienzo {...p}>
      <rect x="142" y="62" width="50" height="40" rx="8" fill="#EC4899" fillOpacity=".22" stroke="#EC4899" strokeWidth="2" />
      <T x={64} y={92} s={30} c="#F8FAFC">can</T>
      <circle cx="94" cy="84" r="2.5" fill="#94A3B8" />
      <T x={116} y={92} s={30} c="#F8FAFC">ci</T>
      <circle cx="139" cy="84" r="2.5" fill="#94A3B8" />
      <T x={166} y={92} s={30} c="#F8FAFC">on</T>
      <path d="M157.5 26V40" stroke="#F43F5E" strokeOpacity=".45" strokeWidth="2" strokeDasharray="3 3" strokeLinecap="round" />
      <path d="M153 58L162 47" stroke="#F43F5E" strokeWidth="5" strokeLinecap="round" />
      <rect x="40" y="104" width="48" height="4" rx="2" fill="#475569" />
      <rect x="104" y="104" width="24" height="4" rx="2" fill="#475569" />
      <rect x="148" y="104" width="36" height="4" rx="2" fill="#EC4899" />
    </Lienzo>
  )
}

function CorrigeElTexto(p) {
  const lineas = [[28, 100], [42, 84], [56, 100], [70, 64], [84, 100], [98, 72]]
  return (
    <Lienzo {...p}>
      <rect x="46" y="14" width="124" height="108" rx="6" fill="#FFF1F2" />
      {lineas.map(([y, w]) => <rect key={y} x="58" y={y} width={w} height="6" rx="3" fill="#FBCFE8" />)}
      <rect x="98" y="56" width="34" height="6" rx="3" fill="#F43F5E" />
      <ellipse cx="115" cy="59" rx="24" ry="10" stroke="#F43F5E" strokeWidth="2.5" />
      <path d="M134 48L124 52" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
      <rect x="126" y="34" width="40" height="14" rx="7" fill="#10B981" />
      <rect x="134" y="39.5" width="24" height="3" rx="1.5" fill="#D1FAE5" />
      <Lapiz x={178} y={104} ang={-50} cuerpo="#F43F5E" veta="#BE123C" goma="#FBCFE8" largo={34} />
    </Lienzo>
  )
}

function MideElVerso(p) {
  // Un pergamino con versos y la pluma contando sílabas.
  return (
    <Lienzo {...p}>
      <rect x="40" y="16" width="130" height="104" rx="6" fill="#FDF6E3" />
      {[34, 50, 66, 82, 98].map((y, i) => <path key={y} d={`M54 ${y}H${i % 2 ? 140 : 154}`} stroke="#A8A29E" strokeWidth="3" strokeLinecap="round" />)}
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => <circle key={i} cx={58 + i * 12} cy="50" r="3.5" fill="#F59E0B" />)}
      <path d="M216 14L176 92L170 106L182 96L222 18Z" fill="#E7E5E4" stroke="#78716C" strokeWidth="2" />
      <path d="M170 106L164 118" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" />
      <text x="198" y="122" textAnchor="middle" fontSize="20" fontWeight="800" fill="#FBBF24">8</text>
    </Lienzo>
  )
}

export const ARTE_LENGUA = {
  intruso: Intruso,
  'analiza-frases': AnalizaFrases,
  'ordena-frase': OrdenaFrase,
  'pieza-que-falta': PiezaQueFalta,
  'pon-la-tilde': PonLaTilde,
  'mide-el-verso': MideElVerso,
  'corrige-el-texto': CorrigeElTexto,
}
