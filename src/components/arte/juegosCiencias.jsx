// Arte de los juegos de ciencias: física (azules), química (esmeralda) y
// biología (verdes). Cada dibujo enseña la mecánica real del juego.
import { Lienzo, T, Flecha } from './base'

// ── BIOLOGÍA ───────────────────────────────────────────────────────────────

function Genetica(p) {
  const celdas = [
    { x: 104, y: 36, t: 'AA', f: '#22C55E' },
    { x: 141, y: 36, t: 'Aa', f: '#86EFAC' },
    { x: 104, y: 69, t: 'Aa', f: '#86EFAC' },
    { x: 141, y: 69, t: 'aa', f: '#FDE68A' },
  ]
  return (
    <Lienzo {...p}>
      <path d="M40 18C70 34 40 50 70 66C40 82 70 98 40 114" stroke="#F472B6" strokeWidth="4" strokeLinecap="round" />
      <path d="M70 18C40 34 70 50 40 66C70 82 40 98 70 114" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
      <path d="M47 30H63M47 46H63M47 86H63M47 102H63" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
      <T x={121} y={29} s={14} c="#86EFAC">A</T>
      <T x={158} y={29} s={14} c="#86EFAC">a</T>
      <T x={94} y={56} s={14} c="#86EFAC">A</T>
      <T x={94} y={89} s={14} c="#86EFAC">a</T>
      {celdas.map(({ x, y, t, f }) => (
        <g key={`${x}${y}`}>
          <rect x={x} y={y} width="34" height="30" rx="6" fill={f} />
          <T x={x + 17} y={y + 20} s={12} c="#14532D">{t}</T>
        </g>
      ))}
      <path d="M190 51L204 51M190 84L204 84" stroke="#475569" strokeWidth="1.5" strokeDasharray="2 3" />
      <T x={214} y={56} s={13} c="#22C55E">¾</T>
      <T x={214} y={89} s={13} c="#FDE68A">¼</T>
    </Lienzo>
  )
}

function RayosX(p) {
  return (
    <Lienzo {...p}>
      <rect x="56" y="10" width="128" height="116" rx="8" fill="#0C1A33" />
      <g fill="#1E3A5F" stroke="#38BDF8" strokeOpacity=".6" strokeWidth="1.5">
        <circle cx="120" cy="28" r="11" />
        <path d="M100 42Q120 38 140 42L146 96Q120 102 94 96Z" />
      </g>
      <path d="M101 46L87 88M139 46L153 88M109 98L107 124M131 98L133 124" stroke="#1E3A5F" strokeWidth="9" strokeLinecap="round" />
      <path d="M104 54Q120 58 136 54M103 64Q120 68 137 64M104 74Q120 78 136 74" stroke="#7DD3FC" strokeOpacity=".35" strokeWidth="1.5" />
      <ellipse cx="111" cy="64" rx="8" ry="13" fill="#38BDF8" fillOpacity=".3" />
      <ellipse cx="129" cy="64" rx="8" ry="13" fill="#38BDF8" fillOpacity=".3" />
      <path d="M124 76C116 70 116 62 121 62C123 62 124 64 124 65C124 64 125 62 127 62C132 62 132 70 124 76Z" fill="#F472B6" />
      <circle cx="124" cy="69" r="11" stroke="#FBBF24" strokeWidth="2" />
      <path d="M124 55V59M124 79V83M110 69H114M134 69H138" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
      <path d="M58 90H182" stroke="#38BDF8" strokeOpacity=".5" strokeWidth="1.5" />
    </Lienzo>
  )
}

