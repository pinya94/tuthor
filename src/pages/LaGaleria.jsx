import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/laGaleria'
import PreguntaGaleria from '../components/laGaleria/PreguntaGaleria'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 4800 // da tiempo a ver el estilo iluminado y sus rasgos

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Estilos muy distintos y obras famosas', en: 'Very different styles and famous works', ca: 'Estils molt diferents i obres famoses' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Estilos vecinos, pintores y rasgos', en: 'Neighbouring styles, painters and features', ca: 'Estils veïns, pintors i trets' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Con la cronología: qué obra es más antigua', en: 'With chronology: which work is older', ca: 'Amb la cronologia: quina obra és més antiga' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[la-galeria] los niveles de la pantalla no coinciden con NIVELES')
}

export default function LaGaleria() {
  const { lang, localPath, tr } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const backPath = location.state?.backPath

  const [screen, setScreen] = useState('intro')
  const [nivel, setNivel] = useState('facil')
  // 'real' = obras auténticas (por defecto); 'dibujo' = cuadros dibujados
  // «al estilo de», que exageran el rasgo para ver el concepto.
  const [fuente, setFuente] = useState('real')
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

  const next = useCallback((niv, fu) => {
    setRonda(genRonda(niv, { fuente: fu }))
    setElegida(null)
    setPhase('choose')
  }, [])

  const startGame = useCallback((niv = 'facil', fu = 'real') => {
    setNivel(niv); setFuente(fu); setScreen('playing')
    setAciertos(0); setStreak(0)
    setTimeLeft(GAME_TIME)
    next(niv, fu)
  }, [next])

  function finish() {
    clearTimeout(nextRef.current)
    setScreen('end')
    const pts = aciertosRef.current * 10
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'la-galeria', category: 'pintura',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('la-galeria', { score: pts }),
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
    nextRef.current = setTimeout(() => next(nivel, fuente), REVEAL_MS)
  }

  const seo = {
    title: tr({ es: 'La Galería — Juego de historia de la pintura: estilos, pintores y obras', en: 'The Gallery — History of painting game: styles, painters and works', ca: 'La Galeria — Joc d’història de la pintura: estils, pintors i obres' }),
    desc: tr({
      es: 'Cuadros reales de Van Eyck, Velázquez, Monet, Van Gogh, Munch o Mondrian, y dibujos al estilo de cada movimiento: reconoce el estilo, quién pintó cada obra y qué rasgos tiene. Juego gratis.',
      en: 'Real paintings by Van Eyck, Velázquez, Monet, Van Gogh, Munch or Mondrian, and drawings in the style of each movement: recognise the style, who painted each work and its features. Free game.',
      ca: 'Quadres reals de Van Eyck, Velázquez, Monet, Van Gogh, Munch o Mondrian, i dibuixos a l’estil de cada moviment: reconeix l’estil, qui va pintar cada obra i quins trets té. Joc gratis.',
    }),
    path: '/juegos/la-galeria',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="la-galeria"
            badge={tr({ es: 'Historia del Arte · Pintura', en: 'Art History · Painting', ca: 'Història de l’Art · Pintura' })}
            titulo={tr({ es: '🖼️ La Galería', en: '🖼️ The Gallery', ca: '🖼️ La Galeria' })}
            sub={tr({ es: 'Del fondo dorado al pop art: ¿de qué estilo es cada cuadro?', en: 'From gold backgrounds to Pop art: what style is each painting?', ca: 'Del fons daurat al pop art: de quin estil és cada quadre?' })} />

          <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{tr({ es: '¿Qué quieres mirar?', en: 'What do you want to look at?', ca: 'Què vols mirar?' })}</p>
          <div className="grid grid-cols-2 gap-1.5 mb-1.5">
            {[
              { id: 'real', txt: tr({ es: '🖼️ Cuadros reales', en: '🖼️ Real paintings', ca: '🖼️ Quadres reals' }) },
              { id: 'dibujo', txt: tr({ es: '✏️ Dibujos del estilo', en: '✏️ Style drawings', ca: '✏️ Dibuixos de l’estil' }) },
            ].map(f => (
              <button key={f.id} onClick={() => setFuente(f.id)}
                className={`px-2 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${fuente === f.id ? 'bg-white/15 border-white/20 text-white' : 'bg-white/5 border-white/10 text-white/40 hover:text-white/70'}`}>
                {f.txt}
              </button>
            ))}
          </div>
          <p className="text-white/40 text-xs text-center mb-4">{fuente === 'real'
            ? tr({ es: 'Obras auténticas de museo, de la Edad Media a Mondrian', en: 'Authentic museum works, from the Middle Ages to Mondrian', ca: 'Obres autèntiques de museu, de l’edat mitjana a Mondrian' })
            : tr({ es: 'Cuadros inventados que exageran el rasgo de cada estilo, hasta el pop art', en: 'Made-up paintings that exaggerate each style’s feature, up to Pop art', ca: 'Quadres inventats que exageren el tret de cada estil, fins al pop art' })}</p>

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

          <button onClick={() => startGame(nivel, fuente)}
            className="w-full py-3.5 rounded-2xl bg-[#EDAE49] text-black font-black text-lg hover:bg-amber-400 transition-colors">
            {tr({ es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' })}
          </button>
          <ComoSeJuega>
            <div className="space-y-2 text-white/70 text-sm">
              <p>{tr({ es: 'Sale un cuadro y hay que reconocer su estilo por sus rasgos: el fondo dorado del gótico, la perspectiva del Renacimiento, el claroscuro del Barroco, las pinceladas sueltas del impresionismo, los planos del cubismo… Con «Cuadros reales» son obras auténticas (el título sale al responder); con «Dibujos del estilo», cuadros inventados que exageran cada rasgo, pop art incluido.', en: 'A painting appears and you recognise its style by its features. With “Real paintings” they are authentic works (the title appears after answering); with “Style drawings”, made-up paintings that exaggerate each feature, Pop art included.', ca: 'Surt un quadre i cal reconèixer-ne l’estil pels seus trets. Amb «Quadres reals» són obres autèntiques (el títol surt en respondre); amb «Dibuixos de l’estil», quadres inventats que exageren cada tret, pop art inclòs.' })}</p>
              <p>{tr({ es: 'Otras rondas son obras famosas, como en la cartela de un museo: quién las pintó y a qué estilo pertenecen. En difícil, cuál es la más antigua. Debajo, la sucesión de estilos se ilumina al corregir.', en: 'Other rounds are famous works, like a museum label: who painted them and which style they belong to. On hard, which is the oldest.', ca: 'Altres rondes són obres famoses, com a la cartel·la d’un museu: qui les va pintar i a quin estil pertanyen. En difícil, quina és la més antiga.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Buen ojo de crítico!' : '¡Comisario de museo! 🖼️',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'A critic’s eye!' : 'Museum curator! 🖼️',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Bon ull de crític!' : 'Comissari de museu! 🖼️',
    })
    const shareText = tr({
      es: `He reconocido ${aciertos} cuadros y estilos en La Galería de Tuthor 🖼️ — ¿puedes superarme? https://tuthor.es/juegos/la-galeria`,
      en: `I recognised ${aciertos} paintings and styles in The Gallery on Tuthor 🖼️ — can you beat me? https://tuthor.es/juegos/la-galeria`,
      ca: `He reconegut ${aciertos} quadres i estils a La Galeria de Tuthor 🖼️ — em pots superar? https://tuthor.es/juegos/la-galeria`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="la-galeria" emoji="🖼️" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
        stats={[{ label: tr({ es: 'aciertos', en: 'correct', ca: 'encerts' }), value: aciertos, emoji: '✅' }]}
        shareText={shareText} user={user} lang={l}
        onPlayAgain={() => startGame(nivel, fuente)} secondaryActions={secondary} />
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
        <PreguntaGaleria key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
