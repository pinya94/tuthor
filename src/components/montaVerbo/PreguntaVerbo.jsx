// Una ronda de Monta el Verbo (ver lib/montaVerbo): la tabla de un tiempo
// con un hueco por persona. Tocar una ficha la pone en el primer hueco libre;
// tocar un hueco lleno devuelve la ficha. Al llenar el último se corrige solo.
import { useState } from 'react'
import { PERSONAS, TIEMPOS, esCorrecta, explicacion } from '../../lib/montaVerbo'

export default function PreguntaVerbo({ ronda: r, revelado, onResponder }) {
  // puestas[i] = índice de la ficha colocada en la casilla i (o null)
  const [puestas, setPuestas] = useState(() => r.casillas.map(() => null))
  const usadas = new Set(puestas.filter(x => x != null))
  const resp = puestas.map(i => (i == null ? null : r.fichas[i]))
  const acierto = revelado && esCorrecta(r, resp)

  function pon(fi) {
    if (revelado || usadas.has(fi)) return
    const hueco = puestas.indexOf(null)
    if (hueco < 0) return
    const nx = [...puestas]; nx[hueco] = fi
    setPuestas(nx)
    if (!nx.includes(null)) onResponder(nx.map(i => r.fichas[i]))
  }
  function quita(ci) {
    if (revelado || puestas[ci] == null) return
    const nx = [...puestas]; nx[ci] = null
    setPuestas(nx)
  }
  const siguiente = puestas.indexOf(null)

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-amber-300/40 bg-amber-300/10 px-4 py-3 mb-3 text-center">
        <p className="text-white font-black text-2xl leading-tight">{r.inf}</p>
        <p className="text-amber-200 font-bold text-sm mt-0.5">{TIEMPOS[r.tiempo]}</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] divide-y divide-white/5 mb-3">
        {r.casillas.map((c, i) => {
          const puesta = resp[i]
          const bien = revelado && puesta === c.ok
          const hueco = (
            <button type="button" onClick={() => quita(i)}
              className={`inline-flex items-center justify-center min-w-[3.2rem] h-9 px-2 rounded-lg font-black text-base border-2 transition-colors
                ${revelado ? (bien ? 'bg-green-500/25 border-green-400 text-green-200' : 'bg-red-500/25 border-red-400 text-red-200')
                  : puesta != null ? 'bg-amber-400 border-amber-400 text-black'
                  : i === siguiente ? 'border-dashed border-amber-300 text-transparent' : 'border-dashed border-white/20 text-transparent'}`}>
              {puesta ?? '·'}
            </button>
          )
          return (
            <div key={i} className="flex items-center gap-2 px-3 py-1.5">
              <span className="w-20 shrink-0 text-white/45 text-sm text-right">{PERSONAS[i]}</span>
              <span className="flex items-center flex-wrap gap-0.5 text-white text-lg font-bold">
                {c.antes && <span>{c.antes}</span>}{hueco}{c.despues && <span className="ml-1">{c.despues}</span>}
                {revelado && !bien && <span className="ml-2 text-green-300 text-sm font-black">→ {c.ok}</span>}
              </span>
            </div>
          )
        })}
      </div>

      {!revelado ? (
        <div className="flex flex-wrap justify-center gap-2">
          {r.fichas.map((f, fi) => (
            <button key={fi} type="button" onClick={() => pon(fi)} disabled={usadas.has(fi)}
              className={`min-w-[3.4rem] px-3 py-2.5 rounded-xl font-black text-base border transition-all
                ${usadas.has(fi) ? 'opacity-0 pointer-events-none' : 'bg-white/[0.08] border-white/20 text-white hover:bg-white/[0.15] active:scale-95'}`}>
              {f}
            </button>
          ))}
        </div>
      ) : (
        <div className={`rounded-xl px-3 py-2 border ${acierto ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <p className={`font-black text-center ${acierto ? 'text-green-400' : 'text-red-400'}`}>{acierto ? '✓ ¡Tabla completa!' : '✗ Hay alguna mal'}</p>
          {!acierto && <p className="mt-0.5 text-white/75 text-xs text-center">💡 {explicacion(r)}</p>}
        </div>
      )}
    </div>
  )
}
