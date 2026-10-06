import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaFlota from '../components/flotaHunde/PreguntaFlota'
import { genRound, esCorrecta, schemaQuestion } from '../lib/flotaHunde'

// Examen con la mecánica de ¿Flota o se hunde?: las mismas rondas, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'En agua, con la densidad de cada objeto', en: 'In water, with each object’s density', ca: 'En aigua, amb la densitat de cada objecte' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Varios líquidos; calcula la densidad con la masa y el volumen', en: 'Several liquids; work out density from mass and volume', ca: 'Diversos líquids; calcula la densitat amb la massa i el volum' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Qué parte del bloque queda sumergida', en: 'How much of the block is under the surface', ca: 'Quina part del bloc queda submergida' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaFlota ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function FlotaHundeExamen() {
  return (
    <MechanicExam
      gameId="flota-o-se-hunde-test"
      emoji="🚢"
      badge={{ es: 'Examen · Presión y fluidos', en: 'Exam · Pressure and fluids', ca: 'Examen · Pressió i fluids' }}
      title={{ es: 'Examen de ¿Flota o se hunde?', en: 'Float or Sink? Exam', ca: 'Examen de Sura o s’enfonsa?' }}
      sub={{ es: 'Densidad, flotación y parte sumergida', en: 'Density, buoyancy and the submerged part', ca: 'Densitat, flotació i part submergida' }}
      metaTitle={{ es: 'Examen de flotación y densidad: ¿flota o se hunde?', en: 'Buoyancy and density exam: float or sink?', ca: 'Examen de flotació i densitat: sura o s’enfonsa?' }}
      metaDesc={{ es: 'Examen de densidad y flotación: predice si un objeto flota o se hunde en agua, aceite, miel o mercurio, calcula su densidad y la parte sumergida. 10 preguntas, tres niveles.', en: 'Density and buoyancy exam: predict whether an object floats or sinks in water, oil, honey or mercury, work out its density and how much is submerged. 10 questions, three levels.', ca: 'Examen de densitat i flotació: prediu si un objecte sura o s’enfonsa en aigua, oli, mel o mercuri, calcula’n la densitat i la part submergida. 10 preguntes, tres nivells.' }}
      metaPath="/examen/flota-o-se-hunde-test"
      subjectSchema="Física"
      backGamePath="/juegos/flota-o-se-hunde"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
