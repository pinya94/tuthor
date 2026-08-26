import MechanicExam from '../components/MechanicExam'
import EstadisticoPregunta from '../components/EstadisticoPregunta'
import { RANGOS, generarMediana } from '../lib/estadisticoEngine'

// Examen enfocado SOLO en la mediana — ver EstadisticoMediaExamen.jsx.

const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, hint: { es: '4-5 datos, del 1 al 15', en: '4-5 values, 1 to 15', ca: '4-5 dades, de l\'1 al 15' } },
  { key: 'medio', emoji: '🟡', difficulty: 'medio', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, hint: { es: '5-7 datos, del 1 al 25', en: '5-7 values, 1 to 25', ca: '5-7 dades, de l\'1 al 25' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, hint: { es: '6-9 datos, del 1 al 40', en: '6-9 values, 1 to 40', ca: '6-9 dades, de l\'1 al 40' } },
]

const PROMPT = { es: 'Calcula la mediana', en: 'Calculate the median', ca: 'Calcula la mediana' }
const PLACEHOLDER = { es: 'Mediana', en: 'Median', ca: 'Mediana' }

function genRound(difficulty) { return generarMediana(RANGOS[difficulty]) }
function isCorrect(round, answer) { return answer === round.respuesta }

export default function EstadisticoMedianaExamen() {
  return (
    <MechanicExam
      gameId="estadistico-mediana-test"
      emoji="📊"
      badge={{ es: 'Examen · Estadística', en: 'Exam · Statistics', ca: 'Examen · Estadística' }}
      title={{ es: '📊 Examen: Cálculo de la Mediana', en: '📊 Exam: Calculating the Median', ca: '📊 Examen: Càlcul de la Mediana' }}
      sub={{ es: 'Solo mediana — ordena y encuentra el valor central', en: 'Median only — sort and find the middle value', ca: 'Només mediana — ordena i troba el valor central' }}
      metaTitle={{ es: 'Examen de la Mediana — Estadística', en: 'Median Exam — Statistics', ca: 'Examen de la Mediana — Estadística' }}
      metaDesc={{ es: 'Examen enfocado solo en calcular la mediana de un conjunto de datos. 10 preguntas, sin tiempo, con la explicación del cálculo en cada una.', en: 'Exam focused only on calculating the median of a dataset. 10 questions, no timer, with the calculation explained each time.', ca: 'Examen centrat només a calcular la mediana d\'un conjunt de dades. 10 preguntes, sense temps, amb l\'explicació del càlcul a cada una.' }}
      metaPath="/examen/estadistico-mediana-test"
      subjectSchema="Matemáticas"
      backGamePath="/estudiar/matematicas/estadistica"
      backLabel={{ es: '← Volver a Estadística', en: '← Back to Statistics', ca: '← Tornar a Estadística' }}
      playLabel={{ es: '← Volver a Estadística', en: '← Back to Statistics', ca: '← Tornar a Estadística' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={isCorrect}
      renderQuestion={({ round, phase, onAnswer, l, qIndex }) => (
        <EstadisticoPregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} prompt={PROMPT} placeholder={PLACEHOLDER} />
      )}
    />
  )
}
