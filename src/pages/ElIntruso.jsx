import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { saveActivity, saveDailyChallenge } from '../lib/activity'
import GameResultFooter from '../components/GameResultFooter'
import CoinsAnimation from '../components/CoinsAnimation'
import { getQuestionsForPool } from '../data/palabrasIntrusas'

// Cumulative timer for the whole game (seconds)
const NIVELES = [
  { id: 'facil',   label: 'Fácil',   labelEn: 'Easy',   labelCa: 'Fàcil',   emoji: '🟢',
    tiempo: 60, preguntas: 15, desc: '60 seg totales · +10 / −15 pts', descEn: '60 sec total · +10 / −15 pts', descCa: '60 seg totals · +10 / −15 pts' },
  { id: 'medio',   label: 'Medio',   labelEn: 'Medium', labelCa: 'Mitjà',   emoji: '🟡',
    tiempo: 40, preguntas: 15, desc: '40 seg totales · +10 / −15 pts', descEn: '40 sec total · +10 / −15 pts', descCa: '40 seg totals · +10 / −15 pts' },
  { id: 'dificil', label: 'Difícil', labelEn: 'Hard',   labelCa: 'Difícil', emoji: '🔴',
    tiempo: 25, preguntas: 15, desc: '25 seg totales · +10 / −15 pts', descEn: '25 sec total · +10 / −15 pts', descCa: '25 seg totals · +10 / −15 pts' },
]

const POINTS_CORRECT = 10
const POINTS_WRONG   = 15

function dayOfYear() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  return Math.floor((now - start) / 86400000)
}

function getNivelCfg(id) { return NIVELES.find(n => n.id === id) ?? NIVELES[0] }

