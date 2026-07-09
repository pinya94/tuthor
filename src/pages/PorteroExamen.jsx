import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import PageMeta from '../components/PageMeta'
import QuizSchema from '../components/QuizSchema'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import CoinsAnimation from '../components/CoinsAnimation'
import { POOLS } from '../data/porteroLevels'
import {
  VIEW, W, H, ANIM_DURATION,
  toSVG, GridLines, Ball, FnCurve,
} from './TrayectoriaField'

const TOTAL = 10

// ── Zone definitions (same as Portero.jsx) ───────────────────────────────────

const GOAL_ZONES = [
  { id: 'A', yMin: 2,  yMax: 4,  label: { es: 'Zona alta',   en: 'High zone',     ca: 'Zona alta'   }, range: { es: 'y ≥ 2',      en: 'y ≥ 2',     ca: 'y ≥ 2'      }, color: '#3b82f6', arrow: '⬆' },
  { id: 'B', yMin: 0,  yMax: 2,  label: { es: 'Centro-alto', en: 'Upper centre',  ca: 'Centre-alt'  }, range: { es: '0 ≤ y < 2',  en: '0 ≤ y < 2', ca: '0 ≤ y < 2'  }, color: '#22c55e', arrow: '↗' },
  { id: 'C', yMin: -2, yMax: 0,  label: { es: 'Centro-bajo', en: 'Lower centre',  ca: 'Centre-baix' }, range: { es: '−2 ≤ y < 0', en: '−2 ≤ y < 0',ca: '−2 ≤ y < 0' }, color: '#f59e0b', arrow: '↘' },
  { id: 'D', yMin: -4, yMax: -2, label: { es: 'Zona baja',   en: 'Low zone',      ca: 'Zona baixa'  }, range: { es: 'y < −2',     en: 'y < −2',    ca: 'y < −2'     }, color: '#ef4444', arrow: '⬇' },
]

function getZone(y) {
  if (y >= 2)  return 'A'
  if (y >= 0)  return 'B'
  if (y >= -2) return 'C'
  return 'D'
}

// ── Build exam: 3 easy, 3 medium, 4 hard ─────────────────────────────────────

function buildExam() {
  const pick = (pool, n) => [...pool].sort(() => Math.random() - 0.5).slice(0, n)
  return [
    ...pick(POOLS.easy,   3),
    ...pick(POOLS.medium, 3),
    ...pick(POOLS.hard,   4),
  ]
}

// ── Field SVG ─────────────────────────────────────────────────────────────────

function GoalZones({ goalX, chosen, correctZone, phase }) {
  const depth = 18
  return (
    <>
      {GOAL_ZONES.map(z => {
        const [gx, pyTop] = toSVG(goalX, z.yMax)
        const [,   pyBot] = toSVG(goalX, z.yMin)
        const height = pyBot - pyTop
        const isChosen  = chosen === z.id
        const isCorrect = phase === 'result' && correctZone === z.id
        const isWrong   = phase === 'result' && isChosen && !isCorrect
        let fill   = z.color + '28'
        let stroke = z.color + '55'
        if (isCorrect) { fill = z.color + '70'; stroke = z.color }
        if (isWrong)   { fill = '#ef444430';     stroke = '#ef4444' }
        return (
          <g key={z.id}>
            <rect x={gx} y={pyTop} width={depth} height={height} fill={fill} stroke={stroke} strokeWidth={1.5} />
            <text x={gx + depth / 2} y={pyTop + height / 2 + 4} textAnchor="middle" fontSize="9" fontWeight="bold"
              fill={z.color} style={{ userSelect: 'none' }}>{z.id}</text>
            <line x1={gx} y1={pyTop + height / 2} x2={gx + depth} y2={pyTop + height / 2}
              stroke={z.color + '40'} strokeWidth={0.7} />
          </g>
        )
      })}
      {(() => {
        const [gx, pyTop] = toSVG(goalX, 4)
        const [,   pyBot] = toSVG(goalX, -4)
        return (
          <>
            <line x1={gx + depth} y1={pyTop} x2={gx + depth} y2={pyBot} stroke="#ffffff30" strokeWidth={1} />
            <line x1={gx} y1={pyTop} x2={gx} y2={pyBot} stroke="white" strokeWidth={3} />
            <line x1={gx} y1={pyTop} x2={gx + depth} y2={pyTop} stroke="white" strokeWidth={2.5} />
            <line x1={gx} y1={pyBot} x2={gx + depth} y2={pyBot} stroke="white" strokeWidth={2.5} />
            {GOAL_ZONES.slice(0, 3).map(z => {
              const [, py] = toSVG(goalX, z.yMin)
              return <line key={z.id} x1={gx} y1={py} x2={gx + depth} y2={py} stroke="#ffffff50" strokeWidth={1} />
            })}
          </>
        )
      })()}
      {phase === 'result' && correctZone && (() => {
        const z = GOAL_ZONES.find(z => z.id === correctZone)
        if (!z) return null
        const [gx, pyTop] = toSVG(goalX, z.yMax)
        const [,   pyBot] = toSVG(goalX, z.yMin)
        const cy = (pyTop + pyBot) / 2
        return (
          <text x={gx + depth / 2} y={cy + 7} textAnchor="middle" fontSize="14" style={{ userSelect: 'none' }}>
            {chosen === correctZone ? '🧤' : '⚽'}
          </text>
        )
      })()}
    </>
  )
}

