// Examen de Ríos y Montañas de UNA región (el juego las mezcla): el mismo mapa
// y las mismas mecánicas, sin reloj. Cada examen es una página pequeña que solo
// dice su región y sus textos (RiosMontanasExamen, RiosMontanasMundoExamen…).
import { useState } from 'react'
import MechanicExam from '../MechanicExam'
import PreguntaRios from './PreguntaRios'
import { genRonda, esCorrecta, schemaQuestion } from '../../lib/riosMontanas'

// Estado propio (la respuesta dada): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaRios ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function ExamenRios({ region, gameId, levels, ...textos }) {
  return (
    <MechanicExam
      gameId={gameId}
      emoji="🏞️"
      subjectSchema="Geografía"
      backGamePath="/juegos/rios-montanas"
      playLabel={{ es: 'Jugar el recorrido (España, Europa y el mundo)', en: 'Play the journey (the US, Europe and the world)', ca: 'Jugar el recorregut (Espanya, Europa i el món)' }}
      levels={levels}
      genRound={d => genRonda(d, { region })}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
      {...textos}
    />
  )
}
