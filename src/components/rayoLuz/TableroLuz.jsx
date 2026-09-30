// Tablero de Rayo de Luz (SVG). Lo comparten el juego y el examen.
//
// Dibuja el láser, el rayo ya calculado (lib/rayoLuz.js → simular), los
// espejos, el sensor, las paredes y, en el examen, las salidas A-D del borde.
// En cada espejo donde rebota el rayo se ve la NORMAL (discontinua) y, si
// `mostrarAngulos`, los dos ángulos iguales: la ley de la reflexión dibujada,
// que es lo que el juego enseña.
import { DIRS, simular } from '../../lib/rayoLuz'

const S = 56       // lado de casilla
const P = 42       // margen (láser y salidas van fuera de la rejilla)
const LASER = '#f43f5e'

const centro = (c, r) => ({ x: P + c * S + S / 2, y: P + r * S + S / 2 })
const vec = d => ({ x: DIRS[d].dc, y: DIRS[d].dr })
const ANGULO = { E: 0, S: 90, W: 180, N: -90 }

function Emisor({ laser }) {
  const d = vec(laser.dir)
  const c0 = centro(laser.c, laser.r)
  const x = c0.x - d.x * (S / 2 + 20), y = c0.y - d.y * (S / 2 + 20)
  return (
    <g transform={`translate(${x} ${y}) rotate(${ANGULO[laser.dir]})`}>
      <rect x={-22} y={-11} width={30} height={22} rx={5} fill="#334155" stroke="#64748b" strokeWidth={1.5} />
      <rect x={-18} y={-7} width={8} height={14} rx={2} fill="#1e293b" />
      <rect x={8} y={-6} width={9} height={12} rx={2} fill="#475569" />
      <circle cx={17} cy={0} r={4} fill={LASER} style={{ filter: `drop-shadow(0 0 4px ${LASER})` }} />
    </g>
  )
}

function Espejo({ e, tipo, onGirar, girable }) {
  const { x, y } = centro(e.c, e.r)
  return (
    <g onClick={girable ? () => onGirar(e.id) : undefined} style={{ cursor: girable ? 'pointer' : 'default' }}>
      <rect x={x - S / 2 + 3} y={y - S / 2 + 3} width={S - 6} height={S - 6} rx={10}
        fill={girable ? '#ffffff08' : 'transparent'} stroke={girable ? '#ffffff22' : 'none'} strokeDasharray="4 4" />
      <g style={{ transform: `translate(${x}px, ${y}px) rotate(${tipo === '/' ? -45 : 45}deg)`, transition: 'transform 0.22s ease-out' }}>
        <rect x={-S * 0.42} y={-4} width={S * 0.84} height={8} rx={4} fill="#cbd5e1" />
        <rect x={-S * 0.42} y={-4} width={S * 0.84} height={3} rx={1.5} fill="#f8fafc" />
        <rect x={-S * 0.42} y={2} width={S * 0.84} height={2} rx={1} fill="#94a3b8" />
      </g>
      <circle cx={x} cy={y} r={3.5} fill="#475569" stroke="#e2e8f0" strokeWidth={1} />
    </g>
  )
}

function Pared({ p }) {
  const { x, y } = centro(p.c, p.r)
  const x0 = x - S / 2 + 3, y0 = y - S / 2 + 3, w = S - 6
  return (
    <g>
      <rect x={x0} y={y0} width={w} height={w} rx={6} fill="#57534e" />
      <path d={`M${x0} ${y0 + w / 3}h${w}M${x0} ${y0 + (2 * w) / 3}h${w}M${x0 + w / 2} ${y0}v${w / 3}M${x0 + w / 4} ${y0 + w / 3}v${w / 3}M${x0 + (3 * w) / 4} ${y0 + w / 3}v${w / 3}M${x0 + w / 2} ${y0 + (2 * w) / 3}v${w / 3}`}
        stroke="#292524" strokeWidth={2} />
    </g>
  )
}

function Sensor({ s, encendido }) {
  const { x, y } = centro(s.c, s.r)
  return (
    <g>
      {encendido && Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2
        return <line key={i} x1={x + Math.cos(a) * 20} y1={y + Math.sin(a) * 20} x2={x + Math.cos(a) * 26} y2={y + Math.sin(a) * 26}
          stroke="#4ade80" strokeWidth={2.5} strokeLinecap="round" />
      })}
      <circle cx={x} cy={y} r={17} fill="#0f172a" stroke={encendido ? '#4ade80' : '#64748b'} strokeWidth={3} />
      <circle cx={x} cy={y} r={11} fill="none" stroke={encendido ? '#86efac' : '#334155'} strokeWidth={2} />
      <circle cx={x} cy={y} r={6} fill={encendido ? '#4ade80' : '#1e293b'}
        style={{ filter: encendido ? 'drop-shadow(0 0 8px #4ade80)' : 'none', transition: 'fill .2s' }} />
    </g>
  )
}

// La normal y, si se pide, los dos ángulos iguales (entrada y salida).
function Reflexion({ paso, angulos }) {
  const { x, y } = centro(paso.c, paso.r)
  const din = vec(paso.dir), dout = vec(paso.sale)
  const nx = -din.x + dout.x, ny = -din.y + dout.y
  const L = Math.hypot(nx, ny)
  const n = { x: nx / L, y: ny / L }
  const R = 14
  const arco = (a, b, color) => {
    const cruz = a.x * b.y - a.y * b.x
    return <path d={`M${x + a.x * R} ${y + a.y * R} A${R} ${R} 0 0 ${cruz > 0 ? 1 : 0} ${x + b.x * R} ${y + b.y * R}`}
      fill="none" stroke={color} strokeWidth={2.2} />
  }
  return (
    <g style={{ pointerEvents: 'none' }}>
      <line x1={x} y1={y} x2={x + n.x * S * 0.46} y2={y + n.y * S * 0.46} stroke="#fde68a" strokeWidth={1.4} strokeDasharray="3 3" opacity={0.85} />
      {angulos && arco({ x: -din.x, y: -din.y }, n, '#fbbf24')}
      {angulos && arco(n, dout, '#fbbf24')}
    </g>
  )
}

