import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaLab from '../components/laboratorio/PreguntaLab'
import { genRound, esCorrecta, schemaQuestion } from '../lib/laboratorio'

// Examen con la mecánica de El Laboratorio: las mismas mezclas, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Llevar cada mezcla a su instrumento', en: 'Taking each mixture to its equipment', ca: 'Portar cada mescla al seu instrument' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Unir métodos y propiedades, clasificar mezclas', en: 'Matching methods and properties, sorting mixtures', ca: 'Unir mètodes i propietats, classificar mescles' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Montar los pasos en orden', en: 'Building the steps in order', ca: 'Muntar els passos en ordre' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaLab ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function ElLaboratorioExamen() {
  return (
    <MechanicExam
      gameId="el-laboratorio-test"
      emoji="🥼"
      badge={{ es: 'Examen · Mezclas y separación', en: 'Exam · Mixtures and separation', ca: 'Examen · Mescles i separació' }}
      title={{ es: 'Examen de El Laboratorio', en: 'The Lab Exam', ca: 'Examen d’El Laboratori' }}
      sub={{ es: 'Métodos de separación de mezclas', en: 'Methods for separating mixtures', ca: 'Mètodes de separació de mescles' }}
      metaTitle={{ es: 'Examen de separación de mezclas: filtrar, decantar, destilar…', en: 'Separating mixtures exam: filter, decant, distil…', ca: 'Examen de separació de mescles: filtrar, decantar, destil·lar…' }}
      metaDesc={{ es: 'Examen de métodos de separación de mezclas: filtración, tamizado, imán, decantación, evaporación, destilación y cromatografía; en qué propiedad se basan y el orden de los pasos. 10 preguntas, tres niveles.', en: 'Exam on methods for separating mixtures: filtering, sieving, magnet, decanting, evaporating, distilling and chromatography; which property they rely on and the order of steps. 10 questions, three levels.', ca: 'Examen de mètodes de separació de mescles: filtració, tamisatge, imant, decantació, evaporació, destil·lació i cromatografia; en quina propietat es basen i l’ordre dels passos. 10 preguntes, tres nivells.' }}
      metaPath="/examen/el-laboratorio-test"
      subjectSchema="Química"
      backGamePath="/juegos/el-laboratorio"
      playLabel={{ es: 'Modo arcade (90s)', en: 'Arcade mode (90s)', ca: 'Mode arcade (90s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
