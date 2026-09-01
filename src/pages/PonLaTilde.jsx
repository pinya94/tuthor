import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { TIPOS, genRound, explicacion } from '../lib/ponLaTilde'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 3
const REVEAL_MS = 3200
const MEMORIA = 8

const C = {
  badge:   { es: 'Lengua · Acentuación', en: 'Spanish · Accents', ca: 'Llengua · Accentuació' },
  title:   { es: '✏️ Pon la Tilde', en: '✏️ Spanish Accents', ca: '✏️ Posa l\'Accent' },
  sub:     { es: 'Encuentra el golpe de voz y decide si lleva tilde', en: 'Find the stress and decide if it takes an accent', ca: 'Troba el cop de veu i decideix si porta accent' },
  queEs:   { es: '¿De qué va?', en: 'What is it about?', ca: 'De què va?' },
  q1:      { es: 'Sale una palabra SIN tilde y partida en sílabas, y tienes que hacer dos cosas.', en: 'A word appears WITHOUT its accent, split into syllables, and you have two things to do.', ca: 'Surt una paraula SENSE accent i partida en síl·labes, i has de fer dues coses.' },
  q2:      { es: 'Primero, tocar la sílaba donde cae el golpe de voz. Después, decir si por eso lleva tilde.', en: 'First, tap the syllable where the stress falls. Then say whether that means it takes an accent.', ca: 'Primer, tocar la síl·laba on cau el cop de veu. Després, dir si per això porta accent.' },
  q3:      { es: 'Ese orden es el juego: la regla de la tilde no se puede aplicar sin saber antes dónde cae el acento, y ese es justo el paso que se salta todo el mundo.', en: 'That order is the game: the accent rule cannot be applied without first knowing where the stress falls — and that is the step everyone skips.', ca: 'Aquest ordre és el joc: la regla de l\'accent no es pot aplicar sense saber abans on cau, i aquest és el pas que tothom es salta.' },
  ptsVal:  { es: 'Acierto +1 y +3s · Fallo −5s · hay que acertar las dos', en: 'Correct +1 and +3s · Wrong −5s · you must get both right', ca: 'Encert +1 i +3s · Error −5s · cal encertar les dues' },
  start:   { es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' },
  paso1:   { es: '1 · ¿Dónde cae el golpe de voz?', en: '1 · Where does the stress fall?', ca: '1 · On cau el cop de veu?' },
  paso2:   { es: '2 · ¿Lleva tilde?', en: '2 · Does it take an accent?', ca: '2 · Porta accent?' },
  si:      { es: 'Sí, lleva tilde', en: 'Yes, it does', ca: 'Sí, en porta' },
  no:      { es: 'No lleva', en: 'No, it does not', ca: 'No en porta' },
  end:     { es: 'Tiempo', en: "Time's up", ca: 'Temps' },
  hits:    { es: 'palabras', en: 'words', ca: 'paraules' },
  scoreLbl:{ es: 'puntos', en: 'points', ca: 'punts' },
  falloSil:{ es: 'La sílaba fuerte era otra', en: 'The stressed syllable was another one', ca: 'La síl·laba forta era una altra' },
  back:    { es: '← Volver', en: '← Back', ca: '← Tornar' },
}
const T = (k, l) => C[k]?.[l] ?? C[k]?.es ?? k

function IntroScreen({ onStart, l }) {
  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{T('badge', l)}</p>
        <h1 className="text-3xl font-black text-white text-center mb-1">{T('title', l)}</h1>
        <p className="text-white/40 text-sm text-center mb-6">{T('sub', l)}</p>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 mb-4">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{T('queEs', l)}</p>
          <div className="space-y-2 text-white/70 text-sm">
            <p>{T('q1', l)}</p>
            <p>{T('q2', l)}</p>
            <p>{T('q3', l)}</p>
            <p className="text-white/40 text-xs pt-1">⏱️ {GAME_TIME}s · {T('ptsVal', l)}</p>
          </div>
        </div>

        <button onClick={onStart}
          className="w-full py-3.5 rounded-2xl bg-[#EDAE49] text-black font-black text-lg hover:bg-amber-400 transition-colors">
          {T('start', l)}
        </button>
      </div>
    </div>
  )
}

