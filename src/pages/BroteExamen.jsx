import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaBrote from '../components/brote/PreguntaBrote'
import { genRound, esCorrecta, schemaQuestion } from '../lib/brote'

// Examen con la mecánica de ¡Brote!: los mismos microbios y casos, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Fichas, microbios y un brote fácil', en: 'Cards, microbes and an easy outbreak', ca: 'Fitxes, microbis i un brot fàcil' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Brotes, antibióticos y defensas', en: 'Outbreaks, antibiotics and defences', ca: 'Brots, antibiòtics i defenses' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Brote justo e inmunidad de grupo', en: 'Tight outbreak and herd immunity', ca: 'Brot just i immunitat de grup' } },
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
      metaDesc={{ es: 'Examen de salud y enfermedad jugando: vacuna para frenar un brote, calcula la inmunidad de grupo, completa fichas de enfermedades y clasifica microbios y defensas. 10 preguntas.', en: 'Health and disease exam by playing: vaccinate to stop an outbreak, work out herd immunity, complete disease cards and sort microbes and defences. 10 questions.', ca: 'Examen de salut i malaltia jugant: vacuna per frenar un brot, calcula la immunitat de grup, completa fitxes de malalties i classifica microbis i defenses. 10 preguntes.' }}
      metaPath="/examen/brote-test"
      subjectSchema="Biología"
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
