import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/construyeFigura'
import PreguntaFigura from '../components/construyeFigura/PreguntaFigura'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Cada figura lleva unos cuantos toques y, en difícil, pensar: más tiempo
// cuanto más alto el nivel.
const TIEMPOS = { facil: 120, medio: 150, dificil: 180 }
const BONUS = { facil: 15, medio: 20, dificil: 25 }
const WRONG_TIME = 10
const REVEAL_OK = 2000
const REVEAL_MAL = 4500 // da tiempo a mirar la figura que valía

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Área: cuenta cuadraditos y haz rectángulos', en: 'Area: count squares and make rectangles', ca: 'Àrea: compta quadradets i fes rectangles' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Área y perímetro a la vez', en: 'Area and perimeter at the same time', ca: 'Àrea i perímetre alhora' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'El mayor y el menor perímetro posible, y la misma área con otro perímetro', en: 'The longest and shortest possible perimeter, and the same area with another perimeter', ca: 'El perímetre més gran i més petit possible, i la mateixa àrea amb un altre perímetre' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[construye-figura] los niveles de la pantalla no coinciden con NIVELES')
}

export default function ConstruyeFigura() {
  const { lang, localPath, tr } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const backPath = location.state?.backPath

  const [screen, setScreen] = useState('intro')
  const [nivel, setNivel] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(TIEMPOS.facil)
  const [aciertos, setAciertos] = useState(0)
  const [streak, setStreak] = useState(0)
  const [ronda, setRonda] = useState(null)
  const [ultimo, setUltimo] = useState(null)
  const [phase, setPhase] = useState('choose')

  const timerRef = useRef(null)
  const nextRef = useRef(null)
  const aciertosRef = useRef(0)
  const nivelRef = useRef('facil')
  useEffect(() => { aciertosRef.current = aciertos }, [aciertos])

  const next = useCallback(niv => {
    setRonda({ ...genRonda(niv), uid: Math.random() })
    setPhase('choose')
  }, [])

  const startGame = useCallback((niv = 'facil') => {
    nivelRef.current = niv
    setNivel(niv); setScreen('playing')
    setAciertos(0); setStreak(0)
    setTimeLeft(TIEMPOS[niv])
    next(niv)
  }, [next])

  function finish() {
    clearTimeout(nextRef.current)
    setScreen('end')
    const pts = aciertosRef.current * 10
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'construye-figura', category: 'geometria',
        score: pts, timeSpent: TIEMPOS[nivelRef.current],
        coinsEarned: computeCoins('construye-figura', { score: pts }),
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

  function responder(cells) {
    if (phase !== 'choose') return
    setPhase('result')
    const ok = esCorrecta(ronda, cells)
    setUltimo(ok)
    if (ok) {
      setAciertos(a => a + 1)
      setStreak(s => s + 1)
      setTimeLeft(t => t + BONUS[nivel])
    } else {
      setStreak(0)
      setTimeLeft(t => Math.max(0, t - WRONG_TIME))
    }
    nextRef.current = setTimeout(() => next(nivel), ok ? REVEAL_OK : REVEAL_MAL)
  }

  const seo = {
    title: tr({ es: 'Construye la Figura — Juego de área y perímetro', en: 'Build the Shape — Area and perimeter game', ca: 'Construeix la Figura — Joc d’àrea i perímetre' }),
    desc: tr({
      es: 'Juego de área y perímetro: pinta casillas en una cuadrícula hasta formar la figura que se pide. Rectángulos, área y perímetro a la vez, y el mayor o menor perímetro posible. Primaria y ESO. Gratis.',
      en: 'Area and perimeter game: paint squares on a grid to build the shape you are asked for. Rectangles, area and perimeter together, and the longest or shortest possible perimeter. Free.',
      ca: 'Joc d’àrea i perímetre: pinta caselles en una quadrícula fins a formar la figura que es demana. Rectangles, àrea i perímetre alhora, i el perímetre més gran o més petit possible. Primària i ESO. Gratis.',
    }),
    path: '/juegos/construye-figura',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="construye-figura"
            badge={tr({ es: 'Matemáticas · Geometría', en: 'Maths · Geometry', ca: 'Matemàtiques · Geometria' })}
            titulo={tr({ es: '🔲 Construye la Figura', en: '🔲 Build the Shape', ca: '🔲 Construeix la Figura' })}
            sub={tr({ es: 'Pinta casillas hasta que el área y el perímetro sean los que se piden', en: 'Paint squares until the area and perimeter are the ones you need', ca: 'Pinta caselles fins que l’àrea i el perímetre siguin els que es demanen' })} />

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
              <p>{tr({ es: 'Arriba sale el encargo: «área 8 y perímetro 12», «un rectángulo de perímetro 10»… Toca las casillas de la cuadrícula para pintarlas, o arrastra el dedo para pintar varias; si tocas una pintada, se borra. Cuando la tengas, pulsa Comprobar.', en: 'The task appears at the top: “area 8 and perimeter 12”, “a rectangle with a perimeter of 10”… Tap the grid squares to paint them, or drag your finger to paint several; tap a painted one to rub it out. When you’re ready, press Check.', ca: 'A dalt surt l’encàrrec: «àrea 8 i perímetre 12», «un rectangle de perímetre 10»… Toca les caselles de la quadrícula per pintar-les, o arrossega el dit per pintar-ne diverses; si en toques una de pintada, s’esborra. Quan la tinguis, prem Comprovar.' })}</p>
              <p>{tr({ es: 'El área es cuántos cuadraditos hay dentro; el perímetro, cuántos lados de cuadradito hay en el borde. La figura tiene que ser de una pieza y sin agujeros. Vale cualquier figura que cumpla: al corregir verás su contorno y, si fallas, una que valía.', en: 'The area is how many squares are inside; the perimeter is how many square edges are on the outline. The shape must be one piece with no holes. Any shape that fits the task counts: when it’s checked you’ll see its outline and, if you got it wrong, one that works.', ca: 'L’àrea és quants quadradets hi ha a dins; el perímetre, quants costats de quadradet hi ha a la vora. La figura ha de ser d’una peça i sense forats. Val qualsevol figura que compleixi: en corregir veuràs el seu contorn i, si falles, una que valia.' })}</p>
              <p className="text-white/40 text-xs pt-1">⏱️ {TIEMPOS[nivel]}s · {tr({ es: `Acierto +10 y +${BONUS[nivel]}s · Fallo −${WRONG_TIME}s`, en: `Correct +10 and +${BONUS[nivel]}s · Wrong −${WRONG_TIME}s`, ca: `Encert +10 i +${BONUS[nivel]}s · Error −${WRONG_TIME}s` })}</p>
            </div>
          </ComoSeJuega>
        </div>
      </div>
    )
  }

  if (screen === 'end') {
    const pts = aciertos * 10
    const msg = tr({
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 4 ? 'Buen comienzo' : aciertos < 8 ? '¡Buenas figuras!' : '¡Arquitecto de cuadrícula!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 4 ? 'Good start' : aciertos < 8 ? 'Nice shapes!' : 'Grid architect!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 4 ? 'Bon començament' : aciertos < 8 ? 'Bones figures!' : 'Arquitecte de quadrícula!',
    })
    const shareText = tr({
      es: `He construido ${aciertos} figuras con el área y el perímetro justos en Tuthor 🔲 — ¿puedes superarme? https://tuthor.es/juegos/construye-figura`,
      en: `I built ${aciertos} shapes with exactly the right area and perimeter on Tuthor 🔲 — can you beat me? https://tuthor.es/en/juegos/construye-figura`,
      ca: `He construït ${aciertos} figures amb l’àrea i el perímetre justos a Tuthor 🔲 — em pots superar? https://tuthor.es/ca/juegos/construye-figura`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="construye-figura" emoji="🔲" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
        stats={[{ label: tr({ es: 'figuras', en: 'shapes', ca: 'figures' }), value: aciertos, emoji: '✅' }]}
        shareText={shareText} user={user} lang={l}
        onPlayAgain={() => startGame(nivel)} secondaryActions={secondary} />
    )
  }

  if (!ronda) return null
  const total = TIEMPOS[nivel]
  const timerColor = timeLeft > total * 0.66 ? '#22c55e' : timeLeft > total * 0.28 ? '#f59e0b' : '#ef4444'
  const timerPct = Math.min(1, timeLeft / total)
  const isResult = phase === 'result'

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
        <PreguntaFigura key={ronda.uid} ronda={ronda} revelado={isResult} onResponder={responder} mostrarArea={nivel === 'medio'} />
        {isResult && (
          <p className="text-center text-xs font-bold mt-2">
            {ultimo
              ? <span className="text-green-400">+10 · +{BONUS[nivel]}s ⏱️{streak >= 2 ? ` · 🔥 ${streak}` : ''}</span>
              : <span className="text-red-400">−{WRONG_TIME}s ⏱️</span>}
          </p>
        )}
      </div>
    </div>
  )
}
