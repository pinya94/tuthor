import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import CoinsAnimation from '../components/CoinsAnimation'
import { POOLS } from '../data/trayectoriaLevels'
import {
  VIEW, W, H, ANIM_DURATION,
  toSVG, GridLines, Goal, Barrier, Ball, FnCurve,
  OPT_COLORS, computeOptionColors, StartingBalls,
} from './TrayectoriaField'

// ── Power-up pool ─────────────────────────────────────────────────────────────

const POWERUP_POOL = [
  {
    id: 'wider_goal',
    emoji: '🥅',
    label: { es: 'Portería más grande', en: 'Bigger goal', ca: 'Porteria més gran' },
    desc: { es: '+1 unidad en la portería', en: '+1 unit to the goal', ca: '+1 unitat a la porteria' },
  },
  {
    id: 'remove_barrier',
    emoji: '🚫',
    label: { es: 'Quitar un defensor', en: 'Remove a defender', ca: 'Treure un defensor' },
    desc: { es: 'Elimina el defensor más incómodo', en: 'Removes the most annoying defender', ca: 'Elimina el defensor més molest' },
  },
  {
    id: 'extra_time',
    emoji: '⏱️',
    label: { es: '+5 segundos', en: '+5 seconds', ca: '+5 segons' },
    desc: { es: 'Un poco más de tiempo', en: 'A little extra time', ca: 'Una mica més de temps' },
  },
  {
    id: 'extra_time_big',
    emoji: '⏰',
    label: { es: '+10 segundos', en: '+10 seconds', ca: '+10 segons' },
    desc: { es: 'Tiempo extra para marcar más', en: 'Extra time to score more', ca: 'Temps extra per marcar més' },
  },
  {
    id: 'remove_2',
    emoji: '🛡️',
    label: { es: 'Quitar 2 defensores', en: 'Remove 2 defenders', ca: 'Treure 2 defensors' },
    desc: { es: 'Despeja el camino a portería', en: 'Clear the path to goal', ca: 'Neteja el camí a porteria' },
  },
  {
    id: 'fewer_options',
    emoji: '🎯',
    label: { es: 'Menos opciones', en: 'Fewer options', ca: 'Menys opcions' },
    desc: { es: 'Solo 2 opciones en la siguiente pregunta', en: 'Only 2 choices next question', ca: 'Només 2 opcions a la pròxima pregunta' },
  },
]

// Generate a random extra barrier in the playable zone between startX and goalX
function randomBarrier(startX, goalX) {
  const x = startX + 1 + Math.random() * Math.max(0.5, goalX - startX - 2)
  const y = Math.round((Math.random() * 6 - 3) * 2) / 2  // -3..3 in 0.5 steps
  return { x: Math.round(x * 2) / 2, y }
}

function pickPowerups() {
  const shuffled = [...POWERUP_POOL].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 3)
}

// ── Difficulty selector ───────────────────────────────────────────────────────

