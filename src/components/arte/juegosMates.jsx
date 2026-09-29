// Arte de los juegos de matemáticas. Familia violeta con acentos ámbar/rosa.
// Cada dibujo enseña la mecánica real del juego, no un símbolo genérico.
import { Lienzo, T, Flecha, FlechaCurva, Balon } from './base'

function Acercate(p) {
  return (
    <Lienzo {...p}>
      <circle cx="158" cy="67" r="46" fill="#4C1D95" />
      <circle cx="158" cy="67" r="35" fill="#6D28D9" />
      <circle cx="158" cy="67" r="24" fill="#8B5CF6" />
      <circle cx="158" cy="67" r="14" fill="#F8FAFC" />
      <T x={158} y={72} s={14} c="#4C1D95">24</T>
      <rect x="26" y="28" width="28" height="28" rx="7" fill="#FBBF24" />
      <T x={40} y={48} s={16} c="#422006">3</T>
      <rect x="26" y="78" width="28" height="28" rx="7" fill="#FBBF24" />
      <T x={40} y={98} s={16} c="#422006">8</T>
      <rect x="62" y="53" width="28" height="28" rx="14" fill="#F472B6" />
      <T x={76} y={73} s={17} c="#FFFFFF">×</T>
      <Flecha x1={96} y1={67} x2={116} y2={67} c="#FBBF24" />
    </Lienzo>
  )
}

function NumPath(p) {
  // +2 ×3 ÷2 +4 +1 → 8: el camino resaltado da exactamente la meta.
  const ops = [['+2', '×3', '−1'], ['+5', '÷2', '+4'], ['×2', '−3', '+1']]
  const camino = new Set(['0,0', '0,1', '1,1', '1,2', '2,2'])
  const X = c => 72 + c * 36
  const Y = r => 18 + r * 36
  return (
    <Lienzo {...p}>
      <path d="M58 31H85H121V67H157V103" stroke="#FBBF24" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="56" cy="31" r="6" fill="#FBBF24" />
      {ops.map((fila, r) => fila.map((op, c) => {
        const on = camino.has(`${r},${c}`)
        return (
          <g key={`${r}${c}`}>
            <rect x={X(c)} y={Y(r)} width="26" height="26" rx="7" fill={on ? '#6D28D9' : '#262045'} />
            <T x={X(c) + 13} y={Y(r) + 17.5} s={10.5} c={on ? '#FFFFFF' : '#8B7FC7'}>{op}</T>
          </g>
        )
      }))}
      <path d="M184 84V118" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M184 84L202 90L184 96Z" fill="#34D399" />
      <rect x="18" y="96" width="40" height="22" rx="11" fill="#FBBF24" />
      <T x={38} y={111} s={11} c="#422006">= 8</T>
    </Lienzo>
  )
}

function MenorAMayor(p) {
  return (
    <Lienzo {...p}>
      <path d="M40 116H200" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      <rect x="62" y="78" width="34" height="38" rx="6" fill="#5B21B6" />
      <rect x="103" y="58" width="34" height="58" rx="6" fill="#7C3AED" />
      <rect x="144" y="36" width="34" height="80" rx="6" fill="#A78BFA" />
      <T x={79} y={104} s={17} c="#FFFFFF">¼</T>
      <T x={120} y={94} s={17} c="#FFFFFF">½</T>
      <T x={161} y={84} s={13} c="#2E1065">90%</T>
      <FlechaCurva x1={64} y1={66} cx={100} cy={14} x2={154} y2={24} c="#FBBF24" />
    </Lienzo>
  )
}

