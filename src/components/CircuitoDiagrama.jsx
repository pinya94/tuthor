// Diagrama de circuito de Circuito Cerrado (SVG puro) — lo comparten el
// juego y el examen. Cuatro trazados fijos, uno por `round.tipo` (ver
// lib/circuito.js): las coordenadas están escritas a mano por esquema, no
// generadas, porque son solo 4 y así el cableado se lee como un esquema de
// libro de texto (routing Manhattan, sin diagonales).
//
// Las bombillas son lo único clicable: un clic RECORRE las tres respuestas
// posibles (apagada → tenue → brillante → apagada) — la predicción del
// jugador antes de revelar. El interruptor es un dato del circuito, visible
// desde el principio — igual que en la vida real se ve a simple vista si
// está bajado o subido; lo que NO se sabe hasta probar es CÓMO va a brillar
// cada bombilla.
const VB = { W: 430, H: 280 }
const TOP_Y = 55, BOTTOM_Y = 225, BAT_X = 70, BAT_Y = 140

// apagada → tenue → brillante → apagada — el orden en que un clic recorre
// los tres estados posibles de una bombilla.
const CICLO_ESTADOS = ['apagada', 'tenue', 'brillante']
export function siguienteEstado(estado) {
  return CICLO_ESTADOS[(CICLO_ESTADOS.indexOf(estado) + 1) % CICLO_ESTADOS.length]
}

const ESTILO_BOMBILLA = {
  apagada:   { fill: '#1e293b', stroke: '#64748b', glow: 'none' },
  tenue:     { fill: '#b45309', stroke: '#d97706', glow: 'drop-shadow(0 0 3px rgba(217,119,6,0.6))' },
  brillante: { fill: '#f59e0b', stroke: '#fbbf24', glow: 'drop-shadow(0 0 7px rgba(245,158,11,0.9))' },
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

// Rayos alrededor de la bombilla: hacen VISIBLE la potencia, no solo el color.
// A tope → ráfaga de 8 rayos largos; tenue → 4 rayos cortos; apagada → ninguno.
function Rayos({ x, y, estado, scale = 1 }) {
  const cfg = estado === 'brillante' ? { n: 8, r0: 20, r1: 27, w: 2, op: 0.95, off: 0 }
    : estado === 'tenue' ? { n: 4, r0: 19, r1: 23, w: 1.6, op: 0.55, off: Math.PI / 4 }
    : null
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

// Leyenda de los tres estados: qué es apagada / tenue / a tope, para que el
// jugador sepa qué está eligiendo y aprenda a leer la potencia de un vistazo.
export function Leyenda({ labels }) {
  const items = [['apagada', labels.apagada], ['tenue', labels.tenue], ['brillante', labels.brillante]]
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

// Serie y paralelo a la vez: rama izquierda con DOS bombillas en serie (misma
// vertical), rama derecha con UNA sola; cada rama con su interruptor arriba.
function layoutSerieMixta() {
  const B1X = 275, B2X = 375
  return {
    wires: [
      { x1: BAT_X, y1: TOP_Y, x2: BAT_X, y2: BOTTOM_Y },
      { x1: BAT_X, y1: TOP_Y, x2: B2X, y2: TOP_Y },
      { x1: B1X, y1: TOP_Y, x2: B1X, y2: BOTTOM_Y },
      { x1: B2X, y1: TOP_Y, x2: B2X, y2: BOTTOM_Y },
      { x1: B2X, y1: BOTTOM_Y, x2: BAT_X, y2: BOTTOM_Y },
    ],
    interruptores: [
      { id: 'i1', x: B1X, y: 92, orientacion: 'v' },
      { id: 'i2', x: B2X, y: 92, orientacion: 'v' },
    ],
    bombillas: [
      { id: 'b1', x: B1X, y: 150 },
      { id: 'b2', x: B1X, y: 195 },
      { id: 'b3', x: B2X, y: 150 },
    ],
  }
}

const LAYOUTS = {
  simple: layoutSimple, serie: layoutSerie, paralelo: layoutParalelo, mixto: layoutMixto,
  'dos-interruptores': layoutDosInterruptores, 'paralelo-ramas': layoutParaleloRamas, 'serie-mixta': layoutSerieMixta,
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
