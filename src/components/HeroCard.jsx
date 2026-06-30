import { useState } from 'react'
import { useLang } from '../context/LangContext'

export default function HeroCard({ card, onClick, priority = false }) {
  const [hovered, setHovered] = useState(false)
  const { lt, lang } = useLang()

  const imageSm = card.image.replace('.webp', '-sm.webp')

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50 cursor-pointer border border-white/10"
      style={{ transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}
    >
      {/* Imagen de fondo */}
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

      {/* Overlay gradiente */}
      <div className={`absolute inset-0 bg-gradient-to-b ${card.accent} opacity-60 transition-opacity duration-300 group-hover:opacity-40`} />

      {/* Overlay oscuro en la parte superior para legibilidad del texto */}
      <div className="absolute top-0 left-0 right-0 h-2/5 bg-gradient-to-b from-black/80 via-black/40 to-transparent" />

      {/* Brillo hover */}
      <div className={`absolute inset-0 bg-white/5 transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`} />

      {/* Texto — parte superior, centrado */}
      <div className="absolute top-0 left-0 right-0 p-5 text-center">
        <h3 className="font-black text-white text-3xl sm:text-4xl leading-tight drop-shadow-lg tracking-tight">
          {lt(card)}
        </h3>
        <p className="text-white/75 text-sm mt-1.5 drop-shadow font-medium">
          {lt(card, 'subtitle')}
        </p>
      </div>

      {/* Botón "Entrar" centrado abajo al hacer hover */}
      <div className={`absolute bottom-5 left-0 right-0 flex justify-center transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
        <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 text-white text-xs font-semibold">
          {lang === 'ca' ? 'Entrar →' : lang === 'en' ? 'Enter →' : 'Entrar →'}
        </span>
      </div>
    </button>
  )
}
