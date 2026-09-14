import { useLang } from '../context/LangContext'

// Diagrama de barras del recurso de estadística: una barra por valor, con su
// frecuencia encima, y la media y la mediana marcadas donde caen.
//
// Distinto de BarChart.jsx (el del juego Estadístico Exprés), que pinta una
// barra por DATO y sin ejes: aquí los datos pueden ser cientos, lo que se
// dibuja es su frecuencia, y hacen falta el eje y las referencias para leerlo.
//
// El eje X es de categorías (un hueco por valor distinto), como en los libros.
// La media casi nunca coincide con un valor, así que su línea se coloca
// interpolando entre las dos barras que la rodean: con 1, 2, 3 y media 1,4,
// la línea va al 40 % del camino entre la barra del 1 y la del 2.

const W = 520, H = 270
const M = { izq: 34, der: 12, arr: 26, aba: 40 }

export default function DiagramaFrecuencias({ barras, media, mediana }) {
  const { lang, tr } = useLang()
  if (!barras?.length) return null

  const n = barras.length
  const fmax = Math.max(...barras.map(b => b.f))
  const anchoZona = (W - M.izq - M.der) / n
  const anchoBarra = Math.max(3, Math.min(46, anchoZona * 0.7))
  const alto = H - M.arr - M.aba
  const centro = i => M.izq + anchoZona * (i + 0.5)
  const sy = f => H - M.aba - (f / fmax) * alto

  const pasoY = Math.max(1, Math.ceil(fmax / 5))
  const marcasY = []
  for (let v = 0; v <= fmax; v += pasoY) marcasY.push(v)

  // Con muchas barras no caben todas las etiquetas: se enseña una de cada k.
  const cadaK = Math.ceil(n / 16)

  const xs = barras.map(b => b.x)
  function posicion(v) {
    if (v <= xs[0]) return centro(0)
    if (v >= xs[n - 1]) return centro(n - 1)
    const i = xs.findIndex((x, k) => x <= v && v <= xs[k + 1])
    const t = (v - xs[i]) / (xs[i + 1] - xs[i])
    return centro(i) + t * anchoZona
  }

  const referencias = [
    { v: media, nombre: 'x̄', color: '#EDAE49', dy: 0 },
    { v: mediana, nombre: 'Me', color: '#22c55e', dy: 12 },
  ].filter(r => Number.isFinite(r.v))

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" className="rounded-2xl border border-white/10 bg-[#0d1117] block"
      aria-label={tr({ es: 'Diagrama de barras de frecuencias', en: 'Frequency bar chart', ca: 'Diagrama de barres de freqüències' })}>
      {marcasY.map(v => (
        <g key={v}>
          <line x1={M.izq} y1={sy(v)} x2={W - M.der} y2={sy(v)} stroke="#ffffff10" />
          <text x={M.izq - 6} y={sy(v) + 3} fontSize="10" fill="#ffffff55" textAnchor="end">{v}</text>
        </g>
      ))}
      <line x1={M.izq} y1={H - M.aba} x2={W - M.der} y2={H - M.aba} stroke="#ffffff66" />
      <text x={M.izq - 6} y={M.arr - 12} fontSize="10" fill="#ffffff80" textAnchor="end">fᵢ</text>

      {barras.map((b, i) => (
        <g key={i}>
          <rect x={centro(i) - anchoBarra / 2} y={sy(b.f)} width={anchoBarra} height={H - M.aba - sy(b.f)} rx={3} fill="#38bdf8" opacity={0.85}>
            <title>{`${b.etiqueta(lang)}: ${b.f}`}</title>
          </rect>
          {n <= 24 && <text x={centro(i)} y={sy(b.f) - 5} fontSize="10.5" fontWeight="700" fill="#ffffffcc" textAnchor="middle">{b.f}</text>}
          {i % cadaK === 0 && (
            <text x={centro(i)} y={H - M.aba + 15} fontSize="10.5" fill="#ffffff99" textAnchor="middle">{b.etiqueta(lang)}</text>
          )}
        </g>
      ))}

      {referencias.map(r => (
        <g key={r.nombre}>
          <line x1={posicion(r.v)} y1={M.arr - 4} x2={posicion(r.v)} y2={H - M.aba} stroke={r.color} strokeWidth={2} strokeDasharray="5 4" />
          <text x={posicion(r.v)} y={H - M.aba + 30 + r.dy - 12} fontSize="10.5" fontWeight="800" fill={r.color} textAnchor="middle"
            stroke="#0d1117" strokeWidth={3} paintOrder="stroke">{r.nombre}</text>
        </g>
      ))}
    </svg>
  )
}
