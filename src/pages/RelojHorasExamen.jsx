import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import RelojAnalogico from '../components/RelojAnalogico'
import { nuevaHora, formatoDigital, enPalabras, esCorrecta } from '../lib/reloj'

// Examen con la mecánica del juego: se da una hora y el alumno pone las
// manecillas, sin reloj de partida y con nota final. Niveles: en punto/media
// (Primaria) → cuartos → cualquier minuto de 5 en 5.
const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil',
    label: { es: 'En punto y media', en: "O'clock and half past", ca: 'En punt i mitja' },
    hint: { es: 'Horas :00 y :30', en: 'Times :00 and :30', ca: 'Hores :00 i :30' } },
  { key: 'medio', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Los cuartos', en: 'Quarters', ca: 'Els quarts' },
    hint: { es: 'y cuarto, y media, menos cuarto', en: 'quarter past, half past, quarter to', ca: 'i quart, i mitja, menys quart' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Cualquier minuto', en: 'Any minute', ca: 'Qualsevol minut' },
    hint: { es: 'Minutos de 5 en 5', en: 'Minutes in steps of 5', ca: 'Minuts de 5 en 5' } },
]

// Componente propio: la pregunta necesita su estado (qué hora ha puesto el
// alumno). key={qIndex} lo reinicia en cada ronda.
function RelojPregunta({ round, phase, onAnswer, l }) {
  const [puesta, setPuesta] = useState({ minuto: 0, horaAng: 0 })
  const revelado = phase === 'result'
  const won = revelado && esCorrecta(round, puesta)

  return (
    <>
      <div className="text-center mb-2">
        <p className="text-white/40 text-xs uppercase tracking-widest">
          {l === 'en' ? 'Set this time' : l === 'ca' ? 'Posa aquesta hora' : 'Pon esta hora'}
        </p>
        <p className="text-white font-black text-3xl tabular-nums leading-tight">{formatoDigital(round.hora, round.minuto)}</p>
        <p className="text-[#EDAE49] font-semibold text-sm">{enPalabras(round.hora, round.minuto, l)}</p>
      </div>
      <div className="w-full max-w-[300px] mx-auto mb-3">
        <RelojAnalogico value={puesta} onChange={setPuesta} interactive={!revelado}
          estado={revelado ? (won ? 'correcto' : 'incorrecto') : 'idle'} objetivo={round} lang={l} />
      </div>
      {revelado && (
        <p className={`text-center font-black mb-3 ${won ? 'text-green-400' : 'text-red-400'}`}>
          {won ? (l === 'en' ? '🎉 Correct!' : '🎉 ¡Correcto!') : `❌ ${l === 'en' ? 'It was' : l === 'ca' ? 'Era' : 'Era'} ${formatoDigital(round.hora, round.minuto)}`}
        </p>
      )}
      {!revelado && (
        <button onClick={() => onAnswer(puesta)}
          className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">
          {l === 'en' ? 'Confirm →' : 'Confirmar →'}
        </button>
      )}
    </>
  )
}

function renderQuestion({ round, phase, onAnswer, l, qIndex }) {
  return <RelojPregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
}

export default function RelojHorasExamen() {
  return (
    <MechanicExam
      gameId="reloj-horas-test"
      emoji="🕐"
      badge={{ es: 'Examen · Medida del tiempo', en: 'Exam · Telling the time', ca: 'Examen · Mesura del temps' }}
      title={{ es: '🕐 Examen: ¿Qué hora es?', en: '🕐 Exam: What time is it?', ca: '🕐 Examen: Quina hora és?' }}
      sub={{ es: 'Pon cada hora en el reloj', en: 'Set each time on the clock', ca: 'Posa cada hora al rellotge' }}
      metaTitle={{ es: 'Examen del reloj — leer y poner la hora', en: 'Clock exam — reading and setting the time', ca: 'Examen del rellotge — llegir i posar l\'hora' }}
      metaDesc={{ es: 'Examen de leer el reloj con la mecánica del juego: coloca las manecillas en la hora pedida (en punto, y media, y cuarto, menos cuarto). 10 preguntas con nota, sin tiempo.', en: 'Clock-reading exam using the game mechanic: set the hands to the time asked (o\'clock, half past, quarter past, quarter to). 10 graded questions, no timer.', ca: 'Examen de llegir el rellotge amb la mecànica del joc: col·loca les manetes a l\'hora demanada (en punt, i mitja, i quart, menys quart). 10 preguntes amb nota, sense temps.' }}
      metaPath="/examen/reloj-horas-test"
      subjectSchema="Matemáticas"
      backGamePath="/juegos/reloj-horas"
      playLabel={{ es: 'Modo arcade (40s)', en: 'Arcade mode (40s)', ca: 'Mode arcade (40s)' }}
      levels={LEVELS}
      genRound={nuevaHora}
      isCorrect={esCorrecta}
      renderQuestion={renderQuestion}
    />
  )
}
