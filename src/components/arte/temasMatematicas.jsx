// Arte de los temas de Matemáticas (/estudiar/matematicas): el cálculo tal y
// como se hace en el cuaderno — la cuenta en columna, la matriz de puntos, el
// reparto, la recta numérica, la pizza de las fracciones…
import { Lienzo, T, Flecha, FlechaCurva } from './base'

const VIOLETA = '#A78BFA'

function Sumas(p) {
  return (
    <Lienzo {...p}>
      {/* modelo de barras: 48 + 37 */}
      <rect x="30" y="20" width="24" height="54" rx="3" fill="#34D399" />
      <rect x="30" y="76" width="24" height="42" rx="3" fill="#60A5FA" />
      <T x={64} y={52} s={13} c="#6EE7B7" a="start">48</T>
      <T x={64} y={102} s={13} c="#93C5FD" a="start">37</T>
      {/* la cuenta en columna, con la que se lleva */}
      <T x={170} y={24} s={13} c="#F472B6">1</T>
      <T x={196} y={50} s={30} a="end">48</T>
      <T x={120} y={84} s={30} c={VIOLETA}>+</T>
      <T x={196} y={84} s={30} a="end">37</T>
      <path d="M116 94H200" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
      <T x={196} y={126} s={30} c="#FBBF24" a="end">85</T>
    </Lienzo>
  )
}

function Restas(p) {
  return (
    <Lienzo {...p}>
      {/* 72 = 45 + 27: lo que quitas y lo que queda */}
      <rect x="30" y="20" width="24" height="60" rx="3" fill="#F87171" />
      <rect x="30" y="82" width="24" height="36" rx="3" fill="#34D399" />
      <T x={64} y={55} s={13} c="#FCA5A5" a="start">45</T>
      <T x={64} y={105} s={13} c="#6EE7B7" a="start">27</T>
      <T x={160} y={24} s={12} c="#F472B6">6</T>
      <T x={186} y={24} s={12} c="#F472B6">1</T>
      <T x={196} y={50} s={30} a="end">72</T>
      <path d="M152 44L168 30" stroke="#F472B6" strokeWidth="2" />
      <T x={120} y={84} s={30} c={VIOLETA}>−</T>
      <T x={196} y={84} s={30} a="end">45</T>
      <path d="M116 94H200" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
      <T x={196} y={126} s={30} c="#FBBF24" a="end">27</T>
    </Lienzo>
  )
}

function SumasRestas(p) {
  const ticks = Array.from({ length: 11 }, (_, i) => 20 + i * 20)
  return (
    <Lienzo {...p}>
      <path d="M14 78H226" stroke="#C4B5FD" strokeWidth="2.5" strokeLinecap="round" />
      {ticks.map((x, i) => (
        <g key={x}>
          <path d={`M${x} 72V84`} stroke="#C4B5FD" strokeWidth="2" />
          <T x={x} y={100} s={10} c="#94A3B8" w={700}>{i}</T>
        </g>
      ))}
      <FlechaCurva x1={60} y1={72} cx={120} cy={10} x2={180} y2={72} c="#34D399" w={3} />
      <T x={120} y={34} s={16} c="#6EE7B7">+6</T>
      <FlechaCurva x1={180} y1={84} cx={150} cy={134} x2={120} y2={84} c="#F87171" w={3} />
      <T x={150} y={124} s={16} c="#FCA5A5">−3</T>
      <circle cx="60" cy="78" r="5" fill="#FBBF24" />
      <circle cx="120" cy="78" r="6" fill="#F472B6" stroke="#141b2e" strokeWidth="2" />
    </Lienzo>
  )
}

function Multiplicaciones(p) {
  const puntos = []
  for (let f = 0; f < 4; f++) for (let c = 0; c < 6; c++) puntos.push([40 + c * 16, 40 + f * 16])
  return (
    <Lienzo {...p}>
      <T x={80} y={24} s={13} c="#93C5FD">6</T>
      <T x={22} y={69} s={13} c="#6EE7B7">4</T>
      <rect x="30" y="30" width="100" height="68" rx="8" fill="#2E1065" fillOpacity=".55" />
      {puntos.map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="5" fill="#A78BFA" />)}
      <T x={188} y={62} s={24}>4 × 6</T>
      <T x={188} y={98} s={26} c="#FBBF24">= 24</T>
    </Lienzo>
  )
}

function Divisiones(p) {
  const platos = [50, 120, 190]
  const dentro = [[-8, -6], [8, -6], [-8, 8], [8, 8]]
  return (
    <Lienzo {...p}>
      <T x={120} y={32} s={22}>12 ÷ 3 = <tspan fill="#FBBF24">4</tspan></T>
      {platos.map(x => (
        <g key={x}>
          <ellipse cx={x} cy="86" rx="30" ry="24" fill="#2E1065" stroke="#8B5CF6" strokeWidth="2.5" />
          {dentro.map(([dx, dy]) => <circle key={`${dx}${dy}`} cx={x + dx} cy={86 + dy} r="5.5" fill="#F472B6" />)}
        </g>
      ))}
    </Lienzo>
  )
}

