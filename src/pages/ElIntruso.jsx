import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { saveActivity, saveDailyChallenge } from '../lib/activity'
import GameResultFooter from '../components/GameResultFooter'
import CoinsAnimation from '../components/CoinsAnimation'
import { getQuestionsForPool } from '../data/palabrasIntrusas'
import SEOHead from '../components/SEOHead'

const NIVELES = [
  { id: 'facil',   label: 'Fácil',   labelEn: 'Easy',   labelCa: 'Fàcil',   emoji: '🟢', tiempo: 60, preguntas: 15 },
  { id: 'medio',   label: 'Medio',   labelEn: 'Medium', labelCa: 'Mitjà',   emoji: '🟡', tiempo: 40, preguntas: 15 },
  { id: 'dificil', label: 'Difícil', labelEn: 'Hard',   labelCa: 'Difícil', emoji: '🔴', tiempo: 25, preguntas: 15 },
]

const POINTS_CORRECT = 10
const POINTS_WRONG   = 15

const UI = {
  es: {
    titulo: 'El Intruso', desc: 'Cuatro palabras, una no encaja. ¡A contrarreloj!',
    volver: '← Volver', empezar: '¡Empezar! →',
    reglas: 'Reglas', comoFunciona: 'Cómo funciona',
    tiempoTotal: 'Tiempo total', alAcertar: 'Acierto', alFallar: 'Error',
    paso1: 'Aparecen 4 palabras en pantalla', paso2: 'Elige la que NO encaja con las demás',
    paso3: 'Lee la explicación y pulsa Siguiente', paso4: '¡El tiempo corre, pero para mientras lees!',
    salir: '← Salir', siguiente: 'Siguiente →', verResultados: 'Ver resultados →',
    cualNoEncaja: '¿Cuál no encaja?', tiempoRestante: 'Tiempo restante',
    correcto: '🎉 ¡Correcto! +10', incorrecto: (odd) => `❌ El intruso era: ${odd}  −15`,
    puntuacion: 'Puntuación', respondidas: 'respondidas', maximo: 'máximo',
    correctas: 'correctas', falladas: 'falladas',
    jugando: '¡Partida terminada!', tiempoAgotado: '⏱ ¡Tiempo agotado!',
    jugarDeNuevo: 'Jugar de nuevo →', cambiarNivel: 'Cambiar nivel', todosJuegos: '← Todos los juegos',
    pausado: '⏸ Pausado — leyendo explicación',
  },
  en: {
    titulo: 'Odd One Out', desc: 'Four words, one does not fit. Beat the clock!',
    volver: '← Back', empezar: 'Start! →',
    reglas: 'Rules', comoFunciona: 'How it works',
    tiempoTotal: 'Total time', alAcertar: 'Correct', alFallar: 'Wrong',
    paso1: '4 words appear on screen', paso2: 'Pick the one that does NOT belong',
    paso3: 'Read the explanation and press Next', paso4: 'Timer runs, but pauses while you read!',
    salir: '← Exit', siguiente: 'Next →', verResultados: 'See results →',
    cualNoEncaja: 'Which does not fit?', tiempoRestante: 'Time left',
    correcto: '🎉 Correct! +10', incorrecto: (odd) => `❌ It was: ${odd}  −15`,
    puntuacion: 'Score', respondidas: 'answered', maximo: 'max',
    correctas: 'correct', falladas: 'wrong',
    jugando: 'Game over!', tiempoAgotado: "⏱ Time's up!",
    jugarDeNuevo: 'Play again →', cambiarNivel: 'Change level', todosJuegos: '← All games',
    pausado: '⏸ Paused — reading explanation',
  },
  ca: {
    titulo: "L'Intrús", desc: 'Quatre paraules, una no hi encaixa. A contrarellotge!',
    volver: '← Tornar', empezar: 'Comença! →',
    reglas: 'Regles', comoFunciona: 'Com funciona',
    tiempoTotal: 'Temps total', alAcertar: 'Encert', alFallar: 'Error',
    paso1: 'Apareixen 4 paraules a la pantalla', paso2: 'Tria la que NO hi encaixa amb les altres',
    paso3: 'Llegeix l\'explicació i prem Següent', paso4: 'El temps corre, però s\'atura mentre llegeixes!',
    salir: '← Sortir', siguiente: 'Següent →', verResultados: 'Veure resultats →',
    cualNoEncaja: 'Quina no hi encaixa?', tiempoRestante: 'Temps restant',
    correcto: '🎉 Correcte! +10', incorrecto: (odd) => `❌ La intrusa era: ${odd}  −15`,
    puntuacion: 'Puntuació', respondidas: 'respostes', maximo: 'màxim',
    correctas: 'correctes', falladas: 'fallades',
    jugando: 'Partida acabada!', tiempoAgotado: '⏱ Temps esgotat!',
    jugarDeNuevo: 'Tornar a jugar →', cambiarNivel: 'Canviar nivell', todosJuegos: '← Tots els jocs',
    pausado: '⏸ Pausat — llegint explicació',
  },
}

