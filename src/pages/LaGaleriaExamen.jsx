import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaGaleria from '../components/laGaleria/PreguntaGaleria'
import { genRound, esCorrecta, schemaQuestion } from '../lib/laGaleria'

// Examen con la mecánica de La Galería: los mismos cuadros y obras, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Estilos muy distintos y obras famosas', en: 'Very different styles and famous works', ca: 'Estils molt diferents i obres famoses' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Estilos vecinos, pintores y rasgos', en: 'Neighbouring styles, painters and features', ca: 'Estils veïns, pintors i trets' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Con la cronología', en: 'With chronology', ca: 'Amb la cronologia' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaGaleria ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function LaGaleriaExamen() {
  return (
    <MechanicExam
      gameId="la-galeria-test"
      emoji="🖼️"
      badge={{ es: 'Examen · Pintura', en: 'Exam · Painting', ca: 'Examen · Pintura' }}
      title={{ es: 'Examen de pintura con cuadros', en: 'Painting Exam with Pictures', ca: 'Examen de pintura amb quadres' }}
      sub={{ es: 'Estilos, pintores, rasgos y cronología', en: 'Styles, painters, features and chronology', ca: 'Estils, pintors, trets i cronologia' }}
      metaTitle={{ es: 'Examen de historia de la pintura: estilos y obras', en: 'History of painting exam: styles and works', ca: 'Examen d’història de la pintura: estils i obres' }}
      metaDesc={{ es: 'Examen de pintura con cuadros reales de museo y obras famosas: estilo, pintor, rasgos y cronología, del gótico al pop art. 10 preguntas, tres niveles.', en: 'Painting exam with real museum paintings and famous works: style, painter, features and chronology. 10 questions, three levels.', ca: 'Examen de pintura amb quadres reals de museu i obres famoses: estil, pintor, trets i cronologia. 10 preguntes, tres nivells.' }}
      metaPath="/examen/la-galeria-test"
      subjectSchema="Historia del Arte"
      backGamePath="/juegos/la-galeria"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
