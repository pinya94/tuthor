import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/bloquesPrimos'
import PreguntaPrimos from '../components/bloquesPrimos/PreguntaPrimos'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Se toca, se rompe o se construye con bloques: 90 s y +6 s por acierto.
const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 6
const REVEAL_MS = 4500 // da tiempo a ver los bloques marcados y la cuenta

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Toca divisibles y primos, rompe números en bloques y construye el mcd y el mcm', en: 'Tap multiples and primes, break numbers into blocks and build the HCF and LCM', ca: 'Toca divisibles i primers, trenca nombres en blocs i construeix el mcd i el mcm' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Números más grandes, criterios del 4 y del 9 y problemas de mcd y mcm', en: 'Bigger numbers, rules for 4 and 9 and HCF and LCM word problems', ca: 'Nombres més grans, criteris del 4 i del 9 i problemes de mcd i mcm' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Sin bloques: descompón tú, tres números a la vez y problemas', en: 'No blocks: factorise yourself, three numbers at once and word problems', ca: 'Sense blocs: descompon tu, tres nombres alhora i problemes' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[bloques-primos] los niveles de la pantalla no coinciden con NIVELES')
}

export default function BloquesPrimos() {
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
        type: 'juego', game: 'bloques-primos', category: 'divisibilidad',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('bloques-primos', { score: pts }),
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
    title: tr({ es: 'Bloques Primos — Juego de mcm, mcd y divisibilidad', en: 'Prime Blocks — HCF, LCM and divisibility game', ca: 'Blocs Primers — Joc de mcm, mcd i divisibilitat' }),
    desc: tr({
      es: 'Cada número es una fila de bloques de colores, uno por factor primo: el mcd son los bloques que comparten y el mcm, todos sin repetir. Criterios de divisibilidad, números primos, descomposición factorial y problemas. Juego de matemáticas gratis.',
      en: 'Each number is a row of coloured blocks, one per prime factor: the HCF is the blocks they share and the LCM is all of them without repeats. Divisibility rules, prime numbers, prime factorisation and word problems. Free maths game.',
      ca: 'Cada nombre és una fila de blocs de colors, un per factor primer: el mcd són els blocs que comparteixen i el mcm, tots sense repetir. Criteris de divisibilitat, nombres primers, descomposició factorial i problemes. Joc de matemàtiques gratis.',
    }),
    path: '/juegos/bloques-primos',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="bloques-primos"
            badge={tr({ es: 'Matemáticas · Divisibilidad', en: 'Maths · Divisibility', ca: 'Matemàtiques · Divisibilitat' })}
            titulo={tr({ es: '🧱 Bloques Primos', en: '🧱 Prime Blocks', ca: '🧱 Blocs Primers' })}
            sub={tr({ es: 'El mcd y el mcm, por fin a la vista: cada factor primo es un bloque', en: 'HCF and LCM you can finally see: each prime factor is a block', ca: 'El mcd i el mcm, per fi a la vista: cada factor primer és un bloc' })} />

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
              <p>{tr({ es: 'Todo número se puede escribir como una multiplicación de números primos: 12 = 2 · 2 · 3. Aquí cada factor primo es un bloque de color (el 2 azul, el 3 verde, el 5 naranja, el 7 morado…), así que cada número es una fila de bloques.', en: 'Every number can be written as a product of primes: 12 = 2 · 2 · 3. Here each prime factor is a coloured block (2 blue, 3 green, 5 orange, 7 purple…), so each number is a row of blocks.', ca: 'Tot nombre es pot escriure com una multiplicació de nombres primers: 12 = 2 · 2 · 3. Aquí cada factor primer és un bloc de color (el 2 blau, el 3 verd, el 5 taronja, el 7 lila…), així que cada nombre és una fila de blocs.' })}</p>
              <p>{tr({ es: 'El máximo común divisor (mcd) son los bloques que tienen los dos números: los comunes, con el menor exponente. El mínimo común múltiplo (mcm) es juntarlos todos sin repetir los comunes: de cada primo, la fila más larga. No hay opciones: el mcd y el mcm se construyen con bloques (+ y − en cada primo), los números se rompen dividiéndolos entre primos y los divisibles y los primos se tocan. Al responder se marcan los bloques que cuentan.', en: 'The highest common factor (HCF) is the blocks both numbers have: the common ones, with the lowest power. The lowest common multiple (LCM) puts them all together without repeating the shared ones: for each prime, the longest row. There are no options: you build the HCF and LCM with blocks (+ and − for each prime), break numbers by dividing them by primes and tap the multiples and the primes. When you answer, the blocks that count light up.', ca: 'El màxim comú divisor (mcd) són els blocs que tenen tots dos nombres: els comuns, amb l’exponent més petit. El mínim comú múltiple (mcm) és ajuntar-los tots sense repetir els comuns: de cada primer, la fila més llarga. No hi ha opcions: el mcd i el mcm es construeixen amb blocs (+ i − a cada primer), els nombres es trenquen dividint-los entre primers i els divisibles i els primers es toquen. En respondre es marquen els blocs que compten.' })}</p>
              <p>{tr({ es: 'También hay criterios de divisibilidad, números que parecen primos y no lo son (91 = 7 · 13) y problemas: si algo «vuelve a coincidir» es un mcm; si hay que cortar o repartir en partes iguales lo más grandes posible, un mcd.', en: 'There are also divisibility rules, numbers that look prime but are not (91 = 7 · 13) and word problems: if things “coincide again” it is an LCM; if you cut or share into equal parts as big as possible, an HCF.', ca: 'També hi ha criteris de divisibilitat, nombres que semblen primers i no ho són (91 = 7 · 13) i problemes: si una cosa «torna a coincidir» és un mcm; si cal tallar o repartir en parts iguals tan grans com es pugui, un mcd.' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Los primos ya no tienen secretos!' : '¡Máquina de factorizar! 🧱',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Primes hold no secrets for you!' : 'Factorising machine! 🧱',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Els primers ja no tenen secrets!' : 'Màquina de factoritzar! 🧱',
    })
    const shareText = tr({
      es: `He acertado ${aciertos} de mcm, mcd y primos en Bloques Primos de Tuthor 🧱 — ¿puedes superarme? https://tuthor.es/juegos/bloques-primos`,
      en: `I got ${aciertos} HCF, LCM and prime questions right in Prime Blocks on Tuthor 🧱 — can you beat me? https://tuthor.es/juegos/bloques-primos`,
      ca: `He encertat ${aciertos} de mcm, mcd i primers a Blocs Primers de Tuthor 🧱 — em pots superar? https://tuthor.es/juegos/bloques-primos`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="bloques-primos" emoji="🧱" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaPrimos key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
