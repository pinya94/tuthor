// Arte de los temas de Geografía (/estudiar/geografia): el relieve, la
// pirámide de población, los mapas de España y EE. UU. y, para cada
// continente, el globo girado hacia él con un monumento que lo identifica.
import { Lienzo, T } from './base'

function Fisica(p) {
  return (
    <Lienzo {...p}>
      {/* nube que llueve sobre la montaña */}
      <circle cx="184" cy="26" r="10" fill="#E2E8F0" />
      <circle cx="198" cy="22" r="13" fill="#E2E8F0" />
      <circle cx="212" cy="28" r="9" fill="#E2E8F0" />
      <rect x="178" y="28" width="40" height="10" rx="5" fill="#E2E8F0" />
      <path d="M186 44L183 52M198 44L195 52M210 44L207 52" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
      <path d="M150 112Q190 104 240 110V135H150Z" fill="#0EA5E9" fillOpacity=".6" />
      <path d="M8 114L60 40L90 78L120 30L172 114Z" fill="#0F766E" />
      <path d="M60 40L51 53L60 50L69 55Z" fill="#F8FAFC" />
      <path d="M120 30L109 46L120 42L131 48Z" fill="#F8FAFC" />
      {/* el río baja hasta el mar */}
      <path d="M118 58Q106 78 124 90T160 112" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
      <path d="M0 114H152" stroke="#115E59" strokeWidth="3" />
    </Lienzo>
  )
}

function Humana(p) {
  const hombres = [56, 52, 50, 44, 36, 26, 14]
  const mujeres = [54, 52, 50, 46, 40, 30, 18]
  return (
    <Lienzo {...p}>
      {/* pirámide de población */}
      {hombres.map((w, i) => <rect key={`h${i}`} x={90 - w} y={104 - i * 13} width={w} height="11" rx="2" fill="#38BDF8" />)}
      {mujeres.map((w, i) => <rect key={`m${i}`} x={92} y={104 - i * 13} width={w} height="11" rx="2" fill="#F472B6" />)}
      <path d="M91 18V118" stroke="#E2E8F0" strokeOpacity=".5" strokeWidth="1.5" />
      {/* los tres sectores: campo, fábrica, tienda */}
      <path d="M200 44V18" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
      {[22, 29, 36].map(y => (
        <g key={y}>
          <ellipse cx="196.5" cy={y} rx="3" ry="4.5" fill="#FACC15" transform={`rotate(-30 196.5 ${y})`} />
          <ellipse cx="203.5" cy={y} rx="3" ry="4.5" fill="#FACC15" transform={`rotate(30 203.5 ${y})`} />
        </g>
      ))}
      <path d="M186 82V68L194 62V68L202 62V68L210 62V82Z" fill="#94A3B8" />
      <rect x="208" y="54" width="5" height="14" fill="#64748B" />
      <rect x="187" y="104" width="26" height="14" fill="#F8FAFC" />
      <path d="M185 98H215L213 104H187Z" fill="#EF4444" />
      <path d="M191 98L190 104M197 98V104M203 98V104M209 98L210 104" stroke="#F8FAFC" strokeWidth="2" />
      <rect x="196" y="110" width="8" height="8" fill="#94A3B8" />
    </Lienzo>
  )
}

function Espana(p) {
  return (
    <Lienzo {...p}>
      <path d="M42 48H62L64 70L60 112H50L46 92L44 70Z" fill="#134E4A" />
      <path d="M40 34Q90 26 150 30L178 42Q168 56 160 68L152 94Q144 106 130 112Q106 120 84 118L60 112L64 70L62 48L42 48Z" fill="#14B8A6" />
      <path d="M84 30L86 64L64 70M86 64L120 60L126 30M120 60L152 82M86 64L96 116M120 60L118 102M150 30L150 52" stroke="#0F766E" strokeWidth="1.5" strokeLinejoin="round" />
      {[[192, 76, 7, 4], [204, 70, 4, 3], [208, 80, 3, 2.5]].map(([x, y, rx, ry]) => <ellipse key={x} cx={x} cy={y} rx={rx} ry={ry} fill="#14B8A6" />)}
      {/* Canarias, en su recuadro */}
      <rect x="12" y="104" width="30" height="20" rx="3" stroke="#5EEAD4" strokeOpacity=".5" strokeWidth="1.2" strokeDasharray="3 2" />
      {[[18, 116], [24, 113], [30, 116], [35, 112]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="2" fill="#14B8A6" />)}
      {/* Madrid */}
      <path d="M106 72C101 66 98 62 98 58A8 8 0 0 1 114 58C114 62 111 66 106 72Z" fill="#F43F5E" />
      <circle cx="106" cy="58" r="3" fill="#FFF1F2" />
    </Lienzo>
  )
}

