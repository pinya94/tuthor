// Frase con palabras seleccionables. Compartido por el juego, el examen y el
// reto diario de "Analiza la Frase".
//   tokens   array de palabras
//   selected array de índices marcados
//   correct  array de índices correctos (solo se usa al revelar)
//   reveal   bool — muestra aciertos / fallos / lo que faltaba
//   onToggle (i) => void — marcar/desmarcar (inactivo al revelar)
export default function SentenceBoard({ tokens, selected, correct = [], reveal, onToggle }) {
  const selSet = new Set(selected)
  const okSet = new Set(correct)

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {tokens.map((tok, i) => {
        const isSel = selSet.has(i)
        const isOk = okSet.has(i)
        let cls
        if (reveal) {
          if (isOk && isSel) cls = 'bg-green-500/25 border-green-500 text-green-200'          // acierto
          else if (isOk && !isSel) cls = 'bg-green-500/10 border-green-500 border-dashed text-green-300' // faltaba
          else if (!isOk && isSel) cls = 'bg-red-500/20 border-red-500 text-red-300'            // sobra
          else cls = 'bg-white/5 border-white/10 text-white/40'
        } else {
          cls = isSel
            ? 'bg-[#EDAE49]/25 border-[#EDAE49] text-white'
            : 'bg-white/5 border-white/15 text-white/85 hover:bg-white/10 hover:border-white/30'
        }
        return (
          <button key={i} onClick={() => !reveal && onToggle(i)} disabled={reveal}
            className={`px-3 py-2 rounded-lg border text-base font-medium transition-all ${cls}`}>
            {tok}
          </button>
        )
      })}
    </div>
  )
}
