import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/cazaRaiz'
import PreguntaRaiz from '../components/cazaRaiz/PreguntaRaiz'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Estas ecuaciones se resuelven en papel: medio minuto una incompleta, uno
// entero una completa sin ordenar. El reloj da para pensar, no para correr
// (y se para mientras se lee la corrección).
const TIEMPOS = {
  facil: { total: 180, acierto: 15 },
  medio: { total: 240, acierto: 30 },
  dificil: { total: 300, acierto: 40 },
}
const WRONG_TIME = 5
const REVEAL_MS = 6000 // da tiempo a leer la resolución y ver la parábola

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Incompletas: ax² + c = 0 y ax² + bx = 0', en: 'Incomplete equations: ax² + c = 0 and ax² + bx = 0', ca: 'Incompletes: ax² + c = 0 i ax² + bx = 0' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Completas con la fórmula: dos soluciones, una doble o ninguna', en: 'Complete equations with the formula: two solutions, one repeated or none', ca: 'Completes amb la fórmula: dues solucions, una doble o cap' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Con a ≠ 1 y sin ordenar: primero pasa todo a un lado', en: 'With a ≠ 1 and not rearranged: move everything to one side first', ca: 'Amb a ≠ 1 i sense ordenar: primer passa-ho tot a un costat' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[caza-la-raiz] los niveles de la pantalla no coinciden con NIVELES')
}

