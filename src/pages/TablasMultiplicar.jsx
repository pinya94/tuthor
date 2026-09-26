import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { nuevaPregunta, esCorrecta } from '../lib/tablas'
import GameEndScreen from '../components/GameEndScreen'
import SupportBlock from '../components/SupportBlock'
import SEOHead from '../components/SEOHead'

const GAME_TIME = 50
const STEP = 2

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },     desc: { es: 'Tablas del 2, el 5 y el 10', en: '2, 5 and 10 times tables', ca: 'Taules del 2, el 5 i el 10' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },   desc: { es: 'Todas las tablas (1 al 10)', en: 'All tables (1 to 10)', ca: 'Totes les taules (1 al 10)' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, desc: { es: 'Tablas altas y divisiones', en: 'High tables and divisions', ca: 'Taules altes i divisions' } },
}

const tr = (o, l) => o?.[l] ?? o?.es

export default function TablasMultiplicar() {
  const { lang } = useLang()
  const { user } = useAuth()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'

  const [screen, setScreen] = useState('difficulty')
  const [dif, setDif] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [streak, setStreak] = useState(0)
  const [preg, setPreg] = useState(null)
  const [eleccion, setEleccion] = useState(null)
  const [phase, setPhase] = useState('choose')
  const [delta, setDelta] = useState(null)

  const timerRef = useRef(null)
  const scoreRef = useRef(0)
  const timeRef = useRef(GAME_TIME)
  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { timeRef.current = timeLeft }, [timeLeft])

  function siguiente(d) {
    setPreg(nuevaPregunta(d))
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
      type: 'juego', game: 'tablas-multiplicar', category: 'matematicas',
      score: pts, passed: scoreRef.current > 0,
      coinsEarned: computeCoins('tablas-multiplicar', { score: pts }),
      timeSpent: GAME_TIME - timeRef.current,
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [screen, user])

  function elegir(valor) {
    if (phase !== 'choose' || !preg) return
    setEleccion(valor)
    setPhase('result')
    const won = esCorrecta(preg, valor)
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
    es: { title: 'Tablas de Multiplicar — practícalas jugando y a contrarreloj', desc: 'Practica las tablas de multiplicar del 1 al 10 (y las divisiones) a contrarreloj: elige el resultado antes de que se acabe el tiempo. Juego de matemáticas gratis para primaria.', path: '/juegos/tablas-multiplicar' },
    en: { title: 'Times Tables — practise them by playing against the clock', desc: 'Practise the times tables from 1 to 10 (and divisions) against the clock: pick the answer before time runs out. Free maths game for primary school.', path: '/en/juegos/tablas-multiplicar' },
    ca: { title: 'Taules de Multiplicar — practica-les jugant i a contrarellotge', desc: 'Practica les taules de multiplicar de l\'1 al 10 (i les divisions) a contrarellotge: tria el resultat abans que s\'acabi el temps. Joc de matemàtiques gratis per a primària.', path: '/ca/juegos/tablas-multiplicar' },
  }[l]

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (screen === 'difficulty') {
    return (
      <>
        <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />
        <div className="relative z-10 flex flex-col items-center min-h-[calc(100dvh-4rem)] px-4 py-8">
          <div className="max-w-md w-full">
            <SupportBlock variant="top" className="mb-5" />
            <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{tr({ es: 'Matemáticas · Cálculo', en: 'Maths · Arithmetic', ca: 'Matemàtiques · Càlcul' }, l)}</p>
            <h1 className="text-3xl font-black text-white text-center mb-1">✖️ {tr({ es: 'Tablas de Multiplicar', en: 'Times Tables', ca: 'Taules de Multiplicar' }, l)}</h1>
            <p className="text-white/40 text-sm text-center mb-6">{tr({ es: 'Elige el resultado antes de que baje el tiempo', en: 'Pick the answer before time runs out', ca: 'Tria el resultat abans que baixi el temps' }, l)}</p>

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
                ['👆', tr({ es: 'Aparece una multiplicación y tocas el resultado correcto entre cuatro.', en: 'A multiplication appears and you tap the correct answer among four.', ca: 'Apareix una multiplicació i toques el resultat correcte entre quatre.' }, l)],
                ['🔥', tr({ es: 'Encadena aciertos: la racha te da más puntos por respuesta.', en: 'Chain correct answers: a streak gives you more points each time.', ca: 'Encadena encerts: la ratxa et dona més punts per resposta.' }, l)],
                ['⏱️', tr({ es: '50 segundos. Acierto +2s, fallo −2s.', en: '50 seconds. Correct +2s, wrong −2s.', ca: '50 segons. Encert +2s, errada −2s.' }, l)],
              ].map(([e, t]) => (
                <div key={t} className="flex items-start gap-3 text-sm text-white/50"><span className="text-base w-5 shrink-0 text-center">{e}</span><span>{t}</span></div>
              ))}
            </div>

            <button onClick={() => empezar(dif)}
              className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20 mb-3">
              {tr({ es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' }, l)}
            </button>
            <Link to="/examen/tablas-multiplicar-test" className="block text-center text-white/30 hover:text-white/60 text-sm transition-colors">
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
      es: score === 0 ? '¡Sigue practicando!' : score < 5 ? 'Buen comienzo' : score < 12 ? '¡Bien hecho!' : '¡Te sabes las tablas! ✖️',
      en: score === 0 ? 'Keep practising!' : score < 5 ? 'Good start' : score < 12 ? 'Well done!' : 'You know your tables! ✖️',
      ca: score === 0 ? 'Segueix practicant!' : score < 5 ? 'Bon començament' : score < 12 ? 'Ben fet!' : 'Et saps les taules! ✖️',
    }, l)
    const shareText = l === 'en'
      ? `I got ${correct} times-table answers right ✖️ — can you beat me? https://tuthor.es/juegos/tablas-multiplicar`
      : l === 'ca'
      ? `He encertat ${correct} respostes de les taules ✖️ — pots superar-me? https://tuthor.es/juegos/tablas-multiplicar`
      : `He acertado ${correct} respuestas de las tablas ✖️ — ¿puedes superarme? https://tuthor.es/juegos/tablas-multiplicar`
    return (
      <GameEndScreen game="tablas-multiplicar" emoji="✖️" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' }, l)} score={pts} message={msg}
        stats={[{ label: tr({ es: 'aciertos', en: 'correct', ca: 'encerts' }, l), value: correct, emoji: '✅' }]}
        shareText={shareText} onPlayAgain={() => empezar(dif)} playAgainLabel={tr({ es: '▶ Jugar de nuevo', en: '▶ Play again', ca: '▶ Jugar de nou' }, l)}
        secondaryActions={[{ label: tr({ es: 'Cambiar dificultad', en: 'Change difficulty', ca: 'Canviar dificultat' }, l), onClick: () => setScreen('difficulty') }]}
        user={user} lang={lang} />
    )
  }

  if (!preg) return null

  const timerPct = timeLeft / GAME_TIME
  const timerColor = timeLeft > 30 ? '#22c55e' : timeLeft > 10 ? '#f59e0b' : '#ef4444'
  const isResult = phase === 'result'
  const won = isResult && esCorrecta(preg, eleccion)

  function optClass(v) {
    if (!isResult) return 'bg-white/10 border-white/20 text-white hover:bg-white/20 active:scale-95'
    if (v === preg.resultado) return 'bg-green-500/25 border-green-400 text-green-200'
    if (v === eleccion) return 'bg-red-500/20 border-red-400 text-red-300'
    return 'bg-white/5 border-white/10 text-white/40'
  }

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100dvh-4rem)] px-3 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      {/* Header */}
      <div className="w-full max-w-[420px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">✖️ {tr(DIFS[dif].label, l)}</p>
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

      {/* Operación */}
      <div className="w-full max-w-[420px] rounded-2xl border border-white/10 bg-black/25 py-8 mb-4 text-center">
        <span className="text-white font-black text-5xl sm:text-6xl tabular-nums tracking-tight">{preg.texto}</span>
        <span className="text-white/30 font-black text-5xl sm:text-6xl"> = ?</span>
      </div>

      {/* Feedback */}
      {isResult && (
        <div className="w-full max-w-[420px] text-center mb-3">
          <p className={`font-black text-lg ${won ? 'text-green-400' : 'text-red-400'}`}>
            {won ? `✅ ${tr({ es: '¡Correcto!', en: 'Correct!', ca: 'Correcte!' }, l)}` : `❌ ${preg.texto} = ${preg.resultado}`}
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
        {preg.opciones.map(v => (
          <button key={v} onClick={() => elegir(v)} disabled={isResult}
            className={`py-6 rounded-2xl border font-black text-3xl tabular-nums transition ${optClass(v)}`}>
            {v}
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
