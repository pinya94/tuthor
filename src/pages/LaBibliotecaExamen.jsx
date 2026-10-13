import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaLibro from '../components/laBiblioteca/PreguntaLibro'
import { genRound, esCorrecta, schemaQuestion } from '../lib/laBiblioteca'

// Examen con la mecánica de La Biblioteca: las mismas obras y la línea del tiempo, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Autores y géneros', en: 'Authors and genres', ca: 'Autors i gèneres' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Épocas, movimientos y sus rasgos', en: 'Periods, movements and their features', ca: 'Èpoques, moviments i els seus trets' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Con la cronología: cuál es más antigua', en: 'With chronology: which is older', ca: 'Amb la cronologia: quina és més antiga' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaLibro ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function LaBibliotecaExamen() {
  return (
    <MechanicExam
      gameId="la-biblioteca-test"
      emoji="📚"
      badge={{ es: 'Examen · Literatura', en: 'Exam · Literature', ca: 'Examen · Literatura' }}
      title={{ es: 'Examen de historia de la literatura', en: 'Spanish Literary History Exam', ca: 'Examen d’història de la literatura' }}
      sub={{ es: 'Obras, autores, géneros y épocas', en: 'Works, authors, genres and periods', ca: 'Obres, autors, gèneres i èpoques' }}
      metaTitle={{ es: 'Examen de literatura española: obras, autores, géneros y épocas', en: 'Spanish literature exam: works, authors and periods', ca: 'Examen de literatura espanyola: obres, autors i èpoques' }}
      metaDesc={{ es: 'Examen de historia de la literatura española, del Cantar de mio Cid a la posguerra: autor de cada obra, género, época o movimiento, rasgos de cada movimiento y cronología. 10 preguntas, tres niveles.', en: 'Spanish literary history exam from the Cantar de mio Cid to the post-war period. 10 questions, three levels.', ca: 'Examen d’història de la literatura espanyola, del Cantar de mio Cid a la postguerra. 10 preguntes, tres nivells.' }}
      metaPath="/examen/la-biblioteca-test"
      subjectSchema="Química"
      backGamePath="/juegos/la-biblioteca"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
