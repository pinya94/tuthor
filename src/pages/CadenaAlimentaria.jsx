import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { genRound, isCorrect, rolesDisponibles } from '../lib/cadenaAlimentaria'
import GameEndScreen from '../components/GameEndScreen'
import RolTroficoSelector from '../components/RolTroficoSelector'
import SEOHead from '../components/SEOHead'

// Mismo esqueleto que Balanza/Circuito Cerrado/Encuentra el Elemento (40s +
// racha, sin vidas): contrarreloj de partida entera, acertar suma tiempo,
// fallar lo resta. Rondas con reposición (genRound), igual que el examen.
const GAME_TIME = 40
const WRONG_TIME = 3
const CORRECT_TIME = 3

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, desc: { es: '8 organismos, 4 roles', en: '8 organisms, 4 roles', ca: '8 organismes, 4 rols' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, desc: { es: '16 organismos, 5 roles (aparece el consumidor terciario)', en: '16 organisms, 5 roles (tertiary consumer appears)', ca: '16 organismes, 5 rols (apareix el consumidor terciari)' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, desc: { es: 'Los 25 organismos, incluida una cadena marina', en: 'All 25 organisms, including a marine chain', ca: 'Els 25 organismes, incloent-hi una cadena marina' } },
}

const UI = {
  es: {
    badge: 'Biología · Ecosistemas', titulo: '🌿 Cadena Alimentaria',
    sub: 'Elige el rol trófico de cada organismo', how: 'Cómo funciona',
    p1: 'Cada organismo trae un dato real sobre qué come o cómo se alimenta.',
    p2: 'Razona su rol: productor, consumidor primario, secundario, terciario o descomponedor.',
    time: 'Tiempo', timeVal: '40 segundos', pts: 'Puntos', ptsVal: 'Acierto +1 y +3s · Fallo −1 y −3s',
    volver: '← Volver', empezar: '🌿 ¡Empezar!', salir: '← Salir', marcar: '📍 Confirmar',
    objetivo: '¿Qué rol tiene?', correcto: '¡Correcto!', fallo: 'No era ese rol',
    siguiente: 'Siguiente →',
    finPartida: 'Partida terminada', reintentar: '🌿 Nueva partida', cambiarDif: 'Cambiar dificultad',
    aciertosLbl: 'Aciertos',
    examen: 'Examen con la mecánica del juego →',
  },
  en: {
    badge: 'Biology · Ecosystems', titulo: '🌿 Food Chain',
    sub: 'Pick each organism\'s trophic role', how: 'How it works',
    p1: 'Every organism comes with a real fact about what it eats or how it feeds.',
    p2: 'Reason out its role: producer, primary, secondary or tertiary consumer, or decomposer.',
    time: 'Time', timeVal: '40 seconds', pts: 'Points', ptsVal: 'Correct +1 and +3s · Wrong −1 and −3s',
    volver: '← Back', empezar: '🌿 Start!', salir: '← Exit', marcar: '📍 Confirm',
    objetivo: 'What role does it have?', correcto: 'Correct!', fallo: 'Not that role',
    siguiente: 'Next →',
    finPartida: 'Game over', reintentar: '🌿 New game', cambiarDif: 'Change difficulty',
    aciertosLbl: 'Correct',
    examen: 'Exam using the game mechanic →',
  },
  ca: {
    badge: 'Biologia · Ecosistemes', titulo: '🌿 Cadena Alimentària',
    sub: 'Tria el rol tròfic de cada organisme', how: 'Com funciona',
    p1: 'Cada organisme porta una dada real sobre què menja o com s\'alimenta.',
    p2: 'Raona el seu rol: productor, consumidor primari, secundari, terciari o descomponedor.',
    time: 'Temps', timeVal: '40 segons', pts: 'Punts', ptsVal: 'Encert +1 i +3s · Errada −1 i −3s',
    volver: '← Enrere', empezar: '🌿 Comença!', salir: '← Sortir', marcar: '📍 Confirma',
    objetivo: 'Quin rol té?', correcto: 'Correcte!', fallo: 'No era aquest rol',
    siguiente: 'Següent →',
    finPartida: 'Partida acabada', reintentar: '🌿 Nova partida', cambiarDif: 'Canvia dificultat',
    aciertosLbl: 'Encerts',
    examen: 'Examen amb la mecànica del joc →',
  },
}

