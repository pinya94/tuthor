import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import AjustaGrafica from '../components/AjustaGrafica'
import { genRound, isCorrectParams, fnText } from '../lib/funciones'

// Examen con la mecánica del juego: lees la gráfica objetivo y ajustas los
// parámetros hasta que tu curva encaja. 10 preguntas, sin tiempo, con la
// ecuación correcta al comprobar. Niveles: rectas → rectas y parábolas y=ax²+c
// → parábolas completas y=ax²+bx+c.
const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Iniciación', en: 'Beginner', ca: 'Iniciació' },
    hint: { es: 'Rectas: y = mx + b', en: 'Lines: y = mx + b', ca: 'Rectes: y = mx + b' } },
  { key: 'medio', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Rectas y parábolas y = ax² + c', en: 'Lines and parabolas y = ax² + c', ca: 'Rectes i paràboles y = ax² + c' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' },
    hint: { es: 'Parábolas completas y = ax² + bx + c', en: 'Full parabolas y = ax² + bx + c', ca: 'Paràboles completes y = ax² + bx + c' } },
]

function Question({ round, phase, onAnswer, l }) {
  const [params, setParams] = useState({ ...round.params0 })
  const reveal = phase === 'result'
  const won = reveal && isCorrectParams(round, params)

  function step(key, d) {
    if (reveal) return
    setParams(p => {
      const c = round.controls.find(c => c.key === key)
      return { ...p, [key]: Math.max(c.min, Math.min(c.max, (p[key] || 0) + d)) }
    })
  }

  const check = { es: 'Comprobar', en: 'Check', ca: 'Comprovar' }[l]
  const caught = { es: '¡Cazada!', en: 'Caught it!', ca: 'Caçada!' }[l]
  const notYet = { es: 'Aún no encaja', en: 'Not matching yet', ca: 'Encara no encaixa' }[l]
  const wasAns = { es: 'Era:', en: 'It was:', ca: 'Era:' }[l]

  return (
    <>
      <AjustaGrafica round={round} params={params} onStep={step} reveal={reveal} l={l} />
      {reveal ? (
        <div className={`mt-3 rounded-xl px-3 py-2 text-center ${won ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
          <p className={`font-black ${won ? 'text-green-400' : 'text-red-400'}`}>
            {won ? `📈 ${caught}` : notYet}
          </p>
          {!won && <p className="text-white/60 text-xs font-mono mt-0.5">{wasAns} {fnText(round.kind, round.target)}</p>}
        </div>
      ) : (
        <button onClick={() => onAnswer(params)}
          className="mt-3 w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">
          {check}
        </button>
      )}
    </>
  )
}

export default function FuncionesGraficaExamen() {
  return (
    <MechanicExam
      gameId="funciones-grafica-test"
      emoji="📈"
      badge={{ es: 'Examen · Funciones', en: 'Exam · Functions', ca: 'Examen · Funcions' }}
      title={{ es: '📈 Examen Caza la Función', en: '📈 Function Hunt Exam', ca: '📈 Examen Caça la Funció' }}
      sub={{ es: 'Lee la gráfica y ajusta los parámetros hasta que tu curva encaje', en: 'Read the graph and adjust the parameters until your curve fits', ca: 'Llegeix la gràfica i ajusta els paràmetres fins que la teva corba encaixi' }}
      metaTitle={{ es: 'Examen de Funciones y Gráficas — Rectas y Parábolas', en: 'Functions & Graphs Exam — Lines and Parabolas', ca: 'Examen de Funcions i Gràfiques — Rectes i Paràboles' }}
      metaDesc={{ es: 'Examen de funciones con la mecánica del juego: lee la gráfica y ajusta la pendiente, la ordenada o los coeficientes hasta encajar la curva. 10 preguntas, sin tiempo.', en: 'Functions exam using the game mechanic: read the graph and adjust the slope, intercept or coefficients to match the curve. 10 questions, no timer.', ca: 'Examen de funcions amb la mecànica del joc: llegeix la gràfica i ajusta el pendent, l’ordenada o els coeficients fins a encaixar la corba. 10 preguntes, sense temps.' }}
      metaPath="/examen/funciones-grafica-test"
      subjectSchema="Matemáticas"
      backGamePath="/juegos/funciones-grafica"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={(round, ans) => isCorrectParams(round, ans)}
      renderQuestion={({ round, phase, onAnswer, l, qIndex }) => (
        <Question key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
      )}
    />
  )
}
