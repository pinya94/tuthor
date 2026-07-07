import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { saveActivity, saveDailyChallenge } from '../lib/activity'
import GameResultFooter from '../components/GameResultFooter'
import CoinsAnimation from '../components/CoinsAnimation'
import { getQuestionsForPool } from '../data/palabrasIntrusas'

// Time per question (seconds) and questions per game per level
const NIVELES = [
  { id: 'facil',   label: 'Fácil',   labelEn: 'Easy',   labelCa: 'Fàcil',   emoji: '🟢',
    tiempo: 12, preguntas: 15, desc: '12 seg · +10 / −15 pts', descEn: '12 sec · +10 / −15 pts', descCa: '12 seg · +10 / −15 pts' },
  { id: 'medio',   label: 'Medio',   labelEn: 'Medium', labelCa: 'Mitjà',   emoji: '🟡',
    tiempo: 8,  preguntas: 15, desc: '8 seg · +10 / −15 pts',  descEn: '8 sec · +10 / −15 pts',  descCa: '8 seg · +10 / −15 pts'  },
  { id: 'dificil', label: 'Difícil', labelEn: 'Hard',   labelCa: 'Difícil', emoji: '🔴',
    tiempo: 5,  preguntas: 15, desc: '5 seg · +10 / −15 pts',  descEn: '5 sec · +10 / −15 pts',  descCa: '5 seg · +10 / −15 pts'  },
]

const POINTS_CORRECT = 10
const POINTS_WRONG   = 15   // subtracted

function dayOfYear() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  return Math.floor((now - start) / 86400000)
}

function getNivelCfg(id) { return NIVELES.find(n => n.id === id) ?? NIVELES[0] }

// Flash overlay when picking an answer
function PickFlash({ correct }) {
  return (
    <div
      className={`fixed inset-0 z-40 pointer-events-none transition-opacity duration-300 ${correct ? 'bg-green-500/20' : 'bg-red-500/20'}`}
    />
  )
}

// Floating score delta that appears when picking
function ScoreDelta({ delta, key: k }) {
  return (
    <div
      key={k}
      className={`fixed top-1/3 left-1/2 -translate-x-1/2 z-50 font-black text-3xl pointer-events-none select-none
        animate-[fadeUpOut_0.9s_ease-out_forwards]
        ${delta > 0 ? 'text-green-400' : 'text-red-400'}`}
      style={{ textShadow: '0 0 20px currentColor' }}
    >
      {delta > 0 ? `+${delta}` : delta}
    </div>
  )
}

