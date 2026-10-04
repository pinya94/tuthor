// Una ronda de Lee la Etiqueta: la pregunta, las etiquetas y las opciones.
// La usan el juego (contra reloj) y el examen (MechanicExam).
import { useLang } from '../../context/LangContext'
import { enunciado, textoOpcion, explicacion, producto } from '../../lib/etiqueta'
import Etiqueta from './Etiqueta'

export default function PreguntaEtiqueta({ ronda, revelado, elegida, onResponder }) {
  const { lang } = useLang()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const ps = ronda.productos.map(producto)
  const porProducto = ronda.tipo === 'mas' || ronda.tipo === 'trampa'
  const clase = o => {
    if (!revelado) return 'bg-white/[0.06] border-white/15 hover:bg-white/[0.12] active:scale-95'
    if (o === ronda.bueno) return 'bg-green-500/25 border-green-400'
    if (o === elegida) return 'bg-red-500/25 border-red-400'
    return 'bg-white/[0.03] border-white/5 opacity-50'
  }
  const marca = id => (!revelado || !porProducto ? null : id === ronda.bueno ? 'bien' : id === elegida ? 'mal' : null)
  const columnas = ps.length === 3 ? 'grid-cols-3' : ps.length === 2 ? 'grid-cols-2' : 'grid-cols-1 max-w-[260px] mx-auto'
  return (
    <div className="w-full">
      <p className="text-white font-bold text-center mb-3 leading-snug">{enunciado(ronda, l)}</p>
      <div className={`grid gap-2 mb-3 ${columnas}`}>
        {ps.map(p => (
          <Etiqueta key={p.id} p={p} compacta={ps.length === 3} corta={ps.length > 1} resalta={revelado ? ronda.nutriente : null} marca={marca(p.id)} />
        ))}
      </div>
      <div className={`grid gap-2 ${ronda.opciones.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {ronda.opciones.map(o => (
          <button key={o} disabled={revelado} onClick={() => onResponder(o)}
            className={`py-3 px-1.5 rounded-xl border text-white text-sm font-bold leading-tight transition-all ${clase(o)}`}>
            {textoOpcion(ronda, o, l)}
          </button>
        ))}
      </div>
      {revelado && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {explicacion(ronda, l)}</p>}
    </div>
  )
}
