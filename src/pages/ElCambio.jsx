import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { nuevaRonda, denomsDe, formatoEuro, esCorrecta } from '../lib/dinero'
import GameEndScreen from '../components/GameEndScreen'
import SupportBlock from '../components/SupportBlock'
import SEOHead from '../components/SEOHead'

const GAME_TIME = 50
const STEP = 3

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },     desc: { es: 'Forma cantidades hasta 2 €', en: 'Make amounts up to €2', ca: 'Forma quantitats fins a 2 €' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },   desc: { es: 'Forma cantidades hasta 10 €, con céntimos', en: 'Make amounts up to €10, with cents', ca: 'Forma quantitats fins a 10 €, amb cèntims' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, desc: { es: 'Da el cambio de un billete', en: 'Give change from a note', ca: 'Dona el canvi d\'un bitllet' } },
}

const tr = (o, l) => o?.[l] ?? o?.es

function Ficha({ d, onClick }) {
  if (d.tipo === 'moneda') {
    return (
      <button onClick={onClick}
        className="w-14 h-14 rounded-full flex items-center justify-center font-black text-sm text-white shadow active:scale-90 transition"
        style={{ background: d.color, border: '2px solid rgba(255,255,255,0.35)' }}>
        {d.label}
      </button>
    )
  }
  return (
    <button onClick={onClick}
      className="h-10 px-4 rounded-md flex items-center justify-center font-black text-sm text-white shadow active:scale-90 transition"
      style={{ background: d.color, border: '2px solid rgba(255,255,255,0.35)' }}>
      {d.label}
    </button>
  )
}

