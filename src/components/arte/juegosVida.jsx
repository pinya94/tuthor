// Arte de economía (Spicy), música (Pentagrama Path) y vida práctica
// (Reacción). Cada dibujo enseña la mecánica real del juego.
import { Lienzo } from './base'

function Spicy(p) {
  const camino = 'M18 112C70 112 60 72 110 72C156 72 146 36 196 36'
  return (
    <Lienzo {...p}>
      <path d={camino} stroke="#334155" strokeWidth="16" strokeLinecap="round" />
      <path d={camino} stroke="#FDE68A" strokeWidth="2" strokeDasharray="6 6" />
      {[[65, 92], [110, 72], [151.5, 54]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r="7" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
      ))}
      {/* el cruce: cada decisión lleva a un sitio */}
      <rect x="85" y="32" width="3" height="36" fill="#A8A29E" />
      <path d="M88 34H108L114 39L108 44H88Z" fill="#F97316" />
      <path d="M85 48H66L60 53L66 58H85Z" fill="#64748B" />
      {/* la guindilla */}
      <path d="M204 16Q226 12 230 28Q228 42 210 44Q220 32 204 16Z" fill="#EF4444" />
      <path d="M204 16Q200 10 194 12" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
    </Lienzo>
  )
}

function LaOrquesta(p) {
  // Un violín, una trompeta y un tambor: tres familias de un vistazo.
  return (
    <Lienzo {...p}>
      <ellipse cx="46" cy="58" rx="13" ry="12" fill="#A0522D" />
      <ellipse cx="46" cy="82" rx="17" ry="15" fill="#A0522D" />
      <rect x="35" y="64" width="22" height="10" fill="#A0522D" />
      <rect x="43" y="18" width="6" height="40" fill="#1F2937" />
      <circle cx="46" cy="16" r="4" fill="#6B3410" />
      <line x1="66" y1="104" x2="90" y2="22" stroke="#6B3410" strokeWidth="2.5" />
      <path d="M100 62 L176 62" stroke="#EAB308" strokeWidth="5" />
      <path d="M112 62 Q108 76 124 76 L156 76 Q166 76 162 62" stroke="#EAB308" strokeWidth="4" fill="none" />
      {[128, 138, 148].map(x => <rect key={x} x={x - 3} y="50" width="6" height="28" rx="2" fill="#A16207" />)}
      <path d="M176 59 L200 48 L200 76 L176 65 Z" fill="#EAB308" />
      <rect x="150" y="92" width="64" height="24" fill="#DC2626" />
      <ellipse cx="182" cy="92" rx="32" ry="7" fill="#F5F5F4" />
    </Lienzo>
  )
}

function CompasCompleto(p) {
  // Un compás de 4/4 con una negra, dos corcheas y un hueco.
  const lineas = [44, 54, 64, 74, 84]
  return (
    <Lienzo {...p}>
      {lineas.map(y => <line key={y} x1="16" y1={y} x2="224" y2={y} stroke="#64748B" strokeWidth="1.5" />)}
      <text x="34" y="62" fontSize="20" fontWeight="900" fill="#F8FAFC" textAnchor="middle">4</text>
      <text x="34" y="82" fontSize="20" fontWeight="900" fill="#F8FAFC" textAnchor="middle">4</text>
      {[[76, 0], [118, 1], [152, 1]].map(([x, c]) => (
        <g key={x}>
          <ellipse cx={x} cy="64" rx="8" ry="6" transform={`rotate(-20 ${x} 64)`} fill="#F8FAFC" />
          <line x1={x + 7.5} y1="63" x2={x + 7.5} y2="26" stroke="#F8FAFC" strokeWidth="2.5" />
          {c ? <path d={`M${x + 7.5} 26 q11 7 9 20`} stroke="#F8FAFC" strokeWidth="3" fill="none" /> : null}
        </g>
      ))}
      <rect x="180" y="30" width="28" height="64" rx="6" fill="none" stroke="#FBBF24" strokeWidth="3" strokeDasharray="5 4" />
      <text x="194" y="70" fontSize="22" fontWeight="900" fill="#FBBF24" textAnchor="middle">?</text>
      <line x1="220" y1="44" x2="220" y2="84" stroke="#CBD5E1" strokeWidth="3" />
    </Lienzo>
  )
}