function ExamField({ question, phase, chosen, ballPos, trail }) {
  if (!question) return null
  const { fn, startX, goalX } = question
  const correctZone = getZone(fn(goalX))
  const [startPx, startPy] = toSVG(startX, fn(startX))
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      <GridLines />
      <GoalZones goalX={goalX} chosen={chosen} correctZone={correctZone} phase={phase} />
      {(() => {
        const [gx, py0] = toSVG(goalX, 0)
        return <text x={gx - 2} y={py0 + 14} textAnchor="middle" fontSize="8" fill="#ffffff50" style={{ userSelect: 'none' }}>x={goalX}</text>
      })()}
      {phase === 'choose' && (
        <g>
          <circle cx={startPx} cy={startPy} r={22} fill="none" stroke="#EDAE4930" strokeWidth={1.5} />
          <circle cx={startPx} cy={startPy} r={15} fill="#EDAE4918" stroke="#EDAE4960" strokeWidth={1.5} />
          <text x={startPx} y={startPy - 20} textAnchor="middle" fontSize="7" fill="#EDAE49cc"
            fontWeight="bold" letterSpacing="1" style={{ userSelect: 'none' }}>INICIO</text>
          <line x1={startPx} y1={startPy - 16} x2={startPx} y2={startPy - 12} stroke="#EDAE4970" strokeWidth={1} />
          <text x={startPx} y={startPy + 6} textAnchor="middle" fontSize="17" style={{ userSelect: 'none' }}>⚽</text>
        </g>
      )}
      {(phase === 'animating' || phase === 'result') && (
        <FnCurve fn={fn} color="#EDAE4980" xStart={startX} xEnd={goalX + 0.3} />
      )}
      {ballPos && <Ball x={ballPos[0]} y={ballPos[1]} trail={trail} />}
    </svg>
  )
}

// ── Intro ─────────────────────────────────────────────────────────────────────

