/**
 * MechanicExam — examen que usa la MECÁNICA de un juego (no un test de texto).
 * 10 rondas, sin cronómetro, con explicación al responder y nota final.
 * Lo usan los exámenes de Fuerza Neta y Balanza.
 *
 * Props:
 *   gameId        string  — para saveActivity (p.ej. 'balanza-test')
 *   badge/title/sub  {es,en,ca}  — textos de la intro
 *   metaTitle/metaDesc {es,en,ca} — SEO
 *   metaPath      string  — p.ej. '/examen/balanza-test'
 *   subjectSchema string  — materia para QuizSchema
 *   backGamePath  string  — ruta del juego (arcade)
 *   playLabel     {es,en,ca} — etiqueta del botón "modo arcade"
 *   genRound      () => round
 *   isCorrect     (round, answer) => boolean
 *   renderQuestion ({ round, phase, answer, onAnswer }) => JSX  (dibuja la mecánica + input + feedback)
 */
import { useState, useRef, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import CoinsAnimation from './CoinsAnimation'
import SupportBlock from './SupportBlock'
import PageMeta from './PageMeta'
import QuizSchema from './QuizSchema'
import { skillsFor } from '../data/exerciseSkills'

const TOTAL = 10
// Rondas de ejemplo por nivel que se publican en el JSON-LD. Con 3 niveles
// típicos salen ~18 preguntas por examen, dentro del tope de QuizSchema.
const SCHEMA_SAMPLES_PER_LEVEL = 6

function tr(obj, l) { return obj?.[l] ?? obj?.es ?? '' }

const L = {
  q:      { es: 'Pregunta', en: 'Question', ca: 'Pregunta' },
  of:     { es: 'de', en: 'of', ca: 'de' },
  r1t:    { es: '10 preguntas', en: '10 questions', ca: '10 preguntes' },
  r1d:    { es: 'Con la mecánica del juego. Sin límite de tiempo.', en: 'Using the game mechanic. No time limit.', ca: 'Amb la mecànica del joc. Sense límit de temps.' },
  r2t:    { es: 'Explicación tras cada respuesta', en: 'Explanation after each answer', ca: 'Explicació després de cada resposta' },
  r2d:    { es: 'Verás por qué es correcto, con el cálculo.', en: 'You’ll see why it’s correct, with the calculation.', ca: 'Veuràs per què és correcte, amb el càlcul.' },
  r3t:    { es: 'Puntuación final', en: 'Final score', ca: 'Puntuació final' },
  r3d:    { es: 'Cuántas has acertado sobre 10.', en: 'How many you got right out of 10.', ca: 'Quantes n’has encertat sobre 10.' },
  start:  { es: 'Empezar examen →', en: 'Start exam →', ca: 'Començar examen →' },
  chooseLevel: { es: 'Elige tu nivel', en: 'Choose your level', ca: 'Tria el teu nivell' },
  back:   { es: '← Volver al juego', en: '← Back to game', ca: '← Tornar al joc' },
  next:   { es: 'Siguiente →', en: 'Next →', ca: 'Següent →' },
  finish: { es: 'Ver resultados →', en: 'See results →', ca: 'Veure resultats →' },
  done:   { es: 'Examen completado', en: 'Exam complete', ca: 'Examen completat' },
  hits:   { es: 'aciertos de 10', en: 'correct out of 10', ca: 'encerts de 10' },
  retry:  { es: '▶ Repetir examen', en: '▶ Retry exam', ca: '▶ Repetir examen' },
}

function Intro({ badge, title, sub, levels, onSelect, backGamePath, backLabel, l }) {
  // Un solo nivel = la mecánica no tiene un eje de dificultad real que
  // ofrecer (p.ej. Órbita: acierto/fallo binario, no hay "más o menos
  // preciso" con sentido). En ese caso no tiene sentido la pantalla de
  // "elige tu nivel" con una sola opción: se salta directa a un botón único.
  const single = levels.length === 1 ? levels[0] : null
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{tr(badge, l)}</p>
        <h1 className="text-3xl font-black text-white text-center mb-1">{tr(title, l)}</h1>
        <p className="text-white/40 text-sm text-center mb-6">{tr(sub, l)}</p>
        <SupportBlock variant="top" className="mb-5" />
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 space-y-5">
          {[['📋', L.r1t, L.r1d], ['💡', L.r2t, L.r2d], ['🏆', L.r3t, L.r3d]].map(([e, tk, dk]) => (
            <div key={tr(tk, l)} className="flex items-start gap-4">
              <span className="text-2xl mt-0.5">{e}</span>
              <div>
                <p className="font-bold text-white text-sm">{tr(tk, l)}</p>
                <p className="text-white/50 text-xs mt-0.5">{tr(dk, l)}</p>
              </div>
            </div>
          ))}
        </div>
        {single ? (
          <button onClick={() => onSelect(single.difficulty)}
            className="w-full py-4 bg-[#EDAE49] hover:bg-amber-400 text-black font-black text-lg rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] mb-4">
            {tr(L.start, l)}
          </button>
        ) : (
          <>
            <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-3">{tr(L.chooseLevel, l)}</p>
            <div className="flex flex-col gap-3 mb-4">
              {levels.map(lv => (
                <button key={lv.key} onClick={() => onSelect(lv.difficulty)}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#EDAE49]/50 rounded-2xl px-5 py-4 text-left transition-all flex items-center justify-between group">
                  <div>
                    <p className="text-white font-bold">{lv.emoji} {tr(lv.label, l)}</p>
                    <p className="text-white/40 text-xs mt-0.5">{tr(lv.hint, l)}</p>
                  </div>
                  <span className="text-white/30 group-hover:text-[#EDAE49] font-black text-lg transition-colors">→</span>
                </button>
              ))}
            </div>
          </>
        )}
        <Link to={backGamePath} className="block text-center text-white/40 hover:text-white/70 text-sm transition-colors">
          {backLabel ? tr(backLabel, l) : tr(L.back, l)}
        </Link>
      </div>
    </div>
  )
}