function PentagramaPath(p) {
  const notas = [[70, 44], [104, 36], [138, 28, true], [172, 40]]
  const negras = [54, 74, 114, 134, 154]
  return (
    <Lienzo {...p}>
      <path d="M26 20H214M26 28H214M26 36H214M26 44H214M26 52H214M206 20V52" stroke="#A5B4FC" strokeWidth="1.5" />
      {notas.map(([x, y, on]) => (
        <g key={x}>
          <path d={`M${x + 5.2} ${y - 1}V${y - 24}`} stroke={on ? '#F472B6' : '#F8FAFC'} strokeWidth="2" />
          <ellipse cx={x} cy={y} rx="6" ry="4.6" fill={on ? '#F472B6' : '#F8FAFC'} transform={`rotate(-20 ${x} ${y})`} />
        </g>
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={40 + i * 20} y="70" width="20" height="52" rx="2" fill={i === 4 ? '#F472B6' : '#F8FAFC'} stroke="#CBD5E1" strokeWidth="1" />
      ))}
      {negras.map(x => <rect key={x} x={x} y="70" width="12" height="30" rx="2" fill="#1E1B4B" />)}
      <path d="M137 34L131 104" stroke="#F472B6" strokeWidth="1.5" strokeDasharray="3 3" />
    </Lienzo>
  )
}

function OjoAlMensaje(p) {
  // Un móvil con un mensaje y un enlace marcado con la bandera roja.
  return (
    <Lienzo {...p}>
      <rect x="78" y="10" width="84" height="104" rx="12" fill="#1E293B" />
      <rect x="84" y="20" width="72" height="84" rx="4" fill="#F8FAFC" />
      <rect x="90" y="28" width="52" height="22" rx="8" fill="#E2E8F0" />
      <rect x="95" y="34" width="38" height="4" rx="2" fill="#94A3B8" /><rect x="95" y="42" width="26" height="4" rx="2" fill="#94A3B8" />
      <rect x="90" y="56" width="58" height="24" rx="8" fill="#E2E8F0" />
      <rect x="94" y="62" width="48" height="12" rx="3" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2" />
      <rect x="98" y="66" width="36" height="4" rx="2" fill="#2563EB" />
      <path d="M170 30 L170 78" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
      <path d="M172 32 L204 40 L172 50 Z" fill="#DC2626" />
      <path d="M40 86 Q52 60 70 70" stroke="#0EA5E9" strokeWidth="3" fill="none" />
      <path d="M40 86 L40 98 M36 94 L40 98 L44 94" stroke="#0EA5E9" strokeWidth="3" fill="none" strokeLinecap="round" />
    </Lienzo>
  )
}

function SenalASenal(p) {
  // Tres señales: peligro, prohibición e indicación.
  return (
    <Lienzo {...p}>
      <polygon points="50,24 86,92 14,92" fill="#FFFFFF" stroke="#DC2626" strokeWidth="7" strokeLinejoin="round" />
      <rect x="45" y="50" width="10" height="26" rx="2" fill="#111827" />
      <circle cx="50" cy="55" r="3" fill="#DC2626" /><circle cx="50" cy="63" r="3" fill="#F59E0B" /><circle cx="50" cy="71" r="3" fill="#16A34A" />
      <circle cx="122" cy="60" r="32" fill="#FFFFFF" stroke="#DC2626" strokeWidth="8" />
      <text x="122" y="70" textAnchor="middle" fontSize="26" fontWeight="900" fill="#111827">50</text>
      <rect x="164" y="28" width="62" height="62" rx="6" fill="#1D4ED8" />
      <text x="195" y="78" textAnchor="middle" fontSize="44" fontWeight="900" fill="#FFFFFF">P</text>
    </Lienzo>
  )
}

