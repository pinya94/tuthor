import { useMemo } from 'react'
import MechanicExam from '../components/MechanicExam'
import { ESTADOS } from '../data/sustancias'
import { genRoundCambio, opcionesCambio } from '../lib/cambioEstado'

// Examen de los NOMBRES de los cambios de estado. Estaba dentro del juego y se
// sacó: mezclar dos mecánicas en la misma partida la volvía confusa, y este
// vocabulario (fusión, condensación, sublimación…) se evalúa mejor sin reloj.
//
// La pregunta parte de una escena de casa y no de la definición: reconocer que
// "se empañan los cristales" es una condensación es lo que de verdad se pide,
// y es más difícil que recitar "de gas a líquido".
const NIVEL_UNICO = [{
  key: 'todos', emoji: '💨',
  label: { es: 'Empezar', en: 'Start', ca: 'Començar' },
  hint: { es: 'Los seis cambios, a partir de escenas cotidianas', en: 'All six changes, from everyday scenes', ca: 'Els sis canvis, a partir d\'escenes quotidianes' },
}]

const T = {
  objetivo: { es: '¿Cómo se llama este cambio?', en: 'What is this change called?', ca: 'Com es diu aquest canvi?' },
  correcto: { es: '✓ Correcto', en: '✓ Correct', ca: '✓ Correcte' },
  incorrecto: { es: '✗ Incorrecto', en: '✗ Incorrect', ca: '✗ Incorrecte' },
}
const t = (k, l) => T[k][l] ?? T[k].es
const tr = (o, l) => o?.[l] ?? o?.es ?? ''

function Question({ round, phase, answer, onAnswer, l }) {
  const reveal = phase === 'result'
  const ok = reveal && answer === round.cambio.id
  // Se barajan una sola vez por pregunta: recalcularlas en cada render movería
  // los botones bajo el dedo del alumno.
  const opciones = useMemo(() => opcionesCambio(round), [round])

  const clase = id => {
    if (!reveal) return 'bg-white/10 border-white/15 text-white hover:bg-white/20 active:scale-95'
    if (id === round.cambio.id) return 'bg-green-500 border-green-400 text-black'
    if (id === answer) return 'bg-red-500 border-red-400 text-white'
    return 'bg-white/5 border-white/5 text-white/30'
  }

  return (
    <>
      <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-3">{t('objetivo', l)}</p>
      <p className="text-white text-xl font-bold text-center mb-5 min-h-[56px] px-2">
        {tr(round.cambio.ejemplo, l)}
      </p>

      <div className="grid grid-cols-2 gap-2">
        {opciones.map(c => (
          <button key={c.id} onClick={reveal ? undefined : () => onAnswer(c.id)} disabled={reveal}
            className={`py-3.5 px-2 rounded-2xl border font-bold text-sm transition-all ${clase(c.id)}`}>
            {tr(c.nombre, l)}
          </button>
        ))}
      </div>

      {reveal && (
        <div className={`mt-3 rounded-xl px-3 py-2.5 ${ok ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
          <p className={`font-black text-center ${ok ? 'text-green-400' : 'text-red-400'}`}>
            {ok ? t('correcto', l) : t('incorrecto', l)}
          </p>
          <p className="mt-1 text-white/70 text-sm text-center">
            💡 {tr(round.cambio.nombre, l)}: {tr(ESTADOS[round.cambio.de].label, l).toLowerCase()} → {tr(ESTADOS[round.cambio.a].label, l).toLowerCase()}
          </p>
        </div>
      )}
    </>
  )
}

export default function NombresCambioExamen() {
  return (
    <MechanicExam
      gameId="nombres-cambio-test"
      emoji="💨"
      badge={{ es: 'Examen · Cambios de estado', en: 'Exam · Changes of state', ca: 'Examen · Canvis d\'estat' }}
      title={{ es: '💨 Los nombres de los cambios', en: '💨 Naming the changes of state', ca: '💨 Els noms dels canvis' }}
      sub={{ es: 'Fusión, condensación, sublimación…', en: 'Melting, condensation, sublimation…', ca: 'Fusió, condensació, sublimació…' }}
      metaTitle={{ es: 'Examen de los cambios de estado — fusión, condensación, sublimación', en: 'Changes of state exam — melting, condensation, sublimation', ca: 'Examen dels canvis d\'estat — fusió, condensació, sublimació' }}
      metaDesc={{
        es: 'Examen de los seis cambios de estado a partir de escenas cotidianas: el hielo que se derrite, los cristales que se empañan, la escarcha que se forma. 10 preguntas, sin tiempo y con la explicación de qué pasa a qué.',
        en: 'Exam on the six changes of state from everyday scenes: ice melting, windows fogging up, frost forming. 10 questions, no timer, each explaining what turns into what.',
        ca: 'Examen dels sis canvis d\'estat a partir d\'escenes quotidianes: el gel que es fon, els vidres que s\'entelen, el gebre que es forma. 10 preguntes, sense temps.',
      }}
      metaPath="/examen/nombres-cambio-test"
      subjectSchema="Química"
      backGamePath="/juegos/cambio-estado"
      playLabel={{ es: 'Modo arcade', en: 'Arcade mode', ca: 'Mode arcade' }}
      levels={NIVEL_UNICO}
      genRound={() => genRoundCambio()}
      isCorrect={(round, answer) => answer === round.cambio.id}
      renderQuestion={({ round, phase, answer, onAnswer, l, qIndex }) => (
        <Question key={qIndex} round={round} phase={phase} answer={answer} onAnswer={onAnswer} l={l} />
      )}
    />
  )
}
