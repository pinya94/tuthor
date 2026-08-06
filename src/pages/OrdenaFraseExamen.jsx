import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import OrdenaFraseBoard from '../components/OrdenaFraseBoard'
import { genRound, isCorrectOrder } from '../lib/ordenaFrase'

// Examen con la mecánica del juego: colocar las palabras en el orden correcto.
// 10 preguntas, sin tiempo. A diferencia del arcade, aquí hay botón de
// comprobar (nadie corre) y la regla se lee con calma tras cada respuesta.
const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Iniciación', en: 'Beginner', ca: 'Iniciació' },
    hint: { es: 'Sujeto + verbo + objeto y adjetivos', en: 'Subject + verb + object and adjectives', ca: 'Subjecte + verb + objecte i adjectius' } },
  { key: 'medio', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Adverbios, negativas y preguntas', en: 'Adverbs, negatives and questions', ca: 'Adverbis, negatives i preguntes' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' },
    hint: { es: 'Lugar y tiempo, wh- y el verbo be', en: 'Place and time, wh- and the verb be', ca: 'Lloc i temps, wh- i el verb be' } },
]

const L = {
  check: { es: 'Comprobar', en: 'Check', ca: 'Comprovar' },
  clear: { es: 'Borrar', en: 'Clear', ca: 'Esborrar' },
}

function Question({ round, phase, onAnswer, l }) {
  const [placed, setPlaced] = useState([])
  const [wasCorrect, setWasCorrect] = useState(null)
  const reveal = phase === 'result'
  const completa = placed.length === round.chips.length

  function check() {
    const ok = isCorrectOrder(round, placed.map(i => round.chips[i]))
    setWasCorrect(ok)
    onAnswer(ok ? 'ok' : 'fail')
  }

  return (
    <>
      <OrdenaFraseBoard chips={round.chips} placed={placed} reveal={reveal}
        correct={wasCorrect} solution={round.solution}
        onPlace={i => setPlaced(p => (p.includes(i) ? p : [...p, i]))}
        onRemove={pos => setPlaced(p => p.filter((_, i) => i !== pos))}
        l={l} />

      {/* La regla es lo que enseña: se lee siempre, se acierte o no */}
      {reveal && (
        <div className="mt-3 rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">
          <p className="text-white/70 text-sm">💡 {round.rule[l] ?? round.rule.es}</p>
        </div>
      )}

      {!reveal && (
        <div className="mt-3 flex gap-2">
          <button onClick={() => setPlaced([])} disabled={placed.length === 0}
            className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 font-semibold hover:bg-white/10 disabled:opacity-40 transition text-sm">
            {L.clear[l] ?? L.clear.es}
          </button>
          <button onClick={check} disabled={!completa}
            className="flex-1 py-2.5 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 disabled:opacity-40 disabled:hover:bg-[#EDAE49] transition text-sm">
            {L.check[l] ?? L.check.es}
          </button>
        </div>
      )}
    </>
  )
}

export default function OrdenaFraseExamen() {
  return (
    <MechanicExam
      gameId="ordena-frase-test"
      emoji="🔤"
      badge={{ es: 'Examen · Word order', en: 'Exam · Word order', ca: 'Examen · Word order' }}
      title={{ es: '🔤 Examen Ordena la Frase', en: '🔤 Word Order Exam', ca: '🔤 Examen Ordena la Frase' }}
      sub={{ es: 'Coloca las palabras en el orden correcto en inglés', en: 'Put the words in the right English order', ca: 'Col·loca les paraules en l’ordre correcte en anglès' }}
      metaTitle={{ es: 'Examen de Word Order — Orden de las palabras en inglés', en: 'Word Order Exam — English sentence order', ca: 'Examen de Word Order — Ordre de les paraules en anglès' }}
      metaDesc={{ es: 'Examen de word order con la mecánica del juego: coloca las palabras en el orden correcto en inglés. Adjetivo antes del nombre, adverbios de frecuencia, preguntas con auxiliar. 10 preguntas, sin tiempo.', en: 'Word order exam using the game mechanic: put the words in the right English order. Adjective before noun, frequency adverbs, questions with auxiliaries. 10 questions, no timer.', ca: 'Examen de word order amb la mecànica del joc: col·loca les paraules en l’ordre correcte en anglès. 10 preguntes, sense temps.' }}
      metaPath="/examen/ordena-frase-test"
      subjectSchema="Inglés"
      backGamePath="/juegos/ordena-frase"
      playLabel={{ es: 'Modo arcade (90s)', en: 'Arcade mode (90s)', ca: 'Mode arcade (90s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={(round, ans) => ans === 'ok'}
      renderQuestion={({ round, phase, onAnswer, l, qIndex }) => (
        <Question key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
      )}
    />
  )
}
