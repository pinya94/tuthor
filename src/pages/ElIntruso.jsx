import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LangContext'
import { saveActivity, saveDailyChallenge } from '../lib/activity'
import GameResultFooter from '../components/GameResultFooter'
import CoinsAnimation from '../components/CoinsAnimation'
import { getQuestionsForPool } from '../data/palabrasIntrusas'

const PUNTOS = { facil: 100, medio: 200, dificil: 400 }

const NIVELES = [
  { id: 'facil',   label: 'Fácil',   labelEn: 'Easy',   labelCa: 'Fàcil',   emoji: '🟢', desc: '100 pts / pregunta', descEn: '100 pts / question', descCa: '100 pts / pregunta' },
  { id: 'medio',   label: 'Medio',   labelEn: 'Medium', labelCa: 'Mitjà',   emoji: '🟡', desc: '200 pts / pregunta', descEn: '200 pts / question', descCa: '200 pts / pregunta' },
  { id: 'dificil', label: 'Difícil', labelEn: 'Hard',   labelCa: 'Difícil', emoji: '🔴', desc: '400 pts / pregunta', descEn: '400 pts / question', descCa: '400 pts / pregunta' },
]

const TOTAL_PER_GAME = 10

function dayOfYear() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  return Math.floor((now - start) / 86400000)
}

