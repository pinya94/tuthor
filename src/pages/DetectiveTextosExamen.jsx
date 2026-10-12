import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaTexto from '../components/detectiveTextos/PreguntaTexto'
import { genRound, esCorrecta, schemaQuestion } from '../lib/detectiveTextos'

// Examen con la mecánica de Detective de Textos: los mismos fragmentos y escenas, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Tipos de texto y emisor, receptor, mensaje', en: 'Text types and sender, receiver, message', ca: 'Tipus de text i emissor, receptor, missatge' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Exposición, argumentación, canal, código y funciones', en: 'Exposition, argument, channel, code and functions', ca: 'Exposició, argumentació, canal, codi i funcions' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Las seis funciones del lenguaje', en: 'All six language functions', ca: 'Les sis funcions del llenguatge' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaTexto ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function DetectiveTextosExamen() {
  return (
    <MechanicExam
      gameId="detective-textos-test"
      emoji="📑"
      badge={{ es: 'Examen · Los textos', en: 'Exam · Texts', ca: 'Examen · Els textos' }}
      title={{ es: 'Examen de los textos', en: 'Text Types Exam', ca: 'Examen dels textos' }}
      sub={{ es: 'Tipos de texto, comunicación y funciones del lenguaje', en: 'Text types, communication and language functions', ca: 'Tipus de text, comunicació i funcions del llenguatge' }}
      metaTitle={{ es: 'Examen de tipos de texto, elementos de la comunicación y funciones del lenguaje', en: 'Spanish text types exam', ca: 'Examen de tipus de text en castellà' }}
      metaDesc={{ es: 'Examen de los textos con fragmentos y escenas: narración, descripción, diálogo, exposición, argumentación e instrucción; emisor, receptor, mensaje, canal y código; y las seis funciones del lenguaje. 10 preguntas, tres niveles.', en: 'Spanish text types exam with fragments and scenes. 10 questions, three levels.', ca: 'Examen de tipus de text en castellà amb fragments i escenes. 10 preguntes, tres nivells.' }}
      metaPath="/examen/detective-textos-test"
      subjectSchema="Química"
      backGamePath="/juegos/detective-textos"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
