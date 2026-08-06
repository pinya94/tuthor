import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PunnettBoard from '../components/PunnettBoard'
import { genRound } from '../lib/genetica'

// Examen con la mecánica del juego: razonas el cruce y después ves el cuadro
// de Punnett resuelto. 10 preguntas, sin tiempo, con la explicación completa
// tras cada respuesta.
const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Iniciación', en: 'Beginner', ca: 'Iniciació' },
    hint: { es: 'Predecir la descendencia', en: 'Predict the offspring', ca: 'Predir la descendència' } },
  { key: 'medio', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: '+ deducir el genotipo de los padres', en: '+ deduce the parents’ genotype', ca: '+ deduir el genotip dels pares' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' },
    hint: { es: '+ dominancia incompleta (1:2:1)', en: '+ incomplete dominance (1:2:1)', ca: '+ dominància incompleta (1:2:1)' } },
]

function Question({ round, phase, onAnswer, l }) {
  const [elegida, setElegida] = useState(null)
  const reveal = phase === 'result'

  return (
    <>
      <PunnettBoard round={round} reveal={reveal} l={l} />
      <p className="text-white/80 text-sm sm:text-base my-3 text-center">
        {round.pregunta[l] ?? round.pregunta.es}
      </p>
      <div className={`grid gap-2 ${round.tipo === 'deduce' ? 'grid-cols-2' : 'grid-cols-5'}`}>
        {round.opciones.map(o => {
          const esCorrecta = o.id === round.correcta
          const esElegida = o.id === elegida
          let cls = 'bg-white/5 border-white/15 text-white/85 hover:bg-white/10 hover:border-white/30'
          if (reveal) {
            if (esCorrecta) cls = 'bg-green-500/20 border-green-500 text-green-200'
            else if (esElegida) cls = 'bg-red-500/20 border-red-500 text-red-300'
            else cls = 'bg-white/5 border-white/10 text-white/30'
          }
          return (
            <button key={o.id} disabled={reveal}
              onClick={() => { setElegida(o.id); onAnswer(o.id) }}
              className={`py-3 rounded-xl border font-black transition-all ${cls}`}>
              {o.label}
            </button>
          )
        })}
      </div>
      {reveal && (
        <div className="mt-3 rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">
          <p className="text-white/70 text-sm">💡 {round.explicacion[l] ?? round.explicacion.es}</p>
        </div>
      )}
    </>
  )
}

export default function GeneticaExamenJuego() {
  return (
    <MechanicExam
      gameId="genetica-test"
      emoji="🧬"
      badge={{ es: 'Examen · Herencia', en: 'Exam · Inheritance', ca: 'Examen · Herència' }}
      title={{ es: '🧬 Examen de Genética', en: '🧬 Genetics Exam', ca: '🧬 Examen de Genètica' }}
      sub={{ es: 'Predice la descendencia con el cuadro de Punnett', en: 'Predict the offspring with the Punnett square', ca: 'Prediu la descendència amb el quadre de Punnett' }}
      metaTitle={{ es: 'Examen de Genética — Cuadro de Punnett y herencia mendeliana', en: 'Genetics Exam — Punnett square and Mendelian inheritance', ca: 'Examen de Genètica — Quadre de Punnett i herència mendeliana' }}
      metaDesc={{ es: 'Examen de genética con la mecánica del juego: predice la descendencia de un cruce, deduce el genotipo de los padres y resuelve casos de dominancia incompleta. 10 preguntas, sin tiempo.', en: 'Genetics exam using the game mechanic: predict the offspring of a cross, deduce the parents’ genotype and solve incomplete dominance cases. 10 questions, no timer.', ca: 'Examen de genètica amb la mecànica del joc: prediu la descendència d’un creuament i dedueix el genotip dels pares. 10 preguntes, sense temps.' }}
      metaPath="/examen/genetica-test"
      subjectSchema="Biología"
      backGamePath="/juegos/genetica"
      playLabel={{ es: 'Modo arcade (90s)', en: 'Arcade mode (90s)', ca: 'Mode arcade (90s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={(round, ans) => ans === round.correcta}
      renderQuestion={({ round, phase, onAnswer, l, qIndex }) => (
        <Question key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
      )}
    />
  )
}