function DifficultyScreen({ onSelect, t, l }) {
  const [dif, setDif] = useState('facil')
  const navigate = useNavigate()
  const { localPath } = useLang()
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full flex flex-col items-center">
        <button onClick={() => navigate(localPath('/juegos'))}
          className="self-start text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
          {t.volver}
        </button>
        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{t.badge}</p>
        <h1 className="text-3xl font-black text-white text-center mb-1">{t.titulo}</h1>
        <p className="text-white/40 text-sm text-center mb-6">{t.sub}</p>

        <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl mb-3 mx-auto">
          {Object.entries(DIFS).map(([id, d]) => (
            <button key={id} onClick={() => setDif(id)}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${dif === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}>
              {d.emoji} {d.label[l] ?? d.label.es}
            </button>
          ))}
        </div>
        <p className="text-white/40 text-xs text-center mb-5">{DIFS[dif].desc[l] ?? DIFS[dif].desc.es}</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4 w-full">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{t.how}</p>
          <div className="space-y-2">
            {[['🐾', t.p1], ['🔎', t.p2]].map(([e, text]) => (
              <div key={text} className="flex items-start gap-3 text-sm text-white/50">
                <span className="text-base w-5 shrink-0 text-center">{e}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 w-full space-y-2.5 text-sm">
          {[['⏱️', t.time, t.timeVal], ['⭐', t.pts, t.ptsVal]].map(([e, k, v]) => (
            <div key={k} className="flex items-start justify-between gap-4">
              <span className="text-white/40 shrink-0 pt-0.5">{e} {k}</span>
              <span className="text-white font-semibold text-right">{v}</span>
            </div>
          ))}
        </div>

        <button onClick={() => onSelect(dif)}
          className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/30 mb-3">
          {t.empezar}
        </button>
        <button onClick={() => navigate(localPath('/examen/cadena-alimentaria-test'))}
          className="text-white/30 hover:text-white/60 text-sm transition-colors">
          {t.examen}
        </button>
      </div>
    </div>
  )
}

export default function CadenaAlimentaria() {
  const { lang } = useLang()
  const { user } = useAuth()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const t = UI[l]

  const [screen, setScreen] = useState('difficulty') // difficulty | playing | end
  const [dificultad, setDificultad] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [streak, setStreak] = useState(0)
  const [round, setRound] = useState(null)
  const [phase, setPhase] = useState('choose') // choose | result
  const [guess, setGuess] = useState(null)
  const [delta, setDelta] = useState(null)

  const timerRef = useRef(null)
  const scoreRef = useRef(0)
  const timeRef = useRef(GAME_TIME)
  const startedAtRef = useRef(0)
  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { timeRef.current = timeLeft }, [timeLeft])

  const next = useCallback((dif) => {
    setRound(genRound(dif))
    setPhase('choose')
    setGuess(null)
  }, [])

  function startGame(dif) {
    setDificultad(dif)
    setScreen('playing')
    setScore(0); setCorrect(0); setStreak(0)
    setTimeLeft(GAME_TIME)
    startedAtRef.current = Date.now()
    next(dif)
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
      type: 'juego', game: 'cadena-alimentaria', category: 'biologia',
      score: pts, passed: scoreRef.current > 0,
      coinsEarned: computeCoins('cadena-alimentaria', { score: pts }),
      timeSpent: GAME_TIME - timeRef.current,
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [screen, user])

  function marcar() {
    if (phase !== 'choose' || !round || !guess) return
    setPhase('result')
    const acierto = isCorrect(round, guess)
    if (acierto) {
      const ns = streak + 1
      setStreak(ns)
      setCorrect(c => c + 1)
      const gain = Math.min(5, 1 + Math.floor((ns - 1) / 3))
      setScore(s => s + gain)
      setTimeLeft(tl => tl + CORRECT_TIME)
      setDelta({ won: true, gain, streak: ns })
    } else {
      setStreak(0)
      setScore(s => Math.max(0, s - 1))
      setTimeLeft(tl => Math.max(0, tl - WRONG_TIME))
      setDelta({ won: false })
    }
  }

  const seo = {
    es: { title: 'Cadena Alimentaria — Roles tróficos jugando', desc: 'Elige el rol trófico de cada organismo a partir de un dato real sobre cómo se alimenta: productor, consumidor primario, secundario, terciario o descomponedor. Contrarreloj. Juego de biología.', path: '/juegos/cadena-alimentaria' },
    en: { title: 'Food Chain — Trophic roles by playing', desc: 'Pick each organism\'s trophic role from a real fact about how it feeds: producer, primary, secondary or tertiary consumer, or decomposer. Against the clock. Biology game.', path: '/en/juegos/cadena-alimentaria' },
    ca: { title: 'Cadena Alimentària — Rols tròfics jugant', desc: 'Tria el rol tròfic de cada organisme a partir d\'una dada real sobre com s\'alimenta: productor, consumidor primari, secundari, terciari o descomponedor. Contrarellotge. Joc de biologia.', path: '/ca/juegos/cadena-alimentaria' },
  }[l]

  if (screen === 'difficulty') {
    return (<><SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} /><DifficultyScreen onSelect={startGame} t={t} l={l} /></>)
  }

  if (screen === 'end') {
    const pts = score * 10
    const msg = { es: score === 0 ? '¡Sigue practicando!' : score < 4 ? 'Buen comienzo' : score < 9 ? '¡Bien hecho!' : '¡Maestro del ecosistema! 🌿', en: score === 0 ? 'Keep practising!' : score < 4 ? 'Good start' : score < 9 ? 'Well done!' : 'Ecosystem master! 🌿', ca: score === 0 ? 'Segueix practicant!' : score < 4 ? 'Bon començament' : score < 9 ? 'Ben fet!' : 'Mestre de l\'ecosistema! 🌿' }[l]
    const shareText = l === 'en'
      ? `I got ${correct} trophic roles right in Food Chain 🌿 — can you beat me? https://tuthor.es/juegos/cadena-alimentaria`
      : l === 'ca'
      ? `He encertat ${correct} rols tròfics a Cadena Alimentària 🌿 — pots superar-me? https://tuthor.es/juegos/cadena-alimentaria`
      : `He acertado ${correct} roles tróficos en Cadena Alimentaria 🌿 — ¿puedes superarme? https://tuthor.es/juegos/cadena-alimentaria`
    return (
      <GameEndScreen game="cadena-alimentaria" emoji="🌿" title={t.finPartida} score={pts} message={msg}
        stats={[{ label: t.aciertosLbl, value: correct, emoji: '✅' }]}
        shareText={shareText} onPlayAgain={() => startGame(dificultad)} playAgainLabel={t.reintentar}
        secondaryActions={[{ label: t.cambiarDif, onClick: () => setScreen('difficulty') }]}
        user={user} lang={l} />
    )
  }

  if (!round) return null

  const timerPct = timeLeft / GAME_TIME
  const timerColor = timeLeft > 30 ? '#22c55e' : timeLeft > 10 ? '#f59e0b' : '#ef4444'
  const isResult = phase === 'result'
  const roles = rolesDisponibles(dificultad)

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      {/* Header */}
      <div className="w-full max-w-md flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">🌿 {DIFS[dificultad].label[l] ?? DIFS[dificultad].label.es}</p>
          <p className="text-white font-bold text-lg flex items-center gap-2">
            {score} {t.pts.toLowerCase()}
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

      <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{t.objetivo}</p>

      <RolTroficoSelector organismo={round.organismo} roles={roles} guess={guess}
        onPick={isResult ? null : setGuess} revelado={isResult} lang={l} />

      {isResult && (
        <div className="w-full max-w-md mt-3 text-center">
          <p className={`font-black text-lg ${isCorrect(round, guess) ? 'text-green-400' : 'text-red-400'}`}>
            {isCorrect(round, guess) ? t.correcto : t.fallo}
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

      {!isResult && (
        <div className="w-full max-w-md px-1 mt-4">
          <button onClick={marcar} disabled={!guess}
            className="w-full py-4 rounded-2xl bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg transition-all hover:scale-[1.02] active:scale-[0.97] shadow-lg shadow-amber-500/20 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100">
            {t.marcar}
          </button>
        </div>
      )}
      {isResult && (
        <div className="w-full max-w-md px-1 mt-4">
          <button onClick={() => next(dificultad)}
            className="w-full py-4 rounded-2xl bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg transition-all hover:scale-[1.02]">
            {t.siguiente}
          </button>
        </div>
      )}
    </div>
  )
}
