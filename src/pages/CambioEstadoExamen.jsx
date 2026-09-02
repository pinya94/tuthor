import MechanicExam from '../components/MechanicExam'
import ParticulasSVG from '../components/ParticulasSVG'
import { ESTADOS } from '../data/sustancias'
import { ESTADO_IDS, genRound, esCorrecta } from '../lib/cambioEstado'

// Examen con la MECÁNICA del juego: misma pregunta, sin reloj y con nota.
// Comparte genRound con el arcade, así que las 30 sustancias, los niveles y la
// garantía de que ninguna temperatura cae justo en un punto de cambio valen
// para los dos. El nivel llega a genRound como la clave del nivel elegido.
const NIVELES = [
  { key: 'medio', emoji: '🌡️', difficulty: 'medio',
    label: { es: 'Con los datos', en: 'With the data', ca: 'Amb les dades' },
    hint: { es: 'Se ven los puntos de fusión y ebullición: hay que leerlos bien', en: 'Melting and boiling points are shown: you have to read them carefully', ca: 'Es veuen els punts de fusió i ebullició: cal llegir-los bé' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Sin los datos', en: 'Without the data', ca: 'Sense les dades' },
    hint: { es: 'Los puntos están tapados: hay que conocer la sustancia', en: 'The points are hidden: you have to know the substance', ca: 'Els punts estan tapats: cal conèixer la substància' } },
]

const T = {
  objetivo: { es: '¿En qué estado está?', en: 'What state is it in?', ca: 'En quin estat és?' },
  funde: { es: 'Se funde a', en: 'Melts at', ca: 'Es fon a' },
  hierve: { es: 'Hierve a', en: 'Boils at', ca: 'Bull a' },
  oculto: { es: 'Sin los datos: ¿conoces la sustancia?', en: 'No data: do you know the substance?', ca: 'Sense les dades: coneixes la substància?' },
  correcto: { es: '✓ Correcto', en: '✓ Correct', ca: '✓ Correcte' },
  incorrecto: { es: '✗ Incorrecto', en: '✗ Incorrect', ca: '✗ Incorrecte' },
}
const t = (k, l) => T[k][l] ?? T[k].es
const tr = (o, l) => o?.[l] ?? o?.es ?? ''

function Question({ round, phase, answer, onAnswer, l }) {
  const reveal = phase === 'result'
  const ok = reveal && esCorrecta(round, answer)

  const clase = id => {
    if (!reveal) return 'bg-white/10 border-white/15 text-white hover:bg-white/20 active:scale-95'
    if (id === round.respuesta) return 'bg-green-500 border-green-400 text-black'
    if (id === answer) return 'bg-red-500 border-red-400 text-white'
    return 'bg-white/5 border-white/5 text-white/30'
  }

  return (
    <>
      <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{t('objetivo', l)}</p>
      <p className="text-white text-2xl font-black text-center">{tr(round.sustancia.nombre, l)}</p>
      <p className="text-[#EDAE49] text-3xl font-black text-center mb-1">{round.temp} °C</p>
      <p className="text-white/40 text-xs text-center mb-4 px-2">
        {round.ocultar && !reveal
          ? <span className="text-white/30">🔒 {t('oculto', l)}</span>
          : <>{t('funde', l)} {round.sustancia.fusion} °C · {t('hierve', l)} {round.sustancia.ebullicion} °C</>}
      </p>

      {reveal && (
        <div className="mx-auto w-full max-w-[240px] mb-3">
          <ParticulasSVG estado={round.respuesta} />
        </div>
      )}

      <div className="grid grid-cols-3 gap-2">
        {ESTADO_IDS.map(id => (
          <button key={id} onClick={reveal ? undefined : () => onAnswer(id)} disabled={reveal}
            className={`py-3.5 rounded-2xl border font-black transition-all ${clase(id)}`}>
            {ESTADOS[id].emoji} {tr(ESTADOS[id].label, l)}
          </button>
        ))}
      </div>

      {reveal && (
        <div className={`mt-3 rounded-xl px-3 py-2.5 ${ok ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
          <p className={`font-black text-center ${ok ? 'text-green-400' : 'text-red-400'}`}>
            {ok ? t('correcto', l) : t('incorrecto', l)}
          </p>
          <p className="mt-1 text-white/70 text-sm">💡 {tr(round.sustancia.nota, l)}</p>
        </div>
      )}
    </>
  )
}

export default function CambioEstadoExamen() {
  return (
    <MechanicExam
      gameId="cambio-estado-test"
      emoji="🌡️"
      badge={{ es: 'Examen · Estados de la materia', en: 'Exam · States of matter', ca: 'Examen · Estats de la matèria' }}
      title={{ es: '🌡️ Examen de estados de la materia', en: '🌡️ States of matter exam', ca: '🌡️ Examen d\'estats de la matèria' }}
      sub={{ es: 'Sólido, líquido o gas según la temperatura', en: 'Solid, liquid or gas by temperature', ca: 'Sòlid, líquid o gas segons la temperatura' }}
      metaTitle={{ es: 'Examen de estados de la materia — sólido, líquido y gas', en: 'States of matter exam — solid, liquid and gas', ca: 'Examen d\'estats de la matèria — sòlid, líquid i gas' }}
      metaDesc={{
        es: 'Examen de estados de la materia con la mecánica del juego: di si cada sustancia está sólida, líquida o gaseosa a una temperatura dada. Dos niveles, con los puntos de fusión y ebullición a la vista o tapados. 10 preguntas, sin tiempo y con explicación.',
        en: 'States of matter exam using the game mechanic: say whether each substance is solid, liquid or gas at a given temperature. Two levels, with the melting and boiling points shown or hidden. 10 questions, no timer, with explanations.',
        ca: 'Examen d\'estats de la matèria amb la mecànica del joc: digues si cada substància és sòlida, líquida o gasosa a una temperatura donada. Dos nivells, amb els punts a la vista o tapats. 10 preguntes, sense temps.',
      }}
      metaPath="/examen/cambio-estado-test"
      subjectSchema="Química"
      backGamePath="/juegos/cambio-estado"
      playLabel={{ es: 'Modo arcade', en: 'Arcade mode', ca: 'Mode arcade' }}
      levels={NIVELES}
      genRound={dificultad => genRound({ dificultad })}
      isCorrect={(round, answer) => esCorrecta(round, answer)}
      renderQuestion={({ round, phase, answer, onAnswer, l, qIndex }) => (
        <Question key={qIndex} round={round} phase={phase} answer={answer} onAnswer={onAnswer} l={l} />
      )}
    />
  )
}
