import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/escalaUniverso'
import PreguntaEscala from '../components/escalaUniverso/PreguntaEscala'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 4500 // da tiempo a ver el objeto en la regla y la cuenta

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Números grandes en notación científica, propiedades del producto y el cociente', en: 'Big numbers in scientific notation, product and quotient rules', ca: 'Nombres grans en notació científica, propietats del producte i el quocient' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'También números pequeños, comparar tamaños y potencia de una potencia', en: 'Small numbers too, comparing sizes and power of a power', ca: 'També nombres petits, comparar mides i potència d’una potència' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Operar en notación científica y cuántas veces mayor es una cosa que otra', en: 'Calculating in scientific notation and how many times bigger one thing is', ca: 'Operar en notació científica i quantes vegades més gran és una cosa que una altra' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[escala-universo] los niveles de la pantalla no coinciden con NIVELES')
}

export default function EscalaUniverso() {
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
        type: 'juego', game: 'escala-universo', category: 'potencias',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('escala-universo', { score: pts }),
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
    title: tr({ es: 'Escala del Universo — Juego de potencias y notación científica', en: 'Universe Scale — Powers and scientific notation game', ca: 'Escala de l’Univers — Joc de potències i notació científica' }),
    desc: tr({
      es: 'Del átomo a la Vía Láctea en una regla de potencias de 10: escribe tamaños reales en notación científica, compáralos, aplica las propiedades de las potencias y opera con exponentes. Juego de matemáticas gratis.',
      en: 'From the atom to the Milky Way on a powers-of-10 ruler: write real sizes in scientific notation, compare them, use the laws of indices and calculate with exponents. Free maths game.',
      ca: 'De l’àtom a la Via Làctia en un regle de potències de 10: escriu mides reals en notació científica, compara-les, aplica les propietats de les potències i opera amb exponents. Joc de matemàtiques gratis.',
    }),
    path: '/juegos/escala-universo',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="escala-universo"
            badge={tr({ es: 'Matemáticas · Potencias', en: 'Maths · Powers', ca: 'Matemàtiques · Potències' })}
            titulo={tr({ es: '🔭 Escala del Universo', en: '🔭 Universe Scale', ca: '🔭 Escala de l’Univers' })}
            sub={tr({ es: 'Del átomo a la galaxia, en potencias de 10', en: 'From the atom to the galaxy, in powers of 10', ca: 'De l’àtom a la galàxia, en potències de 10' })} />

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
              <p>{tr({ es: 'Sale una regla de potencias de 10 que va de 10⁻¹⁰ m (un átomo) a 10²¹ m (la Vía Láctea), con objetos reales en su sitio. Cada marca es diez veces la anterior. El objeto de la pregunta se oculta hasta que respondes, porque su posición daría el exponente.', en: 'A powers-of-10 ruler appears, from 10⁻¹⁰ m (an atom) to 10²¹ m (the Milky Way), with real objects in place. Each mark is ten times the one before. The object in the question stays hidden until you answer, because its position would give away the exponent.', ca: 'Surt un regle de potències de 10 que va de 10⁻¹⁰ m (un àtom) a 10²¹ m (la Via Làctia), amb objectes reals al seu lloc. Cada marca és deu vegades l’anterior. L’objecte de la pregunta s’amaga fins que respons, perquè la seva posició donaria l’exponent.' })}</p>
              <p>{tr({ es: 'En notación científica se escribe una cifra antes de la coma y una potencia de 10: 12 700 000 = 1,27 · 10⁷. «12,7 · 10⁶» vale lo mismo, pero no está en notación científica. Los números pequeños llevan exponente negativo: 0,000008 = 8 · 10⁻⁶.', en: 'In scientific notation you write one digit before the point and a power of 10: 12,700,000 = 1.27 × 10⁷. “12.7 × 10⁶” is worth the same, but it is not scientific notation. Small numbers have a negative exponent: 0.000008 = 8 × 10⁻⁶.', ca: 'En notació científica s’escriu una xifra abans de la coma i una potència de 10: 12 700 000 = 1,27 · 10⁷. «12,7 · 10⁶» val el mateix, però no és notació científica. Els nombres petits porten exponent negatiu: 0,000008 = 8 · 10⁻⁶.' })}</p>
              <p>{tr({ es: 'Las propiedades: al multiplicar potencias de la misma base se suman los exponentes; al dividir, se restan; en una potencia de una potencia, se multiplican. Y a⁰ = 1, y a⁻ⁿ = 1/aⁿ (no es negativo).', en: 'The rules: multiplying powers with the same base adds the exponents; dividing subtracts them; a power of a power multiplies them. And a⁰ = 1, and a⁻ⁿ = 1/aⁿ (it is not negative).', ca: 'Les propietats: en multiplicar potències de la mateixa base se sumen els exponents; en dividir, es resten; en una potència d’una potència, es multipliquen. I a⁰ = 1, i a⁻ⁿ = 1/aⁿ (no és negatiu).' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Dominas los exponentes!' : '¡De escala astronómica! 🔭',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'You have the exponents sorted!' : 'Astronomical! 🔭',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Domines els exponents!' : 'D’escala astronòmica! 🔭',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} de potencias en Escala del Universo de Tuthor 🔭 — ¿puedes superarme? https://tuthor.es/juegos/escala-universo`,
      en: `I got ${aciertos} powers questions right in Universe Scale on Tuthor 🔭 — can you beat me? https://tuthor.es/juegos/escala-universo`,
      ca: `He encertat ${aciertos} de potències a Escala de l’Univers de Tuthor 🔭 — em pots superar? https://tuthor.es/juegos/escala-universo`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="escala-universo" emoji="🔭" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaEscala key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
