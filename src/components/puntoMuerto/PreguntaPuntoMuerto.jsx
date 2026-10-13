// Una ronda de Punto Muerto: la ficha de la empresa (CF, P, CVu) y el gráfico
// de ingresos y costes totales. En «leer» y «zona» el gráfico es la pregunta;
// en las de cálculo solo aparece al corregir (si no, daría la respuesta).
// Al corregir: el cruce marcado y las zonas de pérdidas y beneficio.
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, datos, num, sigla } from '../../lib/puntoMuerto'

const X0 = 46, X1 = 306, Y0 = 196, Y1 = 18

function Grafico({ r, revelado, l, tr }) {
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
      {r.tipo === 'zona' && <line x1={x(r.q)} y1={Y0} x2={x(r.q)} y2={Y1} stroke="#E879F9" strokeWidth="2.5" />}
      {r.tipo === 'zona' && <text x={x(r.q) + 4} y={Y1 + 28} fontSize="10" fontWeight="800" fill="#F0ABFC">{num(r.q, l)}</text>}
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
  const conGrafico = revelado || r.tipo === 'leer' || r.tipo === 'zona'
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-3 mb-3">
        <div className="flex justify-center gap-2 flex-wrap mb-2">
          {datos(r, l).map(([k, v]) => (
            <span key={k} className="rounded-lg bg-white/10 px-2.5 py-1 text-[13px] text-white font-bold tabular-nums">
              <span className="text-white/50 mr-1">{k}</span>{v}
            </span>
          ))}
        </div>
        {conGrafico && <Grafico r={r} revelado={revelado} l={l} tr={tr} />}
      </div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${r.opciones.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-2 rounded-xl border text-white text-[15px] font-bold tabular-nums leading-snug transition-all ${clase(o)}`}>
            {textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