function RelojHoras(p) {
  const menores = [[112.5, 38.4], [124.6, 50.5], [124.6, 83.5], [112.5, 95.6], [79.5, 95.6], [67.4, 83.5], [67.4, 50.5], [79.5, 38.4]]
  return (
    <Lienzo {...p}>
      <circle cx="96" cy="67" r="48" fill="#7C3AED" />
      <circle cx="96" cy="67" r="40" fill="#F8FAFC" />
      <path d="M96 31v7M132 67h-7M96 103v-7M60 67h7" stroke="#5B21B6" strokeWidth="3.5" strokeLinecap="round" />
      {menores.map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.8" fill="#C4B5FD" />)}
      <path d="M96 67L79.6 55.5" stroke="#1E1238" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M96 67L122 52" stroke="#1E1238" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="96" cy="67" r="4" fill="#F472B6" />
      <rect x="158" y="50" width="64" height="34" rx="9" fill="#1E1238" />
      <T x={190} y={73} s={16} c="#FBBF24">10:10</T>
    </Lienzo>
  )
}

function ElCambio(p) {
  return (
    <Lienzo {...p}>
      <rect x="26" y="34" width="104" height="58" rx="7" fill="#FB7185" />
      <rect x="32" y="40" width="92" height="46" rx="4" stroke="#FFE4E6" strokeOpacity=".6" strokeWidth="1.5" />
      <circle cx="104" cy="63" r="14" fill="#FFE4E6" fillOpacity=".3" />
      <T x={58} y={72} s={22} c="#FFFFFF">10</T>
      <T x={104} y={68} s={14} c="#FFFFFF">€</T>
      {[0, 1, 2].map(i => {
        const y = 106 - i * 10
        return (
          <g key={i}>
            <rect x="150" y={y - 5} width="44" height="10" fill="#D97706" />
            <ellipse cx="172" cy={y - 5} rx="22" ry="6" fill="#FBBF24" />
          </g>
        )
      })}
      <circle cx="140" cy="106" r="17" fill="#FBBF24" stroke="#D97706" strokeWidth="3" />
      <T x={140} y={111} s={12} c="#78350F">2€</T>
      <FlechaCurva x1={124} y1={30} cx={164} cy={6} x2={172} y2={66} c="#A78BFA" w={2.5} />
    </Lienzo>
  )
}

function Columna({ x }) {
  return (
    <g>
      <rect x={x - 3} y="40" width="18" height="6" rx="1.5" fill="#D6D3D1" />
      <rect x={x} y="46" width="12" height="64" fill="#E7E5E4" />
      <path d={`M${x + 4} 48V108M${x + 8} 48V108`} stroke="#D6D3D1" strokeWidth="1.2" />
      <rect x={x - 3} y="110" width="18" height="6" rx="1.5" fill="#D6D3D1" />
    </g>
  )
}

function NumerosRomanos(p) {
  return (
    <Lienzo {...p}>
      <Columna x={28} />
      <Columna x={200} />
      <path d="M62 112V52Q62 22 120 22Q178 22 178 52V112Z" fill="#F5F5F4" />
      <path d="M69 106V54Q69 30 120 30Q171 30 171 54V106Z" stroke="#D6D3D1" strokeWidth="2" />
      <T x={120} y={78} s={30} c="#57534E" w={700} fontFamily="Georgia, 'Times New Roman', serif" letterSpacing="1.5">XLIX</T>
      <rect x="96" y="88" width="48" height="18" rx="9" fill="#8B5CF6" />
      <T x={120} y={101} s={11} c="#FFFFFF">= 49</T>
      <rect x="54" y="112" width="132" height="8" rx="2" fill="#D6D3D1" />
    </Lienzo>
  )
}

function EscaleraUnidades(p) {
  const peldanos = ['km', 'hm', 'dam', 'm', 'dm']
  const tonos = ['#4C1D95', '#5B21B6', '#6D28D9', '#7C3AED', '#8B5CF6']
  return (
    <Lienzo {...p}>
      {peldanos.map((u, i) => {
        const x = 30 + i * 36
        const y = 22 + i * 20
        return (
          <g key={u} opacity={i === 4 ? 0.6 : 1}>
            <rect x={x} y={y} width="36" height={118 - y} rx="4" fill={tonos[i]} />
            <T x={x + 18} y={y + 15} s={11} c="#FFFFFF">{u}</T>
          </g>
        )
      })}
      <FlechaCurva x1={46} y1={20} cx={64} cy={-2} x2={80} y2={38} c="#FBBF24" w={2.5} />
      <T x={64} y={11} s={10} c="#FBBF24">×10</T>
      <FlechaCurva x1={82} y1={40} cx={100} cy={18} x2={116} y2={58} c="#FBBF24" w={2.5} />
      <T x={103} y={30} s={10} c="#FBBF24">×10</T>
    </Lienzo>
  )
}

function Redondeo(p) {
  return (
    <Lienzo {...p}>
      <path d="M26 86H214" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round" />
      <path d="M50 76V96M190 76V96" stroke="#F8FAFC" strokeWidth="3" strokeLinecap="round" />
      <path d="M120 80V92" stroke="#A78BFA" strokeWidth="2" strokeDasharray="2 2" />
      <T x={50} y={114} s={14} c="#34D399">370</T>
      <T x={190} y={114} s={14} c="#94A3B8">380</T>
      <path d="M106 54V79" stroke="#38BDF8" strokeWidth="2" />
      <rect x="88" y="34" width="36" height="20" rx="10" fill="#38BDF8" />
      <T x={106} y={48} s={12} c="#082F49">374</T>
      <circle cx="106" cy="86" r="6.5" fill="#38BDF8" stroke="#0C1A33" strokeWidth="2" />
      <FlechaCurva x1={98} y1={72} cx={76} cy={56} x2={56} y2={72} c="#34D399" w={2.5} />
    </Lienzo>
  )
}

function TablasMultiplicar(p) {
  const cab = ['×', '5', '6', '7', '8']
  const X = c => 69 + c * 21
  const Y = r => 16 + r * 21
  const celdas = []
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      let fill = '#221B45'
      let txt = null
      let tc = '#FFFFFF'
      if (r === 0 && c === 0) { fill = '#F472B6'; txt = '×' }
      else if (r === 0) { fill = '#6D28D9'; txt = cab[c] }
      else if (c === 0) { fill = '#6D28D9'; txt = cab[r] }
      else if (r === 3 && c === 4) { fill = '#FBBF24'; txt = '56'; tc = '#422006' }
      else if (r === 3 || c === 4) fill = '#3B2F7A'
      celdas.push(
        <g key={`${r}${c}`}>
          <rect x={X(c)} y={Y(r)} width="18" height="18" rx="4" fill={fill} />
          {txt && <T x={X(c) + 9} y={Y(r) + 12.5} s={txt === '56' ? 9 : 10} c={tc}>{txt}</T>}
        </g>,
      )
    }
  }
  return <Lienzo {...p}>{celdas}</Lienzo>
}

