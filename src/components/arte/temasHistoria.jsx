// Arte de los temas de Historia (/estudiar/historia): cada época con el objeto
// que la cuenta — el Coliseo, la carabela, el bicornio de Napoleón…
import { Lienzo, T, Flecha, estrella } from './base'

// Rueda dentada de `n` dientes (Revolución Industrial).
function engranaje(cx, cy, R, r, n) {
  let d = ''
  for (let i = 0; i < n * 2; i++) {
    const a0 = (i / (n * 2)) * Math.PI * 2
    const a1 = ((i + 1) / (n * 2)) * Math.PI * 2
    const rad = i % 2 === 0 ? R : r
    const p0 = [cx + rad * Math.cos(a0), cy + rad * Math.sin(a0)]
    const p1 = [cx + rad * Math.cos(a1), cy + rad * Math.sin(a1)]
    d += `${i === 0 ? 'M' : 'L'}${p0[0].toFixed(1)} ${p0[1].toFixed(1)}L${p1[0].toFixed(1)} ${p1[1].toFixed(1)}`
  }
  return d + 'Z'
}

function GrandesHitos(p) {
  return (
    <Lienzo {...p}>
      {/* la rueda */}
      <circle cx="40" cy="70" r="16" stroke="#B45309" strokeWidth="4" />
      <path d="M40 54V86M24 70H56M29 59L51 81M51 59L29 81" stroke="#B45309" strokeWidth="2" />
      <circle cx="40" cy="70" r="3.5" fill="#FBBF24" />
      {/* la pirámide */}
      <path d="M75 86L95 50L115 86Z" fill="#F59E0B" />
      <path d="M95 50L115 86H95Z" fill="#D97706" />
      {/* la carabela */}
      <path d="M130 78H170L163 88H137Z" fill="#92400E" />
      <path d="M150 78V46" stroke="#78350F" strokeWidth="2.5" />
      <path d="M151 48H165Q161 60 165 72H151Z" fill="#FEF3C7" />
      {/* el cohete */}
      <path d="M205 44Q215 56 213 78H197Q195 56 205 44Z" fill="#E2E8F0" />
      <circle cx="205" cy="60" r="4" fill="#38BDF8" />
      <path d="M197 68L190 82L197 79ZM213 68L220 82L213 79Z" fill="#F43F5E" />
      <path d="M200 79L205 91L210 79Z" fill="#FBBF24" />
      <Flecha x1={14} y1={106} x2={226} y2={106} c="#B45309" w={3} />
      {[40, 95, 150, 205].map(x => <circle key={x} cx={x} cy="106" r="4.5" fill="#FBBF24" stroke="#141b2e" strokeWidth="2" />)}
    </Lienzo>
  )
}

function GuerraCivil(p) {
  // 1931 → 1978 a escala: República, guerra, dictadura, Transición.
  const tramos = [[20, 21, '#A78BFA'], [41, 13, '#EF4444'], [54, 153, '#64748B'], [207, 13, '#22C55E']]
  return (
    <Lienzo {...p}>
      {tramos.map(([x, w, c]) => <rect key={x} x={x} y="98" width={w} height="12" fill={c} />)}
      <rect x="20" y="98" width="200" height="12" rx="2" stroke="#141b2e" strokeWidth="1" />
      <T x={20} y={126} s={10} c="#94A3B8" a="start">1931</T>
      <T x={220} y={126} s={10} c="#94A3B8" a="end">1978</T>
      {/* la lupa sobre 1936-1939 */}
      <path d="M84 66L50 96" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />
      <path d="M138 70L158 88" stroke="#92400E" strokeWidth="8" strokeLinecap="round" />
      <circle cx="112" cy="44" r="34" fill="#1F2937" stroke="#E2E8F0" strokeWidth="4" />
      <rect x="80" y="40" width="64" height="8" fill="#EF4444" fillOpacity=".35" />
      <T x={112} y={34} s={16} c="#FCA5A5">1936</T>
      <T x={112} y={67} s={16} c="#FCA5A5">1939</T>
    </Lienzo>
  )
}

