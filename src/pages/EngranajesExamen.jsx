import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaEngranajes from '../components/engranajes/PreguntaEngranajes'
import { genRound, esCorrecta, schemaQuestion } from '../lib/engranajes'

// Examen con la mecánica de Engranajes: los mismos trenes, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Dos o tres ruedas: sentido de giro y si va más rápida', en: 'Two or three gears: direction and whether it is faster', ca: 'Dues o tres rodes: sentit de gir i si va més ràpida' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Hasta cinco ruedas y el cálculo de las rpm', en: 'Up to five gears and working out the rpm', ca: 'Fins a cinc rodes i el càlcul de les rpm' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Con una rueda doble en el mismo eje', en: 'With a compound gear on one shaft', ca: 'Amb una roda doble al mateix eix' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaEngranajes ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function EngranajesExamen() {
  return (
    <MechanicExam
      gameId="engranajes-test"
      emoji="⚙️"
      badge={{ es: 'Examen · Máquinas y mecanismos', en: 'Exam · Machines and mechanisms', ca: 'Examen · Màquines i mecanismes' }}
      title={{ es: 'Examen de Engranajes', en: 'Gears Exam', ca: 'Examen d’Engranatges' }}
      sub={{ es: 'Sentido de giro y velocidad en trenes de engranajes', en: 'Direction and speed in gear trains', ca: 'Sentit de gir i velocitat en trens d’engranatges' }}
      metaTitle={{ es: 'Examen de engranajes: sentido de giro y rpm', en: 'Gears exam: direction and rpm', ca: 'Examen d’engranatges: sentit de gir i rpm' }}
      metaDesc={{ es: 'Examen de trenes de engranajes: hacia dónde gira la última rueda, si va más rápida y a cuántas rpm, con ruedas locas y dobles. 10 preguntas, tres niveles.', en: 'Gear train exam: which way the last gear turns, whether it is faster and at how many rpm, with idler and compound gears. 10 questions, three levels.', ca: 'Examen de trens d’engranatges: cap a on gira l’última roda, si va més ràpida i a quantes rpm, amb rodes boges i dobles. 10 preguntes, tres nivells.' }}
      metaPath="/examen/engranajes-test"
      subjectSchema="Física"
      backGamePath="/juegos/engranajes"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