function CadenaAlimentaria(p) {
  return (
    <Lienzo {...p}>
      {[44, 120, 196].map(x => <circle key={x} cx={x} cy="68" r="26" fill="#14532D" />)}
      {/* productor: la hoja */}
      <path d="M32 80Q32 54 58 56Q58 82 32 80Z" fill="#84CC16" />
      <path d="M34 78L55 59" stroke="#365314" strokeWidth="1.8" strokeLinecap="round" />
      {/* herbívoro: el conejo */}
      <ellipse cx="114" cy="54" rx="3.8" ry="11" fill="#E7E5E4" />
      <ellipse cx="126" cy="54" rx="3.8" ry="11" fill="#E7E5E4" />
      <ellipse cx="114" cy="54" rx="1.6" ry="7" fill="#F9A8D4" />
      <ellipse cx="126" cy="54" rx="1.6" ry="7" fill="#F9A8D4" />
      <circle cx="120" cy="74" r="12" fill="#E7E5E4" />
      <circle cx="115.5" cy="72" r="1.6" fill="#1C1917" />
      <circle cx="124.5" cy="72" r="1.6" fill="#1C1917" />
      <circle cx="120" cy="77" r="1.8" fill="#F472B6" />
      {/* carnívoro: el zorro */}
      <path d="M183 62L185 48L193 60Z" fill="#EA580C" />
      <path d="M209 62L207 48L199 60Z" fill="#EA580C" />
      <path d="M182 62Q196 56 210 62L196 88Z" fill="#F97316" />
      <path d="M186 68Q192 76 196 88Q200 76 206 68Q196 72 186 68Z" fill="#FFF7ED" />
      <circle cx="190.5" cy="67" r="1.7" fill="#1C1917" />
      <circle cx="201.5" cy="67" r="1.7" fill="#1C1917" />
      <circle cx="196" cy="86" r="2.2" fill="#1C1917" />
      <Flecha x1={73} y1={68} x2={91} y2={68} c="#A3E635" />
      <Flecha x1={149} y1={68} x2={167} y2={68} c="#A3E635" />
    </Lienzo>
  )
}

