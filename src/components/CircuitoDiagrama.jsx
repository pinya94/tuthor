// Diagrama de circuito de Circuito Cerrado (SVG puro) — lo comparten el
// juego y el examen. Dibuja cualquier árbol serie/paralelo (lib/circuito.js)
// como un esquema de libro de texto: la pila a la izquierda, el circuito por
// el carril de arriba y la vuelta por abajo; los tramos en serie uno detrás
// de otro y las ramas en paralelo apiladas entre dos carriles verticales
// (routing Manhattan, sin diagonales).
//
// Las bombillas son lo único clicable: un clic ALTERNA entre apagada y
// encendida — la predicción del jugador antes de revelar. El interruptor es un
// dato del circuito, visible desde el principio — igual que en la vida real se
// ve a simple vista si está bajado o subido; lo que NO se sabe hasta seguir el
// camino de la corriente es QUÉ bombillas se encienden.
const BAT_X = 52

// apagada → encendida → apagada — un clic alterna los dos estados posibles.
const CICLO_ESTADOS = ['apagada', 'encendida']
export function siguienteEstado(estado) {
  return CICLO_ESTADOS[(CICLO_ESTADOS.indexOf(estado) + 1) % CICLO_ESTADOS.length]
}

const ESTILO_BOMBILLA = {
  apagada:   { fill: '#1e293b', stroke: '#64748b', glow: 'none' },
  encendida: { fill: '#f59e0b', stroke: '#fbbf24', glow: 'drop-shadow(0 0 7px rgba(245,158,11,0.9))' },
}

const WIRE = '#64748b' // slate-500, neutro — el cable no indica corriente
// Fondo del recuadro donde va el diagrama: los componentes tapan el cable
// que pasa por debajo con un rectángulo de este color.
const FONDO_CIRCUITO = '#141b2e'

function Wire({ x1, y1, x2, y2 }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={WIRE} strokeWidth={4} strokeLinecap="round" />
}

// Una pila de verdad (no solo el símbolo): se reconoce al instante en un
// móvil, con su polo + arriba.
function Bateria({ x, y }) {
  return (
    <g>
      <rect x={x - 18} y={y - 34} width={36} height={68} fill={FONDO_CIRCUITO} />
      <rect x={x - 6} y={y - 33} width={12} height={6} rx={2} fill="#cbd5e1" />
      <rect x={x - 14} y={y - 28} width={28} height={58} rx={6} fill="#1e293b" stroke="#94a3b8" strokeWidth={2} />
      <rect x={x - 12} y={y - 26} width={24} height={20} rx={4} fill="#f59e0b" />
      <text x={x} y={y - 11} textAnchor="middle" fontSize="16" fontWeight="900" fill="#1c1917" style={{ userSelect: 'none' }}>+</text>
      <text x={x} y={y + 22} textAnchor="middle" fontSize="18" fontWeight="900" fill="#94a3b8" style={{ userSelect: 'none' }}>−</text>
    </g>
  )
}

