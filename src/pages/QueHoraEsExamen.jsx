import MechanicExam from '../components/MechanicExam'
import PreguntaHora from '../components/queHoraEs/PreguntaHora'
import { genRound, esCorrecta, schemaQuestion } from '../lib/queHoraEs'

// Examen con la mecánica de ¿Qué Hora Es Allí?: las mismas rondas, sin cuenta atrás.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
    hint: { es: 'Ciudades conocidas, mismo día', en: 'Well-known cities, same day', ca: 'Ciutats conegudes, mateix dia' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
    hint: { es: 'Vuelos, cambio de día y meridianos', en: 'Flights, change of day and meridians', ca: 'Vols, canvi de dia i meridians' } },
  { key: 'avanzado', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
    hint: { es: 'Con minutos y cualquier longitud', en: 'With minutes and any longitude', ca: 'Amb minuts i qualsevol longitud' } },
]

function Pregunta({ round, phase, onAnswer }) {
  return <PreguntaHora ronda={round} revelado={phase === 'result'} onResponder={onAnswer} />
}

export default function QueHoraEsExamen() {
  return (
    <MechanicExam
      gameId="que-hora-es-test"
      emoji="🕒"
      badge={{ es: 'Examen · Husos horarios', en: 'Exam · Time zones', ca: 'Examen · Fusos horaris' }}
      title={{ es: 'Examen de husos horarios', en: 'Time Zones Exam', ca: 'Examen de fusos horaris' }}
      sub={{ es: 'Gira el reloj y toca el huso', en: 'Turn the clock and tap the zone', ca: 'Gira el rellotge i toca el fus' }}
      metaTitle={{ es: 'Examen de husos horarios con ejercicios resueltos', en: 'Time zones exam with worked answers', ca: 'Examen de fusos horaris amb exercicis resolts' }}
      metaDesc={{ es: 'Examen de husos horarios: diferencia de horas entre ciudades, hora de llegada de un vuelo, cambio de día y hora según la longitud. 10 preguntas en tres niveles, con la cuenta explicada.', en: 'Time zones exam: time differences between cities, a flight’s arrival time, changes of day and time from longitude. 10 questions on three levels, with every sum explained.', ca: 'Examen de fusos horaris: diferència d’hores entre ciutats, hora d’arribada d’un vol, canvi de dia i hora segons la longitud. 10 preguntes en tres nivells, amb el compte explicat.' }}
      metaPath="/examen/que-hora-es-test"
      subjectSchema="Geografía"
      backGamePath="/juegos/que-hora-es"
      playLabel={{ es: 'Modo arcade (120s)', en: 'Arcade mode (120s)', ca: 'Mode arcade (120s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
