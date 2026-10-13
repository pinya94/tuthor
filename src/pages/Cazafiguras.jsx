import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/cazafiguras'
import PreguntaFigura from '../components/cazafiguras/PreguntaFigura'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Cazar las palabras lleva más que tocar una opción: 90 s y +6 s por acierto.
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 6
const REVEAL_MS = 4800 // da tiempo a ver la figura resaltada y la definición

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Metáfora, comparación, personificación, hipérbole y onomatopeya', en: 'Metaphor, simile, personification, hyperbole and onomatopoeia', ca: 'Metàfora, comparació, personificació, hipèrbole i onomatopeia' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Y además anáfora, aliteración, epíteto, hipérbaton, antítesis…', en: 'Plus anaphora, alliteration, epithet, hyperbaton, antithesis…', ca: 'I a més anàfora, al·literació, epítet, hipèrbaton, antítesi…' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Paradoja, oxímoron, sinestesia, metonimia, polisíndeton y asíndeton', en: 'Paradox, oxymoron, synaesthesia, metonymy, polysyndeton and asyndeton', ca: 'Paradoxa, oxímoron, sinestèsia, metonímia, polisíndeton i asíndeton' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[cazafiguras] los niveles de la pantalla no coinciden con NIVELES')
}

export default function Cazafiguras() {
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
        type: 'juego', game: 'cazafiguras', category: 'figuras',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('cazafiguras', { score: pts }),
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
    title: tr({ es: 'Cazafiguras — Juego de figuras literarias: metáfora, hipérbole, anáfora y más', en: 'Cazafiguras — Spanish literary devices game', ca: 'Cazafiguras — Joc de figures literàries en castellà' }),
    desc: tr({
      es: 'Versos de Garcilaso, Quevedo, Bécquer o Lorca y frases de ejemplo: toca las palabras que forman la metáfora, la anáfora, el oxímoron o la sinestesia, y empareja cada texto con su figura. Juego gratis.',
      en: 'Spanish verses and sentences: spot the metaphor, hyperbole, anaphora, paradox or synaesthesia, with the words highlighted. Free Spanish language game.',
      ca: 'Versos i frases en castellà: descobreix la metàfora, la hipèrbole, l’anàfora, la paradoxa o la sinestèsia, amb les paraules ressaltades. Joc de llengua gratis.',
    }),
    path: '/juegos/cazafiguras',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="cazafiguras"
            badge={tr({ es: 'Lengua · Figuras literarias', en: 'Spanish · Literary devices', ca: 'Castellà · Figures literàries' })}
            titulo={tr({ es: '🎭 Cazafiguras', en: '🎭 Cazafiguras', ca: '🎭 Cazafiguras' })}
            sub={tr({ es: 'Caza la figura dentro del verso', en: 'Hunt the device inside the verse', ca: 'Caça la figura dins del vers' })} />

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
              <p>{tr({ es: 'Sale un verso de un clásico (Garcilaso, Quevedo, Bécquer, Lorca…) o una frase de ejemplo, con cada palabra tocable, y te piden una figura: «la metáfora», «la anáfora». Toca las palabras que la forman y comprueba. En fácil tienes la definición a la vista.', en: 'A verse from a Spanish classic or a sample sentence appears, with every word tappable, and you are asked for one device. Tap the words that make it up and check.', ca: 'Surt un vers d’un clàssic o una frase d’exemple, amb cada paraula tocable, i et demanen una figura. Toca les paraules que la formen i comprova-ho.' })}</p>
              <p>{tr({ es: 'Otras rondas son de emparejar: tres textos (cuatro en difícil) y sus figuras; toca un texto y luego su figura. Muchos versos tienen más de una figura, así que nunca se juntan dos en los que una figura valdría para ambos.', en: 'Other rounds are for matching: three texts (four on hard) and their devices; tap a text and then its device.', ca: 'Altres rondes són d’aparellar: tres textos (quatre en difícil) i les seves figures; toca un text i després la seva figura.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Buen ojo literario!' : '¡Cazador de figuras! 🎭',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Good literary eye!' : 'Device hunter! 🎭',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Bon ull literari!' : 'Caçador de figures! 🎭',
    })
    const shareText = tr({
      es: `He cazado ${aciertos} figuras literarias en Cazafiguras de Tuthor 🎭 — ¿puedes superarme? https://tuthor.es/juegos/cazafiguras`,
      en: `I spotted ${aciertos} literary devices in Cazafiguras on Tuthor 🎭 — can you beat me? https://tuthor.es/juegos/cazafiguras`,
      ca: `He caçat ${aciertos} figures literàries a Cazafiguras de Tuthor 🎭 — em pots superar? https://tuthor.es/juegos/cazafiguras`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="cazafiguras" emoji="🎭" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaFigura key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
