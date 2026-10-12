// Una ronda de Detective de Textos. El fragmento va en un «papel» neutro (el
// formato no puede delatar el tipo: una receta dibujada como receta ya sería
// la respuesta). En las escenas, al corregir se ven los cinco elementos.
import { FRAGMENTOS, ESCENAS, ELEMENTOS, FRASES, enunciado, textoOpcion, explicacion } from '../../lib/detectiveTextos'

function Papel({ texto, autor }) {
  return (
    <figure className="w-full rounded-xl bg-[#f5efe0] text-[#1f2937] px-4 py-4 shadow-inner text-left">
      <blockquote className="font-serif text-[17px] leading-relaxed whitespace-pre-line">
        {texto.split(' / ').map((l, i) => <span key={i} className="block">{l}</span>)}
      </blockquote>
      {autor && <figcaption className="text-[#6b7280] text-sm mt-2 text-right">— {autor}</figcaption>}
    </figure>
  )
}

function Escena({ e, revelado, pide }) {
  return (
    <div className="text-center w-full">
      <p className="text-5xl mb-2">{e.emoji}</p>
      <p className="text-white font-bold text-lg leading-snug">{e.t}</p>
      {revelado && (
        <div className="grid grid-cols-1 gap-1 mt-3 text-left">
          {Object.keys(ELEMENTOS).map(k => (
            <p key={k} className={`text-[13px] rounded-lg px-2 py-1 ${k === pide ? 'bg-green-500/20 text-green-200 font-bold' : 'bg-white/5 text-white/70'}`}>
              <span className="font-black">{ELEMENTOS[k].nombre}:</span> {e[k]}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default function PreguntaTexto({ ronda, revelado, elegida, onResponder }) {
  const r = ronda
  let tarjeta
  if (r.tipo === 'tipo') tarjeta = <Papel texto={FRAGMENTOS[r.k][1]} />
  else if (r.tipo === 'elemento') tarjeta = <Escena e={ESCENAS[r.k]} revelado={revelado} pide={r.pide} />
  else tarjeta = <Papel texto={FRASES[r.k][1]} autor={FRASES[r.k][2]} />

  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === r.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-4 mb-3 min-h-[8rem] flex items-center justify-center">{tarjeta}</div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r)}</p>
      <div className={`grid gap-2 ${r.tipo === 'tipo' ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {r.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-2 rounded-xl border text-white text-[15px] font-bold leading-snug transition-all ${clase(o)}`}>
            {textoOpcion(o, r)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r)}</p>}
    </div>
  )
}
