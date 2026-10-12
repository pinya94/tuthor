import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaCadena from '../components/cadenaCarbono/PreguntaCadena'
import { genRound, esCorrecta, schemaQuestion } from '../lib/cadenaCarbono'

// Examen con la mecánica de Cadena de Carbono: las mismas moléculas, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Familias, nombres y fórmulas', en: 'Families, names and formulas', ca: 'Famílies, noms i fórmules' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Localizadores y del nombre a la fórmula', en: 'Locants and from name to formula', ca: 'Localitzadors i del nom a la fórmula' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Ramificaciones e isómeros', en: 'Branches and isomers', ca: 'Ramificacions i isòmers' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaCadena ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function CadenaCarbonoExamen() {
  return (
    <MechanicExam
      gameId="cadena-carbono-test"
      emoji="⛓️"
      badge={{ es: 'Examen · Química orgánica', en: 'Exam · Organic chemistry', ca: 'Examen · Química orgànica' }}
      title={{ es: 'Examen de formulación orgánica', en: 'Organic Nomenclature Exam', ca: 'Examen de formulació orgànica' }}
      sub={{ es: 'Familias, nombres IUPAC, fórmulas e isómeros', en: 'Families, IUPAC names, formulas and isomers', ca: 'Famílies, noms IUPAC, fórmules i isòmers' }}
      metaTitle={{ es: 'Examen de formulación orgánica: nombres, fórmulas e isómeros', en: 'Organic nomenclature exam: names, formulas and isomers', ca: 'Examen de formulació orgànica: noms, fórmules i isòmers' }}
      metaDesc={{ es: 'Examen de química orgánica con las moléculas dibujadas: familias, nombres IUPAC con localizadores y ramas, fórmulas moleculares y semidesarrolladas e isómeros. 10 preguntas, tres niveles.', en: 'Organic chemistry exam with the molecules drawn: families, IUPAC names with locants and branches, molecular and condensed formulas, and isomers. 10 questions, three levels.', ca: 'Examen de química orgànica amb les molècules dibuixades: famílies, noms IUPAC amb localitzadors i branques, fórmules moleculars i semidesenvolupades i isòmers. 10 preguntes, tres nivells.' }}
      metaPath="/examen/cadena-carbono-test"
      subjectSchema="Química"
      backGamePath="/juegos/cadena-carbono"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
