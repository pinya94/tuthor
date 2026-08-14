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
// fondo, solo VB_W/VB_H (importados de data/organos.js, fuente única).
//
// Los huesos/articulaciones (`objetivo.bilateral`) solo están descritos del
// lado derecho pero cuentan en los dos — ver mirrorOrgano en lib/rayosX.js
// — así que al revelar se anotan LOS DOS lados, no solo el guardado, para
// que quede claro que cualquiera de los dos era válido.
import { useRef } from 'react'
import { VB_W, VB_H } from '../data/organos'
import { mirrorOrgano } from '../lib/rayosX'

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
// viewBox) — a mano por órgano para que las etiquetas no choquen entre ellas
// ni con los brazos. Como solo se anota UN órgano a la vez (el preguntado
// esa ronda, ver `objetivo`), estos valores no necesitan evitar chocar entre
// sí — solo quedar dentro del lienzo y no montarse sobre la propia silueta.
const LABEL_OFFSET = {
  cerebro: [17, 0],
  ojos: [16, 0],
  boca: [-14, 2],
  traquea: [17, 2],
  pulmones: [19, -7],
  corazon: [-17, 2],
  diafragma: [19, 3],
  estomago: [-17, 2],
  higado: [17, 2],
  intestinos: [0, 18],
  clavicula: [13, -2],
  humero: [15, 0],
  codo: [-13, 0],
  radio: [-13, -3],
  cubito: [-13, 3],
  muneca: [-13, 0],
  femur: [15, 0],
  rotula: [14, 0],
  tibia: [-14, 0],
  perone: [14, 0],
  tobillo: [14, 0],
}

// Anotación estilo diagrama científico: zona de margen + etiqueta con el
// nombre y una línea guía. Con un pulso continuo (radar) para que la vista
// vaya directa a la zona en vez de tener que buscarla.
//
// Los huesos largos (organo.segmento) se marcan con una CÁPSULA a lo largo
// del hueso, no un círculo — un trazo grueso con extremos redondeados entre
// los dos puntos del segmento, que es exactamente lo que mide
// isCorrectGuess/evaluarClick en lib/rayosX.js (distancia al segmento, no
// al centro). El punto pulsante va en el punto medio, solo de referencia
// visual.
function AnnotationMarker({ organo, l, mirrored }) {
  const [baseDx, dy] = LABEL_OFFSET[organo.id] ?? [16, 0]
  // Lado izquierdo (reflejo): la etiqueta tira hacia el lado contrario del
  // que le tocaba en el derecho, para seguir alejándose del centro del
  // cuerpo en vez de meterse por encima del torso.
  const dx = mirrored ? -baseDx : baseDx
  const anchor = dx === 0 ? 'middle' : dx > 0 ? 'start' : 'end'
  const lx = organo.x + dx, ly = organo.y + dy
  const nombre = organo.nombre[l] ?? organo.nombre.es
  const seg = organo.segmento
  return (
    <g>
      {seg ? (
        <line x1={seg.x1} y1={seg.y1} x2={seg.x2} y2={seg.y2}
          stroke={organo.color} strokeWidth={organo.radio * 2} strokeLinecap="round" opacity="0.3">
          <animate attributeName="opacity" values="0.22;0.42;0.22" dur="1.6s" repeatCount="indefinite" />
        </line>
      ) : (
        <circle cx={organo.x} cy={organo.y} r={organo.radio}
          fill="none" stroke={organo.color} strokeWidth="0.7" strokeDasharray="2.2 2.2">
          <animate attributeName="opacity" values="0.35;0.9;0.35" dur="1.6s" repeatCount="indefinite" />
        </circle>
      )}
      <circle cx={organo.x} cy={organo.y} r="2.2" fill={organo.color} stroke="#050714" strokeWidth="0.8">
        <animate attributeName="r" values="2.2;3.1;2.2" dur="1.6s" repeatCount="indefinite" />
      </circle>
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
        {revelado && objetivo && (
          <>
            <AnnotationMarker organo={objetivo} l={l} />
            {/* Bilateral (huesos/articulaciones del sistema óseo): el lado
                izquierdo cuenta igual que el derecho — ver mirrorOrgano en
                lib/rayosX.js — así que también se marca, para que quede
                claro que cualquiera de los dos valía. */}
            {objetivo.bilateral && <AnnotationMarker organo={mirrorOrgano(objetivo)} l={l} mirrored />}
          </>
        )}

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