function RepartePastel(p) {
  const radios = [[100, 25], [130.4, 37.6], [143, 68], [130.4, 98.4], [100, 111], [69.6, 98.4], [57, 68], [69.6, 37.6]]
  return (
    <Lienzo {...p}>
      <circle cx="100" cy="68" r="51" fill="#2A2550" />
      <circle cx="100" cy="68" r="43" fill="#FDE68A" />
      <path d="M100 68L100 25A43 43 0 0 1 130.4 98.4Z" fill="#F472B6" />
      {radios.map(([x, y]) => <path key={`${x}${y}`} d={`M100 68L${x} ${y}`} stroke="#FFF7ED" strokeWidth="2" />)}
      <path d="M116 42Q118 34 124 32" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="116" cy="46" r="4.5" fill="#EF4444" />
      <T x={182} y={58} s={24} c="#F472B6">3</T>
      <path d="M166 68H198" stroke="#F8FAFC" strokeWidth="3" strokeLinecap="round" />
      <T x={182} y={96} s={24} c="#F8FAFC">8</T>
    </Lienzo>
  )
}

function SaltaRecta(p) {
  const marcas = ['−2', '−1', '0', '1', '2', '3']
  return (
    <Lienzo {...p}>
      <path d="M20 102H220" stroke="#A78BFA" strokeWidth="3" strokeLinecap="round" />
      {marcas.map((m, k) => {
        const x = 40 + k * 32
        const c = k < 2 ? '#F472B6' : k === 2 ? '#FFFFFF' : '#C4B5FD'
        return (
          <g key={m}>
            <path d={`M${x} 96V108`} stroke="#C4B5FD" strokeWidth="2" strokeLinecap="round" />
            <T x={x} y={124} s={11} c={c}>{m}</T>
          </g>
        )
      })}
      <path d="M72 96Q104 56 136 96" stroke="#34D399" strokeWidth="2" strokeDasharray="4 4" />
      <T x={104} y={70} s={11} c="#34D399">+2</T>
      <path d="M136 96Q168 34 200 96" stroke="#34D399" strokeWidth="2" strokeDasharray="4 4" />
      <ellipse cx="155" cy="70" rx="7" ry="3.5" fill="#059669" />
      <ellipse cx="181" cy="70" rx="7" ry="3.5" fill="#059669" />
      <ellipse cx="168" cy="62" rx="16" ry="12" fill="#34D399" />
      <ellipse cx="168" cy="66" rx="9.5" ry="7" fill="#A7F3D0" />
      <circle cx="160" cy="50" r="5.5" fill="#34D399" />
      <circle cx="176" cy="50" r="5.5" fill="#34D399" />
      <circle cx="160" cy="50" r="3.2" fill="#FFFFFF" />
      <circle cx="176" cy="50" r="3.2" fill="#FFFFFF" />
      <circle cx="160.8" cy="50.5" r="1.6" fill="#0F172A" />
      <circle cx="176.8" cy="50.5" r="1.6" fill="#0F172A" />
      <path d="M163 60Q168 63 173 60" stroke="#047857" strokeWidth="1.5" strokeLinecap="round" />
    </Lienzo>
  )
}

