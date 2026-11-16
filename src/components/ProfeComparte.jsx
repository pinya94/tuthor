// «¿Eres profe? Compártelo con tu clase», plegado, al final del texto de cada
// página de estudio. Los alumnos que más vuelven son los que reciben el enlace
// de su profe (Classroom, aula virtual del colegio): hasta ahora ese botón
// solo estaba en los juegos, y la mayoría de la gente entra por los temas.
import { useState } from 'react'
import { useLang } from '../context/LangContext'
import { trackEvent } from '../lib/analytics'
import CompartirClase from './CompartirClase'

export default function ProfeComparte() {
  const { tr } = useLang()
  const [abierto, setAbierto] = useState(false)
  const abrir = () => {
    if (!abierto) trackEvent('profe_comparte_abrir', { item_id: window.location.pathname })
    setAbierto(a => !a)
  }
  return (
    <div className="max-w-2xl mx-auto w-full -mt-4 mb-8">
      <button type="button" onClick={abrir} aria-expanded={abierto}
        className="flex items-center gap-2 text-white/45 hover:text-white text-sm font-semibold py-2 transition-colors">
        <span aria-hidden="true">🏫</span>
        {tr({ es: '¿Eres profe? Manda este tema a tu clase', en: 'Are you a teacher? Send this topic to your class', ca: 'Ets profe? Envia aquest tema a la teva classe' })}
        <svg viewBox="0 0 24 24" className={`w-4 h-4 transition-transform ${abierto ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {abierto && (
        <div className="mt-2 rounded-2xl border border-white/10 bg-black/20 p-4">
          <CompartirClase />
        </div>
      )}
    </div>
  )
}
