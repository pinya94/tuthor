import MechanicExam from '../components/MechanicExam'
import EstadisticoPregunta from '../components/EstadisticoPregunta'
import { RANGOS, generarMedia } from '../lib/estadisticoEngine'

// Examen enfocado SOLO en la media — sin mezclar con mediana/moda/rango,
// para quien quiera repasar específicamente esta medida. Misma generación
// que el juego Estadístico Exprés (lib/estadisticoEngine).

const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, hint: { es: '4-5 datos, del 1 al 15', en: '4-5 values, 1 to 15', ca: '4-5 dades, de l\'1 al 15' } },
  { key: 'medio', emoji: '🟡', difficulty: 'medio', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, hint: { es: '5-7 datos, del 1 al 25', en: '5-7 values, 1 to 25', ca: '5-7 dades, de l\'1 al 25' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, hint: { es: '6-9 datos, del 1 al 40', en: '6-9 values, 1 to 40', ca: '6-9 dades, de l\'1 al 40' } },
]

const PROMPT = { es: 'Calcula la media', en: 'Calculate the mean', ca: 'Calcula la mitjana' }
const PLACEHOLDER = { es: 'Media', en: 'Mean', ca: 'Mitjana' }

function genRound(difficulty) { return generarMedia(RANGOS[difficulty]) }
function isCorrect(round, answer) { return answer === round.respuesta }

export default function EstadisticoMediaExamen() {
  return (
    <MechanicExam
      gameId="estadistico-media-test"
      emoji="📊"
      badge={{ es: 'Examen · Estadística', en: 'Exam · Statistics', ca: 'Examen · Estadística' }}
      title={{ es: '📊 Examen: Cálculo de la Media', en: '📊 Exam: Calculating the Mean', ca: '📊 Examen: Càlcul de la Mitjana' }}
      sub={{ es: 'Solo media — calcula la media de datasets reales', en: 'Mean only — calculate the mean of real datasets', ca: 'Només mitjana — calcula la mitjana de datasets reals' }}
      metaTitle={{ es: 'Examen de la Media — Estadística', en: 'Mean Exam — Statistics', ca: 'Examen de la Mitjana — Estadística' }}
      metaDesc={{ es: 'Examen enfocado solo en calcular la media de un conjunto de datos. 10 preguntas, sin tiempo, con la explicación del cálculo en cada una.', en: 'Exam focused only on calculating the mean of a dataset. 10 questions, no timer, with the calculation explained each time.', ca: 'Examen centrat només a calcular la mitjana d\'un conjunt de dades. 10 preguntes, sense temps, amb l\'explicació del càlcul a cada una.' }}
      metaPath="/examen/estadistico-media-test"
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
