// Una ronda de Sigue la Serie (ver lib/sigueSerie): las figuras de puntos o
// los términos en fichas, y debajo la mecánica: teclear el número, dibujar la
// figura 4 en una rejilla, construir la fórmula con − y + viendo los términos
// que da, o clasificar tres series. La usan el juego y el examen.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { enunciado, explicacion, num, esCorrecta, figura, formulaDe, terminosDe, FIGURA_DIBUJO } from '../../lib/sigueSerie'

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

const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const tecla = 'rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-white text-lg font-black py-2.5'
const CLASES = { arit: { es: 'Aritmética', en: 'Arithmetic', ca: 'Aritmètica' }, geom: { es: 'Geométrica', en: 'Geometric', ca: 'Geomètrica' }, ninguna: { es: 'Ninguna', en: 'Neither', ca: 'Cap' } }

function Escribe({ r, revelado, elegida, onResponder, tr, l }) {
  const [v, setV] = useState('')
  const pulsa = t => setV(x => (t === '⌫' ? x.slice(0, -1) : t === '−' ? (x.startsWith('−') ? x.slice(1) : '−' + x) : x.length < 9 ? x + t : x))
  const ok = revelado && esCorrecta(r, elegida)
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l).replace(/^[^?¿]*…\s*/, '')}</p>
      <div className="rounded-xl bg-white/5 border border-white/10 py-3 mb-3 text-center">
        <span className={`font-black text-3xl tabular-nums ${revelado ? (ok ? 'text-green-300' : 'text-red-300') : 'text-amber-300'}`}>{(revelado ? elegida : v) || '?'}</span>
        {revelado && !ok && <span className="block text-green-300 text-sm font-bold">{num(r.bueno, l)}</span>}
      </div>
      {!revelado && (
        <>
          <div className="grid grid-cols-4 gap-1.5 mb-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '−', '⌫'].map(t => <button key={t} className={tecla} onClick={() => pulsa(t)}>{t}</button>)}
          </div>
          <button className={boton} disabled={!v || v === '−'} onClick={() => onResponder(v)}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </>
      )}
    </>
  )
}

function Dibuja({ r, revelado, onResponder, tr, l }) {
  const filas = Math.max(r.c, r.d)
  const cols = FIGURA_DIBUJO + 1
  const meta = new Set(figura(r.c, r.d, FIGURA_DIBUJO))
  const [puestos, setPuestos] = useState([])
  const toca = k => !revelado && setPuestos(p => (p.includes(k) ? p.filter(x => x !== k) : [...p, k]))
  const bien = puestos.length === meta.size && puestos.every(k => meta.has(k))
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="rounded-xl bg-white/5 border border-white/10 p-3 mb-3">
        <div className="grid gap-1 mx-auto w-fit" style={{ gridTemplateColumns: `repeat(${cols}, 2rem)` }}>
          {Array.from({ length: filas }, (_, fila) => filas - 1 - fila).flatMap(i => Array.from({ length: cols }, (_, col) => {
            const k = `${col}:${i}`
            const p = puestos.includes(k), m = meta.has(k)
            const fondo = !revelado ? (p ? 'bg-pink-400' : 'bg-white/10') : p && m ? 'bg-green-400' : p ? 'bg-red-400' : m ? 'bg-amber-400/60' : 'bg-white/5'
            return <button key={k} onClick={() => toca(k)} className={`w-8 h-8 rounded-full transition-colors ${fondo}`} aria-label={k} />
          }))}
        </div>
        <p className="text-center text-xs text-white/50 mt-2">{tr({ es: `Figura ${FIGURA_DIBUJO}`, en: `Figure ${FIGURA_DIBUJO}`, ca: `Figura ${FIGURA_DIBUJO}` })} · {puestos.length} {tr({ es: 'puntos', en: 'dots', ca: 'punts' })}</p>
      </div>
      {!revelado && <button className={boton} disabled={!puestos.length} onClick={() => onResponder(bien ? 'dibuja:ok' : 'dibuja:no')}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>}
    </>
  )
}

