import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/climograma'
import PreguntaClima from '../components/climograma/PreguntaClima'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 4800 // da tiempo a ver lo marcado en el climograma

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'El mes más cálido, el más lluvioso y los climas más claros', en: 'The warmest month, the wettest month and the clearest climates', ca: 'El mes més càlid, el més plujós i els climes més clars' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Siete climas, amplitud térmica y meses secos', en: 'Seven climates, temperature range and dry months', ca: 'Set climes, amplitud tèrmica i mesos secs' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Climogramas del hemisferio sur y lectura fina', en: 'Southern-hemisphere graphs and close reading', ca: 'Climogrames de l’hemisferi sud i lectura fina' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[climograma] los niveles de la pantalla no coinciden con NIVELES')
}

export default function Climograma() {
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
    setRonda(prev => genRonda(niv, { evitar: prev?.clave }))
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
        type: 'juego', game: 'climograma', category: 'fisica',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('climograma', { score: pts }),
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
    title: tr({ es: 'Climograma — Juego para leer climogramas y reconocer climas', en: 'Climate Graph — Game for reading climate graphs and climates', ca: 'Climograma — Joc per llegir climogrames i reconèixer climes' }),
    desc: tr({
      es: 'Climogramas generados de los siete climas: ecuatorial, tropical, desértico, mediterráneo, oceánico, continental y polar. Mes más cálido, amplitud térmica, meses secos y hemisferio. Juego gratis.',
      en: 'Generated climate graphs for seven climates: equatorial, tropical, desert, Mediterranean, oceanic, continental and polar. Warmest month, temperature range, dry months and hemisphere.',
      ca: 'Climogrames generats dels set climes: equatorial, tropical, desèrtic, mediterrani, oceànic, continental i polar. Mes més càlid, amplitud tèrmica, mesos secs i hemisferi. Joc gratis.',
    }),
    path: '/juegos/climograma',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="climograma"
            badge={tr({ es: 'Geografía · El clima', en: 'Geography · Climate', ca: 'Geografia · El clima' })}
            titulo={tr({ es: '🌧️ Climograma', en: '🌧️ Climate Graph', ca: '🌧️ Climograma' })}
            sub={tr({ es: 'Barras de lluvia, línea de temperatura: ¿qué clima es?', en: 'Rain bars, temperature line: which climate is it?', ca: 'Barres de pluja, línia de temperatura: quin clima és?' })} />

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
              <p>{tr({ es: 'Sale un climograma: las barras azules son la lluvia de cada mes (en mm, eje derecho) y la línea roja, la temperatura media (en °C, eje izquierdo). Léelo y responde: el mes más cálido o más lluvioso, la amplitud térmica (mes más cálido menos mes más frío), cuántos meses secos hay o qué clima es.', en: 'A climate graph appears: the blue bars are each month’s rainfall (in mm, right axis) and the red line is the average temperature (in °C, left axis). Read it and answer: the warmest or wettest month, the temperature range (warmest month minus coldest), how many dry months there are, or which climate it is.', ca: 'Surt un climograma: les barres blaves són la pluja de cada mes (en mm, eix dret) i la línia vermella, la temperatura mitjana (en °C, eix esquerre). Llegeix-lo i respon: el mes més càlid o més plujós, l’amplitud tèrmica (mes més càlid menys mes més fred), quants mesos secs hi ha o quin clima és.' })}</p>
              <p>{tr({ es: 'La lluvia va a doble escala que la temperatura (20 mm a la altura de 10 °C): así, un mes es seco cuando su barra no llega a la línea. Ojo con el hemisferio sur: allí el verano cae en diciembre, enero y febrero.', en: 'Rainfall is on double the temperature scale (20 mm level with 10 °C): that way a month is dry when its bar does not reach the line. Watch out for the southern hemisphere: there, summer falls in December, January and February.', ca: 'La pluja va a doble escala que la temperatura (20 mm a l’altura de 10 °C): així, un mes és sec quan la seva barra no arriba a la línia. Compte amb l’hemisferi sud: allà l’estiu cau al desembre, gener i febrer.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Ya lees climogramas como un geógrafo!' : '¡Previsión: un 10 seguro! 🌧️',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'You read climate graphs like a geographer!' : 'Forecast: top marks guaranteed! 🌧️',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Ja llegeixes climogrames com un geògraf!' : 'Previsió: un 10 segur! 🌧️',
    })
    const shareText = tr({
      es: `He leído bien ${aciertos} climogramas en Tuthor 🌧️ — ¿puedes superarme? https://tuthor.es/juegos/climograma`,
      en: `I read ${aciertos} climate graphs right on Tuthor 🌧️ — can you beat me? https://tuthor.es/juegos/climograma`,
      ca: `He llegit bé ${aciertos} climogrames a Tuthor 🌧️ — em pots superar? https://tuthor.es/juegos/climograma`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="climograma" emoji="🌧️" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaClima key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
