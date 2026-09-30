// Arte de los temas de ciencias (/estudiar/quimica, fisica, biologia,
// geologia): cada dibujo es el experimento o el esquema del tema — el filtro
// que separa la mezcla, el plano inclinado con sus fuerzas, la escala de pH…
import { Lienzo, T, Flecha, FlechaCurva } from './base'

// Punto de una elipse girada `rot` grados (para colocar electrones).
function enElipse(cx, cy, rx, ry, rot, t) {
  const r = (rot * Math.PI) / 180
  const x = rx * Math.cos(t), y = ry * Math.sin(t)
  return [cx + x * Math.cos(r) - y * Math.sin(r), cy + x * Math.sin(r) + y * Math.cos(r)]
}

// ── QUÍMICA ────────────────────────────────────────────────────────────────

function TablaPeriodica(p) {
  const celdas = []
  const color = c => (c <= 1 ? '#F472B6' : c <= 11 ? '#60A5FA' : c <= 16 ? '#34D399' : '#A78BFA')
  const filas = [[0, 17], [0, 1, 12, 13, 14, 15, 16, 17], [0, 1, 12, 13, 14, 15, 16, 17]]
  for (let f = 0; f < 7; f++) {
    const cols = filas[f] || Array.from({ length: 18 }, (_, i) => i)
    for (const c of cols) celdas.push({ x: 16 + c * 11.5, y: 12 + f * 11.5, fill: f === 0 && c === 0 ? '#F8FAFC' : color(c), key: `${f}-${c}` })
  }
  for (let f = 0; f < 2; f++) {
    for (let c = 2; c < 16; c++) celdas.push({ x: 16 + c * 11.5, y: 98 + f * 11.5, fill: '#FBBF24', key: `f${f}-${c}` })
  }
  return (
    <Lienzo {...p}>
      {celdas.map(({ x, y, fill, key }) => <rect key={key} x={x} y={y} width="10" height="10" rx="1.5" fill={fill} />)}
      {/* el carbono, destacado */}
      <rect x={16 + 13 * 11.5 - 1.5} y={12 + 11.5 - 1.5} width="13" height="13" rx="2.5" stroke="#FFFFFF" strokeWidth="2" />
    </Lienzo>
  )
}

function EstadosMateria(p) {
  const solido = []
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) solido.push([30 + i * 12, 58 + j * 12])
  const liquido = [[100, 96], [112, 94], [124, 97], [136, 95], [104, 84], [117, 82], [130, 85], [108, 72], [126, 74], [139, 84]]
  const gas = [[172, 52], [206, 60], [186, 80], [214, 94], [176, 100]]
  return (
    <Lienzo {...p}>
      {[18, 90, 162].map(x => <rect key={x} x={x} y="40" width="60" height="68" rx="6" fill="#0C4A6E" fillOpacity=".35" stroke="#7DD3FC" strokeWidth="2" />)}
      {solido.map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="5" fill="#38BDF8" />)}
      {liquido.map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="5" fill="#38BDF8" />)}
      {gas.map(([x, y]) => (
        <g key={`${x}${y}`}>
          <path d={`M${x - 12} ${y + 5}L${x - 7} ${y + 2}`} stroke="#7DD3FC" strokeOpacity=".6" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx={x} cy={y} r="5" fill="#38BDF8" />
        </g>
      ))}
      <Flecha x1={80} y1={74} x2={88} y2={74} c="#FBBF24" w={2.5} />
      <Flecha x1={152} y1={74} x2={160} y2={74} c="#FBBF24" w={2.5} />
      <path d="M36 26Q48 16 60 26M108 26Q120 16 132 26M180 26Q192 16 204 26" stroke="#FB923C" strokeOpacity=".7" strokeWidth="2" strokeLinecap="round" />
    </Lienzo>
  )
}

function Mezclas(p) {
  const limaduras = [[152, 104], [158, 108], [148, 110], [190, 104], [196, 108], [186, 110], [154, 114], [192, 114]]
  const arena = [[140, 124], [160, 126], [176, 123], [200, 125], [214, 122], [130, 122]]
  return (
    <Lienzo {...p}>
      {/* filtración */}
      <path d="M56 44H104L80 78Z" fill="#F8FAFC" fillOpacity=".85" />
      <path d="M60 48H100L94 57H66Z" fill="#A16207" />
      <path d="M50 40H110L86 76V92H74V76Z" stroke="#CBD5E1" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M80 96Q83 100 80 103Q77 100 80 96Z" fill="#7DD3FC" />
      <path d="M58 100V122Q58 126 62 126H98Q102 126 102 122V100" stroke="#CBD5E1" strokeWidth="2.5" />
      <path d="M60 112H100V122Q100 124 98 124H62Q60 124 60 122Z" fill="#7DD3FC" fillOpacity=".6" />
      {/* imán: separa el hierro de la arena */}
      <path d="M150 96V66A22 22 0 0 1 194 66V96" stroke="#DC2626" strokeWidth="14" />
      <rect x="143" y="92" width="14" height="9" fill="#CBD5E1" />
      <rect x="187" y="92" width="14" height="9" fill="#CBD5E1" />
      {limaduras.map(([x, y]) => <path key={`${x}${y}`} d={`M${x - 2} ${y - 2}L${x + 2} ${y + 2}`} stroke="#475569" strokeWidth="2" strokeLinecap="round" />)}
      {arena.map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="2" fill="#FDE68A" />)}
    </Lienzo>
  )
}

