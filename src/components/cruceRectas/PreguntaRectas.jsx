// Una ronda de Cruce de Rectas (ver lib/cruceRectas). Cuadrícula de puntos
// enteros: en medio/difícil se dibuja cada recta tocando dos puntos que
// cumplan su ecuación; después se toca el punto de corte (o, en difícil, se
// dice que son paralelas o la misma recta) y se comprueba.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { cumple, ecuacion, esCorrecta, explicacion, porQueNo } from '../../lib/cruceRectas'

const CELDA = 30, M = 22
const C1 = '#fbbf24', C2 = '#38bdf8'

// Segmento de la recta por p y q recortado al recuadro de la cuadrícula
function recorte(p, q, lo, hi) {
  const d = [q[0] - p[0], q[1] - p[1]]
  let t0 = -Infinity, t1 = Infinity
  for (const k of [0, 1]) {
    if (d[k] === 0) continue
    const a = (lo - p[k]) / d[k], b = (hi - p[k]) / d[k]
    t0 = Math.max(t0, Math.min(a, b)); t1 = Math.min(t1, Math.max(a, b))
  }
  return [[p[0] + t0 * d[0], p[1] + t0 * d[1]], [p[0] + t1 * d[0], p[1] + t1 * d[1]]]
}
// Dos puntos de una recta, para dibujarla ya hecha (nivel fácil y al corregir)
function dosPuntos({ a, b, c }, min, max) {
  const out = []
  for (let x = min; x <= max && out.length < 2; x++) {
    const y = (c - a * x) / b
    if (Number.isInteger(y) && y >= min && y <= max) out.push([x, y])
  }
  return out
}

function Ecuacion({ e, color, hecha, activa, l }) {
  return (
    <div className={`flex-1 rounded-xl px-2 py-2 text-center border ${activa ? 'border-white/40 bg-white/10' : 'border-white/10 bg-white/5'}`}>
      <p className="font-black text-lg tabular-nums" style={{ color }}>{ecuacion(e)}</p>
      {hecha !== undefined && <p className="text-[11px] text-white/50 font-bold">{hecha >= 2 ? (l === 'en' ? '✓ drawn' : l === 'ca' ? '✓ dibuixada' : '✓ dibujada') : `${hecha}/2`}</p>}
    </div>
  )
}

