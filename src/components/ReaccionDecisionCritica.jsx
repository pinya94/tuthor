import { useState } from 'react'
import { useLang } from '../context/LangContext'

// Punto de decisión crítica: elección directa (sin drag), bloquea el avance
// hasta elegir y muestra feedback inmediato antes de continuar. Sin opción
// "casi bien" — o es la correcta, o revela por qué la elegida es un error
// (grave si esPeligrosa, leve si no).
export default function ReaccionDecisionCritica({ decision, onElegir }) {
  const { tr } = useLang()
  const [elegida, setElegida] = useState(null)

  return (
    <div className="max-w-md w-full mx-auto">
      <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3 text-center">
        {tr({ es: 'Decisión crítica', en: 'Critical decision', ca: 'Decisió crítica' })}
      </p>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
        <p className="text-white/80 text-sm leading-relaxed">{tr(decision.pregunta)}</p>
        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mt-2">
          {tr({ es: '¿Qué haces?', en: 'What do you do?', ca: 'Què fas?' })}
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {decision.opciones.map((op, i) => {
          const activa = elegida === i
          const mostrarFeedback = elegida !== null
          const estilo = !mostrarFeedback
            ? 'border-white/15 bg-white/5 hover:bg-white/10'
            : activa
            ? op.esPeligrosa
              ? 'border-red-500 bg-red-500/15'
              : op.esCorrecta
              ? 'border-green-500 bg-green-500/15'
              : 'border-orange-400 bg-orange-400/10'
            : 'border-white/10 bg-white/5 opacity-40'

          return (
            <div key={i}>
              <button
                onClick={() => elegida === null && setElegida(i)}
                disabled={elegida !== null}
                className={`w-full text-left rounded-xl border px-4 py-3 text-sm text-white transition-colors ${estilo}`}
              >
                {mostrarFeedback && activa && (op.esPeligrosa ? '🔴 ' : op.esCorrecta ? '✅ ' : '🟠 ')}
                {tr(op.texto)}
              </button>
              {mostrarFeedback && activa && (
                <p className={`text-xs mt-2 px-1 leading-relaxed ${op.esPeligrosa ? 'text-red-300' : 'text-white/50'}`}>
                  {tr(op.explicacion)}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {elegida !== null && (
        <button
          onClick={() => onElegir(decision.opciones[elegida])}
          className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-xl transition-all"
        >
          {tr({ es: 'Continuar', en: 'Continue', ca: 'Continua' })}
        </button>
      )}
    </div>
  )
}
