import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaEnergia from '../components/cadenaEnergia/PreguntaEnergia'
import { genRound, esCorrecta, schemaQuestion } from '../lib/cadenaEnergia'

// Examen con la mecánica de Cadena de energía: las mismas preguntas, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Clasificar formas de energía y montar aparatos', en: 'Sorting forms of energy and building devices', ca: 'Classificar formes d’energia i muntar aparells' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Completar cadenas de transformaciones', en: 'Completing chains of transformations', ca: 'Completar cadenes de transformacions' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Rendimiento, energía perdida y Ep = m·g·h', en: 'Efficiency, energy lost and Ep = m·g·h', ca: 'Rendiment, energia perduda i Ep = m·g·h' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaEnergia ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function CadenaEnergiaExamen() {
  return (
    <MechanicExam
      gameId="cadena-energia-test"
      emoji="🔆"
      badge={{ es: 'Examen · La energía', en: 'Exam · Energy', ca: 'Examen · L’energia' }}
      title={{ es: 'Examen de Cadena de energía', en: 'Energy Chain Exam', ca: 'Examen de Cadena d’energia' }}
      sub={{ es: 'Formas de energía, transformaciones y rendimiento', en: 'Forms of energy, transformations and efficiency', ca: 'Formes d’energia, transformacions i rendiment' }}
      metaTitle={{ es: 'Examen de la energía: formas, transformaciones y rendimiento', en: 'Energy exam: forms, transformations and efficiency', ca: 'Examen de l’energia: formes, transformacions i rendiment' }}
      metaDesc={{ es: 'Examen de energía: qué forma tiene cada cosa, qué transforma cada aparato, cadenas como la de una central hidroeléctrica o nuclear, rendimiento, energía perdida y Ep = m·g·h. 10 preguntas, tres niveles.', en: 'Energy exam: what form each thing has, what each device transforms, chains like a hydroelectric or nuclear power station’s, efficiency, energy lost and Ep = m·g·h. 10 questions, three levels.', ca: 'Examen d’energia: quina forma té cada cosa, què transforma cada aparell, cadenes com la d’una central hidroelèctrica o nuclear, rendiment, energia perduda i Ep = m·g·h. 10 preguntes, tres nivells.' }}
      metaPath="/examen/cadena-energia-test"
      subjectSchema="Física"
      backGamePath="/juegos/cadena-energia"
      playLabel={{ es: 'Modo arcade (90s)', en: 'Arcade mode (90s)', ca: 'Mode arcade (90s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
