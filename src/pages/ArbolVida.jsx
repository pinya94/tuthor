import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/arbolVida'
import PreguntaArbol from '../components/arbolVida/PreguntaArbol'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Cada ronda se coloca u ordena: 90 s y +6 s por acierto.
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 6
const REVEAL_MS = 5200 // da tiempo a ver el árbol marcado y leer la explicación

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Colocar rasgos en el árbol, ordenar la historia de la vida y Darwin frente a Lamarck', en: 'Placing traits on the tree, ordering the history of life and Darwin versus Lamarck', ca: 'Col·locar trets a l’arbre, ordenar la història de la vida i Darwin davant Lamarck' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'También colocar especies y tocar el antepasado común; órganos homólogos y análogos', en: 'Also placing species and tapping the common ancestor; homologous and analogous organs', ca: 'També col·locar espècies i tocar l’avantpassat comú; òrgans homòlegs i anàlegs' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Árboles más largos, parentescos con trampa y pruebas de la evolución', en: 'Longer trees, tricky relationships and evidence for evolution', ca: 'Arbres més llargs, parentius amb trampa i proves de l’evolució' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[arbol-vida] los niveles de la pantalla no coinciden con NIVELES')
}

export default function ArbolVida() {
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
        type: 'juego', game: 'arbol-vida', category: 'evolucion',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('arbol-vida', { score: pts }),
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
    title: tr({ es: 'Árbol de la Vida — Juego de evolución: Darwin, árboles evolutivos y pruebas', en: 'Tree of Life — Evolution game: Darwin, evolutionary trees and evidence', ca: 'Arbre de la Vida — Joc d’evolució: Darwin, arbres evolutius i proves' }),
    desc: tr({
      es: 'Coloca rasgos y especies en árboles evolutivos, toca el antepasado común de dos especies, ordena la historia de la vida y distingue a Darwin de Lamarck. Juego de evolución gratis.',
      en: 'Place traits and species on evolutionary trees, tap the common ancestor of two species, order the history of life and tell Darwin from Lamarck. Free evolution game.',
      ca: 'Col·loca trets i espècies en arbres evolutius, toca l’avantpassat comú de dues espècies, ordena la història de la vida i distingeix Darwin de Lamarck. Joc d’evolució gratis.',
    }),
    path: '/juegos/arbol-vida',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="arbol-vida"
            badge={tr({ es: 'Biología · Evolución', en: 'Biology · Evolution', ca: 'Biologia · Evolució' })}
            titulo={tr({ es: '🦒 Árbol de la Vida', en: '🦒 Tree of Life', ca: '🦒 Arbre de la Vida' })}
            sub={tr({ es: '¿Quién es pariente de quién? Darwin tiene la respuesta', en: 'Who is related to whom? Darwin has the answer', ca: 'Qui és parent de qui? Darwin té la resposta' })} />

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
              <p>{tr({ es: 'Aquí no se elige: se coloca. En los árboles en escalera, toca un rasgo («Cuatro patas», «Semillas», «Plumas») y luego el tramo del tronco donde aparece; todos los que salen después lo heredan. En otras rondas los rasgos ya están y colocas a cada ser vivo en su rama.', en: 'You don’t pick here: you place. On the ladder trees, tap a trait (“Four limbs”, “Seeds”, “Feathers”) and then the part of the trunk where it appears; everything branching off later inherits it. In other rounds the traits are set and you place each living thing on its branch.', ca: 'Aquí no es tria: es col·loca. En els arbres en escala, toca un tret («Quatre potes», «Llavors», «Plomes») i després el tram del tronc on apareix; tots els que surten després l’hereten. En altres rondes els trets ja hi són i col·loques cada ésser viu a la seva branca.' })}</p>
              <p>{tr({ es: 'También: tocar el antepasado común de dos especies (el punto donde se separan sus ramas), ordenar los grandes grupos del más antiguo al más reciente y clasificar tarjetas: Darwin o Lamarck, órganos homólogos, análogos o vestigiales.', en: 'Also: tap the common ancestor of two species (where their branches split), put the major groups in order from oldest to newest and sort cards: Darwin or Lamarck, homologous, analogous or vestigial organs.', ca: 'També: tocar l’avantpassat comú de dues espècies (on se separen les branques), ordenar els grans grups del més antic al més recent i classificar targetes: Darwin o Lamarck, òrgans homòlegs, anàlegs o vestigials.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Te adaptas rápido!' : '¡Darwin te fichaba para el Beagle! 🦒',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'You adapt fast!' : 'Darwin would sign you up for the Beagle! 🦒',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'T’adaptes de pressa!' : 'Darwin et fitxaria per al Beagle! 🦒',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} de evolución en Árbol de la Vida de Tuthor 🦒 — ¿puedes superarme? https://tuthor.es/juegos/arbol-vida`,
      en: `I got ${aciertos} evolution questions right in Tree of Life on Tuthor 🦒 — can you beat me? https://tuthor.es/juegos/arbol-vida`,
      ca: `He encertat ${aciertos} d’evolució a Arbre de la Vida de Tuthor 🦒 — em pots superar? https://tuthor.es/juegos/arbol-vida`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="arbol-vida" emoji="🦒" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaArbol key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
