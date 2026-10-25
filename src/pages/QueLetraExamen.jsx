import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaLetra from '../components/queLetra/PreguntaLetra'
import { genRound, esCorrecta, schemaQuestion } from '../lib/queLetra'

// Examen con la mecánica de ¿Qué Letra Va?: las mismas palabras, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Las reglas básicas', en: 'The basic rules', ca: 'Les regles bàsiques' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Más reglas', en: 'More rules', ca: 'Més regles' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Excepciones, diéresis y h intercalada', en: 'Exceptions, diaeresis and silent middle h', ca: 'Excepcions, dièresi i h intercalada' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaLetra ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function QueLetraExamen() {
  return (
    <MechanicExam
      gameId="que-letra-test"
      emoji="🔠"
      badge={{ es: 'Examen · Ortografía', en: 'Exam · Spanish spelling', ca: 'Examen · Ortografia castellana' }}
      title={{ es: 'Examen de ortografía: b/v, g/j, h, ll/y, c/z', en: 'Spanish Spelling Exam: b/v, g/j, h, ll/y, c/z', ca: 'Examen d’ortografia: b/v, g/j, h, ll/y, c/z' }}
      sub={{ es: 'Completa la palabra y repasa la regla', en: 'Complete the Spanish word and review the rule', ca: 'Completa la paraula i repassa la regla' }}
      metaTitle={{ es: 'Examen de ortografía: b o v, g o j, h, ll o y, c o z', en: 'Spanish spelling exam: b or v, g or j, h, ll or y, c or z', ca: 'Examen d’ortografia castellana: b o v, g o j, h, ll o y, c o z' }}
      metaDesc={{ es: 'Examen de ortografía con las reglas de la b y la v, la g y la j, la h, la ll y la y y la c y la z, con sus excepciones explicadas. 10 palabras, tres niveles, para Primaria y ESO.', en: 'Spanish spelling exam with the rules for b and v, g and j, h, ll and y and c and z, with their exceptions explained. 10 words, three levels, for primary and secondary.', ca: 'Examen d’ortografia castellana amb les regles de la b i la v, la g i la j, la h, la ll i la y i la c i la z, amb les excepcions explicades. 10 paraules, tres nivells, per a Primària i ESO.' }}
      metaPath="/examen/que-letra-test"
      subjectSchema="Lengua"
      backGamePath="/juegos/que-letra"
      playLabel={{ es: 'Modo arcade (90s)', en: 'Arcade mode (90s)', ca: 'Mode arcade (90s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