// Triángulo de la familia: 4 × 6 = 24 y 24 ÷ 4 = 6 son la misma cuenta.
function MultDiv(p) {
  return (
    <Lienzo {...p}>
      <path d="M120 10L204 122H36Z" fill="#2E1065" stroke="#A78BFA" strokeWidth="3" strokeLinejoin="round" />
      <path d="M84 66H156M120 66V120" stroke="#A78BFA" strokeWidth="2" />
      <T x={120} y={54} s={22} c="#FBBF24">24</T>
      <T x={90} y={106} s={20}>4</T>
      <T x={150} y={106} s={20}>6</T>
      <circle cx="120" cy="66" r="9" fill="#8B5CF6" />
      <T x={120} y={71} s={13}>÷</T>
      <circle cx="120" cy="94" r="9" fill="#8B5CF6" />
      <T x={120} y={99} s={13}>×</T>
    </Lienzo>
  )
}

// Jerarquía de operaciones: paréntesis, luego ×, luego +.
function Combinado(p) {
  const fichas = [['3', 22], ['+', 42], ['4', 62], ['×', 82], ['(', 98], ['5', 112], ['−', 128], ['2', 144], [')', 158]]
  const pasos = [[94, 164, 58, '#F472B6', 1], [56, 164, 82, '#FBBF24', 2], [14, 164, 106, '#34D399', 3]]
  return (
    <Lienzo {...p}>
      {fichas.map(([t, x], i) => <T key={i} x={x} y={44} s={22}>{t}</T>)}
      <T x={176} y={44} s={22} c="#FBBF24" a="start">= 15</T>
      {pasos.map(([x1, x2, y, c, n]) => (
        <g key={n}>
          <path d={`M${x1} ${y - 6}V${y}H${x2}V${y - 6}`} stroke={c} strokeWidth="2.5" strokeLinejoin="round" />
          <circle cx={(x1 + x2) / 2} cy={y + 12} r="8" fill={c} />
          <T x={(x1 + x2) / 2} y={y + 16} s={11} c="#141b2e">{n}</T>
        </g>
      ))}
    </Lienzo>
  )
}

function Funciones(p) {
  const rejilla = []
  for (let x = 40; x <= 220; x += 20) rejilla.push(`M${x} 14V124`)
  for (let y = 24; y <= 124; y += 20) rejilla.push(`M20 ${y}H224`)
  return (
    <Lienzo {...p}>
      <path d={rejilla.join('')} stroke="#A78BFA" strokeOpacity=".12" />
      <Flecha x1={20} y1={104} x2={226} y2={104} c="#C4B5FD" w={2} />
      <Flecha x1={60} y1={126} x2={60} y2={12} c="#C4B5FD" w={2} />
      <path d="M40 124L160 16" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
      <path d="M86 18Q136 190 186 18" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" />
      {[[100, 70], [120, 52]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="4.5" fill="#FBBF24" stroke="#141b2e" strokeWidth="2" />)}
      <T x={198} y={36} s={15} c="#F9A8D4" w={700} fontStyle="italic">f(x)</T>
    </Lienzo>
  )
}

function Geometria(p) {
  return (
    <Lienzo {...p}>
      <path d="M26 112H122V40Z" fill="#8B5CF6" fillOpacity=".3" stroke="#C4B5FD" strokeWidth="3" strokeLinejoin="round" />
      <path d="M110 112V100H122" stroke="#C4B5FD" strokeWidth="2" />
      <T x={74} y={128} s={14} c="#E9D5FF" fontStyle="italic">a</T>
      <T x={134} y={80} s={14} c="#E9D5FF" fontStyle="italic">b</T>
      <T x={62} y={70} s={14} c="#E9D5FF" fontStyle="italic">c</T>
      <circle cx="182" cy="72" r="34" fill="#F472B6" fillOpacity=".12" stroke="#F472B6" strokeWidth="3" />
      <path d="M182 72L209.8 52.5" stroke="#F9A8D4" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="182" cy="72" r="3" fill="#F9A8D4" />
      <T x={200} y={76} s={14} c="#F9A8D4" fontStyle="italic">r</T>
    </Lienzo>
  )
}

function Fracciones(p) {
  const cortes = Array.from({ length: 8 }, (_, i) => {
    const a = (-90 + i * 45) * (Math.PI / 180)
    return `M84 68L${(84 + 40 * Math.cos(a)).toFixed(1)} ${(68 + 40 * Math.sin(a)).toFixed(1)}`
  })
  return (
    <Lienzo {...p}>
      <circle cx="84" cy="68" r="47" fill="#D97706" />
      <circle cx="84" cy="68" r="40" fill="#FCD34D" />
      <path d="M84 68L84 28A40 40 0 0 1 112.3 96.3Z" fill="#A78BFA" />
      {[[70, 50], [60, 82], [90, 104], [100, 60]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="4.5" fill="#DC2626" />)}
      <path d={cortes.join('')} stroke="#B45309" strokeWidth="1.8" />
      <T x={180} y={60} s={30} c="#C4B5FD">3</T>
      <path d="M160 70H200" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
      <T x={180} y={102} s={30}>8</T>
    </Lienzo>
  )
}

