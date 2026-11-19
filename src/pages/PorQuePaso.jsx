import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, TEMAS, genRonda, esCorrecta } from '../lib/porQuePaso'
import PreguntaPorQuePaso from '../components/porQuePaso/PreguntaPorQuePaso'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'
import { useArranqueDirecto } from '../lib/arranqueDirecto'

// Juego rápido: una pieza y un toque. 90 s y +5 s por acierto.
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 5
const REVEAL_MS = 3000 // ver si acertaste y seguir

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Una pieza por ronda: ¿causa, consecuencia o no tiene que ver?', en: 'One piece per round: cause, consequence or not related?', ca: 'Una peça per ronda: causa, conseqüència o no hi té a veure?' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Dos piezas por ronda', en: 'Two pieces per round', ca: 'Dues peces per ronda' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Tres piezas por ronda', en: 'Three pieces per round', ca: 'Tres peces per ronda' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[por-que-paso] los niveles de la pantalla no coinciden con NIVELES')
}

export default function PorQuePaso() {
  const { lang, localPath, tr } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const backPath = location.state?.backPath
  // Desde un tema (o una tarea del profesor): solo hechos de ese tema, y se
  // guarda como tal. Sin tema, todos mezclados.
  const temaFijo = TEMAS.includes(location.state?.tema) ? location.state.tema : null

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
    setRonda({ ...genRonda(niv, { tema: temaFijo }), uid: Math.random() })
    setElegida(null)
    setPhase('choose')
  }, [temaFijo])

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
        type: 'juego', game: 'por-que-paso', category: temaFijo ?? 'mezcla',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('por-que-paso', { score: pts }),
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
    title: tr({ es: '¿Por Qué Pasó? — Juego de causas y consecuencias de la historia', en: 'Why Did It Happen? — History causes and consequences game', ca: 'Per Què Va Passar? — Joc de causes i conseqüències de la història' }),
    desc: tr({
      es: 'Juego de historia: clasifica causas y consecuencias de 25 hechos, de la revolución neolítica a la caída del muro de Berlín: Revolución francesa, guerras mundiales, Guerra Civil, Transición… ESO. Gratis.',
      en: 'History game: sort the causes and consequences of 25 events, from the Neolithic Revolution to the fall of the Berlin Wall: the French Revolution, the world wars, the Spanish Civil War… Free.',
      ca: 'Joc d’història: classifica causes i conseqüències de 25 fets, de la revolució neolítica a la caiguda del mur de Berlín: Revolució francesa, guerres mundials, Guerra Civil, Transició… ESO. Gratis.',
    }),
    path: '/juegos/por-que-paso',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  // Desde la cuadrícula de juegos se entra jugando (ver lib/arranqueDirecto)
  useArranqueDirecto(startGame)

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="por-que-paso"
            badge={tr({ es: 'Historia · Causas y consecuencias', en: 'History · Causes and consequences', ca: 'Història · Causes i conseqüències' })}
            titulo={tr({ es: '🗝️ ¿Por Qué Pasó?', en: '🗝️ Why Did It Happen?', ca: '🗝️ Per Què Va Passar?' })}
            sub={tr({ es: 'Lo que provocó cada hecho y lo que vino después', en: 'What caused each event and what came after', ca: 'El que va provocar cada fet i el que va venir després' })} />

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
              <p>{tr({ es: 'Sale un hecho de la historia, como la Revolución francesa o la Peste Negra, y una frase. Toca si es una causa (pasó antes y lo provocó), una consecuencia (vino después por su culpa) o si no tiene que ver (es de otra época). En medio salen dos frases y en difícil, tres.', en: 'A historical event appears, such as the French Revolution or the Black Death, with a sentence. Tap whether it is a cause (it happened before and brought it about), a consequence (it came after because of it) or not related (it belongs to another time). Medium shows two sentences and Hard shows three.', ca: 'Surt un fet de la història, com la Revolució francesa o la Pesta Negra, i una frase. Toca si és una causa (va passar abans i el va provocar), una conseqüència (va venir després per culpa seva) o si no hi té a veure (és d’una altra època). En mitjà en surten dues i en difícil, tres.' })}</p>
              <p>{tr({ es: 'Hay 25 hechos, de la revolución neolítica a la caída del muro de Berlín. Si entras desde un tema de historia, solo salen hechos de ese tema.', en: 'There are 25 events, from the Neolithic Revolution to the fall of the Berlin Wall. If you start from a history topic, only events from that topic come up.', ca: 'Hi ha 25 fets, de la revolució neolítica a la caiguda del mur de Berlín. Si hi entres des d’un tema d’història, només surten fets d’aquell tema.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 4 ? 'Buen comienzo' : aciertos < 8 ? '¡Entiendes la historia!' : '¡Historiador de primera!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 4 ? 'Good start' : aciertos < 8 ? 'You understand history!' : 'First-class historian!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 4 ? 'Bon començament' : aciertos < 8 ? 'Entens la història!' : 'Historiador de primera!',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} esquemas de causas y consecuencias en ¿Por Qué Pasó? de Tuthor 🗝️ — ¿puedes superarme? https://tuthor.es/juegos/por-que-paso`,
      en: `I got ${aciertos} cause-and-consequence puzzles right in Why Did It Happen? on Tuthor 🗝️ — can you beat me? https://tuthor.es/en/juegos/por-que-paso`,
      ca: `He encertat ${aciertos} esquemes de causes i conseqüències a Per Què Va Passar? de Tuthor 🗝️ — em pots superar? https://tuthor.es/ca/juegos/por-que-paso`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="por-que-paso" emoji="🗝️" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaPorQuePaso key={ronda.uid} ronda={ronda} revelado={isResult} onResponder={responder} />
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
