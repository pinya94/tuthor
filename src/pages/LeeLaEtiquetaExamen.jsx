import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaEtiqueta from '../components/etiqueta/PreguntaEtiqueta'
import { genRound, esCorrecta, schemaQuestion } from '../lib/etiqueta'

// Examen con la mecánica de Lee la Etiqueta: las mismas etiquetas, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Comparar dos etiquetas y contar terrones de azúcar', en: 'Compare two labels and count sugar cubes', ca: 'Comparar dues etiquetes i comptar terrossos de sucre' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Gramos por ración y semáforo nutricional', en: 'Grams per serving and traffic-light labels', ca: 'Grams per ració i semàfor nutricional' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'La trampa de la ración', en: 'The serving trap', ca: 'La trampa de la ració' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaEtiqueta ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function LeeLaEtiquetaExamen() {
  return (
    <MechanicExam
      gameId="lee-la-etiqueta-test"
      emoji="🏷️"
      badge={{ es: 'Examen · Nutrición', en: 'Exam · Nutrition', ca: 'Examen · Nutrició' }}
      title={{ es: 'Examen: Lee la Etiqueta', en: 'Exam: Read the Label', ca: 'Examen: Llegeix l’Etiqueta' }}
      sub={{ es: 'Leer etiquetas nutricionales para decidir', en: 'Reading nutrition labels to decide', ca: 'Llegir etiquetes nutricionals per decidir' }}
      metaTitle={{ es: 'Examen de etiquetas nutricionales', en: 'Nutrition labels exam', ca: 'Examen d’etiquetes nutricionals' }}
      metaDesc={{ es: 'Examen de leer etiquetas nutricionales: azúcar, sal y grasas por 100 g y por ración, terrones de azúcar y semáforo nutricional. 10 preguntas, tres niveles.', en: 'Nutrition label reading exam: sugar, salt and fat per 100 g and per serving, sugar cubes and traffic-light labels. 10 questions, three levels.', ca: 'Examen de llegir etiquetes nutricionals: sucre, sal i greixos per 100 g i per ració, terrossos de sucre i semàfor nutricional. 10 preguntes, tres nivells.' }}
      metaPath="/examen/lee-la-etiqueta-test"
      subjectSchema="Biología"
      backGamePath="/juegos/lee-la-etiqueta"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
