// Una pregunta tipo test (los bancos de ExamenMC) con la forma que espera un
// reto (ver ExamenReto): genRound / isCorrect / renderQuestion. Así los
// exámenes tipo test se pueden mandar de deberes o jugar en directo igual que
// los de mecánica. A diferencia del examen normal, aquí hay un solo intento:
// en una partida, como en cualquier concurso, se responde una vez.
import { useState } from 'react'
import { get, indiceCorrecto } from '../../lib/retoTest'

export function PreguntaTest({ ronda, revelado, onResponder, l }) {
  const [elegida, setElegida] = useState(null)
  const { q, orden } = ronda
  const opciones = get(q.opciones, l)
  const buena = indiceCorrecto(q)
  return (
    <div className="w-full">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-3 flex flex-col items-center gap-3 text-center">
        {q.emoji && <span className="text-5xl leading-none">{q.emoji}</span>}
        <p className="text-white font-bold text-lg leading-snug">{get(q.pregunta, l)}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {orden.map(i => {
          const color = revelado
            ? i === buena ? 'bg-green-500/20 border-green-400 text-green-300' : i === elegida ? 'bg-red-500/20 border-red-400 text-red-300' : 'bg-white/5 border-white/10 text-white/30'
            : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
          return (
            <button key={i} type="button" disabled={revelado || elegida != null}
              onClick={() => { setElegida(i); onResponder(i) }}
              className={`py-3 px-3 rounded-xl font-bold text-sm border-2 text-center transition-all ${color}`}>
              {opciones[i]}
            </button>
          )
        })}
      </div>
      {revelado && get(q.explicacion, l) && <p className="mt-3 text-white/75 text-sm rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">💡 {get(q.explicacion, l)}</p>}
    </div>
  )
}