function Reaccion(p) {
  return (
    <Lienzo {...p}>
      <path d="M88 44V36H112V44" stroke="#B91C1C" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="62" y="44" width="76" height="58" rx="10" fill="#EF4444" />
      <rect x="94" y="58" width="12" height="30" rx="2" fill="#FFFFFF" />
      <rect x="85" y="67" width="30" height="12" rx="2" fill="#FFFFFF" />
      <path d="M146 76H162L168 60L176 96L184 68L190 76H222" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="197" y="17" width="6" height="5" rx="1" fill="#FBBF24" />
      <circle cx="200" cy="36" r="14" fill="#F8FAFC" stroke="#FBBF24" strokeWidth="3" />
      <path d="M200 36L207 29" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
      <circle cx="200" cy="36" r="1.8" fill="#1E293B" />
    </Lienzo>
  )
}

function PuntoMuerto(p) {
  // Las rectas de ingresos y costes totales cruzándose en el punto muerto.
  return (
    <Lienzo {...p}>
      <rect x="40" y="18" width="62" height="96" fill="#EF4444" opacity="0.15" />
      <rect x="102" y="18" width="104" height="96" fill="#22C55E" opacity="0.15" />
      <path d="M40 114 H210 M40 114 V14" stroke="#64748B" strokeWidth="3" fill="none" />
      <line x1="40" y1="84" x2="206" y2="40" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
      <line x1="40" y1="114" x2="206" y2="24" stroke="#38BDF8" strokeWidth="5" strokeLinecap="round" />
      <circle cx="102" cy="68" r="8" fill="#22C55E" stroke="#0F172A" strokeWidth="2.5" />
      <path d="M102 76 V114" stroke="#22C55E" strokeWidth="2" strokeDasharray="4 3" />
    </Lienzo>
  )
}

function OfertaDemanda(p) {
  // Las dos curvas, el equilibrio y la demanda desplazada a la derecha.
  return (
    <Lienzo {...p}>
      <path d="M40 16V120H210" stroke="#94A3B8" strokeWidth="2.5" fill="none" />
      <path d="M60 30L180 112" stroke="#60A5FA" strokeWidth="4" strokeLinecap="round" />
      <path d="M90 30L210 112" stroke="#60A5FA" strokeWidth="4" strokeDasharray="8 6" strokeLinecap="round" />
      <path d="M60 112L190 26" stroke="#F472B6" strokeWidth="4" strokeLinecap="round" />
      <circle cx="117.6" cy="69.4" r="6" fill="#F8FAFC" />
      <circle cx="137" cy="56.6" r="6" fill="#FBBF24" />
      <path d="M150 40l18 0" stroke="#FBBF24" strokeWidth="3" />
      <path d="M168 34l8 6l-8 6Z" fill="#FBBF24" />
    </Lienzo>
  )
}

function CuentasClaras(p) {
  return (
    <Lienzo {...p}>
      <ellipse cx="82" cy="84" rx="46" ry="34" fill="#F472B6" />
      <circle cx="122" cy="80" r="13" fill="#F472B6" />
      <ellipse cx="129" cy="82" rx="6" ry="5" fill="#DB2777" />
      <circle cx="104" cy="70" r="3.5" fill="#1F2937" />
      <path d="M58 54L66 40L74 54Z" fill="#F472B6" />
      <rect x="58" y="112" width="10" height="12" rx="3" fill="#DB2777" />
      <rect x="94" y="112" width="10" height="12" rx="3" fill="#DB2777" />
      <rect x="70" y="52" width="26" height="5" rx="2.5" fill="#9D174D" />
      <circle cx="83" cy="30" r="11" fill="#FBBF24" />
      <text x="83" y="35" textAnchor="middle" fontSize="13" fontWeight="900" fill="#92400E">€</text>
      {[[160, 18], [176, 30], [192, 46], [208, 68]].map(([x, h]) => <rect key={x} x={x} y={120 - h} width="12" height={h} rx="2" fill="#34D399" />)}
      <path d="M156 96Q186 90 220 46" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" fill="none" />
    </Lienzo>
  )
}