function dayOfYear() {
  const now = new Date()
  return Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000)
}

function getNivelCfg(id) { return NIVELES.find(n => n.id === id) ?? NIVELES[0] }

export default function ElIntruso() {
  const { user } = useAuth()
  const { lang, localPath } = useLang()
  const navigate = useNavigate()
  const location = useLocation()

  const u    = UI[lang] || UI.es
  const en   = lang === 'en'
  const ca   = lang === 'ca'
  const dl   = nv => ca ? nv.labelCa : en ? nv.labelEn : nv.label

  const dailyState = location.state?.modoDaily ? location.state : null
  const dailyNivel = dailyState?.nivel ?? null

  const [screen, setScreen]       = useState(dailyNivel ? 'playing' : 'select')
  const [nivel, setNivel]         = useState(dailyNivel ?? 'facil')
  const [selectedNivel, setSelectedNivel] = useState(dailyNivel ?? 'facil') // for select screen tab
  const [questions, setQuestions] = useState([])
  const [current, setCurrent]     = useState(0)
  const [score, setScore]         = useState(0)
  const [correctCount, setCorrect]= useState(0)
  const [wrongCount, setWrong]    = useState(0)
  const [timeLeft, setTimeLeft]   = useState(0)
  const [picked, setPicked]       = useState(null)
  const [paused, setPaused]       = useState(false)
  const [timedOut, setTimedOut]   = useState(false)
  const [saved, setSaved]         = useState(false)
  const [showCoins, setShowCoins] = useState(false)

  const scoreRef     = useRef(0)
  const correctRef   = useRef(0)
  const wrongRef     = useRef(0)
  const timerRef     = useRef(null)
  const timeLeftRef  = useRef(0)   // always current, readable from callbacks
  const questionsRef = useRef([])

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

  function startTimer(seconds) {
    clearTimer()
    const end = Date.now() + seconds * 1000
    timerRef.current = setInterval(() => {
      const left = Math.max(0, (end - Date.now()) / 1000)
      timeLeftRef.current = left
      setTimeLeft(left)
      if (left === 0) {
        clearTimer()
        setTimedOut(true)
        finishGame(scoreRef.current, correctRef.current, wrongRef.current, questionsRef.current)
      }
    }, 100)
  }

  function pauseTimer() {
    clearTimer()
    setPaused(true)
    // timeLeftRef.current holds the current remaining time
  }

  function resumeTimer() {
    setPaused(false)
    startTimer(timeLeftRef.current)
  }

  function startGame(nv) {
    const cfg = getNivelCfg(nv)
    const pool = dailyNivel
      ? getQuestionsForPool(lang, nv, cfg.preguntas, dayOfYear())
      : getQuestionsForPool(lang, nv, cfg.preguntas)
    scoreRef.current     = 0
    correctRef.current   = 0
    wrongRef.current     = 0
    timeLeftRef.current  = cfg.tiempo
    questionsRef.current = pool
    setNivel(nv)
    setQuestions(pool)
    setCurrent(0)
    setScore(0)
    setCorrect(0)
    setWrong(0)
    setTimeLeft(cfg.tiempo)
    setPicked(null)
    setPaused(false)
    setTimedOut(false)
    setSaved(false)
    setShowCoins(false)
    setScreen('playing')
    startTimer(cfg.tiempo)
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
    pauseTimer()  // pause while showing explanation
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
  }

  function handleNext() {
    const nextIdx = current + 1
    if (nextIdx >= questions.length) {
      finishGame(scoreRef.current, correctRef.current, wrongRef.current, questions)
    } else {
      setCurrent(nextIdx)
      setPicked(null)
      resumeTimer()
    }
  }

  const cfg          = getNivelCfg(nivel)
  const selCfg       = getNivelCfg(selectedNivel)
  const q            = questions[current]
  const timeFraction = cfg.tiempo > 0 ? timeLeft / cfg.tiempo : 0
  const timerColor   = timeFraction > 0.5 ? '#22c55e' : timeFraction > 0.25 ? '#f59e0b' : '#ef4444'
  const isCorrectPick= picked !== null && picked === q?.o

  const seoTitle = en ? 'Odd One Out — Vocabulary & Grammar Game' : ca ? "L'Intrús — Joc de Vocabulari i Gramàtica" : 'El Intruso — Vocabulario y Gramática a Contrarreloj'
  const seoDesc  = en ? 'Four words, one does not fit. Learn vocabulary, grammar and spelling in Spanish, Catalan and English. Free educational game.' : ca ? 'Quatre paraules, una no hi encaixa. Aprèn vocabulari, gramàtica i ortografia en català, castellà i anglès.' : 'Cuatro palabras, una no encaja. Aprende vocabulario, gramática y ortografía en español, catalán e inglés. Gratis.'
  const seoPath  = en ? '/en/juegos/intruso' : ca ? '/ca/juegos/intruso' : '/juegos/intruso'

  /* ── SELECT ───────────────────────────────────────────────── */
  if (screen === 'select') {
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <SEOHead title={seoTitle} description={seoDesc} path={seoPath} lang={lang} />
        <div className="max-w-xl w-full">

          <button onClick={() => navigate(localPath('/juegos'))}
            className="text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
            {u.volver}
          </button>

          <div className="text-center mb-7">
            <span className="text-7xl block mb-4">🔍</span>
            <h1 className="text-4xl font-black text-white mb-2">{u.titulo}</h1>
            <p className="text-white/40">{u.desc}</p>
          </div>

          {/* Difficulty tabs */}
          <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl mb-6 w-fit mx-auto">
            {NIVELES.map(nv => (
              <button key={nv.id} onClick={() => setSelectedNivel(nv.id)}
                className={`flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  selectedNivel === nv.id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'
                }`}>
                {nv.emoji} {dl(nv)}
              </button>
            ))}
          </div>

          {/* Info panels */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3 text-sm">
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">{u.reglas}</p>
              {[
                ['⏱️', u.tiempoTotal, `${selCfg.tiempo}s`],
                ['📝', en ? 'Questions' : ca ? 'Preguntes' : 'Preguntas', `${selCfg.preguntas}`],
                ['✅', u.alAcertar, `+${POINTS_CORRECT} pts`],
                ['❌', u.alFallar, `−${POINTS_WRONG} pts`],
              ].map(([e, k, v]) => (
                <div key={k} className="flex items-start justify-between gap-2">
                  <span className="text-white/40 shrink-0">{e} {k}</span>
                  <span className="text-white font-semibold text-right">{v}</span>
                </div>
              ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-3">
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">{u.comoFunciona}</p>
              {[u.paso1, u.paso2, u.paso3, u.paso4].map((paso, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-white/50">
                  <span className="w-5 h-5 rounded-full bg-violet-500/30 text-violet-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <span>{paso}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => startGame(selectedNivel)}
            className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30">
            {u.empezar}
          </button>
        </div>
      </div>
    )
  }

  /* ── PLAYING ──────────────────────────────────────────────── */
  if (screen === 'playing' && q) {
    return (
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
        <div className="max-w-sm w-full">

          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => { clearTimer(); setScreen('select') }} className="text-white/30 hover:text-white/60 text-sm transition-colors">
              {u.salir}
            </button>
            <div className="flex items-center gap-3">
              <span className="text-white/40 text-sm">{current + 1}/{questions.length}</span>
              <span className="text-amber-400 font-bold text-sm tabular-nums">💰 {score}</span>
            </div>
          </div>

          {/* Timer bar */}
          <div className="w-full bg-white/10 rounded-full h-2.5 mb-1 overflow-hidden">
            <div
              className="h-2.5 rounded-full"
              style={{
                width: `${timeFraction * 100}%`,
                backgroundColor: paused ? '#6366f1' : timerColor,
                transition: 'width 0.1s linear, background-color 0.3s',
              }}
            />
          </div>
          <div className="flex justify-between mb-5">
            <span className="text-white/20 text-xs">
              {paused ? u.pausado : u.tiempoRestante}
            </span>
            <span className="text-xs font-bold tabular-nums" style={{ color: paused ? '#818cf8' : timerColor }}>
              {Math.ceil(timeLeft)}s
            </span>
          </div>

          {/* Prompt */}
          <p className="text-center text-white/40 text-xs uppercase tracking-widest mb-4">
            {u.cualNoEncaja}
          </p>

          {/* Word buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {q.w.map(word => {
              let cls = 'bg-white/5 border-white/10 text-white hover:bg-violet-500/15 hover:border-violet-400/40 cursor-pointer'
              if (picked !== null) {
                if (word === q.o)                          cls = 'bg-green-500/20 border-green-500 text-green-300'
                else if (word === picked && word !== q.o)  cls = 'bg-red-500/20 border-red-500 text-red-300'
                else                                       cls = 'bg-white/3 border-white/5 text-white/25 cursor-default'
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

          {/* Feedback + explanation */}
          {picked !== null && (
            <div className="space-y-3">
              <div className={`text-center text-sm font-bold py-2.5 px-4 rounded-xl ${
                isCorrectPick ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {isCorrectPick ? u.correcto : u.incorrecto(q.o)}
              </div>
              <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                <p className="text-violet-400 text-xs font-semibold mb-1">{q.c}</p>
                <p className="text-white/60 text-sm leading-relaxed">{q.e}</p>
              </div>
              <button
                onClick={handleNext}
                className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl transition-colors"
              >
                {current + 1 >= questions.length ? u.verResultados : u.siguiente}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  /* ── RESULT ───────────────────────────────────────────────── */
  if (screen === 'result') {
    const answered  = correctCount + wrongCount
    const total     = questions.length
    const pct       = answered > 0 ? Math.round((correctCount / answered) * 100) : 0
    const emoji     = pct === 100 ? '🏆' : pct >= 70 ? '⭐' : pct >= 40 ? '👍' : '💪'
    const niveLabel = dl(cfg)
    const maxScore  = answered * POINTS_CORRECT

    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {showCoins && <CoinsAnimation points={score} />}

        <div className="max-w-sm w-full">
          <div className="text-center mb-6">
            <p className="text-6xl mb-3">{emoji}</p>
            <h2 className="text-2xl font-black text-white mb-1">
              {timedOut ? u.tiempoAgotado : u.jugando}
            </h2>
            <p className="text-white/40 text-sm">{niveLabel} · {u.titulo}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
            <div className="text-center mb-4">
              <p className="text-white/40 text-xs uppercase tracking-widest mb-1">{u.puntuacion}</p>
              <p className="text-5xl font-black text-white">{score}</p>
              <p className="text-white/30 text-xs mt-1">{answered}/{total} {u.respondidas} · {u.maximo} {maxScore}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3">
                <p className="text-green-400 font-black text-2xl">{correctCount}</p>
                <p className="text-white/40 text-xs">{u.correctas}</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                <p className="text-red-400 font-black text-2xl">{wrongCount}</p>
                <p className="text-white/40 text-xs">{u.falladas}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button onClick={() => startGame(nivel)} className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl transition-colors">
              {u.jugarDeNuevo}
            </button>
            <button onClick={() => { clearTimer(); setScreen('select') }} className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 rounded-xl transition-colors">
              {u.cambiarNivel}
            </button>
            <button onClick={() => navigate(localPath('/juegos'))} className="w-full text-white/40 hover:text-white/60 py-2 text-sm transition-colors">
              {u.todosJuegos}
            </button>
          </div>

          <GameResultFooter game="intruso" score={score} user={user} lang={lang} />
        </div>
      </div>
    )
  }

  return null
}
