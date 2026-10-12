import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaBrote from '../components/brote/PreguntaBrote'
import { genRound, esCorrecta, schemaQuestion } from '../lib/brote'

// Examen con la mecánica de ¡Brote!: los mismos microbios y casos, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Microbios, causas y contagio', en: 'Microbes, causes and spread', ca: 'Microbis, causes i contagi' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Antibióticos, defensas y contagios', en: 'Antibiotics, defences and infections', ca: 'Antibiòtics, defenses i contagis' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Inmunidad, brotes e inmunidad de grupo', en: 'Immunity, outbreaks and herd immunity', ca: 'Immunitat, brots i immunitat de grup' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaBrote ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function BroteExamen() {
  return (
    <MechanicExam
      gameId="brote-test"
      emoji="🦠"
      badge={{ es: 'Examen · Salud y enfermedad', en: 'Exam · Health and disease', ca: 'Examen · Salut i malaltia' }}
      title={{ es: 'Examen de microbios y defensas', en: 'Microbes and Defences Exam', ca: 'Examen de microbis i defenses' }}
      sub={{ es: 'Microbios, contagio, antibióticos, defensas e inmunidad', en: 'Microbes, infection, antibiotics, defences and immunity', ca: 'Microbis, contagi, antibiòtics, defenses i immunitat' }}
      metaTitle={{ es: 'Examen de salud y enfermedad: microbios, contagio, defensas y vacunas', en: 'Health and disease exam: microbes, infection, defences and vaccines', ca: 'Examen de salut i malaltia: microbis, contagi, defenses i vacunes' }}
      metaDesc={{ es: 'Examen de salud y enfermedad con microbios dibujados: virus, bacterias, hongos y protozoos, contagio, antibióticos, líneas de defensa, tipos de inmunidad e inmunidad de grupo. 10 preguntas, tres niveles.', en: 'Health and disease exam with drawn microbes: viruses, bacteria, fungi and protozoa, infection, antibiotics, lines of defence, types of immunity and herd immunity. 10 questions, three levels.', ca: 'Examen de salut i malaltia amb microbis dibuixats: virus, bacteris, fongs i protozous, contagi, antibiòtics, línies de defensa, tipus d’immunitat i immunitat de grup. 10 preguntes, tres nivells.' }}
      metaPath="/examen/brote-test"
      subjectSchema="Química"
      backGamePath="/juegos/brote"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
