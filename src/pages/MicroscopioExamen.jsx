import { useState, useRef, useCallback } from 'react'
import MechanicExam from '../components/MechanicExam'
import CelulaSVG from '../components/CelulaSVG'
import { genRound, esCorrecta, enunciado } from '../lib/microscopio'

// Examen con la mecánica de Bajo el Microscopio: aparece una célula —animal o
// vegetal, sorteada en cada pregunta— y hay que tocar el orgánulo que se pide.
// 10 preguntas, sin tiempo. Es el examen que le faltaba al tema `celula`, que
// hasta ahora solo tenía el de teoría tipo test.
//
// Se puede hacer sobre el dibujo y sin calibrar nada porque cada orgánulo ES
// una forma del SVG (ver CelulaSVG.jsx): el acierto lo decide el navegador.
// Esa es justo la diferencia con el examen de Rayos X, que va sobre una
// fotografía y necesita radios de tolerancia.
//
// Cuántos orgánulos recuerda para no repetirlos dentro del mismo examen (hay
// 13 en total y 10-11 por célula, así que sin memoria se repiten casi seguro).
const MEMORIA = 8

// Los niveles son las dos formas de preguntar, que no son adorno: por NOMBRE
// se reconoce el dibujo; por FUNCIÓN hay que saber para qué sirve cada parte,
// que es como se pregunta de verdad en clase. De ahí el orden.
const LEVELS = [
  { key: 'nombre', difficulty: 'nombre',
    label: { es: 'Por su nombre', en: 'By name', ca: 'Pel seu nom' },
    hint: { es: 'Te dicen cómo se llama', en: 'You are given its name', ca: 'Et diuen com es diu' } },
  { key: 'funcion', difficulty: 'funcion',
    label: { es: 'Por su función', en: 'By function', ca: 'Per la seva funció' },
    hint: { es: 'Te dicen lo que hace', en: 'You are told what it does', ca: 'Et diuen què fa' } },
  { key: 'mixto', difficulty: 'mixto',
    label: { es: 'Mezclado', en: 'Mixed', ca: 'Barrejat' },
    hint: { es: 'Unas veces el nombre, otras la función', en: 'Sometimes the name, sometimes the function', ca: 'De vegades el nom, de vegades la funció' } },
]

const T = {
  porNombre: { es: 'Toca:', en: 'Tap:', ca: 'Toca:' },
  porFuncion: { es: 'Toca el que…', en: 'Tap the one that…', ca: 'Toca el que…' },
  confirmar: { es: 'Confirmar', en: 'Confirm', ca: 'Confirma' },
  correcto: { es: '✓ Correcto', en: '✓ Correct', ca: '✓ Correcte' },
  incorrecto: { es: '✗ Incorrecto', en: '✗ Incorrect', ca: '✗ Incorrecte' },
  era: { es: 'Era', en: 'It was', ca: 'Era' },
}
const t = (k, l) => T[k][l] ?? T[k].es

function Question({ round, phase, onAnswer, l }) {
  const [guess, setGuess] = useState(null)
  const reveal = phase === 'result'
  const ok = reveal && esCorrecta(round, guess)
  const { organulo } = round

  return (
    <>
      <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-1">
        {round.preguntaPor === 'nombre' ? t('porNombre', l) : t('porFuncion', l)}
      </p>
      <p className="text-center text-lg font-black text-white mb-3">{enunciado(round, l)}</p>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
        <CelulaSVG tipo={round.tipo} onPick={reveal ? null : setGuess}
          elegido={guess} correcto={reveal ? organulo.id : null} revelado={reveal} />
      </div>

      {reveal ? (
        <div className={`mt-3 rounded-xl px-3 py-2 text-center ${ok ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
          <p className={`font-black ${ok ? 'text-green-400' : 'text-red-400'}`}>
            {ok ? t('correcto', l) : `${t('incorrecto', l)} · ${t('era', l)}: ${organulo.nombre[l] ?? organulo.nombre.es}`}
          </p>
          {/* El detalle sale siempre, se acierte o no: es lo que de verdad enseña. */}
          <p className="text-white/60 text-xs mt-0.5">{organulo.detalle[l] ?? organulo.detalle.es}</p>
        </div>
      ) : (
        <button onClick={() => onAnswer(guess)} disabled={!guess}
          className="mt-3 w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition disabled:opacity-30 disabled:cursor-not-allowed">
          {t('confirmar', l)}
        </button>
      )}
    </>
  )
}

export default function MicroscopioExamen() {
  // MechanicExam genera las 10 rondas de golpe llamando a genRound() suelto,
  // y con 13 orgánulos (10-11 por célula) eso repite orgánulo casi seguro.
  // Este envoltorio le pasa los últimos vistos para que no salga dos veces la
  // misma pregunta en un mismo examen. La memoria vive por montaje, no en el
  // módulo: si no, se arrastraría de un examen al siguiente.
  const vistosRef = useRef([])
  const genRoundSinRepetir = useCallback(modo => {
    const r = genRound(modo, { evitar: vistosRef.current })
    vistosRef.current = [r.organulo.id, ...vistosRef.current].slice(0, MEMORIA)
    return r
  }, [])

  return (
    <MechanicExam
      gameId="microscopio-test"
      emoji="🔬"
      badge={{ es: 'Examen · La célula', en: 'Exam · The cell', ca: 'Examen · La cèl·lula' }}
      title={{ es: '🔬 Examen de la célula', en: '🔬 Cell exam', ca: '🔬 Examen de la cèl·lula' }}
      sub={{ es: 'Toca el orgánulo que se te pide sobre la célula', en: 'Tap the organelle you are asked for on the cell', ca: 'Toca l\'orgànul que se\'t demana sobre la cèl·lula' }}
      metaTitle={{ es: 'Examen de la célula — orgánulos sobre el dibujo', en: 'Cell exam — organelles on the diagram', ca: 'Examen de la cèl·lula — orgànuls sobre el dibuix' }}
      metaDesc={{
        es: 'Examen de la célula con la mecánica de Bajo el Microscopio: toca el orgánulo que se te pide sobre una célula animal o vegetal. 10 preguntas, sin tiempo, por el nombre o por su función, con explicación tras cada respuesta.',
        en: 'Cell exam using the Under the Microscope mechanic: tap the organelle you are asked for on an animal or plant cell. 10 questions, no timer, by name or by function, with an explanation after each answer.',
        ca: 'Examen de la cèl·lula amb la mecànica de Sota el Microscopi: toca l\'orgànul que se\'t demana sobre una cèl·lula animal o vegetal. 10 preguntes, sense temps, pel nom o per la seva funció.',
      }}
      metaPath="/examen/microscopio-test"
      subjectSchema="Biología"
      backGamePath="/juegos/microscopio"
      playLabel={{ es: 'Modo arcade', en: 'Arcade mode', ca: 'Mode arcade' }}
      levels={LEVELS}
      genRound={genRoundSinRepetir}
      isCorrect={(round, ans) => esCorrecta(round, ans)}
      renderQuestion={({ round, phase, onAnswer, l, qIndex }) => (
        <Question key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
      )}
    />
  )
}
