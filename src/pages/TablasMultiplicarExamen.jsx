import MechanicExam from '../components/MechanicExam'
import { nuevaPregunta, esCorrecta } from '../lib/tablas'

const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Tablas fáciles', en: 'Easy tables', ca: 'Taules fàcils' },
    hint: { es: 'El 2, el 5 y el 10', en: '2, 5 and 10', ca: 'El 2, el 5 i el 10' } },
  { key: 'medio', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Todas las tablas', en: 'All tables', ca: 'Totes les taules' },
    hint: { es: 'Del 1 al 10', en: 'From 1 to 10', ca: 'De l\'1 al 10' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Tablas y divisiones', en: 'Tables and divisions', ca: 'Taules i divisions' },
    hint: { es: 'Multiplicar y dividir', en: 'Multiply and divide', ca: 'Multiplicar i dividir' } },
]

function TablasPregunta({ round, phase, onAnswer, l }) {
  const revelado = phase === 'result'

  function optClass(v) {
    if (!revelado) return 'bg-white/10 border-white/20 text-white hover:bg-white/20 active:scale-95'
    if (v === round.resultado) return 'bg-green-500/25 border-green-400 text-green-200'
    return 'bg-white/5 border-white/10 text-white/40'
  }

  return (
    <>
      <div className="rounded-2xl border border-white/10 bg-black/25 py-7 mb-4 text-center">
        <span className="text-white font-black text-5xl tabular-nums tracking-tight">{round.texto}</span>
        <span className="text-white/30 font-black text-5xl"> = ?</span>
      </div>

      {revelado && (
        <p className="text-center font-black mb-3 text-green-400">
          {round.texto} = {round.resultado}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3">
        {round.opciones.map(v => (
          <button key={v} onClick={() => !revelado && onAnswer(v)} disabled={revelado}
            className={`py-6 rounded-2xl border font-black text-3xl tabular-nums transition ${optClass(v)}`}>
            {v}
          </button>
        ))}
      </div>
    </>
  )
}

function renderQuestion({ round, phase, onAnswer, l, qIndex }) {
  return <TablasPregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
}

export default function TablasMultiplicarExamen() {
  return (
    <MechanicExam
      gameId="tablas-multiplicar-test"
      emoji="✖️"
      badge={{ es: 'Examen · Cálculo', en: 'Exam · Arithmetic', ca: 'Examen · Càlcul' }}
      title={{ es: '✖️ Examen: Tablas de Multiplicar', en: '✖️ Exam: Times Tables', ca: '✖️ Examen: Taules de Multiplicar' }}
      sub={{ es: 'Elige el resultado de cada operación', en: 'Pick the answer to each operation', ca: 'Tria el resultat de cada operació' }}
      metaTitle={{ es: 'Examen de tablas de multiplicar — del 1 al 10 con divisiones', en: 'Times tables exam — 1 to 10 with divisions', ca: 'Examen de taules de multiplicar — de l\'1 al 10 amb divisions' }}
      metaDesc={{ es: 'Examen de tablas de multiplicar con la mecánica del juego: elige el resultado de cada multiplicación o división entre cuatro opciones. Del 1 al 10. 10 preguntas con nota, sin tiempo.', en: 'Times tables exam using the game mechanic: pick the answer to each multiplication or division among four options. From 1 to 10. 10 graded questions, no timer.', ca: 'Examen de taules de multiplicar amb la mecànica del joc: tria el resultat de cada multiplicació o divisió entre quatre opcions. De l\'1 al 10. 10 preguntes amb nota, sense temps.' }}
      metaPath="/examen/tablas-multiplicar-test"
      subjectSchema="Matemáticas"
      backGamePath="/juegos/tablas-multiplicar"
      playLabel={{ es: 'Modo arcade (50s)', en: 'Arcade mode (50s)', ca: 'Mode arcade (50s)' }}
      levels={LEVELS}
      genRound={nuevaPregunta}
      isCorrect={esCorrecta}
      renderQuestion={renderQuestion}
    />
  )
}
