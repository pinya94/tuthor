import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/comaAComa'
import PreguntaComa from '../components/comaAComa/PreguntaComa'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Tres frases por ronda: 90 s y +6 s por acierto.
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 6
const REVEAL_MS = 4500 // da tiempo a ver la frase puntuada y la regla

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Vocativos, enumeraciones, ¿preguntas? y ¡exclamaciones!', en: 'Vocatives, lists, questions and exclamations', ca: 'Vocatius, enumeracions, preguntes i exclamacions' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Incisos, conectores, dos puntos y la coma que sobra', en: 'Asides, connectors, colons and the comma that should not be there', ca: 'Incisos, connectors, dos punts i la coma que sobra' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Punto y coma, verbo omitido y el porqué de cada signo', en: 'Semicolons, omitted verbs and the reason for each mark', ca: 'Punt i coma, verb omès i el perquè de cada signe' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[coma-a-coma] los niveles de la pantalla no coinciden con NIVELES')
}

export default function ComaAComa() {
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
        type: 'juego', game: 'coma-a-coma', category: 'puntuacion',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('coma-a-coma', { score: pts }),
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
    title: tr({ es: 'Coma a Coma — Juego de puntuación: la coma, el punto y coma, los dos puntos y ¿?¡!', en: 'Coma a Coma — Spanish punctuation game', ca: 'Coma a Coma — Joc de puntuació castellana' }),
    desc: tr({
      es: 'Frases con un hueco: ¿coma, punto y coma, dos puntos o nada? Vocativos, enumeraciones, incisos, conectores, la coma prohibida entre sujeto y verbo y los signos de apertura ¿ y ¡, con la regla de la RAE explicada. Juego de lengua gratis.',
      en: 'Spanish sentences with a gap: comma, semicolon, colon or nothing? With the rule explained. Free Spanish language game.',
      ca: 'Frases en castellà amb un buit: coma, punt i coma, dos punts o res? Amb la regla explicada. Joc de llengua gratis.',
    }),
    path: '/juegos/coma-a-coma',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="coma-a-coma"
            badge={tr({ es: 'Lengua · La puntuación', en: 'Spanish · Punctuation', ca: 'Castellà · La puntuació' })}
            titulo={tr({ es: '🖋️ Coma a Coma', en: '🖋️ Coma a Coma', ca: '🖋️ Coma a Coma' })}
            sub={tr({ es: 'Una coma puede cambiarlo todo: ¿cuál va en el hueco?', en: 'One comma can change everything: which mark fills the gap?', ca: 'Una coma ho pot canviar tot: quin signe va al buit?' })} />

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
              <p>{tr({ es: 'Salen tres frases con huecos. Toca cada hueco para ir cambiando el signo (coma, punto y coma, dos puntos, punto… o «–», ninguno, porque a veces lo correcto es no poner nada) y comprueba cuando estén las tres. En las preguntas y exclamaciones el hueco de apertura y el de cierre cambian a la vez.', en: 'A sentence appears with a gap and four options: comma, semicolon, colon, full stop… or nothing, because sometimes the right answer is no mark at all. Questions and exclamations have two gaps: the opening and the closing mark.', ca: 'Surt una frase amb un buit i quatre opcions: coma, punt i coma, dos punts, punt… o res, perquè de vegades el correcte és no posar cap signe. A les preguntes i exclamacions hi ha dos buits: el d’obertura i el de tancament.' })}</p>
              <p>{tr({ es: 'Al corregir aparece la frase bien puntuada y la regla que se aplica. En los niveles altos también hay que decir por qué va ahí un signo: vocativo, inciso, conector, verbo omitido…', en: 'When you answer, the correctly punctuated sentence appears with the rule that applies. On the higher levels you also say why a mark goes there.', ca: 'En corregir apareix la frase ben puntuada i la regla que s’aplica. Als nivells alts també cal dir per què hi va un signe.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Puntúas de maravilla!' : '¡Ni una coma de más! 🖋️',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Great punctuation!' : 'Not a comma out of place! 🖋️',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Puntues de meravella!' : 'Ni una coma de més! 🖋️',
    })
    const shareText = tr({
      es: `He puntuado bien ${aciertos} frases en Coma a Coma de Tuthor 🖋️ — ¿puedes superarme? https://tuthor.es/juegos/coma-a-coma`,
      en: `I punctuated ${aciertos} sentences correctly in Coma a Coma on Tuthor 🖋️ — can you beat me? https://tuthor.es/juegos/coma-a-coma`,
      ca: `He puntuat bé ${aciertos} frases a Coma a Coma de Tuthor 🖋️ — em pots superar? https://tuthor.es/juegos/coma-a-coma`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="coma-a-coma" emoji="🖋️" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaComa key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
