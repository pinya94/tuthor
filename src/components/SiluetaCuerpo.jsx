// Silueta de cuerpo humano (vista frontal, estilo radiografía) para el juego
// Rayos X y su examen — mismo patrón que BarraOrbita.jsx/MapaCoordenadas.jsx:
// un componente de solo dibujo, sin botón de confirmar (eso lo gestiona cada
// página). Antes de responder solo se ve la silueta con un esqueleto tenue
// de referencia (columna, costillas, pelvis: nada de lo que se pregunta);
// al revelar aparece el DIBUJO del órgano preguntado en su sitio
// (components/rayosX/OrganoArte.jsx). El nombre lo pone la página al lado:
// en un móvil una etiqueta dentro del dibujo salía ilegible.
//
// El cuerpo es una ilustración real (public/img/cuerpo-humano.svg, adaptada
// de una silueta de Wikimedia Commons de dominio público — ver el propio
// fichero para la fuente), no un dibujo a mano. Encima va una capa SVG
// transparente con el MISMO viewBox que sirve para los clics y los dibujos
// — así no hace falta tocar coordenadas al cambiar de imagen de fondo,
// solo VB_W/VB_H (importados de data/organos.js, fuente única).
//
// Los huesos/articulaciones (`objetivo.bilateral`) solo están descritos del
// lado derecho pero cuentan en los dos — ver mirrorOrgano en lib/rayosX.js
// — así que al revelar se dibujan LOS DOS lados.
import { useRef } from 'react'
import { VB_W, VB_H } from '../data/organos'
import { mirrorOrgano } from '../lib/rayosX'
import { OrganoArte, Referencias } from './rayosX/OrganoArte'

function clientToSvgPoint(svgEl, clientX, clientY) {
  const pt = svgEl.createSVGPoint()
  pt.x = clientX
  pt.y = clientY
  const ctm = svgEl.getScreenCTM()
  if (!ctm) return { x: VB_W / 2, y: VB_H / 2 }
  const p = pt.matrixTransform(ctm.inverse())
  return { x: Math.max(0, Math.min(VB_W, p.x)), y: Math.max(0, Math.min(VB_H, p.y)) }
}

// Al revelar: el dibujo del órgano y, si es un órgano de punto, su margen
// aceptado en discontinuo (en los huesos largos el propio hueso dibujado ya
// es la zona que vale).
function Revelado({ organo, espejo = false }) {
  const o = espejo ? mirrorOrgano(organo) : organo
  return (
    <g>
      {!organo.segmento && (
        <circle cx={o.x} cy={o.y} r={organo.radio} fill={organo.color} fillOpacity="0.08"
          stroke={organo.color} strokeWidth="0.7" strokeDasharray="2.2 2.2">
          <animate attributeName="opacity" values="0.45;1;0.45" dur="1.6s" repeatCount="indefinite" />
        </circle>
      )}
      <OrganoArte organo={organo} espejo={espejo} />
    </g>
  )
}

export default function SiluetaCuerpo({ guess, onPick, revelado, resultado, compact, objetivo }) {
  const svgRef = useRef(null)

  function handleClick(e) {
    if (revelado || !onPick) return
    const svg = svgRef.current
    if (!svg || e.clientX == null) return
    onPick(clientToSvgPoint(svg, e.clientX, e.clientY))
  }

  const colorMarca = resultado === 'perfecto' ? '#4ADE80' : resultado === 'organo' ? '#FACC15' : resultado === 'fallo' ? '#F87171' : '#EDAE49'

  // El ancho es el ÚNICO que determina el tamaño (el alto sale de
  // aspect-ratio, 0.465 = VB_W/VB_H) para que nunca haya letterboxing: el
  // mínimo de un tope en px, un % del ancho y lo que deja libre el alto de
  // la pantalla descontando lo que va alrededor. `compact` es la pantalla de
  // resultado, que pone el texto AL LADO del cuerpo (de ahí el 44vw).
  const width = compact
    ? 'min(200px, 44vw, calc((100dvh - 15rem) * 0.465))'
    : 'min(300px, 88vw, calc((100dvh - 16rem) * 0.465))'

  return (
    <div className="relative mx-auto rounded-2xl border border-sky-300/15 bg-gradient-to-b from-[#0c1a3a] to-[#050914] overflow-hidden shrink-0"
      style={{ aspectRatio: `${VB_W} / ${VB_H}`, width }}>
      <img src="/img/cuerpo-humano.svg" alt="" aria-hidden="true" draggable={false}
        className="absolute inset-0 w-full h-full pointer-events-none select-none" />
      <svg ref={svgRef} viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 w-full h-full block select-none"
        style={{ cursor: revelado ? 'default' : 'crosshair', touchAction: 'manipulation' }} onClick={handleClick}>
        <Referencias />
        {revelado && objetivo && (
          <>
            <Revelado organo={objetivo} />
            {objetivo.bilateral && <Revelado organo={objetivo} espejo />}
          </>
        )}

        {guess && (
          <g style={{ filter: `drop-shadow(0 0 3px ${colorMarca})` }}>
            <circle cx={guess.x} cy={guess.y} r="6" fill="none" stroke={colorMarca} strokeWidth="1.8" />
            <circle cx={guess.x} cy={guess.y} r="1.3" fill={colorMarca} />
            <path d={`M${guess.x - 10} ${guess.y}h6M${guess.x + 4} ${guess.y}h6M${guess.x} ${guess.y - 10}v6M${guess.x} ${guess.y + 4}v6`}
              stroke={colorMarca} strokeWidth="1.5" strokeLinecap="round" />
          </g>
        )}
      </svg>
    </div>
  )
}
