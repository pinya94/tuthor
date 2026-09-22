// Diagrama de circuito de Circuito Cerrado (SVG puro) — lo comparten el
// juego y el examen. Un trazado fijo por `round.tipo` (ver lib/circuito.js):
// las coordenadas están escritas a mano por esquema, no generadas, así el
// cableado se lee como un esquema de libro de texto (routing Manhattan, sin
// diagonales).
//
// Las bombillas son lo único clicable: un clic ALTERNA entre apagada y
// encendida — la predicción del jugador antes de revelar. El interruptor es un
// dato del circuito, visible desde el principio — igual que en la vida real se
// ve a simple vista si está bajado o subido; lo que NO se sabe hasta seguir el
// camino de la corriente es QUÉ bombillas se encienden.
const VB = { W: 430, H: 280 }
const TOP_Y = 55, BOTTOM_Y = 225, BAT_X = 70, BAT_Y = 140

// apagada → encendida → apagada — un clic alterna los dos estados posibles.
const CICLO_ESTADOS = ['apagada', 'encendida']
export function siguienteEstado(estado) {
  return CICLO_ESTADOS[(CICLO_ESTADOS.indexOf(estado) + 1) % CICLO_ESTADOS.length]
}

const ESTILO_BOMBILLA = {
  apagada:   { fill: '#1e293b', stroke: '#64748b', glow: 'none' },
  encendida: { fill: '#f59e0b', stroke: '#fbbf24', glow: 'drop-shadow(0 0 7px rgba(245,158,11,0.9))' },
}

const WIRE = '#475569' // slate-600, neutro — el cable no indica corriente

function Wire({ x1, y1, x2, y2 }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={WIRE} strokeWidth={2.5} />
}

function Bateria({ x, y }) {
  return (
    <g>
      <rect x={x - 15} y={y - 15} width={30} height={30} fill="#0d1117" />
      <line x1={x - 13} y1={y - 6} x2={x + 13} y2={y - 6} stroke="#e2e8f0" strokeWidth={2.5} />
      <line x1={x - 6} y1={y + 6} x2={x + 6} y2={y + 6} stroke="#e2e8f0" strokeWidth={6} />
    </g>
  )
}

// orientacion 'h' → sobre un cable horizontal; 'v' → sobre uno vertical.
function Interruptor({ x, y, cerrado, orientacion = 'h' }) {
  const gap = 11
  const p1 = orientacion === 'h' ? { x: x - gap, y } : { x, y: y - gap }
  const p2 = orientacion === 'h' ? { x: x + gap, y } : { x, y: y + gap }
  // Abierto: el brazo se levanta hacia el lado "libre" del esquema (arriba si
  // es horizontal, hacia la derecha si es vertical) para que la separación
  // se lea de un vistazo.
  const open = orientacion === 'h' ? { x: x + gap * 0.6, y: y - 12 } : { x: x + 12, y: y + gap * 0.6 }
  return (
    <g>
      <rect x={x - 18} y={y - 18} width={36} height={36} fill="#0d1117" />
      <circle cx={p1.x} cy={p1.y} r={2.5} fill="#e2e8f0" />
      <circle cx={p2.x} cy={p2.y} r={2.5} fill="#e2e8f0" />
      <line x1={p1.x} y1={p1.y} x2={cerrado ? p2.x : open.x} y2={cerrado ? p2.y : open.y}
        stroke="#e2e8f0" strokeWidth={2.5} strokeLinecap="round" />
      <text x={x} y={y - 24} textAnchor="middle" fontSize="13" style={{ userSelect: 'none' }}>
        {cerrado ? '🔒' : '🔓'}
      </text>
    </g>
  )
}

// Rayos alrededor de la bombilla: hacen VISIBLE que está encendida.
// Encendida → ráfaga de 8 rayos; apagada → ninguno.
function Rayos({ x, y, estado, scale = 1 }) {
  const cfg = estado === 'encendida' ? { n: 8, r0: 20, r1: 27, w: 2, op: 0.95, off: 0 } : null
  if (!cfg) return null
  const color = ESTILO_BOMBILLA[estado].stroke
  return (
    <g style={{ pointerEvents: 'none' }}>
      {Array.from({ length: cfg.n }).map((_, i) => {
        const a = cfg.off + (i * 2 * Math.PI) / cfg.n
        const c = Math.cos(a), s = Math.sin(a)
        return <line key={i} x1={x + c * cfg.r0 * scale} y1={y + s * cfg.r0 * scale} x2={x + c * cfg.r1 * scale} y2={y + s * cfg.r1 * scale}
          stroke={color} strokeWidth={cfg.w} strokeOpacity={cfg.op} strokeLinecap="round" />
      })}
    </g>
  )
}