function Microscopio(p) {
  const puntos = [[96, 82], [132, 56], [104, 92], [146, 66], [92, 58], [124, 96], [150, 88]]
  return (
    <Lienzo {...p}>
      <circle cx="120" cy="67" r="56" fill="#F7FEE7" stroke="#1F2937" strokeWidth="6" />
      <ellipse cx="120" cy="68" rx="42" ry="34" fill="#D9F99D" stroke="#65A30D" strokeWidth="2" />
      <path d="M94 76Q102 70 94 64M98 84Q108 80 100 74" stroke="#84CC16" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="110" cy="64" r="13" fill="#A78BFA" />
      <circle cx="112" cy="62" r="4" fill="#6D28D9" />
      <g transform="rotate(-20 140 80)">
        <ellipse cx="140" cy="80" rx="11" ry="6" fill="#FB923C" />
        <path d="M132 80L135 77L138 83L141 77L144 83L147 80" stroke="#FFF7ED" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      {puntos.map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.8" fill="#65A30D" />)}
      <circle cx="140" cy="80" r="16" stroke="#EF4444" strokeWidth="2" />
      <path d="M140 60V65M140 95V100M120 80H125M155 80H160" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    </Lienzo>
  )
}

// ── FÍSICA ─────────────────────────────────────────────────────────────────

function FuerzaNeta(p) {
  return (
    <Lienzo {...p}>
      <path d="M20 112H220" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 112l-6 7M50 112l-6 7M70 112l-6 7M90 112l-6 7M150 112l-6 7M170 112l-6 7M190 112l-6 7M210 112l-6 7" stroke="#334155" strokeWidth="1.5" />
      <rect x="96" y="66" width="48" height="46" rx="4" fill="#3B82F6" />
      <T x={120} y={95} s={15} c="#FFFFFF" fontStyle="italic">m</T>
      <Flecha x1={144} y1={89} x2={208} y2={89} c="#38BDF8" w={5} />
      <Flecha x1={96} y1={89} x2={58} y2={89} c="#F87171" w={5} />
      <Flecha x1={100} y1={46} x2={160} y2={46} c="#FBBF24" w={6} />
      <T x={130} y={34} s={12} c="#FBBF24">ΣF</T>
    </Lienzo>
  )
}

function Balanza(p) {
  const marcas = [24, 48, 72, 96, 144, 168, 192, 216]
  return (
    <Lienzo {...p}>
      <path d="M20 112H220" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      <path d="M120 80L106 110H134Z" fill="#1E40AF" />
      <rect x="22" y="74" width="196" height="6" rx="3" fill="#7DD3FC" />
      <path d={marcas.map(x => `M${x} 83V88`).join('')} stroke="#7DD3FC" strokeOpacity=".6" strokeWidth="1.5" />
      <rect x="82" y="44" width="28" height="30" rx="4" fill="#3B82F6" />
      <T x={96} y={64} s={14} c="#FFFFFF">3</T>
      <rect x="182" y="56" width="20" height="18" rx="3" fill="#FBBF24" />
      <T x={192} y={69} s={11} c="#422006">1</T>
      <path d="M96 96H120M120 96H192" stroke="#94A3B8" strokeWidth="1.2" />
      <path d="M96 92V100M120 92V100M192 92V100" stroke="#94A3B8" strokeWidth="1.2" />
      <T x={108} y={108} s={10} c="#CBD5E1" fontStyle="italic">d</T>
      <T x={156} y={108} s={10} c="#CBD5E1" fontStyle="italic">3d</T>
    </Lienzo>
  )
}

function Orbita(p) {
  const estrellas = [[30, 24], [60, 14], [210, 104], [222, 22], [160, 122], [24, 62], [96, 124], [200, 70]]
  return (
    <Lienzo {...p}>
      {estrellas.map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="1.3" fill="#F8FAFC" fillOpacity=".6" />)}
      <ellipse cx="120" cy="67" rx="60" ry="30" stroke="#7DD3FC" strokeOpacity=".35" strokeWidth="1.5" strokeDasharray="4 4" />
      <ellipse cx="120" cy="67" rx="96" ry="46" stroke="#7DD3FC" strokeOpacity=".35" strokeWidth="1.5" strokeDasharray="4 4" />
      <circle cx="120" cy="67" r="16" fill="#FBBF24" />
      <circle cx="120" cy="67" r="21" fill="#FBBF24" fillOpacity=".18" />
      <path d="M72 76Q120 20 186 36" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="3 4" strokeLinecap="round" />
      <circle cx="68" cy="82" r="9" fill="#38BDF8" />
      <path d="M63 79Q68 76 72 80Q70 86 64 84Z" fill="#34D399" />
      <circle cx="193.5" cy="37.4" r="8" fill="#F87171" />
      <g transform="rotate(-18 130 38)">
        <rect x="122" y="34" width="8" height="5" fill="#3B82F6" />
        <rect x="126" y="31" width="8" height="10" rx="1.5" fill="#E2E8F0" />
        <rect x="134" y="34" width="8" height="5" fill="#3B82F6" />
      </g>
    </Lienzo>
  )
}

function CircuitoCerrado(p) {
  const fondo = '#141B2E'
  return (
    <Lienzo {...p}>
      <path d="M48 34H192V104H48Z" stroke="#94A3B8" strokeWidth="3" strokeLinejoin="round" />
      {/* pila */}
      <rect x="38" y="58" width="20" height="22" fill={fondo} />
      <path d="M36 62H60" stroke="#F8FAFC" strokeWidth="3" strokeLinecap="round" />
      <path d="M41 72H55" stroke="#F8FAFC" strokeWidth="5" strokeLinecap="round" />
      <T x={30} y={60} s={10} c="#F8FAFC">+</T>
      {/* interruptor cerrado */}
      <rect x="98" y="30" width="32" height="8" fill={fondo} />
      <path d="M100 34H128" stroke="#F8FAFC" strokeWidth="3" strokeLinecap="round" />
      <circle cx="100" cy="34" r="3" fill="#F8FAFC" />
      <circle cx="128" cy="34" r="3" fill="#F8FAFC" />
      {/* bombilla encendida */}
      <circle cx="192" cy="60" r="19" fill="#FBBF24" fillOpacity=".25" />
      <circle cx="192" cy="58" r="10" fill="#FDE68A" />
      <path d="M188 60L190 56L192 60L194 56L196 60" stroke="#B45309" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="187" y="67" width="10" height="7" rx="1.5" fill="#94A3B8" />
      {/* bombilla apagada: ¿se enciende? */}
      <circle cx="120" cy="100" r="10" fill="#334155" stroke="#64748B" strokeWidth="1.5" />
      <rect x="115" y="108" width="10" height="7" rx="1.5" fill="#94A3B8" />
      <circle cx="146" cy="96" r="9" fill="#F472B6" />
      <T x={146} y={100} s={11} c="#FFFFFF">?</T>
    </Lienzo>
  )
}

