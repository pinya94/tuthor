// Una ronda de Coma a Coma: la frase en grande con el hueco marcado (o los
// dos huecos de ¿ ? y ¡ !). Al corregir, el signo bueno aparece en su sitio.
// En «¿por qué va ese signo?», el signo ya está puesto y resaltado.
import { frase, enunciado, textoOpcion, explicacion } from '../../lib/comaAComa'

function Frase({ r, revelado }) {
  const f = frase(r)
  const trozos = f.t.split('▢')
  const [a, b] = f.ok.includes('|') ? f.ok.split('|') : [f.ok, f.ok]
  const signo = k => (k === 0 ? a : b)
  const mostrar = revelado || r.tipo === 'regla'
  return (
    <p className="text-white font-bold text-2xl sm:text-[1.7rem] leading-relaxed text-center">
      {trozos.map((t, k) => (
        <span key={k}>
          {t}
          {k < trozos.length - 1 && (
            mostrar
              ? <span className={`font-black px-0.5 rounded ${r.tipo === 'regla' ? 'text-amber-300 bg-amber-300/15' : 'text-green-300 bg-green-400/15'}`}>{signo(k) || '·'}</span>
              : <span className="inline-block w-5 h-7 align-middle mx-0.5 rounded border-2 border-dashed border-amber-300 animate-pulse" />
          )}
        </span>
      ))}
    </p>
  )
}

export default function PreguntaComa({ ronda, revelado, elegida, onResponder }) {
  const r = ronda
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-4 py-6 mb-3 min-h-[8rem] flex items-center justify-center">
        <Frase r={r} revelado={revelado} />
      </div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r)}</p>
      <div className={`grid gap-2 ${r.tipo === 'regla' ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-2 rounded-xl border text-white text-[16px] font-bold leading-snug transition-all ${clase(o)}`}>
            {textoOpcion(o, r)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r)}</p>}
    </div>
  )
}
