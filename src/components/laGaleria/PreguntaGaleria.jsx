// Una ronda de La Galería: el cuadro dibujado, o la cartela de una obra como
// en un museo, y debajo la sucesión de estilos, que se ilumina al corregir.
import { useLang } from '../../context/LangContext'
import Cuadro from './Cuadro'
import { OBRAS, ESTILOS, ORDEN_ESTILOS, obra, enunciado, textoOpcion, explicacion, tx } from '../../lib/laGaleria'

function Estilos({ marcas, revelado, l }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 mt-3">
      {ORDEN_ESTILOS.map(e => {
        const m = revelado && marcas[e]
        return (
          <div key={e} className={`rounded-md px-0.5 py-1 text-center text-[10px] font-bold leading-tight break-words hyphens-auto ${m ? (m === 'bien' ? 'bg-green-500/30 text-green-200 ring-1 ring-green-400' : 'bg-sky-500/25 text-sky-200') : 'bg-white/5 text-white/40'}`}>
            {tx(ESTILOS[e].nombre, l)}
          </div>
        )
      })}
    </div>
  )
}

function Cartela({ o, conPintor, l }) {
  return (
    <div className="mx-auto max-w-[280px] rounded-md bg-[#F5F1E8] text-[#1F2937] px-4 py-3 shadow-lg text-left">
      <p className="font-serif font-bold text-lg leading-tight">{tx(o.titulo, l)}</p>
      <p className="text-sm mt-1 text-[#4B5563]">{conPintor ? `${o.pintor}, ${o.anyo}` : '?'}</p>
    </div>
  )
}

export default function PreguntaGaleria({ ronda, revelado, elegida, onResponder }) {
  const { lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const r = ronda
  const o = obra(r)
  const marcas = {}
  if (r.tipo === 'cuadro' || r.tipo === 'rasgo') marcas[r.bueno] = 'bien'
  if (o) marcas[o.estilo] = 'bien'
  if (r.tipo === 'orden') for (const k of r.opciones) marcas[OBRAS[k].estilo] = k === r.bueno ? 'bien' : marcas[OBRAS[k].estilo] ?? 'otra'

  let tarjeta
  if (r.tipo === 'cuadro') tarjeta = <Cuadro estilo={r.estilo} semilla={r.semilla} />
  else if (o) tarjeta = <Cartela o={o} conPintor={r.tipo !== 'pintor' || revelado} l={l} />
  else if (r.tipo === 'rasgo') tarjeta = <p className="text-white font-bold text-lg leading-snug text-center">{tx(ESTILOS[r.bueno].rasgo, l)}</p>
  else tarjeta = <p className="text-5xl text-center">🖼️</p>

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
        <Estilos marcas={marcas} revelado={revelado} l={l} />
      </div>
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(r, l)}</p>
      <div className="grid grid-cols-2 gap-2">
        {r.opciones.map(x => (
          <button key={x} disabled={revelado} onClick={() => onResponder(x)}
            className={`py-3 px-2 rounded-xl border text-white text-[15px] font-bold leading-snug transition-all ${clase(x)}`}>
            {textoOpcion(x, r, l)}
            {revelado && r.tipo === 'orden' && <span className="block text-xs font-normal text-white/60">{OBRAS[x].pintor} · {OBRAS[x].anyo}</span>}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(r, l)}</p>}
    </div>
  )
}
