import { useLang } from '../context/LangContext'
import { MEJORAS } from '../lib/reaccionArcade'

// Pantalla "elige 1 de 3 mejoras" — mismo patrón que el modo roguelike de
// Acércate (src/pages/AcercateRoguelike.jsx), adaptado a Reacción.
export default function ReaccionMejora({ onElegir }) {
  const { tr } = useLang()

  return (
    <div className="max-w-md w-full mx-auto text-center">
      <span className="text-5xl block mb-3">🎁</span>
      <h2 className="text-2xl font-black text-white mb-1">
        {tr({ es: 'Elige una mejora', en: 'Choose an upgrade', ca: 'Tria una millora' })}
      </h2>
      <p className="text-white/40 text-sm mb-6">
        {tr({ es: 'Sigues en racha — toma un respiro antes del siguiente caso', en: 'You\'re on a streak — take a breather before the next case', ca: 'Segueixes en ratxa — pren un respir abans del següent cas' })}
      </p>

      <div className="space-y-3">
        {MEJORAS.map(m => (
          <button key={m.id} onClick={() => onElegir(m)}
            className="w-full text-left rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 p-4 transition-all flex items-center gap-3">
            <span className="text-3xl shrink-0">{m.emoji}</span>
            <div>
              <p className="text-white font-bold">{tr(m.label)}</p>
              <p className="text-white/40 text-xs mt-0.5">{tr(m.desc)}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
