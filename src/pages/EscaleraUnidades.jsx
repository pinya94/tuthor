import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { nuevaConversion, esCorrecta, formatNum, factorTexto, MAGNITUDES } from '../lib/escalera'
import { EscaleraSVG, Teclado } from '../components/EscaleraUnidades'
import GameEndScreen from '../components/GameEndScreen'
import SupportBlock from '../components/SupportBlock'
import SEOHead from '../components/SEOHead'

const GAME_TIME = 50
const STEP = 3

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },     desc: { es: 'Longitud, bajando (× 10)', en: 'Length, going down (× 10)', ca: 'Longitud, baixant (× 10)' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },   desc: { es: 'Longitud, masa y capacidad; sube y baja', en: 'Length, mass and capacity; up and down', ca: 'Longitud, massa i capacitat; puja i baixa' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, desc: { es: 'Saltos largos y con decimales', en: 'Long jumps and decimals', ca: 'Salts llargs i amb decimals' } },
}

const tr = (o, l) => o?.[l] ?? o?.es

export default function EscaleraUnidades() {
  const { lang } = useLang()
  const { user } = useAuth()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const dot = l === 'en' ? '.' : ','

  const [screen, setScreen] = useState('difficulty')
  const [dif, setDif] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [streak, setStreak] = useState(0)
  const [conv, setConv] = useState(null)
  const [entrada, setEntrada] = useState('')
  const [phase, setPhase] = useState('choose')
  const [delta, setDelta] = useState(null)

  const timerRef = useRef(null)
  const scoreRef = useRef(0)
  const timeRef = useRef(GAME_TIME)
  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { timeRef.current = timeLeft }, [timeLeft])

  function siguiente(d) {
    setConv(nuevaConversion(d))
    setEntrada('')
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
      type: 'juego', game: 'escalera-unidades', category: 'matematicas',
      score: pts, passed: scoreRef.current > 0,
      coinsEarned: computeCoins('escalera-unidades', { score: pts }),
      timeSpent: GAME_TIME - timeRef.current,
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [screen, user])

  function anadir(d) { if (phase === 'choose') setEntrada(e => (e.length < 12 ? e + d : e)) }
  function coma() { if (phase === 'choose') setEntrada(e => (e.includes('.') ? e : (e || '0') + '.')) }
  function borrar() { if (phase === 'choose') setEntrada(e => e.slice(0, -1)) }

  function confirmar() {
    if (phase !== 'choose' || !conv || !entrada) return
    setPhase('result')
    const won = esCorrecta(conv, entrada)
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
    es: { title: 'La Escalera de Unidades — convierte km, m, cm… jugando', desc: 'Convierte unidades de longitud, masa y capacidad subiendo y bajando la escalera del sistema métrico (× 10 y ÷ 10). km, m, cm, kg, g, L, mL… Juego de matemáticas gratis.', path: '/juegos/escalera-unidades' },
    en: { title: 'The Unit Staircase — convert km, m, cm… by playing', desc: 'Convert units of length, mass and capacity by going up and down the metric staircase (× 10 and ÷ 10). km, m, cm, kg, g, L, mL… Free maths game.', path: '/en/juegos/escalera-unidades' },
    ca: { title: 'L\'Escala d\'Unitats — converteix km, m, cm… jugant', desc: 'Converteix unitats de longitud, massa i capacitat pujant i baixant l\'escala del sistema mètric (× 10 i ÷ 10). km, m, cm, kg, g, L, mL… Joc de matemàtiques gratis.', path: '/ca/juegos/escalera-unidades' },
  }[l]

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (screen === 'difficulty') {
    return (
      <>
        <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />
        <div className="relative z-10 flex flex-col items-center min-h-[calc(100dvh-4rem)] px-4 py-8">
          <div className="max-w-md w-full">
            <SupportBlock variant="top" className="mb-5" />
            <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{tr({ es: 'Matemáticas · Medida', en: 'Maths · Measurement', ca: 'Matemàtiques · Mesura' }, l)}</p>
            <h1 className="text-3xl font-black text-white text-center mb-1">🔟 {tr({ es: 'La Escalera de Unidades', en: 'The Unit Staircase', ca: 'L\'Escala d\'Unitats' }, l)}</h1>
            <p className="text-white/40 text-sm text-center mb-6">{tr({ es: 'Convierte entre km, m, cm, kg, g, L…', en: 'Convert between km, m, cm, kg, g, L…', ca: 'Converteix entre km, m, cm, kg, g, L…' }, l)}</p>

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
                ['🔟', tr({ es: 'Cada escalón hacia abajo multiplica por 10; hacia arriba divide por 10.', en: 'Each step down multiplies by 10; each step up divides by 10.', ca: 'Cada esglaó cap avall multiplica per 10; cap amunt divideix per 10.' }, l)],
                ['🔢', tr({ es: 'Escribe el resultado con el teclado. La coma es para los decimales.', en: 'Type the result with the keypad. The dot is for decimals.', ca: 'Escriu el resultat amb el teclat. La coma és per als decimals.' }, l)],
                ['⏱️', tr({ es: '50 segundos. Acierto +3s, fallo −3s.', en: '50 seconds. Correct +3s, wrong −3s.', ca: '50 segons. Encert +3s, errada −3s.' }, l)],
              ].map(([e, t]) => (
                <div key={t} className="flex items-start gap-3 text-sm text-white/50"><span className="text-base w-5 shrink-0 text-center">{e}</span><span>{t}</span></div>
              ))}
            </div>

            <button onClick={() => empezar(dif)}
              className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20 mb-3">
              {tr({ es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' }, l)}
            </button>
            <Link to="/examen/escalera-unidades-test" className="block text-center text-white/30 hover:text-white/60 text-sm transition-colors">
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
      es: score === 0 ? '¡Sigue practicando!' : score < 4 ? 'Buen comienzo' : score < 9 ? '¡Bien hecho!' : '¡Dominas la escalera! 🔟',
      en: score === 0 ? 'Keep practising!' : score < 4 ? 'Good start' : score < 9 ? 'Well done!' : 'You master the staircase! 🔟',
      ca: score === 0 ? 'Segueix practicant!' : score < 4 ? 'Bon començament' : score < 9 ? 'Ben fet!' : 'Domines l\'escala! 🔟',
    }, l)
    const shareText = l === 'en'
      ? `I got ${correct} unit conversions right 🔟 — can you beat me? https://tuthor.es/juegos/escalera-unidades`
      : l === 'ca'
      ? `He encertat ${correct} conversions d'unitats 🔟 — pots superar-me? https://tuthor.es/juegos/escalera-unidades`
      : `He acertado ${correct} conversiones de unidades 🔟 — ¿puedes superarme? https://tuthor.es/juegos/escalera-unidades`
    return (
      <GameEndScreen game="escalera-unidades" emoji="🔟" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' }, l)} score={pts} message={msg}
        stats={[{ label: tr({ es: 'aciertos', en: 'correct', ca: 'encerts' }, l), value: correct, emoji: '✅' }]}
        shareText={shareText} onPlayAgain={() => empezar(dif)} playAgainLabel={tr({ es: '▶ Jugar de nuevo', en: '▶ Play again', ca: '▶ Jugar de nou' }, l)}
        secondaryActions={[{ label: tr({ es: 'Cambiar dificultad', en: 'Change difficulty', ca: 'Canviar dificultat' }, l), onClick: () => setScreen('difficulty') }]}
        user={user} lang={lang} />
    )
  }

  if (!conv) return null

  const timerPct = timeLeft / GAME_TIME
  const timerColor = timeLeft > 30 ? '#22c55e' : timeLeft > 10 ? '#f59e0b' : '#ef4444'
  const isResult = phase === 'result'
  const won = isResult && esCorrecta(conv, entrada)
  const deU = conv.unidades[conv.deIdx]
  const aU = conv.unidades[conv.aIdx]
  const magNombre = tr(MAGNITUDES[conv.magnitud].nombre, l)

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100dvh-4rem)] px-3 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      {/* Header */}
      <div className="w-full max-w-[420px] flex items-center justify-between mb-2 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">🔟 {tr(DIFS[dif].label, l)}</p>
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
        <p className="text-white/40 text-xs uppercase tracking-widest">{magNombre} · {factorTexto(conv)}</p>
        <p className="text-white font-black text-2xl sm:text-3xl">
          <span className="text-[#EDAE49]">{formatNum(conv.valor, l)} {deU}</span>
          <span className="text-white/40"> = </span>
          <span className="text-sky-400">? {aU}</span>
        </p>
      </div>

      {/* Escalera */}
      <div className="w-full max-w-[420px] mb-2">
        <EscaleraSVG unidades={conv.unidades} deIdx={conv.deIdx} aIdx={conv.aIdx} className="w-full h-auto" />
      </div>

      {/* Entrada */}
      <div className="w-full max-w-[420px] rounded-xl border border-white/10 bg-black/20 p-3 mb-2 flex items-center justify-between min-h-[56px]">
        <span className={`font-black text-2xl tabular-nums ${isResult ? (won ? 'text-green-400' : 'text-red-400') : 'text-white'}`}>
          {entrada
            ? <>{entrada.replace('.', dot)} <span className="text-white/40 text-lg">{aU}</span></>
            : <span className="text-white/25 text-base">{tr({ es: 'escribe el resultado…', en: 'type the result…', ca: 'escriu el resultat…' }, l)}</span>}
        </span>
      </div>

      {/* Feedback */}
      {isResult && (
        <div className="w-full max-w-[420px] text-center mb-2">
          <p className={`font-black text-lg ${won ? 'text-green-400' : 'text-red-400'}`}>
            {won ? `✅ ${tr({ es: '¡Correcto!', en: 'Correct!', ca: 'Correcte!' }, l)}` : `❌ ${formatNum(conv.valor, l)} ${deU} = ${formatNum(conv.objetivo, l)} ${aU}`}
          </p>
          {delta && <p className="text-xs font-bold mt-0.5">
            {delta.won
              ? <span className="text-green-400">+{delta.gain} · +{STEP}s ⏱️{delta.streak >= 2 ? ` · 🔥 ${delta.streak}` : ''}</span>
              : <span className="text-red-400">−1 · −{STEP}s ⏱️</span>}
          </p>}
        </div>
      )}

      {/* Teclado */}
      {!isResult && (
        <div className="flex flex-col items-center gap-2 w-full">
          <Teclado onDigit={anadir} onDot={coma} onBack={borrar} dotLabel={dot} />
          <div className="w-full max-w-[420px]">
            <button onClick={confirmar} disabled={!entrada}
              className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 disabled:opacity-40 transition">{tr({ es: 'Confirmar →', en: 'Confirm →', ca: 'Confirmar →' }, l)}</button>
          </div>
        </div>
      )}
      {isResult && (
        <div className="w-full max-w-[420px]">
          <button onClick={() => siguiente(dif)} className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">{tr({ es: 'Siguiente →', en: 'Next →', ca: 'Següent →' }, l)}</button>
        </div>
      )}
    </div>
  )
}