export default function ElIntruso() {
  const { user } = useAuth()
  const { lang, localPath } = useLang()
  const navigate = useNavigate()
  const location = useLocation()
  const en = lang === 'en'
  const ca = lang === 'ca'

  const dailyState = location.state?.modoDaily ? location.state : null
  const dailyNivel = dailyState?.nivel ?? null

  const [screen, setScreen]       = useState(dailyNivel ? 'playing' : 'select')
  const [nivel, setNivel]         = useState(dailyNivel ?? 'facil')
  const [questions, setQuestions] = useState([])
  const [current, setCurrent]     = useState(0)
  const [score, setScore]         = useState(0)
  const [correctCount, setCorrect]= useState(0)
  const [wrongCount, setWrong]    = useState(0)
  const [timeLeft, setTimeLeft]   = useState(0)
  const [picked, setPicked]       = useState(null)  // word picked, or null
  const [timedOut, setTimedOut]   = useState(false) // game ended by timer
  const [saved, setSaved]         = useState(false)
  const [showCoins, setShowCoins] = useState(false)

  const scoreRef    = useRef(0)
  const correctRef  = useRef(0)
  const wrongRef    = useRef(0)
  const timerRef    = useRef(null)
  const currentRef  = useRef(0)  // mirrors current for timer callback
  const questionsRef= useRef([]) // mirrors questions for timer callback

  const t = useCallback((es, ca_t, en_t) => ca ? ca_t : en ? en_t : es, [ca, en])

  function clearTimer() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
  }

  function finishGame(finalScore, finalCorrect, finalWrong, qList) {
    clearTimer()
    if (user && !saved) {
      setSaved(true)
      saveActivity({
        game: 'intruso',
        userName: user.displayName || 'Jugador',
        userPhoto: user.photoURL || null,
        score: finalScore,
        meta: { nivel, correct: finalCorrect, wrong: finalWrong, total: qList.length },
      }).catch(() => {})
      if (dailyNivel) {
        saveDailyChallenge(user.uid, finalCorrect >= Math.ceil(qList.length / 2)).catch(() => {})
      }
    }
    setShowCoins(finalScore > 0)
    setScreen('result')
  }

  function startGlobalTimer(seconds) {
    clearTimer()
    const end = Date.now() + seconds * 1000
    timerRef.current = setInterval(() => {
      const left = Math.max(0, (end - Date.now()) / 1000)
      setTimeLeft(left)
      if (left === 0) {
        clearTimer()
        // End game — use refs to get latest values
        setTimedOut(true)
        finishGame(scoreRef.current, correctRef.current, wrongRef.current, questionsRef.current)
      }
    }, 100)
  }

  function startGame(nv) {
    const cfg = getNivelCfg(nv)
    const pool = dailyNivel
      ? getQuestionsForPool(lang, nv, cfg.preguntas, dayOfYear())
      : getQuestionsForPool(lang, nv, cfg.preguntas)
    // Reset refs
    scoreRef.current    = 0
    correctRef.current  = 0
    wrongRef.current    = 0
    currentRef.current  = 0
    questionsRef.current= pool
    // Reset state
    setNivel(nv)
    setQuestions(pool)
    setCurrent(0)
    setScore(0)
    setCorrect(0)
    setWrong(0)
    setTimeLeft(cfg.tiempo)
    setPicked(null)
    setTimedOut(false)
    setSaved(false)
    setShowCoins(false)
    setScreen('playing')
    startGlobalTimer(cfg.tiempo)
  }

  useEffect(() => {
    if (dailyNivel) startGame(dailyNivel)
    return () => clearTimer()
  }, [])

  function handlePick(word) {
    if (picked !== null) return
    const q = questions[current]
    const correct = word === q.o
    setPicked(word)
    if (correct) {
      const ns = scoreRef.current + POINTS_CORRECT
      scoreRef.current = ns
      setScore(ns)
      correctRef.current += 1
      setCorrect(c => c + 1)
    } else {
      const ns = Math.max(0, scoreRef.current - POINTS_WRONG)
      scoreRef.current = ns
      setScore(ns)
      wrongRef.current += 1
      setWrong(w => w + 1)
    }
    // Timer keeps running — user must press Siguiente to continue
  }

  function handleNext() {
    const nextIdx = current + 1
    if (nextIdx >= questions.length) {
      finishGame(scoreRef.current, correctRef.current, wrongRef.current, questions)
    } else {
      currentRef.current = nextIdx
      setCurrent(nextIdx)
      setPicked(null)
    }
  }

  const cfg = getNivelCfg(nivel)
  const q   = questions[current]
  const timeFraction  = cfg.tiempo > 0 ? timeLeft / cfg.tiempo : 0
  const timerColor    = timeFraction > 0.5 ? '#22c55e' : timeFraction > 0.25 ? '#f59e0b' : '#ef4444'
  const isCorrectPick = picked !== null && picked === (q?.o)
  const isWrongPick   = picked !== null && picked !== (q?.o)

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
            <p className="text-white/60 text-sm font-semibold">{t('Reglas', 'Regles', 'Rules')}</p>
            <p className="text-white/40 text-xs">{t('✅ Acierto: +10 pts', '✅ Encert: +10 pts', '✅ Correct: +10 pts')}</p>
            <p className="text-white/40 text-xs">{t('❌ Error: −15 pts', '❌ Error: −15 pts', '❌ Wrong: −15 pts')}</p>
            <p className="text-white/40 text-xs">{t('⏱ El tiempo corre durante toda la partida', '⏱ El temps corre durant tota la partida', '⏱ Timer runs throughout the whole game')}</p>
          </div>
        </div>
      </div>
    )
  }

  /* ── Playing ────────────────────────────────────────────── */
  if (screen === 'playing' && q) {
    return (
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
        <div className="max-w-sm w-full">

          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => { clearTimer(); setScreen('select') }} className="text-white/30 hover:text-white/60 text-sm transition-colors">
              ← {t('Salir', 'Sortir', 'Exit')}
            </button>
            <div className="flex items-center gap-3">
              <span className="text-white/40 text-sm">{current + 1}/{questions.length}</span>
              <span className="text-amber-400 font-bold text-sm tabular-nums">💰 {score}</span>
            </div>
          </div>

          {/* Cumulative timer bar */}
          <div className="w-full bg-white/10 rounded-full h-2.5 mb-1 overflow-hidden">
            <div
              className="h-2.5 rounded-full"
              style={{ width: `${timeFraction * 100}%`, backgroundColor: timerColor, transition: 'width 0.1s linear, background-color 0.3s' }}
            />
          </div>
          <div className="flex justify-between mb-5">
            <span className="text-white/20 text-xs">{t('Tiempo restante', 'Temps restant', 'Time left')}</span>
            <span className="text-xs font-bold tabular-nums" style={{ color: timerColor }}>{Math.ceil(timeLeft)}s</span>
          </div>

          {/* Prompt */}
          <p className="text-center text-white/40 text-xs uppercase tracking-widest mb-4">
            {t('¿Cuál no encaja?', 'Quina no hi encaixa?', 'Which does not fit?')}
          </p>

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
                  onClick={() => handlePick(word)}
                  disabled={picked !== null}
                  className={`border-2 rounded-2xl py-5 px-3 font-bold text-base transition-all active:scale-95 disabled:cursor-default ${cls}`}
                >
                  {word}
                </button>
              )
            })}
          </div>

          {/* Feedback + explanation (shown after picking) */}
          {picked !== null && (
            <div className="space-y-3">
              <div className={`text-center text-sm font-bold py-2.5 px-4 rounded-xl ${
                isCorrectPick ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {isCorrectPick
                  ? t('🎉 ¡Correcto! +10', '🎉 Correcte! +10', '🎉 Correct! +10')
                  : t(`❌ El intruso era: ${q.o}  −15`, `❌ La intrusa era: ${q.o}  −15`, `❌ It was: ${q.o}  −15`)
                }
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <p className="text-violet-400 text-xs font-semibold mb-1">{q.c}</p>
                <p className="text-white/60 text-sm leading-relaxed">{q.e}</p>
              </div>
              <button
                onClick={handleNext}
                className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl transition-colors"
              >
                {current + 1 >= questions.length
                  ? t('Ver resultados →', 'Veure resultats →', 'See results →')
                  : t('Siguiente →', 'Següent →', 'Next →')
                }
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  /* ── Result ─────────────────────────────────────────────── */
  if (screen === 'result') {
    const answered = correctCount + wrongCount
    const total    = questions.length
    const pct      = answered > 0 ? Math.round((correctCount / answered) * 100) : 0
    const emoji    = pct === 100 ? '🏆' : pct >= 70 ? '⭐' : pct >= 40 ? '👍' : '💪'
    const niveLabel= ca ? cfg.labelCa : en ? cfg.labelEn : cfg.label
    const maxScore = answered * POINTS_CORRECT

    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {showCoins && <CoinsAnimation points={score} />}

        <div className="max-w-sm w-full">
          <div className="text-center mb-6">
            <p className="text-6xl mb-3">{emoji}</p>
            <h2 className="text-2xl font-black text-white mb-1">
              {timedOut
                ? t('⏱ ¡Tiempo agotado!', '⏱ Temps esgotat!', '⏱ Time\'s up!')
                : t('¡Partida terminada!', 'Partida acabada!', 'Game over!')}
            </h2>
            <p className="text-white/40 text-sm">{niveLabel} · El Intruso</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
            <div className="text-center mb-4">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{t('Puntuación', 'Puntuació', 'Score')}</p>
              <p className="text-5xl font-black text-white">{score}</p>
              <p className="text-white/30 text-xs mt-1">{answered}/{total} {t('respondidas', 'respostes', 'answered')} · {t('máximo', 'màxim', 'max')} {maxScore}</p>
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

          <div className="space-y-3">
            <button onClick={() => startGame(nivel)} className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl transition-colors">
              {t('Jugar de nuevo →', 'Tornar a jugar →', 'Play again →')}
            </button>
            <button onClick={() => { clearTimer(); setScreen('select') }} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 rounded-xl transition-colors">
              {t('Cambiar nivel', 'Canviar nivell', 'Change level')}
            </button>
            <button onClick={() => navigate(localPath('/juegos'))} className="w-full text-white/40 hover:text-white/60 py-2 text-sm transition-colors">
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