function Salida({ s, estado, onElegir }) {
  const d = vec(s.dir)
  const c0 = centro(s.c, s.r)
  const x = c0.x + d.x * (S / 2 + P / 2 - 2), y = c0.y + d.y * (S / 2 + P / 2 - 2)
  const color = estado === 'buena' ? '#4ade80' : estado === 'mala' ? '#f87171' : estado === 'elegida' ? '#EDAE49' : '#94a3b8'
  return (
    <g onClick={onElegir ? () => onElegir(s.letra) : undefined} style={{ cursor: onElegir ? 'pointer' : 'default' }}>
      <circle cx={x} cy={y} r={20} fill="transparent" />
      <circle cx={x} cy={y} r={14} fill={estado ? `${color}33` : '#1e293b'} stroke={color} strokeWidth={2.5} />
      <text x={x} y={y + 5} textAnchor="middle" fontSize={15} fontWeight={900} fill={color} style={{ userSelect: 'none' }}>{s.letra}</text>
    </g>
  )
}

export default function TableroLuz({
  tablero, orient, onGirar, mostrarAngulos = false,
  salidas = null, elegida = null, correcta = null, onElegir = null, mostrarRayo = true,
}) {
  const { cols, rows, laser, sensor, espejos, paredes } = tablero
  const sim = simular(tablero, orient)
  const W = cols * S + 2 * P, H = rows * S + 2 * P

  // Puntos del rayo: la boca del láser, cada rebote y el final
  const dl = vec(laser.dir)
  const c0 = centro(laser.c, laser.r)
  const puntos = [{ x: c0.x - dl.x * (S / 2 + 3), y: c0.y - dl.y * (S / 2 + 3) }]
  for (const paso of sim.camino) if (paso.espejo) puntos.push(centro(paso.c, paso.r))
  const ultimo = sim.camino[sim.camino.length - 1]
  const dirFinal = ultimo ? (ultimo.sale ?? ultimo.dir) : laser.dir
  if (sim.fin === 'sensor') puntos.push(centro(sensor.c, sensor.r))
  else if (sim.fin === 'pared') {
    const cc = centro(sim.choque.c, sim.choque.r), d = vec(dirFinal)
    puntos.push({ x: cc.x - d.x * (S / 2 - 3), y: cc.y - d.y * (S / 2 - 3) })
  } else if (sim.fin === 'fuera' && ultimo) {
    const cc = centro(ultimo.c, ultimo.r), d = vec(dirFinal)
    puntos.push({ x: cc.x + d.x * (S / 2 + P * 0.35), y: cc.y + d.y * (S / 2 + P * 0.35) })
  } else if (ultimo) puntos.push(centro(ultimo.c, ultimo.r))
  const linea = puntos.map(p => `${p.x},${p.y}`).join(' ')
  const encendido = sim.fin === 'sensor'

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block select-none" style={{ touchAction: 'manipulation' }}>
      <style>{`@keyframes rl-fluye { to { stroke-dashoffset: -36 } } .rl-fluye { animation: rl-fluye .9s linear infinite }
        @media (prefers-reduced-motion: reduce) { .rl-fluye { animation: none } }`}</style>
      <defs>
        <filter id="rl-brillo" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="4" /></filter>
      </defs>

      {/* Rejilla */}
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols)
        return <rect key={i} x={P + c * S + 2} y={P + r * S + 2} width={S - 4} height={S - 4} rx={8} fill="#ffffff05" stroke="#ffffff0d" />
      })}

      {paredes.map((p, i) => <Pared key={i} p={p} />)}
      {sensor && <Sensor s={sensor} encendido={encendido} />}

      {/* El rayo: halo difuminado, trazo y núcleo claro con pulso que fluye */}
      {mostrarRayo && (
        <g style={{ pointerEvents: 'none' }}>
          <polyline points={linea} fill="none" stroke={encendido ? '#4ade80' : LASER} strokeWidth={12} opacity={0.35}
            strokeLinejoin="round" strokeLinecap="round" filter="url(#rl-brillo)" />
          <polyline points={linea} fill="none" stroke={encendido ? '#4ade80' : LASER} strokeWidth={4.5} strokeLinejoin="round" strokeLinecap="round" />
          <polyline points={linea} fill="none" stroke="#fff1f2" strokeWidth={1.6} strokeLinejoin="round" strokeLinecap="round" />
          <polyline points={linea} fill="none" stroke="#ffffff" strokeWidth={2.4} strokeDasharray="4 14" className="rl-fluye" opacity={0.75} strokeLinecap="round" />
        </g>
      )}

      {espejos.map(e => <Espejo key={e.id} e={e} tipo={orient[e.id]} onGirar={onGirar} girable={!!onGirar} />)}
      {mostrarRayo && sim.camino.filter(p => p.espejo).map((p, i) => <Reflexion key={i} paso={p} angulos={mostrarAngulos} />)}

      <Emisor laser={laser} />

      {salidas?.map(s => {
        let estado = null
        if (correcta) estado = s.letra === correcta ? 'buena' : s.letra === elegida ? 'mala' : null
        else if (s.letra === elegida) estado = 'elegida'
        return <Salida key={s.letra} s={s} estado={estado} onElegir={onElegir} />
      })}
    </svg>
  )
}
