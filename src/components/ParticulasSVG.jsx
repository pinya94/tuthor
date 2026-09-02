/**
 * Las partículas de una sustancia según su estado. Es la mitad del valor
 * didáctico del juego: la diferencia entre sólido, líquido y gas no es "frío,
 * templado y caliente", es cómo de juntas y de ordenadas están las partículas.
 *
 * Sólido  → rejilla ordenada, vibran en su sitio sin moverse de él
 * Líquido → juntas pero desordenadas, se deslizan unas sobre otras
 * Gas     → muy separadas y rápidas, ocupan todo el recipiente
 *
 * La animación es CSS pura, sin bucle de física: lo que hay que transmitir es
 * la diferencia entre los tres, no simular un gas de verdad.
 */

const COLOR = { solido: '#60a5fa', liquido: '#38bdf8', gas: '#a78bfa' }

// Posiciones fijas por estado. En sólido es una rejilla perfecta; en líquido,
// la misma cantidad de partículas pero descolocadas y algo más sueltas; en gas,
// muchas menos y repartidas por todo el recipiente.
const REJILLA = []
for (let f = 0; f < 4; f++) for (let c = 0; c < 6; c++) REJILLA.push([26 + c * 30, 30 + f * 26])

const LIQUIDO = REJILLA.map(([x, y], i) => [
  x + (i % 3 === 0 ? 9 : i % 3 === 1 ? -7 : 3),
  y + 22 + (i % 4 === 0 ? -6 : i % 4 === 2 ? 7 : 0),
])

const GAS = [
  [30, 26], [96, 18], [158, 34], [54, 62], [124, 76], [176, 58],
  [22, 104], [78, 118], [140, 110], [186, 96], [58, 20], [110, 132],
]

export default function ParticulasSVG({ estado, className = '' }) {
  const puntos = estado === 'solido' ? REJILLA : estado === 'liquido' ? LIQUIDO : GAS
  const r = estado === 'gas' ? 7 : 8
  const color = COLOR[estado]

  return (
    <svg viewBox="0 0 200 150" className={`w-full h-auto ${className}`} role="img">
      <style>{`
        @keyframes vibra { 0%,100% { transform: translate(0,0) } 25% { transform: translate(1px,-1px) } 75% { transform: translate(-1px,1px) } }
        @keyframes fluye { 0%,100% { transform: translate(0,0) } 33% { transform: translate(5px,3px) } 66% { transform: translate(-4px,-2px) } }
        @keyframes vuela { 0%,100% { transform: translate(0,0) } 25% { transform: translate(14px,-10px) } 50% { transform: translate(-8px,12px) } 75% { transform: translate(10px,7px) } }
        .p-solido { animation: vibra .6s ease-in-out infinite }
        .p-liquido { animation: fluye 2.4s ease-in-out infinite }
        .p-gas { animation: vuela 3.2s ease-in-out infinite }
        @media (prefers-reduced-motion: reduce) { .p-solido, .p-liquido, .p-gas { animation: none } }
      `}</style>

      {/* El recipiente: en sólido y líquido la sustancia se queda abajo; el gas
          lo llena entero, que es justo lo que hay que ver. */}
      <rect x="6" y="6" width="188" height="138" rx="10" fill="#ffffff08" stroke="#ffffff22" strokeWidth="2" />

      {puntos.map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill={color} className={`p-${estado}`}
          style={{ animationDelay: `${(i % 7) * 0.13}s` }} />
      ))}
    </svg>
  )
}
