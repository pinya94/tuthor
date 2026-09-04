import { MIN_OPCIONES, MAX_OPCIONES, MAX_PREGUNTAS, TEXTO_PREGUNTA_MAX, TEXTO_OPCION_MAX, preguntaVacia } from '../lib/quiz'

// El editor de un examen propio: preguntas de opción múltiple, escritas a
// mano. `preguntas` / `onChange` es el mismo par controlado que cualquier
// input — el componente no toca Firestore, solo edita el array en memoria
// que ProfesorClase.jsx manda a createAssignment al enviar el formulario.

export default function QuizBuilder({ preguntas, onChange, tr }) {
  function actualizarPregunta(i, cambios) {
    onChange(preguntas.map((p, idx) => (idx === i ? { ...p, ...cambios } : p)))
  }

  function actualizarOpcion(i, j, texto) {
    onChange(preguntas.map((p, idx) => (idx === i ? { ...p, options: p.options.map((o, oj) => (oj === j ? texto : o)) } : p)))
  }

  function anadirOpcion(i) {
    onChange(preguntas.map((p, idx) => (idx === i && p.options.length < MAX_OPCIONES ? { ...p, options: [...p.options, ''] } : p)))
  }

  // Quitar una opción que era la correcta deja la marca en la primera que
  // quede, en vez de en un índice que ya no existe: sin esto, correctIndex
  // podría apuntar fuera del array tras borrar.
  function quitarOpcion(i, j) {
    onChange(preguntas.map((p, idx) => {
      if (idx !== i || p.options.length <= MIN_OPCIONES) return p
      const options = p.options.filter((_, oj) => oj !== j)
      const correctIndex = p.correctIndex === j ? 0 : p.correctIndex > j ? p.correctIndex - 1 : p.correctIndex
      return { ...p, options, correctIndex }
    }))
  }

  function anadirPregunta() {
    if (preguntas.length < MAX_PREGUNTAS) onChange([...preguntas, preguntaVacia()])
  }

  // Nunca a cero: el formulario exige al menos una pregunta, así que la
  // última no se puede quitar (se vacía escribiendo encima, si hace falta).
  function quitarPregunta(i) {
    if (preguntas.length > 1) onChange(preguntas.filter((_, idx) => idx !== i))
  }

  return (
    <div className="space-y-3">
      {preguntas.map((p, i) => (
        <div key={i} className="rounded-xl border border-white/10 bg-black/20 p-3 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-white/30 text-[11px] font-bold shrink-0">#{i + 1}</span>
            <input value={p.text} onChange={e => actualizarPregunta(i, { text: e.target.value })} maxLength={TEXTO_PREGUNTA_MAX}
              placeholder={tr({ es: 'Escribe la pregunta…', en: 'Write the question…', ca: 'Escriu la pregunta…' })}
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-[13px] placeholder:text-white/25 outline-none focus:border-teal-500 transition-colors" />
            {preguntas.length > 1 && (
              <button type="button" onClick={() => quitarPregunta(i)}
                className="shrink-0 text-white/25 hover:text-red-400 px-1 transition-colors">✕</button>
            )}
          </div>

          <div className="space-y-1.5 pl-6">
            {p.options.map((o, j) => (
              <div key={j} className="flex items-center gap-2">
                <input type="radio" name={`correcta-${i}`} checked={p.correctIndex === j}
                  onChange={() => actualizarPregunta(i, { correctIndex: j })}
                  className="shrink-0 accent-teal-500" />
                <input value={o} onChange={e => actualizarOpcion(i, j, e.target.value)} maxLength={TEXTO_OPCION_MAX}
                  placeholder={tr({ es: `Opción ${j + 1}`, en: `Option ${j + 1}`, ca: `Opció ${j + 1}` })}
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-white text-[12.5px] placeholder:text-white/25 outline-none focus:border-teal-500 transition-colors" />
                {p.options.length > MIN_OPCIONES && (
                  <button type="button" onClick={() => quitarOpcion(i, j)}
                    className="shrink-0 text-white/20 hover:text-red-400 text-[11px] px-1 transition-colors">✕</button>
                )}
              </div>
            ))}
            {p.options.length < MAX_OPCIONES && (
              <button type="button" onClick={() => anadirOpcion(i)}
                className="text-teal-400/70 hover:text-teal-400 text-[11.5px] font-bold transition-colors">
                + {tr({ es: 'Opción', en: 'Option', ca: 'Opció' })}
              </button>
            )}
          </div>
        </div>
      ))}

      {preguntas.length < MAX_PREGUNTAS && (
        <button type="button" onClick={anadirPregunta}
          className="text-[12.5px] font-bold px-3 py-1.5 rounded-lg border border-white/10 text-white/60 hover:bg-white/5 transition-colors">
          + {tr({ es: 'Pregunta', en: 'Question', ca: 'Pregunta' })}
        </button>
      )}

      <p className="text-white/25 text-[11px]">
        {tr({
          es: 'Marca con el punto cuál es la respuesta correcta de cada pregunta.',
          en: 'Mark with the dot which is the correct answer for each question.',
          ca: 'Marca amb el punt quina és la resposta correcta de cada pregunta.',
        })}
      </p>
    </div>
  )
}
