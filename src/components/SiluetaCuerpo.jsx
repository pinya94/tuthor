// Silueta de cuerpo humano (vista frontal, estilo radiografía) para el juego
// Rayos X y su examen — mismo patrón que BarraOrbita.jsx/MapaCoordenadas.jsx:
// un componente de solo dibujo, sin botón de confirmar (eso lo gestiona cada
// página). Antes de responder la silueta va completamente limpia — sin
// ninguna marca de dónde están los 7 órganos, para no dar pistas; al
// revelar, se anota SOLO el órgano preguntado esa ronda (`objetivo`) como en
// un diagrama científico: un punto exacto, el círculo de margen aceptado y
// una etiqueta con su nombre — marcar los 7 a la vez no aporta nada (no es
// una pregunta sobre los demás) y satura el dibujo.
//
// El cuerpo es una ilustración real (public/img/cuerpo-humano.svg, adaptada
// de una silueta de Wikimedia Commons de dominio público — ver el propio
// fichero para la fuente), no un dibujo a mano. Encima va una capa SVG
// transparente con el MISMO viewBox que sirve para los clics y la
// anotación — así no hace falta tocar coordenadas al cambiar de imagen de
// fondo, solo VB_W/VB_H.
import { useRef } from 'react'

// viewBox nativo de cuerpo-humano.svg — coincide con las coordenadas (x,y)
// de cada órgano en src/data/organos.js.
const VB_W = 147.998, VB_H = 318.455

function clientToSvgPoint(svgEl, clientX, clientY) {
  const pt = svgEl.createSVGPoint()
  pt.x = clientX
  pt.y = clientY
  const ctm = svgEl.getScreenCTM()
  if (!ctm) return { x: VB_W / 2, y: VB_H / 2 }
  const p = pt.matrixTransform(ctm.inverse())
  return { x: Math.max(0, Math.min(VB_W, p.x)), y: Math.max(0, Math.min(VB_H, p.y)) }
}

// Desplazamiento de la etiqueta respecto al punto del órgano (unidades del
// viewBox) — a mano por órgano para que las 7 etiquetas no choquen entre
// ellas ni con los brazos. Los de la izquierda del torso tiran hacia la
// izquierda, los de la derecha hacia la derecha, intestinos hacia abajo.
const LABEL_OFFSET = {
  cerebro: [17, 3],
  pulmones: [19, -7],
  corazon: [-17, 2],
  diafragma: [19, 3],
  estomago: [-17, 2],
  higado: [17, 2],
  intestinos: [0, 18],
}

// Anotación estilo diagrama científico: punto exacto + círculo de margen
// (discontinuo, el radio real que cuenta como acierto) + etiqueta con el
// nombre y una línea guía si la etiqueta queda lejos del punto.
function AnnotationMarker({ organo, l }) {
  const [dx, dy] = LABEL_OFFSET[organo.id] ?? [16, 0]
  const anchor = dx === 0 ? 'middle' : dx > 0 ? 'start' : 'end'
  const lx = organo.x + dx, ly = organo.y + dy
  const nombre = organo.nombre[l] ?? organo.nombre.es
  return (
    <g>
      <circle cx={organo.x} cy={organo.y} r={organo.radio}
        fill="none" stroke={organo.color} strokeWidth="0.7" strokeDasharray="2.2 2.2" opacity="0.7" />
      <circle cx={organo.x} cy={organo.y} r="2.4" fill={organo.color} stroke="#050714" strokeWidth="0.8" />
      <line x1={organo.x + dx * 0.35} y1={organo.y + dy * 0.35} x2={lx - dx * 0.12} y2={ly - dy * 0.12}
        stroke={organo.color} strokeWidth="0.7" opacity="0.8" />
      <text x={lx} y={ly} textAnchor={anchor} dominantBaseline="middle"
        fontSize="7.5" fontWeight="700" fill="#fff" stroke="#050714" strokeWidth="2.2"
        paintOrder="stroke" style={{ userSelect: 'none' }}>
        {nombre}
      </text>
    </g>
  )
}

export default function SiluetaCuerpo({ guess, onPick, revelado, resultado, compact, objetivo, l = 'es' }) {
  const svgRef = useRef(null)

  function handleClick(e) {
    if (revelado || !onPick) return
    const svg = svgRef.current
    if (!svg || e.clientX == null) return
    onPick(clientToSvgPoint(svg, e.clientX, e.clientY))
  }

  const glow = resultado === 'perfecto' ? 'drop-shadow(0 0 8px rgba(74,222,128,0.9))'
    : resultado === 'organo' ? 'drop-shadow(0 0 8px rgba(250,204,21,0.9))'
    : resultado === 'fallo' ? 'drop-shadow(0 0 8px rgba(248,113,113,0.9))'
    : 'none'

  // El ancho es el ÚNICO que determina el tamaño (alto sale de aspect-ratio)
  // para que nunca haya letterboxing: `width` es el mínimo de un tope en px,
  // un % del ancho disponible y un % del alto de viewport (convertido a
  // ancho). Así jamás desborda la pantalla en alto, sea cual sea el
  // dispositivo — probado hasta 320×568.
  // `compact`: la pantalla de resultado apila más cosas alrededor de la
  // silueta (fila de órganos + texto de función/dato + botón) que la
  // pantalla de juego, así que necesita un tope más bajo (medido: sin él
  // desbordaba ~113px en un viewport de 812px de alto).
  const width = compact ? 'min(150px, 60vw, 15vh)' : 'min(260px, 90vw, 24vh)'

  return (
    <div className="relative mx-auto rounded-2xl border border-white/10 bg-gradient-to-b from-[#0b1030] to-[#050714] overflow-hidden"
      style={{ aspectRatio: `${VB_W} / ${VB_H}`, width }}>
      <img src="/img/cuerpo-humano.svg" alt="" aria-hidden="true" draggable={false}
        className="absolute inset-0 w-full h-full pointer-events-none select-none" />
      <svg ref={svgRef} viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 w-full h-full block select-none"
        style={{ cursor: revelado ? 'default' : 'crosshair', touchAction: 'none' }} onClick={handleClick}>
        {revelado && objetivo && <AnnotationMarker organo={objetivo} l={l} />}

        {guess && (
          <g style={{ filter: glow }}>
            <circle cx={guess.x} cy={guess.y} r="8" fill="none" stroke="#EDAE49" strokeWidth="2.5" />
            <line x1={guess.x - 12} y1={guess.y} x2={guess.x + 12} y2={guess.y} stroke="#EDAE49" strokeWidth="2" />
            <line x1={guess.x} y1={guess.y - 12} x2={guess.x} y2={guess.y + 12} stroke="#EDAE49" strokeWidth="2" />
          </g>
        )}
      </svg>
    </div>
  )
}
