import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEventosLineaTemporal } from '../data/historiaEvents'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'

const MAX_LIVES = 3

function formatYear(y) {
  return y < 0 ? `${Math.abs(y)} a.C.` : `${y} d.C.`
}

// ── INTRO ──────────────────────────────────────────────────────────────────────
function Intro({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <span className="text-6xl mb-4 block">📜</span>
          <h1 className="text-3xl font-black text-white mb-2">Línea Temporal</h1>
          <p className="text-white/50 text-sm">Ordena la historia del mundo</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 space-y-4">
          <div className="flex items-start gap-4">
            <span className="text-2xl">🃏</span>
            <div>
              <p className="font-bold text-white text-sm">Coloca la carta en su sitio</p>
              <p className="text-white/50 text-xs mt-0.5">Aparece un evento con el año oculto. Pulsa el hueco correcto en tu línea del tiempo.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl">❤️</span>
            <div>
              <p className="font-bold text-white text-sm">3 vidas</p>
              <p className="text-white/50 text-xs mt-0.5">Cada error te cuesta una vida. El año se revela siempre para que aprendas.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl">📈</span>
            <div>
              <p className="font-bold text-white text-sm">La línea crece con cada acierto</p>
              <p className="text-white/50 text-xs mt-0.5">Cuantas más cartas coloques bien, más puntos. ¡Hay 70 eventos!</p>
            </div>
          </div>
        </div>
        <button onClick={onStart} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-colors text-lg">
          Empezar →
        </button>
      </div>
    </div>
  )
}

// ── GAME OVER ──────────────────────────────────────────────────────────────────
function GameOver({ score, placed, onRepetir, onSalir }) {
  let nota, notaColor
  if (placed >= 20) { nota = 'HISTORIADOR EXPERTO'; notaColor = 'text-violet-400' }
  else if (placed >= 12) { nota = 'BUEN NIVEL'; notaColor = 'text-blue-400' }
  else if (placed >= 6)  { nota = 'EN PROGRESO'; notaColor = 'text-amber-400' }
  else                   { nota = 'SIGUE PRACTICANDO'; notaColor = 'text-white/60' }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Partida terminada</p>
          <h1 className={`text-3xl font-black mb-1 ${notaColor}`}>{nota}</h1>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { val: score, label: 'Puntos', emoji: '⭐' },
            { val: placed, label: 'Colocadas', emoji: '✅' },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
              <span className="text-2xl block mb-1">{s.emoji}</span>
              <p className="text-2xl font-black text-white">{s.val}</p>
              <p className="text-white/40 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <button onClick={onRepetir} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl transition-colors">
            Jugar otra vez ↺
          </button>
          <button onClick={onSalir} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-medium py-3 rounded-xl transition-colors">
            Volver a Juegos
          </button>
        </div>
      </div>
    </div>
  )
}

