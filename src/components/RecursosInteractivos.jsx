import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { RECURSOS_INTERACTIVOS } from '../lib/recursosInteractivos'

// Tarjetas de los recursos interactivos (lib/recursosInteractivos.js). La
// misma pieza en /clase, en la pestaña Recursos del profesor y en /recursos.
// `compacto` para la columna estrecha de /clase: una tarjeta por fila.
export default function RecursosInteractivos({ compacto = false }) {
  const { tr, localPath } = useLang()
  return (
    <div className={`grid gap-3 ${compacto ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
      {RECURSOS_INTERACTIVOS.map(r => (
        <Link key={r.id} to={localPath(r.path)}
          className="group block rounded-2xl border border-sky-500/25 bg-sky-500/[0.06] px-4 py-4 hover:bg-sky-500/10 hover:border-sky-400/40 transition-colors">
          <p className="text-white/35 text-[10.5px] uppercase tracking-wider font-bold mb-1">{tr(r.materia)}</p>
          <p className="text-white font-black text-[15px] mb-1">
            {r.emoji} {tr(r.titulo)}
            <span className="text-sky-300/60 group-hover:text-sky-300 ml-1.5 transition-colors">→</span>
          </p>
          <p className="text-white/50 text-[13px] leading-relaxed">{tr(r.desc)}</p>
        </Link>
      ))}
    </div>
  )
}
