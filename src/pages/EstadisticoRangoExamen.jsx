import MechanicExam from '../components/MechanicExam'
import EstadisticoPregunta from '../components/EstadisticoPregunta'
import { RANGOS, generarRango, schemaQuestionEstadistico } from '../lib/estadisticoEngine'

// Examen enfocado SOLO en el rango — ver EstadisticoMediaExamen.jsx.

const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, hint: { es: '4-5 datos, del 1 al 15', en: '4-5 values, 1 to 15', ca: '4-5 dades, de l\'1 al 15' } },
  { key: 'medio', emoji: '🟡', difficulty: 'medio', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, hint: { es: '5-7 datos, del 1 al 25', en: '5-7 values, 1 to 25', ca: '5-7 dades, de l\'1 al 25' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, hint: { es: '6-9 datos, del 1 al 40', en: '6-9 values, 1 to 40', ca: '6-9 dades, de l\'1 al 40' } },
]

const PROMPT = { es: 'Calcula el rango', en: 'Calculate the range', ca: 'Calcula el rang' }
const PLACEHOLDER = { es: 'Rango', en: 'Range', ca: 'Rang' }

function genRound(difficulty) { return generarRango(RANGOS[difficulty]) }
function isCorrect(round, answer) { return answer === round.respuesta }

export default function EstadisticoRangoExamen() {
  return (
    <MechanicExam
      gameId="estadistico-rango-test"
      emoji="📊"
      badge={{ es: 'Examen · Estadística', en: 'Exam · Statistics', ca: 'Examen · Estadística' }}
      title={{ es: '📊 Examen: Cálculo del Rango', en: '📊 Exam: Calculating the Range', ca: '📊 Examen: Càlcul del Rang' }}
      sub={{ es: 'Solo rango — la diferencia entre el mayor y el menor', en: 'Range only — the difference between largest and smallest', ca: 'Només rang — la diferència entre el més gran i el més petit' }}
      metaTitle={{ es: 'Examen del Rango — Estadística', en: 'Range Exam — Statistics', ca: 'Examen del Rang — Estadística' }}
      metaDesc={{ es: 'Examen enfocado solo en calcular el rango de un conjunto de datos. 10 preguntas, sin tiempo, con la explicación del cálculo en cada una.', en: 'Exam focused only on calculating the range of a dataset. 10 questions, no timer, with the calculation explained each time.', ca: 'Examen centrat només a calcular el rang d\'un conjunt de dades. 10 preguntes, sense temps, amb l\'explicació del càlcul a cada una.' }}
      metaPath="/examen/estadistico-rango-test"
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
