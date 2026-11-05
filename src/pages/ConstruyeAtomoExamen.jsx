import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaAtomo from '../components/construyeAtomo/PreguntaAtomo'
import { genRound, esCorrecta, schemaQuestion } from '../lib/construyeAtomo'

// Examen con la mecánica de Construye el Átomo: las mismas rondas, sin reloj.
const LEVELS = [
  { key: 'eso', emoji: '💚', difficulty: 'facil',
    label: { es: '3.º de ESO', en: 'Year 9', ca: '3r d’ESO' },
    hint: { es: 'Protones, neutrones y electrones de un átomo', en: 'Protons, neutrons and electrons of an atom', ca: 'Protons, neutrons i electrons d’un àtom' } },
  { key: 'eso4', emoji: '💛', difficulty: 'medio',
    label: { es: 'Iones e isótopos', en: 'Ions and isotopes', ca: 'Ions i isòtops' },
    hint: { es: 'Cl⁻, Fe³⁺, carbono-14, deuterio…', en: 'Cl⁻, Fe³⁺, carbon-14, deuterium…', ca: 'Cl⁻, Fe³⁺, carboni-14, deuteri…' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Configuración electrónica', en: 'Electron configuration', ca: 'Configuració electrònica' },
    hint: { es: 'Orbitales y posición en la tabla (4.º ESO y Bachillerato)', en: 'Orbitals and position in the table', ca: 'Orbitals i posició a la taula (4t ESO i Batxillerat)' } },
]

// Estado propio (lo que ha construido): ver la nota de hooks en CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaAtomo ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function ConstruyeAtomoExamen() {
  return (
    <MechanicExam
      gameId="construye-atomo-test"
      emoji="⚛️"
      badge={{ es: 'Examen · Estructura atómica', en: 'Exam · Atomic structure', ca: 'Examen · Estructura atòmica' }}
      title={{ es: 'Examen de estructura atómica', en: 'Atomic Structure Exam', ca: 'Examen d’estructura atòmica' }}
      sub={{ es: 'Construye átomos, iones y configuraciones', en: 'Build atoms, ions and configurations', ca: 'Construeix àtoms, ions i configuracions' }}
      metaTitle={{ es: 'Ejercicios de número atómico, número másico y configuración electrónica', en: 'Atomic number, mass number and electron configuration practice questions', ca: 'Exercicis de nombre atòmic, nombre màssic i configuració electrònica' }}
      metaDesc={{ es: 'Ejercicios resueltos de estructura atómica: protones, neutrones y electrones a partir de Z y A, iones, isótopos, configuración electrónica y posición en la tabla periódica. 10 preguntas en tres niveles.', en: 'Atomic structure practice with answers: protons, neutrons and electrons from Z and A, ions, isotopes, electron configuration and position in the periodic table. 10 questions on three levels.', ca: 'Exercicis resolts d’estructura atòmica: protons, neutrons i electrons a partir de Z i A, ions, isòtops, configuració electrònica i posició a la taula periòdica. 10 preguntes en tres nivells.' }}
      metaPath="/examen/construye-atomo-test"
      subjectSchema="Química"
      backGamePath="/juegos/construye-atomo"
      playLabel={{ es: 'Modo arcade (150s)', en: 'Arcade mode (150s)', ca: 'Mode arcade (150s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
