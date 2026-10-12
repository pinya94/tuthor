// Una ronda de ¿Qué Letra Va?: la palabra en grande con el hueco marcado
// (al corregir se rellena con la letra buena) y las formas de escribirla.
// Las palabras van siempre en castellano; solo la interfaz y la regla se
// traducen. La usan el juego (contra reloj) y el examen (MechanicExam).
import { useLang } from '../../context/LangContext'
import { enunciado, explicacion, huecoDe, grupoDe } from '../../lib/queLetra'

export default function PreguntaLetra({ ronda, revelado, elegida, onResponder }) {
  const { lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const h = huecoDe(r)
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-6 mb-3 text-center">
        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3">{grupoDe(r)}</p>
        <p lang="es" className="text-white font-black text-4xl sm:text-5xl tracking-wide leading-none">
          {h.antes}
          <span className={`inline-block min-w-[1.1em] mx-0.5 px-1 rounded-lg border-2 ${revelado ? 'border-green-400 text-green-300 bg-green-500/10' : 'border-dashed border-amber-300 text-amber-300 bg-amber-300/10'}`}>
            {revelado ? h.letra : '?'}
          </span>
          {h.despues}
        </p>
      </div>
      <p className="text-white font-bold text-center mb-3">{enunciado(r, l)}</p>
      <div className={`grid gap-2 ${r.opciones.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} lang="es" disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3.5 px-2 rounded-xl border text-white text-lg font-bold transition-all ${clase(o)}`}>
            {o}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
