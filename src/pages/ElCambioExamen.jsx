import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import { nuevaRonda, denomsDe, formatoEuro, esCorrecta } from '../lib/dinero'

const LEVELS = [
  { key: 'facil', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Formar hasta 2 €', en: 'Make up to €2', ca: 'Formar fins a 2 €' },
    hint: { es: 'De 10 en 10 céntimos', en: 'In steps of 10 cents', ca: 'De 10 en 10 cèntims' } },
  { key: 'medio', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Formar hasta 10 €', en: 'Make up to €10', ca: 'Formar fins a 10 €' },
    hint: { es: 'Con céntimos y billetes', en: 'With cents and notes', ca: 'Amb cèntims i bitllets' } },
  { key: 'dificil', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Dar el cambio', en: 'Give change', ca: 'Donar el canvi' },
    hint: { es: 'El cambio de un billete', en: 'Change from a note', ca: 'El canvi d\'un bitllet' } },
]

function Ficha({ d, onClick, disabled }) {
  const base = 'flex items-center justify-center font-black text-sm text-white shadow active:scale-90 transition'
  const style = { background: d.color, border: '2px solid rgba(255,255,255,0.35)', opacity: disabled ? 0.5 : 1 }
  return d.tipo === 'moneda'
    ? <button disabled={disabled} onClick={onClick} className={`w-12 h-12 rounded-full ${base}`} style={style}>{d.label}</button>
    : <button disabled={disabled} onClick={onClick} className={`h-9 px-3 rounded-md ${base}`} style={style}>{d.label}</button>
}

function CambioPregunta({ round, phase, onAnswer, l }) {
  const [bandeja, setBandeja] = useState([])
  const revelado = phase === 'result'
  const total = bandeja.reduce((a, v) => a + v, 0)
  const won = revelado && esCorrecta(round, total)
  const denoms = denomsDe('medio') // todas las denominaciones (monedas y billetes)

  return (
    <>
      <div className="text-center mb-2">
        {round.modo === 'forma' ? (
          <>
            <p className="text-white/40 text-xs uppercase tracking-widest">{l === 'en' ? 'Make this amount' : l === 'ca' ? 'Forma aquesta quantitat' : 'Forma esta cantidad'}</p>
            <p className="text-white font-black text-3xl tabular-nums">{formatoEuro(round.objetivo)}</p>
          </>
        ) : (
          <p className="text-white text-base leading-snug px-2">
            {l === 'en' ? 'It costs' : l === 'ca' ? 'Costa' : 'Cuesta'} <span className="font-black">{formatoEuro(round.precio)}</span>, {l === 'en' ? 'you pay with' : l === 'ca' ? 'pagues amb' : 'pagas con'} <span className="font-black">{formatoEuro(round.pago)}</span>. <span className="text-[#EDAE49] font-bold">{l === 'en' ? 'Give the change.' : l === 'ca' ? 'Dona el canvi.' : 'Da el cambio.'}</span>
          </p>
        )}
      </div>

      <div className="rounded-xl border border-white/10 bg-black/20 p-3 mb-3 min-h-[58px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/40 text-xs uppercase tracking-widest">{l === 'en' ? 'You have' : l === 'ca' ? 'Portes' : 'Llevas'}</span>
          <span className={`font-black text-xl tabular-nums ${round.modo === 'forma' && total === round.objetivo ? 'text-green-400' : 'text-white'}`}>{formatoEuro(total)}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {bandeja.map((v, i) => {
            const d = denoms.find(x => x.v === v)
            return <button key={i} disabled={revelado} onClick={() => setBandeja(b => b.filter((_, k) => k !== i))}
              className="text-xs font-bold px-2 py-1 rounded-md text-white/90" style={{ background: d?.color ?? '#555', opacity: revelado ? 0.6 : 1 }}>{d?.label} ✕</button>
          })}
        </div>
      </div>

      {revelado && (
        <p className={`text-center font-black mb-3 ${won ? 'text-green-400' : 'text-red-400'}`}>
          {won ? (l === 'en' ? '🎉 Correct!' : '🎉 ¡Correcto!') : `❌ ${l === 'en' ? 'It was' : 'Era'} ${formatoEuro(round.objetivo)}`}
        </p>
      )}

      {!revelado && (
        <>
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {denoms.map(d => <Ficha key={d.v} d={d} onClick={() => setBandeja(b => [...b, d.v])} />)}
          </div>
          <button onClick={() => onAnswer(total)} disabled={total === 0}
            className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 disabled:opacity-40 transition">
            {l === 'en' ? 'Confirm →' : 'Confirmar →'}
          </button>
        </>
      )}
    </>
  )
}

function renderQuestion({ round, phase, onAnswer, l, qIndex }) {
  return <CambioPregunta key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
}

export default function ElCambioExamen() {
  return (
    <MechanicExam
      gameId="el-cambio-test"
      emoji="💶"
      badge={{ es: 'Examen · El dinero', en: 'Exam · Money', ca: 'Examen · Els diners' }}
      title={{ es: '💶 Examen: El Cambio', en: '💶 Exam: The Change', ca: '💶 Examen: El Canvi' }}
      sub={{ es: 'Forma cada cantidad con monedas y billetes', en: 'Make each amount with coins and notes', ca: 'Forma cada quantitat amb monedes i bitllets' }}
      metaTitle={{ es: 'Examen del dinero — contar euros y dar el cambio', en: 'Money exam — counting euros and giving change', ca: 'Examen dels diners — comptar euros i donar el canvi' }}
      metaDesc={{ es: 'Examen del dinero con la mecánica del juego: forma cantidades con monedas y billetes de euro y da el cambio de un billete. 10 preguntas con nota, sin tiempo.', en: 'Money exam using the game mechanic: make amounts with euro coins and notes and give change from a note. 10 graded questions, no timer.', ca: 'Examen dels diners amb la mecànica del joc: forma quantitats amb monedes i bitllets d\'euro i dona el canvi d\'un bitllet. 10 preguntes amb nota, sense temps.' }}
      metaPath="/examen/el-cambio-test"
      subjectSchema="Matemáticas"
      backGamePath="/juegos/el-cambio"
      playLabel={{ es: 'Modo arcade (50s)', en: 'Arcade mode (50s)', ca: 'Mode arcade (50s)' }}
      levels={LEVELS}
      genRound={nuevaRonda}
      isCorrect={esCorrecta}
      renderQuestion={renderQuestion}
    />
  )
}
