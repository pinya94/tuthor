import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import BalanzaAlgebraicaBoard from '../components/BalanzaAlgebraica'
import { genRound, applyOp, isSolved } from '../lib/algebra'

// Examen con la mecánica del juego: despejas la x haciendo lo mismo a los dos
// lados. 10 preguntas, sin tiempo. Resolverla cuenta como acierto; "me rindo"
// revela la solución y cuenta como fallo. Niveles: una x → x a los dos lados →
// números grandes y negativos.
const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Iniciación', en: 'Beginner', ca: 'Iniciació' },
    hint: { es: 'Una x: ax + b = c', en: 'One x: ax + b = c', ca: 'Una x: ax + b = c' } },
  { key: 'medio', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'x a los dos lados: ax + b = cx + d', en: 'x on both sides: ax + b = cx + d', ca: 'x als dos costats: ax + b = cx + d' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' },
    hint: { es: 'Números grandes y negativos', en: 'Big and negative numbers', ca: 'Números grans i negatius' } },
]

function Question({ round, phase, onAnswer, l }) {
  const [state, setState] = useState({ L: { ...round.L }, R: { ...round.R } })
  const [history, setHistory] = useState([])
  const reveal = phase === 'result'

  function applyStep(ns, label) {
    setState(ns)
    setHistory(h => [...h, label])
    if (isSolved(ns)) onAnswer('ok')
  }
  function onOp(op) {
    if (reveal) return
    const { state: ns, label } = applyOp(state, op)
    applyStep(ns, label)
  }

  const giveUp = { es: 'Me rindo', en: 'Give up', ca: 'Em rendeixo' }[l]

  return (
    <>
      <BalanzaAlgebraicaBoard state={state} onOp={onOp}
        reveal={reveal} solution={round.solution} history={history} l={l} />
      {!reveal && (
        <button onClick={() => onAnswer('fail')}
          className="mt-3 w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 font-semibold hover:bg-white/10 transition text-sm">
          {giveUp}
        </button>
      )}
    </>
  )
}

export default function BalanzaAlgebraicaExamen() {
  return (
    <MechanicExam
      gameId="balanza-algebraica-test"
      emoji="⚖️"
      badge={{ es: 'Examen · Ecuaciones', en: 'Exam · Equations', ca: 'Examen · Equacions' }}
      title={{ es: '⚖️ Examen Balanza Algebraica', en: '⚖️ Algebra Balance Exam', ca: '⚖️ Examen Balança Algebraica' }}
      sub={{ es: 'Despeja la x haciendo lo mismo a los dos lados', en: 'Isolate x by doing the same to both sides', ca: 'Aïlla la x fent el mateix als dos costats' }}
      metaTitle={{ es: 'Examen de Ecuaciones de Primer Grado — Método de la Balanza', en: 'Linear Equations Exam — Balance Method', ca: 'Examen d’Equacions de Primer Grau — Mètode de la Balança' }}
      metaDesc={{ es: 'Examen de ecuaciones con la mecánica del juego: despeja la x haciendo la misma operación a los dos lados hasta dejarla sola. 10 preguntas, sin tiempo.', en: 'Equations exam using the game mechanic: isolate x by doing the same operation to both sides until it stands alone. 10 questions, no timer.', ca: 'Examen d’equacions amb la mecànica del joc: aïlla la x fent la mateixa operació als dos costats fins a deixar-la sola. 10 preguntes, sense temps.' }}
      metaPath="/examen/balanza-algebraica-test"
      subjectSchema="Matemáticas"
      backGamePath="/juegos/balanza-algebraica"
      playLabel={{ es: 'Modo arcade (75s)', en: 'Arcade mode (75s)', ca: 'Mode arcade (75s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={(round, ans) => ans === 'ok'}
      // Texto de la ronda para el JSON-LD (ver MechanicExam). Una ronda es
      // {L,R} con m=coeficiente de x y k=término independiente, más la
      // solución. Se reconstruye la ecuación tal cual se lee: "3x - 5 = 7".
      schemaQuestion={(round, l) => {
        const s = round?.start
        if (!s || typeof round.solution !== 'number') return null
        const lado = ({ m, k }) => {
          const x = m === 0 ? '' : m === 1 ? 'x' : m === -1 ? '-x' : `${m}x`
          if (!x) return String(k)
          if (k === 0) return x
          return `${x} ${k > 0 ? '+' : '−'} ${Math.abs(k)}`
        }
        const ecuacion = `${lado(s.L)} = ${lado(s.R)}`
        return {
          question: l === 'en'
            ? `Solve for x: ${ecuacion}`
            : l === 'ca'
            ? `Resol l'equació: ${ecuacion}`
            : `Resuelve la ecuación: ${ecuacion}`,
          correctAnswer: `x = ${round.solution}`,
        }
      }}
      renderQuestion={({ round, phase, onAnswer, l, qIndex }) => (
        <Question key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
      )}
    />
  )
}
