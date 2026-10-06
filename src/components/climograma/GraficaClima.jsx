// El climograma: barras de precipitación (eje derecho, mm) y línea de
// temperatura (eje izquierdo, °C) con la escala de Gaussen, 20 mm a la altura
// de 10 °C, para que un mes seco sea una barra por debajo de la línea. Por
// encima de 100 mm la escala de lluvia se reduce a la décima parte (Walter y
// Lieth); una raya discontinua marca dónde cambia.
// Al corregir marca lo que pide la pregunta: el máximo, los meses secos, etc.
import { esSeco } from '../../lib/climograma'

const W = 320, H = 236
const X0 = 34, Y0 = 196, ANCHO = 252, ALTO = 168
const COL = ANCHO / 12

// Altura de una precipitación en «unidades de grado».
const uP = p => (p <= 100 ? p / 2 : 50 + (p - 100) / 20)
const mmDe = u => (u <= 50 ? u * 2 : 100 + (u - 50) * 20)

export default function GraficaClima({ ronda, revelado, iniciales, t }) {
  const r = ronda
  const tmax = Math.max(...r.T), tmin = Math.min(...r.T)
  const bajo = Math.min(0, Math.floor(tmin / 10) * 10)
  const alto = Math.max(40, Math.ceil(Math.max(tmax, ...r.P.map(uP)) / 10) * 10)
  const Y = u => Y0 - ((u - bajo) / (alto - bajo)) * ALTO
  const X = m => X0 + COL * m + COL / 2
  const iMax = r.T.indexOf(tmax), iMin = r.T.indexOf(tmin)
  const calidos = [...r.T.keys()].sort((a, b) => r.T[b] - r.T[a]).slice(0, 3)
  const ticks = []
  for (let u = bajo; u <= alto; u += 10) ticks.push(u)
  const linea = r.T.map((v, m) => `${m ? 'L' : 'M'}${X(m)} ${Y(v)}`).join('')
  const etiqueta = (m, v, txt, c) => (
    <text x={X(m)} y={Y(v) - 8} textAnchor="middle" fontSize="10" fontWeight="800" fill={c} stroke="#0b1226" strokeWidth="3" paintOrder="stroke">{txt}</text>
  )

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={t.aria}>
      {revelado && r.pregunta === 'hemisferio' && calidos.map(m => (
        <rect key={`v${m}`} x={X0 + COL * m} y={Y0 - ALTO} width={COL} height={ALTO} fill="#FBBF24" fillOpacity=".12" />
      ))}
      {ticks.map(u => (
        <g key={u}>
          <path d={`M${X0} ${Y(u)}H${X0 + ANCHO}`} stroke={u === 0 ? '#475569' : '#1E293B'} strokeWidth="1" />
          <text x={X0 - 5} y={Y(u) + 3} textAnchor="end" fontSize="9" fill="#FCA5A5">{u}</text>
          {u >= 0 && <text x={X0 + ANCHO + 4} y={Y(u) + 3} fontSize="9" fill="#93C5FD">{mmDe(u)}</text>}
        </g>
      ))}
      {alto > 50 && <path d={`M${X0} ${Y(50)}H${X0 + ANCHO}`} stroke="#60A5FA" strokeWidth="1" strokeDasharray="3 3" strokeOpacity=".6" />}
      <text x={X0} y={Y0 - ALTO - 8} textAnchor="middle" fontSize="10" fontWeight="700" fill="#FCA5A5">°C</text>
      <text x={X0 + ANCHO + 4} y={Y0 - ALTO - 8} fontSize="10" fontWeight="700" fill="#93C5FD">mm</text>

      {/* barras de lluvia, desde el cero */}
      {r.P.map((p, m) => {
        const seco = revelado && r.pregunta === 'secos' && esSeco(p, r.T[m])
        const marcada = revelado && r.pregunta === 'lluvioso' && m === r.bueno
        return (
          <rect key={`p${m}`} x={X0 + COL * m + 3} y={Y(uP(p))} width={COL - 6} height={Math.max(0, Y(0) - Y(uP(p)))}
            fill={seco ? '#FB923C' : marcada ? '#93C5FD' : '#3B82F6'} fillOpacity={marcada || seco ? 1 : 0.8} rx="1.5" />
        )
      })}
      {iniciales.map((c, m) => <text key={`m${m}`} x={X(m)} y={Y0 + 13} textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#94A3B8">{c}</text>)}

      {/* temperatura */}
      <path d={linea} stroke="#EF4444" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
      {r.T.map((v, m) => <circle key={`t${m}`} cx={X(m)} cy={Y(v)} r="2.6" fill="#FCA5A5" />)}

      {revelado && r.pregunta === 'lluvioso' && etiqueta(r.bueno, uP(r.P[r.bueno]), `${r.P[r.bueno]} mm`, '#BFDBFE')}
      {revelado && (r.pregunta === 'calido' || r.pregunta === 'amplitud' || r.pregunta === 'hemisferio') && (
        <>
          <circle cx={X(iMax)} cy={Y(tmax)} r="5" fill="none" stroke="#FDE047" strokeWidth="2" />
          {etiqueta(iMax, tmax, `${tmax} °C`, '#FDE047')}
        </>
      )}
      {revelado && r.pregunta === 'amplitud' && (
        <>
          <circle cx={X(iMin)} cy={Y(tmin)} r="5" fill="none" stroke="#67E8F9" strokeWidth="2" />
          <text x={X(iMin)} y={Y(tmin) + 16} textAnchor="middle" fontSize="10" fontWeight="800" fill="#67E8F9" stroke="#0b1226" strokeWidth="3" paintOrder="stroke">{tmin} °C</text>
        </>
      )}
    </svg>
  )
}
