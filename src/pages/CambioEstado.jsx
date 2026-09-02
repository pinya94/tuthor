import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { ESTADOS } from '../data/sustancias'
import { ESTADO_IDS, DIFICULTADES, genRound, esCorrecta } from '../lib/cambioEstado'
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
  q1:      { es: 'Te dan una sustancia y una temperatura, y tienes que decir en qué estado está. En fácil y medio los puntos de fusión y ebullición están a la vista: no hay que memorizarlos, hay que saber leerlos.', en: 'You get a substance and a temperature and must say what state it is in. On easy and medium the melting and boiling points are shown: you do not memorise them, you read them.', ca: 'Et donen una substància i una temperatura, i has de dir en quin estat és. En fàcil i mitjà els punts es veuen: no cal memoritzar-los, cal saber llegir-los.' },
  q2:      { es: 'Cuidado con lo que "parece": el hierro a 1000 °C sigue siendo sólido y el oxígeno a 20 °C ya es gas. Frío y caliente son cosa nuestra, no de la sustancia.', en: 'Careful with what "seems" right: iron at 1000 °C is still solid and oxygen at 20 °C is already gas. Hot and cold are about us, not about the substance.', ca: 'Compte amb el que "sembla": el ferro a 1000 °C encara és sòlid i l\'oxigen a 20 °C ja és gas.' },
  q3:      { es: 'Al acertar verás las partículas del estado: ordenadas y quietas en el sólido, sueltas en el líquido, disparadas en el gas.', en: 'When you get it right you see the particles for that state: ordered and still in a solid, loose in a liquid, flying in a gas.', ca: 'En encertar veuràs les partícules de l\'estat: ordenades i quietes al sòlid, soltes al líquid, disparades al gas.' },
  q4:      { es: 'En difícil los puntos están tapados y aparecen al corregir. Las temperaturas se sortean cada vez, así que no hay dos partidas iguales.', en: 'On hard the points are hidden and appear when the answer is revealed. Temperatures are drawn at random every time, so no two games are alike.', ca: 'En difícil els punts estan tapats i apareixen en corregir. Les temperatures se sortegen cada cop: no hi ha dues partides iguals.' },
  ptsVal:  { es: 'Acierto +1 y +3s · Fallo −5s', en: 'Correct +1 and +3s · Wrong −5s', ca: 'Encert +1 i +3s · Error −5s' },
  nivel:   { es: 'Elige nivel', en: 'Choose a level', ca: 'Tria nivell' },
  changeDif:{ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' },
  oculto:  { es: 'Sin los datos: tienes que conocer la sustancia', en: 'No data: you have to know the substance', ca: 'Sense les dades: has de conèixer la substància' },
  start:   { es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' },
  aQue:    { es: '¿En qué estado está?', en: 'What state is it in?', ca: 'En quin estat és?' },
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

// Las etiquetas de los niveles. Los parámetros de verdad (cuánto se acerca la
// temperatura al punto, si se tapan los datos) viven en DIFICULTADES, dentro de
// la lógica: aquí solo se nombran.
const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Con los datos a la vista y temperaturas claras', en: 'Data shown and clear-cut temperatures', ca: 'Amb les dades a la vista i temperatures clares' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Con los datos, pero la temperatura roza el punto de cambio', en: 'Data shown, but the temperature grazes the change point', ca: 'Amb les dades, però la temperatura frega el punt de canvi' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Sin los datos: hay que saberse la sustancia', en: 'No data: you have to know the substance', ca: 'Sense les dades: cal saber-se la substància' } },
}

// Un nivel de más o de menos aquí sería un botón que no hace nada: genRound
// caería al nivel por defecto sin quejarse.
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(DIFICULTADES).join()) {
  console.warn('[cambio-estado] los niveles de la pantalla no coinciden con DIFICULTADES')
}

