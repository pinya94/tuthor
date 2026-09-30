// Dibujos de Rayos X, en las coordenadas del viewBox de la silueta
// (public/img/cuerpo-humano.svg, 0 0 147.998 318.455). Medidas sacadas
// rasterizando la silueta fila a fila: cabeza x57-91 y0-32, cuello x63-85,
// torso x46-102 (pecho) → x39-109 (cadera, y150), piernas desde y180
// (derecha del dibujo x75-111), brazo derecho del dibujo x108-134.
//
// - `Referencias`: esqueleto tenue que se ve SIEMPRE (columna, costillas,
//   pelvis) para orientarse en la silueta, como en una radiografía. No
//   incluye nada de lo que se pregunta.
// - `OrganoArte`: la forma del órgano o hueso preguntado, que solo aparece
//   al revelar. Enseñar la forma en su sitio se entiende de un vistazo; un
//   punto con un círculo discontinuo no.
//
// VISTA FRONTAL: la derecha de la persona queda a la IZQUIERDA del dibujo
// (hígado a la izquierda, corazón y estómago a la derecha).
import { VB_W } from '../../data/organos'

function Hueso({ x1, y1, x2, y2, w, color }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeLinecap="round" />
      <circle cx={x1} cy={y1} r={w * 0.85} fill={color} />
      <circle cx={x2} cy={y2} r={w * 0.85} fill={color} />
    </g>
  )
}

// Cada dibujo recibe el color del órgano (data/organos.js).
const DIBUJOS = {
  cerebro: c => (
    <g>
      <ellipse cx="74" cy="11" rx="12.5" ry="8.5" fill={c} />
      <path d="M74 3v16M65 8q3-2.5 5 0t5 0M76 8q3-2.5 5 0t5 0M64 13q3 2.5 5 0t5 0M76 13q3 2.5 5 0t5 0"
        stroke="#4c1d95" strokeWidth="0.9" fill="none" strokeLinecap="round" />
    </g>
  ),
  ojos: c => (
    <g>
      {[68.5, 79.5].map(x => (
        <g key={x}>
          <ellipse cx={x} cy="19" rx="3.6" ry="2.4" fill="#F8FAFC" />
          <circle cx={x} cy="19" r="1.6" fill={c} />
          <circle cx={x} cy="19" r="0.7" fill="#0f172a" />
        </g>
      ))}
    </g>
  ),
  boca: c => (
    <path d="M67.5 27.5Q71 25.8 74 27q3-1.2 6.5.5Q74 34 67.5 27.5Z" fill={c} stroke="#831843" strokeWidth="0.5" />
  ),
  traquea: c => (
    <g>
      <rect x="71.5" y="32" width="5" height="20" rx="2.5" fill={c} />
      {[35, 38.5, 42, 45.5, 49].map(y => <path key={y} d={`M71.5 ${y}h5`} stroke="#0c4a6e" strokeWidth="0.8" />)}
    </g>
  ),
  pulmones: c => (
    <g>
      <path d="M74 50v8m0 0l-5 5m5-5l5 5" stroke={c} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M70 60Q59 57 54 69Q50 82 52 92Q62 95 71 90Z" fill={c} />
      <path d="M78 60Q89 57 94 69Q98 82 96 92Q90 94 86 91Q88 84 80 82Z" fill={c} />
    </g>
  ),
  corazon: c => (
    <path d="M84 90C73 82 74 71 79.5 71C82 71 83.5 73 84 75C84.5 73 86 71 88.5 71C94 71 95 82 84 90Z"
      fill={c} stroke="#7f1d1d" strokeWidth="0.6" transform="rotate(-18 84 80)" />
  ),
  diafragma: c => (
    <path d="M48 99Q60 84 74 92Q88 84 100 99" stroke={c} strokeWidth="3.2" fill="none" strokeLinecap="round" />
  ),
  estomago: c => (
    <path d="M80 97Q93 94 96 104Q98 117 86 119Q77 119 78 111Q84 113 86 109Q88 104 80 101Z" fill={c} stroke="#7c2d12" strokeWidth="0.5" />
  ),
  higado: c => (
    <path d="M48 101Q62 95 77 99Q75 108 65 114Q53 119 48 113Z" fill={c} stroke="#451a03" strokeWidth="0.5" />
  ),
  intestinos: c => (
    <g>
      <path d="M57 142V117q0-4 4-4h26q4 0 4 4v25" stroke="#b45309" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M63 121q4-3 7.3 0t7.3 0t7.3 0M63 128q4 3 7.3 0t7.3 0t7.3 0M63 135q4-3 7.3 0t7.3 0t7.3 0"
        stroke={c} strokeWidth="2.6" fill="none" strokeLinecap="round" />
    </g>
  ),
  clavicula: c => <Hueso x1={78} y1={55} x2={103} y2={52.5} w={2.4} color={c} />,
  humero: c => <Hueso x1={114} y1={90} x2={122} y2={120} w={4} color={c} />,
  codo: c => (
    <g>
      <circle cx="122" cy="120" r="4.4" fill={c} />
      <circle cx="122" cy="120" r="2" fill="none" stroke="#475569" strokeWidth="0.8" />
    </g>
  ),
  radio: c => <Hueso x1={126} y1={121} x2={133} y2={147} w={2.6} color={c} />,
  cubito: c => <Hueso x1={118} y1={121} x2={125} y2={147} w={2.6} color={c} />,
  muneca: c => (
    <g fill={c}>
      <circle cx="126.5" cy="147" r="2" /><circle cx="130.5" cy="146.5" r="2" />
      <circle cx="127.5" cy="150.5" r="2" /><circle cx="131.5" cy="150" r="2" />
    </g>
  ),
  femur: c => <Hueso x1={90} y1={174} x2={95} y2={230} w={5} color={c} />,
  rotula: c => <ellipse cx="95" cy="233" rx="3.6" ry="4.4" fill={c} stroke="#475569" strokeWidth="0.6" />,
  tibia: c => <Hueso x1={94.5} y1={237} x2={92} y2={292} w={3.8} color={c} />,
  perone: c => <Hueso x1={100} y1={238} x2={100.5} y2={292} w={2.2} color={c} />,
  tobillo: c => (
    <g fill={c}>
      <circle cx="92" cy="295" r="2.4" /><circle cx="97" cy="295.5" r="2.2" /><circle cx="94.5" cy="299" r="2.2" />
    </g>
  ),
}

