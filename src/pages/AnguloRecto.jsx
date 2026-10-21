import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/anguloRecto'
import PreguntaTrigo from '../components/anguloRecto/PreguntaTrigo'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Se tocan lados, se rellena la tabla o se teclea: 90 s y +6 s por acierto.
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 6
const REVEAL_MS = 4800 // da tiempo a ver los lados coloreados y la cuenta

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Monta seno, coseno y tangente tocando los lados, nómbralos y Pitágoras', en: 'Build sine, cosine and tangent by tapping sides, name them, and Pythagoras', ca: 'Munta sinus, cosinus i tangent tocant els costats, anomena’ls i Pitàgores' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Teclea un lado con la calculadora y completa la tabla de 30°, 45° y 60°', en: 'Type a side using a calculator and complete the 30°, 45° and 60° table', ca: 'Tecleja un costat amb la calculadora i completa la taula de 30°, 45° i 60°' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Calcula ángulos y resuelve problemas: escaleras, sombras, cometas y rampas', en: 'Work out angles and solve problems: ladders, shadows, kites and ramps', ca: 'Calcula angles i resol problemes: escales, ombres, estels i rampes' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[angulo-recto] los niveles de la pantalla no coinciden con NIVELES')
}

export default function AnguloRecto() {
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
        type: 'juego', game: 'angulo-recto', category: 'trigonometria',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('angulo-recto', { score: pts }),
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
    title: tr({ es: 'Ángulo Recto — Juego de trigonometría: seno, coseno y tangente', en: 'Right Angle — Trigonometry game: sine, cosine and tangent', ca: 'Angle Recte — Joc de trigonometria: sinus, cosinus i tangent' }),
    desc: tr({
      es: 'Triángulos rectángulos dibujados a escala para practicar trigonometría: seno, coseno y tangente, cateto opuesto y contiguo, Pitágoras, ángulos de 30°, 45° y 60°, calcular lados y ángulos y problemas. Juego de matemáticas gratis.',
      en: 'Right-angled triangles drawn to scale to practise trigonometry: sine, cosine and tangent, opposite and adjacent sides, Pythagoras, 30°, 45° and 60° angles, finding sides and angles, and word problems. Free maths game.',
      ca: 'Triangles rectangles dibuixats a escala per practicar trigonometria: sinus, cosinus i tangent, catet oposat i contigu, Pitàgores, angles de 30°, 45° i 60°, calcular costats i angles i problemes. Joc de matemàtiques gratis.',
    }),
    path: '/juegos/angulo-recto',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="angulo-recto"
            badge={tr({ es: 'Matemáticas · Trigonometría', en: 'Maths · Trigonometry', ca: 'Matemàtiques · Trigonometria' })}
            titulo={tr({ es: '📐 Ángulo Recto', en: '📐 Right Angle', ca: '📐 Angle Recte' })}
            sub={tr({ es: 'Seno, coseno y tangente sin liarte con los catetos', en: 'Sine, cosine and tangent without mixing up the sides', ca: 'Sinus, cosinus i tangent sense embolicar-te amb els catets' })} />

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
              <p>{tr({ es: 'Sale un triángulo rectángulo dibujado a escala, con el ángulo α marcado unas veces abajo y otras arriba. Para ese ángulo, la hipotenusa es el lado largo, enfrente del ángulo recto; el cateto opuesto, el que está delante de α; y el contiguo, el que toca α sin ser la hipotenusa. Si α cambia de vértice, opuesto y contiguo se intercambian.', en: 'A right-angled triangle drawn to scale appears, with angle α marked sometimes at the bottom and sometimes at the top. For that angle, the hypotenuse is the long side, opposite the right angle; the opposite side faces α; and the adjacent side touches α without being the hypotenuse. If α moves to the other corner, opposite and adjacent swap.', ca: 'Surt un triangle rectangle dibuixat a escala, amb l’angle α marcat unes vegades a baix i d’altres a dalt. Per a aquest angle, la hipotenusa és el costat llarg, davant de l’angle recte; el catet oposat, el que hi ha davant d’α; i el contigu, el que toca α sense ser la hipotenusa. Si α canvia de vèrtex, oposat i contigu s’intercanvien.' })}</p>
              <p>{tr({ es: 'Seno = opuesto ÷ hipotenusa; coseno = contiguo ÷ hipotenusa; tangente = opuesto ÷ contiguo. Para calcular un lado, elige la razón que une el lado que tienes con el que buscas; para un ángulo, usa la razón inversa de la calculadora (sen⁻¹, cos⁻¹, tan⁻¹).', en: 'Sine = opposite ÷ hypotenuse; cosine = adjacent ÷ hypotenuse; tangent = opposite ÷ adjacent. To find a side, pick the ratio that links the side you have with the one you want; for an angle, use the inverse ratio on the calculator (sin⁻¹, cos⁻¹, tan⁻¹).', ca: 'Sinus = oposat ÷ hipotenusa; cosinus = contigu ÷ hipotenusa; tangent = oposat ÷ contigu. Per calcular un costat, tria la raó que uneix el costat que tens amb el que busques; per a un angle, fes servir la raó inversa de la calculadora (sin⁻¹, cos⁻¹, tg⁻¹).' })}</p>
              <p>{tr({ es: 'No hay opciones: montas la razón tocando el lado de arriba y el de abajo de la fracción, tocas cada lado para ponerle su nombre, rellenas la tabla de 30°, 45° y 60° o tecleas el resultado. Al responder, cada lado se colorea con su nombre respecto de α: hipotenusa en amarillo, opuesto en rosa y contiguo en azul. En los problemas (una escalera, una sombra, una cometa) el triángulo solo aparece al corregir: dibujarlo es parte del ejercicio.', en: 'There are no options: you build the ratio by tapping the top and bottom sides of the fraction, tap each side to name it, fill in the 30°, 45° and 60° table or type the result. When you answer, each side is coloured with its name relative to α: hypotenuse in yellow, opposite in pink and adjacent in blue. In the word problems (a ladder, a shadow, a kite) the triangle only appears when you answer: drawing it is part of the exercise.', ca: 'No hi ha opcions: muntes la raó tocant el costat de dalt i el de baix de la fracció, toques cada costat per posar-li el nom, omples la taula de 30°, 45° i 60° o tecleges el resultat. En respondre, cada costat es pinta amb el seu nom respecte d’α: hipotenusa en groc, oposat en rosa i contigu en blau. Als problemes (una escala, una ombra, un estel) el triangle només apareix en corregir: dibuixar-lo és part de l’exercici.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Ya no te lías con los catetos!' : '¡Trigonometría de 90°! 📐',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'No more mixing up the sides!' : 'Trigonometry at 90°! 📐',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Ja no t’embolices amb els catets!' : 'Trigonometria de 90°! 📐',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} de trigonometría en Ángulo Recto de Tuthor 📐 — ¿puedes superarme? https://tuthor.es/juegos/angulo-recto`,
      en: `I got ${aciertos} trigonometry questions right in Right Angle on Tuthor 📐 — can you beat me? https://tuthor.es/juegos/angulo-recto`,
      ca: `He encertat ${aciertos} de trigonometria a Angle Recte de Tuthor 📐 — em pots superar? https://tuthor.es/juegos/angulo-recto`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="angulo-recto" emoji="📐" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaTrigo key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
