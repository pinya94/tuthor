import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getEventosLineaTemporal } from '../data/historiaEvents'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'

const MAX_LIVES = 3

function formatYear(y) {
  if (y < 0) return `${Math.abs(y)} a.C.`
  return `${y} d.C.`
}

// ── INTRO ──────────────────────────────────────────────────────────────────────
function Intro({ onStart }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <span className="text-6xl mb-4 block">📜</span>
          <h1 className="text-3xl font-black text-white mb-2">Línea Temporal</h1>
          <p className="text-white/50 text-sm">Ordena la historia</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 space-y-4">
          <div className="flex items-start gap-4">
            <span className="text-2xl mt-0.5">🃏</span>
            <div>
              <p className="font-bold text-white text-sm">Coloca la carta en el sitio correcto</p>
              <p className="text-white/50 text-xs mt-0.5">Te aparece un evento histórico con el año oculto. Arrástralo antes o después de los que ya tienes.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl mt-0.5">❤️</span>
            <div>
              <p className="font-bold text-white text-sm">3 vidas — úsalas bien</p>
              <p className="text-white/50 text-xs mt-0.5">Cada error te cuesta una vida. El año se revela tras tu respuesta para que aprendas.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl mt-0.5">📈</span>
            <div>
              <p className="font-bold text-white text-sm">La línea crece con cada acierto</p>
              <p className="text-white/50 text-xs mt-0.5">Cuantas más cartas coloques correctamente, más puntos. La dificultad aumenta.</p>
            </div>
          </div>
        </div>

        <button
          onClick={onStart}
          className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-colors text-lg"
        >
          Empezar →
        </button>
      </div>
    </div>
  )
}

