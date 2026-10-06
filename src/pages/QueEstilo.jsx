import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/queEstilo'
import PreguntaEstilo from '../components/queEstilo/PreguntaEstilo'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 4800 // da tiempo a leer los rasgos del estilo

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Estilos muy distintos entre sí, arcos y columnas clásicas', en: 'Very different styles, arches and classical columns', ca: 'Estils molt diferents entre si, arcs i columnes clàssiques' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Aparece un estilo parecido, arcos lobulados y la época', en: 'A similar style appears, lobed arches and the period', ca: 'Apareix un estil semblant, arcs lobulats i l’època' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Románico o gótico, griego o neoclásico: los vecinos parecidos', en: 'Romanesque or Gothic, Greek or Neoclassical: the look-alikes', ca: 'Romànic o gòtic, grec o neoclàssic: els veïns semblants' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[que-estilo] los niveles de la pantalla no coinciden con NIVELES')
}

export default function QueEstilo() {
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
        type: 'juego', game: 'que-estilo', category: 'arquitectura',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('que-estilo', { score: pts }),
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
    title: tr({ es: '¿Qué estilo es? — Juego de estilos arquitectónicos (Historia del Arte)', en: 'What Style Is It? — Architectural styles game (Art History)', ca: 'Quin estil és? — Joc d’estils arquitectònics (Història de l’Art)' }),
    desc: tr({
      es: 'Edificios dibujados para reconocer el estilo: griego, romano, hispanomusulmán, románico, gótico, Renacimiento, Barroco y Neoclásico. Arcos, columnas y épocas. Juego de Historia del Arte gratis.',
      en: 'Drawn buildings to recognise the style: Greek, Roman, Islamic Spain, Romanesque, Gothic, Renaissance, Baroque and Neoclassical. Arches, columns and periods. Free art history game.',
      ca: 'Edificis dibuixats per reconèixer l’estil: grec, romà, hispanomusulmà, romànic, gòtic, Renaixement, Barroc i Neoclàssic. Arcs, columnes i èpoques. Joc d’Història de l’Art gratis.',
    }),
    path: '/juegos/que-estilo',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="que-estilo"
            badge={tr({ es: 'Historia del Arte · Arquitectura', en: 'Art History · Architecture', ca: 'Història de l’Art · Arquitectura' })}
            titulo={tr({ es: '⛪ ¿Qué estilo es?', en: '⛪ What Style Is It?', ca: '⛪ Quin estil és?' })}
            sub={tr({ es: 'Mira el arco, las columnas y la fachada', en: 'Look at the arch, the columns and the façade', ca: 'Mira l’arc, les columnes i la façana' })} />

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
              <p>{tr({ es: 'Sale un edificio dibujado y hay que decir de qué estilo es: griego, romano, hispanomusulmán, románico, gótico, renacentista, barroco o neoclásico. Otras veces sale un arco o una columna suelta y hay que nombrarlo, o hay que decir en qué siglos se construía así.', en: 'A drawn building appears and you say which style it is: Greek, Roman, Islamic Spain, Romanesque, Gothic, Renaissance, Baroque or Neoclassical. Other times an arch or a column appears on its own and you name it, or you say in which centuries this style was built.', ca: 'Surt un edifici dibuixat i cal dir de quin estil és: grec, romà, hispanomusulmà, romànic, gòtic, renaixentista, barroc o neoclàssic. Altres vegades surt un arc o una columna sola i cal anomenar-lo, o cal dir en quins segles es construïa així.' })}</p>
              <p>{tr({ es: 'Busca el rasgo que delata cada estilo: el arco (medio punto, apuntado, herradura), las columnas, el rosetón, los arbotantes, las curvas. En el difícil las opciones son los estilos que más se parecen entre sí.', en: 'Look for the feature that gives each style away: the arch (round, pointed, horseshoe), the columns, the rose window, the flying buttresses, the curves. On hard, the options are the styles that look most alike.', ca: 'Busca el tret que delata cada estil: l’arc (mig punt, apuntat, ferradura), les columnes, la rosassa, els arcbotants, les corbes. Al difícil les opcions són els estils que més s’assemblen entre si.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Tienes ojo de historiador del arte!' : '¡Una obra maestra! ⛪',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'You have an art historian’s eye!' : 'A masterpiece! ⛪',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Tens ull d’historiador de l’art!' : 'Una obra mestra! ⛪',
    })
    const shareText = tr({
      es: `He reconocido ${aciertos} estilos arquitectónicos en Tuthor ⛪ — ¿puedes superarme? https://tuthor.es/juegos/que-estilo`,
      en: `I recognised ${aciertos} architectural styles on Tuthor ⛪ — can you beat me? https://tuthor.es/juegos/que-estilo`,
      ca: `He reconegut ${aciertos} estils arquitectònics a Tuthor ⛪ — em pots superar? https://tuthor.es/juegos/que-estilo`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="que-estilo" emoji="⛪" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaEstilo key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
