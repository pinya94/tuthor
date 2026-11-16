// Una ronda de Caza la Raíz (ver lib/cazaRaiz): se marcan en el eje X las
// soluciones de la ecuación (una o dos), o se dice que no tiene solución
// real. Al corregir aparece la parábola, que corta el eje justo en las raíces.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { MIN, MAX, enunciado, esCorrecta, explicacion, respuesta, valor, num } from '../../lib/cazaRaiz'

const CELDA = 26, M = 16, ALTO = 230
const ANCHO = (MAX - MIN) * CELDA + 2 * M
const EJE = ALTO / 2
const px = x => M + (x - MIN) * CELDA

// Escala vertical de la parábola (el eje Y no lleva números): el vértice a
// media altura del eje y, si toca el eje, abre como para salir por arriba a
// unas 4 unidades.
function trazado(r) {
  const xv = -r.b / (2 * r.a), yv = valor(r, xv)
  const k = Math.abs(yv) > 1e-9 ? (EJE * 0.55) / Math.abs(yv) : EJE / (Math.abs(r.a) * 16)
  const pts = []
  for (let x = MIN - 0.6; x <= MAX + 0.6; x += 0.1) pts.push(`${px(x).toFixed(1)},${(EJE - valor(r, x) * k).toFixed(1)}`)
  return pts.join(' ')
}

export default function PreguntaRaiz({ ronda: r, revelado, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const [marcadas, setMarcadas] = useState([])
  const [sinSol, setSinSol] = useState(false)

  function toca(x) {
    if (revelado) return
    setSinSol(false)
    setMarcadas(v => (v.includes(x) ? v.filter(y => y !== x) : [...v, x].slice(-2)))
  }
  const eleccion = sinSol ? 'n' : marcadas.length ? respuesta(marcadas) : null
  const acierto = revelado && esCorrecta(r, eleccion)
  const ordenadas = [...marcadas].sort((a, b) => a - b)
  const etiqueta = ordenadas.map(x => `x = ${num(x)}`).join(', ')

  const pista = r.nivel === 'facil'
    ? tr({ es: 'Toca en el eje X las soluciones de la ecuación (o di que no tiene)', en: 'Tap the solutions of the equation on the x-axis (or say there are none)', ca: 'Toca a l’eix X les solucions de l’equació (o digues que no en té)' })
    : tr({ es: 'Marca las soluciones en el eje X (si es doble, una sola) o di que no tiene solución real', en: 'Mark the solutions on the x-axis (one only if it is repeated) or say there is no real solution', ca: 'Marca les solucions a l’eix X (si és doble, una sola) o digues que no té solució real' })

  return (
    <div className="w-full">
      <div className="rounded-xl px-3 py-3 text-center border border-white/15 bg-white/5 mb-2">
        <p className="font-black text-2xl sm:text-3xl tabular-nums text-amber-300">{enunciado(r)}</p>
      </div>
      {/* Altura fija: la pista no mueve el eje bajo el dedo */}
      {!revelado && <p className="text-center text-sm text-white/75 font-bold mb-2 leading-snug min-h-[2.5rem] flex items-center justify-center">{pista}</p>}

      <div className="rounded-2xl border border-white/10 bg-[#0b1530] overflow-hidden">
        <svg viewBox={`0 0 ${ANCHO} ${ALTO}`} className="w-full h-auto block select-none" role="img"
          aria-label={tr({ es: 'Eje X para marcar las soluciones', en: 'x-axis to mark the solutions', ca: 'Eix X per marcar les solucions' })}>
          <defs><clipPath id="caza-raiz-marco"><rect x="0" y="0" width={ANCHO} height={ALTO} /></clipPath></defs>
          {Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i).map(x => (
            <line key={x} x1={px(x)} y1={8} x2={px(x)} y2={ALTO - 8} stroke="#ffffff0d" />
          ))}
          <line x1={px(0)} y1={6} x2={px(0)} y2={ALTO - 6} stroke="#94a3b8" strokeWidth={1.4} />
          <line x1={4} y1={EJE} x2={ANCHO - 4} y2={EJE} stroke="#cbd5e1" strokeWidth={2} />
          <text x={ANCHO - 6} y={EJE - 16} fontSize="13" fontWeight="900" fill="#cbd5e1" textAnchor="end">x</text>
          <text x={px(0) + 6} y={18} fontSize="13" fontWeight="900" fill="#94a3b8">y</text>
          {Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i).map(x => (
            <g key={`t${x}`} className="pointer-events-none">
              <line x1={px(x)} y1={EJE - 4} x2={px(x)} y2={EJE + 4} stroke="#cbd5e1" strokeWidth={1.5} />
              <text x={px(x)} y={EJE + 18} textAnchor="middle" fontSize="11" fontWeight="700" fill="#94a3b8">{x < 0 ? `−${-x}` : x}</text>
            </g>
          ))}

          {revelado && <polyline points={trazado(r)} fill="none" stroke="#fb923c" strokeWidth={3.5} strokeLinejoin="round" clipPath="url(#caza-raiz-marco)" />}

          {marcadas.map(x => {
            const bien = r.raices.includes(x)
            const fill = !revelado ? '#f8fafc' : bien ? '#22c55e' : '#ef4444'
            return <circle key={`m${x}`} cx={px(x)} cy={EJE} r={9} fill={fill} stroke="#0b1530" strokeWidth={2.5} className="pointer-events-none" />
          })}
          {revelado && r.raices.filter(x => !marcadas.includes(x)).map(x => (
            <circle key={`s${x}`} cx={px(x)} cy={EJE} r={9} fill="#22c55e" stroke="#0b1530" strokeWidth={2.5} className="pointer-events-none" />
          ))}

          {!revelado && Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i).map(x => (
            <rect key={`h${x}`} x={px(x) - CELDA / 2} y={EJE - 34} width={CELDA} height={68} fill="transparent" className="cursor-pointer" onClick={() => toca(x)} />
          ))}
        </svg>
      </div>

      {!revelado && (
        <div className="mt-3 space-y-2">
          <button type="button" onClick={() => { setSinSol(v => !v); setMarcadas([]) }}
            className={`w-full rounded-xl px-2 py-2.5 text-sm font-black border ${sinSol ? 'bg-white/20 border-white/50 text-white' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'}`}>
            {tr({ es: 'No tiene solución real', en: 'No real solution', ca: 'No té solució real' })}
          </button>
          <button type="button" disabled={!eleccion} onClick={() => onResponder(eleccion)}
            className="w-full rounded-xl bg-amber-400 hover:bg-amber-300 py-2.5 text-black font-black disabled:opacity-40">
            {marcadas.length ? `${tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })} ${etiqueta}` : tr({ es: 'Comprobar', en: 'Check', ca: 'Comprovar' })}
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