// Rayo de Luz: el láser rebota en dos espejos a 45° hasta el sensor, con la
// normal y los dos ángulos iguales en el primer rebote.
function RayoDeLuz(p) {
  return (
    <Lienzo {...p}>
      {/* láser */}
      <rect x="18" y="30" width="30" height="20" rx="4" fill="#334155" stroke="#64748B" strokeWidth="1.5" />
      <rect x="46" y="35" width="8" height="10" rx="2" fill="#475569" />
      {/* rayo */}
      <path d="M56 40H128V98H198" stroke="#F43F5E" strokeWidth="9" strokeOpacity=".3" strokeLinejoin="round" />
      <path d="M56 40H128V98H198" stroke="#F43F5E" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M56 40H128V98H198" stroke="#FFF1F2" strokeWidth="1.2" strokeLinejoin="round" />
      {/* espejos */}
      <path d="M116 28L140 52" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
      <path d="M116 110L140 86" stroke="#E2E8F0" strokeWidth="6" strokeLinecap="round" />
      {/* normal y ángulos iguales */}
      <path d="M128 40L114 54" stroke="#FDE68A" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M118 40A10 10 0 0 0 121 47M121 47A10 10 0 0 0 128 50" stroke="#FBBF24" strokeWidth="2" />
      {/* sensor encendido */}
      <circle cx="206" cy="98" r="15" fill="#4ADE80" fillOpacity=".2" />
      <circle cx="206" cy="98" r="10" fill="#0F172A" stroke="#4ADE80" strokeWidth="3" />
      <circle cx="206" cy="98" r="4.5" fill="#4ADE80" />
      <path d="M206 76v-5M224 80l4-4M228 98h5M224 116l4 4" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" />
    </Lienzo>
  )
}

// ── QUÍMICA ────────────────────────────────────────────────────────────────

function Atomo({ cx, cy, r, f }) {
  return <circle cx={cx} cy={cy} r={r} fill={f} stroke="#0F172A" strokeOpacity=".35" strokeWidth="1" />
}

function BalanzaEcuaciones(p) {
  const H = '#F8FAFC'
  const O = '#EF4444'
  return (
    <Lienzo {...p}>
      <path d="M24 108H216" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
      <path d="M120 108L110 124H130Z" fill="#10B981" />
      {/* 2 H₂ */}
      <Atomo cx={36} cy={52} r={7} f={H} /><Atomo cx={49} cy={52} r={7} f={H} />
      <Atomo cx={36} cy={82} r={7} f={H} /><Atomo cx={49} cy={82} r={7} f={H} />
      <T x={67} y={71} s={13} c="#A7F3D0">+</T>
      {/* O₂ */}
      <Atomo cx={84} cy={66} r={9} f={O} /><Atomo cx={100} cy={66} r={9} f={O} />
      <Flecha x1={116} y1={67} x2={140} y2={67} c="#A7F3D0" w={3.5} />
      {/* 2 H₂O */}
      <Atomo cx={160} cy={40} r={6} f={H} /><Atomo cx={184} cy={40} r={6} f={H} />
      <Atomo cx={172} cy={50} r={10} f={O} />
      <Atomo cx={184} cy={80} r={6} f={H} /><Atomo cx={208} cy={80} r={6} f={H} />
      <Atomo cx={196} cy={90} r={10} f={O} />
    </Lienzo>
  )
}

