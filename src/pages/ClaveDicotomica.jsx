import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/claveDicotomica'
import PreguntaClave from '../components/claveDicotomica/PreguntaClave'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 4200 // da tiempo a ver el camino bueno y el dato curioso

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Vertebrados: mamíferos, aves, peces, reptiles y anfibios', en: 'Vertebrates: mammals, birds, fish, reptiles and amphibians', ca: 'Vertebrats: mamífers, ocells, peixos, rèptils i amfibis' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Todos los animales: también insectos, arácnidos, moluscos, medusas…', en: 'All animals: insects, arachnids, molluscs, jellyfish too…', ca: 'Tots els animals: també insectes, aràcnids, mol·luscs, meduses…' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Animales y plantas: musgos, helechos, gimnospermas y angiospermas', en: 'Animals and plants: mosses, ferns, gymnosperms and angiosperms', ca: 'Animals i plantes: molses, falgueres, gimnospermes i angiospermes' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[clave-dicotomica] los niveles de la pantalla no coinciden con NIVELES')
}

export default function ClaveDicotomica() {
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
    setRonda(prev => genRonda(niv, { evitar: prev?.ser }))
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
        type: 'juego', game: 'clave-dicotomica', category: 'seres-vivos',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('clave-dicotomica', { score: pts }),
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
    title: tr({ es: 'Clave dicotómica — Juego para clasificar seres vivos', en: 'Dichotomous Key — Game to classify living things', ca: 'Clau dicotòmica — Joc per classificar éssers vius' }),
    desc: tr({
      es: 'Clasifica animales y plantas con una clave dicotómica, pregunta a pregunta: vertebrados, invertebrados, musgos, helechos y plantas con flor. Con las trampas del murciélago, el delfín o la araña. Juego de biología gratis.',
      en: 'Classify animals and plants with a dichotomous key, one question at a time: vertebrates, invertebrates, mosses, ferns and flowering plants. With the bat, dolphin and spider traps. Free biology game.',
      ca: 'Classifica animals i plantes amb una clau dicotòmica, pregunta a pregunta: vertebrats, invertebrats, molses, falgueres i plantes amb flor. Amb els paranys del ratpenat, el dofí o l’aranya. Joc de biologia gratis.',
    }),
    path: '/juegos/clave-dicotomica',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="clave-dicotomica"
            badge={tr({ es: 'Biología · Seres vivos', en: 'Biology · Living things', ca: 'Biologia · Éssers vius' })}
            titulo={tr({ es: '🔎 Clave dicotómica', en: '🔎 Dichotomous Key', ca: '🔎 Clau dicotòmica' })}
            sub={tr({ es: 'Lee sus rasgos y sigue la clave hasta su grupo', en: 'Read its features and follow the key to its group', ca: 'Llegeix-ne els trets i segueix la clau fins al seu grup' })} />

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
              <p>{tr({ es: 'Sale un ser vivo con sus rasgos: cómo es, cómo respira, cómo nacen sus crías. La clave te hace preguntas de sí o no, una detrás de otra, y cada respuesta te lleva por un camino hasta llegar a su grupo. Así clasifican los biólogos lo que encuentran en el campo.', en: 'A living thing appears with its features: what it looks like, how it breathes, how its young are born. The key asks yes-or-no questions, one after another, and each answer takes you down a path until you reach its group. That is how biologists classify what they find in the field.', ca: 'Surt un ésser viu amb els seus trets: com és, com respira, com neixen les seves cries. La clau et fa preguntes de sí o no, l’una darrere l’altra, i cada resposta et porta per un camí fins a arribar al seu grup. Així classifiquen els biòlegs el que troben al camp.' })}</p>
              <p>{tr({ es: 'Fíjate en los rasgos, no en la apariencia: el murciélago vuela pero sus crías maman leche, el delfín tiene aletas pero respira aire y la araña no es un insecto porque tiene 8 patas. Si fallas una pregunta, la ronda acaba y ves el camino bueno.', en: 'Look at the features, not the appearance: the bat flies but its young drink milk, the dolphin has fins but breathes air, and the spider is not an insect because it has 8 legs. If you get a question wrong, the round ends and you see the right path.', ca: 'Fixa’t en els trets, no en l’aparença: el ratpenat vola però les seves cries mamen llet, el dofí té aletes però respira aire i l’aranya no és un insecte perquè té 8 potes. Si falles una pregunta, la ronda s’acaba i veus el camí bo.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Buen ojo de naturalista!' : '¡Linneo estaría orgulloso! 🔎',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'A naturalist’s eye!' : 'Linnaeus would be proud! 🔎',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Bon ull de naturalista!' : 'Linné n’estaria orgullós! 🔎',
    })
    const shareText = tr({
      es: `He clasificado ${aciertos} seres vivos con la clave dicotómica de Tuthor 🔎 — ¿puedes superarme? https://tuthor.es/juegos/clave-dicotomica`,
      en: `I classified ${aciertos} living things with Tuthor’s dichotomous key 🔎 — can you beat me? https://tuthor.es/juegos/clave-dicotomica`,
      ca: `He classificat ${aciertos} éssers vius amb la clau dicotòmica de Tuthor 🔎 — em pots superar? https://tuthor.es/juegos/clave-dicotomica`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="clave-dicotomica" emoji="🔎" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaClave key={ronda.id} ronda={ronda} revelado={isResult} onResponder={responder} />
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