// ── MAIN ────────────────────────────────────────────────────────────────────────
export default function OrdenTemporal() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [fase, setFase] = useState('intro')
  const [timeline, setTimeline] = useState([])
  const [pending, setPending] = useState([])
  const [current, setCurrent] = useState(null)
  const [lives, setLives] = useState(MAX_LIVES)
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState('placing')
  const [chosenSlot, setChosenSlot] = useState(null)
  const [correctSlot, setCorrectSlot] = useState(null)
  const [wasCorrect, setWasCorrect] = useState(null)
  const timelineRef = useRef(null)
  const startTimeRef = useRef(null)

  function getCorrectPosition(card, tl) {
    const idx = tl.findIndex(e => e.año > card.año)
    return idx === -1 ? tl.length : idx
  }

  function startGame() {
    const all = getEventosLineaTemporal()
    setTimeline([all[0]])
    setPending(all.slice(2))
    setCurrent(all[1])
    setLives(MAX_LIVES)
    setScore(0)
    setFase('jugando')
    setPhase('placing')
    setChosenSlot(null)
    setCorrectSlot(null)
    setWasCorrect(null)
    startTimeRef.current = Date.now()
  }

  function placeCard(slot) {
    if (phase !== 'placing' || !current) return
    const correct = getCorrectPosition(current, timeline)
    setChosenSlot(slot)
    setCorrectSlot(correct)
    setPhase('revealing')
    const ok = slot === correct
    setWasCorrect(ok)

    let newTimeline = timeline
    let newLives = lives
    let newScore = score

    if (ok) {
      newTimeline = [...timeline]
      newTimeline.splice(slot, 0, current)
      setTimeline(newTimeline)
      newScore = score + Math.max(5, 15 - timeline.length)
      setScore(newScore)
    } else {
      newLives = lives - 1
      setLives(newLives)
    }

    setTimeout(() => {
      if (newLives <= 0 || pending.length === 0) {
        const timeSpent = startTimeRef.current ? Math.round((Date.now() - startTimeRef.current) / 1000) : 0
        if (user) saveActivity(user.uid, { type: 'juego', game: 'orden-temporal', score: newScore, passed: newTimeline.length >= 8, timeSpent }).catch(() => {})
        setFase('gameover')
        return
      }
      setCurrent(pending[0])
      setPending(p => p.slice(1))
      setPhase('placing')
      setChosenSlot(null)
      setCorrectSlot(null)
      setWasCorrect(null)
      setTimeout(() => timelineRef.current?.scrollTo({ left: timelineRef.current.scrollWidth, behavior: 'smooth' }), 100)
    }, 2000)
  }

  if (fase === 'intro') return <div className="relative z-10"><Intro onStart={startGame} /></div>
  if (fase === 'gameover') return <div className="relative z-10"><GameOver score={score} placed={timeline.length} onRepetir={startGame} onSalir={() => navigate('/juegos')} /></div>

  const difColor = { fácil: 'text-green-400 border-green-500/30 bg-green-500/10', medio: 'text-amber-400 border-amber-500/30 bg-amber-500/10', difícil: 'text-red-400 border-red-500/30 bg-red-500/10' }

  return (
    <div className="relative z-10 flex flex-col h-[calc(100vh-4rem)]">

      {/* ── HEADER ── */}
      <div className="flex items-center justify-between px-4 sm:px-8 py-3 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2">
          {Array.from({ length: MAX_LIVES }).map((_, i) => (
            <span key={i} className={`text-2xl transition-all ${i < lives ? '' : 'opacity-20 grayscale'}`}>❤️</span>
          ))}
        </div>
        <div className="text-center">
          <p className="text-white font-black text-xl">{score} pts</p>
          <p className="text-white/30 text-xs">{timeline.length} colocadas</p>
        </div>
        <div className="text-right min-w-[60px]">
          <p className="text-white/40 text-sm font-semibold">{pending.length + 1} restantes</p>
          <div className="w-16 h-1.5 bg-white/10 rounded-full mt-1 ml-auto overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${Math.round((timeline.length / (timeline.length + pending.length + 1)) * 100)}%` }} />
          </div>
        </div>
      </div>

      {/* ── CARTA ACTUAL ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-4 min-h-0">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-3 text-center">
          {phase === 'placing' ? '¿Dónde va esta carta?' : wasCorrect ? '✓ ¡Correcto!' : '✗ Incorrecto — mira dónde debía ir (↑)'}
        </p>

        {current && (
          <div className={`w-full max-w-lg rounded-2xl border-2 p-5 transition-all duration-300 ${
            phase === 'revealing'
              ? wasCorrect ? 'border-green-500/70 bg-green-500/10' : 'border-red-500/70 bg-red-500/10'
              : 'border-white/20 bg-white/5'
          }`}>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">{current.nombre}</h2>
            <p className="text-white/50 text-sm leading-relaxed mb-4">{current.descripcion}</p>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold px-2 py-1 rounded-full border ${difColor[current.dificultad]}`}>{current.dificultad}</span>
              <span className={`text-2xl font-black transition-all duration-500 ${phase === 'revealing' ? 'text-amber-400' : 'text-white/15'}`}>
                {phase === 'revealing' ? formatYear(current.año) : '????'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── LÍNEA DEL TIEMPO ── */}
      <div className="shrink-0 border-t border-white/10 bg-black/20 backdrop-blur-sm pb-4 pt-3">
        <p className="text-white/30 text-xs uppercase tracking-widest mb-3 px-4">Tu línea del tiempo</p>
        <div ref={timelineRef} className="overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          <div className="flex items-center px-4 gap-0" style={{ minWidth: 'max-content' }}>

            <SlotBtn index={0} phase={phase} chosen={chosenSlot} correct={correctSlot} onPlace={placeCard} />

            {timeline.map((ev, i) => (
              <div key={ev.id} className="flex items-center gap-0">
                <div className="flex flex-col items-center mx-1">
                  <div className="bg-white/10 border border-white/20 rounded-xl px-3 py-2 min-w-[100px] max-w-[130px]">
                    <p className="text-white text-xs font-bold leading-snug line-clamp-2">{ev.nombre}</p>
                    <p className="text-amber-400 text-sm font-black mt-1">{formatYear(ev.año)}</p>
                  </div>
                </div>
                <SlotBtn index={i + 1} phase={phase} chosen={chosenSlot} correct={correctSlot} onPlace={placeCard} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SlotBtn({ index, phase, chosen, correct, onPlace }) {
  const isChosen  = phase === 'revealing' && chosen === index
  const isCorrect = phase === 'revealing' && correct === index
  const isActive  = phase === 'placing'

  let cls = 'border-white/25 bg-white/5 text-white/50 hover:border-amber-400 hover:bg-amber-500/20 hover:text-amber-300 hover:scale-110'
  if (isChosen && isCorrect)  cls = 'border-green-500 bg-green-500/25 text-green-300 scale-110'
  else if (isChosen)          cls = 'border-red-500 bg-red-500/25 text-red-300 scale-110'
  else if (isCorrect)         cls = 'border-green-400/70 bg-green-500/15 text-green-400 animate-pulse'

  return (
    <button
      onClick={() => isActive && onPlace(index)}
      disabled={!isActive}
      className={`flex-shrink-0 flex flex-col items-center justify-center border-2 rounded-xl transition-all duration-150 mx-1 cursor-pointer active:scale-95 ${cls}`}
      style={{ width: 52, height: 68 }}
    >
      <span className="text-2xl font-black leading-none">
        {isChosen && isCorrect ? '✓' : isChosen ? '✗' : isCorrect ? '↑' : '+'}
      </span>
      {isActive && <span className="text-[10px] font-bold uppercase tracking-wide opacity-50 mt-1">aquí</span>}
    </button>
  )
}