function Bombilla({ x, y, b, prediccion, revelado, onToggle }) {
  const predicho = prediccion.get(b.id) ?? 'apagada'
  const mostrado = revelado ? b.estado : predicho
  const acierto = revelado && predicho === b.estado
  const { fill, stroke: estiloStroke, glow } = ESTILO_BOMBILLA[mostrado]
  const stroke = revelado ? (acierto ? '#4ade80' : '#f87171') : estiloStroke
  const cross = mostrado === 'apagada' ? '#94a3b8' : '#78350f'
  return (
    <g
      onClick={revelado ? undefined : () => onToggle(b.id)}
      style={{ cursor: revelado ? 'default' : 'pointer' }}
    >
      <rect x={x - 22} y={y - 22} width={44} height={44} fill="#0d1117" />
      <Rayos x={x} y={y} estado={mostrado} />
      <circle cx={x} cy={y} r={16} fill={fill} stroke={stroke} strokeWidth={revelado ? 3 : 2} style={{ filter: glow, transition: 'fill 0.15s' }} />
      <line x1={x - 8} y1={y - 8} x2={x + 8} y2={y + 8} stroke={cross} strokeWidth={1.8} />
      <line x1={x - 8} y1={y + 8} x2={x + 8} y2={y - 8} stroke={cross} strokeWidth={1.8} />
      {!revelado && (
        <circle cx={x} cy={y} r={22} fill="none" stroke="#ffffff" strokeOpacity={0.06} strokeWidth={1} />
      )}
    </g>
  )
}

// Leyenda de los dos estados: qué es apagada / encendida, para que el jugador
// sepa qué está eligiendo de un vistazo.
export function Leyenda({ labels }) {
  const items = [['apagada', labels.apagada], ['encendida', labels.encendida]]
  return (
    <div className="flex items-center justify-center gap-4 flex-wrap">
      {items.map(([estado, txt]) => {
        const st = ESTILO_BOMBILLA[estado]
        return (
          <span key={estado} className="flex items-center gap-1.5 text-xs text-white/60">
            <svg width="20" height="20" viewBox="-14 -14 28 28" style={{ overflow: 'visible' }}>
              <Rayos x={0} y={0} estado={estado} scale={0.45} />
              <circle cx="0" cy="0" r="7" fill={st.fill} stroke={st.stroke} strokeWidth="1.5" style={{ filter: st.glow }} />
            </svg>
            {txt}
          </span>
        )
      })}
    </div>
  )
}

// ── Trazados por esquema (Manhattan, coordenadas fijas) ─────────────────────
function layoutSimple() {
  const RX = 350
  return {
    wires: [
      { x1: BAT_X, y1: TOP_Y, x2: BAT_X, y2: BOTTOM_Y },
      { x1: BAT_X, y1: TOP_Y, x2: RX, y2: TOP_Y },
      { x1: RX, y1: TOP_Y, x2: RX, y2: BOTTOM_Y },
      { x1: RX, y1: BOTTOM_Y, x2: BAT_X, y2: BOTTOM_Y },
    ],
    interruptores: [{ id: 'i1', x: 210, y: TOP_Y, orientacion: 'h' }],
    bombillas: [{ id: 'b1', x: RX, y: BAT_Y }],
  }
}

function layoutSerie() {
  const RX = 350
  return {
    wires: [
      { x1: BAT_X, y1: TOP_Y, x2: BAT_X, y2: BOTTOM_Y },
      { x1: BAT_X, y1: TOP_Y, x2: RX, y2: TOP_Y },
      { x1: RX, y1: TOP_Y, x2: RX, y2: BOTTOM_Y },
      { x1: RX, y1: BOTTOM_Y, x2: BAT_X, y2: BOTTOM_Y },
    ],
    interruptores: [{ id: 'i1', x: 210, y: TOP_Y, orientacion: 'h' }],
    bombillas: [{ id: 'b1', x: RX, y: 105 }, { id: 'b2', x: RX, y: 175 }],
  }
}

function layoutParalelo() {
  const B1X = 270, B2X = 350
  return {
    wires: [
      { x1: BAT_X, y1: TOP_Y, x2: BAT_X, y2: BOTTOM_Y },
      { x1: BAT_X, y1: TOP_Y, x2: B2X, y2: TOP_Y },
      { x1: B1X, y1: TOP_Y, x2: B1X, y2: BOTTOM_Y },
      { x1: B2X, y1: TOP_Y, x2: B2X, y2: BOTTOM_Y },
      { x1: B2X, y1: BOTTOM_Y, x2: BAT_X, y2: BOTTOM_Y },
    ],
    interruptores: [{ id: 'i1', x: 170, y: TOP_Y, orientacion: 'h' }],
    bombillas: [{ id: 'b1', x: B1X, y: BAT_Y }, { id: 'b2', x: B2X, y: BAT_Y }],
  }
}

