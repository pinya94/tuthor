import { useState } from 'react'
import MechanicExam from '../components/MechanicExam'
import TableroLuz from '../components/rayoLuz/TableroLuz'
import { rondaExamen } from '../lib/rayoLuz'

// Examen con la mecánica de Rayo de Luz: los espejos ya están puestos y no
// se giran; el rayo NO se ve hasta responder. Hay que seguirlo con la cabeza
// —cada espejo a 45° lo gira 90°— y decir por qué salida (A-D) sale.
const LEVELS = [
  { key: 'primaria', emoji: '🟢', difficulty: 'facil',
    label: { es: 'Primaria', en: 'Primary', ca: 'Primària' },
    hint: { es: 'Uno o dos rebotes', en: 'One or two bounces', ca: 'Un o dos rebots' } },
  { key: 'eso', emoji: '🟡', difficulty: 'medio',
    label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' },
    hint: { es: 'Dos o tres rebotes y espejos que despistan', en: 'Two or three bounces and misleading mirrors', ca: 'Dos o tres rebots i miralls que despisten' } },
  { key: 'bachillerato', emoji: '🔴', difficulty: 'dificil',
    label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' },
    hint: { es: 'Tres o cuatro rebotes', en: 'Three or four bounces', ca: 'Tres o quatre rebots' } },
]

const TXT = {
  pregunta: { es: '¿Por qué salida sale el rayo?', en: 'Which exit does the beam leave by?', ca: 'Per quina sortida surt el raig?' },
  pista: { es: 'Síguelo con la vista: cada espejo lo gira 90°', en: 'Follow it with your eyes: each mirror turns it 90°', ca: 'Segueix-lo amb la vista: cada mirall el gira 90°' },
  ok: { es: '¡Correcto!', en: 'Correct!', ca: 'Correcte!' },
  mal: { es: 'Salía por la', en: 'It left by', ca: 'Sortia per la' },
  confirmar: { es: 'Confirmar', en: 'Confirm', ca: 'Confirmar' },
  elige: { es: 'Toca una letra', en: 'Tap a letter', ca: 'Toca una lletra' },
}

// Componente propio con estado (la letra elegida antes de confirmar): ver la
// nota de hooks en CircuitoCerradoExamen.jsx.
function PreguntaLuz({ round, phase, onAnswer, l }) {
  const [elegida, setElegida] = useState(null)
  const t = k => TXT[k][l] ?? TXT[k].es
  const revelado = phase === 'result'
  const acierto = revelado && elegida === round.correcta
  return (
    <>
      <p className="text-white font-bold text-center">{t('pregunta')}</p>
      <p className="text-white/45 text-xs text-center mb-2">{t('pista')}</p>
      <div className="rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0b1226] mb-3 mx-auto"
        style={{ maxWidth: 'min(440px, calc((100dvh - 20rem) * 0.9))' }}>
        <TableroLuz tablero={round.tablero} orient={round.orient}
          mostrarRayo={revelado} mostrarAngulos={revelado}
          salidas={round.salidas} elegida={elegida} correcta={revelado ? round.correcta : null}
          onElegir={revelado ? null : setElegida} />
      </div>
      {revelado ? (
        <p className={`text-center font-black text-lg mb-1 ${acierto ? 'text-green-400' : 'text-red-400'}`}>
          {acierto ? t('ok') : `${t('mal')} ${round.correcta}`}
        </p>
      ) : (
        <button onClick={() => elegida && onAnswer(elegida)} disabled={!elegida}
          className="w-full py-3.5 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 disabled:bg-white/[0.06] disabled:text-white/40 transition">
          {elegida ? `${t('confirmar')} · ${elegida}` : t('elige')}
        </button>
      )}
    </>
  )
}

function renderQuestion({ round, phase, onAnswer, l, qIndex }) {
  return <PreguntaLuz key={qIndex} round={round} phase={phase} onAnswer={onAnswer} l={l} />
}

export default function RayoDeLuzExamen() {
  return (
    <MechanicExam
      gameId="rayo-de-luz-test"
      emoji="🔦"
      badge={{ es: 'Examen · Ondas y luz', en: 'Exam · Waves and light', ca: 'Examen · Ones i llum' }}
      title={{ es: 'Examen Rayo de Luz', en: 'Light Beam Exam', ca: 'Examen Raig de Llum' }}
      sub={{ es: 'Sigue el rayo por los espejos y di por dónde sale', en: 'Follow the beam through the mirrors and say where it leaves', ca: 'Segueix el raig pels miralls i digues per on surt' }}
      metaTitle={{ es: 'Examen de Rayo de Luz — Reflexión de la luz', en: 'Light Beam Exam — Reflection of light', ca: 'Examen de Raig de Llum — Reflexió de la llum' }}
      metaDesc={{ es: 'Examen de la ley de la reflexión con la mecánica del juego: sigue un rayo láser por espejos a 45° y di por qué salida sale. 10 preguntas, tres niveles, sin tiempo.', en: 'Law of reflection exam using the game mechanic: follow a laser beam through 45° mirrors and say which exit it leaves by. 10 questions, three levels, no timer.', ca: 'Examen de la llei de la reflexió amb la mecànica del joc: segueix un raig làser per miralls a 45° i digues per quina sortida surt. 10 preguntes, tres nivells, sense temps.' }}
      metaPath="/examen/rayo-de-luz-test"
      subjectSchema="Física"
      backGamePath="/juegos/rayo-de-luz"
      playLabel={{ es: 'Modo arcade (60s)', en: 'Arcade mode (60s)', ca: 'Mode arcade (60s)' }}
      levels={LEVELS}
      genRound={difficulty => rondaExamen(difficulty)}
      isCorrect={(round, answer) => answer === round.correcta}
      renderQuestion={renderQuestion}
    />
  )
}
