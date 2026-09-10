import { useState } from 'react'

// El "¿de qué va?" de la pantalla de inicio, PLEGADO.
//
// El texto se escribió para que alguien que llega de fuera entienda el juego
// sin haberlo jugado, y para eso sigue estando entero. Pero abierto ocupaba
// media pantalla y enterraba lo único que hay que hacer ahí: elegir y darle a
// empezar. Quien ya conoce el juego lo saltaba con la vista cada vez, y quien
// no lo conocía se encontraba cuatro párrafos antes de un botón.
//
// Cerrado por defecto a propósito. El subtítulo del juego, que está justo
// encima, ya dice en una línea de qué va; esto es el detalle para quien lo
// quiera.
export default function ComoSeJuega({ label, children }) {
  const [abierto, setAbierto] = useState(false)
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 mb-3">
      <button
        type="button"
        onClick={() => setAbierto(a => !a)}
        aria-expanded={abierto}
        className="w-full flex items-center justify-between gap-3 px-5 py-3 text-left hover:bg-white/5 rounded-2xl transition-colors"
      >
        <span className="text-white/40 text-xs font-semibold uppercase tracking-widest">{label}</span>
        <span className="text-white/30 text-[10px] leading-none">{abierto ? '▲' : '▼'}</span>
      </button>
      {abierto && (
        <div className="px-5 pb-4 space-y-2 text-white/70 text-sm">{children}</div>
      )}
    </div>
  )
}
