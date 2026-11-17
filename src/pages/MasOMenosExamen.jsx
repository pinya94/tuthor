import MechanicExam from '../components/MechanicExam'
import PreguntaMasOMenos from '../components/masOMenos/PreguntaMasOMenos'
import { genRound, esCorrecta, schemaQuestion } from '../lib/masOMenos'

// Examen con la mecánica de ¿Más o Menos?: diez comparaciones sueltas, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
    hint: { es: 'Diferencias claras', en: 'Clear differences', ca: 'Diferències clares' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
    hint: { es: 'Más ajustado', en: 'Closer calls', ca: 'Més ajustat' } },
  { key: 'avanzado', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
    hint: { es: 'Muy ajustado', en: 'Very close calls', ca: 'Molt ajustat' } },
]

export default function MasOMenosExamen() {
  return (
    <MechanicExam
      gameId="mas-o-menos-test"
      emoji="🆚"
      badge={{ es: 'Examen · Geografía', en: 'Exam · Geography', ca: 'Examen · Geografia' }}
      title={{ es: 'Población, superficie y relieve', en: 'Population, Area and Landscape', ca: 'Població, superfície i relleu' }}
      sub={{ es: '¿Más o menos?', en: 'More or less?', ca: 'Més o menys?' }}
      metaTitle={{ es: 'Examen de geografía: población, superficie, montañas y ríos (con el juego ¿Más o Menos?)', en: 'Geography exam: population, area, mountains and rivers (with the More or Less? game)', ca: 'Examen de geografia: població, superfície, muntanyes i rius (amb el joc Més o Menys?)' }}
      metaDesc={{ es: 'Examen de geografía de España y del mundo: compara población y superficie de países y comunidades, altura de montañas y longitud de ríos. 10 preguntas en tres niveles.', en: 'Geography exam on Spain and the world: compare the population and area of countries and regions, the height of mountains and the length of rivers. 10 questions on three levels, with the figures.', ca: 'Examen de geografia d’Espanya i del món: compara la població de països i comunitats, la superfície, l’altura de muntanyes i la longitud de rius. 10 preguntes en tres nivells, amb les dades.' }}
      metaPath="/examen/mas-o-menos-test"
      subjectSchema="Geografía"
      backGamePath="/juegos/mas-o-menos"
      playLabel={{ es: 'Modo arcade (90s)', en: 'Arcade mode (90s)', ca: 'Mode arcade (90s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <PreguntaMasOMenos key={qIndex} ronda={round} revelado={phase === 'result'} onResponder={onAnswer} />}
    />
  )
}
