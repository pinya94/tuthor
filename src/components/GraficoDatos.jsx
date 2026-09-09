// Un gráfico de datos de verdad: con ejes, escala y etiquetas.
//
// No es el BarChart de Estadístico Exprés, que a propósito no tiene ejes
// —allí las barras solo ilustran una lista de números que ya están escritos
// debajo—. Aquí el gráfico ES el enunciado: si no se puede leer el eje, la
// pregunta no se puede contestar. Por eso lleva escala en el eje Y, etiquetas
// en el X y una leyenda cuando hay dos series.
//
// EL EJE TRUNCADO. Con `ejeTruncado`, el eje Y no empieza en cero: arranca un
// poco por debajo del valor más bajo. La gráfica pasa a parecer un despegue
// cuando en realidad sube un 3 %. Es la manipulación más habitual en prensa y
// en presentaciones de empresa, y va marcada con un cero tachado en el eje —
// visible, no escondida: el objetivo es que el alumno aprenda a buscar esa
// marca, no engañarle.
import { useId } from 'react'

const W = 320
const H = 190
// `top` deja aire para las cifras encima de las barras.
const M = { top: 18, right: 10, bottom: 26, left: 40 }

const COLOR_A = '#2dd4bf' // teal-400
const COLOR_B = '#fbbf24' // amber-400

