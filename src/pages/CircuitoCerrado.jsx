import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { genRound, isCorrect } from '../lib/circuito'
import GameEndScreen from '../components/GameEndScreen'
import CircuitoDiagrama, { siguienteEstado } from '../components/CircuitoDiagrama'
import IgraalCard from '../components/IgraalCard'
import SEOHead from '../components/SEOHead'

// Mismo esqueleto que Balanza.jsx (40s + racha), la otra mecánica de física
// sin reloj de reflejos por ronda: el jugador mira el circuito el tiempo que
// quiera, marca qué bombillas cree que van a encender y confirma. El reloj
// del juego es de partida entera, no de ronda — acertar suma tiempo.
const GAME_TIME = 40
const WRONG_TIME = 3
const CORRECT_TIME = 3

const C = {
  badge:  { es: 'Física · Electricidad', en: 'Physics · Electricity', ca: 'Física · Electricitat' },
  title:  { es: '💡 Circuito Cerrado', en: '💡 Circuit Complete', ca: '💡 Circuit Complet' },
  sub:    { es: 'Predice cómo va a brillar cada bombilla', en: 'Predict how each bulb will shine', ca: 'Prediu com brillarà cada bombeta' },
  how:    { es: 'Cómo funciona', en: 'How it works', ca: 'Com funciona' },
  p1:     { es: 'Toca cada bombilla para recorrer sus 3 estados: apagada, tenue o a tope.', en: 'Tap each bulb to cycle its 3 states: off, dim or full brightness.', ca: 'Toca cada bombeta per recórrer els seus 3 estats: apagada, tènue o a tota potència.' },
  p2:     { es: 'Un interruptor abierto (🔓) corta la corriente; cerrado (🔒), la deja pasar.', en: 'An open switch (🔓) cuts the current; closed (🔒), it flows.', ca: 'Un interruptor obert (🔓) talla el corrent; tancat (🔒), el deixa passar.' },
  p3:     { es: 'En serie, las bombillas se reparten la pila y brillan tenues. En paralelo, cada una brilla a tope.', en: 'In series, bulbs share the battery and shine dim. In parallel, each one shines at full brightness.', ca: 'En sèrie, les bombetes es reparteixen la pila i brillen tènues. En paral·lel, cadascuna brilla a tota potència.' },
  time:   { es: 'Tiempo', en: 'Time', ca: 'Temps' },
  timeVal:{ es: '40 segundos', en: '40 seconds', ca: '40 segons' },
  pts:    { es: 'Puntos', en: 'Points', ca: 'Punts' },
  ptsVal: { es: 'Acierto +1 y +3s · Fallo −1 y −3s', en: 'Correct +1 and +3s · Wrong −1 and −3s', ca: 'Encert +1 i +3s · Errada −1 i −3s' },
  start:  { es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' },
  prompt: { es: '¿Cómo va a brillar cada bombilla?', en: 'How will each bulb shine?', ca: 'Com brillarà cada bombeta?' },
  confirm:{ es: 'Confirmar →', en: 'Confirm →', ca: 'Confirmar →' },
  allRight:{ es: '¡Correcto!', en: 'Correct!', ca: 'Correcte!' },
  wrong:  { es: 'No del todo', en: 'Not quite', ca: 'No del tot' },
  next:   { es: 'Siguiente →', en: 'Next →', ca: 'Següent →' },
  end:    { es: 'Tiempo', en: "Time's up", ca: 'Temps' },
  hits:   { es: 'aciertos', en: 'correct', ca: 'encerts' },
  scoreLbl:{ es: 'puntos', en: 'points', ca: 'punts' },
  again:  { es: '▶ Jugar de nuevo', en: '▶ Play again', ca: '▶ Jugar de nou' },
  changeDif:{ es: 'Cambiar dificultad', en: 'Change difficulty', ca: 'Canviar dificultat' },
  exam:   { es: 'Modo examen (tipo test) →', en: 'Exam mode (quiz) →', ca: 'Mode examen (tipus test) →' },
}
function T(k, l) { return C[k]?.[l] ?? C[k]?.es ?? k }

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, desc: { es: 'Una bombilla, un interruptor', en: 'One bulb, one switch', ca: 'Una bombeta, un interruptor' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, desc: { es: 'Dos bombillas, en serie o en paralelo', en: 'Two bulbs, in series or parallel', ca: 'Dues bombetes, en sèrie o en paral·lel' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, desc: { es: 'Tres bombillas y dos interruptores', en: 'Three bulbs and two switches', ca: 'Tres bombetes i dos interruptors' } },
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
            {[['👆', T('p1', l)], ['🔒', T('p2', l)], ['🔅', T('p3', l)]].map(([e, text]) => (
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

        <IgraalCard variant="banner" className="mb-4" />

        <button onClick={() => onSelect(dif)}
          className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20 mb-3">
          {T('start', l)}
        </button>
        <Link to="/examen/circuito-cerrado-test"
          className="block text-center text-white/30 hover:text-white/60 text-sm transition-colors">
          {T('exam', l)}
        </Link>
      </div>
    </div>
  )
}

export default function CircuitoCerrado() {
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
  const [phase, setPhase] = useState('choose') // choose | result
  const [prediccion, setPrediccion] = useState(() => new Map())
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
    setPrediccion(new Map())
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
      type: 'juego', game: 'circuito-cerrado', category: 'fisica',
      score: pts, passed: scoreRef.current > 0,
      coinsEarned: computeCoins('circuito-cerrado', { score: pts }),
      timeSpent: GAME_TIME - timeRef.current,
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [screen, user])

  function toggle(id) {
    if (phase !== 'choose') return
    setPrediccion(prev => {
      const next = new Map(prev)
      next.set(id, siguienteEstado(prev.get(id) ?? 'apagada'))
      return next
    })
  }

  function confirmar() {
    if (phase !== 'choose' || !round) return
    setPhase('result')
    const won = isCorrect(round, prediccion)
    if (won) {
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
    es: { title: 'Circuito Cerrado — Aprende electricidad jugando', desc: 'Predice si cada bombilla brilla apagada, tenue o a tope: interruptores, serie y paralelo. Aprende electricidad básica prediciendo circuitos, sin reloj de reflejos por ronda. Juego de física.', path: '/juegos/circuito-cerrado' },
    en: { title: 'Circuit Complete — Learn electricity by playing', desc: 'Predict whether each bulb is off, dim or at full brightness: switches, series and parallel. Learn basic electricity by reading circuits, no per-round reflex clock. Physics game.', path: '/en/juegos/circuito-cerrado' },
    ca: { title: 'Circuit Complet — Aprèn electricitat jugant', desc: 'Prediu si cada bombeta brilla apagada, tènue o a tota potència: interruptors, sèrie i paral·lel. Aprèn electricitat bàsica llegint circuits, sense rellotge de reflexos per ronda. Joc de física.', path: '/ca/juegos/circuito-cerrado' },
  }[l]

  if (screen === 'difficulty') {
    return (<><SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} /><DifficultyScreen onSelect={startGame} l={l} /></>)
  }

  if (screen === 'end') {
    const pts = score * 10
    const msg = { es: score === 0 ? '¡Sigue practicando!' : score < 4 ? 'Buen comienzo' : score < 9 ? '¡Bien hecho!' : '¡Maestro de los circuitos! 💡', en: score === 0 ? 'Keep practising!' : score < 4 ? 'Good start' : score < 9 ? 'Well done!' : 'Circuit master! 💡', ca: score === 0 ? 'Segueix practicant!' : score < 4 ? 'Bon començament' : score < 9 ? 'Ben fet!' : 'Mestre dels circuits! 💡' }[l]
    const shareText = l === 'en'
      ? `I got ${correct} circuits right in Circuit Complete 💡 — can you beat me? https://tuthor.es/juegos/circuito-cerrado`
      : l === 'ca'
      ? `He encertat ${correct} circuits a Circuit Complet 💡 — pots superar-me? https://tuthor.es/juegos/circuito-cerrado`
      : `He acertado ${correct} circuitos en Circuito Cerrado 💡 — ¿puedes superarme? https://tuthor.es/juegos/circuito-cerrado`
    return (
      <GameEndScreen game="circuito-cerrado" emoji="💡" title={T('end', l)} score={pts} message={msg}
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
  const won = isResult && isCorrect(round, prediccion)

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      {/* Header */}
      <div className="w-full max-w-[520px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">💡 {DIFS[difficulty].label[l] ?? DIFS[difficulty].label.es}</p>
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

      <p className="text-white/70 text-sm mb-1 text-center px-2">{T('prompt', l)}</p>

      {/* Circuito */}
      <div className="relative w-full max-w-[520px] rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] mb-3">
        <CircuitoDiagrama round={round} prediccion={prediccion} onToggle={toggle} revelado={isResult} />

        {isResult && (
          <div className="absolute inset-x-0 bottom-0 bg-black/70 backdrop-blur-sm p-3 text-center">
            <p className={`font-black text-lg ${won ? 'text-green-400' : 'text-red-400'}`}>
              {won ? `✅ ${T('allRight', l)}` : `❌ ${T('wrong', l)}`}
            </p>
            {delta && (
              <p className="text-xs font-bold mt-0.5">
                {delta.won
                  ? <span className="text-green-400">+{delta.gain} · +{CORRECT_TIME}s ⏱️{delta.streak >= 2 ? ` · 🔥 ${delta.streak}` : ''}</span>
                  : <span className="text-red-400">−1 · −{WRONG_TIME}s ⏱️</span>}
              </p>
            )}
          </div>
        )}
      </div>

      {!isResult && (
        <div className="w-full max-w-[520px] px-1">
          <button onClick={confirmar}
            className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">
            {T('confirm', l)}
          </button>
        </div>
      )}
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
