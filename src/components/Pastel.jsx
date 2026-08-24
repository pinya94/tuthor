// Pastel circular dividido en porciones iguales, dibujado a mano con <path>
// de SVG (arcos trigonométricos, sin librería de gráficos). Lo comparten el
// juego (RepartePastel) y su examen (RepartePastelExamen) — misma geometría,
// mismo aspecto.
const CX = 130, CY = 130, R = 108

function wedgePath(startDeg, endDeg) {
  const rad = d => (d - 90) * Math.PI / 180 // 0° = arriba (12h), sentido horario
  const x1 = CX + R * Math.cos(rad(startDeg)), y1 = CY + R * Math.sin(rad(startDeg))
  const x2 = CX + R * Math.cos(rad(endDeg)), y2 = CY + R * Math.sin(rad(endDeg))
  const largeArc = endDeg - startDeg > 180 ? 1 : 0
  return `M ${CX} ${CY} L ${x1} ${y1} A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2} Z`
}

export default function Pastel({ n, shaded, onToggle, disabled }) {
  const sliceDeg = 360 / n
  return (
    <svg viewBox="0 0 260 260" className="w-56 h-56 sm:w-64 sm:h-64 mx-auto drop-shadow-lg">
      {Array.from({ length: n }, (_, i) => {
        const isShaded = shaded.has(i)
        return (
          <path
            key={i}
            d={wedgePath(i * sliceDeg, (i + 1) * sliceDeg)}
            fill={isShaded ? '#ec4899' : '#2d2a45'}
            stroke="#0d0d1a"
            strokeWidth="2"
            onClick={() => !disabled && onToggle?.(i)}
            className={onToggle && !disabled ? 'cursor-pointer transition-opacity hover:opacity-80' : ''}
          />
        )
      })}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke="#0d0d1a" strokeWidth="3" />
    </svg>
  )
}
