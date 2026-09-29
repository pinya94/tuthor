import { ARTE_JUEGOS, ArteJuego } from './arte'

// Miniatura de un juego en el catálogo. Con arte propio (arte/): superficie
// plana y neutra y la ilustración entera a la vista, con el título debajo.
// Sin arte (un juego aún sin dibujo), cae al degradado + emoji de siempre.
export default function Thumbnail({ title, subtitle, emoji, gradient, slug, onClick, comingSoon = false }) {
  const conArte = Boolean(slug && ARTE_JUEGOS[slug])
  return (
    <button
      onClick={onClick}
      className="group relative w-full rounded-xl overflow-hidden text-left bg-[#141b2e] border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 shadow-md shadow-black/20 cursor-pointer"
    >
      <div className={`w-full aspect-video flex items-center justify-center relative ${conArte ? '' : `bg-gradient-to-br ${gradient}`}`}>
        {conArte
          ? <ArteJuego slug={slug} className="absolute inset-0 w-full h-full p-1.5 transition-transform duration-500 ease-out group-hover:scale-[1.05]" />
          : <span className="text-5xl drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">{emoji}</span>}
        {comingSoon && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
              🔒 Próximamente
            </span>
          </div>
        )}
      </div>
      <div className="px-3 py-2.5 border-t border-white/[0.06]">
        <h3 className="font-bold text-white text-xs leading-tight line-clamp-1">{title}</h3>
        <p className="text-white/50 text-xs mt-0.5 line-clamp-1">{subtitle}</p>
      </div>
    </button>
  )
}
