import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/recetaQuimica'
import PreguntaReceta from '../components/recetaQuimica/PreguntaReceta'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 5000 // da tiempo a ver la ecuación resuelta y la cuenta

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Masa molar, gramos a moles y proporciones sencillas', en: 'Molar mass, grams to moles and simple ratios', ca: 'Massa molar, grams a mols i proporcions senzilles' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Proporciones con los coeficientes, Avogadro y de gramos a gramos', en: 'Ratios with coefficients, Avogadro and grams to grams', ca: 'Proporcions amb els coeficients, Avogadro i de grams a grams' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'De gramos a gramos y el reactivo limitante', en: 'Grams to grams and the limiting reactant', ca: 'De grams a grams i el reactiu limitant' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[receta-quimica] los niveles de la pantalla no coinciden con NIVELES')
}

export default function RecetaQuimica() {
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
        type: 'juego', game: 'receta-quimica', category: 'estequiometria',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('receta-quimica', { score: pts }),
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
    title: tr({ es: 'La Receta Química — Juego de estequiometría: moles, masa molar y reactivo limitante', en: 'The Chemical Recipe — Stoichiometry game: moles, molar mass and limiting reactant', ca: 'La Recepta Química — Joc d’estequiometria: mols, massa molar i reactiu limitant' }),
    desc: tr({
      es: 'La reacción ajustada como receta: masa molar, de gramos a moles, proporciones con los coeficientes, de gramos a gramos, número de Avogadro y reactivo limitante, con la cuenta explicada. Juego de química gratis.',
      en: 'The balanced reaction as a recipe: molar mass, grams to moles, ratios from coefficients, grams to grams, Avogadro’s number and the limiting reactant, with the working explained. Free chemistry game.',
      ca: 'La reacció ajustada com a recepta: massa molar, de grams a mols, proporcions amb els coeficients, de grams a grams, nombre d’Avogadro i reactiu limitant, amb el compte explicat. Joc de química gratis.',
    }),
    path: '/juegos/receta-quimica',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="receta-quimica"
            badge={tr({ es: 'Química · Estequiometría', en: 'Chemistry · Stoichiometry', ca: 'Química · Estequiometria' })}
            titulo={tr({ es: '🥣 La Receta Química', en: '🥣 The Chemical Recipe', ca: '🥣 La Recepta Química' })}
            sub={tr({ es: 'Una reacción ajustada es una receta: aprende a seguirla con moles', en: 'A balanced reaction is a recipe: learn to follow it in moles', ca: 'Una reacció ajustada és una recepta: aprèn a seguir-la amb mols' })} />

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
              <p>{tr({ es: 'Una reacción ajustada es como una receta: 2 H₂ + O₂ → 2 H₂O dice que 2 moles de hidrógeno reaccionan con 1 de oxígeno y dan 2 de agua. Los coeficientes hablan de moles, no de gramos.', en: 'A balanced reaction is like a recipe: 2 H₂ + O₂ → 2 H₂O says 2 moles of hydrogen react with 1 of oxygen to give 2 of water. The coefficients are about moles, not grams.', ca: 'Una reacció ajustada és com una recepta: 2 H₂ + O₂ → 2 H₂O diu que 2 mols d’hidrogen reaccionen amb 1 d’oxigen i en donen 2 d’aigua. Els coeficients parlen de mols, no de grams.' })}</p>
              <p>{tr({ es: 'Sale la ecuación con el dato debajo de una sustancia y un «?» bajo la que se busca. Para pasar de gramos a moles se divide entre la masa molar; para pasar de una sustancia a otra se usan los coeficientes; y para volver a gramos se multiplica por la masa molar.', en: 'The equation appears with the data under one substance and a «?» under the one you want. To go from grams to moles divide by the molar mass; to go from one substance to another use the coefficients; and to get back to grams multiply by the molar mass.', ca: 'Surt l’equació amb la dada sota una substància i un «?» sota la que es busca. Per passar de grams a mols es divideix per la massa molar; per passar d’una substància a una altra es fan servir els coeficients; i per tornar a grams es multiplica per la massa molar.' })}</p>
              <p>{tr({ es: 'En el nivel difícil, el reactivo limitante: el que se acaba primero según la receta, que no tiene por qué ser el que hay en menor cantidad.', en: 'On the hard level, the limiting reactant: the one that runs out first according to the recipe, which is not necessarily the one there is least of.', ca: 'Al nivell difícil, el reactiu limitant: el que s’acaba primer segons la recepta, que no ha de ser per força el que hi ha en menys quantitat.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Te sale la receta!' : '¡Chef de laboratorio! 🥣',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'You have got the recipe!' : 'Lab chef! 🥣',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Et surt la recepta!' : 'Xef de laboratori! 🥣',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} de estequiometría en La Receta Química de Tuthor 🥣 — ¿puedes superarme? https://tuthor.es/juegos/receta-quimica`,
      en: `I got ${aciertos} stoichiometry questions right in The Chemical Recipe on Tuthor 🥣 — can you beat me? https://tuthor.es/juegos/receta-quimica`,
      ca: `He encertat ${aciertos} d’estequiometria a La Recepta Química de Tuthor 🥣 — em pots superar? https://tuthor.es/juegos/receta-quimica`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="receta-quimica" emoji="🥣" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaReceta key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
