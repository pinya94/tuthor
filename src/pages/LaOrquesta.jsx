import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/laOrquesta'
import PreguntaOrquesta from '../components/laOrquesta/PreguntaOrquesta'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Cada ronda se coloca (sentar, unir, clasificar): 90 s y +6 s por acierto.
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 6
const REVEAL_MS = 4500 // da tiempo a leer cómo suena el instrumento

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Sienta a los músicos en la orquesta y une cada dibujo con su nombre', en: 'Seat the musicians and match each drawing with its name', ca: 'Seu els músics a l’orquestra i uneix cada dibuix amb el seu nom' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Y además, las subfamilias: cuerda frotada, pulsada o percutida…', en: 'Plus the subfamilies: bowed, plucked or struck strings…', ca: 'I a més, les subfamílies: corda fregada, pinçada o percudida…' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Cómo produce el sonido cada uno y Hornbostel-Sachs', en: 'How each one makes its sound, and Hornbostel-Sachs', ca: 'Com produeix el so cadascun i Hornbostel-Sachs' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[la-orquesta] los niveles de la pantalla no coinciden con NIVELES')
}

export default function LaOrquesta() {
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
        type: 'juego', game: 'la-orquesta', category: 'instrumentos',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('la-orquesta', { score: pts }),
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
    title: tr({ es: 'La Orquesta — Juego de instrumentos musicales y sus familias', en: 'The Orchestra — Musical instruments and their families game', ca: 'L’Orquestra — Joc d’instruments musicals i les seves famílies' }),
    desc: tr({
      es: 'Sienta a la orquesta: cada instrumento dibujado a su zona del plano, cuerda, viento madera, viento metal o percusión. Une dibujos y nombres y clasifícalos por cómo suenan. Juego de música gratis.',
      en: 'Seat the orchestra: each drawn instrument to its section, strings, woodwind, brass or percussion. Match drawings and names and sort them by how they sound. Free music game.',
      ca: 'Seu l’orquestra: cada instrument dibuixat a la seva zona, corda, vent fusta, vent metall o percussió. Uneix dibuixos i noms i classifica’ls per com sonen. Joc de música gratis.',
    }),
    path: '/juegos/la-orquesta',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="la-orquesta"
            badge={tr({ es: 'Música · Instrumentos', en: 'Music · Instruments', ca: 'Música · Instruments' })}
            titulo={tr({ es: '🎻 La Orquesta', en: '🎻 The Orchestra', ca: '🎻 L’Orquestra' })}
            sub={tr({ es: 'Sienta a cada músico en su sitio', en: 'Seat every musician in their place', ca: 'Seu cada músic al seu lloc' })} />

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
              <p>{tr({ es: 'Sienta a la orquesta: toca un instrumento dibujado y luego su zona del plano. La cuerda va junto al director, después el viento madera, el viento metal y, al fondo, la percusión. La familia no la decide el material: la flauta y el saxofón son de metal pero de viento madera, y el piano es de cuerda.', en: 'Seat the orchestra: tap a drawn instrument and then its section of the plan. Strings beside the conductor, then woodwind, brass and percussion at the back. Material does not decide the family: the flute is metal but woodwind, and the piano is a string instrument.', ca: 'Seu l’orquestra: toca un instrument dibuixat i després la seva zona del plànol. La corda va al costat del director, després el vent fusta, el vent metall i, al fons, la percussió. La família no la decideix el material.' })}</p>
              <p>{tr({ es: 'Otras rondas: unir cada dibujo con su nombre y clasificar los instrumentos por subfamilia, por cómo producen el sonido (arco, lengüeta, labios, macillos…) o según Hornbostel-Sachs (cordófonos, aerófonos, membranófonos e idiófonos).', en: 'Other rounds: match each drawing with its name and sort instruments by subfamily, by how they make their sound or by Hornbostel-Sachs.', ca: 'Altres rondes: unir cada dibuix amb el seu nom i classificar els instruments per subfamília, per com produeixen el so o segons Hornbostel-Sachs.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Buen oído!' : '¡Concertino! 🎻',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Good ear!' : 'Concertmaster! 🎻',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Bona orella!' : 'Concertino! 🎻',
    })
    const shareText = tr({
      es: `He reconocido ${aciertos} instrumentos en La Orquesta de Tuthor 🎻 — ¿puedes superarme? https://tuthor.es/juegos/la-orquesta`,
      en: `I recognised ${aciertos} instruments in The Orchestra on Tuthor 🎻 — can you beat me? https://tuthor.es/juegos/la-orquesta`,
      ca: `He reconegut ${aciertos} instruments a L’Orquestra de Tuthor 🎻 — em pots superar? https://tuthor.es/juegos/la-orquesta`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="la-orquesta" emoji="🎻" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaOrquesta key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
