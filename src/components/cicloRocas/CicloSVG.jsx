// El diagrama del ciclo de las rocas: cinco estaciones (magma, rocas ígneas,
// sedimentos, rocas sedimentarias y metamórficas) y las flechas entre ellas.
// La flecha que se pregunta va en ámbar con un «?»; al corregir, se escribe
// el proceso. `ruta`: varias flechas a resaltar en orden (preguntas de ruta).
import { FLECHAS } from '../../lib/cicloRocas'

const W = 320, H = 250
const POS = {
  sedimentos:   { x: 160, y: 30,  color: '#D6B47A' },
  ignea:        { x: 58,  y: 112, color: '#F97316' },
  sedimentaria: { x: 262, y: 112, color: '#EAB308' },
  magma:        { x: 92,  y: 215, color: '#EF4444' },
  metamorfica:  { x: 228, y: 215, color: '#A78BFA' },
}
const RX = 50, RY = 17

// Punto en el borde de la elipse de un nodo, en dirección a otro punto.
function borde(n, hacia) {
  const dx = hacia.x - n.x, dy = hacia.y - n.y
  const t = 1 / Math.sqrt((dx * dx) / (RX * RX) + (dy * dy) / (RY * RY))
  return { x: n.x + dx * t, y: n.y + dy * t }
}

// Las flechas de ida y vuelta entre los mismos nodos se curvan para no taparse.
function camino(a, b, curva) {
  const A = POS[a], B = POS[b]
  const p = borde(A, B), q = borde(B, A)
  const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2
  const nx = -(q.y - p.y), ny = q.x - p.x, len = Math.hypot(nx, ny) || 1
  const c = { x: mx + (nx / len) * curva, y: my + (ny / len) * curva }
  return { d: `M${p.x} ${p.y}Q${c.x} ${c.y} ${q.x} ${q.y}`, medio: { x: (p.x + 2 * c.x + q.x) / 4, y: (p.y + 2 * c.y + q.y) / 4 } }
}
// Ida y vuelta con la MISMA curva: al invertir el sentido se invierte la normal,
// así que el mismo signo las separa (con signos opuestos se montaban una encima de otra).
const CURVA = { 'metamorfica>sedimentos': 18, 'sedimentaria>sedimentos': 16, 'sedimentos>sedimentaria': 16 }

export default function CicloSVG({ marcadas = [], revelado, etiquetas, nombres }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[270px]" role="img" aria-label={nombres.aria}>
      <defs>
        {['gris', 'ambar', 'verde'].map(c => (
          <marker key={c} id={`flecha-${c}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10Z" fill={c === 'gris' ? '#64748B' : c === 'ambar' ? '#FBBF24' : '#4ADE80'} />
          </marker>
        ))}
      </defs>
      {FLECHAS.map(([a, b], i) => {
        const k = marcadas.indexOf(i)
        const { d, medio } = camino(a, b, CURVA[`${a}>${b}`] ?? 0)
        const color = k < 0 ? '#475569' : revelado ? '#4ADE80' : '#FBBF24'
        return (
          <g key={i}>
            <path d={d} stroke={color} strokeWidth={k < 0 ? 1.8 : 3.2} fill="none" markerEnd={`url(#flecha-${k < 0 ? 'gris' : revelado ? 'verde' : 'ambar'})`} />
            {k >= 0 && (
              <g>
                <circle cx={medio.x} cy={medio.y} r="10" fill="#0b1226" stroke={color} strokeWidth="2" />
                <text x={medio.x} y={medio.y + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill={color}>{marcadas.length > 1 ? k + 1 : '?'}</text>
                {revelado && etiquetas?.[k] && (
                  <text x={medio.x} y={medio.y + (medio.y > 150 ? 24 : -15)} textAnchor="middle" fontSize="9" fontWeight="700" fill="#BBF7D0">{etiquetas[k]}</text>
                )}
              </g>
            )}
          </g>
        )
      })}
      {Object.entries(POS).map(([id, p]) => (
        <g key={id}>
          <ellipse cx={p.x} cy={p.y} rx={RX} ry={RY} fill={p.color} fillOpacity=".2" stroke={p.color} strokeWidth="2" />
          <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#F8FAFC">{nombres[id]}</text>
        </g>
      ))}
    </svg>
  )
}