function Formula({ r, revelado, onResponder, tr, l }) {
  const geom = r.clase === 'geom'
  const [x, setX] = useState(1)
  const [y, setY] = useState(geom ? 2 : 0)
  const mios = terminosDe(r, x, y)
  const Paso = ({ v, set, min, etiqueta }) => (
    <div className="flex items-center gap-1.5">
      <span className="text-white/60 text-sm font-bold w-6 text-right">{etiqueta}</span>
      <button className={`${tecla} w-10`} onClick={() => set(Math.max(min, v - 1))}>−</button>
      <span className="text-amber-300 font-black text-xl w-9 text-center tabular-nums">{num(v, l)}</span>
      <button className={`${tecla} w-10`} onClick={() => set(v + 1)}>+</button>
    </div>
  )
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      <div className="rounded-xl bg-white/5 border border-white/10 py-3 px-2 mb-3 text-center">
        <p className="text-white font-black text-2xl">aₙ = <span className="text-amber-300">{formulaDe(r, x, y)}</span></p>
        <div className="flex justify-center gap-1.5 mt-2 flex-wrap">
          {mios.map((v, i) => (
            <span key={i} className={`rounded-lg px-2 py-1 text-sm font-black tabular-nums ${v === r.terminos[i] ? 'bg-green-500/25 text-green-200' : 'bg-white/10 text-white/70'}`}>{num(v, l)}</span>
          ))}
        </div>
        <p className="text-white/40 text-[11px] mt-1">{tr({ es: 'Lo que da tu fórmula para n = 1, 2, 3, 4', en: 'What your formula gives for n = 1, 2, 3, 4', ca: 'El que dona la teva fórmula per a n = 1, 2, 3, 4' })}</p>
      </div>
      {!revelado && (
        <>
          <div className="flex flex-col items-center gap-2 mb-3">
            {/* Aritmética: d·n + c. Geométrica: a · rⁿ⁻¹. */}
            {Paso({ v: x, set: setX, min: geom ? 1 : -9, etiqueta: geom ? 'a' : 'd' })}
            {Paso({ v: y, set: setY, min: geom ? 2 : -30, etiqueta: geom ? 'r' : 'c' })}
          </div>
          <button className={boton} onClick={() => onResponder(formulaDe(r, x, y))}>{tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}</button>
        </>
      )}
      {revelado && <p className="text-green-300 text-sm font-bold text-center">aₙ = {r.bueno}</p>}
    </>
  )
}

function Clasifica({ r, revelado, onResponder, l }) {
  const [puestas, setPuestas] = useState({})
  const activa = r.series.findIndex((_, i) => puestas[i] == null)
  const colocar = c => {
    if (revelado || activa < 0) return
    const n = { ...puestas, [activa]: c }
    setPuestas(n)
    if (r.series.every((_, i) => n[i] != null)) onResponder(`clasifica:${r.series.filter((x, i) => n[i] !== x.clase).length}`)
  }
  return (
    <>
      <p className="text-white font-bold text-center mb-2 leading-snug">{enunciado(r, l)}</p>
      {activa >= 0 && !revelado && (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-3 mb-3"><Terminos r={r.series[activa]} revelado={false} l={l} /></div>
      )}
      <div className="grid grid-cols-3 gap-2">
        {r.cajas.map(c => (
          <button key={c} disabled={revelado || activa < 0} onClick={() => colocar(c)} className="rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-1.5 py-2 min-h-[4rem] text-left">
            <span className="block text-white text-[12.5px] font-black">{CLASES[c][l] ?? CLASES[c].es}</span>
            {r.series.map((x, i) => puestas[i] === c && (
              <span key={i} className={`block mt-1 rounded-md px-1 py-0.5 text-[10.5px] font-bold text-white tabular-nums ${revelado ? (x.clase === c ? 'bg-green-500/30 ring-1 ring-green-400' : 'bg-red-500/30 ring-1 ring-red-400') : 'bg-white/15'}`}>{x.terminos.slice(0, 3).map(t => num(t, l)).join(', ')}…</span>
            ))}
          </button>
        ))}
      </div>
    </>
  )
}

export default function PreguntaSerie({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const props = { r, revelado, elegida, onResponder, tr, l }
  const dibujo = r.sub === 'figuras' ? <Figuras r={r} revelado={revelado} tr={tr} /> : r.terminos ? <Terminos r={r} revelado={revelado} l={l} /> : null
  return (
    <div className="w-full">
      {dibujo && <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-3 mb-3">{dibujo}</div>}
      {r.tipo === 'escribe' ? <Escribe {...props} />
        : r.tipo === 'dibuja' ? <Dibuja {...props} />
        : r.tipo === 'formula' ? <Formula {...props} />
        : <Clasifica {...props} />}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
