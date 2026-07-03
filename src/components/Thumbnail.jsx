export default function Thumbnail({ title, subtitle, emoji, gradient, onClick, comingSoon = false }) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full rounded-xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.04] hover:shadow-xl hover:shadow-black/40 shadow-md shadow-black/20 cursor-pointer"
    >
      <div className={`bg-gradient-to-br ${gradient} w-full aspect-video flex items-center justify-center relative`}>
        <span className="text-5xl drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300">
          {emoji}
        </span>
        {comingSoon && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
              🔒 Próximamente
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-2.5">
          <h3 className="font-bold text-white text-xs leading-tight line-clamp-1">{title}</h3>
          <p className="text-white/60 text-xs mt-0.5 line-clamp-1">{subtitle}</p>
        </div>
      </div>
    </button>
  )
}
