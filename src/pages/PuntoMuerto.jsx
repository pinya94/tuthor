import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/puntoMuerto'
import PreguntaPuntoMuerto from '../components/puntoMuerto/PreguntaPuntoMuerto'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Se desliza, se clasifica o se teclea: 90 s y +6 s por acierto.
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 6
const REVEAL_MS = 5200 // da tiempo a ver el gráfico con el cruce y la cuenta

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Lee el gráfico: dónde se cruzan ingresos y costes', en: 'Read the graph: where revenue and costs cross', ca: 'Llegeix el gràfic: on es creuen ingressos i costos' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Calcula el punto muerto y el beneficio', en: 'Work out break-even and profit', ca: 'Calcula el punt mort i el benefici' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Beneficios, sensibilidad y precio mínimo', en: 'Profit, sensitivity and minimum price', ca: 'Beneficis, sensibilitat i preu mínim' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[punto-muerto] los niveles de la pantalla no coinciden con NIVELES')
}

export default function PuntoMuerto() {
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
        type: 'juego', game: 'punto-muerto', category: 'punto-equilibrio',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('punto-muerto', { score: pts }),
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
    title: tr({ es: 'Punto Muerto — Juego del punto de equilibrio o umbral de rentabilidad', en: 'Break-Even — Break-even point game', ca: 'Punt Mort — Joc del punt d’equilibri o llindar de rendibilitat' }),
    desc: tr({
      es: 'Costes fijos, precio y coste variable: lee en el gráfico dónde se cruzan ingresos y costes, calcula el punto muerto Q = CF / (P − CVu), el beneficio, el precio mínimo y qué pasa si cambian los costes. Juego de economía gratis.',
      en: 'Fixed costs, price and variable cost: read where revenue and costs cross, work out break-even Q = FC / (P − VCu), profit, minimum price and what happens when costs change. Free economics game.',
      ca: 'Costos fixos, preu i cost variable: llegeix on es creuen ingressos i costos, calcula el punt mort Q = CF / (P − CVu), el benefici, el preu mínim i què passa si canvien els costos. Joc d’economia gratis.',
    }),
    path: '/juegos/punto-muerto',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="punto-muerto"
            badge={tr({ es: 'Economía · Punto de equilibrio', en: 'Economics · Break-even point', ca: 'Economia · Punt d’equilibri' })}
            titulo={tr({ es: '🏭 Punto Muerto', en: '🏭 Break-Even', ca: '🏭 Punt Mort' })}
            sub={tr({ es: '¿Cuántas unidades hay que vender para dejar de perder dinero?', en: 'How many units must you sell to stop losing money?', ca: 'Quantes unitats cal vendre per deixar de perdre diners?' })} />

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
              <p>{tr({ es: 'Cada ronda es una empresa con sus costes fijos (CF), el precio de venta (P) y lo que cuesta fabricar cada unidad (CVu). El gráfico dibuja los ingresos y los costes totales: donde se cruzan está el punto muerto.', en: 'Each round is a firm with its fixed costs (FC), selling price (P) and the cost of making each unit (VCu). The graph shows revenue and total costs: where they cross is the break-even point.', ca: 'Cada ronda és una empresa amb els seus costos fixos (CF), el preu de venda (P) i el que costa fabricar cada unitat (CVu). El gràfic dibuixa els ingressos i els costos totals: on es creuen hi ha el punt mort.' })}</p>
              <p>{tr({ es: 'No hay opciones: llevas la línea hasta el cruce del gráfico, repartes ventas y cambios en sus cajas o tecleas el resultado (con signo menos si hay pérdidas).', en: 'There are no options: you move the line to where the graph lines cross, sort sales and changes into their boxes or type the result (with a minus sign if there is a loss).', ca: 'No hi ha opcions: portes la línia fins al creuament del gràfic, reparteixes vendes i canvis a les seves caixes o tecleges el resultat (amb signe menys si hi ha pèrdues).' })}</p>
              <p>{tr({ es: 'La cuenta clave: cada unidad deja un margen de P − CVu, y hay que vender CF / (P − CVu) unidades para cubrir los costes fijos. Por debajo hay pérdidas; por encima, beneficio.', en: 'The key sum: each unit leaves a margin of P − VCu, and you must sell FC / (P − VCu) units to cover fixed costs. Below that is a loss; above, profit.', ca: 'El compte clau: cada unitat deixa un marge de P − CVu, i cal vendre CF / (P − CVu) unitats per cobrir els costos fixos. Per sota hi ha pèrdues; per sobre, benefici.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Tu empresa da beneficios!' : '¡Director financiero! 🏭',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Your firm is in profit!' : 'Finance director! 🏭',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'La teva empresa dona beneficis!' : 'Director financer! 🏭',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} cuentas de punto de equilibrio en Punto Muerto de Tuthor 🏭 — ¿puedes superarme? https://tuthor.es/juegos/punto-muerto`,
      en: `I got ${aciertos} break-even sums right in Break-Even on Tuthor 🏭 — can you beat me? https://tuthor.es/juegos/punto-muerto`,
      ca: `He encertat ${aciertos} comptes de punt d’equilibri a Punt Mort de Tuthor 🏭 — em pots superar? https://tuthor.es/juegos/punto-muerto`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="punto-muerto" emoji="🏭" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaPuntoMuerto key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
