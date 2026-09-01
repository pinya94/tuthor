/**
 * La célula dibujada, animal o vegetal, con cada orgánulo como una forma
 * PULSABLE del propio SVG.
 *
 * Es la diferencia con SiluetaCuerpo/Rayos X: allí la imagen es una fotografía
 * y hay que medir la distancia del clic a un punto con su radio de tolerancia,
 * con toda la calibración que eso arrastra. Aquí la forma ES el orgánulo, así
 * que el acierto lo decide el propio navegador y no hay nada que ajustar.
 *
 * Las posiciones están puestas a mano para que NINGUNA se solape con otra: si
 * dos orgánulos se pisan, el de encima se come los clics del de debajo y el
 * alumno falla una respuesta que sabía. Al mover cualquiera hay que comprobar
 * que sigue dentro del citoplasma y que no invade a su vecino.
 *
 * Props:
 *   tipo      'animal' | 'vegetal'
 *   onPick    (id) => void — null para bloquear (fase de resultado)
 *   elegido   id que ha pulsado el jugador
 *   correcto  id que había que pulsar; solo se pasa al revelar
 *   revelado  true tras responder: apaga el hover y pinta el veredicto
 */

const VERDE = '#22c55e'
const ROJO = '#ef4444'

// Cada orgánulo con su color propio y estable. Al repetir partidas el color
// acaba siendo una ayuda de memoria, igual que en los esquemas del libro.
const COLOR = {
  membrana: '#f59e0b',
  citoplasma: '#334155',
  nucleo: '#8b5cf6',
  nucleolo: '#4c1d95',
  mitocondria: '#ef4444',
  ribosoma: '#38bdf8',
  reticulo: '#f472b6',
  golgi: '#fb923c',
  lisosoma: '#a3e635',
  centriolo: '#e879f9',
  pared: '#4d7c0f',
  cloroplasto: '#16a34a',
  vacuola: '#0284c7',
}

export default function CelulaSVG({ tipo, onPick, elegido, correcto, revelado }) {
  const vegetal = tipo === 'vegetal'

  const estilo = id => {
    const base = { fill: COLOR[id], cursor: onPick ? 'pointer' : 'default', transition: 'opacity .2s' }
    if (!revelado) return { ...base, opacity: elegido === id ? 1 : 0.9, stroke: elegido === id ? '#fff' : 'none', strokeWidth: elegido === id ? 3 : 0 }
    if (id === correcto) return { ...base, opacity: 1, stroke: VERDE, strokeWidth: 4 }
    if (id === elegido) return { ...base, opacity: 1, stroke: ROJO, strokeWidth: 4 }
    return { ...base, opacity: 0.25, stroke: 'none', strokeWidth: 0 }
  }

  const p = id => ({
    style: estilo(id),
    onClick: onPick ? () => onPick(id) : undefined,
    strokeLinejoin: 'round',
  })

  // Los trazos (retículo y Golgi) van con stroke del color y sin relleno, así
  // que su estilo se monta aparte: `fill` los dejaría como manchas.
  const trazo = id => {
    const e = estilo(id)
    return {
      onClick: onPick ? () => onPick(id) : undefined,
      fill: 'none',
      stroke: e.stroke && e.stroke !== 'none' ? e.stroke : COLOR[id],
      strokeWidth: 8,
      strokeLinecap: 'round',
      style: { opacity: e.opacity, cursor: e.cursor },
    }
  }

  return (
    <svg viewBox="0 0 400 300" className="w-full h-auto select-none" role="img">
      {vegetal ? (
        <>
          {/* Pared celular: solo vegetal, y va POR FUERA de la membrana */}
          <rect x="8" y="8" width="384" height="284" rx="16" {...p('pared')} />
          <rect x="20" y="20" width="360" height="260" rx="10" {...p('membrana')} />
          <rect x="32" y="32" width="336" height="236" rx="6" {...p('citoplasma')} />

          {/* Vacuola: la bolsa de agua que ocupa medio interior */}
          <rect x="208" y="64" width="146" height="150" rx="26" {...p('vacuola')} />

          <circle cx="100" cy="100" r="42" {...p('nucleo')} />
          {/* Descentrado a propósito: concéntrico no se distinguía del núcleo */}
          <circle cx="113" cy="88" r="14" {...p('nucleolo')} />

          <g {...trazo('reticulo')}>
            <path d="M56 152 q26 -14 50 2 q24 16 48 0" />
            <path d="M56 172 q26 -14 50 2 q24 16 48 0" />
          </g>

          <g {...trazo('golgi')}>
            <path d="M62 202 q34 -13 68 0" />
            <path d="M66 215 q30 -12 60 0" />
            <path d="M70 228 q26 -11 52 0" />
          </g>

          <ellipse cx="170" cy="195" rx="32" ry="16" {...p('mitocondria')} />
          <ellipse cx="272" cy="242" rx="32" ry="16" {...p('mitocondria')} />

          <g {...p('cloroplasto')}>
            <ellipse cx="58" cy="46" rx="22" ry="13" transform="rotate(-14 58 46)" />
            <ellipse cx="168" cy="118" rx="22" ry="13" transform="rotate(10 168 118)" />
            <ellipse cx="180" cy="250" rx="22" ry="13" transform="rotate(-6 180 250)" />
          </g>

          <g {...p('ribosoma')}>
            {[[150, 44], [46, 122], [44, 250], [196, 44], [138, 252]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="7" />
            ))}
          </g>
        </>
      ) : (
        <>
          <ellipse cx="200" cy="150" rx="188" ry="138" {...p('membrana')} />
          <ellipse cx="200" cy="150" rx="176" ry="126" {...p('citoplasma')} />

          <circle cx="145" cy="115" r="44" {...p('nucleo')} />
          <circle cx="158" cy="103" r="15" {...p('nucleolo')} />

          <g {...trazo('reticulo')}>
            <path d="M198 92 q28 -14 54 2 q26 16 52 0" />
            <path d="M198 118 q28 -14 54 2 q26 16 52 0" />
          </g>

          <g {...trazo('golgi')}>
            <path d="M112 228 q38 -14 76 0" />
            <path d="M116 241 q34 -13 68 0" />
            <path d="M120 254 q30 -12 60 0" />
          </g>

          <ellipse cx="300" cy="190" rx="34" ry="17" {...p('mitocondria')} />
          <ellipse cx="292" cy="88" rx="32" ry="16" {...p('mitocondria')} />

          <g {...p('lisosoma')}>
            <circle cx="252" cy="248" r="15" />
            <circle cx="304" cy="238" r="11" />
          </g>

          <g {...p('centriolo')}>
            <rect x="70" y="172" width="34" height="11" rx="4" />
            <rect x="70" y="172" width="11" height="34" rx="4" />
          </g>

          <g {...p('ribosoma')}>
            {[[105, 62], [232, 52], [336, 140], [64, 128], [200, 268], [70, 236]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="7" />
            ))}
          </g>
        </>
      )}
    </svg>
  )
}
