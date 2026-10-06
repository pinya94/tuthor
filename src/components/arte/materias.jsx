// Arte de las materias de /estudiar: una ilustración por materia, en el mismo
// lienzo 240×135 y estilo plano que las de los juegos. Enseña QUÉ se estudia
// (la línea del tiempo, el globo, el matraz…), no un icono suelto.
import { Lienzo, T, Flecha, Lapiz, estrella, destello } from './base'

function Historia(p) {
  const columnas = [91, 104, 117, 130, 143]
  return (
    <Lienzo {...p}>
      {/* pirámide */}
      <path d="M22 100L52 44L82 100Z" fill="#F59E0B" />
      <path d="M52 44L82 100H52Z" fill="#D97706" />
      {/* templo griego */}
      <path d="M86 58L120 38L154 58Z" fill="#FBBF24" />
      <rect x="88" y="58" width="64" height="6" fill="#FDE68A" />
      {columnas.map(x => <rect key={x} x={x} y="64" width="6" height="30" fill="#FDE68A" />)}
      <rect x="84" y="94" width="72" height="6" fill="#FBBF24" />
      {/* castillo */}
      {[166, 178, 190, 202].map(x => <rect key={x} x={x} y="42" width="8" height="9" fill="#D97706" />)}
      <rect x="166" y="50" width="44" height="50" fill="#D97706" />
      <path d="M181 100V86A7 7 0 0 1 195 86V100Z" fill="#78350F" />
      <rect x="172" y="60" width="6" height="9" rx="3" fill="#78350F" />
      <rect x="198" y="60" width="6" height="9" rx="3" fill="#78350F" />
      <path d="M188 42V24" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
      <path d="M188 24L202 28L188 32Z" fill="#F43F5E" />
      {/* la línea del tiempo que las une */}
      <Flecha x1={14} y1={112} x2={226} y2={112} c="#B45309" w={3} />
      {[52, 120, 188].map(x => <circle key={x} cx={x} cy="112" r="4.5" fill="#FBBF24" stroke="#141b2e" strokeWidth="2" />)}
    </Lienzo>
  )
}

function Geografia(p) {
  return (
    <Lienzo {...p}>
      <defs>
        <clipPath id="arte-geo-globo"><circle cx="100" cy="68" r="50" /></clipPath>
      </defs>
      <circle cx="100" cy="68" r="50" fill="#115E59" />
      <g clipPath="url(#arte-geo-globo)" fill="#2DD4BF">
        <path d="M66 38Q80 28 94 36Q100 48 90 56Q82 68 70 62Q60 52 66 38Z" />
        <path d="M82 74Q94 70 98 82Q96 98 86 108Q78 94 82 74Z" />
        <path d="M110 30Q128 24 142 36Q146 48 134 52Q122 56 114 48Q106 40 110 30Z" />
        <path d="M116 62Q132 58 138 70Q136 88 124 94Q114 82 116 62Z" />
        <path d="M144 82Q154 80 156 90Q150 100 142 96Z" />
      </g>
      <g stroke="#CCFBF1" strokeOpacity=".22" strokeWidth="1.2">
        <ellipse cx="100" cy="68" rx="22" ry="50" />
        <path d="M50 68H150M56 44H144M56 92H144" />
      </g>
      <circle cx="100" cy="68" r="50" stroke="#5EEAD4" strokeWidth="2" />
      {/* chincheta */}
      <ellipse cx="126" cy="93" rx="6" ry="2" fill="#042F2E" fillOpacity=".6" />
      <path d="M126 92C120 84 114 78 114 71A12 12 0 0 1 138 71C138 78 132 84 126 92Z" fill="#F43F5E" />
      <circle cx="126" cy="71" r="4.5" fill="#FFF1F2" />
      {/* rosa de los vientos */}
      <circle cx="198" cy="56" r="24" fill="#134E4A" stroke="#2DD4BF" strokeWidth="2" />
      <path d="M198 38L204 56H192Z" fill="#F43F5E" />
      <path d="M192 56H204L198 74Z" fill="#CCFBF1" />
      <path d="M180 56H216" stroke="#2DD4BF" strokeOpacity=".5" strokeWidth="1.5" />
      <T x={198} y={27} s={10} c="#5EEAD4">N</T>
    </Lienzo>
  )
}

