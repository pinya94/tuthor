import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaFigura from '../components/cazafiguras/PreguntaFigura'
import { genRound, esCorrecta, schemaQuestion } from '../lib/cazafiguras'

// Examen con la mecánica de Cazafiguras: los mismos versos, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Metáfora, comparación, hipérbole…', en: 'Metaphor, simile, hyperbole…', ca: 'Metàfora, comparació, hipèrbole…' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Anáfora, epíteto, hipérbaton, antítesis…', en: 'Anaphora, epithet, hyperbaton, antithesis…', ca: 'Anàfora, epítet, hipèrbaton, antítesi…' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Paradoja, oxímoron, sinestesia, metonimia…', en: 'Paradox, oxymoron, synaesthesia, metonymy…', ca: 'Paradoxa, oxímoron, sinestèsia, metonímia…' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaFigura ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function CazafigurasExamen() {
  return (
    <MechanicExam
      gameId="cazafiguras-test"
      emoji="🎭"
      badge={{ es: 'Examen · Figuras literarias', en: 'Exam · Literary devices', ca: 'Examen · Figures literàries' }}
      title={{ es: 'Examen de figuras literarias', en: 'Literary Devices Exam', ca: 'Examen de figures literàries' }}
      sub={{ es: 'Descubre la figura en cada verso', en: 'Spot the device in each verse', ca: 'Descobreix la figura a cada vers' }}
      metaTitle={{ es: 'Examen de figuras literarias con versos: metáfora, hipérbole, anáfora, paradoja…', en: 'Spanish literary devices exam', ca: 'Examen de figures literàries en castellà' }}
      metaDesc={{ es: 'Examen de figuras literarias con versos de clásicos y frases de ejemplo: metáfora, comparación, personificación, hipérbole, anáfora, hipérbaton, antítesis, paradoja, oxímoron, sinestesia y más. 10 preguntas, tres niveles.', en: 'Spanish literary devices exam with verses and example sentences. 10 questions, three levels.', ca: 'Examen de figures literàries en castellà amb versos i frases d’exemple. 10 preguntes, tres nivells.' }}
      metaPath="/examen/cazafiguras-test"
      subjectSchema="Química"
      backGamePath="/juegos/cazafiguras"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