// EE. UU. en mapa de casillas: una por estado, con la forma aproximada del país.
function Eeuu(p) {
  const filas = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 10],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [2, 3, 4, 5, 6, 7, 8],
    [3, 4, 8],
  ]
  return (
    <Lienzo {...p}>
      {filas.flatMap((cols, f) => cols.map(c => {
        const destacado = f === 2 && c === 3
        return (
          <rect key={`${f}-${c}`} x={44 + c * 15} y={16 + f * 15} width="13" height="13" rx="2.5"
            fill={destacado ? '#FBBF24' : '#14B8A6'} fillOpacity={destacado ? 1 : 0.55 + ((f + c) % 3) * 0.15} />
        )
      }))}
      {/* Alaska y Hawái */}
      <rect x="10" y="94" width="26" height="22" rx="3" fill="#14B8A6" fillOpacity=".7" />
      <rect x="48" y="112" width="7" height="7" rx="1.5" fill="#14B8A6" />
      <rect x="58" y="116" width="5" height="5" rx="1.5" fill="#14B8A6" />
      <T x={206} y={122} s={18} c="#5EEAD4">50</T>
    </Lienzo>
  )
}

// El globo girado hacia un continente, que se ve en claro.
function Globo({ id, children }) {
  return (
    <g>
      <defs><clipPath id={`arte-globo-${id}`}><circle cx="76" cy="68" r="50" /></clipPath></defs>
      <circle cx="76" cy="68" r="50" fill="#115E59" />
      <g clipPath={`url(#arte-globo-${id})`} fill="#2DD4BF">{children}</g>
      <circle cx="76" cy="68" r="50" stroke="#5EEAD4" strokeWidth="2" />
    </g>
  )
}

function Europa(p) {
  return (
    <Lienzo {...p}>
      <Globo id="europa">
        <path d="M66 40Q74 22 84 20Q92 24 88 36Q84 44 78 46Z" />
        <path d="M58 48Q72 38 92 44Q104 52 98 62Q90 64 88 72Q78 76 72 68Q62 72 56 64Q50 56 58 48Z" />
        <path d="M44 62Q52 56 60 64Q58 76 46 74Z" />
        <path d="M86 64L98 82L94 84L84 68Z" />
        <path d="M50 40Q56 36 58 44Q54 48 50 46Z" />
      </Globo>
      {/* torre Eiffel */}
      <path d="M190 14L193 40H197L200 66H206L218 114H206Q190 88 174 114H162L174 66H180L183 40H187Z" fill="#94A3B8" />
      <rect x="176" y="64" width="28" height="4" rx="1" fill="#CBD5E1" />
      <rect x="182" y="38" width="16" height="3" rx="1" fill="#CBD5E1" />
      <path d="M150 114H230" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
    </Lienzo>
  )
}

function America(p) {
  return (
    <Lienzo {...p}>
      <Globo id="america">
        <path d="M44 22Q72 12 94 26Q88 44 74 50Q66 58 70 66L66 70Q54 56 44 42Z" />
        <path d="M70 72Q92 68 96 84Q90 104 76 120Q70 98 70 72Z" />
      </Globo>
      {/* pirámide maya */}
      <rect x="156" y="102" width="68" height="12" fill="#A16207" />
      <rect x="162" y="90" width="56" height="12" fill="#CA8A04" />
      <rect x="168" y="78" width="44" height="12" fill="#A16207" />
      <rect x="174" y="66" width="32" height="12" fill="#CA8A04" />
      <rect x="181" y="52" width="18" height="14" fill="#92400E" />
      <rect x="187" y="57" width="6" height="9" fill="#451A03" />
      <path d="M190 66V114" stroke="#713F12" strokeWidth="8" />
      <path d="M190 66V114" stroke="#FDE68A" strokeOpacity=".35" strokeWidth="8" strokeDasharray="1.5 2.5" />
      <path d="M150 114H230" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
    </Lienzo>
  )
}

