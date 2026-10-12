import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaQuienDecide from '../components/quienDecide/PreguntaQuienDecide'
import { genRound, esCorrecta, schemaQuestion } from '../lib/quienDecide'

// Examen con la mecánica de ¿Quién Decide?: el mismo organigrama y los mismos casos, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Poderes, órganos y números', en: 'Powers, bodies and numbers', ca: 'Poders, òrgans i números' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Derechos, deberes y competencias', en: 'Rights, duties and powers', ca: 'Drets, deures i competències' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Con el camino de una ley', en: 'Including how a law is made', ca: 'Amb el camí d’una llei' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaQuienDecide ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function QuienDecideExamen() {
  return (
    <MechanicExam
      gameId="quien-decide-test"
      emoji="🗳️"
      badge={{ es: 'Examen · La Constitución', en: 'Exam · The Constitution', ca: 'Examen · La Constitució' }}
      title={{ es: 'Examen: ¿quién decide en el Estado?', en: 'Exam: who decides in the State?', ca: 'Examen: qui decideix a l’Estat?' }}
      sub={{ es: 'Poderes, órganos, derechos, competencias y leyes', en: 'Powers, bodies, rights, regional powers and laws', ca: 'Poders, òrgans, drets, competències i lleis' }}
      metaTitle={{ es: 'Examen de la Constitución española: poderes, órganos del Estado y leyes', en: 'Spanish Constitution exam: powers, bodies of the State and laws', ca: 'Examen de la Constitució espanyola: poders, òrgans de l’Estat i lleis' }}
      metaDesc={{ es: 'Examen de la Constitución con el organigrama del Estado: Congreso, Senado, Gobierno, rey y tribunales, los tres poderes, los números de la Constitución, derechos y deberes, competencias y el camino de una ley. 10 preguntas, tres niveles.', en: 'Constitution exam with the State organisation chart: Congress, Senate, Government, King and courts, the three powers, the Constitution’s numbers, rights and duties, regional powers and how a law is made. 10 questions, three levels.', ca: 'Examen de la Constitució amb l’organigrama de l’Estat: Congrés, Senat, Govern, rei i tribunals, els tres poders, els números de la Constitució, drets i deures, competències i el camí d’una llei. 10 preguntes, tres nivells.' }}
      metaPath="/examen/quien-decide-test"
      subjectSchema="Química"
      backGamePath="/juegos/quien-decide"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
