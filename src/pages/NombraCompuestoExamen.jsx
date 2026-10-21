import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaFormula from '../components/formulacion/PreguntaFormula'
import { genRound, esCorrecta, schemaQuestion } from '../lib/formulacion'

// Examen con la mecánica de Nombra el compuesto: los mismos compuestos, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Iniciación (3.º ESO)', en: 'Beginner', ca: 'Iniciació (3r ESO)' },
    hint: { es: 'Clasificar y escribir fórmulas de óxidos, hidruros y sales', en: 'Sorting and writing formulas of oxides, hydrides and salts', ca: 'Classificar i escriure fórmules d’òxids, hidrurs i sals' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Con hidróxidos y montando nombres de Stock', en: 'With hydroxides and building Stock names', ca: 'Amb hidròxids i muntant noms de Stock' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Prefijos y oxoácidos, pieza a pieza', en: 'Prefixes and oxoacids, piece by piece', ca: 'Prefixos i oxoàcids, peça a peça' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaFormula ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function NombraCompuestoExamen() {
  return (
    <MechanicExam
      gameId="nombra-compuesto-test"
      emoji="🔣"
      badge={{ es: 'Examen · Formulación', en: 'Exam · Nomenclature', ca: 'Examen · Formulació' }}
      title={{ es: 'Examen de Formulación inorgánica', en: 'Inorganic Nomenclature Exam', ca: 'Examen de Formulació inorgànica' }}
      sub={{ es: 'Fórmulas y nombres de óxidos, hidruros, sales, hidróxidos y oxoácidos', en: 'Formulas and names of oxides, hydrides, salts, hydroxides and oxoacids', ca: 'Fórmules i noms d’òxids, hidrurs, sals, hidròxids i oxoàcids' }}
      metaTitle={{ es: 'Examen de formulación inorgánica: Stock, prefijos y oxoácidos', en: 'Inorganic nomenclature exam: Stock, prefixes and oxoacids', ca: 'Examen de formulació inorgànica: Stock, prefixos i oxoàcids' }}
      metaDesc={{ es: 'Examen de formulación inorgánica para ESO: del nombre a la fórmula y de la fórmula al nombre en óxidos, hidruros, sales binarias, hidróxidos y oxoácidos, con nomenclatura de Stock y por prefijos. 10 preguntas, tres niveles.', en: 'Inorganic nomenclature exam: from name to formula and formula to name for oxides, hydrides, binary salts, hydroxides and oxoacids, with Stock and prefix nomenclature. 10 questions, three levels.', ca: 'Examen de formulació inorgànica per a ESO: del nom a la fórmula i de la fórmula al nom en òxids, hidrurs, sals binàries, hidròxids i oxoàcids, amb nomenclatura de Stock i amb prefixos. 10 preguntes, tres nivells.' }}
      metaPath="/examen/nombra-compuesto-test"
      subjectSchema="Química"
      backGamePath="/juegos/nombra-compuesto"
      playLabel={{ es: 'Modo arcade (90s)', en: 'Arcade mode (90s)', ca: 'Mode arcade (90s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
