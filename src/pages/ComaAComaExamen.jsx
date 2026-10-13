import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaComa from '../components/comaAComa/PreguntaComa'
import { genRound, esCorrecta, schemaQuestion } from '../lib/comaAComa'

// Examen con la mecánica de Coma a Coma: las mismas frases con hueco, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Vocativos, enumeraciones, ¿? y ¡!', en: 'Vocatives, lists, ¿? and ¡!', ca: 'Vocatius, enumeracions, ¿? i ¡!' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Incisos, conectores y dos puntos', en: 'Asides, connectors and colons', ca: 'Incisos, connectors i dos punts' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Punto y coma y el porqué de cada signo', en: 'Semicolons and the reason for each mark', ca: 'Punt i coma i el perquè de cada signe' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaComa ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function ComaAComaExamen() {
  return (
    <MechanicExam
      gameId="coma-a-coma-test"
      emoji="🖋️"
      badge={{ es: 'Examen · La puntuación', en: 'Exam · Spanish punctuation', ca: 'Examen · La puntuació' }}
      title={{ es: 'Examen de puntuación', en: 'Spanish Punctuation Exam', ca: 'Examen de puntuació' }}
      sub={{ es: 'Coma, punto y coma, dos puntos y ¿?¡!', en: 'Comma, semicolon, colon and ¿?¡!', ca: 'Coma, punt i coma, dos punts i ¿?¡!' }}
      metaTitle={{ es: 'Examen de puntuación: coma, punto y coma, dos puntos y signos de interrogación', en: 'Spanish punctuation exam', ca: 'Examen de puntuació castellana' }}
      metaDesc={{ es: 'Examen de puntuación con frases con hueco: vocativos, enumeraciones, incisos, conectores, la coma entre sujeto y verbo, dos puntos, punto y coma y los signos ¿ ¡ de apertura, con la regla explicada. 10 preguntas, tres niveles.', en: 'Spanish punctuation exam with gap sentences and the rule explained. 10 questions, three levels.', ca: 'Examen de puntuació castellana amb frases amb buit i la regla explicada. 10 preguntes, tres nivells.' }}
      metaPath="/examen/coma-a-coma-test"
      subjectSchema="Lengua"
      backGamePath="/juegos/coma-a-coma"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
