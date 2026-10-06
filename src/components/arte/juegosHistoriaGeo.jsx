// Arte de los juegos de historia (pergamino/ámbar) y geografía (verde
// azulado). Cada dibujo enseña la mecánica real del juego.
import { Lienzo, T, Punta } from './base'

// ── HISTORIA ───────────────────────────────────────────────────────────────

function TuthorTime(p) {
  return (
    <Lienzo {...p}>
      <circle cx="100" cy="68" r="54" stroke="#F59E0B" strokeOpacity=".14" strokeWidth="8" />
      <circle cx="100" cy="68" r="44" stroke="#F59E0B" strokeOpacity=".2" strokeWidth="3" />
      <path d="M106 18Q160 12 156 86" stroke="#B45309" strokeWidth="3" strokeDasharray="1 5" strokeLinecap="round" />
      <circle cx="100" cy="18" r="6" stroke="#B45309" strokeWidth="3" />
      <rect x="95" y="23" width="10" height="9" rx="2" fill="#B45309" />
      <circle cx="100" cy="68" r="36" fill="#B45309" />
      <circle cx="100" cy="68" r="30" fill="#FEF3C7" />
      <path d="M100 42v6M126 68h-6M100 94v-6M74 68h6" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
      <path d="M100 68L100 46" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M100 68L84.4 59" stroke="#78350F" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="100" cy="68" r="3" fill="#78350F" />
      <rect x="146" y="76" width="72" height="32" rx="8" fill="#F59E0B" />
      <circle cx="156" cy="92" r="3.5" fill="#FEF3C7" />
      <T x={189} y={98} s={18} c="#78350F">1492</T>
    </Lienzo>
  )
}

function Tarjeta({ x, y }) {
  return (
    <g>
      <rect x={x} y={y} width="40" height="28" rx="5" fill="#FEF3C7" />
      <rect x={x + 6} y={y + 8} width="28" height="4" rx="2" fill="#D97706" />
      <rect x={x + 6} y={y + 16} width="20" height="4" rx="2" fill="#FCD34D" />
    </g>
  )
}

function LineaTemporal(p) {
  return (
    <Lienzo {...p}>
      <path d="M44 72V77M92 91V96M188 91V96" stroke="#B45309" strokeWidth="2" />
      <path d="M140 72V77" stroke="#FDE68A" strokeWidth="2" strokeDasharray="2 2" />
      <path d="M18 84H214" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
      <Punta x={220} y={84} ang={0} c="#B45309" w={4} />
      {[44, 92, 140, 188].map(x => <circle key={x} cx={x} cy="84" r="7" fill="#F59E0B" stroke="#FEF3C7" strokeWidth="2" />)}
      <Tarjeta x={24} y={44} />
      <Tarjeta x={72} y={96} />
      <Tarjeta x={168} y={96} />
      <rect x="120" y="44" width="40" height="28" rx="5" stroke="#FDE68A" strokeWidth="1.5" strokeDasharray="4 3" />
      <g transform="rotate(12 146 28)">
        <rect x="129" y="17" width="40" height="28" rx="5" fill="#000000" fillOpacity=".25" />
        <rect x="126" y="14" width="40" height="28" rx="5" fill="#FDE68A" />
        <rect x="132" y="22" width="28" height="4" rx="2" fill="#B45309" />
        <rect x="132" y="30" width="20" height="4" rx="2" fill="#F59E0B" />
      </g>
    </Lienzo>
  )
}

function QuienEsQuien(p) {
  return (
    <Lienzo {...p}>
      <ellipse cx="92" cy="66" rx="40" ry="50" fill="#B45309" />
      <ellipse cx="92" cy="66" rx="33" ry="43" fill="#FEF3C7" />
      <circle cx="92" cy="54" r="13" fill="#78350F" />
      <path d="M72 100Q72 80 92 78Q112 80 112 100Q102 106 92 106Q82 106 72 100Z" fill="#78350F" />
      <T x={92} y={60} s={18} c="#FEF3C7">?</T>
      <g transform="rotate(5 179 39)">
        <rect x="146" y="26" width="66" height="26" rx="6" fill="#FEF3C7" />
        <circle cx="157" cy="39" r="7" fill="#F59E0B" />
        <T x={157} y={42.5} s={9} c="#FFFFFF">1</T>
        <rect x="168" y="33" width="36" height="4" rx="2" fill="#D97706" />
        <rect x="168" y="41" width="26" height="4" rx="2" fill="#FCD34D" />
      </g>
      <g transform="rotate(-4 175 75)">
        <rect x="142" y="62" width="66" height="26" rx="6" fill="#FDE68A" />
        <circle cx="153" cy="75" r="7" fill="#B45309" />
        <T x={153} y={78.5} s={9} c="#FFFFFF">2</T>
        <rect x="164" y="69" width="36" height="4" rx="2" fill="#B45309" />
        <rect x="164" y="77" width="26" height="4" rx="2" fill="#F59E0B" />
      </g>
      <circle cx="196" cy="102" r="11" fill="#F59E0B" fillOpacity=".12" stroke="#F59E0B" strokeWidth="3.5" />
      <path d="M204 110L214 120" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
    </Lienzo>
  )
}