function EncuentraElemento(p) {
  // Silueta de la tabla: columnas altas a los lados y bloque central.
  const filas = [[0, 9], [0, 1, 4, 5, 6, 7, 8, 9], [0, 1, 4, 5, 6, 7, 8, 9], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]]
  const color = c => (c === 0 ? '#F87171' : c === 1 ? '#FB923C' : c <= 3 ? '#FBBF24' : c <= 7 ? '#34D399' : c === 8 ? '#38BDF8' : '#A78BFA')
  const X = c => 20 + c * 14
  const Y = r => 26 + r * 14
  return (
    <Lienzo {...p}>
      {filas.map((cols, r) => cols.map(c => (
        <rect key={`${r}${c}`} x={X(c)} y={Y(r)} width="12" height="12" rx="2.5" fill={color(c)} fillOpacity={r === 1 && c === 7 ? 1 : 0.55} />
      )))}
      <rect x={X(7) - 1.5} y={Y(1) - 1.5} width="15" height="15" rx="3.5" stroke="#FFFFFF" strokeWidth="2" />
      <path d={`M${X(7) + 13} ${Y(1) + 6}L168 60`} stroke="#FFFFFF" strokeOpacity=".6" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="168" y="40" width="54" height="66" rx="9" fill="#F8FAFC" />
      <T x={176} y={55} s={11} c="#475569" a="start">8</T>
      <T x={195} y={88} s={32} c="#EF4444">O</T>
      <rect x="180" y="95" width="30" height="4" rx="2" fill="#CBD5E1" />
    </Lienzo>
  )
}

function CambioEstado(p) {
  return (
    <Lienzo {...p}>
      <rect x="24" y="18" width="16" height="80" rx="8" fill="#F8FAFC" />
      <circle cx="32" cy="104" r="12" fill="#EF4444" />
      <rect x="28.5" y="44" width="7" height="60" rx="3.5" fill="#EF4444" />
      <path d="M44 32h6M44 48h6M44 64h6M44 80h6" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="62" y="54" width="32" height="32" rx="5" fill="#BAE6FD" stroke="#7DD3FC" strokeWidth="1.5" />
      <path d="M68 62L74 60M68 70L72 69" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <Flecha x1={100} y1={70} x2={118} y2={70} c="#94A3B8" w={2.5} />
      <path d="M140 50Q152 66 152 76Q152 88 140 88Q128 88 128 76Q128 66 140 50Z" fill="#38BDF8" />
      <path d="M134 78Q134 84 139 84" stroke="#E0F2FE" strokeWidth="2" strokeLinecap="round" />
      <Flecha x1={160} y1={70} x2={178} y2={70} c="#94A3B8" w={2.5} />
      <path d="M186 82Q180 82 180 76Q180 70 186 70Q187 62 195 62Q201 58 207 64Q214 64 214 72Q220 74 218 80Q216 84 210 84Z" fill="#E2E8F0" />
      <path d="M192 56Q188 50 192 44Q196 38 192 32M204 54Q200 48 204 42Q208 36 204 30" stroke="#E2E8F0" strokeOpacity=".6" strokeWidth="2" strokeLinecap="round" />
    </Lienzo>
  )
}

