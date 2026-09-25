import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import { nuevoNumero, simbolosDe, aRomano, valorRomano, esCorrecto } from '../lib/romanos'

const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Hasta 39', en: 'Up to 39', ca: 'Fins a 39' },
    hint: { es: 'I, V, X (con IV y IX)', en: 'I, V, X (with IV and IX)', ca: 'I, V, X (amb IV i IX)' } },
  { key: 'medio', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Hasta 399', en: 'Up to 399', ca: 'Fins a 399' },
    hint: { es: 'Añade L y C', en: 'Adds L and C', ca: 'Afegeix L i C' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Hasta 3999', en: 'Up to 3999', ca: 'Fins a 3999' },
    hint: { es: 'Añade D y M', en: 'Adds D and M', ca: 'Afegeix D i M' } },
]

const SIMBOLOS = simbolosDe('dificil') // todos

function RomanosPregunta({ round, phase, onAnswer, l }) {
  const [construido, setConstruido] = useState('')
  const revelado = phase === 'result'
  const won = revelado && esCorrecto(round, construido)

  return (
    <>
      <div className="text-center mb-2">
        <p className="text-white/40 text-xs uppercase tracking-widest">{l === 'en' ? 'Write in Roman' : l === 'ca' ? 'Escriu en romà' : 'Escribe en romano'}</p>
        <p className="text-white font-black text-4xl tabular-nums">{round}</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-black/20 p-3 mb-3 flex items-center justify-between min-h-[58px]">
        <span className={`font-black text-2xl ${revelado ? (won ? 'text-green-400' : 'text-red-400') : 'text-white'}`} style={{ letterSpacing: '0.15em' }}>
          {construido || <span className="text-white/25 text-base" style={{ letterSpacing: 'normal' }}>{l === 'en' ? 'tap the symbols…' : l === 'ca' ? 'toca els símbols…' : 'toca los símbolos…'}</span>}
        </span>
        {construido && <span className="text-white/40 text-sm">= {valorRomano(construido)}</span>}
      </div>

      {revelado && !won && (
        <p className="text-center font-black mb-3 text-red-400">❌ {round} = {aRomano(round)}</p>
      )}
      {revelado && won && (
        <p className="text-center font-black mb-3 text-green-400">🎉 {l === 'en' ? 'Correct!' : '¡Correcto!'}</p>
      )}

      {!revelado && (
        <>
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {SIMBOLOS.map(({ s }) => (
              <button key={s} onClick={() => setConstruido(c => c + s)}
                className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-white font-black text-xl hover:bg-white/20 active:scale-90 transition">{s}</button>
            ))}
            <button onClick={() => setConstruido(c => c.slice(0, -1))} disabled={!construido}
              className="w-12 h-12 rounded-xl bg-white/5 border border-white/15 text-white/70 text-lg hover:bg-white/15 disabled:opacity-30 active:scale-90 transition">⌫</button>
          </div>
          <button onClick={() => onAnswer(construido)} disabled={!construido}
            className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 disabled:opacity-40 transition">
            {l === 'en' ? 'Confirm →' : 'Confirmar →'}
          </button>
        </>
      )}
    </>
  )
}

function renderQuestion({ round, phase, onAnswer, l, qIndex }) {
  return <RomanosPregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
}

export default function NumerosRomanosExamen() {
  return (
    <MechanicExam
      gameId="numeros-romanos-test"
      emoji="🏛️"
      badge={{ es: 'Examen · Números romanos', en: 'Exam · Roman numerals', ca: 'Examen · Números romans' }}
      title={{ es: '🏛️ Examen: Números Romanos', en: '🏛️ Exam: Roman Numerals', ca: '🏛️ Examen: Números Romans' }}
      sub={{ es: 'Escribe cada número en romano', en: 'Write each number in Roman', ca: 'Escriu cada nombre en romà' }}
      metaTitle={{ es: 'Examen de números romanos — convertir y escribir', en: 'Roman numerals exam — converting and writing', ca: 'Examen de números romans — convertir i escriure' }}
      metaDesc={{ es: 'Examen de números romanos con la mecánica del juego: escribe cada número en romano tocando los símbolos, con las reglas IV, IX, XL. 10 preguntas con nota, sin tiempo.', en: 'Roman numerals exam using the game mechanic: write each number in Roman by tapping the symbols, with the IV, IX, XL rules. 10 graded questions, no timer.', ca: 'Examen de números romans amb la mecànica del joc: escriu cada nombre en romà tocant els símbols, amb les regles IV, IX, XL. 10 preguntes amb nota, sense temps.' }}
      metaPath="/examen/numeros-romanos-test"
      subjectSchema="Matemáticas"
      backGamePath="/juegos/numeros-romanos"
      playLabel={{ es: 'Modo arcade (50s)', en: 'Arcade mode (50s)', ca: 'Mode arcade (50s)' }}
      levels={LEVELS}
      genRound={nuevoNumero}
      isCorrect={esCorrecto}
      renderQuestion={renderQuestion}
    />
  )
}
