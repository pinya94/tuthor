import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaTabla from '../components/tablaVerdad/PreguntaTabla'
import { genRound, esCorrecta, schemaQuestion } from '../lib/tablaVerdad'

// Examen con la mecánica de Tabla de Verdad: las mismas rondas, sin reloj.
const LEVELS = [
  { key: 'eso', emoji: '💚', difficulty: 'facil',
    label: { es: 'Iniciación', en: 'Beginner', ca: 'Iniciació' },
    hint: { es: 'Conectores y tablas de dos variables', en: 'Connectives and two-variable tables', ca: 'Connectors i taules de dues variables' } },
  { key: 'bachillerato', emoji: '💛', difficulty: 'medio',
    label: { es: '1.º de Bachillerato', en: 'Sixth Form', ca: '1r de Batxillerat' },
    hint: { es: 'Tautologías y argumentos en palabras', en: 'Tautologies and arguments in words', ca: 'Tautologies i arguments en paraules' } },
  { key: 'avanzado', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Tres variables y reglas de inferencia', en: 'Three variables and rules of inference', ca: 'Tres variables i regles d’inferència' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaTabla ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function TablaVerdadExamen() {
  return (
    <MechanicExam
      gameId="tabla-verdad-test"
      emoji="🧠"
      badge={{ es: 'Examen · Lógica', en: 'Exam · Logic', ca: 'Examen · Lògica' }}
      title={{ es: 'Examen de lógica proposicional', en: 'Propositional Logic Exam', ca: 'Examen de lògica proposicional' }}
      sub={{ es: 'Tablas de verdad, formalización, tautologías y validez', en: 'Truth tables, formalisation, tautologies and validity', ca: 'Taules de veritat, formalització, tautologies i validesa' }}
      metaTitle={{ es: 'Examen de lógica proposicional y tablas de verdad', en: 'Propositional logic and truth tables exam', ca: 'Examen de lògica proposicional i taules de veritat' }}
      metaDesc={{ es: 'Examen de lógica de Filosofía: completa tablas de verdad, formaliza frases con conectores, clasifica tautologías, contradicciones y contingencias y reconoce modus ponens, modus tollens y falacias formales. 10 preguntas, tres niveles.', en: 'Philosophy logic exam: complete truth tables, formalise sentences, classify tautologies, contradictions and contingencies and recognise modus ponens, modus tollens and formal fallacies. 10 questions, three levels.', ca: 'Examen de lògica de Filosofia: completa taules de veritat, formalitza frases, classifica tautologies, contradiccions i contingències i reconeix modus ponens, modus tollens i fal·làcies formals. 10 preguntes, tres nivells.' }}
      metaPath="/examen/tabla-verdad-test"
      subjectSchema="Filosofía"
      backGamePath="/juegos/tabla-verdad"
      playLabel={{ es: 'Modo arcade (120s)', en: 'Arcade mode (120s)', ca: 'Mode arcade (120s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
