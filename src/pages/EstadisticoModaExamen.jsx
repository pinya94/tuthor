import MechanicExam from '../components/MechanicExam'
import EstadisticoPregunta from '../components/EstadisticoPregunta'
import { RANGOS, generarModa, schemaQuestionEstadistico } from '../lib/estadisticoEngine'

// Examen enfocado SOLO en la moda — ver EstadisticoMediaExamen.jsx.

const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, hint: { es: '4-5 datos, del 1 al 15', en: '4-5 values, 1 to 15', ca: '4-5 dades, de l\'1 al 15' } },
  { key: 'medio', emoji: '🟡', difficulty: 'medio', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, hint: { es: '5-7 datos, del 1 al 25', en: '5-7 values, 1 to 25', ca: '5-7 dades, de l\'1 al 25' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, hint: { es: '6-9 datos, del 1 al 40', en: '6-9 values, 1 to 40', ca: '6-9 dades, de l\'1 al 40' } },
]

const PROMPT = { es: 'Calcula la moda', en: 'Calculate the mode', ca: 'Calcula la moda' }
const PLACEHOLDER = { es: 'Moda', en: 'Mode', ca: 'Moda' }

function genRound(difficulty) { return generarModa(RANGOS[difficulty]) }
function isCorrect(round, answer) { return answer === round.respuesta }

export default function EstadisticoModaExamen() {
  return (
    <MechanicExam
      gameId="estadistico-moda-test"
      emoji="📊"
      badge={{ es: 'Examen · Estadística', en: 'Exam · Statistics', ca: 'Examen · Estadística' }}
      title={{ es: '📊 Examen: Cálculo de la Moda', en: '📊 Exam: Calculating the Mode', ca: '📊 Examen: Càlcul de la Moda' }}
      sub={{ es: 'Solo moda — encuentra el valor que más se repite', en: 'Mode only — find the most frequent value', ca: 'Només moda — troba el valor que més es repeteix' }}
      metaTitle={{ es: 'Examen de la Moda — Estadística', en: 'Mode Exam — Statistics', ca: 'Examen de la Moda — Estadística' }}
      metaDesc={{ es: 'Examen enfocado solo en calcular la moda de un conjunto de datos. 10 preguntas, sin tiempo, con la explicación del cálculo en cada una.', en: 'Exam focused only on calculating the mode of a dataset. 10 questions, no timer, with the calculation explained each time.', ca: 'Examen centrat només a calcular la moda d\'un conjunt de dades. 10 preguntes, sense temps, amb l\'explicació del càlcul a cada una.' }}
      metaPath="/examen/estadistico-moda-test"
      subjectSchema="Matemáticas"
      backGamePath="/estudiar/matematicas/estadistica"
      backLabel={{ es: '← Volver a Estadística', en: '← Back to Statistics', ca: '← Tornar a Estadística' }}
      playLabel={{ es: '← Volver a Estadística', en: '← Back to Statistics', ca: '← Tornar a Estadística' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={isCorrect}
      schemaQuestion={schemaQuestionEstadistico}
      renderQuestion={({ round, phase, onAnswer, l, qIndex }) => (
        <EstadisticoPregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} prompt={PROMPT} placeholder={PLACEHOLDER} />
      )}
    />
  )
}
