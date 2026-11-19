import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/masLejos'
import PreguntaDistancia from '../components/masLejos/PreguntaDistancia'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'
import { useArranqueDirecto } from '../lib/arranqueDirecto'

// Cada comparación se decide en segundos: 90 s y +5 s por acierto. Las
// rondas se encadenan: el trayecto nuevo pasa a ser el que hay que superar.
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 5
const REVEAL_MS = 3500 // los kilómetros y el mapa se leen rápido

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Diferencias claras: uno es mucho más largo que el otro', en: 'Clear differences: one is much longer than the other', ca: 'Diferències clares: un és molt més llarg que l’altre' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Más ajustado y en zonas distintas del mundo: no basta con mirar las líneas', en: 'Closer calls in different parts of the world: looking at the lines is not enough', ca: 'Més ajustat i en zones diferents del món: no n’hi ha prou de mirar les línies' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Muy ajustado, en el mapa del mundo entero y lejos uno del otro: el mapa engaña', en: 'Very close calls on the whole world map, far apart: the map can fool you', ca: 'Molt ajustat, al mapa del món sencer i lluny l’un de l’altre: el mapa enganya' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[mas-lejos] los niveles de la pantalla no coinciden con NIVELES')
}

export default function MasLejos() {
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

  // encadenar: el trayecto que acaba de salir es el «anterior» de la siguiente
  const next = useCallback((niv, encadenar = true) => {
    setRonda(prev => ({ ...genRonda(niv, { anterior: encadenar ? prev?.actual : null }), uid: Math.random() }))
    setElegida(null)
    setPhase('choose')
  }, [])

  const startGame = useCallback((niv = 'facil') => {
    setNivel(niv); setScreen('playing')
    setAciertos(0); setStreak(0)
    setTimeLeft(GAME_TIME)
    next(niv, false)
  }, [next])

  function finish() {
    clearTimeout(nextRef.current)
    setScreen('end')
    const pts = aciertosRef.current * 10
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'mas-lejos', category: 'distancias',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('mas-lejos', { score: pts }),
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
    title: tr({ es: '¿Más Lejos? — Juego de distancias entre ciudades, países y comunidades', en: 'Further Away? — Distance game: cities, countries and regions', ca: 'Més Lluny? — Joc de distàncies entre ciutats, països i comunitats' }),
    desc: tr({
      es: 'Juego de geografía: ¿Dublín–Londres está más lejos o más cerca que Cataluña–Andalucía? Compara distancias entre ciudades, países y comunidades en el mapa del mundo y encadena aciertos. Gratis.',
      en: 'Geography game: is Dublin–London further or closer than Catalonia–Andalusia? Compare distances between cities, countries and regions on the world map and build a streak. Free.',
      ca: 'Joc de geografia: Dublín–Londres és més lluny o més a prop que Catalunya–Andalusia? Compara distàncies entre ciutats, països i comunitats al mapa del món i encadena encerts. Gratis.',
    }),
    path: '/juegos/mas-lejos',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  // Desde la cuadrícula de juegos se entra jugando (ver lib/arranqueDirecto)
  useArranqueDirecto(startGame)

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="mas-lejos"
            badge={tr({ es: 'Geografía · Distancias', en: 'Geography · Distances', ca: 'Geografia · Distàncies' })}
            titulo={tr({ es: '✈️ ¿Más Lejos?', en: '✈️ Further Away?', ca: '✈️ Més Lluny?' })}
            sub={tr({ es: '¿Este viaje es más largo o más corto que el anterior?', en: 'Is this trip longer or shorter than the last one?', ca: 'Aquest viatge és més llarg o més curt que l’anterior?' })} />

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
              <p>{tr({ es: 'Sale un trayecto con sus kilómetros, por ejemplo Cataluña → Andalucía, y después otro: ¿está más lejos o más cerca? Al responder ves sus kilómetros en el mapa, y ese trayecto pasa a ser el que hay que superar. Se mezclan escalas: comunidades, ciudades, países y continentes enteros.', en: 'A trip appears with its distance, for example Catalonia → Andalusia, and then another: is it further or closer? When you answer you see its distance on the map, and that trip becomes the one to beat. Scales are mixed: regions, cities, countries and whole continents.', ca: 'Surt un trajecte amb els seus quilòmetres, per exemple Catalunya → Andalusia, i després un altre: és més lluny o més a prop? En respondre veus els quilòmetres al mapa, i aquest trajecte passa a ser el que cal superar. Es barregen escales: comunitats, ciutats, països i continents sencers.' })}</p>
              <p>{tr({ es: 'Las distancias son en línea recta sobre la Tierra. Los países y las comunidades se miden desde su capital (lo verás escrito: «China · Pekín»). Ojo con el mapa: cerca de los polos estira las distancias, así que no te fíes solo de lo largas que parecen las líneas.', en: 'Distances are in a straight line over the Earth. Countries and regions are measured from their capital (you will see it written: «China · Beijing»). Watch out for the map: near the poles it stretches distances, so do not just trust how long the lines look.', ca: 'Les distàncies són en línia recta sobre la Terra. Els països i les comunitats es mesuren des de la capital (ho veuràs escrit: «Xina · Pequín»). Compte amb el mapa: a prop dels pols estira les distàncies, així que no et fiïs només de com de llargues semblen les línies.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 4 ? 'Buen comienzo' : aciertos < 8 ? '¡Buen sentido de la distancia!' : '¡Trotamundos!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 4 ? 'Good start' : aciertos < 8 ? 'A good sense of distance!' : 'Globetrotter!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 4 ? 'Bon començament' : aciertos < 8 ? 'Bon sentit de la distància!' : 'Rodamón!',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} distancias en ¿Más Lejos? de Tuthor ✈️ — ¿puedes superarme? https://tuthor.es/juegos/mas-lejos`,
      en: `I got ${aciertos} distances right in Further Away? on Tuthor ✈️ — can you beat me? https://tuthor.es/en/juegos/mas-lejos`,
      ca: `He encertat ${aciertos} distàncies a Més Lluny? de Tuthor ✈️ — em pots superar? https://tuthor.es/ca/juegos/mas-lejos`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="mas-lejos" emoji="✈️" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaDistancia key={ronda.uid} ronda={ronda} revelado={isResult} onResponder={responder} />
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
