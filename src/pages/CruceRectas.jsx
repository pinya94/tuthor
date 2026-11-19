import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/cruceRectas'
import PreguntaRectas from '../components/cruceRectas/PreguntaRectas'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'
import { useArranqueDirecto } from '../lib/arranqueDirecto'

// Dibujar dos rectas lleva su tiempo: 120 s y +10 s por acierto.
const GAME_TIME = 120
const WRONG_TIME = 5
const CORRECT_TIME = 10
const REVEAL_MS = 5000 // da tiempo a leer la comprobación

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Las rectas ya dibujadas: encuentra dónde se cortan', en: 'The lines are already drawn: find where they cross', ca: 'Les rectes ja dibuixades: troba on es tallen' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Dibuja tú cada recta con dos puntos y busca el corte', en: 'Draw each line yourself with two points and find the crossing', ca: 'Dibuixa tu cada recta amb dos punts i busca el tall' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Y sistemas sin solución o con infinitas: ¿paralelas o la misma recta?', en: 'Plus systems with no solution or infinitely many: parallel or the same line?', ca: 'I sistemes sense solució o amb infinites: paral·leles o la mateixa recta?' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[cruce-rectas] los niveles de la pantalla no coinciden con NIVELES')
}

export default function CruceRectas() {
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
        type: 'juego', game: 'cruce-rectas', category: 'sistemas',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('cruce-rectas', { score: pts }),
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
    title: tr({ es: 'Cruce de Rectas — Juego de sistemas de ecuaciones por el método gráfico', en: 'Line Crossing — Simultaneous equations game (graphical method)', ca: 'Encreuament de Rectes — Joc de sistemes d’equacions pel mètode gràfic' }),
    desc: tr({
      es: 'Juego de sistemas de ecuaciones por el método gráfico: dibuja cada recta tocando dos puntos que cumplan su ecuación y encuentra dónde se cortan. Con sistemas sin solución (paralelas) e infinitas soluciones. 2.º y 3.º de ESO. Gratis.',
      en: 'Simultaneous equations game using the graphical method: draw each line by tapping two points that satisfy its equation and find where they cross. Includes parallel and identical lines. Free.',
      ca: 'Joc de sistemes d’equacions pel mètode gràfic: dibuixa cada recta tocant dos punts que compleixin la seva equació i troba on es tallen. Amb sistemes sense solució (paral·leles) i amb infinites solucions. 2n i 3r d’ESO. Gratis.',
    }),
    path: '/juegos/cruce-rectas',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  // Desde la cuadrícula de juegos se entra jugando (ver lib/arranqueDirecto)
  useArranqueDirecto(startGame)

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="cruce-rectas"
            badge={tr({ es: 'Matemáticas · Sistemas de ecuaciones', en: 'Maths · Simultaneous equations', ca: 'Matemàtiques · Sistemes d’equacions' })}
            titulo={tr({ es: '✖️ Cruce de Rectas', en: '✖️ Line Crossing', ca: '✖️ Encreuament de Rectes' })}
            sub={tr({ es: 'Dos ecuaciones, dos rectas, un punto de corte', en: 'Two equations, two lines, one crossing point', ca: 'Dues equacions, dues rectes, un punt de tall' })} />

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
              <p>{tr({ es: 'Cada ecuación de un sistema es una recta, y la solución es el punto donde se cortan las dos: el único (x, y) que cumple a la vez las dos ecuaciones. Para dibujar una recta basta con dos puntos: busca dos parejas (x, y) que cumplan la ecuación, por ejemplo dando a x el valor 0 y despejando y.', en: 'Each equation in a system is a line, and the solution is the point where the two cross: the only (x, y) that satisfies both equations at once. Two points are enough to draw a line: find two pairs (x, y) that satisfy the equation, for example by setting x to 0 and solving for y.', ca: 'Cada equació d’un sistema és una recta, i la solució és el punt on es tallen totes dues: l’únic (x, y) que compleix alhora les dues equacions. Per dibuixar una recta n’hi ha prou amb dos punts: busca dues parelles (x, y) que compleixin l’equació, per exemple donant a x el valor 0 i aïllant la y.' })}</p>
              <p>{tr({ es: 'Si tocas un punto que no está en la recta, te decimos la cuenta que falla. En difícil, a veces las rectas son paralelas (el sistema no tiene solución) o son la misma recta escrita de otra forma (infinitas soluciones).', en: 'If you tap a point that is not on the line, you will see the sum that fails. On Hard, the lines are sometimes parallel (no solution) or the same line written differently (infinitely many solutions).', ca: 'Si toques un punt que no és a la recta, et diem el compte que falla. En difícil, de vegades les rectes són paral·leles (el sistema no té solució) o són la mateixa recta escrita d’una altra manera (infinites solucions).' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 4 ? 'Buen comienzo' : aciertos < 8 ? '¡Buen ojo para las rectas!' : '¡Maestro del método gráfico!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 4 ? 'Good start' : aciertos < 8 ? 'A good eye for lines!' : 'Master of the graphical method!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 4 ? 'Bon començament' : aciertos < 8 ? 'Bon ull per a les rectes!' : 'Mestre del mètode gràfic!',
    })
    const shareText = tr({
      es: `He resuelto ${aciertos} sistemas de ecuaciones en Tuthor ✖️ — ¿puedes superarme? https://tuthor.es/juegos/cruce-rectas`,
      en: `I solved ${aciertos} simultaneous equations on Tuthor ✖️ — can you beat me? https://tuthor.es/en/juegos/cruce-rectas`,
      ca: `He resolt ${aciertos} sistemes d’equacions a Tuthor ✖️ — em pots superar? https://tuthor.es/ca/juegos/cruce-rectas`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="cruce-rectas" emoji="✖️" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaRectas key={ronda.uid} ronda={ronda} revelado={isResult} onResponder={responder} />
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
