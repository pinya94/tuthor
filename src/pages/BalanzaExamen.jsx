import MechanicExam from '../components/MechanicExam'
import BalanceBeam from '../components/BalanceBeam'
import { genRound, torqueBreakdown } from '../lib/balanza'

// Examen con la mecánica del juego: colocas el peso en la muesca que equilibra
// la balanza. 10 preguntas, sin tiempo, con el cálculo del momento al responder.
function makeRound() {
  return genRound(Math.random() < 0.4 ? 'dificil' : 'medio')
}

function renderQuestion({ round, phase, answer, onAnswer, l }) {
  const reveal = phase === 'result'
  const won = answer === round.answer
  const kg = l === 'en' ? 'kg' : 'kg'
  return (
    <>
      <p className="text-white/70 text-sm mb-1 text-center px-2">
        {l === 'en' ? 'Place your' : l === 'ca' ? 'Col·loca el teu pes de' : 'Coloca tu peso de'}{' '}
        <span className="text-[#EDAE49] font-black">{round.playerWeight} {kg}</span>{' '}
        {l === 'en' ? 'weight on the notch that balances' : l === 'ca' ? 'a la osca que equilibri' : 'en la muesca que equilibre'}
      </p>
      <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] mb-3">
        <BalanceBeam round={round} placed={answer} onPick={reveal ? undefined : onAnswer} />
        {reveal && (
          <div className="absolute inset-x-0 bottom-0 bg-black/70 backdrop-blur-sm p-2 text-center">
            <p className={`font-black ${won ? 'text-green-400' : 'text-red-400'}`}>
              {won
                ? `⚖️ ${l === 'en' ? 'Balanced!' : l === 'ca' ? 'Equilibrada!' : '¡Equilibrada!'}`
                : `${l === 'en' ? 'It tips' : l === 'ca' ? 'S’inclina' : 'Se inclina'}`}
              {!won && <span className="text-white/60 text-sm font-normal"> · {l === 'en' ? 'correct notch:' : l === 'ca' ? 'osca correcta:' : 'muesca correcta:'} {round.answer}</span>}
            </p>
            <p className="text-white/70 text-[11px] font-mono mt-0.5">
              {l === 'en' ? 'Left' : l === 'ca' ? 'Esquerra' : 'Izq'}: {torqueBreakdown(round.left)} · {l === 'en' ? 'Right' : l === 'ca' ? 'Dreta' : 'Der'}: {round.playerWeight}×{answer} = {round.playerWeight * answer}
            </p>
          </div>
        )}
      </div>
    </>
  )
}

export default function BalanzaExamen() {
  return (
    <MechanicExam
      gameId="balanza-test"
      emoji="⚖️"
      badge={{ es: 'Examen · Palancas', en: 'Exam · Levers', ca: 'Examen · Palanques' }}
      title={{ es: '⚖️ Examen Balanza', en: '⚖️ Balance Exam', ca: '⚖️ Examen Balança' }}
      sub={{ es: 'Coloca el peso en la muesca que equilibra los momentos', en: 'Place the weight on the notch that balances the moments', ca: 'Col·loca el pes a la osca que equilibra els moments' }}
      metaTitle={{ es: 'Examen de Palancas y Momentos — Física', en: 'Levers & Moments Exam — Physics', ca: 'Examen de Palanques i Moments — Física' }}
      metaDesc={{ es: 'Examen de palancas con la mecánica del juego: coloca el peso a la distancia que equilibra la balanza. 10 preguntas, sin tiempo, con el cálculo del momento.', en: 'Levers exam using the game mechanic: place the weight at the distance that balances the scale. 10 questions, no timer, with the moment calculation.', ca: 'Examen de palanques amb la mecànica del joc: col·loca el pes a la distància que equilibra la balança. 10 preguntes, sense temps, amb el càlcul del moment.' }}
      metaPath="/examen/balanza-test"
      subjectSchema="Física"
      backGamePath="/juegos/balanza"
      playLabel={{ es: 'Modo arcade (40s)', en: 'Arcade mode (40s)', ca: 'Mode arcade (40s)' }}
      genRound={makeRound}
      isCorrect={(round, ans) => ans === round.answer}
      renderQuestion={renderQuestion}
    />
  )
}
