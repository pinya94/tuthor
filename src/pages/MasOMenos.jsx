import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/masOMenos'
import PreguntaMasOMenos from '../components/masOMenos/PreguntaMasOMenos'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'
import { useArranqueDirecto } from '../lib/arranqueDirecto'

// Cada comparación se decide en segundos: 90 s y +5 s por acierto. Las
// rondas se encadenan: el lugar nuevo pasa a ser el que hay que superar.
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 5
const REVEAL_MS = 3500 // las barras se leen rápido

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Diferencias claras: uno es al menos el doble que el otro', en: 'Clear differences: one is at least twice the other', ca: 'Diferències clares: un és com a mínim el doble que l’altre' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Más ajustado: entre un 30 % y el doble de diferencia', en: 'Closer calls: between 30% and twice as much', ca: 'Més ajustat: entre un 30 % i el doble de diferència' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Muy ajustado: hay que saberse los datos', en: 'Very close calls: you need to know your facts', ca: 'Molt ajustat: cal saber-se les dades' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[mas-o-menos] los niveles de la pantalla no coinciden con NIVELES')
}

export default function MasOMenos() {
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

  // encadenar: el lugar que acaba de salir es el «anterior» de la siguiente
  const next = useCallback((niv, encadenar = true) => {
    setRonda(prev => ({ ...genRonda(niv, { anterior: encadenar && prev ? { cat: prev.cat, id: prev.actual } : null }), uid: Math.random() }))
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
        type: 'juego', game: 'mas-o-menos', category: 'geografia-datos',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('mas-o-menos', { score: pts }),
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
    title: tr({ es: '¿Más o Menos? — Juego de geografía: población, superficie, montañas y ríos', en: 'More or Less? — Geography game: population, area, mountains and rivers', ca: 'Més o Menys? — Joc de geografia: població, superfície, muntanyes i rius' }),
    desc: tr({
      es: 'Juego de geografía: ¿Portugal tiene más o menos habitantes que Cataluña? ¿El Teide es más alto que el Kilimanjaro? Compara población, superficie, montañas y ríos, mezclando España y el mundo, y encadena aciertos. Gratis.',
      en: 'Geography game: does Portugal have more or fewer people than Catalonia? Is Teide higher than Kilimanjaro? Compare population, area, mountains and rivers, mixing Spain and the world, and build a streak. Free.',
      ca: 'Joc de geografia: Portugal té més o menys habitants que Catalunya? El Teide és més alt que el Kilimanjaro? Compara població, superfície, muntanyes i rius, barrejant Espanya i el món, i encadena encerts. Gratis.',
    }),
    path: '/juegos/mas-o-menos',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  // Desde la cuadrícula de juegos se entra jugando (ver lib/arranqueDirecto)
  useArranqueDirecto(startGame)

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="mas-o-menos"
            badge={tr({ es: 'Geografía · Población y relieve', en: 'Geography · Population and landscape', ca: 'Geografia · Població i relleu' })}
            titulo={tr({ es: '🆚 ¿Más o Menos?', en: '🆚 More or Less?', ca: '🆚 Més o Menys?' })}
            sub={tr({ es: 'Habitantes, superficie, montañas y ríos: ¿más o menos?', en: 'People, area, mountains and rivers: more or less?', ca: 'Habitants, superfície, muntanyes i rius: més o menys?' })} />

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
              <p>{tr({ es: 'Sale un dato conocido, por ejemplo Cataluña: 8,0 millones de habitantes, y otro lugar: ¿tiene más o menos? Al responder ves su dato con una barra para comparar, y ese pasa a ser el que hay que superar. Cada pocas rondas cambia lo que se compara: población, superficie, altura de montañas o longitud de ríos.', en: 'A known figure appears, for example Catalonia: 8.0 million people, and then another place: more or fewer? When you answer you see its figure with a bar to compare, and that one becomes the one to beat. Every few rounds the measure changes: population, area, mountain height or river length.', ca: 'Surt una dada coneguda, per exemple Catalunya: 8,0 milions d’habitants, i un altre lloc: en té més o menys? En respondre veus la seva dada amb una barra per comparar, i aquest passa a ser el que cal superar. Cada poques rondes canvia el que es compara: població, superfície, altura de muntanyes o longitud de rius.' })}</p>
              <p>{tr({ es: 'Las cifras son aproximadas (2024) y solo se comparan lugares con suficiente diferencia para que no haya dudas. En población no salen ciudades, porque contar el municipio o el área metropolitana cambia mucho el resultado.', en: 'The figures are approximate (2024) and only places with a clear enough difference are compared, so there is no doubt. Cities are left out of population, because counting the city proper or the whole metropolitan area changes the result a lot.', ca: 'Les xifres són aproximades (2024) i només es comparen llocs amb prou diferència perquè no hi hagi dubtes. En població no hi surten ciutats, perquè comptar el municipi o l’àrea metropolitana canvia molt el resultat.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 4 ? 'Buen comienzo' : aciertos < 8 ? '¡Sabes mucho del mundo!' : '¡Enciclopedia andante!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 4 ? 'Good start' : aciertos < 8 ? 'You know your world!' : 'Walking encyclopedia!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 4 ? 'Bon començament' : aciertos < 8 ? 'Saps molt del món!' : 'Enciclopèdia ambulant!',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} seguidas en ¿Más o Menos? de Tuthor 🆚 — ¿puedes superarme? https://tuthor.es/juegos/mas-o-menos`,
      en: `I got ${aciertos} right in More or Less? on Tuthor 🆚 — can you beat me? https://tuthor.es/en/juegos/mas-o-menos`,
      ca: `He encertat ${aciertos} a Més o Menys? de Tuthor 🆚 — em pots superar? https://tuthor.es/ca/juegos/mas-o-menos`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="mas-o-menos" emoji="🆚" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaMasOMenos key={ronda.uid} ronda={ronda} revelado={isResult} onResponder={responder} />
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
