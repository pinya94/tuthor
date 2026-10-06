import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaEstilo from '../components/queEstilo/PreguntaEstilo'
import { genRound, esCorrecta } from '../lib/queEstilo'

// Examen con la mecánica de ¿Qué estilo es?: los mismos dibujos, sin reloj.
// Sin schemaQuestion: describir el dibujo con palabras ya daría la respuesta.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Iniciación', en: 'Beginner', ca: 'Iniciació' },
    hint: { es: 'Estilos muy distintos, arcos y columnas', en: 'Very different styles, arches and columns', ca: 'Estils molt diferents, arcs i columnes' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Un estilo parecido y la época', en: 'A similar style and the period', ca: 'Un estil semblant i l’època' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Los estilos que más se parecen', en: 'The styles that look most alike', ca: 'Els estils que més s’assemblen' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaEstilo ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function QueEstiloExamen() {
  return (
    <MechanicExam
      gameId="que-estilo-test"
      emoji="⛪"
      badge={{ es: 'Examen · Historia del Arte', en: 'Exam · Art History', ca: 'Examen · Història de l’Art' }}
      title={{ es: 'Examen de estilos arquitectónicos', en: 'Architectural Styles Exam', ca: 'Examen d’estils arquitectònics' }}
      sub={{ es: 'Reconoce el estilo, el arco y la columna', en: 'Recognise the style, the arch and the column', ca: 'Reconeix l’estil, l’arc i la columna' }}
      metaTitle={{ es: 'Examen de estilos arquitectónicos: del griego al neoclásico', en: 'Architectural styles exam: from Greek to Neoclassical', ca: 'Examen d’estils arquitectònics: del grec al neoclàssic' }}
      metaDesc={{ es: 'Examen con edificios dibujados: reconoce el estilo (griego, romano, hispanomusulmán, románico, gótico, Renacimiento, Barroco, Neoclásico), los arcos, las columnas y la época.', en: 'Exam with drawn buildings: recognise the style (Greek, Roman, Islamic Spain, Romanesque, Gothic, Renaissance, Baroque, Neoclassical), arches, columns and period.', ca: 'Examen amb edificis dibuixats: reconeix l’estil (grec, romà, hispanomusulmà, romànic, gòtic, Renaixement, Barroc, Neoclàssic), els arcs, les columnes i l’època.' }}
      metaPath="/examen/que-estilo-test"
      subjectSchema="Historia del Arte"
      backGamePath="/juegos/que-estilo"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
