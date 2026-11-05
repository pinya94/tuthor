import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/bajoPresion'
import PreguntaGas from '../components/bajoPresion/PreguntaGas'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Cada ronda es una cuenta con una ley de los gases: 150 s y +8 s por acierto.
const GAME_TIME = 150
const WRONG_TIME = 5
const CORRECT_TIME = 8
const REVEAL_MS = 6500 // da tiempo a leer la cuenta

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Boyle, Charles y Gay-Lussac con temperaturas en kelvin', en: 'Boyle, Charles and Gay-Lussac with temperatures in kelvin', ca: 'Boyle, Charles i Gay-Lussac amb temperatures en kelvin' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Temperaturas en °C que hay que pasar a kelvin y la ley combinada', en: 'Temperatures in °C to convert to kelvin, and the combined law', ca: 'Temperatures en °C que cal passar a kelvin i la llei combinada' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Ley combinada y gases ideales: P·V = n·R·T (1.º de Bachillerato)', en: 'Combined law and ideal gases: P·V = n·R·T', ca: 'Llei combinada i gasos ideals: P·V = n·R·T (1r de Batxillerat)' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[bajo-presion] los niveles de la pantalla no coinciden con NIVELES')
}

export default function BajoPresion() {
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
        type: 'juego', game: 'bajo-presion', category: 'estados-materia',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('bajo-presion', { score: pts }),
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
    title: tr({ es: 'Bajo Presión — Juego de las leyes de los gases: Boyle, Charles, Gay-Lussac y PV = nRT', en: 'Under Pressure — Gas laws game: Boyle, Charles, Gay-Lussac and PV = nRT', ca: 'Sota Pressió — Joc de les lleis dels gasos: Boyle, Charles, Gay-Lussac i PV = nRT' }),
    desc: tr({
      es: 'Juego de las leyes de los gases para ESO y Bachillerato: mueve el émbolo, el manómetro o el termómetro hasta el valor que dan Boyle, Charles, Gay-Lussac o PV = nRT. Con °C que pasar a kelvin y cada cuenta explicada. Gratis.',
      en: 'Gas laws game: move the piston, the pressure gauge or the thermometer to the value given by Boyle, Charles, Gay-Lussac or PV = nRT. With °C to convert to kelvin and every calculation explained. Free.',
      ca: 'Joc de les lleis dels gasos per a ESO i Batxillerat: mou l’èmbol, el manòmetre o el termòmetre fins al valor que donen Boyle, Charles, Gay-Lussac o PV = nRT. Amb °C per passar a kelvin i cada compte explicat. Gratis.',
    }),
    path: '/juegos/bajo-presion',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="bajo-presion"
            badge={tr({ es: 'Química · Leyes de los gases', en: 'Chemistry · Gas laws', ca: 'Química · Lleis dels gasos' })}
            titulo={tr({ es: '🎈 Bajo Presión', en: '🎈 Under Pressure', ca: '🎈 Sota Pressió' })}
            sub={tr({ es: 'Aprieta, calienta y descubre qué hace el gas', en: 'Squeeze it, heat it and work out what the gas does', ca: 'Prem, escalfa i descobreix què fa el gas' })} />

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
              <p>{tr({ es: 'Un gas encerrado tiene presión (P), volumen (V) y temperatura (T). Si la temperatura no cambia, al apretar sube la presión y baja el volumen (ley de Boyle: P·V se mantiene). Si la presión no cambia, al calentar el gas se expande (ley de Charles). Y si el volumen no cambia, al calentar sube la presión (ley de Gay-Lussac).', en: 'A trapped gas has a pressure (P), a volume (V) and a temperature (T). If the temperature stays the same, squeezing raises the pressure and lowers the volume (Boyle’s law: P·V stays constant). If the pressure stays the same, heating makes the gas expand (Charles’s law). And if the volume stays the same, heating raises the pressure (Gay-Lussac’s law).', ca: 'Un gas tancat té pressió (P), volum (V) i temperatura (T). Si la temperatura no canvia, en prémer puja la pressió i baixa el volum (llei de Boyle: P·V es manté). Si la pressió no canvia, en escalfar el gas s’expandeix (llei de Charles). I si el volum no canvia, en escalfar puja la pressió (llei de Gay-Lussac).' })}</p>
              <p>{tr({ es: 'En todas las fórmulas la temperatura va en kelvin: K = °C + 273. Con °C sale mal (y a 0 °C dividirías entre cero). En el nivel difícil aparece la ecuación de los gases ideales, P·V = n·R·T, con R = 0,082 atm·L/(mol·K).', en: 'In every formula temperature goes in kelvin: K = °C + 273. Using °C gives the wrong answer (and at 0 °C you would divide by zero). The hard level brings in the ideal gas equation, P·V = n·R·T, with R = 0.082 atm·L/(mol·K).', ca: 'En totes les fórmules la temperatura va en kelvin: K = °C + 273. Amb °C surt malament (i a 0 °C dividiries entre zero). Al nivell difícil apareix l’equació dels gasos ideals, P·V = n·R·T, amb R = 0,082 atm·L/(mol·K).' })}</p>
              <p>{tr({ es: 'El émbolo marca el volumen, la aguja del manómetro la presión y el termómetro la temperatura; las partículas se mueven más deprisa cuanto más caliente está el gas.', en: 'The piston shows the volume, the gauge needle the pressure and the thermometer the temperature; the particles move faster the hotter the gas is.', ca: 'L’èmbol marca el volum, l’agulla del manòmetre la pressió i el termòmetre la temperatura; les partícules es mouen més de pressa com més calent és el gas.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Buena presión!' : '¡Maestro de los gases!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Handling the pressure!' : 'Master of gases!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Bona pressió!' : 'Mestre dels gasos!',
    })
    const shareText = tr({
      es: `He resuelto ${aciertos} problemas de gases en Tuthor 🎈 — ¿puedes superarme? https://tuthor.es/juegos/bajo-presion`,
      en: `I solved ${aciertos} gas law problems on Tuthor 🎈 — can you beat me? https://tuthor.es/en/juegos/bajo-presion`,
      ca: `He resolt ${aciertos} problemes de gasos a Tuthor 🎈 — em pots superar? https://tuthor.es/ca/juegos/bajo-presion`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="bajo-presion" emoji="🎈" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaGas key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
