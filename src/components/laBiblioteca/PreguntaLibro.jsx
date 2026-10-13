// Una ronda de La Biblioteca: la obra como la cubierta de un libro y, debajo,
// la línea del tiempo de la literatura española, que al corregir ilumina la
// época (en «la más antigua», las cuatro obras en su sitio).
import { OBRAS, EPOCAS, ORDEN_EPOCAS, obra, enunciado, textoOpcion, explicacion } from '../../lib/laBiblioteca'

const CORTO = {
  'edad-media': 'E. Media', renacimiento: 'Renac.', barroco: 'Barroco', neoclasicismo: 'Neoclás.', romanticismo: 'Románt.',
  realismo: 'Realismo', modernismo: 'Modern.', g98: 'G. 98', g27: 'G. 27', posguerra: 'Posguerra',
}

function Cubierta({ o, ocultarAutor }) {
  return (
    <div className="mx-auto w-44 h-56 rounded-r-lg rounded-l-sm bg-gradient-to-br from-[#7c2d12] to-[#431407] border-l-8 border-[#2a0e05] shadow-xl flex flex-col items-center justify-center px-3 text-center">
      <div className="w-20 h-px bg-amber-300/60 mb-3" />
      <p className="font-serif font-bold text-amber-100 text-lg leading-tight">{o.titulo}</p>
      <div className="w-20 h-px bg-amber-300/60 my-3" />
      <p className="font-serif text-amber-200/80 text-sm">{ocultarAutor ? '?' : o.autor}</p>
    </div>
  )
}

function Linea({ marcas, revelado }) {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-1">
        {ORDEN_EPOCAS.map(e => {
          const m = revelado && marcas[e]
          return (
            <div key={e} className={`rounded-md px-0.5 py-1.5 text-center text-[10px] font-bold leading-tight ${m ? (m === 'bien' ? 'bg-green-500/30 text-green-200 ring-1 ring-green-400' : 'bg-sky-500/25 text-sky-200') : 'bg-white/5 text-white/40'}`}>
              {CORTO[e]}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function PreguntaLibro({ ronda, revelado, elegida, onResponder }) {
  const r = ronda
  const o = obra(r)
  const marcas = {}
  if (o) marcas[o.epoca] = 'bien'
  if (r.tipo === 'rasgo') marcas[r.bueno] = 'bien'
  if (r.tipo === 'orden') for (const k of r.opciones) marcas[OBRAS[k].epoca] = k === r.bueno ? 'bien' : 'otra'

  let tarjeta
  if (o) tarjeta = <Cubierta o={o} ocultarAutor={r.tipo === 'autor' && !revelado} />
  else if (r.tipo === 'rasgo') tarjeta = <p className="text-white font-bold text-lg leading-snug text-center">{EPOCAS[r.bueno].rasgos[0]}</p>
  else tarjeta = <p className="text-5xl text-center">📚</p>

  const clase = x => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (x === r.bueno) return 'bg-green-500/25 border-green-400'
    if (x === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  return (
    <div className="w-full">
      <div className="rounded-2xl bg-[#0b1226] border border-white/[0.08] px-3 py-4 mb-3">
        {tarjeta}
        <Linea marcas={marcas} revelado={revelado} />
      </div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r)}</p>
      <div className={`grid gap-2 ${r.tipo === 'genero' ? 'grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {r.opciones.map(x => (
          <button key={x} disabled={revelado} onClick={() => onResponder(x)}
            className={`py-3 px-2 rounded-xl border text-white text-[15px] font-bold leading-snug transition-all ${clase(x)}`}>
            {textoOpcion(x, r)}
            {revelado && r.tipo === 'orden' && <span className="block text-xs font-normal text-white/60">{OBRAS[x].autor} · {OBRAS[x].anyo === 1200 ? 'h. 1200' : OBRAS[x].anyo}</span>}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r)}</p>}
    </div>
  )
}
