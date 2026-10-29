import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/riosMontanas'
import PreguntaRios from '../components/riosMontanas/PreguntaRios'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 5
const REVEAL_MS = 3500 // lo justo para ver en el mapa dónde estaba

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Los seis grandes ríos y los sistemas montañosos principales', en: 'The six big rivers and the main mountain ranges', ca: 'Els sis grans rius i els sistemes muntanyosos principals' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Más ríos y sierras, y a qué mar va cada río (vertientes)', en: 'More rivers and ranges, and which sea each river flows into (basins)', ca: 'Més rius i serres, i a quin mar va cada riu (vessants)' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Todo, más dónde nace y dónde desemboca cada río', en: 'Everything, plus where each river rises and where it reaches the sea', ca: 'Tot, i on neix i on desemboca cada riu' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[rios-montanas] los niveles de la pantalla no coinciden con NIVELES')
}

export default function RiosMontanas() {
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
        type: 'juego', game: 'rios-montanas', category: 'relieve-espana',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('rios-montanas', { score: pts }),
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
    title: tr({ es: 'Ríos y Montañas — Juego del relieve y los ríos de España en el mapa', en: 'Rivers and Mountains — Game of Spain’s relief and rivers on the map', ca: 'Rius i Muntanyes — Joc del relleu i els rius d’Espanya al mapa' }),
    desc: tr({
      es: 'Sitúa en el mapa de España el Ebro, el Tajo, el Duero, el Guadalquivir, los Pirineos, el Sistema Central o Sierra Morena; reparte los ríos por vertientes y encuentra dónde nacen y desembocan. Juego gratis para Primaria y ESO.',
      en: 'Find the Ebro, Tagus, Douro, Guadalquivir, the Pyrenees, the Central System or Sierra Morena on the map of Spain; sort the rivers into drainage basins and find where they rise and reach the sea. Free game for primary and secondary.',
      ca: 'Situa al mapa d’Espanya l’Ebre, el Tajo, el Duero, el Guadalquivir, els Pirineus, el Sistema Central o Serra Morena; reparteix els rius per vessants i troba on neixen i desemboquen. Joc gratis per a Primària i ESO.',
    }),
    path: '/juegos/rios-montanas',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="rios-montanas"
            badge={tr({ es: 'Geografía · Relieve de España', en: 'Geography · Relief of Spain', ca: 'Geografia · Relleu d’Espanya' })}
            titulo={tr({ es: '🏞️ Ríos y Montañas', en: '🏞️ Rivers and Mountains', ca: '🏞️ Rius i Muntanyes' })}
            sub={tr({ es: 'Los ríos y los sistemas montañosos de España, en su sitio del mapa', en: 'Spain’s rivers and mountain ranges, in their place on the map', ca: 'Els rius i els sistemes muntanyosos d’Espanya, al seu lloc del mapa' })} />

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
              <p>{tr({ es: 'Sale el mapa de la península con los ríos en azul y las cordilleras en marrón. Nada se elige de una lista:', en: 'The map of the peninsula appears with the rivers in blue and the mountain ranges in brown. Nothing is picked from a list:', ca: 'Surt el mapa de la península amb els rius en blau i les serralades en marró. Res no es tria d’una llista:' })}</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>{tr({ es: '👆 Tocas en el mapa el río o el sistema montañoso que se pide.', en: '👆 You tap the river or mountain range asked for on the map.', ca: '👆 Toques al mapa el riu o el sistema muntanyós que es demana.' })}</li>
                <li>{tr({ es: '🔢 Pones cada nombre en su número del mapa (sobra uno).', en: '🔢 You put each name on its number on the map (one is left over).', ca: '🔢 Poses cada nom al seu número del mapa (en sobra un).' })}</li>
                <li>{tr({ es: '🌊 Repartes los ríos por vertientes: cantábrica, atlántica o mediterránea.', en: '🌊 You sort the rivers into basins: Cantabrian, Atlantic or Mediterranean.', ca: '🌊 Reparteixes els rius per vessants: cantàbric, atlàntic o mediterrani.' })}</li>
                <li>{tr({ es: '📍 En difícil, tocas dónde nace o dónde desemboca un río.', en: '📍 On hard, you tap where a river rises or reaches the sea.', ca: '📍 En difícil, toques on neix o on desemboca un riu.' })}</li>
              </ul>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Te orientas muy bien!' : '¡Conoces España como un geógrafo! 🏞️',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'You find your way very well!' : 'You know Spain like a geographer! 🏞️',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'T’orientes molt bé!' : 'Coneixes Espanya com un geògraf! 🏞️',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} en Ríos y Montañas de Tuthor 🏞️ — ¿te sabes el mapa de España? https://tuthor.es/juegos/rios-montanas`,
      en: `I got ${aciertos} right in Rivers and Mountains on Tuthor 🏞️ — do you know the map of Spain? https://tuthor.es/juegos/rios-montanas`,
      ca: `He encertat ${aciertos} a Rius i Muntanyes de Tuthor 🏞️ — et saps el mapa d’Espanya? https://tuthor.es/juegos/rios-montanas`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="rios-montanas" emoji="🏞️" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
      <div className="w-full max-w-[560px] flex items-center justify-between mb-3 px-1">
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

      <div className="w-full max-w-[560px]">
        <PreguntaRios key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
