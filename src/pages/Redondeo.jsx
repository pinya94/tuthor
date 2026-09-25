import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { nuevaRonda, esCorrecta, formatNum, placeFrase } from '../lib/redondeo'
import { RectaRedondeo } from '../components/RectaRedondeo'
import GameEndScreen from '../components/GameEndScreen'
import SupportBlock from '../components/SupportBlock'
import SEOHead from '../components/SEOHead'

const GAME_TIME = 50
const STEP = 3

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },     desc: { es: 'A la decena', en: 'To the nearest ten', ca: 'A la desena' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },   desc: { es: 'A la decena o la centena', en: 'Ten or hundred', ca: 'A la desena o la centena' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, desc: { es: 'Millares y decimales', en: 'Thousands and decimals', ca: 'Milers i decimals' } },
}

const tr = (o, l) => o?.[l] ?? o?.es

export default function Redondeo() {
  const { lang } = useLang()
  const { user } = useAuth()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'

  const [screen, setScreen] = useState('difficulty')
  const [dif, setDif] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [streak, setStreak] = useState(0)
  const [ronda, setRonda] = useState(null)
  const [eleccion, setEleccion] = useState(null)
  const [phase, setPhase] = useState('choose')
  const [delta, setDelta] = useState(null)

  const timerRef = useRef(null)
  const scoreRef = useRef(0)
  const timeRef = useRef(GAME_TIME)
  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { timeRef.current = timeLeft }, [timeLeft])

  function siguiente(d) {
    setRonda(nuevaRonda(d))
    setEleccion(null)
    setPhase('choose')
    setDelta(null)
  }
  function empezar(d) {
    setDif(d); setScreen('playing')
    setScore(0); setCorrect(0); setStreak(0)
    setTimeLeft(GAME_TIME); timeRef.current = GAME_TIME
    siguiente(d)
  }

  useEffect(() => {
    if (screen !== 'playing') return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { clearInterval(timerRef.current); setScreen('end'); return 0 } return t - 1 })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [screen])
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  useEffect(() => {
    if (screen !== 'end' || !user?.uid) return
    const pts = scoreRef.current * 10
    saveActivity(user.uid, {
      type: 'juego', game: 'redondeo', category: 'matematicas',
      score: pts, passed: scoreRef.current > 0,
      coinsEarned: computeCoins('redondeo', { score: pts }),
      timeSpent: GAME_TIME - timeRef.current,
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [screen, user])

  function elegir(valor) {
    if (phase !== 'choose' || !ronda) return
    setEleccion(valor)
    setPhase('result')
    const won = esCorrecta(ronda, valor)
    if (won) {
      const ns = streak + 1
      setStreak(ns); setCorrect(c => c + 1)
      const gain = Math.min(5, 1 + Math.floor((ns - 1) / 3))
      setScore(s => s + gain)
      setTimeLeft(t => t + STEP)
      setDelta({ won: true, gain, streak: ns })
    } else {
      setStreak(0)
      setScore(s => Math.max(0, s - 1))
      setTimeLeft(t => Math.max(0, t - STEP))
      setDelta({ won: false })
    }
  }

  const seo = {
    es: { title: 'Redondeo — redondea a la decena, centena y millar jugando', desc: 'Redondea números a la decena, centena, millar y decimales sobre una recta: elige el redondo más cercano con la regla del 5. Juego de matemáticas gratis para primaria y ESO.', path: '/juegos/redondeo' },
    en: { title: 'Rounding — round to the nearest ten, hundred by playing', desc: 'Round numbers to the nearest ten, hundred, thousand and decimals on a number line: pick the nearest round number with the rule of 5. Free maths game.', path: '/en/juegos/redondeo' },
    ca: { title: 'Arrodoniment — arrodoneix a la desena i la centena jugant', desc: 'Arrodoneix nombres a la desena, centena, miler i decimals sobre una recta: tria el redó més proper amb la regla del 5. Joc de matemàtiques gratis.', path: '/ca/juegos/redondeo' },
  }[l]

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (screen === 'difficulty') {
    return (
      <>
        <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />
        <div className="relative z-10 flex flex-col items-center min-h-[calc(100dvh-4rem)] px-4 py-8">
          <div className="max-w-md w-full">
            <SupportBlock variant="top" className="mb-5" />
            <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{tr({ es: 'Matemáticas · Números', en: 'Maths · Numbers', ca: 'Matemàtiques · Nombres' }, l)}</p>
            <h1 className="text-3xl font-black text-white text-center mb-1">📍 {tr({ es: 'Redondeo', en: 'Rounding', ca: 'Arrodoniment' }, l)}</h1>
            <p className="text-white/40 text-sm text-center mb-6">{tr({ es: 'Elige el número redondo más cercano', en: 'Pick the nearest round number', ca: 'Tria el nombre redó més proper' }, l)}</p>

            <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl mb-3">
              {Object.entries(DIFS).map(([id, d]) => (
                <button key={id} onClick={() => setDif(id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${dif === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}>
                  {d.emoji} {tr(d.label, l)}
                </button>
              ))}
            </div>
            <p className="text-white/40 text-sm text-center mb-6">{tr(DIFS[dif].desc, l)}</p>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 space-y-2.5">
              {[
                ['📍', tr({ es: 'El número cae entre sus dos redondos vecinos: toca el más cercano.', en: 'The number falls between its two round neighbours: tap the nearer one.', ca: 'El nombre cau entre els seus dos redons veïns: toca el més proper.' }, l)],
                ['5️⃣', tr({ es: 'La regla del 5: si la cifra siguiente es 5 o más, sube; si es menos, baja.', en: 'The rule of 5: if the next digit is 5 or more, round up; if less, round down.', ca: 'La regla del 5: si la xifra següent és 5 o més, puja; si és menys, baixa.' }, l)],
                ['⏱️', tr({ es: '50 segundos. Acierto +3s, fallo −3s.', en: '50 seconds. Correct +3s, wrong −3s.', ca: '50 segons. Encert +3s, errada −3s.' }, l)],
              ].map(([e, t]) => (
                <div key={t} className="flex items-start gap-3 text-sm text-white/50"><span className="text-base w-5 shrink-0 text-center">{e}</span><span>{t}</span></div>
              ))}
            </div>

            <button onClick={() => empezar(dif)}
              className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20 mb-3">
              {tr({ es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' }, l)}
            </button>
            <Link to="/examen/redondeo-test" className="block text-center text-white/30 hover:text-white/60 text-sm transition-colors">
              {tr({ es: 'Modo examen (con nota) →', en: 'Exam mode (graded) →', ca: 'Mode examen (amb nota) →' }, l)}
            </Link>
          </div>
        </div>
      </>
    )
  }

  // ── FIN ─────────────────────────────────────────────────────────────────────
  if (screen === 'end') {
    const pts = score * 10
    const msg = tr({
      es: score === 0 ? '¡Sigue practicando!' : score < 4 ? 'Buen comienzo' : score < 9 ? '¡Bien hecho!' : '¡Redondeas de cabeza! 📍',
      en: score === 0 ? 'Keep practising!' : score < 4 ? 'Good start' : score < 9 ? 'Well done!' : 'You round in your head! 📍',
      ca: score === 0 ? 'Segueix practicant!' : score < 4 ? 'Bon començament' : score < 9 ? 'Ben fet!' : 'Arrodoneixes de cap! 📍',
    }, l)
    const shareText = l === 'en'
      ? `I rounded ${correct} numbers right 📍 — can you beat me? https://tuthor.es/juegos/redondeo`
      : l === 'ca'
      ? `He arrodonit ${correct} nombres 📍 — pots superar-me? https://tuthor.es/juegos/redondeo`
      : `He redondeado ${correct} números 📍 — ¿puedes superarme? https://tuthor.es/juegos/redondeo`
    return (
      <GameEndScreen game="redondeo" emoji="📍" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' }, l)} score={pts} message={msg}
        stats={[{ label: tr({ es: 'aciertos', en: 'correct', ca: 'encerts' }, l), value: correct, emoji: '✅' }]}
        shareText={shareText} onPlayAgain={() => empezar(dif)} playAgainLabel={tr({ es: '▶ Jugar de nuevo', en: '▶ Play again', ca: '▶ Jugar de nou' }, l)}
        secondaryActions={[{ label: tr({ es: 'Cambiar dificultad', en: 'Change difficulty', ca: 'Canviar dificultat' }, l), onClick: () => setScreen('difficulty') }]}
        user={user} lang={lang} />
    )
  }

  if (!ronda) return null

  const timerPct = timeLeft / GAME_TIME
  const timerColor = timeLeft > 30 ? '#22c55e' : timeLeft > 10 ? '#f59e0b' : '#ef4444'
  const isResult = phase === 'result'
  const won = isResult && esCorrecta(ronda, eleccion)

  const opciones = [ronda.abajo, ronda.arriba]
  function optClass(v) {
    if (!isResult) return 'bg-white/10 border-white/20 text-white hover:bg-white/20 active:scale-95'
    if (Math.abs(v - ronda.objetivo) < 1e-9) return 'bg-green-500/25 border-green-400 text-green-200'
    if (Math.abs(v - eleccion) < 1e-9) return 'bg-red-500/20 border-red-400 text-red-300'
    return 'bg-white/5 border-white/10 text-white/40'
  }

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100dvh-4rem)] px-3 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      {/* Header */}
      <div className="w-full max-w-[420px] flex items-center justify-between mb-2 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">📍 {tr(DIFS[dif].label, l)}</p>
          <p className="text-white font-bold text-lg flex items-center gap-2">
            {score} {tr({ es: 'puntos', en: 'points', ca: 'punts' }, l)}
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
          <div className="absolute inset-0 flex items-center justify-center"><span className="font-black text-sm" style={{ color: timerColor }}>{timeLeft}</span></div>
        </div>
      </div>

      {/* Objetivo */}
      <div className="text-center mb-1">
        <p className="text-white/40 text-xs uppercase tracking-widest">{tr({ es: 'Redondea', en: 'Round', ca: 'Arrodoneix' }, l)} {placeFrase(ronda.p, l)}</p>
        <p className="text-white font-black text-4xl tabular-nums">{formatNum(ronda.valor, l, ronda.decimales)}</p>
      </div>

      {/* Recta */}
      <div className="w-full max-w-[420px] mb-2">
        <RectaRedondeo ronda={ronda} l={l} revealNearest={isResult ? ronda.objetivo : null} className="w-full h-auto" />
      </div>

      {/* Feedback */}
      {isResult && (
        <div className="w-full max-w-[420px] text-center mb-2">
          <p className={`font-black text-lg ${won ? 'text-green-400' : 'text-red-400'}`}>
            {won
              ? `✅ ${tr({ es: '¡Correcto!', en: 'Correct!', ca: 'Correcte!' }, l)}`
              : `❌ ${formatNum(ronda.objetivo, l, ronda.decimales)}`}
          </p>
          {delta && <p className="text-xs font-bold mt-0.5">
            {delta.won
              ? <span className="text-green-400">+{delta.gain} · +{STEP}s ⏱️{delta.streak >= 2 ? ` · 🔥 ${delta.streak}` : ''}</span>
              : <span className="text-red-400">−1 · −{STEP}s ⏱️</span>}
          </p>}
        </div>
      )}

      {/* Opciones */}
      <div className="w-full max-w-[420px] grid grid-cols-2 gap-3 mb-3">
        {opciones.map(v => (
          <button key={v} onClick={() => elegir(v)} disabled={isResult}
            className={`py-5 rounded-2xl border font-black text-2xl tabular-nums transition ${optClass(v)}`}>
            {formatNum(v, l, ronda.decimales)}
          </button>
        ))}
      </div>

      {/* Siguiente */}
      {isResult && (
        <div className="w-full max-w-[420px]">
          <button onClick={() => siguiente(dif)} className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">{tr({ es: 'Siguiente →', en: 'Next →', ca: 'Següent →' }, l)}</button>
        </div>
      )}
    </div>
  )
}