export default function CazaRaiz() {
  const { lang, localPath, tr } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const backPath = location.state?.backPath

  const [screen, setScreen] = useState('intro')
  const [nivel, setNivel] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(TIEMPOS.facil.total)
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
    setTimeLeft(TIEMPOS[niv].total)
    next(niv)
  }, [next])

  function finish() {
    clearTimeout(nextRef.current)
    setScreen('end')
    const pts = aciertosRef.current * 10
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'caza-la-raiz', category: 'segundo-grado',
        score: pts, timeSpent: TIEMPOS[nivel].total,
        coinsEarned: computeCoins('caza-la-raiz', { score: pts }),
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
      setTimeLeft(t => t + TIEMPOS[nivel].acierto)
    } else {
      setStreak(0)
      setTimeLeft(t => Math.max(0, t - WRONG_TIME))
    }
    nextRef.current = setTimeout(() => next(nivel), REVEAL_MS)
  }

  const seo = {
    title: tr({ es: 'Caza la Raíz — Juego de ecuaciones de segundo grado', en: 'Root Hunt — Quadratic equations game', ca: 'Caça l’Arrel — Joc d’equacions de segon grau' }),
    desc: tr({
      es: 'Juego de ecuaciones de segundo grado: resuelve incompletas y completas con la fórmula, marca las soluciones en el eje X y mira cómo la parábola lo corta justo ahí. Con solución doble y sin solución real. 3.º y 4.º de ESO. Gratis.',
      en: 'Quadratic equations game: solve incomplete and complete equations with the formula, mark the solutions on the x-axis and watch the parabola cross it right there. Includes repeated roots and no real solutions. Free.',
      ca: 'Joc d’equacions de segon grau: resol incompletes i completes amb la fórmula, marca les solucions a l’eix X i mira com la paràbola el talla just allà. Amb solució doble i sense solució real. 3r i 4t d’ESO. Gratis.',
    }),
    path: '/juegos/caza-la-raiz',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="caza-la-raiz"
            badge={tr({ es: 'Matemáticas · Ecuaciones de segundo grado', en: 'Maths · Quadratic equations', ca: 'Matemàtiques · Equacions de segon grau' })}
            titulo={tr({ es: '🌱 Caza la Raíz', en: '🌱 Root Hunt', ca: '🌱 Caça l’Arrel' })}
            sub={tr({ es: 'Resuelve la ecuación y marca dónde la parábola corta el eje', en: 'Solve the equation and mark where the parabola crosses the axis', ca: 'Resol l’equació i marca on la paràbola talla l’eix' })} />

          <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{tr({ es: 'Elige nivel', en: 'Choose a level', ca: 'Tria nivell' })}</p>
          <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl mb-2">
            {Object.entries(DIFS).map(([id, d], i) => (
              <button key={id} onClick={() => setNivel(id)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${nivel === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}>
                <NivelBarras clave={id} i={i} />{tr(d.label)}
              </button>
            ))}
          </div>
          <p className="text-white/40 text-xs text-center mb-3">{tr(DIFS[nivel].desc)}</p>
          <p className="text-amber-200/90 text-sm text-center font-semibold rounded-xl border border-amber-300/20 bg-amber-300/5 px-3 py-2 mb-5">✏️ {tr({ es: 'Ten a mano papel y lápiz: estas ecuaciones se resuelven mejor escritas. El reloj da tiempo de sobra.', en: 'Keep a pen and paper handy: these equations are easier to solve written down. The timer gives you plenty of time.', ca: 'Tingues a mà paper i llapis: aquestes equacions es resolen millor escrites. El rellotge dona temps de sobres.' })}</p>

          <button onClick={() => startGame(nivel)}
            className="w-full py-3.5 rounded-2xl bg-[#EDAE49] text-black font-black text-lg hover:bg-amber-400 transition-colors">
            {tr({ es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' })}
          </button>
          <ComoSeJuega>
            <div className="space-y-2 text-white/70 text-sm">
              <p>{tr({ es: 'Las soluciones (raíces) de ax² + bx + c = 0 son los puntos donde la parábola y = ax² + bx + c corta el eje X. Resuelve la ecuación en tu cabeza o en un papel, toca en el eje las soluciones y comprueba: al corregir aparece la parábola pasando por ellas, con la resolución paso a paso.', en: 'The solutions (roots) of ax² + bx + c = 0 are the points where the parabola y = ax² + bx + c crosses the x-axis. Solve the equation in your head or on paper, tap the solutions on the axis and check: the parabola then appears passing through them, with the step-by-step working.', ca: 'Les solucions (arrels) de ax² + bx + c = 0 són els punts on la paràbola y = ax² + bx + c talla l’eix X. Resol l’equació de cap o en un paper, toca a l’eix les solucions i comprova: en corregir apareix la paràbola passant-hi, amb la resolució pas a pas.' })}</p>
              <p>{tr({ es: 'Si falta la x (ax² + c = 0), despeja x² y no olvides la raíz negativa. Si falta el número (ax² + bx = 0), saca factor común: una solución es siempre x = 0. Si están completas, usa la fórmula x = (−b ± √(b² − 4ac)) / 2a: si el discriminante es 0 hay una sola solución (márcala una vez) y si es negativo, no hay solución real.', en: 'If there is no x term (ax² + c = 0), isolate x² and remember the negative root. If there is no constant (ax² + bx = 0), factorise: one solution is always x = 0. For complete equations use the formula x = (−b ± √(b² − 4ac)) / 2a: if the discriminant is 0 there is one solution (mark it once) and if it is negative there is no real solution.', ca: 'Si falta la x (ax² + c = 0), aïlla x² i no oblidis l’arrel negativa. Si falta el nombre (ax² + bx = 0), treu factor comú: una solució és sempre x = 0. Si són completes, fes servir la fórmula x = (−b ± √(b² − 4ac)) / 2a: si el discriminant és 0 hi ha una sola solució (marca-la un cop) i si és negatiu, no hi ha solució real.' })}</p>
              <p className="text-white/40 text-xs pt-1">⏱️ {TIEMPOS[nivel].total / 60} min · {tr({ es: `Acierto +10 y +${TIEMPOS[nivel].acierto}s · Fallo −${WRONG_TIME}s`, en: `Correct +10 and +${TIEMPOS[nivel].acierto}s · Wrong −${WRONG_TIME}s`, ca: `Encert +10 i +${TIEMPOS[nivel].acierto}s · Error −${WRONG_TIME}s` })}</p>
            </div>
          </ComoSeJuega>
        </div>
      </div>
    )
  }

  if (screen === 'end') {
    const pts = aciertos * 10
    const msg = tr({
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 4 ? 'Buen comienzo' : aciertos < 8 ? '¡Buena puntería con las raíces!' : '¡Maestro de la fórmula!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 4 ? 'Good start' : aciertos < 8 ? 'Sharp aim with those roots!' : 'Master of the quadratic formula!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 4 ? 'Bon començament' : aciertos < 8 ? 'Bona punteria amb les arrels!' : 'Mestre de la fórmula!',
    })
    const shareText = tr({
      es: `He resuelto ${aciertos} ecuaciones de segundo grado en Tuthor 🌱 — ¿puedes superarme? https://tuthor.es/juegos/caza-la-raiz`,
      en: `I solved ${aciertos} quadratic equations on Tuthor 🌱 — can you beat me? https://tuthor.es/en/juegos/caza-la-raiz`,
      ca: `He resolt ${aciertos} equacions de segon grau a Tuthor 🌱 — em pots superar? https://tuthor.es/ca/juegos/caza-la-raiz`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="caza-la-raiz" emoji="🌱" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
        stats={[{ label: tr({ es: 'aciertos', en: 'correct', ca: 'encerts' }), value: aciertos, emoji: '✅' }]}
        shareText={shareText} user={user} lang={l}
        onPlayAgain={() => startGame(nivel)} secondaryActions={secondary} />
    )
  }

  if (!ronda) return null
  const timerColor = timeLeft > TIEMPOS[nivel].total * 0.66 ? '#22c55e' : timeLeft > TIEMPOS[nivel].total * 0.28 ? '#f59e0b' : '#ef4444'
  const timerPct = Math.min(1, timeLeft / TIEMPOS[nivel].total)
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
        <PreguntaRaiz key={ronda.uid} ronda={ronda} revelado={isResult} onResponder={responder} />
        {!isResult && <p className="text-center text-white/35 text-xs mt-2">✏️ {tr({ es: 'Resuélvela en papel y marca el resultado', en: 'Solve it on paper, then mark the answer', ca: 'Resol-la en paper i marca el resultat' })}</p>}
        {isResult && (
          <p className="text-center text-xs font-bold mt-2">
            {acierto
              ? <span className="text-green-400">+10 · +{TIEMPOS[nivel].acierto}s ⏱️{streak >= 2 ? ` · 🔥 ${streak}` : ''}</span>
              : <span className="text-red-400">−{WRONG_TIME}s ⏱️</span>}
          </p>
        )}
      </div>
    </div>
  )
}