function Disoluciones(p) {
  const puntos = [[76, 112], [88, 108], [100, 114], [112, 110], [124, 113], [82, 100], [106, 102], [120, 98], [94, 92], [114, 86], [80, 80]]
  return (
    <Lienzo {...p}>
      <path d="M66 64H134V116Q134 120 130 120H70Q66 120 66 116Z" fill="#0EA5E9" fillOpacity=".3" />
      {puntos.map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="2" fill="#F8FAFC" fillOpacity=".8" />)}
      <path d="M62 38H66V116Q66 122 72 122H128Q134 122 134 116V38H138" stroke="#BAE6FD" strokeWidth="3" strokeLinejoin="round" />
      <rect x="88" y="16" width="16" height="16" rx="2" fill="#F8FAFC" stroke="#CBD5E1" transform="rotate(12 96 24)" />
      <path d="M150 18L116 102" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="114" cy="108" rx="5" ry="8" fill="#CBD5E1" transform="rotate(22 114 108)" />
      {/* de diluida a concentrada */}
      {[0.2, 0.45, 0.8].map((o, i) => (
        <g key={o}>
          <rect x={166 + i * 22} y="52" width="14" height="60" rx="7" stroke="#BAE6FD" strokeWidth="2" />
          <path d={`M${168 + i * 22} 76H${178 + i * 22}V105A5 5 0 0 1 ${168 + i * 22} 105Z`} fill="#0EA5E9" fillOpacity={o} />
        </g>
      ))}
    </Lienzo>
  )
}

function Formula({ x, y, partes, c }) {
  // partes: [['H'], ['2', true], ['O']] — true = subíndice
  return (
    <T x={x} y={y} s={22} c={c}>
      {partes.map(([t, sub], i) => {
        const prevSub = i > 0 && partes[i - 1][1]
        return (
          <tspan key={i} fontSize={sub ? 14 : 22} dy={sub ? 6 : prevSub ? -6 : 0}>{t}</tspan>
        )
      })}
    </T>
  )
}

function Formulacion(p) {
  const fichas = [
    { x: 22, y: 20, f: [['H'], ['2', true], ['O']], on: true },
    { x: 124, y: 20, f: [['NaCl']] },
    { x: 22, y: 74, f: [['CO'], ['2', true]] },
    { x: 124, y: 74, f: [['Fe'], ['2', true], ['O'], ['3', true]] },
  ]
  return (
    <Lienzo {...p}>
      {fichas.map(({ x, y, f, on }) => (
        <g key={`${x}${y}`}>
          <rect x={x} y={y} width="94" height="44" rx="10" fill={on ? '#10B981' : '#064E3B'} stroke="#34D399" strokeWidth="2" />
          <Formula x={x + 47} y={y + 30} partes={f} c={on ? '#022C22' : '#A7F3D0'} />
        </g>
      ))}
    </Lienzo>
  )
}

function AcidosBases(p) {
  const colores = ['#DC2626', '#EF4444', '#F97316', '#FB923C', '#F59E0B', '#FACC15', '#A3E635', '#22C55E', '#14B8A6', '#06B6D4', '#3B82F6', '#6366F1', '#7C3AED', '#9333EA', '#6B21A8']
  return (
    <Lienzo {...p}>
      {colores.map((c, i) => <rect key={c} x={15 + i * 14} y="86" width="13" height="22" rx="2" fill={c} />)}
      <T x={21.5} y={124} s={10} c="#94A3B8">0</T>
      <T x={119.5} y={124} s={10} c="#94A3B8">7</T>
      <T x={217.5} y={124} s={10} c="#94A3B8">14</T>
      <path d="M113 76H126L119.5 83Z" fill="#F8FAFC" />
      <path d="M119.5 30C124 40 130 46 130 52A10.5 10.5 0 0 1 109 52C109 46 115 40 119.5 30Z" fill="#22C55E" />
      {/* ácido y base */}
      <path d="M44 50H58V70A7 7 0 0 1 44 70Z" fill="#EF4444" />
      <rect x="42" y="20" width="18" height="58" rx="9" stroke="#E2E8F0" strokeWidth="2" />
      <path d="M182 50H196V70A7 7 0 0 1 182 70Z" fill="#6366F1" />
      <rect x="180" y="20" width="18" height="58" rx="9" stroke="#E2E8F0" strokeWidth="2" />
    </Lienzo>
  )
}

