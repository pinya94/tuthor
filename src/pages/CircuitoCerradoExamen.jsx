import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import CircuitoDiagrama, { siguienteEstado } from '../components/CircuitoDiagrama'
import { genRound, isCorrect } from '../lib/circuito'

// Examen con la mecánica del juego: mismo circuito, misma pregunta ("¿qué
// bombillas encienden?"), sin reloj de ronda. Niveles realistas para esta
// mecánica: 1 bombilla+interruptor (Primaria) → serie/paralelo con 2
// bombillas (ESO) → tronco+ramas con 2 interruptores (Bachillerato) — mismo
// mapeo nivel→dificultad que Fuerza Neta.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Una bombilla, un interruptor', en: 'One bulb, one switch', ca: 'Una bombeta, un interruptor' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Dos bombillas, en serie o en paralelo', en: 'Two bulbs, in series or parallel', ca: 'Dues bombetes, en sèrie o en paral·lel' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' },
    hint: { es: 'Tres bombillas y dos interruptores', en: 'Three bulbs and two switches', ca: 'Tres bombetes i dos interruptors' } },
]

// Componente propio (no una función plana como en FuerzaNetaExamen): aquí la
// pregunta necesita SU PROPIO estado —qué bombillas ha marcado el alumno
// antes de confirmar—, y MechanicExam invoca `renderQuestion` como función
// normal dentro de su propio render (no como JSX), así que un useState ahí
// dentro rompería las reglas de hooks. Envolviéndolo en un componente de
// verdad, con `key={qIndex}` para reiniciar la marca al cambiar de ronda,
// el estado vive donde debe.
function CircuitoPregunta({ round, phase, onAnswer, l }) {
  const [prediccion, setPrediccion] = useState(() => new Map())
  const revelado = phase === 'result'
  const acierto = revelado && isCorrect(round, prediccion)

  function toggle(id) {
    if (revelado) return
    setPrediccion(prev => {
      const next = new Map(prev)
      next.set(id, siguienteEstado(prev.get(id) ?? 'apagada'))
      return next
    })
  }

  return (
    <>
      <p className="text-white/60 text-sm text-center mb-2">
        {l === 'en' ? 'How will each bulb shine?' : l === 'ca' ? 'Com brillarà cada bombeta?' : '¿Cómo va a brillar cada bombilla?'}
      </p>
      <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] mb-3">
        <CircuitoDiagrama round={round} prediccion={prediccion} onToggle={toggle} revelado={revelado} />
        {revelado && (
          <div className="absolute inset-x-0 bottom-0 bg-black/70 backdrop-blur-sm p-2 text-center">
            <p className={`font-black ${acierto ? 'text-green-400' : 'text-red-400'}`}>
              {acierto ? '🎉 ¡Correcto!' : '❌ No del todo'}
            </p>
          </div>
        )}
      </div>
      {!revelado && (
        <button onClick={() => onAnswer(prediccion)}
          className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">
          {l === 'en' ? 'Confirm →' : l === 'ca' ? 'Confirmar →' : 'Confirmar →'}
        </button>
      )}
    </>
  )
}

function renderQuestion({ round, phase, onAnswer, l, qIndex }) {
  return <CircuitoPregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
}

export default function CircuitoCerradoExamen() {
  return (
    <MechanicExam
      gameId="circuito-cerrado-test"
      emoji="💡"
      badge={{ es: 'Examen · Electricidad', en: 'Exam · Electricity', ca: 'Examen · Electricitat' }}
      title={{ es: '💡 Examen Circuito Cerrado', en: '💡 Circuit Complete Exam', ca: '💡 Examen Circuit Complet' }}
      sub={{ es: 'Predice cómo brilla cada bombilla en cada circuito', en: 'Predict how each bulb shines in each circuit', ca: 'Prediu com brilla cada bombeta a cada circuit' }}
      metaTitle={{ es: 'Examen de Circuito Cerrado — Física', en: 'Circuit Complete Exam — Physics', ca: 'Examen de Circuit Complet — Física' }}
      metaDesc={{ es: 'Examen de electricidad con la mecánica del juego: predice si cada bombilla brilla apagada, tenue o a tope según interruptores, serie y paralelo. 10 preguntas, sin tiempo.', en: 'Electricity exam using the game mechanic: predict whether each bulb is off, dim or at full brightness given switches, series and parallel wiring. 10 questions, no timer.', ca: 'Examen d\'electricitat amb la mecànica del joc: prediu si cada bombeta brilla apagada, tènue o a tota potència segons interruptors, sèrie i paral·lel. 10 preguntes, sense temps.' }}
      metaPath="/examen/circuito-cerrado-test"
      subjectSchema="Física"
      backGamePath="/juegos/circuito-cerrado"
      playLabel={{ es: 'Modo arcade (40s)', en: 'Arcade mode (40s)', ca: 'Mode arcade (40s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={isCorrect}
      renderQuestion={renderQuestion}
    />
  )
}