function LeeElGrafico(p) {
  const pts = '44 98 78 76 108 84 138 40 168 58 204 70'
  return (
    <Lienzo {...p}>
      <path d="M36 40H216M36 64H216M36 88H216" stroke="#334155" strokeWidth="1" strokeDasharray="3 4" />
      <path d="M44 98L78 76L108 84L138 40L168 58L204 70L204 112L44 112Z" fill="#38BDF8" fillOpacity=".15" />
      <polyline points={pts} stroke="#38BDF8" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      {[[44, 98], [78, 76], [108, 84], [168, 58], [204, 70]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="2.5" fill="#38BDF8" />)}
      <path d="M138 46V112" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="138" cy="40" r="6" fill="#FBBF24" stroke="#0F172A" strokeWidth="2" />
      <rect x="120" y="12" width="36" height="18" rx="9" fill="#FBBF24" />
      <path d="M132 25L138 17L144 25Z" fill="#422006" />
      <path d="M36 18V112H216" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Lienzo>
  )
}

function EstadisticoExpres(p) {
  const alturas = [40, 66, 52, 80, 46]
  return (
    <Lienzo {...p}>
      {alturas.map((h, i) => (
        <rect key={i} x={52 + i * 30} y={114 - h} width="22" height={h} rx="5" fill={i % 2 ? '#A78BFA' : '#7C3AED'} />
      ))}
      <path d="M40 114H206" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      <path d="M42 57H206" stroke="#FBBF24" strokeWidth="2.5" strokeDasharray="7 5" />
      <T x={218} y={64} s={17} c="#FBBF24" fontStyle="italic">x</T>
      <path d="M212 47H224" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
      <circle cx="36" cy="28" r="9" stroke="#F472B6" strokeWidth="2.5" />
      <path d="M36 28V22M33 15.5H39" stroke="#F472B6" strokeWidth="2.5" strokeLinecap="round" />
    </Lienzo>
  )
}

function Trayectoria(p) {
  return (
    <Lienzo {...p}>
      <path d="M16 116H224" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      <path d="M188 62L220 70V116H188Z" fill="#94A3B8" fillOpacity=".12" />
      <path d="M196 64V116M204 66V116M212 68V116M188 76L220 82M188 90L220 94M188 104L220 106" stroke="#94A3B8" strokeOpacity=".45" strokeWidth="1" />
      <rect x="186" y="60" width="4" height="56" fill="#F8FAFC" />
      <path d="M188 62L220 70" stroke="#F8FAFC" strokeWidth="3" strokeLinecap="round" />
      <FlechaCurva x1={48} y1={100} cx={116} cy={-8} x2={182} y2={82} c="#FBBF24" w={2.5} dash="6 5" />
      <Balon cx={40} cy={108} r={8} />
      <rect x="22" y="14" width="48" height="22" rx="11" fill="#6D28D9" />
      <T x={46} y={29} s={12} c="#FFFFFF" fontStyle="italic">f(x)</T>
    </Lienzo>
  )
}

