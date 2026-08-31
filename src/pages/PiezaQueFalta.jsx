import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { TEMAS, MEZCLA, genRound, esCorrecta, solucionTexto } from '../lib/piezaQueFalta'
import PiezasBoard from '../components/PiezasBoard'
import GameEndScreen from '../components/GameEndScreen'
import SEOHead from '../components/SEOHead'

// 45 segundos y +2 por acierto. El reloj SE PARA mientras se lee la regla (ver
// el efecto del temporizador): así la dificultad está en resolver rápido, que
// es lo que se quiere entrenar, y no en leer rápido la explicación, que es
// justo lo que enseña. Con estos números hay que encadenar sin dudar para
// llegar lejos.
const GAME_TIME = 45
const WRONG_TIME = 5
const CORRECT_TIME = 2
const REVEAL_MS = 2600
// Cuántas frases recientes se evitan al sortear la siguiente. Con 170 frases
// no hace falta mucho, pero sí lo justo para que no salga dos veces seguidas
// la misma en una partida corta.
const MEMORIA = 8

const C = {
  badge:   { es: 'Inglés · Gramática', en: 'English · Grammar', ca: 'Anglès · Gramàtica' },
  title:   { es: '🧩 La Pieza que Falta', en: '🧩 Missing Piece', ca: '🧩 La Peça que Falta' },
  sub:     { es: 'Monta la forma correcta con las piezas', en: 'Build the correct form from the pieces', ca: 'Monta la forma correcta amb les peces' },
  mezcla:  { es: 'Todo mezclado', en: 'All mixed', ca: 'Tot barrejat' },
  queEs:   { es: '¿De qué va?', en: 'What is it about?', ca: 'De què va?' },
  q1:      { es: 'Sale una frase en inglés a la que le falta un trozo, y tú lo montas con las piezas de abajo.', en: 'An English sentence appears with a piece missing, and you build it from the pieces below.', ca: 'Surt una frase en anglès a la qual li falta un tros, i tu el montes amb les peces de sota.' },
  q2:      { es: 'Puede tocar cualquier cosa: presente, pasado, present perfect, artículos o pasiva. Nadie te dice cuál — la pista está dentro de la frase.', en: 'Anything can come up: present, past, present perfect, articles or the passive. Nobody tells you which — the clue is inside the sentence.', ca: 'Pot tocar qualsevol cosa: present, passat, present perfect, articles o passiva. Ningú no et diu quina — la pista és dins la frase.' },
  q3:      { es: 'Aciertes o falles, te sale al momento la regla que había detrás. Esa es la parte que se queda.', en: 'Right or wrong, you immediately get the rule behind it. That is the part that sticks.', ca: 'Encertis o falles, et surt a l’instant la regla que hi havia al darrere. Aquesta és la part que es queda.' },
  how:     { es: 'Cómo funciona', en: 'How it works', ca: 'Com funciona' },
  p1:      { es: 'Toca las piezas EN ORDEN. Los huecos de la frase te dicen cuántas hacen falta: unas respuestas son de una pieza y otras de dos o tres.', en: 'Tap the pieces IN ORDER. The gaps in the sentence tell you how many you need: some answers take one piece, others two or three.', ca: 'Toca les peces EN ORDRE. Els buits de la frase et diuen quantes en calen: unes respostes són d’una peça i altres de dues o tres.' },
  p2:      { es: 'Lo subrayado en la frase es la pista: es lo que decide la respuesta.', en: 'The underlined part of the sentence is the clue: it decides the answer.', ca: 'El que està subratllat a la frase és la pista: és el que decideix la resposta.' },
  p3:      { es: '“—” significa que ahí no va nada. En inglés pasa más de lo que parece.', en: '“—” means nothing goes there. In English that happens more often than you think.', ca: '“—” vol dir que allà no hi va res. En anglès passa més del que sembla.' },
  ptsVal:  { es: 'Acierto +1 y +2s · Fallo −5s · el reloj se para al leer la regla', en: 'Correct +1 and +2s · Wrong −5s · the clock stops while you read the rule', ca: 'Encert +1 i +2s · Error −5s · el rellotge s’atura mentre llegeixes la regla' },
  start:   { es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' },
  prompt:  { es: 'Completa la frase', en: 'Complete the sentence', ca: 'Completa la frase' },
  pieza:   { es: 'pieza', en: 'piece', ca: 'peça' },
  piezas:  { es: 'piezas', en: 'pieces', ca: 'peces' },
  clear:   { es: 'Borrar', en: 'Clear', ca: 'Esborrar' },
  skip:    { es: 'Paso', en: 'Skip', ca: 'Passo' },
  end:     { es: 'Tiempo', en: "Time's up", ca: 'Temps' },
  hits:    { es: 'frases', en: 'sentences', ca: 'frases' },
  scoreLbl:{ es: 'puntos', en: 'points', ca: 'punts' },
  back:    { es: '← Volver', en: '← Back', ca: '← Tornar' },
}
const T = (k, l) => C[k]?.[l] ?? C[k]?.es ?? k

// Etiqueta de lo que se está jugando: el tema, cuando llega asignado desde el
// catálogo, y "todo mezclado" en la partida normal.
const modoLabel = (id, l) => {
  const t = TEMAS[id]
  return t ? (t.label[l] ?? t.label.es) : T('mezcla', l)
}

function IntroScreen({ onSelect, l }) {
  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{T('badge', l)}</p>
        <h1 className="text-3xl font-black text-white text-center mb-1">{T('title', l)}</h1>
        <p className="text-white/40 text-sm text-center mb-6">{T('sub', l)}</p>

        {/* Lo primero que lee un alumno que no ha jugado nunca: qué es esto.
            "Todo mezclado" solo significa algo para quien ya lo conoce. */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 mb-3">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{T('queEs', l)}</p>
          <div className="space-y-2 text-white/70 text-sm">
            <p>{T('q1', l)}</p>
            <p>{T('q2', l)}</p>
            <p>{T('q3', l)}</p>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{T('how', l)}</p>
          <div className="space-y-2 text-white/60 text-sm">
            <p>{T('p1', l)}</p>
            <p>{T('p2', l)}</p>
            <p>{T('p3', l)}</p>
            <p className="text-white/40 text-xs pt-1">⏱️ {GAME_TIME}s · {T('ptsVal', l)}</p>
          </div>
        </div>

        <button onClick={onSelect}
          className="w-full py-3.5 rounded-2xl bg-[#EDAE49] text-black font-black text-lg hover:bg-amber-400 transition-colors">
          {T('start', l)}
        </button>
      </div>
    </div>
  )
}

export default function PiezaQueFalta() {
  const { lang, localPath } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'

  // Tarea del profesor / catálogo por tema: llega el tema resuelto y se juega
  // ese, sin pasar por el selector (ver ExamenTema.jsx). `backPath` devuelve a
  // la lista de tareas al terminar.
  const temaTarea = location.state?.tema
  const backPath = location.state?.backPath

  // Arranque directo desde una tarea: se juega el tema que llega, sin pasar por
  // el selector. La primera ronda se siembra AQUÍ, al crear el estado, y no en
  // un efecto: llamar a startGame desde un efecto de montaje sería un setState
  // síncrono dentro del efecto (react-hooks/set-state-in-effect) y provocaría
  // una cascada de renders.
  const [inicial] = useState(() => (temaTarea ? genRound(temaTarea) : null))
  const [screen, setScreen] = useState(temaTarea ? 'playing' : 'intro')
  const [tema] = useState(temaTarea ?? MEZCLA)
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [correctCount, setCorrectCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const [round, setRound] = useState(inicial)
  const [placed, setPlaced] = useState([])
  const [phase, setPhase] = useState('choose') // 'choose' | 'result'
  const [wasCorrect, setWasCorrect] = useState(null)

  const timerRef = useRef(null)
  const nextRef = useRef(null)
  const vistasRef = useRef(inicial ? [inicial.id] : [])
  const correctRef = useRef(0)
  useEffect(() => { correctRef.current = correctCount }, [correctCount])

  // Las piezas colocadas se llevan TAMBIÉN en un ref, y se lee de ahí. Dos
  // toques muy seguidos entran en el mismo lote de React, así que con el
  // `placed` del closure el segundo pisaría al primero; y con la actualización
  // funcional el array resultante se queda dentro del updater, donde no se
  // puede comprobar la respuesta sin volver a leerlo desde un efecto (que es
  // un setState dentro de un efecto, justo lo que este repo no hace).
  const placedRef = useRef([])
  const setPiezas = np => { placedRef.current = np; setPlaced(np) }

  const next = useCallback(t => {
    const r = genRound(t, { evitar: vistasRef.current })
    if (r) vistasRef.current = [r.id, ...vistasRef.current].slice(0, MEMORIA)
    setRound(r)
    setPiezas([])
    setPhase('choose')
    setWasCorrect(null)
  }, [])

  const startGame = useCallback(() => {
    setScreen('playing')
    setCorrectCount(0); setStreak(0)
    setTimeLeft(GAME_TIME)
    vistasRef.current = []
    next(tema)
  }, [next, tema])

  // Declarada ANTES del reloj que la llama: el temporizador la invoca desde
  // dentro de un setInterval y leerla más abajo dejaría el intervalo atado a
  // una versión vieja.
  function finish() {
    clearTimeout(nextRef.current)
    setScreen('end')
    const pts = correctRef.current * 10
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'pieza-que-falta',
        // La category ES el tema: así una tarea del profesor (materia → tema →
        // formato) se completa sola al jugarla. En mezcla no se puede decir qué
        // tema se practicó, y decir uno sería mentir.
        category: tema,
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('pieza-que-falta', { score: pts }),
        userName: user.displayName, userPhoto: user.photoURL,
      }).catch(() => {})
    }
  }

  useEffect(() => {
    // Parado en 'result': el tiempo que el alumno pasa leyendo por qué era esa
    // la respuesta no debe costarle la partida.
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

  function check(np) {
    const ok = esCorrecta(round, np.map(i => round.chips[i]))
    setWasCorrect(ok)
    setPhase('result')
    if (ok) {
      setCorrectCount(c => c + 1)
      setStreak(s => s + 1)
      setTimeLeft(t => t + CORRECT_TIME)
    } else {
      setStreak(0)
      setTimeLeft(t => Math.max(0, t - WRONG_TIME))
    }
    nextRef.current = setTimeout(() => next(tema), REVEAL_MS)
  }

  function place(i) {
    if (phase !== 'choose') return
    const p = placedRef.current
    if (p.includes(i)) return
    const np = [...p, i]
    setPiezas(np)
    // Al colocar la última pieza se comprueba sola: un toque menos con el
    // reloj corriendo.
    if (np.length === round.sol.length) check(np)
  }

  function remove(pos) {
    if (phase !== 'choose') return
    setPiezas(placedRef.current.filter((_, i) => i !== pos))
  }

  function skip() {
    if (phase !== 'choose') return
    setStreak(0)
    setTimeLeft(t => Math.max(0, t - WRONG_TIME))
    setWasCorrect(false)
    setPhase('result')
    nextRef.current = setTimeout(() => next(tema), REVEAL_MS)
  }

  const seo = {
    es: { title: 'La Pieza que Falta — Gramática inglesa jugando', desc: 'Completa la frase con las piezas correctas: present simple, past simple, present perfect, artículos y pasiva. Cada fallo explica la regla. Juego de inglés gratis.', path: '/juegos/pieza-que-falta' },
    en: { title: 'Missing Piece — English grammar game', desc: 'Complete the sentence with the right pieces: present simple, past simple, present perfect, articles and the passive. Every miss explains the rule. Free English game.', path: '/en/juegos/pieza-que-falta' },
    ca: { title: 'La Peça que Falta — Gramàtica anglesa jugant', desc: 'Completa la frase amb les peces correctes: present simple, past simple, present perfect, articles i passiva. Cada error explica la regla. Joc d’anglès gratis.', path: '/ca/juegos/pieza-que-falta' },
  }[l]

  if (screen === 'intro') {
    return (<><SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} /><IntroScreen onSelect={startGame} l={l} /></>)
  }

  if (screen === 'end') {
    const pts = correctCount * 10
    const temaLbl = modoLabel(tema, l)
    const msg = {
      es: correctCount === 0 ? '¡Sigue practicando!' : correctCount < 5 ? 'Buen comienzo' : correctCount < 10 ? '¡Bien hecho!' : '¡Gramática dominada! 💪',
      en: correctCount === 0 ? 'Keep practising!' : correctCount < 5 ? 'Good start' : correctCount < 10 ? 'Well done!' : 'Grammar mastered! 💪',
      ca: correctCount === 0 ? 'Segueix practicant!' : correctCount < 5 ? 'Bon començament' : correctCount < 10 ? 'Ben fet!' : 'Gramàtica dominada! 💪',
    }[l]
    const shareText = l === 'en'
      ? `I completed ${correctCount} sentences in Missing Piece 🧩 — can you beat me? https://tuthor.es/juegos/pieza-que-falta`
      : l === 'ca'
      ? `He completat ${correctCount} frases a La Peça que Falta 🧩 — pots superar-me? https://tuthor.es/juegos/pieza-que-falta`
      : `He completado ${correctCount} frases en La Pieza que Falta 🧩 — ¿puedes superarme? https://tuthor.es/juegos/pieza-que-falta`
    const secondary = []
    if (backPath) secondary.push({ label: T('back', l), onClick: () => navigate(localPath(backPath)) })
    return (
      <GameEndScreen game="pieza-que-falta" emoji="🧩" title={T('end', l)} score={pts} message={msg}
        stats={[{ label: T('hits', l), value: correctCount, emoji: '✅' }, { label: temaLbl, value: '', emoji: '📘' }]}
        shareText={shareText} user={user} lang={l}
        onPlayAgain={startGame}
        secondaryActions={secondary} />
    )
  }

  if (!round) return null

  const timerPct = timeLeft / GAME_TIME
  // Umbrales relativos, no absolutos: con la partida en 60 s, un "verde por
  // encima de 60" no se vería verde ni al empezar.
  const timerColor = timeLeft > GAME_TIME * 0.66 ? '#22c55e' : timeLeft > GAME_TIME * 0.28 ? '#f59e0b' : '#ef4444'
  const isResult = phase === 'result'
  const temaLbl = modoLabel(tema, l)

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      <div className="w-full max-w-[560px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">🧩 {temaLbl}</p>
          <p className="text-white font-bold text-lg flex items-center gap-2">
            {correctCount} {T('scoreLbl', l)}
            {streak >= 2 && <span className="text-orange-400 text-sm font-black">🔥 {streak}</span>}
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

      {/* Cuántas piezas pide la respuesta, dicho con todas las letras. Sin
          esto el jugador no sabe si "has" ya es la respuesta o le falta el
          participio, y como la partida se comprueba sola al rellenar el último
          hueco, se queda esperando un veredicto que no llega. */}
      <p className="text-white/70 text-sm mb-3 text-center px-2">
        {T('prompt', l)}
        <span className="text-white/40"> · {round.sol.length} {T(round.sol.length === 1 ? 'pieza' : 'piezas', l)}</span>
      </p>

      <div className="w-full max-w-[560px] mb-4">
        <PiezasBoard round={round} placed={placed} onPlace={place} onRemove={remove}
          reveal={isResult} ok={wasCorrect} l={l} />
      </div>

      {isResult ? (
        <div className="w-full max-w-[560px] px-1 space-y-2">
          <p className="text-center text-white font-bold text-lg">{solucionTexto(round)}</p>
          {/* La regla es lo que de verdad enseña: se muestra siempre, se acierte o no */}
          <div className="rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">
            <p className="text-white/70 text-sm">💡 {round.rule[l] ?? round.rule.es}</p>
          </div>
          <p className="text-center text-xs font-bold">
            {wasCorrect
              ? <span className="text-green-400">+1 · +{CORRECT_TIME}s ⏱️{streak >= 2 ? ` · 🔥 ${streak}` : ''}</span>
              : <span className="text-red-400">−{WRONG_TIME}s ⏱️</span>}
          </p>
        </div>
      ) : (
        <div className="w-full max-w-[560px] px-1 flex gap-2">
          <button onClick={() => setPiezas([])} disabled={placed.length === 0}
            className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 font-semibold hover:bg-white/10 disabled:opacity-40 transition text-sm">
            {T('clear', l)}
          </button>
          <button onClick={skip}
            className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/50 font-semibold hover:bg-white/10 transition text-sm">
            {T('skip', l)}
          </button>
        </div>
      )}
    </div>
  )
}
