import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaDesafina from '../components/quienDesafina/PreguntaDesafina'
import { genRound, esCorrecta, schemaQuestion } from '../lib/quienDesafina'

// Examen con la mecánica de ¿Quién Desafina?: las mismas rondas, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
    hint: { es: 'Desafinados que se oyen bien', en: 'Clearly out of tune', ca: 'Desafinats que se senten bé' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
    hint: { es: 'Alto o bajo, y afinar', en: 'Sharp or flat, and tuning', ca: 'Alt o baix, i afinar' } },
  { key: 'avanzado', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Oído fino', en: 'Fine ear', ca: 'Orella fina' },
    hint: { es: 'Diferencias de 12 a 22 cents', en: 'Differences of 12 to 22 cents', ca: 'Diferències de 12 a 22 cents' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaDesafina ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function QuienDesafinaExamen() {
  return (
    <MechanicExam
      gameId="quien-desafina-test"
      emoji="🎶"
      badge={{ es: 'Examen · El sonido', en: 'Exam · Sound', ca: 'Examen · El so' }}
      title={{ es: 'Examen de afinación', en: 'Tuning Exam', ca: 'Examen d’afinació' }}
      sub={{ es: 'Con sonido: ¿cuál desafina y cuánto?', en: 'With sound: which is out of tune, and by how much?', ca: 'Amb so: quin desafina i quant?' }}
      metaTitle={{ es: 'Examen de afinación y oído musical', en: 'Tuning and musical ear exam', ca: 'Examen d’afinació i orella musical' }}
      metaDesc={{ es: 'Examen de afinación con sonido: tres instrumentos tocan la misma nota y uno desafina. Di cuál, si está alto o bajo, y afínalo; con las frecuencias en hercios y la desviación en cents. 10 preguntas, tres niveles.', en: 'Tuning exam with sound: three instruments play the same note and one is out of tune. Say which, whether sharp or flat, and tune it, with the frequencies in hertz and the deviation in cents. 10 questions, three levels.', ca: 'Examen d’afinació amb so: tres instruments toquen la mateixa nota i un desafina. Digues quin, si està alt o baix, i afina’l, amb les freqüències en hertzs i la desviació en cents. 10 preguntes, tres nivells.' }}
      metaPath="/examen/quien-desafina-test"
      subjectSchema="Música"
      backGamePath="/juegos/quien-desafina"
      playLabel={{ es: 'Modo arcade (120s)', en: 'Arcade mode (120s)', ca: 'Mode arcade (120s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
