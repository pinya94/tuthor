import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaEscala from '../components/escalaUniverso/PreguntaEscala'
import { genRound, esCorrecta, schemaQuestion } from '../lib/escalaUniverso'

// Examen con la mecánica de Escala del Universo: la misma regla, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Números grandes y producto y cociente de potencias', en: 'Big numbers and product and quotient of powers', ca: 'Nombres grans i producte i quocient de potències' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Números pequeños, comparar y potencia de potencia', en: 'Small numbers, comparing and power of a power', ca: 'Nombres petits, comparar i potència de potència' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Operar en notación científica', en: 'Calculating in scientific notation', ca: 'Operar en notació científica' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaEscala ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function EscalaUniversoExamen() {
  return (
    <MechanicExam
      gameId="escala-universo-test"
      emoji="🔭"
      badge={{ es: 'Examen · Potencias', en: 'Exam · Powers', ca: 'Examen · Potències' }}
      title={{ es: 'Examen de potencias y notación científica', en: 'Powers and Scientific Notation Exam', ca: 'Examen de potències i notació científica' }}
      sub={{ es: 'Tamaños reales, propiedades de las potencias y operaciones', en: 'Real sizes, laws of indices and calculations', ca: 'Mides reals, propietats de les potències i operacions' }}
      metaTitle={{ es: 'Examen de notación científica y potencias', en: 'Scientific notation and powers exam', ca: 'Examen de notació científica i potències' }}
      metaDesc={{ es: 'Examen de potencias con tamaños reales del universo: escribir y leer en notación científica, comparar, propiedades de las potencias, exponente 0 y negativo y operar en notación científica. 10 preguntas, tres niveles.', en: 'Powers exam with real sizes from the universe: writing and reading scientific notation, comparing, laws of indices, zero and negative exponents and calculating in scientific notation. 10 questions, three levels.', ca: 'Examen de potències amb mides reals de l’univers: escriure i llegir en notació científica, comparar, propietats de les potències, exponent 0 i negatiu i operar en notació científica. 10 preguntes, tres nivells.' }}
      metaPath="/examen/escala-universo-test"
      subjectSchema="Matemáticas"
      backGamePath="/juegos/escala-universo"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