export default function ElIntruso() {
  const { user } = useAuth()
  const { lang, localPath } = useLang()
  const navigate = useNavigate()
  const location = useLocation()
  const en = lang === 'en'
  const ca = lang === 'ca'

  const dailyState  = location.state?.modoDaily ? location.state : null
  const dailyNivel  = dailyState?.nivel ?? null

  const [screen, setScreen]         = useState(dailyNivel ? 'playing' : 'select')
  const [nivel, setNivel]           = useState(dailyNivel ?? 'facil')
  const [questions, setQuestions]   = useState([])
  const [current, setCurrent]       = useState(0)
  const [score, setScore]           = useState(0)
  const [correctCount, setCorrect]  = useState(0)
  const [wrongCount, setWrong]      = useState(0)
  const [streak, setStreak]         = useState(0)
  const [timeLeft, setTimeLeft]     = useState(0)
  const [picked, setPicked]         = useState(null)
  const [flash, setFlash]           = useState(null)   // 'correct' | 'wrong' | null
  const [delta, setDelta]           = useState(null)   // { v, id }
  const [saved, setSaved]           = useState(false)
  const [showCoins, setShowCoins]   = useState(false)

  // Refs so timeouts/intervals can read latest values without stale closures
  const scoreRef   = useRef(0)
  const correctRef = useRef(0)
  const wrongRef   = useRef(0)
  const timerRef   = useRef(null)
  const pickedRef  = useRef(false)

  const t = useCallback((es, ca_t, en_t) => ca ? ca_t : en ? en_t : es, [ca, en])

  function clearTimer() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }

  function startTimer(seconds, onExpire) {
    clearTimer()
    setTimeLeft(seconds)
    const start = Date.now()
    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000
      const left = Math.max(0, seconds - elapsed)
      setTimeLeft(left)
      if (left === 0) { clearTimer(); onExpire() }
    }, 50)
  }

  function advanceOrEnd(qList, idx, niv) {
    const cfg = getNivelCfg(niv)
    if (idx + 1 >= qList.length) {
      // Save and go to result
      if (user && !saved) {
        setSaved(true)
        const finalScore   = scoreRef.current
        const finalCorrect = correctRef.current
        saveActivity({
          game: 'intruso',
          userName: user.displayName || 'Jugador',
          userPhoto: user.photoURL || null,
          score: finalScore,
          meta: { nivel: niv, correct: finalCorrect, wrong: wrongRef.current, total: qList.length },
        }).catch(() => {})
        if (dailyNivel) {
          saveDailyChallenge(user.uid, finalCorrect >= Math.ceil(qList.length / 2)).catch(() => {})
        }
      }
      setShowCoins(scoreRef.current > 0)
      setScreen('result')
    } else {
      const next = idx + 1
      setCurrent(next)
      setPicked(null)
      pickedRef.current = false
      startTimer(cfg.tiempo, () => handleExpire(qList, next, niv))
    }
  }

  function handleExpire(qList, idx, niv) {
    if (pickedRef.current) return
    pickedRef.current = true
    const q = qList[idx]
    setPicked('__timeout__')
    const newScore = Math.max(0, scoreRef.current - POINTS_WRONG)
    scoreRef.current = newScore
    setScore(newScore)
    wrongRef.current += 1
    setWrong(w => w + 1)
    setStreak(0)
    setFlash('wrong')
    setDelta({ v: -POINTS_WRONG, id: Date.now() })
    setTimeout(() => { setFlash(null); setDelta(null); advanceOrEnd(qList, idx, niv) }, 1000)
  }

  function handlePick(word, qList, idx, niv) {
    if (pickedRef.current) return
    pickedRef.current = true
    clearTimer()
    const q = qList[idx]
    const correct = word === q.o
    setPicked(word)
    if (correct) {
      const newScore = scoreRef.current + POINTS_CORRECT
      scoreRef.current = newScore
      setScore(newScore)
      correctRef.current += 1
      setCorrect(c => c + 1)
      setStreak(s => s + 1)
      setFlash('correct')
      setDelta({ v: +POINTS_CORRECT, id: Date.now() })
    } else {
      const newScore = Math.max(0, scoreRef.current - POINTS_WRONG)
      scoreRef.current = newScore
      setScore(newScore)
      wrongRef.current += 1
      setWrong(w => w + 1)
      setStreak(0)
      setFlash('wrong')
      setDelta({ v: -POINTS_WRONG, id: Date.now() })
    }
    setTimeout(() => { setFlash(null); setDelta(null); advanceOrEnd(qList, idx, niv) }, 1200)
  }

  function startGame(nv) {
    const cfg = getNivelCfg(nv)
    const pool = dailyNivel
      ? getQuestionsForPool(lang, nv, cfg.preguntas, dayOfYear())
      : getQuestionsForPool(lang, nv, cfg.preguntas)
    // Reset refs
    scoreRef.current   = 0
    correctRef.current = 0
    wrongRef.current   = 0
    pickedRef.current  = false
    // Reset state
    setNivel(nv)
    setQuestions(pool)
    setCurrent(0)
    setScore(0)
    setCorrect(0)
    setWrong(0)
    setStreak(0)
    setPicked(null)
    setFlash(null)
    setDelta(null)
    setSaved(false)
    setShowCoins(false)
    setScreen('playing')
    startTimer(cfg.tiempo, () => handleExpire(pool, 0, nv))
  }

  useEffect(() => {
    if (dailyNivel) startGame(dailyNivel)
    return () => clearTimer()
  }, [])

  // Clean up timer on unmount
  useEffect(() => () => clearTimer(), [])

  const cfg = getNivelCfg(nivel)
  const q   = questions[current]
  const timeFraction = cfg.tiempo > 0 ? timeLeft / cfg.tiempo : 0
  const timerColor = timeFraction > 0.5 ? '#22c55e' : timeFraction > 0.25 ? '#f59e0b' : '#ef4444'

  /* ── Level select ───────────────────────────────────────── */
  if (screen === 'select') {
    return (
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <p className="text-5xl mb-3">🔍</p>
            <h1 className="text-3xl font-black text-white mb-2">{t('El Intruso', "L'Intrús", 'Odd One Out')}</h1>
            <p className="text-white/50 text-sm">
              {t('Cuatro palabras, una no encaja. ¡A contrarreloj!', "Quatre paraules, una no hi encaixa. A contrarellotge!", 'Four words, one does not fit. Beat the clock!')}
            </p>
          </div>
          <div className="space-y-3 mb-6">
            {NIVELES.map(nv => (
              <button
                key={nv.id}
                onClick={() => startGame(nv.id)}
                className="w-full flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-4 transition-all active:scale-[0.98] text-left"
              >
                <span className="text-2xl">{nv.emoji}</span>
                <div className="flex-1">
                  <p className="text-white font-bold">{ca ? nv.labelCa : en ? nv.labelEn : nv.label}</p>
                  <p className="text-white/40 text-xs">{ca ? nv.descCa : en ? nv.descEn : nv.desc}</p>
                </div>
                <span className="text-white/30 text-lg">→</span>
              </button>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center space-y-1">
            <p className="text-white/60 text-sm font-semibold">
              {t('Reglas', 'Regles', 'Rules')}
            </p>
            <p className="text-white/40 text-xs">{t('✅ Acierto: +10 pts', '✅ Encert: +10 pts', '✅ Correct: +10 pts')}</p>
            <p className="text-white/40 text-xs">{t('❌ Error o tiempo agotado: −15 pts', '❌ Error o temps esgotat: −15 pts', '❌ Wrong or time up: −15 pts')}</p>
            <p className="text-white/40 text-xs">{t('15 preguntas por partida', '15 preguntes per partida', '15 questions per game')}</p>
          </div>
        </div>
      </div>
    )
  }

  /* ── Playing ────────────────────────────────────────────── */
  if (screen === 'playing' && q) {
    const isTimeout = picked === '__timeout__'
    const isCorrect = !isTimeout && picked !== null && picked === q.o
    const isWrong   = !isTimeout && picked !== null && picked !== q.o

    return (
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
        {flash && <PickFlash correct={flash === 'correct'} />}
        {delta && <ScoreDelta delta={delta.v} key={delta.id} />}

        <div className="max-w-sm w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button onClick={() => { clearTimer(); setScreen('select') }} className="text-white/30 hover:text-white/60 text-sm transition-colors">
              ← {t('Salir', 'Sortir', 'Exit')}
            </button>
            <div className="flex items-center gap-3">
              <span className="text-white/40 text-sm">{current + 1}/{questions.length}</span>
              {streak >= 2 && (
                <span className="text-orange-400 font-bold text-sm">🔥 ×{streak}</span>
              )}
              <span className="text-amber-400 font-bold text-sm tabular-nums">💰 {score}</span>
            </div>
          </div>

          {/* Timer bar */}
          <div className="w-full bg-white/10 rounded-full h-2 mb-1 overflow-hidden">
            <div
              className="h-2 rounded-full transition-none"
              style={{ width: `${timeFraction * 100}%`, backgroundColor: timerColor }}
            />
          </div>
          <div className="flex justify-between mb-5">
            <span className="text-white/20 text-xs">{t('Tiempo', 'Temps', 'Time')}</span>
            <span className="text-xs font-bold tabular-nums" style={{ color: timerColor }}>{Math.ceil(timeLeft)}s</span>
          </div>

          {/* Question prompt */}
          <p className="text-center text-white/40 text-xs uppercase tracking-widest mb-4">
            {t('¿Cuál no encaja?', 'Quina no hi encaixa?', 'Which does not fit?')}
          </p>

          {/* Feedback bar */}
          {picked !== null && (
            <div className={`text-center text-sm font-bold py-2 px-4 rounded-xl mb-4 ${
              (isCorrect) ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {isTimeout
                ? t(`⏱ Tiempo! Era: ${q.o}`, `⏱ Temps! Era: ${q.o}`, `⏱ Time! It was: ${q.o}`)
                : isCorrect
                  ? t('🎉 ¡Correcto!', '🎉 Correcte!', '🎉 Correct!')
                  : t(`❌ Era: ${q.o}`, `❌ Era: ${q.o}`, `❌ It was: ${q.o}`)
              }
            </div>
          )}

          {/* Word buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {q.w.map(word => {
              let cls = 'bg-white/5 border-white/10 text-white hover:bg-violet-500/15 hover:border-violet-400/40 cursor-pointer'
              if (picked !== null) {
                if (word === q.o) {
                  cls = 'bg-green-500/20 border-green-500 text-green-300'
                } else if (word === picked && word !== q.o) {
                  cls = 'bg-red-500/20 border-red-500 text-red-300'
                } else {
                  cls = 'bg-white/3 border-white/5 text-white/25 cursor-default'
                }
              }
              return (
                <button
                  key={word}
                  onClick={() => handlePick(word, questions, current, nivel)}
                  disabled={picked !== null}
                  className={`border-2 rounded-2xl py-5 px-3 font-bold text-base transition-all active:scale-95 disabled:cursor-default ${cls}`}
                >
                  {word}
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {picked !== null && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-white/50 text-xs leading-relaxed">
                <span className="text-violet-400 font-semibold">{q.c} · </span>
                {q.e}
              </p>
            </div>
          )}
        </div>
      </div>
    )
  }

  /* ── Result ─────────────────────────────────────────────── */
  if (screen === 'result') {
    const total = questions.length
    const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0
    const emoji = pct === 100 ? '🏆' : pct >= 70 ? '⭐' : pct >= 40 ? '👍' : '💪'
    const niveLabel = ca ? cfg.labelCa : en ? cfg.labelEn : cfg.label
    const maxScore = total * POINTS_CORRECT

    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {showCoins && <CoinsAnimation points={score} />}

        <div className="max-w-sm w-full">
          <div className="text-center mb-6">
            <p className="text-6xl mb-3">{emoji}</p>
            <h2 className="text-2xl font-black text-white mb-1">{t('¡Partida terminada!', 'Partida acabada!', 'Game over!')}</h2>
            <p className="text-white/40 text-sm">{niveLabel} · El Intruso</p>
          </div>

          {/* Score card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
            <div className="text-center mb-4">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{t('Puntuación', 'Puntuació', 'Score')}</p>
              <p className="text-5xl font-black text-white">{score}</p>
              <p className="text-white/30 text-xs mt-1">{t('máximo posible', 'màxim possible', 'maximum possible')}: {maxScore}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                <p className="text-green-400 font-black text-2xl">{correctCount}</p>
                <p className="text-white/40 text-xs">{t('correctas', 'correctes', 'correct')}</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                <p className="text-red-400 font-black text-2xl">{wrongCount}</p>
                <p className="text-white/40 text-xs">{t('falladas', 'fallades', 'wrong')}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={() => startGame(nivel)}
              className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl transition-colors"
            >
              {t('Jugar de nuevo →', 'Tornar a jugar →', 'Play again →')}
            </button>
            <button
              onClick={() => { clearTimer(); setScreen('select') }}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {t('Cambiar nivel', 'Canviar nivell', 'Change level')}
            </button>
            <button
              onClick={() => navigate(localPath('/juegos'))}
              className="w-full text-white/40 hover:text-white/60 py-2 text-sm transition-colors"
            >
              {t('← Todos los juegos', '← Tots els jocs', '← All games')}
            </button>
          </div>

          <GameResultFooter game="intruso" score={score} user={user} lang={lang} />
        </div>
      </div>
    )
  }

  return null
}
