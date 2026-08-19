import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import RolTroficoSelector from '../components/RolTroficoSelector'
import { genRound, isCorrect, rolesDisponibles } from '../lib/cadenaAlimentaria'

// Examen con la mecánica del juego: mismo organismo + mismos botones de rol,
// sin reloj. El eje de dificultad es real (más organismos y aparece el
// consumidor terciario en niveles más altos) — mismo mapeo primaria/eso/
// bachillerato → facil/medio/dificil que Encuentra el Elemento y Circuito
// Cerrado (ver lib/cadenaAlimentaria.js).
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: '8 organismos, 4 roles', en: '8 organisms, 4 roles', ca: '8 organismes, 4 rols' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: '16 organismos, 5 roles (aparece el consumidor terciario)', en: '16 organisms, 5 roles (tertiary consumer appears)', ca: '16 organismes, 5 rols (apareix el consumidor terciari)' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' },
    hint: { es: 'Los 25 organismos, incluida una cadena marina', en: 'All 25 organisms, including a marine chain', ca: 'Els 25 organismes, incloent-hi una cadena marina' } },
]

const T = {
  confirmar: { es: 'Confirmar', en: 'Confirm', ca: 'Confirma' },
  correcto: { es: '✓ Correcto', en: '✓ Correct', ca: '✓ Correcte' },
  incorrecto: { es: '✗ Incorrecto', en: '✗ Incorrect', ca: '✗ Incorrecte' },
  objetivo: { es: '¿Qué rol tiene?', en: 'What role does it have?', ca: 'Quin rol té?' },
}

function Question({ round, phase, onAnswer, l }) {
  const [guess, setGuess] = useState(null)
  const reveal = phase === 'result'
  const ok = reveal && isCorrect(round, guess)
  const roles = rolesDisponibles(round.uiDiff)

  return (
    <>
      <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">
        {T.objetivo[l] ?? T.objetivo.es}
      </p>

      <RolTroficoSelector organismo={round.organismo} roles={roles} guess={guess}
        onPick={reveal ? null : setGuess} revelado={reveal} lang={l} />

      {reveal ? (
        <div className={`mt-3 rounded-xl px-3 py-2 text-center ${ok ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
          <p className={`font-black ${ok ? 'text-green-400' : 'text-red-400'}`}>
            {ok ? T.correcto[l] ?? T.correcto.es : T.incorrecto[l] ?? T.incorrecto.es}
          </p>
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

export default function CadenaAlimentariaExamen() {
  return (
    <MechanicExam
      gameId="cadena-alimentaria-test"
      emoji="🌿"
      badge={{ es: 'Examen · Ecosistemas', en: 'Exam · Ecosystems', ca: 'Examen · Ecosistemes' }}
      title={{ es: '🌿 Examen Cadena Alimentaria', en: '🌿 Food Chain Exam', ca: '🌿 Examen Cadena Alimentària' }}
      sub={{ es: 'Elige el rol trófico de cada organismo', en: 'Pick each organism\'s trophic role', ca: 'Tria el rol tròfic de cada organisme' }}
      metaTitle={{ es: 'Examen de Cadena Alimentaria — Biología', en: 'Food Chain Exam — Biology', ca: 'Examen de Cadena Alimentària — Biologia' }}
      metaDesc={{ es: 'Examen de ecosistemas con la mecánica del juego: elige el rol trófico de cada organismo (productor, consumidor primario, secundario, terciario o descomponedor) a partir de un dato real. 10 preguntas, sin tiempo.', en: 'Ecosystems exam using the game mechanic: pick each organism\'s trophic role (producer, primary, secondary or tertiary consumer, or decomposer) from a real fact. 10 questions, no timer.', ca: 'Examen d\'ecosistemes amb la mecànica del joc: tria el rol tròfic de cada organisme (productor, consumidor primari, secundari, terciari o descomponedor) a partir d\'una dada real. 10 preguntes, sense temps.' }}
      metaPath="/examen/cadena-alimentaria-test"
      subjectSchema="Biología"
      backGamePath="/juegos/cadena-alimentaria"
      playLabel={{ es: 'Modo arcade', en: 'Arcade mode', ca: 'Mode arcade' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={isCorrect}
      renderQuestion={({ round, phase, onAnswer, l, qIndex }) => (
        <Question key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
      )}
    />
  )
}