// El órgano dibujado en su sitio. `espejo` lo pinta en el otro lado del
// cuerpo (huesos bilaterales: valen los dos).
export function OrganoArte({ organo, espejo = false }) {
  const dibujo = DIBUJOS[organo.id]
  if (!dibujo) return <circle cx={organo.x} cy={organo.y} r="4" fill={organo.color} />
  return (
    <g transform={espejo ? `translate(${VB_W} 0) scale(-1 1)` : undefined}
      style={{ filter: `drop-shadow(0 0 3px ${organo.color})` }}>
      {dibujo(organo.color)}
    </g>
  )
}

// Esqueleto de referencia, muy tenue: columna, costillas y pelvis.
export function Referencias() {
  const vertebras = []
  for (let y = 46; y < 158; y += 6.2) vertebras.push(y)
  return (
    <g opacity="0.22" fill="none" stroke="#BFDBFE" strokeLinecap="round">
      {vertebras.map(y => <rect key={y} x="71.3" y={y} width="5.4" height="4.4" rx="1.4" fill="#BFDBFE" stroke="none" />)}
      {[62, 69, 76, 83, 90].map((y, i) => (
        <g key={y} strokeWidth="1.3">
          <path d={`M71 ${y}Q${58 - i} ${y - 3} ${52 - i * 0.6} ${y + 6}`} />
          <path d={`M77 ${y}Q${90 + i} ${y - 3} ${96 + i * 0.6} ${y + 6}`} />
        </g>
      ))}
      <path d="M74 56v38" strokeWidth="2.4" />
      <path d="M58 150q16-8 32 0q4 14-6 24q-10-6-20 0q-10-10-6-24Z" strokeWidth="1.5" />
    </g>
  )
}
