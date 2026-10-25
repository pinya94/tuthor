import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/queLetra'
import PreguntaLetra from '../components/queLetra/PreguntaLetra'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Cuatro palabras por ronda: 90 s y +6 s por acierto.
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 6
const REVEAL_MS = 3400 // da tiempo a leer la regla, sin frenar el ritmo

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Las reglas básicas: mb, nv, -aba, -bir, -aje, hie-/hue-, -illo y el plural de z', en: 'The basic rules: mb, nv, -aba, -bir, -aje, hie-/hue-, -illo and the plural of z', ca: 'Les regles bàsiques: mb, nv, -aba, -bir, -aje, hie-/hue-, -illo i el plural de z' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Más reglas: -ivo, -bilidad, eva-, -jero, hum-, hidr-, y final', en: 'More rules: -ivo, -bilidad, eva-, -jero, hum-, hidr-, final y', ca: 'Més regles: -ivo, -bilidad, eva-, -jero, hum-, hidr-, y final' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Excepciones (vivir, tejer, movilidad), diéresis, h intercalada y verbos', en: 'Exceptions (vivir, tejer, movilidad), diaeresis, silent middle h and verbs', ca: 'Excepcions (vivir, tejer, movilidad), dièresi, h intercalada i verbs' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[que-letra] los niveles de la pantalla no coinciden con NIVELES')
}

export default function QueLetra() {
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
        type: 'juego', game: 'que-letra', category: 'letras',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('que-letra', { score: pts }),
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
    title: tr({ es: '¿Qué Letra Va? — Juego de ortografía: b/v, g/j, h, ll/y y c/z', en: 'Which Letter? — Spanish spelling game: b/v, g/j, h, ll/y and c/z', ca: 'Quina Lletra Va? — Joc d’ortografia castellana: b/v, g/j, h, ll/y i c/z' }),
    desc: tr({
      es: 'Juego de ortografía contra reloj: completa la palabra con b o v, g o j, h o sin h, ll o y, c o z, y aprende la regla de cada una con sus excepciones. Para Primaria y ESO, gratis.',
      en: 'Spanish spelling game against the clock: complete the word with b or v, g or j, h or no h, ll or y, c or z, and learn the rule for each with its exceptions. For primary and secondary, free.',
      ca: 'Joc d’ortografia castellana contra rellotge: completa la paraula amb b o v, g o j, h o sense h, ll o y, c o z, i aprèn la regla de cadascuna amb les excepcions. Per a Primària i ESO, gratis.',
    }),
    path: '/juegos/que-letra',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="que-letra"
            badge={tr({ es: 'Lengua · Ortografía', en: 'Spanish · Spelling', ca: 'Castellà · Ortografia' })}
            titulo={tr({ es: '🔠 ¿Qué Letra Va?', en: '🔠 Which Letter?', ca: '🔠 Quina Lletra Va?' })}
            sub={tr({ es: 'B o V, G o J, ¿con H o sin H?: la regla de cada palabra', en: 'B or V, G or J, with H or without? The rule behind each Spanish word', ca: 'B o V, G o J, amb H o sense H? La regla de cada paraula en castellà' })} />

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
              <p>{tr({ es: 'Salen cuatro palabras con un hueco. Toca cada hueco para cambiar la letra: b o v, g o j, h o nada, ll o y, c o z. Cuando estén las cuatro, compruebas: cada hueco se pinta en verde o rojo y aparece la regla que lo explica o el aviso de que es una excepción.', en: 'A Spanish word appears with a gap and you choose how it is spelt: b or v, g or j, with or without h, ll or y, c or z. When you answer, the gap fills in and the rule behind it appears, or a note that it is an exception.', ca: 'Surt una paraula en castellà amb un forat i cal triar com s’escriu: amb b o amb v, amb g o amb j, amb h o sense, amb ll o amb y, amb c o amb z. En respondre, el forat s’omple i apareix la regla que ho explica o l’avís que és una excepció.' })}</p>
              <p>{tr({ es: 'Las palabras están elegidas para que solo una forma sea correcta: no salen parejas como vaca y baca o tubo y tuvo, que existen las dos.', en: 'The words are chosen so only one spelling is correct: pairs like vaca/baca or tubo/tuvo, where both exist, never come up.', ca: 'Les paraules estan triades perquè només una forma sigui correcta: no surten parelles com vaca i baca o tubo i tuvo, que existeixen totes dues.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Buena ortografía!' : '¡Ni una falta! 🔠',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Good spelling!' : 'Not a single mistake! 🔠',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Bona ortografia!' : 'Ni una falta! 🔠',
    })
    const shareText = tr({
      es: `He escrito bien ${aciertos} palabras en ¿Qué Letra Va? de Tuthor 🔠 — ¿puedes superarme? https://tuthor.es/juegos/que-letra`,
      en: `I spelt ${aciertos} Spanish words right in Which Letter? on Tuthor 🔠 — can you beat me? https://tuthor.es/juegos/que-letra`,
      ca: `He escrit bé ${aciertos} paraules a Quina Lletra Va? de Tuthor 🔠 — em pots superar? https://tuthor.es/juegos/que-letra`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="que-letra" emoji="🔠" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaLetra key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
