// El juego destacado del mes, en grande, arriba de la portada (data/destacados).
import { Link } from 'react-router-dom'
import { ArteJuego } from './arte'
import { juegosDelCatalogo } from './CatalogoJuegos'
import { DESTACADO } from '../data/destacados'
import { useLang } from '../context/LangContext'
import { trackEvent } from '../lib/analytics'
import { ESTADO_JUGAR } from '../lib/arranqueDirecto'

export default function JuegoDestacado({ className = '' }) {
  const { lang, lt, tr, localPath } = useLang()
  const lista = juegosDelCatalogo(lang)
  // Si el destacado no existe en este idioma, el más jugado que sí
  const g = lista.find(x => x.slug === DESTACADO.slug) ?? lista[0]
  if (!g) return null
  const elDelMes = g.slug === DESTACADO.slug
  return (
    <Link to={localPath(g.path)} state={ESTADO_JUGAR} onClick={() => trackEvent('destacado_click', { item_id: g.slug })}
      className={`group block rounded-2xl overflow-hidden border border-amber-400/30 bg-[#141b2e] hover:border-amber-300/60 transition-colors ${className}`}>
      <div className="grid sm:grid-cols-[1.25fr_1fr] h-full">
        <div className="relative aspect-video sm:aspect-auto sm:min-h-[220px] bg-black/20">
          <ArteJuego slug={g.slug} className="absolute inset-0 w-full h-full p-2 transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
        <div className="p-4 sm:p-6 flex flex-col justify-center">
          <p className="text-amber-300 text-[11px] font-black uppercase tracking-widest">
            ⭐ {tr({ es: 'Juego destacado', en: 'Featured game', ca: 'Joc destacat' })}
            {elDelMes && <span className="text-white/45 font-bold normal-case tracking-normal"> · {tr(DESTACADO.motivo)}</span>}
          </p>
          <h2 className="text-white font-black text-2xl sm:text-3xl leading-tight mt-1">{lt(g)}</h2>
          <p className="text-white/60 text-sm sm:text-base mt-1">{lt(g, 'subtitle')}</p>
          <span className="mt-4 inline-flex w-fit items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 group-hover:bg-amber-300 text-black font-black text-base">
            ▶ {tr({ es: 'Jugar ahora', en: 'Play now', ca: 'Jugar ara' })}
          </span>
        </div>
      </div>
    </Link>
  )
}