function Quimica(p) {
  return (
    <Lienzo {...p}>
      {/* matraz */}
      <path d="M55 82H101L112 106Q114 112 108 112H48Q42 112 44 106Z" fill="#10B981" />
      <path d="M70 22V50L44 106Q42 112 48 112H108Q114 112 112 106L86 50V22" stroke="#A7F3D0" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="65" y="17" width="26" height="6" rx="2" fill="#A7F3D0" />
      <path d="M58 88H98" stroke="#D1FAE5" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
      {[[68, 98, 3], [82, 92, 2.2], [92, 102, 2.6], [78, 42, 2.4]].map(([x, y, r]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r={r} fill="#D1FAE5" />
      ))}
      <circle cx="84" cy="9" r="2" fill="#6EE7B7" fillOpacity=".6" />
      {/* molécula de agua */}
      <path d="M160 80L138 102M160 80L182 102" stroke="#94A3B8" strokeWidth="5" strokeLinecap="round" />
      <circle cx="160" cy="80" r="16" fill="#F43F5E" />
      <circle cx="138" cy="102" r="10" fill="#F1F5F9" />
      <circle cx="182" cy="102" r="10" fill="#F1F5F9" />
      <T x={160} y={85} s={13} c="#FFF1F2">O</T>
      <T x={138} y={106} s={10} c="#334155">H</T>
      <T x={182} y={106} s={10} c="#334155">H</T>
      {/* casilla de la tabla periódica */}
      <rect x="182" y="16" width="40" height="44" rx="5" fill="#064E3B" stroke="#34D399" strokeWidth="2" />
      <T x={188} y={28} s={9} c="#6EE7B7" a="start">6</T>
      <T x={202} y={50} s={20} c="#A7F3D0">C</T>
    </Lienzo>
  )
}

function Fisica(p) {
  const rayos = ['#F87171', '#FB923C', '#FACC15', '#4ADE80', '#60A5FA', '#A78BFA']
  return (
    <Lienzo {...p}>
      {/* péndulo */}
      <path d="M24 16H96" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
      <path d="M26.2 88.5A80 80 0 0 0 93.8 88.5" stroke="#60A5FA" strokeOpacity=".5" strokeWidth="1.5" strokeDasharray="3 4" />
      <circle cx="26.2" cy="88.5" r="10" fill="#60A5FA" fillOpacity=".2" />
      <circle cx="60" cy="96" r="10" fill="#60A5FA" fillOpacity=".2" />
      <path d="M60 16L93.8 88.5" stroke="#CBD5E1" strokeWidth="2" />
      <circle cx="60" cy="16" r="3.5" fill="#CBD5E1" />
      <circle cx="93.8" cy="88.5" r="10" fill="#3B82F6" />
      {/* prisma */}
      <path d="M118 84L166 72" stroke="#F8FAFC" strokeWidth="3" strokeLinecap="round" />
      <path d="M166 72L200 76" stroke="#F8FAFC" strokeOpacity=".45" strokeWidth="2.5" />
      {rayos.map((c, i) => (
        <path key={c} d={`M200 76L234 ${70 + i * 7.5}`} stroke={c} strokeWidth="2.5" strokeLinecap="round" />
      ))}
      <path d="M150 100L182 44L214 100Z" fill="#1E3A8A" fillOpacity=".55" stroke="#93C5FD" strokeWidth="2" strokeLinejoin="round" />
    </Lienzo>
  )
}

function Biologia(p) {
  return (
    <Lienzo {...p}>
      {/* célula */}
      <ellipse cx="56" cy="68" rx="40" ry="36" fill="#DCFCE7" stroke="#22C55E" strokeWidth="3" />
      <circle cx="52" cy="62" r="13" fill="#A78BFA" />
      <circle cx="55" cy="59" r="4" fill="#6D28D9" />
      <ellipse cx="76" cy="86" rx="9" ry="5" fill="#FB923C" transform="rotate(-25 76 86)" />
      <ellipse cx="32" cy="80" rx="7" ry="4" fill="#FB923C" transform="rotate(20 32 80)" />
      {[[36, 52], [72, 50], [58, 90], [44, 94], [84, 66]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="2" fill="#4ADE80" />)}
      {/* hoja */}
      <path d="M102 102Q100 50 148 36Q152 86 102 102Z" fill="#22C55E" />
      <path d="M104 100Q126 72 146 40" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
      <path d="M116 85Q113 76 110 70M116 85Q126 84 132 80M128 68Q126 60 124 54M128 68Q136 66 142 60" stroke="#14532D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M102 102L96 114" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
      {/* ADN */}
      <path d="M180 18C212 34 180 50 212 66C180 82 212 98 180 114" stroke="#F472B6" strokeWidth="4" strokeLinecap="round" />
      <path d="M212 18C180 34 212 50 180 66C212 82 180 98 212 114" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
      <path d="M188 30H204M188 50H204M188 82H204M188 102H204" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
    </Lienzo>
  )
}

