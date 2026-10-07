import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { ILUSTRACIONES, TONOS } from './PuertaIlustracion'

// Tarjeta de las puertas de la home. Por defecto: superficie plana y neutra,
// título arriba y una ilustración propia (PuertaIlustracion) que ocupa el
// resto — el color lo pone el dibujo, no el fondo. Si una tarjeta no trae
// `ilustracion`, cae al modo foto de antes (image + accent).
export default function HeroCard({ card, onClick, priority = false }) {
  const [hovered, setHovered] = useState(false)
  const { lt, lang } = useLang()

  const Ilustracion = card.ilustracion ? ILUSTRACIONES[card.ilustracion] : null

  if (Ilustracion) {
    const tono = TONOS[card.tono] || TONOS.violet
    return (
      <button
        onClick={onClick}
        className={`group relative w-full h-full rounded-2xl overflow-hidden flex flex-row items-center sm:flex-col sm:items-stretch bg-[#141b2e] border border-white/[0.08] ${tono.borde} shadow-xl shadow-black/30 transition-all duration-300 hover:-translate-y-1 cursor-pointer`}
      >
        {/* En móvil, fila compacta (dibujo a la izquierda, texto a la derecha):
            las tres puertas caben en la primera pantalla. Desde sm, la tarjeta
            alta de siempre. */}
        <div className="order-2 sm:order-none flex-1 sm:flex-none min-w-0 pl-1 pr-12 py-3 sm:px-5 sm:pt-5 sm:pb-0 text-left sm:text-center shrink-0">
          <h3 className="font-black text-white text-xl sm:text-2xl lg:text-4xl leading-tight tracking-tight">{lt(card)}</h3>
          <p className="text-white/55 text-[13px] sm:text-sm mt-1 sm:mt-1.5 font-medium">{lt(card, 'subtitle')}</p>
        </div>

        <div className="order-1 sm:order-none relative w-28 h-24 shrink-0 sm:w-auto sm:h-auto sm:flex-1 min-h-0 flex items-center justify-center p-2 sm:px-4 sm:pb-4 sm:pt-1">
          <Ilustracion className="h-full w-full max-w-[320px] transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
        </div>

        <span
          className={`absolute top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-3 right-3 w-8 h-8 rounded-full bg-white/[0.06] flex items-center justify-center ${tono.flecha} opacity-60 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </span>
      </button>
    )
  }

  // ── Modo foto (heredado) ─────────────────────────────────────────────────
  const imageSm = card.image.replace('.webp', '-sm.webp')
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50 cursor-pointer border border-white/10"
      style={{ transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}
    >
      <img
        src={card.image}
        srcSet={`${imageSm} 400w, ${card.image} 1080w`}
        sizes="(max-width: 768px) 400px, 1080px"
        alt={card.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
        style={{ transform: hovered ? 'scale(1.08)' : 'scale(1)' }}
        fetchPriority={priority ? 'high' : 'auto'}
        loading={priority ? 'eager' : 'lazy'}
      />
      <div className={`absolute inset-0 bg-gradient-to-b ${card.accent} opacity-60 transition-opacity duration-300 group-hover:opacity-40`} />
      <div className="absolute top-0 left-0 right-0 h-2/5 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />
      <div className={`absolute inset-0 bg-white/5 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`} />
      <div className="absolute top-0 left-0 right-0 p-5 text-center">
        <h3 className="font-black text-white text-3xl sm:text-2xl lg:text-4xl leading-tight drop-shadow-lg tracking-tight">{lt(card)}</h3>
        <p className="text-white/75 text-sm mt-1.5 drop-shadow font-medium">{lt(card, 'subtitle')}</p>
      </div>
      <div className={`absolute bottom-5 left-0 right-0 flex justify-center transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
        <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 text-white text-xs font-semibold">
          {lang === 'ca' ? 'Entrar →' : lang === 'en' ? 'Enter →' : 'Entrar →'}
        </span>
      </div>
    </button>
  )
}
