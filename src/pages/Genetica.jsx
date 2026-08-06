import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { genRound } from '../lib/genetica'
import GameEndScreen from '../components/GameEndScreen'
import PunnettBoard from '../components/PunnettBoard'
import SEOHead from '../components/SEOHead'

const GAME_TIME = 90
const WRONG_TIME = 5
const CORRECT_TIME = 5
const REVEAL_MS = 2800

const C = {
  badge:  { es: 'Biología · Herencia', en: 'Biology · Inheritance', ca: 'Biologia · Herència' },
  title:  { es: '🧬 Genética', en: '🧬 Genetics', ca: '🧬 Genètica' },
  sub:    { es: 'Predice la descendencia con el cuadro de Punnett', en: 'Predict the offspring with the Punnett square', ca: 'Prediu la descendència amb el quadre de Punnett' },
  how:    { es: 'Cómo funciona', en: 'How it works', ca: 'Com funciona' },
  p1:     { es: 'Cada progenitor aporta UN alelo de los dos que tiene. Con eso salen las 4 combinaciones posibles.', en: 'Each parent passes ONE of its two alleles. That gives the 4 possible combinations.', ca: 'Cada progenitor aporta UN al·lel dels dos que té. Amb això surten les 4 combinacions possibles.' },
  p2:     { es: 'Primero razonas y respondes. El cuadro de Punnett aparece después, resuelto, para enseñarte por qué.', en: 'First you reason and answer. The Punnett square appears afterwards, solved, to show you why.', ca: 'Primer raones i respons. El quadre de Punnett apareix després, resolt, per ensenyar-te per què.' },
  p3:     { es: 'Basta un alelo dominante para que se vea: por eso dos padres iguales pueden tener un hijo distinto.', en: 'One dominant allele is enough to show: that is why two similar parents can have a different child.', ca: 'Amb un al·lel dominant ja es veu: per això dos pares iguals poden tenir un fill diferent.' },
  time:   { es: 'Tiempo', en: 'Time', ca: 'Temps' },
  timeVal:{ es: '90 segundos', en: '90 seconds', ca: '90 segons' },
  pts:    { es: 'Puntos', en: 'Points', ca: 'Punts' },
  ptsVal: { es: 'Acierto +1 y +5s · Fallo −5s', en: 'Correct +1 and +5s · Wrong −5s', ca: 'Encert +1 i +5s · Error −5s' },
  start:  { es: '▶ Empezar', en: '▶ Start', ca: '▶ Començar' },
  end:    { es: 'Tiempo', en: "Time's up", ca: 'Temps' },
  hits:   { es: 'cruces', en: 'crosses', ca: 'creuaments' },
  scoreLbl:{ es: 'puntos', en: 'points', ca: 'punts' },
  changeDif:{ es: 'Cambiar nivel', en: 'Change level', ca: 'Canviar nivell' },
  exam:   { es: 'Modo examen (sin tiempo) →', en: 'Exam mode (no timer) →', ca: 'Mode examen (sense temps) →' },
}
function T(k, l) { return C[k]?.[l] ?? C[k]?.es ?? k }

