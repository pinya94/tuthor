import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { nuevoNumero, simbolosDe, aRomano, valorRomano, esCorrecto } from '../lib/romanos'
import GameEndScreen from '../components/GameEndScreen'
import SupportBlock from '../components/SupportBlock'
import SEOHead from '../components/SEOHead'

const GAME_TIME = 50
const STEP = 3

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },     desc: { es: 'Hasta 39 (I, V, X)', en: 'Up to 39 (I, V, X)', ca: 'Fins a 39 (I, V, X)' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },   desc: { es: 'Hasta 399 (añade L y C)', en: 'Up to 399 (adds L and C)', ca: 'Fins a 399 (afegeix L i C)' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, desc: { es: 'Hasta 3999 (añade D y M)', en: 'Up to 3999 (adds D and M)', ca: 'Fins a 3999 (afegeix D i M)' } },
}

const tr = (o, l) => o?.[l] ?? o?.es

export default function NumerosRomanos() {
  const { lang } = useLang()
  const { user } = useAuth()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'

  const [screen, setScreen] = useState('difficulty')
  const [dif, setDif] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [streak, setStreak] = useState(0)
  const [numero, setNumero] = useState(null)
  const [construido, setConstruido] = useState('')
  const [phase, setPhase] = useState('choose')
  const [delta, setDelta] = useState(null)

  const timerRef = useRef(null)
  const scoreRef = useRef(0)
  const timeRef = useRef(GAME_TIME)
  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { timeRef.current = timeLeft }, [timeLeft])

  function siguiente(d) {
    setNumero(nuevoNumero(d))
    setConstruido('')
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
      type: 'juego', game: 'numeros-romanos', category: 'matematicas',
      score: pts, passed: scoreRef.current > 0,
      coinsEarned: computeCoins('numeros-romanos', { score: pts }),
      timeSpent: GAME_TIME - timeRef.current,
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [screen, user])

  function anadir(s) { if (phase === 'choose') setConstruido(c => c + s) }
  function borrar() { if (phase === 'choose') setConstruido(c => c.slice(0, -1)) }

  function confirmar() {
    if (phase !== 'choose' || !numero || !construido) return
    setPhase('result')
    const won = esCorrecto(numero, construido)
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
    es: { title: 'Números Romanos — conviértelos jugando', desc: 'Escribe cualquier número en números romanos tocando los símbolos I, V, X, L, C, D y M. Aprende a convertir y a leer los números romanos, con las reglas IV, IX, XL… Juego de matemáticas gratis.', path: '/juegos/numeros-romanos' },
    en: { title: 'Roman Numerals — convert them by playing', desc: 'Write any number in Roman numerals by tapping the symbols I, V, X, L, C, D and M. Learn to convert and read Roman numerals, with the IV, IX, XL rules. Free maths game.', path: '/en/juegos/numeros-romanos' },
    ca: { title: 'Números Romans — converteix-los jugant', desc: 'Escriu qualsevol nombre en números romans tocant els símbols I, V, X, L, C, D i M. Aprèn a convertir i llegir els números romans, amb les regles IV, IX, XL… Joc de matemàtiques gratis.', path: '/ca/juegos/numeros-romanos' },
  }[l]

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (screen === 'difficulty') {
    return (
      <>
        <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />
        <div className="relative z-10 flex flex-col items-center min-h-[calc(100dvh-4rem)] px-4 py-8">
          <div className="max-w-md w-full">
            <SupportBlock variant="top" className="mb-5" />
            <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{tr({ es: 'Matemáticas · Números romanos', en: 'Maths · Roman numerals', ca: 'Matemàtiques · Números romans' }, l)}</p>
            <h1 className="text-3xl font-black text-white text-center mb-1">🏛️ {tr({ es: 'Números Romanos', en: 'Roman Numerals', ca: 'Números Romans' }, l)}</h1>
            <p className="text-white/40 text-sm text-center mb-6">{tr({ es: 'Escribe el número en romano tocando los símbolos', en: 'Write the number in Roman by tapping the symbols', ca: 'Escriu el nombre en romà tocant els símbols' }, l)}</p>

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
                ['👆', tr({ es: 'Toca los símbolos (I, V, X, L, C, D, M) para escribir el número romano.', en: 'Tap the symbols (I, V, X, L, C, D, M) to write the Roman numeral.', ca: 'Toca els símbols (I, V, X, L, C, D, M) per escriure el número romà.' }, l)],
                ['🔟', tr({ es: 'Recuerda: 4 es IV (no IIII) y 9 es IX. El menor delante del mayor, se resta.', en: 'Remember: 4 is IV (not IIII) and 9 is IX. A smaller before a larger is subtracted.', ca: 'Recorda: 4 és IV (no IIII) i 9 és IX. El menor davant del major, es resta.' }, l)],
                ['⏱️', tr({ es: '50 segundos. Acierto +3s, fallo −3s.', en: '50 seconds. Correct +3s, wrong −3s.', ca: '50 segons. Encert +3s, errada −3s.' }, l)],
              ].map(([e, t]) => (
                <div key={t} className="flex items-start gap-3 text-sm text-white/50"><span className="text-base w-5 shrink-0 text-center">{e}</span><span>{t}</span></div>
              ))}
            </div>

            <button onClick={() => empezar(dif)}
              className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20 mb-3">
              {tr({ es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' }, l)}
            </button>
            <Link to="/examen/numeros-romanos-test" className="block text-center text-white/30 hover:text-white/60 text-sm transition-colors">
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
      es: score === 0 ? '¡Sigue practicando!' : score < 4 ? 'Buen comienzo' : score < 9 ? '¡Bien hecho!' : '¡César estaría orgulloso! 🏛️',
      en: score === 0 ? 'Keep practising!' : score < 4 ? 'Good start' : score < 9 ? 'Well done!' : 'Caesar would be proud! 🏛️',
      ca: score === 0 ? 'Segueix practicant!' : score < 4 ? 'Bon començament' : score < 9 ? 'Ben fet!' : 'El Cèsar n\'estaria orgullós! 🏛️',
    }, l)
    const shareText = l === 'en'
      ? `I converted ${correct} Roman numerals right 🏛️ — can you beat me? https://tuthor.es/juegos/numeros-romanos`
      : l === 'ca'
      ? `He encertat ${correct} números romans 🏛️ — pots superar-me? https://tuthor.es/juegos/numeros-romanos`
      : `He acertado ${correct} números romanos 🏛️ — ¿puedes superarme? https://tuthor.es/juegos/numeros-romanos`
    return (
      <GameEndScreen game="numeros-romanos" emoji="🏛️" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' }, l)} score={pts} message={msg}
        stats={[{ label: tr({ es: 'aciertos', en: 'correct', ca: 'encerts' }, l), value: correct, emoji: '✅' }]}
        shareText={shareText} onPlayAgain={() => empezar(dif)} playAgainLabel={tr({ es: '▶ Jugar de nuevo', en: '▶ Play again', ca: '▶ Jugar de nou' }, l)}
        secondaryActions={[{ label: tr({ es: 'Cambiar dificultad', en: 'Change difficulty', ca: 'Canviar dificultat' }, l), onClick: () => setScreen('difficulty') }]}
        user={user} lang={lang} />
    )
  }

  if (!numero) return null

  const timerPct = timeLeft / GAME_TIME
  const timerColor = timeLeft > 30 ? '#22c55e' : timeLeft > 10 ? '#f59e0b' : '#ef4444'
  const isResult = phase === 'result'
  const won = isResult && esCorrecto(numero, construido)
  const simbolos = simbolosDe(dif)
  const valorActual = construido ? valorRomano(construido) : 0
  const canonicoOk = construido === aRomano(numero)

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100dvh-4rem)] px-3 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      {/* Header */}
      <div className="w-full max-w-[420px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">🏛️ {tr(DIFS[dif].label, l)}</p>
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
        <p className="text-white/40 text-xs uppercase tracking-widest">{tr({ es: 'Escribe en romano', en: 'Write in Roman', ca: 'Escriu en romà' }, l)}</p>
        <p className="text-white font-black text-4xl tabular-nums">{numero}</p>
      </div>

      {/* Construido */}
      <div className="w-full max-w-[420px] rounded-xl border border-white/10 bg-black/20 p-3 mb-3 flex items-center justify-between min-h-[60px]">
        <span className={`font-black text-2xl tracking-widest ${isResult ? (won ? 'text-green-400' : 'text-red-400') : canonicoOk ? 'text-green-400' : 'text-white'}`} style={{ letterSpacing: '0.15em' }}>
          {construido || <span className="text-white/25 text-base tracking-normal">{tr({ es: 'toca los símbolos…', en: 'tap the symbols…', ca: 'toca els símbols…' }, l)}</span>}
        </span>
        {construido && <span className="text-white/40 text-sm">= {valorActual}</span>}
      </div>

      {/* Feedback */}
      {isResult && (
        <div className="w-full max-w-[420px] text-center mb-3">
          <p className={`font-black text-lg ${won ? 'text-green-400' : 'text-red-400'}`}>
            {won ? `✅ ${tr({ es: '¡Correcto!', en: 'Correct!', ca: 'Correcte!' }, l)}` : `❌ ${numero} = ${aRomano(numero)}`}
          </p>
          {delta && <p className="text-xs font-bold mt-0.5">
            {delta.won
              ? <span className="text-green-400">+{delta.gain} · +{STEP}s ⏱️{delta.streak >= 2 ? ` · 🔥 ${delta.streak}` : ''}</span>
              : <span className="text-red-400">−1 · −{STEP}s ⏱️</span>}
          </p>}
        </div>
      )}

      {/* Paleta */}
      {!isResult && (
        <div className="w-full max-w-[420px] flex flex-wrap justify-center gap-2 mb-3">
          {simbolos.map(({ s }) => (
            <button key={s} onClick={() => anadir(s)}
              className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 text-white font-black text-xl hover:bg-white/20 active:scale-90 transition">
              {s}
            </button>
          ))}
          <button onClick={borrar} disabled={!construido}
            className="w-12 h-12 rounded-xl bg-white/5 border border-white/15 text-white/70 text-lg hover:bg-white/15 disabled:opacity-30 active:scale-90 transition">⌫</button>
        </div>
      )}

      {/* Botón */}
      <div className="w-full max-w-[420px] px-1">
        {!isResult
          ? <button onClick={confirmar} disabled={!construido}
              className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 disabled:opacity-40 transition">{tr({ es: 'Confirmar →', en: 'Confirm →', ca: 'Confirmar →' }, l)}</button>
          : <button onClick={() => siguiente(dif)} className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">{tr({ es: 'Siguiente →', en: 'Next →', ca: 'Següent →' }, l)}</button>}
      </div>
    </div>
  )
}
