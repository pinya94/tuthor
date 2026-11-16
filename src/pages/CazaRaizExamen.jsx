import MechanicExam from '../components/MechanicExam'
import PreguntaRaiz from '../components/cazaRaiz/PreguntaRaiz'
import { genRound, esCorrecta, schemaQuestion } from '../lib/cazaRaiz'

// Examen con la mecánica de Caza la Raíz: las mismas rondas, sin cuenta atrás.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
    hint: { es: 'Ecuaciones incompletas', en: 'Incomplete equations', ca: 'Equacions incompletes' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
    hint: { es: 'Completas con la fórmula', en: 'Complete, with the formula', ca: 'Completes amb la fórmula' } },
  { key: 'avanzado', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
    hint: { es: 'Con a ≠ 1 y sin ordenar', en: 'With a ≠ 1, not rearranged', ca: 'Amb a ≠ 1 i sense ordenar' } },
]

export default function CazaRaizExamen() {
  return (
    <MechanicExam
      gameId="caza-la-raiz-test"
      emoji="🌱"
      badge={{ es: 'Examen · Álgebra', en: 'Exam · Algebra', ca: 'Examen · Àlgebra' }}
      title={{ es: 'Ecuaciones de segundo grado', en: 'Quadratic Equations', ca: 'Equacions de segon grau' }}
      sub={{ es: 'Marca las soluciones en el eje X', en: 'Mark the solutions on the x-axis', ca: 'Marca les solucions a l’eix X' }}
      metaTitle={{ es: 'Examen de ecuaciones de segundo grado (con el juego Caza la Raíz)', en: 'Quadratic equations exam (with the Root Hunt game)', ca: 'Examen d’equacions de segon grau (amb el joc Caça l’Arrel)' }}
      metaDesc={{ es: 'Examen de ecuaciones de segundo grado: incompletas, completas con la fórmula, solución doble y sin solución real. Marca las raíces en el eje y ve la parábola y la resolución. 10 ecuaciones en tres niveles.', en: 'Quadratic equations exam: incomplete and complete equations, repeated roots and no real solutions. Mark the roots on the axis and see the parabola and the working. 10 equations on three levels.', ca: 'Examen d’equacions de segon grau: incompletes, completes amb la fórmula, solució doble i sense solució real. Marca les arrels a l’eix i mira la paràbola i la resolució. 10 equacions en tres nivells.' }}
      metaPath="/examen/caza-la-raiz-test"
      subjectSchema="Matemáticas"
      backGamePath="/juegos/caza-la-raiz"
      playLabel={{ es: 'Modo arcade (150s)', en: 'Arcade mode (150s)', ca: 'Mode arcade (150s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <PreguntaRaiz key={qIndex} ronda={round} revelado={phase === 'result'} onResponder={onAnswer} />}
    />
  )
}
