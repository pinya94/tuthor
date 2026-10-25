import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaCompas from '../components/compasCompleto/PreguntaCompas'
import { genRound, esCorrecta, schemaQuestion } from '../lib/compasCompleto'

// Examen con la mecánica de Compás Completo: las mismas figuras y compases, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Figuras y compases sencillos', en: 'Note values and simple bars', ca: 'Figures i compassos senzills' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Con puntillos y silencios', en: 'With dots and rests', ca: 'Amb punts i silencis' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Descubrir el compás', en: 'Working out the time signature', ca: 'Descobrir el compàs' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaCompas ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function CompasCompletoExamen() {
  return (
    <MechanicExam
      gameId="compas-completo-test"
      emoji="🥁"
      badge={{ es: 'Examen · Ritmo', en: 'Exam · Rhythm', ca: 'Examen · Ritme' }}
      title={{ es: 'Examen de ritmo en el pentagrama', en: 'Rhythm Exam on the Staff', ca: 'Examen de ritme al pentagrama' }}
      sub={{ es: 'Figuras, silencios y compases', en: 'Note values, rests and time signatures', ca: 'Figures, silencis i compassos' }}
      metaTitle={{ es: 'Examen de ritmo: figuras, silencios y compases', en: 'Rhythm exam: note values, rests and bars', ca: 'Examen de ritme: figures, silencis i compassos' }}
      metaDesc={{ es: 'Examen de ritmo con las figuras dibujadas en el pentagrama: nombre y duración de cada figura y silencio, puntillos, completar compases y descubrir el compás. 10 preguntas, tres niveles.', en: 'Rhythm exam with notes drawn on the staff: name and length of each note and rest, dots, completing bars and working out the time signature. 10 questions, three levels.', ca: 'Examen de ritme amb les figures dibuixades al pentagrama: nom i durada de cada figura i silenci, punts, completar compassos i descobrir el compàs. 10 preguntes, tres nivells.' }}
      metaPath="/examen/compas-completo-test"
      subjectSchema="Música"
      backGamePath="/juegos/compas-completo"
      playLabel={{ es: 'Modo arcade (90s)', en: 'Arcade mode (90s)', ca: 'Mode arcade (90s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