function IntroScreen({ onStart, l }) {
  const [dif, setDif] = useState('facil')
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
            <p>{T('q4', l)}</p>
            <p className="text-white/40 text-xs pt-1">⏱️ {GAME_TIME}s · {T('ptsVal', l)}</p>
          </div>
        </div>

        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{T('nivel', l)}</p>
        <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl mb-2">
          {Object.entries(DIFS).map(([id, d]) => (
            <button key={id} onClick={() => setDif(id)}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${dif === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}>
              {d.emoji} {tr(d.label, l)}
            </button>
          ))}
        </div>
        <p className="text-white/40 text-xs text-center mb-5">{tr(DIFS[dif].desc, l)}</p>

        <button onClick={() => onStart(dif)}
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
  const [difficulty, setDifficulty] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [correctCount, setCorrectCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const [round, setRound] = useState(null)
  const [elegida, setElegida] = useState(null)
  const [phase, setPhase] = useState('choose')

  const timerRef = useRef(null)
  const nextRef = useRef(null)
  const vistosRef = useRef([])
  const correctRef = useRef(0)
  useEffect(() => { correctRef.current = correctCount }, [correctCount])

  const next = useCallback(dif => {
    const r = genRound({ dificultad: dif, evitar: vistosRef.current })
    vistosRef.current = [r.id, ...vistosRef.current].slice(0, MEMORIA)
    setRound(r)
    setElegida(null)
    setPhase('choose')
  }, [])

  const startGame = useCallback((dif = 'facil') => {
    setDifficulty(dif)
    setScreen('playing')
    setCorrectCount(0); setStreak(0)
    setTimeLeft(GAME_TIME)
    vistosRef.current = []
    next(dif)
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
    nextRef.current = setTimeout(() => next(difficulty), REVEAL_MS)
  }

  const seo = {
    es: { title: 'Cambio de Estado — Juego de los estados de la materia', desc: 'Sólido, líquido o gas: decide el estado de cada sustancia según su temperatura. Tres niveles, con los puntos de fusión y ebullición a la vista o tapados, y 30 sustancias reales. Juego de química gratis.', path: '/juegos/cambio-estado' },
    en: { title: 'Change of State — States of matter game', desc: 'Solid, liquid or gas: decide each substance\'s state from its temperature. Three levels, with the melting and boiling points shown or hidden, and 30 real substances. Free chemistry game.', path: '/en/juegos/cambio-estado' },
    ca: { title: 'Canvi d\'Estat — Joc dels estats de la matèria', desc: 'Sòlid, líquid o gas: decideix l\'estat de cada substància segons la temperatura. Tres nivells, amb els punts de fusió i ebullició a la vista o tapats, i 30 substàncies reals. Joc de química gratis.', path: '/ca/juegos/cambio-estado' },
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
    const secondary = [
      { label: T('changeDif', l), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: T('back', l), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="cambio-estado" emoji="🌡️" title={T('end', l)} score={pts} message={msg}
        stats={[{ label: T('hits', l), value: correctCount, emoji: '✅' }]}
        shareText={shareText} user={user} lang={l}
        onPlayAgain={() => startGame(difficulty)} secondaryActions={secondary} />
    )
  }

  if (!round) return null

  const timerColor = timeLeft > GAME_TIME * 0.66 ? '#22c55e' : timeLeft > GAME_TIME * 0.28 ? '#f59e0b' : '#ef4444'
  const timerPct = timeLeft / GAME_TIME
  const isResult = phase === 'result'
  const acerto = isResult && esCorrecta(round, elegida)

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
          <p className="text-white/40 text-xs uppercase tracking-widest">{DIFS[difficulty].emoji} {tr(DIFS[difficulty].label, l)}</p>
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

      <p className="text-white/50 text-xs uppercase tracking-widest mb-2">{T('aQue', l)}</p>

      <p className="text-white text-2xl font-black mb-1">{tr(round.sustancia.nombre, l)}</p>
      <p className="text-[#EDAE49] text-3xl font-black mb-2">{round.temp} °C</p>
      {/* En fácil y medio los puntos están a la vista: ahí el juego no es
          memorizarlos, es saber dónde cae la temperatura respecto a ellos. En
          difícil se tapan y salen al corregir, para que se aprendan igual. */}
      <p className="text-white/40 text-xs mb-4 text-center px-4">
        {round.ocultar && !isResult
          ? <span className="text-white/30">🔒 {T('oculto', l)}</span>
          : <>{T('funde', l)} {round.sustancia.fusion} °C · {T('hierve', l)} {round.sustancia.ebullicion} °C</>}
      </p>

      {isResult && (
        <div className="w-full max-w-[280px] mb-3">
          <ParticulasSVG estado={round.respuesta} />
        </div>
      )}

      <div className="w-full max-w-[460px] grid grid-cols-3 gap-2 px-1">
        {ESTADO_IDS.map(id => (
          <button key={id} onClick={() => responder(id)} disabled={isResult}
            className={`py-3.5 rounded-2xl border font-black transition-all ${claseBoton(id)}`}>
            {ESTADOS[id].emoji} {tr(ESTADOS[id].label, l)}
          </button>
        ))}
      </div>

      {isResult && (
        <div className="w-full max-w-[460px] px-1 mt-3 space-y-2">
          <div className="rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">
            <p className="text-white/70 text-sm">💡 {tr(round.sustancia.nota, l)}</p>
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
