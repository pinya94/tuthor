import { useLang } from '../context/LangContext'
import { DISCLAIMER } from '../data/reaccionScenarios'

// Planteamiento de un escenario de Reacción: icono + texto de la emergencia,
// disclaimer fijo (siempre visible, no solo la primera vez) y botón de inicio.
export default function ReaccionSituacionInicial({ escenario, onEmpezar }) {
  const { tr } = useLang()

  return (
    <div className="max-w-md w-full mx-auto">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center mb-5">
        <span className="text-7xl block mb-4">{escenario.situacionInicial.icono}</span>
        <h2 className="text-2xl font-black text-white mb-3">{tr(escenario.titulo)}</h2>
        <p className="text-white/70 leading-relaxed">{tr(escenario.situacionInicial.texto)}</p>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
        <p className="text-amber-300/90 text-xs leading-relaxed text-center">⚠️ {tr(DISCLAIMER)}</p>
      </div>

      <button
        onClick={onEmpezar}
        className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30"
      >
        🚑 {tr({ es: '¡Reacciona!', en: 'React!', ca: 'Reacciona!' })}
      </button>
    </div>
  )
}