// orientacion 'h' → sobre un cable horizontal; 'v' → sobre uno vertical.
function Interruptor({ x, y, cerrado, orientacion = 'h' }) {
  const gap = 14
  const p1 = orientacion === 'h' ? { x: x - gap, y } : { x, y: y - gap }
  const p2 = orientacion === 'h' ? { x: x + gap, y } : { x, y: y + gap }
  // Abierto: el brazo se levanta hacia el lado "libre" del esquema (arriba si
  // es horizontal, hacia la derecha si es vertical) para que la separación
  // se lea de un vistazo.
  const open = orientacion === 'h' ? { x: x + gap * 0.5, y: y - 17 } : { x: x + 17, y: y + gap * 0.5 }
  // Sin candados: el brazo levantado o bajado ya es el dato, y el candado
  // se leía al revés ("cerrado" con candado = ¿no pasa?).
  return (
    <g>
      <rect x={x - 20} y={y - 22} width={40} height={42} fill={FONDO_CIRCUITO} />
      <line x1={p1.x} y1={p1.y} x2={cerrado ? p2.x : open.x} y2={cerrado ? p2.y : open.y}
        stroke={cerrado ? '#e2e8f0' : '#f87171'} strokeWidth={4} strokeLinecap="round" />
      <circle cx={p1.x} cy={p1.y} r={4} fill="#e2e8f0" />
      <circle cx={p2.x} cy={p2.y} r={4} fill={FONDO_CIRCUITO} stroke="#e2e8f0" strokeWidth={2.5} />
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
  const cross = mostrado === 'apagada' ? '#94a3b8' : '#92400e'
  return (
    <g
      onClick={revelado ? undefined : () => onToggle(b.id)}
      style={{ cursor: revelado ? 'default' : 'pointer' }}
    >
      <rect x={x - 26} y={y - 26} width={52} height={52} fill={FONDO_CIRCUITO} />
      <Rayos x={x} y={y} estado={mostrado} scale={1.15} />
      {/* Bombilla dibujada: cristal con su filamento (el círculo con aspa del
          esquema de libro no se entendía en un móvil) */}
      <circle cx={x} cy={y} r={19} fill={fill} stroke={stroke} strokeWidth={revelado ? 3.5 : 2.5} style={{ filter: glow, transition: 'fill 0.15s' }} />
      <path d={`M${x - 7} ${y + 9} L${x - 4} ${y - 3} Q${x - 2} ${y - 9} ${x} ${y - 3} Q${x + 2} ${y - 9} ${x + 4} ${y - 3} L${x + 7} ${y + 9}`}
        stroke={cross} strokeWidth={2} fill="none" strokeLinejoin="round" />
      {!revelado && (
        <circle cx={x} cy={y} r={25} fill="none" stroke="#ffffff" strokeOpacity={0.12} strokeWidth={1.5} strokeDasharray="3 4" />
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
      {labels.fundida && (
        <span className="flex items-center gap-1.5 text-xs text-white/60">
          <svg width="20" height="20" viewBox="-14 -14 28 28">
            <circle cx="0" cy="0" r="7" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
            <circle cx="6" cy="6" r="4" fill="#ef4444" />
            <path d="M4.3 4.3l3.4 3.4M7.7 4.3l-3.4 3.4" stroke="#fff" strokeWidth="1.1" />
          </svg>
          {labels.fundida}
        </span>
      )}
    </div>
  )
}

// ── Trazado automático ────────────────────────────────────────────────────
const U = 74       // ancho de una casilla (bombilla o interruptor)
const ROW = 74     // separación entre ramas en paralelo
const RAIL = 26    // hueco a cada lado de un grupo en paralelo
const X0 = 118     // donde empieza el circuito, a la derecha de la pila
const TOP = 46

function medida(n) {
  if (n.t === 'ser') {
    const ms = n.hijos.map(medida)
    return { w: ms.reduce((s, m) => s + m.w, 0), h: Math.max(...ms.map(m => m.h)) }
  }
  if (n.t === 'par') {
    const ms = n.hijos.map(medida)
    return { w: Math.max(...ms.map(m => m.w)) + 2 * RAIL, h: ms.reduce((s, m) => s + m.h, 0) }
  }
  return { w: U, h: 1 }
}

// Recorre el árbol y apunta cables, interruptores y bombillas con su posición.
function traza(n, x, y, w, out) {
  if (n.t === 'ser') {
    const ms = n.hijos.map(medida)
    const extra = (w - ms.reduce((s, m) => s + m.w, 0)) / n.hijos.length
    let cx = x
    n.hijos.forEach((h, i) => { const wi = ms[i].w + extra; traza(h, cx, y, wi, out); cx += wi })
    return
  }
  if (n.t === 'par') {
    const ms = n.hijos.map(medida)
    const xl = x + RAIL / 2, xr = x + w - RAIL / 2
    out.wires.push({ x1: x, y1: y, x2: xl, y2: y }, { x1: xr, y1: y, x2: x + w, y2: y })
    let fila = 0, ultimaY = y
    n.hijos.forEach((h, i) => {
      const yi = y + fila * ROW
      traza(h, xl, yi, xr - xl, out)
      ultimaY = yi
      fila += ms[i].h
    })
    out.wires.push({ x1: xl, y1: y, x2: xl, y2: ultimaY }, { x1: xr, y1: y, x2: xr, y2: ultimaY })
    return
  }
  out.wires.push({ x1: x, y1: y, x2: x + w, y2: y })
  const pos = { id: n.id, x: x + w / 2, y }
  if (n.t === 's') out.interruptores.push(pos)
  else if (n.t === 'b') out.bombillas.push(pos)
  else out.fundidas.push(pos)
}

export function trazado(arbol) {
  const m = medida(arbol)
  const out = { wires: [], interruptores: [], bombillas: [], fundidas: [] }
  traza(arbol, X0, TOP, m.w, out)
  const xFin = X0 + m.w + 26
  const bottom = TOP + (m.h - 1) * ROW + Math.max(70, ROW)
  const batY = (TOP + bottom) / 2
  out.wires.push(
    { x1: X0 + m.w, y1: TOP, x2: xFin, y2: TOP },
    { x1: xFin, y1: TOP, x2: xFin, y2: bottom },
    { x1: xFin, y1: bottom, x2: BAT_X, y2: bottom },
    { x1: BAT_X, y1: bottom, x2: BAT_X, y2: TOP },
    { x1: BAT_X, y1: TOP, x2: X0, y2: TOP },
  )
  return { ...out, W: xFin + 30, H: bottom + 26, batY }
}

// Bombilla fundida: cristal gris con el filamento roto. Es un dato del
// circuito (como el interruptor), no se predice.
function Fundida({ x, y }) {
  return (
    <g>
      <rect x={x - 26} y={y - 26} width={52} height={52} fill={FONDO_CIRCUITO} />
      <circle cx={x} cy={y} r={19} fill="#334155" stroke="#94a3b8" strokeWidth={2.5} />
      {/* grieta en el cristal */}
      <path d={`M${x + 6} ${y - 18} l-4 7 l5 3 l-5 6`} stroke="#cbd5e1" strokeWidth={1.6} fill="none" strokeLinejoin="round" />
      {/* filamento partido en dos, con el hueco a la vista */}
      <path d={`M${x - 8} ${y + 10} L${x - 5} ${y - 1} Q${x - 4} ${y - 6} ${x - 2} ${y - 3}`} stroke="#0f172a" strokeWidth={2.4} fill="none" />
      <path d={`M${x + 3} ${y - 1} Q${x + 4} ${y - 6} ${x + 5} ${y - 1} L${x + 8} ${y + 10}`} stroke="#0f172a" strokeWidth={2.4} fill="none" />
      <circle cx={x + 14} cy={y + 14} r={7} fill="#ef4444" stroke={FONDO_CIRCUITO} strokeWidth={2} />
      <path d={`M${x + 11} ${y + 11}l6 6M${x + 17} ${y + 11}l-6 6`} stroke="#fff" strokeWidth={1.8} strokeLinecap="round" />
    </g>
  )
}

export default function CircuitoDiagrama({ round, prediccion, onToggle, revelado }) {
  const t = trazado(round.arbol)
  const estado = Object.fromEntries(round.bombillas.map(b => [b.id, b]))
  const sw = Object.fromEntries(round.interruptores.map(i => [i.id, i]))
  return (
    <svg viewBox={`0 0 ${t.W} ${t.H}`} width="100%" style={{ display: 'block', maxHeight: '52vh' }}>
      {t.wires.map((w, i) => <Wire key={i} {...w} />)}
      <Bateria x={BAT_X} y={t.batY} />
      {t.interruptores.map(p => <Interruptor key={p.id} x={p.x} y={p.y} orientacion="h" cerrado={sw[p.id].cerrado} />)}
      {t.fundidas.map(p => <Fundida key={p.id} x={p.x} y={p.y} />)}
      {t.bombillas.map(p => (
        <g key={p.id}>
          <Bombilla x={p.x} y={p.y} b={estado[p.id]} prediccion={prediccion} revelado={revelado} onToggle={onToggle} />
          <text x={p.x + 22} y={p.y - 17} fontSize="12" fontWeight="900" fill="#cbd5e1" style={{ userSelect: 'none', pointerEvents: 'none' }}>{p.id.slice(1)}</text>
        </g>
      ))}
    </svg>
  )
}
