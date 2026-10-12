import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaNewton from '../components/newtonAccion/PreguntaNewton'
import { genRound, esCorrecta, schemaQuestion } from '../lib/newtonAccion'

// Examen con la mecánica de Newton en Acción: las mismas escenas, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'F = m · a, peso y masa, leyes de Newton', en: 'F = m × a, weight and mass, Newton’s laws', ca: 'F = m · a, pes i massa, lleis de Newton' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Despejes y rozamiento', en: 'Rearranging and friction', ca: 'Aïllaments i fregament' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Plano inclinado y ascensor', en: 'Inclined planes and lifts', ca: 'Pla inclinat i ascensor' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaNewton ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function NewtonAccionExamen() {
  return (
    <MechanicExam
      gameId="newton-accion-test"
      emoji="🍎"
      badge={{ es: 'Examen · Dinámica', en: 'Exam · Dynamics', ca: 'Examen · Dinàmica' }}
      title={{ es: 'Examen de dinámica y leyes de Newton', en: 'Dynamics and Newton’s Laws Exam', ca: 'Examen de dinàmica i lleis de Newton' }}
      sub={{ es: 'Fuerzas dibujadas: rozamiento, plano inclinado y ascensor', en: 'Drawn forces: friction, slopes and lifts', ca: 'Forces dibuixades: fregament, pla inclinat i ascensor' }}
      metaTitle={{ es: 'Examen de dinámica: leyes de Newton, rozamiento y plano inclinado', en: 'Dynamics exam: Newton’s laws, friction and inclined planes', ca: 'Examen de dinàmica: lleis de Newton, fregament i pla inclinat' }}
      metaDesc={{ es: 'Examen de dinámica con las fuerzas dibujadas: segunda ley de Newton, peso y masa, rozamiento, plano inclinado, peso aparente en un ascensor, inercia y acción-reacción. 10 preguntas, tres niveles.', en: 'Dynamics exam with the forces drawn: Newton’s second law, weight and mass, friction, inclined planes, apparent weight in a lift, inertia and action-reaction. 10 questions, three levels.', ca: 'Examen de dinàmica amb les forces dibuixades: segona llei de Newton, pes i massa, fregament, pla inclinat, pes aparent en un ascensor, inèrcia i acció-reacció. 10 preguntes, tres nivells.' }}
      metaPath="/examen/newton-accion-test"
      subjectSchema="Física"
      backGamePath="/juegos/newton-accion"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
