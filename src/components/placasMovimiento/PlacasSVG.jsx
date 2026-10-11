// El borde de placa dibujado. Corte de la Tierra (agua, placas y manto) con
// flechas de movimiento; la falla transformante, vista desde arriba (en un
// corte no se vería el deslizamiento lateral).
//
// Antes de corregir solo se ven las placas planas y las flechas: el relieve
// (dorsal, rift, fosa, volcanes, cordillera) y la placa que se hunde darían
// la respuesta. Al corregir se dibuja lo que se forma de verdad.
import { ESCENARIOS } from '../../lib/placasMovimiento'

const C = {
  agua: '#1D4ED8', oc: '#475569', ocBorde: '#94A3B8', cont: '#A16207', contBorde: '#FCD34D',
  manto: '#9A3412', magma: '#F97316', roca: '#78716C', lava: '#EF4444', flecha: '#FFFFFF', duda: '#FCD34D',
}
const SEA = 50, OC_TOP = 82, OC_BOT = 104, CO_TOP = 44, CO_BOT = 112, MANTO = 118

function Flecha({ x, y, dir }) {
  const L = 26
  const [dx, dy] = { r: [1, 0], l: [-1, 0], u: [0, -1], d: [0, 1] }[dir]
  const x1 = x - dx * L, y1 = y - dy * L, x2 = x + dx * L, y2 = y + dy * L
  const px = -dy, py = dx // perpendicular
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2 - dx * 8} y2={y2 - dy * 8} stroke={C.flecha} strokeWidth="5" strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${x2 - dx * 13 + px * 8},${y2 - dy * 13 + py * 8} ${x2 - dx * 13 - px * 8},${y2 - dy * 13 - py * 8}`} fill={C.flecha} />
    </g>
  )
}

const Volcan = ({ x, base, alto, ancho = 18 }) => (
  <g>
    <polygon points={`${x - ancho},${base} ${x - 3},${base - alto} ${x + 3},${base - alto} ${x + ancho},${base}`} fill={C.roca} stroke="#57534E" strokeWidth="1" />
    <polygon points={`${x - 4},${base - alto + 1} ${x},${base - alto - 7} ${x + 4},${base - alto + 1}`} fill={C.lava} />
  </g>
)

const Etiqueta = ({ x, y, children, c = '#FFFFFF' }) => (
  <text x={x} y={y} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={c} style={{ paintOrder: 'stroke' }} stroke="#0b1226" strokeWidth="3">{children}</text>
)

// Placas planas (antes de corregir): cada una con su tipo escrito.
function Planas({ placas, nombres }) {
  const caja = (tipo, x0, x1) => {
    const top = tipo === 'oc' ? OC_TOP : CO_TOP, bot = tipo === 'oc' ? OC_BOT : CO_BOT
    return (
      <g key={x0}>
        {tipo === 'oc' && <rect x={x0} y={SEA} width={x1 - x0} height={top - SEA} fill={C.agua} opacity="0.45" />}
        <rect x={x0} y={top} width={x1 - x0} height={bot - top} fill={tipo === 'oc' ? C.oc : C.cont} stroke={tipo === 'oc' ? C.ocBorde : C.contBorde} strokeWidth="1.2" />
        <Etiqueta x={(x0 + x1) / 2} y={(top + bot) / 2 + 4}>{nombres[tipo]}</Etiqueta>
      </g>
    )
  }
  return <>{caja(placas[0], 8, 154)}{caja(placas[1], 166, 312)}</>
}

// Losa que se hunde (subducción), de izquierda a derecha.
const LOSA = `M8 ${OC_TOP} L138 ${OC_TOP} Q172 88 238 170 L218 180 Q160 112 130 ${OC_BOT} L8 ${OC_BOT} Z`
const MagmaSube = ({ x0, y0, x1, y1 }) => (
  <path d={`M${x0} ${y0} Q${x0 + 12} ${(y0 + y1) / 2} ${x1} ${y1}`} stroke={C.magma} strokeWidth="5" fill="none" strokeLinecap="round" strokeDasharray="2 6" />
)

function Relieve({ id, nombres }) {
  const n = nombres
  switch (id) {
    case 'divOc': return (
      <g>
        <rect x="8" y={SEA} width="304" height={OC_TOP - SEA} fill={C.agua} opacity="0.45" />
        <polygon points={`142,${MANTO} 178,${MANTO} 166,66 154,66`} fill={C.magma} />
        <polygon points={`8,${OC_TOP} 112,${OC_TOP} 140,66 154,70 154,${OC_BOT} 8,${OC_BOT}`} fill={C.oc} stroke={C.ocBorde} strokeWidth="1.2" />
        <polygon points={`312,${OC_TOP} 208,${OC_TOP} 180,66 166,70 166,${OC_BOT} 312,${OC_BOT}`} fill={C.oc} stroke={C.ocBorde} strokeWidth="1.2" />
        <Etiqueta x={160} y={60} c="#FDBA74">{n.dorsal}</Etiqueta>
      </g>
    )
    case 'divCont': return (
      <g>
        <ellipse cx="160" cy={MANTO - 2} rx="26" ry="10" fill={C.magma} />
        <polygon points={`8,${CO_TOP} 132,${CO_TOP} 140,${CO_TOP + 4} 140,${CO_BOT} 8,${CO_BOT}`} fill={C.cont} stroke={C.contBorde} strokeWidth="1.2" />
        <polygon points={`312,${CO_TOP} 188,${CO_TOP} 180,${CO_TOP + 4} 180,${CO_BOT} 312,${CO_BOT}`} fill={C.cont} stroke={C.contBorde} strokeWidth="1.2" />
        <polygon points={`142,68 178,68 178,${CO_BOT - 4} 142,${CO_BOT - 4}`} fill={C.cont} stroke={C.contBorde} strokeWidth="1.2" />
        <rect x="144" y="64" width="14" height="4" rx="2" fill={C.agua} opacity="0.8" />
        <Volcan x={168} base={68} alto={14} ancho={10} />
        <Etiqueta x={160} y={34} c="#FDBA74">{n.rift}</Etiqueta>
      </g>
    )
    case 'ocCont': return (
      <g>
        <polygon points={`8,${SEA} 160,${SEA} 150,92 140,${OC_TOP} 8,${OC_TOP}`} fill={C.agua} opacity="0.45" />
        <path d={LOSA} fill={C.oc} stroke={C.ocBorde} strokeWidth="1.2" />
        <path d={`M150 70 L166 ${CO_TOP} L312 ${CO_TOP} L312 ${CO_BOT} L200 ${CO_BOT} Q172 98 150 84 Z`} fill={C.cont} stroke={C.contBorde} strokeWidth="1.2" />
        <polygon points={`186,${CO_TOP} 204,24 216,32 228,16 252,${CO_TOP}`} fill={C.roca} />
        <Volcan x={232} base={CO_TOP} alto={30} ancho={16} />
        <MagmaSube x0={206} y0={140} x1={230} y1={CO_TOP + 4} />
        <Etiqueta x={128} y={100} c="#BFDBFE">{n.fosa}</Etiqueta>
        <Etiqueta x={282} y={40} c="#FDBA74">{n.volcanes}</Etiqueta>
        <Etiqueta x={244} y={176} c="#FED7AA">{n.subduccion}</Etiqueta>
      </g>
    )
    case 'ocOc': return (
      <g>
        <polygon points={`8,${SEA} 312,${SEA} 312,${OC_TOP} 160,${OC_TOP} 150,96 140,${OC_TOP} 8,${OC_TOP}`} fill={C.agua} opacity="0.45" />
        <path d={LOSA} fill={C.oc} stroke={C.ocBorde} strokeWidth="1.2" />
        <path d={`M152 ${OC_TOP} L312 ${OC_TOP} L312 ${OC_BOT} L196 ${OC_BOT} Q172 94 152 90 Z`} fill={C.oc} stroke={C.ocBorde} strokeWidth="1.2" />
        <Volcan x={214} base={OC_TOP} alto={46} ancho={18} />
        <Volcan x={250} base={OC_TOP} alto={36} ancho={14} />
        <MagmaSube x0={204} y0={146} x1={214} y1={OC_TOP} />
        <Etiqueta x={124} y={100} c="#BFDBFE">{n.fosa}</Etiqueta>
        <Etiqueta x={274} y={72} c="#FDBA74">{n.arco}</Etiqueta>
        <Etiqueta x={244} y={176} c="#FED7AA">{n.subduccion}</Etiqueta>
      </g>
    )
    case 'contCont': return (
      <g>
        <path d={`M8 ${CO_TOP} L108 ${CO_TOP} L126 28 L140 36 L160 8 L180 32 L194 24 L212 ${CO_TOP} L312 ${CO_TOP} L312 ${CO_BOT} L212 ${CO_BOT} Q160 158 108 ${CO_BOT} L8 ${CO_BOT} Z`} fill={C.cont} stroke={C.contBorde} strokeWidth="1.2" />
        <path d="M118 60 Q140 40 160 60 Q180 80 202 60" stroke="#713F12" strokeWidth="2.5" fill="none" />
        <path d="M114 80 Q138 60 160 80 Q182 100 206 80" stroke="#713F12" strokeWidth="2.5" fill="none" />
        <path d="M160 20 L160 140" stroke="#713F12" strokeWidth="1.5" strokeDasharray="4 4" />
        <Etiqueta x={160} y={176} c="#FDBA74">{n.cordillera}</Etiqueta>
      </g>
    )
    default: return null
  }
}

function Transformante({ revelado, nombres }) {
  const desplaz = revelado ? 22 : 0
  return (
    <g>
      <rect x="16" y="14" width="140" height="152" rx="6" fill={C.oc} stroke={C.ocBorde} strokeWidth="1.2" />
      <rect x="164" y="14" width="140" height="152" rx="6" fill={C.oc} stroke={C.ocBorde} strokeWidth="1.2" />
      {/* Una carretera que cruza la falla: al corregir, partida y desplazada. */}
      <line x1="16" y1={90 - desplaz / 2} x2="156" y2={90 - desplaz / 2} stroke="#E2E8F0" strokeWidth="4" strokeDasharray="10 6" />
      <line x1="164" y1={90 + desplaz / 2} x2="304" y2={90 + desplaz / 2} stroke="#E2E8F0" strokeWidth="4" strokeDasharray="10 6" />
      <line x1="160" y1="8" x2="160" y2="172" stroke={revelado ? C.lava : C.duda} strokeWidth="2.5" strokeDasharray="6 4" />
      <Flecha x={60} y={56} dir="u" />
      <Flecha x={260} y={124} dir="d" />
      {revelado && [44, 132].map(y => (
        <g key={y}>
          <polygon points={`160,${y - 12} 164,${y - 4} 173,${y - 6} 167,${y + 1} 172,${y + 9} 163,${y + 5} 160,${y + 13} 157,${y + 5} 148,${y + 9} 153,${y + 1} 147,${y - 6} 156,${y - 4}`} fill={C.duda} stroke="#B45309" strokeWidth="1" />
        </g>
      ))}
      <Etiqueta x={86} y={158} c="#CBD5E1">{nombres.vistaArriba}</Etiqueta>
      {revelado && <Etiqueta x={236} y={34} c="#FCA5A5">{nombres.falla}</Etiqueta>}
    </g>
  )
}

export default function PlacasSVG({ escenario, revelado, nombres }) {
  const e = ESCENARIOS[escenario]
  const transf = e.mov === 'transf'
  return (
    <svg viewBox="0 0 320 180" className="w-full h-auto" role="img" aria-label={nombres.aria}>
      {transf ? <Transformante revelado={revelado} nombres={nombres} /> : (
        <g>
          <rect x="0" y={MANTO} width="320" height={180 - MANTO} fill={C.manto} />
          <text x="10" y="172" fontSize="10" fontWeight="700" fill="#FED7AA" opacity="0.8">{nombres.manto}</text>
          {revelado ? <Relieve id={escenario} nombres={nombres} /> : <Planas placas={e.placas} nombres={nombres} />}
          {/* Las flechas, siempre: son lo que dice qué borde es. */}
          <Flecha x={60} y={18} dir={e.mov === 'conv' ? 'r' : 'l'} />
          <Flecha x={280} y={18} dir={e.mov === 'conv' ? 'l' : 'r'} />
          {!revelado && <text x="160" y="28" textAnchor="middle" fontSize="22" fontWeight="900" fill={C.duda}>?</text>}
        </g>
      )}
      {transf && !revelado && <text x="160" y="96" textAnchor="middle" fontSize="22" fontWeight="900" fill={C.duda} stroke="#0b1226" strokeWidth="3" style={{ paintOrder: 'stroke' }}>?</text>}
    </svg>
  )
}
