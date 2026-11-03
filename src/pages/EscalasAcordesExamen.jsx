import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaEscalas from '../components/escalasAcordes/PreguntaEscalas'
import { genRound, esCorrecta, schemaQuestion } from '../lib/escalasAcordes'

// Examen con la mecánica de Escalas y Acordes: las mismas rondas, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Iniciación', en: 'Beginner', ca: 'Iniciació' },
    hint: { es: 'Terceras, quintas y acordes mayores', en: 'Thirds, fifths and major chords', ca: 'Terceres, quintes i acords majors' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary', ca: 'Secundària (ESO)' },
    hint: { es: 'Intervalos, escalas mayores y acordes', en: 'Intervals, major scales and chords', ca: 'Intervals, escales majors i acords' } },
  { key: 'avanzado', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Séptimas, escalas menores y acordes de cuatro tipos', en: 'Sevenths, minor scales and four chord types', ca: 'Setenes, escales menors i acords de quatre tipus' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaEscalas ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function EscalasAcordesExamen() {
  return (
    <MechanicExam
      gameId="escalas-acordes-test"
      emoji="🎹"
      badge={{ es: 'Examen · Teoría musical', en: 'Exam · Music theory', ca: 'Examen · Teoria musical' }}
      title={{ es: 'Examen de intervalos, escalas y acordes', en: 'Intervals, Scales and Chords Exam', ca: 'Examen d’intervals, escales i acords' }}
      sub={{ es: 'En el teclado, con sonido', en: 'On the keyboard, with sound', ca: 'Al teclat, amb so' }}
      metaTitle={{ es: 'Examen de intervalos, escalas y acordes en el piano', en: 'Intervals, scales and chords exam on the piano', ca: 'Examen d’intervals, escales i acords al piano' }}
      metaDesc={{ es: 'Examen de teoría musical de ESO en un teclado: intervalos mayores, menores y justos, escalas mayores y menores con sus alteraciones y acordes mayores, menores, disminuidos y aumentados. 10 preguntas, tres niveles.', en: 'Music theory exam on a keyboard: major, minor and perfect intervals, major and minor scales with their sharps and flats, and major, minor, diminished and augmented chords. 10 questions, three levels.', ca: 'Examen de teoria musical d’ESO en un teclat: intervals majors, menors i justos, escales majors i menors amb les seves alteracions i acords majors, menors, disminuïts i augmentats. 10 preguntes, tres nivells.' }}
      metaPath="/examen/escalas-acordes-test"
      subjectSchema="Música"
      backGamePath="/juegos/escalas-acordes"
      playLabel={{ es: 'Modo arcade (120s)', en: 'Arcade mode (120s)', ca: 'Mode arcade (120s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