function Asia(p) {
  const tejados = [[36, 36], [46, 62], [56, 88]]
  return (
    <Lienzo {...p}>
      <Globo id="asia">
        <path d="M30 36Q68 16 118 30Q128 50 114 62Q102 58 96 72Q86 80 78 70Q66 76 56 66Q40 58 30 36Z" />
        <path d="M72 70L88 72L78 94Z" />
        <ellipse cx="104" cy="88" rx="7" ry="3" />
        <ellipse cx="118" cy="80" rx="3" ry="7" />
      </Globo>
      {/* pagoda */}
      <path d="M190 14V28" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
      {tejados.map(([w, y], i) => (
        <g key={y}>
          <rect x={190 - 14 + i * -2} y={y + 6} width={28 + i * 4} height="20" fill="#FDE68A" />
          <path d={`M${190 - w} ${y}Q190 ${y - 12} ${190 + w} ${y}L${190 + w - 6} ${y + 7}H${190 - w + 6}Z`} fill="#DC2626" />
        </g>
      ))}
      <rect x="160" y="108" width="60" height="6" rx="1" fill="#7F1D1D" />
      <path d="M150 114H230" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
    </Lienzo>
  )
}

function Africa(p) {
  return (
    <Lienzo {...p}>
      <Globo id="africa">
        <path d="M52 34Q78 26 96 40Q106 56 96 66Q92 84 80 108Q72 110 70 98Q66 82 60 72Q46 62 48 46Z" />
        <ellipse cx="102" cy="92" rx="4" ry="9" />
      </Globo>
      {/* baobab al atardecer */}
      <circle cx="208" cy="40" r="14" fill="#F97316" fillOpacity=".75" />
      <path d="M180 114Q185 84 183 62H199Q197 84 202 114Z" fill="#92400E" />
      <path d="M185 62L172 44M191 62V38M197 62L210 46" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
      {[[170, 40], [191, 34], [212, 42], [180, 50], [202, 52]].map(([x, y]) => <ellipse key={x} cx={x} cy={y} rx="10" ry="5" fill="#65A30D" />)}
      <path d="M150 114H230" stroke="#A16207" strokeWidth="2.5" strokeLinecap="round" />
    </Lienzo>
  )
}

function Oceania(p) {
  return (
    <Lienzo {...p}>
      <Globo id="oceania">
        <path d="M46 60Q60 46 80 52Q96 50 100 66Q98 86 82 92Q68 84 56 88Q42 78 46 60Z" />
        <path d="M110 92L116 98L112 104L106 98Z" />
        <path d="M104 104L108 110L102 116L98 110Z" />
        {[[60, 30], [88, 34], [110, 46], [36, 44]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="2.5" />)}
      </Globo>
      {/* ópera de Sídney */}
      <path d="M150 116Q160 110 170 116T190 116T210 116T230 116" stroke="#38BDF8" strokeWidth="2" />
      <rect x="154" y="100" width="72" height="8" rx="1" fill="#94A3B8" />
      <path d="M160 100Q166 66 186 56Q180 80 182 100Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2" />
      <path d="M178 100Q188 72 208 64Q200 84 202 100Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2" />
      <path d="M198 100Q206 82 222 78Q216 90 218 100Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.2" />
    </Lienzo>
  )
}

// Clave = `geografia/<id>` (topicCatalog: topicIds('geografia')).
export const ARTE_TEMAS_GEOGRAFIA = {
  'geografia/fisica': Fisica,
  'geografia/humana': Humana,
  'geografia/espana': Espana,
  'geografia/eeuu': Eeuu,
  'geografia/europa': Europa,
  'geografia/america': America,
  'geografia/asia': Asia,
  'geografia/africa': Africa,
  'geografia/oceania': Oceania,
}