export default function GraficoDatos({
  valores, segunda = null, etiquetas, tipo = 'linea',
  ejeTruncado = false, marcar = [], formatEje = v => v, titulo = null,
  // Da NOMBRE a las dos series. Sin esto salían "A" y "B", y una pregunta
  // sobre dos líneas anónimas no significa nada: la gracia de comparar
  // ingresos con gastos es justamente que se llamen ingresos y gastos.
  leyenda = null,
  // Cada barra con su cifra encima. Se usa cuando la pregunta exige RESTAR
  // dos barras: ahí el ejercicio es la relación entre ellas, no medir píxeles
  // contra la cuadrícula.
  etiquetarValores = false,
}) {
  const id = useId()
  const todos = [...valores, ...(segunda ?? [])]
  const maxDato = Math.max(...todos)
  const minDato = Math.min(...todos)

  // Con el eje entero se respira por arriba; con el truncado, el suelo sube.
  const max = maxDato + Math.max(1, Math.round((maxDato - minDato) * 0.15))
  const min = ejeTruncado ? Math.max(0, minDato - Math.max(1, Math.round((maxDato - minDato) * 0.2))) : 0

  const anchoUtil = W - M.left - M.right
  const altoUtil = H - M.top - M.bottom
  const x = i => M.left + (valores.length === 1 ? anchoUtil / 2 : (anchoUtil * i) / (valores.length - 1))
  const y = v => M.top + altoUtil - ((v - min) / (max - min || 1)) * altoUtil

  // Cuatro marcas de eje: suficientes para leer la escala, pocas para no
  // convertir el fondo en una rejilla ilegible en el móvil.
  const ticks = Array.from({ length: 4 }, (_, i) => min + ((max - min) * i) / 3)

  // En barras cada valor ocupa una banda, no un punto: se reparte el ancho.
  const banda = anchoUtil / valores.length
  const anchoBarra = Math.max(6, banda * (segunda ? 0.32 : 0.55))
  const xBanda = i => M.left + banda * i + banda / 2

  const puntoX = tipo === 'barras' ? xBanda : x

  return (
    <div className="w-full">
      {titulo && <p className="text-white/45 text-[11.5px] font-semibold text-center mb-1">{titulo}</p>}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={titulo ?? 'gráfico'}>
        {/* Líneas de referencia y escala */}
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={M.left} x2={W - M.right} y1={y(t)} y2={y(t)} stroke="rgba(255,255,255,0.09)" strokeWidth="1" />
            <text x={M.left - 5} y={y(t) + 3.5} textAnchor="end" fontSize="9" fill="rgba(255,255,255,0.45)">
              {formatEje(Math.round(t))}
            </text>
          </g>
        ))}

        {/* Eje Y y aviso de truncado */}
        <line x1={M.left} x2={M.left} y1={M.top} y2={H - M.bottom} stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        {/* La rotura de eje, con el símbolo estándar de dos diagonales sobre
            el propio eje. La primera versión escribía además un "0" ámbar
            junto al origen y se solapaba con la etiqueta más baja de la
            escala: dos números encima del otro, ilegibles los dos. La señal
            en texto ya la da la página debajo del gráfico. */}
        {ejeTruncado && (
          <g aria-label="el eje no empieza en cero">
            <line x1={M.left - 5} x2={M.left + 5} y1={H - M.bottom - 4} y2={H - M.bottom - 10}
              stroke="#fbbf24" strokeWidth="1.4" />
            <line x1={M.left - 5} x2={M.left + 5} y1={H - M.bottom - 1} y2={H - M.bottom - 7}
              stroke="#fbbf24" strokeWidth="1.4" />
          </g>
        )}

        {/* Los puntos marcados por la pregunta, resaltados por detrás */}
        {marcar.map(i => (
          <rect key={`m${i}`} x={puntoX(i) - banda / 2 + 1} y={M.top} width={banda - 2} height={altoUtil}
            fill="rgba(45,212,191,0.10)" rx="3" />
        ))}

        {tipo === 'barras' ? (
          <>
            {valores.map((v, i) => (
              <g key={`a${i}`}>
                <rect x={xBanda(i) - (segunda ? anchoBarra + 1 : anchoBarra / 2)} y={y(v)}
                  width={anchoBarra} height={Math.max(1, H - M.bottom - y(v))} fill={COLOR_A} rx="2" />
                {etiquetarValores && (
                  <text x={xBanda(i) - (segunda ? anchoBarra / 2 + 1 : 0)} y={y(v) - 3} textAnchor="middle"
                    fontSize="7" fill={COLOR_A} fontWeight="700">{formatEje(v)}</text>
                )}
              </g>
            ))}
            {segunda?.map((v, i) => (
              <g key={`b${i}`}>
                <rect x={xBanda(i) + 1} y={y(v)}
                  width={anchoBarra} height={Math.max(1, H - M.bottom - y(v))} fill={COLOR_B} rx="2" />
                {etiquetarValores && (
                  <text x={xBanda(i) + anchoBarra / 2 + 1} y={y(v) - 3} textAnchor="middle"
                    fontSize="7" fill={COLOR_B} fontWeight="700">{formatEje(v)}</text>
                )}
              </g>
            ))}
          </>
        ) : (
          <>
            <polyline fill="none" stroke={COLOR_A} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"
              points={valores.map((v, i) => `${x(i)},${y(v)}`).join(' ')} />
            {valores.map((v, i) => <circle key={`pa${i}`} cx={x(i)} cy={y(v)} r="3" fill={COLOR_A} />)}
            {segunda && (
              <>
                <polyline fill="none" stroke={COLOR_B} strokeWidth="2.2" strokeDasharray="5 3"
                  strokeLinejoin="round" strokeLinecap="round"
                  points={segunda.map((v, i) => `${x(i)},${y(v)}`).join(' ')} />
                {segunda.map((v, i) => <circle key={`pb${i}`} cx={x(i)} cy={y(v)} r="3" fill={COLOR_B} />)}
              </>
            )}
          </>
        )}

        {/* Eje X. Con muchas etiquetas se rota el texto en vez de encogerlo
            hasta lo ilegible o de quitar una de cada dos: se necesitan todas,
            porque las respuestas SON las etiquetas. */}
        <line x1={M.left} x2={W - M.right} y1={H - M.bottom} y2={H - M.bottom} stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
        {etiquetas.map((e, i) => (
          <text key={`x${i}`} x={puntoX(i)} y={H - M.bottom + 12} textAnchor="middle" fontSize="8.5"
            fill={marcar.includes(i) ? '#2dd4bf' : 'rgba(255,255,255,0.5)'}
            fontWeight={marcar.includes(i) ? '700' : '400'}>
            {e}
          </text>
        ))}
        <desc id={id}>Gráfico de {valores.length} valores</desc>
      </svg>

      {segunda && (
        <div className="flex items-center justify-center gap-4 mt-1">
          <span className="flex items-center gap-1.5 text-[11px] text-white/60">
            <span className="w-3 h-[3px] rounded" style={{ background: COLOR_A }} /> {leyenda?.[0] ?? 'A'}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-white/60">
            <span className="w-3 h-[3px] rounded" style={{ background: COLOR_B }} /> {leyenda?.[1] ?? 'B'}
          </span>
        </div>
      )}
    </div>
  )
}
