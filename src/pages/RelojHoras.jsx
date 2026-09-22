import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { nuevaHora, formatoDigital, enPalabras, esCorrecta } from '../lib/reloj'
import RelojAnalogico from '../components/RelojAnalogico'
import GameEndScreen from '../components/GameEndScreen'
import SupportBlock from '../components/SupportBlock'
import SEOHead from '../components/SEOHead'

const GAME_TIME = 40
const STEP = 3

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },     desc: { es: 'En punto y y media', en: "O'clock and half past", ca: 'En punt i i mitja' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },   desc: { es: 'Los cuartos: y cuarto, y media, menos cuarto', en: 'Quarters: quarter past, half past, quarter to', ca: 'Els quarts: i quart, i mitja, menys quart' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, desc: { es: 'Cualquier minuto, de 5 en 5', en: 'Any minute, in steps of 5', ca: 'Qualsevol minut, de 5 en 5' } },
}

const tr = (o, l) => o?.[l] ?? o?.es

export default function RelojHoras() {
  const { lang } = useLang()
  const { user } = useAuth()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'

  const [screen, setScreen] = useState('difficulty')
  const [dif, setDif] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [streak, setStreak] = useState(0)
  const [objetivo, setObjetivo] = useState(null)
  const [puesta, setPuesta] = useState({ hora: 12, minuto: 0 })
  const [phase, setPhase] = useState('choose') // choose | result
  const [delta, setDelta] = useState(null)

  const timerRef = useRef(null)
  const scoreRef = useRef(0)
  const timeRef = useRef(GAME_TIME)
  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { timeRef.current = timeLeft }, [timeLeft])

  function siguiente(d) {
    setObjetivo(nuevaHora(d))
    setPuesta({ hora: 12, minuto: 0 })
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
      type: 'juego', game: 'reloj-horas', category: 'matematicas',
      score: pts, passed: scoreRef.current > 0,
      coinsEarned: computeCoins('reloj-horas', { score: pts }),
      timeSpent: GAME_TIME - timeRef.current,
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [screen, user])

  function confirmar() {
    if (phase !== 'choose' || !objetivo) return
    setPhase('result')
    const won = esCorrecta(objetivo, puesta)
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
    es: { title: '¿Qué hora es? — Aprende a leer el reloj jugando', desc: 'Coloca las manecillas del reloj en la hora que se pide: en punto, y media, y cuarto, menos cuarto y minutos exactos. Aprende a leer las horas en el reloj analógico. Juego de matemáticas gratis.', path: '/juegos/reloj-horas' },
    en: { title: 'What time is it? — Learn to read the clock', desc: 'Set the clock hands to the time asked: o\'clock, half past, quarter past, quarter to and exact minutes. Learn to tell the time on an analog clock. Free maths game.', path: '/en/juegos/reloj-horas' },
    ca: { title: 'Quina hora és? — Aprèn a llegir el rellotge jugant', desc: 'Col·loca les manetes del rellotge a l\'hora que es demana: en punt, i mitja, i quart, menys quart i minuts exactes. Aprèn a llegir les hores al rellotge analògic. Joc de matemàtiques gratis.', path: '/ca/juegos/reloj-horas' },
  }[l]

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (screen === 'difficulty') {
    return (
      <>
        <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />
        <div className="relative z-10 flex flex-col items-center min-h-[calc(100dvh-4rem)] px-4 py-8">
          <div className="max-w-md w-full">
            <SupportBlock variant="top" className="mb-5" />
            <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{tr({ es: 'Matemáticas · Medida del tiempo', en: 'Maths · Telling the time', ca: 'Matemàtiques · Mesura del temps' }, l)}</p>
            <h1 className="text-3xl font-black text-white text-center mb-1">🕐 {tr({ es: '¿Qué hora es?', en: 'What time is it?', ca: 'Quina hora és?' }, l)}</h1>
            <p className="text-white/40 text-sm text-center mb-6">{tr({ es: 'Pon la hora en el reloj arrastrando las manecillas', en: 'Set the time by dragging the hands', ca: 'Posa l\'hora arrossegant les manetes' }, l)}</p>

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
                ['👆', tr({ es: 'Arrastra la manecilla larga (minutos) y la corta (horas) hasta la hora pedida.', en: 'Drag the long hand (minutes) and the short one (hours) to the time asked.', ca: 'Arrossega la maneta llarga (minuts) i la curta (hores) fins a l\'hora demanada.' }, l)],
                ['⏱️', tr({ es: '40 segundos. Acierto +3s, fallo −3s.', en: '40 seconds. Correct +3s, wrong −3s.', ca: '40 segons. Encert +3s, errada −3s.' }, l)],
                ['🎯', tr({ es: 'Al fallar se ve la hora correcta en verde para aprender.', en: 'On a miss the correct time shows in green so you learn.', ca: 'En fallar es veu l\'hora correcta en verd per aprendre.' }, l)],
              ].map(([e, t]) => (
                <div key={t} className="flex items-start gap-3 text-sm text-white/50"><span className="text-base w-5 shrink-0 text-center">{e}</span><span>{t}</span></div>
              ))}
            </div>

            <button onClick={() => empezar(dif)}
              className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20 mb-3">
              {tr({ es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' }, l)}
            </button>
            <Link to="/examen/reloj-horas-test" className="block text-center text-white/30 hover:text-white/60 text-sm transition-colors">
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
      es: score === 0 ? '¡Sigue practicando!' : score < 4 ? 'Buen comienzo' : score < 9 ? '¡Bien hecho!' : '¡Dominas el reloj! 🕐',
      en: score === 0 ? 'Keep practising!' : score < 4 ? 'Good start' : score < 9 ? 'Well done!' : 'Clock master! 🕐',
      ca: score === 0 ? 'Segueix practicant!' : score < 4 ? 'Bon començament' : score < 9 ? 'Ben fet!' : 'Domines el rellotge! 🕐',
    }, l)
    const shareText = l === 'en'
      ? `I read ${correct} clocks right in What time is it? 🕐 — can you beat me? https://tuthor.es/juegos/reloj-horas`
      : l === 'ca'
      ? `He encertat ${correct} rellotges a Quina hora és? 🕐 — pots superar-me? https://tuthor.es/juegos/reloj-horas`
      : `He acertado ${correct} relojes en ¿Qué hora es? 🕐 — ¿puedes superarme? https://tuthor.es/juegos/reloj-horas`
    return (
      <GameEndScreen game="reloj-horas" emoji="🕐" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' }, l)} score={pts} message={msg}
        stats={[{ label: tr({ es: 'aciertos', en: 'correct', ca: 'encerts' }, l), value: correct, emoji: '✅' }]}
        shareText={shareText} onPlayAgain={() => empezar(dif)} playAgainLabel={tr({ es: '▶ Jugar de nuevo', en: '▶ Play again', ca: '▶ Jugar de nou' }, l)}
        secondaryActions={[{ label: tr({ es: 'Cambiar dificultad', en: 'Change difficulty', ca: 'Canviar dificultat' }, l), onClick: () => setScreen('difficulty') }]}
        user={user} lang={lang} />
    )
  }

  if (!objetivo) return null

  const timerPct = timeLeft / GAME_TIME
  const timerColor = timeLeft > 30 ? '#22c55e' : timeLeft > 10 ? '#f59e0b' : '#ef4444'
  const isResult = phase === 'result'
  const won = isResult && esCorrecta(objetivo, puesta)

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100dvh-4rem)] px-3 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      {/* Header */}
      <div className="w-full max-w-[380px] flex items-center justify-between mb-2 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">🕐 {tr(DIFS[dif].label, l)}</p>
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
      <div className="text-center mb-2">
        <p className="text-white/40 text-xs uppercase tracking-widest">{tr({ es: 'Pon esta hora', en: 'Set this time', ca: 'Posa aquesta hora' }, l)}</p>
        <p className="text-white font-black text-3xl tabular-nums leading-tight">{formatoDigital(objetivo.hora, objetivo.minuto)}</p>
        <p className="text-[#EDAE49] font-semibold text-sm">{enPalabras(objetivo.hora, objetivo.minuto, l)}</p>
      </div>

      {/* Reloj */}
      <div className="w-full max-w-[340px] mb-3">
        <RelojAnalogico value={puesta} onChange={setPuesta} interactive={!isResult}
          estado={isResult ? (won ? 'correcto' : 'incorrecto') : 'idle'}
          objetivo={objetivo} />
      </div>

      {isResult && (
        <div className="text-center mb-3">
          <p className={`font-black text-lg ${won ? 'text-green-400' : 'text-red-400'}`}>
            {won ? `✅ ${tr({ es: '¡Correcto!', en: 'Correct!', ca: 'Correcte!' }, l)}` : `❌ ${tr({ es: 'Era', en: 'It was', ca: 'Era' }, l)} ${formatoDigital(objetivo.hora, objetivo.minuto)}`}
          </p>
          {delta && <p className="text-xs font-bold mt-0.5">
            {delta.won
              ? <span className="text-green-400">+{delta.gain} · +{STEP}s ⏱️{delta.streak >= 2 ? ` · 🔥 ${delta.streak}` : ''}</span>
              : <span className="text-red-400">−1 · −{STEP}s ⏱️</span>}
          </p>}
        </div>
      )}

      <div className="w-full max-w-[380px] px-1">
        {!isResult
          ? <button onClick={confirmar} className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">{tr({ es: 'Confirmar →', en: 'Confirm →', ca: 'Confirmar →' }, l)}</button>
          : <button onClick={() => siguiente(dif)} className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">{tr({ es: 'Siguiente →', en: 'Next →', ca: 'Següent →' }, l)}</button>}
      </div>
    </div>
  )
}
