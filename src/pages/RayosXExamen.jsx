import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import SiluetaCuerpo from '../components/SiluetaCuerpo'
import { genRound, isCorrectGuess } from '../lib/rayosX'

// Examen con la mecánica del juego Rayos X: tocas la silueta donde crees que
// está el órgano pedido. 10 preguntas, sin tiempo, acierto/fallo simple
// (¿el órgano más cercano al clic es el correcto, sí o no?). Sin niveles:
// los órganos están en un sitio fijo, igual que en Órbita — ver lib/rayosX.js.
const LEVELS = [
  { key: 'unico', difficulty: 'unico',
    label: { es: 'Cuerpo Humano', en: 'Human Body', ca: 'Cos Humà' },
    hint: { es: '¿Dónde está cada órgano?', en: 'Where is each organ?', ca: 'On és cada òrgan?' } },
]

const T = {
  objetivo: { es: 'Toca dónde crees que está:', en: 'Tap where you think it is:', ca: 'Toca on creus que és:' },
  confirmar: { es: 'Confirmar', en: 'Confirm', ca: 'Confirma' },
  correcto: { es: '✓ Correcto', en: '✓ Correct', ca: '✓ Correcte' },
  incorrecto: { es: '✗ Incorrecto', en: '✗ Incorrect', ca: '✗ Incorrecte' },
}

function Question({ round, phase, onAnswer, l }) {
  const [guess, setGuess] = useState(null)
  const reveal = phase === 'result'
  const ok = reveal && guess && isCorrectGuess(round, guess)
  const { organo } = round

  return (
    <>
      <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-1">{T.objetivo[l] ?? T.objetivo.es}</p>
      <p className="text-center text-lg font-black text-white mb-3">
        {organo.nombre[l] ?? organo.nombre.es}
      </p>

      <SiluetaCuerpo guess={guess} onPick={reveal ? null : setGuess} revelado={reveal}
        resultado={reveal ? (ok ? 'perfecto' : 'fallo') : null} compact={reveal} />

      {reveal ? (
        <div className={`mt-3 rounded-xl px-3 py-2 text-center ${ok ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
          <p className={`font-black ${ok ? 'text-green-400' : 'text-red-400'}`}>
            {ok ? T.correcto[l] ?? T.correcto.es : T.incorrecto[l] ?? T.incorrecto.es}
          </p>
          <p className="text-white/60 text-xs mt-0.5">{organo.funcion[l] ?? organo.funcion.es} {organo.dato[l] ?? organo.dato.es}</p>
        </div>
      ) : (
        <button onClick={() => onAnswer(guess)} disabled={!guess}
          className="mt-3 w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition disabled:opacity-30 disabled:cursor-not-allowed">
          {T.confirmar[l] ?? T.confirmar.es}
        </button>
      )}
    </>
  )
}

export default function RayosXExamen() {
  return (
    <MechanicExam
      gameId="rayos-x-test"
      emoji="🧠"
      badge={{ es: 'Examen · Cuerpo Humano', en: 'Exam · Human Body', ca: 'Examen · Cos Humà' }}
      title={{ es: '🧠 Examen Rayos X', en: '🧠 X-Ray Exam', ca: '🧠 Examen Raigs X' }}
      sub={{ es: 'Toca la silueta donde crees que está cada órgano', en: 'Tap the silhouette where you think each organ is', ca: 'Toca la silueta on creus que és cada òrgan' }}
      metaTitle={{ es: 'Examen de Rayos X — Cuerpo Humano', en: 'X-Ray Exam — Human Body', ca: 'Examen de Raigs X — Cos Humà' }}
      metaDesc={{ es: 'Examen del cuerpo humano con la mecánica del juego Rayos X: toca la silueta donde crees que está cada órgano. 10 preguntas, sin tiempo, con su función y un dato tras cada respuesta.', en: 'Human body exam using the X-Ray game mechanic: tap the silhouette where you think each organ is. 10 questions, no timer, with its function and a fact after each answer.', ca: 'Examen del cos humà amb la mecànica del joc Raigs X: toca la silueta on creus que és cada òrgan. 10 preguntes, sense temps, amb la seva funció i una dada després de cada resposta.' }}
      metaPath="/examen/rayos-x-test"
      subjectSchema="Biología"
      backGamePath="/juegos/rayos-x"
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
