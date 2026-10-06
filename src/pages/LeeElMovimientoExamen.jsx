import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaMovimiento from '../components/leeMovimiento/PreguntaMovimiento'
import { genRound, esCorrecta, schemaQuestion } from '../lib/leeMovimiento'

// Examen con la mecánica de Lee el movimiento: las mismas gráficas, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Iniciación', en: 'Beginner', ca: 'Iniciació' },
    hint: { es: 'Qué hace el móvil en cada tramo', en: 'What the object does in each stretch', ca: 'Què fa el mòbil a cada tram' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Velocidad y aceleración con la pendiente', en: 'Velocity and acceleration from the slope', ca: 'Velocitat i acceleració amb el pendent' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Áreas, distancia y desplazamiento', en: 'Areas, distance and displacement', ca: 'Àrees, distància i desplaçament' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaMovimiento ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function LeeElMovimientoExamen() {
  return (
    <MechanicExam
      gameId="lee-el-movimiento-test"
      emoji="🏁"
      badge={{ es: 'Examen · El movimiento', en: 'Exam · Motion', ca: 'Examen · El moviment' }}
      title={{ es: 'Examen de gráficas del movimiento', en: 'Motion Graphs Exam', ca: 'Examen de gràfiques del moviment' }}
      sub={{ es: 'Gráficas posición-tiempo y velocidad-tiempo', en: 'Position-time and velocity-time graphs', ca: 'Gràfiques posició-temps i velocitat-temps' }}
      metaTitle={{ es: 'Examen de gráficas x-t y v-t: velocidad, aceleración y área', en: 'x-t and v-t graphs exam: velocity, acceleration and area', ca: 'Examen de gràfiques x-t i v-t: velocitat, acceleració i àrea' }}
      metaDesc={{ es: 'Examen de cinemática con gráficas generadas: qué hace el móvil en cada tramo, velocidad y aceleración con la pendiente, y distancia con el área bajo la v-t. 10 preguntas, tres niveles.', en: 'Kinematics exam with generated graphs: what the object does in each stretch, velocity and acceleration from the slope, and distance from the area under the v-t graph.', ca: 'Examen de cinemàtica amb gràfiques generades: què fa el mòbil a cada tram, velocitat i acceleració amb el pendent, i distància amb l’àrea sota la v-t. 10 preguntes, tres nivells.' }}
      metaPath="/examen/lee-el-movimiento-test"
      subjectSchema="Física"
      backGamePath="/juegos/lee-el-movimiento"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