// ── GAME OVER ──────────────────────────────────────────────────────────────────
function GameOver({ score, placed, total, onRepetir, onSalir }) {
  let nota, notaColor
  if (placed >= 20) { nota = 'HISTORIADOR EXPERTO'; notaColor = 'text-violet-400' }
  else if (placed >= 12) { nota = 'BUEN NIVEL'; notaColor = 'text-blue-400' }
  else if (placed >= 6) { nota = 'EN PROGRESO'; notaColor = 'text-amber-400' }
  else { nota = 'SIGUE PRACTICANDO'; notaColor = 'text-white/60' }

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-6">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Partida terminada</p>
          <h1 className={`text-3xl font-black mb-1 ${notaColor}`}>{nota}</h1>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { val: score, label: 'Puntos', emoji: '⭐' },
            { val: placed, label: 'Colocadas', emoji: '✅' },
            { val: total - placed, label: 'Pendientes', emoji: '🃏' },
          ].map(s => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
              <span className="text-lg block mb-1">{s.emoji}</span>
              <p className="text-xl font-black text-white">{s.val}</p>
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

// ── CARD ────────────────────────────────────────────────────────────────────────
function EventCard({ evento, yearVisible, highlight }) {
  const difColor = {
    fácil: 'text-green-400',
    medio: 'text-amber-400',
    difícil: 'text-red-400',
  }
  return (
    <div className={`rounded-xl border p-3 text-left transition-all duration-300 ${
      highlight === 'correct' ? 'border-green-500/60 bg-green-500/10' :
      highlight === 'wrong'   ? 'border-red-500/60 bg-red-500/10' :
      'border-white/20 bg-white/5'
    }`}>
      <p className="font-bold text-white text-sm leading-tight mb-1">{evento.nombre}</p>
      <p className="text-white/40 text-xs leading-relaxed line-clamp-2">{evento.descripcion}</p>
      <div className="flex items-center justify-between mt-2">
        <span className={`text-xs font-semibold ${difColor[evento.dificultad]}`}>{evento.dificultad}</span>
        <span className={`text-sm font-black transition-all ${yearVisible ? 'text-amber-400' : 'text-white/20'}`}>
          {yearVisible ? formatYear(evento.año) : '????'}
        </span>
      </div>
    </div>
  )
}

// ── MAIN ────────────────────────────────────────────────────────────────────────
export default function OrdenTemporal() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [fase, setFase] = useState('intro')
  const [timeline, setTimeline] = useState([])   // eventos colocados correctamente, ordenados por año
  const [pending, setPending] = useState([])      // cartas pendientes de colocar
  const [current, setCurrent] = useState(null)   // carta actual a colocar
  const [lives, setLives] = useState(MAX_LIVES)
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState('placing')  // placing | revealing
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
    const first = all[0]
    const rest = all.slice(1)
    setTimeline([first])
    setPending(rest.slice(1))
    setCurrent(rest[0])
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
      newTimeline.sort((a, b) => a.año - b.año)
      setTimeline(newTimeline)
      newScore = score + Math.max(5, 15 - timeline.length)
      setScore(newScore)
    } else {
      newLives = lives - 1
      setLives(newLives)
    }

    setTimeout(() => {
      if (newLives <= 0) {
        endGame(newScore, ok ? newTimeline.length : timeline.length)
        return
      }
      if (pending.length === 0) {
        endGame(newScore, ok ? newTimeline.length : timeline.length)
        return
      }
      setCurrent(pending[0])
      setPending(p => p.slice(1))
      setPhase('placing')
      setChosenSlot(null)
      setCorrectSlot(null)
      setWasCorrect(null)

      // Scroll timeline al final
      setTimeout(() => {
        timelineRef.current?.scrollTo({ left: timelineRef.current.scrollWidth, behavior: 'smooth' })
      }, 100)
    }, 2000)
  }

  function endGame(finalScore, placedCount) {
    const timeSpent = startTimeRef.current ? Math.round((Date.now() - startTimeRef.current) / 1000) : 0
    if (user) {
      saveActivity(user.uid, {
        type: 'juego',
        game: 'orden-temporal',
        score: finalScore,
        passed: placedCount >= 8,
        timeSpent,
      }).catch(() => {})
    }
    setFase('gameover')
  }

  if (fase === 'intro') {
    return <div className="relative z-10"><Intro onStart={startGame} /></div>
  }

  if (fase === 'gameover') {
    const total = timeline.length + pending.length + (current ? 1 : 0)
    return (
      <div className="relative z-10">
        <GameOver
          score={score}
          placed={timeline.length}
          total={total}
          onRepetir={startGame}
          onSalir={() => navigate('/juegos')}
        />
      </div>
    )
  }

  // ── FASE JUGANDO ─────────────────────────────────────────────────────────────
  const totalCards = timeline.length + pending.length + 1
  const progress = Math.round((timeline.length / totalCards) * 100)

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)]">

      {/* Header */}
      <div className="px-4 sm:px-6 pt-4 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: MAX_LIVES }).map((_, i) => (
            <span key={i} className={`text-lg transition-all ${i < lives ? 'opacity-100' : 'opacity-20 grayscale'}`}>❤️</span>
          ))}
        </div>
        <div className="text-center">
          <p className="text-white font-black text-lg">{score} pts</p>
          <p className="text-white/30 text-xs">{timeline.length} colocadas</p>
        </div>
        <div className="text-right">
          <p className="text-white/40 text-xs">{pending.length + 1} restantes</p>
          <div className="w-16 h-1.5 bg-white/10 rounded-full mt-1 overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Carta actual */}
      <div className="px-4 sm:px-6 py-3">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-2 text-center">
          {phase === 'placing' ? '¿Dónde va esta carta?' : wasCorrect ? '✓ ¡Correcto!' : '✗ Incorrecto'}
        </p>
        {current && (
          <div className={`transition-all duration-300 ${phase === 'revealing' ? 'scale-[1.02]' : ''}`}>
            <EventCard
              evento={current}
              yearVisible={phase === 'revealing'}
              highlight={phase === 'revealing' ? (wasCorrect ? 'correct' : 'wrong') : null}
            />
          </div>
        )}
      </div>

      {/* Línea del tiempo */}
      <div className="flex-1 px-2 pb-4">
        <p className="text-white/30 text-xs uppercase tracking-widest mb-3 px-2">Tu línea del tiempo</p>

        <div
          ref={timelineRef}
          className="overflow-x-auto pb-2"
          style={{ scrollbarWidth: 'none' }}
        >
          <div className="flex items-stretch gap-0 px-2" style={{ minWidth: 'max-content' }}>

            {/* Slot antes de todo */}
            <SlotButton
              index={0}
              phase={phase}
              chosenSlot={chosenSlot}
              correctSlot={correctSlot}
              onPlace={placeCard}
            />

            {timeline.map((ev, i) => (
              <div key={ev.id} className="flex items-stretch gap-0">
                {/* Carta de la línea */}
                <div className="flex flex-col items-center justify-center w-28 mx-0.5">
                  <div className="bg-white/8 border border-white/15 rounded-lg p-2 w-full">
                    <p className="text-white text-xs font-bold leading-tight truncate">{ev.nombre}</p>
                    <p className="text-amber-400 text-xs font-black mt-1">{formatYear(ev.año)}</p>
                  </div>
                  {/* Línea conectora */}
                  <div className="w-px h-2 bg-white/10" />
                </div>

                {/* Slot después de esta carta */}
                <SlotButton
                  index={i + 1}
                  phase={phase}
                  chosenSlot={chosenSlot}
                  correctSlot={correctSlot}
                  onPlace={placeCard}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Hint si es revelando y era incorrecto */}
        {phase === 'revealing' && !wasCorrect && (
          <p className="text-center text-red-400/80 text-xs mt-2 px-4">
            Debía ir en la posición {correctSlot + 1} de {timeline.length + 1} — era {formatYear(current?.año)}
          </p>
        )}
      </div>
    </div>
  )
}

function SlotButton({ index, phase, chosenSlot, correctSlot, onPlace }) {
  const isChosen = phase === 'revealing' && chosenSlot === index
  const isCorrect = phase === 'revealing' && correctSlot === index
  const isActive = phase === 'placing'

  let style = 'border-white/15 bg-white/5 text-white/30 hover:border-amber-400/60 hover:bg-amber-500/10 hover:text-amber-400'
  if (isChosen && isCorrect) style = 'border-green-500/60 bg-green-500/20 text-green-400'
  else if (isChosen && !isCorrect) style = 'border-red-500/60 bg-red-500/20 text-red-400'
  else if (!isChosen && isCorrect) style = 'border-green-500/40 bg-green-500/10 text-green-400 animate-pulse'

  return (
    <button
      onClick={() => isActive && onPlace(index)}
      disabled={!isActive}
      className={`flex-shrink-0 w-8 self-stretch flex items-center justify-center border rounded-lg text-lg font-bold transition-all duration-200 mx-0.5 ${style} ${isActive ? 'cursor-pointer' : 'cursor-default'}`}
    >
      {isChosen && isCorrect ? '✓' : isChosen && !isCorrect ? '✗' : !isChosen && isCorrect ? '↑' : '+'}
    </button>
  )
}
