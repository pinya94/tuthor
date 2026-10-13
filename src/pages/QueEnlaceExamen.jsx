import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaEnlace from '../components/queEnlace/PreguntaEnlace'
import { genRound, esCorrecta, schemaQuestion } from '../lib/queEnlace'

// Examen con la mecánica de ¿Qué Enlace? (electrones, enlaces, tabla), sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'NaCl, moléculas sencillas y metales', en: 'NaCl, simple molecules and metals', ca: 'NaCl, molècules senzilles i metalls' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'MgCl₂, dobles enlaces y sustancias', en: 'MgCl₂, double bonds and substances', ca: 'MgCl₂, dobles enllaços i substàncies' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Al₂O₃, triples enlaces y propiedades', en: 'Al₂O₃, triple bonds and properties', ca: 'Al₂O₃, triples enllaços i propietats' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaEnlace ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function QueEnlaceExamen() {
  return (
    <MechanicExam
      gameId="que-enlace-test"
      emoji="🔗"
      badge={{ es: 'Examen · Enlace químico', en: 'Exam · Bonding', ca: 'Examen · Enllaç químic' }}
      title={{ es: 'Examen de enlace químico', en: 'Chemical Bonding Exam', ca: 'Examen d’enllaç químic' }}
      sub={{ es: 'Construye compuestos iónicos y moléculas', en: 'Build ionic compounds and molecules', ca: 'Construeix compostos iònics i molècules' }}
      metaTitle={{ es: 'Examen de enlace químico: iónico, covalente y metálico', en: 'Chemical bonding exam: ionic, covalent and metallic', ca: 'Examen d’enllaç químic: iònic, covalent i metàl·lic' }}
      metaDesc={{ es: 'Examen de enlace químico construyendo: pasa electrones para formar compuestos iónicos, pon los enlaces de cada molécula y clasifica metales y sustancias. 10 preguntas.', en: 'Chemical bonding exam by building: pass electrons to form ionic compounds, add the bonds in each molecule and sort metals and substances. 10 questions.', ca: 'Examen d’enllaç químic construint: passa electrons per formar compostos iònics, posa els enllaços de cada molècula i classifica metalls i substàncies. 10 preguntes.' }}
      metaPath="/examen/que-enlace-test"
      subjectSchema="Química"
      backGamePath="/juegos/que-enlace"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
