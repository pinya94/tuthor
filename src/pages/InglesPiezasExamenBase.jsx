import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import PiezasBoard from '../components/PiezasBoard'
import { TEMAS, genRound, esCorrecta, solucionTexto } from '../lib/piezaQueFalta'

// Examen con la MECÁNICA de La Pieza que Falta, fijado a un tema. Es la
// segunda forma de examinarse de cada tema de gramática: el tipo test de
// siempre pregunta "¿cuál de estas cuatro?", y este obliga a MONTAR la forma
// correcta, que es lo que de verdad se pide al escribir.
//
// Un examen por tema (no uno solo que reciba el tema) porque cada uno guarda
// sus propias stats: así el perfil y el panel del profesor pueden decir que
// alguien va bien en present perfect y mal en pasiva. Sin niveles: dentro de
// un tema todas las frases piden lo mismo, no hay un eje de dificultad real
// que ofrecer — mismo caso que Órbita (ver el comentario de Intro en
// MechanicExam.jsx, que se salta la pantalla de nivel cuando solo hay uno).
const NIVEL_UNICO = [{ key: 'todos', emoji: '🧩', label: { es: 'Empezar', en: 'Start', ca: 'Començar' }, hint: { es: '10 frases del tema', en: '10 sentences from this topic', ca: '10 frases del tema' } }]

const T = {
  correcto:   { es: '✓ Correcto', en: '✓ Correct', ca: '✓ Correcte' },
  incorrecto: { es: '✗ Incorrecto', en: '✗ Incorrect', ca: '✗ Incorrecte' },
  objetivo:   { es: 'Completa la frase', en: 'Complete the sentence', ca: 'Completa la frase' },
  pieza:      { es: 'pieza', en: 'piece', ca: 'peça' },
  piezas:     { es: 'piezas', en: 'pieces', ca: 'peces' },
  borrar:     { es: 'Borrar', en: 'Clear', ca: 'Esborrar' },
  confirmar:  { es: 'Confirmar', en: 'Confirm', ca: 'Confirma' },
}
const t = (k, l) => T[k][l] ?? T[k].es

function Question({ round, phase, onAnswer, l }) {
  const [placed, setPlaced] = useState([])
  const reveal = phase === 'result'
  const ok = reveal && esCorrecta(round, placed.map(i => round.chips[i]))
  const completa = placed.length === round.sol.length

  return (
    <>
      <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-3">
        {t('objetivo', l)} · {round.sol.length} {t(round.sol.length === 1 ? 'pieza' : 'piezas', l)}
      </p>

      <PiezasBoard round={round} placed={placed} reveal={reveal} ok={ok} l={l}
        onPlace={i => setPlaced(p => (p.includes(i) ? p : [...p, i]))}
        onRemove={pos => setPlaced(p => p.filter((_, i) => i !== pos))} />

      {reveal ? (
        <div className={`mt-3 rounded-xl px-3 py-2.5 ${ok ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
          <p className={`font-black text-center ${ok ? 'text-green-400' : 'text-red-400'}`}>
            {ok ? t('correcto', l) : t('incorrecto', l)}
          </p>
          <p className="mt-1 text-center text-white font-bold">{solucionTexto(round)}</p>
          <p className="mt-2 text-white/70 text-sm">💡 {round.rule[l] ?? round.rule.es}</p>
        </div>
      ) : (
        <div className="mt-3 flex gap-2">
          <button onClick={() => setPlaced([])} disabled={placed.length === 0}
            className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white/50 font-semibold hover:bg-white/10 disabled:opacity-30 transition">
            {t('borrar', l)}
          </button>
          {/* A diferencia del arcade, aquí NO se comprueba solo al colocar la
              última pieza: en un examen conviene poder rectificar antes de
              cerrar la respuesta. */}
          <button onClick={() => onAnswer(placed.map(i => round.chips[i]))} disabled={!completa}
            className="flex-1 py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition disabled:opacity-30 disabled:cursor-not-allowed">
            {t('confirmar', l)}
          </button>
        </div>
      )}
    </>
  )
}

export default function InglesPiezasExamenBase({ tema, gameId }) {
  const meta = TEMAS[tema]
  const nombre = meta.label.es // los cinco temas se llaman igual en los tres idiomas

  return (
    <MechanicExam
      gameId={gameId}
      emoji="🧩"
      badge={{ es: 'Examen · English Grammar', en: 'Exam · English Grammar', ca: 'Examen · English Grammar' }}
      title={{ es: `🧩 ${nombre} — monta la frase`, en: `🧩 ${nombre} — build the sentence`, ca: `🧩 ${nombre} — monta la frase` }}
      sub={{ es: 'Completa el hueco con las piezas correctas', en: 'Fill the gap with the right pieces', ca: 'Completa el buit amb les peces correctes' }}
      metaTitle={{ es: `Examen de ${nombre} en inglés — montar la frase`, en: `${nombre} exam — build the sentence`, ca: `Examen de ${nombre} en anglès — muntar la frase` }}
      metaDesc={{
        es: `Examen de ${nombre} con la mecánica del juego: completa cada frase montando la forma correcta con las piezas, en vez de elegir entre cuatro opciones. 10 preguntas, sin tiempo, con la regla explicada en cada una.`,
        en: `${nombre} exam using the game mechanic: complete each sentence by building the correct form from the pieces instead of picking one of four options. 10 questions, no timer, with the rule explained every time.`,
        ca: `Examen de ${nombre} amb la mecànica del joc: completa cada frase muntant la forma correcta amb les peces, en comptes de triar entre quatre opcions. 10 preguntes, sense temps, amb la regla explicada a cadascuna.`,
      }}
      metaPath={`/examen/${gameId}`}
      subjectSchema="Inglés"
      backGamePath="/juegos/pieza-que-falta"
      playLabel={{ es: 'Modo arcade', en: 'Arcade mode', ca: 'Mode arcade' }}
      levels={NIVEL_UNICO}
      genRound={() => genRound(tema)}
      isCorrect={(round, answer) => esCorrecta(round, answer ?? [])}
      renderQuestion={({ round, phase, onAnswer, l, qIndex }) => (
        <Question key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
      )}
    />
  )
}
