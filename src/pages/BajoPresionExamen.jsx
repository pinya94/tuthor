import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaGas from '../components/bajoPresion/PreguntaGas'
import { genRound, esCorrecta, schemaQuestion } from '../lib/bajoPresion'

// Examen con la mecánica de Bajo Presión: las mismas rondas, sin reloj.
const LEVELS = [
  { key: 'eso', emoji: '💚', difficulty: 'facil',
    label: { es: '3.º de ESO', en: 'Year 9', ca: '3r d’ESO' },
    hint: { es: 'Boyle, Charles y Gay-Lussac en kelvin', en: 'Boyle, Charles and Gay-Lussac in kelvin', ca: 'Boyle, Charles i Gay-Lussac en kelvin' } },
  { key: 'eso4', emoji: '💛', difficulty: 'medio',
    label: { es: '4.º de ESO', en: 'Year 10', ca: '4t d’ESO' },
    hint: { es: 'Con °C que pasar a kelvin y la ley combinada', en: 'With °C to convert to kelvin and the combined law', ca: 'Amb °C per passar a kelvin i la llei combinada' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth form', ca: 'Batxillerat' },
    hint: { es: 'Ley combinada y P·V = n·R·T', en: 'Combined law and P·V = n·R·T', ca: 'Llei combinada i P·V = n·R·T' } },
]

// Estado propio (lo que ha construido): ver la nota de hooks en CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaGas ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function BajoPresionExamen() {
  return (
    <MechanicExam
      gameId="bajo-presion-test"
      emoji="🎈"
      badge={{ es: 'Examen · Leyes de los gases', en: 'Exam · Gas laws', ca: 'Examen · Lleis dels gasos' }}
      title={{ es: 'Examen de las leyes de los gases', en: 'Gas Laws Exam', ca: 'Examen de les lleis dels gasos' }}
      sub={{ es: 'Ajusta el émbolo, el manómetro o el termómetro', en: 'Set the piston, the gauge or the thermometer', ca: 'Ajusta l’èmbol, el manòmetre o el termòmetre' }}
      metaTitle={{ es: 'Ejercicios de leyes de los gases resueltos: Boyle, Charles, Gay-Lussac y PV = nRT', en: 'Gas laws practice questions with answers: Boyle, Charles, Gay-Lussac and PV = nRT', ca: 'Exercicis de lleis dels gasos resolts: Boyle, Charles, Gay-Lussac i PV = nRT' }}
      metaDesc={{ es: 'Ejercicios resueltos de las leyes de los gases: Boyle, Charles, Gay-Lussac, ley combinada y gases ideales, con °C que pasar a kelvin. 10 preguntas en tres niveles, con la cuenta explicada.', en: 'Gas laws practice with answers: Boyle, Charles, Gay-Lussac, the combined law and ideal gases, with °C to convert to kelvin. 10 questions on three levels, with every calculation explained.', ca: 'Exercicis resolts de les lleis dels gasos: Boyle, Charles, Gay-Lussac, llei combinada i gasos ideals, amb °C per passar a kelvin. 10 preguntes en tres nivells, amb el compte explicat.' }}
      metaPath="/examen/bajo-presion-test"
      subjectSchema="Química"
      backGamePath="/juegos/bajo-presion"
      playLabel={{ es: 'Modo arcade (150s)', en: 'Arcade mode (150s)', ca: 'Mode arcade (150s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
