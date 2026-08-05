import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import EcuacionBalanza from '../components/EcuacionBalanza'
import { genRound, isCorrectCoefs, isBalanced } from '../lib/ecuaciones'

// Examen con la mecánica del juego: ajustas los coeficientes hasta equilibrar la
// ecuación. 10 preguntas, sin tiempo, con el marcador por elemento y la solución
// más simple al comprobar. Niveles: reacciones sencillas → combustiones →
// coeficientes grandes (glucosa, etano, amoníaco…).
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Iniciación', en: 'Beginner', ca: 'Iniciació' },
    hint: { es: 'Reacciones sencillas, coeficientes pequeños', en: 'Simple reactions, small coefficients', ca: 'Reaccions senzilles, coeficients petits' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Combustiones y descomposiciones', en: 'Combustions and decompositions', ca: 'Combustions i descomposicions' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' },
    hint: { es: 'Coeficientes grandes (glucosa, etano…)', en: 'Big coefficients (glucose, ethane…)', ca: 'Coeficients grans (glucosa, età…)' } },
]

function Question({ round, phase, onAnswer, l }) {
  const [coefs, setCoefs] = useState(round.initial)
  const reveal = phase === 'result'
  const won = reveal && isCorrectCoefs(round, coefs)

  function step(index, d) {
    if (reveal) return
    setCoefs(cs => cs.map((c, i) => i === index ? Math.max(1, Math.min(round.maxCoef, c + d)) : c))
  }

  const check = { es: 'Comprobar', en: 'Check', ca: 'Comprovar' }[l]
  const balanced = { es: '¡Equilibrada!', en: 'Balanced!', ca: 'Equilibrada!' }[l]
  const notYet = { es: 'Aún no cuadra', en: 'Not balanced yet', ca: 'Encara no quadra' }[l]
  const notMin = { es: 'Equilibrada, pero no es la forma más simple', en: 'Balanced, but not the simplest form', ca: 'Equilibrada, però no és la forma més simple' }[l]
  const wasAns = { es: 'Solución más simple:', en: 'Simplest solution:', ca: 'Solució més simple:' }[l]

  return (
    <>
      <EcuacionBalanza round={round} coefs={coefs} onStep={step} reveal={reveal} l={l} />
      {reveal ? (
        <div className={`mt-3 rounded-xl px-3 py-2 text-center ${won ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
          <p className={`font-black ${won ? 'text-green-400' : 'text-red-400'}`}>
            {won ? `⚖️ ${balanced}` : (isBalanced(round, coefs) ? notMin : notYet)}
          </p>
          {!won && <p className="text-white/60 text-xs font-mono mt-0.5">{wasAns} {round.answer.join(' · ')}</p>}
        </div>
      ) : (
        <button onClick={() => onAnswer(coefs)}
          className="mt-3 w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">
          {check}
        </button>
      )}
    </>
  )
}

export default function BalanzaEcuacionesExamen() {
  return (
    <MechanicExam
      gameId="balanza-ecuaciones-test"
      emoji="⚗️"
      badge={{ es: 'Examen · Reacciones', en: 'Exam · Reactions', ca: 'Examen · Reaccions' }}
      title={{ es: '⚗️ Examen Átomos en Equilibrio', en: '⚗️ Atoms in Balance Exam', ca: '⚗️ Examen Àtoms en Equilibri' }}
      sub={{ es: 'Ajusta los coeficientes hasta equilibrar cada reacción', en: 'Adjust the coefficients until each reaction is balanced', ca: 'Ajusta els coeficients fins a equilibrar cada reacció' }}
      metaTitle={{ es: 'Examen de Ajuste de Ecuaciones Químicas', en: 'Balancing Chemical Equations Exam', ca: 'Examen d’Ajust d’Equacions Químiques' }}
      metaDesc={{ es: 'Examen para ajustar ecuaciones químicas con la mecánica del juego: cambia los coeficientes hasta que cada elemento tenga los mismos átomos a los dos lados. 10 preguntas, sin tiempo.', en: 'Exam to balance chemical equations using the game mechanic: change the coefficients until every element has the same atoms on both sides. 10 questions, no timer.', ca: 'Examen per ajustar equacions químiques amb la mecànica del joc: canvia els coeficients fins que cada element tingui els mateixos àtoms als dos costats. 10 preguntes, sense temps.' }}
      metaPath="/examen/balanza-ecuaciones-test"
      subjectSchema="Química"
      backGamePath="/juegos/balanza-ecuaciones"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={(round, ans) => isCorrectCoefs(round, ans)}
      renderQuestion={({ round, phase, onAnswer, l, qIndex }) => (
        <Question key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
      )}
    />
  )
}
