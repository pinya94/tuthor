import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/queHoraEs'
import PreguntaHora from '../components/queHoraEs/PreguntaHora'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Cada ronda es una cuenta (girar el reloj, tocar el huso): 120 s y +8 s por acierto.
const GAME_TIME = 120
const WRONG_TIME = 5
const CORRECT_TIME = 8
const REVEAL_MS = 6000 // da tiempo a leer la cuenta

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Ciudades conocidas, sin cambiar de día, y husos en el mapa', en: 'Well-known cities, no change of day, and time zones on the map', ca: 'Ciutats conegudes, sense canviar de dia, i fusos al mapa' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Vuelos, cambios de día y la hora de un meridiano', en: 'Flights, changes of day and the time at a meridian', ca: 'Vols, canvis de dia i l’hora d’un meridià' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Con minutos: vuelos de horas y cuartos, y cualquier longitud', en: 'With minutes: flights in hours and quarters, and any longitude', ca: 'Amb minuts: vols d’hores i quarts, i qualsevol longitud' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[que-hora-es] los niveles de la pantalla no coinciden con NIVELES')
}

export default function QueHoraEs() {
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
  useEffect(() => { aciertosRef.current = aciertos }, [aciertos])

  const next = useCallback(niv => {
    setRonda(genRonda(niv))
    setElegida(null)
    setPhase('choose')
  }, [])

  const startGame = useCallback((niv = 'facil') => {
    setNivel(niv); setScreen('playing')
    setAciertos(0); setStreak(0)
    setTimeLeft(GAME_TIME)
    next(niv)
  }, [next])

  function finish() {
    clearTimeout(nextRef.current)
    setScreen('end')
    const pts = aciertosRef.current * 10
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'que-hora-es', category: 'representacion',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('que-hora-es', { score: pts }),
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
    title: tr({ es: '¿Qué Hora Es Allí? — Juego de husos horarios para 1.º de ESO', en: 'What Time Is It There? — Time zones game', ca: 'Quina Hora És Allà? — Joc de fusos horaris per a 1r d’ESO' }),
    desc: tr({
      es: 'Juego de husos horarios: si en Madrid son las 10:00, ¿qué hora es en Tokio? Gira el reloj, calcula la hora de llegada de un vuelo y toca en el mapa el huso de cada hora. Con cambios de día y la explicación de cada cuenta. Gratis.',
      en: 'Time zones game: if it is 10:00 in Madrid, what time is it in Tokyo? Turn the clock, work out a flight’s arrival time and tap the right time zone on the map. With changes of day and every sum explained. Free.',
      ca: 'Joc de fusos horaris: si a Madrid són les 10:00, quina hora és a Tòquio? Gira el rellotge, calcula l’hora d’arribada d’un vol i toca al mapa el fus de cada hora. Amb canvis de dia i l’explicació de cada compte. Gratis.',
    }),
    path: '/juegos/que-hora-es',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="que-hora-es"
            badge={tr({ es: 'Geografía · Husos horarios', en: 'Geography · Time zones', ca: 'Geografia · Fusos horaris' })}
            titulo={tr({ es: '🕒 ¿Qué Hora Es Allí?', en: '🕒 What Time Is It There?', ca: '🕒 Quina Hora És Allà?' })}
            sub={tr({ es: 'Da la vuelta al mundo reloj en mano', en: 'Go round the world, clock in hand', ca: 'Fes la volta al món rellotge en mà' })} />

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
              <p>{tr({ es: 'Cada ciudad tiene su hora oficial, escrita como UTC más o menos unas horas: Madrid es UTC+1 y Nueva York UTC−5, así que Nueva York va 6 horas por detrás. Gira el reloj hasta la hora de la otra ciudad; si pasas de medianoche, cambia el día.', en: 'Each city has its official time, written as UTC plus or minus some hours: Madrid is UTC+1 and New York UTC−5, so New York is 6 hours behind. Turn the clock to the other city’s time; past midnight, the day changes.', ca: 'Cada ciutat té la seva hora oficial, escrita com a UTC més o menys unes hores: Madrid és UTC+1 i Nova York UTC−5, així que Nova York va 6 hores per darrere. Gira el rellotge fins a l’hora de l’altra ciutat; si passes de mitjanit, canvia el dia.' })}</p>
              <p>{tr({ es: 'En los vuelos, suma primero la duración a la hora de salida y después pasa a la hora del destino. En los husos del mapa, cada franja mide 15° (360° entre 24 horas): hacia el este se suma una hora por huso y hacia el oeste se resta.', en: 'For flights, first add the flight time to the departure time, then change to the destination’s time. On the map, each strip is 15° wide (360° divided by 24 hours): going east you add an hour per zone and going west you take one away.', ca: 'En els vols, suma primer la durada a l’hora de sortida i després passa a l’hora del destí. Als fusos del mapa, cada franja fa 15° (360° entre 24 hores): cap a l’est se suma una hora per fus i cap a l’oest se’n resta.' })}</p>
              <p>{tr({ es: 'Las horas son las de invierno, sin horario de verano.', en: 'Times are winter (standard) times, without daylight saving.', ca: 'Les hores són les d’hivern, sense horari d’estiu.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Buen viajero!' : '¡Vuelta al mundo completa!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Seasoned traveller!' : 'Round the world!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Bon viatger!' : 'Volta al món completa!',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} horas del mundo en Tuthor 🕒 — ¿puedes superarme? https://tuthor.es/juegos/que-hora-es`,
      en: `I got ${aciertos} world times right on Tuthor 🕒 — can you beat me? https://tuthor.es/en/juegos/que-hora-es`,
      ca: `He encertat ${aciertos} hores del món a Tuthor 🕒 — em pots superar? https://tuthor.es/ca/juegos/que-hora-es`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="que-hora-es" emoji="🕒" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaHora key={ronda.id} ronda={ronda} revelado={isResult} onResponder={responder} />
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
