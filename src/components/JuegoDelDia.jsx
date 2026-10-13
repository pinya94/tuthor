import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { juegoDelDia } from '../lib/juegoDelDia'
import { ArteJuego } from './arte'

// El juego del día (lib/juegoDelDia.js) en dos tamaños:
//   · franja → en la portada, debajo de las puertas: un extra, no la entrada
//              principal. Una fila con el dibujo del juego, su nombre y Jugar.
//   · grande → arriba de /diaria, donde sí es el protagonista.
// `racha` (opcional) es la racha vigente del alumno: cualquier juego la
// mantiene, este solo es la sugerencia para quien no sabe cuál elegir.
export default function JuegoDelDia({ variante = 'franja', racha = 0, className = '' }) {
  const { lang, lt, tr, localPath } = useLang()
  const juego = juegoDelDia(lang)
  if (!juego) return null

  const etiqueta = tr({ es: 'Juego del día', en: 'Game of the day', ca: 'Joc del dia' })
  const conRacha = racha > 0 && (
    <span className="text-orange-300 font-bold">
      🔥 {racha} {tr(racha === 1 ? { es: 'día', en: 'day', ca: 'dia' } : { es: 'días', en: 'days', ca: 'dies' })}
    </span>
  )

  if (variante === 'grande') {
    return (
      <Link to={localPath(juego.path)}
        className={`group block rounded-3xl bg-[#141b2e] border border-white/[0.08] hover:border-amber-400/40 overflow-hidden shadow-2xl shadow-black/30 transition-colors ${className}`}>
        <div className="aspect-[16/9] border-b border-white/[0.06] bg-white/[0.02]">
          <ArteJuego slug={juego.slug} className="w-full h-full p-3 transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
        <div className="px-6 py-5">
          <p className="text-amber-300 text-xs font-bold uppercase tracking-widest">{etiqueta}</p>
          <h2 className="text-white font-black text-2xl sm:text-3xl mt-1 leading-tight">{lt(juego)}</h2>
          <p className="text-white/55 text-sm mt-1">{lt(juego, 'subtitle')}</p>
          <div className="flex items-center justify-between gap-3 mt-4">
            <span className="text-white/40 text-xs">
              {conRacha || tr({ es: 'Mañana, otro distinto', en: 'Tomorrow, a different one', ca: 'Demà, un altre de diferent' })}
            </span>
            <span className="bg-amber-500 group-hover:bg-amber-400 text-black font-black text-sm px-5 py-2.5 rounded-xl transition-colors">
              {tr({ es: 'Jugar', en: 'Play', ca: 'Jugar' })} →
            </span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link to={localPath(juego.path)}
      className={`group flex items-center gap-3 rounded-2xl bg-[#141b2e] border border-white/[0.08] hover:border-amber-400/40 pl-2 pr-4 py-2 transition-colors ${className}`}>
      <span className="w-20 h-14 shrink-0 rounded-xl overflow-hidden bg-white/[0.03]">
        <ArteJuego slug={juego.slug} className="w-full h-full p-0.5" />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[11px] font-bold uppercase tracking-widest text-amber-300/90">
          {etiqueta}{conRacha && <> · {conRacha}</>}
        </span>
        <span className="block text-white font-black text-[15px] leading-tight truncate">{lt(juego)}</span>
        <span className="block text-white/45 text-xs truncate">{lt(juego, 'subtitle')}</span>
      </span>
      <span className="shrink-0 text-amber-300 font-bold text-sm group-hover:translate-x-0.5 transition-transform">
        {tr({ es: 'Jugar', en: 'Play', ca: 'Jugar' })} →
      </span>
    </Link>
  )
}
