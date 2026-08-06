import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { genRound, isCorrectOrder, sentenceText } from '../lib/ordenaFrase'
import GameEndScreen from '../components/GameEndScreen'
import OrdenaFraseBoard from '../components/OrdenaFraseBoard'
import SEOHead from '../components/SEOHead'

const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 5
const REVEAL_MS = 2200

const C = {
  badge:  { es: 'Inglés · Word order', en: 'English · Word order', ca: 'Anglès · Word order' },
  title:  { es: '🔤 Ordena la Frase', en: '🔤 Word Order', ca: '🔤 Ordena la Frase' },
  sub:    { es: 'Coloca las palabras en el orden correcto en inglés', en: 'Put the words in the right English order', ca: 'Col·loca les paraules en l’ordre correcte en anglès' },
  how:    { es: 'Cómo funciona', en: 'How it works', ca: 'Com funciona' },
  p1:     { es: 'El inglés tiene un orden fijo; el español no. Traducir palabra a palabra falla.', en: 'English word order is fixed; Spanish is not. Translating word by word fails.', ca: 'L’anglès té un ordre fix; el castellà no. Traduir paraula a paraula falla.' },
  p2:     { es: 'Toca las palabras en orden para formar la frase. Toca una colocada para quitarla.', en: 'Tap the words in order to build the sentence. Tap a placed word to take it back.', ca: 'Toca les paraules en ordre per formar la frase. Toca’n una de col·locada per treure-la.' },
  p3:     { es: 'Al comprobar verás la regla: adjetivo antes del nombre, adverbio de frecuencia antes del verbo…', en: 'On checking you see the rule: adjective before noun, frequency adverb before the verb…', ca: 'En comprovar veuràs la regla: adjectiu abans del nom, adverbi de freqüència abans del verb…' },
  time:   { es: 'Tiempo', en: 'Time', ca: 'Temps' },
  timeVal:{ es: '90 segundos', en: '90 seconds', ca: '90 segons' },
  pts:    { es: 'Puntos', en: 'Points', ca: 'Punts' },
  ptsVal: { es: 'Acierto +1 y +5s · Fallo −5s', en: 'Correct +1 and +5s · Wrong −5s', ca: 'Encert +1 i +5s · Error −5s' },
  start:  { es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' },
  prompt: { es: 'Ordena la frase', en: 'Put the sentence in order', ca: 'Ordena la frase' },
  check:  { es: 'Comprobar', en: 'Check', ca: 'Comprovar' },
  clear:  { es: 'Borrar', en: 'Clear', ca: 'Esborrar' },
  skip:   { es: 'Paso', en: 'Skip', ca: 'Passo' },
  next:   { es: 'Siguiente →', en: 'Next →', ca: 'Següent →' },
  end:    { es: 'Tiempo', en: "Time's up", ca: 'Temps' },
  hits:   { es: 'frases', en: 'sentences', ca: 'frases' },
  scoreLbl:{ es: 'puntos', en: 'points', ca: 'punts' },
  changeDif:{ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' },
  exam:   { es: 'Modo examen (sin tiempo) →', en: 'Exam mode (no timer) →', ca: 'Mode examen (sense temps) →' },
}
function T(k, l) { return C[k]?.[l] ?? C[k]?.es ?? k }

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, desc: { es: 'Sujeto + verbo + objeto y adjetivos', en: 'Subject + verb + object and adjectives', ca: 'Subjecte + verb + objecte i adjectius' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, desc: { es: 'Adverbios, negativas y preguntas', en: 'Adverbs, negatives and questions', ca: 'Adverbis, negatives i preguntes' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, desc: { es: 'Lugar y tiempo, wh- y el verbo be', en: 'Place and time, wh- and the verb be', ca: 'Lloc i temps, wh- i el verb be' } },
}

function DifficultyScreen({ onSelect, l }) {
  const [dif, setDif] = useState('facil')
  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{T('badge', l)}</p>
        <h1 className="text-3xl font-black text-white text-center mb-1">{T('title', l)}</h1>
        <p className="text-white/40 text-sm text-center mb-6">{T('sub', l)}</p>

        <div className="flex flex-wrap justify-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xl mb-3 mx-auto">
          {Object.entries(DIFS).map(([id, d]) => (
            <button key={id} onClick={() => setDif(id)}
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${dif === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'}`}>
              {d.emoji} {d.label[l] ?? d.label.es}
            </button>
          ))}
        </div>
        <p className="text-white/40 text-xs text-center mb-5">{DIFS[dif].desc[l] ?? DIFS[dif].desc.es}</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-4">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{T('how', l)}</p>
          <div className="space-y-2">
            {[['🔤', T('p1', l)], ['👆', T('p2', l)], ['💡', T('p3', l)]].map(([e, text]) => (
              <div key={text} className="flex items-start gap-3 text-sm text-white/50">
                <span className="text-base w-5 shrink-0 text-center">{e}</span><span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 space-y-2.5 text-sm">
          {[['⏱️', T('time', l), T('timeVal', l)], ['⭐', T('pts', l), T('ptsVal', l)]].map(([e, k, v]) => (
            <div key={k} className="flex items-start justify-between gap-4">
              <span className="text-white/40 shrink-0 pt-0.5">{e} {k}</span>
              <span className="text-white font-semibold text-right">{v}</span>
            </div>
          ))}
        </div>

        <button onClick={() => onSelect(dif)}
          className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/20 mb-3">
          {T('start', l)}
        </button>
        <Link to="/examen/ordena-frase-test"
          className="block text-center text-white/30 hover:text-white/60 text-sm transition-colors">
          {T('exam', l)}
        </Link>
      </div>
    </div>
  )
}

export default function OrdenaFrase() {
  const { lang } = useLang()
  const { user } = useAuth()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'

  const [screen, setScreen] = useState('difficulty')
  const [difficulty, setDifficulty] = useState('facil')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [score, setScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [streak, setStreak] = useState(0)
  const [round, setRound] = useState(null)
  const [placed, setPlaced] = useState([])
  const [phase, setPhase] = useState('choose') // 'choose' | 'result'
  const [wasCorrect, setWasCorrect] = useState(null)

  const timerRef = useRef(null)
  const nextRef = useRef(null)
  const scoreRef = useRef(0)
  useEffect(() => { scoreRef.current = score }, [score])

  const next = useCallback(diff => {
    setRound(genRound(diff))
    setPlaced([])
    setPhase('choose')
    setWasCorrect(null)
  }, [])

  function startGame(diff) {
    setDifficulty(diff)
    setScreen('playing')
    setScore(0); setCorrectCount(0); setStreak(0)
    setTimeLeft(GAME_TIME)
    next(diff)
  }

  // Reloj
  useEffect(() => {
    if (screen !== 'playing') return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); finish(); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [screen]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => () => clearTimeout(nextRef.current), [])

  function finish() {
    clearTimeout(nextRef.current)
    setScreen('end')
    const pts = scoreRef.current * 10
    if (user) {
      saveActivity(user.uid, {
        type: 'juego', game: 'ordena-frase', category: 'ingles',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('ordena-frase', { score: pts }),
        userName: user.displayName, userPhoto: user.photoURL,
      }).catch(() => {})
    }
  }

  // Actualización funcional: dos toques muy seguidos entran en el mismo lote de
  // React y con `placed` del closure el segundo pisaría al primero.
  function place(i) {
    if (phase !== 'choose') return
    setPlaced(p => (p.includes(i) ? p : [...p, i]))
  }

  function remove(pos) {
    if (phase !== 'choose') return
    setPlaced(p => p.filter((_, i) => i !== pos))
  }

  // Al colocar la última ficha se comprueba sola: menos toques con el reloj
  // corriendo. Va en un efecto porque `place` ya no conoce el array resultante.
  useEffect(() => {
    if (phase !== 'choose' || !round) return
    if (placed.length === round.chips.length) check(placed)
  }, [placed, phase, round]) // eslint-disable-line react-hooks/exhaustive-deps

  function check(np) {
    const ok = isCorrectOrder(round, np.map(i => round.chips[i]))
    setWasCorrect(ok)
    setPhase('result')
    if (ok) {
      setScore(s => s + 1)
      setCorrectCount(c => c + 1)
      setStreak(s => s + 1)
      setTimeLeft(t => t + CORRECT_TIME)
    } else {
      setStreak(0)
      setTimeLeft(t => Math.max(0, t - WRONG_TIME))
    }
    nextRef.current = setTimeout(() => next(difficulty), REVEAL_MS)
  }

  function skip() {
    if (phase !== 'choose') return
    setStreak(0)
    setTimeLeft(t => Math.max(0, t - WRONG_TIME))
    setWasCorrect(false)
    setPhase('result')
    nextRef.current = setTimeout(() => next(difficulty), REVEAL_MS)
  }

  const seo = {
    es: { title: 'Ordena la Frase — Orden de las palabras en inglés', desc: 'Coloca las palabras en el orden correcto en inglés: adjetivo antes del nombre, adverbios de frecuencia, preguntas con auxiliar. Aprende word order jugando. Juego de inglés gratis.', path: '/juegos/ordena-frase' },
    en: { title: 'Word Order — English sentence order game', desc: 'Put the words in the right English order: adjective before noun, frequency adverbs, questions with auxiliaries. Learn word order by playing. Free English game.', path: '/en/juegos/ordena-frase' },
    ca: { title: 'Ordena la Frase — Ordre de les paraules en anglès', desc: 'Col·loca les paraules en l’ordre correcte en anglès: adjectiu abans del nom, adverbis de freqüència, preguntes amb auxiliar. Aprèn word order jugant. Joc d’anglès gratis.', path: '/ca/juegos/ordena-frase' },
  }[l]

  if (screen === 'difficulty') {
    return (<><SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} /><DifficultyScreen onSelect={startGame} l={l} /></>)
  }

  if (screen === 'end') {
    const pts = score * 10
    const msg = { es: score === 0 ? '¡Sigue practicando!' : score < 5 ? 'Buen comienzo' : score < 10 ? '¡Bien hecho!' : '¡Word order dominado! 💪', en: score === 0 ? 'Keep practising!' : score < 5 ? 'Good start' : score < 10 ? 'Well done!' : 'Word order mastered! 💪', ca: score === 0 ? 'Segueix practicant!' : score < 5 ? 'Bon començament' : score < 10 ? 'Ben fet!' : 'Word order dominat! 💪' }[l]
    const shareText = l === 'en'
      ? `I ordered ${correctCount} sentences in Word Order 🔤 — can you beat me? https://tuthor.es/juegos/ordena-frase`
      : l === 'ca'
      ? `He ordenat ${correctCount} frases a Ordena la Frase 🔤 — pots superar-me? https://tuthor.es/juegos/ordena-frase`
      : `He ordenado ${correctCount} frases en Ordena la Frase 🔤 — ¿puedes superarme? https://tuthor.es/juegos/ordena-frase`
    return (
      <GameEndScreen game="ordena-frase" emoji="🔤" title={T('end', l)} score={pts} message={msg}
        stats={[{ label: T('hits', l), value: correctCount, emoji: '✅' }]}
        shareText={shareText} user={user} lang={l}
        onPlayAgain={() => startGame(difficulty)}
        secondaryActions={[{ label: T('changeDif', l), onClick: () => setScreen('difficulty') }]} />
    )
  }

  if (!round) return null

  const timerPct = timeLeft / GAME_TIME
  const timerColor = timeLeft > 60 ? '#22c55e' : timeLeft > 25 ? '#f59e0b' : '#ef4444'
  const isResult = phase === 'result'

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      <div className="w-full max-w-[560px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">🔤 {DIFS[difficulty].label[l] ?? DIFS[difficulty].label.es}</p>
          <p className="text-white font-bold text-lg flex items-center gap-2">
            {score} {T('scoreLbl', l)}
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

      <p className="text-white/70 text-sm mb-3 text-center px-2">{T('prompt', l)}</p>

      <div className="w-full max-w-[560px] mb-3">
        <OrdenaFraseBoard chips={round.chips} placed={placed} reveal={isResult}
          correct={wasCorrect} solution={round.solution}
          onPlace={place} onRemove={remove} l={l} />
      </div>

      {isResult ? (
        <div className="w-full max-w-[560px] px-1 space-y-2">
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
          <button onClick={() => setPlaced([])} disabled={placed.length === 0}
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