function Portero(p) {
  const verticales = [64, 78, 92, 106, 120, 134, 148, 162, 176]
  const horizontales = [46, 60, 74, 88, 102, 116]
  return (
    <Lienzo {...p}>
      <path d={verticales.map(x => `M${x} 36V120`).join('') + horizontales.map(y => `M54 ${y}H186`).join('')} stroke="#475569" strokeOpacity=".7" strokeWidth="1" />
      <path d="M30 120H210" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      <path d="M50 120V32H190V120" stroke="#F8FAFC" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      {[100, 109, 118, 127].map(x => <rect key={x} x={x} y="40" width="8" height="26" rx="4" fill="#FBBF24" />)}
      <rect x="99" y="56" width="37" height="34" rx="11" fill="#FBBF24" />
      <rect x="85" y="66" width="9" height="22" rx="4.5" fill="#FBBF24" transform="rotate(-35 89 77)" />
      <rect x="106" y="66" width="22" height="4" rx="2" fill="#F59E0B" />
      <rect x="102" y="88" width="31" height="13" rx="3" fill="#F59E0B" />
      <rect x="102" y="93" width="31" height="3" fill="#FDE68A" />
      <path d="M168 48L184 40M170 58L190 54M166 38L178 30" stroke="#F8FAFC" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
      <Balon cx={152} cy={60} r={12} />
    </Lienzo>
  )
}

function FuncionesGrafica(p) {
  return (
    <Lienzo {...p}>
      <path d="M120 14V120M22 100H218" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      <path d="M70 34Q120 166 170 34" stroke="#C4B5FD" strokeOpacity=".7" strokeWidth="3" strokeDasharray="6 5" strokeLinecap="round" />
      <path d="M74 38Q120 158 166 38" stroke="#F472B6" strokeWidth="3.5" strokeLinecap="round" />
      <rect x="16" y="106" width="74" height="22" rx="11" fill="#1E1238" />
      <T x={28} y={121} s={11} c="#C4B5FD" w={700}>a</T>
      <path d="M38 117H80" stroke="#4C1D95" strokeWidth="3" strokeLinecap="round" />
      <path d="M38 117H64" stroke="#8B5CF6" strokeWidth="3" strokeLinecap="round" />
      <circle cx="64" cy="117" r="5.5" fill="#FBBF24" />
    </Lienzo>
  )
}

function BalanzaAlgebraica(p) {
  return (
    <Lienzo {...p}>
      <rect x="98" y="114" width="44" height="8" rx="3" fill="#5B21B6" />
      <rect x="117" y="40" width="6" height="76" fill="#7C3AED" />
      <path d="M44 43L26 74M44 43L62 74M196 43L178 74M196 43L214 74" stroke="#C4B5FD" strokeWidth="1.5" />
      <rect x="36" y="37" width="168" height="6" rx="3" fill="#A78BFA" />
      <circle cx="120" cy="40" r="6" fill="#FBBF24" />
      <path d="M22 74H66Q66 88 44 88Q22 88 22 74Z" fill="#6D28D9" />
      <path d="M174 74H218Q218 88 196 88Q174 88 174 74Z" fill="#6D28D9" />
      <rect x="24" y="54" width="40" height="20" rx="6" fill="#F472B6" />
      <T x={44} y={68} s={12} c="#FFFFFF">x+3</T>
      <rect x="182" y="54" width="28" height="20" rx="6" fill="#FBBF24" />
      <T x={196} y={68.5} s={13} c="#422006">7</T>
      <circle cx="120" cy="82" r="10" fill="#1E1238" stroke="#A78BFA" strokeWidth="1.5" />
      <T x={120} y={87} s={14} c="#FBBF24">=</T>
    </Lienzo>
  )
}

export const ARTE_MATES = {
  acercate: Acercate,
  numpath: NumPath,
  'menor-a-mayor': MenorAMayor,
  'reloj-horas': RelojHoras,
  'el-cambio': ElCambio,
  'numeros-romanos': NumerosRomanos,
  'escalera-unidades': EscaleraUnidades,
  redondeo: Redondeo,
  'tablas-multiplicar': TablasMultiplicar,
  'reparte-pastel': RepartePastel,
  'salta-recta': SaltaRecta,
  'lee-el-grafico': LeeElGrafico,
  'estadistico-expres': EstadisticoExpres,
  trayectoria: Trayectoria,
  portero: Portero,
  'funciones-grafica': FuncionesGrafica,
  'balanza-algebraica': BalanzaAlgebraica,
}
