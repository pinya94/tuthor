import MechanicExam from '../components/MechanicExam'
import { nuevaRonda, esCorrecta, formatNum, placeFrase } from '../lib/redondeo'
import { RectaRedondeo } from '../components/RectaRedondeo'

const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil',
    label: { es: 'A la decena', en: 'Nearest ten', ca: 'A la desena' },
    hint: { es: 'Números de 2-3 cifras', en: '2-3 digit numbers', ca: 'Nombres de 2-3 xifres' } },
  { key: 'medio', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Decena y centena', en: 'Ten and hundred', ca: 'Desena i centena' },
    hint: { es: 'Hasta 4 cifras', en: 'Up to 4 digits', ca: 'Fins a 4 xifres' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Millares y decimales', en: 'Thousands and decimals', ca: 'Milers i decimals' },
    hint: { es: 'Todos los órdenes', en: 'All places', ca: 'Tots els ordres' } },
]

function RedondeoPregunta({ round, phase, onAnswer, l }) {
  const revelado = phase === 'result'
  const opciones = [round.abajo, round.arriba]

  function optClass(v) {
    if (!revelado) return 'bg-white/10 border-white/20 text-white hover:bg-white/20 active:scale-95'
    if (Math.abs(v - round.objetivo) < 1e-9) return 'bg-green-500/25 border-green-400 text-green-200'
    return 'bg-white/5 border-white/10 text-white/40'
  }

  return (
    <>
      <div className="text-center mb-1">
        <p className="text-white/40 text-xs uppercase tracking-widest">{l === 'en' ? 'Round' : l === 'ca' ? 'Arrodoneix' : 'Redondea'} {placeFrase(round.p, l)}</p>
        <p className="text-white font-black text-4xl tabular-nums">{formatNum(round.valor, l, round.decimales)}</p>
      </div>

      <div className="mb-2"><RectaRedondeo ronda={round} l={l} revealNearest={revelado ? round.objetivo : null} className="w-full h-auto" /></div>

      <div className="grid grid-cols-2 gap-3">
        {opciones.map(v => (
          <button key={v} onClick={() => !revelado && onAnswer(v)} disabled={revelado}
            className={`py-5 rounded-2xl border font-black text-2xl tabular-nums transition ${optClass(v)}`}>
            {formatNum(v, l, round.decimales)}
          </button>
        ))}
      </div>
    </>
  )
}

function renderQuestion({ round, phase, onAnswer, l, qIndex }) {
  return <RedondeoPregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
}

export default function RedondeoExamen() {
  return (
    <MechanicExam
      gameId="redondeo-test"
      emoji="📍"
      badge={{ es: 'Examen · Números', en: 'Exam · Numbers', ca: 'Examen · Nombres' }}
      title={{ es: '📍 Examen: Redondeo', en: '📍 Exam: Rounding', ca: '📍 Examen: Arrodoniment' }}
      sub={{ es: 'Elige el redondo más cercano', en: 'Pick the nearest round number', ca: 'Tria el redó més proper' }}
      metaTitle={{ es: 'Examen de redondeo — decena, centena, millar y decimales', en: 'Rounding exam — ten, hundred, thousand and decimals', ca: 'Examen d\'arrodoniment — desena, centena, miler i decimals' }}
      metaDesc={{ es: 'Examen de redondeo con la mecánica del juego: elige el número redondo más cercano sobre la recta, con la regla del 5. Decena, centena, millar y decimales. 10 preguntas con nota, sin tiempo.', en: 'Rounding exam using the game mechanic: pick the nearest round number on the line, with the rule of 5. Ten, hundred, thousand and decimals. 10 graded questions, no timer.', ca: 'Examen d\'arrodoniment amb la mecànica del joc: tria el nombre redó més proper sobre la recta, amb la regla del 5. Desena, centena, miler i decimals. 10 preguntes amb nota, sense temps.' }}
      metaPath="/examen/redondeo-test"
      subjectSchema="Matemáticas"
      backGamePath="/juegos/redondeo"
      playLabel={{ es: 'Modo arcade (50s)', en: 'Arcade mode (50s)', ca: 'Mode arcade (50s)' }}
      levels={LEVELS}
      genRound={nuevaRonda}
      isCorrect={esCorrecta}
      renderQuestion={renderQuestion}
    />
  )
}