function layoutMixto() {
  const B1X = 310, B2X = 390
  return {
    wires: [
      { x1: BAT_X, y1: TOP_Y, x2: BAT_X, y2: BOTTOM_Y },
      { x1: BAT_X, y1: TOP_Y, x2: B2X, y2: TOP_Y },
      { x1: B1X, y1: TOP_Y, x2: B1X, y2: BOTTOM_Y },
      { x1: B2X, y1: TOP_Y, x2: B2X, y2: BOTTOM_Y },
      { x1: B2X, y1: BOTTOM_Y, x2: BAT_X, y2: BOTTOM_Y },
    ],
    interruptores: [
      { id: 'i1', x: 140, y: TOP_Y, orientacion: 'h' },
      { id: 'i2', x: B1X, y: 110, orientacion: 'v' },
    ],
    // b1 (tronco) va SOBRE el carril superior, entre el interruptor i1 y el
    // reparto en ramas — por eso su x cae en la horizontal, no en una rama.
    bombillas: [
      { id: 'b1', x: 230, y: TOP_Y },
      { id: 'b2', x: B1X, y: 180 },
      { id: 'b3', x: B2X, y: BAT_Y },
    ],
  }
}

// Dos interruptores en serie con una bombilla: mismo lazo que el simple, con
// los dos interruptores seguidos sobre el carril superior.
function layoutDosInterruptores() {
  const RX = 350
  return {
    wires: [
      { x1: BAT_X, y1: TOP_Y, x2: BAT_X, y2: BOTTOM_Y },
      { x1: BAT_X, y1: TOP_Y, x2: RX, y2: TOP_Y },
      { x1: RX, y1: TOP_Y, x2: RX, y2: BOTTOM_Y },
      { x1: RX, y1: BOTTOM_Y, x2: BAT_X, y2: BOTTOM_Y },
    ],
    interruptores: [
      { id: 'i1', x: 175, y: TOP_Y, orientacion: 'h' },
      { id: 'i2', x: 265, y: TOP_Y, orientacion: 'h' },
    ],
    bombillas: [{ id: 'b1', x: RX, y: BAT_Y }],
  }
}

// Paralelo con un interruptor por rama: dos ramas independientes, cada una con
// su interruptor (vertical) encima de su bombilla. Sin interruptor en el tronco.
function layoutParaleloRamas() {
  const B1X = 260, B2X = 360
  return {
    wires: [
      { x1: BAT_X, y1: TOP_Y, x2: BAT_X, y2: BOTTOM_Y },
      { x1: BAT_X, y1: TOP_Y, x2: B2X, y2: TOP_Y },
      { x1: B1X, y1: TOP_Y, x2: B1X, y2: BOTTOM_Y },
      { x1: B2X, y1: TOP_Y, x2: B2X, y2: BOTTOM_Y },
      { x1: B2X, y1: BOTTOM_Y, x2: BAT_X, y2: BOTTOM_Y },
    ],
    interruptores: [
      { id: 'i1', x: B1X, y: 100, orientacion: 'v' },
      { id: 'i2', x: B2X, y: 100, orientacion: 'v' },
    ],
    bombillas: [{ id: 'b1', x: B1X, y: 178 }, { id: 'b2', x: B2X, y: 178 }],
  }
}

// Dos interruptores en PARALELO (dos caminos) hacia una bombilla: carriles
// superior e inferior, cada uno con su interruptor, que se reúnen antes de la
// bombilla. Basta un camino cerrado.
function layoutParaleloOr() {
  const LX = 150, RX = 300, BX = 370
  return {
    wires: [
      { x1: BAT_X, y1: TOP_Y, x2: BAT_X, y2: BOTTOM_Y },
      { x1: BAT_X, y1: TOP_Y, x2: LX, y2: TOP_Y },
      { x1: LX, y1: TOP_Y, x2: LX, y2: 95 },
      { x1: LX, y1: TOP_Y, x2: RX, y2: TOP_Y },   // camino de arriba (i1)
      { x1: LX, y1: 95, x2: RX, y2: 95 },          // camino de abajo (i2)
      { x1: RX, y1: 95, x2: RX, y2: TOP_Y },
      { x1: RX, y1: TOP_Y, x2: BX, y2: TOP_Y },
      { x1: BX, y1: TOP_Y, x2: BX, y2: BOTTOM_Y },
      { x1: BX, y1: BOTTOM_Y, x2: BAT_X, y2: BOTTOM_Y },
    ],
    interruptores: [
      { id: 'i1', x: 225, y: TOP_Y, orientacion: 'h' },
      { id: 'i2', x: 225, y: 95, orientacion: 'h' },
    ],
    bombillas: [{ id: 'b1', x: BX, y: BAT_Y }],
  }
}

