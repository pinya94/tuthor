import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaSenal from '../components/senalASenal/PreguntaSenal'
import { genRound, esCorrecta, schemaQuestion } from '../lib/senalASenal'

// Examen con la mecánica de Señal a Señal (montar y clasificar), sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Cuatro formas, con pistas', en: 'Four shapes, with hints', ca: 'Quatre formes, amb pistes' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Sin pistas', en: 'No hints', ca: 'Sense pistes' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Todas las formas', en: 'Every shape', ca: 'Totes les formes' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaSenal ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function SenalASenalExamen() {
  return (
    <MechanicExam
      gameId="senal-a-senal-test"
      emoji="🚸"
      badge={{ es: 'Examen · Seguridad vial', en: 'Exam · Road safety', ca: 'Examen · Seguretat viària' }}
      title={{ es: 'Examen de señales de tráfico', en: 'Road Signs Exam', ca: 'Examen de senyals de trànsit' }}
      sub={{ es: 'Monta y clasifica señales', en: 'Build and sort signs', ca: 'Munta i classifica senyals' }}
      metaTitle={{ es: 'Examen de señales de tráfico y seguridad vial', en: 'Road signs and road safety exam', ca: 'Examen de senyals de trànsit i seguretat viària' }}
      metaDesc={{ es: 'Examen de señales de tráfico: monta cada señal eligiendo su forma y su dibujo, y clasifícalas en peligro, prohibición, obligación, indicación o prioridad. 10 preguntas.', en: 'Road signs exam: build each sign by choosing its shape and symbol, and sort them into warning, prohibition, mandatory, information or priority. 10 questions.', ca: 'Examen de senyals de trànsit: munta cada senyal triant la forma i el dibuix, i classifica’ls en perill, prohibició, obligació, indicació o prioritat. 10 preguntes.' }}
      metaPath="/examen/senal-a-senal-test"
      subjectSchema="Vida Práctica"
      backGamePath="/juegos/senal-a-senal"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
