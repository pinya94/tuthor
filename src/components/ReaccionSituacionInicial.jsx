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
            <span>{tr({ es: 'Un reloj corre siempre: empieza en 1 minuto, acertar suma 10s y fallar resta 20s', en: 'A clock always runs: it starts at 1 minute, a right answer adds 10s and a wrong one costs 20s', ca: 'Un rellotge corre sempre: comença en 1 minut, encertar suma 10s i fallar resta 20s' })}</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-base w-5 shrink-0 text-center">🔴</span>
            <span>{tr({ es: 'Una decisión peligrosa cuesta lo mismo que cualquier otro fallo, pero queda marcada aparte al final', en: 'A dangerous choice costs the same as any other mistake, but it\'s flagged separately at the end', ca: 'Una decisió perillosa costa el mateix que qualsevol altre error, però queda marcada a part al final' })}</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-base w-5 shrink-0 text-center">🎁</span>
            <span>{tr({ es: 'Cada 5 aciertos eliges una mejora (más tiempo, un escudo o más puntos)', en: 'Every 5 correct answers you pick an upgrade (more time, a shield or more points)', ca: 'Cada 5 encerts tries una millora (més temps, un escut o més punts)' })}</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-base w-5 shrink-0 text-center">⏳</span>
            <span>{tr({ es: 'La partida acaba cuando el reloj llega a 0', en: 'The run ends when the clock hits 0', ca: 'La partida s\'acaba quan el rellotge arriba a 0' })}</span>
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
