import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaPlacas from '../components/placasMovimiento/PreguntaPlacas'
import { genRound, esCorrecta, schemaQuestion } from '../lib/placasMovimiento'

// Examen con la mecánica de Placas en Movimiento: los mismos bordes dibujados, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Clasificar bordes y montar el que forma un relieve', en: 'Sort boundaries and build the one behind a landform', ca: 'Classificar vores i muntar la que forma un relleu' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Además, subducción y ejemplos reales', en: 'Plus subduction and real examples', ca: 'A més, subducció i exemples reals' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Montar el borde a partir de lugares y síntomas', en: 'Build the boundary from places and clues', ca: 'Muntar la vora a partir de llocs i símptomes' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaPlacas ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function PlacasMovimientoExamen() {
  return (
    <MechanicExam
      gameId="placas-movimiento-test"
      emoji="🌋"
      badge={{ es: 'Examen · Placas tectónicas', en: 'Exam · Plate tectonics', ca: 'Examen · Plaques tectòniques' }}
      title={{ es: 'Examen de bordes de placa', en: 'Plate Boundaries Exam', ca: 'Examen de vores de placa' }}
      sub={{ es: 'Convergentes, divergentes y transformantes, con el corte dibujado', en: 'Convergent, divergent and transform, with the cross-section drawn', ca: 'Convergents, divergents i transformants, amb el tall dibuixat' }}
      metaTitle={{ es: 'Examen de placas tectónicas: bordes de placa y relieve', en: 'Plate tectonics exam: plate boundaries and landforms', ca: 'Examen de plaques tectòniques: vores de placa i relleu' }}
      metaDesc={{ es: 'Examen de placas tectónicas con el borde dibujado: convergente, divergente o transformante, dorsales, fosas, arcos de islas, cordilleras, subducción y ejemplos reales. 10 preguntas con explicación, tres niveles.', en: 'Plate tectonics exam with the boundary drawn: convergent, divergent or transform, ridges, trenches, island arcs, mountain ranges, subduction and real examples. 10 explained questions, three levels.', ca: 'Examen de plaques tectòniques amb la vora dibuixada: convergent, divergent o transformant, dorsals, fosses, arcs d’illes, serralades, subducció i exemples reals. 10 preguntes amb explicació, tres nivells.' }}
      metaPath="/examen/placas-movimiento-test"
      subjectSchema="Geología"
      backGamePath="/juegos/placas-movimiento"
      playLabel={{ es: 'Modo arcade (90s)', en: 'Arcade mode (90s)', ca: 'Mode arcade (90s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
