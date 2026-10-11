import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/queEnlace'
import PreguntaEnlace from '../components/queEnlace/PreguntaEnlace'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

const GAME_TIME = 60
const WRONG_TIME = 5
const CORRECT_TIME = 4
const REVEAL_MS = 4800 // da tiempo a ver la tabla coloreada y la explicación

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Iónico, covalente o metálico entre dos elementos y sustancias de casa', en: 'Ionic, covalent or metallic between two elements, and everyday substances', ca: 'Iònic, covalent o metàl·lic entre dos elements i substàncies de casa' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Molecular o red covalente, propiedades y cuántos enlaces forma cada átomo', en: 'Molecular or giant covalent, properties and how many bonds each atom forms', ca: 'Molecular o xarxa covalent, propietats i quants enllaços forma cada àtom' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Iones, fórmulas de compuestos iónicos y sustancias por sus propiedades', en: 'Ions, ionic compound formulas and substances from their properties', ca: 'Ions, fórmules de compostos iònics i substàncies per les propietats' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[que-enlace] los niveles de la pantalla no coinciden con NIVELES')
}

export default function QueEnlace() {
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
        type: 'juego', game: 'que-enlace', category: 'enlace-quimico',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('que-enlace', { score: pts }),
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
    title: tr({ es: '¿Qué Enlace? — Juego de enlace químico: iónico, covalente y metálico', en: 'Which Bond? — Chemical bonding game: ionic, covalent and metallic', ca: 'Quin Enllaç? — Joc d’enllaç químic: iònic, covalent i metàl·lic' }),
    desc: tr({
      es: 'Con la tabla periódica a la vista: decide si dos elementos forman un enlace iónico, covalente o metálico, clasifica sustancias reales, deduce el tipo por sus propiedades, los iones y las fórmulas. Juego de química gratis.',
      en: 'With the periodic table in view: decide whether two elements form an ionic, covalent or metallic bond, classify real substances, work out the type from its properties, the ions and the formulas. Free chemistry game.',
      ca: 'Amb la taula periòdica a la vista: decideix si dos elements formen un enllaç iònic, covalent o metàl·lic, classifica substàncies reals, dedueix el tipus per les propietats, els ions i les fórmules. Joc de química gratis.',
    }),
    path: '/juegos/que-enlace',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="que-enlace"
            badge={tr({ es: 'Química · Enlace químico', en: 'Chemistry · Bonding', ca: 'Química · Enllaç químic' })}
            titulo={tr({ es: '🔗 ¿Qué Enlace?', en: '🔗 Which Bond?', ca: '🔗 Quin Enllaç?' })}
            sub={tr({ es: 'Metal, no metal… y lo que pasa cuando se juntan', en: 'Metal, non-metal… and what happens when they meet', ca: 'Metall, no metall… i el que passa quan es troben' })} />

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
              <p>{tr({ es: 'Sale una tabla periódica pequeña con los elementos de la pregunta marcados. La regla de oro: metal con no metal forma un enlace iónico (el metal cede electrones y el no metal los gana); no metal con no metal, covalente (los comparten); metal con metal, metálico (los electrones quedan libres). Al corregir, la tabla se colorea: metales en azul y no metales en verde.', en: 'A small periodic table appears with the elements in the question marked. The golden rule: metal with non-metal makes an ionic bond (the metal gives electrons and the non-metal takes them); non-metal with non-metal, covalent (they share them); metal with metal, metallic (the electrons are free). When you answer, the table is coloured: metals in blue and non-metals in green.', ca: 'Surt una taula periòdica petita amb els elements de la pregunta marcats. La regla d’or: metall amb no metall forma un enllaç iònic (el metall cedeix electrons i el no metall els guanya); no metall amb no metall, covalent (els comparteixen); metall amb metall, metàl·lic (els electrons queden lliures). En corregir, la taula es pinta: metalls en blau i no metalls en verd.' })}</p>
              <p>{tr({ es: 'Las sustancias pueden ser iónicas (la sal), covalentes moleculares (el agua), redes covalentes (el diamante, el cuarzo) o metálicas (el cobre). Cada tipo tiene sus propiedades: solo las metálicas conducen en estado sólido, y las iónicas lo hacen fundidas o disueltas.', en: 'Substances can be ionic (salt), molecular covalent (water), giant covalent (diamond, quartz) or metallic (copper). Each type has its properties: only metals conduct as solids, and ionic ones do when molten or dissolved.', ca: 'Les substàncies poden ser iòniques (la sal), covalents moleculars (l’aigua), xarxes covalents (el diamant, el quars) o metàl·liques (el coure). Cada tipus té les seves propietats: només les metàl·liques condueixen en estat sòlid, i les iòniques ho fan foses o dissoltes.' })}</p>
              <p>{tr({ es: 'En el nivel difícil: qué ion forma cada elemento para completar el octeto y la fórmula del compuesto iónico, cruzando las cargas para que quede neutro.', en: 'On the hard level: what ion each element forms to complete its octet, and the formula of the ionic compound, crossing over the charges so it is neutral.', ca: 'Al nivell difícil: quin ió forma cada element per completar l’octet i la fórmula del compost iònic, creuant les càrregues perquè quedi neutre.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Tienes química!' : '¡Enlace perfecto! 🔗',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'You have chemistry!' : 'Perfect bond! 🔗',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Tens química!' : 'Enllaç perfecte! 🔗',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} de enlace químico en ¿Qué Enlace? de Tuthor 🔗 — ¿puedes superarme? https://tuthor.es/juegos/que-enlace`,
      en: `I got ${aciertos} bonding questions right in Which Bond? on Tuthor 🔗 — can you beat me? https://tuthor.es/juegos/que-enlace`,
      ca: `He encertat ${aciertos} d’enllaç químic a Quin Enllaç? de Tuthor 🔗 — em pots superar? https://tuthor.es/juegos/que-enlace`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="que-enlace" emoji="🔗" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaEnlace key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
