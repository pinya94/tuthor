import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import TablaPeriodicaGrid from '../components/TablaPeriodicaGrid'
import { genRound, isCorrect, pistaTexto } from '../lib/encuentraElemento'

// Examen con la mecánica del juego: misma pista, misma tabla, sin reloj. A
// diferencia de Rayos X (posiciones fijas, sin niveles), aquí SÍ hay un eje
// de dificultad real — más elementos y pistas más indirectas por nivel — ver
// lib/encuentraElemento.js, mismo mapeo primaria/eso/bachillerato →
// facil/medio/dificil que Circuito Cerrado.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: '12 elementos, pista: el nombre', en: '12 elements, clue: the name', ca: '12 elements, pista: el nom' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: '41 elementos, nombre o número atómico', en: '41 elements, name or atomic number', ca: '41 elements, nom o número atòmic' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' },
    hint: { es: 'Los 71 elementos hasta el Radón, también por categoría y posición', en: 'All 71 elements up to Radon, also by category and position', ca: 'Els 71 elements fins al Radó, també per categoria i posició' } },
]

const T = {
  confirmar: { es: 'Confirmar', en: 'Confirm', ca: 'Confirma' },
  correcto: { es: '✓ Correcto', en: '✓ Correct', ca: '✓ Correcte' },
  incorrecto: { es: '✗ Incorrecto', en: '✗ Incorrect', ca: '✗ Incorrecte' },
}

function Question({ round, phase, onAnswer, l }) {
  const [guess, setGuess] = useState(null)
  const reveal = phase === 'result'
  const ok = reveal && isCorrect(round, guess)

  return (
    <>
      <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-1">
        {l === 'en' ? 'Find:' : l === 'ca' ? 'Busca:' : 'Busca:'}
      </p>
      <p className="text-center text-lg font-black text-white mb-3">{pistaTexto(round, l)}</p>

      <TablaPeriodicaGrid guess={guess} onPick={reveal ? null : setGuess} revelado={reveal} objetivo={round.elemento} />

      {reveal ? (
        <div className={`mt-3 rounded-xl px-3 py-2 text-center ${ok ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
          <p className={`font-black ${ok ? 'text-green-400' : 'text-red-400'}`}>
            {ok ? T.correcto[l] ?? T.correcto.es : T.incorrecto[l] ?? T.incorrecto.es}
          </p>
          <p className="text-white/60 text-xs mt-0.5">
            {round.elemento[l === 'en' ? 'nombreEn' : l === 'ca' ? 'nombreCa' : 'nombre']} ({round.elemento.symbol}) — Z={round.elemento.z}
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

export default function EncuentraElementoExamen() {
  return (
    <MechanicExam
      gameId="encuentra-elemento-test"
      emoji="🔬"
      badge={{ es: 'Examen · Tabla Periódica', en: 'Exam · Periodic Table', ca: 'Examen · Taula Periòdica' }}
      title={{ es: '🔬 Examen Encuentra el Elemento', en: '🔬 Find the Element Exam', ca: '🔬 Examen Troba l\'Element' }}
      sub={{ es: 'Toca la celda del elemento que te piden', en: 'Tap the cell of the requested element', ca: 'Toca la cel·la de l\'element que et demanen' }}
      metaTitle={{ es: 'Examen de Encuentra el Elemento — Química', en: 'Find the Element Exam — Chemistry', ca: 'Examen de Troba l\'Element — Química' }}
      metaDesc={{ es: 'Examen de tabla periódica con la mecánica del juego: toca la celda del elemento pedido por su nombre, número atómico o categoría. 10 preguntas, sin tiempo.', en: 'Periodic table exam using the game mechanic: tap the cell of the requested element by name, atomic number or category. 10 questions, no timer.', ca: 'Examen de taula periòdica amb la mecànica del joc: toca la cel·la de l\'element demanat pel seu nom, número atòmic o categoria. 10 preguntes, sense temps.' }}
      metaPath="/examen/encuentra-elemento-test"
      subjectSchema="Química"
      backGamePath="/juegos/encuentra-elemento"
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