function SegundaGuerra(p) {
  return (
    <Lienzo {...p}>
      {/* avión */}
      <path d="M146 42L160 42L170 20L160 20Z" fill="#475569" />
      <path d="M110 44Q150 34 196 42Q200 44 196 46Q150 54 110 46Z" fill="#64748B" />
      <path d="M112 44L104 30L118 36Z" fill="#475569" />
      <path d="M140 46L156 46L172 72L160 72Z" fill="#94A3B8" />
      <path d="M198 33V55" stroke="#CBD5E1" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="176" cy="42" r="3" fill="#FBBF24" />
      {/* casco */}
      <path d="M36 100Q36 70 64 70Q92 70 92 100Z" fill="#4D7C0F" />
      <path d="M28 101H100" stroke="#3F6212" strokeWidth="6" strokeLinecap="round" />
      <path d="M46 84Q52 76 62 74" stroke="#A3E635" strokeOpacity=".4" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M14 112H226" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
      <T x={170} y={104} s={16} c="#CBD5E1">1939–1945</T>
    </Lienzo>
  )
}

function Roma(p) {
  const arcos = [50, 68, 86, 104, 122, 140, 158, 176]
  return (
    <Lienzo {...p}>
      <rect x="40" y="36" width="160" height="74" rx="3" fill="#F59E0B" />
      <rect x="40" y="36" width="160" height="12" fill="#D97706" />
      <T x={120} y={45.5} s={9} c="#FEF3C7">SPQR</T>
      {[108, 86, 64].map(y0 => (
        <g key={y0}>
          {arcos.map(x => <path key={x} d={`M${x + 1} ${y0}V${y0 - 11}A5 5 0 0 1 ${x + 11} ${y0 - 11}V${y0}Z`} fill="#78350F" />)}
        </g>
      ))}
      <path d="M40 88H200M40 66H200" stroke="#B45309" strokeWidth="2" />
      <path d="M200 36V110" stroke="#B45309" strokeWidth="2" />
      <path d="M20 110H220" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
      {/* un trozo caído: el Coliseo está en ruinas por un lado */}
      <path d="M176 36H200V58L190 50L184 44Z" fill="#141b2e" />
    </Lienzo>
  )
}

function Independencia(p) {
  const franjas = Array.from({ length: 13 }, (_, i) => i)
  const estrellas = Array.from({ length: 13 }, (_, i) => {
    const a = (i / 13) * Math.PI * 2 - Math.PI / 2
    return [158 + 11 * Math.cos(a), 47.5 + 11 * Math.sin(a)]
  })
  return (
    <Lienzo {...p}>
      {/* la Campana de la Libertad */}
      <rect x="78" y="28" width="24" height="10" rx="2" fill="#78350F" />
      <path d="M64 96Q70 90 72 68Q74 40 90 38Q106 40 108 68Q110 90 116 96Z" fill="#B45309" />
      <rect x="60" y="94" width="60" height="8" rx="3" fill="#92400E" />
      <path d="M92 58L88 70L93 77L89 90" stroke="#451A03" strokeWidth="2" strokeLinejoin="round" />
      <path d="M78 52Q80 46 86 44" stroke="#FDE68A" strokeOpacity=".5" strokeWidth="2.5" strokeLinecap="round" />
      {/* la bandera de las trece colonias */}
      {franjas.map(i => <rect key={i} x="136" y={30 + i * 5} width="92" height="5" fill={i % 2 === 0 ? '#DC2626' : '#F8FAFC'} />)}
      <rect x="136" y="30" width="44" height="35" fill="#1E3A8A" />
      {estrellas.map(([x, y], i) => <path key={i} d={estrella(x, y, 2.4)} fill="#F8FAFC" />)}
      <path d="M136 30V118" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
    </Lienzo>
  )
}

