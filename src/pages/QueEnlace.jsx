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

// Cada ronda se construye (electrones, enlaces, colores): 90 s y +6 s por acierto.
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 6
const REVEAL_MS = 4800 // da tiempo a ver la tabla coloreada y la explicación

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Compuestos 1:1 como el NaCl, moléculas sencillas y pintar metales y no metales', en: '1:1 compounds like NaCl, simple molecules and painting metals and non-metals', ca: 'Compostos 1:1 com el NaCl, molècules senzilles i pintar metalls i no metalls' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'MgCl₂ o Na₂O, dobles enlaces como el CO₂, semimetales y tipos de sustancia', en: 'MgCl₂ or Na₂O, double bonds like CO₂, metalloids and kinds of substance', ca: 'MgCl₂ o Na₂O, dobles enllaços com el CO₂, semimetalls i tipus de substància' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Al₂O₃ o Mg₃N₂, triples enlaces como el N₂ y sustancias por sus propiedades', en: 'Al₂O₃ or Mg₃N₂, triple bonds like N₂ and substances from their properties', ca: 'Al₂O₃ o Mg₃N₂, triples enllaços com el N₂ i substàncies per les propietats' } },
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
      es: 'Pasa electrones del metal al no metal hasta formar NaCl, MgCl₂ o Al₂O₃, pon los enlaces del agua, el CO₂ o el N₂ y pinta los metales de la tabla periódica. Juego de enlace químico gratis.',
      en: 'Pass electrons from metal to non-metal to make NaCl, MgCl₂ or Al₂O₃, add the bonds in water, CO₂ or N₂ and paint the metals on the periodic table. Free chemical bonding game.',
      ca: 'Passa electrons del metall al no metall fins a formar NaCl, MgCl₂ o Al₂O₃, posa els enllaços de l’aigua, el CO₂ o el N₂ i pinta els metalls de la taula periòdica. Joc d’enllaç químic gratis.',
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
              <p>{tr({ es: 'Aquí no se elige la respuesta: se construye. En los compuestos iónicos tienes un metal y un no metal con sus electrones dibujados: toca el metal y luego el no metal para pasarle un electrón, y añade átomos si hace falta, hasta que todos completen su capa. La fórmula sale sola.', en: 'You don’t pick the answer here: you build it. In ionic compounds you have a metal and a non-metal with their electrons drawn: tap the metal and then the non-metal to pass one electron, and add atoms if needed, until every atom has a full shell. The formula follows.', ca: 'Aquí no es tria la resposta: es construeix. En els compostos iònics tens un metall i un no metall amb els electrons dibuixats: toca el metall i després el no metall per passar-li un electró, i afegeix àtoms si cal, fins que tots completin la capa. La fórmula surt sola.' })}</p>
              <p>{tr({ es: 'En las moléculas, los no metales comparten: toca entre dos átomos para poner un enlace, dos o tres, hasta que cada uno tenga 8 electrones alrededor (el hidrógeno, 2). Otras rondas: pintar la tabla de metales y no metales, y clasificar sustancias.', en: 'In molecules, non-metals share: tap between two atoms to add one, two or three bonds, until each has 8 electrons around it (hydrogen, 2). Other rounds: painting the table into metals and non-metals, and sorting substances.', ca: 'En les molècules, els no metalls comparteixen: toca entre dos àtoms per posar-hi un enllaç, dos o tres, fins que cadascun tingui 8 electrons al voltant (l’hidrogen, 2). Altres rondes: pintar la taula de metalls i no metalls, i classificar substàncies.' })}</p>
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
