import MechanicExam from '../components/MechanicExam'
import NumberLine from '../components/NumberLine'
import { RANGOS, generarRonda } from '../lib/saltaRectaEngine'

// Examen con la mecánica del juego: 10 preguntas, sin tiempo. Misma
// generación de rondas que el juego (lib/saltaRectaEngine) — "salta" y
// "adivina" significan lo mismo aquí que en el arcade.

const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, hint: { es: 'Rango −10 a 10, sin doble signo', en: 'Range −10 to 10, no double sign', ca: 'Rang −10 a 10, sense doble signe' } },
  { key: 'medio', emoji: '🟡', difficulty: 'medio', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, hint: { es: 'Rango −15 a 15, algo de doble signo', en: 'Range −15 to 15, some double sign', ca: 'Rang −15 a 15, una mica de doble signe' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, hint: { es: 'Rango −20 a 20, mucho doble signo', en: 'Range −20 to 20, lots of double sign', ca: 'Rang −20 a 20, molt de doble signe' } },
]

function genRound(difficulty) {
  return generarRonda(RANGOS[difficulty])
}

function isCorrect(round, answer) {
  if (answer === undefined || answer === null) return false
  return round.tipo === 'salta' ? answer === round.E : answer === round.d
}

function explicacion(round, l) {
  return {
    es: `${round.S} ${round.opTexto ?? (round.d >= 0 ? `+${round.d}` : `−${Math.abs(round.d)}`)} = ${round.E}`,
    en: `${round.S} ${round.opTexto ?? (round.d >= 0 ? `+${round.d}` : `−${Math.abs(round.d)}`)} = ${round.E}`,
    ca: `${round.S} ${round.opTexto ?? (round.d >= 0 ? `+${round.d}` : `−${Math.abs(round.d)}`)} = ${round.E}`,
  }[l]
}

function Pregunta({ round, phase, answer, onAnswer, l }) {
  const resuelto = phase === 'result'
  const marker = resuelto ? round.E : round.S

  if (round.tipo === 'salta') {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <p className="text-lime-400 text-xs font-black uppercase tracking-widest text-center mb-1">
          {{ es: '¿Dónde cae?', en: 'Where does it land?', ca: 'On cau?' }[l]}
        </p>
        <p className="text-white text-center text-sm">
          {{ es: `Empieza en ${round.S} y salta`, en: `Starts at ${round.S} and jumps`, ca: `Comença a ${round.S} i salta` }[l]}
        </p>
        <p className="text-white font-black text-2xl text-center tabular-nums">{round.opTexto}</p>
        <NumberLine min={round.min} max={round.max} S={round.S} marker={marker} marcados={resuelto ? null : round.candidatos}
          onTap={n => onAnswer(n)} disabled={resuelto} />
        {resuelto && <p className="text-white/50 text-sm text-center mt-2">{explicacion(round, l)}</p>}
      </div>
    )
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <p className="text-lime-400 text-xs font-black uppercase tracking-widest text-center mb-1">
        {{ es: '¿Qué operación fue?', en: 'Which operation was it?', ca: 'Quina operació va ser?' }[l]}
      </p>
      <p className="text-white text-center text-sm">
        {{ es: `De ${round.S} a ${round.E}`, en: `From ${round.S} to ${round.E}`, ca: `De ${round.S} a ${round.E}` }[l]}
      </p>
      <NumberLine min={round.min} max={round.max} S={round.S} marker={marker} marcados={null} onTap={() => {}} disabled />
      <div className="grid grid-cols-2 gap-2 mt-3">
        {round.opciones.map(op => (
          <button key={op.texto} disabled={resuelto} onClick={() => onAnswer(op.valor)}
            className={`py-3 px-2 border text-lg font-black rounded-xl tabular-nums transition-all ${
              resuelto
                ? op.valor === round.d ? 'bg-green-500/20 border-green-400 text-green-400'
                : op.valor === answer ? 'bg-red-500/20 border-red-400 text-red-400'
                : 'bg-white/5 border-white/10 text-white/30'
                : 'bg-white/10 hover:bg-white/20 border-white/15 text-white'
            }`}>
            {op.texto}
          </button>
        ))}
      </div>
      {resuelto && <p className="text-white/50 text-sm text-center mt-3">{explicacion(round, l)}</p>}
    </div>
  )
}

export default function SaltaRectaExamen() {
  return (
    <MechanicExam
      gameId="salta-recta-test"
      emoji="🐸"
      badge={{ es: 'Examen · Enteros', en: 'Exam · Integers', ca: 'Examen · Enters' }}
      title={{ es: '🐸 Examen Salta la Recta', en: '🐸 Jump the Number Line Exam', ca: '🐸 Examen Salta la Recta' }}
      sub={{ es: 'Salta por la recta o adivina qué operación fue', en: 'Jump the line or guess which operation it was', ca: 'Salta per la recta o endevina quina operació va ser' }}
      metaTitle={{ es: 'Examen de Enteros — Suma y Resta con Signos', en: 'Integers Exam — Signed Addition and Subtraction', ca: 'Examen d\'Enters — Suma i Resta amb Signes' }}
      metaDesc={{ es: 'Examen de enteros con la mecánica de la recta numérica: salta al resultado o adivina qué operación fue, incluida la regla de restar un negativo. 10 preguntas, sin tiempo.', en: 'Integers exam using the number-line mechanic: jump to the result or guess the operation, including the rule for subtracting a negative. 10 questions, no timer.', ca: 'Examen d\'enters amb la mecànica de la recta numèrica: salta al resultat o endevina quina operació va ser, inclosa la regla de restar un negatiu. 10 preguntes, sense temps.' }}
      metaPath="/examen/salta-recta-test"
      subjectSchema="Matemáticas"
      backGamePath="/juegos/salta-recta"
      playLabel={{ es: 'Modo arcade', en: 'Arcade mode', ca: 'Mode arcade' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={isCorrect}
      renderQuestion={({ round, phase, answer, onAnswer, l }) => (
        <Pregunta round={round} phase={phase} answer={answer} onAnswer={onAnswer} l={l} />
      )}
    />
  )
}