function MedidorPh(p) {
  const cols = ['#E11D48', '#F97316', '#F59E0B', '#FACC15', '#A3E635', '#22C55E', '#14B8A6', '#06B6D4', '#3B82F6', '#6366F1', '#7C3AED', '#9333EA']
  return (
    <Lienzo {...p}>
      {/* tira de pH con el indicador universal */}
      {cols.map((c, i) => <rect key={c} x={20 + i * 16.5} y="92" width="16.5" height="20" fill={c} />)}
      <rect x="20" y="92" width="198" height="20" rx="3" stroke="#0F172A" strokeOpacity=".4" strokeWidth="1.5" />
      <T x={22} y={124} s={10} c="#94A3B8" a="start">0</T>
      <T x={119} y={124} s={10} c="#94A3B8">7</T>
      <T x={216} y={124} s={10} c="#94A3B8" a="end">14</T>
      {/* marca colocada en el ácido */}
      <rect x="51" y="86" width="10" height="32" rx="3" fill="#F97316" stroke="#FFFFFF" strokeWidth="2.5" />
      {/* tubo con zumo de limón, teñido */}
      <path d="M44 14h24" stroke="#CBD5E1" strokeWidth="3" strokeLinecap="round" />
      <path d="M47 16v52a9 9 0 0 0 18 0V16" fill="#FFFFFF" fillOpacity=".08" stroke="#CBD5E1" strokeWidth="2.5" />
      <path d="M49 38v30a7 7 0 0 0 14 0V38Z" fill="#F97316" />
      <path d="M53 44v20" stroke="#FFFFFF" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
      {/* limón */}
      <ellipse cx="102" cy="52" rx="22" ry="16" fill="#FACC15" />
      <path d="M80 52l-6-2M124 52l6-2" stroke="#EAB308" strokeWidth="4" strokeLinecap="round" />
      <path d="M92 46q6-4 12 0" stroke="#FEF9C3" strokeWidth="2" strokeLinecap="round" />
      {/* frasco de lejía, al otro extremo */}
      <rect x="166" y="34" width="34" height="44" rx="7" fill="#E0E7FF" />
      <rect x="176" y="24" width="14" height="12" rx="3" fill="#7C3AED" />
      <rect x="171" y="48" width="24" height="16" rx="3" fill="#7C3AED" fillOpacity=".7" />
      <Flecha x1={102} y1={72} x2={60} y2={86} c="#FDE68A" w={2.5} />
    </Lienzo>
  )
}

function ElTiempo(p) {
  return (
    <Lienzo {...p}>
      {/* tarjeta de previsión */}
      <rect x="16" y="20" width="96" height="78" rx="12" fill="#1E3A8A" />
      <circle cx="46" cy="48" r="11" fill="#FBBF24" />
      <path d="M40 66h34a9 9 0 0 0 0-18 12 12 0 0 0-23-2 8 8 0 0 0-11 20Z" fill="#E2E8F0" />
      <path d="M52 72l-3 7M62 72l-3 7M72 72l-3 7" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
      <T x={96} y={50} s={17} c="#FFFFFF">8°</T>
      <T x={92} y={90} s={11} c="#BAE6FD">70%</T>
      <Flecha x1={118} y1={60} x2={138} y2={60} c="#94A3B8" w={2.5} />
      {/* abrigo y paraguas */}
      <path d="M160 34l-10 6 1 30h6v6h22v-6h6l1-30-10-6-8 7Z" fill="#A16207" />
      <path d="M168 41v35" stroke="#422006" strokeWidth="2" />
      <path d="M194 66a22 22 0 0 1 40 0c-3-3-6-3-10 0-3-3-7-3-10 0-3-3-7-3-10 0-4-3-7-3-10 0Z" fill="#A78BFA" />
      <path d="M214 66v24a4 4 0 0 1-8 0" fill="none" stroke="#E2E8F0" strokeWidth="2.6" strokeLinecap="round" />
    </Lienzo>
  )
}

export const ARTE_CIENCIAS = {
  genetica: Genetica,
  'rayos-x': RayosX,
  'cadena-alimentaria': CadenaAlimentaria,
  microscopio: Microscopio,
  'fuerza-neta': FuerzaNeta,
  balanza: Balanza,
  orbita: Orbita,
  'el-tiempo': ElTiempo,
  'circuito-cerrado': CircuitoCerrado,
  'rayo-de-luz': RayoDeLuz,
  'balanza-ecuaciones': BalanzaEcuaciones,
  'encuentra-elemento': EncuentraElemento,
  'cambio-estado': CambioEstado,
  'medidor-ph': MedidorPh,
}