export default function PreguntaRectas({ ronda: r, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const [p1, setP1] = useState([])
  const [p2, setP2] = useState([])
  const [eleccion, setEleccion] = useState(null)
  const [aviso, setAviso] = useState(null) // { p, texto }

  const fase = !r.dibuja ? 'corte' : p1.length < 2 ? 'r1' : p2.length < 2 ? 'r2' : 'corte'
  const lo = r.min - 0.4, hi = r.max + 0.4
  const lado = (r.max - r.min) * CELDA + 2 * M
  const px = x => M + (x - r.min) * CELDA
  const py = y => M + (r.max - y) * CELDA

  function toca(x, y) {
    if (revelado) return
    const p = [x, y]
    if (fase === 'corte') { setEleccion(`p:${x},${y}`); setAviso(null); return }
    const e = fase === 'r1' ? r.e1 : r.e2
    const ya = fase === 'r1' ? p1 : p2
    if (ya.some(q => q[0] === x && q[1] === y)) return
    if (!cumple(e, p)) { setAviso({ p, texto: porQueNo(e, p, l) }); return }
    setAviso(null)
    if (fase === 'r1') setP1(v => [...v, p]); else setP2(v => [...v, p])
  }

  const linea = (pts, color) => {
    if (pts.length < 2) return null
    const [a, b] = recorte(pts[0], pts[1], lo, hi)
    return <line x1={px(a[0])} y1={py(a[1])} x2={px(b[0])} y2={py(b[1])} stroke={color} strokeWidth={3.5} strokeLinecap="round" />
  }
  const l1 = r.dibuja ? p1 : dosPuntos(r.e1, r.min, r.max)
  const l2 = r.dibuja ? p2 : dosPuntos(r.e2, r.min, r.max)
  const acierto = revelado && esCorrecta(r, eleccion)
  const ticks = []
  for (let v = r.min; v <= r.max; v++) if (v !== 0 && (r.max - r.min <= 8 || v % 2 === 0)) ticks.push(v)
  const elegido = eleccion?.startsWith('p:') ? eleccion.slice(2).split(',').map(Number) : null

  const pista = fase === 'r1'
    ? tr({ es: 'Dibuja la recta amarilla: toca dos puntos que cumplan su ecuación', en: 'Draw the yellow line: tap two points that satisfy its equation', ca: 'Dibuixa la recta groga: toca dos punts que compleixin la seva equació' })
    : fase === 'r2'
      ? tr({ es: 'Ahora la azul: otros dos puntos que cumplan su ecuación', en: 'Now the blue one: two points that satisfy its equation', ca: 'Ara la blava: dos punts que compleixin la seva equació' })
      : r.especiales
        ? tr({ es: 'Toca el punto donde se cortan… o di si no se cortan nunca o son la misma recta', en: 'Tap the point where they cross… or say if they never meet or are the same line', ca: 'Toca el punt on es tallen… o digues si no es tallen mai o són la mateixa recta' })
        : tr({ es: 'Toca el punto donde se cortan las dos rectas', en: 'Tap the point where the two lines cross', ca: 'Toca el punt on es tallen les dues rectes' })

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-2">
        <Ecuacion e={r.e1} color={C1} hecha={r.dibuja ? p1.length : undefined} activa={!revelado && fase === 'r1'} l={l} />
        <Ecuacion e={r.e2} color={C2} hecha={r.dibuja ? p2.length : undefined} activa={!revelado && fase === 'r2'} l={l} />
      </div>
      {/* Altura fija de dos líneas: si la pista cambia de largo entre fases, la
          cuadrícula no se mueve bajo el dedo */}
      {!revelado && <p className="text-center text-sm text-white/75 font-bold mb-2 leading-snug min-h-[2.5rem] flex items-center justify-center">{pista}</p>}

      <div className="rounded-2xl border border-white/10 bg-[#0b1530] overflow-hidden">
        <svg viewBox={`0 0 ${lado} ${lado}`} className="w-full h-auto block select-none" role="img"
          aria-label={tr({ es: 'Cuadrícula de coordenadas', en: 'Coordinate grid', ca: 'Quadrícula de coordenades' })}>
          {Array.from({ length: r.max - r.min + 1 }, (_, i) => r.min + i).map(v => (
            <g key={v}>
              <line x1={px(v)} y1={py(r.min)} x2={px(v)} y2={py(r.max)} stroke="#ffffff14" />
              <line x1={px(r.min)} y1={py(v)} x2={px(r.max)} y2={py(v)} stroke="#ffffff14" />
            </g>
          ))}
          {r.min <= 0 && <line x1={px(0)} y1={py(r.min) + 10} x2={px(0)} y2={py(r.max) - 10} stroke="#94a3b8" strokeWidth={1.6} />}
          {r.min <= 0 && <line x1={px(r.min) - 10} y1={py(0)} x2={px(r.max) + 10} y2={py(0)} stroke="#94a3b8" strokeWidth={1.6} />}
          {ticks.map(v => (
            <g key={`t${v}`} className="pointer-events-none">
              <text x={px(v)} y={py(Math.max(r.min, 0)) + 15} textAnchor="middle" fontSize="11" fontWeight="700" fill="#94a3b8">{v < 0 ? `−${-v}` : v}</text>
              <text x={px(Math.max(r.min, 0)) - 7} y={py(v) + 4} textAnchor="end" fontSize="11" fontWeight="700" fill="#94a3b8">{v < 0 ? `−${-v}` : v}</text>
            </g>
          ))}
          <text x={px(r.max) + 6} y={py(Math.max(r.min, 0)) - 6} fontSize="13" fontWeight="900" fill="#cbd5e1" textAnchor="end">x</text>
          <text x={px(Math.max(r.min, 0)) + 6} y={py(r.max) - 6} fontSize="13" fontWeight="900" fill="#cbd5e1">y</text>

          {linea(l1, C1)}
          {linea(l2, C2)}
          {/* Al corregir, si se dibujó solo una parte, se pintan las dos enteras */}
          {revelado && r.dibuja && l2.length < 2 && linea(dosPuntos(r.e2, r.min, r.max), C2)}

          {[...p1.map(p => [p, C1]), ...p2.map(p => [p, C2])].map(([p, c], i) => (
            <circle key={`d${i}`} cx={px(p[0])} cy={py(p[1])} r={6} fill={c} stroke="#0b1530" strokeWidth={2} className="pointer-events-none" />
          ))}
          {aviso && <circle cx={px(aviso.p[0])} cy={py(aviso.p[1])} r={7} fill="none" stroke="#ef4444" strokeWidth={3} className="pointer-events-none" />}
          {elegido && (
            <circle cx={px(elegido[0])} cy={py(elegido[1])} r={9} fill={revelado ? (acierto ? '#22c55e' : '#ef4444') : '#f8fafc'} stroke="#0b1530" strokeWidth={2.5} className="pointer-events-none" />
          )}
          {revelado && r.sol && !acierto && (
            <circle cx={px(r.sol[0])} cy={py(r.sol[1])} r={9} fill="#22c55e" stroke="#0b1530" strokeWidth={2.5} className="pointer-events-none" />
          )}

          {!revelado && Array.from({ length: r.max - r.min + 1 }, (_, i) => r.min + i).flatMap(x =>
            Array.from({ length: r.max - r.min + 1 }, (_, j) => r.min + j).map(y => (
              <circle key={`h${x},${y}`} cx={px(x)} cy={py(y)} r={CELDA * 0.46} fill="transparent" className="cursor-pointer" onClick={() => toca(x, y)} />
            )))}
        </svg>
      </div>

      {aviso && !revelado && <p className="mt-2 text-center text-sm text-red-300 font-bold">✗ {aviso.texto}</p>}

      {!revelado && fase === 'corte' && (
        <div className="mt-3 space-y-2">
          {r.especiales && (
            <div className="flex gap-2">
              {[['paralelas', { es: 'No se cortan (paralelas)', en: 'They never meet (parallel)', ca: 'No es tallen (paral·leles)' }], ['coinciden', { es: 'Son la misma recta', en: 'They are the same line', ca: 'Són la mateixa recta' }]].map(([k, t]) => (
                <button key={k} type="button" onClick={() => { setEleccion(k); setAviso(null) }}
                  className={`flex-1 rounded-xl px-2 py-2.5 text-sm font-black border ${eleccion === k ? 'bg-white/20 border-white/50 text-white' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'}`}>{tr(t)}</button>
              ))}
            </div>
          )}
          <button type="button" disabled={!eleccion} onClick={() => onResponder(eleccion)}
            className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black disabled:opacity-40">
            {elegido ? tr({ es: `Comprobar (${elegido[0]}, ${elegido[1]})`, en: `Check (${elegido[0]}, ${elegido[1]})`, ca: `Comprovar (${elegido[0]}, ${elegido[1]})` }).replace(/-/g, '−') : tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}
          </button>
        </div>
      )}

      {revelado && (
        <div className={`mt-3 rounded-xl px-3 py-2.5 border ${acierto ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <p className={`font-black text-center ${acierto ? 'text-green-400' : 'text-red-400'}`}>
            {acierto ? tr({ es: '✓ Correcto', en: '✓ Correct', ca: '✓ Correcte' }) : tr({ es: '✗ Incorrecto', en: '✗ Incorrect', ca: '✗ Incorrecte' })}
          </p>
          <p className="mt-1 text-white/75 text-sm">💡 {explicacion(r, l)}</p>
        </div>
      )}
    </div>
  )
}
