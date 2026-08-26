import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import GameEndScreen from '../components/GameEndScreen'
import SupportBlock from '../components/SupportBlock'
import SEOHead from '../components/SEOHead'
import Pastel from '../components/Pastel'

// ── Reparte el Pastel ─────────────────────────────────────────────────────
// Lectura visual e intuitiva de fracciones (Primaria/ESO): un pastel circular
// dividido en porciones iguales, dibujado a mano con <path> de SVG (arcos
// trigonométricos), sin librería de gráficos.
//
// Dos tipos de ronda:
//  - identifica: el pastel ya viene con m de n porciones sombreadas — hay que
//    leer qué fracción representa (opción múltiple).
//  - construye: se pide una fracción objetivo a/b, pero el pastel puede tener
//    más porciones que el denominador (n = b×k) — hay que caer en que a/b es
//    equivalente a (a×k)/(b×k) y tocar esa cantidad de porciones. Es la parte
//    que enseña equivalencia de fracciones sin decirlo con esas palabras.

const DIFS = {
  facil:   { denominadores: [2, 3, 4],          multiplicidad: [1],       nMax: 6,  time: 90, bonus: 6 },
  medio:   { denominadores: [2, 3, 4, 5, 6],    multiplicidad: [1, 2],    nMax: 10, time: 75, bonus: 5 },
  dificil: { denominadores: [3, 4, 5, 6, 7, 8], multiplicidad: [1, 2, 3], nMax: 12, time: 60, bonus: 4 },
}

