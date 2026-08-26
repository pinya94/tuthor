import { useState } from 'react'
import BarChart from './BarChart'
import { explicacion } from '../lib/estadisticoEngine'

// Pregunta compartida por los 4 exámenes de Estadístico Exprés (media,
// mediana, moda, rango): gráfico de barras + input numérico. Cada examen
// solo aporta qué generador usa y el texto de la pregunta/placeholder.
export default function EstadisticoPregunta({ round, phase, onAnswer, l, prompt, placeholder }) {
  const [valor, setValor] = useState('')
  const resuelto = phase === 'result'

  function enviar() {
    if (valor === '' || resuelto) return
    onAnswer(Number(valor))
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <p className="text-sky-400 text-xs font-black uppercase tracking-widest text-center mb-1">{prompt[l]}</p>
      <BarChart valores={round.valores} />
      <div className="flex gap-2 max-w-xs mx-auto w-full">
        <input
          type="number"
          inputMode="numeric"
          autoFocus
          value={valor}
          disabled={resuelto}
          onChange={e => setValor(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && enviar()}
          placeholder={placeholder[l]}
          className="flex-1 min-w-0 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-center font-black text-xl tabular-nums focus:outline-none focus:border-sky-400"
        />
        {!resuelto && (
          <button onClick={enviar} disabled={valor === ''}
            className="px-5 py-3 bg-sky-500 hover:bg-sky-400 disabled:opacity-30 text-black font-black rounded-xl transition-all">
            ✓
          </button>
        )}
      </div>
      {resuelto && <p className="text-white/50 text-sm text-center mt-3">{explicacion(round, l)}</p>}
    </div>
  )
}
