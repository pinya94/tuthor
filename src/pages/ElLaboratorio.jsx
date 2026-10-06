import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/laboratorio'
import PreguntaLab from '../components/laboratorio/PreguntaLab'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 4200 // da tiempo a leer cómo funciona el método

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Mezclas de dos: filtrar, tamizar, imán, decantar o evaporar', en: 'Two-part mixtures: filter, sieve, magnet, decant or evaporate', ca: 'Mescles de dos: filtrar, tamisar, imant, decantar o evaporar' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Más métodos, en qué propiedad se basan y si la mezcla es homogénea', en: 'More methods, which property they rely on and whether the mixture is homogeneous', ca: 'Més mètodes, en quina propietat es basen i si la mescla és homogènia' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Mezclas más difíciles: qué pasos y en qué orden', en: 'Harder mixtures: which steps and in what order', ca: 'Mescles més difícils: quins passos i en quin ordre' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[el-laboratorio] los niveles de la pantalla no coinciden con NIVELES')
}

export default function ElLaboratorio() {
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
    setRonda(prev => genRonda(niv, { evitar: prev?.mezcla }))
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
        type: 'juego', game: 'el-laboratorio', category: 'mezclas-separacion',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('el-laboratorio', { score: pts }),
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
    title: tr({ es: 'El Laboratorio — Juego de separación de mezclas', en: 'The Lab — Separating mixtures game', ca: 'El Laboratori — Joc de separació de mescles' }),
    desc: tr({
      es: 'Agua con arena, hierro con azufre, agua y aceite, tinta de rotulador: elige cómo separar cada mezcla (filtrar, tamizar, imán, decantar, evaporar, destilar, cromatografía) y en qué orden. Juego de química gratis.',
      en: 'Sand in water, iron and sulphur, oil and water, felt-tip ink: choose how to separate each mixture (filter, sieve, magnet, decant, evaporate, distil, chromatography) and in what order. Free chemistry game.',
      ca: 'Aigua amb sorra, ferro amb sofre, aigua i oli, tinta de retolador: tria com separar cada mescla (filtrar, tamisar, imant, decantar, evaporar, destil·lar, cromatografia) i en quin ordre. Joc de química gratis.',
    }),
    path: '/juegos/el-laboratorio',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="el-laboratorio"
            badge={tr({ es: 'Química · Mezclas y separación', en: 'Chemistry · Mixtures and separation', ca: 'Química · Mescles i separació' })}
            titulo={tr({ es: '🥼 El Laboratorio', en: '🥼 The Lab', ca: '🥼 El Laboratori' })}
            sub={tr({ es: 'Elige cómo separar cada mezcla… y en qué orden', en: 'Choose how to separate each mixture… and in what order', ca: 'Tria com separar cada mescla… i en quin ordre' })} />

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
              <p>{tr({ es: 'Sale una mezcla dibujada en un vaso: granos en el fondo, líquidos en capas o una disolución de un solo color. Tienes que elegir cómo separarla. Cada método aprovecha una propiedad: el imán, que el hierro es magnético; el filtro, que la arena no se disuelve; la decantación, que el aceite flota sobre el agua; la destilación, que el alcohol hierve antes que el agua.', en: 'A mixture appears drawn in a beaker: grains at the bottom, liquids in layers or a one-colour solution. You choose how to separate it. Each method uses a property: the magnet, that iron is magnetic; the filter, that sand does not dissolve; decanting, that oil floats on water; distilling, that alcohol boils before water.', ca: 'Surt una mescla dibuixada en un got: grans al fons, líquids en capes o una dissolució d’un sol color. Has de triar com separar-la. Cada mètode aprofita una propietat: l’imant, que el ferro és magnètic; el filtre, que la sorra no es dissol; la decantació, que l’oli sura sobre l’aigua; la destil·lació, que l’alcohol bull abans que l’aigua.' })}</p>
              <p>{tr({ es: 'En difícil hay que elegir qué pasos seguir y en qué orden. Ojo: dos sólidos secos no se filtran (primero hay que disolver uno), y si evaporas antes de filtrar vuelves a tenerlo todo mezclado.', en: 'On hard you pick which steps to follow and in what order. Careful: two dry solids cannot be filtered (dissolve one first), and if you evaporate before filtering you are back to a mixture.', ca: 'En difícil s’ha de triar quins passos seguir i en quin ordre. Compte: dos sòlids secs no es filtren (primer cal dissoldre’n un), i si evapores abans de filtrar tornes a tenir-ho tot barrejat.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Buena mano en el laboratorio!' : '¡Química de bata blanca! 🥼',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Handy in the lab!' : 'A true lab-coat chemist! 🥼',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Bona mà al laboratori!' : 'Química de bata blanca! 🥼',
    })
    const shareText = tr({
      es: `He separado ${aciertos} mezclas en El Laboratorio de Tuthor 🥼 — ¿puedes superarme? https://tuthor.es/juegos/el-laboratorio`,
      en: `I separated ${aciertos} mixtures in Tuthor’s Lab 🥼 — can you beat me? https://tuthor.es/juegos/el-laboratorio`,
      ca: `He separat ${aciertos} mescles a El Laboratori de Tuthor 🥼 — em pots superar? https://tuthor.es/juegos/el-laboratorio`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="el-laboratorio" emoji="🥼" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaLab key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
