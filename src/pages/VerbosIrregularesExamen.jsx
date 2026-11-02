import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaVerbos from '../components/verbosIrregulares/PreguntaVerbos'
import { genRound, esCorrecta, schemaQuestion } from '../lib/verbosIrregulares'

// Examen con la mecánica de Verbos Irregulares: las mismas rondas, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Los 32 más usados', en: 'The 32 most common', ca: 'Els 32 més usats' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary', ca: 'Secundària (ESO)' },
    hint: { es: '71 verbos, escritos y en frases', en: '71 verbs, typed and in sentences', ca: '71 verbs, escrits i en frases' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Más de 100, las dos formas a mano', en: 'Over 100, both forms typed', ca: 'Més de 100, les dues formes a mà' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaVerbos ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function VerbosIrregularesExamen() {
  return (
    <MechanicExam
      gameId="verbos-irregulares-test"
      emoji="🔁"
      badge={{ es: 'Examen · Inglés', en: 'Exam · English', ca: 'Examen · Anglès' }}
      title={{ es: 'Examen de verbos irregulares', en: 'Irregular Verbs Exam', ca: 'Examen de verbs irregulars' }}
      sub={{ es: 'Pasado y participio: con fichas, por patrones, escritos y en frases', en: 'Past simple and participle: tiles, patterns, typing and sentences', ca: 'Passat i participi: amb fitxes, per patrons, escrits i en frases' }}
      metaTitle={{ es: 'Examen de verbos irregulares en inglés', en: 'Irregular verbs exam', ca: 'Examen de verbs irregulars en anglès' }}
      metaDesc={{ es: 'Examen de verbos irregulares en inglés: pasado y participio de más de 100 verbos, por patrones (cut-cut-cut, go-went-gone), escritos y en frases con yesterday y have. 10 preguntas, tres niveles.', en: 'Irregular verbs exam: past simple and past participle of over 100 verbs, by pattern (cut-cut-cut, go-went-gone), typed and in sentences. 10 questions, three levels.', ca: 'Examen de verbs irregulars en anglès: passat i participi de més de 100 verbs, per patrons (cut-cut-cut, go-went-gone), escrits i en frases. 10 preguntes, tres nivells.' }}
      metaPath="/examen/verbos-irregulares-test"
      subjectSchema="Inglés"
      backGamePath="/juegos/verbos-irregulares"
      playLabel={{ es: 'Modo arcade (90s)', en: 'Arcade mode (90s)', ca: 'Mode arcade (90s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
