import { useLang } from '../context/LangContext'
import { DISCLAIMER } from '../data/reaccionCasos'

// Pantalla de inicio del arcade: disclaimer fijo, cómo funciona el ritmo y
// botón de empezar.
export default function ReaccionSituacionInicial({ onEmpezar, mejorPuntuacion }) {
  const { tr } = useLang()

  return (
    <div className="max-w-md w-full mx-auto text-center">
      <span className="text-7xl block mb-4">🚑</span>
      <h1 className="text-3xl font-black text-white mb-2">Reacción</h1>
      <p className="text-white/50 mb-1">
        {tr({ es: 'Casos de emergencia llegan uno tras otro. Decide rápido.', en: 'Emergency cases arrive one after another. Decide fast.', ca: 'Casos d\'emergència arriben un darrere l\'altre. Decideix ràpid.' })}
      </p>
      {mejorPuntuacion > 0 && (
        <p className="text-amber-400 text-sm font-bold mt-2 mb-1">
          🏆 {tr({ es: 'Mejor puntuación', en: 'Best score', ca: 'Millor puntuació' })}: {mejorPuntuacion}
        </p>
      )}

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 my-6">
        <p className="text-amber-300/90 text-xs leading-relaxed">⚠️ {tr(DISCLAIMER)}</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 text-left">
        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">
          {tr({ es: 'Cómo se juega', en: 'How to play', ca: 'Com es juga' })}
        </p>
        <div className="space-y-2 text-sm text-white/60">
          <div className="flex items-start gap-3">
            <span className="text-base w-5 shrink-0 text-center">⏱️</span>
            <span>{tr({ es: 'Cada caso tiene un tiempo para decidir que se acorta cuanto más aciertas', en: 'Each case gives you less time to decide the more you get right', ca: 'Cada cas té un temps per decidir que s\'escurça com més encertes' })}</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-base w-5 shrink-0 text-center">🔴</span>
            <span>{tr({ es: 'Una decisión peligrosa cuesta más que un simple despiste', en: 'A dangerous choice costs more than a small slip-up', ca: 'Una decisió perillosa costa més que un simple despistament' })}</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-base w-5 shrink-0 text-center">💔</span>
            <span>{tr({ es: 'La partida acaba cuando se agotan las vidas', en: 'The run ends when you run out of lives', ca: 'La partida s\'acaba quan s\'esgoten les vides' })}</span>
          </div>
        </div>
      </div>

      <button
        onClick={onEmpezar}
        className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30"
      >
        🚨 {tr({ es: '¡Reacciona!', en: 'React!', ca: 'Reacciona!' })}
      </button>
    </div>
  )
}
