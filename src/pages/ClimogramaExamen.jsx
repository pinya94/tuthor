import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaClima from '../components/climograma/PreguntaClima'
import { genRound, esCorrecta, schemaQuestion } from '../lib/climograma'

// Examen con la mecánica de Climograma: los mismos climogramas, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Iniciación', en: 'Beginner', ca: 'Iniciació' },
    hint: { es: 'Mes más cálido, más lluvioso y climas claros', en: 'Warmest and wettest month, clear climates', ca: 'Mes més càlid, més plujós i climes clars' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Siete climas, amplitud y meses secos', en: 'Seven climates, range and dry months', ca: 'Set climes, amplitud i mesos secs' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Hemisferio sur y lectura fina', en: 'Southern hemisphere and close reading', ca: 'Hemisferi sud i lectura fina' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaClima ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function ClimogramaExamen() {
  return (
    <MechanicExam
      gameId="climograma-test"
      emoji="🌧️"
      badge={{ es: 'Examen · El clima', en: 'Exam · Climate', ca: 'Examen · El clima' }}
      title={{ es: 'Examen de climogramas', en: 'Climate Graphs Exam', ca: 'Examen de climogrames' }}
      sub={{ es: 'Lee el climograma y reconoce el clima', en: 'Read the graph and recognise the climate', ca: 'Llegeix el climograma i reconeix el clima' }}
      metaTitle={{ es: 'Examen de climogramas: tipos de clima, amplitud y meses secos', en: 'Climate graphs exam: climate types, temperature range and dry months', ca: 'Examen de climogrames: tipus de clima, amplitud i mesos secs' }}
      metaDesc={{ es: 'Examen con climogramas generados: reconoce el clima (ecuatorial, tropical, desértico, mediterráneo, oceánico, continental, polar), la amplitud térmica y los meses secos.', en: 'Exam with generated climate graphs: recognise the climate (equatorial, tropical, desert, Mediterranean, oceanic, continental, polar), temperature range and dry months.', ca: 'Examen amb climogrames generats: reconeix el clima (equatorial, tropical, desèrtic, mediterrani, oceànic, continental, polar), l’amplitud tèrmica i els mesos secs.' }}
      metaPath="/examen/climograma-test"
      subjectSchema="Geografía"
      backGamePath="/juegos/climograma"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
