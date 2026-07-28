import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { genRound, isCorrectCoefs, isBalanced } from '../lib/ecuaciones'
import GameEndScreen from '../components/GameEndScreen'
import EcuacionBalanza from '../components/EcuacionBalanza'
import SEOHead from '../components/SEOHead'

const GAME_TIME = 60
const WRONG_TIME = 4
const CORRECT_TIME = 4

const C = {
  badge:  { es: 'Química · Reacciones', en: 'Chemistry · Reactions', ca: 'Química · Reaccions' },
  title:  { es: '⚗️ Balanza de Ecuaciones', en: '⚗️ Equation Balancer', ca: '⚗️ Balança d’Equacions' },
  sub:    { es: 'Ajusta los coeficientes para equilibrar la reacción', en: 'Adjust the coefficients to balance the reaction', ca: 'Ajusta els coeficients per equilibrar la reacció' },
  how:    { es: 'Cómo funciona', en: 'How it works', ca: 'Com funciona' },
  p1:     { es: 'En una reacción no se crean ni destruyen átomos: debe haber los mismos de cada elemento a los dos lados.', en: 'In a reaction atoms are neither created nor destroyed: there must be the same of each element on both sides.', ca: 'En una reacció no es creen ni es destrueixen àtoms: hi ha d’haver els mateixos de cada element als dos costats.' },
  p2:     { es: 'Cambia los coeficientes (▲▼) delante de cada fórmula. Multiplican todos sus átomos.', en: 'Change the coefficients (▲▼) in front of each formula. They multiply all its atoms.', ca: 'Canvia els coeficients (▲▼) davant de cada fórmula. Multipliquen tots els seus àtoms.' },
  p3:     { es: 'La balanza se equilibra cuando cada elemento cuadra. Busca los números más pequeños.', en: 'The scale balances when every element matches. Find the smallest numbers.', ca: 'La balança s’equilibra quan cada element quadra. Busca els números més petits.' },
  time:   { es: 'Tiempo', en: 'Time', ca: 'Temps' },
  timeVal:{ es: '60 segundos', en: '60 seconds', ca: '60 segons' },
  pts:    { es: 'Puntos', en: 'Points', ca: 'Punts' },
  ptsVal: { es: 'Acierto +1 y +4s · Fallo −1 y −4s', en: 'Correct +1 and +4s · Wrong −1 and −4s', ca: 'Encert +1 i +4s · Errada −1 i −4s' },
  start:  { es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' },
  prompt: { es: 'Equilibra la ecuación', en: 'Balance the equation', ca: 'Equilibra l’equació' },
  check:  { es: 'Comprobar', en: 'Check', ca: 'Comprovar' },
  balanced:{ es: '¡Equilibrada!', en: 'Balanced!', ca: 'Equilibrada!' },
  notYet: { es: 'Aún no cuadra', en: 'Not balanced yet', ca: 'Encara no quadra' },
  notMin: { es: 'Equilibrada, pero no es la forma más simple', en: 'Balanced, but not the simplest form', ca: 'Equilibrada, però no és la forma més simple' },
  wasAns: { es: 'Solución más simple:', en: 'Simplest solution:', ca: 'Solució més simple:' },
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
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, desc: { es: 'Reacciones sencillas, coeficientes pequeños', en: 'Simple reactions, small coefficients', ca: 'Reaccions senzilles, coeficients petits' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, desc: { es: 'Combustiones y descomposiciones', en: 'Combustions and decompositions', ca: 'Combustions i descomposicions' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, desc: { es: 'Coeficientes grandes (glucosa, etano…)', en: 'Big coefficients (glucose, ethane…)', ca: 'Coeficients grans (glucosa, età…)' } },
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
            {[['⚛️', T('p1', l)], ['🔢', T('p2', l)], ['⚖️', T('p3', l)]].map(([e, text]) => (
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
        <Link to="/examen/balanza-ecuaciones-test"
          className="block text-center text-white/30 hover:text-white/60 text-sm transition-colors">
          {T('exam', l)}
        </Link>
      </div>
    </div>
  )
}

export default function BalanzaEcuaciones() {
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
  const [coefs, setCoefs] = useState([])
  const [phase, setPhase] = useState('choose')  // choose | result
  const [delta, setDelta] = useState(null)

  const timerRef = useRef(null)
  const scoreRef = useRef(0)
  const timeRef = useRef(GAME_TIME)
  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { timeRef.current = timeLeft }, [timeLeft])

  const next = useCallback((diff) => {
    const r = genRound(diff)
    setRound(r)
    setCoefs(r.initial)
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
      type: 'juego', game: 'balanza-ecuaciones', category: 'quimica',
      score: pts, passed: scoreRef.current > 0,
      coinsEarned: computeCoins('balanza-ecuaciones', { score: pts }),
      timeSpent: GAME_TIME - timeRef.current,
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [screen, user])

  function step(index, d) {
    if (phase !== 'choose') return
    setCoefs(cs => cs.map((c, i) => i === index ? Math.max(1, Math.min(round.maxCoef, c + d)) : c))
  }

  function check() {
    if (phase !== 'choose') return
    const ok = isCorrectCoefs(round, coefs)
    setPhase('result')
    if (ok) {
      const ns = streak + 1
      setStreak(ns)
      setCorrect(c => c + 1)
      const gain = Math.min(5, 1 + Math.floor((ns - 1) / 3))
      setScore(s => s + gain)
      setTimeLeft(t => t + CORRECT_TIME)
      setDelta({ won: true, gain, streak: ns })
    } else {
      setStreak(0)
      setScore(s => Math.max(0, s - 1))
      setTimeLeft(t => Math.max(0, t - WRONG_TIME))
      setDelta({ won: false, balancedNotMin: isBalanced(round, coefs) })
    }
  }

  const seo = {
    es: { title: 'Balanza de Ecuaciones — Ajustar reacciones químicas', desc: 'Equilibra ecuaciones químicas ajustando los coeficientes hasta que cada elemento tenga los mismos átomos a los dos lados. Aprende a balancear reacciones jugando. Juego de química gratis.', path: '/juegos/balanza-ecuaciones' },
    en: { title: 'Equation Balancer — Balance chemical reactions', desc: 'Balance chemical equations by adjusting the coefficients until every element has the same number of atoms on both sides. Learn to balance reactions by playing. Free chemistry game.', path: '/en/juegos/balanza-ecuaciones' },
    ca: { title: 'Balança d’Equacions — Ajustar reaccions químiques', desc: 'Equilibra equacions químiques ajustant els coeficients fins que cada element tingui els mateixos àtoms als dos costats. Aprèn a balancejar reaccions jugant. Joc de química gratis.', path: '/ca/juegos/balanza-ecuaciones' },
  }[l]

  if (screen === 'difficulty') {
    return (<><SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} /><DifficultyScreen onSelect={startGame} l={l} /></>)
  }

  if (screen === 'end') {
    const pts = score * 10
    const msg = { es: score === 0 ? '¡Sigue practicando!' : score < 4 ? 'Buen comienzo' : score < 9 ? '¡Bien hecho!' : '¡Química de precisión! 💪', en: score === 0 ? 'Keep practising!' : score < 4 ? 'Good start' : score < 9 ? 'Well done!' : 'Precision chemistry! 💪', ca: score === 0 ? 'Segueix practicant!' : score < 4 ? 'Bon començament' : score < 9 ? 'Ben fet!' : 'Química de precisió! 💪' }[l]
    const shareText = l === 'en'
      ? `I balanced ${correct} equations in Equation Balancer ⚗️ — can you beat me? https://tuthor.es/juegos/balanza-ecuaciones`
      : l === 'ca'
      ? `He equilibrat ${correct} equacions a Balança d’Equacions ⚗️ — pots superar-me? https://tuthor.es/juegos/balanza-ecuaciones`
      : `He equilibrado ${correct} ecuaciones en Balanza de Ecuaciones ⚗️ — ¿puedes superarme? https://tuthor.es/juegos/balanza-ecuaciones`
    return (
      <GameEndScreen game="balanza-ecuaciones" emoji="⚗️" title={T('end', l)} score={pts} message={msg}
        stats={[{ label: T('hits', l), value: correct, emoji: '✅' }]}
        shareText={shareText} onPlayAgain={() => startGame(difficulty)} playAgainLabel={T('again', l)}
        secondaryActions={[{ label: T('changeDif', l), onClick: () => setScreen('difficulty') }]}
        user={user} lang={lang} />
    )
  }

  if (!round) return null

  const timerPct = timeLeft / GAME_TIME
  const timerColor = timeLeft > 40 ? '#22c55e' : timeLeft > 15 ? '#f59e0b' : '#ef4444'
  const isResult = phase === 'result'
  const won = delta?.won

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      {/* Header */}
      <div className="w-full max-w-[520px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">⚗️ {DIFS[difficulty].label[l] ?? DIFS[difficulty].label.es}</p>
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
        <EcuacionBalanza round={round} coefs={coefs} onStep={step} reveal={isResult} l={l} />
      </div>

      {isResult && (
        <div className="w-full max-w-[520px] px-1 space-y-2">
          <div className={`rounded-xl px-3 py-2 text-center ${won ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
            <p className={`font-black ${won ? 'text-green-400' : 'text-red-400'}`}>
              {won ? `⚖️ ${T('balanced', l)}` : (delta?.balancedNotMin ? T('notMin', l) : T('notYet', l))}
            </p>
            <p className="text-xs font-bold mt-0.5">
              {won
                ? <span className="text-green-400">+{delta.gain} · +{CORRECT_TIME}s ⏱️{delta.streak >= 2 ? ` · 🔥 ${delta.streak}` : ''}</span>
                : <span className="text-red-400">−1 · −{WRONG_TIME}s ⏱️ · {T('wasAns', l)} {round.answer.join('·')}</span>}
            </p>
          </div>
          <button onClick={() => next(difficulty)}
            className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">
            {T('next', l)}
          </button>
        </div>
      )}

      {!isResult && (
        <div className="w-full max-w-[520px] px-1">
          <button onClick={check}
            className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">
            {T('check', l)}
          </button>
        </div>
      )}
    </div>
  )
}
