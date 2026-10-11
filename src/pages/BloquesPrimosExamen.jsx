import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaPrimos from '../components/bloquesPrimos/PreguntaPrimos'
import { genRound, esCorrecta, schemaQuestion } from '../lib/bloquesPrimos'

// Examen con la mecánica de Bloques Primos: las mismas preguntas, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Criterios, primos, descomponer y mcd/mcm con bloques', en: 'Rules, primes, factorising and HCF/LCM with blocks', ca: 'Criteris, primers, descompondre i mcd/mcm amb blocs' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Números más grandes y problemas de mcd y mcm', en: 'Bigger numbers and HCF and LCM problems', ca: 'Nombres més grans i problemes de mcd i mcm' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Sin bloques, tres números y problemas', en: 'No blocks, three numbers and problems', ca: 'Sense blocs, tres nombres i problemes' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaPrimos ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function BloquesPrimosExamen() {
  return (
    <MechanicExam
      gameId="bloques-primos-test"
      emoji="🧱"
      badge={{ es: 'Examen · Divisibilidad', en: 'Exam · Divisibility', ca: 'Examen · Divisibilitat' }}
      title={{ es: 'Examen de mcm y mcd', en: 'HCF and LCM Exam', ca: 'Examen de mcm i mcd' }}
      sub={{ es: 'Divisibilidad, primos, descomposición, mcd, mcm y problemas', en: 'Divisibility, primes, factorisation, HCF, LCM and problems', ca: 'Divisibilitat, primers, descomposició, mcd, mcm i problemes' }}
      metaTitle={{ es: 'Examen de mcm y mcd con problemas resueltos', en: 'HCF and LCM exam with worked problems', ca: 'Examen de mcm i mcd amb problemes resolts' }}
      metaDesc={{ es: 'Examen de divisibilidad: criterios, números primos, descomposición en factores primos, mcd, mcm y problemas, con la explicación de cada respuesta. 10 preguntas, tres niveles.', en: 'Divisibility exam: rules, prime numbers, prime factorisation, HCF, LCM and word problems, with an explanation for each answer. 10 questions, three levels.', ca: 'Examen de divisibilitat: criteris, nombres primers, descomposició en factors primers, mcd, mcm i problemes, amb l’explicació de cada resposta. 10 preguntes, tres nivells.' }}
      metaPath="/examen/bloques-primos-test"
      subjectSchema="Matemáticas"
      backGamePath="/juegos/bloques-primos"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
