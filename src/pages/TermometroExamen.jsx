import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaTermometro from '../components/termometro/PreguntaTermometro'
import { genRound, esCorrecta, schemaQuestion } from '../lib/termometro'

// Examen con la mecánica de Termómetro: las mismas preguntas, sin reloj.
const LEVELS = [
  { key: 'primaria', emoji: '💚', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Celsius y kelvin, mezclas iguales, transmisión del calor y la sartén', en: 'Celsius and kelvin, equal mixes, heat transfer and the frying pan', ca: 'Celsius i kelvin, barreges iguals, transmissió de la calor i la paella' } },
  { key: 'eso', emoji: '💛', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Fahrenheit y mezclas con distinta masa', en: 'Fahrenheit and mixes with different masses', ca: 'Fahrenheit i barreges amb massa diferent' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Q = m · c · ΔT en julios y de Fahrenheit a Celsius', en: 'Q = m · c · ΔT in joules and Fahrenheit to Celsius', ca: 'Q = m · c · ΔT en joules i de Fahrenheit a Celsius' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaTermometro ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function TermometroExamen() {
  return (
    <MechanicExam
      gameId="termometro-test"
      emoji="🌡️"
      badge={{ es: 'Examen · Calor y temperatura', en: 'Exam · Heat and temperature', ca: 'Examen · Calor i temperatura' }}
      title={{ es: 'Examen de calor y temperatura', en: 'Heat and Temperature Exam', ca: 'Examen de calor i temperatura' }}
      sub={{ es: 'Escalas, mezclas, Q = m · c · ΔT y transmisión del calor', en: 'Scales, mixes, Q = m · c · ΔT and heat transfer', ca: 'Escales, barreges, Q = m · c · ΔT i transmissió de la calor' }}
      metaTitle={{ es: 'Examen de calor y temperatura con explicaciones', en: 'Heat and temperature exam with explanations', ca: 'Examen de calor i temperatura amb explicacions' }}
      metaDesc={{ es: 'Examen de calor y temperatura: de Celsius a kelvin y Fahrenheit, temperatura de una mezcla, Q = m · c · ΔT, conducción, convección y radiación y diferencias entre calor y temperatura. 10 preguntas, tres niveles.', en: 'Heat and temperature exam: Celsius to kelvin and Fahrenheit, temperature of a mixture, Q = m · c · ΔT, conduction, convection and radiation and the difference between heat and temperature. 10 questions, three levels.', ca: 'Examen de calor i temperatura: de Celsius a kelvin i Fahrenheit, temperatura d’una barreja, Q = m · c · ΔT, conducció, convecció i radiació i diferències entre calor i temperatura. 10 preguntes, tres nivells.' }}
      metaPath="/examen/termometro-test"
      subjectSchema="Física"
      backGamePath="/juegos/termometro"
      playLabel={{ es: 'Modo arcade (90s)', en: 'Arcade mode (90s)', ca: 'Mode arcade (90s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