const DIF_LABEL = {
  facil:   { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
  medio:   { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
  dificil: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
}

function rng(min, max) { return min + Math.floor(Math.random() * (max - min + 1)) }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── Generación de rondas ─────────────────────────────────────────────────
function generarRonda(dif) {
  const tipo = pick(['identifica', 'construye'])
  const b = pick(dif.denominadores)
  const a = rng(1, b - 1)
  const kOpciones = dif.multiplicidad.filter(k => b * k <= dif.nMax)
  const k = pick(kOpciones.length ? kOpciones : [1])
  const n = b * k
  const m = a * k
  return { tipo, a, b, n, m }
}

function opcionesIdentifica(m, n) {
  const candidatos = new Set([`${n - m}/${n}`, `${n}/${m}`, `${Math.min(m + 1, n - 1)}/${n}`, `${Math.max(1, m - 1)}/${n}`])
  candidatos.delete(`${m}/${n}`)
  const distractores = [...candidatos].slice(0, 3)
  while (distractores.length < 3) distractores.push(`${rng(1, n - 1)}/${n}`)
  return shuffle([`${m}/${n}`, ...new Set(distractores)].slice(0, 4))
}

export default function RepartePastel() {
  const navigate = useNavigate()
  const { lang, tr, localPath } = useLang()
  const { user } = useAuth()

  const [fase, setFase] = useState('intro') // intro | jugando | fin
  const [difId, setDifId] = useState('medio')
  const [ronda, setRonda] = useState(null)
  const [opciones, setOpciones] = useState([])
  const [shaded, setShaded] = useState(new Set())
  const [timeLeft, setTimeLeft] = useState(75)
  const [score, setScore] = useState(0)
  const [aciertos, setAciertos] = useState(0)
  const [rondasJugadas, setRondasJugadas] = useState(0)
  const [racha, setRacha] = useState(0)
  const [mejorRacha, setMejorRacha] = useState(0)
  const [feedback, setFeedback] = useState(null) // 'correct' | 'wrong' | null
  const [bloqueado, setBloqueado] = useState(false)
  const [levelKey, setLevelKey] = useState(0)

  const timerRef = useRef(null)
  const timeRef = useRef(75)
  const scoreRef = useRef(0)
  const aciertosRef = useRef(0)
  const rondasRef = useRef(0)
  const mejorRachaRef = useRef(0)

  const dif = DIFS[difId]

  function nuevaRonda(d) {
    const r = generarRonda(d || dif)
    setRonda(r)
    setShaded(new Set())
    if (r.tipo === 'identifica') {
      setShaded(new Set(Array.from({ length: r.m }, (_, i) => i)))
      setOpciones(opcionesIdentifica(r.m, r.n))
    } else {
      setOpciones([])
    }
    setFeedback(null)
    setBloqueado(false)
  }

  function startGame(selectedDif) {
    const id = selectedDif || difId
    const d = DIFS[id]
    setDifId(id)
    timeRef.current = d.time
    setTimeLeft(d.time)
    setScore(0); scoreRef.current = 0
    setAciertos(0); aciertosRef.current = 0
    setRondasJugadas(0); rondasRef.current = 0
    setRacha(0)
    setMejorRacha(0); mejorRachaRef.current = 0
    nuevaRonda(d)
    setFase('jugando')
    setLevelKey(k => k + 1)
  }

  useEffect(() => {
    if (fase !== 'jugando') return
    timerRef.current = setInterval(() => {
      timeRef.current -= 1
      setTimeLeft(timeRef.current)
      if (timeRef.current <= 0) {
        clearInterval(timerRef.current)
        saveOnEnd()
        setFase('fin')
      }
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [fase, levelKey])

  function resolver(acierto) {
    if (bloqueado) return
    setBloqueado(true)
    setFeedback(acierto ? 'correct' : 'wrong')
    rondasRef.current += 1
    setRondasJugadas(rondasRef.current)

    if (acierto) {
      const nuevaRachaVal = racha + 1
      setRacha(nuevaRachaVal)
      if (nuevaRachaVal > mejorRachaRef.current) { mejorRachaRef.current = nuevaRachaVal; setMejorRacha(nuevaRachaVal) }
      const puntos = 100 + Math.min(nuevaRachaVal * 20, 200)
      scoreRef.current += puntos
      setScore(scoreRef.current)
      aciertosRef.current += 1
      setAciertos(aciertosRef.current)
      timeRef.current += dif.bonus
      setTimeLeft(timeRef.current)
    } else {
      setRacha(0)
    }

    setTimeout(() => nuevaRonda(), 700)
  }

  function toggleSlice(i) {
    if (bloqueado || ronda?.tipo !== 'construye') return
    setShaded(prev => {
      const next = new Set(prev)
      next.has(i) ? next.delete(i) : next.add(i)
      return next
    })
  }

  function comprobarConstruye() {
    if (bloqueado) return
    resolver(shaded.size === ronda.m)
  }

  function saveOnEnd() {
    if (!user) return
    const finalScore = scoreRef.current
    if (finalScore <= 0) return
    saveActivity(user.uid, {
      type: 'juego', game: 'reparte-pastel', score: finalScore, passed: true, timeSpent: dif.time,
      coinsEarned: computeCoins('reparte-pastel', { score: finalScore }),
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }

  const seoTitle = tr({ es: 'Reparte el Pastel — Fracciones visuales', en: 'Slice the Cake — Visual Fractions', ca: 'Reparteix el Pastís — Fraccions visuals' })
  const seoDesc = tr({
    es: 'Aprende fracciones tocando porciones de un pastel: identifica qué fracción está sombreada y construye la fracción que te piden. Primaria y ESO.',
    en: 'Learn fractions by tapping cake slices: identify the shaded fraction and build the one you are asked for. Primary and Secondary.',
    ca: 'Aprèn fraccions tocant porcions d\'un pastís: identifica quina fracció està ombrejada i construeix la que et demanen. Primària i ESO.',
  })

  // ── INTRO ─────────────────────────────────────────────────────────────────
  if (fase === 'intro') {
    const d = DIFS[difId]
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <SEOHead title={seoTitle} description={seoDesc} path="/juegos/reparte-pastel" lang={lang} />
        <div className="max-w-md w-full">
          <button onClick={() => navigate(localPath('/juegos'))}
            className="text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
            {tr({ es: '← Volver', en: '← Back', ca: '← Tornar' })}
          </button>
          <div className="text-center mb-7">
            <span className="text-7xl block mb-4">🍰</span>
            <h1 className="text-4xl font-black text-white mb-2">{tr({ es: 'Reparte el Pastel', en: 'Slice the Cake', ca: 'Reparteix el Pastís' })}</h1>
            <p className="text-white/40">{tr({ es: 'Lee y construye fracciones tocando las porciones', en: 'Read and build fractions by tapping the slices', ca: 'Llegeix i construeix fraccions tocant les porcions' })}</p>
          </div>

          <SupportBlock variant="top" className="mb-5" />

          <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl mb-5 w-fit mx-auto">
            {Object.entries(DIFS).map(([id]) => (
              <button key={id} onClick={() => setDifId(id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  difId === id ? 'bg-white/15 text-white shadow-sm' : 'text-white/40 hover:text-white/70'
                }`}>
                {tr(DIF_LABEL[id])}
              </button>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-5 space-y-2.5 text-sm">
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">{tr({ es: 'Reglas', en: 'Rules', ca: 'Regles' })}</p>
            {[
              ['⏱️', tr({ es: 'Tiempo inicial', en: 'Starting time', ca: 'Temps inicial' }), `${d.time}s`],
              ['🎁', tr({ es: 'Por acierto', en: 'Per correct answer', ca: 'Per encert' }), `+${d.bonus}s`],
              ['🔥', tr({ es: 'Racha', en: 'Streak', ca: 'Ratxa' }), tr({ es: 'más puntos por acierto seguido', en: 'more points for consecutive hits', ca: 'més punts per encert seguit' })],
            ].map(([e, k, v]) => (
              <div key={k} className="flex items-start justify-between gap-2">
                <span className="text-white/40 shrink-0">{e} {k}</span>
                <span className="text-white font-semibold text-right">{v}</span>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-7">
            <div className="space-y-2">
              {[
                ['👀', tr({ es: 'Identifica: acierta qué fracción está sombreada', en: 'Identify: guess which fraction is shaded', ca: 'Identifica: encerta quina fracció està ombrejada' })],
                ['👆', tr({ es: 'Construye: toca las porciones hasta formar la fracción pedida', en: 'Build: tap slices until you form the fraction asked for', ca: 'Construeix: toca les porcions fins a formar la fracció demanada' })],
              ].map(([e, t]) => (
                <div key={t} className="flex items-start gap-3 text-sm text-white/50">
                  <span className="text-base w-5 shrink-0 text-center">{e}</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => startGame(difId)}
            className="w-full py-4 bg-pink-500 hover:bg-pink-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-pink-500/30">
            {tr({ es: '¡Empezar! →', en: 'Start! →', ca: 'Comença! →' })}
          </button>
        </div>
      </div>
    )
  }

  // ── FIN ───────────────────────────────────────────────────────────────────
  if (fase === 'fin') {
    const shareText = tr({
      es: `He conseguido ${score} puntos en Reparte el Pastel 🍰 — ¿puedes superarme? https://tuthor.es/juegos/reparte-pastel`,
      en: `I scored ${score} points in Slice the Cake 🍰 — can you beat me? https://tuthor.es/en/juegos/reparte-pastel`,
      ca: `He aconseguit ${score} punts a Reparteix el Pastís 🍰 — em pots superar? https://tuthor.es/ca/juegos/reparte-pastel`,
    })
    return (
      <GameEndScreen
        game="reparte-pastel"
        emoji="🍰"
        title={`${tr({ es: '¡Tiempo agotado!', en: 'Time is up!', ca: 'Temps esgotat!' })} · ${tr(DIF_LABEL[difId])}`}
        score={score}
        stats={[
          { label: tr({ es: 'Aciertos', en: 'Correct', ca: 'Encerts' }), value: `${aciertos}/${rondasJugadas}`, emoji: '✅' },
          { label: tr({ es: 'Mejor racha', en: 'Best streak', ca: 'Millor ratxa' }), value: mejorRacha, emoji: '🔥' },
        ]}
        shareText={shareText}
        onPlayAgain={() => startGame(difId)}
        playAgainLabel={tr({ es: 'Intentarlo de nuevo', en: 'Try again', ca: 'Tornar-ho a provar' })}
        secondaryActions={[{ label: tr({ es: 'Cambiar dificultad', en: 'Change difficulty', ca: 'Canviar dificultat' }), onClick: () => setFase('intro') }]}
        user={user} lang={lang}
      />
    )
  }

  // ── JUGANDO ───────────────────────────────────────────────────────────────
  if (!ronda) return <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-4rem)]"><p className="text-white/30">...</p></div>

  const timerPct = Math.min(100, (timeLeft / dif.time) * 100)
  const timerColor = timeLeft > dif.time * 0.35 ? 'bg-green-400' : timeLeft > dif.time * 0.15 ? 'bg-yellow-400' : 'bg-red-500 animate-pulse'
  const cardBorder = feedback === 'correct' ? 'border-green-400 bg-green-500/10' : feedback === 'wrong' ? 'border-red-400 bg-red-500/10' : 'border-white/10 bg-white/5'

  return (
    <div className="relative z-10 flex flex-col min-h-[calc(100vh-4rem)] px-3 py-3 max-w-lg mx-auto w-full">
      <div className="flex items-center justify-between mb-2">
        <button onClick={() => setFase('intro')} className="text-white/40 hover:text-white/70 text-sm transition-colors">
          {tr({ es: '← Salir', en: '← Exit', ca: '← Sortir' })}
        </button>
        <div className="flex items-center gap-3 text-sm text-white/50">
          <span className="text-white font-bold tabular-nums">🍰 {score}</span>
          {racha >= 2 && <span className="text-amber-400 font-bold">🔥 {racha}</span>}
        </div>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-xs text-white/40 mb-1">
          <span>{tr({ es: 'Tiempo', en: 'Time', ca: 'Temps' })}</span>
          <span className={`font-bold tabular-nums ${timeLeft <= dif.time * 0.15 ? 'text-red-400' : ''}`}>{timeLeft}s</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-1000 ${timerColor}`} style={{ width: `${timerPct}%` }} />
        </div>
      </div>

      <div className={`flex-1 flex flex-col items-center justify-center rounded-2xl border-2 p-5 transition-all duration-200 ${cardBorder}`}>
        {ronda.tipo === 'identifica' ? (
          <>
            <p className="text-pink-400 text-xs font-black uppercase tracking-widest text-center mb-3">{tr({ es: '¿Qué fracción está sombreada?', en: 'What fraction is shaded?', ca: 'Quina fracció està ombrejada?' })}</p>
            <Pastel n={ronda.n} shaded={shaded} />
            <div className="grid grid-cols-2 gap-2 mt-5 w-full max-w-xs">
              {opciones.map(op => (
                <button key={op} disabled={bloqueado} onClick={() => resolver(op === `${ronda.m}/${ronda.n}`)}
                  className="py-3 px-2 bg-white/10 hover:bg-white/20 disabled:opacity-40 border border-white/15 text-white font-black text-lg rounded-xl transition-all">
                  {op}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <p className="text-pink-400 text-xs font-black uppercase tracking-widest text-center mb-1">{tr({ es: 'Construye la fracción', en: 'Build the fraction', ca: 'Construeix la fracció' })}</p>
            <p className="text-white font-black text-2xl text-center mb-3">{ronda.a}/{ronda.b}</p>
            <Pastel n={ronda.n} shaded={shaded} onToggle={toggleSlice} disabled={bloqueado} />
            <p className="text-white/40 text-xs text-center mt-3 mb-3">{tr({ es: `Toca las porciones (pastel de ${ronda.n})`, en: `Tap the slices (${ronda.n}-slice cake)`, ca: `Toca les porcions (pastís de ${ronda.n})` })}</p>
            {!bloqueado && (
              <button onClick={comprobarConstruye}
                className="px-8 py-2.5 bg-pink-500 hover:bg-pink-400 text-black font-black rounded-xl transition-all">
                {tr({ es: 'Comprobar ✓', en: 'Check ✓', ca: 'Comprova ✓' })}
              </button>
            )}
            {bloqueado && (
              <p className="text-white/50 text-sm text-center">
                {tr({
                  es: `${ronda.a}/${ronda.b} = ${ronda.m}/${ronda.n} en un pastel de ${ronda.n} porciones.`,
                  en: `${ronda.a}/${ronda.b} = ${ronda.m}/${ronda.n} on a ${ronda.n}-slice cake.`,
                  ca: `${ronda.a}/${ronda.b} = ${ronda.m}/${ronda.n} en un pastís de ${ronda.n} porcions.`,
                })}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