function AtomosMoleculas(p) {
  const orbitas = [30, -30, 90]
  const electrones = [[30, 0.6], [-30, 3.6], [90, 1.9], [30, 4.2]]
  return (
    <Lienzo {...p}>
      {orbitas.map(r => <ellipse key={r} cx="78" cy="68" rx="52" ry="18" stroke="#93C5FD" strokeOpacity=".7" strokeWidth="1.8" transform={`rotate(${r} 78 68)`} />)}
      {[[74, 64, '#F43F5E'], [82, 64, '#94A3B8'], [78, 71, '#F43F5E'], [72, 72, '#94A3B8'], [84, 72, '#F43F5E']].map(([x, y, c]) => (
        <circle key={`${x}${y}`} cx={x} cy={y} r="5.5" fill={c} />
      ))}
      {electrones.map(([rot, t], i) => {
        const [x, y] = enElipse(78, 68, 52, 18, rot, t)
        return <circle key={i} cx={x} cy={y} r="4" fill="#FBBF24" />
      })}
      {/* CO2: O=C=O */}
      <path d="M170 64H222M170 72H222" stroke="#CBD5E1" strokeWidth="3" />
      <circle cx="170" cy="68" r="11" fill="#F43F5E" />
      <circle cx="196" cy="68" r="11" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
      <circle cx="222" cy="68" r="11" fill="#F43F5E" />
      <T x={170} y={72} s={11} c="#FFF1F2">O</T>
      <T x={196} y={72} s={11} c="#F8FAFC">C</T>
      <T x={222} y={72} s={11} c="#FFF1F2">O</T>
    </Lienzo>
  )
}

// ── GEOLOGÍA ───────────────────────────────────────────────────────────────

function RocasMinerales(p) {
  const motas = [[40, 90, '#1C1917'], [52, 76, '#F9A8D4'], [66, 88, '#1C1917'], [78, 74, '#1C1917'], [48, 102, '#F9A8D4'], [84, 96, '#1C1917'], [60, 64, '#1C1917'], [72, 104, '#F9A8D4']]
  return (
    <Lienzo {...p}>
      {/* granito */}
      <path d="M24 106L34 72L62 58L88 66L98 96L84 110L36 112Z" fill="#D6D3D1" />
      {motas.map(([x, y, c]) => <circle key={`${x}${y}`} cx={x} cy={y} r="2.6" fill={c} />)}
      {/* cuarzo */}
      <path d="M112 110L116 60L124 48L132 60L130 110Z" fill="#E0F2FE" fillOpacity=".85" stroke="#BAE6FD" strokeWidth="1.5" />
      <path d="M130 110L138 76L146 70L152 78L146 110Z" fill="#E0F2FE" fillOpacity=".6" stroke="#BAE6FD" strokeWidth="1.5" />
      <path d="M124 48V108" stroke="#FFFFFF" strokeOpacity=".5" strokeWidth="1.2" />
      {/* roca sedimentaria */}
      <path d="M156 110L162 80Q190 70 214 82L220 110Z" fill="#B45309" />
      <path d="M160 92Q190 84 218 94" stroke="#FDBA74" strokeWidth="5" />
      <path d="M158 102Q190 96 219 104" stroke="#78350F" strokeWidth="5" />
      <path d="M14 112H226" stroke="#78716C" strokeWidth="2.5" strokeLinecap="round" />
    </Lienzo>
  )
}

