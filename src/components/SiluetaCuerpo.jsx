// Silueta de cuerpo humano (vista frontal, estilo radiografía) para el juego
// Rayos X y su examen — mismo patrón que BarraOrbita.jsx/MapaCoordenadas.jsx:
// un componente de solo dibujo, sin botón de confirmar (eso lo gestiona cada
// página). Antes de revelar solo se ven puntos neutros (para no dar pistas
// con la forma del órgano); al revelar se dibuja cada órgano con un icono
// reconocible (cerebro, corazón, pulmones...) y, si hay un `guess`, la marca
// del jugador.
//
// viewBox fijo 0 0 200 400 — coincide con las coordenadas (x,y) de cada
// órgano en src/data/organos.js. El cuerpo es un contorno con hombros,
// cintura y caderas (no un rectángulo) para que se lea como un cuerpo real.
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

// Torso con cuello, hombros, cintura y caderas — un solo path cerrado.
const TORSO_D = `
  M100,54
  C82,54 78,60 76,74
  C74,90 72,130 78,165
  C80,180 74,190 76,200
  C78,205 122,205 124,200
  C126,190 120,180 122,165
  C128,130 126,90 124,74
  C122,60 118,54 100,54 Z
`
// Brazo izquierdo (el derecho es un reflejo vía transform, ver <BodyOutline>).
const ARM_D = `
  M72,78
  C55,82 45,110 44,145
  C43,165 42,180 44,192
  C45,200 56,202 58,194
  C60,185 60,170 62,150
  C64,120 70,95 82,82
  C78,79 75,78 72,78 Z
`
// Pierna izquierda (la derecha es un reflejo, igual que el brazo).
const LEG_D = `
  M78,198
  C70,220 68,280 72,330
  C74,355 70,375 68,385
  C67,392 90,394 92,386
  C94,375 92,355 92,330
  C94,280 96,230 92,200
  C88,197 82,197 78,198 Z
`

function BodyOutline() {
  return (
    <g fill="rgba(147,197,253,0.1)" stroke="rgba(147,197,253,0.55)" strokeWidth="2" strokeLinejoin="round">
      <path d={LEG_D} />
      <g transform={`translate(${VB_W},0) scale(-1,1)`}><path d={LEG_D} /></g>
      <path d={ARM_D} />
      <g transform={`translate(${VB_W},0) scale(-1,1)`}><path d={ARM_D} /></g>
      <path d={TORSO_D} />
      <ellipse cx="100" cy="34" rx="19" ry="21" />
    </g>
  )
}

// ── Iconos de órganos (centrados en 0,0, ~20-28 unidades) ───────────────────
// Formas simplificadas pero reconocibles — no anatómicamente exactas, solo
// lo bastante distintas entre sí para leerse de un vistazo a tamaño pequeño.
const ORGAN_ICONS = {
  cerebro: (
    <>
      <ellipse rx="12" ry="10" />
      <path d="M0,-9 C-2,-5 -2,-1 0,2 C2,-1 2,-5 0,-9" fill="none" stroke="#050714" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M-7,-6 C-9,-2 -9,4 -5,7" fill="none" stroke="#050714" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M7,-6 C9,-2 9,4 5,7" fill="none" stroke="#050714" strokeWidth="1.1" strokeLinecap="round" />
    </>
  ),
  pulmones: (
    <>
      <path d="M-3,-11 C-15,-11 -17,5 -10,11 C-6,14 -3,9 -3,0 Z" />
      <path d="M3,-11 C15,-11 17,5 10,11 C6,14 3,9 3,0 Z" />
      <path d="M-3,-6 L3,-6 M-3,-1 L3,-1" stroke="#050714" strokeWidth="1" />
    </>
  ),
  corazon: <path d="M0,9 C-12,-2 -12,-14 0,-7 C12,-14 12,-2 0,9 Z" />,
  diafragma: <path d="M-15,4 Q0,-9 15,4 Q0,9 -15,4 Z" />,
  estomago: <path d="M-5,-11 C7,-11 12,-4 9,4 C6,12 -5,12 -9,4 C-12,-3 -9,-9 -5,-11 Z" />,
  higado: <path d="M-11,-6 C2,-11 15,-6 13,3 C10,10 -5,11 -12,4 C-15,0 -14,-4 -11,-6 Z" />,
  intestinos: (
    <path d="M-11,-9 C2,-13 13,-8 8,-2 C4,3 -7,-1 -3,4 C1,9 9,6 11,11"
      fill="none" strokeWidth="4.5" strokeLinecap="round" />
  ),
}

function OrganMarker({ organo }) {
  const icon = ORGAN_ICONS[organo.id]
  const isStroke = organo.id === 'intestinos'
  return (
    <g transform={`translate(${organo.x},${organo.y})`}
      fill={isStroke ? 'none' : organo.color} stroke={isStroke ? organo.color : '#050714'}
      strokeWidth={isStroke ? undefined : 1.2}>
      {icon}
    </g>
  )
}

export default function SiluetaCuerpo({ guess, onPick, revelado, resultado, compact }) {
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

  // El ancho es el ÚNICO que determina el tamaño (alto = ancho×2 vía
  // aspect-ratio) para que nunca haya letterboxing: `width` es el mínimo de
  // un tope en px, un % del ancho disponible y un % del alto de viewport
  // (convertido a ancho, /2 porque alto = 2×ancho). Así jamás desborda la
  // pantalla en alto, sea cual sea el dispositivo — probado hasta 320×568.
  // `compact`: la pantalla de resultado apila más cosas alrededor de la
  // silueta (fila de órganos + texto de función/dato + botón) que la
  // pantalla de juego, así que necesita un tope más bajo (medido: sin él
  // desbordaba ~113px en un viewport de 812px de alto).
  const width = compact ? 'min(150px, 60vw, 15vh)' : 'min(260px, 90vw, 24vh)'

  return (
    <div className="relative mx-auto rounded-2xl border border-white/10 bg-gradient-to-b from-[#0b1030] to-[#050714] overflow-hidden"
      style={{ aspectRatio: `${VB_W} / ${VB_H}`, width }}>
      <svg ref={svgRef} viewBox={`0 0 ${VB_W} ${VB_H}`} className="w-full h-full block select-none"
        style={{ cursor: revelado ? 'default' : 'crosshair', touchAction: 'none' }} onClick={handleClick}>
        <BodyOutline />

        {/* Marcas neutras: los 7 puntos existen y se ve dónde están, pero no
            cuál es cuál (formas de órgano darían la respuesta). */}
        {!revelado && ORGANOS.map(o => (
          <circle key={o.id} cx={o.x} cy={o.y} r="3.5"
            fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
        ))}

        {revelado && ORGANOS.map(o => <OrganMarker key={o.id} organo={o} />)}

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
