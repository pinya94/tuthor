import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaEnlace from '../components/queEnlace/PreguntaEnlace'
import { genRound, esCorrecta, schemaQuestion } from '../lib/queEnlace'

// Examen con la mecánica de ¿Qué Enlace?: la misma tabla, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Tipo de enlace entre dos elementos y sustancias de casa', en: 'Bond type between two elements and everyday substances', ca: 'Tipus d’enllaç entre dos elements i substàncies de casa' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Tipos de sustancia, propiedades y enlaces por átomo', en: 'Kinds of substance, properties and bonds per atom', ca: 'Tipus de substància, propietats i enllaços per àtom' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Iones y fórmulas de compuestos iónicos', en: 'Ions and ionic compound formulas', ca: 'Ions i fórmules de compostos iònics' } },
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
      sub={{ es: 'Iónico, covalente y metálico con la tabla periódica', en: 'Ionic, covalent and metallic with the periodic table', ca: 'Iònic, covalent i metàl·lic amb la taula periòdica' }}
      metaTitle={{ es: 'Examen de enlace químico: iónico, covalente y metálico', en: 'Chemical bonding exam: ionic, covalent and metallic', ca: 'Examen d’enllaç químic: iònic, covalent i metàl·lic' }}
      metaDesc={{ es: 'Examen de enlace químico con la tabla periódica: tipo de enlace entre dos elementos, sustancias iónicas, moleculares, redes covalentes y metálicas, propiedades, iones y fórmulas. 10 preguntas, tres niveles.', en: 'Chemical bonding exam with the periodic table: bond type between two elements, ionic, molecular, giant covalent and metallic substances, properties, ions and formulas. 10 questions, three levels.', ca: 'Examen d’enllaç químic amb la taula periòdica: tipus d’enllaç entre dos elements, substàncies iòniques, moleculars, xarxes covalents i metàl·liques, propietats, ions i fórmules. 10 preguntes, tres nivells.' }}
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