function SistemaSolar(p) {
  const planetas = [
    { r: 64, a: -20, s: 4, c: '#A8A29E' },
    { r: 88, a: 25, s: 6, c: '#FDE68A' },
    { r: 116, a: -12, s: 7, c: '#3B82F6' },
    { r: 150, a: 16, s: 5.5, c: '#EF4444' },
    { r: 190, a: -10, s: 13, c: '#FDBA74' },
  ]
  return (
    <Lienzo {...p}>
      <circle cx="0" cy="68" r="54" fill="#FBBF24" fillOpacity=".15" />
      <circle cx="0" cy="68" r="44" fill="#FBBF24" />
      {planetas.map(({ r }) => <circle key={r} cx="0" cy="68" r={r} stroke="#A5B4FC" strokeOpacity=".3" strokeWidth="1.2" />)}
      {planetas.map(({ r, a, s, c }) => {
        const x = r * Math.cos((a * Math.PI) / 180)
        const y = 68 + r * Math.sin((a * Math.PI) / 180)
        return (
          <g key={r}>
            <circle cx={x} cy={y} r={s} fill={c} />
            {r === 116 && <path d={`M${x - 4} ${y - 1}Q${x} ${y - 5} ${x + 3} ${y}`} stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" />}
            {r === 190 && <path d={`M${x - 12} ${y - 3}H${x + 12}M${x - 12} ${y + 4}H${x + 12}`} stroke="#B45309" strokeOpacity=".6" strokeWidth="2" />}
          </g>
        )
      })}
    </Lienzo>
  )
}

function PlacasTectonicas(p) {
  return (
    <Lienzo {...p}>
      {/* las capas de la Tierra */}
      <circle cx="66" cy="68" r="50" fill="#78716C" />
      <circle cx="66" cy="68" r="46" fill="#EA580C" />
      <circle cx="66" cy="68" r="28" fill="#F59E0B" />
      <circle cx="66" cy="68" r="14" fill="#FDE68A" />
      {/* dos placas que chocan: volcán y terremoto */}
      <rect x="126" y="106" width="106" height="18" fill="#EA580C" fillOpacity=".6" />
      <path d="M126 88H182L184 108H126Z" fill="#78716C" />
      <path d="M184 88H232V100L200 120L186 106Z" fill="#57534E" />
      <circle cx="170" cy="46" r="6" fill="#A8A29E" fillOpacity=".4" />
      <circle cx="178" cy="36" r="8" fill="#A8A29E" fillOpacity=".25" />
      <path d="M148 88L165 58H175L182 88Z" fill="#92400E" />
      <path d="M165 58H175L172 66L170 74L168 64Z" fill="#EF4444" />
      <Flecha x1={130} y1={98} x2={146} y2={98} c="#F8FAFC" w={2.5} />
      <Flecha x1={228} y1={94} x2={210} y2={94} c="#F8FAFC" w={2.5} />
      <path d="M190 72L194 66L198 76L202 64L206 74L210 68" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Lienzo>
  )
}

// ── BIOLOGÍA ───────────────────────────────────────────────────────────────

// Los pinzones de Darwin: un antepasado común, cuatro picos según la comida.
function Evolucion(p) {
  const picos = [
    x => `M${x + 10} 60L${x + 24} 66L${x + 10} 72Z`,
    x => `M${x + 11} 63.5L${x + 30} 67L${x + 11} 69Z`,
    x => `M${x + 11} 63Q${x + 26} 64 ${x + 27} 74Q${x + 20} 67 ${x + 11} 69Z`,
    x => `M${x + 11} 62L${x + 22} 67L${x + 11} 71Z`,
  ]
  const xs = [34, 88, 142, 196]
  return (
    <Lienzo {...p}>
      <circle cx="115" cy="12" r="5" fill="#A3E635" />
      <path d={`M115 17V26M${xs[0]} 26H${xs[3]}`} stroke="#A3E635" strokeWidth="2.5" strokeLinecap="round" />
      {xs.map((x, i) => (
        <g key={x}>
          <path d={`M${x} 26V50`} stroke="#A3E635" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx={x} cy="66" r="14" fill="#A16207" />
          <path d={`M${x - 10} 72Q${x} 82 ${x + 8} 74`} fill="#CA8A04" />
          <circle cx={x + 3} cy="62" r="2.3" fill="#1C1917" />
          <path d={picos[i](x)} fill="#FBBF24" />
        </g>
      ))}
      {/* lo que come cada uno */}
      <ellipse cx="30" cy="104" rx="4" ry="3" fill="#D6D3D1" />
      <ellipse cx="40" cy="106" rx="4" ry="3" fill="#D6D3D1" />
      <path d="M82 106H96" stroke="#65A30D" strokeWidth="5" strokeLinecap="round" strokeDasharray="4 1" />
      {[[138, 102], [146, 102], [142, 97], [142, 107]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="3.5" fill="#F472B6" />)}
      <circle cx="142" cy="102" r="2.5" fill="#FBBF24" />
      <circle cx="192" cy="104" r="4" fill="#DC2626" />
      <circle cx="201" cy="106" r="4" fill="#DC2626" />
    </Lienzo>
  )
}

function CelulaVegetal(p) {
  const cloroplastos = [[62, 40, 20], [60, 96, -15], [122, 104, 10], [186, 98, -20], [104, 30, 0]]
  return (
    <Lienzo {...p}>
      <rect x="40" y="16" width="160" height="104" rx="14" fill="#DCFCE7" stroke="#15803D" strokeWidth="6" />
      <rect x="47" y="23" width="146" height="90" rx="9" stroke="#4ADE80" strokeWidth="2" />
      <rect x="86" y="44" width="70" height="46" rx="16" fill="#A5F3FC" fillOpacity=".7" />
      <circle cx="172" cy="46" r="14" fill="#A78BFA" />
      <circle cx="175" cy="43" r="4" fill="#6D28D9" />
      {cloroplastos.map(([x, y, r]) => (
        <g key={`${x}${y}`} transform={`rotate(${r} ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx="11" ry="6" fill="#16A34A" />
          <path d={`M${x - 6} ${y}H${x + 6}`} stroke="#BBF7D0" strokeWidth="1.5" />
        </g>
      ))}
      <ellipse cx="68" cy="68" rx="9" ry="5" fill="#FB923C" transform="rotate(-30 68 68)" />
    </Lienzo>
  )
}

function CuerpoHumano(p) {
  return (
    <Lienzo {...p}>
      <path d="M92 46L70 98M148 46L170 98" stroke="#334155" strokeWidth="13" strokeLinecap="round" />
      <circle cx="120" cy="24" r="15" fill="#334155" />
      <rect x="113" y="36" width="14" height="8" fill="#334155" />
      <path d="M90 44Q120 38 150 44L156 112Q120 120 84 112Z" fill="#334155" />
      <ellipse cx="120" cy="21" rx="9" ry="7" fill="#F9A8D4" />
      <path d="M114 20Q117 16 120 21Q123 16 126 20" stroke="#DB2777" strokeWidth="1.3" />
      <ellipse cx="107" cy="66" rx="11" ry="18" fill="#F9A8D4" />
      <ellipse cx="133" cy="66" rx="11" ry="18" fill="#F9A8D4" />
      <path d="M124 84C114 77 114 68 119 68C121 68 123 70 124 72C125 70 127 68 129 68C134 68 134 77 124 84Z" fill="#EF4444" />
      <ellipse cx="126" cy="98" rx="11" ry="7" fill="#FB923C" transform="rotate(-15 126 98)" />
    </Lienzo>
  )
}

function SeresVivos(p) {
  return (
    <Lienzo {...p}>
      {[36, 92, 148, 204].map(x => <circle key={x} cx={x} cy="68" r="25" fill="#14532D" fillOpacity=".6" stroke="#4ADE80" strokeOpacity=".5" strokeWidth="2" />)}
      {/* hongo */}
      <rect x="32" y="66" width="8" height="18" rx="3" fill="#FEF3C7" />
      <path d="M20 68Q20 50 36 50Q52 50 52 68Z" fill="#DC2626" />
      <circle cx="30" cy="59" r="2.5" fill="#FEF3C7" />
      <circle cx="42" cy="57" r="2" fill="#FEF3C7" />
      {/* planta */}
      <path d="M92 90V64" stroke="#16A34A" strokeWidth="3" />
      <path d="M92 80Q82 74 80 82Q88 86 92 80Z" fill="#22C55E" />
      {[[92, 52], [101, 58], [83, 58], [96, 67], [88, 67]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="6" fill="#F472B6" />)}
      <circle cx="92" cy="60" r="4" fill="#FBBF24" />
      {/* pez */}
      <path d="M166 68L176 58V78Z" fill="#38BDF8" />
      <ellipse cx="146" cy="68" rx="18" ry="11" fill="#38BDF8" />
      <circle cx="138" cy="65" r="2.2" fill="#0C4A6E" />
      {/* bacteria */}
      <rect x="188" y="60" width="30" height="16" rx="8" fill="#A3E635" transform="rotate(-20 203 68)" />
      <path d="M216 62Q222 56 226 60T232 58" stroke="#A3E635" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M190 76Q184 82 180 78T174 80" stroke="#A3E635" strokeWidth="1.8" strokeLinecap="round" />
    </Lienzo>
  )
}

function Ecosistemas(p) {
  return (
    <Lienzo {...p}>
      <circle cx="206" cy="26" r="12" fill="#FBBF24" />
      <path d="M206 6V10M206 42V46M186 26H190M222 26H226" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
      {/* nube que llueve */}
      <circle cx="50" cy="26" r="10" fill="#E2E8F0" />
      <circle cx="64" cy="22" r="13" fill="#E2E8F0" />
      <circle cx="78" cy="28" r="9" fill="#E2E8F0" />
      <rect x="44" y="28" width="40" height="10" rx="5" fill="#E2E8F0" />
      <path d="M52 44L49 52M64 44L61 52M76 44L73 52" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
      <path d="M0 110Q60 72 130 96T240 92V135H0Z" fill="#166534" />
      <ellipse cx="172" cy="112" rx="34" ry="8" fill="#0EA5E9" />
      <rect x="76" y="72" width="8" height="22" fill="#78350F" />
      <circle cx="80" cy="62" r="16" fill="#22C55E" />
      <circle cx="69" cy="72" r="10" fill="#22C55E" />
      <circle cx="91" cy="72" r="10" fill="#22C55E" />
      {/* evaporación: el agua vuelve a la nube */}
      <FlechaCurva x1={158} y1={100} cx={140} cy={30} x2={92} y2={24} c="#7DD3FC" w={2} dash="4 4" />
      <path d="M140 60L145 55L150 60M152 50L156 46L160 50" stroke="#F8FAFC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </Lienzo>
  )
}

function Cromosoma({ x, c, banda }) {
  return (
    <g>
      {[18, -18].map(r => (
        <g key={r} transform={`rotate(${r} ${x} 68)`}>
          <rect x={x - 8} y="26" width="16" height="84" rx="8" fill={c} />
          <rect x={x - 8} y="40" width="16" height="5" fill={banda} />
          <rect x={x - 8} y="88" width="16" height="6" fill={banda} />
        </g>
      ))}
      <circle cx={x} cy="68" r="5" fill="#1E1B4B" />
    </g>
  )
}

function Genetica(p) {
  const pares = [['A', 'T'], ['G', 'C'], ['T', 'A'], ['C', 'G']]
  const color = { A: '#F472B6', T: '#38BDF8', G: '#FBBF24', C: '#4ADE80' }
  return (
    <Lienzo {...p}>
      <Cromosoma x={50} c="#A78BFA" banda="#6D28D9" />
      <Cromosoma x={104} c="#A78BFA" banda="#F472B6" />
      <path d="M118 44L162 36M122 50L162 104" stroke="#CBD5E1" strokeOpacity=".4" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="162" y="30" width="66" height="80" rx="10" fill="#1E1B4B" stroke="#A78BFA" strokeWidth="2" />
      {pares.map(([a, b], i) => (
        <g key={i}>
          <path d={`M184 ${46 + i * 18}H206`} stroke="#CBD5E1" strokeOpacity=".5" strokeWidth="2" />
          <T x={176} y={51 + i * 18} s={13} c={color[a]}>{a}</T>
          <T x={214} y={51 + i * 18} s={13} c={color[b]}>{b}</T>
        </g>
      ))}
    </Lienzo>
  )
}

function Nutricion(p) {
  return (
    <Lienzo {...p}>
      <circle cx="96" cy="68" r="52" fill="#F8FAFC" />
      <path d="M96 68L96 24A44 44 0 0 0 96 112Z" fill="#22C55E" />
      <path d="M96 68L96 24A44 44 0 0 1 140 68Z" fill="#F97316" />
      <path d="M96 68L140 68A44 44 0 0 1 96 112Z" fill="#FBBF24" />
      <path d="M72 48Q64 56 72 64Q80 56 72 48ZM80 82Q70 86 74 96Q84 92 80 82Z" fill="#15803D" />
      <circle cx="68" cy="80" r="4" fill="#DC2626" />
      <path d="M106 44Q118 40 124 52Q114 58 106 44Z" fill="#C2410C" />
      <path d="M106 84L126 80M104 94L122 92M110 102L120 100" stroke="#B45309" strokeWidth="2" strokeLinecap="round" />
      {/* agua */}
      <path d="M164 42H196L191 106H169Z" fill="#7DD3FC" fillOpacity=".3" stroke="#BAE6FD" strokeWidth="2" strokeLinejoin="round" />
      <path d="M166 60H194L191 104H169Z" fill="#38BDF8" fillOpacity=".5" />
      {/* manzana */}
      <circle cx="220" cy="102" r="11" fill="#DC2626" />
      <path d="M220 91V86" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      <path d="M221 88Q228 82 232 88Q226 92 221 88Z" fill="#22C55E" />
    </Lienzo>
  )
}

// ── FÍSICA ─────────────────────────────────────────────────────────────────

function Fuerzas(p) {
  return (
    <Lienzo {...p}>
      <path d="M20 112H210L20 44Z" fill="#1E3A8A" fillOpacity=".45" stroke="#60A5FA" strokeWidth="2" strokeLinejoin="round" />
      <g transform="translate(110 76.2) rotate(19.7)">
        <rect x="-18" y="-30" width="36" height="30" rx="3" fill="#3B82F6" />
      </g>
      <Flecha x1={115} y1={62} x2={115} y2={106} c="#F87171" w={3.5} />
      <Flecha x1={115} y1={62} x2={127} y2={28} c="#38BDF8" w={3.5} />
      <Flecha x1={115} y1={62} x2={87} y2={52} c="#FBBF24" w={3.5} />
      <path d="M184 112A26 26 0 0 1 185.5 103.2" stroke="#E2E8F0" strokeWidth="1.8" />
      <T x={176} y={108} s={11} c="#E2E8F0" w={700}>α</T>
    </Lienzo>
  )
}

function Energia(p) {
  return (
    <Lienzo {...p}>
      {/* aerogenerador */}
      <path d="M58 112L62 50H66L70 112Z" fill="#E2E8F0" />
      {[0, 120, 240].map(r => <path key={r} d="M64 48L60 14Q64 9 68 15Z" fill="#F8FAFC" transform={`rotate(${r + 20} 64 48)`} />)}
      <circle cx="64" cy="48" r="4.5" fill="#94A3B8" />
      {/* placa solar */}
      <path d="M150 96V110" stroke="#94A3B8" strokeWidth="3" />
      <path d="M110 96L130 64H190L170 96Z" fill="#1E40AF" />
      <path d="M130 96L150 64M150 96L170 64M120 80H180" stroke="#93C5FD" strokeWidth="1.5" />
      <circle cx="196" cy="26" r="10" fill="#FBBF24" />
      <path d="M196 8V12M196 40V44M178 26H182M210 26H214M183 13L186 16M209 13L206 16" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
      {/* batería */}
      <rect x="206" y="70" width="24" height="42" rx="4" stroke="#86EFAC" strokeWidth="2.5" />
      <rect x="213" y="65" width="10" height="5" rx="1" fill="#86EFAC" />
      {[0, 1, 2].map(i => <rect key={i} x="210" y={100 - i * 11} width="16" height="8" rx="1.5" fill="#22C55E" />)}
      <path d="M14 112H200" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
    </Lienzo>
  )
}

function Electricidad(p) {
  return (
    <Lienzo {...p}>
      <path d="M40 60V40H106M134 40H200V104H144M96 104H40V84" stroke="#CBD5E1" strokeWidth="3" strokeLinejoin="round" />
      {/* pila */}
      <path d="M26 66H54M33 76H47" stroke="#F8FAFC" strokeWidth="3.5" strokeLinecap="round" />
      <T x={62} y={70} s={11} c="#FCA5A5">+</T>
      <T x={56} y={84} s={11} c="#93C5FD">−</T>
      {/* bombilla encendida */}
      <circle cx="120" cy="40" r="24" fill="#FDE047" fillOpacity=".15" />
      <circle cx="120" cy="40" r="14" fill="#FDE047" />
      <path d="M113 42Q116 34 120 42Q124 34 127 42" stroke="#B45309" strokeWidth="1.8" />
      {/* resistencia */}
      <path d="M96 104L100 96L108 112L116 96L124 112L132 96L140 112L144 104" stroke="#FB923C" strokeWidth="3" strokeLinejoin="round" />
      <Flecha x1={160} y1={30} x2={188} y2={30} c="#FBBF24" w={2.5} />
      <T x={174} y={22} s={11} c="#FBBF24" w={700}>I</T>
    </Lienzo>
  )
}

function CalorTemperatura(p) {
  return (
    <Lienzo {...p}>
      {/* termómetro */}
      <rect x="40" y="16" width="16" height="84" rx="8" fill="#F8FAFC" fillOpacity=".12" stroke="#E2E8F0" strokeWidth="2" />
      <rect x="44" y="40" width="8" height="64" rx="4" fill="#EF4444" />
      <circle cx="48" cy="106" r="12" fill="#EF4444" />
      <path d="M60 30H66M60 44H64M60 58H66M60 72H64M60 86H66" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
      {/* olla al fuego con convección */}
      <path d="M100 66H108M192 66H200" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
      <path d="M108 56H192V94Q192 102 184 102H116Q108 102 108 94Z" fill="#475569" />
      <FlechaCurva x1={150} y1={94} cx={150} cy={60} x2={130} y2={70} c="#FCA5A5" w={2.2} />
      <FlechaCurva x1={150} y1={94} cx={150} cy={60} x2={170} y2={70} c="#FCA5A5" w={2.2} />
      <path d="M130 48Q126 42 130 36T130 24M150 48Q146 42 150 36T150 24M170 48Q166 42 170 36T170 24" stroke="#E2E8F0" strokeOpacity=".5" strokeWidth="2" strokeLinecap="round" />
      <path d="M130 118Q124 110 132 104Q134 110 138 108Q138 114 130 118ZM150 118Q142 108 152 100Q154 108 160 106Q160 114 150 118ZM170 118Q164 110 172 104Q174 110 178 108Q178 114 170 118Z" fill="#F97316" />
      <path d="M118 120H182" stroke="#64748B" strokeWidth="3" strokeLinecap="round" />
    </Lienzo>
  )
}

function PresionFluidos(p) {
  return (
    <Lienzo {...p}>
      <path d="M32 50H158V112H32Z" fill="#0EA5E9" fillOpacity=".3" />
      <path d="M32 50Q48 46 64 50T96 50T128 50T160 50" stroke="#7DD3FC" strokeWidth="2" />
      <path d="M30 30V114H160V30" stroke="#BAE6FD" strokeWidth="3" strokeLinejoin="round" />
      <rect x="70" y="36" width="40" height="26" rx="2" fill="#F59E0B" />
      <Flecha x1={90} y1={12} x2={90} y2={32} c="#F87171" w={3} />
      <Flecha x1={90} y1={98} x2={90} y2={68} c="#38BDF8" w={3.5} />
      {/* la presión crece con la profundidad */}
      {[[66, 8], [84, 14], [102, 20]].map(([y, l]) => <Flecha key={y} x1={154} y1={y} x2={154 - l} y2={y} c="#E0F2FE" w={2} />)}
      {/* globo */}
      <path d="M200 70Q196 90 204 110" stroke="#CBD5E1" strokeWidth="1.5" />
      <ellipse cx="200" cy="48" rx="17" ry="21" fill="#F43F5E" />
      <path d="M197 69L200 73L203 69Z" fill="#F43F5E" />
      <path d="M190 38Q192 32 198 30" stroke="#FFE4E6" strokeOpacity=".7" strokeWidth="2.5" strokeLinecap="round" />
    </Lienzo>
  )
}

function OndasLuz(p) {
  return (
    <Lienzo {...p}>
      <path d="M16 38Q29 14 42 38T68 38T94 38T120 38T146 38T172 38T198 38T224 38" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
      <path d="M29 18H81M29 14V22M81 14V22" stroke="#E2E8F0" strokeWidth="1.5" />
      <T x={55} y={13} s={11} c="#E2E8F0" w={700}>λ</T>
      {/* reflexión en un espejo */}
      <path d="M40 112H200" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 116L46 122M66 116L62 122M82 116L78 122M98 116L94 122M114 116L110 122M130 116L126 122M146 116L142 122M162 116L158 122M178 116L174 122M194 116L190 122" stroke="#64748B" strokeWidth="1.5" />
      <path d="M120 112V62" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="3 3" />
      <Flecha x1={64} y1={64} x2={118} y2={110} c="#FACC15" w={3} />
      <Flecha x1={122} y1={110} x2={176} y2={64} c="#FACC15" w={3} />
      <T x={108} y={86} s={10} c="#FDE68A">i</T>
      <T x={132} y={86} s={10} c="#FDE68A">r</T>
    </Lienzo>
  )
}

// Salud y enfermedad: un virus, el anticuerpo que lo reconoce y una vacuna.
function SaludEnfermedad(p) {
  return (
    <Lienzo {...p}>
      {/* virus */}
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2
        return <g key={i}>
          <path d={`M${62 + Math.cos(a) * 26} ${66 + Math.sin(a) * 26}L${62 + Math.cos(a) * 36} ${66 + Math.sin(a) * 36}`} stroke="#F43F5E" strokeWidth="3" />
          <circle cx={62 + Math.cos(a) * 38} cy={66 + Math.sin(a) * 38} r="4" fill="#FB7185" />
        </g>
      })}
      <circle cx="62" cy="66" r="27" fill="#E11D48" />
      <circle cx="54" cy="58" r="5" fill="#FDA4AF" fillOpacity=".6" /><circle cx="70" cy="74" r="4" fill="#FDA4AF" fillOpacity=".6" />
      {/* anticuerpo en Y */}
      <path d="M128 100V74M128 74L112 54M128 74L144 54" stroke="#38BDF8" strokeWidth="7" strokeLinecap="round" />
      <path d="M108 50l8 8M148 50l-8 8" stroke="#BAE6FD" strokeWidth="4" strokeLinecap="round" />
      {/* jeringa */}
      <g transform="rotate(-35 196 70)">
        <rect x="170" y="62" width="44" height="16" rx="3" fill="#E2E8F0" />
        <rect x="174" y="65" width="26" height="10" rx="2" fill="#86EFAC" />
        <path d="M214 70h14" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M160 70h10M158 62v16" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
      </g>
    </Lienzo>
  )
}

// Atmósfera y clima: las capas del aire sobre la Tierra, el Sol y el calor
// que los gases de efecto invernadero devuelven hacia el suelo.
function AtmosferaClima(p) {
  return (
    <Lienzo {...p}>
      <path d="M-10 135Q120 40 250 135Z" fill="#7DD3FC" fillOpacity=".12" />
      <path d="M8 135Q120 62 232 135Z" fill="#7DD3FC" fillOpacity=".18" />
      <path d="M26 135Q120 84 214 135Z" fill="#38BDF8" fillOpacity=".25" />
      <path d="M44 135Q120 106 196 135Z" fill="#16A34A" />
      <path d="M44 135Q120 106 196 135" stroke="#4ADE80" strokeWidth="2" />
      {/* Sol */}
      <circle cx="36" cy="30" r="16" fill="#FBBF24" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
        const a = (i / 8) * Math.PI * 2
        return <path key={i} d={`M${36 + Math.cos(a) * 21} ${30 + Math.sin(a) * 21}L${36 + Math.cos(a) * 27} ${30 + Math.sin(a) * 27}`} stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
      })}
      {/* luz que entra y calor que rebota */}
      <Flecha x1={56} y1={44} x2={108} y2={104} c="#FDE68A" w={3} />
      <path d="M114 106Q128 80 142 70Q150 66 146 78Q140 94 160 104" stroke="#F97316" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="5 4" />
      {/* termómetro */}
      <rect x="198" y="24" width="12" height="58" rx="6" fill="#F8FAFC" />
      <rect x="201" y="44" width="6" height="36" rx="3" fill="#EF4444" />
      <circle cx="204" cy="86" r="9" fill="#EF4444" />
      <Flecha x1={222} y1={70} x2={222} y2={36} c="#EF4444" w={2.5} />
    </Lienzo>
  )
}

// Clave = `<disciplina>/<id del tema>` (QuimicaIndex, data/ciencias.js).
export const ARTE_TEMAS_CIENCIAS = {
  'quimica/tabla-periodica': TablaPeriodica,
  'quimica/estados-materia': EstadosMateria,
  'quimica/mezclas-separacion': Mezclas,
  'quimica/disoluciones': Disoluciones,
  'quimica/formulacion': Formulacion,
  'quimica/acidos-bases': AcidosBases,
  'quimica/atomos-moleculas': AtomosMoleculas,
  'geologia/rocas-minerales': RocasMinerales,
  'geologia/sistema-solar': SistemaSolar,
  'geologia/placas-tectonicas': PlacasTectonicas,
  'biologia/evolucion': Evolucion,
  'biologia/celula': CelulaVegetal,
  'biologia/cuerpo-humano': CuerpoHumano,
  'biologia/seres-vivos': SeresVivos,
  'biologia/ecosistemas': Ecosistemas,
  'biologia/genetica': Genetica,
  'biologia/nutricion': Nutricion,
  'fisica/fuerzas': Fuerzas,
  'fisica/energia': Energia,
  'fisica/electricidad': Electricidad,
  'fisica/calor-temperatura': CalorTemperatura,
  'fisica/presion-fluidos': PresionFluidos,
  'fisica/ondas-luz': OndasLuz,
  'biologia/salud-enfermedad': SaludEnfermedad,
  'geologia/atmosfera-clima': AtmosferaClima,
}
