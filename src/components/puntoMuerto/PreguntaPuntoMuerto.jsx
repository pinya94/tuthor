// Una ronda de Punto Muerto: la ficha de la empresa (CF, P, CVu) y el gráfico
// de ingresos y costes totales. En «leer» y «zona» el gráfico es la pregunta;
// en las de cálculo solo aparece al corregir (si no, daría la respuesta).
// Al corregir: el cruce marcado y las zonas de pérdidas y beneficio. Sin
// opciones: la línea se desliza hasta el cruce, las cantidades y los cambios
// se llevan a su caja y los cálculos se teclean.
import { useState } from 'react'
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, datos, num, sigla, esCorrecta, leeNumero, posicionesLeer, cajaDe, nombreCaja, nombreItem } from '../../lib/puntoMuerto'

const X0 = 46, X1 = 306, Y0 = 196, Y1 = 18
const boton = 'w-full py-3 rounded-2xl bg-[#EDAE49] text-black font-black disabled:opacity-30 transition-opacity'
const tecla = 'rounded-xl bg-white/10 hover:bg-white/15 active:scale-95 text-white text-lg font-black py-2.5'
const comprobar = { es: 'Comprobar', en: 'Check', ca: 'Comprovar' }

// `linea`: la cantidad que marca el jugador (la línea que desliza o la venta que clasifica)
function Grafico({ r, revelado, l, tr, linea = null }) {
  const { CF, P, CVu, Qe } = r
  const qMax = 2 * Qe
  const yMax = Math.max(P * qMax, CF + CVu * qMax) * 1.08
  const x = q => X0 + (q / qMax) * (X1 - X0)
  const y = v => Y0 - (v / yMax) * (Y0 - Y1)
  const ticks = [Qe / 2, Qe, (3 * Qe) / 2, 2 * Qe]
  const cruce = [x(Qe), y(P * Qe)]
  return (
    <svg viewBox="0 0 320 236" className="w-full max-w-[380px] mx-auto block" aria-hidden="true">
      {revelado && (
        <>
          <rect x={X0} y={Y1} width={cruce[0] - X0} height={Y0 - Y1} fill="#EF4444" opacity="0.12" />
          <rect x={cruce[0]} y={Y1} width={X1 - cruce[0]} height={Y0 - Y1} fill="#22C55E" opacity="0.12" />
          <text x={(X0 + cruce[0]) / 2} y={Y1 + 14} textAnchor="middle" fontSize="10" fontWeight="800" fill="#FCA5A5">{tr({ es: 'pérdidas', en: 'loss', ca: 'pèrdues' })}</text>
          <text x={(cruce[0] + X1) / 2} y={Y1 + 14} textAnchor="middle" fontSize="10" fontWeight="800" fill="#86EFAC">{tr({ es: 'beneficio', en: 'profit', ca: 'benefici' })}</text>
        </>
      )}
      {/* ejes */}
      <line x1={X0} y1={Y0} x2={X1} y2={Y0} stroke="#64748B" strokeWidth="1.5" />
      <line x1={X0} y1={Y0} x2={X0} y2={Y1 - 4} stroke="#64748B" strokeWidth="1.5" />
      {ticks.map(t => (
        <g key={t}>
          <line x1={x(t)} y1={Y0} x2={x(t)} y2={Y0 + 4} stroke="#64748B" />
          <line x1={x(t)} y1={Y0} x2={x(t)} y2={Y1} stroke="#334155" strokeDasharray="2 4" />
          <text x={x(t)} y={Y0 + 15} textAnchor="middle" fontSize="10" fill="#CBD5E1">{num(t, l)}</text>
        </g>
      ))}
      <text x={X1} y={Y0 + 30} textAnchor="end" fontSize="9.5" fill="#94A3B8">{tr({ es: 'unidades (Q)', en: 'units (Q)', ca: 'unitats (Q)' })}</text>
      <text x={X0 - 6} y={y(CF) + 3} textAnchor="end" fontSize="9" fill="#94A3B8">{sigla('CF', l)}</text>
      {/* costes fijos, costes totales e ingresos */}
      <line x1={X0} y1={y(CF)} x2={X1} y2={y(CF)} stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="5 4" />
      <line x1={X0} y1={y(CF)} x2={X1} y2={y(CF + CVu * qMax)} stroke="#F59E0B" strokeWidth="3" />
      <line x1={X0} y1={y(0)} x2={X1} y2={y(P * qMax)} stroke="#38BDF8" strokeWidth="3" />
      <text x={X1 - 2} y={y(P * qMax) - 6} textAnchor="end" fontSize="10" fontWeight="800" fill="#7DD3FC">{tr({ es: 'Ingresos', en: 'Revenue', ca: 'Ingressos' })}</text>
      <text x={X1 - 2} y={y(CF + CVu * qMax) + 14} textAnchor="end" fontSize="10" fontWeight="800" fill="#FCD34D">{tr({ es: 'Costes totales', en: 'Total costs', ca: 'Costos totals' })}</text>
      {linea != null && <line x1={x(linea)} y1={Y0} x2={x(linea)} y2={Y1} stroke="#E879F9" strokeWidth="2.5" />}
      {linea != null && <text x={Math.min(x(linea) + 4, X1 - 30)} y={Y1 + 28} fontSize="10" fontWeight="800" fill="#F0ABFC">{num(linea, l)}</text>}
      {revelado && (
        <g>
          <circle cx={cruce[0]} cy={cruce[1]} r="6" fill="#22C55E" stroke="#0F172A" strokeWidth="2" />
          <text x={cruce[0] - 8} y={cruce[1] - 10} textAnchor="end" fontSize="11" fontWeight="900" fill="#86EFAC">Q* = {num(Qe, l)}</text>
        </g>
      )}
    </svg>
  )
}

