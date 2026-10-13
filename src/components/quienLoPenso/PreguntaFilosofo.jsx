// Una ronda de ¿Quién lo Pensó? La idea (o el filósofo) en una tarjeta y,
// debajo, la línea del tiempo de la filosofía con un punto por filósofo; al
// corregir se ilumina el de la respuesta. La escala va a trozos (Antigüedad,
// Edad Media, Modernidad): con una escala lineal los griegos quedarían
// apelotonados en una esquina. En «quién vivió antes» la línea solo aparece al
// corregir, porque si no daría la respuesta.
import { useLang } from '../../context/LangContext'
import { FILOSOFOS, filosofo, enunciado, textoOpcion, explicacion, fechas, tx } from '../../lib/quienLoPenso'

const TRAMOS = [
  { de: -650, a: -250, x0: 8, x1: 120 },
  { de: 300, a: 1400, x0: 132, x1: 200 },
  { de: 1550, a: 2000, x0: 212, x1: 352 },
]
const xDe = y => {
  const t = TRAMOS.find(t => y >= t.de && y <= t.a) ?? (y < 300 ? TRAMOS[0] : y < 1550 ? TRAMOS[1] : TRAMOS[2])
  return t.x0 + ((Math.min(Math.max(y, t.de), t.a) - t.de) / (t.a - t.de)) * (t.x1 - t.x0)
}

function Linea({ r, revelado, l, tr }) {
  const pool = r.epoca ? FILOSOFOS.filter(f => f.epoca === r.epoca) : FILOSOFOS
  const marcados = r.tipo === 'orden' ? r.opciones : r.fil ? [r.fil] : []
  return (
    <svg viewBox="0 0 360 74" className="w-full block mt-3" aria-hidden="true">
      {TRAMOS.map((t, i) => (
        <g key={i}>
          <line x1={t.x0} y1="40" x2={t.x1} y2="40" stroke="#475569" strokeWidth="2" />
          <text x={(t.x0 + t.x1) / 2} y="66" textAnchor="middle" fontSize="9" fill="#94A3B8">
            {[tr({ es: 'Antigüedad', en: 'Antiquity', ca: 'Antiguitat' }), tr({ es: 'Edad Media', en: 'Middle Ages', ca: 'Edat Mitjana' }), tr({ es: 'Modernidad', en: 'Modern era', ca: 'Modernitat' })][i]}
          </text>
        </g>
      ))}
      {pool.map(f => {
        const m = revelado && marcados.includes(f.id)
        const bueno = revelado && f.id === (r.tipo === 'orden' ? r.bueno : r.fil)
        return <circle key={f.id} cx={xDe((f.nace + f.muere) / 2)} cy="40" r={m ? 6 : 3.5} fill={bueno ? '#22C55E' : m ? '#38BDF8' : '#64748B'} stroke="#0F172A" strokeWidth="1.5" />
      })}
      {revelado && marcados.map(id => {
        const f = filosofo(id)
        const x = xDe((f.nace + f.muere) / 2)
        const bueno = id === (r.tipo === 'orden' ? r.bueno : r.fil)
        return <text key={id} x={Math.min(Math.max(x, 30), 330)} y={r.tipo === 'orden' && !bueno ? 54 : 26} textAnchor="middle" fontSize="9.5" fontWeight="800" fill={bueno ? '#86EFAC' : '#7DD3FC'}>{tx(f.nombre, l).split(' ').slice(-1)[0]}</text>
      })}
    </svg>
  )
}

export default function PreguntaFilosofo({ ronda, revelado, elegida, onResponder }) {
  const { lang, tr } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const f = r.fil ? filosofo(r.fil) : null
  let tarjeta
  if (r.tipo === 'idea') tarjeta = <p className="font-serif italic text-white text-xl leading-relaxed text-center">{tx(f.ideas[r.idea][0], l)}</p>
  else if (f) tarjeta = (
    <div className="text-center">
      <p className="text-white font-black text-2xl">{tx(f.nombre, l)}</p>
      <p className="text-white/50 text-sm mt-1">{fechas(f, l)}</p>
    </div>
  )
  else tarjeta = <p className="text-5xl text-center">🦉</p>

  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-4 py-5 mb-3">
        {tarjeta}
        {(r.tipo !== 'orden' || revelado) && <Linea r={r} revelado={revelado} l={l} tr={tr} />}
      </div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${r.tipo === 'concepto' || r.tipo === 'corriente' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-2 rounded-xl border text-white text-[15px] font-bold leading-snug transition-all ${clase(o)}`}>
            {textoOpcion(o, r, l)}
            {revelado && r.tipo === 'orden' && <span className="block text-xs font-normal text-white/60">{fechas(filosofo(o), l)}</span>}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
