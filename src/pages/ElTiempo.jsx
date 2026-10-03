import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/elTiempo'
import PreguntaTiempo from '../components/elTiempo/PreguntaTiempo'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 3800

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Temperatura y lluvia: ¿abrigo, chaqueta o camiseta? ¿Paraguas?', en: 'Temperature and rain: coat, jacket or T-shirt? Umbrella?', ca: 'Temperatura i pluja: abric, jaqueta o samarreta? Paraigua?' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Con viento, previsión por horas y radar de lluvia', en: 'With wind, hourly forecast and rain radar', ca: 'Amb vent, previsió per hores i radar de pluja' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Además el índice UV y radar a dos horas vista', en: 'Plus the UV index and radar two hours ahead', ca: 'A més l’índex UV i radar a dues hores vista' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[el-tiempo] los niveles de la pantalla no coinciden con NIVELES')
}

export default function ElTiempo() {
  const { lang, localPath, tr } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const backPath = location.state?.backPath

  const [screen, setScreen] = useState('intro')
  const [nivel, setNivel] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [aciertos, setAciertos] = useState(0)
  const [streak, setStreak] = useState(0)
  const [ronda, setRonda] = useState(null)
  const [elegida, setElegida] = useState(null)
  const [phase, setPhase] = useState('choose')

  const timerRef = useRef(null)
  const nextRef = useRef(null)
  const aciertosRef = useRef(0)
  const ultimoTipoRef = useRef(null)
  useEffect(() => { aciertosRef.current = aciertos }, [aciertos])

  // Alterna formatos: no repite el de la ronda anterior si el nivel tiene varios.
  const next = useCallback(niv => {
    const tipos = NIVELES[niv].tipos
    const pool = tipos.length > 1 ? tipos.filter(x => x !== ultimoTipoRef.current) : tipos
    const tipo = pool[Math.floor(Math.random() * pool.length)]
    ultimoTipoRef.current = tipo
    setRonda(genRonda(niv, { tipo }))
    setElegida(null)
    setPhase('choose')
  }, [])

  const startGame = useCallback((niv = 'facil') => {
    setNivel(niv); setScreen('playing')
    setAciertos(0); setStreak(0)
    setTimeLeft(GAME_TIME)
    ultimoTipoRef.current = null
    next(niv)
  }, [next])

  function finish() {
    clearTimeout(nextRef.current)
    setScreen('end')
    const pts = aciertosRef.current * 10
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'el-tiempo', category: 'atmosfera-clima',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('el-tiempo', { score: pts }),
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

  function responder(r) {
    if (phase !== 'choose') return
    setElegida(r); setPhase('result')
    if (esCorrecta(ronda, r)) {
      setAciertos(a => a + 1)
      setStreak(s => s + 1)
      setTimeLeft(t => t + CORRECT_TIME)
    } else {
      setStreak(0)
      setTimeLeft(t => Math.max(0, t - WRONG_TIME))
    }
    nextRef.current = setTimeout(() => next(nivel), REVEAL_MS)
  }

  const seo = {
    title: tr({ es: 'El Tiempo — Juego de leer la previsión meteorológica', en: 'The Weather — Reading the weather forecast game', ca: 'El Temps — Joc de llegir la previsió meteorològica' }),
    desc: tr({
      es: 'Lee la previsión del tiempo y decide qué ponerte y si llevar paraguas. Previsión simple, por horas y radar de lluvia, en tres niveles. Juego gratis de ciencias.',
      en: 'Read the weather forecast and decide what to wear and whether to take an umbrella. Simple, hourly and rain radar forecasts, in three levels. Free science game.',
      ca: 'Llegeix la previsió del temps i decideix què et poses i si t’emportes paraigua. Previsió simple, per hores i radar de pluja, en tres nivells. Joc gratis de ciències.',
    }),
    path: '/juegos/el-tiempo',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="el-tiempo"
            badge={tr({ es: 'Ciencias · El tiempo atmosférico', en: 'Science · The weather', ca: 'Ciències · El temps atmosfèric' })}
            titulo={tr({ es: '🌦️ El Tiempo', en: '🌦️ The Weather', ca: '🌦️ El Temps' })}
            sub={tr({ es: 'Lee la previsión: ¿qué te pones? ¿Llevas paraguas?', en: 'Read the forecast: what do you wear? Umbrella or not?', ca: 'Llegeix la previsió: què et poses? T’emportes paraigua?' })} />

          <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{tr({ es: 'Elige nivel', en: 'Choose a level', ca: 'Tria nivell' })}</p>
          <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl mb-2">
            {Object.entries(DIFS).map(([id, d], i) => (
              <button key={id} onClick={() => setNivel(id)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${nivel === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}>
                <NivelBarras clave={id} i={i} />{tr(d.label)}
              </button>
            ))}
          </div>
          <p className="text-white/40 text-xs text-center mb-5">{tr(DIFS[nivel].desc)}</p>

          <button onClick={() => startGame(nivel)}
            className="w-full py-3.5 rounded-2xl bg-[#EDAE49] text-black font-black text-lg hover:bg-amber-400 transition-colors">
            {tr({ es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' })}
          </button>
          <ComoSeJuega>
            <div className="space-y-2 text-white/70 text-sm">
              <p>{tr({ es: 'Sale una situación —vas al cole, tienes partido, sales a pasear al perro— y la previsión del tiempo para ese momento. Tienes que elegir qué te llevas: la prenda de abrigo y, si hace falta, el paraguas.', en: 'A situation appears — going to school, a match, walking the dog — with the weather forecast for that time. You choose what to take: the right layer and, if needed, an umbrella.', ca: 'Surt una situació —vas a l’escola, tens partit, surts a passejar el gos— i la previsió del temps per a aquell moment. Has de triar què t’emportes: la peça d’abric i, si cal, el paraigua.' })}</p>
              <p>{tr({ es: 'Las reglas: con menos de 10 °C, abrigo; de 10 a 18 °C, chaqueta; con más de 18 °C, camiseta. Si el viento llega a 30 km/h se siente unos 4 grados menos. Paraguas si la probabilidad de lluvia llega al 50 %, y en difícil, gafas de sol y crema si el índice UV es 6 o más.', en: 'The rules: below 10 °C, a coat; 10 to 18 °C, a jacket; above 18 °C, a T-shirt. If the wind reaches 30 km/h it feels about 4 degrees colder. An umbrella if the chance of rain reaches 50%, and on hard, sunglasses and sun cream if the UV index is 6 or more.', ca: 'Les regles: amb menys de 10 °C, abric; de 10 a 18 °C, jaqueta; amb més de 18 °C, samarreta. Si el vent arriba a 30 km/h se sent uns 4 graus menys. Paraigua si la probabilitat de pluja arriba al 50 %, i en difícil, ulleres de sol i crema si l’índex UV és 6 o més.' })}</p>
              <p>{tr({ es: 'En medio y difícil la previsión cambia de forma: a veces es una gráfica por horas (solo cuentan las horas en que estás fuera: puede llover por la mañana y no por la tarde) y a veces un radar, donde hay que mover la lluvia a la velocidad que indica para saber si llegará a tu ciudad.', en: 'On medium and hard the forecast changes format: sometimes it is an hourly chart (only the hours you are out count: it may rain in the morning but not in the afternoon) and sometimes a radar, where you move the rain at the speed shown to see whether it will reach your city.', ca: 'En mitjà i difícil la previsió canvia de forma: de vegades és una gràfica per hores (només compten les hores que ets fora: pot ploure al matí i no a la tarda) i de vegades un radar, on cal moure la pluja a la velocitat que indica per saber si arribarà a la teva ciutat.' })}</p>
              <p className="text-white/40 text-xs pt-1">⏱️ {GAME_TIME}s · {tr({ es: `Acierto +10 y +${CORRECT_TIME}s · Fallo −${WRONG_TIME}s`, en: `Correct +10 and +${CORRECT_TIME}s · Wrong −${WRONG_TIME}s`, ca: `Encert +10 i +${CORRECT_TIME}s · Error −${WRONG_TIME}s` })}</p>
            </div>
          </ComoSeJuega>
        </div>
      </div>
    )
  }

  if (screen === 'end') {
    const pts = aciertos * 10
    const msg = tr({
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Bien leído!' : '¡Eres del equipo del tiempo! 🌦️',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Well read!' : 'You could present the weather! 🌦️',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Ben llegit!' : 'Podries fer l’home del temps! 🌦️',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} previsiones en El Tiempo 🌦️ — ¿puedes superarme? https://tuthor.es/juegos/el-tiempo`,
      en: `I read ${aciertos} forecasts right in The Weather 🌦️ — can you beat me? https://tuthor.es/juegos/el-tiempo`,
      ca: `He encertat ${aciertos} previsions a El Temps 🌦️ — em pots superar? https://tuthor.es/juegos/el-tiempo`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="el-tiempo" emoji="🌦️" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
        stats={[{ label: tr({ es: 'aciertos', en: 'correct', ca: 'encerts' }), value: aciertos, emoji: '✅' }]}
        shareText={shareText} user={user} lang={l}
        onPlayAgain={() => startGame(nivel)} secondaryActions={secondary} />
    )
  }

  if (!ronda) return null
  const timerColor = timeLeft > GAME_TIME * 0.66 ? '#22c55e' : timeLeft > GAME_TIME * 0.28 ? '#f59e0b' : '#ef4444'
  const timerPct = Math.min(1, timeLeft / GAME_TIME)
  const isResult = phase === 'result'
  const acierto = isResult && esCorrecta(ronda, elegida)

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-3 sm:px-4 py-4">
      {head}
      <div className="w-full max-w-[480px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">{DIFS[nivel].emoji} {tr(DIFS[nivel].label)}</p>
          <p className="text-white font-bold text-lg flex items-center gap-2">
            {aciertos * 10} {tr({ es: 'puntos', en: 'points', ca: 'punts' })}
            {streak >= 2 && <span className="flex items-center gap-0.5 text-orange-400 text-sm font-black"><Racha className="w-4 h-4" />{streak}</span>}
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

      <div className="w-full max-w-[480px]">
        <PreguntaTiempo ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
        {isResult && (
          <p className="text-center text-xs font-bold mt-2">
            {acierto
              ? <span className="text-green-400">+10 · +{CORRECT_TIME}s ⏱️{streak >= 2 ? ` · 🔥 ${streak}` : ''}</span>
              : <span className="text-red-400">−{WRONG_TIME}s ⏱️</span>}
          </p>
        )}
      </div>
    </div>
  )
}
