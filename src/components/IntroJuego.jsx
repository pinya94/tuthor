// Piezas comunes de la pantalla de inicio de los juegos: la cabecera con la
// ilustración del juego (arte/), el selector de dificultad en barras y el
// icono de cada línea de "cómo se juega". Sustituyen al emoji del título, al
// semáforo 🟢🟡🔴 y a los emojis sueltos de las listas.
import { ArteJuego } from './arte'
import { BarrasNivel, IconoDeEmoji } from './Iconos'
import { nivelDeClave } from '../lib/niveles'

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
