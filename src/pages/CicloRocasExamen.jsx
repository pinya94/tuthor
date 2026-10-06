import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaRocas from '../components/cicloRocas/PreguntaRocas'
import { genRound, esCorrecta, schemaQuestion } from '../lib/cicloRocas'

// Examen con la mecánica del Ciclo de las rocas: el mismo ciclo y las mismas muestras, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Procesos del ciclo y tipos de roca', en: 'Cycle processes and rock types', ca: 'Processos del cicle i tipus de roca' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Procesos, tipos y origen de las metamórficas', en: 'Processes, types and origin of metamorphic rocks', ca: 'Processos, tipus i origen de les metamòrfiques' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Clases de rocas y rutas por el ciclo', en: 'Kinds of rock and routes through the cycle', ca: 'Menes de roques i rutes pel cicle' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaRocas ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function CicloRocasExamen() {
  return (
    <MechanicExam
      gameId="ciclo-rocas-test"
      emoji="⛰️"
      badge={{ es: 'Examen · Rocas y minerales', en: 'Exam · Rocks and minerals', ca: 'Examen · Roques i minerals' }}
      title={{ es: 'Examen del Ciclo de las rocas', en: 'Rock Cycle Exam', ca: 'Examen del Cicle de les roques' }}
      sub={{ es: 'Procesos, tipos de roca y su origen', en: 'Processes, rock types and their origin', ca: 'Processos, tipus de roca i el seu origen' }}
      metaTitle={{ es: 'Examen del ciclo de las rocas: ígneas, sedimentarias y metamórficas', en: 'Rock cycle exam: igneous, sedimentary and metamorphic', ca: 'Examen del cicle de les roques: ígnies, sedimentàries i metamòrfiques' }}
      metaDesc={{ es: 'Examen del ciclo de las rocas con el diagrama y muestras de rocas reales: procesos (fusión, erosión, metamorfismo…), tipos de roca, de dónde viene cada metamórfica y rutas por el ciclo. 10 preguntas, tres niveles.', en: 'Rock cycle exam with the diagram and samples of real rocks: processes (melting, erosion, metamorphism…), rock types, where each metamorphic rock comes from and routes through the cycle. 10 questions, three levels.', ca: 'Examen del cicle de les roques amb el diagrama i mostres de roques reals: processos (fusió, erosió, metamorfisme…), tipus de roca, d’on ve cada metamòrfica i rutes pel cicle. 10 preguntes, tres nivells.' }}
      metaPath="/examen/ciclo-rocas-test"
      subjectSchema="Geología"
      backGamePath="/juegos/ciclo-rocas"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
