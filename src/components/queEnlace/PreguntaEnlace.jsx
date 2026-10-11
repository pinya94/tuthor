// Una ronda de ¿Qué Enlace?: la tabla periódica en miniatura (periodos 1-4,
// grupos principales y Fe, Cu, Zn) con los elementos de la pregunta
// marcados. Antes de corregir todas las casillas son del mismo color; al
// corregir se pintan metales, no metales, semimetales y gases nobles (la
// escalera que separa metales de no metales es media respuesta). En las
// preguntas de sustancias, la fórmula en grande.
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, ELEMENTOS, GRUPO_COL, SUSTANCIAS } from '../../lib/queEnlace'

const COLOR = { m: '#2563EB', n: '#16A34A', s: '#737373', g: '#9333EA' }
const C = 29, G = 2, X0 = 4, Y0 = 18

function Tabla({ marcados, revelado, tr }) {
  return (
    <div>
      <svg viewBox={`0 0 ${X0 * 2 + 11 * (C + G)} ${Y0 + 4 * (C + G) + 4}`} className="w-full max-w-[360px] mx-auto h-auto" role="img" aria-label={tr({ es: 'Tabla periódica', en: 'Periodic table', ca: 'Taula periòdica' })}>
        {GRUPO_COL.map((g, i) => g && (
          <text key={i} x={X0 + i * (C + G) + C / 2} y={12} textAnchor="middle" fontSize="9" fontWeight="700" fill="#64748B">{g}</text>
        ))}
        {Object.entries(ELEMENTOS).map(([sim, e]) => {
          const x = X0 + e.col * (C + G), y = Y0 + (e.p - 1) * (C + G)
          const marcado = marcados.includes(sim)
          return (
            <g key={sim}>
              <rect x={x} y={y} width={C} height={C} rx="4" fill={revelado ? COLOR[e.tipo] : '#1E293B'} opacity={revelado && !marcado ? 0.55 : 1}
                stroke={marcado ? '#FCD34D' : '#334155'} strokeWidth={marcado ? 3 : 1} />
              <text x={x + C / 2} y={y + C / 2 + 4.5} textAnchor="middle" fontSize="12.5" fontWeight="900" fill={marcado ? '#FFFFFF' : '#CBD5E1'}>{sim}</text>
            </g>
          )
        })}
      </svg>
      {revelado && (
        <p className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] font-bold mt-1">
          <span style={{ color: '#60A5FA' }}>■ {tr({ es: 'Metales', en: 'Metals', ca: 'Metalls' })}</span>
          <span style={{ color: '#4ADE80' }}>■ {tr({ es: 'No metales', en: 'Non-metals', ca: 'No metalls' })}</span>
          <span style={{ color: '#A3A3A3' }}>■ {tr({ es: 'Semimetales', en: 'Metalloids', ca: 'Semimetalls' })}</span>
          <span style={{ color: '#C084FC' }}>■ {tr({ es: 'Gases nobles', en: 'Noble gases', ca: 'Gasos nobles' })}</span>
        </p>
      )}
    </div>
  )
}

export default function PreguntaEnlace({ ronda, revelado, elegida, onResponder }) {
  const { tr, lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const conTabla = !!r.elementos
  const largas = ['sustancia', 'propiedades'].includes(r.tipo)
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      {conTabla && (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] p-2 mb-3">
          <Tabla marcados={r.elementos} revelado={revelado} tr={tr} />
        </div>
      )}
      {r.tipo === 'sustancia' && (
        <p className="text-center text-white font-black text-4xl mb-2 tracking-wide">{SUSTANCIAS.find(x => x.f === r.sustancia).f}</p>
      )}
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${largas ? 'grid-cols-2' : r.opciones.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-2 rounded-xl border text-white text-[15px] font-bold leading-snug transition-all ${clase(o)}`}>
            {textoOpcion(o, r, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
