/**
 * La célula dibujada, animal o vegetal, con cada orgánulo como una forma
 * PULSABLE del propio SVG.
 *
 * Es la diferencia con SiluetaCuerpo/Rayos X: allí hay que medir la
 * distancia del clic a un punto con su radio de tolerancia. Aquí la forma ES
 * el orgánulo, así que el acierto lo decide el propio navegador.
 *
 * Dibujo de libro de texto (mitocondria con crestas, cloroplasto con
 * tilacoides, núcleo con poros y cromatina, retículo abrazando al núcleo,
 * Golgi con vesículas) y en VERTICAL (320×360): en un móvil una célula
 * apaisada dejaba media pantalla vacía y los orgánulos diminutos. Cada
 * orgánulo es un <g> con su clic: los detalles de dentro (crestas, grana,
 * cromatina) cuentan como el orgánulo.
 *
 * Las posiciones están puestas para que NINGUNA forma se solape con otra
 * (salvo lo que va dentro a propósito: nucléolo en el núcleo, todo en el
 * citoplasma). Si dos se pisan, la de encima se come los clics de la de
 * debajo. Los ribosomas son pequeños: llevan un círculo invisible más grande
 * para que se puedan tocar con el dedo.
 *
 * Props:
 *   tipo      'animal' | 'vegetal'
 *   onPick    (id) => void — null para bloquear (fase de resultado)
 *   elegido   id que ha pulsado el jugador
 *   correcto  id que había que pulsar; solo se pasa al revelar
 *   revelado  true tras responder: apaga el resto y marca el veredicto
 */

const VERDE = '#4ade80'
const ROJO = '#f87171'

const brillo = c => `drop-shadow(0 0 2px ${c}) drop-shadow(0 0 2px ${c}) drop-shadow(0 0 5px ${c})`

function Mitocondria({ x, y, rot, rx = 32, ry = 15 }) {
  const n = Math.floor((rx * 2 - 16) / 3.5)
  let d = `M${-rx + 8} 0`
  for (let i = 0; i < n; i++) d += ` l3.5 ${i % 2 ? ry - 5 : -(ry - 5)}`
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <ellipse rx={rx} ry={ry} fill="#dc2626" />
      <ellipse rx={rx - 4} ry={ry - 4} fill="#fca5a5" />
      <path d={d} stroke="#b91c1c" strokeWidth="2.2" fill="none" strokeLinejoin="round" strokeLinecap="round" />
    </g>
  )
}

function Cloroplasto({ x, y, rot }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <ellipse rx="25" ry="13" fill="#15803d" />
      <ellipse rx="21" ry="9.5" fill="#4ade80" />
      <path d="M-14 0h28" stroke="#166534" strokeWidth="1.5" />
      {[-12, -4, 4, 12].map(gx => <rect key={gx} x={gx - 2.6} y="-6" width="5.2" height="12" rx="1.2" fill="#14532d" />)}
    </g>
  )
}

function Golgi({ x, y }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 10, 20, 30].map((dy, i) => {
        const w = 36 - i * 5
        return <path key={dy} d={`M${-w} ${dy} q${w} -12 ${w * 2} 0`} stroke="#fb923c" strokeWidth="6.5" fill="none" strokeLinecap="round" />
      })}
      <circle cx="-43" cy="-4" r="4.2" fill="#fb923c" />
      <circle cx="43" cy="-2" r="4.2" fill="#fb923c" />
      <circle cx="38" cy="14" r="3.4" fill="#fb923c" />
    </g>
  )
}

function Nucleo({ x, y, r }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#6d28d9" />
      <circle cx={x} cy={y} r={r - 5} fill="#8b5cf6" />
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2
        return <circle key={i} cx={x + (r - 2.5) * Math.cos(a)} cy={y + (r - 2.5) * Math.sin(a)} r="1.8" fill="#2e1065" />
      })}
      <path d={`M${x - r * 0.55} ${y + r * 0.2}q8 -10 14 0t14 0M${x - r * 0.4} ${y + r * 0.5}q7 -8 12 0t12 0t12 0M${x + r * 0.05} ${y - r * 0.55}q6 8 12 0`}
        stroke="#c4b5fd" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.8" />
    </g>
  )
}

function Nucleolo({ x, y, r }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#3b0764" />
      <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.3} fill="#581c87" />
    </g>
  )
}

// Arcos del retículo que abrazan el núcleo por un lado.
function Reticulo({ cx, cy, radios, desde, hasta }) {
  const rad = g => (g * Math.PI) / 180
  return (
    <g stroke="#f472b6" strokeWidth="6" fill="none" strokeLinecap="round">
      {radios.map(r => {
        const x1 = cx + r * Math.cos(rad(desde)), y1 = cy + r * Math.sin(rad(desde))
        const x2 = cx + r * Math.cos(rad(hasta)), y2 = cy + r * Math.sin(rad(hasta))
        // Ondulado: dos arcos con un pequeño pliegue entre medias
        const mx = cx + (r + 5) * Math.cos(rad((desde + hasta) / 2)), my = cy + (r + 5) * Math.sin(rad((desde + hasta) / 2))
        return <path key={r} d={`M${x1} ${y1} Q${cx + (r + 9) * Math.cos(rad(desde * 0.75 + hasta * 0.25))} ${cy + (r + 9) * Math.sin(rad(desde * 0.75 + hasta * 0.25))} ${mx} ${my} T${x2} ${y2}`} />
      })}
    </g>
  )
}

