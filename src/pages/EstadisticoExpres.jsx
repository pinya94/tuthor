import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLang } from '../context/LangContext'
import { useAuth } from '../context/AuthContext'
import { saveActivity } from '../lib/activity'
import { computeCoins } from '../lib/games'
import { RANGOS, generarRonda, explicacion } from '../lib/estadisticoEngine'
import GameEndScreen from '../components/GameEndScreen'
import SupportBlock from '../components/SupportBlock'
import SEOHead from '../components/SEOHead'
import BarChart from '../components/BarChart'

// ── Estadístico Exprés ───────────────────────────────────────────────────
// Deliberadamente NO es una ruleta ni nada con pinta de azar/apuesta: se
// enseña un dataset (gráfico de barras) y hay que CALCULAR media, mediana,
// moda o rango escribiendo el número — aplicar la fórmula de verdad, no
// predecir ni apostar. Contrarreloj para que no se vuelva monótono, pero la
// mecánica en sí es puro cálculo.
//
// La generación de datasets vive en lib/estadisticoEngine.js — la comparten
// los 4 exámenes por medida (Estadistico{Media,Mediana,Moda,Rango}Examen.jsx)
// para que "calcula la media" signifique lo mismo en todos los sitios.

const TIPOS = ['media', 'mediana', 'moda', 'rango']

const DIFS = Object.fromEntries(Object.entries(RANGOS).map(([id, r]) => [id, {
  ...r,
  time: id === 'facil' ? 80 : id === 'medio' ? 70 : 60,
  bonus: id === 'facil' ? 6 : 5,
}]))

const DIF_LABEL = {
  facil:   { es: 'Fácil', en: 'Easy', ca: 'Fàcil' },
  medio:   { es: 'Medio', en: 'Medium', ca: 'Mitjà' },
  dificil: { es: 'Difícil', en: 'Hard', ca: 'Difícil' },
}

const TIPO_LABEL = {
  media:   { es: 'Media', en: 'Mean', ca: 'Mitjana' },
  mediana: { es: 'Mediana', en: 'Median', ca: 'Mediana' },
  moda:    { es: 'Moda', en: 'Mode', ca: 'Moda' },
  rango:   { es: 'Rango', en: 'Range', ca: 'Rang' },
}

// Frase completa con el artículo correcto ("el rango" es masculino, el resto
// femenino) — TIPO_LABEL de arriba se queda como nombre corto sin artículo,
// para el placeholder del input y la lista "qué se pide" de la intro.
const PROMPT_LABEL = {
  media:   { es: 'Calcula la media', en: 'Calculate the mean', ca: 'Calcula la mitjana' },
  mediana: { es: 'Calcula la mediana', en: 'Calculate the median', ca: 'Calcula la mediana' },
  moda:    { es: 'Calcula la moda', en: 'Calculate the mode', ca: 'Calcula la moda' },
  rango:   { es: 'Calcula el rango', en: 'Calculate the range', ca: 'Calcula el rang' },
}

