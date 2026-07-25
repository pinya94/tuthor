import { useState, useRef, useEffect, useCallback } from 'react'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { genRound, torqueBreakdown } from '../lib/balanza'
import GameEndScreen from '../components/GameEndScreen'
import BalanceBeam from '../components/BalanceBeam'
import SEOHead from '../components/SEOHead'

const GAME_TIME = 40
const WRONG_TIME = 3    // segundos que resta cada fallo
const CORRECT_TIME = 3  // segundos que suma cada acierto

const C = {
  badge:  { es: 'Física · Palancas', en: 'Physics · Levers', ca: 'Física · Palanques' },
  title:  { es: '⚖️ Equilibra la balanza', en: '⚖️ Balance the scale', ca: '⚖️ Equilibra la balança' },
  sub:    { es: 'Coloca el peso para igualar los momentos', en: 'Place the weight to match the moments', ca: 'Col·loca el pes per igualar els moments' },
  how:    { es: 'Cómo funciona', en: 'How it works', ca: 'Com funciona' },
  p1:     { es: 'Cada peso hace fuerza = peso × distancia al eje (su momento).', en: 'Each weight exerts force = weight × distance to the pivot (its moment).', ca: 'Cada pes fa força = pes × distància a l’eix (el seu moment).' },
  p2:     { es: 'La balanza se equilibra cuando los momentos de los dos lados son iguales.', en: 'The scale balances when the moments on both sides are equal.', ca: 'La balança s’equilibra quan els moments dels dos costats són iguals.' },
  p3:     { es: 'Coloca tu peso en la muesca correcta: momento izquierdo ÷ tu peso.', en: 'Place your weight on the right notch: left moment ÷ your weight.', ca: 'Col·loca el teu pes a la osca correcta: moment esquerre ÷ el teu pes.' },
  time:   { es: 'Tiempo', en: 'Time', ca: 'Temps' },
  timeVal:{ es: '40 segundos', en: '40 seconds', ca: '40 segons' },
  pts:    { es: 'Puntos', en: 'Points', ca: 'Punts' },
  ptsVal: { es: 'Acierto +1 y +3s · Fallo −1 y −3s', en: 'Correct +1 and +3s · Wrong −1 and −3s', ca: 'Encert +1 i +3s · Errada −1 i −3s' },
  start:  { es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' },
  place:  { es: 'Coloca tu peso de', en: 'Place your', ca: 'Col·loca el teu pes de' },
  placeEnd:{ es: 'en la muesca que equilibre', en: 'weight on the notch that balances', ca: 'a la osca que equilibri' },
  kg:     { es: 'kg', en: 'kg', ca: 'kg' },
  balanced:{ es: '¡Equilibrada!', en: 'Balanced!', ca: 'Equilibrada!' },
  tips:   { es: 'Se inclina', en: 'It tips', ca: 'S’inclina' },
  left:   { es: 'Izquierda', en: 'Left', ca: 'Esquerra' },
  right:  { es: 'Derecha', en: 'Right', ca: 'Dreta' },
  wasNotch:{ es: 'La muesca correcta era la', en: 'The correct notch was', ca: 'La osca correcta era la' },
  next:   { es: 'Siguiente →', en: 'Next →', ca: 'Següent →' },
  end:    { es: 'Tiempo', en: "Time's up", ca: 'Temps' },
  hits:   { es: 'aciertos', en: 'correct', ca: 'encerts' },
  scoreLbl:{ es: 'puntos', en: 'points', ca: 'punts' },
  again:  { es: '▶ Jugar de nuevo', en: '▶ Play again', ca: '▶ Jugar de nou' },
  changeDif:{ es: 'Cambiar dificultad', en: 'Change difficulty', ca: 'Canviar dificultat' },
}
function T(k, l) { return C[k]?.[l] ?? C[k]?.es ?? k }

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, desc: { es: 'Un peso a la izquierda, números pequeños', en: 'One weight on the left, small numbers', ca: 'Un pes a l’esquerra, números petits' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, desc: { es: 'Uno o dos pesos y más muescas', en: 'One or two weights and more notches', ca: 'Un o dos pesos i més osques' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, desc: { es: 'Varios pesos y números grandes', en: 'Several weights and big numbers', ca: 'Diversos pesos i números grans' } },
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
            {[['🏋️', T('p1', l)], ['⚖️', T('p2', l)], ['🎯', T('p3', l)]].map(([e, text]) => (
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
          className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20">
          {T('start', l)}
        </button>
      </div>
    </div>
  )
}

export default function Balanza() {
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
  const [phase, setPhase] = useState('choose')  // choose | result
  const [placed, setPlaced] = useState(null)
  const [delta, setDelta] = useState(null)

  const timerRef = useRef(null)
  const scoreRef = useRef(0)
  const timeRef = useRef(GAME_TIME)
  const startedAtRef = useRef(0)
  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { timeRef.current = timeLeft }, [timeLeft])

  const next = useCallback((diff) => {
    setRound(genRound(diff))
    setPhase('choose')
    setPlaced(null)
  }, [])

  function startGame(diff) {
    setDifficulty(diff)
    setScreen('playing')
    setScore(0); setCorrect(0); setStreak(0)
    setTimeLeft(GAME_TIME)
    startedAtRef.current = Date.now()
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
      type: 'juego', game: 'balanza', category: 'fisica',
      score: pts, passed: scoreRef.current > 0,
      coinsEarned: computeCoins('balanza', { score: pts }),
      timeSpent: GAME_TIME - timeRef.current,
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [screen, user])

  function pick(notch) {
    if (phase !== 'choose') return
    setPlaced(notch)
    setPhase('result')
    if (notch === round.answer) {
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
      setDelta({ won: false })
    }
  }

  const seo = {
    es: { title: 'Equilibra la Balanza — Palancas y momentos', desc: 'Coloca el peso a la distancia correcta para equilibrar la balanza. Aprende palancas, momentos y la ley de la palanca calculando peso × distancia. Juego de física gratis.', path: '/juegos/balanza' },
    en: { title: 'Balance the Scale — Levers and moments', desc: 'Place the weight at the right distance to balance the scale. Learn levers, moments and the law of the lever by computing weight × distance. Free physics game.', path: '/en/juegos/balanza' },
    ca: { title: 'Equilibra la Balança — Palanques i moments', desc: 'Col·loca el pes a la distància correcta per equilibrar la balança. Aprèn palanques, moments i la llei de la palanca calculant pes × distància. Joc de física gratis.', path: '/ca/juegos/balanza' },
  }[l]

  if (screen === 'difficulty') {
    return (<><SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} /><DifficultyScreen onSelect={startGame} l={l} /></>)
  }

  if (screen === 'end') {
    const pts = score * 10
    const msg = { es: score === 0 ? '¡Sigue practicando!' : score < 4 ? 'Buen comienzo' : score < 9 ? '¡Bien hecho!' : '¡Maestro del equilibrio! 💪', en: score === 0 ? 'Keep practising!' : score < 4 ? 'Good start' : score < 9 ? 'Well done!' : 'Balance master! 💪', ca: score === 0 ? 'Segueix practicant!' : score < 4 ? 'Bon començament' : score < 9 ? 'Ben fet!' : 'Mestre de l’equilibri! 💪' }[l]
    const shareText = l === 'en'
      ? `I balanced ${correct} scales in Balance ⚖️ — can you beat me? https://tuthor.es/juegos/balanza`
      : l === 'ca'
      ? `He equilibrat ${correct} balances a Balança ⚖️ — pots superar-me? https://tuthor.es/juegos/balanza`
      : `He equilibrado ${correct} balanzas en Balanza ⚖️ — ¿puedes superarme? https://tuthor.es/juegos/balanza`
    return (
      <GameEndScreen game="balanza" emoji="⚖️" title={T('end', l)} score={pts} message={msg}
        stats={[{ label: T('hits', l), value: correct, emoji: '✅' }]}
        shareText={shareText} onPlayAgain={() => startGame(difficulty)} playAgainLabel={T('again', l)}
        secondaryActions={[{ label: T('changeDif', l), onClick: () => setScreen('difficulty') }]}
        user={user} lang={lang} />
    )
  }

  if (!round) return null

  const timerPct = timeLeft / GAME_TIME
  const timerColor = timeLeft > 30 ? '#22c55e' : timeLeft > 10 ? '#f59e0b' : '#ef4444'
  const isResult = phase === 'result'
  const won = placed === round.answer

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      {/* Header */}
      <div className="w-full max-w-[520px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">⚖️ {DIFS[difficulty].label[l] ?? DIFS[difficulty].label.es}</p>
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

      {/* Prompt */}
      <p className="text-white/70 text-sm mb-1 text-center px-2">
        {T('place', l)} <span className="text-[#EDAE49] font-black">{round.playerWeight} {T('kg', l)}</span> {T('placeEnd', l)}
      </p>

      {/* Balanza */}
      <div className="relative w-full max-w-[520px] rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] mb-3">
        <BalanceBeam round={round} placed={placed} onPick={isResult ? undefined : pick} />

        {/* overlay resultado */}
        {isResult && (
          <div className="absolute inset-x-0 bottom-0 bg-black/70 backdrop-blur-sm p-3 text-center">
            <p className={`font-black text-lg ${won ? 'text-green-400' : 'text-red-400'}`}>
              {won ? `⚖️ ${T('balanced', l)}` : T('tips', l)}
              {!won && <span className="text-white/60 text-sm font-normal"> · {T('wasNotch', l)} {round.answer}</span>}
            </p>
            {delta && (
              <p className="text-xs font-bold mt-0.5">
                {delta.won
                  ? <span className="text-green-400">+{delta.gain} · +{CORRECT_TIME}s ⏱️{delta.streak >= 2 ? ` · 🔥 ${delta.streak}` : ''}</span>
                  : <span className="text-red-400">−1 · −{WRONG_TIME}s ⏱️</span>}
              </p>
            )}
            <p className="text-white/70 text-xs font-mono mt-1">
              {T('left', l)}: {torqueBreakdown(round.left)} · {T('right', l)}: {round.playerWeight}×{placed} = {round.playerWeight * placed}
            </p>
          </div>
        )}
      </div>

      {isResult && (
        <div className="w-full max-w-[520px] px-1">
          <button onClick={() => next(difficulty)}
            className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">
            {T('next', l)}
          </button>
        </div>
      )}
    </div>
  )
}
