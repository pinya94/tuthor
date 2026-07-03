export default function Thumbnail({ title, subtitle, emoji, gradient, onClick, comingSoon = false }) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full rounded-xl overflow-hidden text-left transition-all duration-300 hover:scale-[1.04] hover:shadow-xl hover:shadow-black/40 shadow-md shadow-black/20 cursor-pointer"
    >
      {/* Image area */}
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
      </div>
      {/* Text below image */}
      <div className="bg-black/30 backdrop-blur-sm px-2.5 py-2">
        <h3 className="font-bold text-white text-xs leading-tight truncate">{title}</h3>
        {subtitle && <p className="text-white/60 text-xs mt-0.5 truncate">{subtitle}</p>}
      </div>
    </button>
  )
}
