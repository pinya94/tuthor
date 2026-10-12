import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/newtonAccion'
import PreguntaNewton from '../components/newtonAccion/PreguntaNewton'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 5000 // da tiempo a ver las fuerzas resueltas y la cuenta

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'F = m · a, peso y masa en la Tierra y en la Luna, inercia y acción-reacción', en: 'F = m × a, weight and mass on Earth and the Moon, inertia and action-reaction', ca: 'F = m · a, pes i massa a la Terra i a la Lluna, inèrcia i acció-reacció' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Despejar masa o fuerza y empujar con rozamiento (¿se moverá?)', en: 'Solving for mass or force, and pushing against friction (will it move?)', ca: 'Aïllar massa o força i empènyer amb fregament (es mourà?)' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Plano inclinado y peso aparente en un ascensor', en: 'Inclined planes and apparent weight in a lift', ca: 'Pla inclinat i pes aparent en un ascensor' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[newton-accion] los niveles de la pantalla no coinciden con NIVELES')
}

export default function NewtonAccion() {
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
        type: 'juego', game: 'newton-accion', category: 'dinamica',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('newton-accion', { score: pts }),
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
    title: tr({ es: 'Newton en Acción — Juego de dinámica: leyes de Newton, rozamiento y plano inclinado', en: 'Newton in Action — Dynamics game: Newton’s laws, friction and slopes', ca: 'Newton en Acció — Joc de dinàmica: lleis de Newton, fregament i pla inclinat' }),
    desc: tr({
      es: 'Una caja con sus fuerzas dibujadas: segunda ley F = m · a, peso y masa, rozamiento, plano inclinado, ascensor e inercia y acción-reacción. Juego de física gratis con la explicación de cada respuesta.',
      en: 'A box with its forces drawn: second law F = m × a, weight and mass, friction, inclined planes, lifts, inertia and action-reaction. Free physics game with an explanation for every answer.',
      ca: 'Una caixa amb les seves forces dibuixades: segona llei F = m · a, pes i massa, fregament, pla inclinat, ascensor i inèrcia i acció-reacció. Joc de física gratis amb l’explicació de cada resposta.',
    }),
    path: '/juegos/newton-accion',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="newton-accion"
            badge={tr({ es: 'Física · Dinámica', en: 'Physics · Dynamics', ca: 'Física · Dinàmica' })}
            titulo={tr({ es: '🍎 Newton en Acción', en: '🍎 Newton in Action', ca: '🍎 Newton en Acció' })}
            sub={tr({ es: 'Fuerzas, masas y aceleraciones con las tres leyes de Newton', en: 'Forces, masses and accelerations with Newton’s three laws', ca: 'Forces, masses i acceleracions amb les tres lleis de Newton' })} />

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
              <p>{tr({ es: 'Sale una caja con sus fuerzas dibujadas como flechas: el empuje, el rozamiento, el peso y la normal. Con la segunda ley (F = m · a) se calcula la aceleración, la fuerza o la masa; usamos g = 10 m/s² para que las cuentas salgan limpias.', en: 'A box appears with its forces drawn as arrows: the push, friction, weight and the normal force. With the second law (F = m × a) you find the acceleration, force or mass; we use g = 10 m/s² so the sums come out clean.', ca: 'Surt una caixa amb les seves forces dibuixades com a fletxes: l’empenta, el fregament, el pes i la normal. Amb la segona llei (F = m · a) es calcula l’acceleració, la força o la massa; fem servir g = 10 m/s² perquè els comptes surtin nets.' })}</p>
              <p>{tr({ es: 'Ojo con las trampas: la masa no cambia en la Luna (el peso sí); si empujas menos que el rozamiento, la caja no se mueve; en un plano inclinado la normal no es el peso; y en un ascensor que acelera hacia arriba la báscula marca más.', en: 'Watch the traps: mass does not change on the Moon (weight does); if you push less than friction, the box does not move; on a slope the normal force is not the weight; and in a lift accelerating upwards the scales read more.', ca: 'Compte amb els paranys: la massa no canvia a la Lluna (el pes sí); si empenys menys que el fregament, la caixa no es mou; en un pla inclinat la normal no és el pes; i en un ascensor que accelera cap amunt la bàscula marca més.' })}</p>
              <p>{tr({ es: 'Al responder aparece el resultado en el dibujo y, en el plano inclinado, las dos partes en que se descompone el peso.', en: 'When you answer, the result appears on the drawing and, on the slope, the two parts the weight splits into.', ca: 'En respondre apareix el resultat al dibuix i, al pla inclinat, les dues parts en què es descompon el pes.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Tienes fuerza!' : '¡Newton estaría orgulloso! 🍎',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'You have the force!' : 'Newton would be proud! 🍎',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Tens força!' : 'Newton n’estaria orgullós! 🍎',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} de dinámica en Newton en Acción de Tuthor 🍎 — ¿puedes superarme? https://tuthor.es/juegos/newton-accion`,
      en: `I got ${aciertos} dynamics questions right in Newton in Action on Tuthor 🍎 — can you beat me? https://tuthor.es/juegos/newton-accion`,
      ca: `He encertat ${aciertos} de dinàmica a Newton en Acció de Tuthor 🍎 — em pots superar? https://tuthor.es/juegos/newton-accion`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="newton-accion" emoji="🍎" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaNewton key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
