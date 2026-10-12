import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaEuropa from '../components/europa27/PreguntaEuropa'
import { genRound, esCorrecta, schemaQuestion } from '../lib/europa27'

// Examen con la mecánica de Europa a 27: el mismo mapa y las mismas preguntas, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Mapa, capitales y miembros', en: 'Map, capitals and members', ca: 'Mapa, capitals i membres' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Euro, ampliaciones e instituciones', en: 'Euro, enlargements and institutions', ca: 'Euro, ampliacions i institucions' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Schengen, años de entrada y sedes', en: 'Schengen, joining years and seats', ca: 'Schengen, anys d’entrada i seus' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaEuropa ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function Europa27Examen() {
  return (
    <MechanicExam
      gameId="europa-27-test"
      emoji="⭐"
      badge={{ es: 'Examen · La Unión Europea', en: 'Exam · The European Union', ca: 'Examen · La Unió Europea' }}
      title={{ es: 'Examen de la Unión Europea con mapa', en: 'European Union Map Exam', ca: 'Examen de la Unió Europea amb mapa' }}
      sub={{ es: 'Países, euro, Schengen, ampliaciones e instituciones', en: 'Countries, euro, Schengen, enlargements and institutions', ca: 'Països, euro, Schengen, ampliacions i institucions' }}
      metaTitle={{ es: 'Examen de la Unión Europea: mapa, euro, Schengen e instituciones', en: 'European Union exam: map, euro, Schengen and institutions', ca: 'Examen de la Unió Europea: mapa, euro, Schengen i institucions' }}
      metaDesc={{ es: 'Examen de la Unión Europea con el mapa de Europa: los 27 países y sus capitales, quién es miembro, el euro, Schengen, las ampliaciones y las instituciones con sus sedes. 10 preguntas, tres niveles.', en: 'European Union exam with the map of Europe: the 27 countries and their capitals, who is a member, the euro, Schengen, enlargements and the institutions with their seats. 10 questions, three levels.', ca: 'Examen de la Unió Europea amb el mapa d’Europa: els 27 països i les seves capitals, qui n’és membre, l’euro, Schengen, les ampliacions i les institucions amb les seves seus. 10 preguntes, tres nivells.' }}
      metaPath="/examen/europa-27-test"
      subjectSchema="Química"
      backGamePath="/juegos/europa-27"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
