import { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import PageMeta from '../components/PageMeta'
import QuizSchema from '../components/QuizSchema'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import CoinsAnimation from '../components/CoinsAnimation'
import { EASY, MEDIUM, HARD } from '../data/trayectoriaLevels'
import {
  VIEW, W, H, ANIM_DURATION,
  toSVG, GridLines, Goal, Barrier, Ball, FnCurve,
  computeOptionColors, StartingBalls,
} from './TrayectoriaField'

const TOTAL = 10

// Pick 10 questions: 3 easy, 3 medium, 4 hard — shuffled within each pool
function buildExam() {
  const pick = (pool, n) => [...pool].sort(() => Math.random() - 0.5).slice(0, n)
  return [
    ...pick(EASY, 3),
    ...pick(MEDIUM, 3),
    ...pick(HARD, 4),
  ]
}

// ── Intro ────────────────────────────────────────────────────────────────────

function Intro({ onStart, l }) {
  const copy = {
    badge:  { es: 'Matemáticas · Funciones', en: 'Maths · Functions', ca: 'Matemàtiques · Funcions' },
    title:  { es: '⚽ Examen Trayectoria', en: '⚽ Trajectory Exam', ca: '⚽ Examen Trajectòria' },
    sub:    { es: '10 tiros · Elige la función que mete gol', en: '10 shots · Pick the function that scores', ca: '10 tirs · Tria la funció que marca gol' },
    r1t:    { es: '10 preguntas', en: '10 questions', ca: '10 preguntes' },
    r1d:    { es: '3 fáciles, 3 medias y 4 difíciles. Sin tiempo límite.', en: '3 easy, 3 medium and 4 hard. No time limit.', ca: '3 fàcils, 3 mitjanes i 4 difícils. Sense límit de temps.' },
    r2t:    { es: 'Información tras cada tiro', en: 'Feedback after each shot', ca: 'Informació després de cada tir' },
    r2d:    { es: 'Verás la función correcta y una explicación educativa.', en: 'You\'ll see the correct function and an educational explanation.', ca: 'Veuràs la funció correcta i una explicació educativa.' },
    r3t:    { es: 'Puntuación final', en: 'Final score', ca: 'Puntuació final' },
    r3d:    { es: 'Cuántos goles has marcado sobre 10.', en: 'How many goals you scored out of 10.', ca: 'Quants gols has marcat sobre 10.' },
    start:  { es: 'Empezar examen →', en: 'Start exam →', ca: 'Començar examen →' },
    back:   { es: '← Volver al juego', en: '← Back to game', ca: '← Tornar al joc' },
  }
  const t = k => copy[k][l] ?? copy[k].es
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{t('badge')}</p>
        <h1 className="text-3xl font-black text-white text-center mb-1">{t('title')}</h1>
        <p className="text-white/40 text-sm text-center mb-8">{t('sub')}</p>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 space-y-5">
          {[['📋', 'r1t', 'r1d'], ['💡', 'r2t', 'r2d'], ['🏆', 'r3t', 'r3d']].map(([emoji, tk, dk]) => (
            <div key={tk} className="flex items-start gap-4">
              <span className="text-2xl mt-0.5">{emoji}</span>
              <div>
                <p className="font-bold text-white text-sm">{t(tk)}</p>
                <p className="text-white/50 text-xs mt-0.5">{t(dk)}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onStart}
          className="w-full bg-green-600 hover:bg-green-500 text-white font-black py-4 rounded-xl transition-colors text-lg mb-3">
          {t('start')}
        </button>
        <Link to="/juegos/trayectoria"
          className="block text-center text-white/40 hover:text-white/70 text-sm transition-colors">
          {t('back')}
        </Link>
      </div>
    </div>
  )
}

// ── End screen ───────────────────────────────────────────────────────────────

function ExamEnd({ score, results, onRetry, l }) {
  const pct = score / TOTAL
  const grade = pct === 1 ? '🏆' : pct >= 0.8 ? '⭐' : pct >= 0.6 ? '✅' : pct >= 0.4 ? '📚' : '💪'
  const copy = {
    done:   { es: 'Examen completado', en: 'Exam complete', ca: 'Examen completat' },
    goals:  { es: 'goles de 10', en: 'goals out of 10', ca: 'gols de 10' },
    msg10:  { es: '¡Perfecto! Eres un crack de las funciones.', en: 'Perfect! You\'re a function genius.', ca: 'Perfecte! Ets un crack de les funcions.' },
    msg8:   { es: 'Muy bien. Repasa los que fallaste y lo clavas.', en: 'Very good. Review your misses and you\'ll nail it.', ca: 'Molt bé. Repassa els que has fallat i ho clararàs.' },
    msg6:   { es: 'Bien encaminado. Sigue practicando las funciones.', en: 'On the right track. Keep practising functions.', ca: 'Bon camí. Continua practicant les funcions.' },
    msg4:   { es: 'Hay margen de mejora. ¡Repasa la teoría!', en: 'Room to improve. Review the theory!', ca: 'Hi ha marge de millora. Repassa la teoria!' },
    msg0:   { es: 'Empieza por las funciones lineales. ¡Tú puedes!', en: 'Start with linear functions. You\'ve got this!', ca: 'Comença per les funcions lineals. Tu pots!' },
    retry:  { es: '▶ Repetir examen', en: '▶ Retry exam', ca: '▶ Repetir examen' },
    play:   { es: 'Modo partido (90 s)', en: 'Match mode (90 s)', ca: 'Mode partit (90 s)' },
    corr:   { es: 'Correcta', en: 'Correct', ca: 'Correcta' },
    wrong:  { es: 'Fallada', en: 'Missed', ca: 'Fallada' },
    summary:{ es: 'Resumen', en: 'Summary', ca: 'Resum' },
  }
  const t = k => copy[k][l] ?? copy[k].es
  const msg = score === TOTAL ? t('msg10') : pct >= 0.8 ? t('msg8') : pct >= 0.6 ? t('msg6') : pct >= 0.4 ? t('msg4') : t('msg0')
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <p className="text-6xl text-center mb-3">{grade}</p>
        <p className="text-white/40 text-sm text-center mb-1">{t('done')}</p>
        <p className="text-5xl font-black text-white text-center mb-1">{score}</p>
        <p className="text-white/60 text-lg text-center mb-2">{t('goals')}</p>
        <p className="text-[#EDAE49] font-bold text-center mb-8">{msg}</p>

        {/* Summary table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
          <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">{t('summary')}</p>
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="text-base">{r.outcome === 'goal' ? '✅' : r.outcome === 'collision' ? '🧍' : '❌'}</span>
                <span className="font-mono text-white/70 flex-1 truncate">{r.chosenLabel}</span>
                <span className={`text-xs font-bold ${r.outcome === 'goal' ? 'text-green-400' : 'text-red-400'}`}>
                  {r.outcome === 'goal' ? t('corr') : t('wrong')}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button onClick={onRetry}
            className="px-6 py-3 rounded-full bg-[#EDAE49] text-black font-bold hover:bg-[#f5c16c] transition-colors">
            {t('retry')}
          </button>
          <Link to="/juegos/trayectoria"
            className="px-6 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors text-center">
            {t('play')}
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Main exam ────────────────────────────────────────────────────────────────

export default function TrayectoriaExamen() {
  const { lang } = useLang()
  const { user } = useAuth()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'

  const [screen, setScreen] = useState('intro')   // intro | playing | end
  const [questions, setQuestions] = useState([])
  const [qIdx, setQIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [results, setResults] = useState([])

  // per-question state
  const [phase, setPhase] = useState('choose')    // choose | animating | result
  const [selected, setSelected] = useState(null)
  const [ballPos, setBallPos] = useState(null)
  const [trail, setTrail] = useState([])
  const [outcome, setOutcome] = useState(null)    // goal | miss | collision
  const [chosenFn, setChosenFn] = useState(null)

  const animRef = useRef(null)
  const startTimeRef = useRef(null)
  const scoreRef = useRef(0)

  useEffect(() => { scoreRef.current = score }, [score])

  useEffect(() => {
    if (screen !== 'end') return
    const timeSpent = startTimeRef.current ? Math.round((Date.now() - startTimeRef.current) / 1000) : 0
    const pts = Math.round((scoreRef.current / TOTAL) * 100)
    const coinsEarned = Math.round((scoreRef.current / TOTAL) * 200)
    if (user?.uid) {
      saveActivity(user.uid, {
        type: 'examen',
        game: 'trayectoria',
        category: 'matematicas',
        score: pts,
        coinsEarned,
        passed: scoreRef.current >= 5,
        timeSpent,
      }).catch(() => {})
    }
  }, [screen, user])

  function startExam() {
    const qs = buildExam()
    setQuestions(qs)
    setQIdx(0)
    setScore(0)
    setResults([])
    resetQuestion()
    startTimeRef.current = Date.now()
    setScreen('playing')
  }

  function resetQuestion() {
    setPhase('choose')
    setSelected(null)
    setBallPos(null)
    setTrail([])
    setOutcome(null)
    setChosenFn(null)
    if (animRef.current) cancelAnimationFrame(animRef.current)
  }

  function nextQuestion() {
    if (qIdx + 1 >= questions.length) {
      setScreen('end')
    } else {
      setQIdx(i => i + 1)
      resetQuestion()
    }
  }

  const question = questions[qIdx] ?? null
  const goal = question?.goal ?? null
  const barriers = question?.barriers ?? []
  const optColors = computeOptionColors(question)
  const correctFn = question ? question.options[question.correctIndex].fn : null

  function doFinish(res, chosenIdx) {
    if (res === 'goal') setScore(s => s + 1)
    setOutcome(res)
    setPhase('result')
    const chosenLabel = question.options[chosenIdx ?? selected].label
    setResults(prev => [...prev, { outcome: res, chosenLabel }])
  }

  function shoot(optIdx) {
    if (phase !== 'choose' || !question) return
    setSelected(optIdx)
    setPhase('animating')

    const opt = question.options[optIdx]
    const fn = opt.fn
    setChosenFn(() => fn)

    const startX = opt.startX
    const goalX = goal.x
    const endX = goalX + 0.5
    const start = Date.now()
    const trailPoints = []

    let initY; try { initY = fn(startX) } catch { initY = null }
    if (initY !== null && isFinite(initY)) trailPoints.push(toSVG(startX, initY))

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

      if (inView) {
        const hit = barriers.find(b => Math.abs(b.x - x) < 0.35 && Math.abs(b.y - y) < 0.7)
        if (hit) {
          if (animRef.current) cancelAnimationFrame(animRef.current)
          setTimeout(() => doFinish('collision', optIdx), 700)
          return
        }
      }

      if (x >= goalX - 0.15) {
        let yAtGoal; try { yAtGoal = fn(goalX) } catch { yAtGoal = null }
        doFinish(
          yAtGoal !== null && isFinite(yAtGoal) && yAtGoal >= goal.yMin && yAtGoal <= goal.yMax
            ? 'goal' : 'miss',
          optIdx
        )
        return
      }

      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate)
      } else {
        doFinish('miss', optIdx)
      }
    }
    animRef.current = requestAnimationFrame(animate)
  }

  const copy = {
    badge:    { es: 'Examen · Funciones', en: 'Exam · Functions', ca: 'Examen · Funcions' },
    qof:      { es: `Pregunta ${qIdx + 1} de ${TOTAL}`, en: `Question ${qIdx + 1} of ${TOTAL}`, ca: `Pregunta ${qIdx + 1} de ${TOTAL}` },
    which:    { es: '¿Cuál función mete el balón en la portería?', en: 'Which function scores the goal?', ca: 'Quina funció marca el gol?' },
    next:     { es: 'Siguiente →', en: 'Next →', ca: 'Següent →' },
    finish:   { es: 'Ver resultados →', en: 'See results →', ca: 'Veure resultats →' },
    collision:{ es: '¡Chocaste!', en: 'Collision!', ca: 'Col·lisió!' },
    miss:     { es: '¡Fuera!', en: 'Miss!', ca: 'Fora!' },
    goal_txt: { es: '¡GOL!', en: 'GOAL!', ca: 'GOL!' },
  }
  const t = k => copy[k][l] ?? copy[k].es

  const metaTitle = l === 'en' ? 'Trajectory Exam — Functions' : l === 'ca' ? 'Examen Trajectòria — Funcions' : 'Examen Trayectoria — Funciones'
  const metaDesc  = l === 'en'
    ? 'Trajectory exam: choose which function scores the goal. 10 questions on lines, parabolas and piecewise functions. No time limit.'
    : l === 'ca'
    ? 'Examen de trajectòria: tria quina funció marca el gol. 10 preguntes sobre rectes, paràboles i funcions a trossos. Sense temps.'
    : 'Examen de trayectoria: elige qué función mete el balón. 10 preguntas sobre rectas, parábolas y funciones a trozos. Sin tiempo.'
  const pageMeta = <PageMeta title={metaTitle} description={metaDesc} path="/examen/trayectoria" lang={lang} />
  const quizSchema = <QuizSchema
    name={metaTitle} description={metaDesc} path="/examen/trayectoria" lang={lang}
    subject={l === 'en' ? 'Mathematical Functions' : l === 'ca' ? 'Funcions matemàtiques' : 'Funciones matemáticas'}
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

  const isLast = qIdx + 1 >= TOTAL

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-6">
      {pageMeta}{quizSchema}
      {/* Header */}
      <div className="w-full max-w-[440px] flex items-center justify-between mb-3">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">⚽ {t('badge')}</p>
          <p className="text-white font-bold text-lg">{score} ⚽ · {t('qof')}</p>
        </div>
        {/* Progress bar */}
        <div className="flex gap-1">
          {Array.from({ length: TOTAL }).map((_, i) => {
            const res = results[i]
            const bg = res
              ? res.outcome === 'goal' ? 'bg-green-500' : 'bg-red-500'
              : i === qIdx ? 'bg-white/60' : 'bg-white/15'
            return <div key={i} className={`w-3 h-3 rounded-full ${bg} transition-colors`} />
          })}
        </div>
      </div>

      {/* SVG Field */}
      <div className="relative w-full max-w-[440px] rounded-xl overflow-hidden border border-white/10 bg-[#0d1117] mb-3">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
          <GridLines />
          {(phase === 'result') && chosenFn && (
            <FnCurve fn={chosenFn} color="#EDAE4970" xStart={question.startX} xEnd={goal.x + 0.5} />
          )}
          {phase === 'result' && outcome !== 'goal' && correctFn && (
            <FnCurve fn={correctFn} color="#22c55e50" xStart={question.startX} xEnd={goal.x + 0.5} />
          )}
          {goal && <Goal goal={goal} />}
          {barriers.map((b, i) => <Barrier key={i} {...b} />)}
          {phase === 'choose' && <StartingBalls question={question} optColors={optColors} />}
          {ballPos && <Ball x={ballPos[0]} y={ballPos[1]} trail={trail} />}
        </svg>

        {/* Result overlay */}
        {phase === 'result' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/65 backdrop-blur-sm">
            <p className="text-4xl mb-2">
              {outcome === 'goal' ? '⚽' : outcome === 'collision' ? '🧍' : '❌'}
            </p>
            <p className={`font-black text-xl mb-2 ${outcome === 'goal' ? 'text-green-400' : 'text-red-400'}`}>
              {outcome === 'goal' ? t('goal_txt') : outcome === 'collision' ? t('collision') : t('miss')}
            </p>
            <p className="text-white/70 text-sm text-center max-w-xs px-4 mb-4">
              {question.explanation[outcome]?.[l] ?? question.explanation[outcome]?.es ?? ''}
            </p>
            <button onClick={nextQuestion}
              className="px-5 py-2 rounded-full bg-[#EDAE49] text-black font-bold text-sm hover:bg-[#f5c16c] transition-colors">
              {isLast ? t('finish') : t('next')}
            </button>
          </div>
        )}
      </div>

      {/* Options */}
      <div className="w-full max-w-[440px]">
        <p className="text-white/50 text-xs text-center mb-2">{t('which')}</p>
        <div className="grid grid-cols-1 gap-2">
          {question.options.map((opt, i) => {
            const correctIndices = question.correctIndices ?? [question.correctIndex]
            const isCorrect = correctIndices.includes(i)
            const isChosen = selected === i
            let bg = 'bg-white/5 hover:bg-white/10 border-white/10'
            if (phase === 'result') {
              if (isCorrect) bg = 'bg-green-500/20 border-green-500'
              else if (isChosen) bg = 'bg-red-500/20 border-red-500'
              else bg = 'bg-white/5 border-white/10 opacity-40'
            } else if (isChosen) {
              bg = 'bg-amber-500/20 border-amber-500'
            }
            return (
              <button key={i} onClick={() => shoot(i)}
                disabled={phase !== 'choose'}
                className={`w-full text-left px-4 py-3 rounded-xl border font-mono text-sm text-white transition-all flex items-center gap-3 ${bg}`}>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-black flex-shrink-0"
                  style={{ background: optColors[i] }}>
                  {String.fromCharCode(65 + i)}
                </span>
                {opt.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
