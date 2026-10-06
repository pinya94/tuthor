import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/cicloRocas'
import PreguntaRocas from '../components/cicloRocas/PreguntaRocas'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 4500 // da tiempo a leer el proceso en el ciclo

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Los procesos del ciclo y los tres tipos de roca', en: 'The cycle’s processes and the three rock types', ca: 'Els processos del cicle i els tres tipus de roca' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'También: de qué roca viene cada metamórfica', en: 'Also: which rock each metamorphic one comes from', ca: 'També: de quina roca ve cada metamòrfica' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Plutónicas y volcánicas, clases de sedimentarias y rutas por el ciclo', en: 'Plutonic and volcanic, kinds of sedimentary rock and routes through the cycle', ca: 'Plutòniques i volcàniques, menes de sedimentàries i rutes pel cicle' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[ciclo-rocas] los niveles de la pantalla no coinciden con NIVELES')
}

export default function CicloRocas() {
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
    setRonda(prev => genRonda(niv, { evitar: prev?.clave }))
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
        type: 'juego', game: 'ciclo-rocas', category: 'rocas-minerales',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('ciclo-rocas', { score: pts }),
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
    title: tr({ es: 'Ciclo de las rocas — Juego de rocas ígneas, sedimentarias y metamórficas', en: 'The Rock Cycle — Igneous, sedimentary and metamorphic rocks game', ca: 'Cicle de les roques — Joc de roques ígnies, sedimentàries i metamòrfiques' }),
    desc: tr({
      es: 'El ciclo de las rocas y muestras de rocas reales: granito, basalto, pómez, caliza, arenisca, mármol, pizarra, gneis… Di qué proceso las transforma, de qué tipo son y de dónde vienen. Juego de geología gratis.',
      en: 'The rock cycle and samples of real rocks: granite, basalt, pumice, limestone, sandstone, marble, slate, gneiss… Say which process transforms them, what type they are and where they come from. Free geology game.',
      ca: 'El cicle de les roques i mostres de roques reals: granit, basalt, pedra tosca, calcària, gres, marbre, pissarra, gneis… Digues quin procés les transforma, de quin tipus són i d’on vénen. Joc de geologia gratis.',
    }),
    path: '/juegos/ciclo-rocas',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="ciclo-rocas"
            badge={tr({ es: 'Geología · Rocas y minerales', en: 'Geology · Rocks and minerals', ca: 'Geologia · Roques i minerals' })}
            titulo={tr({ es: '⛰️ Ciclo de las rocas', en: '⛰️ The Rock Cycle', ca: '⛰️ Cicle de les roques' })}
            sub={tr({ es: 'Magma, sedimentos y metamorfismo: cómo una roca se convierte en otra', en: 'Magma, sediments and metamorphism: how one rock becomes another', ca: 'Magma, sediments i metamorfisme: com una roca es converteix en una altra' })} />

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
              <p>{tr({ es: 'Las rocas no son eternas: cambian de una clase a otra en un ciclo que dura millones de años. El magma se enfría y forma rocas ígneas; el agua y el viento las rompen en sedimentos, que se compactan en rocas sedimentarias; la presión y el calor las transforman en metamórficas, y si se funden vuelven a ser magma.', en: 'Rocks are not eternal: they change from one kind to another in a cycle lasting millions of years. Magma cools into igneous rocks; water and wind break them into sediments, which are compacted into sedimentary rocks; pressure and heat turn them into metamorphic rocks, and if they melt they become magma again.', ca: 'Les roques no són eternes: canvien d’una mena a una altra en un cicle que dura milions d’anys. El magma es refreda i forma roques ígnies; l’aigua i el vent les trenquen en sediments, que es compacten en roques sedimentàries; la pressió i la calor les transformen en metamòrfiques, i si es fonen tornen a ser magma.' })}</p>
              <p>{tr({ es: 'Unas preguntas señalan una flecha del ciclo y hay que decir qué proceso es. Otras enseñan una muestra de roca con lo que se ve en ella: los cristales grandes delatan que se enfrió despacio bajo tierra, los agujeros de la pómez son burbujas de gas y las bandas del gneis, un granito aplastado.', en: 'Some questions mark an arrow in the cycle and you say which process it is. Others show a rock sample with what can be seen in it: large crystals reveal slow cooling underground, the holes in pumice are gas bubbles and the bands in gneiss are a squashed granite.', ca: 'Unes preguntes assenyalen una fletxa del cicle i cal dir quin procés és. D’altres ensenyen una mostra de roca amb el que s’hi veu: els cristalls grans delaten que es va refredar a poc a poc sota terra, els forats de la pedra tosca són bombolles de gas i les bandes del gneis, un granit aixafat.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Tienes ojo de geólogo!' : '¡Duro como el granito! ⛰️',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'You have a geologist’s eye!' : 'Hard as granite! ⛰️',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Tens ull de geòleg!' : 'Dur com el granit! ⛰️',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} preguntas del ciclo de las rocas en Tuthor ⛰️ — ¿puedes superarme? https://tuthor.es/juegos/ciclo-rocas`,
      en: `I got ${aciertos} rock cycle questions right on Tuthor ⛰️ — can you beat me? https://tuthor.es/juegos/ciclo-rocas`,
      ca: `He encertat ${aciertos} preguntes del cicle de les roques a Tuthor ⛰️ — em pots superar? https://tuthor.es/juegos/ciclo-rocas`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="ciclo-rocas" emoji="⛰️" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaRocas key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