export default function PonLaTilde() {
  const { lang, localPath } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const backPath = location.state?.backPath

  const [screen, setScreen] = useState('intro')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [correctCount, setCorrectCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const [round, setRound] = useState(null)
  // 'silaba' → aún no ha señalado la tónica; 'tilde' → toca decidir; 'result'
  const [phase, setPhase] = useState('silaba')
  const [silabaElegida, setSilabaElegida] = useState(null)
  const [tildeElegida, setTildeElegida] = useState(null)

  const timerRef = useRef(null)
  const nextRef = useRef(null)
  const vistasRef = useRef([])
  const correctRef = useRef(0)
  useEffect(() => { correctRef.current = correctCount }, [correctCount])

  const next = useCallback(() => {
    const r = genRound({ evitar: vistasRef.current })
    vistasRef.current = [r.palabra, ...vistasRef.current].slice(0, MEMORIA)
    setRound(r)
    setPhase('silaba')
    setSilabaElegida(null)
    setTildeElegida(null)
  }, [])

  const startGame = useCallback(() => {
    setScreen('playing')
    setCorrectCount(0); setStreak(0)
    setTimeLeft(GAME_TIME)
    vistasRef.current = []
    next()
  }, [next])

  function finish() {
    clearTimeout(nextRef.current)
    setScreen('end')
    const pts = correctRef.current * 10
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'pon-la-tilde', category: 'acentuacion',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('pon-la-tilde', { score: pts }),
        userName: user.displayName, userPhoto: user.photoURL,
      }).catch(() => {})
    }
  }

  useEffect(() => {
    // Parado mientras se lee la regla: leer por qué no debe costar la partida.
    if (screen !== 'playing' || phase === 'result') return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); finish(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [screen, phase]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => clearTimeout(nextRef.current), [])

  function elegirSilaba(i) {
    if (phase !== 'silaba') return
    setSilabaElegida(i)
    setPhase('tilde')
  }

  function responderTilde(v) {
    if (phase !== 'tilde') return
    setTildeElegida(v)
    setPhase('result')
    // Hay que acertar LAS DOS: señalar bien la sílaba y aplicar bien la regla.
    // Acertar la tilde por oído habiendo fallado la sílaba no es saber la regla.
    const ok = silabaElegida === round.tonica && v === round.lleva
    if (ok) {
      setCorrectCount(c => c + 1)
      setStreak(s => s + 1)
      setTimeLeft(t => t + CORRECT_TIME)
    } else {
      setStreak(0)
      setTimeLeft(t => Math.max(0, t - WRONG_TIME))
    }
    nextRef.current = setTimeout(next, REVEAL_MS)
  }

  const seo = {
    es: { title: 'Pon la Tilde — Juego de acentuación: agudas, llanas y esdrújulas', desc: 'Encuentra la sílaba tónica y decide si la palabra lleva tilde. Agudas, llanas, esdrújulas, sobresdrújulas y hiatos, con la regla explicada en cada palabra. Juego de lengua gratis.', path: '/juegos/pon-la-tilde' },
    en: { title: 'Spanish Accents — Stress and accent-mark game', desc: 'Find the stressed syllable and decide whether the Spanish word takes an accent. Agudas, llanas, esdrújulas and hiatus, with the rule explained every time. Free language game.', path: '/en/juegos/pon-la-tilde' },
    ca: { title: 'Posa l\'Accent — Joc d\'accentuació castellana', desc: 'Troba la síl·laba tònica i decideix si la paraula porta accent. Agudes, planes, esdrúixoles i hiats, amb la regla explicada a cada paraula. Joc de llengua gratis.', path: '/ca/juegos/pon-la-tilde' },
  }[l]

  if (screen === 'intro') {
    return (<><SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} /><IntroScreen onStart={startGame} l={l} /></>)
  }

  if (screen === 'end') {
    const pts = correctCount * 10
    const msg = {
      es: correctCount === 0 ? '¡Sigue practicando!' : correctCount < 5 ? 'Buen comienzo' : correctCount < 10 ? '¡Bien hecho!' : '¡Tildes dominadas! ✏️',
      en: correctCount === 0 ? 'Keep practising!' : correctCount < 5 ? 'Good start' : correctCount < 10 ? 'Well done!' : 'Accents mastered! ✏️',
      ca: correctCount === 0 ? 'Segueix practicant!' : correctCount < 5 ? 'Bon començament' : correctCount < 10 ? 'Ben fet!' : 'Accents dominats! ✏️',
    }[l]
    const shareText = l === 'en'
      ? `I got ${correctCount} words right in Spanish Accents ✏️ — can you beat me? https://tuthor.es/juegos/pon-la-tilde`
      : l === 'ca'
      ? `He encertat ${correctCount} paraules a Posa l'Accent ✏️ — pots superar-me? https://tuthor.es/juegos/pon-la-tilde`
      : `He acertado ${correctCount} palabras en Pon la Tilde ✏️ — ¿puedes superarme? https://tuthor.es/juegos/pon-la-tilde`
    const secondary = backPath ? [{ label: T('back', l), onClick: () => navigate(localPath(backPath)) }] : []
    return (
      <GameEndScreen game="pon-la-tilde" emoji="✏️" title={T('end', l)} score={pts} message={msg}
        stats={[{ label: T('hits', l), value: correctCount, emoji: '✅' }]}
        shareText={shareText} user={user} lang={l}
        onPlayAgain={startGame} secondaryActions={secondary} />
    )
  }

  if (!round) return null

  const timerColor = timeLeft > GAME_TIME * 0.66 ? '#22c55e' : timeLeft > GAME_TIME * 0.28 ? '#f59e0b' : '#ef4444'
  const timerPct = timeLeft / GAME_TIME
  const isResult = phase === 'result'
  const silabaOk = silabaElegida === round.tonica
  const tildeOk = tildeElegida === round.lleva
  const todoOk = isResult && silabaOk && tildeOk

  // Color de cada sílaba: al revelar, verde la que tocaba y rojo la que se
  // señaló si estaba mal.
  const claseSilaba = i => {
    if (!isResult) {
      return silabaElegida === i
        ? 'bg-[#EDAE49] text-black'
        : 'bg-white/10 text-white hover:bg-white/20 active:scale-95'
    }
    if (i === round.tonica) return 'bg-green-500 text-black'
    if (i === silabaElegida) return 'bg-red-500 text-white'
    return 'bg-white/5 text-white/30'
  }

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      <div className="w-full max-w-[560px] flex items-center justify-between mb-4 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">✏️ {T('badge', l)}</p>
          <p className="text-white font-bold text-lg flex items-center gap-2">
            {correctCount} {T('scoreLbl', l)}
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

      <p className="text-white/50 text-xs uppercase tracking-widest mb-3">
        {phase === 'silaba' ? T('paso1', l) : phase === 'tilde' ? T('paso2', l) : ''}
      </p>

      {/* La palabra, sílaba a sílaba y SIN tilde: verla acentuada regalaría las
          dos respuestas de golpe. */}
      <div className="flex flex-wrap justify-center items-center gap-1.5 mb-5">
        {round.silabas.map((s, i) => (
          <button key={i} onClick={() => elegirSilaba(i)} disabled={phase !== 'silaba'}
            className={`px-3.5 py-2.5 rounded-xl text-2xl sm:text-3xl font-black transition-all ${claseSilaba(i)}`}>
            {s}
          </button>
        ))}
      </div>

      {phase === 'tilde' && (
        <div className="w-full max-w-[420px] flex gap-2 px-1">
          <button onClick={() => responderTilde(true)}
            className="flex-1 py-3.5 rounded-2xl bg-white/10 border border-white/15 text-white font-black hover:bg-white/20 transition">
            {T('si', l)}
          </button>
          <button onClick={() => responderTilde(false)}
            className="flex-1 py-3.5 rounded-2xl bg-white/10 border border-white/15 text-white font-black hover:bg-white/20 transition">
            {T('no', l)}
          </button>
        </div>
      )}

      {isResult && (
        <div className="w-full max-w-[520px] px-1 space-y-2">
          <p className={`text-center text-2xl font-black ${todoOk ? 'text-green-400' : 'text-red-400'}`}>
            {todoOk ? '✓' : '✗'} {round.escrita}
          </p>
          <p className="text-center text-white/60 text-sm">
            {TIPOS[round.tipo].label[l] ?? TIPOS[round.tipo].label.es}
            {!silabaOk && <span className="text-red-400"> · {T('falloSil', l)}</span>}
          </p>
          <div className="rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">
            <p className="text-white/70 text-sm">💡 {explicacion(round, l)}</p>
          </div>
          <p className="text-center text-xs font-bold">
            {todoOk
              ? <span className="text-green-400">+1 · +{CORRECT_TIME}s ⏱️{streak >= 2 ? ` · 🔥 ${streak}` : ''}</span>
              : <span className="text-red-400">−{WRONG_TIME}s ⏱️</span>}
          </p>
        </div>
      )}
    </div>
  )
}
