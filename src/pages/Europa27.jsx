import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/europa27'
import PreguntaEuropa from '../components/europa27/PreguntaEuropa'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Cada ronda se toca o se pinta en el mapa: 90 s y +6 s por acierto.
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 6
const REVEAL_MS = 4800 // da tiempo a ver el mapa coloreado y la explicación

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Busca los países de la UE en el mapa y pinta los que son miembros', en: 'Find the EU countries on the map and colour the members', ca: 'Busca els països de la UE al mapa i pinta els que en són membres' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Toda Europa, capitales, el euro, las ampliaciones y qué hace cada institución', en: 'All of Europe, capitals, the euro, enlargements and what each institution does', ca: 'Tota Europa, capitals, l’euro, les ampliacions i què fa cada institució' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Euro y Schengen con trampa, y cada institución en su ciudad', en: 'Tricky euro and Schengen, and each institution in its city', ca: 'Euro i Schengen amb trampa, i cada institució a la seva ciutat' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[europa-27] los niveles de la pantalla no coinciden con NIVELES')
}

export default function Europa27() {
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
        type: 'juego', game: 'europa-27', category: 'union-europea',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('europa-27', { score: pts }),
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
    title: tr({ es: 'Europa a 27 — Juego de la Unión Europea: mapa, euro, Schengen e instituciones', en: 'Europe of 27 — European Union game: map, euro, Schengen and institutions', ca: 'Europa a 27 — Joc de la Unió Europea: mapa, euro, Schengen i institucions' }),
    desc: tr({
      es: 'El mapa de la Unión Europea para tocar: busca países por su nombre o su capital, pinta los de la UE, el euro o Schengen, y coloca cada institución en su ciudad. Juego de geografía gratis.',
      en: 'A map of the European Union to tap: find countries by name or capital, colour the EU, euro or Schengen members, and put each institution in its city. Free geography game.',
      ca: 'El mapa de la Unió Europea per tocar: busca països pel nom o la capital, pinta els de la UE, l’euro o Schengen, i col·loca cada institució a la seva ciutat. Joc de geografia gratis.',
    }),
    path: '/juegos/europa-27',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="europa-27"
            badge={tr({ es: 'Geografía · La Unión Europea', en: 'Geography · The European Union', ca: 'Geografia · La Unió Europea' })}
            titulo={tr({ es: '⭐ Europa a 27', en: '⭐ Europe of 27', ca: '⭐ Europa a 27' })}
            sub={tr({ es: 'Toca, pinta y coloca en el mapa', en: 'Tap, colour and place on the map', ca: 'Toca, pinta i col·loca al mapa' })} />

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
              <p>{tr({ es: 'Todo se hace en el mapa. Te piden un país («Toca Polonia») o te dan su capital, y lo tocas. En otras rondas hay seis países con borde ámbar y pintas los que son de la UE, los que usan el euro o los que están en Schengen. Ojo con las trampas: Noruega y Suiza no son de la UE, Irlanda no está en Schengen y Polonia no tiene euro.', en: 'Everything happens on the map. You are asked for a country (“Tap Poland”) or given its capital, and you tap it. In other rounds six countries have an amber border and you colour those in the EU, using the euro or in Schengen.', ca: 'Tot es fa al mapa. Et demanen un país («Toca Polònia») o et donen la capital, i el toques. En altres rondes hi ha sis països amb vora àmbar i pintes els que són de la UE, els que fan servir l’euro o els que són a Schengen.' })}</p>
              <p>{tr({ es: 'En los niveles altos: cada país al año en que entró, cada institución con lo que hace (no confundas el Consejo de la UE con el Consejo Europeo) y, en un mapa ampliado, cada institución en su ciudad: Bruselas, Estrasburgo, Luxemburgo o Fráncfort.', en: 'On higher levels: each country to the year it joined, each institution with what it does, and, on a zoomed map, each institution in its city.', ca: 'En els nivells alts: cada país a l’any en què va entrar, cada institució amb el que fa i, en un mapa ampliat, cada institució a la seva ciutat.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Muy europeo!' : '¡Eurodiputado de honor! ⭐',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Very European!' : 'Honorary MEP! ⭐',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Molt europeu!' : 'Eurodiputat d’honor! ⭐',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} preguntas de la Unión Europea en Europa a 27 de Tuthor ⭐ — ¿puedes superarme? https://tuthor.es/juegos/europa-27`,
      en: `I got ${aciertos} European Union questions right in Europe of 27 on Tuthor ⭐ — can you beat me? https://tuthor.es/juegos/europa-27`,
      ca: `He encertat ${aciertos} preguntes de la Unió Europea a Europa a 27 de Tuthor ⭐ — em pots superar? https://tuthor.es/juegos/europa-27`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="europa-27" emoji="⭐" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaEuropa key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
