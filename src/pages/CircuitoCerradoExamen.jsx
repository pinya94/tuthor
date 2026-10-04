import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import CircuitoDiagrama, { siguienteEstado, Leyenda } from '../components/CircuitoDiagrama'
import { genRound, isCorrect, explicacion, ESTADO_LABELS } from '../lib/circuito'

const est = (estado, l) => ESTADO_LABELS[estado]?.[l] ?? ESTADO_LABELS[estado]?.es

// Examen con la mecánica del juego: mismo circuito, misma pregunta ("¿qué
// bombillas encienden?"), sin reloj de ronda. Niveles realistas para esta
// mecánica: 1 bombilla+interruptor (Primaria) → serie/paralelo con 2
// bombillas (ESO) → tronco+ramas con 2 interruptores (Bachillerato) — mismo
// mapeo nivel→dificultad que Fuerza Neta.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Una bombilla e interruptores en serie o en paralelo', en: 'One bulb and switches in series or parallel', ca: 'Una bombeta i interruptors en sèrie o en paral·lel' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Dos bombillas: serie, paralelo o un interruptor por rama', en: 'Two bulbs: series, parallel or a switch per branch', ca: 'Dues bombetes: sèrie, paral·lel o un interruptor per branca' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' },
    hint: { es: 'Recorridos con atajos que cortocircuitan bombillas', en: 'Paths with shortcuts that short-circuit bulbs', ca: 'Recorreguts amb dreceres que curtcircuiten bombetes' } },
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
        {l === 'en' ? 'Which bulbs light up?' : l === 'ca' ? 'Quines bombetes s\'encenen?' : '¿Qué bombillas se encienden?'}
      </p>
      <div className="mb-2">
        <Leyenda labels={{ apagada: est('apagada', l), encendida: est('encendida', l), fundida: round.fundidas?.length ? ({ es: 'fundida', en: 'blown', ca: 'fosa' }[l] ?? 'fundida') : null }} />
      </div>
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#141b2e] mb-3">
        <CircuitoDiagrama round={round} prediccion={prediccion} onToggle={toggle} revelado={revelado} />
      </div>
      {revelado && (
        <div className="rounded-xl bg-white/5 border border-white/10 p-3 mb-3">
          <p className={`font-black text-center ${acierto ? 'text-green-400' : 'text-red-400'}`}>
            {acierto ? ({ es: '🎉 ¡Correcto!', en: '🎉 Correct!', ca: '🎉 Correcte!' }[l] ?? '🎉 ¡Correcto!') : ({ es: '❌ No del todo', en: '❌ Not quite', ca: '❌ No del tot' }[l] ?? '❌ No del todo')}
          </p>
          <ul className="text-white/70 text-xs mt-1.5 leading-snug space-y-0.5">
            {explicacion(round, l).map(linea => <li key={linea}>💡 {linea}</li>)}
          </ul>
        </div>
      )}
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
      metaDesc={{ es: 'Examen de electricidad con la mecánica del juego: predice qué bombillas se encienden según los interruptores, en serie y en paralelo, con circuitos abiertos y cortocircuitos. 10 preguntas, sin tiempo.', en: 'Electricity exam using the game mechanic: predict which bulbs light up given the switches, in series and parallel, with open circuits and short-circuits. 10 questions, no timer.', ca: 'Examen d\'electricitat amb la mecànica del joc: prediu quines bombetes s\'encenen segons els interruptors, en sèrie i en paral·lel, amb circuits oberts i curtcircuits. 10 preguntes, sense temps.' }}
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
