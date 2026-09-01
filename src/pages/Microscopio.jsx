import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { CELULAS } from '../data/organulos'
import { MODOS, genRound, esCorrecta, enunciado } from '../lib/microscopio'
import CelulaSVG from '../components/CelulaSVG'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 3
const REVEAL_MS = 3000
const MEMORIA = 5

const C = {
  badge:   { es: 'Biología · La célula', en: 'Biology · The cell', ca: 'Biologia · La cèl·lula' },
  title:   { es: '🔬 Bajo el Microscopio', en: '🔬 Under the Microscope', ca: '🔬 Sota el Microscopi' },
  sub:     { es: 'Toca el orgánulo que se te pide', en: 'Tap the organelle you are asked for', ca: 'Toca l\'orgànul que se\'t demana' },
  queEs:   { es: '¿De qué va?', en: 'What is it about?', ca: 'De què va?' },
  q1:      { es: 'Aparece una célula dibujada —a veces animal, a veces vegetal— y tienes que tocar la parte que se te pide.', en: 'A drawn cell appears — sometimes animal, sometimes plant — and you tap the part you are asked for.', ca: 'Apareix una cèl·lula dibuixada —a vegades animal, a vegades vegetal— i has de tocar la part que se\'t demana.' },
  q2:      { es: 'Unas veces te dicen el nombre y otras solo lo que hace, que es como se pregunta en un examen.', en: 'Sometimes you get the name, sometimes only what it does — which is how an exam asks.', ca: 'De vegades et diuen el nom i d\'altres només què fa, que és com es pregunta en un examen.' },
  q3:      { es: 'Fíjate en qué célula te ha tocado: los cloroplastos y la pared solo están en la vegetal, y los centriolos solo en la animal.', en: 'Watch which cell you got: chloroplasts and the wall are only in the plant one, centrioles only in the animal one.', ca: 'Fixa\'t en quina cèl·lula t\'ha tocat: els cloroplasts i la paret només són a la vegetal.' },
  how:     { es: 'Cómo funciona', en: 'How it works', ca: 'Com funciona' },
  modo:    { es: '¿Cómo quieres que te pregunte?', en: 'How should it ask you?', ca: 'Com vols que et pregunti?' },
  ptsVal:  { es: 'Acierto +1 y +3s · Fallo −5s', en: 'Correct +1 and +3s · Wrong −5s', ca: 'Encert +1 i +3s · Error −5s' },
  start:   { es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' },
  buscar:  { es: 'Toca', en: 'Tap', ca: 'Toca' },
  elQue:   { es: 'Toca el que…', en: 'Tap the one that…', ca: 'Toca el que…' },
  end:     { es: 'Tiempo', en: "Time's up", ca: 'Temps' },
  hits:    { es: 'aciertos', en: 'correct', ca: 'encerts' },
  scoreLbl:{ es: 'puntos', en: 'points', ca: 'punts' },
  era:     { es: 'Era', en: 'It was', ca: 'Era' },
  back:    { es: '← Volver', en: '← Back', ca: '← Tornar' },
  otroModo:{ es: 'Cambiar de modo', en: 'Change mode', ca: 'Canviar de mode' },
}
const T = (k, l) => C[k]?.[l] ?? C[k]?.es ?? k

function IntroScreen({ onStart, l }) {
  const [modo, setModo] = useState('mixto')
  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{T('badge', l)}</p>
        <h1 className="text-3xl font-black text-white text-center mb-1">{T('title', l)}</h1>
        <p className="text-white/40 text-sm text-center mb-6">{T('sub', l)}</p>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 mb-3">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{T('queEs', l)}</p>
          <div className="space-y-2 text-white/70 text-sm">
            <p>{T('q1', l)}</p>
            <p>{T('q2', l)}</p>
            <p>{T('q3', l)}</p>
          </div>
        </div>

        <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">{T('modo', l)}</p>
        <div className="grid grid-cols-3 gap-1.5 mb-4">
          {Object.entries(MODOS).map(([id, m]) => (
            <button key={id} onClick={() => setModo(id)}
              className={`px-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                modo === id ? 'bg-white/15 border-white/20 text-white' : 'bg-white/5 border-white/10 text-white/40 hover:text-white/70'}`}>
              {m.label[l] ?? m.label.es}
            </button>
          ))}
        </div>

        <p className="text-white/40 text-xs text-center mb-5">⏱️ {GAME_TIME}s · {T('ptsVal', l)}</p>

        <button onClick={() => onStart(modo)}
          className="w-full py-3.5 rounded-2xl bg-[#EDAE49] text-black font-black text-lg hover:bg-amber-400 transition-colors">
          {T('start', l)}
        </button>
      </div>
    </div>
  )
}