export default function ElIntruso() {
  const { user } = useAuth()
  const { lang, localPath } = useLang()
  const navigate = useNavigate()
  const location = useLocation()
  const en = lang === 'en'
  const ca = lang === 'ca'

  // Check if launched as daily challenge
  const dailyState = location.state?.modoDaily ? location.state : null
  const dailyNivel = dailyState?.nivel ?? null

  const [screen, setScreen] = useState(dailyNivel ? 'playing' : 'select')
  const [nivel, setNivel] = useState(dailyNivel ?? 'facil')
  const [questions, setQuestions] = useState([])
  const [current, setCurrent] = useState(0)
  const [score, setScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [picked, setPicked] = useState(null)       // word the user tapped
  const [showResult, setShowResult] = useState(false) // show per-question feedback
  const [showCoins, setShowCoins] = useState(false)
  const [saved, setSaved] = useState(false)

  const t = useCallback((es, ca_text, en_text) => ca ? ca_text : en ? en_text : es, [ca, en])

  function startGame(nv) {
    const niv = nv ?? nivel
    const pool = dailyNivel
      ? getQuestionsForPool(lang, niv, TOTAL_PER_GAME, dayOfYear())
      : getQuestionsForPool(lang, niv, TOTAL_PER_GAME)
    setNivel(niv)
    setQuestions(pool)
    setCurrent(0)
    setScore(0)
    setCorrectCount(0)
    setPicked(null)
    setShowResult(false)
    setSaved(false)
    setScreen('playing')
  }

  // Auto-start if daily mode
  useEffect(() => {
    if (dailyNivel) startGame(dailyNivel)
  }, [])

  async function handlePick(word) {
    if (picked !== null) return
    const q = questions[current]
    const correct = word === q.o
    const pts = correct ? PUNTOS[nivel] : 0
    setPicked(word)
    setShowResult(true)
    if (correct) {
      setScore(s => s + pts)
      setCorrectCount(c => c + 1)
    }

    setTimeout(() => {
      if (current + 1 >= questions.length) {
        // Done — save and show final screen
        const finalScore = score + pts
        const finalCorrect = correctCount + (correct ? 1 : 0)
        if (user && !saved) {
          setSaved(true)
          saveActivity({
            game: 'intruso',
            userName: user.displayName || 'Jugador',
            userPhoto: user.photoURL || null,
            score: finalScore,
            meta: { nivel, correct: finalCorrect, total: questions.length },
          }).catch(() => {})
          if (dailyNivel) {
            saveDailyChallenge(user.uid, finalCorrect >= Math.ceil(questions.length / 2)).catch(() => {})
          }
        }
        if (correct) setShowCoins(true)
        setScreen('result')
      } else {
        setCurrent(i => i + 1)
        setPicked(null)
        setShowResult(false)
      }
    }, 1800)
  }

  const q = questions[current]

  /* ── Level select ─────────────────────────────────────── */
  if (screen === 'select') {
    return (
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <p className="text-5xl mb-3">🔍</p>
            <h1 className="text-3xl font-black text-white mb-2">{t('El Intruso', 'L\'Intrús', 'Odd One Out')}</h1>
            <p className="text-white/50 text-sm">
              {t('Cuatro palabras, una no encaja. ¿Cuál es el intruso?', 'Quatre paraules, una no hi encaixa. Quina és la intrusa?', 'Four words, one does not fit. Which is the odd one out?')}
            </p>
          </div>
          <div className="space-y-3">
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
          <p className="text-center text-white/20 text-xs mt-6">
            {t(`${TOTAL_PER_GAME} preguntas por partida`, `${TOTAL_PER_GAME} preguntes per partida`, `${TOTAL_PER_GAME} questions per game`)}
          </p>
        </div>
      </div>
    )
  }

  /* ── Playing ──────────────────────────────────────────── */
  if (screen === 'playing' && q) {
    const isCorrectPick = picked === q.o
    return (
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
        <div className="max-w-sm w-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={() => setScreen('select')} className="text-white/30 hover:text-white/60 text-sm transition-colors">
              ← {t('Salir', 'Sortir', 'Exit')}
            </button>
            <div className="flex items-center gap-3">
              <span className="text-white/40 text-sm">{current + 1}/{questions.length}</span>
              <span className="text-amber-400 font-bold text-sm">💰 {score}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-white/10 rounded-full h-1.5 mb-6">
            <div
              className="h-1.5 rounded-full bg-violet-500 transition-all duration-300"
              style={{ width: `${(current / questions.length) * 100}%` }}
            />
          </div>

          {/* Category label */}
          <p className="text-center text-white/40 text-xs uppercase tracking-widest mb-4">
            {t('¿Cuál no encaja?', 'Quina no hi encaixa?', 'Which does not fit?')}
          </p>

          {/* Category hint (shown after pick) */}
          {showResult && (
            <div className={`text-center text-sm font-bold py-2 px-4 rounded-xl mb-4 ${isCorrectPick ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {isCorrectPick
                ? t('🎉 ¡Correcto!', '🎉 Correcte!', '🎉 Correct!')
                : t(`❌ El intruso era: ${q.o}`, `❌ La intrusa era: ${q.o}`, `❌ The odd one was: ${q.o}`)
              }
            </div>
          )}

          {/* Word buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {q.w.map(word => {
              let cls = 'bg-white/5 border-white/10 text-white hover:bg-violet-500/15 hover:border-violet-400/40'
              if (picked !== null) {
                if (word === q.o) {
                  cls = 'bg-green-500/20 border-green-500 text-green-300'
                } else if (word === picked && word !== q.o) {
                  cls = 'bg-red-500/20 border-red-500 text-red-300'
                } else {
                  cls = 'bg-white/3 border-white/5 text-white/30'
                }
              }
              return (
                <button
                  key={word}
                  onClick={() => handlePick(word)}
                  disabled={picked !== null}
                  className={`border-2 rounded-2xl py-5 px-3 font-bold text-base transition-all active:scale-95 ${cls}`}
                >
                  {word}
                </button>
              )
            })}
          </div>

          {/* Explanation after pick */}
          {showResult && (
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

  /* ── Result ───────────────────────────────────────────── */
  if (screen === 'result') {
    const pct = Math.round((correctCount / questions.length) * 100)
    const emoji = pct === 100 ? '🏆' : pct >= 70 ? '⭐' : pct >= 40 ? '👍' : '💪'
    const niveLabel = ca ? (NIVELES.find(n => n.id === nivel)?.labelCa) : en ? (NIVELES.find(n => n.id === nivel)?.labelEn) : (NIVELES.find(n => n.id === nivel)?.label)
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {showCoins && <CoinsAnimation onDone={() => setShowCoins(false)} />}

        <div className="max-w-sm w-full">
          <div className="text-center mb-8">
            <p className="text-6xl mb-3">{emoji}</p>
            <h2 className="text-2xl font-black text-white mb-1">{t('¡Partida terminada!', 'Partida acabada!', 'Game over!')}</h2>
            <p className="text-white/40 text-sm">{niveLabel} · El Intruso</p>
          </div>

          {/* Score card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4 text-center">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-2">{t('Puntuación', 'Puntuació', 'Score')}</p>
            <p className="text-5xl font-black text-white mb-1">{score}</p>
            <p className="text-white/40 text-sm">{correctCount}/{questions.length} {t('correctas', 'correctes', 'correct')} · {pct}%</p>
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
              onClick={() => setScreen('select')}
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
