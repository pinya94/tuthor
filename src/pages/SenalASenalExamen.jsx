import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaSenal from '../components/senalASenal/PreguntaSenal'
import { genRound, esCorrecta, schemaQuestion } from '../lib/senalASenal'

// Examen con la mecánica de Señal a Señal: las mismas señales y situaciones, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Señales comunes y su forma', en: 'Common signs and their shapes', ca: 'Senyals comuns i la seva forma' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Señales y situaciones', en: 'Signs and situations', ca: 'Senyals i situacions' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Las señales que se confunden', en: 'Signs that get confused', ca: 'Els senyals que es confonen' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaSenal ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function SenalASenalExamen() {
  return (
    <MechanicExam
      gameId="senal-a-senal-test"
      emoji="🚸"
      badge={{ es: 'Examen · Seguridad vial', en: 'Exam · Road safety', ca: 'Examen · Seguretat viària' }}
      title={{ es: 'Examen de señales de tráfico', en: 'Road Signs Exam', ca: 'Examen de senyals de trànsit' }}
      sub={{ es: 'Señales, formas y situaciones', en: 'Signs, shapes and situations', ca: 'Senyals, formes i situacions' }}
      metaTitle={{ es: 'Examen de señales de tráfico y seguridad vial', en: 'Road signs and road safety exam', ca: 'Examen de senyals de trànsit i seguretat viària' }}
      metaDesc={{ es: 'Examen de seguridad vial con señales dibujadas: qué significa cada señal, su tipo por la forma y el color, y qué hacer como peatón, ciclista o pasajero. 10 preguntas, tres niveles.', en: 'Road safety exam with drawn signs: what each sign means, its type by shape and colour, and what to do as a pedestrian, cyclist or passenger. 10 questions, three levels.', ca: 'Examen de seguretat viària amb senyals dibuixats: què vol dir cada senyal, el seu tipus per la forma i el color, i què fer com a vianant, ciclista o passatger. 10 preguntes, tres nivells.' }}
      metaPath="/examen/senal-a-senal-test"
      subjectSchema="Vida Práctica"
      backGamePath="/juegos/senal-a-senal"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