export default function PreguntaPuntoMuerto({ ronda, revelado, elegida, onResponder }) {
  const { lang, tr } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const [pos, setPos] = useState(0)           // desliza: índice en posicionesLeer
  const [puestas, setPuestas] = useState({})  // clasifica
  const [v, setV] = useState('')              // teclea
  const ok = revelado && esCorrecta(r, elegida)

  const posiciones = r.mecanica === 'desliza' ? posicionesLeer(r) : []
  const activa = r.mecanica === 'clasifica' ? r.items.findIndex(it => puestas[it] == null) : -1
  // Línea en el gráfico: la que desliza el jugador, o la venta que está clasificando
  const linea = r.mecanica === 'desliza' ? (revelado ? Number(elegida) : posiciones[pos])
    : r.tipo === 'zona' && activa >= 0 && !revelado ? r.items[activa] : null
  const conGrafico = revelado || r.tipo === 'leer' || r.tipo === 'zona'

  let controles
  if (r.mecanica === 'desliza') {
    controles = (
      <>
        <input type="range" min="0" max={posiciones.length - 1} step="1" value={pos} disabled={revelado}
          onChange={e => setPos(Number(e.target.value))} className="w-full accent-fuchsia-400 mb-2"
          aria-label={tr({ es: 'Cantidad', en: 'Quantity', ca: 'Quantitat' })} />
        <p className="text-center text-white font-black mb-3">
          Q = {num(linea ?? 0, l)} {tr({ es: 'unidades', en: 'units', ca: 'unitats' })}
          {revelado && <span className={`ml-2 ${ok ? 'text-green-300' : 'text-red-300'}`}>{ok ? '✓' : `→ ${textoOpcion(r.bueno, r, l)}`}</span>}
        </p>
        {!revelado && <button className={boton} onClick={() => onResponder(String(posiciones[pos]))}>{tr(comprobar)}</button>}
      </>
    )
  } else if (r.mecanica === 'clasifica') {
    const pon = c => {
      if (revelado || activa < 0) return
      const n = { ...puestas, [r.items[activa]]: c }
      setPuestas(n)
      if (r.items.every(it => n[it] != null)) onResponder(`clasifica:${r.items.filter(it => n[it] !== cajaDe(r, it)).length}`)
    }
    controles = (
      <>
        {activa >= 0 && !revelado && (
          <p className="text-center mb-2"><span className="inline-block rounded-xl bg-fuchsia-500/20 border border-fuchsia-400/40 px-3 py-2 text-white font-black">{nombreItem(r, r.items[activa], l)}</span>
            <span className="block text-white/40 text-xs mt-1">{activa + 1} / {r.items.length}</span></p>
        )}
        <div className={`grid gap-2 ${r.cajas.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {r.cajas.map(c => (
            <button key={c} disabled={revelado || activa < 0} onClick={() => pon(c)} className="rounded-xl border-2 border-dashed border-white/20 bg-white/[0.04] hover:bg-white/[0.08] p-2 min-h-[4.5rem] text-left">
              <span className="block text-white font-black text-[12.5px] leading-tight">{nombreCaja(r, c, l)}</span>
              {r.items.filter(it => puestas[it] === c).map(it => (
                <span key={it} className={`block mt-1 rounded-md px-1.5 py-1 text-[11px] font-bold text-white leading-tight ${revelado ? (cajaDe(r, it) === c ? 'bg-green-500/25 ring-1 ring-green-400' : 'bg-red-500/25 ring-1 ring-red-400') : 'bg-white/10'}`}>
                  {nombreItem(r, it, l)}
                </span>
              ))}
            </button>
          ))}
        </div>
      </>
    )
  } else {
    const uni = r.tipo === 'calcular' ? tr({ es: 'unidades', en: 'units', ca: 'unitats' }) : '€'
    const escribe = t => setV(x => (t === '⌫' ? x.slice(0, -1) : t === '−' ? (x.startsWith('−') ? x.slice(1) : '−' + x) : x.length < 8 ? x + t : x))
    const teclas = r.tipo === 'beneficio' ? ['1', '2', '3', '4', '5', '6', '7', '8', '9', '−', '0', '⌫'] : ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', '⌫']
    controles = (
      <>
        <div className="rounded-xl bg-white/5 border border-white/10 py-2 mb-2 text-center">
          <span className="text-amber-300 font-black text-2xl tabular-nums">{(revelado ? String(elegida ?? '') : v) || '?'} {uni}</span>
          {revelado && <span className={`ml-2 font-black ${ok ? 'text-green-300' : 'text-red-300'}`}>{ok ? '✓' : `→ ${textoOpcion(r.bueno, r, l)}`}</span>}
        </div>
        {!revelado && (
          <>
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              {teclas.map((t, i) => (t ? <button key={t} className={tecla} onClick={() => escribe(t)}>{t}</button> : <span key={`h${i}`} />))}
            </div>
            <button className={boton} disabled={leeNumero(v) == null} onClick={() => onResponder(v)}>{tr(comprobar)}</button>
          </>
        )}
      </>
    )
  }

  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-3 mb-3">
        <div className="flex justify-center gap-2 flex-wrap mb-2">
          {datos(r, l).map(([k, val]) => (
            <span key={k} className="rounded-lg bg-white/10 px-2.5 py-1 text-[13px] text-white font-bold tabular-nums">
              <span className="text-white/50 mr-1">{k}</span>{val}
            </span>
          ))}
        </div>
        {conGrafico && <Grafico r={r} revelado={revelado} l={l} tr={tr} linea={linea} />}
      </div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      {controles}
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
