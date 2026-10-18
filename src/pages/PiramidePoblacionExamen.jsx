import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaPiramide from '../components/piramide/PreguntaPiramide'
import { genRound, esCorrecta, schemaQuestion } from '../lib/piramide'

// Examen con la mecánica de Pirámide de población: las mismas pirámides, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Toca el grupo más numeroso y clasifica pirámides', en: 'Tap the largest group and sort pyramids', ca: 'Toca el grup més nombrós i classifica piràmides' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Tipos, huecos, baby booms y sexos', en: 'Types, gaps, baby booms and sexes', ca: 'Tipus, buits, baby booms i sexes' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Toca a los nacidos en tal año, huecos y booms', en: 'Tap those born in a given year, gaps and booms', ca: 'Toca els nascuts tal any, buits i booms' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaPiramide ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function PiramidePoblacionExamen() {
  return (
    <MechanicExam
      gameId="piramide-poblacion-test"
      emoji="👥"
      badge={{ es: 'Examen · Geografía humana', en: 'Exam · Human geography', ca: 'Examen · Geografia humana' }}
      title={{ es: 'Examen de Pirámides de población', en: 'Population Pyramids Exam', ca: 'Examen de Piràmides de població' }}
      sub={{ es: 'Leer e interpretar pirámides de población', en: 'Reading and interpreting population pyramids', ca: 'Llegir i interpretar piràmides de població' }}
      metaTitle={{ es: 'Examen de pirámides de población: tipos, huecos y baby boom', en: 'Population pyramids exam: types, gaps and baby boom', ca: 'Examen de piràmides de població: tipus, buits i baby boom' }}
      metaDesc={{ es: 'Examen de pirámides de población: progresiva, estacionaria o regresiva, grupos de edad, hombres y mujeres, huecos de natalidad, baby boom, inmigración y años de nacimiento. 10 preguntas, tres niveles.', en: 'Population pyramids exam: expanding, stationary or contracting, age groups, men and women, birth gaps, baby boom, immigration and birth years. 10 questions, three levels.', ca: 'Examen de piràmides de població: progressiva, estacionària o regressiva, grups d’edat, homes i dones, buits de natalitat, baby boom, immigració i anys de naixement. 10 preguntes, tres nivells.' }}
      metaPath="/examen/piramide-poblacion-test"
      subjectSchema="Geografía"
      backGamePath="/juegos/piramide-poblacion"
      playLabel={{ es: 'Modo arcade (90s)', en: 'Arcade mode (90s)', ca: 'Mode arcade (90s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
