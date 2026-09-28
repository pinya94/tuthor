import { useState } from 'react'
import { useLang } from '../context/LangContext'

// Iconos de línea/glifo limpios para las tarjetas de intención. Estética
// sobria (menos "pixel-art infantil", más producto): un símbolo claro sobre
// un degradado profundo.
const ICONS = {
  // Rayo: "en 5 minutos", rápido y con racha.
  diaria: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 2 3.5 13.5a.8.8 0 0 0 .6 1.3H10l-1.2 7.2a.5.5 0 0 0 .9.4L20.5 10.5a.8.8 0 0 0-.6-1.3H14l1-6.8a.5.5 0 0 0-.9-.4z" /></svg>,
  // Play: "quiero jugar".
  juegos: <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.14v13.72c0 .82.9 1.32 1.6.88l10.8-6.86a1.05 1.05 0 0 0 0-1.76L9.6 4.26C8.9 3.82 8 4.32 8 5.14z" /></svg>,
  // Documento con líneas y check: "tengo examen / temario".
  temario: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2.5" /><path d="M9 8h6M9 12h6M9 16h4" /></svg>,
}

export default function HeroCard({ card, onClick, priority = false }) {
  const [hovered, setHovered] = useState(false)
  const { lt, lang } = useLang()

  const cta = lang === 'ca' ? 'Entrar →' : lang === 'en' ? 'Enter →' : 'Entrar →'

  const shell = 'group relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50 cursor-pointer border border-white/10'
  const shellStyle = { transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }

  // ── Modo icono (nuevo, por defecto para las puertas): degradado + glifo ──
  if (card.icon && ICONS[card.icon]) {
    return (
      <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={shell} style={shellStyle}>
        {/* Degradado profundo */}
        <div className={`absolute inset-0 bg-gradient-to-br ${card.bg}`} />
        {/* Textura de puntos, muy sutil, para dar profundidad */}
        <div className="absolute inset-0 opacity-[0.14]" style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1px, transparent 0)', backgroundSize: '22px 22px' }} />
        {/* Halo suave detrás del icono */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 rounded-full bg-white/10 blur-2xl" />
        </div>
        {/* Sombra superior para legibilidad del título */}
        <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-black/30 to-transparent" />

        {/* Icono grande, centrado y ligeramente hacia abajo */}
        <div className="absolute inset-0 flex items-end justify-center pb-[26%]">
          <div className={`w-20 h-20 sm:w-16 sm:h-16 lg:w-24 lg:h-24 text-white drop-shadow-lg transition-transform duration-500 ${hovered ? 'scale-110 -translate-y-1' : ''}`}>
            {ICONS[card.icon]}
          </div>
        </div>

        {/* Texto arriba, centrado */}
        <div className="absolute top-0 left-0 right-0 p-5 text-center">
          <h3 className="font-black text-white text-3xl sm:text-2xl lg:text-4xl leading-tight drop-shadow-lg tracking-tight">{lt(card)}</h3>
          <p className="text-white/85 text-sm mt-1.5 drop-shadow font-medium">{lt(card, 'subtitle')}</p>
        </div>

        {/* CTA al hover */}
        <div className={`absolute bottom-5 left-0 right-0 flex justify-center transition-all duration-300 ${hovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
          <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/25 text-white text-xs font-semibold">{cta}</span>
        </div>
      </button>
    )
  }

  // ── Modo imagen (heredado): foto de fondo + overlay ──────────────────────
  const imageSm = card.image.replace('.webp', '-sm.webp')
  return (
    <button onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} className={shell} style={shellStyle}>
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
        <span className="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20 text-white text-xs font-semibold">{cta}</span>
      </div>
    </button>
  )
}
