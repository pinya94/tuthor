import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/sigueSerie'
import PreguntaSerie from '../components/sigueSerie/PreguntaSerie'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 4500 // da tiempo a ver los saltos o los puntos coloreados y la cuenta

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Qué número sigue, qué tipo de sucesión es y figuras de puntos que crecen', en: 'What comes next, what kind of sequence it is and growing dot patterns', ca: 'Quin nombre segueix, quin tipus de successió és i figures de punts que creixen' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'El término 50 o el 100 y el término general', en: 'Term 50 or 100 and the general term', ca: 'El terme 50 o el 100 i el terme general' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Término general aritmético y geométrico y la suma de los n primeros', en: 'Arithmetic and geometric general terms and the sum of the first n', ca: 'Terme general aritmètic i geomètric i la suma dels n primers' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[sigue-serie] los niveles de la pantalla no coinciden con NIVELES')
}

export default function SigueSerie() {
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
        type: 'juego', game: 'sigue-serie', category: 'sucesiones',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('sigue-serie', { score: pts }),
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
    title: tr({ es: 'Sigue la Serie — Juego de sucesiones y progresiones', en: 'Next in Line — Sequences game', ca: 'Segueix la Sèrie — Joc de successions i progressions' }),
    desc: tr({
      es: 'Progresiones aritméticas y geométricas: qué número sigue, figuras de puntos que crecen, el término 100, el término general y la suma de los primeros términos, con la trampa del n − 1. Juego de matemáticas gratis.',
      en: 'Arithmetic and geometric sequences: what comes next, growing dot patterns, term 100, the general term and the sum of the first terms, with the n − 1 trap. Free maths game.',
      ca: 'Progressions aritmètiques i geomètriques: quin nombre segueix, figures de punts que creixen, el terme 100, el terme general i la suma dels primers termes, amb el parany del n − 1. Joc de matemàtiques gratis.',
    }),
    path: '/juegos/sigue-serie',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="sigue-serie"
            badge={tr({ es: 'Matemáticas · Sucesiones', en: 'Maths · Sequences', ca: 'Matemàtiques · Successions' })}
            titulo={tr({ es: '🐚 Sigue la Serie', en: '🐚 Next in Line', ca: '🐚 Segueix la Sèrie' })}
            sub={tr({ es: 'Encuentra la regla y llega al término 100 sin contar uno a uno', en: 'Find the rule and reach term 100 without counting one by one', ca: 'Troba la regla i arriba al terme 100 sense comptar un a un' })} />

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
              <p>{tr({ es: 'En una sucesión aritmética se suma siempre lo mismo (la diferencia d): 5, 8, 11, 14… En una geométrica se multiplica siempre por lo mismo (la razón r): 2, 6, 18, 54… Y hay sucesiones que no son ni una cosa ni la otra, como los cuadrados o la de Fibonacci.', en: 'In an arithmetic sequence you always add the same amount (the common difference d): 5, 8, 11, 14… In a geometric one you always multiply by the same number (the common ratio r): 2, 6, 18, 54… And some sequences are neither, like the squares or Fibonacci.', ca: 'En una successió aritmètica sempre se suma el mateix (la diferència d): 5, 8, 11, 14… En una geomètrica sempre es multiplica pel mateix (la raó r): 2, 6, 18, 54… I hi ha successions que no són ni una cosa ni l’altra, com els quadrats o la de Fibonacci.' })}</p>
              <p>{tr({ es: 'Para llegar al término 100 sin contar: aₙ = a₁ + (n − 1)·d en las aritméticas y aₙ = a₁ · rⁿ⁻¹ en las geométricas. El «n − 1» es la clave: del primer término al centésimo hay 99 saltos, no 100.', en: 'To reach term 100 without counting: aₙ = a₁ + (n − 1)d for arithmetic and aₙ = a₁ × rⁿ⁻¹ for geometric. The “n − 1” is the key: from the first term to the hundredth there are 99 steps, not 100.', ca: 'Per arribar al terme 100 sense comptar: aₙ = a₁ + (n − 1)·d en les aritmètiques i aₙ = a₁ · rⁿ⁻¹ en les geomètriques. El «n − 1» és la clau: del primer terme al centèsim hi ha 99 salts, no 100.' })}</p>
              <p>{tr({ es: 'En las figuras de puntos, al corregir se ven en gris los puntos que no cambian y en color los que se añaden en cada figura: eso es justo el término general, d·n + c.', en: 'In the dot patterns, when you answer the dots that never change turn grey and the ones added each time turn pink: that is exactly the general term, dn + c.', ca: 'A les figures de punts, en corregir es veuen en gris els punts que no canvien i en color els que s’afegeixen a cada figura: això és just el terme general, d·n + c.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Le has pillado el patrón!' : '¡Ni Gauss lo haría mejor! 🐚',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'You have cracked the pattern!' : 'Not even Gauss would do better! 🐚',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Has trobat el patró!' : 'Ni Gauss ho faria millor! 🐚',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} de sucesiones en Sigue la Serie de Tuthor 🐚 — ¿puedes superarme? https://tuthor.es/juegos/sigue-serie`,
      en: `I got ${aciertos} sequence questions right in Next in Line on Tuthor 🐚 — can you beat me? https://tuthor.es/juegos/sigue-serie`,
      ca: `He encertat ${aciertos} de successions a Segueix la Sèrie de Tuthor 🐚 — em pots superar? https://tuthor.es/juegos/sigue-serie`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="sigue-serie" emoji="🐚" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaSerie key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
