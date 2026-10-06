import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/cadenaEnergia'
import PreguntaEnergia from '../components/cadenaEnergia/PreguntaEnergia'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 4500 // da tiempo a leer la transformación y el dato

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Qué energía tiene cada cosa y qué transforma cada aparato', en: 'What energy each thing has and what each device transforms', ca: 'Quina energia té cada cosa i què transforma cada aparell' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Cadenas de varias transformaciones con un eslabón en blanco', en: 'Chains of several transformations with a missing link', ca: 'Cadenes de diverses transformacions amb una baula en blanc' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Rendimiento, energía perdida y Ep = m·g·h', en: 'Efficiency, energy lost and Ep = m·g·h', ca: 'Rendiment, energia perduda i Ep = m·g·h' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[cadena-energia] los niveles de la pantalla no coinciden con NIVELES')
}

export default function CadenaEnergia() {
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
        type: 'juego', game: 'cadena-energia', category: 'energia',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('cadena-energia', { score: pts }),
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
    title: tr({ es: 'Cadena de energía — Juego de formas y transformaciones de la energía', en: 'Energy Chain — Forms and transformations of energy game', ca: 'Cadena d’energia — Joc de formes i transformacions de l’energia' }),
    desc: tr({
      es: 'Cinética, potencial, química, eléctrica, térmica, luminosa: di qué energía tiene cada cosa, qué transforma cada aparato, completa cadenas como la de una central y calcula rendimientos y Ep = m·g·h. Juego de física gratis.',
      en: 'Kinetic, potential, chemical, electrical, thermal, light: say what energy each thing has, what each device transforms, complete chains like a power station’s and work out efficiency and Ep = m·g·h. Free physics game.',
      ca: 'Cinètica, potencial, química, elèctrica, tèrmica, lluminosa: digues quina energia té cada cosa, què transforma cada aparell, completa cadenes com la d’una central i calcula rendiments i Ep = m·g·h. Joc de física gratis.',
    }),
    path: '/juegos/cadena-energia',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="cadena-energia"
            badge={tr({ es: 'Física · La energía', en: 'Physics · Energy', ca: 'Física · L’energia' })}
            titulo={tr({ es: '🔆 Cadena de energía', en: '🔆 Energy Chain', ca: '🔆 Cadena d’energia' })}
            sub={tr({ es: 'La energía no se crea ni se destruye: sigue su pista de una forma a otra', en: 'Energy is neither created nor destroyed: follow it from one form to another', ca: 'L’energia no es crea ni es destrueix: segueix-ne la pista d’una forma a una altra' })} />

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
              <p>{tr({ es: 'La energía tiene muchas formas: cinética (lo que se mueve), potencial (lo que está en alto), elástica, química (pilas, comida, combustibles), eléctrica, térmica, luminosa, sonora y nuclear. Los aparatos la transforman de una forma en otra: una bombilla convierte la eléctrica en luminosa, una dinamo la cinética en eléctrica.', en: 'Energy comes in many forms: kinetic (moving things), potential (things up high), elastic, chemical (batteries, food, fuels), electrical, thermal, light, sound and nuclear. Devices turn it from one form into another: a bulb turns electrical into light, a dynamo kinetic into electrical.', ca: 'L’energia té moltes formes: cinètica (el que es mou), potencial (el que és a dalt), elàstica, química (piles, menjar, combustibles), elèctrica, tèrmica, lluminosa, sonora i nuclear. Els aparells la transformen d’una forma en una altra: una bombeta converteix l’elèctrica en lluminosa, una dinamo la cinètica en elèctrica.' })}</p>
              <p>{tr({ es: 'Nunca se aprovecha toda: siempre se escapa una parte, casi siempre en calor. El rendimiento es la parte útil: útil ÷ total × 100. Y en difícil, la energía potencial de algo en alto es Ep = m·g·h; si cae sin rozamiento, se convierte toda en cinética.', en: 'It is never all used: some always escapes, almost always as heat. Efficiency is the useful part: useful ÷ total × 100. And on hard, the potential energy of something up high is Ep = m·g·h; if it falls without friction, it all becomes kinetic.', ca: 'Mai no s’aprofita tota: sempre se n’escapa una part, gairebé sempre en calor. El rendiment és la part útil: útil ÷ total × 100. I en difícil, l’energia potencial d’una cosa a dalt és Ep = m·g·h; si cau sense fregament, es converteix tota en cinètica.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Tienes mucha energía!' : '¡Rendimiento del 100 %! 🔆',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Full of energy!' : '100% efficiency! 🔆',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Tens molta energia!' : 'Rendiment del 100 %! 🔆',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} preguntas de energía en Tuthor 🔆 — ¿puedes superarme? https://tuthor.es/juegos/cadena-energia`,
      en: `I got ${aciertos} energy questions right on Tuthor 🔆 — can you beat me? https://tuthor.es/juegos/cadena-energia`,
      ca: `He encertat ${aciertos} preguntes d’energia a Tuthor 🔆 — em pots superar? https://tuthor.es/juegos/cadena-energia`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="cadena-energia" emoji="🔆" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaEnergia key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
