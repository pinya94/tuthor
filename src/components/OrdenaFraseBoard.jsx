// Tablero de Ordena la Frase: fichas disponibles arriba y la frase que se va
// construyendo abajo. Compartido por el juego, el examen y el reto diario.
//
//   chips     palabras barajadas (array de strings)
//   placed    índices de `chips` ya colocados, EN ORDEN
//   reveal    bool — al revelar se bloquea y se marca acierto/fallo
//   correct   bool — resultado (solo se usa al revelar)
//   solution  orden correcto (array de strings), para mostrarlo si se falló
//   onPlace / onRemove   (i) => void
import { sentenceText } from '../lib/ordenaFrase'

const L = {
  hint:  { es: 'Toca las palabras en orden', en: 'Tap the words in order', ca: 'Toca les paraules en ordre' },
  empty: { es: 'Tu frase aparecerá aquí', en: 'Your sentence will appear here', ca: 'La teva frase apareixerà aquí' },
  right: { es: '✓ ¡Correcto!', en: '✓ Correct!', ca: '✓ Correcte!' },
  wrong: { es: 'El orden correcto era', en: 'The correct order was', ca: "L'ordre correcte era" },
}

export default function OrdenaFraseBoard({ chips, placed, reveal, correct, solution = [], onPlace, onRemove, l = 'es' }) {
  const used = new Set(placed)
  const t = k => L[k][l] ?? L[k].es

  return (
    <div className="w-full">
      {/* Frase en construcción */}
      <div className={`min-h-[64px] flex flex-wrap items-center justify-center gap-2 rounded-xl border px-3 py-3 mb-3 transition-colors ${
        reveal
          ? correct ? 'border-green-500/60 bg-green-500/10' : 'border-red-500/60 bg-red-500/10'
          : 'border-white/15 bg-[#0d1117]'
      }`}>
        {placed.length === 0 ? (
          <span className="text-white/25 text-sm">{t('empty')}</span>
        ) : placed.map((ci, pos) => (
          <button key={`${ci}-${pos}`} onClick={() => !reveal && onRemove(pos)} disabled={reveal}
            className={`px-3 py-2 rounded-lg border text-base font-medium transition-all ${
              reveal
                ? correct ? 'border-green-500/60 text-green-200' : 'border-red-500/50 text-red-200'
                : 'bg-[#EDAE49]/20 border-[#EDAE49]/60 text-white hover:bg-[#EDAE49]/30'
            }`}>
            {chips[ci]}
          </button>
        ))}
      </div>

      {/* Fichas disponibles */}
      {!reveal && (
        <>
          <p className="text-center text-white/40 text-xs mb-2">{t('hint')}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {chips.map((tok, i) => used.has(i) ? (
              // Hueco: mantiene el tamaño para que no baile el layout
              <span key={i} className="px-3 py-2 rounded-lg border border-dashed border-white/10 text-transparent select-none">{tok}</span>
            ) : (
              <button key={i} onClick={() => onPlace(i)}
                className="px-3 py-2 rounded-lg border bg-white/5 border-white/15 text-white/85 text-base font-medium hover:bg-white/10 hover:border-white/30 transition-all">
                {tok}
              </button>
            ))}
          </div>
        </>
      )}

      {/* Resultado */}
      {reveal && (
        <div className="text-center">
          {correct
            ? <p className="text-green-400 font-black">{t('right')}</p>
            : (
              <p className="text-white/60 text-sm">
                {t('wrong')}: <span className="text-green-400 font-bold">{sentenceText(solution)}</span>
              </p>
            )}
        </div>
      )}
    </div>
  )
}
