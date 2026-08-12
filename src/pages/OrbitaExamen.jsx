import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import BarraOrbita from '../components/BarraOrbita'
import { genRound, isCorrectGuess } from '../lib/orbita'

// Examen con la mecánica del juego Órbita: arrastras la sonda a lo largo de
// la barra hasta la distancia al Sol donde crees que está el planeta pedido.
// 10 preguntas, sin tiempo. A diferencia del juego (puntos por precisión),
// aquí es acierto/fallo simple con un margen que se endurece por nivel (ver
// MARGEN_NIVEL en lib/orbita.js).
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Iniciación', en: 'Beginner', ca: 'Iniciació' },
    hint: { es: 'Basta con acertar la zona del planeta', en: 'Just land in the planet\'s zone', ca: 'Prou amb encertar la zona del planeta' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Hay que acercarse bastante al centro', en: 'You need to get fairly close to the centre', ca: 'Cal apropar-se força al centre' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' },
    hint: { es: 'Solo vale una órbita casi perfecta', en: 'Only an almost-perfect orbit counts', ca: 'Només val una òrbita gairebé perfecta' } },
]

const SLIDER_MAX = 1000

const T = {
  objetivo: { es: 'Envía la sonda a:', en: 'Send the probe to:', ca: 'Envia la sonda a:' },
  confirmar: { es: '🚀 ¡Lanzar aquí!', en: '🚀 Launch here!', ca: '🚀 Llança aquí!' },
  correcto: { es: '✓ Correcto', en: '✓ Correct', ca: '✓ Correcte' },
  incorrecto: { es: '✗ Incorrecto', en: '✗ Incorrect', ca: '✗ Incorrecte' },
  cerca: { es: 'Sol', en: 'Sun', ca: 'Sol' },
  lejos: { es: 'Muy lejos', en: 'Very far', ca: 'Molt lluny' },
}

function Question({ round, phase, onAnswer, l }) {
  const [sliderVal, setSliderVal] = useState(Math.round(SLIDER_MAX / 2))
  const pos = sliderVal / (SLIDER_MAX / 100)
  const reveal = phase === 'result'
  const ok = reveal && isCorrectGuess(round, pos)
  const { planeta } = round

  return (
    <>
      <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-1">{T.objetivo[l] ?? T.objetivo.es}</p>
      <p className="text-center text-lg font-black text-white mb-3">
        {planeta.emoji} {planeta.nombre[l] ?? planeta.nombre.es}
      </p>

      <BarraOrbita pos={pos} objetivoIdx={reveal ? round.idx : null} resultado={reveal ? (ok ? 'perfecto' : 'fallo') : null} />

      <input type="range" min={0} max={SLIDER_MAX} value={sliderVal} disabled={reveal}
        onChange={e => setSliderVal(Number(e.target.value))} className="w-full mt-3 accent-[#EDAE49]" />
      <div className="flex justify-between text-[10px] text-white/30 uppercase tracking-widest px-0.5 mb-2">
        <span>{T.cerca[l] ?? T.cerca.es}</span>
        <span>{T.lejos[l] ?? T.lejos.es}</span>
      </div>

      {reveal ? (
        <div className={`mt-1 rounded-xl px-3 py-2 text-center ${ok ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
          <p className={`font-black ${ok ? 'text-green-400' : 'text-red-400'}`}>
            {ok ? T.correcto[l] ?? T.correcto.es : T.incorrecto[l] ?? T.incorrecto.es}
          </p>
          <p className="text-white/60 text-xs mt-0.5">{planeta.dato[l] ?? planeta.dato.es}</p>
        </div>
      ) : (
        <button onClick={() => onAnswer(pos)}
          className="mt-1 w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">
          {T.confirmar[l] ?? T.confirmar.es}
        </button>
      )}
    </>
  )
}

export default function OrbitaExamen() {
  return (
    <MechanicExam
      gameId="orbita-test"
      emoji="🛰️"
      badge={{ es: 'Examen · Sistema Solar', en: 'Exam · Solar System', ca: 'Examen · Sistema Solar' }}
      title={{ es: '🛰️ Examen Órbita', en: '🛰️ Orbit Exam', ca: '🛰️ Examen Òrbita' }}
      sub={{ es: 'Lanza la sonda a la distancia correcta de cada planeta', en: 'Launch the probe to the right distance for each planet', ca: 'Llança la sonda a la distància correcta de cada planeta' }}
      metaTitle={{ es: 'Examen de Órbita — Sistema Solar', en: 'Orbit Exam — Solar System', ca: 'Examen d\'Òrbita — Sistema Solar' }}
      metaDesc={{ es: 'Examen del Sistema Solar con la mecánica del juego Órbita: lanza la sonda a la distancia al Sol de cada planeta. 10 preguntas, sin tiempo, con un dato tras cada respuesta.', en: 'Solar System exam using the Orbit game mechanic: launch the probe to each planet\'s distance from the Sun. 10 questions, no timer, with a fact after each answer.', ca: 'Examen del Sistema Solar amb la mecànica del joc Òrbita: llança la sonda a la distància al Sol de cada planeta. 10 preguntes, sense temps, amb una dada després de cada resposta.' }}
      metaPath="/examen/orbita-test"
      subjectSchema="Geología"
      backGamePath="/juegos/orbita"
      playLabel={{ es: 'Modo arcade', en: 'Arcade mode', ca: 'Mode arcade' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={(round, ans) => isCorrectGuess(round, ans)}
      renderQuestion={({ round, phase, onAnswer, l, qIndex }) => (
        <Question key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
      )}
    />
  )
}