function Intro({ onStart, l }) {
  const T = (es, en, ca) => l === 'en' ? en : l === 'ca' ? ca : es
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">
          {T('Matemáticas · Funciones', 'Maths · Functions', 'Matemàtiques · Funcions')}
        </p>
        <h1 className="text-3xl font-black text-white text-center mb-1">
          🧤 {T('Examen Portero', 'Goalkeeper Exam', 'Examen Porter')}
        </h1>
        <p className="text-white/40 text-sm text-center mb-8">
          {T('10 tiros · Calcula la zona y para el balón', '10 shots · Calculate the zone and save', '10 tirs · Calcula la zona i atura la pilota')}
        </p>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 space-y-5">
          {[
            ['📋', T('10 preguntas', '10 questions', '10 preguntes'), T('3 fáciles, 3 medias y 4 difíciles. Sin tiempo límite.', '3 easy, 3 medium and 4 hard. No time limit.', '3 fàcils, 3 mitjanes i 4 difícils. Sense límit de temps.')],
            ['🧮', T('Calcula f(x₀)', 'Calculate f(x₀)', 'Calcula f(x₀)'), T('Sustituye x₀ (posición de portería) en la función y determina la zona.', 'Substitute x₀ (goal position) in the function and determine the zone.', 'Substitueix x₀ (posició de porteria) a la funció i determina la zona.')],
            ['💡', T('Explicación tras cada tiro', 'Feedback after each shot', 'Explicació després de cada tir'), T('Verás el cálculo correcto y la zona real del balón.', "You'll see the correct calculation and the ball's real zone.", 'Veuràs el càlcul correcte i la zona real de la pilota.')],
            ['🏆', T('Puntuación final', 'Final score', 'Puntuació final'), T('Cuántas paradas has hecho sobre 10.', 'How many saves out of 10.', 'Quantes aturades has fet sobre 10.')],
          ].map(([emoji, title, desc]) => (
            <div key={title} className="flex items-start gap-4">
              <span className="text-2xl mt-0.5">{emoji}</span>
              <div>
                <p className="font-bold text-white text-sm">{title}</p>
                <p className="text-white/50 text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onStart}
          className="w-full bg-[#EDAE49] hover:bg-amber-400 text-black font-black py-4 rounded-xl transition-colors text-lg mb-3">
          {T('Empezar examen →', 'Start exam →', 'Començar examen →')}
        </button>
        <Link to="/juegos/portero"
          className="block text-center text-white/40 hover:text-white/70 text-sm transition-colors">
          {T('← Volver al modo partido', '← Back to match mode', '← Tornar al mode partit')}
        </Link>
      </div>
    </div>
  )
}

// ── End screen ────────────────────────────────────────────────────────────────

function ExamEnd({ score, results, onRetry, l }) {
  const T = (es, en, ca) => l === 'en' ? en : l === 'ca' ? ca : es
  const pct = score / TOTAL
  const grade = pct === 1 ? '🏆' : pct >= 0.8 ? '⭐' : pct >= 0.6 ? '✅' : pct >= 0.4 ? '📚' : '💪'
  const msg =
    score === TOTAL ? T('¡Perfecto! Eres el portero del año.', 'Perfect! You\'re goalkeeper of the year.', 'Perfecte! Ets el porter de l\'any.') :
    pct >= 0.8     ? T('Muy bien. Repasa los que fallaste.', 'Very good. Review your misses.', 'Molt bé. Repassa els que has fallat.') :
    pct >= 0.6     ? T('Bien encaminado. Sigue calculando funciones.', 'On the right track. Keep practising.', 'Bon camí. Continua practicant.') :
    pct >= 0.4     ? T('Hay margen de mejora. ¡Repasa la teoría!', 'Room to improve. Review the theory!', 'Hi ha marge de millora. Repassa la teoria!') :
                     T('Empieza repasando funciones lineales. ¡Tú puedes!', 'Start by reviewing linear functions. You\'ve got this!', 'Comença repassant funcions lineals. Tu pots!')

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <p className="text-6xl text-center mb-3">{grade}</p>
        <p className="text-white/40 text-sm text-center mb-1">{T('Examen completado', 'Exam complete', 'Examen completat')}</p>
        <p className="text-5xl font-black text-white text-center mb-1">{score}</p>
        <p className="text-white/60 text-lg text-center mb-2">{T('paradas de 10', 'saves out of 10', 'aturades de 10')}</p>
        <p className="text-[#EDAE49] font-bold text-center mb-8">{msg}</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">{T('Resumen', 'Summary', 'Resum')}</p>
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span>{r.saved ? '🧤' : '⚽'}</span>
                <span className="font-mono text-white/70 flex-1 truncate">{r.label}</span>
                <span className={`text-xs font-bold ${r.saved ? 'text-green-400' : 'text-red-400'}`}>
                  {r.saved ? T('Parada', 'Save', 'Aturada') : T('Gol', 'Goal', 'Gol')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button onClick={onRetry}
            className="px-6 py-3 rounded-full bg-[#EDAE49] text-black font-bold hover:bg-[#f5c16c] transition-colors">
            {T('▶ Repetir examen', '▶ Retry exam', '▶ Repetir examen')}
          </button>
          <Link to="/juegos/portero"
            className="px-6 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors text-center">
            {T('Modo partido (90 s)', 'Match mode (90 s)', 'Mode partit (90 s)')}
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Main exam ─────────────────────────────────────────────────────────────────

export default function PorteroExamen() {
  const { lang } = useLang()
  const { user } = useAuth()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'
  const T = (es, en, ca) => l === 'en' ? en : l === 'ca' ? ca : es
  const metaTitle = T('Examen Portero — Funciones', 'Goalkeeper Exam — Functions', 'Examen Porter — Funcions')
  const metaDesc  = T(
    'Examen de funciones tipo portero: calcula f(x₀) y decide en qué zona entra el balón. 10 preguntas, sin tiempo.',
    'Goalkeeper-style functions exam: calculate f(x₀) and decide which zone the ball enters. 10 questions, no time limit.',
    'Examen de funcions tipus porter: calcula f(x₀) i decideix en quina zona entra la pilota. 10 preguntes, sense temps.',
  )

  const [screen, setScreen]       = useState('intro')
  const [questions, setQuestions] = useState([])
  const [qIdx, setQIdx]           = useState(0)
  const [score, setScore]         = useState(0)
  const [results, setResults]     = useState([])

  const [phase, setPhase]         = useState('choose')
  const [chosen, setChosen]       = useState(null)
  const [ballPos, setBallPos]     = useState(null)
  const [trail, setTrail]         = useState([])
  const [outcome, setOutcome]     = useState(null) // 'save' | 'goal'

  const animRef      = useRef(null)
  const startTimeRef = useRef(null)
  const scoreRef     = useRef(0)
  useEffect(() => { scoreRef.current = score }, [score])

  useEffect(() => {
    if (screen !== 'end') return
    const timeSpent = startTimeRef.current ? Math.round((Date.now() - startTimeRef.current) / 1000) : 0
    const pts = Math.round((scoreRef.current / TOTAL) * 100)
    const coinsEarned = Math.round((scoreRef.current / TOTAL) * 200)
    if (user?.uid) {
      saveActivity(user.uid, {
        type: 'examen', game: 'portero-examen', category: 'portero-examen',
        score: pts, coinsEarned, passed: scoreRef.current >= 5, timeSpent,
      }).catch(() => {})
    }
  }, [screen, user])

  function startExam() {
    setQuestions(buildExam())
    setQIdx(0)
    setScore(0)
    setResults([])
    resetQ()
    startTimeRef.current = Date.now()
    setScreen('playing')
  }

  function resetQ() {
    setPhase('choose')
    setChosen(null)
    setBallPos(null)
    setTrail([])
    setOutcome(null)
    if (animRef.current) cancelAnimationFrame(animRef.current)
  }

  function nextQ() {
    if (qIdx + 1 >= questions.length) setScreen('end')
    else { setQIdx(i => i + 1); resetQ() }
  }

  const question = questions[qIdx] ?? null

  function handlePick(zoneId) {
    if (phase !== 'choose' || !question) return
    setChosen(zoneId)
    setPhase('animating')

    const { fn, startX, goalX } = question
    const endX = goalX + 0.3
    const start = Date.now()
    const trailPoints = []

    function animate() {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / ANIM_DURATION, 1)
      const x = startX + progress * (endX - startX)
      let y; try { y = fn(x) } catch { y = null }

      const inView = y !== null && isFinite(y) && y >= VIEW.yMin - 0.5 && y <= VIEW.yMax + 0.5
      if (inView) {
        trailPoints.push(toSVG(x, y))
        setBallPos([x, y])
        setTrail([...trailPoints].slice(-50))
      } else {
        setBallPos([x, y])
      }

      if (x >= goalX - 0.1) {
        let yAtGoal; try { yAtGoal = fn(goalX) } catch { yAtGoal = null }
        const correctZone = yAtGoal !== null && isFinite(yAtGoal) ? getZone(yAtGoal) : null
        const saved = correctZone === zoneId
        if (saved) setScore(s => s + 1)
        setOutcome(saved ? 'save' : 'goal')
        setPhase('result')
        setResults(prev => [...prev, { saved, label: question.label }])
        return
      }

      if (progress < 1) animRef.current = requestAnimationFrame(animate)
      else {
        setOutcome('goal')
        setPhase('result')
        setResults(prev => [...prev, { saved: false, label: question.label }])
      }
    }
    animRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => () => { if (animRef.current) cancelAnimationFrame(animRef.current) }, [])

  const pageMeta = <PageMeta title={metaTitle} description={metaDesc} path="/examen/portero" lang={lang} />
  const quizSchema = <QuizSchema
    name={metaTitle} description={metaDesc} path="/examen/portero" lang={lang}
    subject={T('Funciones matemáticas', 'Mathematical Functions', 'Funcions matemàtiques')}
    level="secondary" />
  if (screen === 'intro') return <>{pageMeta}{quizSchema}<Intro onStart={startExam} l={l} /></>
  if (screen === 'end') return (
    <>
      {pageMeta}{quizSchema}
      <ExamEnd score={score} results={results} onRetry={startExam} l={l} />
      {score > 0 && <CoinsAnimation coins={Math.round((score / TOTAL) * 200)} />}
    </>
  )
  if (!question) return null

  const { fn, goalX, label, startX } = question
  const correctZone = getZone(fn(goalX))
  const isLast = qIdx + 1 >= TOTAL

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-4">
      {pageMeta}{quizSchema}
      {/* Header */}
      <div className="w-full max-w-[520px] flex items-center justify-between mb-3 px-2">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">🧤 {T('Examen · Funciones', 'Exam · Functions', 'Examen · Funcions')}</p>
          <p className="text-white font-bold text-lg">{score} 🧤 · {T(`Pregunta ${qIdx + 1} de ${TOTAL}`, `Question ${qIdx + 1} of ${TOTAL}`, `Pregunta ${qIdx + 1} de ${TOTAL}`)}</p>
        </div>
        <div className="flex gap-1">
          {Array.from({ length: TOTAL }).map((_, i) => {
            const r = results[i]
            const bg = r ? (r.saved ? 'bg-green-500' : 'bg-red-500') : i === qIdx ? 'bg-white/60' : 'bg-white/15'
            return <div key={i} className={`w-3 h-3 rounded-full ${bg} transition-colors`} />
          })}
        </div>
      </div>

      {/* Equation card */}
      <div className="w-full max-w-[520px] mb-3 px-2">
        <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-white/40 text-[10px] uppercase tracking-widest mb-0.5">
              {T('¿A qué zona llega el balón? · Portería en x =', 'Which zone does the ball reach? · Goal at x =', 'A quina zona arriba la pilota? · Porteria a x =')} {goalX}
            </p>
            <p className="text-white font-black text-xl font-mono">{label}</p>
          </div>
          <div className="text-right shrink-0 space-y-1">
            <div>
              <p className="text-[#EDAE49]/50 text-[9px]">⚽ {T('Balón en', 'Ball at', 'Pilota a')}</p>
              <p className="text-[#EDAE49]/80 font-mono text-xs font-bold">x = {startX}</p>
            </div>
            <div>
              <p className="text-white/30 text-[9px]">🥅 {T('Portería en', 'Goal at', 'Porteria a')}</p>
              <p className="text-white/70 font-mono text-xs font-bold">x = {goalX}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Field */}
      <div className="relative w-full max-w-[520px] rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] mb-3 mx-2">
        <ExamField question={question} phase={phase} chosen={chosen} ballPos={ballPos} trail={trail} />

        {phase === 'result' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 backdrop-blur-sm px-4">
            <p className="text-4xl mb-1">{outcome === 'save' ? '🧤' : '⚽'}</p>
            <p className={`font-black text-xl mb-1 ${outcome === 'save' ? 'text-green-400' : 'text-red-400'}`}>
              {outcome === 'save' ? T('¡Parada!', 'Save!', 'Aturada!') : T('¡Gol en contra!', 'Goal conceded!', 'Gol en contra!')}
            </p>
            <p className="text-white/50 text-xs mb-1">
              {T('Zona correcta:', 'Correct zone:', 'Zona correcta:')} <span className="text-white font-bold">{correctZone}</span>
            </p>
            <p className="text-[#EDAE49] text-sm font-mono text-center mb-4">
              {question.explanation?.[l] ?? question.explanation?.es ?? ''}
            </p>
            <button onClick={nextQ}
              className="px-5 py-2 rounded-full bg-[#EDAE49] text-black font-bold text-sm hover:bg-[#f5c16c] transition-colors">
              {isLast ? T('Ver resultados →', 'See results →', 'Veure resultats →') : T('Siguiente →', 'Next →', 'Següent →')}
            </button>
          </div>
        )}
      </div>

      {/* Zone buttons */}
      <div className="w-full max-w-[520px] px-2">
        <p className="text-white/50 text-xs text-center mb-2">
          {T('¿En qué zona entra el balón?', 'Which zone does the ball enter?', 'En quina zona entra la pilota?')}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {GOAL_ZONES.map(z => {
            const isChosen  = chosen === z.id
            const isCorrect = phase === 'result' && correctZone === z.id
            const isWrong   = phase === 'result' && isChosen && !isCorrect

            let cls = 'bg-white/5 hover:bg-white/10 border-white/10'
            if (isCorrect) cls = 'border-green-500 bg-green-500/20'
            if (isWrong)   cls = 'border-red-500 bg-red-500/20'
            if (phase === 'result' && !isCorrect && !isWrong) cls = 'border-white/10 bg-white/5 opacity-40'

            return (
              <button key={z.id} onClick={() => handlePick(z.id)}
                disabled={phase !== 'choose'}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${cls}`}>
                <span className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-sm shrink-0"
                  style={{ background: z.color + '40', color: z.color }}>{z.id}</span>
                <span className="text-left min-w-0">
                  <span className="block text-white font-semibold text-sm leading-tight">{z.label[l] ?? z.label.es}</span>
                  <span className="block text-white/40 font-mono text-xs">{z.range[l] ?? z.range.es}</span>
                </span>
                <span className="ml-auto text-lg">{z.arrow}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
