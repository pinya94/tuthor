import { useId } from 'react'
import { useLang } from '../context/LangContext'
import { COLOR_PUNTO } from '../lib/recursoFunciones'

// Plano cartesiano del recurso de funciones. A diferencia del de Caza la
// Función (AjustaGrafica.jsx), aquí el rango no es fijo: lo decide lo que
// escribe el alumno. Una parábola con el vértice en (15, −25) tiene que verse
// entera, así que los ejes, la rejilla y sus números se calculan cada vez.
//
// Props:
//   funciones  [{ f, color }]            curvas a dibujar
//   verticales [{ x, color }]            rectas x = k (no son funciones)
//   puntos     [{ x, y, clase, texto }]  puntos destacados, con su etiqueta
//   rango      { xmin, xmax, ymin, ymax }

const W = 520, H = 380, M = 30

// Paso "redondo" de la rejilla: 1, 2 o 5 por una potencia de diez, para que
// los números de los ejes sean los que pondría alguien a mano.
function pasoRejilla(span, marcas = 8) {
  const bruto = span / marcas
  const mag = 10 ** Math.floor(Math.log10(bruto))
  const n = bruto / mag
  return (n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10) * mag
}

const multiplos = (min, max, paso) => {
  const out = []
  for (let v = Math.ceil(min / paso) * paso; v <= max + 1e-9; v += paso) out.push(Math.abs(v) < paso / 1e6 ? 0 : v)
  return out
}

const etiquetaNum = v => {
  const s = Number.isInteger(v) ? String(v) : String(+v.toFixed(4))
  return s.replace('-', '−')
}

export default function PlanoFunciones({ funciones = [], verticales = [], puntos = [], rango }) {
  const { lang } = useLang()
  const clip = useId()
  const { xmin, xmax, ymin, ymax } = rango
  const sx = x => M + ((x - xmin) / (xmax - xmin)) * (W - 2 * M)
  const sy = y => H - M - ((y - ymin) / (ymax - ymin)) * (H - 2 * M)

  const px = pasoRejilla(xmax - xmin)
  const py = pasoRejilla(ymax - ymin)
  // Los ejes se dibujan donde están si caen dentro; si no, pegados al borde,
  // para que los números sigan viéndose.
  const ejeY = Math.min(Math.max(0, xmin), xmax)
  const ejeX = Math.min(Math.max(0, ymin), ymax)

  // La curva se muestrea y se parte en tramos donde deja de existir (√x con x
  // negativa) o donde salta de un extremo al otro (la asíntota de 1/x): unir
  // esos puntos dibujaría una pared vertical que no es parte de la función.
  function tramos(f) {
    const N = 700
    const span = ymax - ymin
    const out = []
    let actual = []
    let prev = null
    for (let k = 0; k <= N; k++) {
      const x = xmin + ((xmax - xmin) * k) / N
      const y = f(x)
      const valido = Number.isFinite(y) && Math.abs(y) < 1e7
      const salto = prev !== null && valido && Math.abs(y - prev) > span * 3
      if (!valido || salto) {
        if (actual.length > 1) out.push(actual)
        actual = []
      }
      if (valido) actual.push(`${sx(x).toFixed(1)},${sy(Math.max(ymin - span * 2, Math.min(ymax + span * 2, y))).toFixed(1)}`)
      prev = valido ? y : null
    }
    if (actual.length > 1) out.push(actual)
    return out
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img"
      aria-label={puntos.map(p => p.texto?.[lang] ?? '').join(', ')}
      className="rounded-2xl border border-white/10 bg-[#0d1117] block">
      <defs>
        <clipPath id={clip}><rect x={M} y={M} width={W - 2 * M} height={H - 2 * M} /></clipPath>
      </defs>

      {multiplos(xmin, xmax, px).map(v => (
        <line key={`gx${v}`} x1={sx(v)} y1={M} x2={sx(v)} y2={H - M} stroke="#ffffff0f" />
      ))}
      {multiplos(ymin, ymax, py).map(v => (
        <line key={`gy${v}`} x1={M} y1={sy(v)} x2={W - M} y2={sy(v)} stroke="#ffffff0f" />
      ))}

      <line x1={M} y1={sy(ejeX)} x2={W - M} y2={sy(ejeX)} stroke="#ffffff66" strokeWidth={1.3} />
      <line x1={sx(ejeY)} y1={M} x2={sx(ejeY)} y2={H - M} stroke="#ffffff66" strokeWidth={1.3} />
      <text x={W - M + 4} y={sy(ejeX) + 4} fontSize="12" fill="#ffffff80">x</text>
      <text x={sx(ejeY) - 4} y={M - 8} fontSize="12" fill="#ffffff80" textAnchor="middle">y</text>

      {multiplos(xmin, xmax, px).filter(v => v !== 0).map(v => (
        <text key={`lx${v}`} x={sx(v)} y={sy(ejeX) + 13} fontSize="9.5" fill="#ffffff55" textAnchor="middle">{etiquetaNum(v)}</text>
      ))}
      {multiplos(ymin, ymax, py).filter(v => v !== 0).map(v => (
        <text key={`ly${v}`} x={sx(ejeY) - 5} y={sy(v) + 3} fontSize="9.5" fill="#ffffff55" textAnchor="end">{etiquetaNum(v)}</text>
      ))}

      <g clipPath={`url(#${clip})`}>
        {verticales.map((v, i) => (
          <line key={`v${i}`} x1={sx(v.x)} y1={M} x2={sx(v.x)} y2={H - M} stroke={v.color} strokeWidth={2.5} />
        ))}
        {funciones.map((fn, i) => tramos(fn.f).map((t, j) => (
          <polyline key={`f${i}-${j}`} points={t.join(' ')} fill="none" stroke={fn.color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
        )))}
        {puntos.filter(p => Number.isFinite(p.x) && Number.isFinite(p.y)).map((p, i) => {
          const cx = sx(p.x), cy = sy(p.y)
          // La etiqueta se va hacia dentro del plano cerca de los bordes.
          const derecha = cx < W - 130
          return (
            <g key={`p${i}`}>
              <circle cx={cx} cy={cy} r={5.5} fill={COLOR_PUNTO[p.clase] ?? '#fff'} stroke="#0d1117" strokeWidth={2}>
                <title>{p.etiqueta?.[lang]} {p.texto?.[lang]}</title>
              </circle>
              <text x={cx + (derecha ? 9 : -9)} y={cy - 9} fontSize="11" fontWeight="700"
                fill={COLOR_PUNTO[p.clase] ?? '#fff'} textAnchor={derecha ? 'start' : 'end'}
                stroke="#0d1117" strokeWidth={3} paintOrder="stroke">
                {p.texto?.[lang]}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
