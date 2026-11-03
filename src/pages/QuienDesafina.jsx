import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/quienDesafina'
import PreguntaDesafina from '../components/quienDesafina/PreguntaDesafina'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Cada ronda se construye (escuchar y elegir, afinar): 120 s y +8 s por acierto.
const GAME_TIME = 120
const WRONG_TIME = 5
const CORRECT_TIME = 8
const REVEAL_MS = 6000 // da tiempo a leer las frecuencias

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Desafinado casi un cuarto de tono (45-70 cents): solo hay que decir cuál', en: 'Out by nearly a quarter-tone (45-70 cents): just say which one', ca: 'Desafinat gairebé un quart de to (45-70 cents): només cal dir quin' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: '25-40 cents, si está alto o bajo, y afinar con la clavija (±8 cents)', en: '25-40 cents, sharp or flat, and tuning with the peg (±8 cents)', ca: '25-40 cents, si està alt o baix, i afinar amb la clavilla (±8 cents)' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Solo 12-22 cents: oído fino, y afinar a ±5 cents', en: 'Only 12-22 cents: a sharp ear, and tuning to ±5 cents', ca: 'Només 12-22 cents: orella fina, i afinar a ±5 cents' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[quien-desafina] los niveles de la pantalla no coinciden con NIVELES')
}

export default function QuienDesafina() {
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
        type: 'juego', game: 'quien-desafina', category: 'sonido',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('quien-desafina', { score: pts }),
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
    title: tr({ es: '¿Quién Desafina? — Juego de afinación: oído, frecuencias y cents', en: 'Who’s Out of Tune? — Tuning game: ear, frequencies and cents', ca: 'Qui Desafina? — Joc d’afinació: orella, freqüències i cents' }),
    desc: tr({
      es: 'Juego de afinación para entrenar el oído: tres instrumentos tocan la misma nota y uno desafina. Descubre cuál, si está alto o bajo, y afínalo con la clavija. Después verás sus frecuencias en hercios y cuántos cents se iba. Gratis.',
      en: 'Tuning game to train your ear: three instruments play the same note and one is out of tune. Find which, whether it is sharp or flat, and tune it with the peg. Then see the frequencies in hertz and how many cents it was out. Free.',
      ca: 'Joc d’afinació per entrenar l’orella: tres instruments toquen la mateixa nota i un desafina. Descobreix quin, si està alt o baix, i afina’l amb la clavilla. Després veuràs les freqüències en hertzs i quants cents se n’anava. Gratis.',
    }),
    path: '/juegos/quien-desafina',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="quien-desafina"
            badge={tr({ es: 'Música · El sonido', en: 'Music · Sound', ca: 'Música · El so' })}
            titulo={tr({ es: '🎶 ¿Quién Desafina?', en: '🎶 Who’s Out of Tune?', ca: '🎶 Qui Desafina?' })}
            sub={tr({ es: 'Afina el oído (mejor con auriculares)', en: 'Train your ear (headphones help)', ca: 'Afina l’orella (millor amb auriculars)' })} />

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
              <p>{tr({ es: 'Tres instrumentos tocan la misma nota y uno está desafinado. Toca cada uno para oírlo (tantas veces como quieras) y quédate con el que desafina; en medio y difícil, di también si está alto (más agudo) o bajo (más grave).', en: 'Three instruments play the same note and one is out of tune. Tap each one to hear it (as often as you like) and pick the one that is off; on medium and hard, also say whether it is sharp (higher) or flat (lower).', ca: 'Tres instruments toquen la mateixa nota i un està desafinat. Toca cadascun per sentir-lo (tantes vegades com vulguis) i queda’t amb el que desafina; en mitjà i difícil, digues també si està alt (més agut) o baix (més greu).' })}</p>
              <p>{tr({ es: 'Afinar: mueve la clavija del segundo instrumento hasta que suene igual que el primero. Tocados a la vez, si no están afinados se oyen «batidos», un temblor en el sonido que desaparece al afinar.', en: 'Tuning: move the second instrument’s peg until it sounds like the first. Played together, if they are out of tune you hear “beats”, a wobble in the sound that disappears once in tune.', ca: 'Afinar: mou la clavilla del segon instrument fins que soni igual que el primer. Tocats alhora, si no estan afinats se senten «batecs», un tremolor al so que desapareix en afinar.' })}</p>
              <p>{tr({ es: 'Al corregir verás las frecuencias: el La de referencia suena a 440 Hz, y la desafinación se mide en cents (100 cents son un semitono). Mejor con auriculares.', en: 'When it is marked you see the frequencies: the reference A is 440 Hz, and being out of tune is measured in cents (100 cents make a semitone). Headphones help.', ca: 'En corregir veuràs les freqüències: el La de referència sona a 440 Hz, i la desafinació es mesura en cents (100 cents són un semitò). Millor amb auriculars.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Buen oído!' : '¡Oído absoluto!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Good ear!' : 'Perfect pitch!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Bona orella!' : 'Orella absoluta!',
    })
    const shareText = tr({
      es: `He cazado ${aciertos} instrumentos desafinados en Tuthor 🎶 — ¿puedes superarme? https://tuthor.es/juegos/quien-desafina`,
      en: `I caught ${aciertos} out-of-tune instruments on Tuthor 🎶 — can you beat me? https://tuthor.es/en/juegos/quien-desafina`,
      ca: `He caçat ${aciertos} instruments desafinats a Tuthor 🎶 — em pots superar? https://tuthor.es/ca/juegos/quien-desafina`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="quien-desafina" emoji="🎶" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaDesafina key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
