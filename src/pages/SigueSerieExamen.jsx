import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaSerie from '../components/sigueSerie/PreguntaSerie'
import { genRound, esCorrecta, schemaQuestion } from '../lib/sigueSerie'

// Examen con la mecánica de Sigue la Serie: las mismas sucesiones, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Siguiente término, tipo de sucesión y figuras', en: 'Next term, kind of sequence and patterns', ca: 'Terme següent, tipus de successió i figures' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Término n-ésimo y término general', en: 'nth term and general term', ca: 'Terme n-èsim i terme general' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Término general y suma de términos', en: 'General term and sum of terms', ca: 'Terme general i suma de termes' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaSerie ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function SigueSerieExamen() {
  return (
    <MechanicExam
      gameId="sigue-serie-test"
      emoji="🐚"
      badge={{ es: 'Examen · Sucesiones', en: 'Exam · Sequences', ca: 'Examen · Successions' }}
      title={{ es: 'Examen de sucesiones y progresiones', en: 'Sequences Exam', ca: 'Examen de successions i progressions' }}
      sub={{ es: 'Aritméticas, geométricas, término general y suma', en: 'Arithmetic, geometric, general term and sum', ca: 'Aritmètiques, geomètriques, terme general i suma' }}
      metaTitle={{ es: 'Examen de progresiones aritméticas y geométricas', en: 'Arithmetic and geometric sequences exam', ca: 'Examen de progressions aritmètiques i geomètriques' }}
      metaDesc={{ es: 'Examen de sucesiones: siguiente término, tipo de progresión, figuras de puntos, término n-ésimo, término general y suma de los n primeros términos, con explicación. 10 preguntas, tres niveles.', en: 'Sequences exam: next term, kind of sequence, dot patterns, nth term, general term and sum of the first n terms, with explanations. 10 questions, three levels.', ca: 'Examen de successions: terme següent, tipus de progressió, figures de punts, terme n-èsim, terme general i suma dels n primers termes, amb explicació. 10 preguntes, tres nivells.' }}
      metaPath="/examen/sigue-serie-test"
      subjectSchema="Matemáticas"
      backGamePath="/juegos/sigue-serie"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
