import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/leeMovimiento'
import PreguntaMovimiento from '../components/leeMovimiento/PreguntaMovimiento'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 4800 // da tiempo a ver la pendiente o el área en la gráfica

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: '¿Parado, avanza, acelera o frena? Lee la forma de la gráfica', en: 'At rest, moving, speeding up or slowing down? Read the graph’s shape', ca: 'Aturat, avança, accelera o frena? Llegeix la forma de la gràfica' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Velocidad y aceleración con la pendiente de cada tramo', en: 'Velocity and acceleration from each stretch’s slope', ca: 'Velocitat i acceleració amb el pendent de cada tram' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Distancia como área bajo la v-t y distancia frente a desplazamiento', en: 'Distance as area under the v-t graph, and distance versus displacement', ca: 'Distància com a àrea sota la v-t i distància davant desplaçament' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[lee-el-movimiento] los niveles de la pantalla no coinciden con NIVELES')
}

export default function LeeElMovimiento() {
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
        type: 'juego', game: 'lee-el-movimiento', category: 'movimiento',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('lee-el-movimiento', { score: pts }),
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
    title: tr({ es: 'Lee el movimiento — Juego de gráficas x-t y v-t (cinemática)', en: 'Read the Motion — Position-time and velocity-time graphs game', ca: 'Llegeix el moviment — Joc de gràfiques x-t i v-t (cinemàtica)' }),
    desc: tr({
      es: 'Gráficas posición-tiempo y velocidad-tiempo generadas: ¿parado, avanza, acelera o frena? Calcula la velocidad y la aceleración con la pendiente y la distancia con el área. Juego de física gratis para ESO y Bachillerato.',
      en: 'Generated position-time and velocity-time graphs: at rest, moving, speeding up or slowing down? Work out velocity and acceleration from the slope and distance from the area. Free physics game.',
      ca: 'Gràfiques posició-temps i velocitat-temps generades: aturat, avança, accelera o frena? Calcula la velocitat i l’acceleració amb el pendent i la distància amb l’àrea. Joc de física gratis per a ESO i Batxillerat.',
    }),
    path: '/juegos/lee-el-movimiento',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="lee-el-movimiento"
            badge={tr({ es: 'Física · El movimiento', en: 'Physics · Motion', ca: 'Física · El moviment' })}
            titulo={tr({ es: '🏁 Lee el movimiento', en: '🏁 Read the Motion', ca: '🏁 Llegeix el moviment' })}
            sub={tr({ es: 'Gráficas x-t y v-t: pendientes, áreas y trampas', en: 'x-t and v-t graphs: slopes, areas and traps', ca: 'Gràfiques x-t i v-t: pendents, àrees i paranys' })} />

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
              <p>{tr({ es: 'Sale una gráfica de tres tramos (A, B y C). Mira qué se representa: en la de posición-tiempo (x-t), una línea horizontal es estar parado y la inclinación es la velocidad; en la de velocidad-tiempo (v-t), una línea horizontal es ir a velocidad constante, la inclinación es la aceleración y el área bajo la línea es la distancia recorrida.', en: 'A three-stretch graph appears (A, B and C). Check what it shows: on a position-time (x-t) graph a horizontal line means at rest and the slope is the velocity; on a velocity-time (v-t) graph a horizontal line means constant velocity, the slope is the acceleration and the area under the line is the distance travelled.', ca: 'Surt una gràfica de tres trams (A, B i C). Mira què s’hi representa: a la de posició-temps (x-t), una línia horitzontal és estar aturat i la inclinació és la velocitat; a la de velocitat-temps (v-t), una línia horitzontal és anar a velocitat constant, la inclinació és l’acceleració i l’àrea sota la línia és la distància recorreguda.' })}</p>
              <p>{tr({ es: 'Al responder, la gráfica enseña la cuenta: el triángulo de la pendiente (Δx ÷ Δt o Δv ÷ Δt) o el área sombreada. Ojo con las trampas: el tramo más rápido no es el que llega más alto, y si el móvil vuelve atrás, la distancia recorrida no es el desplazamiento.', en: 'When you answer, the graph shows the working: the slope triangle (Δx ÷ Δt or Δv ÷ Δt) or the shaded area. Watch out for the traps: the fastest stretch is not the one that reaches highest, and if the object comes back, the distance travelled is not the displacement.', ca: 'En respondre, la gràfica ensenya el compte: el triangle del pendent (Δx ÷ Δt o Δv ÷ Δt) o l’àrea ombrejada. Compte amb els paranys: el tram més ràpid no és el que arriba més amunt, i si el mòbil torna enrere, la distància recorreguda no és el desplaçament.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Lees las gráficas a toda velocidad!' : '¡Aceleración constante hacia el 10! 🏁',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'You read graphs at full speed!' : 'Constant acceleration towards top marks! 🏁',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Llegeixes les gràfiques a tota velocitat!' : 'Acceleració constant cap al 10! 🏁',
    })
    const shareText = tr({
      es: `He leído bien ${aciertos} gráficas de movimiento en Tuthor 🏁 — ¿puedes superarme? https://tuthor.es/juegos/lee-el-movimiento`,
      en: `I read ${aciertos} motion graphs right on Tuthor 🏁 — can you beat me? https://tuthor.es/juegos/lee-el-movimiento`,
      ca: `He llegit bé ${aciertos} gràfiques de moviment a Tuthor 🏁 — em pots superar? https://tuthor.es/juegos/lee-el-movimiento`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="lee-el-movimiento" emoji="🏁" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaMovimiento key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
