// Una ronda de Sigue la Serie. Las de figuras enseñan las figuras 1, 2 y 3
// hechas de puntos; al corregir, los fijos se ven en gris y los que se
// añaden en cada paso en color (esa es la fórmula d·n + c). Las numéricas,
// los términos en fichas con flechas que al corregir dicen «+d» o «×r».
// La usan el juego (contra reloj) y el examen (MechanicExam).
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, num } from '../../lib/sigueSerie'

const R = 4.6, PASO = 12

function Figura({ x, k, c, d, revelado, etiqueta }) {
  const filas = Math.max(c, d)
  const puntos = []
  for (let i = 0; i < c; i++) puntos.push({ cx: 0, cy: i, fijo: true })
  for (let col = 1; col <= k; col++) for (let i = 0; i < d; i++) puntos.push({ cx: col, cy: i, fijo: false })
  const alto = filas * PASO
  return (
    <g transform={`translate(${x}, ${86 - alto})`}>
      {puntos.map((p, i) => (
        <circle key={i} cx={p.cx * PASO + R} cy={p.cy * PASO + R} r={R}
          fill={!revelado ? '#CBD5E1' : p.fijo ? '#64748B' : '#F472B6'} />
      ))}
      <text x={((k + (c ? 1 : 0)) * PASO) / 2} y={alto + 22} textAnchor="middle" fontSize="11" fontWeight="800" fill="#94A3B8">{etiqueta}</text>
    </g>
  )
}

function Figuras({ r, revelado, tr }) {
  const ancho = k => (k + (r.c ? 1 : 0)) * PASO
  const xs = [14]
  xs.push(xs[0] + ancho(1) + 44)
  xs.push(xs[1] + ancho(2) + 44)
  const total = xs[2] + ancho(3) + 14
  // El lienzo empieza justo encima de la columna más alta: sin hueco arriba.
  const top = 86 - Math.max(r.c, r.d) * PASO - 8
  return (
    <div>
      <svg viewBox={`0 ${top} ${Math.max(total, 220)} ${118 - top}`} className="w-full max-w-[340px] mx-auto h-auto" role="img" aria-label={tr({ es: 'Figuras de puntos', en: 'Dot figures', ca: 'Figures de punts' })}>
        {[1, 2, 3].map((k, i) => (
          <Figura key={k} x={xs[i]} k={k} c={r.c} d={r.d} revelado={revelado}
            etiqueta={`${tr({ es: 'Fig.', en: 'Fig.', ca: 'Fig.' })} ${k} · ${r.c + k * r.d}`} />
        ))}
      </svg>
      {revelado && (
        <p className="text-center text-xs mt-1">
          <span className="text-slate-400 font-bold">● {r.c} {tr({ es: 'fijos', en: 'fixed', ca: 'fixos' })}</span>
          <span className="text-white/30"> + </span>
          <span className="text-pink-400 font-bold">● {r.d} {tr({ es: 'por figura', en: 'per figure', ca: 'per figura' })}</span>
          <span className="text-white/60 font-bold"> → {r.d}·n {r.c ? `+ ${r.c}` : ''}</span>
        </p>
      )}
    </div>
  )
}

function Terminos({ r, revelado, l }) {
  const t = r.terminos
  const salto = i => (r.clase === 'geom' ? `×${num(t[i + 1] / t[i], l)}` : r.clase === 'arit' ? `${t[i + 1] - t[i] >= 0 ? '+' : '−'}${num(Math.abs(t[i + 1] - t[i]), l)}` : `${t[i + 1] - t[i] >= 0 ? '+' : '−'}${num(Math.abs(t[i + 1] - t[i]), l)}`)
  return (
    <div className="flex items-center justify-center flex-wrap gap-y-2">
      {t.map((v, i) => (
        <div key={i} className="flex items-center">
          <div className="rounded-xl bg-white/10 border border-white/15 px-2.5 py-1.5 text-center min-w-[2.6rem]">
            <p className="text-white/35 text-[9.5px] font-bold leading-none mb-0.5">a{['₁', '₂', '₃', '₄', '₅'][i]}</p>
            <p className="text-white font-black tabular-nums leading-tight">{num(v, l)}</p>
          </div>
          {i < t.length - 1 && (
            <span className={`mx-1 text-[11px] font-black tabular-nums ${revelado ? 'text-pink-400' : 'text-white/25'}`}>{revelado ? salto(i) : '→'}</span>
          )}
        </div>
      ))}
      <span className="mx-1 text-white/40 font-black">…</span>
    </div>
  )
}

export default function PreguntaSerie({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  // El enunciado ya lleva los términos: aquí van las fichas, así que se quitan del texto.
  const texto = enunciado(r, l).replace(/^[^?¿]*…\s*/, '')
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-3 mb-3">
        {r.tipo === 'figuras' ? <Figuras r={r} revelado={revelado} tr={tr} /> : <Terminos r={r} revelado={revelado} l={l} />}
      </div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{texto}</p>
      <div className={`grid gap-2 ${r.tipo === 'tipo' ? 'grid-cols-3' : r.tipo === 'general' ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-2 rounded-xl border text-white text-[15px] font-bold tabular-nums transition-all ${clase(o)}`}>
            {textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