function Porcentajes(p) {
  return (
    <Lienzo {...p}>
      <g transform="rotate(-6 120 60)">
        <path d="M40 30H154L186 60L154 90H40Q32 90 32 82V38Q32 30 40 30Z" fill="#10B981" />
        <circle cx="164" cy="60" r="5" fill="#141b2e" />
        <T x={98} y={72} s={32}>−20%</T>
      </g>
      <rect x="36" y="108" width="168" height="12" rx="6" fill="#334155" />
      <rect x="36" y="108" width="134" height="12" rx="6" fill="#34D399" />
      <path d="M170 104V124" stroke="#FBBF24" strokeWidth="2" strokeDasharray="2 2" />
    </Lienzo>
  )
}

function Estadistica(p) {
  const alturas = [40, 70, 55, 90, 30]
  return (
    <Lienzo {...p}>
      {alturas.map((h, i) => (
        <rect key={i} x={28 + i * 26} y={116 - h} width="18" height={h} rx="3" fill="#8B5CF6" fillOpacity={0.5 + i * 0.1} />
      ))}
      <path d="M20 116H160" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 59H158" stroke="#FBBF24" strokeWidth="2" strokeDasharray="5 4" />
      <g transform="rotate(-12 196 70)">
        <rect x="174" y="48" width="44" height="44" rx="9" fill="#F8FAFC" />
        {[[184, 58], [208, 58], [196, 70], [184, 82], [208, 82]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="3.6" fill="#7C3AED" />)}
      </g>
    </Lienzo>
  )
}

function Enteros(p) {
  const ticks = Array.from({ length: 11 }, (_, i) => i - 5)
  return (
    <Lienzo {...p}>
      <path d="M16 70H120" stroke="#F87171" strokeWidth="3" />
      <path d="M120 70H224" stroke="#60A5FA" strokeWidth="3" />
      {ticks.map(n => (
        <g key={n}>
          <path d={`M${120 + n * 20} 64V76`} stroke={n < 0 ? '#F87171' : n > 0 ? '#60A5FA' : '#E2E8F0'} strokeWidth="2" />
          <T x={120 + n * 20} y={92} s={10} c="#94A3B8" w={700}>{n < 0 ? `−${-n}` : n}</T>
        </g>
      ))}
      <circle cx="60" cy="70" r="6.5" fill="#F87171" stroke="#141b2e" strokeWidth="2" />
      <T x={60} y={52} s={15} c="#FCA5A5">−3</T>
      <circle cx="130" cy="70" r="6.5" fill="#34D399" stroke="#141b2e" strokeWidth="2" />
      <T x={130} y={52} s={15} c="#6EE7B7">½</T>
      <T x={120} y={122} s={16} c="#E9D5FF">|−3| = 3</T>
    </Lienzo>
  )
}

// Fichas de álgebra: 2x + 3 = 11.
function Algebra(p) {
  const unidades = Array.from({ length: 11 }, (_, i) => [146 + (i % 4) * 15, 60 + Math.floor(i / 4) * 15])
  return (
    <Lienzo {...p}>
      <T x={120} y={34} s={22}>2<tspan fontStyle="italic" fill="#6EE7B7">x</tspan> + 3 = 11</T>
      {[30, 50].map(x => (
        <g key={x}>
          <rect x={x} y="56" width="16" height="44" rx="3" fill="#34D399" />
          <T x={x + 8} y={83} s={12} c="#064E3B" fontStyle="italic">x</T>
        </g>
      ))}
      {[[74, 56], [89, 56], [74, 71]].map(([x, y]) => <rect key={`${x}${y}`} x={x} y={y} width="12" height="12" rx="2" fill="#FBBF24" />)}
      <T x={122} y={86} s={24} c={VIOLETA}>=</T>
      {unidades.map(([x, y]) => <rect key={`${x}${y}`} x={x} y={y} width="12" height="12" rx="2" fill="#FBBF24" />)}
      <T x={120} y={126} s={16} c="#F9A8D4"><tspan fontStyle="italic">x</tspan> = 4</T>
    </Lienzo>
  )
}

// Clave = `matematicas/<id>`: los modos del motor de cálculo (mathEngine) y
// los temas extra del hub (data/temasMatematicas.js).
export const ARTE_TEMAS_MATEMATICAS = {
  'matematicas/sumas': Sumas,
  'matematicas/restas': Restas,
  'matematicas/sumas-restas': SumasRestas,
  'matematicas/multiplicaciones': Multiplicaciones,
  'matematicas/divisiones': Divisiones,
  'matematicas/multiplicaciones-divisiones': MultDiv,
  'matematicas/combinado': Combinado,
  'matematicas/funciones': Funciones,
  'matematicas/geometria': Geometria,
  'matematicas/fracciones': Fracciones,
  'matematicas/porcentajes': Porcentajes,
  'matematicas/estadistica': Estadistica,
  'matematicas/enteros-racionales': Enteros,
  'matematicas/algebra': Algebra,
}
