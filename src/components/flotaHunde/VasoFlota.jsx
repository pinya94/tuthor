// El vaso de ¿Flota o se hunde?: el líquido y el objeto sujeto encima. Al
// revelar, el objeto cae y se queda donde lo dice la física: flotando con la
// fracción exacta bajo la superficie (ρ cuerpo / ρ líquido) o en el fondo.
// El líquido se pinta ENCIMA del objeto y semitransparente, así la parte
// sumergida se ve teñida: la fracción se lee en el dibujo.
import { LIQUIDOS, OBJETOS, fraccionSumergida } from '../../lib/flotaHunde'

const W = 320, H = 250
const VX0 = 70, VX1 = 250   // paredes del vaso
const BORDE = 76            // borde superior del vaso
const SUP = 118             // superficie del líquido
const FONDO = 236           // fondo interior

// Medidas de cada forma (alto h) y cómo se dibuja con su borde superior en
// y=0. `p`: props de relleno o de contorno (el objeto se pinta dos veces).
const FORMAS = {
  bloque: { h: 48, dibujo: p => <rect x={-30} y={0} width={60} height={48} rx={4} {...p} /> },
  bola: { h: 50, dibujo: p => <circle cx={0} cy={25} r={25} {...p} /> },
  huevo: { h: 52, dibujo: p => <ellipse cx={0} cy={26} rx={20} ry={26} {...p} /> },
  plano: { h: 12, dibujo: p => <rect x={-26} y={0} width={52} height={12} rx={6} {...p} /> },
}

export default function VasoFlota({ ronda, revelado, aria }) {
  const liq = LIQUIDOS[ronda.liquido]
  const obj = OBJETOS[ronda.objeto] ?? { forma: 'bloque', color: '#A78BFA' }
  const forma = FORMAS[obj.forma]
  const f = fraccionSumergida(ronda)
  const flota = f < 1
  // y del borde superior del objeto: sujeto encima del vaso, flotando o en el fondo
  const yInicio = BORDE - forma.h - 10
  const yFinal = flota ? SUP - (1 - f) * forma.h : FONDO - forma.h
  const y = revelado ? yFinal : yInicio
  const mover = { transform: `translate(${W / 2}px, ${y}px)`, transition: revelado ? 'transform 1.3s cubic-bezier(.45,.05,.35,1.15)' : 'none' }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto max-h-[280px]" role="img" aria-label={aria}>
      {/* pinza que sujeta el objeto hasta soltarlo */}
      {!revelado && <path d={`M${W / 2} 0V${yInicio - 2}`} stroke="#94A3B8" strokeWidth="2" strokeDasharray="3 3" />}
      <g style={mover}>{forma.dibujo({ fill: obj.color })}</g>
      {/* líquido encima del objeto, semitransparente */}
      <rect x={VX0 + 2} y={SUP} width={VX1 - VX0 - 4} height={FONDO - SUP} fill={liq.color} fillOpacity=".35" />
      <path d={`M${VX0 + 2} ${SUP}H${VX1 - 2}`} stroke={liq.color} strokeWidth="2.5" />
      {/* el contorno otra vez, encima del líquido: los objetos oscuros no se pierden */}
      <g style={mover}>{forma.dibujo({ fill: 'none', stroke: '#E2E8F0', strokeOpacity: 0.7, strokeWidth: 2 })}</g>
      {/* el vaso */}
      <path d={`M${VX0} ${BORDE}V${FONDO + 4}Q${VX0} ${FONDO + 8} ${VX0 + 6} ${FONDO + 8}H${VX1 - 6}Q${VX1} ${FONDO + 8} ${VX1} ${FONDO + 4}V${BORDE}`}
        fill="none" stroke="#CBD5E1" strokeOpacity=".8" strokeWidth="3" strokeLinejoin="round" />
      {/* marcas de nivel */}
      {[0.25, 0.5, 0.75].map(k => (
        <path key={k} d={`M${VX1 - 14} ${SUP + (FONDO - SUP) * k}H${VX1 - 3}`} stroke="#CBD5E1" strokeOpacity=".5" strokeWidth="1.5" />
      ))}
    </svg>
  )
}