// Ribosomas: no un punto suelto (se confundía con cualquier otra bolita),
// sino un grupito de tres en fila sobre su hebra, cada uno con sus dos
// subunidades —la grande y la pequeña—, que es como salen en el libro.
function Ribosomas({ puntos }) {
  return (
    <g>
      {puntos.map(([x, y]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(1.3) translate(${-x} ${-y})`}>
          <circle cx={x} cy={y} r="12" fill="transparent" />
          <path d={`M${x - 12} ${y + 3}Q${x} ${y - 3} ${x + 12} ${y + 3}`} stroke="#a5b4fc" strokeWidth="1.2" fill="none" />
          {[-7, 0, 7].map(dx => (
            <g key={dx}>
              <ellipse cx={x + dx} cy={y + 1.5} rx="3.6" ry="3" fill="#4f46e5" />
              <ellipse cx={x + dx} cy={y - 2.2} rx="2.5" ry="1.8" fill="#c7d2fe" />
            </g>
          ))}
        </g>
      ))}
    </g>
  )
}

// Lisosoma: una bolsa (doble membrana) llena de enzimas.
function Lisosoma({ x, y, r }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill="#15803d" />
      <circle cx={x} cy={y} r={r - 2.5} fill="#86efac" />
      {[[-0.35, -0.2], [0.3, -0.35], [0.05, 0.35], [-0.3, 0.3], [0.38, 0.15]].map(([a, b], i) => (
        <path key={i} d={`M${x + a * r - 2} ${y + b * r}a2 2 0 1 1 4 0`} fill="#166534" />
      ))}
    </g>
  )
}

// El dibujo de UN orgánulo, suelto, para enseñar "así se ve" en el nivel
// fácil. Usa las mismas piezas que la célula, así que es idéntico a lo que
// hay que tocar.
const ICONOS = {
  membrana: <><circle cx="30" cy="30" r="22" fill="#334155" opacity="0.35" /><circle cx="30" cy="30" r="22" fill="none" stroke="#f59e0b" strokeWidth="6" /></>,
  citoplasma: <><circle cx="30" cy="30" r="22" fill="#475569" /><circle cx="30" cy="30" r="22" fill="none" stroke="#f59e0b" strokeWidth="2" opacity="0.4" /></>,
  pared: <><rect x="6" y="6" width="48" height="48" rx="7" fill="#4d7c0f" /><rect x="12" y="12" width="36" height="36" rx="4" fill="#334155" opacity="0.5" /></>,
  nucleo: <Nucleo x={30} y={30} r={24} />,
  nucleolo: <><g opacity="0.3"><Nucleo x={30} y={30} r={24} /></g><Nucleolo x={30} y={30} r={11} /></>,
  mitocondria: <Mitocondria x={30} y={30} rot={-20} rx={26} ry={12} />,
  ribosoma: <g transform="translate(30 30) scale(1.6) translate(-30 -30)"><Ribosomas puntos={[[30, 30]]} /></g>,
  reticulo: <Reticulo cx={14} cy={36} radios={[16, 26, 36]} desde={-75} hasta={20} />,
  golgi: <g transform="translate(30 24) scale(0.62) translate(-30 -24)"><Golgi x={30} y={24} /></g>,
  lisosoma: <Lisosoma x={30} y={30} r={20} />,
  centriolo: <><rect x="8" y="30" width="28" height="12" rx="3" fill="#c026d3" /><path d="M14 30v12M20 30v12M26 30v12M32 30v12" stroke="#f5d0fe" strokeWidth="1.6" /><rect x="40" y="12" width="12" height="30" rx="3" fill="#c026d3" /><path d="M40 18h12M40 24h12M40 30h12M40 36h12" stroke="#f5d0fe" strokeWidth="1.6" /></>,
  cloroplasto: <g transform="translate(30 30) scale(1.1) translate(-30 -30)"><Cloroplasto x={30} y={30} rot={-15} /></g>,
  vacuola: <><rect x="10" y="8" width="40" height="44" rx="14" fill="#0369a1" /><rect x="14" y="12" width="32" height="36" rx="11" fill="#0ea5e9" /></>,
}

export function OrganuloIcono({ id, className = 'w-12 h-12' }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      {ICONOS[id] ?? null}
    </svg>
  )
}

export default function CelulaSVG({ tipo, onPick, elegido, correcto, revelado }) {
  const vegetal = tipo === 'vegetal'

  // Props del <g> de cada orgánulo: clic, y el veredicto al revelar (brillo
  // verde el correcto, rojo el pulsado si era otro; el resto se apaga).
  const org = id => {
    let opacity = 1, filter
    if (revelado) {
      if (id === correcto) filter = brillo(VERDE)
      else if (id === elegido) filter = brillo(ROJO)
      else opacity = 0.28
    } else if (elegido === id) filter = brillo('#ffffff')
    return {
      onClick: onPick ? e => { e.stopPropagation(); onPick(id) } : undefined,
      style: { cursor: onPick ? 'pointer' : 'default', opacity, filter, transition: 'opacity .2s' },
    }
  }

  return (
    <svg viewBox="0 0 320 360" className="w-full h-auto select-none" role="img" style={{ touchAction: 'manipulation' }}>
      {vegetal ? (
        <>
          {/* Pared celular: solo vegetal, y va POR FUERA de la membrana */}
          <g {...org('pared')}>
            <rect x="4" y="4" width="312" height="352" rx="18" fill="#4d7c0f" />
            <path d="M14 30l10-10M14 120l10-10M14 210l10-10M14 300l10-10M296 60l10-10M296 150l10-10M296 240l10-10M296 330l10-10M60 14l10-10M150 14l10-10M240 14l10-10M90 356l10-10M180 356l10-10M270 356l10-10"
              stroke="#84cc16" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          </g>
          <g {...org('membrana')}><rect x="18" y="18" width="284" height="324" rx="12" fill="#f59e0b" /></g>
          <g {...org('citoplasma')}><rect x="26" y="26" width="268" height="308" rx="8" fill="#334155" /></g>

          {/* Vacuola: la bolsa de agua que ocupa medio interior */}
          <g {...org('vacuola')}>
            <rect x="150" y="46" width="130" height="206" rx="38" fill="#0369a1" />
            <rect x="156" y="52" width="118" height="194" rx="33" fill="#0ea5e9" />
            <path d="M172 76q6-12 20-14" stroke="#e0f2fe" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7" />
          </g>

          <g {...org('nucleo')}><Nucleo x={86} y={102} r={40} /></g>
          <g {...org('nucleolo')}><Nucleolo x={98} y={92} r={12} /></g>

          <g {...org('reticulo')}>
            <path d="M44 212q12-10 24 0t24 0t24 0t20 0M44 230q12-10 24 0t24 0t24 0t20 0" stroke="#f472b6" strokeWidth="6" fill="none" strokeLinecap="round" />
          </g>
          <g {...org('golgi')}><Golgi x={92} y={268} /></g>

          <g {...org('mitocondria')}>
            <Mitocondria x={170} y={300} rot={-8} rx={26} ry={13} />
            <Mitocondria x={264} y={316} rot={0} rx={22} ry={11} />
          </g>
          <g {...org('cloroplasto')}>
            <Cloroplasto x={70} y={176} rot={-10} />
            <Cloroplasto x={218} y={280} rot={8} />
            <Cloroplasto x={124} y={40} rot={4} />
          </g>
          <g {...org('ribosoma')}><Ribosomas puntos={[[40, 136], [138, 150], [40, 300], [132, 330 - 16], [284, 266]]} /></g>
        </>
      ) : (
        <>
          <g {...org('membrana')}><ellipse cx="160" cy="180" rx="152" ry="172" fill="#f59e0b" /></g>
          <g {...org('citoplasma')}><ellipse cx="160" cy="180" rx="140" ry="160" fill="#334155" /></g>

          <g {...org('reticulo')}><Reticulo cx={118} cy={132} radios={[62, 76, 90]} desde={-52} hasta={72} /></g>
          <g {...org('nucleo')}><Nucleo x={118} y={132} r={48} /></g>
          <g {...org('nucleolo')}><Nucleolo x={132} y={120} r={14} /></g>

          <g {...org('golgi')}><Golgi x={108} y={250} /></g>

          <g {...org('mitocondria')}>
            <Mitocondria x={250} y={112} rot={-22} />
            <Mitocondria x={236} y={232} rot={28} />
          </g>

          <g {...org('lisosoma')}>
            <Lisosoma x={198} y={300} r={16} />
            <Lisosoma x={252} y={282} r={12} />
          </g>

          {/* Centriolos: dos cilindros en ángulo recto, con sus túbulos */}
          <g {...org('centriolo')}>
            <rect x="38" y="214" width="30" height="12" rx="3" fill="#c026d3" />
            <path d="M44 214v12M50 214v12M56 214v12M62 214v12" stroke="#f5d0fe" strokeWidth="1.6" />
            <rect x="72" y="198" width="12" height="30" rx="3" fill="#c026d3" />
            <path d="M72 204h12M72 210h12M72 216h12M72 222h12" stroke="#f5d0fe" strokeWidth="1.6" />
          </g>

          <g {...org('ribosoma')}><Ribosomas puntos={[[50, 122], [206, 46], [288, 186], [150, 326], [74, 296]]} /></g>
        </>
      )}
    </svg>
  )
}
