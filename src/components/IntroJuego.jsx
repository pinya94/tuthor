// Piezas comunes de la pantalla de inicio de los juegos: la cabecera con la
// ilustración del juego (arte/), el selector de dificultad en barras y el
// icono de cada línea de "cómo se juega". Sustituyen al emoji del título, al
// semáforo 🟢🟡🔴 y a los emojis sueltos de las listas.
import { useState } from 'react'
import { ArteJuego } from './arte'
import { BarrasNivel, IconoDeEmoji, Bombilla } from './Iconos'
import { nivelDeClave } from '../lib/niveles'
import { useLang } from '../context/LangContext'
import DescubreTuthor from './DescubreTuthor'

// "¿Cómo se juega?": las reglas y los detalles, plegados. La entrada de un
// juego es dificultad + una línea + Jugar; quien quiera saber más, lo abre.
export function ComoSeJuega({ children }) {
  const [abierto, setAbierto] = useState(false)
  const { tr } = useLang()
  return (
    <div className="mt-2">
      <button type="button" onClick={() => setAbierto(a => !a)} aria-expanded={abierto}
        className="mx-auto flex items-center gap-2 text-white/55 hover:text-white text-sm font-semibold py-2 transition-colors">
        <Bombilla className="w-4 h-4" />
        {abierto ? tr({ es: 'Ocultar', en: 'Hide', ca: 'Amagar' }) : tr({ es: '¿Cómo se juega?', en: 'How to play', ca: 'Com es juga?' })}
        <svg viewBox="0 0 24 24" className={`w-4 h-4 transition-transform ${abierto ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {/* Siempre en el HTML, solo oculto: con «abierto &&» el texto no existía
          hasta pulsar, y el buscador veía cada juego como un título y un botón
          (~200 caracteres; memoria «adsense-contenido-poco-valor»). */}
      <div hidden={!abierto} className="mt-2 space-y-4 text-left">{children}</div>
      {/* Al pie de la pantalla de inicio de cada juego: lo que hay del mismo
          tema y, para quien llega de fuera, qué es Tuthor. Saca el juego de la
          URL, así que vale para los 60 juegos sin tocar ninguno. */}
      <DescubreTuthor className="mt-6" />
    </div>
  )
}

const sinEmoji = s => String(s ?? '').replace(/^(?:\p{Extended_Pictographic}|\u{FE0F}|\u{200D}|\u{20E3}|\s)+/u, '')

export function CabeceraJuego({ slug, badge, titulo, sub, className = 'mb-6' }) {
  return (
    <div className={`text-center ${className}`}>
      {slug && <ArteJuego slug={slug} className="w-full max-w-[240px] mx-auto aspect-video block mb-3" />}
      {badge && <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{badge}</p>}
      <h1 className="text-3xl font-black text-white mb-1">{sinEmoji(titulo)}</h1>
      {sub && <p className="text-white/40 text-sm">{sub}</p>}
    </div>
  )
}

// Barras de dificultad para un botón del selector: 1-3 según la clave
// (facil/medio/dificil, easy/…) o la posición.
export function NivelBarras({ clave, i = 0, className = 'w-4 h-4 shrink-0' }) {
  return <BarrasNivel n={nivelDeClave(clave, i)} className={className} />
}

// Icono de una línea de "cómo se juega": el dibujo del sistema si el emoji
// tiene equivalente (reloj, diana, racha…), y si no, un punto de color.
export function IconoIntro({ emoji, className = 'w-4 h-4' }) {
  // IconoDeEmoji no tiene hooks: llamarlo como función dice si hay dibujo.
  const icono = IconoDeEmoji({ emoji, className })
  return (
    <span className="w-5 h-5 shrink-0 inline-flex items-center justify-center">
      {icono || <span className="w-1.5 h-1.5 rounded-full bg-violet-300/70" />}
    </span>
  )
}