function Prehistoria(p) {
  return (
    <Lienzo {...p}>
      <path d="M18 30Q30 12 70 14Q130 10 160 24Q170 60 162 100Q120 122 60 118Q20 116 16 90Z" fill="#44403C" />
      {/* el ciervo pintado en la pared */}
      <ellipse cx="84" cy="72" rx="26" ry="11" fill="#C2410C" />
      <path d="M104 66L114 50" stroke="#C2410C" strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="118" cy="48" rx="8" ry="5" fill="#C2410C" />
      <path d="M114 44L108 30M110 36L102 32M119 44L125 30M122 36L131 32" stroke="#C2410C" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M68 80L64 100M77 82L77 102M94 82L96 102M102 78L108 98" stroke="#C2410C" strokeWidth="4" strokeLinecap="round" />
      <path d="M58 70L50 64" stroke="#C2410C" strokeWidth="3" strokeLinecap="round" />
      {[[36, 40], [44, 34], [140, 96], [148, 88], [40, 104]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="2.2" fill="#FDBA74" fillOpacity=".6" />)}
      {/* la hoguera */}
      <path d="M176 112L216 104M176 104L216 112" stroke="#78350F" strokeWidth="6" strokeLinecap="round" />
      <path d="M196 104Q180 88 192 70Q194 82 200 84Q198 72 206 62Q214 86 196 104Z" fill="#F97316" />
      <path d="M196 104Q188 94 194 84Q198 92 202 90Q206 98 196 104Z" fill="#FDE047" />
      <circle cx="212" cy="54" r="1.8" fill="#FDBA74" />
      <circle cx="186" cy="58" r="1.4" fill="#FDBA74" />
    </Lienzo>
  )
}

function EdadAntigua(p) {
  return (
    <Lienzo {...p}>
      {/* zigurat */}
      <rect x="18" y="96" width="72" height="14" fill="#A16207" />
      <rect x="28" y="82" width="52" height="14" fill="#CA8A04" />
      <rect x="38" y="68" width="32" height="14" fill="#EAB308" />
      <path d="M54 110V68" stroke="#713F12" strokeWidth="4" strokeDasharray="2 2" />
      {/* obelisco */}
      <path d="M112 110L116 40L120 33L124 40L128 110Z" fill="#FBBF24" />
      <path d="M117 52H123M118 62L122 66M117 76H123M120 86V92M117 100H123" stroke="#92400E" strokeWidth="1.6" strokeLinecap="round" />
      {/* ánfora griega */}
      <path d="M184 44Q172 44 176 60M208 44Q220 44 216 60" stroke="#EA580C" strokeWidth="4" strokeLinecap="round" />
      <path d="M186 34H206V40Q204 46 210 52Q222 64 216 88Q210 104 200 110H192Q182 104 176 88Q170 64 182 52Q188 46 186 40Z" fill="#EA580C" />
      <path d="M173 70H219L218 82H174Z" fill="#1C1917" />
      <path d="M178 79V73H183V79H188V73H193V79H198V73H203V79H208V73H213V79" stroke="#EA580C" strokeWidth="1.3" />
      <path d="M12 111H228" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
    </Lienzo>
  )
}

function EdadMedia(p) {
  return (
    <Lienzo {...p}>
      {/* arco de herradura de la Mezquita */}
      <circle cx="66" cy="66" r="24" fill="#1C1917" fillOpacity=".55" />
      <path d="M51 92A30 30 0 1 1 81 92" stroke="#B91C1C" strokeWidth="12" />
      <path d="M51 92A30 30 0 1 1 81 92" stroke="#FEF3C7" strokeWidth="12" strokeDasharray="7 7" />
      <rect x="42" y="92" width="7" height="20" fill="#D6D3D1" />
      <rect x="83" y="92" width="7" height="20" fill="#D6D3D1" />
      <path d="M38 112H94" stroke="#A8A29E" strokeWidth="3" strokeLinecap="round" />
      {/* espada y escudo */}
      <path d="M130 110L212 28" stroke="#CBD5E1" strokeWidth="5" strokeLinecap="round" />
      <path d="M131 92L148 109" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
      <circle cx="127" cy="113" r="4" fill="#92400E" />
      <path d="M146 40H194V70Q194 96 170 108Q146 96 146 70Z" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="2" />
      <rect x="166" y="44" width="8" height="58" fill="#FBBF24" />
      <rect x="150" y="62" width="40" height="8" fill="#FBBF24" />
    </Lienzo>
  )
}

