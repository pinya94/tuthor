import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/continentesOceanos'
import PreguntaContinentes from '../components/continentesOceanos/PreguntaContinentes'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'
import { useArranqueDirecto } from '../lib/arranqueDirecto'

// Cada ronda es tocar y comprobar: 90 s, +5 s por acierto y −5 s por fallo.
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 5
const REVEAL_MS = 3500 // da tiempo a ver el continente pintado y leer el dato

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Los seis continentes y los cinco océanos', en: 'The six continents and the five oceans', ca: 'Els sis continents i els cinc oceans' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Y además: ¿en qué continente está cada país?', en: 'Plus: which continent is each country in?', ca: 'I a més: a quin continent és cada país?' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Mares y golfos, y qué océano cruza cada barco', en: 'Seas and gulfs, and which ocean each ship crosses', ca: 'Mars i golfs, i quin oceà travessa cada vaixell' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[continentes-oceanos] los niveles de la pantalla no coinciden con NIVELES')
}

export default function ContinentesOceanos() {
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
    setRonda({ ...genRonda(niv), uid: Math.random() })
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
        type: 'juego', game: 'continentes-oceanos', category: 'continentes-oceanos',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('continentes-oceanos', { score: pts }),
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
    title: tr({ es: 'Continentes y Océanos — Juego de mapa del mundo para Primaria y ESO', en: 'Continents and Oceans — World map game', ca: 'Continents i Oceans — Joc del mapa del món per a Primària i ESO' }),
    desc: tr({
      es: 'Juego de continentes y océanos: toca en el mapa del mundo cada continente, océano, mar o golfo, di en qué continente está cada país y qué océano cruza cada barco. Tres niveles, para Primaria y ESO. Gratis.',
      en: 'Continents and oceans game: tap each continent, ocean, sea or gulf on the world map, find the continent of each country and the ocean each ship crosses. Three levels. Free.',
      ca: 'Joc de continents i oceans: toca al mapa del món cada continent, oceà, mar o golf, digues a quin continent és cada país i quin oceà travessa cada vaixell. Tres nivells, per a Primària i ESO. Gratis.',
    }),
    path: '/juegos/continentes-oceanos',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  // Desde la cuadrícula de juegos se entra jugando (ver lib/arranqueDirecto)
  useArranqueDirecto(startGame)

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="continentes-oceanos"
            badge={tr({ es: 'Geografía · El mapa del mundo', en: 'Geography · The world map', ca: 'Geografia · El mapa del món' })}
            titulo={tr({ es: '🌍 Continentes y Océanos', en: '🌍 Continents and Oceans', ca: '🌍 Continents i Oceans' })}
            sub={tr({ es: 'Encuéntralo en el mapa antes de que se acabe el tiempo', en: 'Find it on the map before time runs out', ca: 'Troba-ho al mapa abans que s’acabi el temps' })} />

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
              <p>{tr({ es: 'Te pedimos un continente, un océano o un mar. Para un continente, toca cualquier país que esté en él; para un océano o un mar, toca su punto en el agua. Después pulsa Comprobar: se pinta la respuesta y sale un dato para recordarla.', en: 'You are asked for a continent, an ocean or a sea. For a continent, tap any country in it; for an ocean or a sea, tap its dot in the water. Then press Check: the answer is coloured in, with a fact to help you remember it.', ca: 'Et demanem un continent, un oceà o un mar. Per a un continent, toca qualsevol país que hi sigui; per a un oceà o un mar, toca el seu punt a l’aigua. Després prem Comprovar: es pinta la resposta i surt una dada per recordar-la.' })}</p>
              <p>{tr({ es: 'Contamos seis continentes (Europa, Asia, África, América, Oceanía y la Antártida) y cinco océanos. Los países que están entre dos continentes, como Turquía, valen para los dos; Rusia es Europa hasta los Urales y Asia a partir de ahí.', en: 'We count six continents (Europe, Asia, Africa, the Americas, Oceania and Antarctica) and five oceans. Countries that lie in two continents, like Turkey, count for both; Russia is Europe up to the Urals and Asia beyond them.', ca: 'Comptem sis continents (Europa, Àsia, l’Àfrica, Amèrica, Oceania i l’Antàrtida) i cinc oceans. Els països que són entre dos continents, com Turquia, valen per als dos; Rússia és Europa fins als Urals i Àsia a partir d’allà.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Buen explorador!' : '¡Te sabes el mapa del mundo!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Great explorer!' : 'You know the world map!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Bon explorador!' : 'Et saps el mapa del món!',
    })
    const shareText = tr({
      es: `He encontrado ${aciertos} continentes, océanos y mares en Tuthor 🌍 — ¿puedes superarme? https://tuthor.es/juegos/continentes-oceanos`,
      en: `I found ${aciertos} continents, oceans and seas on Tuthor 🌍 — can you beat me? https://tuthor.es/en/juegos/continentes-oceanos`,
      ca: `He trobat ${aciertos} continents, oceans i mars a Tuthor 🌍 — em pots superar? https://tuthor.es/ca/juegos/continentes-oceanos`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="continentes-oceanos" emoji="🌍" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaContinentes key={ronda.uid} ronda={ronda} revelado={isResult} onResponder={responder} />
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
