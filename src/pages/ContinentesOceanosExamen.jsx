import MechanicExam from '../components/MechanicExam'
import PreguntaContinentes from '../components/continentesOceanos/PreguntaContinentes'
import { genRound, esCorrecta, schemaQuestion } from '../lib/continentesOceanos'

// Examen con la mecánica de Continentes y Océanos: las mismas rondas, sin cuenta atrás.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
    hint: { es: 'Continentes y océanos', en: 'Continents and oceans', ca: 'Continents i oceans' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
    hint: { es: 'Y el continente de cada país', en: 'Plus the continent of each country', ca: 'I el continent de cada país' } },
  { key: 'avanzado', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
    hint: { es: 'Mares, golfos y travesías', en: 'Seas, gulfs and sea crossings', ca: 'Mars, golfs i travessies' } },
]

export default function ContinentesOceanosExamen() {
  return (
    <MechanicExam
      gameId="continentes-oceanos-test"
      emoji="🌍"
      badge={{ es: 'Examen · El mapa del mundo', en: 'Exam · The world map', ca: 'Examen · El mapa del món' }}
      title={{ es: 'Examen de continentes y océanos', en: 'Continents and Oceans Exam', ca: 'Examen de continents i oceans' }}
      sub={{ es: 'Señala cada uno en el mapa', en: 'Point to each one on the map', ca: 'Assenyala cadascun al mapa' }}
      metaTitle={{ es: 'Examen de continentes y océanos en el mapa', en: 'Continents and oceans map exam', ca: 'Examen de continents i oceans al mapa' }}
      metaDesc={{ es: 'Examen de continentes, océanos y mares: señálalos en el mapa del mundo, di en qué continente está cada país y qué océano cruza cada barco. 10 preguntas en tres niveles, con explicación.', en: 'Continents, oceans and seas exam: point to them on the world map, find the continent of each country and the ocean each ship crosses. 10 questions on three levels, with explanations.', ca: 'Examen de continents, oceans i mars: assenyala’ls al mapa del món, digues a quin continent és cada país i quin oceà travessa cada vaixell. 10 preguntes en tres nivells, amb explicació.' }}
      metaPath="/examen/continentes-oceanos-test"
      subjectSchema="Geografía"
      backGamePath="/juegos/continentes-oceanos"
      playLabel={{ es: 'Modo arcade (90s)', en: 'Arcade mode (90s)', ca: 'Mode arcade (90s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <PreguntaContinentes key={qIndex} ronda={round} revelado={phase === 'result'} onResponder={onAnswer} />}
    />
  )
}
