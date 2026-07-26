import MechanicExam from '../components/MechanicExam'
import ForceDiagram from '../components/ForceDiagram'
import { genRound, DIRS, axisBreakdown } from '../lib/fuerzaNeta'

// Examen con la mecánica del juego: un diagrama de fuerzas y eliges la dirección
// de la fuerza neta. 10 preguntas, sin tiempo, con el cálculo al responder.
// Niveles realistas: fuerza neta en 1 eje (Primaria) → 2 ejes (ESO) → diagonales
// y números grandes (Bachillerato) — hasta donde llega esta mecánica.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Dos fuerzas en un solo eje', en: 'Two forces on one axis', ca: 'Dues forces en un sol eix' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Varias fuerzas en los dos ejes', en: 'Several forces on both axes', ca: 'Diverses forces als dos eixos' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' },
    hint: { es: 'Fuerzas diagonales y números grandes', en: 'Diagonal forces and big numbers', ca: 'Forces diagonals i números grans' } },
]

function renderQuestion({ round, phase, answer, onAnswer, l }) {
  const reveal = phase === 'result'
  const won = answer === round.answer
  return (
    <>
      <div className="relative rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] mb-3">
        <ForceDiagram round={round} reveal={reveal} />
        {reveal && (
          <div className="absolute inset-x-0 bottom-0 bg-black/70 backdrop-blur-sm p-2 text-center">
            <p className={`font-black ${won ? 'text-green-400' : 'text-red-400'}`}>
              {won ? '🎉 ¡Correcto!' : '❌'} {DIRS[round.answer].arrow} {DIRS[round.answer].label[l] ?? DIRS[round.answer].label.es}
            </p>
            <p className="text-white/70 text-[11px] font-mono mt-0.5">
              H: {axisBreakdown(round.forces, 'H')} · V: {axisBreakdown(round.forces, 'V')}
            </p>
          </div>
        )}
      </div>
      <p className="text-white/60 text-sm text-center mb-2">
        {l === 'en' ? 'Which way does the box move?' : l === 'ca' ? 'Cap on es mou la caixa?' : '¿Hacia dónde se mueve la caja?'}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {round.options.map(opt => {
          const isCorrect = reveal && opt === round.answer
          const isWrong = reveal && opt === answer && !won
          let cls = 'bg-white/5 hover:bg-white/10 border-white/10'
          if (isCorrect) cls = 'bg-green-500/20 border-green-500'
          else if (isWrong) cls = 'bg-red-500/20 border-red-500'
          else if (reveal) cls = 'bg-white/5 border-white/10 opacity-40'
          return (
            <button key={opt} onClick={() => onAnswer(opt)} disabled={reveal}
              className={`px-3 py-3 rounded-xl border font-semibold text-sm text-white transition-all flex items-center gap-2 ${cls}`}>
              <span className="text-lg">{DIRS[opt].arrow}</span>
              <span className="text-left text-xs">{DIRS[opt].label[l] ?? DIRS[opt].label.es}</span>
            </button>
          )
        })}
      </div>
    </>
  )
}

export default function FuerzaNetaExamen() {
  return (
    <MechanicExam
      gameId="fuerza-neta-test"
      emoji="🧭"
      badge={{ es: 'Examen · Fuerzas', en: 'Exam · Forces', ca: 'Examen · Forces' }}
      title={{ es: '🧭 Examen Fuerza Neta', en: '🧭 Net Force Exam', ca: '🧭 Examen Força Neta' }}
      sub={{ es: 'Suma las fuerzas y acierta la dirección resultante', en: 'Add the forces and pick the resultant direction', ca: 'Suma les forces i encerta la direcció resultant' }}
      metaTitle={{ es: 'Examen de Fuerza Neta — Física', en: 'Net Force Exam — Physics', ca: 'Examen de Força Neta — Física' }}
      metaDesc={{ es: 'Examen de fuerza neta con la mecánica del juego: suma las fuerzas y elige hacia dónde se mueve. 10 preguntas, sin tiempo, con el cálculo explicado.', en: 'Net force exam using the game mechanic: add the forces and choose which way it moves. 10 questions, no timer, with the calculation explained.', ca: 'Examen de força neta amb la mecànica del joc: suma les forces i tria cap on es mou. 10 preguntes, sense temps, amb el càlcul explicat.' }}
      metaPath="/examen/fuerza-neta-test"
      subjectSchema="Física"
      backGamePath="/juegos/fuerza-neta"
      playLabel={{ es: 'Modo arcade (40s)', en: 'Arcade mode (40s)', ca: 'Mode arcade (40s)' }}
      levels={LEVELS}
      genRound={genRound}
      isCorrect={(round, ans) => ans === round.answer}
      renderQuestion={renderQuestion}
    />
  )
}