function ExamEnd({ score, results, onRetry, backGamePath, playLabel, emoji, l }) {
  const pct = score / TOTAL
  const grade = pct === 1 ? '🏆' : pct >= 0.8 ? '⭐' : pct >= 0.6 ? '✅' : pct >= 0.4 ? '📚' : '💪'
  const msg = {
    es: score === TOTAL ? '¡Perfecto! Dominas el tema.' : pct >= 0.8 ? 'Muy bien. Repasa los fallos y lo clavas.' : pct >= 0.6 ? 'Bien encaminado. Sigue practicando.' : pct >= 0.4 ? 'Hay margen de mejora. ¡Repasa!' : 'Practica un poco más. ¡Tú puedes!',
    en: score === TOTAL ? 'Perfect! You’ve mastered it.' : pct >= 0.8 ? 'Very good. Review your misses and nail it.' : pct >= 0.6 ? 'On the right track. Keep practising.' : pct >= 0.4 ? 'Room to improve. Revise!' : 'Practise a bit more. You’ve got this!',
    ca: score === TOTAL ? 'Perfecte! Domines el tema.' : pct >= 0.8 ? 'Molt bé. Repassa els errors i ho clavaràs.' : pct >= 0.6 ? 'Bon camí. Continua practicant.' : pct >= 0.4 ? 'Hi ha marge de millora. Repassa!' : 'Practica una mica més. Tu pots!',
  }[l]
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <p className="text-6xl text-center mb-3">{grade}</p>
        <p className="text-white/40 text-sm text-center mb-1">{tr(L.done, l)}</p>
        <p className="text-5xl font-black text-white text-center mb-1">{score}</p>
        <p className="text-white/60 text-lg text-center mb-2">{tr(L.hits, l)}</p>
        <p className="text-[#EDAE49] font-bold text-center mb-8">{msg}</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-6">
          <div className="flex gap-2 flex-wrap justify-center">
            {results.map((ok, i) => (
              <div key={i} className={`flex items-center justify-center w-8 h-8 rounded-full border-2 text-xs font-bold ${ok ? 'bg-green-400/20 border-green-400 text-green-400' : 'bg-red-400/20 border-red-400 text-red-400'}`}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button onClick={onRetry} className="px-6 py-3 rounded-full bg-[#EDAE49] text-black font-bold hover:bg-[#f5c16c] transition-colors">
            {tr(L.retry, l)}
          </button>
          <Link to={backGamePath} className="px-6 py-3 rounded-full bg-white/10 text-white font-bold hover:bg-white/20 transition-colors text-center">
            {tr(playLabel, l)} {emoji}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function MechanicExam({
  gameId, emoji, badge, title, sub, metaTitle, metaDesc, metaPath, subjectSchema,
  backGamePath, backLabel, playLabel, levels, genRound, isCorrect, renderQuestion,
  schemaQuestion,
}) {
  const { lang } = useLang()
  const { user } = useAuth()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'

  const [screen, setScreen] = useState('intro')  // intro | playing | end
  const [rounds, setRounds] = useState([])
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [results, setResults] = useState([])
  const [phase, setPhase] = useState('choose')   // choose | result
  const [answer, setAnswer] = useState(null)

  const scoreRef = useRef(0)
  const startRef = useRef(null)
  const diffRef = useRef(null)
  useEffect(() => { scoreRef.current = score }, [score])

  useEffect(() => {
    if (screen !== 'end' || !user?.uid) return
    const timeSpent = startRef.current ? Math.round((Date.now() - startRef.current) / 1000) : 0
    const pts = Math.round((scoreRef.current / TOTAL) * 100)
    saveActivity(user.uid, {
      type: 'examen', game: gameId, category: gameId,
      score: pts, passed: scoreRef.current >= 5,
      coinsEarned: Math.round((scoreRef.current / TOTAL) * 200),
      timeSpent, userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [screen, user, gameId])

  function startExam(difficulty) {
    diffRef.current = difficulty
    setRounds(Array.from({ length: TOTAL }, () => genRound(difficulty)))
    setIdx(0); setScore(0); setResults([])
    setPhase('choose'); setAnswer(null)
    startRef.current = Date.now()
    setScreen('playing')
  }

  function onAnswer(a) {
    if (phase !== 'choose') return
    const ok = isCorrect(rounds[idx], a)
    setAnswer(a)
    setPhase('result')
    if (ok) setScore(s => s + 1)
    setResults(r => [...r, ok])
  }

  function next() {
    if (idx + 1 >= TOTAL) { setScreen('end'); return }
    setIdx(i => i + 1); setPhase('choose'); setAnswer(null)
  }

  const pageMeta = <PageMeta title={tr(metaTitle, l)} description={tr(metaDesc, l)} path={metaPath} lang={lang} />
  // Preguntas de ejemplo para el JSON-LD. Estos exámenes no tienen banco de
  // preguntas: cada ronda la GENERA genRound(), así que no hay nada que
  // publicar tal cual. Se generan unas cuantas rondas aquí y cada examen las
  // traduce a texto con su propio `schemaQuestion(round, lang)` — porque solo
  // él sabe qué es una ronda suya (una frase que analizar, una balanza, un
  // punto en un plano).
  //
  // Sin `schemaQuestion` no se publica NADA, a propósito: mejor un examen sin
  // preguntas en el schema que un schema con preguntas inventadas o con un
  // texto que no se entiende fuera de su dibujo.
  //
  // Semilla estable no: genRound() es aleatorio y cada build publicaría
  // ejemplos distintos para la misma URL. Es asumible —son ejemplos
  // representativos, no un temario cerrado— y a cambio Google ve variedad
  // real del ejercicio en vez de las mismas diez frases siempre.
  const schemaQuestions = useMemo(() => {
    if (typeof schemaQuestion !== 'function' || !levels?.length) return undefined
    const out = []
    for (const lv of levels) {
      for (let i = 0; i < SCHEMA_SAMPLES_PER_LEVEL; i++) {
        try {
          const q = schemaQuestion(genRound(lv.difficulty ?? lv.key ?? lv), l)
          if (q?.question && q?.correctAnswer) out.push(q)
        } catch { /* una ronda que no se puede describir no rompe la página */ }
      }
    }
    return out.length ? out : undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [l, metaPath])

  // Qué se practica con este ejercicio. El id del juego sale de backGamePath
  // ("/juegos/portero" → "portero"), que estas páginas ya declaran: no hace
  // falta un dato nuevo ni un mapa de equivalencias aparte.
  //
  // Importa sobre todo en los exámenes cuya ronda es un DIBUJO (portero,
  // trayectoria, geomapa…): ahí no se pueden publicar preguntas sin que
  // pierdan el sentido fuera de su gráfico, así que esto es lo único honesto
  // que se puede declarar — y es además como se busca ("ejercicios para
  // practicar razonamiento espacial").
  const teaches = skillsFor(backGamePath?.split('/').filter(Boolean).pop(), l)

  const quizSchema = <QuizSchema name={tr(metaTitle, l)} description={tr(metaDesc, l)} path={metaPath} lang={lang} subject={subjectSchema} level="secondary" questions={schemaQuestions} teaches={teaches} />

  if (screen === 'intro') return <>{pageMeta}{quizSchema}<Intro badge={badge} title={title} sub={sub} levels={levels} onSelect={startExam} backGamePath={backGamePath} backLabel={backLabel} l={l} /></>
  if (screen === 'end') return (
    <>{pageMeta}{quizSchema}
      <ExamEnd score={score} results={results} onRetry={() => startExam(diffRef.current)} backGamePath={backGamePath} playLabel={playLabel} emoji={emoji} l={l} />
      {score > 0 && <CoinsAnimation coins={Math.round((score / TOTAL) * 200)} />}
    </>
  )

  const round = rounds[idx]
  if (!round) return null
  const isLast = idx + 1 >= TOTAL

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-5">
      {pageMeta}{quizSchema}
      {/* Header */}
      <div className="w-full max-w-[520px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">{emoji} {tr(badge, l)}</p>
          <p className="text-white font-bold text-lg">{score} · {tr(L.q, l)} {idx + 1} {tr(L.of, l)} {TOTAL}</p>
        </div>
        <div className="flex gap-1 flex-wrap justify-end max-w-[160px]">
          {Array.from({ length: TOTAL }).map((_, i) => {
            const bg = results[i] === undefined ? (i === idx ? 'bg-white/60' : 'bg-white/15') : results[i] ? 'bg-green-500' : 'bg-red-500'
            return <div key={i} className={`w-3 h-3 rounded-full ${bg} transition-colors`} />
          })}
        </div>
      </div>

      {/* Mecánica del juego (diagrama + input + feedback) */}
      <div className="w-full max-w-[520px]">
        {renderQuestion({ round, phase, answer, onAnswer, l, qIndex: idx })}
      </div>

      {phase === 'result' && (
        <div className="w-full max-w-[520px] px-1 mt-3">
          <button onClick={next}
            className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">
            {isLast ? tr(L.finish, l) : tr(L.next, l)}
          </button>
        </div>
      )}
    </div>
  )
}