export default function EstadisticoExpres() {
  const navigate = useNavigate()
  const { lang, tr, localPath } = useLang()
  const { user } = useAuth()

  const [fase, setFase] = useState('intro') // intro | jugando | fin
  const [difId, setDifId] = useState('medio')
  const [ronda, setRonda] = useState(null)
  const [inputVal, setInputVal] = useState('')
  const [timeLeft, setTimeLeft] = useState(70)
  const [score, setScore] = useState(0)
  const [aciertos, setAciertos] = useState(0)
  const [rondasJugadas, setRondasJugadas] = useState(0)
  const [racha, setRacha] = useState(0)
  const [mejorRacha, setMejorRacha] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [bloqueado, setBloqueado] = useState(false)

  const timerRef = useRef(null)
  const timeRef = useRef(70)
  const scoreRef = useRef(0)
  const aciertosRef = useRef(0)
  const rondasRef = useRef(0)
  const mejorRachaRef = useRef(0)
  const inputRef = useRef(null)

  const dif = DIFS[difId]

  function nuevaRonda(d) {
    setRonda(generarRonda(d || dif, TIPOS))
    setInputVal('')
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
  }, [fase, difId])

  useEffect(() => {
    if (fase === 'jugando' && !bloqueado && inputRef.current) inputRef.current.focus()
  }, [fase, ronda, bloqueado])

  function resolver() {
    if (bloqueado || inputVal === '') return
    const acierto = Number(inputVal) === ronda.respuesta
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

    setTimeout(() => nuevaRonda(), 1100)
  }

  function saveOnEnd() {
    if (!user) return
    const finalScore = scoreRef.current
    if (finalScore <= 0) return
    saveActivity(user.uid, {
      type: 'juego', game: 'estadistico-expres', score: finalScore, passed: true, timeSpent: dif.time,
      coinsEarned: computeCoins('estadistico-expres', { score: finalScore }),
      userName: user.displayName, userPhoto: user.photoURL,
    }).catch(() => {})
  }

  const seoTitle = tr({ es: 'Estadístico Exprés — Media, mediana, moda y rango', en: 'Quick Statistician — Mean, Median, Mode & Range', ca: 'Estadístic Exprés — Mitjana, mediana, moda i rang' })
  const seoDesc = tr({
    es: 'Calcula media, mediana, moda y rango de un dataset real a contrarreloj. Sin ruletas ni azar: aplicar la fórmula, y ya.',
    en: 'Calculate the mean, median, mode and range of a real dataset against the clock. No wheels, no chance: just apply the formula.',
    ca: 'Calcula mitjana, mediana, moda i rang d\'un dataset real a contrarellotge. Sense rodes ni atzar: aplicar la fórmula, i prou.',
  })

  if (fase === 'intro') {
    const d = DIFS[difId]
    return (
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
        <SEOHead title={seoTitle} description={seoDesc} path="/juegos/estadistico-expres" lang={lang} />
        <div className="max-w-md w-full">
          <button onClick={() => navigate(localPath('/juegos'))}
            className="text-white/30 hover:text-white/60 text-sm mb-6 flex items-center gap-1 transition-colors">
            {tr({ es: '← Volver', en: '← Back', ca: '← Tornar' })}
          </button>
          <div className="text-center mb-7">
            <span className="text-7xl block mb-4">📊</span>
            <h1 className="text-4xl font-black text-white mb-2">{tr({ es: 'Estadístico Exprés', en: 'Quick Statistician', ca: 'Estadístic Exprés' })}</h1>
            <p className="text-white/40">{tr({ es: 'Calcula media, mediana, moda y rango a partir de datos reales', en: 'Calculate mean, median, mode and range from real data', ca: 'Calcula mitjana, mediana, moda i rang a partir de dades reals' })}</p>
          </div>

          <SupportBlock variant="top" className="mb-5" />

          <div className="flex gap-2 p-1 bg-white/5 border border-white/10 rounded-xl mb-5 w-fit mx-auto">
            {Object.keys(DIFS).map(id => (
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
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">{tr({ es: 'Qué se pide', en: 'What gets asked', ca: 'Què es demana' })}</p>
            <div className="space-y-2">
              {[
                ['x̄', tr({ es: 'Media: la suma entre cuántos datos hay', en: 'Mean: the sum divided by how many values', ca: 'Mitjana: la suma entre quantes dades hi ha' })],
                ['med', tr({ es: 'Mediana: el valor central, con los datos ordenados', en: 'Median: the middle value, once sorted', ca: 'Mediana: el valor central, amb les dades ordenades' })],
                ['moda', tr({ es: 'Moda: el valor que más se repite', en: 'Mode: the most frequent value', ca: 'Moda: el valor que més es repeteix' })],
                ['rango', tr({ es: 'Rango: el mayor menos el menor', en: 'Range: the largest minus the smallest', ca: 'Rang: el més gran menys el més petit' })],
              ].map(([e, t]) => (
                <div key={t} className="flex items-start gap-3 text-sm text-white/50">
                  <span className="font-black text-sky-400 w-10 shrink-0 text-xs">{e}</span>
                  <span>{t}</span>
                </div>
              ))}
            </div>
          </div>

          <button onClick={() => startGame(difId)}
            className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-black font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-sky-500/30">
            {tr({ es: '¡Empezar! →', en: 'Start! →', ca: 'Comença! →' })}
          </button>
        </div>
      </div>
    )
  }

  if (fase === 'fin') {
    const shareText = tr({
      es: `He conseguido ${score} puntos en Estadístico Exprés 📊 — ¿puedes superarme? https://tuthor.es/juegos/estadistico-expres`,
      en: `I scored ${score} points in Quick Statistician 📊 — can you beat me? https://tuthor.es/en/juegos/estadistico-expres`,
      ca: `He aconseguit ${score} punts a Estadístic Exprés 📊 — em pots superar? https://tuthor.es/ca/juegos/estadistico-expres`,
    })
    return (
      <GameEndScreen
        game="estadistico-expres"
        emoji="📊"
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
          <span className="text-white font-bold tabular-nums">📊 {score}</span>
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

      <div className={`flex-1 flex flex-col justify-center rounded-2xl border-2 p-5 transition-all duration-200 ${cardBorder}`}>
        <p className="text-sky-400 text-xs font-black uppercase tracking-widest text-center mb-1">
          {tr(PROMPT_LABEL[ronda.tipo])}
        </p>
        <BarChart valores={ronda.valores} />
        <div className="flex gap-2 max-w-xs mx-auto w-full">
          <input
            ref={inputRef}
            type="number"
            inputMode="numeric"
            value={inputVal}
            disabled={bloqueado}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && resolver()}
            placeholder={tr(TIPO_LABEL[ronda.tipo])}
            className="flex-1 min-w-0 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white text-center font-black text-xl tabular-nums focus:outline-none focus:border-sky-400"
          />
          <button onClick={resolver} disabled={bloqueado || inputVal === ''}
            className="px-5 py-3 bg-sky-500 hover:bg-sky-400 disabled:opacity-30 text-black font-black rounded-xl transition-all">
            ✓
          </button>
        </div>
        {bloqueado && <p className="text-white/50 text-sm text-center mt-3">{explicacion(ronda, lang)}</p>}
      </div>
    </div>
  )
}
