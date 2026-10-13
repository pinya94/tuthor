import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaFilosofo from '../components/quienLoPenso/PreguntaFilosofo'
import { genRonda, esCorrecta, schemaQuestion } from '../lib/quienLoPenso'

// Examen con la mecánica de ¿Quién lo Pensó?, fijado a una época: cada tema
// de filosofía tiene su propio examen (uno compartido colisionaría al volver
// de una tarea del profesor).
const genRound = difficulty => genRonda(difficulty, { epoca: 'antigua' })
const LEVELS = [
  { key: 'eso', emoji: '💚', difficulty: 'facil',
    label: { es: 'ESO', en: 'Secondary', ca: 'ESO' },
    hint: { es: 'Ideas y conceptos clave', en: 'Ideas and key concepts', ca: 'Idees i conceptes clau' } },
  { key: 'bachillerato', emoji: '💛', difficulty: 'medio',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Con las corrientes', en: 'With the schools', ca: 'Amb els corrents' } },
  { key: 'pau', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'PAU', en: 'University entrance', ca: 'PAU' },
    hint: { es: 'Con la cronología', en: 'With chronology', ca: 'Amb la cronologia' } },
]

function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaFilosofo ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function QuienLoPensoAntiguaExamen() {
  return (
    <MechanicExam
      gameId="quien-lo-penso-antigua-test"
      emoji="🦉"
      badge={{ es: 'Examen · Filosofía', en: 'Exam · Philosophy', ca: 'Examen · Filosofia' }}
      title={{es: 'Examen: ¿quién lo pensó? (Antigüedad y Edad Media)', en: 'Exam: who thought it? (Antiquity and Middle Ages)', ca: 'Examen: qui ho va pensar? (Antiguitat i Edat Mitjana)'}}
      sub={{es: 'De Tales a Ockham', en: 'From Thales to Ockham', ca: 'De Tales a Ockham'}}
      metaTitle={{es: 'Examen: ¿quién lo pensó? (Antigüedad y Edad Media)', en: 'Exam: who thought it? (Antiquity and Middle Ages)', ca: 'Examen: qui ho va pensar? (Antiguitat i Edat Mitjana)'}}
      metaDesc={{ es: 'Examen de historia de la filosofía con la línea del tiempo: qué filósofo defendió cada idea, su concepto clave, su corriente y quién vivió antes. 10 preguntas, tres niveles.', en: 'History of philosophy exam with a timeline: which philosopher held each idea, their key concept, school and who lived first. 10 questions, three levels.', ca: 'Examen d’història de la filosofia amb la línia del temps: quin filòsof va defensar cada idea, el seu concepte clau, el seu corrent i qui va viure abans. 10 preguntes, tres nivells.' }}
      metaPath="/examen/quien-lo-penso-antigua-test"
      subjectSchema="Filosofía"
      backGamePath="/juegos/quien-lo-penso"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
