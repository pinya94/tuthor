import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/piramide'
import PreguntaPiramide from '../components/piramide/PreguntaPiramide'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 4200 // da tiempo a leer la explicación con la pirámide delante

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Qué tipo de pirámide es y qué grupo tiene más gente', en: 'What type of pyramid it is and which group has the most people', ca: 'Quin tipus de piràmide és i quin grup té més gent' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'También: ¿más hombres o más mujeres?', en: 'Also: more men or more women?', ca: 'També: més homes o més dones?' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Huecos, baby booms e inmigración, y en qué años nacieron', en: 'Gaps, baby booms and immigration, and when they were born', ca: 'Buits, baby booms i immigració, i en quins anys van néixer' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[piramide-poblacion] los niveles de la pantalla no coinciden con NIVELES')
}

export default function PiramidePoblacion() {
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
        type: 'juego', game: 'piramide-poblacion', category: 'humana',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('piramide-poblacion', { score: pts }),
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
    title: tr({ es: 'Pirámide de población — Juego para leer pirámides', en: 'Population Pyramid — Game for reading pyramids', ca: 'Piràmide de població — Joc per llegir piràmides' }),
    desc: tr({
      es: 'Pirámides de población generadas: di si es progresiva, estacionaria o regresiva, qué grupo de edad tiene más gente, qué explica un hueco o un baby boom y en qué años nacieron. Juego de geografía gratis.',
      en: 'Generated population pyramids: say whether it is expanding, stationary or contracting, which age group is largest, what explains a gap or a baby boom and when they were born. Free geography game.',
      ca: 'Piràmides de població generades: digues si és progressiva, estacionària o regressiva, quin grup d’edat té més gent, què explica un buit o un baby boom i en quins anys van néixer. Joc de geografia gratis.',
    }),
    path: '/juegos/piramide-poblacion',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="piramide-poblacion"
            badge={tr({ es: 'Geografía · Población', en: 'Geography · Population', ca: 'Geografia · Població' })}
            titulo={tr({ es: '👥 Pirámide de población', en: '👥 Population Pyramid', ca: '👥 Piràmide de població' })}
            sub={tr({ es: 'Lee la pirámide: joven o envejecida, huecos, booms y migraciones', en: 'Read the pyramid: young or ageing, gaps, booms and migration', ca: 'Llegeix la piràmide: jove o envellida, buits, booms i migracions' })} />

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
              <p>{tr({ es: 'Una pirámide de población cuenta la gente de un país por edades: cada barra es un grupo de cinco años, los hombres a la izquierda y las mujeres a la derecha, los bebés abajo y los mayores arriba. Su forma dice mucho: base ancha, población joven; base estrecha, población envejecida.', en: 'A population pyramid counts a country’s people by age: each bar is a five-year group, men on the left and women on the right, babies at the bottom and the elderly at the top. Its shape says a lot: a wide base means a young population; a narrow base, an ageing one.', ca: 'Una piràmide de població compta la gent d’un país per edats: cada barra és un grup de cinc anys, els homes a l’esquerra i les dones a la dreta, els nadons a baix i la gent gran a dalt. La seva forma diu molt: base ampla, població jove; base estreta, població envellida.' })}</p>
              <p>{tr({ es: 'En difícil se señala una parte: un entrante (nacieron menos niños, por una guerra o una crisis), un abultamiento (un baby boom), hombres de más en edad de trabajar (inmigración) o la cima, con más mujeres porque viven más. Y hay que calcular en qué años nació un grupo: año de la pirámide menos su edad.', en: 'On hard a part is marked: a dent (fewer babies were born, due to a war or a crisis), a bulge (a baby boom), extra men of working age (immigration) or the top, with more women because they live longer. And you work out when a group was born: the pyramid’s year minus their age.', ca: 'En difícil s’assenyala una part: un entrant (van néixer menys nens, per una guerra o una crisi), un abombament (un baby boom), homes de més en edat de treballar (immigració) o el cim, amb més dones perquè viuen més. I cal calcular en quins anys va néixer un grup: any de la piràmide menys la seva edat.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Lees pirámides como un geógrafo!' : '¡Demógrafo de primera! 👥',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'You read pyramids like a geographer!' : 'First-class demographer! 👥',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Llegeixes piràmides com un geògraf!' : 'Demògraf de primera! 👥',
    })
    const shareText = tr({
      es: `He leído bien ${aciertos} pirámides de población en Tuthor 👥 — ¿puedes superarme? https://tuthor.es/juegos/piramide-poblacion`,
      en: `I read ${aciertos} population pyramids right on Tuthor 👥 — can you beat me? https://tuthor.es/juegos/piramide-poblacion`,
      ca: `He llegit bé ${aciertos} piràmides de població a Tuthor 👥 — em pots superar? https://tuthor.es/juegos/piramide-poblacion`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="piramide-poblacion" emoji="👥" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaPiramide key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
