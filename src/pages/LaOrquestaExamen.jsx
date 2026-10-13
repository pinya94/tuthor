import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaOrquesta from '../components/laOrquesta/PreguntaOrquesta'
import { genRound, esCorrecta, schemaQuestion } from '../lib/laOrquesta'

// Examen con la mecánica de La Orquesta: los mismos instrumentos dibujados, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Instrumentos y familias', en: 'Instruments and families', ca: 'Instruments i famílies' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Subfamilias, sonido y orquesta', en: 'Sub-families, sound and orchestra', ca: 'Subfamílies, so i orquestra' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Con Hornbostel-Sachs', en: 'With Hornbostel-Sachs', ca: 'Amb Hornbostel-Sachs' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaOrquesta ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function LaOrquestaExamen() {
  return (
    <MechanicExam
      gameId="la-orquesta-test"
      emoji="🎻"
      badge={{ es: 'Examen · Instrumentos', en: 'Exam · Instruments', ca: 'Examen · Instruments' }}
      title={{ es: 'Examen de instrumentos dibujados', en: 'Instruments Exam with Pictures', ca: 'Examen d’instruments dibuixats' }}
      sub={{ es: 'Familias, sonido, orquesta y Hornbostel-Sachs', en: 'Families, sound, orchestra and Hornbostel-Sachs', ca: 'Famílies, so, orquestra i Hornbostel-Sachs' }}
      metaTitle={{ es: 'Examen de instrumentos musicales y sus familias', en: 'Musical instruments and families exam', ca: 'Examen d’instruments musicals i les seves famílies' }}
      metaDesc={{ es: 'Examen de instrumentos con dibujos: qué instrumento es, su familia y subfamilia, cómo produce el sonido, dónde se sienta en la orquesta y su clasificación de Hornbostel-Sachs. 10 preguntas, tres niveles.', en: 'Instruments exam with pictures: which instrument, its family and sub-family, how it sounds, where it sits and its Hornbostel-Sachs class. 10 questions, three levels.', ca: 'Examen d’instruments amb dibuixos: quin instrument és, la seva família i subfamília, com produeix el so, on s’asseu a l’orquestra i la seva classificació. 10 preguntes, tres nivells.' }}
      metaPath="/examen/la-orquesta-test"
      subjectSchema="Música"
      backGamePath="/juegos/la-orquesta"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