function Geologia(p) {
  return (
    <Lienzo {...p}>
      {/* el cielo: Saturno, la Luna, estrellas */}
      <g transform="rotate(-15 70 38)">
        <path d="M38 38A32 8 0 0 1 102 38" stroke="#FDE68A" strokeWidth="3" />
        <circle cx="70" cy="38" r="16" fill="#FBBF24" />
        <path d="M58 32H82M56 42H84" stroke="#D97706" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
        <path d="M38 38A32 8 0 0 0 102 38" stroke="#FDE68A" strokeWidth="3" />
      </g>
      <path d="M196 16A13 13 0 0 0 196 42A8 13 0 0 1 196 16Z" fill="#E2E8F0" />
      <path d={estrella(134, 24, 5)} fill="#E0E7FF" />
      <path d={estrella(24, 22, 3.5)} fill="#E0E7FF" />
      <path d={destello(160, 50, 5)} fill="#A5B4FC" />
      <path d={destello(222, 56, 4)} fill="#A5B4FC" />
      <circle cx="116" cy="54" r="1.8" fill="#E0E7FF" />
      <circle cx="30" cy="62" r="1.5" fill="#E0E7FF" />
      {/* corte del terreno: estratos, fósil y cristales */}
      <path d="M16 84Q60 76 104 84T192 82T224 80V122H16Z" fill="#A8A29E" />
      <path d="M16 96Q70 90 120 98T224 94V122H16Z" fill="#78716C" />
      <path d="M16 108Q80 104 130 110T224 106V122H16Z" fill="#57534E" />
      <path d="M74 101A4.5 4.5 0 1 1 69.5 96.5A3 3 0 1 1 72.5 99.5A1.5 1.5 0 1 1 71 98" stroke="#E7E5E4" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M144 88L148 66L154 62L158 68L156 88Z" fill="#A78BFA" />
      <path d="M156 88L160 72L166 70L169 88Z" fill="#C4B5FD" />
      <path d="M148 66L154 62L152 88" stroke="#EDE9FE" strokeOpacity=".6" strokeWidth="1.2" />
    </Lienzo>
  )
}

function Matematicas(p) {
  const rejilla = []
  for (let x = 30; x < 138; x += 12) rejilla.push(`M${x} 14V120`)
  for (let y = 26; y < 120; y += 12) rejilla.push(`M18 ${y}H138`)
  return (
    <Lienzo {...p}>
      {/* papel cuadriculado con ejes, recta y parábola */}
      <rect x="18" y="14" width="120" height="106" rx="8" fill="#2E1065" fillOpacity=".55" />
      <path d={rejilla.join('')} stroke="#A78BFA" strokeOpacity=".15" strokeWidth="1" />
      <path d="M24 86H132M54 20V114" stroke="#C4B5FD" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M34 24Q78 176 122 24" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" />
      <path d="M28 112L130 30" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
      {/* escuadra */}
      <path d="M152 112V34L220 112ZM162 102V60L198 102Z" fill="#8B5CF6" fillRule="evenodd" />
      <path d="M160 112v-5M168 112v-5M176 112v-7M184 112v-5M192 112v-5M200 112v-7M208 112v-5" stroke="#EDE9FE" strokeWidth="1.2" />
      <T x={204} y={58} s={28} c="#C4B5FD" w={700}>π</T>
    </Lienzo>
  )
}

