// Botón justo bajo el título de una página de teoría: lleva al ejercicio
// (#practica, el que pinta ContenidoTema) o, si el tema no tiene, a las
// formas de practicar (#formas). En el móvil la primera pantalla era un muro
// de texto y el ejercicio quedaba tres pantallas más abajo (revisión 20-nov).
import { useLang } from '../context/LangContext'

export default function BotonPractica({ ejercicio = true }) {
  const { tr } = useLang()
  const ir = e => {
    const el = document.getElementById(ejercicio ? 'practica' : 'formas')
    if (!el) return
    e.preventDefault()
    // Sin 'smooth': aquí el que hace scroll es el body y el suave se quedaba a medias
    el.scrollIntoView({ block: 'start' })
  }
  return (
    <a href={ejercicio ? '#practica' : '#formas'} onClick={ir}
      className="mt-4 inline-flex items-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-sm px-4 py-2.5 transition-colors">
      🎯 {ejercicio
        ? tr({ es: 'Practícalo ahora', en: 'Practise it now', ca: 'Practica-ho ara' })
        : tr({ es: 'Practícalo jugando', en: 'Practise with a game', ca: 'Practica-ho jugant' })}
      <span aria-hidden="true">↓</span>
    </a>
  )
}
