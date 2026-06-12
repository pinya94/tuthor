import { useState } from 'react'

const correct = '1936'
const options = ['1934', '1936', '1939', '1931']

export default function PreguntaDiaria() {
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)

  return (
    <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
      <div className="max-w-lg w-full bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-orange-500 to-rose-600 px-6 sm:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-xs font-medium">Reto de hoy</p>
              <h2 className="text-2xl font-black text-white mt-0.5">Pregunta Diaria</h2>
            </div>
            <div className="text-right">
              <p className="text-orange-100 text-xs">Tu racha</p>
              <p className="text-3xl font-black text-white">🔥 0</p>
            </div>
          </div>
        </div>
        <div className="px-6 sm:px-8 py-6">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Historia · ESO</p>
          <h3 className="text-xl font-bold text-white leading-snug mb-6">
            ¿En qué año comenzó la Guerra Civil Española?
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {options.map(op => (
              <button
                key={op}
                onClick={() => !answered && setSelected(op)}
                className={`py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all
                  ${answered
                    ? op === correct ? 'border-green-500 bg-green-500/20 text-green-400'
                      : op === selected && selected !== correct ? 'border-red-500 bg-red-500/20 text-red-400'
                      : 'border-white/10 text-white/30'
                    : selected === op ? 'border-violet-500 bg-violet-500/20 text-white'
                    : 'border-white/10 text-white/70 hover:border-violet-400 hover:bg-violet-500/10'}`}
              >
                {op}
              </button>
            ))}
          </div>
        </div>
        <div className="px-6 sm:px-8 pb-8">
          {!answered ? (
            <button
              onClick={() => selected && setAnswered(true)}
              disabled={!selected}
              className="w-full bg-violet-600 disabled:opacity-30 text-white font-bold py-3 rounded-xl hover:bg-violet-700 transition-colors disabled:cursor-not-allowed"
            >
              Confirmar respuesta →
            </button>
          ) : (
            <div className={`text-center py-3 rounded-xl font-bold ${selected === correct ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {selected === correct ? '🎉 ¡Correcto! La respuesta es 1936' : `❌ Era ${correct}. ¡Sigue practicando!`}
            </div>
          )}
          <p className="text-center text-white/30 text-xs mt-3">Nueva pregunta mañana · Vuelve cada día</p>
        </div>
      </div>
    </div>
  )
}