function Portadas(p) {
  return (
    <Lienzo {...p}>
      <rect x="52" y="14" width="110" height="110" rx="4" fill="#F5F5F4" />
      <rect x="60" y="22" width="94" height="12" fill="#1C1917" />
      <rect x="60" y="40" width="94" height="8" fill="#44403C" />
      <rect x="60" y="51" width="70" height="8" fill="#44403C" />
      <rect x="60" y="64" width="40" height="34" fill="#D6D3D1" />
      <path d="M60 98L74 80L84 90L92 82L100 98Z" fill="#A8A29E" />
      <circle cx="90" cy="72" r="3.5" fill="#A8A29E" />
      {[[106, 64, 48], [106, 72, 42], [106, 80, 48], [106, 88, 36], [60, 104, 94], [60, 112, 76]].map(([x, y, w]) => (
        <rect key={`${x}${y}`} x={x} y={y} width={w} height="4" rx="2" fill="#A8A29E" />
      ))}
      <circle cx="190" cy="46" r="16" fill="#10B981" />
      <path d="M182 46L188 52L198 40" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="190" cy="90" r="16" fill="#DC2626" />
      <path d="M184 84L196 96M196 84L184 96" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
    </Lienzo>
  )
}

function EpocasHistoricas(p) {
  return (
    <Lienzo {...p}>
      <rect x="74" y="16" width="96" height="104" rx="4" fill="#D6D3D1" transform="rotate(9 122 68)" />
      <g transform="rotate(-5 110 68)">
        <rect x="62" y="14" width="96" height="108" rx="4" fill="#F5F5F4" />
        <rect x="70" y="22" width="80" height="74" fill="#FDE68A" />
        <rect x="70" y="84" width="80" height="12" fill="#FCD34D" />
        <path d="M105 36Q95 38 101 52M115 36Q125 38 119 52" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
        <path d="M104 42Q96 50 96 62Q96 80 110 88Q124 80 124 62Q124 50 116 42Z" fill="#B45309" />
        <rect x="105" y="33" width="10" height="10" fill="#B45309" />
        <rect x="102" y="30" width="16" height="4" rx="2" fill="#92400E" />
        <rect x="97" y="58" width="26" height="5" fill="#FEF3C7" />
        <rect x="78" y="104" width="44" height="5" rx="2.5" fill="#D6D3D1" />
      </g>
      <circle cx="196" cy="34" r="15" fill="#F59E0B" />
      <T x={196} y={40} s={17} c="#FFFFFF">?</T>
    </Lienzo>
  )
}

// ── GEOGRAFÍA ──────────────────────────────────────────────────────────────

function Pista({ y, n, apagada }) {
  return (
    <g opacity={apagada ? 0.45 : 1}>
      <rect x="158" y={y} width="62" height="24" rx="8" fill="#1E293B" />
      <circle cx="170" cy={y + 12} r="6" fill="#FBBF24" />
      <T x={170} y={y + 15} s={8} c="#422006">{n}</T>
      <rect x="180" y={y + 7} width="32" height="4" rx="2" fill="#64748B" />
      <rect x="180" y={y + 15} width="22" height="4" rx="2" fill="#475569" />
    </g>
  )
}

function GeoRush(p) {
  return (
    <Lienzo {...p}>
      <circle cx="98" cy="68" r="48" fill="#0EA5E9" />
      <path d="M70 44Q84 32 98 40Q104 50 94 57Q82 62 75 55Q66 49 70 44Z" fill="#34D399" />
      <path d="M108 72Q124 62 134 74Q138 90 124 96Q112 99 108 88Q102 80 108 72Z" fill="#34D399" />
      <path d="M66 80Q78 74 84 84Q86 96 76 100Q66 98 64 90Z" fill="#34D399" />
      <path d="M66 38Q78 26 94 24" stroke="#FFFFFF" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" />
      <path d="M113 61L122 76L131 61Z" fill="#EF4444" />
      <circle cx="122" cy="56" r="11" fill="#EF4444" />
      <T x={122} y={61} s={13} c="#FFFFFF">?</T>
      <Pista y={24} n="1" />
      <Pista y={56} n="2" />
      <Pista y={88} n="3" apagada />
    </Lienzo>
  )
}

