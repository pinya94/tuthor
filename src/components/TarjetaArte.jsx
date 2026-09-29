// Tarjeta plana con ilustración arriba y título debajo: la misma de las
// materias de /estudiar y de TemarioGrid, para las páginas que pintan su
// propia rejilla (gramática, ortografía, portadas de Español e Inglés).
export default function TarjetaArte({ Arte, titulo, sub, onClick }) {
  return (
    <button type="button" onClick={onClick}
      className="group text-left rounded-2xl overflow-hidden bg-[#141b2e] border border-white/[0.08] hover:border-white/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/40 transition-all duration-300">
      <div className="relative w-full aspect-video">
        {Arte && <Arte className="absolute inset-0 w-full h-full p-2 transition-transform duration-500 ease-out group-hover:scale-[1.05]" />}
      </div>
      <div className="px-3.5 py-3 border-t border-white/[0.06]">
        <h3 className="font-black text-white text-sm sm:text-base leading-tight">{titulo}</h3>
        {sub && <p className="text-white/50 text-xs mt-1 leading-snug line-clamp-2">{sub}</p>}
      </div>
    </button>
  )
}