function Espanol(p) {
  return (
    <Lienzo {...p}>
      {/* libro abierto */}
      <path d="M18 44V114Q48 106 78 114Q108 106 138 114V44Z" fill="#BE123C" />
      <path d="M22 40Q50 32 78 40V108Q50 100 22 108Z" fill="#FFF1F2" />
      <path d="M78 40Q106 32 134 40V108Q106 100 78 108Z" fill="#FFE4E6" />
      <path d="M30 54H70M30 64H66M30 74H70M30 84H58M86 54H126M86 64H120" stroke="#FDA4AF" strokeWidth="3" strokeLinecap="round" />
      <T x={106} y={90} s={15} c="#BE123C">¿Qué?</T>
      {/* la eñe */}
      <rect x="156" y="18" width="62" height="70" rx="12" fill="#F43F5E" />
      <T x={187} y={74} s={46} c="#FFF1F2">Ñ</T>
      <Lapiz x={150} y={110} ang={-4} cuerpo="#FB7185" veta="#F43F5E" goma="#FBBF24" largo={40} />
    </Lienzo>
  )
}

function Ingles(p) {
  const fichas = [{ x: 62, t: 'am' }, { x: 102, t: 'is', on: true }, { x: 142, t: 'are' }]
  return (
    <Lienzo {...p}>
      <path d="M44 72L40 92L64 72Z" fill="#38BDF8" />
      <rect x="20" y="16" width="122" height="58" rx="18" fill="#38BDF8" />
      <T x={81} y={54} s={25} c="#0C4A6E">Hello!</T>
      <path d="M194 86L204 104L180 86Z" fill="#F87171" />
      <rect x="140" y="42" width="80" height="46" rx="16" fill="#F87171" />
      <T x={180} y={72} s={20} c="#FFF1F2">Hi!</T>
      {fichas.map(({ x, t, on }) => (
        <g key={t}>
          <rect x={x} y="100" width="34" height="24" rx="6" fill={on ? '#FBBF24' : '#1E293B'} stroke={on ? '#FBBF24' : '#94A3B8'} strokeWidth="1.5" />
          <T x={x + 17} y={117} s={12} c={on ? '#1C1917' : '#E2E8F0'}>{t}</T>
        </g>
      ))}
    </Lienzo>
  )
}

function Economia(p) {
  const pila = (cx, n, base) => Array.from({ length: n }, (_, i) => {
    const cy = base - i * 9
    return (
      <g key={`${cx}-${i}`}>
        <path d={`M${cx - 22} ${cy}V${cy + 8}A22 6 0 0 0 ${cx + 22} ${cy + 8}V${cy}Z`} fill="#D97706" />
        <ellipse cx={cx} cy={cy} rx="22" ry="6" fill="#FBBF24" />
      </g>
    )
  })
  const barras = [[124, 24], [146, 38], [168, 54], [190, 74]]
  return (
    <Lienzo {...p}>
      {pila(48, 5, 100)}
      <T x={48} y={68} s={10} c="#B45309">€</T>
      {pila(88, 3, 104)}
      {barras.map(([x, h], i) => (
        <rect key={x} x={x} y={112 - h} width="16" height={h} rx="3" fill="#10B981" fillOpacity={0.45 + i * 0.18} />
      ))}
      <path d="M118 112H212" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      <Flecha x1={120} y1={92} x2={214} y2={26} c="#FBBF24" w={3.5} />
      <circle cx="140" cy="32" r="13" fill="#F43F5E" />
      <T x={140} y={37} s={14} c="#FFF1F2">%</T>
    </Lienzo>
  )
}

