import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, TEMAS, genRonda, esCorrecta } from '../lib/queVes'
import PreguntaQueVes from '../components/queVes/PreguntaQueVes'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'
import { useArranqueDirecto } from '../lib/arranqueDirecto'

// Mirar el dibujo y montar la frase: 150 s y +10 s por acierto.
const GAME_TIME = 150
const WRONG_TIME = 5
const CORRECT_TIME = 10
const REVEAL_MS = 5000 // da tiempo a leer la comprobación

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Un hueco por frase: is o are, has got, can…', en: 'One gap per sentence: is or are, has got, can…', ca: 'Un buit per frase: is o are, has got, can…' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Dos huecos: la gramática y lo que ves en el dibujo (cuántos, quién, qué hace)', en: 'Two gaps: the grammar and what you see in the picture (how many, who, what they are doing)', ca: 'Dos buits: la gramàtica i el que veus al dibuix (quants, qui, què fa)' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Preguntas y negativas: Is Tom swimming? — No, he isn’t.', en: 'Questions and negatives: Is Tom swimming? — No, he isn’t.', ca: 'Preguntes i negatives: Is Tom swimming? — No, he isn’t.' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[que-ves] los niveles de la pantalla no coinciden con NIVELES')
}

export default function QueVes() {
  const { lang, localPath, tr } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const backPath = location.state?.backPath
  // Desde un tema (o una tarea del profesor): solo frases de ese tema, y se
  // guarda como tal. Sin tema, los cinco mezclados.
  const temaFijo = TEMAS.includes(location.state?.tema) ? location.state.tema : null

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
    setRonda({ ...genRonda(niv, { tema: temaFijo }), uid: Math.random() })
    setElegida(null)
    setPhase('choose')
  }, [temaFijo])

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
        type: 'juego', game: 'que-ves', category: temaFijo ?? 'mezcla',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('que-ves', { score: pts }),
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
    title: tr({ es: '¿Qué Ves? — Juego de inglés para Primaria: there is, have got, can, -ing', en: 'What Can You See? — English game: there is, have got, can, -ing', ca: 'Què Hi Veus? — Joc d’anglès per a Primària: there is, have got, can, -ing' }),
    desc: tr({
      es: 'Juego de inglés para Primaria y 1.º de ESO: mira el dibujo del parque y completa frases con there is / there are, has got, can, el present continuous y los posesivos. Gratis.',
      en: 'English game for young learners: look at the park picture and complete sentences with there is / there are, has got, can, the present continuous and possessives. Free.',
      ca: 'Joc d’anglès per a Primària i 1r d’ESO: mira el dibuix del parc i completa frases amb there is / there are, has got, can, el present continuous i els possessius. Gratis.',
    }),
    path: '/juegos/que-ves',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  // Desde la cuadrícula de juegos se entra jugando (ver lib/arranqueDirecto)
  useArranqueDirecto(startGame)

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="que-ves"
            badge={tr({ es: 'Inglés · Primaria', en: 'English · Young learners', ca: 'Anglès · Primària' })}
            titulo={tr({ es: '👀 ¿Qué Ves?', en: '👀 What Can You See?', ca: '👀 Què Hi Veus?' })}
            sub={tr({ es: 'Mira el dibujo y completa la frase en inglés', en: 'Look at the picture and complete the sentence', ca: 'Mira el dibuix i completa la frase en anglès' })} />

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
              <p>{tr({ es: 'Sale un parque con niños, sus mascotas, pájaros, patos, flores y mariposas. Debajo hay una frase en inglés sobre el dibujo con huecos: tócalos en orden con las fichas. Para acertar tienes que mirar bien (cuántos pájaros hay, de quién es el conejo, qué está haciendo cada niño) y elegir la forma correcta.', en: 'A park appears with children, their pets, birds, ducks, flowers and butterflies. Below is a sentence about the picture with gaps: fill them in order with the tiles. To get it right you need to look carefully (how many birds there are, whose rabbit it is, what each child is doing) and choose the right form.', ca: 'Surt un parc amb nens, les seves mascotes, ocells, ànecs, flors i papallones. A sota hi ha una frase en anglès sobre el dibuix amb buits: omple’ls en ordre amb les fitxes. Per encertar has de mirar bé (quants ocells hi ha, de qui és el conill, què fa cada nen) i triar la forma correcta.' })}</p>
              <p>{tr({ es: 'Practica cinco temas: there is / there are, has got / have got, can, el present continuous (is running) y los posesivos (his, her, its). Entre las fichas hay trampas: is en vez de are, have en vez de has, cans…', en: 'It practises five topics: there is / there are, has got / have got, can, the present continuous (is running) and possessives (his, her, its). Some tiles are traps: is instead of are, have instead of has, cans…', ca: 'Practica cinc temes: there is / there are, has got / have got, can, el present continuous (is running) i els possessius (his, her, its). Entre les fitxes hi ha paranys: is en lloc d’are, have en lloc de has, cans…' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 4 ? 'Buen comienzo' : aciertos < 8 ? '¡Qué buen ojo!' : '¡Great job!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 4 ? 'Good start' : aciertos < 8 ? 'Sharp eyes!' : 'Great job!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 4 ? 'Bon començament' : aciertos < 8 ? 'Quin bon ull!' : 'Great job!',
    })
    const shareText = tr({
      es: `He completado ${aciertos} frases en inglés en ¿Qué Ves? de Tuthor 👀 — ¿puedes superarme? https://tuthor.es/juegos/que-ves`,
      en: `I completed ${aciertos} sentences in What Can You See? on Tuthor 👀 — can you beat me? https://tuthor.es/en/juegos/que-ves`,
      ca: `He completat ${aciertos} frases en anglès a Què Hi Veus? de Tuthor 👀 — em pots superar? https://tuthor.es/ca/juegos/que-ves`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="que-ves" emoji="👀" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaQueVes key={ronda.uid} ronda={ronda} revelado={isResult} onResponder={responder} />
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
