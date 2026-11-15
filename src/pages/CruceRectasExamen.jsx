import MechanicExam from '../components/MechanicExam'
import PreguntaRectas from '../components/cruceRectas/PreguntaRectas'
import { genRound, esCorrecta, schemaQuestion } from '../lib/cruceRectas'

// Examen con la mecánica de Cruce de Rectas: las mismas rondas, sin cuenta atrás.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
    hint: { es: 'Las rectas ya dibujadas', en: 'Lines already drawn', ca: 'Les rectes ja dibuixades' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
    hint: { es: 'Dibuja tú las dos rectas', en: 'Draw both lines yourself', ca: 'Dibuixa tu les dues rectes' } },
  { key: 'avanzado', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
    hint: { es: 'Con paralelas y rectas iguales', en: 'With parallel and identical lines', ca: 'Amb paral·leles i rectes iguals' } },
]

export default function CruceRectasExamen() {
  return (
    <MechanicExam
      gameId="cruce-rectas-test"
      emoji="✖️"
      badge={{ es: 'Examen · Álgebra', en: 'Exam · Algebra', ca: 'Examen · Àlgebra' }}
      title={{ es: 'Sistemas por el método gráfico', en: 'Simultaneous Equations: Graphical Method', ca: 'Sistemes pel mètode gràfic' }}
      sub={{ es: 'Dibuja las rectas y encuentra el corte', en: 'Draw the lines and find the crossing', ca: 'Dibuixa les rectes i troba el tall' }}
      metaTitle={{ es: 'Examen de sistemas de ecuaciones por el método gráfico', en: 'Simultaneous equations exam: graphical method', ca: 'Examen de sistemes d’equacions pel mètode gràfic' }}
      metaDesc={{ es: 'Examen de sistemas de ecuaciones resueltos por el método gráfico: dibuja las dos rectas y marca el punto de corte, o di si son paralelas o la misma recta. 10 sistemas en tres niveles, con la comprobación.', en: 'Simultaneous equations exam using the graphical method: draw both lines and mark where they cross, or say if they are parallel or the same line. 10 systems on three levels, with the check.', ca: 'Examen de sistemes d’equacions pel mètode gràfic: dibuixa les dues rectes i marca el punt de tall, o digues si són paral·leles o la mateixa recta. 10 sistemes en tres nivells, amb la comprovació.' }}
      metaPath="/examen/cruce-rectas-test"
      subjectSchema="Matemáticas"
      backGamePath="/juegos/cruce-rectas"
      playLabel={{ es: 'Modo arcade (120s)', en: 'Arcade mode (120s)', ca: 'Mode arcade (120s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <PreguntaRectas key={qIndex} ronda={round} revelado={phase === 'result'} onResponder={onAnswer} />}
    />
  )
}
