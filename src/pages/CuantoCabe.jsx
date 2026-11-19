import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/cuantoCabe'
import PreguntaCuantoCabe from '../components/cuantoCabe/PreguntaCuantoCabe'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'
import { useArranqueDirecto } from '../lib/arranqueDirecto'

// Estas cuentas se hacen en papel: contar cubitos es rápido; un cono o el
// área de un cilindro, casi un minuto. El reloj da para pensar, no para correr
// (y se para mientras se lee la corrección).
const TIEMPOS = {
  facil: { total: 150, acierto: 10 },
  medio: { total: 240, acierto: 30 },
  dificil: { total: 300, acierto: 40 },
}
const WRONG_TIME = 5
const REVEAL_MS = 6000 // da tiempo a leer la resolución

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Cajas de cubitos: cuéntalos (largo × ancho × alto)', en: 'Boxes of cubes: count them (length × width × height)', ca: 'Caixes de cubets: compta’ls (llarg × ample × alt)' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Volumen de prismas, cilindros, pirámides y conos', en: 'Volume of prisms, cylinders, pyramids and cones', ca: 'Volum de prismes, cilindres, piràmides i cons' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Áreas totales, la esfera y el área lateral del cono', en: 'Total surface areas, the sphere and the curved surface of a cone', ca: 'Àrees totals, l’esfera i l’àrea lateral del con' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[cuanto-cabe] los niveles de la pantalla no coinciden con NIVELES')
}

