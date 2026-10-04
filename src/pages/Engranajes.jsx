import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/engranajes'
import PreguntaEngranajes from '../components/engranajes/PreguntaEngranajes'
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
             desc: { es: 'Dos o tres ruedas: ¿hacia dónde gira?, ¿más rápida o más lenta?', en: 'Two or three gears: which way?, faster or slower?', ca: 'Dues o tres rodes: cap a on gira?, més ràpida o més lenta?' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Hasta cinco ruedas, y a cuántas rpm gira la última', en: 'Up to five gears, and how many rpm the last one turns', ca: 'Fins a cinc rodes, i a quantes rpm gira l’última' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Con una rueda doble: dos piñones en el mismo eje', en: 'With a compound gear: two gears on one shaft', ca: 'Amb una roda doble: dos pinyons al mateix eix' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[engranajes] los niveles de la pantalla no coinciden con NIVELES')
}

export default function Engranajes() {
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
        type: 'juego', game: 'engranajes', category: 'maquinas',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('engranajes', { score: pts }),
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
    title: tr({ es: 'Engranajes — Juego de ruedas dentadas y transmisión', en: 'Gears — Gear train and transmission game', ca: 'Engranatges — Joc de rodes dentades i transmissió' }),
    desc: tr({
      es: 'Trenes de engranajes generados al azar: di hacia dónde gira la última rueda, si va más rápida o más lenta y a cuántas rpm. Con ruedas locas y ruedas dobles. Juego de física y tecnología gratis.',
      en: 'Randomly generated gear trains: say which way the last gear turns, whether it is faster or slower and at how many rpm. With idler and compound gears. Free physics and technology game.',
      ca: 'Trens d’engranatges generats a l’atzar: digues cap a on gira l’última roda, si va més ràpida o més lenta i a quantes rpm. Amb rodes boges i rodes dobles. Joc de física i tecnologia gratis.',
    }),
    path: '/juegos/engranajes',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="engranajes"
            badge={tr({ es: 'Física · Máquinas y mecanismos', en: 'Physics · Machines and mechanisms', ca: 'Física · Màquines i mecanismes' })}
            titulo={tr({ es: '⚙️ Engranajes', en: '⚙️ Gears', ca: '⚙️ Engranatges' })}
            sub={tr({ es: '¿Hacia dónde gira la última rueda? ¿Y a qué velocidad?', en: 'Which way does the last gear turn? And how fast?', ca: 'Cap a on gira l’última roda? I a quina velocitat?' })} />

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
              <p>{tr({ es: 'Sale una cadena de ruedas dentadas. La primera es la motriz: la ves girar, con su sentido y sus vueltas por minuto (rpm). El número de cada rueda son sus dientes. Tienes que decir qué hace la rueda marcada con «?».', en: 'A chain of gears appears. The first is the driver: you see it turning, with its direction and revolutions per minute (rpm). The number on each gear is its teeth. You say what the gear marked «?» does.', ca: 'Surt una cadena de rodes dentades. La primera és la motriu: la veus girar, amb el seu sentit i les seves voltes per minut (rpm). El número de cada roda són les seves dents. Has de dir què fa la roda marcada amb «?».' })}</p>
              <p>{tr({ es: 'Dos reglas bastan. Cada vez que dos ruedas engranan, el giro se invierte. Y se conserva velocidad × dientes: una rueda de 12 dientes a 60 rpm mueve una de 36 a 20 rpm. Por eso las ruedas de en medio solo cambian el sentido, no la velocidad final.', en: 'Two rules are enough. Every time two gears mesh, the rotation reverses. And speed × teeth is conserved: a 12-tooth gear at 60 rpm drives a 36-tooth gear at 20 rpm. That is why the gears in between only change direction, not the final speed.', ca: 'N’hi ha prou amb dues regles. Cada vegada que dues rodes engranen, el gir s’inverteix. I es conserva velocitat × dents: una roda de 12 dents a 60 rpm mou una de 36 a 20 rpm. Per això les rodes del mig només canvien el sentit, no la velocitat final.' })}</p>
              <p>{tr({ es: 'En difícil aparece una rueda doble: dos piñones pegados en el mismo eje, que giran juntos. Ahí sí se multiplica la reducción, como en la caja de cambios de una bici o de un coche. Al responder, todas las ruedas se ponen a girar de verdad.', en: 'On hard there is a compound gear: two gears fixed on the same shaft, turning together. That is where the reduction multiplies, as in a bike or car gearbox. When you answer, all the gears start turning for real.', ca: 'En difícil apareix una roda doble: dos pinyons enganxats al mateix eix, que giren junts. Aquí sí que es multiplica la reducció, com a la caixa de canvis d’una bici o d’un cotxe. En respondre, totes les rodes es posen a girar de debò.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Bien engranado!' : '¡Eres un mecánico de primera! ⚙️',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Well geared!' : 'Top-class mechanic! ⚙️',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Ben engranat!' : 'Ets un mecànic de primera! ⚙️',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} trenes de engranajes en Tuthor ⚙️ — ¿puedes superarme? https://tuthor.es/juegos/engranajes`,
      en: `I solved ${aciertos} gear trains on Tuthor ⚙️ — can you beat me? https://tuthor.es/juegos/engranajes`,
      ca: `He encertat ${aciertos} trens d’engranatges a Tuthor ⚙️ — em pots superar? https://tuthor.es/juegos/engranajes`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="engranajes" emoji="⚙️" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaEngranajes ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
