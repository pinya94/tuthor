// La pirámide dibujada: hombres a la izquierda, mujeres a la derecha, las
// edades en el centro y el grupo de 85+ arriba. `resalta` marca en ámbar lo que
// pregunta la ronda (un grupo, una franja o solo un lado) y `bueno` pinta en
// verde la respuesta al corregir.
import { GRUPOS, etiquetaGrupo } from '../../lib/piramide'

const W = 340, TOP = 26, FILA = 15
const CX0 = 148, CX1 = 192 // columna central de las edades
const ANCHO = 138

export default function PiramideSVG({ ronda, revelado, t }) {
  const max = Math.max(...ronda.h, ...ronda.m)
  const y = i => TOP + (GRUPOS - 1 - i) * FILA // 0-4 abajo
  const H = TOP + GRUPOS * FILA + 6

  // Qué se resalta: [desde, hasta, lado] (lado: 'h', 'm' o ambos)
  let marca = null
  if (ronda.marca) marca = [ronda.marca[0], ronda.marca[1], ronda.rasgo === 'inmigracion' ? 'h' : null]
  if (ronda.franja) marca = [ronda.franja[0], ronda.franja[1], null]
  const verde = revelado && ronda.pregunta === 'grupo' ? ronda.bueno : null

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={t.aria}>
      <text x={CX0 - 6} y={14} textAnchor="end" fontSize="11" fontWeight="700" fill="#60A5FA">{t.hombres}</text>
      <text x={CX1 + 6} y={14} fontSize="11" fontWeight="700" fill="#F472B6">{t.mujeres}</text>
      {marca && (
        <rect x={CX0 - ANCHO - 6} y={y(marca[1]) - 2}
          width={marca[2] === 'h' ? ANCHO + 6 + (CX1 - CX0) / 2 : ANCHO * 2 + (CX1 - CX0) + 12}
          height={(marca[1] - marca[0] + 1) * FILA + 2} rx="5" fill="#FBBF24" fillOpacity=".14" stroke="#FBBF24" strokeWidth="1.8" strokeDasharray="4 3" />
      )}
      {ronda.h.map((hv, i) => {
        const wh = (hv / max) * ANCHO, wm = (ronda.m[i] / max) * ANCHO
        const ok = verde === i
        return (
          <g key={i}>
            <rect x={CX0 - wh} y={y(i) + 1.5} width={wh} height={FILA - 3} rx="2" fill={ok ? '#22C55E' : '#3B82F6'} fillOpacity=".85" />
            <rect x={CX1} y={y(i) + 1.5} width={wm} height={FILA - 3} rx="2" fill={ok ? '#22C55E' : '#EC4899'} fillOpacity=".85" />
            <text x={(CX0 + CX1) / 2} y={y(i) + FILA / 2 + 3} textAnchor="middle" fontSize="8.5" fontWeight="600" fill={ok ? '#86EFAC' : '#CBD5E1'}>{etiquetaGrupo(i)}</text>
          </g>
        )
      })}
      {marca && <text x={W - 4} y={y(marca[1]) + ((marca[1] - marca[0] + 1) * FILA) / 2 + 4} textAnchor="end" fontSize="16" fill="#FBBF24">◀</text>}
    </svg>
  )
}