// Bypass: un interruptor en PARALELO con la bombilla, por un atajo que la rodea.
// Si el atajo se cierra, la corriente lo toma y esquiva la bombilla.
function layoutBypass() {
  const MX = 330, DX = 395
  return {
    wires: [
      { x1: BAT_X, y1: TOP_Y, x2: BAT_X, y2: BOTTOM_Y },
      { x1: BAT_X, y1: TOP_Y, x2: MX, y2: TOP_Y },
      { x1: MX, y1: TOP_Y, x2: MX, y2: BOTTOM_Y },   // b1 en esta vertical
      { x1: MX, y1: BOTTOM_Y, x2: BAT_X, y2: BOTTOM_Y },
      // atajo que rodea b1 (de encima a debajo de la bombilla)
      { x1: MX, y1: 95, x2: DX, y2: 95 },
      { x1: DX, y1: 95, x2: DX, y2: 185 },
      { x1: DX, y1: 185, x2: MX, y2: 185 },
    ],
    interruptores: [
      { id: 'i1', x: 200, y: TOP_Y, orientacion: 'h' },
      { id: 'i2', x: DX, y: BAT_Y, orientacion: 'v' },
    ],
    bombillas: [{ id: 'b1', x: MX, y: BAT_Y }],
  }
}

// Serie con bypass: dos bombillas en serie, y un atajo que rodea SOLO a la
// segunda. Cerrar el atajo esquiva b2 (se apaga); b1 sigue en el camino.
function layoutSerieBypass() {
  const MX = 330, DX = 395
  return {
    wires: [
      { x1: BAT_X, y1: TOP_Y, x2: BAT_X, y2: BOTTOM_Y },
      { x1: BAT_X, y1: TOP_Y, x2: MX, y2: TOP_Y },
      { x1: MX, y1: TOP_Y, x2: MX, y2: BOTTOM_Y },   // b1 (arriba) y b2 (abajo)
      { x1: MX, y1: BOTTOM_Y, x2: BAT_X, y2: BOTTOM_Y },
      // atajo alrededor de b2 solamente
      { x1: MX, y1: 150, x2: DX, y2: 150 },
      { x1: DX, y1: 150, x2: DX, y2: 210 },
      { x1: DX, y1: 210, x2: MX, y2: 210 },
    ],
    interruptores: [
      { id: 'i1', x: 200, y: TOP_Y, orientacion: 'h' },
      { id: 'i2', x: DX, y: 180, orientacion: 'v' },
    ],
    bombillas: [{ id: 'b1', x: MX, y: 110 }, { id: 'b2', x: MX, y: 180 }],
  }
}

const LAYOUTS = {
  simple: layoutSimple,
  'serie-and': layoutDosInterruptores,
  'paralelo-or': layoutParaleloOr,
  'serie-dos': layoutSerie,
  'paralelo-tronco': layoutParalelo,
  'paralelo-ramas': layoutParaleloRamas,
  bypass: layoutBypass,
  'serie-bypass': layoutSerieBypass,
  mixto: layoutMixto,
}

export default function CircuitoDiagrama({ round, prediccion, onToggle, revelado }) {
  const layout = LAYOUTS[round.tipo]()
  const bombillaPos = Object.fromEntries(layout.bombillas.map(b => [b.id, b]))
  const interruptorPos = Object.fromEntries(layout.interruptores.map(i => [i.id, i]))

  return (
    <svg viewBox={`0 0 ${VB.W} ${VB.H}`} width="100%" style={{ display: 'block' }}>
      {layout.wires.map((w, i) => <Wire key={i} {...w} />)}

      <Bateria x={BAT_X} y={BAT_Y} />

      {round.interruptores.map(i => {
        const pos = interruptorPos[i.id]
        return <Interruptor key={i.id} x={pos.x} y={pos.y} orientacion={pos.orientacion} cerrado={i.cerrado} />
      })}

      {round.bombillas.map(b => {
        const pos = bombillaPos[b.id]
        return (
          <Bombilla key={b.id} x={pos.x} y={pos.y} b={b}
            prediccion={prediccion} revelado={revelado} onToggle={onToggle} />
        )
      })}
    </svg>
  )
}
