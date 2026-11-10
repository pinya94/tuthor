import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/fabricaPalabras'
import PreguntaFabrica from '../components/fabricaPalabras/PreguntaFabrica'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Cada ronda es montar una palabra o unir cuatro parejas: 120 s y +8 s por acierto.
const GAME_TIME = 120
const WRONG_TIME = 5
const CORRECT_TIME = 8
const REVEAL_MS = 4500 // da tiempo a leer la explicación

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Sufijos de oficios y tiendas (zapatero, frutería) y sinónimos y antónimos sencillos', en: 'Suffixes for jobs and shops (zapatero, frutería) and easy synonyms and antonyms', ca: 'Sufixos d’oficis i botigues (zapatero, frutería) i sinònims i antònims senzills' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Prefijos (re-, pre-, sub-…), negación (in-, des-) y más sufijos', en: 'Prefixes (re-, pre-, sub-…), negation (in-, des-) and more suffixes', ca: 'Prefixos (re-, pre-, sub-…), negació (in-, des-) i més sufixos' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Im- o i- (imposible, ilegal), sufijos de cualidad y sinónimos cultos', en: 'Im- or i- (imposible, ilegal), quality suffixes and formal synonyms', ca: 'Im- o i- (imposible, ilegal), sufixos de qualitat i sinònims cultes' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[fabrica-palabras] los niveles de la pantalla no coinciden con NIVELES')
}

export default function FabricaPalabras() {
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
        type: 'juego', game: 'fabrica-palabras', category: 'vocabulario',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('fabrica-palabras', { score: pts }),
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
    title: tr({ es: 'La Fábrica de Palabras — Juego de prefijos, sufijos, sinónimos y antónimos', en: 'The Word Factory — Spanish prefixes, suffixes, synonyms and antonyms game', ca: 'La Fàbrica de Paraules — Joc de prefixos, sufixos, sinònims i antònims en castellà' }),
    desc: tr({
      es: 'Juego de vocabulario para Primaria y ESO: monta palabras pegando prefijos y sufijos (zapat- + -ero, im- + posible) y une sinónimos y antónimos. Con la explicación de cada pieza. Gratis.',
      en: 'Spanish vocabulary game: build words by adding prefixes and suffixes (zapat- + -ero, im- + posible) and match synonyms and antonyms. Every piece explained. Free.',
      ca: 'Joc de vocabulari en castellà per a Primària i ESO: munta paraules enganxant prefixos i sufixos (zapat- + -ero, im- + posible) i uneix sinònims i antònims. Gratis.',
    }),
    path: '/juegos/fabrica-palabras',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="fabrica-palabras"
            badge={tr({ es: 'Lengua · Vocabulario', en: 'Spanish · Vocabulary', ca: 'Castellà · Vocabulari' })}
            titulo={tr({ es: '🏭 La Fábrica de Palabras', en: '🏭 The Word Factory', ca: '🏭 La Fàbrica de Paraules' })}
            sub={tr({ es: 'Pega piezas, forma palabras y busca sus parejas', en: 'Stick pieces together, make words and find their pairs', ca: 'Enganxa peces, forma paraules i busca’n les parelles' })} />

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
              <p>{tr({ es: 'Sale una definición y una base, como «Persona que hace o vende zapatos» y zapat-. Toca la pieza que hay que pegarle: un sufijo detrás (-ero → zapatero) o un prefijo delante (re- → rehacer). La palabra se va montando mientras eliges.', en: 'You get a definition and a base, such as «Persona que hace o vende zapatos» and zapat-. Tap the piece to stick on: a suffix after it (-ero → zapatero) or a prefix before it (re- → rehacer). The word builds up as you choose.', ca: 'Surt una definició i una base, com «Persona que hace o vende zapatos» i zapat-. Toca la peça que cal enganxar-hi: un sufix darrere (-ero → zapatero) o un prefix davant (re- → rehacer). La paraula es va muntant mentre tries.' })}</p>
              <p>{tr({ es: 'En las rondas de parejas, une cada palabra con su sinónimo (alegre – contento) o con su antónimo (abrir – cerrar): toca una de la izquierda y luego la de la derecha.', en: 'In the pairs rounds, match each word with its synonym (alegre – contento) or antonym (abrir – cerrar): tap one on the left, then one on the right.', ca: 'A les rondes de parelles, uneix cada paraula amb el seu sinònim (alegre – contento) o antònim (abrir – cerrar): toca’n una de l’esquerra i després la de la dreta.' })}</p>
              <p>{tr({ es: 'Ojo con la negación: in- se escribe im- delante de p y b (imposible) e i- delante de l y r (ilegal).', en: 'Watch the negative prefix: in- becomes im- before p and b (imposible) and i- before l and r (ilegal).', ca: 'Compte amb la negació: in- s’escriu im- davant de p i b (imposible) i i- davant de l i r (ilegal).' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Buen fabricante!' : '¡Maestro de las palabras!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Good word-maker!' : 'Master of words!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Bon fabricant!' : 'Mestre de les paraules!',
    })
    const shareText = tr({
      es: `He fabricado ${aciertos} palabras en Tuthor 🏭 — ¿puedes superarme? https://tuthor.es/juegos/fabrica-palabras`,
      en: `I made ${aciertos} words on Tuthor 🏭 — can you beat me? https://tuthor.es/juegos/fabrica-palabras`,
      ca: `He fabricat ${aciertos} paraules a Tuthor 🏭 — em pots superar? https://tuthor.es/juegos/fabrica-palabras`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="fabrica-palabras" emoji="🏭" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaFabrica key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
