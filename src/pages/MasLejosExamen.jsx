import MechanicExam from '../components/MechanicExam'
import PreguntaDistancia from '../components/masLejos/PreguntaDistancia'
import { genRound, esCorrecta, schemaQuestion } from '../lib/masLejos'

// Examen con la mecánica de ¿Más Lejos?: diez comparaciones sueltas, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
    hint: { es: 'Diferencias claras', en: 'Clear differences', ca: 'Diferències clares' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
    hint: { es: 'Más ajustado, en zonas distintas', en: 'Closer calls, far apart', ca: 'Més ajustat, en zones diferents' } },
  { key: 'avanzado', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
    hint: { es: 'Muy ajustado, en el mundo entero', en: 'Very close, whole world map', ca: 'Molt ajustat, al món sencer' } },
]

export default function MasLejosExamen() {
  return (
    <MechanicExam
      gameId="mas-lejos-test"
      emoji="✈️"
      badge={{ es: 'Examen · Geografía', en: 'Exam · Geography', ca: 'Examen · Geografia' }}
      title={{ es: 'Distancias en el mapa', en: 'Distances on the Map', ca: 'Distàncies al mapa' }}
      sub={{ es: '¿Más lejos o más cerca?', en: 'Further or closer?', ca: 'Més lluny o més a prop?' }}
      metaTitle={{ es: 'Examen de distancias en el mapa del mundo (con el juego ¿Más Lejos?)', en: 'World map distances exam (with the Further Away? game)', ca: 'Examen de distàncies al mapa del món (amb el joc Més Lluny?)' }}
      metaDesc={{ es: 'Examen de geografía: compara distancias entre ciudades, países y comunidades en el mapa del mundo y di cuál está más lejos. 10 preguntas en tres niveles, con los kilómetros de cada trayecto.', en: 'Geography exam: compare distances between cities, countries and regions on the world map and say which is further. 10 questions on three levels, with the distance of each trip.', ca: 'Examen de geografia: compara distàncies entre ciutats, països i comunitats al mapa del món i digues quina és més lluny. 10 preguntes en tres nivells, amb els quilòmetres de cada trajecte.' }}
      metaPath="/examen/mas-lejos-test"
      subjectSchema="Geografía"
      backGamePath="/juegos/mas-lejos"
      playLabel={{ es: 'Modo arcade (90s)', en: 'Arcade mode (90s)', ca: 'Mode arcade (90s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <PreguntaDistancia key={qIndex} ronda={round} revelado={phase === 'result'} onResponder={onAnswer} />}
    />
  )
}