function GeoMapa(p) {
  return (
    <Lienzo {...p}>
      <rect x="18" y="14" width="204" height="108" rx="10" fill="#0C4A6E" />
      <path d="M18 68H222M120 14V122" stroke="#0EA5E9" strokeOpacity=".15" strokeWidth="1" />
      <g fill="#0F766E">
        <path d="M38 30Q58 22 78 30Q86 42 74 52Q62 58 56 70Q46 62 44 52Q32 44 38 30Z" />
        <path d="M66 72Q78 68 82 82Q80 100 70 112Q62 98 62 86Q60 76 66 72Z" />
        <path d="M110 30Q124 26 132 34Q128 42 118 44Q110 42 110 30Z" />
        <path d="M112 50Q130 48 136 60Q134 80 124 96Q114 84 110 70Q108 56 112 50Z" />
        <path d="M136 28Q168 22 194 32Q202 46 188 56Q170 62 154 54Q140 48 136 38Z" />
        <path d="M176 84Q192 80 200 90Q196 100 182 100Q170 96 176 84Z" />
      </g>
      <path d="M158 42Q170 40 172 50Q168 62 161 57Q154 50 158 42Z" fill="#FBBF24" />
      <circle cx="164" cy="50" r="15" stroke="#FBBF24" strokeWidth="2" />
      <path d="M164 31V35M164 65V69M145 50H149M179 50H183" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
    </Lienzo>
  )
}

function Coordenadas(p) {
  return (
    <Lienzo {...p}>
      <circle cx="116" cy="66" r="50" fill="#0369A1" />
      <path d="M90 40Q104 32 116 40Q118 50 106 54Q94 54 90 46Z" fill="#0F766E" />
      <path d="M120 70Q136 64 144 76Q142 90 130 92Q120 88 120 70Z" fill="#0F766E" />
      <g stroke="#7DD3FC" strokeOpacity=".45" strokeWidth="1.2">
        <ellipse cx="116" cy="66" rx="18" ry="50" />
        <ellipse cx="116" cy="66" rx="36" ry="50" />
        <path d="M116 16V116M71.1 44H160.9M71.1 88H160.9M81.3 30H150.7M81.3 102H150.7" />
      </g>
      <path d="M66 66H166" stroke="#7DD3FC" strokeOpacity=".8" strokeWidth="1.5" />
      <path d="M133 44H58M138 49V110" stroke="#FBBF24" strokeWidth="1.8" strokeDasharray="4 3" />
      <circle cx="138" cy="44" r="5" fill="#FBBF24" stroke="#FFFFFF" strokeWidth="2" />
      <rect x="12" y="35" width="46" height="18" rx="9" fill="#FBBF24" />
      <T x={35} y={48} s={10} c="#422006">40°N</T>
      <rect x="116" y="110" width="46" height="18" rx="9" fill="#FBBF24" />
      <T x={139} y={123} s={10} c="#422006">20°E</T>
    </Lienzo>
  )
}

function PiramidePoblacion(p) {
  // Una pirámide regresiva con un hueco señalado.
  const filas = [26, 34, 42, 50, 54, 56, 54, 50, 44, 36, 26]
  return (
    <Lienzo {...p}>
      {filas.map((w, i) => {
        const y = 118 - i * 9.5, ancho = i === 4 ? w * 0.6 : w
        return (
          <g key={i}>
            <rect x={116 - ancho} y={y} width={ancho} height="7.5" rx="1.5" fill="#60A5FA" />
            <rect x={124} y={y} width={ancho * (i > 8 ? 1.15 : 1)} height="7.5" rx="1.5" fill="#F472B6" />
          </g>
        )
      })}
      <rect x="56" y="78" width="128" height="12" rx="3" fill="none" stroke="#FBBF24" strokeWidth="2" strokeDasharray="4 3" />
      <T x={204} y={89} s={14} c="#FBBF24">◀</T>
    </Lienzo>
  )
}

export const ARTE_HISTORIA_GEO = {
  'tuthor-time': TuthorTime,
  'linea-temporal': LineaTemporal,
  'quien-es-quien': QuienEsQuien,
  portadas: Portadas,
  'epocas-historicas': EpocasHistoricas,
  georush: GeoRush,
  geomapa: GeoMapa,
  coordenadas: Coordenadas,
  'piramide-poblacion': PiramidePoblacion,
}