function DifficultyScreen({ onSelect, l }) {
  const options = [
    {
      id: 'easy',
      emoji: '🟢',
      label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
      desc: { es: 'Rectas simples · Solo pendiente', en: 'Simple lines · Slope only', ca: 'Rectes simples · Només pendent' },
    },
    {
      id: 'medium',
      emoji: '🟡',
      label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
      desc: { es: 'Rectas con pendiente y corte', en: 'Lines with slope & intercept', ca: 'Rectes amb pendent i tall' },
    },
    {
      id: 'hard',
      emoji: '🔴',
      label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
      desc: { es: 'Parábolas, hipérbolas y funciones a trozos', en: 'Parabolas, hyperbolas & piecewise', ca: 'Paràboles, hipèrboles i funcions a trossos' },
    },
  ]
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <p className="text-white/40 text-xs uppercase tracking-widest mb-2">
        {l === 'es' ? 'Matemáticas · Funciones' : l === 'en' ? 'Maths · Functions' : 'Matemàtiques · Funcions'}
      </p>
      <h1 className="text-3xl font-black text-white mb-1">⚽ Trayectoria</h1>
      <p className="text-white/40 text-sm mb-8 text-center max-w-xs">
        {l === 'es' ? '90 segundos para marcar el máximo de goles · Elige la función correcta'
          : l === 'en' ? '90 seconds to score as many goals as possible · Pick the right function'
          : '90 segons per marcar el màxim de gols · Tria la funció correcta'}
      </p>
      <div className="flex flex-col gap-3 w-full max-w-sm">
        {options.map(opt => (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-left"
          >
            <span className="text-2xl">{opt.emoji}</span>
            <div>
              <p className="font-bold text-white text-base">{opt.label[l] ?? opt.label.es}</p>
              <p className="text-white/40 text-xs mt-0.5">{opt.desc[l] ?? opt.desc.es}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Power-up choice screen ────────────────────────────────────────────────────

function PowerupScreen({ powerups, onPick, l }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-sm z-20 rounded-xl">
      <p className="text-2xl mb-1">⚽</p>
      <p className="text-green-400 font-black text-xl mb-1">
        {l === 'es' ? '¡GOL!' : l === 'en' ? 'GOAL!' : 'GOL!'}
      </p>
      <p className="text-white/60 text-sm mb-4">
        {l === 'es' ? 'Elige una ventaja' : l === 'en' ? 'Choose a power-up' : 'Tria un avantatge'}
      </p>
      <div className="flex flex-col gap-2 w-full max-w-xs px-4">
        {powerups.map(pw => (
          <button
            key={pw.id}
            onClick={() => onPick(pw)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 hover:bg-[#EDAE49]/20 border border-white/10 hover:border-[#EDAE49]/50 transition-all text-left"
          >
            <span className="text-xl">{pw.emoji}</span>
            <div>
              <p className="font-bold text-white text-sm">{pw.label[l] ?? pw.label.es}</p>
              <p className="text-white/50 text-xs">{pw.desc[l] ?? pw.desc.es}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── End screen ────────────────────────────────────────────────────────────────

function EndScreen({ score, difficulty, onRestart, onChangeDiff, l }) {
  const msgs = {
    es: score === 0 ? '¡A practicar más!' : score < 3 ? 'Buen intento' : score < 6 ? '¡Buen partido!' : '¡Hat-trick de hat-tricks! 🔥',
    en: score === 0 ? 'Keep practising!' : score < 3 ? 'Good try' : score < 6 ? 'Good game!' : 'Hat-trick of hat-tricks! 🔥',
    ca: score === 0 ? 'A practicar!' : score < 3 ? 'Bon intent' : score < 6 ? 'Bon partit!' : 'Hat-trick de hat-tricks! 🔥',
  }
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <p className="text-6xl mb-3">⚽</p>
      <p className="text-white/40 text-sm mb-1">
        {l === 'es' ? 'Partido finalizado' : l === 'en' ? 'Full time' : 'Partit finalitzat'}
      </p>
      <p className="text-5xl font-black text-white mb-1">{score}</p>
      <p className="text-white/60 text-lg mb-2">
        {l === 'es' ? 'goles' : l === 'en' ? 'goals' : 'gols'}
      </p>
      <p className="text-[#EDAE49] font-bold mb-8">{msgs[l]}</p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={onRestart}
          className="px-6 py-3 rounded-full bg-[#EDAE49] text-black font-bold hover:bg-[#f5c16c] transition-colors"
        >
          {l === 'es' ? '▶ Jugar de nuevo' : l === 'en' ? '▶ Play again' : '▶ Jugar de nou'}
        </button>
        <button
          onClick={onChangeDiff}
          className="px-6 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors"
        >
          {l === 'es' ? 'Cambiar dificultad' : l === 'en' ? 'Change difficulty' : 'Canviar dificultat'}
        </button>
      </div>
    </div>
  )
}

// ── Main game ─────────────────────────────────────────────────────────────────

const GAME_TIME = 90

export default function Trayectoria() {
  const { lang } = useLang()
  const { user } = useAuth()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'

  const [screen, setScreen] = useState('difficulty') // difficulty | playing | end
  const [difficulty, setDifficulty] = useState(null)

  // game state
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [score, setScore] = useState(0)
  const [question, setQuestion] = useState(null)
  const [barriers, setBarriers] = useState([])
  const [goal, setGoal] = useState(null)
  const [usedIds, setUsedIds] = useState([])

  // shot state
  const [phase, setPhase] = useState('choose') // choose | animating | result | powerup
  const [selected, setSelected] = useState(null)
  const [ballPos, setBallPos] = useState(null)
  const [trail, setTrail] = useState([])
  const [outcome, setOutcome] = useState(null)
  const [chosenFn, setChosenFn] = useState(null)
  const [pendingPowerups, setPendingPowerups] = useState(null)
  const [displayedIndices, setDisplayedIndices] = useState([0, 1, 2, 3])

  const animRef = useRef(null)
  const timerRef = useRef(null)
  const phaseRef = useRef('choose')

  function t(obj) { return obj?.[l] ?? obj?.es ?? '' }

  // accumulated goal expansion from power-ups (carries across questions)
  const goalExpandRef = useRef(0)
  // extra barriers that accumulate each round — cleared on new game
  const accBarriersRef = useRef([])
  // next question shows only 2 options (fewer_options power-up)
  const fewOptionsRef = useRef(false)

  // Each round: add 1 random barrier, then apply barrierReduce to the full combined pool
  const nextQuestion = useCallback((diff, prevUsed, barrierReduce, goalExpand) => {
    const pool = POOLS[diff]
    const available = pool.filter(q => !prevUsed.includes(q.id))
    const src = available.length > 0 ? available : pool
    const q = src[Math.floor(Math.random() * src.length)]
    const newUsed = available.length > 0 ? [...prevUsed, q.id] : [q.id]
    setUsedIds(newUsed)
    setQuestion(q)

    // Add 1 new random defender to the accumulated pool
    const newBarrier = randomBarrier(q.startX, q.goal.x)
    const combined = [...q.barriers, ...accBarriersRef.current, newBarrier]

    // Apply reduction from the end of combined (accumulated are last, so they go first)
    const trimmed = barrierReduce > 0
      ? combined.slice(0, Math.max(0, combined.length - barrierReduce))
      : combined

    // Persist whatever is beyond the question's base barriers
    accBarriersRef.current = trimmed.slice(q.barriers.length)
    setBarriers(trimmed)

    // Apply goal expansion
    const newGoal = { ...q.goal }
    if (goalExpand) {
      newGoal.yMin = Math.max(VIEW.yMin + 0.5, newGoal.yMin - goalExpand)
      newGoal.yMax = Math.min(VIEW.yMax - 0.5, newGoal.yMax + goalExpand)
    }
    setGoal(newGoal)

    // fewer_options: show correct + 1 random wrong, then reset
    if (fewOptionsRef.current) {
      const wrongs = q.options.map((_, i) => i).filter(i => i !== q.correctIndex)
      const wrongIdx = wrongs[Math.floor(Math.random() * wrongs.length)]
      setDisplayedIndices([q.correctIndex, wrongIdx].sort(() => Math.random() - 0.5))
      fewOptionsRef.current = false
    } else {
      setDisplayedIndices(q.options.map((_, i) => i))
    }

    setPhase('choose')
    setSelected(null)
    setBallPos(null)
    setTrail([])
    setOutcome(null)
    setChosenFn(null)
    if (animRef.current) cancelAnimationFrame(animRef.current)
  }, [])

  function startGame(diff) {
    setDifficulty(diff)
    setScreen('playing')
    setScore(0)
    setTimeLeft(GAME_TIME)
    setUsedIds([])
    goalExpandRef.current = 0
    accBarriersRef.current = []
    fewOptionsRef.current = false
    setDisplayedIndices([0, 1, 2, 3])
    nextQuestion(diff, [], 0, null)
  }
  const scoreRef = useRef(0)
  const timeLeftRef = useRef(GAME_TIME)

  // keep refs in sync for reading in effects after state updates
  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { timeLeftRef.current = timeLeft }, [timeLeft])

  // save activity and show coins when game ends
  useEffect(() => {
    if (screen !== 'end') return
    const pts = scoreRef.current * 10
    if (user?.uid) {
      saveActivity(user.uid, {
        type: 'juego',
        game: 'trayectoria',
        category: 'matematicas',
        score: pts,
        passed: scoreRef.current > 0,
        timeSpent: GAME_TIME - timeLeftRef.current,
      }).catch(() => {})
    }
  }, [screen, user])

  // keep phaseRef in sync so timer can read it without re-creating the interval
  useEffect(() => { phaseRef.current = phase }, [phase])

  // timer — pauses during powerup selection
  useEffect(() => {
    if (screen !== 'playing') return
    timerRef.current = setInterval(() => {
      if (phaseRef.current === 'powerup') return  // frozen while player chooses
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current)
          setScreen('end')
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [screen])

  function shoot(optIdx) {
    if (phase !== 'choose' || !question) return
    setSelected(optIdx)
    setPhase('animating')

    const fn = question.options[optIdx].fn
    setChosenFn(() => fn)

    const startX = question.startX
    const goalX = goal.x
    const endX = goalX + 0.5
    const start = Date.now()
    const trailPoints = []

    // Seed trail from the actual function start so the ball appears at fn(startX)
    let initY
    try { initY = fn(startX) } catch { initY = null }
    if (initY !== null && isFinite(initY)) {
      trailPoints.push(toSVG(startX, initY))
    }

    function animate() {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / ANIM_DURATION, 1)
      const x = startX + progress * (endX - startX)
      let y
      try { y = fn(x) } catch { y = null }

      const inView = y !== null && isFinite(y) && y >= VIEW.yMin - 0.5 && y <= VIEW.yMax + 0.5

      if (inView) {
        const [px, py] = toSVG(x, y)
        trailPoints.push([px, py])
        setBallPos([x, y])
        setTrail([...trailPoints].slice(-50))
      } else {
        // out of view — advance x without drawing, ball disappears off edge
        setBallPos([x, y])
      }

      // collision check
      if (inView) {
        const hit = (barriers || []).find(b => Math.abs(b.x - x) < 0.35 && Math.abs(b.y - y) < 0.7)
        if (hit) {
          if (animRef.current) cancelAnimationFrame(animRef.current)
          setTimeout(() => doFinish('collision'), 700)
          return
        }
      }

      // goal check when crossing goal x
      if (x >= goalX - 0.15) {
        let yAtGoal
        try { yAtGoal = fn(goalX) } catch { yAtGoal = null }
        doFinish(
          yAtGoal !== null && isFinite(yAtGoal) && yAtGoal >= goal.yMin && yAtGoal <= goal.yMax
            ? 'goal' : 'miss'
        )
        return
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        doFinish('miss')
      }
    }

    animRef.current = requestAnimationFrame(animate)
  }

  function doFinish(result) {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    setOutcome(result)
    setPhase('result')
    if (result === 'goal') {
      setScore(s => s + 1)
      // small delay then show powerup
      setTimeout(() => {
        setPendingPowerups(pickPowerups())
        setPhase('powerup')
      }, 900)
    }
  }

  function applyPowerup(pw) {
    setPendingPowerups(null)
    let barrierReduce = 0

    if (pw.id === 'wider_goal') {
      goalExpandRef.current = (goalExpandRef.current || 0) + 0.4
    } else if (pw.id === 'remove_barrier') {
      barrierReduce = 1
    } else if (pw.id === 'remove_2') {
      barrierReduce = 2
    } else if (pw.id === 'extra_time') {
      setTimeLeft(t => Math.min(t + 5, 999))
    } else if (pw.id === 'extra_time_big') {
      setTimeLeft(t => Math.min(t + 10, 999))
    } else if (pw.id === 'fewer_options') {
      fewOptionsRef.current = true
    }

    nextQuestion(difficulty, usedIds, barrierReduce, goalExpandRef.current || null)
  }

  function skipResult() {
    nextQuestion(difficulty, usedIds, 0, goalExpandRef.current || null)
  }

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  // ── screens ──

  if (screen === 'difficulty') {
    return <DifficultyScreen onSelect={startGame} l={l} />
  }

  if (screen === 'end') {
    return (
      <>
        <EndScreen
          score={score}
          difficulty={difficulty}
          l={l}
          onRestart={() => startGame(difficulty)}
          onChangeDiff={() => setScreen('difficulty')}
        />
        {score > 0 && <CoinsAnimation points={score * 10} />}
      </>
    )
  }

  if (!question) return null

  const correctFn = question.options[question.correctIndex].fn
  const timerPct = timeLeft / GAME_TIME
  const optColors = computeOptionColors(question)
  const timerColor = timeLeft > 30 ? '#22c55e' : timeLeft > 10 ? '#f59e0b' : '#ef4444'

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-4">
      {/* Header */}
      <div className="w-full max-w-[440px] flex items-center justify-between mb-3">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">⚽ Trayectoria</p>
          <p className="text-white font-bold text-lg">{score} {l === 'es' ? 'goles' : l === 'en' ? 'goals' : 'gols'}</p>
        </div>
        {/* Timer circle */}
        <div className="relative w-14 h-14">
          <svg className="absolute inset-0" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="none" stroke="#ffffff15" strokeWidth="4" />
            <circle cx="28" cy="28" r="24" fill="none" stroke={timerColor} strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 24}`}
              strokeDashoffset={`${2 * Math.PI * 24 * (1 - timerPct)}`}
              strokeLinecap="round"
              style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-black text-sm" style={{ color: timerColor }}>{timeLeft}</span>
          </div>
        </div>
      </div>

      {/* SVG Field */}
      <div className="relative w-full max-w-[440px] rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] mb-3">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
          <GridLines />
          {/* trajectory curves — only shown AFTER animation completes */}
          {(phase === 'result' || phase === 'powerup') && chosenFn && <FnCurve fn={chosenFn} color="#EDAE4970" xStart={question.startX} xEnd={goal.x + 0.5} />}
          {phase === 'result' && outcome !== 'goal' && <FnCurve fn={correctFn} color="#22c55e50" xStart={question.startX} xEnd={goal.x + 0.5} />}
          {goal && <Goal goal={goal} />}
          {(barriers || []).map((b, i) => <Barrier key={i} {...b} />)}
          {phase === 'choose' && question && <StartingBalls question={question} optColors={optColors} />}
          {ballPos && <Ball x={ballPos[0]} y={ballPos[1]} trail={trail} />}
        </svg>

        {/* miss/collision result overlay */}
        {phase === 'result' && outcome !== 'goal' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 backdrop-blur-sm">
            <p className="text-4xl mb-2">{outcome === 'collision' ? '🧍' : '❌'}</p>
            <p className="text-red-400 font-black text-xl mb-3">
              {outcome === 'collision'
                ? (l === 'es' ? '¡Chocaste!' : l === 'en' ? 'Collision!' : 'Col·lisió!')
                : (l === 'es' ? '¡Fuera!' : l === 'en' ? 'Miss!' : 'Fora!')}
            </p>
            <p className="text-white/70 text-sm text-center max-w-xs px-4 mb-4">
              {t(question.explanation[outcome])}
            </p>
            <button onClick={skipResult}
              className="px-5 py-2 rounded-full bg-[#EDAE49] text-black font-bold text-sm hover:bg-[#f5c16c] transition-colors">
              {l === 'es' ? 'Siguiente →' : l === 'en' ? 'Next →' : 'Següent →'}
            </button>
          </div>
        )}

        {/* goal + powerup overlay */}
        {phase === 'powerup' && pendingPowerups && (
          <PowerupScreen powerups={pendingPowerups} onPick={applyPowerup} l={l} />
        )}
      </div>

      {/* Options */}
      <div className="w-full max-w-[440px]">
        <p className="text-white/50 text-xs text-center mb-2">
          {l === 'es' ? '¿Cuál función mete el balón en la portería?' : l === 'en' ? 'Which function scores the goal?' : 'Quina funció marca el gol?'}
        </p>
        <div className="grid grid-cols-1 gap-2">
          {displayedIndices.map((i) => {
            const opt = question.options[i]
            const isCorrect = i === question.correctIndex
            const isChosen = selected === i
            let bg = 'bg-white/5 hover:bg-white/10 border-white/10'
            if (phase === 'result' || phase === 'powerup') {
              if (isCorrect) bg = 'bg-green-500/20 border-green-500'
              else if (isChosen) bg = 'bg-red-500/20 border-red-500'
              else bg = 'bg-white/5 border-white/10 opacity-40'
            } else if (isChosen) {
              bg = 'bg-amber-500/20 border-amber-500'
            }
            return (
              <button key={i} onClick={() => shoot(i)}
                disabled={phase !== 'choose'}
                className={`w-full text-left px-4 py-3 rounded-xl border font-mono text-sm text-white transition-all flex items-center gap-3 ${bg}`}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-black flex-shrink-0"
                  style={{ background: optColors[i] }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
