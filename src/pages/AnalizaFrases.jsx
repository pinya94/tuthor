import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { genRound, sameSet, TASKS } from '../lib/analizaFrases'
import GameEndScreen from '../components/GameEndScreen'
import SupportBlock from '../components/SupportBlock'
import SentenceBoard from '../components/SentenceBoard'
import SEOHead from '../components/SEOHead'

const GAME_TIME = 40
const WRONG_TIME = 3
const CORRECT_TIME = 3

const C = {
  badge:  { es: 'Lengua · Análisis', en: 'Language · Grammar', ca: 'Llengua · Anàlisi' },
  title:  { es: '🧐 Analiza la Frase', en: '🧐 Sentence Detective', ca: '🧐 Analitza la Frase' },
  sub:    { es: 'Señala en la frase lo que se te pide', en: 'Pick out what you’re asked for', ca: 'Assenyala a la frase el que et demanen' },
  how:    { es: 'Cómo se juega', en: 'How to play', ca: 'Com es juga' },
  h1:     { es: 'Lee la consigna: qué tienes que encontrar (sujeto, pronombres, verbo…).', en: 'Read the prompt: what to find (subject, pronouns, verb…).', ca: 'Llegeix la consigna: què has de trobar (subjecte, pronoms, verb…).' },
  h2:     { es: 'Toca las palabras: pueden ser varias sueltas o un grupo entero (el predicado).', en: 'Tap the words: it can be several separate ones or a whole group (the predicate).', ca: 'Toca les paraules: poden ser diverses soltes o un grup sencer (el predicat).' },
  h3:     { es: 'Pulsa Comprobar. Verde = acierto, rojo = sobra, verde punteado = faltaba.', en: 'Hit Check. Green = right, red = extra, dashed = missing.', ca: 'Prem Comprovar. Verd = encert, vermell = sobra, verd puntejat = faltava.' },
  time:   { es: 'Tiempo', en: 'Time', ca: 'Temps' },
  timeVal:{ es: '40 segundos', en: '40 seconds', ca: '40 segons' },
  pts:    { es: 'Puntos', en: 'Points', ca: 'Punts' },
  ptsVal: { es: 'Acierto +1 y +3s · Fallo −1 y −3s', en: 'Correct +1 and +3s · Wrong −1 and −3s', ca: 'Encert +1 i +3s · Errada −1 i −3s' },
  start:  { es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' },
  select: { es: 'Selecciona', en: 'Select', ca: 'Selecciona' },
  check:  { es: '✓ Comprobar', en: '✓ Check', ca: '✓ Comprovar' },
  correct:{ es: '¡Correcto!', en: 'Correct!', ca: 'Correcte!' },
  wrong:  { es: 'No exacto', en: 'Not quite', ca: 'No exacte' },
  next:   { es: 'Siguiente →', en: 'Next →', ca: 'Següent →' },
  end:    { es: 'Tiempo', en: "Time's up", ca: 'Temps' },
  hits:   { es: 'aciertos', en: 'correct', ca: 'encerts' },
  scoreLbl:{ es: 'puntos', en: 'points', ca: 'punts' },
  again:  { es: '▶ Jugar de nuevo', en: '▶ Play again', ca: '▶ Jugar de nou' },
  changeDif:{ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' },
  exam:   { es: 'Modo examen (tipo test) →', en: 'Exam mode (quiz) →', ca: 'Mode examen (tipus test) →' },
  focusBtn: { es: '🎯 Practicar algo concreto', en: '🎯 Practise something specific', ca: '🎯 Practicar alguna cosa concreta' },
  focusTitle: { es: '¿Qué quieres practicar?', en: 'What do you want to practise?', ca: 'Què vols practicar?' },
  focusSub: { es: 'Elige un tema: puedes jugar solo con eso o ir a estudiarlo primero', en: 'Pick a topic: play only that, or go study it first', ca: 'Tria un tema: pots jugar només amb això o anar a estudiar-lo primer' },
  focusBack: { es: '← Volver', en: '← Back', ca: '← Tornar' },
  playFocus: { es: '▶ Jugar', en: '▶ Play', ca: '▶ Jugar' },
  studyFocus: { es: '📖 Estudiar', en: '📖 Study', ca: '📖 Estudiar' },
  changeTopic: { es: 'Elegir otro tema', en: 'Pick another topic', ca: 'Triar un altre tema' },
  practising: { es: 'Practicando', en: 'Practising', ca: 'Practicant' },
}
function T(k, l) { return C[k]?.[l] ?? C[k]?.es ?? k }

// Temas para "practicar algo concreto": cada uno filtra el generador a una
// tarea (o varias de la misma categoría) y ofrece jugar filtrado + estudiar.
// Todos se juegan a nivel ESO: es el mínimo que desbloquea CD/CI/CC/morfología
// (TASKS[].min), así el tema pedido nunca cae a una tarea distinta por fallback.
const catFilter = cat => Object.keys(TASKS).filter(k => TASKS[k].cat === cat)
const TOPICS = [
  { id: 'clases', emoji: '🏷️', filter: catFilter('clases'),
    label: { es: 'Clases de palabras', en: 'Word classes', ca: 'Classes de paraules' },
    desc: { es: 'Sustantivo, adjetivo, verbo, artículo, pronombre, adverbio…', en: 'Noun, adjective, verb, article, pronoun, adverb…', ca: 'Substantiu, adjectiu, verb, article, pronom, adverbi…' },
    studyPath: '/estudiar/idiomas/espanol/gramatica' },
  { id: 'sujeto', emoji: '🙋', filter: ['sujeto'],
    label: { es: 'Sujeto', en: 'Subject', ca: 'Subjecte' },
    desc: { es: 'De quién se dice algo en la frase', en: 'What the sentence is about', ca: 'De qui es diu alguna cosa a la frase' },
    studyPath: '/estudiar/idiomas/espanol/gramatica/sintaxis' },
  { id: 'predicado', emoji: '🏃', filter: ['predicado'],
    label: { es: 'Predicado', en: 'Predicate', ca: 'Predicat' },
    desc: { es: 'Lo que se dice del sujeto', en: 'What is said about the subject', ca: 'El que es diu del subjecte' },
    studyPath: '/estudiar/idiomas/espanol/gramatica/sintaxis' },
  { id: 'cd', emoji: '🎯', filter: ['cd'],
    label: { es: 'Complemento Directo (CD)', en: 'Direct Object (DO)', ca: 'Complement Directe (CD)' },
    desc: { es: 'El truco de lo/la/los/las', en: 'The lo/la/los/las trick', ca: 'El truc de lo/la/los/las' },
    studyPath: '/info/estudiar/complemento-directo' },
  { id: 'ci', emoji: '🎁', filter: ['ci'],
    label: { es: 'Complemento Indirecto (CI)', en: 'Indirect Object (IO)', ca: 'Complement Indirecte (CI)' },
    desc: { es: 'El truco de le/les', en: 'The le/les trick', ca: 'El truc de le/les' },
    studyPath: '/info/estudiar/complemento-indirecto' },
  { id: 'cc', emoji: '🔗', filter: ['cc'],
    label: { es: 'Complementos Circunstanciales (CC)', en: 'Adverbials (CC)', ca: 'Complements Circumstancials (CC)' },
    desc: { es: 'Lugar, tiempo, modo…', en: 'Place, time, manner…', ca: 'Lloc, temps, manera…' },
    studyPath: '/estudiar/idiomas/espanol/gramatica/sintaxis' },
  { id: 'morfologia', emoji: '♀️', filter: catFilter('morfo'),
    label: { es: 'Género y número', en: 'Gender & number', ca: 'Gènere i nombre' },
    desc: { es: 'Femenino, masculino, singular, plural', en: 'Feminine, masculine, singular, plural', ca: 'Femení, masculí, singular, plural' },
    studyPath: '/estudiar/idiomas/espanol/gramatica/morfologia' },
]

const DIFS = {
  primaria: { emoji: '🟢', label: { es: 'Primaria', en: 'Primary', ca: 'Primària' }, desc: { es: 'Clases de palabras y sujeto/predicado', en: 'Word classes and subject/predicate', ca: 'Classes de paraules i subjecte/predicat' } },
  eso:      { emoji: '🟡', label: { es: 'Secundaria (ESO)', en: 'Secondary (ESO)', ca: 'Secundària (ESO)' }, desc: { es: 'Pronombres, adverbios y complementos (CD, CI, CC)', en: 'Pronouns, adverbs and objects (DO, IO)', ca: 'Pronoms, adverbis i complements' } },
  bach:     { emoji: '🔴', label: { es: 'Bachillerato', en: 'Sixth Form', ca: 'Batxillerat' }, desc: { es: 'Frases largas, atributo y CD/CI/CC', en: 'Long sentences, attribute and objects', ca: 'Frases llargues, atribut i complements' } },
}

function DifficultyScreen({ onSelect, onFocus, l, localPath }) {
  const [dif, setDif] = useState('primaria')
  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <p className="text-white/40 text-xs uppercase tracking-widest text-center mb-2">{T('badge', l)}</p>
        <h1 className="text-3xl font-black text-white text-center mb-1">{T('title', l)}</h1>
        <p className="text-white/40 text-sm text-center mb-6">{T('sub', l)}</p>

        <SupportBlock variant="top" className="mb-5" />

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
          <div className="space-y-2.5">
            {[['📋', T('h1', l)], ['👆', T('h2', l)], ['✓', T('h3', l)]].map(([e, text]) => (
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
        <button onClick={onFocus}
          className="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-sm rounded-2xl transition-all hover:scale-[1.01] active:scale-[0.98] mb-3">
          {T('focusBtn', l)}
        </button>
        <Link to={localPath('/examen/analiza-frases-test')} className="block text-center text-white/40 hover:text-white/70 text-sm transition-colors">
          {T('exam', l)}
        </Link>
      </div>
    </div>
  )
}

function TopicsScreen({ onPlay, onBack, l, localPath }) {
  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="max-w-md w-full">
        <button onClick={onBack} className="text-white/40 hover:text-white/70 text-sm mb-4 transition-colors">
          {T('focusBack', l)}
        </button>
        <h1 className="text-2xl font-black text-white text-center mb-1">{T('focusTitle', l)}</h1>
        <p className="text-white/40 text-sm text-center mb-6">{T('focusSub', l)}</p>

        <div className="space-y-3">
          {TOPICS.map(topic => (
            <div key={topic.id} className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{topic.emoji}</span>
                <h3 className="font-black text-white text-base">{topic.label[l] ?? topic.label.es}</h3>
              </div>
              <p className="text-white/40 text-xs mb-3">{topic.desc[l] ?? topic.desc.es}</p>
              <div className="flex gap-2">
                <button onClick={() => onPlay(topic)}
                  className="flex-1 py-2.5 bg-[#EDAE49] hover:bg-amber-400 text-black font-bold text-sm rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                  {T('playFocus', l)}
                </button>
                <Link to={localPath(topic.studyPath)}
                  className="flex-1 py-2.5 bg-white/10 hover:bg-white/15 text-white font-bold text-sm rounded-xl text-center transition-all hover:scale-[1.02]">
                  {T('studyFocus', l)}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AnalizaFrases() {
  const { lang, localPath } = useLang()
  const { user } = useAuth()
  const location = useLocation()
  const l = lang === 'en' ? 'en' : lang === 'ca' ? 'ca' : 'es'

  // Entrada directa desde una ficha de estudio (p. ej. /info/estudiar/complemento-directo):
  // state = { filter, level, topicId } salta el menú y arranca ya filtrado.
  const incoming = location.state?.filter ? location.state : null
  const incomingTopic = incoming ? TOPICS.find(t => t.id === incoming.topicId) ?? null : null

  const [screen, setScreen] = useState(incoming ? 'playing' : 'difficulty')
  const [difficulty, setDifficulty] = useState(incoming?.level ?? 'primaria')
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [streak, setStreak] = useState(0)
  const [round, setRound] = useState(() => incoming ? genRound({ lang: l, level: incoming.level ?? 'eso', filter: incoming.filter }) : null)
  const [phase, setPhase] = useState('choose')  // choose | result
  const [selected, setSelected] = useState([])
  const [won, setWon] = useState(false)
  const [delta, setDelta] = useState(null)
  const [activeTopic, setActiveTopic] = useState(incomingTopic)

  const timerRef = useRef(null)
  const scoreRef = useRef(0)
  const timeRef = useRef(GAME_TIME)
  const startedAtRef = useRef(incoming ? Date.now() : 0)
  const filterRef = useRef(incoming?.filter ?? null)
  useEffect(() => { scoreRef.current = score }, [score])
  useEffect(() => { timeRef.current = timeLeft }, [timeLeft])

  const next = useCallback((diff) => {
    setRound(genRound({ lang: l, level: diff, filter: filterRef.current }))
    setPhase('choose')
    setSelected([])
    setDelta(null)
  }, [l])

  // topic = entrada de TOPICS cuando se practica algo concreto, null en el juego normal
  function startGame(diff, topic = null) {
    filterRef.current = topic?.filter ?? null
    setActiveTopic(topic)
    setDifficulty(diff)
    setScreen('playing')
    setScore(0); setCorrect(0); setStreak(0)
    setTimeLeft(GAME_TIME)
    startedAtRef.current = Date.now()
    next(diff)
  }

  function playTopic(topic) {
    startGame('eso', topic)
  }

  useEffect(() => {
    if (screen !== 'playing') return
    timerRef.current = setInterval(() => {
      setTimeLeft(tl => {
        if (tl <= 1) { clearInterval(timerRef.current); setScreen('end'); return 0 }
        return tl - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [screen])

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current) }, [])

  useEffect(() => {
    if (screen !== 'end' || !user?.uid) return
    const pts = scoreRef.current * 10
    saveActivity(user.uid, {
      type: 'juego', game: 'analiza-frases', category: 'lengua',
      score: pts, passed: scoreRef.current > 0,
      coinsEarned: computeCoins('analiza-frases', { score: pts }),
      timeSpent: GAME_TIME - timeRef.current,
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }, [screen, user])

  function toggle(i) {
    if (phase !== 'choose') return
    setSelected(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i])
  }

  function check() {
    if (phase !== 'choose' || selected.length === 0) return
    const ok = sameSet(selected, round.indices)
    setWon(ok)
    setPhase('result')
    if (ok) {
      const ns = streak + 1
      setStreak(ns)
      setCorrect(c => c + 1)
      const gain = Math.min(5, 1 + Math.floor((ns - 1) / 3))
      setScore(s => s + gain)
      setTimeLeft(t => t + CORRECT_TIME)
      setDelta({ won: true, gain, streak: ns })
    } else {
      setStreak(0)
      setScore(s => Math.max(0, s - 1))
      setTimeLeft(t => Math.max(0, t - WRONG_TIME))
      setDelta({ won: false })
    }
  }

  const seo = {
    es: { title: 'Analiza la Frase — Sintaxis y clases de palabras', desc: 'Señala en la frase el sujeto, el predicado, los pronombres, el verbo o los complementos. Juego de análisis gramatical y sintáctico gratis, con niveles y explicación.', path: '/juegos/analiza-frases' },
    en: { title: 'Sentence Detective — Grammar and syntax', desc: 'Pick out the subject, predicate, pronouns, verb or objects in the sentence. Free Spanish grammar and syntax game with levels and explanations.', path: '/en/juegos/analiza-frases' },
    ca: { title: 'Analitza la Frase — Sintaxi i classes de paraules', desc: 'Assenyala a la frase el subjecte, el predicat, els pronoms, el verb o els complements. Joc d’anàlisi gramatical gratis, amb nivells i explicació.', path: '/ca/juegos/analiza-frases' },
  }[l]

  if (screen === 'difficulty') {
    return (<><SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />
      <DifficultyScreen onSelect={startGame} onFocus={() => setScreen('topics')} l={l} localPath={localPath} /></>)
  }

  if (screen === 'topics') {
    return (<><SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />
      <TopicsScreen onPlay={playTopic} onBack={() => setScreen('difficulty')} l={l} localPath={localPath} /></>)
  }

  if (screen === 'end') {
    const pts = score * 10
    const msg = { es: score === 0 ? '¡Sigue practicando!' : score < 4 ? 'Buen comienzo' : score < 9 ? '¡Bien hecho!' : '¡Maestro del análisis! 💪', en: score === 0 ? 'Keep practising!' : score < 4 ? 'Good start' : score < 9 ? 'Well done!' : 'Grammar master! 💪', ca: score === 0 ? 'Segueix practicant!' : score < 4 ? 'Bon començament' : score < 9 ? 'Ben fet!' : 'Mestre de l’anàlisi! 💪' }[l]
    const shareText = l === 'en'
      ? `I got ${correct} right in Sentence Detective 🧐 — can you beat me? https://tuthor.es/juegos/analiza-frases`
      : l === 'ca'
      ? `He encertat ${correct} a Analitza la Frase 🧐 — pots superar-me? https://tuthor.es/juegos/analiza-frases`
      : `He acertado ${correct} en Analiza la Frase 🧐 — ¿puedes superarme? https://tuthor.es/juegos/analiza-frases`
    return (
      <GameEndScreen game="analiza-frases" emoji="🧐" title={T('end', l)} score={pts} message={msg}
        stats={[{ label: T('hits', l), value: correct, emoji: '✅' }]}
        shareText={shareText} onPlayAgain={() => startGame(difficulty, activeTopic)} playAgainLabel={T('again', l)}
        secondaryActions={[{
          label: activeTopic ? T('changeTopic', l) : T('changeDif', l),
          onClick: () => setScreen(activeTopic ? 'topics' : 'difficulty'),
        }]}
        user={user} lang={lang} />
    )
  }

  if (!round) return null

  const timerPct = timeLeft / GAME_TIME
  const timerColor = timeLeft > 30 ? '#22c55e' : timeLeft > 10 ? '#f59e0b' : '#ef4444'
  const isResult = phase === 'result'

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      {/* Header */}
      <div className="w-full max-w-[560px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">
            {activeTopic
              ? <>🎯 {T('practising', l)}: {activeTopic.label[l] ?? activeTopic.label.es}</>
              : <>🧐 {DIFS[difficulty].label[l] ?? DIFS[difficulty].label.es}</>}
          </p>
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

      {/* Consigna */}
      <p className="text-white/80 text-base mb-3 text-center px-2">
        {T('select', l)} <span className="text-[#EDAE49] font-black">{round.label[l] ?? round.label.es}</span>
      </p>

      {/* Frase */}
      <div className="w-full max-w-[560px] rounded-xl border border-white/10 bg-[#0d1117] p-4 mb-3">
        <SentenceBoard tokens={round.tokens} selected={selected} correct={round.indices} reveal={isResult} onToggle={toggle} />
      </div>

      {/* Resultado */}
      {isResult && (
        <div className="w-full max-w-[560px] px-1 mb-2 text-center">
          <p className={`font-black text-lg ${won ? 'text-green-400' : 'text-red-400'}`}>
            {won ? T('correct', l) : T('wrong', l)}
            {delta && (
              <span className="text-xs font-bold ml-2">
                {delta.won
                  ? <span className="text-green-400">+{delta.gain} · +{CORRECT_TIME}s ⏱️{delta.streak >= 2 ? ` · 🔥 ${delta.streak}` : ''}</span>
                  : <span className="text-red-400">−1 · −{WRONG_TIME}s ⏱️</span>}
              </span>
            )}
          </p>
          <p className="text-white/60 text-sm mt-1">💡 {round.explica[l] ?? round.explica.es}</p>
        </div>
      )}

      {/* Controles */}
      <div className="w-full max-w-[560px] px-1">
        {!isResult ? (
          <button onClick={check} disabled={selected.length === 0}
            className="w-full py-3 rounded-xl text-base font-black bg-[#EDAE49] text-black hover:bg-amber-400 transition disabled:opacity-40 disabled:cursor-not-allowed">
            {T('check', l)}
          </button>
        ) : (
          <button onClick={() => next(difficulty)}
            className="w-full py-3 rounded-xl bg-[#EDAE49] text-black font-black hover:bg-amber-400 transition">
            {T('next', l)}
          </button>
        )}
      </div>
    </div>
  )
}