export default function ElCambio() {
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
  const [bandeja, setBandeja] = useState([]) // céntimos añadidos
  const [phase, setPhase] = useState('choose')
  const [delta, setDelta] = useState(null)

  const timerRef = useRef(null)
  const scoreRef = useRef(0)
  const timeRef = useRef(GAME_TIME)
  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { timeRef.current = timeLeft }, [timeLeft])

  const total = bandeja.reduce((a, v) => a + v, 0)

  function siguiente(d) {
    setRonda(nuevaRonda(d))
    setBandeja([])
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
      type: 'juego', game: 'el-cambio', category: 'matematicas',
      score: pts, passed: scoreRef.current > 0,
      coinsEarned: computeCoins('el-cambio', { score: pts }),
      timeSpent: GAME_TIME - timeRef.current,
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [screen, user])

  function anadir(v) { if (phase === 'choose') setBandeja(b => [...b, v]) }
  function quitar(i) { if (phase === 'choose') setBandeja(b => b.filter((_, k) => k !== i)) }

  function confirmar() {
    if (phase !== 'choose' || !ronda) return
    setPhase('result')
    const won = esCorrecta(ronda, total)
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
    es: { title: 'El Cambio — cuenta euros, monedas y billetes jugando', desc: 'Forma cantidades con monedas y billetes de euro y aprende a dar el cambio. Juego de matemáticas para practicar el dinero: sistema monetario, sumar céntimos y devolver el cambio. Gratis.', path: '/juegos/el-cambio' },
    en: { title: 'The Change — count euros, coins and notes by playing', desc: 'Make amounts with euro coins and notes and learn to give change. Maths game to practise money: the monetary system, adding cents and giving change. Free.', path: '/en/juegos/el-cambio' },
    ca: { title: 'El Canvi — compta euros, monedes i bitllets jugant', desc: 'Forma quantitats amb monedes i bitllets d\'euro i aprèn a donar el canvi. Joc de matemàtiques per practicar els diners: sistema monetari, sumar cèntims i tornar el canvi. Gratis.', path: '/ca/juegos/el-cambio' },
  }[l]

  // ── INTRO ──────────────────────────────────────────────────────────────────
  if (screen === 'difficulty') {
    return (
      <>
        <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />
        <div className="relative z-10 flex flex-col items-center min-h-[calc(100dvh-4rem)] px-4 py-8">
          <div className="max-w-md w-full">
            <SupportBlock variant="top" className="mb-5" />
            <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{tr({ es: 'Matemáticas · El dinero', en: 'Maths · Money', ca: 'Matemàtiques · Els diners' }, l)}</p>
            <h1 className="text-3xl font-black text-white text-center mb-1">💶 {tr({ es: 'El Cambio', en: 'The Change', ca: 'El Canvi' }, l)}</h1>
            <p className="text-white/40 text-sm text-center mb-6">{tr({ es: 'Forma cantidades con monedas y billetes de euro', en: 'Make amounts with euro coins and notes', ca: 'Forma quantitats amb monedes i bitllets d\'euro' }, l)}</p>

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
                ['👆', tr({ es: 'Toca las monedas y billetes para ir sumando en la bandeja.', en: 'Tap coins and notes to add them to the tray.', ca: 'Toca les monedes i bitllets per anar sumant a la safata.' }, l)],
                ['🎯', tr({ es: 'Llega a la cantidad exacta. Toca una ficha de la bandeja para quitarla.', en: 'Reach the exact amount. Tap a piece in the tray to remove it.', ca: 'Arriba a la quantitat exacta. Toca una fitxa de la safata per treure-la.' }, l)],
                ['⏱️', tr({ es: '50 segundos. Acierto +3s, fallo −3s.', en: '50 seconds. Correct +3s, wrong −3s.', ca: '50 segons. Encert +3s, errada −3s.' }, l)],
              ].map(([e, t]) => (
                <div key={t} className="flex items-start gap-3 text-sm text-white/50"><span className="text-base w-5 shrink-0 text-center">{e}</span><span>{t}</span></div>
              ))}
            </div>

            <button onClick={() => empezar(dif)}
              className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20 mb-3">
              {tr({ es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' }, l)}
            </button>
            <Link to="/examen/el-cambio-test" className="block text-center text-white/30 hover:text-white/60 text-sm transition-colors">
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
      es: score === 0 ? '¡Sigue practicando!' : score < 4 ? 'Buen comienzo' : score < 9 ? '¡Bien hecho!' : '¡Cajero experto! 💶',
      en: score === 0 ? 'Keep practising!' : score < 4 ? 'Good start' : score < 9 ? 'Well done!' : 'Expert cashier! 💶',
      ca: score === 0 ? 'Segueix practicant!' : score < 4 ? 'Bon començament' : score < 9 ? 'Ben fet!' : 'Caixer expert! 💶',
    }, l)
    const shareText = l === 'en'
      ? `I got ${correct} amounts right in The Change 💶 — can you beat me? https://tuthor.es/juegos/el-cambio`
      : l === 'ca'
      ? `He encertat ${correct} quantitats a El Canvi 💶 — pots superar-me? https://tuthor.es/juegos/el-cambio`
      : `He acertado ${correct} cantidades en El Cambio 💶 — ¿puedes superarme? https://tuthor.es/juegos/el-cambio`
    return (
      <GameEndScreen game="el-cambio" emoji="💶" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' }, l)} score={pts} message={msg}
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
  const won = isResult && esCorrecta(ronda, total)
  const denoms = denomsDe(dif)
  const totalOk = ronda.modo === 'forma' && total === ronda.objetivo

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100dvh-4rem)] px-3 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      {/* Header */}
      <div className="w-full max-w-[440px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">💶 {tr(DIFS[dif].label, l)}</p>
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
      <div className="w-full max-w-[440px] text-center mb-2">
        {ronda.modo === 'forma' ? (
          <>
            <p className="text-white/40 text-xs uppercase tracking-widest">{tr({ es: 'Forma esta cantidad', en: 'Make this amount', ca: 'Forma aquesta quantitat' }, l)}</p>
            <p className="text-white font-black text-3xl tabular-nums">{formatoEuro(ronda.objetivo)}</p>
          </>
        ) : (
          <p className="text-white text-base leading-snug px-2">
            {tr({ es: 'Cuesta', en: 'It costs', ca: 'Costa' }, l)} <span className="font-black">{formatoEuro(ronda.precio)}</span>{' '}
            {tr({ es: 'y pagas con', en: 'and you pay with', ca: 'i pagues amb' }, l)} <span className="font-black">{formatoEuro(ronda.pago)}</span>.{' '}
            <span className="text-[#EDAE49] font-bold">{tr({ es: 'Da el cambio.', en: 'Give the change.', ca: 'Dona el canvi.' }, l)}</span>
          </p>
        )}
      </div>

      {/* Bandeja + total */}
      <div className="w-full max-w-[440px] rounded-xl border border-white/10 bg-black/20 p-3 mb-3 min-h-[64px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/40 text-xs uppercase tracking-widest">{tr({ es: 'Llevas', en: 'You have', ca: 'Portes' }, l)}</span>
          <span className={`font-black text-xl tabular-nums ${totalOk ? 'text-green-400' : 'text-white'}`}>{formatoEuro(total)}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {bandeja.length === 0 && <span className="text-white/25 text-sm">{tr({ es: 'Toca monedas para empezar…', en: 'Tap coins to start…', ca: 'Toca monedes per començar…' }, l)}</span>}
          {bandeja.map((v, i) => {
            const d = denoms.find(x => x.v === v)
            return (
              <button key={i} onClick={() => quitar(i)} disabled={isResult}
                className="text-xs font-bold px-2 py-1 rounded-md text-white/90"
                style={{ background: d?.color ?? '#555', opacity: isResult ? 0.6 : 1 }}>
                {d?.label} ✕
              </button>
            )
          })}
        </div>
      </div>

      {/* Feedback */}
      {isResult && (
        <div className="w-full max-w-[440px] text-center mb-3">
          <p className={`font-black text-lg ${won ? 'text-green-400' : 'text-red-400'}`}>
            {won ? `✅ ${tr({ es: '¡Correcto!', en: 'Correct!', ca: 'Correcte!' }, l)}` : `❌ ${tr({ es: 'Era', en: 'It was', ca: 'Era' }, l)} ${formatoEuro(ronda.objetivo)}`}
          </p>
          {delta && <p className="text-xs font-bold mt-0.5">
            {delta.won
              ? <span className="text-green-400">+{delta.gain} · +{STEP}s ⏱️{delta.streak >= 2 ? ` · 🔥 ${delta.streak}` : ''}</span>
              : <span className="text-red-400">−1 · −{STEP}s ⏱️</span>}
          </p>}
        </div>
      )}

      {/* Paleta de monedas y billetes */}
      {!isResult && (
        <div className="w-full max-w-[440px] flex flex-wrap justify-center gap-2 mb-3">
          {denoms.map(d => <Ficha key={d.v} d={d} onClick={() => anadir(d.v)} />)}
        </div>
      )}

      {/* Botón */}
      <div className="w-full max-w-[440px] px-1">
        {!isResult
          ? <button onClick={confirmar} disabled={total === 0}
              className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 disabled:opacity-40 transition">{tr({ es: 'Confirmar →', en: 'Confirm →', ca: 'Confirmar →' }, l)}</button>
          : <button onClick={() => siguiente(dif)} className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">{tr({ es: 'Siguiente →', en: 'Next →', ca: 'Següent →' }, l)}</button>}
      </div>
    </div>
  )
}
