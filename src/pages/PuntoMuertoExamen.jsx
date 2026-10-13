import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaPuntoMuerto from '../components/puntoMuerto/PreguntaPuntoMuerto'
import { genRound, esCorrecta, schemaQuestion } from '../lib/puntoMuerto'

// Examen con la mecánica de Punto Muerto: las mismas empresas y el mismo gráfico, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Iniciación', en: 'Beginner', ca: 'Iniciació' },
    hint: { es: 'Leer el gráfico', en: 'Reading the graph', ca: 'Llegir el gràfic' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Intermedio', en: 'Intermediate', ca: 'Intermedi' },
    hint: { es: 'Punto muerto y beneficio', en: 'Break-even and profit', ca: 'Punt mort i benefici' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Sensibilidad y precio mínimo', en: 'Sensitivity and minimum price', ca: 'Sensibilitat i preu mínim' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaPuntoMuerto ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function PuntoMuertoExamen() {
  return (
    <MechanicExam
      gameId="punto-muerto-test"
      emoji="🏭"
      badge={{ es: 'Examen · Punto de equilibrio', en: 'Exam · Break-even point', ca: 'Examen · Punt d’equilibri' }}
      title={{ es: 'Examen del punto muerto con gráfico', en: 'Break-Even Exam with Graph', ca: 'Examen del punt mort amb gràfic' }}
      sub={{ es: 'Gráfico, cálculo, beneficio y sensibilidad', en: 'Graph, calculation, profit and sensitivity', ca: 'Gràfic, càlcul, benefici i sensibilitat' }}
      metaTitle={{ es: 'Examen de punto muerto: gráfico, cálculo y beneficio', en: 'Break-even exam: graph, calculation and profit', ca: 'Examen de punt mort: gràfic, càlcul i benefici' }}
      metaDesc={{ es: 'Examen del umbral de rentabilidad con el gráfico de ingresos y costes: leer el punto muerto, calcular Q = CF / (P − CVu), el beneficio o la pérdida, la sensibilidad y el precio mínimo. 10 preguntas, tres niveles.', en: 'Break-even exam with the revenue and cost graph: reading break-even, Q = FC / (P − VCu), profit or loss, sensitivity and minimum price. 10 questions, three levels.', ca: 'Examen del llindar de rendibilitat amb el gràfic d’ingressos i costos: llegir el punt mort, calcular Q = CF / (P − CVu), el benefici o la pèrdua, la sensibilitat i el preu mínim. 10 preguntes, tres nivells.' }}
      metaPath="/examen/punto-muerto-test"
      subjectSchema="Economía"
      backGamePath="/juegos/punto-muerto"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