export default function CuantoCabe() {
  const { lang, localPath, tr } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const backPath = location.state?.backPath

  const [screen, setScreen] = useState('intro')
  const [nivel, setNivel] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(TIEMPOS.facil.total)
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
    setRonda({ ...genRonda(niv), uid: Math.random() })
    setElegida(null)
    setPhase('choose')
  }, [])

  const startGame = useCallback((niv = 'facil') => {
    setNivel(niv); setScreen('playing')
    setAciertos(0); setStreak(0)
    setTimeLeft(TIEMPOS[niv].total)
    next(niv)
  }, [next])

  function finish() {
    clearTimeout(nextRef.current)
    setScreen('end')
    const pts = aciertosRef.current * 10
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'cuanto-cabe', category: 'cuerpos-geometricos',
        score: pts, timeSpent: TIEMPOS[nivel].total,
        coinsEarned: computeCoins('cuanto-cabe', { score: pts }),
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
      setTimeLeft(t => t + TIEMPOS[nivel].acierto)
    } else {
      setStreak(0)
      setTimeLeft(t => Math.max(0, t - WRONG_TIME))
    }
    nextRef.current = setTimeout(() => next(nivel), REVEAL_MS)
  }

  const seo = {
    title: tr({ es: '¿Cuánto Cabe? — Juego de volumen y área de cuerpos geométricos', en: 'How Much Fits? — Volume and surface area game', ca: 'Quant Hi Cap? — Joc de volum i àrea de cossos geomètrics' }),
    desc: tr({
      es: 'Juego de cuerpos geométricos: calcula el volumen y el área de prismas, cilindros, pirámides, conos y esferas dibujados con sus medidas, empezando por contar cubitos. Primaria y ESO. Gratis.',
      en: 'Solid shapes game: work out the volume and surface area of prisms, cylinders, pyramids, cones and spheres drawn with their measurements, starting by counting cubes. Free.',
      ca: 'Joc de cossos geomètrics: calcula el volum i l’àrea de prismes, cilindres, piràmides, cons i esferes dibuixats amb les mesures, començant per comptar cubets. Primària i ESO. Gratis.',
    }),
    path: '/juegos/cuanto-cabe',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  // Desde la cuadrícula de juegos se entra jugando (ver lib/arranqueDirecto)
  useArranqueDirecto(startGame)

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="cuanto-cabe"
            badge={tr({ es: 'Matemáticas · Cuerpos geométricos', en: 'Maths · Solid shapes', ca: 'Matemàtiques · Cossos geomètrics' })}
            titulo={tr({ es: '📦 ¿Cuánto Cabe?', en: '📦 How Much Fits?', ca: '📦 Quant Hi Cap?' })}
            sub={tr({ es: 'Volumen y área de los cuerpos geométricos', en: 'Volume and surface area of solid shapes', ca: 'Volum i àrea dels cossos geomètrics' })} />

          <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{tr({ es: 'Elige nivel', en: 'Choose a level', ca: 'Tria nivell' })}</p>
          <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl mb-2">
            {Object.entries(DIFS).map(([id, d], i) => (
              <button key={id} onClick={() => setNivel(id)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${nivel === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}>
                <NivelBarras clave={id} i={i} />{tr(d.label)}
              </button>
            ))}
          </div>
          <p className="text-white/40 text-xs text-center mb-3">{tr(DIFS[nivel].desc)}</p>
          <p className="text-amber-200/90 text-sm text-center font-semibold rounded-xl border border-amber-300/20 bg-amber-300/5 px-3 py-2 mb-5">✏️ {tr({ es: 'Ten a mano papel y lápiz: estas cuentas se hacen mejor escritas. El reloj da tiempo de sobra.', en: 'Keep a pen and paper handy: these calculations are easier written down. The timer gives you plenty of time.', ca: 'Tingues a mà paper i llapis: aquests càlculs es fan millor per escrit. El rellotge dona temps de sobres.' })}</p>

          <button onClick={() => startGame(nivel)}
            className="w-full py-3.5 rounded-2xl bg-[#EDAE49] text-black font-black text-lg hover:bg-amber-400 transition-colors">
            {tr({ es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' })}
          </button>
          <ComoSeJuega>
            <div className="space-y-2 text-white/70 text-sm">
              <p>{tr({ es: 'Sale un cuerpo dibujado con sus medidas y tienes que calcular su volumen o su área y escribirlo con el teclado. En fácil son cajas hechas de cubitos: el volumen es cuántos caben (largo × ancho × alto). En medio, prismas, cilindros, pirámides y conos; en difícil, áreas totales y la esfera.', en: 'A solid appears with its measurements and you work out its volume or surface area and type it in. On Easy they are boxes made of cubes: the volume is how many fit (length × width × height). On Medium, prisms, cylinders, pyramids and cones; on Hard, total surface areas and the sphere.', ca: 'Surt un cos dibuixat amb les mesures i n’has de calcular el volum o l’àrea i escriure-ho amb el teclat. En fàcil són caixes fetes de cubets: el volum és quants n’hi caben (llarg × ample × alt). En mitjà, prismes, cilindres, piràmides i cons; en difícil, àrees totals i l’esfera.' })}</p>
              <p>{tr({ es: 'Fórmulas: prisma V = área de la base × h; cilindro V = π·r²·h; pirámide y cono, un tercio del prisma y del cilindro; esfera V = 4/3·π·r³. Con π vale 3,14 o el de la calculadora: redondea a las unidades.', en: 'Formulas: prism V = base area × h; cylinder V = π·r²·h; pyramid and cone, one third of the prism and cylinder; sphere V = 4/3·π·r³. For π, 3.14 or your calculator’s value is fine: round to the nearest whole number.', ca: 'Fórmules: prisma V = àrea de la base × h; cilindre V = π·r²·h; piràmide i con, un terç del prisma i del cilindre; esfera V = 4/3·π·r³. Amb π val 3,14 o el de la calculadora: arrodoneix a les unitats.' })}</p>
              <p className="text-white/40 text-xs pt-1">⏱️ {TIEMPOS[nivel].total / 60} min · {tr({ es: `Acierto +10 y +${TIEMPOS[nivel].acierto}s · Fallo −${WRONG_TIME}s`, en: `Correct +10 and +${TIEMPOS[nivel].acierto}s · Wrong −${WRONG_TIME}s`, ca: `Encert +10 i +${TIEMPOS[nivel].acierto}s · Error −${WRONG_TIME}s` })}</p>
            </div>
          </ComoSeJuega>
        </div>
      </div>
    )
  }

  if (screen === 'end') {
    const pts = aciertos * 10
    const msg = tr({
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 4 ? 'Buen comienzo' : aciertos < 8 ? '¡Buen ojo para el espacio!' : '¡Maestro de los volúmenes!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 4 ? 'Good start' : aciertos < 8 ? 'Great spatial sense!' : 'Master of volumes!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 4 ? 'Bon començament' : aciertos < 8 ? 'Bon ull per a l’espai!' : 'Mestre dels volums!',
    })
    const shareText = tr({
      es: `He calculado ${aciertos} volúmenes y áreas en ¿Cuánto Cabe? de Tuthor 📦 — ¿puedes superarme? https://tuthor.es/juegos/cuanto-cabe`,
      en: `I worked out ${aciertos} volumes and areas in How Much Fits? on Tuthor 📦 — can you beat me? https://tuthor.es/en/juegos/cuanto-cabe`,
      ca: `He calculat ${aciertos} volums i àrees a Quant Hi Cap? de Tuthor 📦 — em pots superar? https://tuthor.es/ca/juegos/cuanto-cabe`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="cuanto-cabe" emoji="📦" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
        stats={[{ label: tr({ es: 'aciertos', en: 'correct', ca: 'encerts' }), value: aciertos, emoji: '✅' }]}
        shareText={shareText} user={user} lang={l}
        onPlayAgain={() => startGame(nivel)} secondaryActions={secondary} />
    )
  }

  if (!ronda) return null
  const timerColor = timeLeft > TIEMPOS[nivel].total * 0.66 ? '#22c55e' : timeLeft > TIEMPOS[nivel].total * 0.28 ? '#f59e0b' : '#ef4444'
  const timerPct = Math.min(1, timeLeft / TIEMPOS[nivel].total)
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
        <PreguntaCuantoCabe key={ronda.uid} ronda={ronda} revelado={isResult} onResponder={responder} />
        {!isResult && <p className="text-center text-white/35 text-xs mt-2">✏️ {tr({ es: 'Haz la cuenta en papel y escribe el resultado', en: 'Work it out on paper, then type the answer', ca: 'Fes el càlcul en paper i escriu el resultat' })}</p>}
        {isResult && (
          <p className="text-center text-xs font-bold mt-2">
            {acierto
              ? <span className="text-green-400">+10 · +{TIEMPOS[nivel].acierto}s ⏱️{streak >= 2 ? ` · 🔥 ${streak}` : ''}</span>
              : <span className="text-red-400">−{WRONG_TIME}s ⏱️</span>}
          </p>
        )}
      </div>
    </div>
  )
}
