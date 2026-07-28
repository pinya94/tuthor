import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { genRound, removeTerm, divide, isSolved } from '../lib/algebra'
import GameEndScreen from '../components/GameEndScreen'
import BalanzaAlgebraicaBoard from '../components/BalanzaAlgebraica'
import SEOHead from '../components/SEOHead'

const GAME_TIME = 75
const WRONG_TIME = 5
const CORRECT_TIME = 5

const C = {
  badge:  { es: 'Matemáticas · Ecuaciones', en: 'Maths · Equations', ca: 'Matemàtiques · Equacions' },
  title:  { es: '🟰 Balanza Algebraica', en: '🟰 Algebra Balance', ca: '🟰 Balança Algebraica' },
  sub:    { es: 'Despeja la x haciendo lo mismo a los dos lados', en: 'Isolate x by doing the same to both sides', ca: 'Aïlla la x fent el mateix als dos costats' },
  how:    { es: 'Cómo funciona', en: 'How it works', ca: 'Com funciona' },
  p1:     { es: 'La ecuación es una balanza equilibrada: los dos lados valen lo mismo.', en: 'The equation is a balanced scale: both sides are equal.', ca: 'L’equació és una balança equilibrada: els dos costats valen el mateix.' },
  p2:     { es: 'Toca un término para restarlo a los DOS lados. Así cancelas números y equis.', en: 'Tap a term to subtract it from BOTH sides. That cancels numbers and x’s.', ca: 'Toca un terme per restar-lo als DOS costats. Així canceŀles números i x.' },
  p3:     { es: 'Cuando queda m·x = k, divide entre m a los dos lados para dejar la x sola.', en: 'When you reach m·x = k, divide both sides by m to isolate x.', ca: 'Quan queda m·x = k, divideix entre m als dos costats per deixar la x sola.' },
  time:   { es: 'Tiempo', en: 'Time', ca: 'Temps' },
  timeVal:{ es: '75 segundos', en: '75 seconds', ca: '75 segons' },
  pts:    { es: 'Puntos', en: 'Points', ca: 'Punts' },
  ptsVal: { es: 'Resuelta +1 y +5s · Rendirse −1 y −5s', en: 'Solved +1 and +5s · Give up −1 and −5s', ca: 'Resolta +1 i +5s · Rendir-se −1 i −5s' },
  start:  { es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' },
  prompt: { es: 'Despeja la x', en: 'Isolate x', ca: 'Aïlla la x' },
  giveUp: { es: 'Me rindo', en: 'Give up', ca: 'Em rendeixo' },
  solved: { es: '¡Resuelta!', en: 'Solved!', ca: 'Resolta!' },
  failed: { es: 'Otra vez será', en: 'Next time', ca: 'Una altra vegada' },
  next:   { es: 'Siguiente →', en: 'Next →', ca: 'Següent →' },
  end:    { es: 'Tiempo', en: "Time's up", ca: 'Temps' },
  hits:   { es: 'ecuaciones', en: 'equations', ca: 'equacions' },
  scoreLbl:{ es: 'puntos', en: 'points', ca: 'punts' },
  again:  { es: '▶ Jugar de nuevo', en: '▶ Play again', ca: '▶ Jugar de nou' },
  changeDif:{ es: 'Cambiar dificultad', en: 'Change difficulty', ca: 'Canviar dificultat' },
  exam:   { es: 'Modo examen (sin tiempo) →', en: 'Exam mode (no timer) →', ca: 'Mode examen (sense temps) →' },
}
function T(k, l) { return C[k]?.[l] ?? C[k]?.es ?? k }

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, desc: { es: 'Una x: ax + b = c', en: 'One x: ax + b = c', ca: 'Una x: ax + b = c' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, desc: { es: 'x a los dos lados: ax + b = cx + d', en: 'x on both sides: ax + b = cx + d', ca: 'x als dos costats: ax + b = cx + d' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, desc: { es: 'Números grandes y negativos', en: 'Big and negative numbers', ca: 'Números grans i negatius' } },
}

function DifficultyScreen({ onSelect, l }) {
  const [dif, setDif] = useState('facil')
  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{T('badge', l)}</p>
        <h1 className="text-3xl font-black text-white text-center mb-1">{T('title', l)}</h1>
        <p className="text-white/40 text-sm text-center mb-6">{T('sub', l)}</p>

        <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl mb-3 mx-auto">
          {Object.entries(DIFS).map(([id, d]) => (
            <button key={id} onClick={() => setDif(id)}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${dif === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}>
              {d.emoji} {d.label[l] ?? d.label.es}
            </button>
          ))}
        </div>
        <p className="text-white/40 text-xs text-center mb-5">{DIFS[dif].desc[l] ?? DIFS[dif].desc.es}</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{T('how', l)}</p>
          <div className="space-y-2">
            {[['⚖️', T('p1', l)], ['👆', T('p2', l)], ['➗', T('p3', l)]].map(([e, text]) => (
              <div key={text} className="flex items-start gap-3 text-sm text-white/50">
                <span className="text-base w-5 shrink-0 text-center">{e}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 space-y-2.5 text-sm">
          {[['⏱️', T('time', l), T('timeVal', l)], ['⭐', T('pts', l), T('ptsVal', l)]].map(([e, k, v]) => (
            <div key={k} className="flex items-start justify-between gap-4">
              <span className="text-white/40 shrink-0 pt-0.5">{e} {k}</span>
              <span className="text-white font-semibold text-right">{v}</span>
            </div>
          ))}
        </div>

        <button onClick={() => onSelect(dif)}
          className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20 mb-3">
          {T('start', l)}
        </button>
        <Link to="/examen/balanza-algebraica-test"
          className="block text-center text-white/30 hover:text-white/60 text-sm transition-colors">
          {T('exam', l)}
        </Link>
      </div>
    </div>
  )
}

export default function BalanzaAlgebraica() {
  const { lang } = useLang()
  const { user } = useAuth()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'

  const [screen, setScreen] = useState('difficulty')
  const [difficulty, setDifficulty] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [streak, setStreak] = useState(0)
  const [round, setRound] = useState(null)
  const [state, setState] = useState(null)
  const [history, setHistory] = useState([])
  const [phase, setPhase] = useState('choose')
  const [delta, setDelta] = useState(null)

  const timerRef = useRef(null)
  const scoreRef = useRef(0)
  const timeRef = useRef(GAME_TIME)
  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { timeRef.current = timeLeft }, [timeLeft])

  const next = useCallback((diff) => {
    const r = genRound(diff)
    setRound(r)
    setState({ L: { ...r.L }, R: { ...r.R } })
    setHistory([])
    setPhase('choose')
    setDelta(null)
  }, [])

  function startGame(diff) {
    setDifficulty(diff)
    setScreen('playing')
    setScore(0); setCorrect(0); setStreak(0)
    setTimeLeft(GAME_TIME)
    next(diff)
  }

  useEffect(() => {
    if (screen !== 'playing') return
    timerRef.current = setInterval(() => {
      setTimeLeft(tl => {
        if (tl <= 1) { clearInterval(timerRef.current); setScreen('end'); return 0 }
        return tl - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [screen])

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  useEffect(() => {
    if (screen !== 'end' || !user?.uid) return
    const pts = scoreRef.current * 10
    saveActivity(user.uid, {
      type: 'juego', game: 'balanza-algebraica', category: 'matematicas',
      score: pts, passed: scoreRef.current > 0,
      coinsEarned: computeCoins('balanza-algebraica', { score: pts }),
      timeSpent: GAME_TIME - timeRef.current,
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [screen, user])

  function win() {
    const ns = streak + 1
    setStreak(ns)
    setCorrect(c => c + 1)
    const gain = Math.min(5, 1 + Math.floor((ns - 1) / 3))
    setScore(s => s + gain)
    setTimeLeft(t => t + CORRECT_TIME)
    setDelta({ won: true, gain, streak: ns })
    setPhase('result')
  }

  function applyStep(nextState, label) {
    setState(nextState)
    setHistory(h => [...h, label])
    if (isSolved(nextState)) win()
  }

  function onRemove(sideKey, kind) {
    if (phase !== 'choose') return
    const { state: ns, label } = removeTerm(state, sideKey, kind)
    applyStep(ns, label)
  }

  function onDivide() {
    if (phase !== 'choose') return
    const { state: ns, label } = divide(state)
    applyStep(ns, label)
  }

  function giveUp() {
    if (phase !== 'choose') return
    setStreak(0)
    setScore(s => Math.max(0, s - 1))
    setTimeLeft(t => Math.max(0, t - WRONG_TIME))
    setDelta({ won: false })
    setPhase('result')
  }

  const seo = {
    es: { title: 'Balanza Algebraica — Resolver ecuaciones de primer grado', desc: 'Despeja la x con el método de la balanza: haz la misma operación a los dos lados hasta dejar la x sola. Aprende a resolver ecuaciones de primer grado jugando. Juego de matemáticas gratis.', path: '/juegos/balanza-algebraica' },
    en: { title: 'Algebra Balance — Solve linear equations', desc: 'Isolate x with the balance method: do the same operation to both sides until x is alone. Learn to solve linear equations by playing. Free maths game.', path: '/en/juegos/balanza-algebraica' },
    ca: { title: 'Balança Algebraica — Resoldre equacions de primer grau', desc: 'Aïlla la x amb el mètode de la balança: fes la mateixa operació als dos costats fins a deixar la x sola. Aprèn a resoldre equacions de primer grau jugant. Joc de matemàtiques gratis.', path: '/ca/juegos/balanza-algebraica' },
  }[l]

  if (screen === 'difficulty') {
    return (<><SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} /><DifficultyScreen onSelect={startGame} l={l} /></>)
  }

  if (screen === 'end') {
    const pts = score * 10
    const msg = { es: score === 0 ? '¡Sigue practicando!' : score < 4 ? 'Buen comienzo' : score < 9 ? '¡Bien hecho!' : '¡Maestro del álgebra! 💪', en: score === 0 ? 'Keep practising!' : score < 4 ? 'Good start' : score < 9 ? 'Well done!' : 'Algebra master! 💪', ca: score === 0 ? 'Segueix practicant!' : score < 4 ? 'Bon començament' : score < 9 ? 'Ben fet!' : 'Mestre de l’àlgebra! 💪' }[l]
    const shareText = l === 'en'
      ? `I solved ${correct} equations in Algebra Balance 🟰 — can you beat me? https://tuthor.es/juegos/balanza-algebraica`
      : l === 'ca'
      ? `He resolt ${correct} equacions a Balança Algebraica 🟰 — pots superar-me? https://tuthor.es/juegos/balanza-algebraica`
      : `He resuelto ${correct} ecuaciones en Balanza Algebraica 🟰 — ¿puedes superarme? https://tuthor.es/juegos/balanza-algebraica`
    return (
      <GameEndScreen game="balanza-algebraica" emoji="🟰" title={T('end', l)} score={pts} message={msg}
        stats={[{ label: T('hits', l), value: correct, emoji: '✅' }]}
        shareText={shareText} onPlayAgain={() => startGame(difficulty)} playAgainLabel={T('again', l)}
        secondaryActions={[{ label: T('changeDif', l), onClick: () => setScreen('difficulty') }]}
        user={user} lang={lang} />
    )
  }

  if (!round || !state) return null

  const timerPct = timeLeft / GAME_TIME
  const timerColor = timeLeft > 50 ? '#22c55e' : timeLeft > 20 ? '#f59e0b' : '#ef4444'
  const isResult = phase === 'result'
  const won = delta?.won

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      <div className="w-full max-w-[520px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">🟰 {DIFS[difficulty].label[l] ?? DIFS[difficulty].label.es}</p>
          <p className="text-white font-bold text-lg flex items-center gap-2">
            {score} {T('scoreLbl', l)}
            {streak >= 2 && <span className="text-orange-400 text-sm font-black">🔥 {streak}</span>}
          </p>
        </div>
        <div className="relative w-14 h-14">
          <svg className="absolute inset-0" viewBox="0 0 56 56">
            <circle cx="28" cy="28" r="24" fill="none" stroke="#ffffff15" strokeWidth="4" />
            <circle cx="28" cy="28" r="24" fill="none" stroke={timerColor} strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 24}`} strokeDashoffset={`${2 * Math.PI * 24 * (1 - timerPct)}`}
              strokeLinecap="round" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center', transition: 'stroke-dashoffset 1s linear' }} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-black text-sm" style={{ color: timerColor }}>{timeLeft}</span>
          </div>
        </div>
      </div>

      <p className="text-white/70 text-sm mb-2 text-center px-2">{T('prompt', l)}</p>

      <div className="w-full max-w-[520px] mb-3">
        <BalanzaAlgebraicaBoard state={state} onRemove={onRemove} onDivide={onDivide}
          reveal={isResult} solution={round.solution} history={history} l={l} />
      </div>

      {isResult ? (
        <div className="w-full max-w-[520px] px-1 space-y-2">
          <div className={`rounded-xl px-3 py-2 text-center ${won ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
            <p className={`font-black ${won ? 'text-green-400' : 'text-red-400'}`}>
              {won ? `🟰 ${T('solved', l)}` : T('failed', l)}
            </p>
            <p className="text-xs font-bold mt-0.5">
              {won
                ? <span className="text-green-400">+{delta.gain} · +{CORRECT_TIME}s ⏱️{delta.streak >= 2 ? ` · 🔥 ${delta.streak}` : ''}</span>
                : <span className="text-red-400">−1 · −{WRONG_TIME}s ⏱️</span>}
            </p>
          </div>
          <button onClick={() => next(difficulty)}
            className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">
            {T('next', l)}
          </button>
        </div>
      ) : (
        <div className="w-full max-w-[520px] px-1">
          <button onClick={giveUp}
            className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 font-semibold hover:bg-white/10 transition text-sm">
            {T('giveUp', l)}
          </button>
        </div>
      )}
    </div>
  )
}
