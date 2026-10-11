// Una ronda de Escala del Universo. En las preguntas de tamaños reales sale
// la regla de potencias de 10 (de 10⁻¹⁰ a 10²¹ m) con los objetos de
// referencia en su sitio; el de la pregunta se oculta hasta corregir (su
// posición daría el exponente) y entonces aparece marcado. En las de
// propiedades y operaciones, la expresión en grande. La usan el juego y el
// examen.
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, marcasRegla, OBJETOS, REGLA, sup } from '../../lib/escalaUniverso'

const W = 340, X0 = 18, X1 = 322
const xDe = (m, e) => X0 + ((Math.log10(Number(m)) + e - REGLA.min) / (REGLA.max + 1 - REGLA.min)) * (X1 - X0)

function Regla({ ocultos, marcados, revelado }) {
  const ticks = []
  for (let e = REGLA.min; e <= REGLA.max; e++) ticks.push(e)
  return (
    <svg viewBox={`0 0 ${W} 116`} className="w-full h-auto" role="img" aria-label="Regla de potencias de 10">
      <line x1={X0} x2={X1} y1="78" y2="78" stroke="#64748B" strokeWidth="2" />
      {ticks.map(e => {
        const x = xDe('1', e)
        const grande = e % 5 === 0
        return (
          <g key={e}>
            <line x1={x} x2={x} y1={grande ? 70 : 74} y2={grande ? 86 : 82} stroke={e === 0 ? '#FCD34D' : '#64748B'} strokeWidth={grande ? 2 : 1} />
            {grande && <text x={x} y="102" textAnchor="middle" fontSize="11" fontWeight="800" fill={e === 0 ? '#FCD34D' : '#94A3B8'}>10{sup(e)}</text>}
          </g>
        )
      })}
      <text x={xDe('1', 0)} y="114" textAnchor="middle" fontSize="9" fontWeight="700" fill="#FCD34D">1 m</text>
      {Object.entries(OBJETOS).map(([id, o]) => {
        if (ocultos.includes(id) && !revelado) return null
        const x = xDe(o.m, o.e)
        const marcado = revelado && marcados.includes(id)
        // Los de referencia, pequeños y alternando altura para que no se pisen.
        const fila = Object.keys(OBJETOS).indexOf(id) % 2
        const y = marcado ? 34 : 44 + fila * 14
        return (
          <g key={id} opacity={marcado || !revelado || !marcados.length ? 1 : 0.35}>
            {marcado && <line x1={x} x2={x} y1={y + 10} y2="78" stroke="#4ADE80" strokeWidth="2" />}
            {marcado && <circle cx={x} cy="78" r="4" fill="#4ADE80" />}
            <text x={x} y={y} textAnchor="middle" fontSize={marcado ? 22 : 13}>{o.emoji}</text>
          </g>
        )
      })}
    </svg>
  )
}

export default function PreguntaEscala({ ronda, revelado, elegida, onResponder }) {
  const { lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const marcas = marcasRegla(r)
  const conRegla = marcas.length > 0
  const largas = r.tipo === 'comparar' && r.pide === 'mayor'
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      {conRegla && (
        <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-2 pt-1 pb-2 mb-3">
          <Regla ocultos={marcas} marcados={marcas} revelado={revelado} />
        </div>
      )}
      {!conRegla && r.expr && (
        <p className="text-center text-white font-black text-3xl tabular-nums mb-3 tracking-wide">{r.expr}</p>
      )}
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${largas ? 'grid-cols-1' : 'grid-cols-2'}`}>
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