const DIFS = {
  facil:   { emoji: '🟢', label: { es: 'Fácil', en: 'Easy', ca: 'Fàcil' }, desc: { es: 'Predecir la descendencia', en: 'Predict the offspring', ca: 'Predir la descendència' } },
  medio:   { emoji: '🟡', label: { es: 'Medio', en: 'Medium', ca: 'Mitjà' }, desc: { es: '+ deducir el genotipo de los padres', en: '+ deduce the parents’ genotype', ca: '+ deduir el genotip dels pares' } },
  dificil: { emoji: '🔴', label: { es: 'Difícil', en: 'Hard', ca: 'Difícil' }, desc: { es: '+ dominancia incompleta (1:2:1)', en: '+ incomplete dominance (1:2:1)', ca: '+ dominància incompleta (1:2:1)' } },
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
            {[['🧬', T('p1', l)], ['🤔', T('p2', l)], ['💡', T('p3', l)]].map(([e, text]) => (
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
        <Link to="/examen/genetica-test"
          className="block text-center text-white/30 hover:text-white/60 text-sm transition-colors">
          {T('exam', l)}
        </Link>
      </div>
    </div>
  )
}

export default function Genetica() {
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
  const [phase, setPhase] = useState('choose')
  const [elegida, setElegida] = useState(null)

  const timerRef = useRef(null)
  const nextRef = useRef(null)
  const scoreRef = useRef(0)
  useEffect(() => { scoreRef.current = score }, [score])

  const next = useCallback(diff => {
    setRound(genRound(diff))
    setPhase('choose')
    setElegida(null)
  }, [])

  function startGame(diff) {
    setDifficulty(diff)
    setScreen('playing')
    setScore(0); setCorrectCount(0); setStreak(0)
    setTimeLeft(GAME_TIME)
    next(diff)
  }

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
        type: 'juego', game: 'genetica-juego', category: 'biologia',
        score: pts, timeSpent: GAME_TIME,
        coinsEarned: computeCoins('genetica-juego', { score: pts }),
        userName: user.displayName, userPhoto: user.photoURL,
      }).catch(() => {})
    }
  }

  function responder(id) {
    if (phase !== 'choose') return
    setElegida(id)
    setPhase('result')
    const ok = id === round.correcta
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

  const seo = {
    es: { title: 'Genética — Cuadro de Punnett y herencia mendeliana', desc: 'Predice la descendencia de un cruce con el cuadro de Punnett: dominante y recesivo, portadores y dominancia incompleta. Aprende genética de ESO y Bachillerato jugando. Juego de biología gratis.', path: '/juegos/genetica' },
    en: { title: 'Genetics — Punnett square and Mendelian inheritance', desc: 'Predict the offspring of a cross with the Punnett square: dominant and recessive, carriers and incomplete dominance. Learn school genetics by playing. Free biology game.', path: '/en/juegos/genetica' },
    ca: { title: 'Genètica — Quadre de Punnett i herència mendeliana', desc: 'Prediu la descendència d’un creuament amb el quadre de Punnett: dominant i recessiu, portadors i dominància incompleta. Aprèn genètica jugant. Joc de biologia gratis.', path: '/ca/juegos/genetica' },
  }[l]

  if (screen === 'difficulty') {
    return (<><SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} /><DifficultyScreen onSelect={startGame} l={l} /></>)
  }

  if (screen === 'end') {
    const pts = score * 10
    const msg = { es: score === 0 ? '¡Sigue practicando!' : score < 5 ? 'Buen comienzo' : score < 10 ? '¡Bien hecho!' : '¡Mendel estaría orgulloso! 💪', en: score === 0 ? 'Keep practising!' : score < 5 ? 'Good start' : score < 10 ? 'Well done!' : 'Mendel would be proud! 💪', ca: score === 0 ? 'Segueix practicant!' : score < 5 ? 'Bon començament' : score < 10 ? 'Ben fet!' : 'Mendel n’estaria orgullós! 💪' }[l]
    const shareText = l === 'en'
      ? `I solved ${correctCount} crosses in Genetics 🧬 — can you beat me? https://tuthor.es/juegos/genetica`
      : l === 'ca'
      ? `He resolt ${correctCount} creuaments a Genètica 🧬 — pots superar-me? https://tuthor.es/juegos/genetica`
      : `He resuelto ${correctCount} cruces en Genética 🧬 — ¿puedes superarme? https://tuthor.es/juegos/genetica`
    return (
      <GameEndScreen game="genetica-juego" emoji="🧬" title={T('end', l)} score={pts} message={msg}
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
  const acerto = isResult && elegida === round.correcta

  return (
    <div className="relative z-10 flex flex-col items-center min-h-[calc(100vh-4rem)] px-2 sm:px-4 py-4">
      <SEOHead title={seo.title} description={seo.desc} path={seo.path} lang={l} />

      <div className="w-full max-w-[520px] flex items-center justify-between mb-3 px-1">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-widest">🧬 {DIFS[difficulty].label[l] ?? DIFS[difficulty].label.es}</p>
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

      <div className="w-full max-w-[520px] mb-3">
        <PunnettBoard round={round} reveal={isResult} l={l} />
      </div>

      <p className="text-white/80 text-sm sm:text-base mb-3 text-center px-2 max-w-[520px]">
        {round.pregunta[l] ?? round.pregunta.es}
      </p>

      <div className={`w-full max-w-[520px] px-1 grid gap-2 ${round.tipo === 'deduce' ? 'grid-cols-2' : 'grid-cols-5'}`}>
        {round.opciones.map(o => {
          const esCorrecta = o.id === round.correcta
          const esElegida = o.id === elegida
          let cls = 'bg-white/5 border-white/15 text-white/85 hover:bg-white/10 hover:border-white/30'
          if (isResult) {
            if (esCorrecta) cls = 'bg-green-500/20 border-green-500 text-green-200'
            else if (esElegida) cls = 'bg-red-500/20 border-red-500 text-red-300'
            else cls = 'bg-white/5 border-white/10 text-white/30'
          }
          return (
            <button key={o.id} onClick={() => responder(o.id)} disabled={isResult}
              className={`py-3 rounded-xl border font-black transition-all ${cls}`}>
              {o.label}
            </button>
          )
        })}
      </div>

      {isResult && (
        <div className="w-full max-w-[520px] px-1 mt-3 space-y-2">
          <div className="rounded-xl px-3 py-2.5 bg-white/5 border border-white/10">
            <p className="text-white/70 text-sm">💡 {round.explicacion[l] ?? round.explicacion.es}</p>
          </div>
          <p className="text-center text-xs font-bold">
            {acerto
              ? <span className="text-green-400">+1 · +{CORRECT_TIME}s ⏱️{streak >= 2 ? ` · 🔥 ${streak}` : ''}</span>
              : <span className="text-red-400">−{WRONG_TIME}s ⏱️</span>}
          </p>
        </div>
      )}
    </div>
  )
}
