import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PreguntaCuentas from '../components/cuentasClaras/PreguntaCuentas'
import { genRound, esCorrecta, schemaQuestion } from '../lib/cuentasClaras'

// Examen con la mecánica de Cuentas Claras: las mismas rondas, sin reloj.
const LEVELS = [
  { key: 'eso', emoji: '💚', difficulty: 'facil',
    label: { es: 'Básico', en: 'Basic', ca: 'Bàsic' },
    hint: { es: 'Presupuesto, 50/30/20 e interés simple', en: 'Budget, 50/30/20 and simple interest', ca: 'Pressupost, 50/30/20 i interès simple' } },
  { key: 'bachillerato', emoji: '💛', difficulty: 'medio',
    label: { es: 'Intermedio', en: 'Intermediate', ca: 'Intermedi' },
    hint: { es: 'Interés compuesto, inflación y planes de ahorro', en: 'Compound interest, inflation and savings plans', ca: 'Interès compost, inflació i plans d’estalvi' } },
  { key: 'avanzado', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Avanzado', en: 'Advanced', ca: 'Avançat' },
    hint: { es: 'Muchos años y deuda de tarjeta', en: 'Many years and credit card debt', ca: 'Molts anys i deute de targeta' } },
]

// Estado propio (la opción elegida): ver la nota de hooks en
// CircuitoCerradoExamen.jsx.
function Pregunta({ round, phase, onAnswer }) {
  const [elegida, setElegida] = useState(null)
  return <PreguntaCuentas ronda={round} revelado={phase === 'result'} elegida={elegida} onResponder={r => { setElegida(r); onAnswer(r) }} />
}

export default function CuentasClarasExamen() {
  return (
    <MechanicExam
      gameId="cuentas-claras-test"
      emoji="🐷"
      badge={{ es: 'Examen · Finanzas personales', en: 'Exam · Personal finance', ca: 'Examen · Finances personals' }}
      title={{ es: 'Examen de finanzas personales con cuentas', en: 'Personal Finance Exam with Sums', ca: 'Examen de finances personals amb comptes' }}
      sub={{ es: 'Presupuesto, interés, inflación y deuda', en: 'Budgeting, interest, inflation and debt', ca: 'Pressupost, interès, inflació i deute' }}
      metaTitle={{ es: 'Examen de finanzas personales: interés, inflación y presupuesto', en: 'Personal finance exam: interest, inflation and budgeting', ca: 'Examen de finances personals: interès, inflació i pressupost' }}
      metaDesc={{ es: 'Examen de finanzas personales con cuentas reales: regla 50/30/20, necesidades y deseos, interés simple y compuesto, inflación, planes de ahorro y deuda de tarjeta. 10 preguntas, tres niveles.', en: 'Personal finance exam with real sums: the 50/30/20 rule, needs and wants, simple and compound interest, inflation, savings plans and credit card debt. 10 questions, three levels.', ca: 'Examen de finances personals amb comptes reals: regla 50/30/20, necessitats i desitjos, interès simple i compost, inflació, plans d’estalvi i deute de targeta. 10 preguntes, tres nivells.' }}
      metaPath="/examen/cuentas-claras-test"
      subjectSchema="Economía"
      backGamePath="/juegos/cuentas-claras"
      playLabel={{ es: 'Modo arcade (120s)', en: 'Arcade mode (120s)', ca: 'Mode arcade (120s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={esCorrecta}
      schemaQuestion={schemaQuestion}
      renderQuestion={({ round, phase, onAnswer, qIndex }) => <Pregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} />}
    />
  )
}
