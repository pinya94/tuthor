// Silueta de cuerpo humano (vista frontal, estilo radiografía) para el juego
// Rayos X y su examen — mismo patrón que BarraOrbita.jsx/MapaCoordenadas.jsx:
// un componente de solo dibujo, sin botón de confirmar (eso lo gestiona cada
// página). Antes de revelar solo se ven puntos neutros; al revelar se pinta
// cada órgano con su color y, si hay un `guess`, la marca del jugador.
//
// viewBox fijo 0 0 200 400 — coincide con las coordenadas (x,y) de cada
// órgano en src/data/organos.js.
import { useRef } from 'react'
import { ORGANOS } from '../data/organos'

const VB_W = 200, VB_H = 400

function clientToSvgPoint(svgEl, clientX, clientY) {
  const pt = svgEl.createSVGPoint()
  pt.x = clientX
  pt.y = clientY
  const ctm = svgEl.getScreenCTM()
  if (!ctm) return { x: VB_W / 2, y: VB_H / 2 }
  const p = pt.matrixTransform(ctm.inverse())
  return { x: Math.max(0, Math.min(VB_W, p.x)), y: Math.max(0, Math.min(VB_H, p.y)) }
}

export default function SiluetaCuerpo({ guess, onPick, revelado, resultado }) {
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

  return (
    <div className="relative w-full rounded-2xl border border-white/10 bg-gradient-to-b from-[#0b1030] to-[#050714] overflow-hidden"
      style={{ aspectRatio: `${VB_W} / ${VB_H}`, maxHeight: 420, margin: '0 auto' }}>
      <svg ref={svgRef} viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full h-full select-none"
        style={{ cursor: revelado ? 'default' : 'crosshair', touchAction: 'none' }} onClick={handleClick}>
        {/* Silueta simplificada: cabeza + torso + brazos + piernas */}
        <g fill="rgba(147,197,253,0.07)" stroke="rgba(147,197,253,0.5)" strokeWidth="2.5" strokeLinejoin="round">
          <line x1="72" y1="80" x2="35" y2="172" strokeWidth="20" strokeLinecap="round" />
          <line x1="128" y1="80" x2="165" y2="172" strokeWidth="20" strokeLinecap="round" />
          <line x1="85" y1="188" x2="75" y2="378" strokeWidth="24" strokeLinecap="round" />
          <line x1="115" y1="188" x2="125" y2="378" strokeWidth="24" strokeLinecap="round" />
          <rect x="65" y="62" width="70" height="128" rx="30" />
          <circle cx="100" cy="38" r="24" />
        </g>

        {/* Marcas neutras: los 7 puntos existen y se ve dónde están, pero no
            cuál es cuál — mismo patrón que las paradas de Órbita. */}
        {!revelado && ORGANOS.map(o => (
          <circle key={o.id} cx={o.x} cy={o.y} r="3"
            fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        ))}

        {revelado && ORGANOS.map(o => (
          <circle key={o.id} cx={o.x} cy={o.y} r="7"
            fill={o.color} stroke="#050714" strokeWidth="1.5" />
        ))}

        {guess && (
          <g style={{ filter: glow }}>
            <circle cx={guess.x} cy={guess.y} r="7" fill="none" stroke="#EDAE49" strokeWidth="2.5" />
            <line x1={guess.x - 11} y1={guess.y} x2={guess.x + 11} y2={guess.y} stroke="#EDAE49" strokeWidth="2" />
            <line x1={guess.x} y1={guess.y - 11} x2={guess.x} y2={guess.y + 11} stroke="#EDAE49" strokeWidth="2" />
          </g>
        )}
      </svg>
    </div>
  )
}
