// La gráfica de Lee el movimiento: x-t o v-t con cuadrícula y escalas de
// verdad, y los tres tramos A, B y C en color. Al corregir enseña la cuenta:
// el triángulo de la pendiente (Δy ÷ Δt) o el área sombreada bajo la v-t.
const W = 320, H = 236
const X0 = 40, Y0 = 200, ANCHO = 266, ALTO = 176
const COLOR = ['#60A5FA', '#F472B6', '#FBBF24']
const LETRA = ['A', 'B', 'C']

function paso(max) {
  for (const p of [1, 2, 4, 5, 10]) if (max / p <= 8) return p
  return 10
}

export default function GraficaMovimiento({ ronda, revelado, t }) {
  const r = ronda
  const tMax = r.pts[3][0]
  const yPaso = paso(Math.max(...r.pts.map(([, y]) => y), 4))
  const yMax = Math.ceil(Math.max(...r.pts.map(([, y]) => y), 4) / yPaso) * yPaso
  const X = s => X0 + (s / tMax) * ANCHO
  const Y = v => Y0 - (v / yMax) * ALTO
  const marcado = r.tipo === 'rapido' ? -1 : r.tramo

  // Sombreado del área (preguntas de área): un tramo o todos.
  const tramosArea = r.tipo === 'area' && revelado ? (r.total ? [0, 1, 2] : [r.tramo]) : []
  const triangulo = revelado && (r.tipo === 'velocidad' || r.tipo === 'aceleracion')

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={t.aria}>
      {/* cuadrícula */}
      {Array.from({ length: tMax + 1 }, (_, s) => (
        <g key={`t${s}`}>
          <path d={`M${X(s)} ${Y0}V${Y0 - ALTO}`} stroke="#1E293B" strokeWidth="1" />
          {(tMax <= 10 || s % 2 === 0) && <text x={X(s)} y={Y0 + 13} textAnchor="middle" fontSize="9" fill="#94A3B8">{s}</text>}
        </g>
      ))}
      {Array.from({ length: yMax / yPaso + 1 }, (_, k) => (
        <g key={`y${k}`}>
          <path d={`M${X0} ${Y(k * yPaso)}H${X0 + ANCHO}`} stroke="#1E293B" strokeWidth="1" />
          <text x={X0 - 5} y={Y(k * yPaso) + 3} textAnchor="end" fontSize="9" fill="#94A3B8">{k * yPaso}</text>
        </g>
      ))}
      <path d={`M${X0} ${Y0 - ALTO - 6}V${Y0}H${X0 + ANCHO + 6}`} stroke="#94A3B8" strokeWidth="2" fill="none" />
      <text x={X0 + 4} y={Y0 - ALTO - 8} fontSize="10.5" fontWeight="700" fill="#CBD5E1">{r.eje === 'x' ? 'x (m)' : 'v (m/s)'}</text>
      <text x={X0 + ANCHO} y={Y0 + 26} textAnchor="end" fontSize="10.5" fontWeight="700" fill="#CBD5E1">t (s)</text>

      {/* área bajo la v-t */}
      {tramosArea.map(i => {
        const [a, b] = [r.pts[i], r.pts[i + 1]]
        return <path key={`a${i}`} d={`M${X(a[0])} ${Y0}L${X(a[0])} ${Y(a[1])}L${X(b[0])} ${Y(b[1])}L${X(b[0])} ${Y0}Z`} fill={COLOR[i]} fillOpacity=".28" />
      })}

      {/* los tramos */}
      {[0, 1, 2].map(i => {
        const [a, b] = [r.pts[i], r.pts[i + 1]]
        const grueso = i === marcado || (revelado && r.tipo === 'rapido' && LETRA[i] === r.bueno)
        const mx = (X(a[0]) + X(b[0])) / 2, my = (Y(a[1]) + Y(b[1])) / 2
        // la etiqueta va encima del tramo salvo si se saldría por arriba del dibujo
        const ly = my - 13 < Y0 - ALTO + 10 ? my + 16 : my - 13
        return (
          <g key={i}>
            <line x1={X(a[0])} y1={Y(a[1])} x2={X(b[0])} y2={Y(b[1])} stroke={COLOR[i]} strokeWidth={grueso ? 5 : 3} strokeLinecap="round" />
            <circle cx={mx} cy={ly} r="9" fill="#0b1226" stroke={COLOR[i]} strokeWidth={grueso ? 2.5 : 1.5} />
            <text x={mx} y={ly + 3.5} textAnchor="middle" fontSize="10.5" fontWeight="800" fill={COLOR[i]}>{LETRA[i]}</text>
            {revelado && r.tipo === 'recorrido' && <text x={mx + 12} y={my + 14} fontSize="9.5" fontWeight="700" fill="#BBF7D0">{Math.abs(b[1] - a[1])} m</text>}
          </g>
        )
      })}
      {r.pts.map(([s, v], i) => <circle key={`p${i}`} cx={X(s)} cy={Y(v)} r="3" fill="#F8FAFC" />)}

      {/* triángulo de la pendiente; los valores van arriba, fuera del dibujo, para no pisar tramos ni etiquetas */}
      {triangulo && (() => {
        const [a, b] = [r.pts[r.tramo], r.pts[r.tramo + 1]]
        return (
          <g>
            <path d={`M${X(a[0])} ${Y(a[1])}H${X(b[0])}V${Y(b[1])}`} stroke="#4ADE80" strokeWidth="1.8" strokeDasharray="4 3" fill="none" />
            <text x={X0 + ANCHO} y={Y0 - ALTO - 8} textAnchor="end" fontSize="10.5" fontWeight="800" fill="#4ADE80">{r.eje === 'x' ? 'Δx' : 'Δv'} = {b[1] - a[1]} {r.eje === 'x' ? 'm' : 'm/s'} · Δt = {b[0] - a[0]} s</text>
          </g>
        )
      })()}
    </svg>
  )
}
