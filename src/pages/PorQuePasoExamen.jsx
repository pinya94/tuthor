import MechanicExam from '../components/MechanicExam'
import PreguntaPorQuePaso from '../components/porQuePaso/PreguntaPorQuePaso'
import { genRound, esCorrecta, schemaQuestion } from '../lib/porQuePaso'

// Examen con la mecánica de ¿Por Qué Pasó?: diez esquemas, sin cuenta atrás.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
    hint: { es: 'Una pieza por pregunta', en: 'One piece per question', ca: 'Una peça per pregunta' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
    hint: { es: 'Dos piezas por pregunta', en: 'Two pieces per question', ca: 'Dues peces per pregunta' } },
  { key: 'avanzado', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
    hint: { es: 'Tres piezas por pregunta', en: 'Three pieces per question', ca: 'Tres peces per pregunta' } },
]

export default function PorQuePasoExamen() {
  return (
    <MechanicExam
      gameId="por-que-paso-test"
      emoji="🗝️"
      badge={{ es: 'Examen · Historia', en: 'Exam · History', ca: 'Examen · Història' }}
      title={{ es: 'Causas y consecuencias', en: 'Causes and Consequences', ca: 'Causes i conseqüències' }}
      sub={{ es: 'Lo que provocó cada hecho y lo que vino después', en: 'What caused each event and what came after', ca: 'El que va provocar cada fet i el que va venir després' }}
      metaTitle={{ es: 'Examen de causas y consecuencias en historia (con el juego ¿Por Qué Pasó?)', en: 'History causes and consequences exam (with the Why Did It Happen? game)', ca: 'Examen de causes i conseqüències en història (amb el joc Per Què Va Passar?)' }}
      metaDesc={{ es: 'Examen de historia: clasifica causas y consecuencias de la Revolución francesa, las guerras mundiales, la Guerra Civil o la Transición. 10 preguntas en tres niveles.', en: 'History exam: sort the causes and consequences of the French Revolution, the world wars, the Spanish Civil War and more. 10 questions on three levels.', ca: 'Examen d’història: classifica causes i conseqüències de la Revolució francesa, les guerres mundials, la Guerra Civil o la Transició. 10 preguntes en tres nivells.' }}
      metaPath="/examen/por-que-paso-test"
      subjectSchema="Historia"
      backGamePath="/juegos/por-que-paso"
      playLabel={{ es: 'Modo arcade (90s)', en: 'Arcade mode (90s)', ca: 'Mode arcade (90s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <PreguntaPorQuePaso key={qIndex} ronda={round} revelado={phase === 'result'} onResponder={onAnswer} />}
    />
  )
}
