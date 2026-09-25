import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import { nuevaConversion, esCorrecta, formatNum, factorTexto, MAGNITUDES } from '../lib/escalera'
import { EscaleraSVG, Teclado } from '../components/EscaleraUnidades'

const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Longitud', en: 'Length', ca: 'Longitud' },
    hint: { es: 'km → mm, bajando', en: 'km → mm, going down', ca: 'km → mm, baixant' } },
  { key: 'medio', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Tres magnitudes', en: 'Three quantities', ca: 'Tres magnituds' },
    hint: { es: 'Longitud, masa y capacidad', en: 'Length, mass and capacity', ca: 'Longitud, massa i capacitat' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Con decimales', en: 'With decimals', ca: 'Amb decimals' },
    hint: { es: 'Saltos largos', en: 'Long jumps', ca: 'Salts llargs' } },
]

const trl = (o, l) => o?.[l] ?? o?.es

function EscaleraPregunta({ round, phase, onAnswer, l }) {
  const [entrada, setEntrada] = useState('')
  const dot = l === 'en' ? '.' : ','
  const revelado = phase === 'result'
  const won = revelado && esCorrecta(round, entrada)
  const deU = round.unidades[round.deIdx]
  const aU = round.unidades[round.aIdx]
  const magNombre = trl(MAGNITUDES[round.magnitud].nombre, l)

  const anadir = d => !revelado && setEntrada(e => (e.length < 12 ? e + d : e))
  const coma = () => !revelado && setEntrada(e => (e.includes('.') ? e : (e || '0') + '.'))
  const borrar = () => !revelado && setEntrada(e => e.slice(0, -1))

  return (
    <>
      <div className="text-center mb-1">
        <p className="text-white/40 text-xs uppercase tracking-widest">{magNombre} · {factorTexto(round)}</p>
        <p className="text-white font-black text-2xl sm:text-3xl">
          <span className="text-[#EDAE49]">{formatNum(round.valor, l)} {deU}</span>
          <span className="text-white/40"> = </span>
          <span className="text-sky-400">? {aU}</span>
        </p>
      </div>

      <div className="mb-2"><EscaleraSVG unidades={round.unidades} deIdx={round.deIdx} aIdx={round.aIdx} className="w-full h-auto" /></div>

      <div className="rounded-xl border border-white/10 bg-black/20 p-3 mb-2 flex items-center justify-between min-h-[54px]">
        <span className={`font-black text-2xl tabular-nums ${revelado ? (won ? 'text-green-400' : 'text-red-400') : 'text-white'}`}>
          {entrada
            ? <>{entrada.replace('.', dot)} <span className="text-white/40 text-lg">{aU}</span></>
            : <span className="text-white/25 text-base">{l === 'en' ? 'type the result…' : l === 'ca' ? 'escriu el resultat…' : 'escribe el resultado…'}</span>}
        </span>
      </div>

      {revelado && !won && (
        <p className="text-center font-black mb-3 text-red-400">❌ {formatNum(round.valor, l)} {deU} = {formatNum(round.objetivo, l)} {aU}</p>
      )}
      {revelado && won && (
        <p className="text-center font-black mb-3 text-green-400">🎉 {l === 'en' ? 'Correct!' : '¡Correcto!'}</p>
      )}

      {!revelado && (
        <div className="flex flex-col items-center gap-2">
          <Teclado onDigit={anadir} onDot={coma} onBack={borrar} dotLabel={dot} />
          <button onClick={() => onAnswer(entrada)} disabled={!entrada}
            className="w-full max-w-[420px] py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 disabled:opacity-40 transition">
            {l === 'en' ? 'Confirm →' : 'Confirmar →'}
          </button>
        </div>
      )}
    </>
  )
}

function renderQuestion({ round, phase, onAnswer, l, qIndex }) {
  return <EscaleraPregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
}

export default function EscaleraUnidadesExamen() {
  return (
    <MechanicExam
      gameId="escalera-unidades-test"
      emoji="🔟"
      badge={{ es: 'Examen · Medida', en: 'Exam · Measurement', ca: 'Examen · Mesura' }}
      title={{ es: '🔟 Examen: La Escalera de Unidades', en: '🔟 Exam: The Unit Staircase', ca: '🔟 Examen: L\'Escala d\'Unitats' }}
      sub={{ es: 'Convierte cada cantidad a la unidad pedida', en: 'Convert each quantity to the requested unit', ca: 'Converteix cada quantitat a la unitat demanada' }}
      metaTitle={{ es: 'Examen de conversión de unidades — km, m, cm, kg, g, L', en: 'Unit conversion exam — km, m, cm, kg, g, L', ca: 'Examen de conversió d\'unitats — km, m, cm, kg, g, L' }}
      metaDesc={{ es: 'Examen de conversión de unidades del sistema métrico con la escalera (× 10 y ÷ 10): longitud, masa y capacidad. 10 preguntas con nota, sin tiempo.', en: 'Metric unit conversion exam with the staircase (× 10 and ÷ 10): length, mass and capacity. 10 graded questions, no timer.', ca: 'Examen de conversió d\'unitats del sistema mètric amb l\'escala (× 10 i ÷ 10): longitud, massa i capacitat. 10 preguntes amb nota, sense temps.' }}
      metaPath="/examen/escalera-unidades-test"
      subjectSchema="Matemáticas"
      backGamePath="/juegos/escalera-unidades"
      playLabel={{ es: 'Modo arcade (50s)', en: 'Arcade mode (50s)', ca: 'Mode arcade (50s)' }}
      levels={LEVELS}
      genRound={nuevaConversion}
      isCorrect={esCorrecta}
      renderQuestion={renderQuestion}
    />
  )
}