function EscalasAcordes(p) {
  const marcadas = [0, 2, 4]
  return (
    <Lienzo {...p}>
      {Array.from({ length: 8 }, (_, i) => (
        <rect key={i} x={24 + i * 24} y="44" width="23" height="80" rx="3" fill={marcadas.includes(i) ? (i === 0 ? '#F59E0B' : '#38BDF8') : '#F8FAFC'} />
      ))}
      {[0, 1, 3, 4, 5, 7].map(i => <rect key={i} x={24 + (i + 1) * 24 - 7} y="44" width="14" height="48" rx="2" fill="#111827" />)}
      <rect x="64" y="10" width="112" height="26" rx="13" fill="#4C1D95" />
      <text x="120" y="28" textAnchor="middle" fontSize="13" fontWeight="900" fill="#F5D0FE">Do · Mi · Sol</text>
    </Lienzo>
  )
}

function QuienDesafina(p) {
  return (
    <Lienzo {...p}>
      <path d="M24 32L24 32.0L28 36.9L32 40.2L36 40.9L40 38.8L44 34.5L48 29.5L52 25.2L56 23.1L60 23.8L64 27.2L68 32.0L72 36.9L76 40.2L80 40.9L84 38.8L88 34.5L92 29.4L96 25.2L100 23.1L104 23.8L108 27.2L112 32.0L116 36.9L120 40.2L124 40.9L128 38.8L132 34.5L136 29.4L140 25.2L144 23.1L148 23.8L152 27.2L156 32.1L160 36.9L164 40.2L168 40.9L172 38.8L176 34.5L180 29.4L184 25.1L188 23.1L192 23.8L196 27.2L200 32.1L204 36.9L208 40.2L212 40.9L216 38.7" stroke="#FBBF24" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M24 68L24 68.0L28 73.9L32 76.9L36 75.6L40 70.5L44 64.2L48 59.8L52 59.4L56 63.2L60 69.3L64 74.8L68 77.0L72 74.8L76 69.2L80 63.1L84 59.4L88 59.8L92 64.3L96 70.6L100 75.6L104 76.9L108 73.9L112 67.9L116 62.1L120 59.1L124 60.5L128 65.5L132 71.8L136 76.2L140 76.6L144 72.8L148 66.6L152 61.1L156 59.0L160 61.3L164 66.8L168 72.9L172 76.7L176 76.1L180 71.6L184 65.4L188 60.4L192 59.1L196 62.2L200 68.1L204 74.0L208 76.9L212 75.5L216 70.4" stroke="#F87171" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M24 104L24 104.0L28 108.9L32 112.2L36 112.9L40 110.8L44 106.5L48 101.5L52 97.2L56 95.1L60 95.8L64 99.2L68 104.0L72 108.9L76 112.2L80 112.9L84 110.8L88 106.5L92 101.4L96 97.2L100 95.1L104 95.8L108 99.2L112 104.0L116 108.9L120 112.2L124 112.9L128 110.8L132 106.5L136 101.4L140 97.2L144 95.1L148 95.8L152 99.2L156 104.1L160 108.9L164 112.2L168 112.9L172 110.8L176 106.5L180 101.4L184 97.1L188 95.1L192 95.8L196 99.2L200 104.1L204 108.9L208 112.2L212 112.9L216 110.7" stroke="#FBBF24" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="222" cy="68" r="10" fill="#7F1D1D" />
      <text x="222" y="73" textAnchor="middle" fontSize="14" fontWeight="900" fill="#FECACA">!</text>
    </Lienzo>
  )
}

export const ARTE_VIDA = {
  spicy: Spicy,
  'oferta-demanda': OfertaDemanda,
  'punto-muerto': PuntoMuerto,
  'cuentas-claras': CuentasClaras,
  'escalas-acordes': EscalasAcordes,
  'quien-desafina': QuienDesafina,
  'pentagrama-path': PentagramaPath,
  'compas-completo': CompasCompleto,
  'la-orquesta': LaOrquesta,
  reaccion: Reaccion,
  'senal-a-senal': SenalASenal,
  'ojo-al-mensaje': OjoAlMensaje,
}
