import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { genRound, DIRS, axisBreakdown } from '../lib/fuerzaNeta'
import GameEndScreen from '../components/GameEndScreen'
import ForceDiagram from '../components/ForceDiagram'
import SEOHead from '../components/SEOHead'

// ── Copys ────────────────────────────────────────────────────────────────────
const C = {
  badge:  { es: 'Física · Fuerzas', en: 'Physics · Forces', ca: 'Física · Forces' },
  title:  { es: '🧭 ¿Hacia dónde se mueve?', en: '🧭 Which way does it move?', ca: '🧭 Cap on es mou?' },
  sub:    { es: 'Suma las fuerzas y acierta la dirección', en: 'Add the forces and guess the direction', ca: 'Suma les forces i encerta la direcció' },
  how:    { es: 'Cómo funciona', en: 'How it works', ca: 'Com funciona' },
  p1:     { es: 'Cada flecha es una fuerza (en newtons, N) que empuja la caja.', en: 'Each arrow is a force (in newtons, N) pushing the box.', ca: 'Cada fletxa és una força (en newtons, N) que empeny la caixa.' },
  p2:     { es: 'Suma las que van en el mismo eje: las opuestas se restan.', en: 'Add the ones on the same axis: opposite ones subtract.', ca: 'Suma les del mateix eix: les oposades es resten.' },
  p3:     { es: 'La fuerza neta te dice hacia dónde se mueve — o si se queda quieta.', en: 'The net force tells you which way it moves — or if it stays still.', ca: 'La força neta et diu cap on es mou — o si es queda quieta.' },
  eq:     { es: 'Si todas se cancelan, está en equilibrio y no se mueve.', en: 'If they all cancel out, it is balanced and does not move.', ca: 'Si totes es cancel·len, està en equilibri i no es mou.' },
  diag:   { es: 'Una fuerza diagonal (↗) suma su valor a los dos ejes a la vez.', en: 'A diagonal force (↗) adds its value to both axes at once.', ca: 'Una força diagonal (↗) suma el seu valor als dos eixos alhora.' },
  time:   { es: 'Tiempo', en: 'Time', ca: 'Temps' },
  timeVal:{ es: '40 segundos', en: '40 seconds', ca: '40 segons' },
  pts:    { es: 'Puntos', en: 'Points', ca: 'Punts' },
  ptsVal: { es: 'Acierto +1 y +3s · Fallo −1 y −3s', en: 'Correct +1 and +3s · Wrong −1 and −3s', ca: 'Encert +1 i +3s · Errada −1 i −3s' },
  streak: { es: 'Encadena aciertos: la racha da puntos extra por respuesta.', en: 'Chain correct answers: a streak gives extra points per answer.', ca: 'Encadena encerts: la ratxa dona punts extra per resposta.' },
  start:  { es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' },
  q:      { es: '¿Hacia dónde se mueve la caja?', en: 'Which way does the box move?', ca: 'Cap on es mou la caixa?' },
  correct:{ es: '¡Correcto!', en: 'Correct!', ca: 'Correcte!' },
  wrong:  { es: 'No exacto', en: 'Not quite', ca: 'No exacte' },
  net:    { es: 'Fuerza neta', en: 'Net force', ca: 'Força neta' },
  horiz:  { es: 'Horizontal', en: 'Horizontal', ca: 'Horitzontal' },
  vert:   { es: 'Vertical', en: 'Vertical', ca: 'Vertical' },
  next:   { es: 'Siguiente →', en: 'Next →', ca: 'Següent →' },
  end:    { es: 'Tiempo', en: "Time's up", ca: 'Temps' },
  hits:   { es: 'aciertos', en: 'correct', ca: 'encerts' },
  scoreLbl:{ es: 'puntos', en: 'points', ca: 'punts' },
  again:  { es: '▶ Jugar de nuevo', en: '▶ Play again', ca: '▶ Jugar de nou' },
  changeDif: { es: 'Cambiar dificultad', en: 'Change difficulty', ca: 'Canviar dificultat' },
  exam:    { es: 'Modo examen (tipo test) →', en: 'Exam mode (quiz) →', ca: 'Mode examen (tipus test) →' },
}
function T(k, l) { return C[k]?.[l] ?? C[k]?.es ?? k }

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, desc: { es: 'Dos fuerzas en un solo eje', en: 'Two forces on one axis', ca: 'Dues forces en un sol eix' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, desc: { es: 'Varias fuerzas en los dos ejes', en: 'Several forces on both axes', ca: 'Diverses forces als dos eixos' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, desc: { es: 'Fuerzas diagonales (45°) y números grandes', en: 'Diagonal forces (45°) and big numbers', ca: 'Forces diagonals (45°) i números grans' } },
}

const GAME_TIME = 40
const WRONG_TIME = 3    // segundos que resta cada fallo
const CORRECT_TIME = 3  // segundos que suma cada acierto

// ── Pantalla de dificultad ─────────────────────────────────────────────────────
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
            {[['🏹', T('p1', l)], ['➕', T('p2', l)], ['↗', T('diag', l)], ['🧭', T('p3', l)], ['⚖️', T('eq', l)], ['🔥', T('streak', l)]].map(([e, text]) => (
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
        <Link to="/examen/fuerza-neta-test"
          className="block text-center text-white/30 hover:text-white/60 text-sm transition-colors">
          {T('exam', l)}
        </Link>
      </div>
    </div>
  )
}

// ── Juego ──────────────────────────────────────────────────────────────────────
export default function FuerzaNeta() {
  const { lang } = useLang()
  const { user } = useAuth()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'

  const [screen, setScreen] = useState('difficulty') // difficulty | playing | end
  const [difficulty, setDifficulty] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [score, setScore] = useState(0)     // puntuación neta (sube/baja)
  const [correct, setCorrect] = useState(0) // aciertos totales (solo para la stat)
  const [streak, setStreak] = useState(0)   // aciertos seguidos
  const [round, setRound] = useState(null)
  const [phase, setPhase] = useState('choose')       // choose | result
  const [picked, setPicked] = useState(null)
  const [delta, setDelta] = useState(null)  // feedback de la última respuesta

  const timerRef = useRef(null)
  const scoreRef = useRef(0)
  const timeRef = useRef(GAME_TIME)
  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { timeRef.current = timeLeft }, [timeLeft])

  const next = useCallback((diff) => {
    setRound(genRound(diff))
    setPhase('choose')
    setPicked(null)
  }, [])

  function startGame(diff) {
    setDifficulty(diff)
    setScreen('playing')
    setScore(0)
    setCorrect(0)
    setStreak(0)
    setTimeLeft(GAME_TIME)
    next(diff)
  }

  // temporizador
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

  // guardar actividad
  useEffect(() => {
    if (screen !== 'end' || !user?.uid) return
    const pts = scoreRef.current * 10
    saveActivity(user.uid, {
      type: 'juego', game: 'fuerza-neta', category: 'fisica',
      score: pts, passed: scoreRef.current > 0,
      coinsEarned: computeCoins('fuerza-neta', { score: pts }),
      timeSpent: GAME_TIME - timeRef.current,
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [screen, user])

  function pick(opt) {
    if (phase !== 'choose') return
    setPicked(opt)
    setPhase('result')
    if (opt === round.answer) {
      const ns = streak + 1
      setStreak(ns)
      setCorrect(c => c + 1)
      const gain = Math.min(5, 1 + Math.floor((ns - 1) / 3)) // 1,1,1,2,2,2,3… (tope 5)
      setScore(s => s + gain)
      setTimeLeft(t => t + CORRECT_TIME) // cada acierto da tiempo
      setDelta({ won: true, gain, streak: ns })
    } else {
      setStreak(0)
      setScore(s => Math.max(0, s - 1)) // resta, sin bajar de 0
      setTimeLeft(t => Math.max(0, t - WRONG_TIME)) // penalización de tiempo
      setDelta({ won: false })
    }
  }

  // ── SEO ──
  const seo = {
    es: { title: 'Fuerza Neta — ¿Hacia dónde se mueve?', desc: 'Suma las fuerzas que actúan sobre un objeto y acierta hacia dónde se mueve, o si está en equilibrio. Juego de física gratis para practicar fuerzas y las leyes de Newton.', path: '/juegos/fuerza-neta' },
    en: { title: 'Net Force — Which way does it move?', desc: 'Add up the forces acting on an object and guess which way it moves, or if it is balanced. Free physics game to practise forces and Newton’s laws.', path: '/en/juegos/fuerza-neta' },
    ca: { title: 'Força Neta — Cap on es mou?', desc: 'Suma les forces que actuen sobre un objecte i encerta cap on es mou, o si està en equilibri. Joc de física gratis per practicar forces i les lleis de Newton.', path: '/ca/juegos/fuerza-neta' },
  }[l]

  if (screen === 'difficulty') {
    return (<><SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} /><DifficultyScreen onSelect={startGame} l={l} /></>)
  }

  if (screen === 'end') {
    const pts = score * 10
    const msg = { es: score === 0 ? '¡Sigue practicando!' : score < 4 ? 'Buen comienzo' : score < 9 ? '¡Bien hecho!' : '¡Dominas las fuerzas! 💪', en: score === 0 ? 'Keep practising!' : score < 4 ? 'Good start' : score < 9 ? 'Well done!' : 'You master forces! 💪', ca: score === 0 ? 'Segueix practicant!' : score < 4 ? 'Bon començament' : score < 9 ? 'Ben fet!' : 'Domines les forces! 💪' }[l]
    const shareText = l === 'en'
      ? `I got ${correct} right in Net Force 🧭 — can you beat me? https://tuthor.es/juegos/fuerza-neta`
      : l === 'ca'
      ? `He encertat ${correct} a Força Neta 🧭 — pots superar-me? https://tuthor.es/juegos/fuerza-neta`
      : `He acertado ${correct} en Fuerza Neta 🧭 — ¿puedes superarme? https://tuthor.es/juegos/fuerza-neta`
    return (
      <GameEndScreen game="fuerza-neta" emoji="🧭" title={T('end', l)} score={pts} message={msg}
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
  const answer = round.answer
  const won = picked === answer

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      {/* Header */}
      <div className="w-full max-w-[520px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">🧭 {DIFS[difficulty].label[l] ?? DIFS[difficulty].label.es}</p>
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

      <p className="text-white/60 text-sm mb-1">{T('q', l)}</p>

      {/* Diagrama */}
      <div className="relative w-full max-w-[520px] rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] mb-3">
        <ForceDiagram round={round} reveal={isResult} />

        {/* overlay resultado */}
        {isResult && (
          <div className="absolute inset-x-0 bottom-0 bg-black/70 backdrop-blur-sm p-3 text-center">
            <p className={`font-black text-lg ${won ? 'text-green-400' : 'text-red-400'}`}>
              {won ? T('correct', l) : T('wrong', l)} · {DIRS[answer].arrow} {DIRS[answer].label[l] ?? DIRS[answer].label.es}
            </p>
            {delta && (
              <p className="text-xs font-bold mt-0.5">
                {delta.won
                  ? <span className="text-green-400">+{delta.gain} · +{CORRECT_TIME}s ⏱️{delta.streak >= 2 ? ` · 🔥 ${delta.streak}` : ''}</span>
                  : <span className="text-red-400">−1 · −{WRONG_TIME}s ⏱️</span>}
              </p>
            )}
            <p className="text-white/70 text-xs font-mono mt-1">
              {T('horiz', l)}: {axisBreakdown(round.forces, 'H')} · {T('vert', l)}: {axisBreakdown(round.forces, 'V')}
            </p>
          </div>
        )}
      </div>

      {/* opciones */}
      <div className="w-full max-w-[520px] px-1">
        <div className="grid grid-cols-2 gap-2">
          {round.options.map(opt => {
            const isCorrect = isResult && opt === answer
            const isWrong = isResult && opt === picked && !won
            let cls = 'bg-white/5 hover:bg-white/10 border-white/10'
            if (isCorrect) cls = 'bg-green-500/20 border-green-500'
            else if (isWrong) cls = 'bg-red-500/20 border-red-500'
            else if (isResult) cls = 'bg-white/5 border-white/10 opacity-40'
            return (
              <button key={opt} onClick={() => pick(opt)} disabled={isResult}
                className={`px-3 py-3 rounded-xl border font-semibold text-sm text-white transition-all flex items-center gap-2 ${cls}`}>
                <span className="text-lg">{DIRS[opt].arrow}</span>
                <span className="text-left text-xs">{DIRS[opt].label[l] ?? DIRS[opt].label.es}</span>
                {isCorrect && <span className="ml-auto">✓</span>}
              </button>
            )
          })}
        </div>

        {isResult && (
          <button onClick={() => next(difficulty)}
            className="w-full mt-3 py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">
            {T('next', l)}
          </button>
        )}
      </div>
    </div>
  )
}
