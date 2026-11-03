import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { NIVELES, genRonda, esCorrecta } from '../lib/tablaVerdad'
import PreguntaTabla from '../components/tablaVerdad/PreguntaTabla'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'
import { CabeceraJuego, NivelBarras, ComoSeJuega } from '../components/IntroJuego'
import { Racha } from '../components/Iconos'

// Cada ronda se construye (tabla, fichas, cajas): 120 s y +8 s por acierto.
const GAME_TIME = 120
const WRONG_TIME = 5
const CORRECT_TIME = 8
const REVEAL_MS = 4500 // da tiempo a ver la tabla corregida

const DIFS = {
  facil:   { emoji: '💚', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
             desc: { es: 'Tablas de dos variables y argumentos en símbolos', en: 'Two-variable tables and arguments in symbols', ca: 'Taules de dues variables i arguments en símbols' } },
  medio:   { emoji: '💛', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
             desc: { es: 'Fórmulas con dos conectores, «pero» y «ni», tautologías y argumentos en palabras', en: 'Formulas with two connectives, tautologies and arguments in words', ca: 'Fórmules amb dos connectors, «però» i «ni», tautologies i arguments en paraules' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
             desc: { es: 'Tres variables (8 filas), «p si q» y «p solo si q», y el nombre de cada regla', en: 'Three variables (8 rows), “p if q” and “p only if q”, and naming each rule', ca: 'Tres variables (8 files), «p si q» i «p només si q», i el nom de cada regla' } },
}
if (import.meta.env.DEV && Object.keys(DIFS).join() !== Object.keys(NIVELES).join()) {
  console.warn('[tabla-verdad] los niveles de la pantalla no coinciden con NIVELES')
}

export default function TablaVerdad() {
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
        type: 'juego', game: 'tabla-verdad', category: 'logica',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('tabla-verdad', { score: pts }),
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
    title: tr({ es: 'Tabla de verdad — Juego de lógica proposicional', en: 'Truth Table — Propositional logic game', ca: 'Taula de veritat — Joc de lògica proposicional' }),
    desc: tr({
      es: 'Juego de lógica proposicional para Filosofía: completa tablas de verdad, formaliza frases con conectores (¬, ∧, ∨, →, ↔), distingue tautologías y contradicciones y decide si un argumento es válido. Gratis.',
      en: 'Propositional logic game: complete truth tables, formalise sentences with connectives (¬, ∧, ∨, →, ↔), tell tautologies from contradictions and decide whether an argument is valid. Free.',
      ca: 'Joc de lògica proposicional per a Filosofia: completa taules de veritat, formalitza frases amb connectors (¬, ∧, ∨, →, ↔), distingeix tautologies i contradiccions i decideix si un argument és vàlid. Gratis.',
    }),
    path: '/juegos/tabla-verdad',
  }
  const head = <SEOHead title={seo.title} description={seo.desc} path={seo.path} />

  if (screen === 'intro') {
    return (
      <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
        {head}
        <div className="max-w-md w-full">
          <CabeceraJuego slug="tabla-verdad"
            badge={tr({ es: 'Filosofía · Lógica', en: 'Philosophy · Logic', ca: 'Filosofia · Lògica' })}
            titulo={tr({ es: '🧠 Tabla de Verdad', en: '🧠 Truth Table', ca: '🧠 Taula de Veritat' })}
            sub={tr({ es: 'Si p, q… ¿y si p es falso?', en: 'If p, then q… and if p is false?', ca: 'Si p, q… i si p és fals?' })} />

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
              <p>{tr({ es: 'Tabla: completa la columna de la fórmula tocando cada casilla (V o F). Recuerda la del condicional: p → q solo es falso cuando p es verdadero y q falso.', en: 'Table: complete the formula’s column by tapping each cell (T or F). Remember the conditional: p → q is only false when p is true and q is false.', ca: 'Taula: completa la columna de la fórmula tocant cada casella (V o F). Recorda la del condicional: p → q només és fals quan p és vertader i q fals.' })}</p>
              <p>{tr({ es: 'Formaliza: monta con fichas la fórmula de una frase. Vale cualquier fórmula equivalente. Ojo con «pero» (es una conjunción), «ni… ni…» y el orden de «p si q» y «p solo si q».', en: 'Formalise: build the formula for a sentence from tiles. Any equivalent formula counts. Watch out for “but” (a conjunction) and the order in “p if q” and “p only if q”.', ca: 'Formalitza: munta amb fitxes la fórmula d’una frase. Val qualsevol fórmula equivalent. Compte amb «però» (és una conjunció), «ni… ni…» i l’ordre de «p si q» i «p només si q».' })}</p>
              <p>{tr({ es: 'Cajas: cada fórmula a tautología, contradicción o contingencia, y cada argumento a válido o no válido (en difícil, a su regla: modus ponens, modus tollens, silogismos o las falacias de afirmar el consecuente y negar el antecedente).', en: 'Boxes: each formula to tautology, contradiction or contingency, and each argument to valid or invalid (on hard, to its rule: modus ponens, modus tollens, syllogisms or the fallacies of affirming the consequent and denying the antecedent).', ca: 'Caixes: cada fórmula a tautologia, contradicció o contingència, i cada argument a vàlid o no vàlid (en difícil, a la seva regla: modus ponens, modus tollens, sil·logismes o les fal·làcies d’afirmar el conseqüent i negar l’antecedent).' })}</p>
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
      es: aciertos === 0 ? '¡Sigue practicando!' : aciertos < 5 ? 'Buen comienzo' : aciertos < 10 ? '¡Bien razonado!' : '¡Lógica de hierro!',
      en: aciertos === 0 ? 'Keep practising!' : aciertos < 5 ? 'Good start' : aciertos < 10 ? 'Well reasoned!' : 'Iron logic!',
      ca: aciertos === 0 ? 'Segueix practicant!' : aciertos < 5 ? 'Bon començament' : aciertos < 10 ? 'Ben raonat!' : 'Lògica de ferro!',
    })
    const shareText = tr({
      es: `He resuelto ${aciertos} retos de lógica en Tabla de Verdad de Tuthor 🧠 — ¿puedes superarme? https://tuthor.es/juegos/tabla-verdad`,
      en: `I solved ${aciertos} logic puzzles in Truth Table on Tuthor 🧠 — can you beat me? https://tuthor.es/en/juegos/tabla-verdad`,
      ca: `He resolt ${aciertos} reptes de lògica a Taula de Veritat de Tuthor 🧠 — em pots superar? https://tuthor.es/ca/juegos/tabla-verdad`,
    })
    const secondary = [
      { label: tr({ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' }), onClick: () => setScreen('intro') },
      ...(backPath ? [{ label: tr({ es: '← Volver', en: '← Back', ca: '← Tornar' }), onClick: () => navigate(localPath(backPath)) }] : []),
    ]
    return (
      <GameEndScreen game="tabla-verdad" emoji="🧠" title={tr({ es: 'Tiempo', en: "Time's up", ca: 'Temps' })} score={pts} message={msg}
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
        <PreguntaTabla key={ronda.id} ronda={ronda} revelado={isResult} elegida={elegida} onResponder={responder} />
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
