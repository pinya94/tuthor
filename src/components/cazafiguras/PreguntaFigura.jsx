// Una ronda de Cazafiguras: el verso o la frase como una cita (los versos
// partidos en líneas) y, al corregir, las palabras de la figura resaltadas.
// En las de definición, la definición en la tarjeta.
import { ejemplo, trozos, enunciado, textoOpcion, explicacion, FIGURAS } from '../../lib/cazafiguras'

function Cita({ e, revelado }) {
  // Las barras « / » del texto separan versos: cada trozo se parte por ellas.
  const lineas = [[]]
  for (const [t, marca] of trozos(e)) {
    const partes = t.split(' / ')
    partes.forEach((p, k) => {
      if (k > 0) lineas.push([])
      if (p) lineas[lineas.length - 1].push([p, marca])
    })
  }
  return (
    <figure className="text-center">
      <blockquote className="font-serif text-white text-xl sm:text-2xl leading-relaxed italic">
        {lineas.map((l, i) => (
          <span key={i} className="block">
            {l.map(([t, m], k) => (
              <span key={k} className={revelado && m ? 'not-italic font-bold text-amber-200 bg-amber-400/20 rounded px-0.5' : ''}>{t}</span>
            ))}
          </span>
        ))}
      </blockquote>
      {e.autor && <figcaption className="text-white/50 text-sm mt-2">— {e.autor}</figcaption>}
    </figure>
  )
}

export default function PreguntaFigura({ ronda, revelado, elegida, onResponder }) {
  const r = ronda
  const e = ejemplo(r)
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-4 py-6 mb-3 min-h-[8rem] flex items-center justify-center">
        {e
          ? <Cita e={e} revelado={revelado} />
          : <p className="text-white text-lg font-bold leading-snug text-center">{FIGURAS[r.bueno].def}</p>}
      </div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r)}</p>
      <div className="grid grid-cols-2 gap-2">
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-2 rounded-xl border text-white text-[15px] font-bold leading-snug transition-all ${clase(o)}`}>
            {textoOpcion(o)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r)}</p>}
    </div>
  )
}
