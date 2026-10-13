import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaCadena from '../components/cadenaCarbono/PreguntaCadena'
import { genRound, esCorrecta, schemaQuestion } from '../lib/cadenaCarbono'

// Examen con la mecánica de Cadena de Carbono: las mismas moléculas, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Construir sin localizador e hidrógenos', en: 'Building without locants, and hydrogens', ca: 'Construir sense localitzador i hidrògens' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Localizadores y numeración', en: 'Locants and numbering', ca: 'Localitzadors i numeració' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Ramificaciones e isómeros construidos', en: 'Branches and built isomers', ca: 'Ramificacions i isòmers construïts' } },
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
      sub={{ es: 'Construye, numera y completa moléculas', en: 'Build, number and complete molecules', ca: 'Construeix, numera i completa molècules' }}
      metaTitle={{ es: 'Examen de formulación orgánica: nombres, fórmulas e isómeros', en: 'Organic nomenclature exam: names, formulas and isomers', ca: 'Examen de formulació orgànica: noms, fórmules i isòmers' }}
      metaDesc={{ es: 'Examen de química orgánica construyendo: monta cada molécula a partir de su nombre IUPAC, numera la cadena, pon los hidrógenos y construye isómeros. 10 preguntas.', en: 'Organic chemistry exam by building: put each molecule together from its IUPAC name, number the chain, add the hydrogens and build isomers. 10 questions.', ca: 'Examen de química orgànica construint: munta cada molècula a partir del nom IUPAC, numera la cadena, posa els hidrògens i construeix isòmers. 10 preguntes.' }}
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
