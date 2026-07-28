import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { genRound, isCorrectParams } from '../lib/funciones'
import GameEndScreen from '../components/GameEndScreen'
import AjustaGrafica from '../components/AjustaGrafica'
import SEOHead from '../components/SEOHead'

const GAME_TIME = 60
const WRONG_TIME = 4
const CORRECT_TIME = 4

const C = {
  badge:  { es: 'Matemáticas · Funciones', en: 'Maths · Functions', ca: 'Matemàtiques · Funcions' },
  title:  { es: '📈 Caza la Función', en: '📈 Function Hunt', ca: '📈 Caça la Funció' },
  sub:    { es: 'Lee la gráfica y ajusta los números hasta que tu curva encaje', en: 'Read the graph and adjust the numbers until your curve fits', ca: 'Llegeix la gràfica i ajusta els números fins que la teva corba encaixi' },
  how:    { es: 'Cómo funciona', en: 'How it works', ca: 'Com funciona' },
  p1:     { es: 'La curva punteada es la función objetivo. La tuya es la de color.', en: 'The dashed curve is the target function. Yours is the coloured one.', ca: 'La corba puntejada és la funció objectiu. La teva és la de color.' },
  p2:     { es: 'Ajusta los parámetros (▲▼): la pendiente m, la ordenada b… y mira cómo cambia tu curva.', en: 'Adjust the parameters (▲▼): slope m, intercept b… and watch your curve change.', ca: 'Ajusta els paràmetres (▲▼): el pendent m, l’ordenada b… i mira com canvia la teva corba.' },
  p3:     { es: 'Cuando tu curva se superpone exactamente a la objetivo, ¡la cazaste!', en: 'When your curve overlaps the target exactly, you’ve caught it!', ca: 'Quan la teva corba se superposa exactament a l’objectiu, l’has caçat!' },
  time:   { es: 'Tiempo', en: 'Time', ca: 'Temps' },
  timeVal:{ es: '60 segundos', en: '60 seconds', ca: '60 segons' },
  pts:    { es: 'Puntos', en: 'Points', ca: 'Punts' },
  ptsVal: { es: 'Acierto +1 y +4s · Fallo −1 y −4s', en: 'Correct +1 and +4s · Wrong −1 and −4s', ca: 'Encert +1 i +4s · Errada −1 i −4s' },
  start:  { es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' },
  prompt: { es: 'Encaja tu curva sobre la punteada', en: 'Match your curve onto the dashed one', ca: 'Encaixa la teva corba sobre la puntejada' },
  check:  { es: 'Comprobar', en: 'Check', ca: 'Comprovar' },
  caught: { es: '¡Cazada!', en: 'Caught it!', ca: 'Caçada!' },
  notYet: { es: 'Aún no encaja', en: 'Not matching yet', ca: 'Encara no encaixa' },
  wasAns: { es: 'Era:', en: 'It was:', ca: 'Era:' },
  next:   { es: 'Siguiente →', en: 'Next →', ca: 'Següent →' },
  end:    { es: 'Tiempo', en: "Time's up", ca: 'Temps' },
  hits:   { es: 'funciones', en: 'functions', ca: 'funcions' },
  scoreLbl:{ es: 'puntos', en: 'points', ca: 'punts' },
  again:  { es: '▶ Jugar de nuevo', en: '▶ Play again', ca: '▶ Jugar de nou' },
  changeDif:{ es: 'Cambiar dificultad', en: 'Change difficulty', ca: 'Canviar dificultat' },
  exam:   { es: 'Modo examen (sin tiempo) →', en: 'Exam mode (no timer) →', ca: 'Mode examen (sense temps) →' },
}
function T(k, l) { return C[k]?.[l] ?? C[k]?.es ?? k }

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, desc: { es: 'Rectas: y = mx + b', en: 'Lines: y = mx + b', ca: 'Rectes: y = mx + b' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, desc: { es: 'Rectas y parábolas y = ax² + c', en: 'Lines and parabolas y = ax² + c', ca: 'Rectes i paràboles y = ax² + c' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, desc: { es: 'Parábolas completas y = ax² + bx + c', en: 'Full parabolas y = ax² + bx + c', ca: 'Paràboles completes y = ax² + bx + c' } },
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
            {[['🎯', T('p1', l)], ['🎚️', T('p2', l)], ['📈', T('p3', l)]].map(([e, text]) => (
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
        <Link to="/examen/funciones-grafica-test"
          className="block text-center text-white/30 hover:text-white/60 text-sm transition-colors">
          {T('exam', l)}
        </Link>
      </div>
    </div>
  )
}

export default function FuncionesGrafica() {
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
  const [params, setParams] = useState({})
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
    setParams({ ...r.params0 })
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
      type: 'juego', game: 'funciones-grafica', category: 'matematicas',
      score: pts, passed: scoreRef.current > 0,
      coinsEarned: computeCoins('funciones-grafica', { score: pts }),
      timeSpent: GAME_TIME - timeRef.current,
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [screen, user])

  function step(key, d) {
    if (phase !== 'choose') return
    setParams(p => {
      const c = round.controls.find(c => c.key === key)
      return { ...p, [key]: Math.max(c.min, Math.min(c.max, (p[key] || 0) + d)) }
    })
  }

  function check() {
    if (phase !== 'choose') return
    const ok = isCorrectParams(round, params)
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
      setDelta({ won: false })
    }
  }

  const seo = {
    es: { title: 'Caza la Función — Gráficas de rectas y parábolas', desc: 'Lee la gráfica y ajusta la pendiente y la ordenada (o a, b, c) hasta que tu curva encaje sobre la función objetivo. Aprende funciones lineales y cuadráticas jugando. Juego de matemáticas gratis.', path: '/juegos/funciones-grafica' },
    en: { title: 'Function Hunt — Graphs of lines and parabolas', desc: 'Read the graph and adjust the slope and intercept (or a, b, c) until your curve matches the target function. Learn linear and quadratic functions by playing. Free maths game.', path: '/en/juegos/funciones-grafica' },
    ca: { title: 'Caça la Funció — Gràfiques de rectes i paràboles', desc: 'Llegeix la gràfica i ajusta el pendent i l’ordenada (o a, b, c) fins que la teva corba encaixi sobre la funció objectiu. Aprèn funcions lineals i quadràtiques jugant. Joc de matemàtiques gratis.', path: '/ca/juegos/funciones-grafica' },
  }[l]

  if (screen === 'difficulty') {
    return (<><SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} /><DifficultyScreen onSelect={startGame} l={l} /></>)
  }

  if (screen === 'end') {
    const pts = score * 10
    const msg = { es: score === 0 ? '¡Sigue practicando!' : score < 4 ? 'Buen comienzo' : score < 9 ? '¡Bien hecho!' : '¡Cazador de funciones! 💪', en: score === 0 ? 'Keep practising!' : score < 4 ? 'Good start' : score < 9 ? 'Well done!' : 'Function hunter! 💪', ca: score === 0 ? 'Segueix practicant!' : score < 4 ? 'Bon començament' : score < 9 ? 'Ben fet!' : 'Caçador de funcions! 💪' }[l]
    const shareText = l === 'en'
      ? `I caught ${correct} functions in Function Hunt 📈 — can you beat me? https://tuthor.es/juegos/funciones-grafica`
      : l === 'ca'
      ? `He caçat ${correct} funcions a Caça la Funció 📈 — pots superar-me? https://tuthor.es/juegos/funciones-grafica`
      : `He cazado ${correct} funciones en Caza la Función 📈 — ¿puedes superarme? https://tuthor.es/juegos/funciones-grafica`
    return (
      <GameEndScreen game="funciones-grafica" emoji="📈" title={T('end', l)} score={pts} message={msg}
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

      <div className="w-full max-w-[520px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">📈 {DIFS[difficulty].label[l] ?? DIFS[difficulty].label.es}</p>
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
        <AjustaGrafica round={round} params={params} onStep={step} reveal={isResult} l={l} />
      </div>

      {isResult && (
        <div className="w-full max-w-[520px] px-1 space-y-2">
          <div className={`rounded-xl px-3 py-2 text-center ${won ? 'bg-green-500/10 border border-green-500/30' : 'bg-red-500/10 border border-red-500/30'}`}>
            <p className={`font-black ${won ? 'text-green-400' : 'text-red-400'}`}>
              {won ? `📈 ${T('caught', l)}` : T('notYet', l)}
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