function Musica(p) {
  return (
    <Lienzo {...p}>
      {/* pentagrama con notas */}
      <path d="M16 40H172M16 50H172M16 60H172M16 70H172M16 80H172" stroke="#A5B4FC" strokeOpacity=".55" strokeWidth="1.5" />
      <path d="M16 40V80M172 40V80" stroke="#A5B4FC" strokeOpacity=".8" strokeWidth="2.5" />
      <ellipse cx="44" cy="70" rx="7" ry="5" fill="#E879F9" transform="rotate(-20 44 70)" />
      <path d="M50.5 68V36" stroke="#E879F9" strokeWidth="2" />
      <ellipse cx="82" cy="60" rx="7" ry="5" fill="#C084FC" transform="rotate(-20 82 60)" />
      <ellipse cx="108" cy="50" rx="7" ry="5" fill="#C084FC" transform="rotate(-20 108 50)" />
      <path d="M88.5 58V28M114.5 48V22" stroke="#C084FC" strokeWidth="2" />
      <path d="M88.5 28L114.5 22" stroke="#C084FC" strokeWidth="5" />
      <ellipse cx="144" cy="55" rx="7" ry="5" stroke="#818CF8" strokeWidth="2.5" transform="rotate(-20 144 55)" />
      <path d="M150.5 53V24" stroke="#818CF8" strokeWidth="2" />
      {/* metrónomo */}
      <path d="M184 112L198 34H212L226 112Z" fill="#6366F1" />
      <path d="M192 104L203 48H207L218 104Z" fill="#312E81" />
      <path d="M205 98L193 52" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="191" y="61" width="10" height="7" rx="2" fill="#FBBF24" transform="rotate(-14 196 64)" />
      <rect x="180" y="110" width="50" height="6" rx="2" fill="#4338CA" />
      <path d="M180 32Q174 42 180 52M172 28Q164 42 172 56" stroke="#E879F9" strokeOpacity=".5" strokeWidth="1.8" strokeLinecap="round" />
    </Lienzo>
  )
}

function Arte(p) {
  // Un caballete con un cuadro y, detrás, la fachada de un templo.
  return (
    <Lienzo {...p}>
      <path d="M120 36L176 14L232 36Z" fill="#E7DCC4" />
      <rect x="124" y="36" width="104" height="6" fill="#D6C4A0" />
      {[132, 152, 172, 192, 212].map(x => <rect key={x} x={x} y="44" width="8" height="58" fill="#E7DCC4" />)}
      <rect x="118" y="102" width="116" height="8" fill="#D6C4A0" />
      <path d="M40 120L62 34M100 120L78 34M70 34V128" stroke="#92400E" strokeWidth="4" strokeLinecap="round" />
      <rect x="36" y="38" width="68" height="54" rx="2" fill="#F8FAFC" stroke="#B45309" strokeWidth="3" />
      <circle cx="56" cy="56" r="8" fill="#FBBF24" />
      <path d="M40 88L60 66L74 78L86 64L100 88Z" fill="#38BDF8" />
      <path d="M38 92H102" stroke="#92400E" strokeWidth="4" />
    </Lienzo>
  )
}

function PrimerosAuxilios(p) {
  return (
    <Lienzo {...p}>
      {/* botiquín */}
      <path d="M52 38V30Q52 24 58 24H82Q88 24 88 30V38" stroke="#B91C1C" strokeWidth="5" />
      <rect x="26" y="38" width="88" height="68" rx="10" fill="#EF4444" />
      <path d="M26 54H114" stroke="#B91C1C" strokeWidth="2" />
      <rect x="63" y="60" width="14" height="38" rx="2" fill="#FFFFFF" />
      <rect x="51" y="72" width="38" height="14" rx="2" fill="#FFFFFF" />
      {/* corazón y latido */}
      <path d="M176 90C176 90 142 70 142 48A17 17 0 0 1 176 40A17 17 0 0 1 210 48C210 70 176 90 176 90Z" fill="#F87171" />
      <path d="M152 48A9 9 0 0 1 162 40" stroke="#FECACA" strokeOpacity=".7" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M122 110H150L156 98L163 124L169 102L173 110H226" stroke="#FECACA" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </Lienzo>
  )
}

// Cabecera de la portada de cada materia: el mismo dibujo que su tarjeta.
export function ArteMateria({ id, className = 'w-full max-w-[200px] mx-auto aspect-video block mb-2' }) {
  const Arte = ARTE_MATERIAS[id]
  return Arte ? <Arte className={className} /> : null
}

// Clave = id de la materia en /estudiar (data/materiasEstudio.js).
export const ARTE_MATERIAS = {
  historia: Historia,
  geografia: Geografia,
  quimica: Quimica,
  fisica: Fisica,
  biologia: Biologia,
  geologia: Geologia,
  matematicas: Matematicas,
  espanol: Espanol,
  ingles: Ingles,
  economia: Economia,
  musica: Musica,
  arte: Arte,
  'vida-practica': PrimerosAuxilios,
}