export default function Microscopio() {
  const { lang, localPath } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'

  const backPath = location.state?.backPath

  const [screen, setScreen] = useState('intro')
  const [modo, setModo] = useState('mixto')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [correctCount, setCorrectCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const [round, setRound] = useState(null)
  const [elegido, setElegido] = useState(null)
  const [phase, setPhase] = useState('choose')

  const timerRef = useRef(null)
  const nextRef = useRef(null)
  const vistosRef = useRef([])
  const correctRef = useRef(0)
  useEffect(() => { correctRef.current = correctCount }, [correctCount])

  const next = useCallback(m => {
    const r = genRound(m, { evitar: vistosRef.current })
    vistosRef.current = [r.organulo.id, ...vistosRef.current].slice(0, MEMORIA)
    setRound(r)
    setElegido(null)
    setPhase('choose')
  }, [])

  const startGame = useCallback(m => {
    setModo(m)
    setScreen('playing')
    setCorrectCount(0); setStreak(0)
    setTimeLeft(GAME_TIME)
    vistosRef.current = []
    next(m)
  }, [next])

  // Declarada antes del reloj que la llama, para que el intervalo no se quede
  // atado a una versión vieja.
  function finish() {
    clearTimeout(nextRef.current)
    setScreen('end')
    const pts = correctRef.current * 10
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'microscopio', category: 'celula',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('microscopio', { score: pts }),
        userName: user.displayName, userPhoto: user.photoURL,
      }).catch(() => {})
    }
  }

  useEffect(() => {
    // Parado mientras se lee la explicación: el tiempo de leer por qué era esa
    // la respuesta no debe costar la partida.
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

  function pick(id) {
    if (phase !== 'choose') return
    setElegido(id)
    setPhase('result')
    if (esCorrecta(round, id)) {
      setCorrectCount(c => c + 1)
      setStreak(s => s + 1)
      setTimeLeft(t => t + CORRECT_TIME)
    } else {
      setStreak(0)
      setTimeLeft(t => Math.max(0, t - WRONG_TIME))
    }
    nextRef.current = setTimeout(() => next(modo), REVEAL_MS)
  }

  const seo = {
    es: { title: 'Bajo el Microscopio — Juego de la célula y sus orgánulos', desc: 'Toca el orgánulo que se te pide sobre una célula animal o vegetal: núcleo, mitocondrias, cloroplastos, aparato de Golgi… Te preguntan por el nombre o por lo que hace. Juego de biología gratis.', path: '/juegos/microscopio' },
    en: { title: 'Under the Microscope — Cell and organelles game', desc: 'Tap the organelle you are asked for on an animal or plant cell: nucleus, mitochondria, chloroplasts, Golgi apparatus… Asked by name or by what it does. Free biology game.', path: '/en/juegos/microscopio' },
    ca: { title: 'Sota el Microscopi — Joc de la cèl·lula i els seus orgànuls', desc: 'Toca l\'orgànul que se\'t demana sobre una cèl·lula animal o vegetal: nucli, mitocondris, cloroplasts, aparell de Golgi… Joc de biologia gratis.', path: '/ca/juegos/microscopio' },
  }[l]

  if (screen === 'intro') {
    return (<><SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} /><IntroScreen onStart={startGame} l={l} /></>)
  }

  if (screen === 'end') {
    const pts = correctCount * 10
    const msg = {
      es: correctCount === 0 ? '¡Sigue practicando!' : correctCount < 5 ? 'Buen comienzo' : correctCount < 10 ? '¡Bien hecho!' : '¡Célula dominada! 🔬',
      en: correctCount === 0 ? 'Keep practising!' : correctCount < 5 ? 'Good start' : correctCount < 10 ? 'Well done!' : 'Cell mastered! 🔬',
      ca: correctCount === 0 ? 'Segueix practicant!' : correctCount < 5 ? 'Bon començament' : correctCount < 10 ? 'Ben fet!' : 'Cèl·lula dominada! 🔬',
    }[l]
    const shareText = l === 'en'
      ? `I found ${correctCount} organelles in Under the Microscope 🔬 — can you beat me? https://tuthor.es/juegos/microscopio`
      : l === 'ca'
      ? `He trobat ${correctCount} orgànuls a Sota el Microscopi 🔬 — pots superar-me? https://tuthor.es/juegos/microscopio`
      : `He encontrado ${correctCount} orgánulos en Bajo el Microscopio 🔬 — ¿puedes superarme? https://tuthor.es/juegos/microscopio`
    const secondary = [{ label: T('otroModo', l), onClick: () => setScreen('intro') }]
    if (backPath) secondary.push({ label: T('back', l), onClick: () => navigate(localPath(backPath)) })
    return (
      <GameEndScreen game="microscopio" emoji="🔬" title={T('end', l)} score={pts} message={msg}
        stats={[{ label: T('hits', l), value: correctCount, emoji: '✅' }]}
        shareText={shareText} user={user} lang={l}
        onPlayAgain={() => startGame(modo)}
        secondaryActions={secondary} />
    )
  }

  if (!round) return null

  const timerColor = timeLeft > GAME_TIME * 0.66 ? '#22c55e' : timeLeft > GAME_TIME * 0.28 ? '#f59e0b' : '#ef4444'
  const timerPct = timeLeft / GAME_TIME
  const isResult = phase === 'result'
  const acerto = isResult && esCorrecta(round, elegido)
  const celula = CELULAS[round.tipo]

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      <div className="w-full max-w-[560px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">
            {celula.emoji} {celula.label[l] ?? celula.label.es}
          </p>
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

      <p className="text-white/50 text-xs uppercase tracking-widest mb-1">
        {round.preguntaPor === 'nombre' ? T('buscar', l) : T('elQue', l)}
      </p>
      <p className="text-white text-lg sm:text-xl font-bold mb-3 text-center px-2 min-h-[56px]">
        {enunciado(round, l)}
      </p>

      <div className="w-full max-w-[520px] rounded-2xl border border-white/10 bg-white/5 p-3 mb-3">
        <CelulaSVG tipo={round.tipo} onPick={isResult ? null : pick}
          elegido={elegido} correcto={isResult ? round.organulo.id : null} revelado={isResult} />
      </div>

      {isResult && (
        <div className="w-full max-w-[520px] px-1 space-y-2">
          <p className={`text-center font-black ${acerto ? 'text-green-400' : 'text-red-400'}`}>
            {acerto ? '✓' : '✗'} {T('era', l)}: {round.organulo.nombre[l] ?? round.organulo.nombre.es}
          </p>
          {/* El detalle es lo que de verdad enseña: sale siempre, se acierte o no */}
          <div className="rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">
            <p className="text-white/70 text-sm">💡 {round.organulo.detalle[l] ?? round.organulo.detalle.es}</p>
          </div>
          <p className="text-center text-xs font-bold">
            {acerto
              ? <span className="text-green-400">+1 · +{CORRECT_TIME}s ⏱️{streak >= 2 ? ` · 🔥 ${streak}` : ''}</span>
              : <span className="text-red-400">−{WRONG_TIME}s ⏱️</span>}
          </p>
        </div>
      )}
    </div>
  )
}