function EdadModerna(p) {
  return (
    <Lienzo {...p}>
      <path d="M0 108Q16 100 32 108T64 108T96 108T128 108T160 108T192 108T224 108T256 108V135H0Z" fill="#1E3A8A" fillOpacity=".55" />
      <path d="M60 86H160L148 106H74Z" fill="#92400E" />
      <rect x="138" y="74" width="22" height="12" fill="#78350F" />
      <path d="M90 86V32M124 86V24" stroke="#78350F" strokeWidth="3" />
      <path d="M92 36H114Q118 50 114 64H92Q96 50 92 36Z" fill="#FEF3C7" />
      <path d="M126 30H150Q154 44 150 60H126Q130 44 126 30Z" fill="#FEF3C7" />
      <path d="M103 42V58M96 50H110M138 36V54M131 45H145" stroke="#DC2626" strokeWidth="3" />
      <path d="M124 24L136 27L124 30Z" fill="#DC2626" />
      <path d="M0 112Q16 104 32 112T64 112T96 112T128 112T160 112T192 112T224 112T256 112" stroke="#38BDF8" strokeWidth="2.5" />
      {/* rosa de los vientos: el mapa del mundo se estaba dibujando */}
      <circle cx="204" cy="42" r="18" stroke="#FBBF24" strokeWidth="2" />
      <path d="M204 26L208 42L204 58L200 42Z" fill="#FBBF24" />
      <path d="M188 42L204 38L220 42L204 46Z" fill="#FDE68A" fillOpacity=".6" />
    </Lienzo>
  )
}

function RevolucionFrancesa(p) {
  return (
    <Lienzo {...p}>
      {/* el bicornio de Napoleón con la escarapela tricolor */}
      <path d="M36 92Q64 36 120 56Q176 36 204 92Q120 76 36 92Z" fill="#1C1917" stroke="#44403C" strokeWidth="1.5" />
      <path d="M36 92Q120 76 204 92" stroke="#FBBF24" strokeWidth="2.5" />
      <circle cx="120" cy="66" r="14" fill="#1D4ED8" />
      <circle cx="120" cy="66" r="9" fill="#F8FAFC" />
      <circle cx="120" cy="66" r="4.5" fill="#DC2626" />
      <T x={120} y={120} s={17} c="#FDE68A">1789 · 1815</T>
    </Lienzo>
  )
}

function RevolucionIndustrial(p) {
  return (
    <Lienzo {...p}>
      {/* la fábrica y su chimenea */}
      <circle cx="116" cy="22" r="7" fill="#A8A29E" fillOpacity=".45" />
      <circle cx="128" cy="14" r="9" fill="#A8A29E" fillOpacity=".3" />
      <circle cx="144" cy="10" r="10" fill="#A8A29E" fillOpacity=".18" />
      <rect x="100" y="30" width="14" height="80" fill="#57534E" />
      <rect x="98" y="28" width="18" height="5" fill="#44403C" />
      <path d="M20 110V70L44 56V70L68 56V70L92 56V110Z" fill="#78716C" />
      {[28, 50, 72].map(x => <rect key={x} x={x} y="80" width="12" height="10" rx="1" fill="#FBBF24" />)}
      <rect x="44" y="96" width="14" height="14" fill="#44403C" />
      {/* engranajes */}
      <path d={engranaje(176, 82, 30, 24, 12)} fill="#D97706" />
      <circle cx="176" cy="82" r="9" fill="#141b2e" />
      <path d={engranaje(214, 44, 17, 13, 8)} fill="#B45309" />
      <circle cx="214" cy="44" r="5" fill="#141b2e" />
      <path d="M14 111H226" stroke="#57534E" strokeWidth="2.5" strokeLinecap="round" />
    </Lienzo>
  )
}

function PrimeraGuerra(p) {
  return (
    <Lienzo {...p}>
      <path d="M14 108Q60 100 120 106T226 104V124H14Z" fill="#57534E" />
      {/* alambrada */}
      <path d="M26 108V78M122 106V76" stroke="#78716C" strokeWidth="3" strokeLinecap="round" />
      <path d="M26 84Q74 94 122 82M26 96Q74 104 122 94" stroke="#A8A29E" strokeWidth="1.5" />
      {[42, 58, 74, 90, 106].map(x => <path key={x} d={`M${x - 3} ${87}L${x + 3} ${93}M${x + 3} ${87}L${x - 3} ${93}`} stroke="#D6D3D1" strokeWidth="1.3" />)}
      {/* casco Brodie */}
      <path d="M48 66Q70 40 92 66Z" fill="#65743A" />
      <ellipse cx="70" cy="67" rx="32" ry="5" fill="#4D5A2B" />
      {/* la amapola del recuerdo */}
      <path d="M178 70Q172 92 180 106" stroke="#4D7C0F" strokeWidth="3" strokeLinecap="round" />
      <path d="M176 92Q164 86 160 94Q170 98 176 92Z" fill="#4D7C0F" />
      {[[166, 54], [190, 54], [166, 74], [190, 74]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="14" fill="#DC2626" />)}
      <circle cx="178" cy="64" r="7" fill="#1C1917" />
      <T x={70} y={30} s={14} c="#D6D3D1">1914–1918</T>
    </Lienzo>
  )
}

