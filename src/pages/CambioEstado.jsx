import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { ESTADOS } from '../data/sustancias'
import { ESTADO_IDS, genRound, esCorrecta, opcionesCambio } from '../lib/cambioEstado'
import ParticulasSVG from '../components/ParticulasSVG'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 3
const REVEAL_MS = 3200
const MEMORIA = 5

const C = {
  badge:   { es: 'Química · Estados de la materia', en: 'Chemistry · States of matter', ca: 'Química · Estats de la matèria' },
  title:   { es: '🌡️ Cambio de Estado', en: '🌡️ Change of State', ca: '🌡️ Canvi d\'Estat' },
  sub:     { es: '¿Sólido, líquido o gas? Depende de la sustancia', en: 'Solid, liquid or gas? It depends on the substance', ca: 'Sòlid, líquid o gas? Depèn de la substància' },
  queEs:   { es: '¿De qué va?', en: 'What is it about?', ca: 'De què va?' },
  q1:      { es: 'Te dan una sustancia y una temperatura, y tienes que decir en qué estado está. Los puntos de fusión y ebullición se ven siempre: no hay que memorizarlos, hay que saber leerlos.', en: 'You get a substance and a temperature and must say what state it is in. Melting and boiling points are always shown: you do not memorise them, you read them.', ca: 'Et donen una substància i una temperatura, i has de dir en quin estat és. Els punts es veuen sempre: no cal memoritzar-los, cal saber llegir-los.' },
  q2:      { es: 'Cuidado con lo que "parece": el hierro a 1000 °C sigue siendo sólido y el oxígeno a 20 °C ya es gas. Frío y caliente son cosa nuestra, no de la sustancia.', en: 'Careful with what "seems" right: iron at 1000 °C is still solid and oxygen at 20 °C is already gas. Hot and cold are about us, not about the substance.', ca: 'Compte amb el que "sembla": el ferro a 1000 °C encara és sòlid i l\'oxigen a 20 °C ja és gas.' },
  q3:      { es: 'Otras rondas te dan una escena de casa —se empañan los cristales, se derrite el hielo— y hay que decir cómo se llama ese cambio.', en: 'Other rounds give you an everyday scene — windows fogging up, ice melting — and you name the change.', ca: 'Altres rondes et donen una escena de casa i cal dir com es diu aquest canvi.' },
  ptsVal:  { es: 'Acierto +1 y +3s · Fallo −5s', en: 'Correct +1 and +3s · Wrong −5s', ca: 'Encert +1 i +3s · Error −5s' },
  start:   { es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' },
  aQue:    { es: '¿En qué estado está?', en: 'What state is it in?', ca: 'En quin estat és?' },
  comoSe:  { es: '¿Cómo se llama este cambio?', en: 'What is this change called?', ca: 'Com es diu aquest canvi?' },
  funde:   { es: 'Se funde a', en: 'Melts at', ca: 'Es fon a' },
  hierve:  { es: 'Hierve a', en: 'Boils at', ca: 'Bull a' },
  end:     { es: 'Tiempo', en: "Time's up", ca: 'Temps' },
  hits:    { es: 'aciertos', en: 'correct', ca: 'encerts' },
  scoreLbl:{ es: 'puntos', en: 'points', ca: 'punts' },
  era:     { es: 'Era', en: 'It was', ca: 'Era' },
  back:    { es: '← Volver', en: '← Back', ca: '← Tornar' },
}
const T = (k, l) => C[k]?.[l] ?? C[k]?.es ?? k
const tr = (o, l) => o?.[l] ?? o?.es ?? ''

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

export default function CambioEstado() {
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
  const [opciones, setOpciones] = useState([])
  const [elegida, setElegida] = useState(null)
  const [phase, setPhase] = useState('choose')

  const timerRef = useRef(null)
  const nextRef = useRef(null)
  const vistosRef = useRef([])
  const correctRef = useRef(0)
  useEffect(() => { correctRef.current = correctCount }, [correctCount])

  const next = useCallback(() => {
    const r = genRound('mixto', { evitar: vistosRef.current })
    vistosRef.current = [r.id, ...vistosRef.current].slice(0, MEMORIA)
    setRound(r)
    setOpciones(r.tipo === 'cambio' ? opcionesCambio(r) : [])
    setElegida(null)
    setPhase('choose')
  }, [])

  const startGame = useCallback(() => {
    setScreen('playing')
    setCorrectCount(0); setStreak(0)
    setTimeLeft(GAME_TIME)
    vistosRef.current = []
    next()
  }, [next])

  function finish() {
    clearTimeout(nextRef.current)
    setScreen('end')
    const pts = correctRef.current * 10
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'cambio-estado', category: 'estados-materia',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('cambio-estado', { score: pts }),
        userName: user.displayName, userPhoto: user.photoURL,
      }).catch(() => {})
    }
  }

  useEffect(() => {
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

  function responder(v) {
    if (phase !== 'choose') return
    setElegida(v)
    setPhase('result')
    if (esCorrecta(round, v)) {
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
    es: { title: 'Cambio de Estado — Juego de los estados de la materia', desc: 'Sólido, líquido o gas: decide el estado de cada sustancia según su temperatura y sus puntos de fusión y ebullición, y nombra los cambios (fusión, condensación, sublimación). Juego de química gratis.', path: '/juegos/cambio-estado' },
    en: { title: 'Change of State — States of matter game', desc: 'Solid, liquid or gas: decide each substance\'s state from its temperature and its melting and boiling points, and name the changes (melting, condensation, sublimation). Free chemistry game.', path: '/en/juegos/cambio-estado' },
    ca: { title: 'Canvi d\'Estat — Joc dels estats de la matèria', desc: 'Sòlid, líquid o gas: decideix l\'estat de cada substància segons la temperatura i els seus punts de fusió i ebullició, i anomena els canvis. Joc de química gratis.', path: '/ca/juegos/cambio-estado' },
  }[l]

  if (screen === 'intro') {
    return (<><SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} /><IntroScreen onStart={startGame} l={l} /></>)
  }

  if (screen === 'end') {
    const pts = correctCount * 10
    const msg = {
      es: correctCount === 0 ? '¡Sigue practicando!' : correctCount < 5 ? 'Buen comienzo' : correctCount < 10 ? '¡Bien hecho!' : '¡Estados dominados! 🌡️',
      en: correctCount === 0 ? 'Keep practising!' : correctCount < 5 ? 'Good start' : correctCount < 10 ? 'Well done!' : 'States mastered! 🌡️',
      ca: correctCount === 0 ? 'Segueix practicant!' : correctCount < 5 ? 'Bon començament' : correctCount < 10 ? 'Ben fet!' : 'Estats dominats! 🌡️',
    }[l]
    const shareText = l === 'en'
      ? `I got ${correctCount} right in Change of State 🌡️ — can you beat me? https://tuthor.es/juegos/cambio-estado`
      : l === 'ca'
      ? `He encertat ${correctCount} a Canvi d'Estat 🌡️ — pots superar-me? https://tuthor.es/juegos/cambio-estado`
      : `He acertado ${correctCount} en Cambio de Estado 🌡️ — ¿puedes superarme? https://tuthor.es/juegos/cambio-estado`
    const secondary = backPath ? [{ label: T('back', l), onClick: () => navigate(localPath(backPath)) }] : []
    return (
      <GameEndScreen game="cambio-estado" emoji="🌡️" title={T('end', l)} score={pts} message={msg}
        stats={[{ label: T('hits', l), value: correctCount, emoji: '✅' }]}
        shareText={shareText} user={user} lang={l}
        onPlayAgain={startGame} secondaryActions={secondary} />
    )
  }

  if (!round) return null

  const timerColor = timeLeft > GAME_TIME * 0.66 ? '#22c55e' : timeLeft > GAME_TIME * 0.28 ? '#f59e0b' : '#ef4444'
  const timerPct = timeLeft / GAME_TIME
  const isResult = phase === 'result'
  const acerto = isResult && esCorrecta(round, elegida)
  const esEstado = round.tipo === 'estado'

  const claseBoton = v => {
    if (!isResult) return 'bg-white/10 border-white/15 text-white hover:bg-white/20 active:scale-95'
    if (v === round.respuesta) return 'bg-green-500 border-green-400 text-black'
    if (v === elegida) return 'bg-red-500 border-red-400 text-white'
    return 'bg-white/5 border-white/5 text-white/30'
  }

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      <div className="w-full max-w-[520px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">🌡️ {T('badge', l)}</p>
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

      <p className="text-white/50 text-xs uppercase tracking-widest mb-2">
        {esEstado ? T('aQue', l) : T('comoSe', l)}
      </p>

      {esEstado ? (
        <>
          <p className="text-white text-2xl font-black mb-1">{tr(round.sustancia.nombre, l)}</p>
          <p className="text-[#EDAE49] text-3xl font-black mb-2">{round.temp} °C</p>
          {/* Los puntos van SIEMPRE a la vista: el juego no es memorizarlos,
              es saber dónde cae la temperatura respecto a ellos. */}
          <p className="text-white/40 text-xs mb-4 text-center">
            {T('funde', l)} {round.sustancia.fusion} °C · {T('hierve', l)} {round.sustancia.ebullicion} °C
          </p>
        </>
      ) : (
        <p className="text-white text-xl font-bold mb-4 text-center px-3 max-w-[460px] min-h-[56px]">
          {tr(round.cambio.ejemplo, l)}
        </p>
      )}

      {isResult && esEstado && (
        <div className="w-full max-w-[280px] mb-3">
          <ParticulasSVG estado={round.respuesta} />
        </div>
      )}

      <div className={`w-full max-w-[460px] grid gap-2 px-1 ${esEstado ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {esEstado
          ? ESTADO_IDS.map(id => (
              <button key={id} onClick={() => responder(id)} disabled={isResult}
                className={`py-3.5 rounded-2xl border font-black transition-all ${claseBoton(id)}`}>
                {ESTADOS[id].emoji} {tr(ESTADOS[id].label, l)}
              </button>
            ))
          : opciones.map(c => (
              <button key={c.id} onClick={() => responder(c.id)} disabled={isResult}
                className={`py-3.5 px-2 rounded-2xl border font-bold text-sm transition-all ${claseBoton(c.id)}`}>
                {tr(c.nombre, l)}
              </button>
            ))}
      </div>

      {isResult && (
        <div className="w-full max-w-[460px] px-1 mt-3 space-y-2">
          <div className="rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">
            <p className="text-white/70 text-sm">
              💡 {esEstado
                ? tr(round.sustancia.nota, l)
                : `${tr(round.cambio.nombre, l)}: ${tr(ESTADOS[round.cambio.de].label, l).toLowerCase()} → ${tr(ESTADOS[round.cambio.a].label, l).toLowerCase()}.`}
            </p>
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