function GuerraFria(p) {
  return (
    <Lienzo {...p}>
      <rect x="14" y="12" width="98" height="110" rx="10" fill="#1E3A8A" fillOpacity=".45" />
      <rect x="128" y="12" width="98" height="110" rx="10" fill="#7F1D1D" fillOpacity=".45" />
      {/* el muro */}
      {[16, 30, 44, 58, 72, 86, 100, 114].map((y, i) => (
        <rect key={y} x={i % 2 ? 110 : 112} y={y} width={i % 2 ? 20 : 16} height="12" rx="1.5" fill="#94A3B8" stroke="#475569" strokeWidth="1" />
      ))}
      {/* cohete */}
      <path d="M62 24Q72 40 70 84H54Q52 40 62 24Z" fill="#E2E8F0" />
      <rect x="54" y="60" width="16" height="6" fill="#1E3A8A" />
      <path d="M54 72L44 92L54 88ZM70 72L80 92L70 88Z" fill="#60A5FA" />
      <path d="M57 86L62 102L67 86Z" fill="#FBBF24" />
      {/* Sputnik */}
      <path d="M170 64L148 92M176 66L166 98M182 66L192 98M188 64L210 92" stroke="#CBD5E1" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="179" cy="56" r="14" fill="#CBD5E1" />
      <path d="M170 50Q174 44 180 44" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d={estrella(206, 28, 5)} fill="#FCA5A5" />
      <path d={estrella(36, 30, 4)} fill="#BFDBFE" />
    </Lienzo>
  )
}

function Franquismo(p) {
  return (
    <Lienzo {...p}>
      {/* urna y papeleta */}
      <rect x="62" y="36" width="26" height="32" rx="2" fill="#F8FAFC" transform="rotate(-8 75 52)" />
      <path d="M68 48L80 46M68 54L78 53" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" transform="rotate(-8 75 52)" />
      <rect x="36" y="62" width="78" height="52" rx="5" fill="#93C5FD" fillOpacity=".3" stroke="#BFDBFE" strokeWidth="2" />
      <rect x="32" y="58" width="86" height="8" rx="2" fill="#BFDBFE" />
      <path d="M62 62H90" stroke="#1E3A8A" strokeWidth="3" strokeLinecap="round" />
      {/* la Constitución de 1978 */}
      <rect x="140" y="30" width="72" height="88" rx="5" fill="#B91C1C" />
      <rect x="146" y="30" width="4" height="88" fill="#7F1D1D" />
      <path d="M162 52H200M166 60H196" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
      <T x={180} y={90} s={18} c="#FDE68A">1978</T>
    </Lienzo>
  )
}

// Clave = `historia/<id del tema>` (HistoriaIndex, topicCatalog).
export const ARTE_TEMAS_HISTORIA = {
  'historia/primaria': GrandesHitos,
  'historia/gce': GuerraCivil,
  'historia/wwii': SegundaGuerra,
  'historia/roma': Roma,
  'historia/usa': Independencia,
  'historia/prehistoria': Prehistoria,
  'historia/antigua': EdadAntigua,
  'historia/edad-media': EdadMedia,
  'historia/edad-moderna': EdadModerna,
  'historia/revolucion-francesa': RevolucionFrancesa,
  'historia/revolucion-industrial': RevolucionIndustrial,
  'historia/primera-guerra-mundial': PrimeraGuerra,
  'historia/guerra-fria': GuerraFria,
  'historia/franquismo': Franquismo,
}
